import React from 'react';
import {View, Text, Button} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

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
      <Button title="Go to Mine" onPress={() => navigation.navigate('Mine')} />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({title: 'Updated!'})}
      />
    </View>
    // </SafeAreaView>
  );
};
