import React, {Component} from 'react';
import {Dimensions, ImageBackground, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, Linking} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const windowSize = Dimensions.get('window');
export default class foundryabout_screen extends Component {
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
			<ScrollView flex={1}>
				<View flex={1}>
		        <View height={2} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
		        <View flex={1} alignItems='center'>

		        	<Image style={styles.imgCont} source={require('../../../Images/FirstOval2.png')}/>
		        	<View marginTop={19}>
		        		<Text style={styles.titleTxtStyle1}>Create</Text>
		        	</View>

		        	<View marginTop={14}>
		        		<Text style={styles.titleTxtStyle2}>What problem do you want to solve?</Text>
		        	</View>
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>Feedback and advice as you shape your idea</Text>		        		
		        		<Text style={styles.descTxtStyle}>Support for product development and prototyping</Text>
		        		<Text style={styles.descTxtStyle}>Design assistance</Text>
		        		<Text style={styles.descTxtStyle}>Help protecting your intellectual property</Text>
		        		<Text style={styles.descTxtStyle}>Collaborative working space</Text>
		        	</View>

		        	<Image style={styles.imgCont} source={require('../../../Images/SecondOval.png')}/>
					<View marginTop={19}>
		        		<Text style={styles.titleTxtStyle1}>Refine</Text>
		        	</View>

		        	<View marginTop={14} paddingHorizontal={2}>
		        		<Text style={styles.titleTxtStyle2}>How do you move from beta to launch?</Text>
		        	</View>
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>External mentors and in-house coaches to help with product and market research</Text>		        		
		        		<Text style={styles.descTxtStyle}>Sourcing for customers, suppliers, and distribution outlets</Text>
		        		<Text style={styles.descTxtStyle}>Assistance with forming a company, setting up accounts, establishing a business</Text>
		        	</View>

//Grow
How do you launch and go big?

Seminars and talks with founders and specialists on growth strategies and tactics

Mentoring, consulting on launch and growth

Co-working space
		        	<Image style={styles.imgCont} source={require('../../../Images/ThirdOval.png')}/>
		        	<View marginTop={19}>
		        		<Text style={styles.titleTxtStyle1}>Grow</Text>
		        	</View>

		        	<View marginTop={14} paddingHorizontal={2}>
		        		<Text style={styles.titleTxtStyle2}>How do you launch and go big?</Text>
		        	</View>
		        	
		        	<View marginTop={15} alignItems='center'>
		        		<Text style={styles.descTxtStyle}>Seminars and talks with founders and specialists on growth strategies and tactics</Text>		        		
		        		<Text style={styles.descTxtStyle}>Mentoring, consulting on launch and growth</Text>
		        		<Text style={styles.descTxtStyle}>Co-working space</Text>
		        	</View>

		        	<View flex={1} marginTop={20}>
						<TouchableOpacity onPress={() => console.log('do nothing')}>
							<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}colors={['rgb(254,218,117)', 'rgb(250,126,30)', 'rgb(214,41,118)', 'rgb(150,47,191)', 'rgb(79,91,213)']} style={styles.mediaButtonStyle} backgroundColor="red">
							</LinearGradient>
						</TouchableOpacity>
						<View marginTop={11}>
						<TouchableOpacity onPress={() => console.log('do nothing')}>
							<View style={styles.mediaButtonStyle} backgroundColor="rgb(91,158,255)">
							</View>
						</TouchableOpacity>
						</View>
						<View marginTop={11}>
						<TouchableOpacity  onPress={() => console.log('do nothing')}>
							<View style={styles.mediaButtonStyle} backgroundColor="rgb(68,109,176)">
							</View>
						</TouchableOpacity>
						</View>
					</View>

		        	<View flex={1} marginTop={20} flexDirection="column">
		        		<Text style={styles.siteTxtStyle}>Learn more on our website!</Text>
		        		<TouchableOpacity onPress={() => Linking.openURL('https://www.fordhamfoundry.org')}>
		        			<Text style={styles.linkTxtStyle}>www.fordhamfoundry.org</Text>
		        		</TouchableOpacity>
		        	</View>
		        	<View flex={1} height={500} backgroundColor='transparent'/>
		        </View>
	        	</View>
	        </ScrollView>
	        </ImageBackground>
	        </View>
	        
			);
	}
}

const styles = ({
	titleTxtStyle1: {
		fontSize: 25,
		fontFamily: 'SFProText-Bold',
		color: 'rgb(115,115,115)',
		textAlign: 'center',
	},
	titleTxtStyle2: {
		fontSize: 20,
		fontFamily: 'SFProText-Medium',
		color: 'rgb(115,115,115)',
		textAlign: 'center',
	},
	descTxtStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Regular',
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
		flex:1,
		marginTop: 50
	}
})

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>