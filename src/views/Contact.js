import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import LabeledTextField from '../components/LabeledTextField';
import StyledButton from '../components/StyledButton';
import theme from '../theme';

export default function Contact({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Contact Us' navigation={navigation} />
      <ScrollView>
        <View style={styles.inner}>
          <Text style={styles.title}>Have a question?</Text>
          <Text style={styles.details}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Text>
          <LabeledTextField
            value={name}
            onChangeText={text => setName(text)}
            autoCompleteType='name'
            placeholder="Enter your name"
            label="Name" />
          <LabeledTextField
            value={email}
            onChangeText={text => setEmail(text.trim())}
            autoCompleteType='email'
            keyboardType='email-address'
            placeholder="Enter your email address"
            label="Email Address" />
          <LabeledTextField
            inputStyle={styles.largeField}
            textAlignVertical='top'
            multiline
            numberOfLines={10}
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Enter your message"
            label="Message" />
          <StyledButton
            onPress={() => send()}
            backgroundColor={theme.blue}
            label="Send"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  title: {
    fontSize: 24,
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-bold',
  },
  details: {
    color: theme.gray,
    fontSize: 14,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontFamily: 'nunito-sans-regular',
  },
  largeField: {
    height: 200,
    paddingTop: theme.spacing(1),
  },
};