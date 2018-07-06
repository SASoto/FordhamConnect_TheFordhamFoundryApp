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
		//console.log("logging out")
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
					<MatIcon name="exit-to-app" size={20} color="lightgrey"/>
					<View marginLeft={36}>
						<Text style={styles.buttonTxt}>Log Out</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

//<View marginRight={35}>
//	<EntIcon name="arrow-long-left" size={20} color="rgb(255,255,255)"/>
//</View>

const styles = StyleSheet.create({
	buttonTxt: {
		fontSize: 14,
		color: 'lightgrey',
		fontFamily: 'SFProText-Bold'
	}
})

// class logoutbutton extends Component {

// 	static navigationOptions = {
// 		// drawerIcon: () => (
// 		// )
// 	}

// 	onButtonPress(){
// 		this.props.logoutUser()

// 		if(this.props.loggedIn === true) {
// 		{this.checkFlag()}
// 		}
// 	}

// 	checkFlag() {
// 		if(this.props.loggedIn === true) {
// 		//console.log("logging out")
// 		setTimeout(this.checkFlag.bind(this), 1000)
// 		}
// 		else {
// 		handleLogout(this.props.navigation)
// 		}
// 	}

// 	componentDidMount() {
// 		this.onButtonPress()
// 	}

// 	render() {
// 		return (
// 			<View flex={1} justifyContent="center" alignItems="center">
// 			<Text>FORDHAM BANNER GOES HERE</Text>
// 			</View>
// 		)
// 	}

// }

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