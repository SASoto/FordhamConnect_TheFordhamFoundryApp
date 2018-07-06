import React, {Component} from 'react';
import {StyleSheet, Dimensions, ImageBackground, Text, View, ScrollView, Image, Button, TouchableOpacity} from 'react-native';
import {DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';

import ProfileModal from './profilemodal';
import LogoutButton from './logoutbutton';
import LinearGradient from 'react-native-linear-gradient';

class drawernavigator extends Component {
	constructor(props) {
		super(props)

		this.state={
			modalVisible: false
		}
	}

	setModalVisible() {
		this.setState({modalVisible: false});
	}

	// const userEmail = firebase.auth().currentUser.email;
	render() {
	return (
	<View flex={1} borderBottomWidth={0} borderTopWidth={0} borderLeftWidth={0} borderRightWidth={0.5} borderColor="rgba(0,0,0,34)">
	<ImageBackground
          resizeMode='cover'
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}

            source={require('../../Images/background_splash.jpg')}
        >
		<SafeAreaView flexDirection="column">
			<TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
				<View flexDirection="column" marginLeft={30} marginTop={40}>
						<View flexDirection="row">
							<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
								<Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
							</LinearGradient>
							<View justifyContent="center">
								<Text style={{fontFamily:'SFProText-Light', fontSize:10, color:'rgb(255,255,255)'}}>edit my profile</Text>
							</View>
						</View>
						<View marginTop={20}>
							<Text style={styles.userNameTxtStyle}>{this.props.firstname} {this.props.lastname}</Text>
							<Text style={styles.headlineTxtStyle}>{this.props.headline}</Text>
						</View>
					</View>
				
			</TouchableOpacity>

			<ProfileModal modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)}/>

			<View marginTop={37} borderTopWidth={1} borderColor='rgba(112,68,68,0.64)'/>
				<View marginTop={20}>
					<DrawerItems 
					{...this.props}
					labelStyle={{fontFamily: 'SFProText-Bold', fontSize: 14}}
					//items={items.filter((item) => item.routeName !== 'Profile')}
					/>
				</View>
			<View marginTop={20} marginBottom={17} borderTopWidth={1} borderColor='rgba(112,68,68,0.64)'/>	
			<TouchableOpacity style={styles.logoutCont}>
				<LogoutButton {...this.props} />
			</TouchableOpacity>
		</SafeAreaView>
		</ImageBackground>
	</View>
	);
	}
};

const styles = ({
	profPic: {
		width: 46,
		height: 46,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
		//backgroundColor: 'grey'
	},
	userNameTxtStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(255,255,255)'
	},
	headlineTxtStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 13,
		color: 'rgb(255,255,255)'
	},
	logoutCont: {
		alignItems: "flex-start",
		marginLeft: 17,
		marginTop: 10
	}
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    user: state.auth.user,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    initials: state.auth.initials,
    headline: state.auth.headline,
    website: state.auth.website,
    location: state.auth.location,
    bio: state.auth.bio
  }
}

export default connect(mapStateToProps)(drawernavigator)