import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Button, DefaultTheme, Text} from 'react-native-paper';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import styles from './styles';
import {useThemeContext} from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Bill'>;

export const HomeScreen: React.FC<Props> = ({}) => {
  const isThemeDark = useThemeContext();
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        backgroundColor={DefaultTheme.colors.primary}
      />
      <View style={styles.header}>
        <View style={styles.dataWrap}>
          <Text style={styles.expense}>
            <Text style={styles.font}> 总支出：</Text>
            <Text style={styles.font2}>¥ 200</Text>
          </Text>
          <Text style={styles.income}>
            <Text style={styles.font}> 总收入：</Text>
            <Text style={styles.font2}>¥ 500</Text>
          </Text>
        </View>
        <View style={styles.typeWrap}>
          <View style={styles.left}>
            <Button style={styles.title} mode="elevated" icon="chevron-down">
              类型
            </Button>
          </View>
          <View style={styles.right}>
            <Button style={styles.title} mode="elevated" icon="chevron-down">
              2022-06
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
