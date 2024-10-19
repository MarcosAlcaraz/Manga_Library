import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


export default class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_acuerdo: "",
            id_usuario: this.props.route.params.id_usuario,
            voto: null,
            texto_valor_voto: "",
            texto_siguiente_acuerdo: "INICIAR",
            texto_boton_votar: "DISABLED",
            texto_boton_enviar: "Presiona INICIAR",
        };
    }

    render() {
        // Regresa el primer ID de acuerdo en la Base de Datos
        const consulta = () => {
            _this = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (xhttp.responseText == "0") {
                        _this.setState({id_acuerdo: ""});
                        _this.setState({texto_boton_enviar: "Finalizado"});
                        _this.setState({texto_boton_votar: "Finalizado"});
                        _this.setState({texto_siguiente_acuerdo: "Finalizado"});
                        _this.setState({texto_valor_voto: ""});
                        Alert.alert("Ya no hay Acuerdos para Votar");
                    } else {
                        // Imprime el id de usuario que recibió y guardo en this.state y lo mismo con id de acuerdo
                        console.log(_this.state.id_usuario);
                        console.log(_this.state.id_acuerdo);

                        // evalua si ya se elimino el voto presente para pasar al siguiente
                        if(_this.state.id_acuerdo == xhttp.responseText)
                        {
                            Alert.alert("Espera la orden de cambiar de acuerdo.")
                        } else {
                            _this.setState({texto_boton_enviar: "Selecciona una opción..."});
                            _this.setState({texto_boton_votar: "Votar"});
                            _this.setState({texto_siguiente_acuerdo: "Siguiente Acuerdo"});
                            _this.setState({id_acuerdo: xhttp.responseText});
                        }
                    }
                }
            };
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_consulta.php", true);
            xhttp.send();
        }

        // Ejecuta el Voto
        const votar = () => {
            _this = this;
            if(_this.state.voto != null) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    // evalua si 1: se ralizo el voto exitosamente. 2: ya votaste y debes esperar la orden de cambiar de acuerdo. y 0: que no se pudo realizar el voto por x o y razón
                    if(xhttp.responseText == "1") {
                        Alert.alert("¡VOTO REALIZADO!");
                    } else if(xhttp.responseText == "0") {
                        Alert.alert("ERROR", "Selecciona Siguiente Acuerdo");
                    } else if(xhttp.responseText == "2") {
                        Alert.alert("Ya votaste, Espera al Administrador.");
                    }
                }
            };
            xhttp.open("GET", "https://moviles21.000webhostapp.com/pf/pf_votar.php?&id_usuario=" + this.state.id_usuario + "&id_acuerdo=" + this.state.id_acuerdo + "&voto=" + this.state.voto, true);
            xhttp.send();

            console.log(xhttp.responseText === "1");
            } else {
                Alert.alert("Elige una opción");               
            }
        }

        // Cambia el valor del boton paa envia boto a "Votar!"
        const votado = () => {
            this.setState({texto_boton_enviar: "Votar!"});
            console.log(this.state.voto);
        }

        //this.props.route.params.acuerdo

        return (
            <View>
                <Text style={{ fontSize: 20, alignSelf: 'center', margin: 10 }}> {this.state.id_acuerdo} </Text> 

                
                <Text style={style.txt}>A favor:</Text>
                <TouchableOpacity style={style.voto} onPress={() => {this.setState({texto_valor_voto: "A FAVOR"}); this.setState({voto: 0}); votado();}}>
                    <Text style={style.txtbutton}> {this.state.texto_boton_votar} </Text>
                </TouchableOpacity>
                <Text style={style.txt}>En Contra:</Text>
                <TouchableOpacity style={style.voto} onPress={() => {this.setState({texto_valor_voto: "EN CONTRA"}); this.setState({voto: 1}); votado();}}>
                    <Text style={style.txtbutton}> {this.state.texto_boton_votar} </Text>
                </TouchableOpacity>
                <Text style={style.txt}>Se Abstiene:</Text>
                <TouchableOpacity style={style.voto} onPress={() => {this.setState({texto_valor_voto: "SE ABSTIENE"}); this.setState({voto: 2}); votado(); }}>
                    <Text style={style.txtbutton}> {this.state.texto_boton_votar} </Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center', fontSize: 30}}> {this.state.texto_valor_voto} </Text>

                <TouchableOpacity style={{marginTop: 50, borderWidth: 1, backgroundColor: 'yellow', height: 25, width: 220, borderRadius: 10, alignSelf: 'center'}} onPress={votar}>
                    <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}> {this.state.texto_boton_enviar} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 50, borderWidth: 1, backgroundColor: 'lightblue', height: 30, width: 150, borderRadius: 10, alignSelf: 'center'}} onPress={consulta}>
                    <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}> {this.state.texto_siguiente_acuerdo} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    txtbutton: {
        color: 'white',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },

    txt: {
        fontSize: 20,
        margin: 5
    },

    voto: {
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'gray',
        width: 100,
        height: 35,
        borderRadius: 30,
        alignSelf: 'flex-end',
    }
});