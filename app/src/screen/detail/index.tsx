import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {RootStackParamList} from '../../router';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC<Props> = ({route: {params}}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.view}>
        <Text>Hello DetailScreen</Text>
        <Text>{params?.id ?? '54321'}</Text>
      </View>
    </SafeAreaView>
  );
};
