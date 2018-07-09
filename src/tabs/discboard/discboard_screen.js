import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground, View, ScrollView, SectionList, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import firebase from 'firebase';
import {connect} from 'react-redux';

import {MaterialIndicator} from 'react-native-indicators';
import MatCommIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import CreatePostModal from './createpost_modal';
import SinglePostModal from './singlepost_modal';
import ButtonRounded from '../../components/ButtonRounded';
import DBMainCard from '../../components/DBMainCard';

class SectionListItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalVisible: false
		}
	}

	setModalVisible() {
		this.setState({modalVisible: false});
	}

    render () {
        return (
            <View style={styles.encompCont}>
				<View flexDirection="column">
					<View paddingTop={20} paddingBottom={10} paddingHorizontal={38}>
						<View flexDirection="row">
							<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
					            <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>{this.props.item.authorInitials}</Text>
					        </LinearGradient>						
							<View justifyContent = "center" flexDirection="column">
								<Text style={styles.nameStyle}>{this.props.item.authorName}</Text>
								<Text style={styles.headlineStyle}>{this.props.item.authorHeadline}</Text> 
							</View>						
						</View>
						<View marginTop={15}>
							<View paddingLeft={8} paddingRight={5}>
								<Text style={styles.descStyle}>{this.props.item.postDesc}</Text> 
							</View>
						</View>
						<View marginTop={10} flexDirection="row" justifyContent="space-between">
							<View paddingLeft={8}>
								<Text style={styles.additionalInfoStyle}>{this.props.item.postDateAndTime}</Text>
							</View>
							<View paddingRight={10}>
								<Text style={styles.additionalInfoStyle}>{this.props.item.postCommentCount} Comments</Text>
							</View>
						</View>
					</View>
					<View alignItems="center">
					<View marginTop={8} marginBottom={16} height={1} width='90%' backgroundColor="rgb(199,193,195)"/>
					</View>
					<View paddingLeft={38} paddingBottom={30} alignItems="flex-start">
						<TouchableOpacity 
							style={styles.joinButtonStyle}
							onPress={() => this.setState({modalVisible: true})}
						>
							<View flexDirection="row" alignItems="center">
								<View justifyContent="center">
									<Text style={styles.joinButtonAddStyle}>view post</Text>
								</View>
							</View>
						</TouchableOpacity>
						{ (this.state.modalVisible) ? 
						<SinglePostModal 
						authorName={this.props.item.authorName} authorHeadline={this.props.item.authorHeadline}
						authorInitials={this.props.item.authorInitials} postCommentCount={this.props.item.postCommentCount}
						postDesc={this.props.item.postDesc} fullPostDesc={this.props.item.fullPostDesc} postDateAndTime={this.props.item.postDateAndTime}
						postKey={this.props.item.postKey}
						modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)} fetchLatestPosts={this.props.fetchLatestPosts}/>
						: null }
						
					</View>
					
				</View>
            </View>
        )
    }
}

class SectionHeader extends Component {
    render() {
    	if(this.props.section.title == '') {
    		var sectionTitle = (null)
    	} else {
    		var sectionTitle = (
    			<View flexDirection="row">
	    			<View justifyContent="center" paddingTop={2} marginRight={3}>
	        		<MatCommIcon name="clock" size={12} color="rgb(115,115,115)"/>
	        		</View>
	        		<View justifyContent="center">
	            	<Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(115,115,115)'}}>{this.props.section.title}</Text>
	            	</View>
            	</View>
    		)
    	}
        return (
            <View flex={1} paddingHorizontal={18} paddingVertical={15} alignItems="flex-end">
            	<View flexDirection="row">
            		{sectionTitle}
                </View>
            </View>
        )
    }
}

const windowSize = Dimensions.get('window');
export default class discboard_screen extends Component {
    constructor(props) {
		super(props)

		this.state = {
			discussionBoardPosts: [],
			discussionBoardSectionedList: [],
			modalVisible: false,
			refreshing: false
		}

		this.fetchLatestPosts = this.fetchLatestPosts.bind(this)
	}

	setModalVisible() {
		this.setState({modalVisible: false});
	}

	componentDidMount() {
        var fullPostsArr = [];
        //usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        return firebase.database().ref('discBoardposts/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                //console.log("Another person in da list...")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childData.firstname + ' ' + childData.lastname)
                var postObj = {'post_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'comment_count': childData.comment_count, 'post_date_time': childData.post_date_time, 'post_text': childData.post_text, 'author_id': childData.author_id};
                //console.log("OBJECT: ", contactObj);
                fullPostsArr.push(postObj);
                //testArray.push("foo")
                //console.log(postObj)//.postKey)
            });
            //console.log(fullPostsArr.author_name)
        }).then(() => {
            this.setState({discussionBoardPosts: fullPostsArr.reverse()})
            console.log("DISCUSSION BOARD POSTS: ",this.state.discussionBoardPosts)
        }).then(() => {this.createSectionedList()})//.then(() => {
        // 	for (var i = 0; i < this.state.discussionBoardPosts.length; i++) {
        // 		console.log("Post is by..." + this.state.discussionBoardPosts[i].post_key)
        // 	}
        	
        // })
    }

    fetchLatestPosts() {
    	var fullPostsArr = [];
    	//console.log("IN HERE GETTING NEW POSTS")
        firebase.database().ref('discBoardposts/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                //console.log("Another person in da list...")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childData.firstname + ' ' + childData.lastname)
                var postObj = {'post_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'comment_count': childData.comment_count, 'post_date_time': childData.post_date_time, 'post_text': childData.post_text, 'author_id': childData.author_id};
                //console.log("OBJECT: ", postObj);
                fullPostsArr.push(postObj);
                //testArray.push("foo")
                //console.log(postObj)//.postKey)
            });
        }).then(() => {
        	//const olderPosts = this.state.discussionBoardPosts;
        	const revArr = fullPostsArr.reverse()
        	//console.log("NEW SET OF POSTS:",revArr)
        	//this.setState({discussionBoardPosts: []})
        	//if(revArr[0].post_key != this.state.discussionBoardPosts[0].post_key) {
            	this.setState({discussionBoardPosts: revArr})
            	//console.log("ADDING NEW SET OF DISCUSSIOMN BOARD POSTS")
            	this.createSectionedList()
        	//}
        	//console.log("CALLING FROM NEW")
        	// this.createSectionedList()
        })//.then(() => {
        	//console.log("CALLING FROM NEW")
        	//this.createSectionedList()
       // })//.then(() => {
        // 	for (var i = 0; i < this.state.discussionBoardPosts.length; i++) {
        // 		console.log("Post is by..." + this.state.discussionBoardPosts[i].post_key)
        // 	}
        	
        // })
        this.setState({refreshing: false})
        console.log("FINISHED RUNNING fetchLatestPosts!")
    }

	createSectionedList() {
        const setOfPosts = this.state.discussionBoardPosts;
        //console.log("SET OF EVENTSL",this.state.sitedata_posts)
        var sectionedList = [];
        var postsInOneDay = [];
          
        var onDate = this.returnPostDate(setOfPosts[0]);
        for(var i=0; i<setOfPosts.length; i++) {
          var currDate = this.returnPostDate(setOfPosts[i]);
          if(currDate != onDate) {
              sectionedList.push({title: onDate, data: postsInOneDay});
              onDate = currDate;
              postsInOneDay = [];
              var postData = this.returnPostData(setOfPosts[i]);
              postsInOneDay.push(postData);
          } else { //Name starts with the same letter we are currently on
              var postData = this.returnPostData(setOfPosts[i]);
              postsInOneDay.push(postData)
          }

        }
        sectionedList.push({title: onDate, data: postsInOneDay});
        for(var i=0; i<12; i++) {
          sectionedList.push({title: '', data: []});
        }

        this.setState({discussionBoardSectionedList: sectionedList});
        //console.log("POST SECTIONED LIST: ", this.state.discussionBoardSectionedList);
        //return sectionedList;
    }

	returnPostDate(postObj) {
		if(postObj.post_date_time == null || postObj.post_date_time== undefined)
		  return 'undefined'
		else {
		  var date = postObj.post_date_time;
		  var formattedDate = date.toString();//new Date(date);
		  //var newDate = formattedDate.toString();
		  //console.log("DATE STRING: ",formattedDate)
		  var dateArr = formattedDate.split(' ');
		  //console.log("DATE ARR: ",dateArr)
		  date = dateArr[0] + ', ' + dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];
		  //console.log('DATE OBJ: ',date)

		  return date;
		}
	}

	returnPostDateAndTime(postObj) {
		if(postObj.post_date_time == null || postObj.post_date_time== undefined)
		  return 'undefined'
		else {
		  var date = postObj.post_date_time;
		  var formattedDate = date.toString();//new Date(date);
		  //var newDate = formattedDate.toString();
		  //console.log("DATE ARR: ",newDate)
		  var dateArr = formattedDate.split(' ');//newDate = newDate.split(' ');
		  //console.log("DATE ARR: ",dateArr)
		  date = dateArr[0] + ' ' + dateArr[4] + ' ' + dateArr[5];
		  // console.log('DATE OBJ: ',date)

		  return date;
		}
	}

	returnPostData(postObj) {
		const regex_1 = /(<([^>]+)>)/ig;
		const regex_2 = /&#([0-9]{1,4});/g;

		var authorName = postObj.author_name;
		var authorInitials = postObj.author_initials;
		var authorHeadline = postObj.author_headline;
		var postFullDesc = postObj.post_text;
		var postDesc = postObj.post_text;
		var postDescArr = postDesc.split(' ')
		//console.log("POST DESC ARR: ", postDescArr)
		//if(postDescArr.length != null || postDesc.length != undefined) {
		if(postDescArr.length > 40) {
			postDescArr = postDescArr.slice(0,40);
			//console.log("NON ACT POST ARR: ",postDescArr);
			postDescArr.push("\n...")
			//console.log("NON ACT POST ARR: ",postDescArr);
			//console.log("NON ACT POST ARR: ",postDescArr);
			//console.log("ACT ARR: ", actualPostdescArr);
			//actualPostdescArr = actualPostdescArr.join('');
			postDescArr = postDescArr.join(' ');
			postDesc = postDescArr;
			//console.log("POST DESC: ", postDescArr)
		}

		var postDateAndTime = this.returnPostDateAndTime(postObj);
		var postCommentCount = postObj.comment_count;
		var postKey = postObj.post_key;

		return {authorName: authorName, authorInitials: authorInitials, authorHeadline: authorHeadline,
				postDesc: postDesc, fullPostDesc: postFullDesc,postDateAndTime: postDateAndTime,
				postCommentCount: postCommentCount, postKey: postKey};
	}

	// fetchDateTime() {
	// 	var today = new Date();
	// 	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	// 	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	// 	var day = days[today.getDay()];
	// 	var month = months[ today.getMonth() ];
	// 	var dd = today.getDate();
	// 	//var mm = today.getMonth()+1; //January is 0!
	// 	var yyyy = today.getFullYear();
		

	// 	// if(dd<10) {
 //  //   		dd = '0'+dd
	// 	// } 

	// 	// if(mm<10) {
 //  //   		mm = '0'+mm
	// 	// } 
	// 	// var date = yyyy+'-'+mm+'-'+dd;

	// 	var hh = today.getHours();
	// 	var minmin = today.getMinutes();
	// 	// var ss = today.getSeconds();
	// 	var mid = 'am'
	// 	if(hh ==0){
	// 		hh = 12;
	// 	} else if (hh > 12) {
	// 		hh = hh % 12;
	// 		mid = 'pm'
	// 	}

	// 	// if(hh<10) {
 //  //   		hh = '0'+hh
	// 	// } 

	// 	if(minmin<10) {
 //    		minmin = '0'+minmin
	// 	} 

	// 	// if(ss<10) {
 //  //   		ss = '0'+ss
	// 	// } 

	// 	//var time = hh + ":" + minmin + ":" + ss;
	// 	var dateTime = day + " " + month + " " + dd + " " + yyyy + " " + hh + ":" + minmin + " " + mid;

	// 	return(dateTime)
	// }

	// //If this is a modal, should it have the postID as a state?
	// replyTest() {
	// 	var postID = "-LGkHRzQcq_sqphPpOL6" //This should come from the state as well.
	// 	// console.log("Test was pushed!")
	// 	// console.log("With postID ", postID)
		
	// 	//Tests replying to a given post just on the back end database
	// 	var newDateTime = this.fetchDateTime()
	// 	var parentPostCommentCount = 0    //TO DO: This needs to be in the state, not a constant value!
	// 	var userID = firebase.auth().currentUser.uid
	// 	var repliesListRef = firebase.database().ref('/discBoardreplies/' + postID + '/');
	// 	var newReplyRef = repliesListRef.push();
	// 	newReplyRef.set({
	// 		'author_name': "Firstname" + ' ' + "Lastname", //TO DO: This should be referenced from props
 //  			'author_headline': "Example Headline",			//TO DO: This should be referenced from props
 //  			'author_initials': "FL",						//TO DO: So should this!
 //  			'author_id': userID,
 //  			'reply_date_time': newDateTime,
 //  			'reply_text': "Foo!",							//TO DO: What the user typed in, This should be from state.
	// 	})
	// 	.then(() => {
	// 		//This part increments the comment count on the parent post
	// 		console.log("Created the reply post. Now trying to increment comment count...")
	// 		firebase.database().ref('/discBoardposts/' + postID +'/comment_count/').set(parentPostCommentCount + 1)//{
	// 		console.log("Incremented comment count on parent post, I think.")
	// 	 })
	// }

	renderSeparator() {
		return (
		  <View
		    style={{
		      height: 30,          
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

					
					
				<CreatePostModal modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)} fetchLatestPosts={this.fetchLatestPosts.bind(this)}/>
				</View>
	 			<View alignItems="center">
		 			<View marginTop={10} width={windowSize.width*.95} height={1} backgroundColor="rgb(199,193,195)"/>
		 		</View>
		 		<SectionList
		 			showsVerticalScrollIndicator={false}
	                ListEmptyComponent={<View marginTop={50} alignItems="center">
	                                      <MaterialIndicator color='rgb(115,115,115)' size={35}/>
	                                    </View>}
	                stickySectionHeadersEnabled={false}
	                ItemSeparatorComponent={this.renderSeparator}
	                renderItem={({item, index}) => {
	                    return (<SectionListItem item={item} index={index} fetchLatestPosts={this.fetchLatestPosts.bind(this)}/>)
	                }}
	                renderSectionHeader={({section}) => {return(<SectionHeader section={section}/>)}}
	                sections={this.state.discussionBoardSectionedList}
	                keyExtractor={(item, index) => index}
	                refreshing={this.state.refreshing}
	                onRefresh={this.fetchLatestPosts}
	            />		 		
			</ImageBackground>
			</View>
  		);
	}
}

//<SectionList
	                //stickySectionHeadersEnabled={false}
	                //renderItem={({item, index}) => {
	               //     return (<SectionListItem item={item} index={index}/>)
	                //}}
	                //renderSectionHeader={({section}) => {return(<SectionHeader section={section}/>)}}
	                //sections={this.state.postList}
	              //  keyExtractor={(item, index) => index}
	                // refreshing={this.state.refreshing}
	                // onRefresh={this.fetchLatestData()}
	            ///>

const styles = ({
	postButtonStyle: {
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
	encompCont: {
		//alignItems:"center",
		// justifyContent: 'center',
		//flex: 1,
		backgroundColor: '#dbd1ce',
        width: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowOffset: {
			width: 0,height: 2
		},			
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	profPic: {
		width: 60,
		height: 60,
		borderRadius: 30,
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
	}
})