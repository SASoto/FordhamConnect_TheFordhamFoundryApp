import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');

export default class BackButton extends Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<MatIcon name="keyboard-arrow-left" size={32} color="white"/>			
			</TouchableOpacity>
  		);
	}
}