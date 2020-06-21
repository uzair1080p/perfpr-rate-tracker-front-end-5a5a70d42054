import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import theme from '../theme';

export default function OverallStatsWidget({ totalIncome = 0, totalFees = 0 }) {
  useEffect(() => {

  }, []);

  const feeDollars = totalFees / 100;
  const incomeDollars = totalIncome / 100;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Overall processing fees</Text>
          <Text style={styles.totalFees}>${feeDollars.toFixed(2)}</Text>
        </View>
        <Text style={styles.totalFees}>${incomeDollars.toFixed(2)}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barColor} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: theme.spacing(3),
    backgroundColor: theme.lightBlue,
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'nunito-sans-regular',
    color: theme.matteBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalFees: {
    fontSize: 13,
    fontFamily: 'nunito-sans-bold',
    color: theme.matteBlue,
    marginLeft: 16,
  },
  barContainer: {
    backgroundColor: '#DDD',
    width: '100%',
    height: 5,
    marginTop: 8,
    borderRadius: 5,
  },
  barColor: {
    width: '75%',
    backgroundColor: '#45BAFE',
    height: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 5,
  },
};