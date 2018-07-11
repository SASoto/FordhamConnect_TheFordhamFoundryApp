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
					<View paddingTop={30} paddingBottom={10} paddingHorizontal={38}>
						<View flexDirection="row">
							<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
					            <Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.item.authorInitials}</Text>
					        </LinearGradient>						
							<View justifyContent="center" flexDirection="column" width={250}>
								<View justifyContent="center" marginBottom={1}>
									<Text style={styles.nameStyle}>{this.props.item.authorName}</Text>
								</View>
								<View justifyContent="center">
									<Text style={styles.headlineStyle}>{this.props.item.authorHeadline}</Text>
								</View>
							</View>						
						</View>
						<View marginTop={15}>
							<View paddingLeft={8} paddingRight={5}>
								<Text style={styles.descStyle}>{this.props.item.postDesc}</Text> 
							</View>
						</View>
						<View marginTop={12} flexDirection="row" justifyContent="space-between">
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
									<Text style={styles.joinButtonAddStyle}>Discuss!</Text>
								</View>
							</View>
						</TouchableOpacity>
						{ (this.state.modalVisible) ? 
						<SinglePostModal 
						authorName={this.props.item.authorName} authorHeadline={this.props.item.authorHeadline}
						authorInitials={this.props.item.authorInitials} postCommentCount={this.props.item.postCommentCount}
						postDesc={this.props.item.postDesc} fullPostDesc={this.props.item.fullPostDesc} postDateAndTime={this.props.item.postDateAndTime}
						postKey={this.props.item.postKey}
						postauthID={this.props.item.authorID}
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
    		return (<View height={50}/>)
    	} else if(this.props.section.title == 'This is where the discussion started') {
    		return (
    			<View flex={1} paddingVertical={15} alignItems="center">
	        		<View justifyContent="center">
	            		<Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(115,115,115)'}}>{this.props.section.title}</Text>
	            	</View>		            	
	            </View>
    		)
    	}
    	else {
    		return (
	            <View flex={1} paddingHorizontal={18} paddingVertical={15} alignItems="flex-end">
	            	<View flexDirection="row">
	            		<View flexDirection="row">
			    			<View justifyContent="center" paddingTop={2} marginRight={3}>
			        		<MatCommIcon name="clock" size={12} color="rgb(115,115,115)"/>
			        		</View>
			        		<View justifyContent="center">
			            	<Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(115,115,115)'}}>{this.props.section.title}</Text>
			            	</View>
		            	</View>
	                </View>
	            </View>
	        )
    	}
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
        return firebase.database().ref('discBoardposts/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var postObj = {'post_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'comment_count': childData.comment_count, 'post_date_time': childData.post_date_time, 'post_text': childData.post_text, 'author_id': childData.author_id};
                fullPostsArr.push(postObj);
            });
        }).then(() => {
            this.setState({discussionBoardPosts: fullPostsArr.reverse()})
            console.log("DISCUSSION BOARD POSTS: ",this.state.discussionBoardPosts)
        }).then(() => {this.createSectionedList()})
    }

    fetchLatestPosts() {
    	var fullPostsArr = [];
        firebase.database().ref('discBoardposts/').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var postObj = {'post_key': childKey, 'author_name': childData.author_name, 'author_initials': childData.author_initials, 'author_headline': childData.author_headline, 'comment_count': childData.comment_count, 'post_date_time': childData.post_date_time, 'post_text': childData.post_text, 'author_id': childData.author_id};
                fullPostsArr.push(postObj);
            });
        }).then(() => {
        	const revArr = fullPostsArr.reverse()
            	this.setState({discussionBoardPosts: revArr})
            	this.createSectionedList()
        })
        this.setState({refreshing: false})
        console.log("FINISHED RUNNING fetchLatestPosts!")
    }

	createSectionedList() {
        const setOfPosts = this.state.discussionBoardPosts;
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
              //console.log("In createSectionedList, postData.authorID = ", postData.authorID)
              postsInOneDay.push(postData)
          }

        }
        sectionedList.push({title: onDate, data: postsInOneDay});
        for(var i=0; i<12; i++) {
        	if(i == 0)
        		sectionedList.push({title: 'This is where the discussion started', data: []});
       		else
          		sectionedList.push({title: '', data: []});
        }

        this.setState({discussionBoardSectionedList: sectionedList});

    }

	returnPostDate(postObj) {
		if(postObj.post_date_time == null || postObj.post_date_time== undefined)
		  return 'undefined'
		else {
		  var date = postObj.post_date_time;
		  var formattedDate = date.toString();
		  var dateArr = formattedDate.split(' ');
		  date = dateArr[0] + ', ' + dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];
		  return date;
		}
	}

	returnPostDateAndTime(postObj) {
		if(postObj.post_date_time == null || postObj.post_date_time== undefined)
		  return 'undefined'
		else {
		  var date = postObj.post_date_time;
		  var formattedDate = date.toString();
		  var dateArr = formattedDate.split(' ');
		  date = dateArr[0] + ' ' + dateArr[4] + ' ' + dateArr[5];
		  return date;
		}
	}

	returnPostData(postObj) {
		const regex_1 = /(<([^>]+)>)/ig;
		const regex_2 = /&#([0-9]{1,4});/g;

		var authorName = postObj.author_name;
		var authorInitials = postObj.author_initials;
		var authorHeadline = postObj.author_headline;
		var authorID = postObj.author_id;
		var postFullDesc = postObj.post_text;
		var postDesc = postObj.post_text;
		var postDescArr = postDesc.split(' ')
		if(postDescArr.length > 40) {
			postDescArr = postDescArr.slice(0,40);
			postDescArr.push("\n...")
			postDescArr = postDescArr.join(' ');
			postDesc = postDescArr;
		}

		var postDateAndTime = this.returnPostDateAndTime(postObj);
		var postCommentCount = postObj.comment_count;
		var postKey = postObj.post_key;

		//console.log("In returnPostData, authorID is...", authorID)
		return {authorName: authorName, authorInitials: authorInitials, authorHeadline: authorHeadline,
				authorID: authorID, postDesc: postDesc, fullPostDesc: postFullDesc,postDateAndTime: postDateAndTime,
				postCommentCount: postCommentCount, postKey: postKey};
	}

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
	        <View height={3} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
				<View flexDirection="column" marginTop={20}>
					
					<TouchableOpacity style={styles.postButtonStyle} onPress={() => this.setState({modalVisible: true})}>
						
							<View flexDirection="row">
								<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={{height: 26, width:26, borderRadius: 13, marginRight: 14, justifyContent: 'center'}}/>																		
								<View justifyContent="center">
									<Text style={{fontFamily: 'SFProText-Light', fontSize: 12, color: '#737373'}}>Add a post...</Text>
								</View>
							</View>
						
					</TouchableOpacity>
				
					
					
				<CreatePostModal modalVisible={this.state.modalVisible} modalFunc={this.setModalVisible.bind(this)} fetchLatestPosts={this.fetchLatestPosts.bind(this)}/>
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
		paddingLeft: 38,
		height: 50,
		//paddingTop: 10,
		// alignItems: 'center',
		justifyContent: 'center',
		// width: 106,
		// height: 35,
		backgroundColor: '#dbd1ce',
		borderColor: '#bfbbbb',
		borderBottomWidth: 1,
		// borderRadius: 8,
		//borderWidth: 0.7,
		//borderColor: 'rgb(204,180,182)',
		// shadowColor: 'rgba(0, 0, 0, 0.5)',
		// shadowOffset: {
		// 	width: 0,height: 2
		// },			
		// shadowRadius: 4,
		// shadowOpacity: 1,
	},
	postButtonPlusStyle: {
		fontSize: 12,
		fontFamily: 'SFProText-Light',
		color: 'rgb(115,115,115)'
	},
	postButtonAddStyle: {
		fontSize: 12,
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
		shadowRadius: 3,
		shadowOpacity: 1,
	},
	profPic: {
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
		width: 106,
		height: 35,
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
		fontSize: 12,
		fontFamily: 'SFProText-Regular',
		color: 'rgb(115,115,115)'
	},
	additionalInfoStyle: {
		fontFamily: 'SFProText-Light',
		fontSize: 13,
		color: 'rgb(115,115,115)'
	}
})