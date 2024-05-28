import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailScreen, LoginScreen, RecordScreen} from '~/screen';
import {BottomNavigator} from './BottomNavigator';
import {NavigationBar} from '~/components';
import {useAccessToken} from '~/provider';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Bill: undefined;
  Statistic: undefined;
  Mine: undefined;
  Detail: {id: string} | undefined;
  Record: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ScreenNavigator: React.FC = () => {
  const accessToken = useAccessToken();
  accessToken;

  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{header: NavigationBar}}>
      {!accessToken ? (
        <React.Fragment>
          <Stack.Screen
            name="Home"
            component={BottomNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Record" component={RecordScreen} />
        </React.Fragment>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};
