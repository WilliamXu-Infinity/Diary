import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class Login extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image
                    style={{width: 79, height: 100}}
                    source={require('../images/img_logo.png')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});