import React from 'react';
import { Text, View } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import theme from '../theme';
import Logo from './Logo';

export default function RatingChart({ rating }) {
  const getString = rating => {
    switch (rating) {
      case 'F':
        return 'Poor';
      case 'D':
        return 'Needs Improvement';
      case 'C':
        return 'Average';
      case 'B':
        return 'Great';
      case 'A':
        return 'Awesome';
      default:
        return null;
    }
  };
  const getRating = rating => {
    switch (rating) {
      case 'F':
        return 20;
      case 'D':
        return 35;
      case 'C':
        return 65;
      case 'B':
        return 80;
      case 'A':
        return 95;
      default:
        return 0;
    }
  };

  if (rating === '-') {
    return <View style={styles.loading}>
      <Logo />
    </View>;
  }

  return (
    <View style={styles.container}>
      <Speedometer
        innerColor={theme.backgroundColor}
        value={getRating(rating)}
        totalValue={100}
      />
      <View style={styles.inner1}>
        <View style={styles.inner2}>
          <Text style={styles.textLarge}>{rating}</Text>
          <Text style={styles.textSmall}>{getString(rating)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 200,
  },
  inner1: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.backgroundColor,
    position: 'relative',
    bottom: 91,
    justifyContent: 'center',
  },
  inner2: {
    alignSelf: 'center',
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: theme.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  textLarge: {
    textAlign: 'center',
    fontSize: 70,
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-bold',
  },
  textSmall: {
    textAlign: 'center',
    fontFamily: 'nunito-sans-bold',
    fontSize: 13,
    color: theme.darkGreen,
    bottom: theme.spacing(1),
  },
  loading: {
    bottom: theme.spacing(3),
  },
};