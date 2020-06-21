import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import ColorSelector from '../components/ColorSelector';
import CustomHeader from '../components/CustomHeader';
import LabeledTextField from '../components/LabeledTextField';
import SetFeeMethod from '../components/SetFeeMethod';
import StyledButton from '../components/StyledButton';
import { createProcessor } from '../redux/models/processors';
import { loginUser } from '../redux/models/users';
import theme from '../theme';

export default function AddProcessor({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState('');
  const [percentFee, setPercentFee] = useState('');
  const [color, setColor] = useState(theme.pink);
  const [feeMethod, setFeeMethod] = useState(false);
  const dispatch = useDispatch();

  const saveProcessor = () => {
    if(!name){
      return setErrorMsg({ field: 'name', msg: 'The name field is required' });
    }
    if(!color){
      return setErrorMsg({ field: 'color', msg: 'The color field is required' });
    }
    if(feeMethod && !percentFee){
      return setErrorMsg({ field: 'percentFee', msg: 'The fee percent field is required' });
    }

    let calcedFee = null;

    if(feeMethod && percentFee){
      calcedFee = Math.round(parseFloat(percentFee) * 100);
      if(calcedFee < 0 || calcedFee > 100 * 100){
        return setErrorMsg({ field: 'percentFee', msg: 'The fee percent field should be between 0 and 100' });
      }
    }

    setErrorMsg(null);

    (async () => {
      try {
        await dispatch(createProcessor({name, color, percentFee: calcedFee}));
        resetForm();
        navigation.navigate('Processors');
      } catch (err) {
        setErrorMsg({ msg: err.message });
      }
    })();
  };

  const resetForm = () => {
    setName('');
    setPercentFee('');
    setColor(theme.pink);
    setFeeMethod(false);
    setErrorMsg(null);
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Add Processor' navigation={navigation} />
      <ScrollView>
        <View style={styles.inner}>
          <Text style={{ ...styles.errorMsg, display: errorMsg ? 'flex' : 'none' }}>{errorMsg && errorMsg.msg}</Text>
          <LabeledTextField
            value={name}
            onChangeText={setName}
            placeholder="Processor Name"
            label="Processor Name" />
          <ColorSelector setColor={setColor} selected={color} />
          <SetFeeMethod setFeeMethod={setFeeMethod} selected={feeMethod} setPercentFee={setPercentFee} percentFee={percentFee} />
        </View>
      </ScrollView>
      <View style={styles.outerBtns}>
        <View style={styles.innerBtns}>
          <StyledButton
            onPress={() => {
              resetForm();
              navigation.navigate('Processors');
            }}
            backgroundColor={theme.blue}
            label="Cancel"
          />
        </View>
        <View style={styles.innerBtns}>
          <StyledButton
            onPress={() => saveProcessor()}
            backgroundColor={theme.green}
            label="Save"
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  errorMsg: {
    color: '#cc0000',
    textAlign: 'center',
    fontFamily: 'nunito-sans-regular',
  },
  inner: {
    padding: theme.spacing(3),
    flex: 1,
    // justifyContent: 'flex-end',
  },
  outerBtns: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 80,
    // position: 'absolute',
    // bottom: theme.spacing(1),
  },
  innerBtns: {
    flex: 1,
    padding: theme.spacing(1),
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(3),
  },
};