import React, {Component} from 'react';
import {Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const windowSize = Dimensions.get('window');
class createpost_modal extends Component {
	render () {
		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
				<View flex={1}>
					<ImageBackground
						resizeMode="cover"
						style={{
			                flex: 1,
			                //resizeMode,
			                position: 'absolute',
			                width: '100%',
			                height: '100%',
			                //alignItems: 'center',
		              	}}

		              	source={require('../../../Images/plussilvergradient.png')}

		            >
		            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						
							<View flex={1}>
							<ImageBackground
								resizeMode='cover'
								style={{
									//flex: 1,
									height: Header.HEIGHT ,
									//position: 'absolute',
									//top:0,

									width: '100%',
									//height: '100%',
								}}

				              source={require('../../../Images/positionedblur.png')}

							>
								
							<View flex={1} paddingTop={12} flexDirection="row" justifyContent="space-between">
								<View justifyContent="center" paddingLeft={30}>
								<TouchableOpacity onPress={() => this.props.modalFunc()}>
										<MatIcon name="close" size={24} color="rgb(255,255,255)"/>											
								</TouchableOpacity>
								</View>
								<View justifyContent="center" alignItems="center" padding={5}>
									<Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(255,255,255)'}}>New Post</Text>
								</View>
								<View justifyContent="center" paddingRight={30}>
									<TouchableOpacity onPress={() => console.log('do nothing')}>
										<Text style={styles.postButtonStyle}>Share</Text>
									</TouchableOpacity>
								</View>
							</View>
								
							</ImageBackground>
							<View paddingLeft={36}>
							<View flexDirection="row" marginTop={28}>					
								<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
									<Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
								</LinearGradient>
								<View flexDirection="column" justifyContent="center">
									<View>
										<Text style={styles.userNameTxtStyle}>{this.props.firstname} {this.props.lastname}</Text>
									</View>
									<View>
										<Text style={styles.headerTxtStyle}>{this.props.headline}</Text>
									</View>
								</View>															
							</View>
							<View marginTop={15}>
								<TextInput
									style={styles.input}
									autoCapitalize = 'none'
	          						autoCorrect = {false}
	          						multiline={true}	          				
	          						placeholder="Post about job opportunities, Fordham events, news or anything else worth discussing..."
									placeholderTextColor="rgba(99,96,96,0.21)"
								/>			
							</View>
							</View>
							<View flex={1} backgroundColor="rgba(15,14,14,0.5)"/>
							</View>
					</TouchableWithoutFeedback>

					</ImageBackground>
				</View>
			</Modal>
			);
	}
}

const styles = ({
	profPic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16
	},
	input:{
		fontFamily: 'SFProText-Light',
		height:100,
		width: windowSize.width * .85,
		color: 'rgb(115,115,115)',
		fontSize: 16,
		backgroundColor: 'transparent',
		//paddingLeft: 10,
		//marginLeft: 10
		//paddingHorizontal: 10
	},
	postButtonStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(255,255,255)'
	},
	userNameTxtStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(115,115,115)'
	},
	headerTxtStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 14,
		color: 'rgb(115,115,115)'
	}
})

const mapStateToProps = state => {
  return {
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    initials: state.auth.initials,
    headline: state.auth.headline,
  }
}

export default connect(mapStateToProps)(createpost_modal)

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>