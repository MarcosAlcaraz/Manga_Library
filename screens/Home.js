import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'

export default class Pantallab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      profileimage: "https://ppi-project.000webhostapp.com/img/icons/user.png",
    };
  }

  componentDidMount() {

    let _this = this;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText === '0') {
          window.alert("Data Base Error : No files saved or bad request.");
        }
        else {
          let myArr = JSON.parse(this.responseText);
          _this.setState({ units: myArr });
        }
      }
    };

    xhttp.open('GET', 'https://ppi-project.000webhostapp.com/ppifinal/showFrontPage.php', true);
    xhttp.send();

    let xhttp0 = new XMLHttpRequest();

    xhttp0.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp0.responseText);
        
        if(xhttp0.responseText != "") {
          _this.setState({ profileimage: xhttp0.responseText });
        }
      }
    };

    xhttp0.open('GET', 'https://ppi-project.000webhostapp.com/ppifinal/showprofileimage.php?email=' + this.props.route.params.user, true);
    xhttp0.send();

  }

  render() {
    const getItem = (item) => {
      this.props.navigation.navigate("Viewer", { Title: item.title, Front: item.front, pdf: item.pdf, profileimage: this.state.profileimage, user: this.props.route.params.user, member: this.props.route.params.member });
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

    return(
      <View>
          <View style={styles.topBar}>
            <Text style={styles.topBarTitle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", {user: this.props.route.params.user})}>
                <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
              </TouchableOpacity>
              M A N G A   L I B R A R Y
              <TouchableOpacity onPress={() => this.props.navigation.navigate("User", {user: this.props.route.params.user})}>
                <Image style={styles.imagen2} source={{ uri: this.state.profileimage }} />  
              </TouchableOpacity>
            </Text>
          </View>

          <FlatList
            style={{ marginBottom: 60 }}
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
  imagen2: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 0,
    marginLeft: 125,
    marginTop: 7,
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