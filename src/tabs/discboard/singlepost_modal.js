import React, {Component} from 'react';
import {Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class singlepost_modal extends Component {

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
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<ScrollView flex={1} top={0} bottom={0} bounces={false} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
					<View flex={1}>
					<ImageBackground
						resizeMode='cover'
						style={{
							flex: 1,
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
					</View>
					<View style={styles.encompCont}>
					<View flexDirection="column">
						<View paddingTop={20} paddingBottom={10} paddingHorizontal={38}>
							<View flexDirection="row">
								<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
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
           		</TouchableWithoutFeedback>
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
		backgroundColor: '#dbd1ce',
        width: '100%',
  //       shadowColor: 'rgba(0, 0, 0, 0.5)',
		// shadowOffset: {
		// 	width: 0,height: 2
		// },			
		// shadowRadius: 4,
		// shadowOpacity: 1,
	},
	profPic: {
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
	}
})