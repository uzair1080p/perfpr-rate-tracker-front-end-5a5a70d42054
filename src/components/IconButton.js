import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default function IconButton({ icon, onPress, width = 36, height = 36, size, style }) {
  if (size) {
    width = size;
    height = size;
  }

  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <Image style={{ width, height }} source={icon} />
    </TouchableOpacity>
  );
};

const styles = {};