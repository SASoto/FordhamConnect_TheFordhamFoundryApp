import React, {Component} from 'react';
import {Dimensions, Text, StyleSheet, View, Linking} from 'react-native';

const windowSize = Dimensions.get('window');
export default class foundryevents_screen extends Component {
	render () {
		return (
			<View>
				<Text>HELLO FROM THE FOUNDRY EVENTS SCREEN</Text>
			</View>
			);
	}
}

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>