import React, {Component} from 'react';
import {StyleSheet, Dimensions, ImageBackground, Text, View, ScrollView, Image, Button, TouchableOpacity} from 'react-native';
import {DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';

import ProfileModal from './profilemodal';
import LogoutButton from './logoutbutton';

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
		const userEmail = this.props.email;
		console.log("USER EMAIL FROM DRAWER: ", this.props.email);
		//console.log("USER PASSWORD FROM ROUTER", this.props.password);
		const userFName = this.props.firstname;
		//console.log("USER FIRSTNAME FROM ROUTER: ",userFName);
		const userLName = this.props.lastname;
		//console.log("USER LASTNAME FROM ROUTER: ",userLName);

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
					
						<View style={styles.profPic}/>
						<View marginTop={20}>
							<Text style={styles.accountInfoTxtStyle}>SAMPLE TEXT</Text>
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
		backgroundColor: 'grey'
	},
	accountInfoTxtStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(255,255,255)'
	},
	logoutCont: {
		alignItems: "flex-start",
		marginLeft: 16,
		marginTop: 10
	}
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(drawernavigator)