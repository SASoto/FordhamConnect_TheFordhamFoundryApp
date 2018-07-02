import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';


//clientId: '86fwnyrnn88zxk'
//clientSecret: 'yVasweCMcsMGy1ob'
//http://localhost:3000/auth/linkedin/callback
//<LinkedInOAuth wayto={this.props.navigation} onSuccess={() => {this.onSuccess}} onFail={() => {this.onFail}} onCancel={() => {this.onCancel}} clientId='86fwnyrnn88zxk' clientSecret='yVasweCMcsMGy1ob' state='DCEeFWf45A53sdfKef424' redirectUrl='http://localhost:8080/FFApp_Auth_v.01/auth/linkedin'/>
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



//<WebView
  // source={{uri: 'https://www.fordhamfoundry.org/news-and-events/'}}
  // startInLoadingState={true}
  // />