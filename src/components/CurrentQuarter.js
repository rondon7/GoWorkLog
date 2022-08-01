import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Unorderedlist from 'react-native-unordered-list';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteIcon from 'react-native-vector-icons/AntDesign';

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

  useEffect(() => {
    if (route && route.params.userUid) {
      setUserData([]);
      const UID = route.params.userUid + '';
      const userDocRef = usersCollection.doc(UID)
      userDocRef.get().then(doc => {
        setUserName(doc.data().Username);
      });
      const quarterDocRef = quartersCollection.doc(currentYear + 'Q' + currentQuarterNo);
      db.collection("Users/" + UID + "/UserData")
        .where('Quarter', '==', quarterDocRef)
        .get()
        .then(querySnapshot => {
          const tempArray = [];
          querySnapshot.forEach(doc1 => {
            tempArray.push({
              docId: doc1.id,
              isFinished: doc1.data().isFinished,
              Title: doc1.data().Title,
              Type: doc1.data().Type,
              Quarter: doc1.data().Quarter,
            });
          });
          setUserData(tempArray);
        });
    }
  }, [route]);

  const updateCheckBox = (x, isChecked) => {
    const UID = route.params.userUid + '';
    db.collection("Users/" + UID + "/UserData").doc(x.docId).update({ isFinished: isChecked }).then(() => {
      setUserData(prevData => {
        const temp = [...prevData];
        temp.forEach(itm => {
          if (itm.docId === x.docId) {
            itm.isFinished = isChecked;
            return;
          }
        })
        return temp;
      })
    })
  };

  const RenderTasks = () => {
    if (userData.length > 0) {
      const UID = route.params.userUid + '';
      return userData.map(x => {
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if ((slicedYear == currentYear && slicedQuarterNo == currentQuarterNo)
          && (x.isFinished == true || x.isFinished == false)) {
          return (
            <View style={{ marginBottom: 15 }}>
              <BouncyCheckbox
                isChecked={x.isFinished}
                text={x.Title}
                onPress={(isChecked) => {
                  updateCheckBox(x, isChecked);
                }}
                style={styles.CheckBoxStyle}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Icon style={{ marginLeft: 20 }} name="edit" size={20} color="#900" onPress={() => {
                  navigation.navigate('addNewData', {
                    userUid: UID,
                    dataSet: 'Task',
                    updation: true,
                    prevValue: x.Title,
                    prevId: x.docId,
                  });
                }} />
                <DeleteIcon style={{ marginLeft: 20 }} name="delete" size={20} color="#900" onPress={() => {
                  db.collection("Users/" + UID + "/UserData").doc(x.docId).delete().then(() => {
                    // navigation.navigate('currentQuarter', {
                    //   userUid: UID,
                    // });
                    setUserData(prevData => {
                      const temp = [...prevData];
                      temp.forEach(itm => {
                        if (itm.docId === x.docId) {
                          const index = temp.indexOf(itm);
                          if (index > -1) {
                            temp.splice(index, 1);
                          }
                        }
                      })
                      return temp;
                    })
                  })
                }} />
              </View>
              <View style={{ padding: 0.2, backgroundColor: 'black' }}></View>
            </View>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const RenderAwards = () => {
    if (userData.length > 0) {
      const UID = route.params.userUid + '';
      return userData.map(x => {
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if (slicedYear == currentYear && slicedQuarterNo == currentQuarterNo) {
          return ((!x.isFinished && x.Type === 'Award') &&
            <View style={{ marginTop: 10 }}>
              <Unorderedlist
                style={styles.CheckBoxStyle}
                bulletUnicode={0x29be}
                color="red">
                <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
              </Unorderedlist>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Icon style={{ marginLeft: 20 }} name="edit" size={20} color="#900" onPress={() => {
                  navigation.navigate('addNewData', {
                    userUid: UID,
                    dataSet: 'Award',
                    updation: true,
                    prevValue: x.Title,
                    prevId: x.docId,
                  });
                }} />
                <DeleteIcon style={{ marginLeft: 20 }} name="delete" size={20} color="#900" onPress={() => {
                  db.collection("Users/" + UID + "/UserData").doc(x.docId).delete().then(() => {
                    // navigation.navigate('dashboard', {
                    //   userUid: UID,
                    // });
                    setUserData(prevData => {
                      const temp = [...prevData];
                      temp.forEach(itm => {
                        if (itm.docId === x.docId) {
                          const index = temp.indexOf(itm);
                          if (index > -1) {
                            temp.splice(index, 1);
                          }
                        }
                      })
                      return temp;
                    })
                  })
                }} />
              </View>
              <View style={{ padding: 0.2, backgroundColor: 'black' }}></View>
            </View>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const RenderActivities = () => {
    if (userData.length > 0) {
      const UID = route.params.userUid + '';
      return userData.map(x => {
        const dataQuarter = x.Quarter._documentPath._parts[1];
        const slicedYear = dataQuarter.slice(0, 4) + '';
        const slicedQuarterNo = dataQuarter.charAt(5) + '';
        if (slicedYear == currentYear && slicedQuarterNo == currentQuarterNo) {
          return ((!x.isFinished && x.Type === 'Activity') &&
            <View>
              <Unorderedlist
                style={styles.CheckBoxStyle}
                bulletUnicode={0x2765}
                color="dodgerblue">
                <Text style={StyleSheet.awardsTextStyle}>{x.Title}</Text>
              </Unorderedlist>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Icon style={{ marginLeft: 20 }} name="edit" size={20} color="#900" onPress={() => {
                  navigation.navigate('addNewData', {
                    userUid: UID,
                    dataSet: 'Activity',
                    updation: true,
                    prevValue: x.Title,
                    prevId: x.docId,
                  });
                }} />
                <DeleteIcon style={{ marginLeft: 20 }} name="delete" size={20} color="#900" onPress={() => {
                  db.collection("Users/" + UID + "/UserData").doc(x.docId).delete().then(() => {
                    // navigation.navigate('dashboard', {
                    //   userUid: UID,
                    // });
                    setUserData(prevData => {
                      const temp = [...prevData];
                      temp.forEach(itm => {
                        if (itm.docId === x.docId) {
                          const index = temp.indexOf(itm);
                          if (index > -1) {
                            temp.splice(index, 1);
                          }
                        }
                      })
                      return temp;
                    })
                  })
                }} />
              </View>
              <View style={{ padding: 0.2, backgroundColor: 'black' }}></View>
            </View>
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
          {RenderTasks()}
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
                updation: false,
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
    paddingRight: 15,
  },
});

export default CurrentQuarter;
