import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function ColorSelector({ selected, setColor }) {

  const renderColor = (color) => {
    return (
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: color}, selected === color ? styles.selected : {}]}
        onPress={() => setColor(color)}
      />
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a color</Text>
      <View style={styles.inner}>
        {renderColor(theme.pink)}
        {renderColor(theme.babyBlue)}
        {renderColor(theme.lightGreen)}
        {renderColor(theme.gold)}
      </View>

    </View>
  );
};

const styles = {
  container: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 14,
    fontFamily: 'nunito-sans-regular',
    marginBottom: theme.spacing(1),
    color: theme.gray,
  },
  btn: {
    // flex: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: theme.spacing(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  selected: {
    borderWidth: 3,
    borderColor: theme.gray,

  }
};