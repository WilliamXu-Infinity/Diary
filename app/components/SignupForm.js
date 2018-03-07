import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class InputForm extends Component {

    returnBack() {
        Actions.login()
    }

    constructor() {
        super();

        this.state = {
            account: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                errors: []
            }
            
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    onChangeText={(val) => this.setState({name: val})}
                    style={styles.inputBox} 
                    placeholder = "User Name"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput 
                    onChangeText={(val) => this.setState({email: val})}
                    style={styles.inputBox} 
                    placeholder = "Email"
                    keyboardType="email-address"
                />
                <TextInput 
                    onChangeText={(val) => this.setState({password: val})}
                    style={styles.inputBox} 
                    placeholder = "Password"
                    secureTextEntry={true}
                    ref={(input) => this.password = input}
                />
                <TextInput 
                    onChangeText={(val) => this.setState({password_confirmation: val})}
                    style={styles.inputBox} 
                    placeholder = "Re-enter Password"
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={this.returnBack} style={styles.loginButton}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        );
    }

    registerNewAccount(){
        AsyncStorage.setItem('myAccount', JSON.stringify(this.state.account.password));
        returnBack();
    }
}

const styles = StyleSheet.create({
    container2: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        height: 44,
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    loginButton: {
        paddingTop: 10
    },
    buttonText: {
        color: 'white',
    }
});