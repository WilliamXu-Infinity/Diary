import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';


import Logo from '../components/Logo'

export default class Signup extends Component {

    componentWillMount() {
        AsyncStorage.getItem('user').then(val => {
            try{
                const user = JSON.parse(val);
                if(user != null)
                    this.setState({user: user});
                console.log("SignupPage data: " + val);
            } catch (e) {
                console.log("SignupPage Error: " + e);
            }
        });
    }

    goBack() {
        Actions.pop()
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                noteArray: [],
                noteText: '',
                noteCount: '0',
            }       
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Logo/>

                <View style={styles.container}>
                    <TextInput 
                        onChangeText={(val) => {
                            const user = Object.assign({}, this.state.user, {name: val});
                            this.setState({user});
                        }}
                        style={styles.inputBox} 
                        placeholder = "User Name"
                    />
                    <TextInput 
                        onChangeText={(val) => {
                            const user = Object.assign({}, this.state.user, {email: val});
                            this.setState({user});
                        }}
                        style={styles.inputBox} 
                        placeholder = "Email"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        onChangeText={(val) => {
                            const user = Object.assign({}, this.state.user, {password: val});
                            this.setState({user});
                        }}
                        style={styles.inputBox} 
                        placeholder = "Password"
                        secureTextEntry={true}
                    />
                    <TextInput 
                        onChangeText={(val) => {
                            const user = Object.assign({}, this.state.user, {password_confirmation: val});
                            this.setState({user});
                        }}
                        style={styles.inputBox} 
                        placeholder = "Re-enter Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={this.registerNewAccount.bind(this)}
                        >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>

                    <TouchableOpacity onPress={this.goBack}>
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        );
    }

    registerNewAccount(){
        if(this.state.user.password == this.state.user.password_confirmation){
            const data = JSON.stringify(this.state.user);
            AsyncStorage.setItem('user', data);
            console.log(data + ' data has been saved')
            this.goBack();
        }
        else {
            alert("password are not the same");
            const user = Object.assign({}, this.state.user, {password: '', password_confirmation: ''});
            this.setState({user});
            return false;
        }
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#455a64',
        flexGrow: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    signupTextCont:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText:{
        color: 'white'
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
})