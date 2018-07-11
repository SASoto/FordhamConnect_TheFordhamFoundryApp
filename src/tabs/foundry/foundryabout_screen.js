import React, {Component} from 'react';
import {Dimensions, ImageBackground, WebView, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const windowSize = Dimensions.get('window');
export default class foundryabout_screen extends Component {

	checkIfConnected(url) {
		Linking.canOpenURL(url).then(supported => {
		  if (supported) {
		    return Linking.openURL(url);
		  }
		}).catch(err => {});
	}

	render () {
		return (
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
		        <View height={3} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
			<ScrollView flex={1}>
				
		        <View alignItems='center' paddingTop={15}>
		        			        	
			        <Image style={styles.imgCont} source={require('../../../Images/GroupGrow.png')}/>			        	
			        
		        	<View marginTop={20}>			        	
			        	<Image style={styles.imgCont} source={require('../../../Images/GroupCreate.png')}/>			        	
		        	</View>
		        	<View marginTop={20}>			        
			        	<Image style={styles.imgCont} source={require('../../../Images/Grouprefine.png')}/>			        	
			        </View>	
			        <View marginTop={40}>
			        	<TouchableOpacity onPress={() => this.checkIfConnected('http://fordhamfoundry.us14.list-manage.com/subscribe?u=50107e082aaf9c73519bb8da7&id=43d5162012')}>
			        		<Image style={styles.imgCont} source={require('../../../Images/subscribe.png')}/>
			        	</TouchableOpacity>
			        </View>
			        <View marginTop={20} flexDirection="column">
		        		<Text style={styles.siteTxtStyle}>Learn more about the Foundry at</Text>
		        		<TouchableOpacity onPress={() => this.checkIfConnected('https://www.fordhamfoundry.org')}>
		        			<Text style={styles.linkTxtStyle}>www.fordhamfoundry.org</Text>
		        		</TouchableOpacity>
		        	</View> 		        	
		        	<View height={500} backgroundColor='transparent'/>
		        </View>
	        	
	        </ScrollView>
	        </ImageBackground>
	        </View>
	        
			);
	}
}

const styles = ({
	titleTxtStyle1: {
		fontSize: 20,
		fontFamily: 'SFProText-LightItalic',
		color: 'rgb(115,115,115)',
		textAlign: 'center',
		textDecorationLine: 'underline'
	},
	titleTxtStyle2: {
		fontSize: 20,
		fontFamily: 'SFProText-Italic',
		color: 'rgb(115,115,115)',
		textAlign: 'center',
	},
	descTxtStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115,115,115)',
		textAlign: 'center'
	},
	siteTxtStyle: {
		fontSize: 13,
		fontFamily: 'SFProText-Light',
		color: 'rgb(131,51,69)'
	},
	linkTxtStyle: {
		fontSize: 13,
		fontFamily: 'SFProText-Bold',
		color: 'rgb(131,51,69)',
		textAlign: 'center',
	},
	mediaButtonStyle: {
		width: 222,
		height: 45,
		borderRadius: 8
	},
	imgCont: {
		//flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//width: '90%'
	}
})