import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { useDispatch } from 'react-redux';
import LabeledTextField from '../components/LabeledTextField';
import config from '../config';
import { signupUser } from '../redux/models/users';
import { validateEmail } from '../services/helpers';
import theme from '../theme';
import StyledButton from './StyledButton';

export default function SignupForm() {
  const { DEMO_ACCOUNT } = config;
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.name : '');
  const [email, setEmail] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.email : '');
  const [password, setPassword] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.password : '');
  const [confirmPassword, setConfirmPassword] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.password : '');
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();

  const signup = () => {
    if (!name) {
      return setErrorMsg({ field: 'name', msg: 'The name field is required' });
    }
    if (!email) {
      return setErrorMsg({ field: 'email', msg: 'The email field is required' });
    }
    if (!validateEmail(email)) {
      return setErrorMsg({ field: 'email', msg: 'Please enter a valid email address' });
    }
    if (!password) {
      return setErrorMsg({ field: 'password', msg: 'The password field is required' });
    }
    if (password.length < 8) {
      return setErrorMsg({ field: 'password', msg: 'Password must be at least 8 characters' });
    }
    if (!confirmPassword) {
      return setErrorMsg({ field: 'confirmPassword', msg: 'The confirm password field is required' });
    }
    if (password !== confirmPassword) {
      return setErrorMsg({ field: 'confirmPassword', msg: 'Passwords do not match' });
    }

    setErrorMsg(null);

    (async () => {
      try {
        await dispatch(signupUser(name, email, password));
      } catch (err) {
        setErrorMsg({ msg: err.message });
      }
    })();
  };

  return (
    <View style={styles.container} behavior='position'>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={{ ...styles.errorMsg, display: errorMsg ? 'flex' : 'none' }}>{errorMsg && errorMsg.msg}</Text>
          <LabeledTextField
            value={name}
            onChangeText={setName}
            autoCompleteType='name'
            placeholder="Name"
            label="Name" />
          <LabeledTextField
            value={email}
            onChangeText={text => setEmail(text.trim())}
            autoCompleteType='email'
            keyboardType='email-address'
            placeholder="Email Address"
            label="Email Address" />
          <LabeledTextField
            onFocus={() => {
              if (!touched) {setTouched(true);}
            }}
            value={password}
            secureTextEntry
            autoCompleteType='password'
            onChangeText={setPassword}
            placeholder="Password"
            label="Password" />
          <BoxPasswordStrengthDisplay
            width={(Dimensions.get('screen').width * 0.9) - theme.spacing(1)}
            password={password}
            touched={touched}
            minLength={8}
            scoreLimit={100}
            boxContainerStyle={styles.passwordBar}
            levels={[
              {
                label: 'Weak',
                labelColor: theme.red,
                activeBarColor: theme.red,
              }, {
                label: 'Moderate',
                labelColor: theme.yellow,
                activeBarColor: theme.yellow,
              }, {
                label: 'Strong',
                labelColor: theme.green,
                activeBarColor: theme.green,
              },
            ]}
          />
          <LabeledTextField
            value={confirmPassword}
            secureTextEntry
            autoCompleteType='password'
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            label="Confirm Password" />
          <StyledButton
            onPress={() => signup()}
            backgroundColor={theme.green}
            label="Signup"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  inner: {
    padding: theme.spacing(3),
  },
  errorMsg: {
    color: '#cc0000',
    textAlign: 'center',
    fontFamily: 'nunito-sans-regular',
  },
  passwordBar: {
    width: 50,
  },
};