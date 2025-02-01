import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native'
import React, { Component } from 'react'

export default class Inicio

  extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      Email: "",
      Password: "",
    };
  }

  render() {
    const signup = () => {
      this.props.navigation.navigate("SignUp")
    }
    const login = () => {

      let _this = this;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          if (xhttp.responseText === 'noconection') {
            window.alert("Email o Contraseña Incorrectos");
          } else if (xhttp.responseText === '1') {
            _this.props.navigation.navigate("Manga Library", {member: 1, user: _this.state.Email});
          } else if (xhttp.responseText === '0') {
            _this.props.navigation.navigate("Manga Library", {member: 0, user: _this.state.Email});
          }
        }
      };
      xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/login.php?Email=" + this.state.Email + "&Password=" + this.state.Password, true);
      xhttp.send();
    }

    return (
      <View>

        <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />

        <Text style={styles.encabezado}>M A N G A  L I B R A R Y  </Text>

        <TextInput style={styles.inputs}
          placeholder="Email"
          onChangeText={Email => this.setState({ Email })}
        />

        <TextInput style={styles.inputs} placeholder="Password"
          secureTextEntry={true}
          onChangeText={Password => this.setState({ Password })}
        />

        <View style={styles.btn}>
          <Button color={"red"} title='  LOG IN  ' onPress={login}></Button>
          <Text>     or     </Text>
          <Button color={"red"} title=' SIGN UP ' onPress={signup}></Button>
        </View>
        <Text style={{ color: "gray", alignSelf: "center", marginTop: 60 }}>Made by Alcaraz Valdivia Marcos Fernando</Text>
        <Text style={{ color: "gray", alignSelf: "center" }}>marcos.alcaraz0260@alumnos.udg.mx</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    margin: 30,
    alignSelf: 'center',
    flexDirection: "row",
  },
  encabezado: {
    fontSize: 27,
    textAlign: "center",
    color: "red",
    marginBottom: 50,
    marginTop: 20,
  },
  imagen1: {
    width: 108,
    height: 150,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  inputs: {
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
  },
})