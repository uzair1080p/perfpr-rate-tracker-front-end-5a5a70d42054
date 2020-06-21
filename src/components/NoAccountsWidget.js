import React from 'react';
import { Text, View } from 'react-native';
import theme from '../theme';
import Logo from './Logo';
import StyledButton from './StyledButton';

export default function NoAccountsWidget({ navigation }) {

  return (
    <View style={styles.noAccounts}>
      <Logo />
      <Text>Attach your first bank account to get started</Text>
      <StyledButton
        style={styles.addAccountBtn}
        onPress={() => navigation.navigate('ConnectPlaid')}
        backgroundColor={theme.green}
        label="Add Financial Account"
      />
    </View>
  );
};

const styles = {
  noAccounts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10%',
  },
  addAccountBtn: {
    padding: theme.spacing(3),
  },
};