import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import NoProcessorsWidget from '../components/NoProcessorsWidget';
import StyledButton from '../components/StyledButton';
import { listProcessors, processorsSelector, removeProcessor } from '../redux/models/processors';
import theme from '../theme';

export default function Processors({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(null);
  const accounts = useSelector(processorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await onRefresh(false);
    });
    return () => unsubscribe();
  }, [selected]);

  const onRefresh = async (showRefresh = true) => {
    setRefreshing(showRefresh && true);
    await dispatch(listProcessors());
    setRefreshing(showRefresh && false);
  };

  const removeSelected = async () => {
    if (!selected) {return;}
    await dispatch(removeProcessor(selected));
    setSelected(null);
  };

  const selectProcessor = (itemId) => {
    if (selected === itemId) {
      return setSelected(null);
    }
    setSelected(itemId);
  };

  const renderProcessor = ({ item }) => {
    const sItem = selected === item.id;
    return (
      <TouchableOpacity
        style={{ ...styles.item, backgroundColor: sItem ? theme.blue : styles.item.backgroundColor }}
        onPress={() => selectProcessor(item.id)}
      >
        <View style={styles.dotWrap}>
          <View style={[styles.colorDot, {backgroundColor: item.color}]} />
        </View>
        <View style={styles.itemInner}>
          <Text style={{ ...styles.textLarge, color: sItem ? '#fff' : styles.textLarge.color }}>{item.name}</Text>
          {item.percentFee &&
            <Text style={{ ...styles.textSmall, color: sItem ? '#fff' : styles.textSmall.color }}>Fee: {(item.percentFee / 100).toFixed(2)}%</Text>
          }
        </View>
        <View style={styles.itemInnerAlign}>
          {/*<Text style={{...styles.textLarge, color: sItem ? '#fff' : styles.textLarge.color}}>{item.rating}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader label='Payment Processors' navigation={navigation} />
      {(!accounts || accounts.length === 0) && <NoProcessorsWidget navigation={navigation} />}
      {accounts && accounts.length > 0 && <>
        <FlatList
          style={styles.list}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={accounts}
          renderItem={renderProcessor}
          keyExtractor={account => account.id}
        />
        <View style={styles.outer}>
          <View style={styles.inner}>
            <StyledButton
              disabled={selected === null}
              onPress={removeSelected}
              backgroundColor={theme.blue}
              label="Remove Processor"
            />
          </View>
          <View style={styles.inner}>
            <StyledButton
              onPress={() => navigation.navigate('AddProcessor')}
              backgroundColor={theme.green}
              label="Add Processor"
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
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.lightBlue,
    padding: 20,
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
  dotWrap: {
    marginRight: theme.spacing(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  }
};