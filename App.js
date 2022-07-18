import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import DashboardOptions from './components/DashboardOptions';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return <MyStack />;
}

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="DashboardOptions"
          component={DashboardOptions}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
