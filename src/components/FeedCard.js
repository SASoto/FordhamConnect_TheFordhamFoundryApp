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
					
					<Video url={this.props.imageonlineurl} inlineOnly={true}/>
					
			);
		} else { //No media
			var media = (<Image style={styles.imageContainer} source={require('../../Images/foundry-logo-top-bar.png')}/>);
		}
		console.log("TEXT: ", this.props.descortweet)

		return (
			<View style={styles.encompCont}>
				<View flexDirection="row">
						<View style={styles.profilePicCont}>

						</View>
						<View flexDirection="column" justifyContent="center">
							<Text style={styles.titleStyle}>{this.props.titleorname}</Text>
							<Text style={styles.subheadStyle}>@{this.props.scnameorsource}</Text>
							<Text style={styles.dateStyle}>{this.props.date}</Text>
						</View>
				</View>
				{media}
				<View style={styles.textCont}>
					<View flex={1}>
						<Text style={styles.textStyle} /*textAlign='left'*/>{this.props.descortweet}</Text>
					</View>
				</View>
				<View marginBottom={16} marginLeft={16}>
					<ButtonRounded width={110} fillWithColor='#5B1728' onPress={() => console.log("do nothing")}>Discuss</ButtonRounded>
				</View>	
			</View>
		)
	}
}

const styles = ({
	encompCont: {
		flex: 1,
		flexDirection: 'column',
		width: windowSize.width * .9,//344,
		//height: 400,
		backgroundColor: "white",
		borderRadius: 3,
		//marginBottom: 1
		//alignItems: 'center'
	},
	profilePicCont: {
		backgroundColor: 'black',
		borderRadius: 20,
		width: 40,
		height: 40,
		margin: 16,
		//justifyContent: 'center'
	},
	imageContainer: {
		flex: 1,
		height: 200,
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
		fontFamily: 'HelveticaNeue-Medium',
		color: 'grey',
		fontSize: 14
	},
	dateStyle: {
		fontFamily: 'HelveticaNeue-Medium',
		color: 'grey',
		fontSize: 12
	},
	textStyle: {
		fontSize: 14,
		textAlign: 'left'
	}
})