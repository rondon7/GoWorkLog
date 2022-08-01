import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from './Header';
const db = firestore();
const usersCollection = db.collection('Users');

const Dashboard = ({ route, navigation }) => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (route && route.params.userUid) {
      const UID = route.params.userUid + '';
      usersCollection
        .doc(UID)
        .get()
        .then(doc => {
          setUserName(doc.data().Username);
        });
    }
  }, [route]);

  return (
    <View style={styles.ButtonListStyle}>
      <Header userName={userName} navigation={navigation} />
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.CurrentButtonStyle]}
        onPress={() => {
          navigation.navigate('currentQuarter', {
            userUid: route.params.userUid,
          });
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Current Quarter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.PreviousButtonStyle]}
        onPress={() => {
          navigation.navigate('previousQuarters', {
            userUid: route.params.userUid,
          });
        }}>
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Previous Quarters</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 50,
    alignContent: 'center',
    borderRadius: 18,
  },
  CurrentButtonStyle: {
    backgroundColor: 'cornflowerblue',
  },
  PreviousButtonStyle: {
    backgroundColor: 'darkturquoise',
  },
  NewButtonStyle: {
    backgroundColor: 'deepskyblue',
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
