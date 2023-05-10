import React from 'react';
import {View} from 'react-native';
import {TouchableRipple, Switch, Text, Button} from 'react-native-paper';
import styles from './styles';
import {useThemeContext} from '../../theme';

export const MineScreen: React.FC = () => {
  const {toggleTheme, isThemeDark} = useThemeContext();
  return (
    <View style={styles.view}>
      <Switch value={isThemeDark} onValueChange={toggleTheme} />

      <TouchableRipple
        onPress={() => console.log('Pressed')}
        rippleColor="rgba(0, 0, 0, .32)">
        <Text>Press anywhere</Text>
      </TouchableRipple>
      <Button icon="camera">Press me</Button>
    </View>
  );
};
