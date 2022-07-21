import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Unorderedlist from 'react-native-unordered-list';
import {v4 as uuidv4} from 'uuid';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const userQuartersMappingCollection = db.collection('UserQuarterMapping');
const tasksCollection = db.collection('Tasks');
const awardsCollection = db.collection('Awards');
const activitiesCollection = db.collection('Activities');

const CurrentQuarter = ({route, navigation}) => {
  const [currentTasksData, setCurrentTasksData] = useState([]);
  const [awardsData, setAwardsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [checkboxState, setCheckboxState] = useState([]);
  useEffect(() => {
    if (route) {
      const userQuarterMappingDocRef = userQuartersMappingCollection.doc(
        route.params.username + '' + route.params.currentQuarter,
      );
      tasksCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot);
          querySnapshot.forEach(doc => {
            setCurrentTasksData(oldArray => [
              ...oldArray,
              {
                docId: doc.id,
                isFinished: doc.data().isFinished,
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

  useEffect(() => {
    let size = 0;
    if (route) {
      const userQuarterMappingDocRef = userQuartersMappingCollection.doc(
        route.params.username + '' + route.params.currentQuarter,
      );
      tasksCollection
        .where('UserQuarterMapping', '==', userQuarterMappingDocRef)
        .get()
        .then(snap => {
          size = snap.size;
          console.log(size);
          if (currentTasksData.length > 0) {
            let tempState = [];
            console.log(currentTasksData);
            if (currentTasksData.length === size) {
              console.log('inside checkboxstate');
              currentTasksData.forEach(x => {
                tasksCollection
                  .doc(x.docId)
                  .get()
                  .then(doc => {
                    let tempObj = {[x.docId]: doc.data().isFinished};
                    tempState.push(tempObj);
                    setCheckboxState(oldArray => [...oldArray, tempObj]);
                  });
              });
            }
          }
        });
    }
  }, [currentTasksData, route]);

  const updateCheckBox = (idx, x) => {
    let temp_state = [...checkboxState];
    let temp_element = {...temp_state[idx]};
    const tempKey = '' + x.docId;
    temp_element = {[tempKey]: !temp_element[x.docId]};
    temp_state[idx] = temp_element;
    setCheckboxState(temp_state);
    currentTasksData.forEach(x1 => {
      if (x1.docId === x.docId) {
        x1.isFinished = !x1.isFinished;
        tasksCollection.doc(x.docId).update({isFinished: x1.isFinished});
      }
    });
  };

  const RenderCheckbox = () => {
    if (
      currentTasksData.length > 0 &&
      checkboxState.length > 0 &&
      currentTasksData.length === checkboxState.length
    ) {
      return currentTasksData.map(x => {
        let idx = x.docId.length - 1;
        for (let i = x.docId.length - 1; i >= 0; --i) {
          if (x.docId.charAt(i) === 'n') {
            idx = i;
            break;
          }
        }
        let slicedString = x.docId.slice(idx + 1);
        let tempidx = parseInt(slicedString, 10);
        return (
          <BouncyCheckbox
            isChecked={checkboxState[tempidx - 1][x.docId]}
            key={uuidv4()}
            text={x.Title}
            disableBuiltInState
            onPress={() => {
              updateCheckBox(tempidx - 1, x);
            }}
            style={styles.CheckBoxStyle}
          />
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
          <Card.Title>Tasks Done/To-Be-Done</Card.Title>
          <Card.Divider />
          {RenderCheckbox()}
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate('Add new Data', {
                username: route.params.username,
                currentQuarter: route.params.currentQuarter,
                dataSet: 'Tasks',
              });
            }}>
            <Text style={styles.ButtonTextStyle}>+</Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <Card.Title>Awards Won</Card.Title>
          <Card.Divider />
          {RenderAwards()}
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate('Add new Data', {
                username: route.params.username,
                currentQuarter: 'Q12022',
                dataSet: 'Awards',
              });
            }}>
            <Text style={styles.ButtonTextStyle}>+</Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <Card.Title>Extra-Cirricular Activities Done</Card.Title>
          <Card.Divider />
          {RenderActivities()}
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate('Add new Data', {
                username: route.params.username,
                currentQuarter: 'Q12022',
                dataSet: 'Activities',
              });
            }}>
            <Text style={styles.ButtonTextStyle}>+</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskStyle: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  awardsTextStyle: {
    fontSize: 25,
  },
  ButtonStyle: {
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    alignContent: 'center',
    borderRadius: 50,
    backgroundColor: 'dodgerblue',
    width: 50,
    marginLeft: 130,
  },
  ButtonTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    color: 'white',
  },
  CheckBoxStyle: {
    marginBottom: 4,
  },
});

export default CurrentQuarter;
