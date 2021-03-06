import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, ScrollView, Text, Image, Button, FlatList} from 'react-native';

import ProfileCard from '../../components/ProfileCard';
import CustomTabButton from '../../components/CustomTabButton';

const windowSize = Dimensions.get('window');
export default class contactprofile_screen extends Component {
	constructor(props) {
        super(props);
    }

	render() {		
		return (
			<View flex={1}>
			<ImageBackground
        resizeMode='cover'
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}

          source={require('../../../Images/plussilvergradient.png')}
      >
        <View flex={1}>
          <CustomTabButton tabName="Profile"/>
          <ScrollView alignItems="center">
  				<ProfileCard userID = {this.props.navigation.state.params.userID} favorited={this.props.navigation.state.params.favorited} userfname={this.props.navigation.state.params.userfname} changeFavoritedStatus={this.props.navigation.state.params.changeFavoritedStatus}/>					
  			  <View height={500} backgroundColor="transparent"/>
          </ScrollView>
        </View>
			</ImageBackground>
			</View>
  		);
	}
}

