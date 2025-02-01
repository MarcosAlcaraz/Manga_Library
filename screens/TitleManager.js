import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, Button } from 'react-native'
import React, { Component } from 'react'

export default class AdminTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
    };
  }

  componentDidMount() {

    let _this = this;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        console.log(xhttp.responseText);
        console.log(_this.props.route.params.user);

        let myArr = JSON.parse(this.responseText);
        _this.setState({ units: myArr });
      }
    };

    xhttp.open('GET', 'https://ppi-project.000webhostapp.com/ppifinal/ShowTitleWithEmail.php?email=' + this.props.route.params.user, true);
    xhttp.send();
  }

  render() {
    const upload = () => {

      let _this = this;
      _this.props.navigation.navigate("Upload", { user: this.props.route.params.user});
    }

    const getItem = (item) => {

      this.props.navigation.navigate("TitleEdit", { user: this.props.route.params.user, title: item.title });
    }

    const renderFrontPage = ({ item }) => {

      return (

        <View style={styles.frontPageView}>
          <TouchableOpacity onPress={() => getItem(item)}>
            <Image style={styles.imagen} source={{ uri: item.front }} />
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: "center" }} > {item.title} </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (

      <View>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { user: this.props.route.params.user })}>
              <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
            </TouchableOpacity>
            M A N G A   L I B R A R Y  /  Edit titles
          </Text>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10, alignSelf: 'center' }} >
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: 'center' }} >S e l e c t   a   T i t l e   t o   E d i t</Text>
        </View>
        <View style={{marginBottom: 1}}>
          <Button color="#B50000" title=' A D D   T I T L E ' onPress={upload}></Button>
        </View>

        <FlatList
          style={{ marginBottom: 140 }}
          data={this.state.units}
          renderItem={renderFrontPage}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  frontPageView: {
    alignSelf: "center",
    width: 362,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 20,
    position: 'relative',
  },
  topBar: {
    backgroundColor: "#B50000",
    flexDirection: "row",
  },
  topBarTitle: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },
  imagen1: {
    width: 50,
    height: 40,
    marginTop: 5,
  },
  frontPage: {
    width: 261,
    height: 400,
    margin: 10,
    alignSelf: "center",
  },
  imagen: {
    width: 340,
    height: 440,
  },
})