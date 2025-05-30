import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, DefaultTheme, Text} from 'react-native-paper';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import {BillCategory, BillItem, TallyStatusBar} from '~/components';
import {useThemeContext} from '~/theme';
import {RootStackParamList} from '~/router';
import ShouruIcon from '~/assets/shouru.svg';
import ZhichuIcon from '~/assets/zhichu.svg';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Bill'>;

export const HomeScreen: React.FC<Props> = ({}) => {
  const isThemeDark = useThemeContext();
  return (
    <View style={styles.container}>
      <TallyStatusBar
        backgroundColor={DefaultTheme.colors.primary}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
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
      <View style={styles.subHeader}>
        <DateStyled> 2021-06-11 </DateStyled>
        <View style={styles.subHeaderItem}>
          <View style={styles.subHeaderItem}>
            <ZhichuIcon
              width={30}
              height={30}
              color={DefaultTheme.colors.primary}
            />
            <Text>￥81.00</Text>
          </View>
          <View style={styles.subHeaderItem} className="ml-2">
            <ShouruIcon
              width={30}
              height={30}
              color={DefaultTheme.colors.primary}
            />
            <Text>￥81.00</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {[...new Array(20)].map((v, i) => (
          <BillItem
            key={i}
            category={
              i % 2 === 0
                ? BillCategory.Food
                : i % 3 === 0
                ? BillCategory.Shop
                : i % 7 === 0
                ? BillCategory.Traffic
                : BillCategory.Persion
            }
            time={new Date()}
            payType={Math.random() < 0.5 ? 'disburse' : 'income'}
            price={Math.random() * i + 6 + 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const DateStyled = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
