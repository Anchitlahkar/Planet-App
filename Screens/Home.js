import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list_data: [],
      // url: "http://cors-anywhere.herokuapp.com/https://aeaa096fe062.ngrok.io/",      //works on web
      url: "https://aeaa096fe062.ngrok.io/",                                            //works on mobile

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

  renderItem = ({ item, idx }) => (
    <ListItem
      bottomDivider
      {...console.log(item.name)}
      onPress={() => {
        this.props.navigation.navigate("Details", { planet_name: item.name });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{`Planet: ${item.name}`}</ListItem.Title>
        <ListItem.Subtitle>
          {`Distance_From_Earth: ${item.distance_from_earth}`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    this.getPlanets();
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

        {/* Header */}
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>

        {/* Body */}
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.list_data}
            renderItem={this.renderItem}
          />
        </View>
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
