import {Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import {Card} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const userQuartersMappingCollection = db.collection('UserQuarterMapping');
const tasksCollection = db.collection('Tasks');
const awardsCollection = db.collection('Awards');
const activitiesCollection = db.collection('Activities');

const QuarterDetails = ({route, navigation}) => {
  const [completedTasksData, setCompletedTasksData] = useState([]);
  const [inCompleteTasksData, setinCompleteTasksData] = useState([]);
  const [awardsData, setAwardsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  useEffect(() => {
    if (route) {
      console.log(route);
      const userQuarterMappingDocRef = userQuartersMappingCollection.doc(
        route.params.username + '' + route.params.quarter,
      );
      tasksCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .where('isFinished', '==', true)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setCompletedTasksData(oldArray => [
              ...oldArray,
              {
                docId: doc.id,
                Title: doc.data().Title,
              },
            ]);
          });
        });
      tasksCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .where('isFinished', '==', false)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setinCompleteTasksData(oldArray => [
              ...oldArray,
              {
                docId: doc.id,
                Title: doc.data().Title,
              },
            ]);
          });
        });
      awardsCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setAwardsData(oldArray => [
              ...oldArray,
              {
                docId: doc.id,
                Title: doc.data().Title,
              },
            ]);
          });
        });
      activitiesCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            setActivitiesData(oldArray => [
              ...oldArray,
              {
                docId: doc.id,
                Title: doc.data().Title,
              },
            ]);
          });
        });
    }
  }, [route]);

  const RenderInCompleteTasks = () => {
    if (inCompleteTasksData.length > 0) {
      console.log(inCompleteTasksData);
      return inCompleteTasksData.map(x => {
        return (
          <Unorderedlist
            style={styles.CheckBoxStyle}
            key={uuidv4()}
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

  const RenderCompletedTasks = () => {
    if (completedTasksData.length > 0) {
      console.log(completedTasksData);
      return completedTasksData.map(x => {
        return (
          <Unorderedlist
            style={styles.CheckBoxStyle}
            key={uuidv4()}
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

  const RenderAwards = () => {
    if (awardsData.length > 0) {
      console.log(awardsData);
      return awardsData.map(x => {
        return (
          <Unorderedlist
            style={styles.CheckBoxStyle}
            key={uuidv4()}
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
    if (activitiesData.length > 0) {
      console.log(activitiesData);
      return activitiesData.map(x => {
        return (
          <Unorderedlist
            style={styles.CheckBoxStyle}
            key={uuidv4()}
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
  },
  awardsTextStyle: {
    fontSize: 25,
  },
  CheckBoxStyle: {
    marginBottom: 4,
  },
});

export default QuarterDetails;
