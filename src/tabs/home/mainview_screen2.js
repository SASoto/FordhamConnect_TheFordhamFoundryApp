import React, {Component} from 'react';
import {StyleSheet, Dimensions, ImageBackground, Linking, Text, View, ScrollView, Image, Button, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

// import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';

import {MainViewTabNav} from '../router';

const windowSize = Dimensions.get('window');
class mainview_screen2 extends Component {
	constructor(props) {
		super(props)

		this.state = {
			touchDisabled: false
		}

		this.goToTop = this.goToTop.bind(this);
		this.onTabButtonPress = this.onTabButtonPress.bind(this);
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	}

	handleScroll() {
		console.log(this.refs.myScrollView.scrollProperties.offset);
	}

	onTabButtonPress() {
		this.setState({touchDisabled: true})
		this.refs._scrollView.scrollTo({x:0, y:240, animated: true});
	}

	checkIfConnected(url) {
		Linking.canOpenURL(url).then(supported => {
		  if (supported) {
		    return Linking.openURL(url);
		  }
		}).catch(err => {});
	}

	render() {
		return (
			<ScrollView ref='_scrollView' flex={1}  pagingEnabled={true} overScrollMode={"never"} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
				
				<View flex={1}>
					<ImageBackground 
					resizeMode="cover"
					style={{
			            flex: 1,
			            height: 220,
			            alignItems: "center",
			            justifyContent: 'center'
			          }}
			           source={require('../../../Images/Group.png')}
			        >
			        <View style={{flex: 1, flexDirection: 'column', justifyContent: "center", backgroundColor: 'transparent', alignItems: "center", width: '100%'}}>
			        <View justifyContent="center" marginBottom={10}>
						<Image source={require('../../../Images/applogo.png')}/>
					</View>
					<View justifyContent='center' flexDirection="row" marginBottom={10}>
						<TouchableOpacity  onPress={() => this.checkIfConnected('https://www.facebook.com/fordhamfoundry/')}>
							<View style={styles.circleButton} marginRight={20}>
								<Image style={{height:40, width: 40}} source={require('../../../Images/Facebook.png')}/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.checkIfConnected('https://twitter.com/FordhamFoundry')}>
							<View style={styles.circleButton} marginRight={20}>
								<Image style={{height:40, width: 40}} source={require('../../../Images/Twitter.png')}/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.checkIfConnected('https://www.instagram.com/fordhamfoundry/')}>
							<View style={styles.circleButton} marginRight={20}>
								<Image style={{height:40, width: 40}} source={require('../../../Images/Instagram.png')}/>
							</View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={() => this.checkIfConnected('https://www.linkedin.com/company/fordham-foundry')}>
							<View style={styles.circleButton}>
								<Image style={{height:40, width: 40}} source={require('../../../Images/Linkedin.png')}/>
							</View>
						</TouchableOpacity>
					</View>
					</View>
					</ImageBackground>
				</View>
					
				
				<View flex={1} height={445*2}>
					<MainViewTabNav/>
				</View>
				
			</ScrollView>
			
		)
	}
}

const styles = StyleSheet.create({
	touchSpace: {
	},
	absView: {
		flex:1 ,
		backgroundColor: 'transparent',
		
	},
	imgCont: {
		height: 235
	},
	buttonTxt: {
		fontSize: 14,
		fontFamily: 'HelveticaNeue-Medium'
	},
	tabBarStyle: {
		flexDirection: "row",
		height: 40,
	},
	circleButton: {
		flex: 1,
		backgroundColor: 'transparent',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
	    shadowOffset: {
	      width: 5,
	      height: 4
	    },
	    shadowOpacity: 1
	}
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(mainview_screen2)