import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {RootStackParamList} from '../../router';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC<Props> = ({route: {params}}) => {
  return (
    <Appbar.Header>
      <View style={styles.view}>
        <Text>Hello DetailScreen</Text>
        <Text>{params?.id ?? '54321'}</Text>
      </View>
    </Appbar.Header>
  );
};
