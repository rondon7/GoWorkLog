import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CurrentQuarter from './CurrentQuarter';
import PreviousQuarters from './PreviousQuarters';
import AddNewQuarter from './AddNewQuarter';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const DashboardOptions = ({props}) => {
  console.log({props});
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Current Quarter" component={CurrentQuarter} />
        <Stack.Screen name="Previous Quarters" component={PreviousQuarters} />
        <Stack.Screen name="Add a new Quarter" component={AddNewQuarter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.ButtonListStyle}>
      <View style={styles.container}>
        <Text>Welcome User</Text>
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
          }}>
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.CurrentButtonStyle]}
        onPress={() => {
          navigation.navigate('Current Quarter');
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Current Quarter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.PreviousButtonStyle]}
        onPress={() => {
          navigation.navigate('Previous Quarters');
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Previous Quarters</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.NewButtonStyle]}
        onPress={() => {
          navigation.navigate('Add a new Quarter');
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Add a New Quarter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderRadius: 15,
  },
  ButtonListStyle: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  ButtonStyle: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    padding: 10,
    alignContent: 'center',
    borderRadius: 75,
  },
  CurrentButtonStyle: {
    backgroundColor: 'cornflowerblue',
  },
  PreviousButtonStyle: {
    backgroundColor: 'forestgreen',
  },
  NewButtonStyle: {
    backgroundColor: 'red',
    color: 'white',
  },
  ButtonTextViewStyle: {
    alignContent: 'center',
    marginTop: 65,
  },
  ButtonTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'white',
  },
});

export default DashboardOptions;
