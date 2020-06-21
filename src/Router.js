import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import DrawerContent from './components/DrawerContent';
import Loading from './components/Loading';
import { usersSelector } from './redux/models/users';
import theme from './theme';
import Accounts from './views/Accounts';
import AddProcessor from './views/AddProcessor';
import ConnectPlaid from './views/ConnectPlaid';
import Contact from './views/Contact';
import Dashboard from './views/Dashboard';
import LastMonth from './views/LastMonth';
import LoginSignup from './views/LoginSignup';
import Processors from './views/Processors';

const { interpolate, Value, concat, cond, greaterThan } = Animated;

export default function Router() {
  const { Navigator, Screen } = createStackNavigator();

  const screenOptions = {
    headerShown: false,
    cardStyle: styles.container,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator initialRouteName='LoginSignup'>
          <Screen name='LoginSignup' component={LoginSignup} options={screenOptions} />
          <Screen name='Authenticated' component={Authenticated} options={screenOptions} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function Authenticated({ navigation }) {
  const [progress, setProgress] = useState(null);
  const { Navigator, Screen } = createDrawerNavigator();
  const user = useSelector(usersSelector);

  useEffect(() => {
    if (!user) {navigation.navigate('LoginSignup');}
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  return (
    <Navigator
      backBehavior='initialRoute'
      initialRouteName='Dashboard'
      drawerStyle={{ width: '100%' }}
      drawerType='back'
      sceneContainerStyle={[styles.sceneContainer, getTransform(progress)]}
      overlayColor='transparent'
      drawerContent={(props) => {
        if (!progress) {setProgress(props.progress);}
        return <DrawerContent {...props} />;
      }}
    >
      <Screen name='Dashboard' component={Dashboard} />
      <Screen name='LastMonth' component={LastMonth} />
      <Screen name='Contact' component={Contact} />
      <Screen name='Accounts' component={Accounts} />
      <Screen name='Processors' component={Processors} />
      <Screen name='AddProcessor' component={AddProcessor} />
      <Screen name='ConnectPlaid' component={ConnectPlaid} />
    </Navigator>
  );
}

const getTransform = (progress) => {
  if (progress) {
    const overflowScroll = new Value('scroll');
    const overflowHidden = new Value('hidden');
    const overflow = cond(
      greaterThan(progress, 0.01),
      concat(overflowHidden, ''),
      concat(overflowScroll, ''),
    );

    return {
      overflow,
      transform: [
        {
          scale: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [1, 0.74],
          }),
        },
        {
          translateX: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('screen').width * 0.57],
          }),
        },
        {
          translateY: interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [0, -(Dimensions.get('screen').height * 0.09)],
          }),
        },
        { perspective: 1000 },
      ],
    };
  }
  return { transform: [], overflow: 'scroll' };
};


const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
  },
  sceneContainer: {
    borderRadius: theme.spacing(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 10,
  },
};