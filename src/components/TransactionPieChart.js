import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function TransactionPieChart({ transactions, donutStyle }) {

  const getCosts = (transactions, name) => {
    return transactions.filter(tx => tx.processor && tx.processor.name === name).reduce((acc, tx) => {
      const amt = Math.abs(tx.amount / 100);
      const beforeFee = Math.abs(tx.beforeFeeAmount / 100);
      return acc + (beforeFee - amt);
    }, 0);
  };

  const chartData = [
    // {
    //   name: 'Stripe',
    //   amount: getCosts(transactions, 'Stripe'),
    //   color: theme.matteBlue,
    //   legendFontColor: theme.matteBlue,
    //   legendFontSize: 15,
    // },
    // {
    //   name: 'Paypal',
    //   amount: getCosts(transactions, 'Stripe') > 0 ? 10 : 0,
    //   color: theme.blue,
    //   legendFontColor: theme.blue,
    //   legendFontSize: 15,
    // },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <>
      {transactions && transactions.length && <View style={styles.chartWrap}>
        <PieChart
          data={chartData}
          width={Dimensions.get('screen').width * 0.9}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        <View style={[styles.donut, donutStyle]} />
      </View>}
    </>
  );
};

const styles = {
  chartWrap: {
    position: 'relative',
  },
  donut: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 50,
    left: 48,
    borderRadius: 60,
  },
};