import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Button, Text, TouchableRipple} from 'react-native-paper';
import {useAuthContext} from '../../provider';
import {RootStackParamList} from '../../router';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Statistic'>;

export const StatisticScreen: React.FC<Props> = ({navigation}) => {
  const {removeAccessToken, accessToken} = useAuthContext();
  return (
    <View style={styles.view}>
      <Text>Hello StatisticScreen</Text>
      <TouchableRipple
        onPress={() => navigation.navigate('Detail', {id: '12aaa345'})}
        rippleColor="rgba(0, 0, 0, .32)">
        <Button>go to details</Button>
      </TouchableRipple>
      <Button mode="contained" onPress={() => removeAccessToken()}>
        退出登录
      </Button>
      <Button mode="contained">{accessToken}</Button>
    </View>
  );
};
