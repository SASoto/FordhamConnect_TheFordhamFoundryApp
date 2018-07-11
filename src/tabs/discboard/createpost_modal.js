import React, {Component} from 'react';
import {Alert, Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialIndicator} from 'react-native-indicators';

const windowSize = Dimensions.get('window');
class createpost_modal extends Component {

	constructor(props) {
		super(props);

		this.state = {
		 	postAuthor: this.props.firstname + " " + this.props.lastname,
		 	postAuthHead: this.props.headline,
		 	postAuthInitials: this.props.initials,
		 	postAuthID: null,
		 	postDateTime: "",
		 	postText: "",
		 	postCommentCount: 0,
		}
	}

	componentDidMount() {
		this.checkFlag();
	}

	checkFlag() {
		if(firebase.auth().currentUser != null) {
			this.setState({postAuthID: firebase.auth().currentUser.uid});
		} else {
			setTimeout(() => {this.checkFlag()},1000);
		}
	}

	checkStuff() {
		{this.checkFlag()}		    
		//}
	}

	fetchDateTime() {
		var today = new Date();
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var day = days[today.getDay()];
		var month = months[ today.getMonth() ];
		var dd = today.getDate();
		var yyyy = today.getFullYear();

		var hh = today.getHours();
		var minmin = today.getMinutes();
		var mid = 'am'
		if(hh ==0){
			hh = 12;
		} else if (hh > 12) {
			hh = hh % 12;
			mid = 'pm'
		}

		if(minmin<10) {
    		minmin = '0'+minmin
		} 

		var dateTime = day + " " + month + " " + dd + " " + yyyy + " " + hh + ":" + minmin + " " + mid;

		return(dateTime)
	}

	resetNewPost() {
		this.setState({postText: "", postDateTime: ""})
		this.props.fetchLatestPosts();
		this.props.modalFunc()
	}

	postNewPost() {
		console.log("Trying to post a new post...")

		var newDateTime = this.fetchDateTime()
		console.log(newDateTime)
		console.log(this.state.postAuthor)
		console.log(this.state.postAuthHead)
		console.log(this.state.postText)

		if(this.state.postText === ""){
			alert("Oops! Your post contains no text! Enter some and try again.")
		} else {
			var discpostListRef = firebase.database().ref('discBoardposts');
			var newMessageRef = discpostListRef.push();
			newMessageRef.set({
				'author_name': this.state.postAuthor,
  				'author_headline': this.state.postAuthHead,
  				'author_initials': this.state.postAuthInitials,
  				'author_id': this.state.postAuthID,
  				'comment_count': this.state.postCommentCount,
  				'post_date_time': newDateTime,
  				'post_text': this.state.postText,
			})
			.then(() =>{
				Alert.alert(
  				'Success!',
  				"Your post has been added to the discussion board. If you're offline, the post won't appear until you reconnect.",
  				[
    				{text: 'OK', onPress: () => {this.resetNewPost()}},
  				],
  				{ cancelable: false }
			)
			})
    		
  			}
	}
	render () {
		if(this.state.postAuthID == null) {
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
				                position: 'absolute',
				                width: '100%',
				                height: '100%',
			              	}}

			              	source={require('../../../Images/plussilvergradient.png')}

			            >
			           <View paddingTop={30}>
				        <MaterialIndicator color='darkgrey' size={35}/>
				      </View>
			            </ImageBackground>
			 		</View>
				</Modal>
			)
		}
		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
				<View flex={1}>
					
		            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						
							<View flex={1}>
							<ImageBackground
								resizeMode='cover'
								style={{
									height: Header.HEIGHT * 1.5,
								}}

				              source={require('../../../Images/positionedblur.png')}

							>
								
							<View flex={1} paddingTop={25} justifyContent="center">
								<View flexDirection="row" justifyContent="space-between">
									<TouchableOpacity justifyContent="center" onPress={() => this.props.modalFunc()}>
										<View paddingLeft={30}>
											<MatIcon name="close" size={24} color="rgb(255,255,255)"/>											
										</View>
									</TouchableOpacity>									
									<View paddingRight={30} justifyContent="center">									
										<TouchableOpacity onPress={this.postNewPost.bind(this)}>
											<Text style={styles.postButtonStyle}>Share</Text>
										</TouchableOpacity>									
									</View>
								</View>
							</View>
							</ImageBackground>						
							<View flex={1} backgroundColor='#dbd1ce'>
								<View paddingLeft={36}>
								<View flexDirection="row" marginTop={28}>					
									<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
										<Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
									</LinearGradient>									
									<TextInput
										style={styles.input}
										autoCapitalize = 'none'
		          						autoCorrect = {false}
		          						multiline={true}
		          						maxLength={400}
		          						onChangeText={(text) => this.setState({postText: text})}
	        						  	value={this.state.postText}	
		          						placeholder="Post about job opportunities, Fordham events, news or anything else worth discussing..."
										placeholderTextColor="rgba(99,96,96,0.21)"
									/>																			
								</View>
								
								</View>							
							<View marginTop={40} flex={1} backgroundColor="rgba(15,14,14,0.5)"/>
							</View>
							</View>
					</TouchableWithoutFeedback>

					
				</View>
			</Modal>
			);
	}
}

const styles = ({
	profPic: {
		width: 46,
		height: 46,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 14,
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 2
		},			
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	input:{
		fontFamily: 'SFProText-Light',
		height:100,
		width: 225,
		color: 'rgb(115,115,115)',
		fontSize: 16,
		backgroundColor: 'transparent',
	},
	postButtonStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
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
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(createpost_modal)