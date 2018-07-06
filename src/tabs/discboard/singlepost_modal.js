import React, {Component} from 'react';
import {Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, TextInput, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';

const windowSize = Dimensions.get('window');
class singlepost_modal extends Component {

	constructor(props) {
		super(props);
		//var userID = firebase.auth().currentUser.uid

		this.state = {
			discussionBoardReplies: [],
		 	postKey: "",
		 	replyText: "",
		 	parentPostCommentCount: this.props.postCommentCount,
		}
		//console.log("Construction complete! parentPostCommentCount is ", this.state.parentPostCommentCount)
	}

	resetAndExit() {
		this.props.fetchLatestPosts();
		this.props.modalFunc();
	}

	componentDidMount() {
		//console.log("Checking this.state for post key... ", this.state.postKey)

		//console.log("The props are " + this.props.postKey + " and " + this.props.postCommentCount)

        var fullRepliesArr = [];
        var postID = this.props.postKey
        //console.log("The postID is ", postID)
        //usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        return firebase.database().ref('/discBoardreplies/' + postID + '/').once('value')
        .then(function(snapshot) {
        	//console.log("A snapshot ", snapshot.key)
            snapshot.forEach(function(childSnapshot) {
            	//console.log("A childSnapshot", childSnapshot.key)
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                var replyObj = {'reply_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'reply_date_time': childData.reply_date_time, 'reply_text': childData.reply_text, 'author_id': childData.author_id};
                //console.log("replyOBJECT: ", replyObj);
                fullRepliesArr.push(replyObj);
                //testArray.push("foo")
                //console.log(replyObj.reply_text)//.postKey)
            });
            //console.log(fullPostsArr.author_name)
        }).then(() => {
            this.setState({discussionBoardReplies: fullRepliesArr})
            this.setState({postKey: this.props.postKey, parentPostCommentCount: this.props.postCommentCount})
			//console.log("Component mounted, with postKey " + this.state.postKey + " and  comment count " + this.state.parentPostCommentCount)
			//console.log("And just to double check, the full list of replies is...", this.state.discussionBoardReplies)  
        })//.then(() => {this.createSectionedList()})//.then(() => {
        // 	for (var i = 0; i < this.state.discussionBoardPosts.length; i++) {
        // 		console.log("Post is by..." + this.state.discussionBoardPosts[i].post_key)
        // 	}
        	
        // })
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
		var mid = 'am'
		if(hh ==0){
			hh = 12;
		} else if (hh > 12) {
			hh = hh % 12;
			mid = 'pm'
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

	//If this is a modal, should it have the postID as a state?
	replyToPost() {
		if(this.state.replyText.length == 0) {
			alert("Oops! Your comment contains no text.")
		} else {
			var postID = this.state.postKey //This should come from the state as well.
		// console.log("Test was pushed!")
		// console.log("With postID ", postID)
		
		//Tests replying to a given post just on the back end database
			var newDateTime = this.fetchDateTime()
			var commentCount = this.state.parentPostCommentCount    //TO DO: This needs to be in the state, not a constant value!
		//console.log(this.props.postCommentCount)
			console.log("Old comment count was", commentCount)
			var userID = firebase.auth().currentUser.uid
			var repliesListRef = firebase.database().ref('/discBoardreplies/' + postID + '/');
			var newReplyRef = repliesListRef.push();
			newReplyRef.set({
				'author_name': this.props.firstname + ' ' + this.props.lastname,
  				'author_headline': this.props.headline,			
  				'author_initials': this.props.initials,						
  				'author_id': userID,
  				'reply_date_time': newDateTime,
  				'reply_text': this.state.replyText,	
			})
			.then(() => {
			//This part increments the comment count on the parent post
				//console.log("Created the reply post. Now trying to increment comment count...")
				firebase.database().ref('/discBoardposts/' + postID +'/comment_count/').set(commentCount + 1)//{
				//console.log("Incremented comment count on parent post, I think.")
		 	})
			.then(() => {
				this.setState({replyText: "", parentPostCommentCount: this.state.parentPostCommentCount + 1})
			})
		}
	}

	render () {
		var dateAndTime = this.props.postDateAndTime;
		dateAndTime = dateAndTime.split(' ');
		//console.log("FROM POST MODAL: ", dateAndTime);
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
						<KeyboardAwareScrollView contentContainerStyle={{flex:1}} bounces={false} scrollEnabled={false} extraScrollHeight={40} keyboardOpeningTime={200}>
						<ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
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
								<View backgroundColor="green" flexDirection="column" alignItems="center">
									<View backgroundColor="purple" width="85%">
										<View alignItems="center" justifyContent="center">
										<View borderRadius={8} backgroundColor="#dbd1ce">
											<View paddingHorizontal={40} paddingVertical={22}>
												<Text>
												Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text
												Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text
												Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text
												Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text
												</Text>
											</View>
										</View>
										</View>
										<View flexDirection="row">
											<View marginTop={-20} marginLeft={-15}>
												<View height={60} width={60} borderRadius={30} backgroundColor="grey"/>
											</View>
											<View marginLeft={15} marginTop={10}>
												<Text>Sample Text Sample Text</Text>
											</View>
										</View>
									</View>
								</View>
								<View height={100} backgroundColor="red"/>
								<View height={100} backgroundColor="blue"/>
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
												onChangeText={(text) => this.setState({replyText: text})}
	        						  			value={this.state.replyText}												
												placeholder="Add a comment..."
	                  							placeholderTextColor="rgb(181,178,178)"   
											>
											</TextInput>
										</View>
										<View justifyContent="center" paddingBottom={2} paddingRight={18}>
										<TouchableOpacity onPress={this.replyToPost.bind(this)}>
											<Text style={{fontFamily: 'SFProText-Regular', fontSize: 16, color: 'rgb(181,178,178)'}}>Post</Text>										
										</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
							</View>
						</View>
						</KeyboardAwareScrollView>
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
		width: 70,
		height: 70,
		borderRadius: 35,
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
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    initials: state.auth.initials,
    headline: state.auth.headline,
    //loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(singlepost_modal)
