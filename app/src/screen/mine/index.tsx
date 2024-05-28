import React from 'react';
import {View} from 'react-native';
import {TouchableRipple, Switch, Text, Button} from 'react-native-paper';
import styles from './styles';
import {useThemeContext} from '../../theme';
import {RootStackParamList} from '../../router';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Mine'>;

export const MineScreen: React.FC<Props> = ({navigation}) => {
  const {toggleTheme, isThemeDark} = useThemeContext();
  return (
    <View style={styles.view}>
      <Switch value={isThemeDark} onValueChange={toggleTheme} />

      <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)">
        <Text>Press anywhere</Text>
      </TouchableRipple>
      {/* https://oblador.github.io/react-native-vector-icons/#MaterialCommunityIcons */}
      <Button icon="camera">Press me</Button>
      <Button
        icon="apple-keyboard-option"
        onPress={() => navigation.navigate('Record')}>
        测试手势系统
      </Button>
    </View>
  );
};
