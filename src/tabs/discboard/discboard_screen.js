import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button} from 'react-native';

const windowSize = Dimensions.get('window');

export default class discboard_screen extends Component {
	constructor(props) {
        super(props);

    }

	render() {
		return (
			<Text>Discussionboard Screen</Text>
  		);
	}
}