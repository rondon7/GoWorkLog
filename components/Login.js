import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const Login = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const updateInputVal = (val, prop) => {
    setUserDetails({...userDetails, [prop]: [val]});
  };

  const userLogin = () => {
    console.log(userDetails, userDetails.email[0], userDetails.password[0]);
    if (userDetails.email[0] === '' || userDetails.password[0] === '') {
      Alert.alert('Enter details to Sign In!');
    } else {
      auth()
        .signInWithEmailAndPassword(
          userDetails.email[0],
          userDetails.password[0],
        )
        .then(res => {
          console.log(res);
          console.log('User logged-in successfully!');
          setUserDetails({
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
        style={styles.buttonStyle}
        title="Signin"
        onPress={() => userLogin()}
      />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have account? Click here to signup
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

export default Login;
