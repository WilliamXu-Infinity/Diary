import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Action
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import api from '../api/api';

export default class NewDiary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteText: '',
            user: {
                noteArray:[]
            },
            location: {
                lon: '',
                lat: '',
                city: '',
                state: '',
                country: ''
            },
            weather: {
                main: '',
                temp: ''
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>- {this.props.title} -</Text>
                </View>

                <TouchableOpacity onPress={() => this.saveDate(this.props)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.returnBack} style={styles.returnButton}>
                    <Text style={styles.addButtonText}>Back</Text>
                </TouchableOpacity>
                <ScrollView style={styles.scrollContainer}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(val) => {
                            this.setState({noteText: val})                        
                        }}
                        value={this.state.noteText}
                        multiline = {true}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>    
                    </TextInput>   
                </ScrollView>
            </View>
        );
    }

    componentWillMount() {
        this.setState({noteText: this.props.noteText});

        //loading data
        AsyncStorage.getItem('user').then(val => {
            try{
                const user = JSON.parse(val);
                this.setState({user: user});
                console.log("MainPage data loaded: \n" + val);
            } catch (e) {
                console.log("MainPage componentWillMount Error: \n" + e);
            }
        });

        //Get location
        navigator.geolocation.getCurrentPosition((position) => {
            const location = position.coords;
            const lat = parseFloat(position.coords.latitude);
            const lon = parseFloat(position.coords.longitude);

            //Get location info
            api.getLocationInfo(lat, lon).then((res) => {
                var city = '';
                var state = '';
                var country = '';
                for(const i in res){
                    switch (res[i].types[0]) {
                        case 'locality' :
                            city = res[i].long_name;
                            break;
                        case 'administrative_area_level_1' :
                            state = res[i].long_name;
                            break;
                        case 'country' :
                            country = res[i].long_name;
                            break;
                    }
                }
                const locationInfo = Object.assign({}, this.state.location, {
                    lon: lon,
                    lat: lat,
                    city: city,
                    state: state,
                    country: country
                });
                this.setState({location: locationInfo});
            });

            //Get weather info
            api.getWeatherInfo(lat, lon).then((res) => {
                console.log('weather' + JSON.stringify(res));
                const weatherInfo = Object.assign({}, this.state.weather, {
                    main: res.weather[0].main,
                    temp: parseFloat(res.main.temp).toFixed(3)
                })
                this.setState({weather: weatherInfo});
            });

        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true},
        );
    }

    returnMain() {
        saveDate();        
    }

    returnBack() {
        Actions.pop();
    }

    //Back from the New Diary Page and Save data
    saveDate(props){
        console.log("Saving Data");

        //If it's editing old diary
        if(props.keyInfo != null){
            this.state.user.noteArray[props.keyInfo].note = this.state.noteText;
            this.state.user.noteArray[props.keyInfo].changeCount++;
            const data = JSON.stringify(this.state.user);
            AsyncStorage.mergeItem('user', data);
            console.log("MainPage newDiary has been edited \n" + data);
        } 
        //Add new diary
        else {
            //date and time
            const d = new Date();
            const timeType = "AM";
            const hour = d.getHours();
            const minutes = d.getMinutes();
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            console.log(days[d.getDay()]);

            if(d.getHours() >= 12) {
                timeType = "PM";
                hour = hour - 12;
            }
            if(minutes < 10){
                minutes = '0' + minutes;
            }
            
            //check if there is no text
            const noteText = 'Nothing much today ~';
            if(this.state.noteText.length != 0){
                noteText = this.state.noteText;
            }

            this.state.user.noteArray.unshift({
                'note': noteText,

                'changeCount': 0,

                'date': {
                    month: (d.getMonth()+1),
                    date : d.getDate(),
                    year : d.getFullYear(),
                    weekday: days[d.getDay()]
                },

                'time': {
                    hour: hour,
                    minutes: minutes,
                    type: timeType
                },

                'location': {
                    lon: this.state.location.lon,
                    lat: this.state.location.lat,
                    city: this.state.location.city,
                    state: this.state.location.state,
                    country: this.state.location.country 
                },

                'weather': {
                    main: this.state.weather.main,
                    temp: this.state.weather.temp
                }
            });
            const user = Object.assign({}, this.state.user, {
                noteArray: this.state.user.noteArray,
                noteCount: ++this.state.user.noteCount
            });
            
            const data = JSON.stringify(user);
            AsyncStorage.mergeItem('user', data);
            console.log("MainPage newDiary has been saved \n " + data);
        }
        //return back to main
        Actions.pop({
            refresh: {
                noteText: this.state.noteText, 
                keyInfo: this.props.keyInfo, 
                location: this.state.location, 
                check: Math.random()*10
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        paddingTop: 25,
        paddingBottom: 10
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        color: 'black',
        padding: 15,
        borderTopWidth:2,
        borderTopColor: '#ededed',
        height: 500
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 10,
        top: 27,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    returnButton: {
        position: 'absolute',
        zIndex: 11,
        left: 10,
        top: 27,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16
    }
});
