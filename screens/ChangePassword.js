import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { Component } from 'react'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpassword: "",
            password: "",
            passcon: "",
        }
    }

    render() {
        const changepassword = () => {

            let _this = this;
            let xhttp0 = new XMLHttpRequest();

            xhttp0.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    console.log(xhttp0.responseText);
                    if (xhttp0.responseText === 'noconection') {

                        window.alert("The current password is Wrong. Try again!");
                    } else if (xhttp0.responseText === '1') {

                        if (_this.state.password == _this.state.passcon) {
                            let xhttp = new XMLHttpRequest();
                            
                            xhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log(xhttp.responseText);
                                    if (xhttp.responseText === '1') {
                                        window.alert("Password changed successfully!, Returning to Login Screen.");
                                        _this.props.navigation.navigate("Welcome");
                                    } else if (xhttp.responseText === '0') {
                                        window.alert("Something is wrong, Try again later");
                                    }
                                }
                            };
                            xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/changepassword.php?email=" + _this.props.route.params.user + "&pass=" + _this.state.password, true);
                            xhttp.send();
                        } else {
                            window.alert("Passwords do not match.")
                        }
                    }
                }
            };
            xhttp0.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/login.php?Email=" + this.props.route.params.user + "&Password=" + this.state.currentpassword, true);
            xhttp0.send();
        }
        return (
            <View>
                <View style={styles.topBar}>

                    <Text style={styles.topBarTitle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { user: this.props.route.params.user })}>
                            <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                        </TouchableOpacity>
                        M A N G A   L I B R A R Y / Change Password
                    </Text>

                </View>
                <Text style={{ fontSize: 20, color: "black", marginTop: 10, alignSelf: 'center' }} >Write the current password:</Text>
                <TextInput style={styles.textinput} placeholder={"Current Password"} secureTextEntry={true} onChangeText={currentpassword => this.setState({ currentpassword })} />
                <Text style={{ fontSize: 20, color: "black", marginTop: 10, alignSelf: 'center' }} >Write a New password:</Text>
                <TextInput style={styles.textinput} placeholder={"New Password"} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                <TextInput style={styles.textinput} placeholder={"Write again your password"} secureTextEntry={true} onChangeText={passcon => this.setState({ passcon })} />
                <View style={styles.btn}>
                    <Button color={"#B50000"} title=' Save New Password ' onPress={changepassword}></Button>
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