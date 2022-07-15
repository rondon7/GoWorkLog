import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CurrentQuarter from "./CurrentQuarter";
import PreviousQuarter from "./PreviousQuarter";
import AddNewQuarter from "./AddNewQuarter";

const Stack = createNativeStackNavigator();

const DashboardOptions = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Current Quarter" component={CurrentQuarter} />
        <Stack.Screen name="Previous Quarters" component={PreviousQuarter} />
        <Stack.Screen name="Add a new Quarter" component={AddNewQuarter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.ButtonListStyle}>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.CurrentButtonStyle]}
        onPress={() => {
          navigation.navigate("Current Quarter");
        }}
      >
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Current Quarter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.PreviousButtonStyle]}
        onPress={() => {
          navigation.navigate("Previous Quarters");
        }}
      >
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Your Previous Quarters</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ButtonStyle, styles.NewButtonStyle]}
        onPress={() => {
          navigation.navigate("Add a new Quarter");
        }}
      >
        <View style={styles.ButtonTextViewStyle}>
          <Text style={styles.ButtonTextStyle}>Add a New Quarter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonListStyle: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  ButtonStyle: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    padding: 10,
    alignContent: "center",
    borderRadius: 50,
  },
  CurrentButtonStyle: {
    backgroundColor: "cornflowerblue",
  },
  PreviousButtonStyle: {
    backgroundColor: "forestgreen",
  },
  NewButtonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  ButtonTextViewStyle: {
    alignContent: "center",
    marginTop: 65,
  },
  ButtonTextStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 30,
    color: "white",
  },
});

export default DashboardOptions;
