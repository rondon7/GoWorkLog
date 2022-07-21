import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const userQuartersMappingCollection = db.collection('UserQuarterMapping');
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');

const NewQuarterConfirmation = ({route, navigation}) => {
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    if (route) {
      console.log(route.params);
      setRouteParams({
        username: route.params.username,
        currentQuarter: route.params.currentQuarter,
      });
    }
  }, [route]);

  const getNextQuarter = currentQ => {
    if (currentQ.charAt(1) === '4') {
      let year = parseInt(currentQ.slice(2), 10) + 1;
      console.log('Q1' + year);
      return 'Q1' + year;
    } else {
      let quarterNo = parseInt(currentQ.charAt(1), 10) + 1;
      console.log('Q' + quarterNo + currentQ.slice(2));
      return 'Q' + quarterNo + currentQ.slice(2);
    }
  };

  const handleNewQuarter = () => {
    if (Object.keys(routeParams).length > 0) {
      console.log('inside func', routeParams);
      userQuartersMappingCollection
        .doc(routeParams.username + '' + routeParams.currentQuarter)
        .update({isActive: false})
        .then(() => {
          const tempNewQuarter = getNextQuarter(routeParams.currentQuarter);
          const userDocRef = usersCollection.doc(routeParams.username);
          const quarterDocRef = quartersCollection.doc(tempNewQuarter);
          userQuartersMappingCollection
            .doc(routeParams.username + '' + tempNewQuarter)
            .set({
              User: userDocRef,
              Quarter: quarterDocRef,
              isActive: true,
            })
            .then(() => {
              usersCollection
                .doc(routeParams.username)
                .get()
                .then(doc => {
                  console.log('gdcvgvbdcgvdc', doc);
                  navigation.navigate('Login', {
                    email: doc.data().Email,
                    password: doc.data().Password,
                    currentQuarter: tempNewQuarter,
                  });
                });
            });
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.questionStyle}>
        Want to Start a New Quarter and Archive Current One?
      </Text>
      <View style={styles.spacingStyle}>
        <Button
          style={styles.buttonStyle}
          title="Yes"
          onPress={() => handleNewQuarter()}
        />
      </View>
      <View style={styles.spacingStyle}>
        <Button
          style={styles.buttonStyle}
          title="Not Now"
          onPress={() => {
            navigation.navigate('Dashboard', {
              username: route.params.username,
              currentQuarter: route.params.currentQuarter,
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  questionStyle: {
    textAlign: 'center',
  },
  spacingStyle: {
    marginBottom: 50,
    marginTop: 25,
  },
  buttonStyle: {
    color: '#3740FE',
  },
});

export default NewQuarterConfirmation;
