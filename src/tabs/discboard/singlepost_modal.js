import React, {Component} from 'react';
import {Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, TextInput, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
class singlepost_modal extends Component {

	resetAndExit() {
		this.props.fetchLatestPosts();
		this.props.modalFunc();
	}

	render () {
		var dateAndTime = this.props.postDateAndTime;
		dateAndTime = dateAndTime.split(' ');
		console.log("FROM POST MODAL: ", dateAndTime);
		dateAndTime = dateAndTime[0] + ' at ' + dateAndTime[1] + ' ' + dateAndTime[2];

		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
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
				
					<View flex={1}>
							<ImageBackground
								resizeMode='cover'
								style={{
									height: Header.HEIGHT * 1.5,
									//position: 'absolute',
									//top:0,

									//width: '100%',
									//height: '100%',
								}}

				              source={require('../../../Images/positionedblur.png')}

							>
								<View flex={1} paddingTop={20} justifyContent="center">
									<View>
										<TouchableOpacity onPress={() => {this.resetAndExit()}}>
											<View paddingLeft={30}>
												<MatIcon name="close" size={24} color="rgb(255,255,255)"/>											
											</View>
										</TouchableOpacity>									
									</View>
								</View>
							</ImageBackground>
						<ScrollView bounces={false} showsVerticalScrollIndicator={false}>
							<View style={styles.encompCont}>
							<View flexDirection="column">
								<View paddingTop={20} paddingBottom={10} paddingHorizontal={38}>
									<View flexDirection="row">
										<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.authProfPic}>
								            <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>{this.props.authorInitials}</Text>
								        </LinearGradient>						
										<View justifyContent = "center" flexDirection="column">
											<Text style={styles.nameStyle}>{this.props.authorName}</Text>
											<Text style={styles.headlineStyle}>{this.props.authorHeadline}</Text> 
										</View>						
									</View>
									<View marginTop={15}>
										<View paddingLeft={8} paddingRight={5}>
											<Text style={styles.descStyle}>{this.props.fullPostDesc}</Text> 
										</View>
									</View>
									<View marginTop={10} flexDirection="row">
										<View paddingLeft={8}>
											<Text style={styles.additionalInfoStyle}>Posted on {dateAndTime}</Text>
										</View>
									</View>
								</View>
								<View marginTop={8} marginBottom={16} height={1} backgroundColor="rgb(199,193,195)"/>
								
							</View>
			           		</View>			           		
			           	</ScrollView>
		           		<View justifyContent="center" borderTopWidth={1} borderColor='rgb(199,193,195)' bottom={0} paddingLeft={30} paddingVertical={15}>
						<View flexDirection="row">
							<View justifyContent="center">
								<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.userProfPic}>
						            <Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
						        </LinearGradient>	
							</View>
							<View justifyContent="center">
								<View style={styles.replyEncompCont}>
									<View flexDirection="row" justifyContent="center">
										<View justifyContent="center">
											<TextInput
												style={styles.replyTextInput}
												autoCapitalize = 'none'
												autoCorrect = {false}
												editable={true}
												placeHolder
												placeholder="Add a comment..."
	                  							placeholderTextColor="rgb(181,178,178)"   
											>
											</TextInput>
										</View>
										<View justifyContent="center" paddingBottom={5} paddingRight={18}>
										<TouchableOpacity onPress={() => console.log('do nothing')}>
											<Text style={{fontFamily: 'SFProText-Regular', fontSize: 16, color: 'rgb(181,178,178)'}}>Post</Text>										
										</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
							</View>
						</View>
			 		</View>
           	
				</ImageBackground>
			</View>
			</Modal>
			);
	}
}

const styles = ({
	encompCont: {
		//alignItems:"center",
		// justifyContent: 'center',
		flex: 1,
		//backgroundColor: '#dbd1ce',
        width: '100%',
  //       shadowColor: 'rgba(0, 0, 0, 0.5)',
		// shadowOffset: {
		// 	width: 0,height: 2
		// },			
		// shadowRadius: 4,
		// shadowOpacity: 1,
	},
	userProfPic: {
		height: 38,
		width: 38,
		borderRadius: 19,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 1
		},
		//height: 300,
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	authProfPic: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 14,
		justifyContent: 'center',
		alignItems: 'center'
	},
	nameStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 20,
		color: 'rgb(115,115,115)'
	},
	headlineStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 16,
		color: 'rgb(115,115,115)'
	},
	locationStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 13,
		color: 'rgb(115,115,115)'
	},
	descStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 20,
		color: 'rgb(115,115,115)',
		//textAlign: 'center'
	},
	gradientCont: {
		flex: 1,
		backgroundColor: 'red',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 2
		},
		//height: 300,
		shadowRadius: 4,
		shadowOpacity: 1,
		width: windowSize.width * .9,
	},
	joinButtonStyle: {
		//paddingLeft: 10,
		//marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: 150,
		height: 44,
		backgroundColor: '#dbd1ce',
		borderRadius: 8,
		borderWidth: 0.7,
		borderColor: 'rgb(204,180,182)',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 2
		},			
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	joinButtonAddStyle: {
		fontSize: 16,
		fontFamily: 'SFProText-Regular',
		color: 'rgb(115,115,115)'
	},
	additionalInfoStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 16,
		color: 'rgb(115,115,115)'
	},
	replyEncompCont: {
		borderRadius: 17,
		borderWidth: 1,
		borderColor: 'rgb(206,201,201)',
	},
	replyTextInput: {
		padding: 12,
		width: 200,
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(180,177,177)'
	}
})

const mapStateToProps = state => {
  return {
   initials: state.auth.initials
  }
}

export default connect(mapStateToProps)(singlepost_modal)
