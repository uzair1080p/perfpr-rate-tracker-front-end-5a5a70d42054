import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import theme from '../theme';

export default function Loading(props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.backgroundColor} barStyle='dark-content' />
      <ActivityIndicator size={48} animating={true} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.backgroundColor,
  },
};