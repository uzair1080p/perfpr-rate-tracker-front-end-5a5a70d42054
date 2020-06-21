import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import LabeledTextField from '../components/LabeledTextField';
import config from '../config';
import { loginUser } from '../redux/models/users';
import { validateEmail } from '../services/helpers';
import theme from '../theme';
import StyledButton from './StyledButton';

export default function LoginForm() {
  const { DEMO_ACCOUNT } = config;
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.email : '');
  const [password, setPassword] = useState(DEMO_ACCOUNT ? DEMO_ACCOUNT.password : '');
  const dispatch = useDispatch();

  const login = () => {
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

    setErrorMsg(null);

    (async () => {
      try {
        await dispatch(loginUser(email, password));
      } catch (err) {
        setErrorMsg({ msg: err.message });
      }
    })();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <Text style={{ ...styles.errorMsg, display: errorMsg ? 'flex' : 'none' }}>{errorMsg && errorMsg.msg}</Text>
          <LabeledTextField
            value={email}
            onChangeText={text => setEmail(text.trim())}
            autoCompleteType='email'
            keyboardType='email-address'
            placeholder="Email Address"
            label="Email Address" />
          <LabeledTextField
            value={password}
            secureTextEntry
            autoCompleteType='password'
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            label="Password" />
          <StyledButton
            onPress={() => login()}
            backgroundColor={theme.blue}
            label="Login"
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
  errorMsg: {
    color: '#cc0000',
    textAlign: 'center',
    fontFamily: 'nunito-sans-regular',
  },
  inner: {
    padding: theme.spacing(3),
  },
};