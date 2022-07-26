import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Unorderedlist from 'react-native-unordered-list';
import Header from './Header';

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');

const CurrentQuarter = ({ route, navigation }) => {
  
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState([]);
  const [checkboxData, setCheckboxData] = useState([]);

  useEffect(() => {
    if (route && route.params.userUid) {
      const UID = route.params.userUid + '';
      console.log('UID', UID);
      const userDocRef = usersCollection.doc(UID)
      userDocRef.get().then(doc => {
          setUserName(doc.data().Username);
      });        
      const quarterDocRef = quartersCollection.doc(currentYear + 'Q' + currentQuarterNo);
      db.collection("Users/" + UID + "/UserData")
        .where('Quarter', '==', quarterDocRef)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            setUserData(oldArray => [
              ...oldArray,
              {
                docId: doc1.id,
                isFinished: doc1.data().isFinished,
                Title: doc1.data().Title,
                Type: doc1.data().Type,
                Quarter: doc1.data().Quarter,
              },
            ]);
          });
      });
    }
  }, [route]);

  useEffect(() => {
    let size = 0;
    if (route && route.params.userUid) {
      const UID = route.params.userUid + '';
      const quarterDocRef = quartersCollection.doc(currentYear + 'Q' + currentQuarterNo);
      db.collection("Users/" + UID + "/UserData")
        .where('Quarter', '==', quarterDocRef).get().then(querySnapshot => {
        size = querySnapshot.size;
        // console.log('Size', size);
        // console.log('Userdata', userData);
        // console.log('userData length', userData.length)
        if (userData.length === size) {
          // console.log('inside checkbox initialization function');
          querySnapshot.forEach(doc1 => {
            // console.log("Task doc", doc1);
            if (doc1.data().isFinished == true || doc1.data().isFinished == false) {
              let tempObj = { [doc1.id]: doc1.data().isFinished };
              // console.log("Checkbox New Obj", tempObj);
              setCheckboxData(oldArray => [...oldArray, tempObj]);
            }
          });  
        }
      });
    }
  }, [userData]);

  const updateCheckBox = (idx, x) => {
    const UID = route.params.userUid + '';
    let temp_state = [...checkboxData];
    let temp_element = {...temp_state[idx]};
    const tempKey = '' + x.docId;
    temp_element = {[tempKey]: !temp_element[x.docId]};
    temp_state[idx] = temp_element;
    setCheckboxData(temp_state);
    userData.forEach(x1 => {
      db.collection("Users/" + UID + "/UserData").doc(x.docId).update({ isFinished: !x.isFinished }).then(() => {
        x.isFinished = !x.isFinished;
      })
    });
  };

  const RenderCheckbox = () => {
    console.log('CheckBoxData: ', checkboxData);
    console.log('CheckBoxData length: ', checkboxData.length);
    console.log('UserData', userData);
    console.log('UserData length', userData.length);
    let tempSize = 0;
    userData.forEach(res => {
      const dataQuarter = res.Quarter._documentPath._parts[1];
      const slicedYear = dataQuarter.slice(0, 4) + '';
      const slicedQuarterNo = dataQuarter.charAt(5) + '';
      if ((slicedYear == currentYear && slicedQuarterNo == currentQuarterNo) && (res.isFinished == true || res.isFinished == false))
        tempSize++;
    })
    console.log('Task array size', tempSize);
    if (userData.length > 0 && checkboxData.length > 0 && checkboxData.length === tempSize) {
      return userData.map(x => { 
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if ((slicedYear == currentYear && slicedQuarterNo == currentQuarterNo)
          && (x.isFinished == true || x.isFinished == false)) {
          console.log("X.DocId: ", x.docId);
          let arrayIdx = 0;
          for (let resData of checkboxData) {
            console.log(Object.keys(resData)[0]);
            if (Object.keys(resData)[0] == x.docId)
              break;
            else
              arrayIdx++;
          }
          console.log("Array Idx: ", arrayIdx);
          if (arrayIdx != -1) {
            return (
              <BouncyCheckbox
                isChecked={checkboxData[arrayIdx][x.docId]}
                text={x.Title}
                disableBuiltInState
                onPress={() => {
                  updateCheckBox(arrayIdx, x);
                }}
                style={styles.CheckBoxStyle}
              />
            );
          }
        }
      });
    } else {
      return <></>;
    }
  };

  const RenderAwards = () => {
    if (userData.length > 0) {
      // console.log('Userdata in Awards func.', userData);
      return userData.map(x => {
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if (slicedYear == currentYear && slicedQuarterNo == currentQuarterNo) {
          return ((!x.isFinished && x.Type === 'Award') &&
            <Unorderedlist
              style={styles.CheckBoxStyle}
              bulletUnicode={0x29be}
              color="red">
              <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
            </Unorderedlist>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const RenderActivities = () => {
    if (userData.length > 0) {
      // console.log('Userdata in Activities func.', userData);
      return userData.map(x => {
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if (slicedYear == currentYear && slicedQuarterNo == currentQuarterNo) {
          return ((!x.isFinished && x.Type === 'Activity') &&
            <Unorderedlist
              style={styles.CheckBoxStyle}
              bulletUnicode={0x2765}
              color="dodgerblue">
              <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
            </Unorderedlist>
          );
        }
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
          <Card.Title>Tasks Done/To-Be-Done</Card.Title>
          <Card.Divider />
          {RenderCheckbox()}
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate('addNewData', {
                userUid: route.params.userUid,
                dataSet: 'Task',
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
              navigation.navigate('addNewData', {
                userUid: route.params.userUid,
                dataSet: 'Award',
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
              navigation.navigate('addNewData', {
                userUid: route.params.userUid,
                dataSet: 'Activity',
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
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
