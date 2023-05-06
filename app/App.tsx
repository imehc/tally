import React from 'react';
import {HomeScreen, MineScreen} from './src/screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

/**
 * 路由及其携带的参数
 */
export type RootStackParamList = {
  Home: undefined;
  Mine: undefined;
  Feed: {sort: 'latest' | 'top'} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={'lightblue'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'lightblue',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="Mine" component={MineScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default App;
