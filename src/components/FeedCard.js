import React, {Component} from 'react';
import {Dimensions, Linking, ImageBackground, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import Video from 'react-native-af-video-player'
import ButtonRounded from './ButtonRounded';

const windowSize = Dimensions.get('window');
export default class LogoutButton extends Component {

	checkIfConnected(url) {
		Linking.canOpenURL(url).then(supported => {
		  if (supported) {
		    return Linking.openURL(url);
		  }
		}).catch(err => {});
	}

	renderCard() {
		if(this.props.imageurl != null) { // A photo
			var media = (<Image style={styles.imageContainer} source={{uri: this.props.imageurl}}/>);
		} else if(this.props.imageonlineurl != null) { //A video/gif url
			var media = (
				<Video url={this.props.imageonlineurl} inlineOnly={true} logo={null}/>
			);
		} else { //No media
			var media = null;
		}

		if(this.props.newsUrl != null) {
			return (
				<View style={styles.encompCont}>
				<TouchableOpacity onPress={() => this.checkIfConnected(this.props.newsUrl)}>
				<ImageBackground
					resizeMode='cover'
					style={{
						flex: 1,
						//position: 'absolute',
						// width: '100%',
						// height: '100%',
					}}

					source={require('../../Images/plussilvergradient.png')}
					//need purple brown white gradient
				>
					
					<View flexDirection="row" marginBottom={6} marginLeft={13} marginTop={9}>
							
							<Image style={styles.profilePicCont} source={{uri: this.props.profileimage}}/>
							
							<View flexDirection="column" justifyContent="center">							
								<Text style={styles.subheadStyle}>@{this.props.scnameorsource}</Text>
							</View>
					</View>
					{media}
					
					<View flex={1} marginHorizontal={16} marginTop={8} marginBottom={5}>
						<Text style={styles.textStyle} /*textAlign='left'*/>{this.props.descortweet}</Text>
					</View>
					<View alignItems="flex-end" justifyContent="center" marginTop={6} paddingRight={19} marginBottom={14} shadowOpacity={0.3} shadowRadius={1} shadowOffset={{width: 0, height: 1}}>					
					<TouchableOpacity onPress={() => console.log("do nothing")}>
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>
							DISCUSS
							</Text>
						</View>
					</TouchableOpacity>
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
						//position: 'absolute',
						// width: '100%',
						// height: '100%',
					}}

					source={require('../../Images/plussilvergradient.png')}
					//need purple brown white gradient
				>
					
					<View flexDirection="row" marginBottom={6} marginLeft={13} marginTop={9}>
							
							<Image style={styles.profilePicCont} source={{uri: this.props.profileimage}}/>
							
							<View flexDirection="column" justifyContent="center">							
								<Text style={styles.subheadStyle}>@{this.props.scnameorsource}</Text>
							</View>
					</View>
					{media}
					
					<View flex={1} marginHorizontal={16} marginTop={8} marginBottom={5}>
						<Text style={styles.textStyle} /*textAlign='left'*/>{this.props.descortweet}</Text>
					</View>
					<View alignItems="flex-end" justifyContent="center" marginTop={6} paddingRight={19} marginBottom={14} shadowOpacity={0.3} shadowRadius={1} shadowOffset={{width: 0, height: 1}}>					
					<TouchableOpacity onPress={() => console.log("do nothing")}>
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>
							DISCUSS
							</Text>
						</View>
					</TouchableOpacity>
					</View>
					</ImageBackground>
				</View>
			);
		}


	}

	render() {

		console.log("TEXT: ", this.props.descortweet)

		return (
			this.renderCard()
		)
	}
}

//<ButtonRounded width={100} height={30} padding={6} borderRadius={8} fillWithColor='rgb(0, 122, 255)' onPress={() => console.log("do nothing")}>DISCUSS</ButtonRounded>

const styles = ({
	encompCont: {
		//marginTop: 10,
		flex: 1,
		//width: windowSize.width*.9,
		flexDirection: 'column',
		width: 375,
		//height: 250,
		//backgroundColor: "rgba(106, 46, 52, 0.1)",
		borderRadius: 6,
		borderWidth: 0.3,
		borderRightWidth: 2,
		borderBottomWidth: 2,
		borderColor: 'darkgrey'
		//borderRadius: 3,
		//marginBottom: 1
		//alignItems: 'center'
	},
	profilePicCont: {
		//backgroundColor: 'black',
		borderRadius: 14,
		width: 28,
		height: 28,
		//marginLeft: 13,
		//marginTop: 9,
		marginRight: 7.5
		//justifyContent: 'center'
	},
	imageContainer: {
		flex: 1,
		height: 114,
		//width: windowSize.width * .75//344
	},
	textCont: {
		//alignItems: "center",
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
		fontFamily: 'HelveticaNeue-Medium',
		color: 'grey',
		fontSize: 12
	},
	textStyle: {
		fontSize: 16,
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