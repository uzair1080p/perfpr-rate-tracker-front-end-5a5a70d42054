import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function StyledButton({ onPress, style, backgroundColor, disabled, label }) {
  const btnStyle = { ...style, ...styles.button, backgroundColor };
  const textStyle = { ...styles.label };
  if (disabled) {
    btnStyle.backgroundColor = theme.gray;
    textStyle.opacity = 0.5;
  }

  return (
    <TouchableOpacity
      style={btnStyle}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: theme.matteBlue,
    height: 48,
    borderRadius: 12,
    marginTop: 26,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  label: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'nunito-sans-semi-bold',
    fontWeight: 'bold',
    fontSize: 15,
  },
};