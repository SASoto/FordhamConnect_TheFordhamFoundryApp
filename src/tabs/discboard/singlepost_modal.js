import React, {Component} from 'react';
import {Alert, AlertIOS, Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, Button, TextInput, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';
import {getReplies} from './firebaseListener';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';

class CustomFlatListItem extends Component {
	render() {
		const replyStyles = ({
			replyEncompCont: {
				flex: 1,
				width: "80%",
				flexDirection: "column",
			},
			replyTextEncompCont: {
				backgroundColor: "#dbd1ce",
				paddingHorizontal: 40,
				paddingVertical: 22,
				borderRadius: 8,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 1
				},
				shadowRadius: 2,
				shadowOpacity: 1,
			},
			replyAuthProfPic: {
				height: 40,
				width: 40,
				borderRadius: 20,
				justifyContent: 'center',
				alignItems: 'center',
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 2
				},
				//height: 300,
				shadowRadius: 4,
				shadowOpacity: 1,
				// shadowColor: 'rgba(0, 0, 0, 0.5)',
				// shadowOffset: {
				// 	width: 0,height: 2
				// },
				// shadowRadius: 4,
				// shadowOpacity: 1,
			},
			replyTextStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 14,
				color: 'rgb(115,115,115)'
			},
			authorNameStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 14,
				color: 'rgb(115,115,115)'
			}
		})

		if(this.props.item.reply_key == 12345 && this.props.item.author_id == 12345) {
			return (
				<View marginTop={30} alignItems="center">
					<Text style={styles.additionalInfoStyle}>Goobye!</Text>
				</View>
			)
		}
		else {
			if(this.props.item.author_name == 'Fordham Foundry') {
 				var gradientColor = (
	 				<LinearGradient colors={['rgb(242,56,90)', 'rgb(85,181,255)']} style={replyStyles.replyAuthProfPic}>
	 		            <Text style={{fontFamily: 'SFProText-Light', fontSize: 16, color: 'rgb(255,255,255)'}}>{this.props.item.author_initials}</Text>
	 		        </LinearGradient>
	 			)
	 		} else {
	 			var gradientColor = (
	 				<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={replyStyles.replyAuthProfPic}>
	 		            <Text style={{fontFamily: 'SFProText-Light', fontSize: 16, color: 'rgb(255,255,255)'}}>{this.props.item.author_initials}</Text>
	 		        </LinearGradient>
	 			)
	 		}

	 		return (
	 			<View style={replyStyles.replyEncompCont}>
					<View justifyContent="center">
				
						<View style={replyStyles.replyTextEncompCont}>
							<Text style={replyStyles.replyTextStyle}>{this.props.item.reply_text}</Text>
						</View>
				
					</View>
					<View flexDirection="row">
						<View marginTop={-20} marginLeft={-15}>
							{gradientColor}
						</View>
						<View marginLeft={15} marginTop={8}>
							<Text style={replyStyles.authorNameStyle}>{this.props.item.author_name}</Text>
						</View>
					</View>
				</View>
	 		)
	 	}
	}
}



class singlepost_modal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			discussionBoardReplies: [],
			backupDiscussionBoardReplies: [],
			newReplies: false,
		 	postKey: "",
		 	postauthID: this.props.postauthID,
		 	replyText: "",
		 	parentPostCommentCount: this.props.postCommentCount,
		}
		this.cleanState = this.cleanState.bind(this)
	}

	componentDidMount() {
		const replyEndpoint = '/discBoardreplies/' + this.props.postKey + '/';
		//console.log("Earlier in componentDidMount... DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		
		firebase.database().ref(replyEndpoint).on('value', (snap) => {
			console.log("New listener is on!")
		  //do something with snap
			if(snap.val() == undefined || snap.val() == null)
				this.setState({
					discussionBoardReplies: [],
				})
			else {
				const latestReplies = Object.values(snap.val());
		        this.setState({discussionBoardReplies: latestReplies, backupDiscussionBoardReplies: latestReplies})
		        //console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		   
			}
		})
		//this.onDeletePress()
    }

    componentWillUnmount() {
    	firebase.database().ref('/discBoardreplies/' + this.props.postKey + '/').off()
    	//console.log("IS THIS UNMOUNT RUNNING: ",this.props.postKey)
    }

    fetchLatestReplies() {
    	var fullRepliesArr = [];
        var postID = this.state.postKey
        return firebase.database().ref('/discBoardreplies/' + postID + '/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var replyObj = {'reply_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'reply_date_time': childData.reply_date_time, 'reply_text': childData.reply_text, 'author_id': childData.author_id};
                fullRepliesArr.push(replyObj);
            });
        }).then(() => {
        	this.appendLatestReplies(fullRepliesArr)
            this.setState({parentPostCommentCount: this.props.postCommentCount})
        }).then(() => {
        	this.refs._repliesScrollView.scrollToEnd({animated: false})
        })
    }

    firstButtonPress() {
    	console.log("Fine! Fine! We won't delete it.")
    }

    secondButtonPress() {
    	//console.log("Boom! We totally deleted it.")
    	//PLACE THE FOLLOWING CODE SOMEWHERE HERE TO EXECUTE BACKEND REMOVAL OF POSTS AND REPLIES
			var postRef = firebase.database().ref("/discBoardposts/" + this.props.postKey + "/");
			postRef.remove()
  			.then(function() {
    			console.log("Post Remove succeeded.")
  			})
  			.catch(function(error) {
    			console.log("Post Remove failed: " + error.message)
  			});
  			var replyRef = firebase.database().ref("/discBoardreplies/" + this.props.postKey + "/");
			replyRef.remove()
  			.then(function() {
    			console.log("Reply Remove succeeded.")
  			})
  			.catch(function(error) {
    			console.log("Reply Remove failed: " + error.message)
  			});
  		Alert.alert(
          	'Deleted!',
          	"Your post and all replies to it have been deleted.",
          	[
            	{text: 'Okay', onPress: this.returnAfterDelete.bind(this)},
          	],
    	)
  			//this.resetAndExit()
  			
    }

    onDeletePress() {
    	//console.log("State of postauthID for this post is...", this.state.postauthID)

		var user = firebase.auth().currentUser;
		var uid;

		if (user != null) {
  			uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
		}
		if (uid == this.state.postauthID || uid == 'yVXMElLOjGTqQDid8znTmvxNIyx1'){
			//console.log("USER SHOULD BE ABLE TO DELETE this post!")
			//console.log("Doing so would remove post /discBoardposts/" + this.props.postKey + "/")
			//console.log("And at /discBoardreplies/" + this.props.postKey + "/")

			AlertIOS.alert(  
				'Are You Sure You Want to Delete?', 
				'Deleting this post will permanently remove it, along with all comments attached to it.',  
				[{text: 'Cancel', onPress: this.firstButtonPress.bind(this), style: 'cancel'}, 
				{text: 'Delete', onPress: this.secondButtonPress.bind(this), style: 'destructive'}]
			)

			
		} else {
			console.log("User should NOT be able to delete this post.")
		}
    }

    returnAfterDelete() {
    	//console.log("Trying to return to the discussion board now...")
    	this.resetAndExit()
    }

    appendLatestReplies(setOfNewReplies) {
    	if(setOfNewReplies.length > this.state.discussionBoardReplies.length) {
    		const latestReplies = setOfNewReplies.slice(this.state.discussionBoardReplies.length);
    		//console.log("LIST OF REPLIES WE ALREADY HAVE: ",this.state.discussionBoardReplies)
    		//console.log("FRESH BATCH: ",latestReplies);
    		const olderReplies = this.state.discussionBoardReplies;
    		this.setState({discussionBoardReplies: [...olderReplies,...latestReplies]});
    	}
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

	//If this is a modal, should it have the postID as a state?
	replyToPost() {

		//DO A CHECK TO SEE IF COMMENT COUNT IS EQUAL TO 10 ALREADY
		if(this.state.replyText.length == 0) {
			//alert("Oops! Your comment contains no text.")
			Alert.alert(
          	'Oops!',
          	"Your comment contains no text. Try again.",
          	[
            	{text: 'OK'},
          	],
        )
		} else {
			var postID = this.props.postKey //This should come from the state as well.
		
		//Tests replying to a given post just on the back end database
			var newDateTime = this.fetchDateTime()
			var commentCount = this.state.parentPostCommentCount    //TO DO: This needs to be in the state, not a constant value!
		//console.log(this.props.postCommentCount)
			//console.log("Old comment count was", commentCount)
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
				firebase.database().ref('/discBoardposts/' + postID +'/comment_count/').set(commentCount + 1)//{
		 	})
			.then(() => {
				this.setState({replyText: "", parentPostCommentCount: this.state.parentPostCommentCount + 1})
				this.refs._repliesScrollView.scrollToEnd({animated: false})
			})
		}
	}

	resetAndExit() {
		// console.log("Exit process started...")
		// console.log("Latest Posts have been fetched.")
		//this.props.fetchLatestPosts()
		this.cleanState();

		// console.log("About to run the modalFunc")
		setTimeout(() => {this.props.modalFunc()},250)
		setTimeout(() => {this.props.fetchLatestPosts()},250)
		// console.log("And now the modalFunc has run.")
	}

	newRepliesArrived() {
			return (
				<View>
					<Text>New Reply</Text>
				</View>
			)
	}

	cleanState() {
		this.setState({discussionBoardReplies: [{'reply_key': 12345, 'author_name': ' ', 'author_initials': ' ', 'author_headline': ' ', 'reply_date_time': ' ', 'reply_text': ' ', 'author_id': 12345}]})
		//console.log("The testArray is in place.")
	}

	renderIf(condition) {
	    if (condition) {
	        return (
	        	<TouchableOpacity onPress={this.onDeletePress.bind(this)}>
					<Text style={styles.deleteButtonStyle}>Delete</Text>
				</TouchableOpacity>
	        );
	    } else {
	        return null;
	    }
	}

	renderSeparator() {
		return (
		  <View
		    style={{
		      height: 20,          
		      backgroundColor: "transparent",
		    }}
		  />
		);
	}

	render () {
		var dateAndTime = this.props.postDateAndTime;
		dateAndTime = dateAndTime.split(' ');
		dateAndTime = dateAndTime[0] + ' at ' + dateAndTime[1] + ' ' + dateAndTime[2];
		//console.log("We need the full list of replies by here – do we have it?", this.state.discussionBoardReplies)
		var user = firebase.auth().currentUser;
		var uid;

		if (user != null) {
  			uid = user.uid;
		}
		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
			<View flex={1} backgroundColor='#dbd1ce'>
				
				
					<View flex={1}>
						<ImageBackground
							resizeMode='cover'
							style={{
								height: Header.HEIGHT * 1.5,
							}}

			              source={require('../../../Images/positionedblur.png')}
						>
							<View flex={1} paddingTop={25} justifyContent="center">
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
						<ScrollView ref='_repliesScrollView' flex={1} showsVerticalScrollIndicator={false}>
							<View style={styles.encompCont}>
							<View flexDirection="column">
								<View paddingTop={30} paddingBottom={10} paddingHorizontal={38}>
									<View flexDirection="row">
										<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.authProfPic}>
								            <Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.authorInitials}</Text>
								        </LinearGradient>						
										<View justifyContent = "center" flexDirection="column" width={250}>
											<View justifyContent="center" marginBottom={1}>
												<Text style={styles.nameStyle}>{this.props.authorName}</Text>
											</View>
											<View justifyContent="center">
												<Text style={styles.headlineStyle}>{this.props.authorHeadline}</Text>
											</View>
										</View>						
									</View>
									<View marginTop={15}>
										<View paddingLeft={8} paddingRight={5}>
											<Text style={styles.descStyle}>{this.props.fullPostDesc}</Text> 
										</View>
									</View>
									<View marginTop={12} flexDirection="row" justifyContent="space-between">
										<View paddingLeft={8}>
											<Text style={styles.additionalInfoStyle}>Posted on {dateAndTime}</Text>
										</View>
										{this.renderIf((uid == this.state.postauthID) || (uid == 'yVXMElLOjGTqQDid8znTmvxNIyx1'))}
									</View>													
								</View>
								<View marginTop={6} marginBottom={16} height={1} backgroundColor="rgb(199,193,195)"/>
								
								<FlatList
									ListEmptyComponent={<View marginTop={30} alignItems="center">
	                                      					<Text style={styles.additionalInfoStyle}>Be the first to add to this discussion!</Text>
	                                   					</View>}
									ItemSeparatorComponent={this.renderSeparator}
									removeClippedSubviews={true}
									data={this.state.discussionBoardReplies} keyExtractor={(x,i) => i.toString()} renderItem={({item}) =>      
										<View alignItems="center">
											<CustomFlatListItem item={item} />								
										</View>

									}
								/>
								


							</View>
			           		</View>			           		
			           	</ScrollView>
						
		           		<View justifyContent="center" borderTopWidth={1} borderColor='rgb(199,193,195)' bottom={0}>
						
		           		
						<View flexDirection="row" paddingLeft={30} paddingVertical={25} >
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
												//multiline={true}
												onChangeText={(text) => this.setState({replyText: text})}
	        						  			value={this.state.replyText}												
												placeholder="Add a comment..."
	                  							placeholderTextColor="#afacac"   
											>
											</TextInput>
										</View>
										<View justifyContent="center" paddingRight={18}>
										<TouchableOpacity onPress={this.replyToPost.bind(this)}>
											<Text style={{fontFamily: 'SFProText-Regular', fontSize: 14, color: '#737373'}}>Post</Text>										
										</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
							</View>
						</View>
						
						</KeyboardAwareScrollView>
			 		</View>
           	
				
			</View>
			</Modal>
			);
	}
}

const styles = ({
	encompCont: {
		flex: 1,
		top: 0,
		bottom: 0,

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
			width: 0,height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	authProfPic: {
		width: 46,
		height: 46,
		borderRadius: 23,
		marginRight: 14,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 2
		},			
		shadowRadius: 4,
		shadowOpacity: 1,

	},
	nameStyle: {
		fontFamily: 'SFProText-Regular',
		fontSize: 16,
		color: 'rgb(115,115,115)'
	},
	headlineStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 14,
		color: 'rgb(115,115,115)'
	},
	locationStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 13,
		color: 'rgb(115,115,115)'
	},
	descStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 16,
		color: 'rgb(115,115,115)',
	},
	joinButtonStyle: {
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
		fontSize: 12,
		color: 'rgb(115,115,115)'
	},
	replyEncompCont: {
		borderRadius: 17,
		borderWidth: 1,
		borderColor: '#afacac',
	},
	replyTextInput: {
		//paddingTop: 12,
		paddingLeft: 12,
		paddingRight: 12,
		//paddingBottom: 8,
		height: 40,
		width: 200,
		fontFamily: 'SFProText-Regular',
		fontSize: 14,
		color: '#afacac'
	},
	deleteButtonStyle: {
		fontFamily: 'SFProText-Medium',
		fontSize: 12,
		color: '#6A2E34',
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

export default connect(mapStateToProps)(singlepost_modal)
