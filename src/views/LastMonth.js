import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import RatingChart from '../components/RatingChart';
import theme from '../theme';

export default function LastMonth({ navigation }) {
  useEffect(() => {

  }, []);

  return (
    <ScrollView style={styles.container}>
      <CustomHeader label='Last Month' navigation={navigation} />
      <RatingChart rating={'A'} />
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  inner: {
    flex: 1,
    position: 'relative',
    bottom: 50,
  },
};