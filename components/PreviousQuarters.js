import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
const userQuartersMappingCollection = db.collection('UserQuarterMapping');
const usersCollection = db.collection('Users');

const PreviousQuarters = ({route, navigation}) => {
  const [previousQuartersData, setPreviousQuartersData] = useState([]);
  useEffect(() => {
    if (route) {
      const userDocRef = usersCollection.doc(route.params.username);
      userQuartersMappingCollection
        .where('User', '==', userDocRef)
        .where('isActive', '==', false)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('1', doc.data());
            doc
              .data()
              .Quarter.get()
              .then(doc1 => {
                let quarterDocTitle = '';
                let quarterDocId = '';
                quarterDocTitle = doc1.data().Name + ' - ' + doc1.data().Year;
                console.log('2', quarterDocTitle);
                const tempName =
                  doc1.data().Name.charAt(0) + '' + doc1.data().Name.charAt(8);
                quarterDocId = tempName + '' + doc1.data().Year;
                console.log('3', quarterDocId);
                setPreviousQuartersData(oldArray => [
                  ...oldArray,
                  {
                    docId: doc.id,
                    Title: quarterDocTitle,
                    Quarter: quarterDocId,
                  },
                ]);
              });
          });
        });
    }
  }, [route]);

  const RenderPreviousQuarters = () => {
    if (previousQuartersData.length > 0) {
      return previousQuartersData.map(x => {
        return (
          <TouchableOpacity
            style={[styles.ButtonStyle, styles.CurrentButtonStyle]}
            onPress={() => {
              navigation.navigate('Quarter Details', {
                username: route.params.username,
                quarter: x.Quarter,
              });
            }}>
            <View style={styles.ButtonTextViewStyle}>
              <Text style={styles.ButtonTextStyle}>{x.Title}</Text>
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.ButtonListStyle}>{RenderPreviousQuarters()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    alignContent: 'center',
    borderRadius: 18,
  },
  CurrentButtonStyle: {
    backgroundColor: 'cornflowerblue',
  },
  ButtonTextViewStyle: {
    alignContent: 'center',
  },
  ButtonTextStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'white',
  },
});

export default PreviousQuarters;
