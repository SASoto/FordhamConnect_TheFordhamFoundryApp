import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';

import firebase from 'firebase';
import {connect} from 'react-redux';

import CreatePostModal from './createpost_modal';

import ButtonRounded from '../../components/ButtonRounded';
import DBMainCard from '../../components/DBMainCard';

const windowSize = Dimensions.get('window');
export default class discboard_screen extends Component {
    constructor(props) {
		super(props)

		this.state={
			modalVisible: false
		}
	}

	setModalVisible() {
		this.setState({modalVisible: false});
	}

	renderSeparator() {
		return (
		  <View
		    style={{
		      height: 17,
		      //width: windowSize.width,
		      backgroundColor: "transparent",
		    }}
		  />
		);
	}

    // renderDiscBoard() {
    // 	return (
    // 		<ScrollView flex={1}>
    // 			<View height={500} backgroundColor="red"/>
    // 			<View height={500} backgroundColor="blue"/>
    // 			<View height={500} backgroundColor="green"/>
    // 			<View height={500} backgroundColor="red"/>
    // 			<View height={500} backgroundColor="blue"/>
    // 			<View height={500} backgroundColor="green"/>
    // 		</ScrollView>
    // 	);
    // }

	render() {
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
	        <View flexDirection="column" marginLeft={15} marginTop={22}>
	        	<View width={150}>   			
		 		<TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
		 			<View style={styles.postButtonStyle} justifyContent="center">
		 				<View flexDirection="row" justifyContent="center" alignItems="center">
		 					<View paddingRight={11}>
			 				<Text style={styles.postButtonPlusStyle}>+</Text>
			 				</View>
			 				<View justifyContent="center">
			 					<Text style={styles.postButtonAddStyle}>Add post</Text>
			 				</View>
		 				</View>
		 			</View>
		 		</TouchableOpacity>
		 		</View>
		 		<CreatePostModal modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)}/>

	 		<View alignItems="center">
	 			<View marginTop={19} width={windowSize.width*.95} height={1} backgroundColor="rgb(199,193,195)"/>
	 		</View>
	 		</View>
	 		<View flex={1}>
	 		<ScrollView flex={1}>
    			<View height={500} backgroundColor="red"/>
    			<View height={500} backgroundColor="blue"/>
    			<View height={500} backgroundColor="green"/>
    			<View height={500} backgroundColor="red"/>
    			<View height={500} backgroundColor="blue"/>
    			<View height={500} backgroundColor="green"/>
    		</ScrollView>
			</View>
			</ImageBackground>
			</View>
  		);
	}
}

const styles = ({
	postButtonStyle: {
		//flex: 1,
		width: 150,
		height: 44,
		backgroundColor: 'rgba(106,46,52,0.1)',
		borderColor: 'grey',
		borderRadius: 8,
		borderLeftWidth: 0.5,
		borderRightWidth: 1,
		borderBottomWidth: 2
	},
	postButtonPlusStyle: {
		fontSize: 26,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115,115,115)'
	},
	postButtonAddStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Semibold',
		color: 'rgb(115,115,115)'
	}
})

// const mapStateToProps = (state) => {
//   return {
//   	firstname: state.auth.firstname,
//   	lastname: state.auth.lastname,
//     email: state.auth.email,
//     user: state.auth.user,
//     // password: state.auth.password,
//     // error: state.auth.error,
//     // loading: state.auth.loading,
//     loggedIn: state.auth.loggedIn
//   }
// }

// export default connect(mapStateToProps)(discboard_screen)