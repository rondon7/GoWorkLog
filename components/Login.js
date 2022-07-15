import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../database/firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const Login = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const updateInputVal = (val, prop) => {
        setUserDetails({...userDetails, [prop]:[val]})
    }
    const userLogin = () => {
        navigation.navigate('DashboardOptions')
        // if (userDetails.email === '' || userDetails.password === '') {
        //     Alert.alert('Enter details to Sign In!')
        // } else {
        //     firebase
        //         .auth()
        //         .signInWithEmailAndPassword(userDetails.email, userDetails.password)
        //         .then((res) => {
        //             console.log(res)
        //             console.log('User logged-in successfully!')
        //             setUserDetails({
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
              placeholder="Email"
              value={userDetails.email.toString()}
              onChangeText={(val) => updateInputVal(val, 'email')}
          />
          <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={userDetails.password.toString()}
              onChangeText={(val) => updateInputVal(val, 'password')}
              secureTextEntry={true}
          />
          <Button
              style={styles.buttonStyle}
              title="Signin"
              onPress={() => userLogin()}
          />
          <Text
              style={styles.loginText}
              onPress={() => navigation.navigate('Signup')} >
              Don't have account? Click here to signup
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


export default Login