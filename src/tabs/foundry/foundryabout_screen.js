import React, {Component} from 'react';
import {Dimensions, ImageBackground, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking} from 'react-native';

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
		    <View height={2} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
			<ScrollView flex={1}>
				
		        <View flex={1} alignItems='center' paddingTop={40}>
		        	<View>
		        		<Text style={styles.titleTxtStyle2}>What problem do you want to solve?</Text>
		        	</View>
		        	<View marginTop={20} height={190} width={190} borderRadius={95} justifyContent="center" alignItems="center" backgroundColor="maroon">		   
		        		<Image style={styles.imgCont} source={require('../../../Images/FirstOval2.png')}/>
		        	</View>
		        	<View marginTop={15}>
		        		<Text style={styles.titleTxtStyle1}>Create.</Text>
		        	</View>
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>Feedback and advice as you shape your idea</Text>		        		
		        		<Text style={styles.descTxtStyle}>Support for product development and prototyping</Text>
		        		<Text style={styles.descTxtStyle}>Design assistance</Text>
		        		<Text style={styles.descTxtStyle}>Help protecting your intellectual property</Text>
		        		<Text style={styles.descTxtStyle}>Collaborative working space</Text>
		        	</View>

		        	<View marginTop={20} paddingHorizontal={5}>
		        		<Text style={styles.titleTxtStyle2}>How do you move from beta to launch?</Text>
		        	</View>
		        	<View marginTop={20} height={190} width={190} borderRadius={95} justifyContent="center" alignItems="center" backgroundColor="maroon">		   
		        	<Image style={styles.imgCont} source={require('../../../Images/SecondOval.png')}/>
		        	</View>
					<View marginTop={15}>
		        		<Text style={styles.titleTxtStyle1}>Refine.</Text>
		        	</View>
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>External mentors and in-house coaches to help with product and market research</Text>		        		
		        		<Text style={styles.descTxtStyle}>Sourcing for customers, suppliers, and distribution outlets</Text>
		        		<View paddingHorizontal={3}>
		        			<Text style={styles.descTxtStyle}>Assistance with forming a company, setting up accounts, establishing a business</Text>
		        		</View>
		        	</View>

		        	<View marginTop={20} paddingHorizontal={2}>
		        		<Text style={styles.titleTxtStyle2}>How do you launch and go big?</Text>
		        	</View>
		        	<View marginTop={20} height={190} width={190} borderRadius={95} justifyContent="center" alignItems="center" backgroundColor="maroon">
		        	<Image style={styles.imgCont} source={require('../../../Images/ThirdOval.png')}/>
		        	</View>
		        	<View marginTop={15}>
		        		<Text style={styles.titleTxtStyle1}>Grow.</Text>
		        	</View>		    
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>Seminars and talks with founders and specialists on growth strategies and tactics</Text>		        		
		        		<Text style={styles.descTxtStyle}>Mentoring, consulting on launch and growth</Text>
		        		<Text style={styles.descTxtStyle}>Co-working space</Text>
		        	</View>
		        	<View flex={1} marginTop={20} flexDirection="column">
		        		<Text style={styles.siteTxtStyle}>Learn more on our website!</Text>
		        		<TouchableOpacity onPress={() => this.checkIfConnected('https://www.fordhamfoundry.org')}>
		        			<Text style={styles.linkTxtStyle}>www.fordhamfoundry.org</Text>
		        		</TouchableOpacity>
		        	</View>
		        	<View flex={1} height={500} backgroundColor='transparent'/>
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
		color: 'rgb(115,115,115)'
	},
	linkTxtStyle: {
		fontSize: 13,
		fontFamily: 'SFProText-Light',
		color: 'rgb(78,104,228)'
	},
	mediaButtonStyle: {
		width: 222,
		height: 45,
		borderRadius: 8
	},
	imgCont: {
		//flex:1,
		//marginTop: 20
	}
})

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>