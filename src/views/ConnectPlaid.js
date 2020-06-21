import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import config from '../config';
import { usersSelector } from '../redux/models/users';
import { APIWrapper } from '../services/apiwrapper';
import theme from '../theme';

export default function ConnectPlaid({ navigation }) {
  const [unique, setUnique] = useState(Math.random());
  const user = useSelector(usersSelector);
  let unsubscribe = [];

  useEffect(() => {
    unsubscribe.push(navigation.addListener('focus', () => {
      setUnique(Math.random());
    }));
    return () => unsubscribe.forEach(u => u());
  }, []);

  const onMessage = async (msg) => {
    if (msg.eventName === 'EXIT') {
      exit();
    }
    const m = msg.metadata;
    if (m && m.public_token) {
      try {
        const body = {
          accountId: m.account.id,
          name: m.account.name,
          last4: m.account.mask,
          institutionId: m.institution.institution_id,
          publicToken: m.public_token,
        };
        await APIWrapper.createAccount(body);
        exit();
      } catch (err) {
        //TODO - show error modal
        console.log('error setting up account', err);
        exit();
      }
    }
  };

  const exit = () => {
    navigation.goBack();
  };

  if (!user) { return <Loading />; }

  return (
    <View style={styles.container} key={unique}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <PlaidAuthenticator
        onMessage={onMessage}
        publicKey={config.PLAID_PUBLIC_KEY}
        env={config.PLAID_ENV}
        product="transactions"
        clientName="Rate Tracker"
        selectAccount={true}
        webhook={`${config.API_URL}/webhook/${user.id}`}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
};