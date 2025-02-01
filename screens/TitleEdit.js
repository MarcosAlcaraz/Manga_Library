import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import SelectDropdown from 'react-native-select-dropdown';

export default class TitleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: [],
            title: "nodata",
            currenttitle: this.props.route.params.title,
            front: "nodata",
            pdf: "nodata",
            artist: "nodata",
            query: "UPDATE `mangaLibray` SET ",
            deleteconfirmation: "X",
            updated: 0,
            editted: false,
        }
    }

    componentDidMount() {

        let _this = this;
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myArr = JSON.parse(xhttp.responseText);
                _this.setState({ unit: myArr });
            }
        };

        xhttp.open('GET', 'https://ppi-project.000webhostapp.com/ppifinal/showtitledata.php?title=' + this.props.route.params.title, true);
        xhttp.send();
    }

    render() {

        const logout = () => {
            let _this = this;
            if (_this.state.editted == true) {
                _this.props.navigation.navigate("Welcome");
            } else {
                window.alert("No changes, edit something to refresh.");
            }
        }

        const savetitle = () => {

            let _this = this;
            let xhttp0 = new XMLHttpRequest();

            xhttp0.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log(xhttp0.responseText);

                    if (xhttp0.responseText != '1') {

                        window.alert(xhttp0.responseText);
                    } else {

                        console.log(_this.state.title);

                        if (_this.state.title != "nodata") {
                            _this.state.query += "`title` = '" + _this.state.title + "'";
                            _this.state.updated = 1;
                        }
                        if (_this.state.front != "nodata") {
                            if (_this.state.updated == 1) {
                                _this.state.query += ", ";
                            }
                            _this.state.query += " `front` = '" + _this.state.front + "'";
                            _this.state.updated = 1;
                        }
                        if (_this.state.pdf != "nodata") {
                            if (_this.state.updated == 1) {
                                _this.state.query += ", ";
                            }
                            _this.state.query += "`pdf` = '" + _this.state.pdf + "'";
                            _this.state.updated = 1;
                        }

                        _this.state.query += " WHERE `mangaLibray`.`title`='" + _this.state.currenttitle + "'";

                        console.log(_this.state.query);

                        let xhttp = new XMLHttpRequest();

                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                console.log(xhttp.responseText);
                                if (xhttp.responseText === '1') {
                                    window.alert("Title data has been successfully Updated!, Log Out to refresh.");
                                    _this.setState({ editted: true });
                                } else if (xhttp.responseText === '0') {
                                    window.alert("Something is wrong. Try again!.");
                                }
                            }
                        };
                        xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/TitleEdit.php?query=" + _this.state.query, true);
                        xhttp.send();
                    }
                }
            };
            xhttp0.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/urlvalid.php?front=" + this.state.front + "&pdf=" + this.state.pdf, true);
            xhttp0.send();
        }

        const deletetitle = () => {

            let _this = this;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log(xhttp.responseText);

                    if (xhttp.responseText === '1') {

                        _this.setState({editted: true});
                        window.alert("Title data has been Deleted Updated!, Log Out to refresh.");
                    } else if (xhttp.responseText === '0') {

                        window.alert("Something is wrong, try again later.");
                    } else {

                        window.alert(xhttp.responseText);
                    }
                }
            };
            xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/DeleteTitle.php?title=" + _this.state.currenttitle + "&dc=" + _this.state.deleteconfirmation, true);
            xhttp.send();
        }

        const renderdata = ({ item }) => {
            return (
                <View>
                    <View style={styles.topBar}>
                        <Text style={styles.topBarTitle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { member: item.member, user: item.email })}>
                                <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                            </TouchableOpacity>
                            M A N G A   L I B R A R Y / Editing {item.title}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 30, textAlign: 'center', color: "black", fontWeight: 'bold', margin: 15 }} >{item.title}</Text>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }} >M a n a g e    I n f o:</Text>

                    <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >T i t l e</Text>
                    <TextInput style={styles.textinput} placeholder={item.title} onChangeText={title => this.setState({ title })} />
                    <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >F r o n t   I m a g e   U R L</Text>
                    <TextInput style={styles.textinput} placeholder={item.front} onChangeText={front => this.setState({ front })} />
                    <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >P D F   U R L</Text>
                    <TextInput style={styles.textinput} placeholder={item.pdf} onChangeText={pdf => this.setState({ pdf })} />

                    <View style={{ marginTop: 20, alignSelf: "center", width: 300 }}>
                        <Button color={"#B50000"} title=' S a v e    C h a n g e s ' onPress={savetitle}></Button>
                    </View>

                    <TextInput style={styles.textinput} placeholder={'Type "DELETE" to Confirm'} onChangeText={deleteconfirmation => this.setState({ deleteconfirmation })} />
                    <View style={styles.btn}>
                        <Button color={"red"} title='D E L E T E   T I T L E' onPress={deletetitle}></Button>
                    </View>
                    <View style={{ alignSelf: "center", width: 300 }}>
                        <Button color={"#B50000"} title=' Log Out to Refresh' onPress={logout}></Button>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <View>
                    <FlatList
                        data={this.state.unit}
                        renderItem={renderdata}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    profileimage: {
        width: 200,
        height: 200,
        borderRadius: 180,
        overflow: "hidden",
        borderWidth: 0,
        alignSelf: 'center',
        margin: 25,
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
    btn: {
        margin: 30,
        alignSelf: "center",
        width: 300,
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