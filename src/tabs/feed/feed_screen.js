import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Button, FlatList, ImageBackground, RefreshControl} from 'react-native';
import {createStackNavigator, createTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import {SkypeIndicator} from 'react-native-indicators';
import {List} from 'react-native-elements';

import base64 from '../base64function';
import TransitionPanel from '../../components/TransitionPanel';

// SHOULD BE READ FROM DATABASE
const CONS_KEY = 'VPqb7vDy7Dq3JCj5r7jodxwKc';
const CONS_SECRET = 'RvCaQFxp7mVoECccpeQAcRhbcPLri2d7hKFT6g695VSOYKBv2Q';

const AUTH_URL = 'https://api.twitter.com/oauth2/token';
const TIMELINE_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

// SHOULD BE READ FROM DATABASE
const USER_ID = '1006242115909771264';

const TIMELINE_COUNT = '10';

const windowSize = Dimensions.get('window');

import FeedCard from '../../components/FeedCard';

export default class feed_screen extends Component {

  // static navigationOptions = ({navigation}) => {
  //     tabBarOnPress({ navigation, defaultHandler }){
  //           // perform your logic here
  //           // this is mandatory to perform the actual switch
  //           // you can omit this if you want to prevent it
  //           console.log("ITS WORKING")
  //           navigation.navigate('DiscussionBoard')
  //           //jumpToIndex(1);
  //         }
  //   }

  // static navigationOptions = ({navigation}) => {
  //   return {
  //     tabBarOnPress: (tab, jumpToIndex) => {
  //       if(!tab.focused){
  //         jumpToIndex(tab.index);
  //         navigation.state.params.onFocus()
  //       }
  //     },
  //   }
  // }

	constructor(props) {
        super(props);

        this.state = {
            retToken: null,
            feedData: [],
            loading: true,
            refreshing: false,

            sinceId: null,
            retSinceId: null,
            getNewerTweets: null,
            maxId: null,
            //prevMaxID: null,
            getOlderTweets: null
        }

        this.fetchToken = this.fetchToken.bind(this);
        this.fetchTwitterFeed = this.fetchTwitterFeed.bind(this);

        //this.renderFooter = this.renderFooter.bind(this);
        this.loadOlderTweets = this.loadOlderTweets.bind(this);
        this.loadNewerTweets = this.loadNewerTweets.bind(this);
    }

	componentDidMount() {
		this.fetchToken()
	}

	objecttoparams_signature(object) {
	let params = [];
	for (const key in object) {
		params.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
	}

		return params.join('&');
	}

  makeIntoArray(object) {
    let params = [];
    for (const key in object) {
        params.push(object[key]);
    }

    return params;
  }

	fetchToken() {
	//HANDLING APPLICATION-ONLY AUTH
		const beartokencred = `${CONS_KEY}:${CONS_SECRET}`;

		var url = `${AUTH_URL}`;

		const header = {
			Authorization: 'Basic ' + base64.btoa(beartokencred),
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		};

		const parameters = {
			grant_type: 'client_credentials'
		};

		const requestOption = {
			method: 'POST',
			headers: header,
			body: this.objecttoparams_signature(parameters)
		};

		fetch(url, requestOption)
		.then((response) => {
		response.json().then((result) => 
		{
			this.setState({retToken: result});
			this.fetchTwitterFeed();
      return;
			})
		})
		.catch((error) => {this.setState({error, loading: false, refreshing: false})});
	}

	fetchTwitterFeed() {
      if(!this.state.loading)
        this.setState({loading: true})

      // var NeworOld = null //0 for new 1 for old

      // if(this.state.maxId == null && this.state.sinceId == null) {
        var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&include_rts=1&tweet_mode=extended`;
      // }
      // else if (this.state.getOlderTweets) {
      //   var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&max_id=${this.state.maxId}&include_rts=1`;
      //   NeworOld = 1
      // } else if (this.state.getNewerTweets) {
      //   var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&since_id=${this.state.sinceId}&include_rts=1`;
      //   NeworOld = 0
      // }

    	const header = {
    		Authorization: 'Bearer ' + this.state.retToken.access_token,
    	};

    	const requestOption = {
    		method: 'GET',
    		headers: header,
    	};

    	fetch(url, requestOption)
    	.then((response) => {
    	response.json().then((result) => 
    	{
        //Handles on first open of feed
        // if(this.state.feedData.length == []) {
          this.setState({feedData: result, sinceId: result[0].id, maxId: result[result.length-1].id});
          //console.log("SETTING SINCEID: ", this.state.sinceId);
        // } //Handles loading older tweets
        // else if(NeworOld) {
      		// this.setState({feedData: [...this.state.feedData, ...result]})
        // } //Handles loading newer tweets and appending to top of original feed data
        // else {
        //   if(result[0]!= null) { 
        //     if(this.state.sinceId != result[0].id) {
        //       //console.log('NORESULT: ', result)
        //       const newFeedData = this.state.feedData.slice(1,this.state.feedData.length-1);            
        //       this.setState({feedData: [...result, ...newFeedData], sinceId: result[0].id})
        //     }          
        //   }
        // }
    	})
    	})
    	.catch((error) => {this.setState({error, loading: false, refreshing: false})})

      this.setState({refreshing: false, loading: false})
  }

  fetchNewTweets() {
    if(!this.state.loading)
        this.setState({loading: true})

      var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&since_id=${this.state.sinceId}&include_rts=1&tweet_mode=extended`;

      const header = {
        Authorization: 'Bearer ' + this.state.retToken.access_token,
      };

      const requestOption = {
        method: 'GET',
        headers: header,
      };

      fetch(url, requestOption)
      .then((response) => {
      response.json().then((result) => 
      {
        if(result[0]!= null) { 
          if(this.state.sinceId != result[0].id) {
            // if(this.state.sinceId )
            const olderFeedData = this.state.feedData;
            //var slicedRes = result.slice(0,result.length-1);           
            if(result[result.length-1].id == this.state.sinceId) {
              const slicedRes = result.slice(0,result.length-1);
              this.setState({feedData: [...slicedRes, ...olderFeedData], sinceId: result[0].id})
            } else {
              this.setState({feedData: [...result, ...olderFeedData], sinceId: result[0].id})
            }
            // this.setState({sinceId: result[0].id});
          }          
        }
      }
      )
      })
      .catch((error) => {this.setState({error, loading: false, refreshing: false})})

      this.setState({refreshing: false, loading: false})

  }

  fetchOldTweets() {
    if(!this.state.loading)
        this.setState({loading: true})

      var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&max_id=${this.state.maxId}&include_rts=1&tweet_mode=extended`;

      const header = {
        Authorization: 'Bearer ' + this.state.retToken.access_token,
      };

      const requestOption = {
        method: 'GET',
        headers: header,
      };

      fetch(url, requestOption)
      .then((response) => {
      response.json().then((result) => 
      {
        //Handles on first open of feed
        //if(result.length > 1) {
          //var moreRecentFD = this.state.feedData.slice(0,this.state.feedData.length-2);
          //if(this.state.)
          //setTimeout(() => {
            if(this.state.maxId == result[0].id) {
            //var moreRecentFD = this.state.feedData.slice(0,this.state.feedData.length-2);
            result=result.slice(1,result.length-1);
            this.setState({feedData: [...this.state.feedData, ...result]});
            this.setState({maxId: this.state.feedData[this.state.feedData.length - 1].id});
          } else {

           this.setState({feedData: [...this.state.feedData, ...result]});
           this.setState({maxId: this.state.feedData[this.state.feedData.length - 1].id});

          //if(latest_maxid != this.state.maxId) {
          }
          //},500)
          
          
        //}

      })
      })
      .catch((error) => {this.setState({error, loading: false, refreshing: false})})

      this.setState({refreshing: false, loading: false})
  }

	renderSeparator() {
		return (
			<View
			style={{
				height: 1,
				width: windowSize.width,
				backgroundColor: "#CED0CE",
			}}
			/>
		);
	}

  // onRefresh() {
  //   //if(this.state.refreshing) {
  //     this.setState({refreshing: true});
  //     this.fetchTwitterFeed()
  //     this.setState({refreshing: false});
  //   //} else {
  //     //this.setState({refreshing: true})
  //   //}
  //   //console.log("NOT TRUE")
  //   // this.setState({refreshing: true})
  // }

  parseFeedData(tweet){
    var name = tweet.item.user.name;
    var screenname = tweet.item.user.screen_name;
    var profileimage = tweet.item.user.profile_image_url;
    var seeIfHTTP = profileimage.search("http://");
    if(seeIfHTTP != -1) {
      profileimage = profileimage.slice(0,4) + 's' + profileimage.slice(4,profileimage.length)
      //console.log("profile image: ", profileimage)
    }

    var date = tweet.item.user.created_at;
    var formattedDate = new Date(date);
    var newDate = formattedDate.toString();
    var dateArr = newDate = newDate.split(' ');
    date = dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];

    var tweettext = tweet.item.full_text;//text
    var tweettextsplit = tweettext.split(' ');
    var symbolTweetTextSplit = tweettext.split('$')
    console.log("SYMBOL SPLIT IS:",symbolTweetTextSplit);

    var tweetTitle = symbolTweetTextSplit[1];
    console.log("THE TWEET TITLE IS: ",tweetTitle);

    var firstHalf = symbolTweetTextSplit.slice(0,1);
    console.log("FIRST HALF IS:",firstHalf);
    var firstHalfSplit = firstHalf.toString().split(' ')
    console.log("FIRST HALF SPLIT IS:",firstHalfSplit);

    if(firstHalfSplit.length == 3) {
      //IMAGE AND NEWS LINK
      var imageUrlPresentAtStart = firstHalfSplit[0];
      var newsUrlPresentAtStart = firstHalfSplit[1];
    } else if(firstHalfSplit.length == 2) {
      //NEWS LINK
      var newsUrlPresentAtStart = firstHalfSplit[0];
      var imageUrlPresentAtStart = null;
    } else {
      //NEITHER LINK
      var newsUrlPresentAtStart = null;
      var imageUrlPresentAtStart = null;
    }

    var secondHalf = symbolTweetTextSplit[2];
    //var secondHalfSplit = secondHalf.split(' ')
    //console.log("SECOND HALF IS:",secondHalf);
    //console.log("SECOND HALF SPLIT IS:",secondHalfSplit);

    if(secondHalf != '') {
      var tweetDesc = secondHalf;
      console.log('TWEET DESCRIPTION IS:',tweetDesc);
    } else {
      var tweetDesc = null
    }


    // var secondHalf = symbolTweetTextSplit.slice(2,1);
    // var secondHalfSplit = secondHalf.split(' ')
    // console.log("SECOND HALF IS:",secondHalf);
    // console.log("SECOND HALF SPLIT IS:",secondHalfSplit);

    // if() {
    //   //IMAGE LINK, NEWS LINK, AND TITLE ARE PRESENT
    //   var imageUrlPresentAtStart = tweettextsplit[0];
    //   var newsUrlPresentAtStart = tweettextsplit[1];
    //   tweettext = tweettextsplit;
    //   tweettext = tweettext.slice(2,(tweettext.length));
    //   tweettext = tweettext.join(' ');

    //   //Check that there is a title
    //   // if(tweettextsplit[2].substring(0,1) == '%') {
    //     var cutTweetText = tweettextsplit.slice(1,tweettextsplit.length);
    //     console.log("CUT TWEET TEXT IS:",cutTweetText)
    //     var moduloSplit = cutTweetText.split('%');
    //     var tweetTitle = moduloSplit[1];
    //     if(moduloSplit[2] != '' || moduloSplit[2] != null) {
    //       var tweetDesc = moduloSplit[2].slice(1,moduloSplit[2].length);
    //     }
    //     else {
    //       var tweetDesc = null
    //     }
    //   //   //console.log("THE TITLE OF THE TWEET IS:",tweetTitle)
    //   // } else {
    //   //   var tweetTitle = null
    //   //   var tweetDesc = null
    //   // }
    // } else if (tweettextsplit[0] != 'From' && tweettextsplit[1] != 'From') {
    //   //NEWS LINK AND TITLE ONLY
    //   var imageUrlPresentAtStart = null;
    //   var newsUrlPresentAtStart = tweettextsplit[0];
    //   var cutTweetText = tweettextsplit.slice(1,tweettextsplit.length);
    //   var moduloSplit = cutTweetText.split('%');
    //   var tweetTitle = moduloSplit[1];

    //   if(moduloSplit[2] != '' || moduloSplit[2] != null) {
    //     var tweetDesc = moduloSplit[2].slice(1,moduloSplit[2].length);
    //   }
    //   else {
    //     var tweetDesc = null
    //   }
    // } else if (tweettextsplit[0] != 'From') {
    //   //NEITHER LINK PRESENT
    //   var imageUrlPresentAtStart = null;
    //   var newsUrlPresentAtStart = null;

    //   var cutTweetText = tweettextsplit.slice(1,tweettextsplit.length);
    //   var moduloSplit = cutTweetText.split('%');
    //   var tweetTitle = moduloSplit[1];

    //   if(moduloSplit[2] != '' || moduloSplit[2] != null) {
    //     var tweetDesc = moduloSplit[2].slice(1,moduloSplit[2].length);
    //   }
    //   else {
    //     var tweetDesc = null
    //   }

    //   // tweettext = tweettextsplit;
    //   // tweettext = tweettext.slice(1,(tweettext.length));
    //   // tweettext = tweettext.join(' ');
    // }

    // var urlPresentAtEnd = tweettext.search("https://")
    // if(urlPresentAtEnd != -1) {
    //   tweettext = tweettextsplit;
    //   tweettext = tweettext.slice(0,(tweettext.length -1 ));
    //   tweettext = tweettext.join(' ');
    // } 

    if(tweettext[tweettext.length-1] != '.')
      tweettext = tweettext + '...';

    //var link = tweettext[tweettext.length-1];
    //console.log("After slice: ", tweettext)
    // TWEET.ITEM.EXTENDED_ENTITIES.MEDIA DOES NOT WORK
    var entities = JSON.stringify(tweet.item.extended_entities);
    //var image_url = null;
    if(entities != null) {
      var entities_parsed_media_1 = entities.split(':');

      var entities_parsed_type_1 = entities_parsed_media_1[14];
      var entities_parsed_type_2 = entities_parsed_type_1.split(',');
      var entities_parsed_type_3 = entities_parsed_type_2[0];
      var final_type = entities_parsed_type_3.slice(1,entities_parsed_type_3.length-1);
  
      var entities_parsed_media_2 = entities_parsed_media_1[7] + entities_parsed_media_1[8];
      var entities_parsed_media_3 = JSON.stringify(entities_parsed_media_2).split(',');
      // DISJOINTED IMAGE URL LINK
      var entities_parsed_media_4 = entities_parsed_media_3[0];

      // JOINS IMAGE URL LINK
      var image_parsed = entities_parsed_media_4.slice(3,entities_parsed_media_4.length - 2);
      var image_url = image_parsed.slice(0,5) + ':' + image_parsed.slice(5,image_parsed.length);
    } else {
      if(imageUrlPresentAtStart != null) {
        var final_type = 'photo';
        var image_url = imageUrlPresentAtStart;
        //console.log("IMAGE URL AT START: ",image_url);
      }
    }

    // CHECK IF PHOTO, VIDEO, or GIF
    if(final_type == "photo") {
      //image = (<Image style={styles.imageContainer} source={{uri: image_url}}/>);
      return (
       // <TransitionPanel navigation={this.props.navigation} destination='Tweet' post_url={null}>
            <FeedCard tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageurl={image_url} tweetDesc={tweetDesc}/>
        //</TransitionPanel>
      );

    } else if (final_type == "animated_gif") {
      // handle gifs
      var image_online_url = entities_parsed_media_1[37] + entities_parsed_media_1[38];
      image_online_url = image_online_url.split('"');
      image_online_url = image_online_url[1];
      image_online_url = image_online_url.slice(0,5) + ':' + image_online_url.slice(5,image_online_url.length)

      // image =
      // (
      //   <Video url={image_online_url} inlineOnly={true}/>
      // );
      return (
         //<TransitionPanel navigation={this.props.navigation} destination='Tweet' post_url={image_online_url}>
         	<FeedCard tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageonlineurl={image_online_url} tweetDesc={tweetDesc}/>
       // </TransitionPanel>
      );

    // HANDLING VIDEOS
    } else if (final_type == "video") {
      var image_online_url = entities_parsed_media_1[38] + entities_parsed_media_1[39];
      image_online_url = image_online_url.split('"');      
      image_online_url = image_online_url[1];
      image_online_url = image_online_url.slice(0,5) + ':' + image_online_url.slice(5,image_online_url.length)
      
      // image = (
      //   <Video url={image_online_url} inlineOnly={true}/>
      // );
      return (
        //<TransitionPanel navigation={this.props.navigation} destination='Tweet' post_url={image_online_url}>
        	<FeedCard navigation={this.props.navigation} tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageonlineurl={image_online_url} tweetDesc={tweetDesc}/>
        //</TransitionPanel>
      );

    } else {
      return (
          <FeedCard navigation={this.props.navigation} tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} tweetDesc={tweetDesc}/>
      )
    }
  }

  loadOlderTweets() {
    //setTimeout(() => {
        this.fetchOldTweets();
      // } else {
      //   this.setState({refreshing: false, loading: false})
      // }

    //},1000)
  }

  loadNewerTweets() {
    //this.setState({loading: true})
    //setTimeout(() => {
      //var latest_sinceid = this.state.feedData[0].id
      //console.log("OLD SINCE: ", this.state.feedData[0].id)
      //console.log("NEW SINCE: ", latest_sinceid)

     // if(latest_sinceid != this.state.sinceId) {
        // this.setState ({
        //   sinceId: latest_sinceid//, getNewerTweets: true, getOlderTweets: false
        // })
        this.fetchNewTweets();
      //} else {
          //this.setState({refreshing: false, loading: false})
      //}

     // }, 1000)
  }

  // renderFooter() {
  //   if(!this.state.loading) return null;
    
  //   return (
  //     <View padding={20} borderTopWidth={1} borderTopColor={1} backgroundColor="rgb(221, 215, 218)">
  //       <SkypeIndicator color='#bdbdbd' size={30}/>
  //     </View>
  //   )
  // }

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

  renderFeed() {
    //console.log("GOT FEED: ", this.state.feedData)
       return (
        //<View flex={1} marginBottom={10}>
        //<View marginTop={20}>
        //USE rgb(221, 215, 218)
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
            <View marginTop={20} backgroundColor="transparent"/>
            
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              data={this.state.feedData} keyExtractor={(x,i) => i.toString()} renderItem={({item}) =>      
                <View alignItems="center">
              	{this.parseFeedData({item})}
                </View>
                
          	  }
             //ListFooterComponent={this.renderFooter}
             onEndReached={this.loadOlderTweets}
             onEndThreshold={10}
             //refreshing={this.state.refreshing}
             //onRefresh={this.loadNewerTweets}
             refreshControl={
               <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this.loadNewerTweets}
                   title="Pull to refresh"
                   tintColor="darkgrey"
                   // titleColor="#red"
                   // progressBackgroundColor="blue"
                />
              }
            />
            
            </ImageBackground>
            </View>
        

        
        
        
        
      );
  }

  // screenRendered() {
  //   // CONNECTION IS BEING ESTABLISHED
  //   return (
  //       this.renderFeed()
  //   );
  // }

  render() {
    return (
      <View style={styles.encompCont}>
        {this.renderFeed()}
      </View>
    );
  }
}

const styles = ({
	encompCont: {
		// justifyContent: 'center',
		// alignItems: 'center'
    //margin: 0,
    flex: 1,
    //margin: 10,
    // top: 0,
    // bottom: 0,
    //height: 10,
    //elevation: null
    //backgroundColor: 'rgb(191, 187, 187)'//rgba(233, 228, 228, 1)'//'#47101E'//#530F1C'
	},
	imageContainer: {
	//alignItems: 'center',
		flex: 1,
		height: 150
	},
	backgroundVideo: {
		flex:1,
		height: 375
	// position: 'absolute',
	// top: 0,
	// left: 0,
	// bottom: 0,
	// right: 0,
	},
	container: {
		flex: 1,
		justifyContent: 'center'
	}

})