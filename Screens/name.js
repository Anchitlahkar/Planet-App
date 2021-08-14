import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  unstable_batchedUpdates,
} from "react-native";
import db from "../config";
import axios from "axios";

export default class name extends React.Component {
  constructor() {
    super();
    this.state = {
      list_data: [],
      url: "https://raw.githubusercontent.com/Anchitlahkar/Python-files/master/Kaggle/Name.json", //works on web
      // url: "https://aeaa096fe062.ngrok.io/",                                            //works on mobile
    };
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        return this.setState({ list_data: response.data.data });
      })
      .catch((error) => alert(error.message));
  };

  componentDidMount() {
    this.getPlanets();
  }

  AddFees = (fees_val, name) => {
    if (fees_val === true) {
      db.collection("Fees").add({
        name: name,
        Jan: "not-paid",
        Feb: "not-paid",
        Mar: "not-paid",
        Apr: "not-paid",
        May: "not-paid",
        Jun: "not-paid",
        Jul: "not-paid",
        Aug: "not-paid",
        Sep: "not-paid",
        Oct: "not-paid",
        Nov: "not-paid",
        Dec: "not-paid",
      });
    }} 

  update = () => {
    var { list_data } = this.state;
    for (var data in list_data) {
      console.log(list_data[data].Name);
      var fees_value;
      if (list_data[data].fees.toLowerCase() === "true") {
        fees_value = true;
      } else {
        fees_value = false;
      }
      db.collection("Student").add({
        name: list_data[data].Name,
        father_name: list_data[data].fa_name,
        mother_name: list_data[data].mo_name,
        contact: list_data[data].conatct,
        dob: list_data[data].dob,
        fees: fees_value,
        date_of_addmission: list_data[data].address,
      });
      this.AddFees(fees_value, list_data[data].Name);
      console.log("updated");
    }
  };

  componentDidUpdate() {
    this.update();
  }

  render() {
    const { list_data } = this.state;

    if (list_data.length === 0) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "lightyellow",
  },

  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "brown",
  },

  lowerContainer: {
    flex: 0.9,
  },
});
