import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { Component } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      age: "",
      member: -1,
      password: "",
      passcon: "",
      profileimage: "",
    }
  }

  render() {
    const signup = () => {
      if (this.state.password == this.state.passcon) {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            window.alert(xhttp.responseText);
          }
        };
        xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/signup.php?email=" + this.state.email + "&name=" + this.state.name + "&age=" + this.state.age + "&member=" + this.state.member + "&password=" + this.state.password + "&profileImage=" + this.state.profileimage, true);
        xhttp.send();
      } else {
        window.alert("Passwords do not match.");
      }
    }
    return (
      <View>
        <View style={styles.topBar}>

          <Text style={styles.topBarTitle}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Welcome")}>
              <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
            </TouchableOpacity>
            M A N G A   L I B R A R Y     /     Sign Up
          </Text>

        </View>

        <TextInput style={styles.textinput} placeholder={"Email"} onChangeText={email => this.setState({ email })} />
        <TextInput style={styles.textinput} placeholder={"Name"} onChangeText={name => this.setState({ name })} />
        <TextInput style={styles.textinput} placeholder={"Birthday date (yyyy-mm-dd)"} onChangeText={age => this.setState({ age })} />
        <View style={styles.selectdropdown}>
          <SelectDropdown data={["Standard User", "Artist"]}
            onSelect={(selecteditem ,index) => {
              this.setState({ member: index });
            }}
          />
        </View>
        <TextInput style={styles.textinput} placeholder={"Password"} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
        <TextInput style={styles.textinput} placeholder={"Write again your password"} secureTextEntry={true} onChangeText={passcon => this.setState({ passcon })} />
        <Text style={{ marginLeft: 149, fontSize: 20, color: "black", marginTop: 10 }} >*Optional*</Text>
        <TextInput style={styles.textinput} placeholder={"URL Profile Image"} onChangeText={profileimage => this.setState({ profileimage })} />

        <View style={styles.btn}>
          <Button color={"#B50000"} title=' SIGN UP ' onPress={signup}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    marginLeft: 50,
    marginBottom: 5,
    color: "Black",
    fontWeight: "bold",
  },
  selectdropdown: {
    width: 200,
    borderWidth: 1,
    borderColor: "lightgray",
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 250,
    marginLeft: 70,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    fontSize: 15,
    textAlign: "center",
    borderColor: "white",
    backgroundColor: "white",
  },
  btn: {
    margin: 30,
    alignSelf: "center",
    width: 250,
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
})