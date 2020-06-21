import React, { useEffect, useState } from 'react';
import { BackHandler, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AccountCard from '../components/AccountCard';
import CustomHeader from '../components/CustomHeader';
import InfoAtAGlanceWidget from '../components/InfoAtAGlanceWidget';
import Loading from '../components/Loading';
import NoAccountsWidget from '../components/NoAccountsWidget';
import OverallStatsWidget from '../components/OverallStatsWidget';
import RatingChart from '../components/RatingChart';
import StyledButton from '../components/StyledButton';
import { accountsSelector, listAccounts } from '../redux/models/accounts';
import { usersSelector } from '../redux/models/users';
import theme from '../theme';

export default function Dashboard({ route, navigation }) {
  const [unique, setUnique] = useState(Math.random());
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector(usersSelector);
  const accounts = useSelector(accountsSelector);
  const dispatch = useDispatch();
  let unsubscribe = [];

  useEffect(() => {
    onRefresh(false);
    unsubscribe.push(navigation.addListener('focus', async () => {
      setUnique(Math.random());
      await onRefresh(false);
    }));
    const backHandle = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });

    unsubscribe.push(() => backHandle.remove());
    return () => unsubscribe.forEach(u => u());
  }, []);

  const onRefresh = async (showRefresh = true) => {
    setRefreshing(showRefresh && true);
    await dispatch(listAccounts());
    setRefreshing(showRefresh && false);
  };

  if (!accounts) { return <Loading />; }

  const renderAccountCards = () => {
    return accounts.map((account, idx) => <AccountCard
      key={account.id}
      account={account}
      idx={idx}
      last={idx === accounts.length - 1}
    />);
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Dashboard' navigation={navigation} key={unique} />
      {(!accounts || accounts.length === 0) && <NoAccountsWidget navigation={navigation} />}
      {accounts && accounts.length > 0 && <>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <RatingChart rating={user.rating} />
          <View style={styles.inner}>
            <InfoAtAGlanceWidget
              navigation={navigation}
              averageFeePercent={user.averageFeePercent}
              // totalFees={feeTotal}
              // accountsWithTransactions={accountsWithTransactions}
            />
            <OverallStatsWidget
              totalIncome={user.totalIncome}
              totalFees={user.totalFees}
            />
            {renderAccountCards()}
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Want better rates?</Text>
              <StyledButton
                style={styles.addAccountBtn}
                onPress={() => navigation.navigate('Contact')}
                backgroundColor={theme.green}
                label="Contact Us"
              />
            </View>
          </View>
        </ScrollView>
      </>}
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
  },
  cta: {
    flex: 1,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(12),
  },
  ctaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.matteBlue,
    textAlign: 'center',
    paddingTop: 30,
    fontFamily: 'nunito-sans-bold',
  },
  contactBtn: {
    padding: theme.spacing(3),
  },
};