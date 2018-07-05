import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, ScrollView, Text, FlatList, Image, TouchableOpacity} from 'react-native';

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
			discussionBoardPosts: [],
			modalVisible: false
		}
	}

	setModalVisible() {
		this.setState({modalVisible: false});
	}

	componentDidMount() {

	}

	renderSeparator() {
		return (
		  <View
		    style={{
		      height: 30,
		      //width: windowSize.width,
		      backgroundColor: "transparent",
		    }}
		  />
		);
	}

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
				<View flexDirection="column">
					
					<TouchableOpacity style={styles.postButtonStyle} onPress={() => this.setState({modalVisible: true})}>
						
							<View flexDirection="row" alignItems="center">
								<View paddingRight={11}>
								<Text style={styles.postButtonPlusStyle}>+</Text>
								</View>
								<View justifyContent="center">
									<Text style={styles.postButtonAddStyle}>Add post</Text>
								</View>
							</View>
						
					</TouchableOpacity>
					
				<CreatePostModal modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)}/>
				</View>
	 			<View alignItems="center">
		 			<View marginTop={10} width={windowSize.width*.95} height={1} backgroundColor="rgb(199,193,195)"/>
		 		</View>
		 		<FlatList flex={1}
			 		data={this.state.discussionBoardPosts} keyExtractor={(x,i) => i.toString()} renderItem={({item}) =>      
		                <View alignItems="center">
		              	
		                </View>
	          	  	}
		 		>
	    			
	    		</FlatList>
			</ImageBackground>
			</View>
  		);
	}
}

const styles = ({
	postButtonStyle: {
		//flex: 1,
		//flexDirection: 'column',
		//elevation: 2,
		marginLeft: 10,
		marginTop: 10,
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
	postButtonPlusStyle: {
		fontSize: 26,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115,115,115)'
	},
	postButtonAddStyle: {
		fontSize: 14,
		fontFamily: 'SFProText-Semibold',
		color: 'rgb(115,115,115)'
	},
	// addPostButtonEncCont: {
	// 	elevation: 10,
	// 	//flex: 1,
	// 	shadowColor: 'rgba(0, 0, 0, 0.5)',
	// 	shadowOffset: {
	// 		width: 0,height: 2
	// 	},
	// 	shadowRadius: 4,
	// 	shadowOpacity: 1,
	// }
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