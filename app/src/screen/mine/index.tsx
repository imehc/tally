import React from 'react';
import {View} from 'react-native';
import {TouchableRipple, Switch, Text, Button} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useThemeContext} from '~/theme';
import {RootStackParamList} from '~/router';
import styles from './styles';

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
      {/* issue: https://github.com/marklawlor/nativewind/issues/872 */}
      <Text className="text-orange-600 bg-sky-500">Hello, World!</Text>
    </View>
  );
};
