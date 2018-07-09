import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button} from 'react-native';

import Video from 'react-native-af-video-player'

const windowSize = Dimensions.get('window');

export default class tweet_screen extends Component {
	constructor(props) {
        super(props);

        this.state = {
            tweetVisible: true,
        }
    }

    onFullScreen(status) {
	  // Set the params to pass in fullscreen status to navigationOptions
	  this.setState({tweetVisible: !this.state.tweetVisible})
	}

	checkImageUrl() {
		if(this.props.navigation.state.params.post_url != null) {
			console.log("ITS NOT NULL: ", this.props.navigation.state.params.post_url)
			
			return (<Video url={this.props.navigation.state.params.post_url} onFullScreen={status => this.onFullScreen(status)}/>);
		}
	}

	checkChildren() {
		if(this.state.tweetVisible && this.props.navigation.state.params.post_url != null) {
			return (	
				<View alignItems="center">
					{this.props.navigation.state.params.children}
				</View>		
			);
		} else if (this.state.tweetVisible && this.props.navigation.state.params.post_url == null) {
			return(
				
				<View height={300}>
					{this.props.navigation.state.params.children}
				</View>
			)
		}
		else {
			this.setState({tweetVisible: false})
		}
	}

	render() {
		return (
			<View alignItems="center">
				{this.state.tweetVisible && this.checkChildren()}
			</View>
  		);
	}
}

const styles = StyleSheet.create( {
	encompassingView: {
		flex:1
	 },
	 backgroundVideo: {
  },
})