import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";

export default function App() {
  return (
    <AppContainer/>
  );
}

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    Details: {
      screen: DetailsScreen,
    },
  },
  { initialRouteName: "Home" }
);

const AppContainer = createAppContainer(AppStackNavigator)
