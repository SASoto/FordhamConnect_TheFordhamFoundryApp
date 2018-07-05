import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, Text, TouchableOpacity, Linking} from 'react-native';

import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

import CustomTabButton from '../../components/CustomTabButton';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MatCommIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const windowSize = Dimensions.get('window');
class settings_screen extends Component {
	constructor(props) {
        super(props);
    }

	onResetPress(){
		var auth = firebase.auth()
		const {email} = this.props
		var emailAddress = email

		auth.sendPasswordResetEmail(emailAddress).then(function() {
		// Email sent.
		  alert('An email with a password reset link has been sent to your email address.')
		}).catch(function(error) {
		  // An error happened.
		  alert(error)
		});
	}

    render() {
    	return(
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
                <CustomTabButton tabName="Settings"/>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:fordhamfoundry@fordham.edu')}>
                <View paddingHorizontal={15} paddingVertical={20}>
                	<View justifyContent="space-between" flexDirection="row">
                	<View flexDirection="row" justifyContent="center">
                		<View marginRight={20} paddingTop={3} justifyContent="center">
	                	<MatCommIcon name="alert-circle" size={30} color="rgba(15,14,14,0.5)"/>
	                	</View>
	                	<View justifyContent="center">
	                	<Text style={styles.txtStyle}>Report an issue</Text>
	                	</View>
                	</View>
                	<MatIcon name="keyboard-arrow-right" size={30} color="rgba(15,14,14,0.5)"/>
                	</View>
                </View>
                <View height={1} backgroundColor="rgb(191, 187, 187)"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onResetPress.bind(this)}>
                <View paddingHorizontal={15} paddingVertical={20}>
                	<View justifyContent="space-between" flexDirection="row">
                	<View flexDirection="row" justifyContent="center">
                		<View marginRight={20} paddingTop={3} justifyContent="center">
	                	<MatCommIcon name="triangle-outline" size={30} color="rgba(15,14,14,0.5)"/>
	                	</View>
	                	<View justifyContent="center">
	                	<Text style={styles.txtStyle}>Change my password</Text>
	                	</View>
                	</View>
                	<MatIcon name="keyboard-arrow-right" size={28} color="rgba(15,14,14,0.5)"/>
                	</View>
                </View>
                <View height={1} backgroundColor="rgb(191, 187, 187)"/>
                </TouchableOpacity>
                </ImageBackground>
    		</View>
    	)
    }
}

const styles = ({
	txtStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 15,
		color: 'rgb(115,115,115)'
	}
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(settings_screen)