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
			var tweetDesc = (<View flex={1} marginTop={1}>
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
					<View backgroundColor="rgba(106,46,52,1)">
					{media}
					</View>
					<View padding={8}>
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
					<View backgroundColor="rgba(106,46,52,1)">
					{media}	
					</View>		
					<View padding={8}>
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
		//marginTop: 10,
		flex: 1,
		//width: windowSize.width*.9,
		flexDirection: 'column',
		width: '95%',
		backgroundColor: 'transparent',
		//height: 250,
		//backgroundColor: "rgba(106, 46, 52, 0.1)",
		//borderRadius: 6,		
		// borderBottomWidth: 2,
		// borderRadius: 4,
		// borderColor: 'rgba(0, 0, 0, 0.5)'
		// shadowColor: 'rgba(0, 0, 0, 0.5)',
		// shadowOffset: {
		// 	width: 0,height: 2
		// },
		// // height: 260,
		// shadowRadius: 4,
		// shadowOpacity: 1,
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
		height: 155,
		//backgroundColor: 'transparent'
		//tintColor: 'rgba(78,9,14,.55)'
		opacity: 0.85,
		//backgroundColor: 'rgba(78,9,14,1)'
		//backgroundColor: 'red'
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