import { Linking } from 'expo';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import AccountIcon from '../../assets/account_icon.png';
import ProcessorsIcon from '../../assets/processors.png';
import ContactIcon from '../../assets/contact_icon.png';
import DashboardIcon from '../../assets/dashboard_icon.png';
import FBIcon from '../../assets/fb.png';
import InstaIcon from '../../assets/insta.png';
import LogoutIcon from '../../assets/logout_icon.png';
import TwitIcon from '../../assets/twitter.png';
import LinkedInIcon from '../../assets/linkedin.png';
import { logoutUser } from '../redux/models/users';
import theme from '../theme';
import IconButton from './IconButton';
import Logo from './Logo';
import StyledButton from './StyledButton';

export default function DrawerContent({ navigation }) {
  const dispatch = useDispatch();

  const renderButton = (name, destination, icon = DashboardIcon) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={() => {
        navigation.closeDrawer();
        if (name === 'Logout') {
          dispatch(logoutUser());
        }
        navigation.navigate(destination);
      }}>
        <IconButton icon={icon} size={32} />
        <Text style={styles.btnLabel}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner]}>
        <Logo style={styles.logo} />
        <View style={styles.links}>
          {renderButton('Dashboard', 'Dashboard', DashboardIcon)}
          {renderButton('Accounts', 'Accounts', AccountIcon)}
          {renderButton('Processors', 'Processors', ProcessorsIcon)}
          {renderButton('Contact Us', 'Contact', ContactIcon)}
          {renderButton('Logout', 'LoginSignup', LogoutIcon)}
        </View>
        <View style={styles.social}>
          <IconButton icon={InstaIcon} style={styles.socialIcon} size={36}
                      onPress={() => Linking.openURL('https://www.instagram.com/ratetracker/')} />
          <IconButton icon={FBIcon} style={styles.socialIcon} size={36}
                      onPress={() => Linking.openURL('https://www.facebook.com/ratetracker123/')} />
          <IconButton icon={TwitIcon} style={styles.socialIcon} size={36}
                      onPress={() => Linking.openURL('https://twitter.com/ratetracker123')} />
          <IconButton icon={LinkedInIcon} style={styles.socialIcon} size={36}
                      onPress={() => Linking.openURL('https://www.linkedin.com/company/rate-tracker')} />
        </View>
        <StyledButton
          style={styles.bottomBtn}
          onPress={() => navigation.navigate('ConnectPlaid')}
          backgroundColor={theme.green}
          label="Add Financial Account"
        />
      </Animated.View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(5),
  },
  links: {
    flex: 5,
  },
  logo: {
    flex: 2,
    width: '50%',
    alignSelf: 'flex-start',
  },
  btn: {
    flexDirection: 'row',
    marginTop: theme.spacing(3),
    width: 200,
  },
  btnLabel: {
    fontFamily: 'nunito-sans-semi-bold',
    fontSize: 18,
    color: theme.gray,
    alignSelf: 'center',
    marginLeft: theme.spacing(2),
    bottom: 2,
  },
  bottomBtn: {
    bottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    width: '100%',
  },
  socialIcon: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
};