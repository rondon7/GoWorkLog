import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const db = firestore();

const AddNewData = ({route, navigation}) => {
  const [dataValue, setDataValue] = useState('');

  const updateInputVal = val => {
    setDataValue(val);
  };

  const handleSubmitButton = routePass => {
    if (dataValue === '') {
      Alert.alert('Enter some data!');
    } else {
      if (routePass) {
        const dbCollection = db.collection(routePass.params.dataSet);
        const timestamp = firestore.FieldValue.serverTimestamp();
        const userQuarterMappingDocRef = db
          .collection('UserQuarterMapping')
          .doc(
            routePass.params.username + '' + routePass.params.currentQuarter,
          );
        const tempKey =
          routePass.params.username +
          '' +
          routePass.params.currentQuarter +
          'n1';
        const tempRef = dbCollection.doc(tempKey);
        console.log(tempRef);
        tempRef
          .get()
          .then(function (doc1) {
            console.log(doc1.exists);
            if (doc1.exists) {
              dbCollection
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get()
                .then(latestDocRef => {
                  latestDocRef.docs.forEach(doc => {
                    const tempId = doc.id;
                    let idx = tempId.length - 1;
                    for (let i = tempId.length - 1; i >= 0; --i) {
                      if (tempId.charAt(i) === 'n') {
                        idx = i;
                        break;
                      }
                    }
                    let slicedString = tempId.slice(idx + 1);
                    let tempidx = parseInt(slicedString, 10) + 1;
                    const newDocId =
                      routePass.params.username +
                      '' +
                      routePass.params.currentQuarter +
                      'n' +
                      tempidx;
                    if (routePass.params.dataSet === 'Tasks') {
                      dbCollection
                        .doc(newDocId)
                        .set({
                          Title: dataValue,
                          isFinished: false,
                          UserQuarterMapping: userQuarterMappingDocRef,
                          createdAt: timestamp,
                        })
                        .then(() => {
                          setDataValue('');
                          navigation.navigate('Current Quarter', {
                            userName: routePass.params.username,
                            currentQuarter: routePass.params.currentQuarter,
                          });
                        })
                        .catch(error => console.log(error));
                    } else {
                      dbCollection
                        .doc(newDocId)
                        .set({
                          Title: dataValue,
                          UserQuarterMapping: userQuarterMappingDocRef,
                          createdAt: timestamp,
                        })
                        .then(() => {
                          setDataValue('');
                          navigation.navigate('Current Quarter', {
                            userName: routePass.params.username,
                            currentQuarter: routePass.params.currentQuarter,
                          });
                        })
                        .catch(error => console.log(error));
                    }
                  });
                });
            } else {
              console.log('empty');
              let slicedString = '0';
              let tempidx = parseInt(slicedString, 10) + 1;
              const newDocId =
                routePass.params.username +
                '' +
                routePass.params.currentQuarter +
                'n' +
                tempidx;
              if (routePass.params.dataSet === 'Tasks') {
                dbCollection
                  .doc(newDocId)
                  .set({
                    Title: dataValue,
                    isFinished: false,
                    UserQuarterMapping: userQuarterMappingDocRef,
                    createdAt: timestamp,
                  })
                  .then(() => {
                    setDataValue('');
                    navigation.navigate('Current Quarter', {
                      userName: routePass.params.username,
                      currentQuarter: routePass.params.currentQuarter,
                    });
                  })
                  .catch(error => console.log(error));
              } else {
                dbCollection
                  .doc(newDocId)
                  .set({
                    Title: dataValue,
                    UserQuarterMapping: userQuarterMappingDocRef,
                    createdAt: timestamp,
                  })
                  .then(() => {
                    setDataValue('');
                    navigation.navigate('Dashboard', {
                      userName: routePass.params.username,
                      currentQuarter: routePass.params.currentQuarter,
                    });
                  })
                  .catch(error => console.log(error));
              }
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Add New {route.params.dataSet}</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Add new Data"
        value={dataValue}
        onChangeText={val => updateInputVal(val)}
      />
      <View style={styles.spacingStyle}>
        <Button
          style={styles.buttonStyle}
          title="Submit"
          onPress={() => handleSubmitButton(route)}
        />
      </View>
      <View style={styles.spacingStyle}>
        <Button
          style={styles.buttonStyle}
          title="Cancel"
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
  spacingStyle: {
    marginBottom: 50,
  },
  buttonStyle: {
    color: '#3740FE',
  },
});

export default AddNewData;
