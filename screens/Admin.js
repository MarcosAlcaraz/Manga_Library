import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_acuerdo: "",
            texto_siguiente_acuerdo: "INICIAR",
            texto_boton_enviar: "Presiona INICIAR",
            votos: "",
        };
    }

    render() {
        // Regresa el primer ID de acuerdo en la Base de Datos junto a sus votos
        const consulta = () => {
            _this = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (xhttp.responseText == "0") {
                        Alert.alert("Ya no hay Acuerdos para Votar");
                    } else {
                        // evalua si ya se elimino el voto presente para pasar al siguiente
                        let id_usuario_responseText = "";
                        for (let i = 0; i < 10; i++) {
                            id_usuario_responseText = id_usuario_responseText + xhttp.responseText[i];
                        }
                        console.log(_this.state.id_acuerdo);
                        console.log(xhttp.response);

                        _this.setState({ id_acuerdo: "" });
                        _this.setState({ votos: "" });
                        for (let i = 0; i < 10; i++) {
                            _this.setState({ id_acuerdo: _this.state.id_acuerdo + xhttp.responseText[i] });
                        }
                        for (let i = 10; i < 13; i++) {
                            _this.setState({ votos: _this.state.votos + xhttp.responseText[i] });
                        }

                        _this.setState({ texto_boton_enviar: "RESETEAR VOTOS" });
                        _this.setState({ texto_boton_votar: "Votar" });
                        _this.setState({ texto_siguiente_acuerdo: "REFRESCAR" });

                        console.log("--> ", _this.state.id_acuerdo, " <--");
                        console.log("--> ", _this.state.votos, " <--");
                    }
                }
            };
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_resultados.php", true);
            xhttp.send();
        }

        const resetear_votos = () => {
            _this = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (xhttp.responseText == "0") {
                        Alert.alert("ERROR", "Algo salio mal. Intentalo de nuevo.");
                    } else {
                        // Le asigna valores a los votos a favor, en contra y a se abstiene
                        _this.setState({ id_acuerdo: "" });
                        _this.setState({ votos: "" });
                        Alert.alert("Reseteo de Acuerdo Exitoso");
                    }
                }
            };
            console.log(_this.state.id_acuerdo)
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_resetear.php", true);
            xhttp.send();
        }

        return (
            <View>
                <Text style={{ fontSize: 20, alignSelf: 'center', margin: 10 }}> ADMIN {this.state.id_acuerdo} </Text>


                <Text style={style.txt}>A favor:</Text>
                <Text style={style.txtbutton}> {this.state.votos[0]} </Text>

                <Text style={style.txt}>En Contra:</Text>
                <Text style={style.txtbutton}> {this.state.votos[1]} </Text>

                <Text style={style.txt}>Se Abstiene:</Text>
                <Text style={style.txtbutton}> {this.state.votos[2]} </Text>

                <Text style={{ textAlign: 'center', fontSize: 30 }}> {this.state.texto_valor_voto} </Text>

                <TouchableOpacity style={{ marginTop: 50, borderWidth: 1, backgroundColor: 'red', height: 25, width: 220, borderRadius: 10, alignSelf: 'center' }} onPress={resetear_votos}>
                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}> {this.state.texto_boton_enviar} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50, borderWidth: 1, backgroundColor: 'lightblue', height: 30, width: 150, borderRadius: 10, alignSelf: 'center' }} onPress={() => { consulta(); }}>
                    <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}> {this.state.texto_siguiente_acuerdo} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    txtbutton: {
        alignSelf: 'flex-end',
        color: 'black',
        marginTop: 5,
        fontSize: 50,
        textAlign: 'center',
    },

    txt: {
        fontSize: 20,
        margin: 5
    },
});