import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

export default class InputForm extends Component {

    mainPage() {
        Actions.main()
    }

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    render(){
        return(
            <View style={styles.container2}>
                <TextInput 
                    onChangeText={(val) => this.setState({userName: val})}
                    style={styles.inputBox} 
                    placeholder = "User Name"
                    onSubmitEditing={()=> this.password.focus()}
                />
                <TextInput 
                    onChangeText={(val) => this.setState({password: val})}
                    style={styles.inputBox} 
                    placeholder = "Password"
                    secureTextEntry={true}
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={this.loginAction}
                    >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    loginAction(){
        AsyncStorage.getItem('myAccount', (err, result) => {
            if(result == this.state.password)
                mainPage();
            else {
                this.setState({passowrd: ''});
                this.setState({userName: ''});
            }
        });
        
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