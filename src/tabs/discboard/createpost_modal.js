import React, {Component} from 'react';
import {Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';

import {connect} from 'react-redux';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

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
						<ScrollView flex={1} top={0} bottom={0} stickyHeaderIndices={[0]}>
							<View flex={1}>
							<ImageBackground
								resizeMode='cover'
								style={{
									flex: 1,
									height: 75
									//position: 'absolute',
									//top:0,

									//width: '100%',
									//height: '100%',
								}}

				              source={require('../../../Images/positionedblur.png')}

							>
							<View flex={1} marginTop={35} justifyContent="center">
								<View flex={1} flexDirection="row" justifyContent="space-between">
									<TouchableOpacity onPress={() => this.props.modalFunc()}>
										<View justifyContent="center" paddingLeft={30}>
											<MatIcon name="close" size={24} color="rgb(255,255,255)"/>
										</View>
									</TouchableOpacity>
									<View justifyContent="center" marginRight={32}>
										<TouchableOpacity onPress={() => console.log('do nothing')}>
											<Text style={styles.postButtonStyle}>Post</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							</ImageBackground>
							</View>
							<View flexDirection="row" marginLeft={36} marginTop={28}>					
								<View style={styles.profPic} marginRight={16}/>
								<View flexDirection="column" justifyContent="center" marginRight={26}>
									<View>
										<Text style={styles.userNameTxtStyle}>{this.props.firstname} {this.props.lastname}</Text>
									</View>
									<View>
										<Text style={styles.headerTxtStyle}>{this.props.headline}</Text>
									</View>
								</View>															
							</View>
							<View marginTop={21} marginLeft={36}>
								<TextInput
									style={styles.input}
									autoCapitalize = 'none'
	          						autoCorrect = {false}
	          						multiline={true}
	          						placeholder="Post to the discussion board about job opportunities, Fordham events, news articles and more!"
									placeholderTextColor="grey"
								/>						
							</View>
							<View height={500}/>
							<View height={500}/>
							<View height={500}/>
						</ScrollView>
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
		backgroundColor: 'grey'
	},
	input:{
		fontFamily: 'SFProText-Light',
		height: windowSize.height * .5,
		width: windowSize.width * .85,
		color: 'rgb(115,115,115)',
		fontSize: 16,
		backgroundColor: 'transparent',
		//paddingLeft: 10,
		//marginLeft: 10
		//paddingHorizontal: 10
	},
	postButtonStyle: {
		fontFamily: 'SFProText-Medium',
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