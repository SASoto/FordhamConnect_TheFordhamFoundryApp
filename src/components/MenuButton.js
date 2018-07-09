import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, TouchableOpacity} from 'react-native';

import  MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');

export default class MenuButton extends Component {
	render() {
		return (
			<View marginLeft={30} marginTop={10} flex={1}>
			<TouchableOpacity onPress={this.props.onPress}>				
				<Image style={{justifyContent: 'center', alignItems: 'center'}} resizeMode="contain" source={require('../../Images/menu_24px.png')}/>
			</TouchableOpacity>
			</View>			
  		);
	}
}

//<MatIcon name="menu" size={24} color="white"/>							