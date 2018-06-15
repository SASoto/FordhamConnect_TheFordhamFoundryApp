import React, { Component } from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';



//clientId: '86fwnyrnn88zxk'
//clientSecret: 'yVasweCMcsMGy1ob'
//http://localhost:3000/auth/linkedin/callback
//<LinkedInOAuth wayto={this.props.navigation} onSuccess={() => {this.onSuccess}} onFail={() => {this.onFail}} onCancel={() => {this.onCancel}} clientId='86fwnyrnn88zxk' clientSecret='yVasweCMcsMGy1ob' state='DCEeFWf45A53sdfKef424' redirectUrl='http://localhost:8080/FFApp_Auth_v.01/auth/linkedin'/>

const windowSize = Dimensions.get('window');
export default class ContactListItem extends Component {
	render() {
		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.destination, {userID: this.props.userID, userfname: this.props.userfname})}>
				<View style={styles.encompCont}>
					<View height={55} justifyContent="center">
						<View flex={1} marginLeft={(windowSize.width*1/4)}>
							<View flexDirection="row">
								<View style={styles.userBubble} marginRight={10}/>
								<View justifyContent="center">
								<Text>{this.props.userfname}</Text>							
								</View>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = ({
	encompCont: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: 'black'
	},
	nameStyle: {
		fontFamily: 'HelveticaNeue-Medium',
		color: 'black',
		fontSize: 16
	},
	userBubble: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'grey'
	}

})