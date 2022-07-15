import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../database/firebase';
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Signup = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState({
        displayName:'',
        email: '',
        password: ''
    })
    const updateInputVal = (val, prop) => {
        setUserDetails({ ...userDetails, [prop]: [val] })
    }
    const registerUser = () => {
        navigation.navigate('DashboardOptions')
        // if (userDetails.email === '' || userDetails.password === '') {
        //     Alert.alert('Enter details to Sign Up!')
        // } else {
        //     firebase
        //         .auth()
        //         .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
        //         .then((res) => {
        //             res.user.updateProfile({
        //                 displayName: userDetails.displayName
        //             })
        //             console.log('User registered successfully!')
        //             setUserDetails({
        //                 displayName: '',
        //                 email: '',
        //                 password: ''
        //             })
        //             navigation.navigate('Dashboard')
        //         })
        //         .catch(error => setUserDetails({ errorMessage: error.message }))
        // }
    }
  return (
      <View style={styles.container}>
          <TextInput
              style={styles.inputStyle}
              placeholder="Name"
              value={userDetails.displayName.toString()}
              onChangeText={(val) => updateInputVal(val, 'displayName')}
          />
          <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={userDetails.email.toString()}
              onChangeText={(val) => updateInputVal(val, 'email')}
          />
          <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={userDetails.password.toString()}
              onChangeText={(val) => updateInputVal(val, 'password')}
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
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    buttonStyle: {
        color: "#3740FE",
        borderRadius: 50,
    }
});

export default Signup