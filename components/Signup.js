import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');

const Signup = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const updateInputVal = (val, prop) => {
    setUserDetails({...userDetails, [prop]: [val]});
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
          res.user.updateProfile({
            displayName: userDetails.displayName[0],
          });
          console.log('User registered successfully!');
          usersCollection.add({
            Email: userDetails.email[0],
            Passowrd: userDetails.password[0],
            Username: userDetails.displayName[0],
          });
          setUserDetails({
            displayName: '',
            email: '',
            password: '',
          });
          navigation.navigate('DashboardOptions');
        })
        .catch(error => Alert.alert(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
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
        onPress={() => navigation.navigate('Login')}>
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
