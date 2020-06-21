import { useIsDrawerOpen } from '@react-navigation/drawer';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import Menu from '../../assets/menu.png';
import theme from '../theme';
import IconButton from './IconButton';

export default function CustomHeader({ navigation, label }) {
  const isDrawerOpen = useIsDrawerOpen();
  return (
    <View style={styles.container}>
      {!isDrawerOpen && <StatusBar backgroundColor={theme.backgroundColor} barStyle='dark-content' />}
      {isDrawerOpen && <StatusBar backgroundColor={theme.lightBlue} barStyle='dark-content' />}
      <IconButton icon={Menu} onPress={navigation.openDrawer} />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    paddingLeft: theme.spacing(3),
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-semi-bold',
  },
};