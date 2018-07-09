import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, TouchableOpacity} from 'react-native';

import {logoutUser, loggedInUser} from '../Actions';
import {connect} from 'react-redux';
//import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import EntIcon from 'react-native-vector-icons/dist/Entypo';
import {handleLogout} from './handlelogout';

const windowSize = Dimensions.get('window');
class LogoutButton extends Component {
	onButtonPress(){
		this.props.logoutUser()

		if(this.props.loggedIn === true) {
		{this.checkFlag()}
		}
	}

	checkFlag() {
		if(this.props.loggedIn === true) {
		setTimeout(this.checkFlag.bind(this), 1000)
		}
		else {
		handleLogout(this.props.navigation)
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={this.onButtonPress.bind(this)}>
				<View flexDirection="row">
					<View justifyContent="center">
						<MatIcon name="exit-to-app" size={25} color="lightgrey"/>
					</View>
					<View marginLeft={28} justifyContent="center">
						<Text style={styles.buttonTxt}>Log Out</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	buttonTxt: {
		fontSize: 14,
		color: 'lightgrey',
		fontFamily: 'SFProText-Bold'
	}
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, {logoutUser, loggedInUser})(LogoutButton)