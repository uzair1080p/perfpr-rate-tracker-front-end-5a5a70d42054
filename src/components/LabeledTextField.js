import React from 'react';
import { Text, TextInput, View } from 'react-native';
import theme from '../theme';

export default function LabeledTextField({
  value, secureTextEntry, keyboardType, multiline, numberOfLines,
  autoCompleteType, onChangeText, placeholder, label, textAlignVertical,
  textContentType, inputStyle, ...props
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        textAlignVertical={textAlignVertical}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[styles.textField, inputStyle]}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCompleteType={autoCompleteType}
        keyboardType={keyboardType || 'default'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        textContentType={textContentType}
        label={label}
        {...props}
      />
    </View>
  );
};

const styles = {
  container: {
    marginTop: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(1),
    fontFamily: 'nunito-sans-regular',
    fontSize: 14,
    color: theme.gray,
  },
  textField: {
    fontFamily: 'nunito-sans-regular',
    backgroundColor: '#FFF',
    height: 50,
    borderRadius: 5,
    paddingLeft: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    color: '#000',
  },
};