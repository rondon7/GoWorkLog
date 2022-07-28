import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');

const Signup = ({ navigation }) => {

  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const updateInputVal = (val, prop) => {
    setUserDetails({ ...userDetails, [prop]: [val] });
  };

  const registerUser = () => {
    if (userDetails.email === '' || userDetails.password === '') {
      Alert.alert('Enter details to Sign Up!');
    } else {
      auth()
        .createUserWithEmailAndPassword(
          userDetails.email[0],
          userDetails.password[0],
        )
        .then(res => {
          const UID = res.user.uid;
          console.log(UID);
          AsyncStorage.setItem('curUser', UID);
          console.log(
            'User ',
            userDetails.displayName[0],
            ' registered successfully!',
          );
          const quarterDocRef = quartersCollection.doc(currentYear + 'Q' + currentQuarterNo);
          usersCollection
            .doc(UID + '')
            .set({
              Username: userDetails.displayName[0],
              InitialActiveQuarter: quarterDocRef,
            })
            .then(() => {
              setUserDetails({
                displayName: '',
                email: '',
                password: '',
              });
              navigation.navigate('dashboard', {
                userUid: UID,
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Username"
        value={userDetails.displayName}
        onChangeText={val => updateInputVal(val, 'displayName')}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={userDetails.email}
        onChangeText={val => updateInputVal(val, 'email')}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={userDetails.password}
        onChangeText={val => updateInputVal(val, 'password')}
        secureTextEntry={true}
      />
      <Button
        style={styles.loginText}
        title="Signup"
        onPress={() => registerUser()}
      />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('login')}>
        Already Registered? Click here to login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  buttonStyle: {
    color: '#3740FE',
    borderRadius: 50,
  },
});

export default Signup;
