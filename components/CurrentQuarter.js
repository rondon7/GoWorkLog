import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Unorderedlist from 'react-native-unordered-list';
const CurrentQuarter = ({ navigation }) => {
  const initialState = []
  for (let i = 0; i < 10; ++i) {
    const tempKey = "" + i
    let tempObj = { [tempKey] : false }
    initialState.push(tempObj)
  }
  const [checkboxState, setCheckboxState] = useState(initialState);
  const updateCheckBox = (idx) => {
    let temp_state = [...checkboxState];
    let temp_element = { ...temp_state[idx] };
    const tempKey = "" + idx
    temp_element = { [tempKey]: !(temp_element[idx]) };
    temp_state[idx] = temp_element;
    setCheckboxState(temp_state);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title>Tasks To-Be-Done/Done</Card.Title>
          <Card.Divider />
          <BouncyCheckbox
            isChecked={checkboxState[0]["0"]}
            text="Complete React Native Demo Assignment"
            disableBuiltInState
            onPress={() => { updateCheckBox(0) }}
          />
          <BouncyCheckbox
            isChecked={checkboxState[1]["1"]}
            text="Complete Company-sponsored Training"
            disableBuiltInState
            onPress={() => { updateCheckBox(1) }}
          />
          <BouncyCheckbox
            isChecked={checkboxState[2]["2"]}
            text="Complete Code Setup in Local Machine"
            disableBuiltInState
            onPress={() => { updateCheckBox(2) }}
          />
          <BouncyCheckbox
            isChecked={checkboxState[3]["3"]}
            text="Have a Walkthrough of Codebase"
            disableBuiltInState
            onPress={() => { updateCheckBox(3) }}
          />
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate("Current Quarter");
            }}
          >
            <View style={styles.ButtonTextViewStyle}>
              <Icon
                name="add"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
              <Text style={styles.ButtonTextStyle}>New Task</Text>
            </View>
          </TouchableOpacity>
        </Card>
        <Card>
          <Card.Title>Awards Won</Card.Title>
          <Card.Divider />
          <Unorderedlist bulletUnicode={0x29BE} color='red'>
            <Text style={StyleSheet.awardsTextStyle}>
              Won 5th Position in Go-MMT Hackathon
            </Text>
          </Unorderedlist>
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate("Current Quarter");
            }}
          >
            <View style={styles.ButtonTextViewStyle}>
              <Icon
                name="add"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
              <Text style={styles.ButtonTextStyle}>New Award</Text>
            </View>
          </TouchableOpacity>
        </Card>
        <Card>
          <Card.Title>Extra-Cirricular Activities Done</Card.Title>
          <Card.Divider />
          <Unorderedlist bulletUnicode={0x2765} color='dodgerblue'>
            <Text style={StyleSheet.awardsTextStyle}>
              Went on the Team Trip to Jaladhama
            </Text>
          </Unorderedlist>
          <Unorderedlist bulletUnicode={0x2765} color='dodgerblue'>
            <Text style={StyleSheet.awardsTextStyle}>
              Take part in Cricket Tournament
            </Text>
          </Unorderedlist>
          <TouchableOpacity
            style={[styles.ButtonStyle]}
            onPress={() => {
              navigation.navigate("Current Quarter");
            }}
          >
            <View style={styles.ButtonTextViewStyle}>
              <Icon
                name="add"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
              <Text style={styles.ButtonTextStyle}>New Activity</Text>
            </View>
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
    flexDirection: "row",
    marginBottom: 6,
  },
  awardsTextStyle: {
    fontSize: 25,
  },
  ButtonStyle: {
    margin: 10,
    alignItems: "center",
    padding: 10,
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: "dodgerblue",
    width: 150,
    marginLeft: 90,
  },
  ButtonTextStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "white",
  },
});

export default CurrentQuarter;
