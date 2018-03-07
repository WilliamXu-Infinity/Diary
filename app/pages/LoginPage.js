import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    AsyncStorage,
    Alert,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';


import Logo from '../components/Logo'

export default class Login extends Component {

    signup(){
        Actions.signup();
    }

    mainPage() {
        Actions.main();
    }

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Logo/>

                <View style={styles.container}>
                    <TextInput 
                        onChangeText={(userName) => this.setState({userName})}
                        value={this.state.userName}
                        style={styles.inputBox} 
                        placeholder = "User Name"
                    />
                    <TextInput 
                        onChangeText={(password) => this.setState({password})}
                        style={styles.inputBox} 
                        placeholder = "Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={this.checkLoginInfo.bind(this)}
                        >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress = {this.cleanData.bind(this)}>
                        <Text style={styles.buttonText} >Clean Data</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}>
                        <Text>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    checkLoginInfo = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log("LoginPage successful: \n");
            if(parsed.password == this.state.password){
                this.mainPage();
            } 
            else {
                alert("password is wrong");
                this.setState({password: ''});
            }
        } catch(error){
                alert("You don't have password yet.");
        }
    }

    cleanData(){
        Alert.alert(
            'Clean Date',
            'You sure you want clean all the data?',
            [
                {text: 'yes', onPress: () => AsyncStorage.clear()},
                {text: 'no'}
            ], 
            {cancelable: false}
        );
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
});