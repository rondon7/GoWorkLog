import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import Header from './Header';

import firestore from '@react-native-firebase/firestore';
const db = firestore();
const usersCollection = db.collection('Users');

import getCurrentQuarter from '../../helpers/getCurrentQuarter';
const currentYear = getCurrentQuarter().Year;
const currentQuarterNo = getCurrentQuarter().Quarter;

const years = [
  { label: 'All', value: 'All' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
  { label: '2027', value: '2027' },
  { label: '2028', value: '2028' },
  { label: '2029', value: '2029' },
];

const yearsForFilter = ['2029', '2028', '2027', '2026', '2025', '2024', '2023', '2022'];

const quartersForFilter = ['4', '3', '2', '1'];

const PreviousQuarters = ({ route, navigation }) => {

  const [previousQuartersTitles, setPreviousQuartersTitles] = useState([]);
  const [userName, setUserName] = useState('');
  const [yearFilter, setYearFilter] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (route && route.params.userUid) {
      const UID = route.params.userUid + '';
      usersCollection
        .doc(UID)
        .get()
        .then(doc => {
          setUserName(doc.data().Username);
        });
    }
  }, [route]);

  const renderLabel = () => {
    if (yearFilter || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
          Year
        </Text>
      );
    }
    return null;
  };

  const DropdownComponent = () => {
    return (
      <View style={[styles.container, styles.yearFilter]}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={years}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Year' : '...'}
          searchPlaceholder="Find"
          value={yearFilter}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setYearFilter(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    const UID = route.params.userUid + '';
    if (keyword.length > 0) {
      db.collection("Users/" + UID + "/UserData").get().then(snapshot => {
        let tempArray = [];
        yearsForFilter.forEach(year => {
          quartersForFilter.forEach(quarter => {
            snapshot.docs.every(doc => {
              const docData = doc.data();
              if (docData.Title.includes(keyword)) {
                const tempQuarterNo = docData.Quarter._documentPath._parts[1].charAt(5);
                const tempYear = docData.Quarter._documentPath._parts[1].slice(0, 4);
                if (tempQuarterNo == quarter && tempYear == year) {
                  const tempObj = {
                    cardTitle: 'Quarter '
                      + tempQuarterNo
                      + ' - '
                      + tempYear,
                    quarterNo: (tempQuarterNo + ''),
                    year: (tempYear + ''),
                  };
                  if (yearFilter && (!(yearFilter === 'All')) && yearFilter == tempYear) {
                    tempArray.push(tempObj);
                  } else if ((!yearFilter) || (yearFilter === 'All')) {
                    tempArray.push(tempObj);
                  }
                  return false;
                }
              }
              return true;
            })
          })
        })
        setPreviousQuartersTitles(tempArray);
      })
    } else {
      usersCollection
        .doc(UID)
        .get()
        .then(doc => {
          const initialQuarterNo = doc.data().InitialActiveQuarter._documentPath._parts[1].charAt(5) + '';
          const initialYear = doc.data().InitialActiveQuarter._documentPath._parts[1].slice(0, 4) + '';
          let tempArray = [];
          for (let i = parseInt(currentYear); i >= parseInt(initialYear); --i) {
            let flag = false;
            for (let j = 4; j >= 1; --j) {
              if ((i == parseInt(currentYear)) && (j >= parseInt(currentQuarterNo)))
                continue;
              if ((i <= initialYear) && (j < initialQuarterNo)) {
                flag = true;
                break;
              }
              const tempObj = {
                cardTitle: 'Quarter ' + j + ' - ' + i,
                quarterNo: (j + ''),
                year: (i + ''),
              };
              if (yearFilter && (!(yearFilter === 'All')) && yearFilter == i) {
                tempArray.push(tempObj);
              } else if ((!yearFilter) || (yearFilter === 'All')) {
                tempArray.push(tempObj);
              }
            }
            if (flag)
              break;
          }
          setPreviousQuartersTitles(tempArray);
        });
    }
  }, [keyword, yearFilter])

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
            <Text style={styles.cardTitleStyle}>{x.cardTitle}</Text>
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
        <View style={styles.filters}>
          <TextInput
            style={styles.input}
            onChangeText={(newKeyword) => setKeyword(newKeyword)}
            value={keyword}
            placeholder="Search by Keyword"
            keyboardType="alphanumeric"
          />
          {DropdownComponent()}
        </View>
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
  filters: {
    flex: 1,
    flexDirection: 'row'
  },
  ButtonListStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardStyle: {
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: 'gainsboro',
    padding: 15,
  },
  cardTitleStyle: {
    fontSize: 25,
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  yearFilter: {
    flexBasis: '25%'
  },
  input: {
    height: 50,
    margin: 8,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    flexBasis: '65%'
  },
});

export default PreviousQuarters;
