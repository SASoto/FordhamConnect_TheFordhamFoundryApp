import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';

export default class TransPanel extends Component {
	render() {
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.destination, {children: this.props.children, post_url: this.props.post_url})}>
				<View flex={1}>
					{this.props.children}
				</View>
			</TouchableOpacity>
		);
	}
}