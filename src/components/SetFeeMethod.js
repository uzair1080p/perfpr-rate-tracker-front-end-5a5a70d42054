import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import theme from '../theme';
import LabeledTextField from './LabeledTextField';

export default function SetFeeMethod({ setFeeMethod, selected, setPercentFee, percentFee }) {

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.wrap}>
          <TouchableOpacity style={[styles.btn, !selected ? styles.selected : {}]} onPress={() => setFeeMethod(false)} />
          <Text style={styles.text}>Fees after deposit</Text>
        </View>
        <View style={styles.wrap}>
          <TouchableOpacity style={[styles.btn, selected ? styles.selected : {}]} onPress={() => setFeeMethod(true)} />
          <Text style={styles.text}>Fees before deposit</Text>
        </View>
      </View>
      {selected && <LabeledTextField
        value={percentFee}
        onChangeText={setPercentFee}
        keyboardType={'decimal-pad'}
        placeholder="Fee Percentage"
        label="Fee Percentage" />}
    </View>
  );
};

const styles = {
  container: {
    // marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  btn: {
    width: 26,
    height: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: theme.spacing(1),
    borderWidth: 1,
    borderColor: theme.lightGray,
    backgroundColor: theme.backgroundColor,
  },
  selected: {
    backgroundColor: theme.pink,
  },
  text: {
    paddingLeft: theme.spacing(1)
  }
};