import React from 'react';
import { Image } from 'react-native';
import LogoDark from '../../assets/logo_dark.png';
import LogoLight from '../../assets/logo_light.png';

export default function Logo({ style, light }) {
  let icon = LogoDark;
  if (light) {
    icon = LogoLight;
  }

  return <Image style={[styles.logo, style]} source={icon} />;
};

const styles = {
  logo: {
    resizeMode: 'contain',
    width: '40%',
    height: 220,
    alignSelf: 'center',
  },
};