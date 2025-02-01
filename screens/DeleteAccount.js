import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React, { Component } from 'react'

export default class Viewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteconfirmation: "X",
        }
    }

    render() {
        const deleteA = () => {

            let _this = this;

            if (this.state.password == this.state.passcon) {

                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {

                    if (this.readyState == 4 && this.status == 200) {

                        window.alert(xhttp.responseText);
                        if(xhttp.responseText == (_this.props.route.params.user + " Deleted Successfully!")) {

                            _this.props.navigation.navigate("Welcome");
                        }
                    }
                };
                xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/DeleteAccount.php?email=" + this.props.route.params.user + "&dc=" + this.state.deleteconfirmation, true);
                xhttp.send();
            } else {
                window.alert('TYPE "DELETE ' + this.props.route.params.user + '"');
            }
        }

        return (
            <View>
                <View style={styles.topBar}>
                    <View style={styles.topBar}>
                        <Text style={styles.topBarTitle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { user: this.props.route.params.user })}>
                                <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                            </TouchableOpacity>
                            M A N G A   L I B R A R Y
                        </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text} >Shared Titles will be preserved.</Text>
                    <Text style={styles.text} >This step cannot be reversed.</Text>
                </View>

                <Text style={styles.text1} >A r e    y o u    s h u r e    y o u    w a n t    d e l e t e    y o u r    a c c o u n t ?</Text>
                <TextInput style={styles.textinput} placeholder={'TYPE "DELETE ' + this.props.route.params.user + '"'} onChangeText={deleteconfirmation => this.setState({ deleteconfirmation })} />

                <View style={styles.btn}>
                    <Button color={"#B50000"} title=' D E L E T E    A C C O U N T ' onPress={deleteA}></Button>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    textinput: {
        alignSelf: 'center',
        width: 350,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        fontSize: 15,
        textAlign: "center",
        borderColor: "white",
        backgroundColor: "white",
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
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
        color: 'white',
    },
    text1: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        color: 'black',
    },
    container: {
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: '#B50000',
        width: 380,
    },
    btn: {
        marginTop: 150,
        alignSelf: "center",
        width: 250,
    },
})