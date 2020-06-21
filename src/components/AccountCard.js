import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import CloseIcon from '../../assets/close.png';
import OpenIcon from '../../assets/open.png';
import theme from '../theme';
import IconButton from './IconButton';
import TransactionPieChart from './TransactionPieChart';

export default function AccountCard({ account, idx, last }) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [open, setOpen] = useState(idx === 0);
  const [slideTarget, setSlideTarget] = useState((!account.transactions || account.transactions.length === 0) ? 100 : 300);
  const slideValue = useRef(new Animated.Value(idx === 0 ? slideTarget : 0)).current;
  const isEven = idx % 2 === 0;

  useEffect(() => {
    if (!firstLoad && open) {
      Animated.timing(slideValue, {
        toValue: slideTarget,
        duration: 200,
      }).start();
    } else if (!firstLoad && !open) {
      Animated.timing(slideValue, {
        toValue: 0,
        duration: 200,
      }).start();
    }
    setFirstLoad(false);
    setSlideTarget((!account.transactions || account.transactions.length === 0) ? 100 : 300);
  }, [open, account]);

  const trimStr = (str) => {
    return str.length > 18 ? `${str.substring(0, 16)}...` : str;
  };

  const renderTransactions = () => {
    const txs = account.transactions;
    const data = txs.map(tx => {
      const amount = `$${Math.abs(tx.amount / 100).toFixed(2)}`;
      const fee = `$${Math.abs((tx.beforeFeeAmount - tx.amount) / 100).toFixed(2)}`;
      return [trimStr(tx.name), amount, fee];
    });
    const heightArr = data.map(d => theme.spacing(3));
    return (
      <Table style={{ height: heightArr.length * theme.spacing(4) }}>
        <Row data={['Name', 'Amount', 'Fee']} flexArr={[3, 2, 1]} textStyle={styles.tableHead} />
        <Rows data={data} flexArr={[3, 2, 1]} heightArr={heightArr} textStyle={styles.tableRow} />
      </Table>
    );
  };

  const transactions = [];

  return (
    <View style={[styles.container, isEven ? styles.even : styles.odd, last && isEven ? styles.lastEven : {}]}>
      <View style={[styles.inner, !isEven ? styles.even : styles.odd, last ? styles.last : {}]}>
        <View style={styles.header}>
          <Text style={styles.title}>{account.name} XXXX-{account.last4}</Text>
          <IconButton icon={open ? CloseIcon : OpenIcon} onPress={() => setOpen(!open)} width={28} height={28} />
        </View>
        <Animated.View style={{ ...styles.animView, height: slideValue }}>
          {(!transactions || transactions.length === 0) &&
          <Text style={styles.loading}>We're loading your account data. Pull down to refresh or check back later once
            transactions are available.</Text>
          }
          {transactions && transactions.length > 0 && <>
            {renderTransactions()}
            <TransactionPieChart transactions={transactions} donutStyle={isEven ? styles.odd : styles.even} />
          </>}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    top: -1,
  },
  inner: {
    borderTopLeftRadius: theme.spacing(3),
    borderTopRightRadius: theme.spacing(3),
    padding: theme.spacing(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  odd: {
    backgroundColor: theme.backgroundColor,
  },
  even: {
    backgroundColor: theme.lightBlue,
  },
  last: {
    borderBottomLeftRadius: theme.spacing(3),
    borderBottomRightRadius: theme.spacing(3),
  },
  lastEven: {
    borderBottomLeftRadius: theme.spacing(3),
    borderBottomRightRadius: theme.spacing(3),
  },
  header: {
    padding: theme.spacing(1),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.matteBlue,
    fontFamily: 'nunito-sans-bold',
  },
  tableHead: {
    color: theme.gray,
    fontFamily: 'nunito-sans-regular',
  },
  tableRow: {
    fontFamily: 'nunito-sans-regular',
  },
  animView: {
    overflow: 'hidden',
  },
  loading: {
    textAlign: 'center',
    color: theme.matteBlue,
    top: 20,
    fontFamily: 'nunito-sans-regular',
  },
};