import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      details: {},
      imagePath: "",
      //   url: `http://cors-anywhere.herokuapp.com/https://aeaa096fe062.ngrok.io/planet?name=${this.props.navigation.getParam('planet_name')}`,
      url: `https://aeaa096fe062.ngrok.io/planet?name=11 Comae Berenices b`,
    };
  }

  getDetails = () => {
    console.log(this.props.navigation.getParam("planet_name"));
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  setDetails = (planet_details) => {
    const planet_type = planet_details.planet_type;
    var imagePath = "";
    switch (planet_type) {
      case "Gas Giant":
        imagePath = require("../assets/planet_type/gas_giant.png");
        break;

      case "Terrestrial":
        imagePath = require("../assets/planet_type/terrestrial.png");
        break;

      case "Neptune-like":
        imagePath = require("../assets/planet_type/neptune_like.png");
        break;

      case "Super Earth":
        imagePath = require("../assets/planet_type/super_earth.png");
        break;

      default:
        break;
    }

    this.setState({
      imagePath: imagePath,
      details: planet_details,
    });
  };

  componentDidMount() {
    this.getDetails();
  }

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text style={styles.cardItem}>
                {`Distance from Earth : ${details.distance_from_earth}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Distance from Host Star : ${details.distance_from_their_sun}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Gravity : ${details.gravity}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Orbital Period : ${details.orbital_period}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Orbital Speed : ${details.orbital_speed}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Planet Mass : ${details.planet_mass}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Planet Radius : ${details.planetradius}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Planet Type : ${details.planet_type}`}
              </Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications: ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItem: {
    marginBottom: 10,
  },
});
