import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import NoAccountsWidget from '../components/NoAccountsWidget';
import StyledButton from '../components/StyledButton';
import { accountsSelector, listAccounts, removeAccount } from '../redux/models/accounts';
import theme from '../theme';

export default function Accounts({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(null);
  const accounts = useSelector(accountsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await onRefresh(false);
    });
    return () => unsubscribe();
  }, [selected]);

  const onRefresh = async (showRefresh = true) => {
    setRefreshing(showRefresh && true);
    await dispatch(listAccounts());
    setRefreshing(showRefresh && false);
  };

  const removeSelected = async () => {
    if (!selected) {return;}
    await dispatch(removeAccount(selected));
    setSelected(null);
  };

  const selectAccount = (itemId) => {
    if (selected === itemId) {
      return setSelected(null);
    }
    setSelected(itemId);
  };

  const renderAccountIcon = (item) => {
    return (
      <View style={[styles.accountIcon, item.institutionColor ? {backgroundColor: item.institutionColor}: null]}>
        {item.institutionLogo && <Image source={{uri:`data:image/png;base64,${item.institutionLogo}`}} style={styles.accountLogo} />}
      </View>
    )
  };

  const renderAccount = ({ item }) => {
    const sItem = selected === item.id;
    return (
      <View style={styles.wrap}>
        {renderAccountIcon(item)}
        <TouchableOpacity
          style={{ ...styles.item, backgroundColor: sItem ? theme.blue : styles.item.backgroundColor }}
          onPress={() => selectAccount(item.id)}
        >
          <View style={styles.itemInner}>
            <Text style={{ ...styles.textLarge, color: sItem ? '#fff' : styles.textLarge.color }}>{item.name}</Text>
            <Text style={{ ...styles.textSmall, color: sItem ? '#fff' : styles.textSmall.color }}>XXXXX{item.last4}</Text>
          </View>
          {/*<View style={styles.itemInnerAlign}>
            <Text style={{...styles.textLarge, color: sItem ? '#fff' : styles.textLarge.color}}>{item.rating}</Text>
          </View>*/}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Financial Accounts' navigation={navigation} />
      {(!accounts || accounts.length === 0) && <NoAccountsWidget navigation={navigation} />}
      {accounts && accounts.length > 0 && <>
        <FlatList
          style={styles.list}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={accounts}
          renderItem={renderAccount}
          keyExtractor={account => account.id}
        />
        <View style={styles.outer}>
          <View style={styles.inner}>
            <StyledButton
              disabled={selected === null}
              onPress={removeSelected}
              backgroundColor={theme.blue}
              label="Remove Account"
            />
          </View>
          <View style={styles.inner}>
            <StyledButton
              onPress={() => navigation.navigate('ConnectPlaid')}
              backgroundColor={theme.green}
              label="Add Account"
            />
          </View>
        </View>
      </>}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
  list: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 80,
  },
  inner: {
    flex: 1,
    padding: theme.spacing(1),
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(3),
  },
  wrap: {
    position: 'relative',
  },
  item: {
    marginHorizontal: theme.spacing(2),
    marginTop: theme.spacing(2),
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.lightBlue,
    paddingLeft: theme.spacing(5),
    paddingVertical: theme.spacing(2),
    marginVertical: theme.spacing(1),
    borderRadius: theme.spacing(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex: 1,
  },
  itemInner: {
    flex: 1,
  },
  itemInnerAlign: {
    flex: 1,
    alignItems: 'center',
  },
  textLarge: {
    flex: 1,
    fontSize: 18,
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-bold',
    fontWeight: 'bold'
  },
  textSmall: {
    flex: 1,
    fontSize: 12,
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-bold',
  },
  accountIcon: {
    position: 'absolute',
    zIndex: 10,
    width: 50,
    height: 50,
    backgroundColor: theme.backgroundColor,
    borderRadius: theme.spacing(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flex: 1,
    overflow: 'hidden'
  },
  accountLogo: {
    position: 'relative',
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
};