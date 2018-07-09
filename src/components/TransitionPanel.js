import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';

export default class TransitionPanel extends Component {
	render() {
		console.log("KEY: ", this.props.key)
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.destination, {children: this.props.children, userID: this.props.userID})}>
				<View flex={1}>
					{this.props.children}
					<Text>
					{this.props.userID}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}