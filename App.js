import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Dashboard from './src/components/Dashboard';
import CurrentQuarter from './src/components/CurrentQuarter';
import PreviousQuarters from './src/components/PreviousQuarters';
import AddNewData from './src/components/AddNewData';
import QuarterDetails from './src/components/QuarterDetails';
import NewQuarterConfirmation from './src/components/NewQuarterConfirmation';
import ErrorBoundary from './helpers/ErrorBoundary';

const Stack = createNativeStackNavigator();

export default function App() {
  return (<ErrorBoundary><MyStack /></ErrorBoundary>);
}

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} options={{
          title: 'Login',
        }} />
        <Stack.Screen name="signup" component={Signup} options={{
          headerBackVisible: false,
          title: 'Sign Up',
        }} />
        <Stack.Screen name="dashboard" component={Dashboard} options={{
          headerBackVisible: false,
          title: 'Your Dashboard',
        }} />
        <Stack.Screen name="currentQuarter" component={CurrentQuarter} options={{
          title: 'Your Current Quarter',
        }} />
        <Stack.Screen name="previousQuarters" component={PreviousQuarters} options={{
          title: 'Your Previous Quarters',
        }} />
        <Stack.Screen name="addNewData" component={AddNewData} options={{
          headerBackVisible: false,
          title: 'Add New Data',
        }} />
        <Stack.Screen name="quarterDetails" component={QuarterDetails} options={{
          title: 'Quarter Details',
        }} />
        <Stack.Screen name="addNewQuarter" component={NewQuarterConfirmation} options={{
          title: 'Start a New Quarter',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
