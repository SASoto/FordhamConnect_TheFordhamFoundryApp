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
		//var userID = firebase.auth().currentUser.uid

		this.state = {
		 	postAuthor: this.props.firstname + " " + this.props.lastname,
		 	postAuthHead: this.props.headline,
		 	postAuthInitials: this.props.initials,
		 	postAuthID: null,
		 	postDateTime: "",
		 	postText: "",
		 	postCommentCount: 0,
		}
		//console.log("Construction complete!")
	}

	componentDidMount() {
		this.checkFlag();
		//this.setState({postAuthID: firebase.auth().currentUser.uid});
	}

	checkFlag() {
		if(firebase.auth().currentUser != null) {
			this.setState({postAuthID: firebase.auth().currentUser.uid});
		} else {
			setTimeout(() => {this.checkFlag()},1000);
		}
	}

	checkStuff() {
		// if(this.props.loggedIn) {
		  // console.log("IS THE USER LOADING? ",this.props.loading)
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
		//var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		

		// if(dd<10) {
  //   		dd = '0'+dd
		// } 

		// if(mm<10) {
  //   		mm = '0'+mm
		// } 
		// var date = yyyy+'-'+mm+'-'+dd;

		var hh = today.getHours();
		var minmin = today.getMinutes();
		// var ss = today.getSeconds();
		var mid = 'AM'
		if(hh ==0){
			hh = 12;
		} else if (hh > 12) {
			hh = hh % 12;
			mid = 'PM'
		}

		// if(hh<10) {
  //   		hh = '0'+hh
		// } 

		if(minmin<10) {
    		minmin = '0'+minmin
		} 

		// if(ss<10) {
  //   		ss = '0'+ss
		// } 

		//var time = hh + ":" + minmin + ":" + ss;
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
			//console.log("Post text is still... ", this.state.postText)
			// var connectedRef = firebase.database().ref(".info/connected");
			// connectedRef.on('value', function(connectedSnap) {
  	// 		if (connectedSnap.val() === true) {
    		/* we're connected! */
    			//console.log("We're connected, so posting should have worked already.")
    			Alert.alert(
  					'Success!',
  					"Your post has been added to the discussion board. If you're offline, the post won't appear until you reconnect.",
  					[
    					{text: 'OK', onPress: () => {this.resetNewPost()}},
  					],
  					{ cancelable: false }
				)
  			// } else {
    		/* we're disconnected! */
    			//console.log("We're NOT connected, so posting won't work until we reconnect.")
    // 			Alert.alert(
  		// 			'Posted from Offline!',
  		// 			'You appear to be offline, but your post will automatically post to the discussion board when your connection resumes.',
  		// 			[
    // 					{text: 'OK', onPress: () => {this.resetNewPost()}},
  		// 			],
  		// 			{ cancelable: false }
				// )
  			}
		//});
		// // .then(() => {
		// // 	//this.props.modalFunc()	
		// // })
		// .then(() => {
		//alert("Success! Your post has been added to the discussion board.")
			

		//}

		
		// .catch(function(error) {
  //   	console.log("Posting failed: " + error.message)
  // 		});

		
		// We've appended a new message to the message_list location.
		// var path = newMessageRef.toString();
		// console.log(path)
		// path will be something like
		// 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'
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
				                //resizeMode,
				                position: 'absolute',
				                width: '100%',
				                height: '100%',
				                //alignItems: 'center',
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
									height: Header.HEIGHT * 1.5,
									//position: 'absolute',
									//top:0,

									//width: '100%',
									//height: '100%',
								}}

				              source={require('../../../Images/positionedblur.png')}

							>
								
							<View flex={1} paddingTop={20} justifyContent="center">
								<View flexDirection="row" justifyContent="space-between">
									<TouchableOpacity onPress={() => this.props.modalFunc()}>
										<View paddingLeft={30}>
											<MatIcon name="close" size={24} color="rgb(255,255,255)"/>											
										</View>
									</TouchableOpacity>									
									<View alignItems="center" padding={5}>
										<Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(255,255,255)'}}>New Post</Text>
									</View>
									<View paddingRight={30}>									
										<TouchableOpacity onPress={this.postNewPost.bind(this)}>
											<Text style={styles.postButtonStyle}>Share</Text>
										</TouchableOpacity>									
									</View>
								</View>
							</View>
							</ImageBackground>						
							<View flex={1}>
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
		          						onChangeText={(text) => this.setState({postText: text})}
	        						  	value={this.state.postText}	
		          						placeholder="Post about job opportunities, Fordham events, news or anything else worth discussing..."
										placeholderTextColor="rgba(99,96,96,0.21)"
									/>			
								</View>
								</View>							
							<View flex={1} backgroundColor="rgba(15,14,14,0.5)"/>
							</View>
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
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(createpost_modal)

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>