import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/router';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export const DetailScreen: React.FC<Props> = ({route: {params}}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1">
        <Text>Hello DetailScreen</Text>
        <Text>{params?.id ?? '54321'}</Text>
      </View>
    </SafeAreaView>
  );
};
