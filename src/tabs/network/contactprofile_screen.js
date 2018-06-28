import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, FlatList} from 'react-native';

import ProfileCard from '../../components/ProfileCard';

const windowSize = Dimensions.get('window');
export default class contactprofile_screen extends Component {
	constructor(props) {
        super(props);
    }

	render() {		
		return (
			<View marginTop={20} alignItems="center">
				<ProfileCard userID = {this.props.navigation.state.params.userID} favorited={this.props.navigation.state.params.favorited} userfname={this.props.navigation.state.params.userfname} changeFavoritedStatus={this.props.navigation.state.params.changeFavoritedStatus}/>
			</View>
  		);
	}
}

//<Button title="Favor" onPress={this.props.navigation.state.params.handleFavorites}/>