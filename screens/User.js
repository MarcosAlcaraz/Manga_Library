import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import SelectDropdown from 'react-native-select-dropdown';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            email: "nodata",
            currentemail: this.props.route.params.user,
            name: "nodata",
            age: "nodata",
            member: -1,
            memberstring: "nodata",
            password: "nodata",
            passcon: "nodata",
            profileimage: "https://ppi-project.000webhostapp.com/img/icons/user.png",
            currentpi: "",
            query: "UPDATE `users` SET ",
            updated: 0,
        }
    }

    componentDidMount() {

        let _this = this;
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myArr = JSON.parse(xhttp.responseText);
                _this.setState({ user: myArr });
            }
        };

        xhttp.open('GET', 'https://ppi-project.000webhostapp.com/ppifinal/showuserdata.php?email=' + this.props.route.params.user, true);
        xhttp.send();
    }

    render() {
        const savechanges = () => {
            let _this = this;

            if (_this.state.email != "nodata") {
                this.state.query += "`email` = '" + this.state.email + "'";
                this.state.updated = 1;
            }
            if (_this.state.name != "nodata") {
                if (this.state.updated == 1) {
                    this.state.query += ", ";
                }
                this.state.query += " `name` = '" + this.state.name + "'";
                this.state.updated = 1;
            }
            if (_this.state.age != "nodata") {
                if (this.state.updated == 1) {
                    this.state.query += ", ";
                }
                this.state.query += " `age` = '" + this.state.age + "'";
                this.state.updated = 1;
            }
            if (_this.state.member != -1) {
                if (this.state.updated == 1) {
                    this.state.query += ", ";
                }
                this.state.query += " `member` = '" + this.state.member + "'";
                this.state.updated = 1;
            }
            if (_this.state.profileimage != "https://ppi-project.000webhostapp.com/img/icons/user.png") {
                if (this.state.updated == 1) {
                    this.state.query += ", ";
                }
                this.state.query += " `profileImage` = '" + this.state.profileimage + "'";
                this.state.updated = 1;
            }

            this.state.query += " WHERE `users`.`email`='" + this.state.currentemail + "'";

            console.log(this.state.query);


            let xhttp0 = new XMLHttpRequest();

            xhttp0.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log(xhttp0.responseText);

                    if (xhttp0.responseText != '1') {

                        window.alert(xhttp0.responseText);
                    } else {

                        let xhttp = new XMLHttpRequest();

                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                console.log(xhttp.responseText);
                                if (xhttp.responseText === '1') {
                                    window.alert("User data has been successfully Updated!, Returning to Login Screen.");
                                    _this.props.navigation.navigate("Welcome");
                                } else if (xhttp.responseText === '0') {
                                    window.alert("Something is wrong, pleace try again.");
                                    _this.setState({query: "UPDATE `users` SET "});
                                }
                            }
                        };
                        xhttp.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/updateuserdata.php?query=" + _this.state.query, true);
                        xhttp.send();
                    }
                }
            };
            xhttp0.open("GET", "https://ppi-project.000webhostapp.com/ppifinal/urlvalid0.php?url=" + this.state.profileimage +"&email=" + this.state.email, true);
            xhttp0.send();
        }

        const titlemanager = () => {
            let _this = this;
            _this.props.navigation.navigate("TitleManager", { user: this.props.route.params.user });
        }

        const logout = () => {
            let _this = this;
            _this.props.navigation.navigate("Welcome");
        }

        const changepassword = () => {
            let _this = this;
            _this.props.navigation.navigate("ChangePassword", { user: this.props.route.params.user });
        }

        const deleteAccount = () => {
            let _this = this;
            _this.props.navigation.navigate("DeleteAccount", { user: this.props.route.params.user });
        }

        const renderdata = ({ item }) => {

            let pf = "https://ppi-project.000webhostapp.com/img/icons/user.png";

            if (item.profileImage != "") {
                pf = item.profileImage;
            }

            if (item.member == 1) {

                return (
                    <View>
                        <View style={styles.topBar}>
                            <Text style={styles.topBarTitle}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { member: item.member, user: item.email })}>
                                    <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                                </TouchableOpacity>
                                M A N G A   L I B R A R Y / {item.name}
                            </Text>
                        </View>

                        <View>
                            <Image style={styles.profileimage} source={{ uri: pf }} />
                        </View>
                        <Text style={{ fontSize: 25, textAlign: 'center', color: "black", fontWeight: 'bold', marginBottom: 15 }} >{item.name}</Text>
                        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }} >Manage Info:</Text>

                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >URL Profile Image</Text>
                        <TextInput style={styles.textinput} placeholder={item.profileImage} onChangeText={profileimage => this.setState({ profileimage })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Email</Text>
                        <TextInput style={styles.textinput} placeholder={item.email} onChangeText={email => this.setState({ email })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Name</Text>
                        <TextInput style={styles.textinput} placeholder={item.name} onChangeText={name => this.setState({ name })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Birthday date</Text>
                        <TextInput style={styles.textinput} placeholder={item.age} onChangeText={age => this.setState({ age })} />
                        <Text style={{ textAlign: 'center', marginTop: 10, color: "black" }} >Member Level: Artist</Text>
                        <View style={styles.selectdropdown}>
                            <SelectDropdown data={["Standard User", "Artist"]}
                                onSelect={(nada, index) => {
                                    this.setState({ member: index });
                                }}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title='Manage Shared Titles' onPress={titlemanager}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Change Password ' onPress={changepassword}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Save Changes ' onPress={savechanges}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Log Out ' onPress={logout}></Button>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Button color={"red"} title=' D E L E T E   A C C O U N T ' onPress={deleteAccount}></Button>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View>
                        <View style={styles.topBar}>
                            <Text style={styles.topBarTitle}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", { member: item.member, user: item.email })}>
                                    <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                                </TouchableOpacity>
                                M A N G A   L I B R A R Y / {item.name}
                            </Text>
                        </View>

                        <View>
                            <Image style={styles.profileimage} source={{ uri: item.profileImage }} />
                        </View>
                        <Text style={{ fontSize: 25, textAlign: 'center', color: "black", fontWeight: 'bold', marginBottom: 15 }} >{item.name}</Text>
                        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }} >Manage Info:</Text>

                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >URL Profile Image</Text>
                        <TextInput style={styles.textinput} placeholder={item.profileImage} onChangeText={profileimage => this.setState({ profileimage })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Email</Text>
                        <TextInput style={styles.textinput} placeholder={item.email} onChangeText={email => this.setState({ email })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Name</Text>
                        <TextInput style={styles.textinput} placeholder={item.name} onChangeText={name => this.setState({ name })} />
                        <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 10 }} >Birthday date</Text>
                        <TextInput style={styles.textinput} placeholder={item.age} onChangeText={age => this.setState({ age })} />
                        <Text style={{ textAlign: 'center', marginTop: 10, color: "black" }} >Member Level: Standart User</Text>
                        <View style={styles.selectdropdown}>
                            <SelectDropdown data={["Standard User", "Artist"]}
                                onSelect={(nada, index) => {
                                    this.setState({ member: index });
                                }}
                            />
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Change Password ' onPress={changepassword}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Save Changes ' onPress={savechanges}></Button>
                        </View>
                        <View style={styles.btn}>
                            <Button color={"#B50000"} title=' Log Out ' onPress={logout}></Button>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Button color={"red"} title=' D E L E T E   A C C O U N T ' onPress={deleteAccount}></Button>
                        </View>
                    </View>
                );
            }
        }

        return (
            <View>
                <View>
                    <FlatList
                        data={this.state.user}
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
        margin: 20,
        alignSelf: "center",
        width: 300,
    },
    btn1: {
        margin: 20,
        alignSelf: "center",
        width: 100,
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