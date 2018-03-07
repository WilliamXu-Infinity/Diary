import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {Icon, Button} from 'native-base';


export default class Note extends Component {
    render() {
        return (
                <TouchableHighlight
                    onPress={this.props.editDiary}
                >
                    <View key={this.props.keyval} style={styles.note}>
                        <Text style={styles.noteText}>{
                            this.props.val.date.month    + "/" +
                            this.props.val.date.date     + "/" + 
                            this.props.val.date.year     + " " + 
                            this.props.val.date.weekday  + " " +
                            this.props.val.time.hour     + ":" +
                            this.props.val.time.minutes  + " " +
                            this.props.val.time.type     + " " + 
                            this.props.val.location.city + " " +
                            this.props.val.weather.main
                        }</Text>
                        <Text style={styles.noteText}>{
                            this.displayText(this.props.val.note)
                        }</Text>
                        
                        <Button 
                            icon transparent
                            onPress={this.props.deleteMethod}
                            style={styles.noteDelete}
                        >
                            <Icon name='trash'/>
                        </Button>
                    </View>
                </TouchableHighlight>
        );
    }

    displayText(str){
        if(str.length <= 40)
            return str;
        else {
            return str.substring(0, 37) + ' ...';
        }
    }
}


const styles = StyleSheet.create({
    note: {
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: 'white',
    },
    noteText: {
        paddingLeft: 0,
        paddingTop: 8,
        borderLeftWidth: 0,
        borderLeftColor: '#E91E63'
    },
    noteDelete: {
        position: 'absolute',
        top: 15,
        right: 0
    }
});