import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';

export default function InfoAtAGlanceWidget({ navigation, averageFeePercent }) {
  useEffect(() => {

  }, []);

  const avgPercent = averageFeePercent / 100;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Average Processing Fee</Text>
        <Text style={styles.value}>{avgPercent.toFixed(2)}%</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => {
        {/*navigation.navigate('LastMonth')*/}
      }}>
        <Text style={styles.btnText}>Last Month</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'nunito-sans-regular',
    color: theme.gray,
    fontSize: 14,
  },
  value: {
    fontSize: 22,
    fontFamily: 'nunito-sans-bold',
    color: theme.matteBlue,
    letterSpacing: -0.75,
  },
  btn: {
    backgroundColor: '#FFF',
    width: 120,
    height: 38,
    borderRadius: theme.spacing(1),
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'nunito-sans-bold',
    fontSize: 13,
    color: theme.gray,
  },
};