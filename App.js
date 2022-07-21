import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import React from 'react';
import CurrentQuarter from './components/CurrentQuarter';
import PreviousQuarters from './components/PreviousQuarters';
import AddNewData from './components/AddNewData';
import QuarterDetails from './components/QuarterDetails';
import NewQuarterConfirmation from './components/NewQuarterConfirmation';

const Stack = createNativeStackNavigator();

export default function App() {
  return <MyStack />;
}

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Current Quarter" component={CurrentQuarter} />
        <Stack.Screen name="Previous Quarters" component={PreviousQuarters} />
        <Stack.Screen name="Add new Data" component={AddNewData} />
        <Stack.Screen name="Quarter Details" component={QuarterDetails} />
        <Stack.Screen
          name="Add a new Quarter"
          component={NewQuarterConfirmation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
