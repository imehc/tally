import React, { useMemo } from "react";
import { View } from "react-native";
import { DefaultTheme, Text } from "react-native-paper";
import { format } from "date-fns";
import UnknowIcon from '../../assets/category/unknow.svg'
import FoodIcon from '../../assets/category/food.svg'
import PersionIcon from '../../assets/category/persion.svg'
import ShopIcon from '../../assets/category/shop.svg'
import TrafficIcon from '../../assets/category/traffic.svg'

export enum BillCategory {
  Food,
  Traffic,
  Shop,
  Persion,
}

interface Props {
  category: BillCategory;
  time: Date;
  paytType: 'disburse' | 'income';
  price: number
}

export const BillItem: React.FC<Props> = ({ category, time, paytType, price }) => {
  const date = useMemo(() => {
    try {
      return format(time, 'HH:mm');
    } catch (error) {
      // TODO: add log pkg
      console.error(error);
      return '-:-';
    }
  }, [time])

  const coin = useMemo(() => {
    if (paytType === 'disburse') {
      return '-' + price.toFixed(2);
    }
    return '+' + price.toFixed(2);
  }, [paytType, price])

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
  }, [category])

  return <View
    style={{
      height: 80,
      backgroundColor: DefaultTheme.colors.primaryContainer,
      margin: 12,
      marginBottom: 0,
      borderRadius: 8,
      paddingRight: 12,
      paddingLeft: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          {
            category === BillCategory.Food ?
              <FoodIcon width={20} height={30} color={DefaultTheme.colors.primary} /> :
              category === BillCategory.Persion ?
                <PersionIcon width={20} height={30} color={DefaultTheme.colors.primary} />
                : category === BillCategory.Shop ?
                  <ShopIcon width={20} height={30} color={DefaultTheme.colors.primary} />
                  : category === BillCategory.Traffic ?
                    <TrafficIcon width={20} height={30} color={DefaultTheme.colors.primary} />
                    : <UnknowIcon width={20} height={30} color={DefaultTheme.colors.primary} />
          }
          <Text style={{ marginLeft: 8, fontSize: 16 }}>{name}</Text>
        </View>
        <Text>{date}</Text>
      </View>
    </View>
    <Text style={{ fontSize: 20, color: paytType === "disburse" ? 'green' : "red" }}>{coin}</Text>
  </View>
}