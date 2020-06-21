import React, { useEffect } from 'react';
import { Keyboard, StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import SignupForm from '../components/SignupForm';
import { usersSelector } from '../redux/models/users';
import theme from '../theme';

export default function LoginSignup({ navigation }) {
  const user = useSelector(usersSelector);

  useEffect(() => {
    if (user) {navigation.navigate('Authenticated');}
  }, [user]);

  if (user) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.backgroundColor} barStyle='dark-content' />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Logo style={{ height: 150 }} />
          <ScrollableTabView>
            <LoginForm tabLabel='Login' />
            <SignupForm tabLabel='Signup' />
          </ScrollableTabView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  inner: {
    flex: 1,
  },
};