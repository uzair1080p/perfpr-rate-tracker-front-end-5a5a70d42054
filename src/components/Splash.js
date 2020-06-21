import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadToken } from '../redux/models/users';
import theme from '../theme';
import AnimatedGradient from './AnimatedGradient';
import Logo from './Logo';

export default function Splash() {
  const [animationDone, setAnimationDone] = useState(false);
  const gradOpacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!animationDone) {
      (async () => {
        await dispatch(loadToken());
      })();
      Animated.timing(gradOpacity, {
        toValue: 1,
        duration: 2000,
      }).start();
      setTimeout(() => setAnimationDone(true), 3000);
    }
    if (animationDone) {
      Animated.timing(gradOpacity, {
        toValue: 0,
        duration: 1000,
      }).start();
    }
  }, [animationDone]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: animationDone ? theme.backgroundColor : theme.blue }]}>
      <AnimatedGradient
        style={styles.gradient}
        colors={[theme.darkBlue, theme.blue]}
        opacity={gradOpacity}
      >
        <Logo style={styles.logo} light />
      </AnimatedGradient>
    </Animated.View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: '50%',
  },
  gradient: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    flex: 1,
  },
};