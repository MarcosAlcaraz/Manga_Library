import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { Component } from 'react'

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            front: "",
            pdf: "",
            updated: false,
        }
    }

    render() {

        const logout = () => {
            let _this = this;
            if(_this.state.updated == true) {
                _this.props.navigation.navigate("Welcome");
            } else {
                window.alert("No title has been shared yet.");
            }
        }

        const upload = () => {
            let _this = this;
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhttp.responseText);

                    if(xhttp.responseText = "Title Shared Successfully!") {
                        _this.state.updated = true;
                    }

                    window.alert(xhttp.responseText);
                }
            };
            xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/upload.php?title=" + this.state.title + "&front=" + this.state.front + "&pdf=" + this.state.pdf + "&artist=" + this.props.route.params.user, true);
            xhttp.send();
        }
        return (
            <View>
                <View style={styles.topBar}>

                    <Text style={styles.topBarTitle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library")}>
                            <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                        </TouchableOpacity>
                        M A N G A   L I B R A R Y     /     U P L O A D
                    </Text>

                </View>

                <View style={{ marginTop: 30, alignSelf: 'center' }} >
                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: 'center' }} >S H A R E   A   N E W   T I T L E</Text>
                </View>

                <TextInput style={styles.textinput} placeholder={"Title"} onChangeText={title => this.setState({ title })} />
                <TextInput style={styles.textinput} placeholder={"Front Url"} onChangeText={front => this.setState({ front })} />
                <TextInput style={styles.textinput} placeholder={"PDF Url"} onChangeText={pdf => this.setState({ pdf })} />

                <View style={styles.btn}>
                    <Button color="#B50000" title=' U p l o a d ' onPress={upload}></Button>
                </View>
                <View style={styles.btn}>
                    <Button color={"#B50000"} title=' Log Out to Refresh' onPress={logout}></Button>
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
    textinput: {
        width: 250,
        marginLeft: 70,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 50,
        fontSize: 15,
        textAlign: "center",
        borderColor: "white",
        backgroundColor: "white",
        fontWeight: "bold",
    },
    btn: {
        marginTop: 60,
        width: 240,
        alignSelf: "center",
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