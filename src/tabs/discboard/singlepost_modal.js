import React, {Component} from 'react';
import {Dimensions, ImageBackground, Modal, Keyboard, ScrollView, Text, Button, TextInput, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Linking} from 'react-native';
import {Header} from 'react-navigation';

import {connect} from 'react-redux';
import {getReplies} from './firebaseListener';

import LinearGradient from 'react-native-linear-gradient';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';

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

		// if(this.props.item.author_name == 'Fordham Foundry') {
		// 	var gradientColor = (
		// 		<LinearGradient colors={['rgb(242,56,90)', 'rgb(85,181,255)']} style={styles.replyAuthProfPic}>
		//             <Text style={{fontFamily: 'SFProText-Light', fontSize: 16, color: 'rgb(255,255,255)'}}>{this.props.item.author_initials}</Text>
		//         </LinearGradient>
		// 	)
		// } else {
		// 	var gradientColor = (
		// 		<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.replyAuthProfPic}>
		//             <Text style={{fontFamily: 'SFProText-Light', fontSize: 16, color: 'rgb(255,255,255)'}}>{this.props.item.author_initials}</Text>
		//         </LinearGradient>
		// 	)
		// }

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
		//var userID = firebase.auth().currentUser.uid

		this.state = {
			discussionBoardReplies: [],
			backupDiscussionBoardReplies: [],
			newReplies: false,
		 	postKey: "",
		 	replyText: "",
		 	parentPostCommentCount: this.props.postCommentCount,
		}
		this.testArray = this.testArray.bind(this)
		//this.getLatestReplies = this.getLatestReplies.bind(this)
		//this._onScroll = this._onScroll.bind(this)
		//console.log("Construction complete! parentPostCommentCount is ", this.state.parentPostCommentCount)
	}

	componentDidMount() {
		const replyEndpoint = '/discBoardreplies/' + this.props.postKey + '/';
		// console.log("THE STATE AT THE BEGINNING: ",this.state.discussionBoardReplies)
		//firebase.database().ref('/discBoardreplies/' + this.props.postKey + '/').off()
		//console.log("Turned off the old listener in componentDidMount.")
		console.log("Earlier in componentDidMount... DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		
		firebase.database().ref(replyEndpoint).on('value', (snap) => {
			console.log("New listener is on!")
		  //do something with snap
			if(snap.val() == undefined || snap.val() == null)
				this.setState({
					discussionBoardReplies: [],
				  //newReplies: true
				})
			else {
				const latestReplies = Object.values(snap.val());
				//console.log("THE OBJECT ARR: ",latestReplies)
				//const fullRepliesArr = [];
				// for(var i=0; latestReplies.length; i++)
				// {            	
		  //           console.log("INDEXED REPLY: ",latestReplies[i])

		  //           // var replyObj = {'reply_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'reply_date_time': childData.reply_date_time, 'reply_text': childData.reply_text, 'author_id': childData.author_id};                
		  //           // fullRepliesArr.push(replyObj);               
		  //       }
		        this.setState({discussionBoardReplies: latestReplies, backupDiscussionBoardReplies: latestReplies})
		        console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)		   
				// const latestReplies = Object.values(snap.val());
				//this.setState({discussionBoardReplies: fullRepliesArr})
			}
		})
		
		//TURN INTO ARRAY ITERATIVELY
		// firebase.database().ref(replyEndpoint).on('value', (snap) => {
		//   //do something with snap
		//   	var fullRepliesArr = [];
		// 	if(snap.val() == undefined || snap.val() == null)
		// 		this.setState({
		// 			discussionBoardReplies: [],
		// 		  //newReplies: true
		// 		})
		// 	else {
		// 		const latestReplies = Object.values(snap.val());
		// 		console.log("THE OBJECT ARR: ",latestReplies)
		// 		//const fullRepliesArr = [];
		// 		snap.forEach(function(item) {
		// 			var itemKey = item.key;
		// 			var itemVal = item.val();

		// 			const itemObj = {'reply_key': itemKey, 'author_name': itemVal.author_name, 'author_initials': itemVal.author_initials, 'author_headline': itemVal.author_headline, 'reply_date_time': itemVal.reply_date_time, 'reply_text': itemVal.reply_text, 'author_id': itemVal.author_id};
  //       			fullRepliesArr.push(itemObj);
		// 		})//.then(() => {this.setState({discussionBoardReplies: fullRepliesArr})})
		// 		console.log('FULLREPLESARR: ',fullRepliesArr)
		// 		//this.setState({discussionBoardReplies: fullRepliesArr})
		// 		//console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)	
		// 	}

		// 	this.setState({discussionBoardReplies: fullRepliesArr})
		// 	console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)	
		// })


		// .then(function(snapshot) {
		// 	this.setState({
		// 	  discussionBoardReplies: Object.values(snapshot.val())
		// 	})
		// 	console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)
		// })

		// this.unsubscribeGetReplies = getReplies((snapshot) => {
		// 	this.setState({
		// 	  discussionBoardReplies: Object.values(snapshot.val())
		// 	})
		// 	console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)
		// })
		//console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)

		//******//
		// console.log("THE STATE AT THE BEGINNING: ",this.state.discussionBoardReplies)
  //       var fullRepliesArr = [];
  //       var postID = this.props.postKey
        
  //       return firebase.database().ref('/discBoardreplies/' + postID + '/').once('value')
  //       .then(function(snapshot) {        	
  //           snapshot.forEach(function(childSnapshot) {            	
  //               var childKey = childSnapshot.key;
  //               var childData = childSnapshot.val();

  //               var replyObj = {'reply_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'reply_date_time': childData.reply_date_time, 'reply_text': childData.reply_text, 'author_id': childData.author_id};                
  //               fullRepliesArr.push(replyObj);               
  //           });
  //       }).then(() => {
  //           this.setState({discussionBoardReplies: fullRepliesArr})
  //           console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)
  //           this.setState({postKey: this.props.postKey, parentPostCommentCount: this.props.postCommentCount, newReplies: true})
  //       })//.then(() => {
  // //       	this.getLatestReplies()
  // //       })
    }

    componentWillUnmount() {
    	//this.mountedFirebaseListener.off();
    	//firebase.database().ref.off('/discBoardreplies/' + this.props.postKey + '/')
    	firebase.database().ref('/discBoardreplies/' + this.props.postKey + '/').off()
    	// .then(() => {
    	console.log("IS THIS UNMOUNT RUNNING: ",this.props.postKey)
    	//this.setState({discussionBoardReplies: []})
    	//console.log("this is the state after closing the modal: ",this.state.discussionBoardReplies)
    	// })
    	
    	//this.setState({discussionBoardReplies: []})
    }

   //  getLatestReplies() {
   //  	if(this.state.newReplies) {
   //  		const replyEndpoint = '/discBoardreplies/' + this.props.postKey + '/';

	  //   	firebase.database().ref(replyEndpoint).on('value', (snap) => {
			//   //do something with snap
			// 	if(snap.val() == undefined || snap.val() == null)
			// 		this.setState({
			// 			discussionBoardReplies: [],
			// 		  //newReplies: true
			// 		})
			// 	else
			// 		this.setState({discussionBoardReplies: Object.values(snap.val())})
			// 	console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)
			// })
   //  	}
   //  }

    fetchLatestReplies() {
    	var fullRepliesArr = [];
        var postID = this.state.postKey
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
        	this.appendLatestReplies(fullRepliesArr)
            //this.setState({discussionBoardReplies: fullRepliesArr})
            //console.log("DISCUSSION BOARD REPLIES: ",this.state.discussionBoardReplies)
            this.setState({parentPostCommentCount: this.props.postCommentCount})
            
			//console.log("Component mounted, with postKey " + this.state.postKey + " and  comment count " + this.state.parentPostCommentCount)
			//console.log("And just to double check, the full list of replies is...", this.state.discussionBoardReplies)  
        }).then(() => {
        	this.refs._repliesScrollView.scrollToEnd({animated: false})
        })
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

		//DO A CHECK TO SEE IF COMMENT COUNT IS EQUAL TO 10 ALREADY
		if(this.state.replyText.length == 0) {
			alert("Oops! Your comment contains no text.")
		} else {
			var postID = this.props.postKey //This should come from the state as well.
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
				this.setState({replyText: ""})
				this.refs._repliesScrollView.scrollToEnd({animated: false})
			})//.then(() => {
			// 	this.fetchLatestReplies();
			// })
		}
	}

	resetAndExit() {
		//firebase.database().ref('/discBoardreplies/' + this.props.postKey + '/').off().then(() => {this.props.modalFunc();})
		console.log("Exit process started...")
		this.props.fetchLatestPosts();
		console.log("Latest Posts have been fetched.")
		this.testArray();
		//console.log("TestArray should be in place by now.")
		//this.setState({discussionBoardReplies: []})
		//this.props.modalFunc();
		console.log("About to run the modalFunc")
		setTimeout(() => {this.props.modalFunc()},250)
		console.log("And now the modalFunc has run.")
	}

	// _onScroll(e) {
	// 	// let paddingToBottom = 10;
 //  //       paddingToBottom += e.nativeEvent.layoutMeasurement.height;
 //  //       if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
 //  //         // make something...
 //  //         this.setState({newReplies: false});
 //  //       }

	// 	// var contentOffset = e.nativeEvent.contentOffset.y;
	//  //    this.state.contentOffsetY < contentOffset ? console.log("Scroll Down") : console.log("Scroll Up");
	// }

	newRepliesArrived() {
		// if(this.state.newReplies) {
			//this.setState({newReplies: false})
			return (
				<View>
					<Text>New Reply</Text>
				</View>
			)
		//}

		//return null;
	}

	testArray() {
		this.setState({discussionBoardReplies: [{'reply_key': 1, 'author_name': ' ', 'author_initials': ' ', 'author_headline': ' ', 'reply_date_time': ' ', 'reply_text': ' ', 'author_id': 'test'}]})
		console.log("The testArray is in place.")
		//setTimeout(() => {this.setState({discussionBoardReplies: this.state.backupDiscussionBoardReplies})},500)
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
		//console.log("FROM POST MODAL: ", dateAndTime);
		dateAndTime = dateAndTime[0] + ' at ' + dateAndTime[1] + ' ' + dateAndTime[2];
		console.log("We need the full list of replies by here – do we have it?", this.state.discussionBoardReplies)

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
						<ScrollView ref='_repliesScrollView' flex={1} showsVerticalScrollIndicator={false}>
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
								
								<FlatList
									//style={{flex: 1}}
									//initialNumToRender={1}
									//extraData={this.state}
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
						
		           		<Button title="Test" onPress={() => {this.testArray()}}/>
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
		top: 0,
		bottom: 0,
        //width: '100%',
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
