import React, {Component} from 'react';
import {Alert, Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';

import {connect} from 'react-redux';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
class createpost_modal extends Component {

	constructor(props) {
		super(props);
		var userID = firebase.auth().currentUser.uid

		this.state = {
		 	postAuthor: this.props.firstname + " " + this.props.lastname,
		 	postAuthHead: this.props.headline,
		 	postAuthID: userID,
		 	postDateTime: "",
		 	postText: "",
		 	postCommentCount: 0,
		}
		//console.log("Construction complete!")
	}

	fetchDateTime() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
    		dd = '0'+dd
		} 

		if(mm<10) {
    		mm = '0'+mm
		} 
		var date = yyyy+'-'+mm+'-'+dd;

		var hh = today.getHours();
		var minmin = today.getMinutes();
		var ss = today.getSeconds();

		if(hh<10) {
    		hh = '0'+hh
		} 

		if(minmin<10) {
    		minmin = '0'+minmin
		} 

		if(ss<10) {
    		ss = '0'+ss
		} 

		var time = hh + ":" + minmin + ":" + ss;
		var dateTime = date+' '+time;

		return(dateTime)
	}

	resetNewPost() {
		this.setState({postText: "", postDateTime: ""})
		this.props.modalFunc()
	}

	postNewPost() {
		console.log("Trying to post a new post...")

		var newDateTime = this.fetchDateTime()
		console.log(newDateTime)
		console.log(this.state.postAuthor)
		console.log(this.state.postAuthHead)
		console.log(this.state.postText)

		if(this.state.postText = ""){
			alert("Oops! Your post contains no text! Enter some and try again.")
		} else {
			

			var discpostListRef = firebase.database().ref('discBoardposts');
			var newMessageRef = discpostListRef.push();
			newMessageRef.set({
				'author_name': this.state.postAuthor,
  				'author_headline': this.state.postAuthHead,
  				'author_id': this.state.postAuthID,
  				'comment_count': this.state.postCommentCount,
  				'post_date_time': newDateTime,
  				'post_text': this.state.postText,
			})
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
										<TouchableOpacity onPress={this.postNewPost.bind(this)}>
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
	          						onChangeText={(text) => this.setState({postText: text})}
        						  	value={this.state.postText}	
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