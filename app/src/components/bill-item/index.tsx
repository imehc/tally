import React, {useMemo} from 'react';
import {View} from 'react-native';
import {DefaultTheme, Text} from 'react-native-paper';
import {format} from 'date-fns';
import styled from 'styled-components/native';
import UnknowIcon from '~/assets/category/unknow.svg';
import FoodIcon from '~/assets/category/food.svg';
import PersionIcon from '~/assets/category/persion.svg';
import ShopIcon from '~/assets/category/shop.svg';
import TrafficIcon from '~/assets/category/traffic.svg';

export enum BillCategory {
  Food,
  Traffic,
  Shop,
  Persion,
}

interface Props {
  category: BillCategory;
  time: Date;
  payType: 'disburse' | 'income';
  price: number;
}

export const BillItem: React.FC<Props> = ({category, time, payType, price}) => {
  const date = useMemo(() => {
    try {
      return format(time, 'HH:mm');
    } catch (error) {
      // TODO: add log pkg
      console.error(error);
      return '-:-';
    }
  }, [time]);

  const coin = useMemo(() => {
    if (payType === 'disburse') {
      return '-' + price.toFixed(2);
    }
    return '+' + price.toFixed(2);
  }, [payType, price]);

  const name = useMemo(() => {
    switch (category) {
      case BillCategory.Food:
        return '餐饮';
      case BillCategory.Persion:
        return '人情';
      case BillCategory.Shop:
        return '购物';
      case BillCategory.Traffic:
        return '交通';
      default:
        return '未知';
    }
  }, [category]);

  return (
    <Container bg={DefaultTheme.colors.primaryContainer}>
      <View className="flex-row items-center justify-around">
        <View className="items-start justify-evenly">
          <View className="flex-row items-center justify-start">
            {category === BillCategory.Food ? (
              <FoodIcon
                width={20}
                height={30}
                color={DefaultTheme.colors.primary}
              />
            ) : category === BillCategory.Persion ? (
              <PersionIcon
                width={20}
                height={30}
                color={DefaultTheme.colors.primary}
              />
            ) : category === BillCategory.Shop ? (
              <ShopIcon
                width={20}
                height={30}
                color={DefaultTheme.colors.primary}
              />
            ) : category === BillCategory.Traffic ? (
              <TrafficIcon
                width={20}
                height={30}
                color={DefaultTheme.colors.primary}
              />
            ) : (
              <UnknowIcon
                width={20}
                height={30}
                color={DefaultTheme.colors.primary}
              />
            )}
            <CategoryName>{name}</CategoryName>
          </View>
          <Text>{date}</Text>
        </View>
      </View>
      <Amount type={payType}>{coin}</Amount>
    </Container>
  );
};

const Container = styled.View<{bg: string}>`
  height: 80px;
  background-color: ${props => props.bg};
  margin: 12px;
  margin-bottom: 0;
  border-radius: 8px;
  padding-right: 12px;
  padding-left: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CategoryName = styled.Text`
  margin-left: 8px;
  font-size: 16px;
`;

const Amount = styled.Text<{type: Props['payType']}>`
  font-size: 20px;
  color: ${props => (props.type === 'disburse' ? 'green' : 'red')};
`;
