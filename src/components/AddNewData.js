import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from './Header';

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;

const db = firestore();
const usersCollection = db.collection('Users');
const quartersCollection = db.collection('Quarters');

const AddNewData = ({ route, navigation }) => {
  
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (route && route.params.userUid) {
      usersCollection
        .doc(route.params.userUid + '')
        .get()
        .then(doc => {
          setUserName(doc.data().Username);
        });
    }
  }, [route]);

  const [dataValue, setDataValue] = useState('');

  const updateInputVal = val => {
    setDataValue(val);
  };

  const handleSubmitButton = () => {
    if (dataValue === '') {
      Alert.alert('Enter some data!');
    } else {
      if (route && route.params.userUid) {
        const UID = route.params.userUid;
        const quarterDocId = currentYear + 'Q' + currentQuarterNo;
        if (route.params.dataSet == 'Task') {
          quartersCollection.doc(quarterDocId).get().then(doc => {
            db.collection("Users/" + UID + "/UserData").doc().set({
              Title: dataValue,
              Quarter: doc.ref,
              isFinished: false,
            }).then(() => {
              setDataValue('');
              navigation.navigate('dashboard', {
                userUid: route.params.userUid,
              });
            })
          })
        } else {
          quartersCollection.doc(quarterDocId).get().then(doc => {
            db.collection("Users/" + UID + "/UserData").doc().set({
              Title: dataValue,
              Quarter: doc.ref,
              Type: (route.params.dataSet + ''),
            }).then(() => {
              setDataValue('');
              navigation.navigate('dashboard', {
                userUid: route.params.userUid,
              });
            })
          })
        }
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header userName={userName} navigation={navigation} />
      <Text style={styles.headingStyle}>Add New {route.params.dataSet}</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Type your text here"
        multiline={true}
        underlineColorAndroid='transparent'
        value={dataValue}
        onChangeText={val => updateInputVal(val)}
      />
      <TouchableOpacity
        style={styles.submitButtonStyle}
        onPress={() => handleSubmitButton(route)}>
        <Text style={styles.submitButtonTextStyle}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButtonStyle}
        onPress={() => {
          navigation.navigate('currentQuarter', {
            username: route.params.username,
            currentQuarter: route.params.currentQuarter,
          });
        }}>
        <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
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
  headingStyle: {
    marginTop: 45,
    fontSize: 30,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    width: 350,
    borderBottomColor: 'dodgerblue',
  },
  spacingStyle: {
    marginBottom: 50,
  },
  submitButtonStyle: {
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: 'dodgerblue',
    width: 150,
    marginLeft: 100,
  },
  submitButtonTextStyle: {
    color: 'white',
  },
  cancelButtonStyle: {
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'dodgerblue',
    width: 150,
    marginLeft: 100,
  },
  cancelButtonTextStyle: {
    color: 'dodgerblue',
  },
});

export default AddNewData;
