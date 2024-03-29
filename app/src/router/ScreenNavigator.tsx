import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigator} from './BottomNavigator';
import {DetailScreen, LoginScreen} from '../screen';
import {NavigationBar} from '../components';
import {useAccessToken} from '../provider';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Bill: undefined;
  Statistic: undefined;
  Mine: undefined;
  Detail: {id: string} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ScreenNavigator: React.FC = () => {
  const accessToken = useAccessToken();
  accessToken;

  return (
    <Stack.Navigator
      // initialRouteName="Home"
      // eslint-disable-next-line react/no-unstable-nested-components
      screenOptions={{header: props => <NavigationBar {...props} />}}>
      {accessToken ? (
        <React.Fragment>
          <Stack.Screen
            name="Home"
            component={BottomNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
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
