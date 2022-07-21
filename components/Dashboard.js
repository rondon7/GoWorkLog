import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');
const userQuartersMappingCollection = db.collection('UserQuarterMapping');
const Dashboard = ({route, navigation}) => {
  useEffect(() => {
    if (route) {
      if (route.params.fromSignUp) {
        usersCollection
          .doc(route.params.username)
          .get()
          .then(doc => {
            const userDocRef = usersCollection.doc(doc.id);
            quartersCollection
              .doc(route.params.currentQuarter)
              .get()
              .then(doc1 => {
                const quarterDocRef = quartersCollection.doc(doc1.id);
                userQuartersMappingCollection
                  .doc(route.params.username + '' + route.params.currentQuarter)
                  .set({
                    User: userDocRef,
                    Quarter: quarterDocRef,
                    isActive: true,
                  })
                  .then(() => {
                    console.log('Success');
                  })
                  .catch(error => console.log(error));
              });
          });
      }
    }
  }, [route]);
  return (
    <View style={styles.ButtonListStyle}>
      <View style={styles.header}>
        <Text>
          Welcome, &nbsp;
          <Text style={styles.usernameStyle}>{route.params.username}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
                navigation.navigate('Login');
              })
              .catch(error => Alert.alert(error.message));
          }}>
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.CurrentButtonStyle]}
        onPress={() => {
          navigation.navigate('Current Quarter', {
            username: route.params.username,
            currentQuarter: route.params.currentQuarter,
          });
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Current Quarter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.PreviousButtonStyle]}
        onPress={() => {
          navigation.navigate('Previous Quarters', {
            username: route.params.username,
            currentQuarter: route.params.currentQuarter,
          });
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Previous Quarters</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.NewButtonStyle]}
        onPress={() => {
          navigation.navigate('Add a new Quarter', {
            username: route.params.username,
            currentQuarter: route.params.currentQuarter,
          });
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Start a New Quarter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row',
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 15,
  },
  usernameStyle: {
    fontWeight: '800',
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
    borderRadius: 18,
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

export default Dashboard;
