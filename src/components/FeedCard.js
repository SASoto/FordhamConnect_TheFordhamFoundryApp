import React, {Component} from 'react';
import {Dimensions, Linking, ImageBackground, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import Video from 'react-native-af-video-player'
import ButtonRounded from './ButtonRounded';
import MatCommIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const windowSize = Dimensions.get('window');
export default class LogoutButton extends React.PureComponent {

	checkIfConnected(url) {
		Linking.canOpenURL(url).then(supported => {
		  if (supported) {
		    return Linking.openURL(url);
		  }
		}).catch(err => {});
	}

	renderCard() {
		if(this.props.imageurl != null) { // A photo
			var media = (
				<Image style={styles.imageContainer} source={{uri: this.props.imageurl}}/>);
		} else if(this.props.imageonlineurl != null) { //A video/gif url
			var media = (
				<Video url={this.props.imageonlineurl} inlineOnly={true} logo={null}/>
			);
		} else { //No media
			var media = null;
		}

		if(this.props.tweetTitle != null) {
			var tweetTitle = (<View flex={1} paddingTop={3}>
								<Text style={styles.tweetTitleStyle}>{this.props.tweetTitle}</Text>
							  </View>)
		}

		if(this.props.tweetDesc != null) {
			var tweetDesc = (<View flex={1} marginTop={5}>
								<Text style={styles.tweetTextStyle} /*textAlign='left'*/>{this.props.tweetDesc}</Text>
							 </View>)
		}

		if(this.props.newsUrl != null) {
			return (
				<View style={styles.encompCont}>
					<TouchableOpacity onPress={() => this.checkIfConnected(this.props.newsUrl)}>
					<ImageBackground
						resizeMode='cover'
						style={{
							flex: 1,
						}}
						source={require('../../Images/plussilvergradient.png')}
					>
					<View backgroundColor="rgba(106,46,52,.1)">
					<View backgroundColor="rgba(230,226,225,.8)">	
					<View backgroundColor="rgba(106,46,52,1)">
					{media}
					</View>
					<View paddingTop={8} paddingBottom={8} paddingRight={8} paddingLeft={14}>
					{tweetTitle}
					{tweetDesc}
					<View marginTop={10} flexDirection="row" justifyContent="space-between">
						
						<View>
							<Text style={styles.dateStyle}>{this.props.date}</Text>
						</View>
						</View>
						<View paddingRight={10} marginTop={-10} alignItems="flex-end">
							<MatCommIcon name="twitter" size={20} color="rgb(85,172,238)"/>
						</View>
						</View>
					
					<View height={4} backgroundColor="rgb(85,172,238)"/>
					</View>
					</View>
					</ImageBackground>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={styles.encompCont}>
				<ImageBackground
					resizeMode='cover'
					style={{
						flex: 1,
					}}
					source={require('../../Images/plussilvergradient.png')}
				>		
					<View backgroundColor="rgba(230,226,225,.8)">	
						<View backgroundColor="rgba(106,46,52,1)">
						{media}	
						</View>		
						<View paddingTop={8} paddingBottom={8} paddingRight={8} paddingLeft={14}>						
						{tweetTitle}
						{tweetDesc}
						<View marginTop={7} flexDirection="row" justifyContent="space-between">
							
							<View>
								<Text style={styles.dateStyle}>{this.props.date}</Text>
							</View>
							</View>
							<View paddingRight={10} marginTop={-10} alignItems="flex-end">
								<MatCommIcon name="twitter" size={20} color="rgb(85,172,238)"/>
							</View>
							</View>
						
						<View height={4} backgroundColor="rgb(85,172,238)"/>
					</View>
				</ImageBackground>
				</View>
			);
		}


	}

	render() {

		//console.log("TEXT: ", this.props.descortweet)

		return (
			this.renderCard()
		)
	}
}

//<ButtonRounded width={100} height={30} padding={6} borderRadius={8} fillWithColor='rgb(0, 122, 255)' onPress={() => console.log("do nothing")}>DISCUSS</ButtonRounded>

const styles = ({
	encompCont: {
		flex: 1,
		flexDirection: 'column',
		width: '90%',
		backgroundColor: 'transparent',
		borderWidth: 0.4,
		borderColor: 'grey'
	},
	profilePicCont: {
		borderRadius: 14,
		width: 28,
		height: 28,
		marginRight: 7.5
	},
	imageContainer: {
		flex: 1,
		height: 155,
		opacity: 0.85,
	},
	textCont: {
		justifyContent: 'center',
		margin: 16
	},
	titleStyle: {
		fontFamily: 'SFProText-Medium',
		fontSize: 15,
		color: 'rgb(115,115,115)'
	},
	subheadStyle: {
		fontFamily: 'SFProText-Regular',
		color: 'rgb(115,115,115)',
		fontSize: 16
	},
	dateStyle: {
		fontFamily: 'SFProText-Light',
		color: 'rgb(115,115,115)',
		fontSize: 10
	},
	tweetTitleStyle: {
		fontFamily: 'SFProText-Medium',
		fontSize: 15,
		color: 'rgb(115,115,115)'
	},	
	tweetTextStyle: {
		fontSize: 13,
		color: 'rgb(115,115,115)',
		textAlign: 'left',
		fontFamily: 'SFProText-Light'
	},
	buttonStyle: {
		width: 100,
		height: 30,
		paddingVertical: 7,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: 'rgb(0, 122, 255)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTextStyle: {
	    alignSelf: 'center',
	    color: 'white',
	    fontSize: 15,
	    fontFamily: 'HelveticaNeue-Medium',
	}
})