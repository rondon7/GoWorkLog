import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;

const QuarterDetails = ({ route, navigation }) => {

  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (route && route.params.userUid) {
      const UID = route.params.userUid + '';
      usersCollection
        .doc(UID)
        .get()
        .then(doc => {
          setUserName(doc.data().Username);
        });
      const quarterDocRef = quartersCollection.doc(route.params.year + 'Q' + route.params.quarterNo);
      db.collection('Users/' + UID + '/UserData')
        .where('Quarter', '==', quarterDocRef)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const tempObj = {
              Title: doc.data().Title,
              Quarter: quarterDocRef,
              isFinished: doc.data().isFinished,
              Type: doc.data().Type,
            };
            setUserData(oldArray => [...oldArray, tempObj]);
          })
        })
    }
  }, [route]);

  const RenderCompletedTasks = () => {
    if (userData.length > 0) {
      return userData.map(x => {
        return (x.isFinished == true &&
          <Unorderedlist
            style={styles.CheckBoxStyle}
            bulletUnicode={0x2705}
            color="red">
            <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
          </Unorderedlist>
        );
      });
    } else {
      return <></>;
    }
  };

  const RenderInCompleteTasks = () => {
    if (userData.length > 0) {
      return userData.map(x => {
        return (x.isFinished == false &&
          <Unorderedlist
            style={styles.CheckBoxStyle}
            bulletUnicode={0x274c}
            color="red">
            <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
          </Unorderedlist>
        );
      });
    } else {
      return <></>;
    }
  };

  const RenderAwards = () => {
    if (userData.length > 0) {
      return userData.map(x => {
        return ((!x.isFinished && x.Type === 'Award') &&
          <Unorderedlist
            style={styles.CheckBoxStyle}
            bulletUnicode={0x29be}
            color="red">
            <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
          </Unorderedlist>
        );
      });
    } else {
      return <></>;
    }
  };

  const RenderActivities = () => {
    if (userData.length > 0) {
      return userData.map(x => {
        return ((!x.isFinished && x.Type === 'Activity') &&
          <Unorderedlist
            style={styles.CheckBoxStyle}
            bulletUnicode={0x2765}
            color="dodgerblue">
            <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
          </Unorderedlist>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header userName={userName} navigation={navigation} />
        <Card>
          <Card.Title>Tasks Completed</Card.Title>
          <Card.Divider />
          {RenderCompletedTasks()}
        </Card>
        <Card>
          <Card.Title>Tasks Not Completed</Card.Title>
          <Card.Divider />
          {RenderInCompleteTasks()}
        </Card>
        <Card>
          <Card.Title>Awards Won</Card.Title>
          <Card.Divider />
          {RenderAwards()}
        </Card>
        <Card>
          <Card.Title>Extra-Cirricular Activities Done</Card.Title>
          <Card.Divider />
          {RenderActivities()}
        </Card>
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
  awardsTextStyle: {
    fontSize: 25,
  },
  CheckBoxStyle: {
    marginBottom: 4,
  },
});

export default QuarterDetails;
