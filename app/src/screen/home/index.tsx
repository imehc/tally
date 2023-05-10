import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Bill'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? '#333333' : '#ffffff',
  // };
  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    <View style={styles.view}>
      <Text style={styles.text}>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Mine')}>
        Go to Mine
      </Button>
      <Button onPress={() => navigation.setOptions({title: 'Updated!'})}>
        Update the title
      </Button>
    </View>
    // </SafeAreaView>
  );
};
