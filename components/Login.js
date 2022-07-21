import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const Login = ({route, navigation}) => {
  console.log(route);
  const [currentQuarterData, setCurrentQuarterData] = useState('Q22022');
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (route) {
      if (route.params) {
        console.log('qwerty', route.params);
        setUserDetails({
          email: [route.params.email],
          password: [route.params.password],
        }).then(() => {
          setCurrentQuarterData(route.params.currentQuarter);
          userLogin();
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const updateInputVal = (val, prop) => {
    setUserDetails({...userDetails, [prop]: [val]});
  };

  const userLogin = () => {
    if (userDetails.email[0] === '' || userDetails.password[0] === '') {
      Alert.alert('Enter details to Sign In!');
    } else {
      auth()
        .signInWithEmailAndPassword(
          userDetails.email[0],
          userDetails.password[0],
        )
        .then(res => {
          setUserDetails({
            email: '',
            password: '',
          });
          navigation.navigate('Dashboard', {
            username: res.user.displayName,
            currentQuarter: currentQuarterData,
            fromSignUp: false,
          });
        })
        .catch(error => console.log(error));
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
