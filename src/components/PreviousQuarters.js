import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Card } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import Header from './Header';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;
const initialYear = '2022';
const initialQuarterNo = '1';

const PreviousQuarters = ({ route, navigation }) => {
  
  const [previousQuartersTitles, setPreviousQuartersTitles] = useState([]);
  // const [previousQuartersData, setPreviousQuartersData] = useState([]);
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
      for (let i = parseInt(currentYear); i >= parseInt(initialYear); --i) {
        for (let j = 4; j >= 1; --j) {
          if ((i == parseInt(currentYear)) && (j >= parseInt(currentQuarterNo))) {
            continue;
          }
          const tempObj = {
            cardTitle: 'Quarter ' + j + ' - ' + i,
            quarterNo: (j + ''),
            year: (i + ''),
          };
          setPreviousQuartersTitles(oldArray => [...oldArray, tempObj]);
        }
      }
      // db.collection('Users/' + UID + 'UserData').get().then(querySnapshot => {
      //   console.log(querySnapshot, previousQuartersTitles);
      //   for (let doc of querySnapshot) {
      //     for (x of previousQuartersTitles) {
      //       if ((x.quarterNo == (doc.data().Quarter._documentPath._parts[1].charAt(5) + ''))
      //         && (x.year == (doc.data().Quarter._documentPath._parts[1].slice(0, 4) + ''))) { 
      //         continue;
      //       } else {
      //         const tempObj = {
      //           Title: doc.data().Title,
      //           quarterNo: (j + ''),
      //           year: (i + ''),
      //         };
      //       }
      //     };
      //   };
      // });
    }
  }, [route]);

  const RenderPreviousQuarters = () => {
    if (previousQuartersTitles.length > 0) {
      return previousQuartersTitles.map(x => {
        return (
          <TouchableOpacity
            style={styles.cardStyle}
            onPress={() => {
              navigation.navigate('quarterDetails', {
                userUid: route.params.userUid,
                quarterNo: x.quarterNo,
                year: x.year,
              });
            }}>
            <Card.Title style={styles.cardTitleStyle}>{x.cardTitle}</Card.Title>
            <Card.Divider />
          </TouchableOpacity>
        );
      });
    } else {
      return <Text>Previous Data Unavailable</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header userName={userName} navigation={navigation} />
        <View style={styles.ButtonListStyle}>{RenderPreviousQuarters()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    paddingHorizontal: 10,
  },
  ButtonListStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardStyle: {
    marginTop: 25,
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: 'black',
  },
  cardTitleStyle: {
    fontSize: 25,
  },
});

export default PreviousQuarters;
