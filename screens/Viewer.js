import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'
import Pdf from 'react-native-pdf';

export default class Viewer extends Component {
    render() {
        const source = { uri: this.props.route.params.pdf, cache: true }
        return (
            <View>
                <View style={styles.topBar}>
                    <View style={styles.topBar}>
                        <Text style={styles.topBarTitle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Manga Library", {user: this.props.route.params.user})}>
                                <Image style={styles.imagen1} source={{ uri: "https://ppi-project.000webhostapp.com/img/icons/m.png" }} />
                            </TouchableOpacity>
                            M A N G A   L I B R A R Y
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("User", {user: this.props.route.params.user})}>
                                <Image style={styles.imagen2} source={{ uri: this.props.route.params.profileimage }} />
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>

                <View style={styles.container} >
                    <Pdf
                        trustAllCerts={false}
                        source={source}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}
                    />
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
    imagen2: {
        width: 40,
        height: 40,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 0,
        marginLeft: 125,
        marginTop: 7,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})