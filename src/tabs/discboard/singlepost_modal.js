import React, {Component} from 'react';
import {Alert, AlertIOS, Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, Button, TextInput, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';
import {getReplies} from './firebaseListener';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';

export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

class CustomFlatListItem extends Component {
	render() {
		const styles = ({
			replyAuthProfPic: {
				height: 40,
				width: 40,
				borderRadius: 20,
				justifyContent: 'center',
				alignItems: 'center'
			}
		})

		return (
			
			<View flex={1} width="80%" backgroundColor="purple" flexDirection="column">
				<View backgroundColor="red" justifyContent="center">
			
					<View paddingHorizontal={40} paddingVertical={22} borderRadius={8} backgroundColor="#dbd1ce">
						<Text>{this.props.item.reply_text}</Text>
					</View>
			
				</View>
				<View flexDirection="row">
					<View marginTop={-20} marginLeft={-15}>
						<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.replyAuthProfPic}>
		            <Text style={{fontFamily: 'SFProText-Light', fontSize: 16, color: 'rgb(255,255,255)'}}>{this.props.item.author_initials}</Text>
		        </LinearGradient>
					</View>
					<View marginLeft={15} marginTop={10}>
						<Text>{this.props.item.author_name}</Text>
					</View>
				</View>
			</View>
			
		)
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
		this.testArray = this.testArray.bind(this)
	}

	componentDidMount() {
		const replyEndpoint = '/discBoardreplies/' + this.props.postKey + '/';
		console.log("Earlier in componentDidMount... DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		
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
		        console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		   
			}
		})
		//this.onDeletePress()
    }

    componentWillUnmount() {
    	firebase.database().ref('/discBoardreplies/' + this.props.postKey + '/').off()
    	console.log("IS THIS UNMOUNT RUNNING: ",this.props.postKey)
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
    	console.log("Boom! We totally deleted it.")
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
    	console.log("State of postauthID for this post is...", this.state.postauthID)

		var user = firebase.auth().currentUser;
		var uid;

		if (user != null) {
  			uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
		}
		if (uid == this.state.postauthID){
			console.log("USER SHOULD BE ABLE TO DELETE this post!")
			console.log("Doing so would remove post /discBoardposts/" + this.props.postKey + "/")
			console.log("And at /discBoardreplies/" + this.props.postKey + "/")

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
    	console.log("Trying to return to the discussion board now...")
    	this.resetAndExit()
    }

    appendLatestReplies(setOfNewReplies) {
    	if(setOfNewReplies.length > this.state.discussionBoardReplies.length) {
    		const latestReplies = setOfNewReplies.slice(this.state.discussionBoardReplies.length);
    		console.log("LIST OF REPLIES WE ALREADY HAVE: ",this.state.discussionBoardReplies)
    		console.log("FRESH BATCH: ",latestReplies);
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
				firebase.database().ref('/discBoardposts/' + postID +'/comment_count/').set(commentCount + 1)//{
		 	})
			.then(() => {
				this.setState({replyText: "", parentPostCommentCount: this.state.parentPostCommentCount + 1})
				this.refs._repliesScrollView.scrollToEnd({animated: false})
			})
		}
	}

	resetAndExit() {
		console.log("Exit process started...")
		this.testArray();
		console.log("About to run the modalFunc")
		setTimeout(() => {this.props.modalFunc()},250)
		console.log("And now the modalFunc has run.")
		setTimeout(() => {this.props.fetchLatestPosts()},250);
		console.log("Latest Posts have been fetched.")
	}

	newRepliesArrived() {
			return (
				<View>
					<Text>New Reply</Text>
				</View>
			)
	}

	testArray() {
		this.setState({discussionBoardReplies: [{'reply_key': 1, 'author_name': ' ', 'author_initials': ' ', 'author_headline': ' ', 'reply_date_time': ' ', 'reply_text': ' ', 'author_id': 'test'}]})
		console.log("The testArray is in place.")
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
								<View paddingRight={30}>
									{renderIf(uid == this.state.postauthID,									
										<TouchableOpacity onPress={this.onDeletePress.bind(this)}>
											<Text style={styles.postButtonStyle}>Delete Post</Text>
										</TouchableOpacity>
										)}									
								</View>
							</View>
						</ImageBackground>
						<KeyboardAwareScrollView contentContainerStyle={{flex:1}} bounces={false} scrollEnabled={false} extraScrollHeight={40} keyboardOpeningTime={200}>
						<ScrollView ref='_repliesScrollView' flex={1} showsVerticalScrollIndicator={false}>
							<View style={styles.encompCont}>
							<View flexDirection="column">
								<View paddingTop={20} paddingBottom={10} paddingHorizontal={38}>
									<View flexDirection="row">
										<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.authProfPic}>
								            <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>{this.props.authorInitials}</Text>
								        </LinearGradient>						
										<View justifyContent = "center" flexDirection="column" width={175}>
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
		           		<View marginTop={8} justifyContent="center" borderTopWidth={1} borderColor='rgb(199,193,195)' bottom={0} paddingLeft={30} paddingVertical={15}>
						
		           		
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
												multiline={true}
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
			width: 0,height: 1
		},
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
		height: 40,
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
  }
}

export default connect(mapStateToProps)(singlepost_modal)
