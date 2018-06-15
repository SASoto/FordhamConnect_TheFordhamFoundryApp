import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, FlatList} from 'react-native';

const windowSize = Dimensions.get('window');

export default class chat_screen extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	return(
    		<Text>MessagesScreen</Text>
    	)
    }
}