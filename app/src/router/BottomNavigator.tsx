import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen, MineScreen, StatisticScreen} from '../screen';
import {BottomNavigation} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import {RootStackParamList} from './ScreenNavigator';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

/**
 * 页面路由
 */
export const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      safeAreaInsets={{bottom: Platform.OS === 'ios' ? 0 : undefined}}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Platform.OS === 'ios' ? 16 : undefined,
          }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }
            return null;
          }}
          // 显示文字
          // getLabelText={({route}) => {
          //   const {options} = descriptors[route.key];
          //   const label =
          //     options.tabBarLabel !== undefined
          //       ? options.tabBarLabel
          //       : options.title !== undefined
          //       ? options.title
          //       : (route as any).title;

          //   return label;
          // }}
        />
      )}>
      <Tab.Screen
        name="Bill"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Bill',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => {
            return <Icon name="calendar-today" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={StatisticScreen}
        options={{
          tabBarLabel: 'STATISTIC',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => {
            return <Icon name="chart-line" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Mine"
        component={MineScreen}
        options={{
          tabBarLabel: 'MINE',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => {
            return <Icon name="odnoklassniki" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
