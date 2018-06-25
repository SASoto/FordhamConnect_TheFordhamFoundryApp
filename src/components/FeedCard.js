import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import Video from 'react-native-af-video-player'
import ButtonRounded from './ButtonRounded';

const windowSize = Dimensions.get('window');
export default class LogoutButton extends Component {
	render() {

		if(this.props.imageurl != null) { // A photo
			var media = (<Image style={styles.imageContainer} source={{uri: this.props.imageurl}}/>);
		} else if(this.props.imageonlineurl != null) { //A video/gif url
			var media = (
					
					<Video url={this.props.imageonlineurl} inlineOnly={true} logo={null}/>
					
			);
		} else { //No media
			var media = null;
		}
		console.log("TEXT: ", this.props.descortweet)

		return (
			<View style={styles.encompCont}>
				
				<View flexDirection="row">
						
						<Image style={styles.profilePicCont} source={{uri: this.props.profileimage}}/>
						
						<View flexDirection="column" justifyContent="center">							
							<Text style={styles.subheadStyle}>@{this.props.scnameorsource}</Text>
						</View>
				</View>
				<View flex={1} paddingHorizontal={16} marginBottom={10}>
					<Text style={styles.textStyle} /*textAlign='left'*/>{this.props.descortweet}</Text>
				</View>
				{media}
				<View borderWidth={1} borderColor="rgb(191,187,187)"/>
				<View justifyContent="center" marginVertical={16} marginLeft={23} shadowOpacity={0.3} shadowRadius={1} shadowOffset={{width: 0, height: 1}}>
					
					<TouchableOpacity onPress={() => console.log("do nothing")}>
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>
							DISCUSS
							</Text>
						</View>
					</TouchableOpacity>
				</View>	
			</View>
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
		width: 370,
		//height: 250,
		backgroundColor: "rgba(106, 46, 52, 0.1)"//#E9E4E4"//6A2E34",
		//borderRadius: 3,
		//marginBottom: 1
		//alignItems: 'center'
	},
	profilePicCont: {
		//backgroundColor: 'black',
		borderRadius: 23,
		width: 46,
		height: 46,
		marginLeft: 16,
		marginTop:16,
		marginBottom: 16, marginRight: 10
		//justifyContent: 'center'
	},
	imageContainer: {
		flex: 1,
		height: 258,
		//width: windowSize.width * .75//344
	},
	textCont: {
		//alignItems: "center",
		justifyContent: 'center',
		margin: 16
	},
	titleStyle: {
		fontFamily: 'HelveticaNeue-Medium',
		fontSize: 14
	},
	subheadStyle: {
		fontFamily: 'SFProText-Regular',
		color: '#737373',
		fontSize: 18
	},
	dateStyle: {
		fontFamily: 'HelveticaNeue-Medium',
		color: 'grey',
		fontSize: 12
	},
	textStyle: {
		fontSize: 16,
		color: '#737373',
		textAlign: 'left',
		fontFamily: 'SFProText-Regular'
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