import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Button, FlatList, ImageBackground, RefreshControl} from 'react-native';
import {createStackNavigator, createTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator, DrawerActions, DrawerView, DrawerItems, SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import {MaterialIndicator} from 'react-native-indicators';
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
const FOR_OLD_AND_NEW = '20';

const windowSize = Dimensions.get('window');

import FeedCard from '../../components/FeedCard';

export default class feed_screen extends Component {
	constructor(props) {
        super(props);

        this.state = {
            retToken: null,
            feedData: [],
            //loading: true,
            refreshing: false,

            sinceId: null,
            retSinceId: null,
            getNewerTweets: null,
            maxId: null,            
            getOlderTweets: null
        }

        this.fetchToken = this.fetchToken.bind(this);
        this.fetchTwitterFeed = this.fetchTwitterFeed.bind(this);
        this.fetchOldTweets = this.fetchOldTweets.bind(this);
        this.fetchNewTweets = this.fetchNewTweets.bind(this);   
        // this.loadOlderTweets = this.loadOlderTweets.bind(this);
        // this.loadNewerTweets = this.loadNewerTweets.bind(this);
    }

	componentDidMount() {
    this.mounted = true
		this.fetchToken()
	}

  componentWillUnmount() {
    this.mounted = false
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
        if(this.mounted && result != null)
  			{ 
          this.setState({retToken: result});
  			  this.fetchTwitterFeed();
        }
  		})
		})
		.catch((error) => {this.setState({error, /*loading: false,*/ refreshing: false})});
	}

	fetchTwitterFeed() {
      // if(!this.state.loading)
      //   this.setState({loading: true})
      //this.setState({refreshing: true})
      var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&include_rts=1&tweet_mode=extended`;

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
          if(this.mounted && result != null)
            this.setState({feedData: result, sinceId: result[0].id, maxId: result[result.length-1].id});
    	})
    	})
    	.catch((error) => {this.setState({error, /*loading: false,*/ refreshing: false})})

      this.setState({refreshing: false, /*loading: false*/})
  }

  fetchNewTweets() {
    // if(!this.state.loading)
    //     this.setState({loading: true})

      var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${FOR_OLD_AND_NEW}&since_id=${this.state.sinceId}&include_rts=1&tweet_mode=extended`;

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
            const olderFeedData = this.state.feedData;
            if(result[result.length-1].id == this.state.sinceId) {
              const slicedRes = result.slice(0,result.length-1);
              this.setState({feedData: [...slicedRes, ...olderFeedData], sinceId: result[0].id})
            } else {
              this.setState({feedData: [...result, ...olderFeedData], sinceId: result[0].id})
            }
          }          
        }
      }
      )
      })
      .catch((error) => {this.setState({error, /*loading: false,*/ refreshing: false})})

      this.setState({refreshing: false, /*loading: false*/})

  }

  fetchOldTweets() {
    // if(!this.state.loading)
    //     this.setState({loading: true})
      if(!this.canAction) return;

      // console.log("CURRENT LENGTH OF FEED: ",this.state.feedData.length);
      // console.log("FETCHING OLD TWEETS NOW")

      var url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${FOR_OLD_AND_NEW}&max_id=${this.state.maxId}&include_rts=1&tweet_mode=extended`;

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
          if(this.state.maxId == result[0].id) {            
            result=result.slice(1,result.length-1);
            this.setState({feedData: [...this.state.feedData, ...result]});
            this.setState({maxId: this.state.feedData[this.state.feedData.length - 1].id});
          } else {

           this.setState({feedData: [...this.state.feedData, ...result]});
           this.setState({maxId: this.state.feedData[this.state.feedData.length - 1].id});          
          }
      })
      })
      .catch((error) => {this.setState({error, /*loading: false,*/ refreshing: false})})

      this.setState({refreshing: false, /*loading: false*/})
  }

	// renderSeparator() {
	// 	return (
	// 		<View
	// 		style={{
	// 			height: 1,
	// 			width: windowSize.width,
	// 			backgroundColor: "#CED0CE",
	// 		}}
	// 		/>
	// 	);
	// }

  parseFeedData(tweet){
    //console.log("GOT TWEET: ",tweet)
    var name = tweet.item.user.name;
    var screenname = tweet.item.user.screen_name;
    var profileimage = tweet.item.user.profile_image_url;
    var seeIfHTTP = profileimage.search("http://");
    if(seeIfHTTP != -1) {
      profileimage = profileimage.slice(0,4) + 's' + profileimage.slice(4,profileimage.length)
    }

    var date = tweet.item.created_at;
    var formattedDate = new Date(date);
    var newDate = formattedDate.toString();
    var dateArr = newDate = newDate.split(' ');
    date = dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];

    var tweettext = tweet.item.full_text;//text
    var tweettextsplit = tweettext.split(' ');
    var symbolTweetTextSplit = tweettext.split('$')
    //console.log("SYMBOL SPLIT IS:",symbolTweetTextSplit);

    var tweetTitle = symbolTweetTextSplit[1];
    //console.log("THE TWEET TITLE IS: ",tweetTitle);

    var firstHalf = symbolTweetTextSplit.slice(0,1);
    //console.log("FIRST HALF IS:",firstHalf);
    var firstHalfSplit = firstHalf.toString().split(' ')
    //console.log("FIRST HALF SPLIT IS:",firstHalfSplit);

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

    if(secondHalf != '') {
      var tweetDesc = secondHalf;
      //console.log('TWEET DESCRIPTION IS:',tweetDesc);
    } else {
      var tweetDesc = null
    }

    if(tweettext[tweettext.length-1] != '.')
      tweettext = tweettext + '...';

    // TWEET.ITEM.EXTENDED_ENTITIES.MEDIA DOES NOT WORK
    var entities = JSON.stringify(tweet.item.extended_entities);

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
      }
    }

    // CHECK IF PHOTO, VIDEO, or GIF
    if(final_type == "photo") {
      return (
            <FeedCard tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageurl={image_url} tweetDesc={tweetDesc}/>
      );

    } else if (final_type == "animated_gif") {
      // handle gifs
      var image_online_url = entities_parsed_media_1[37] + entities_parsed_media_1[38];
      image_online_url = image_online_url.split('"');
      image_online_url = image_online_url[1];
      image_online_url = image_online_url.slice(0,5) + ':' + image_online_url.slice(5,image_online_url.length)

      return (         
         	<FeedCard tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageonlineurl={image_online_url} tweetDesc={tweetDesc}/>       
      );

    // HANDLING VIDEOS
    } else if (final_type == "video") {
      var image_online_url = entities_parsed_media_1[38] + entities_parsed_media_1[39];
      image_online_url = image_online_url.split('"');      
      image_online_url = image_online_url[1];
      image_online_url = image_online_url.slice(0,5) + ':' + image_online_url.slice(5,image_online_url.length)
      
      return (        
        	<FeedCard navigation={this.props.navigation} tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} imageonlineurl={image_online_url} tweetDesc={tweetDesc}/>        
      );

    } else {
      return (
          <FeedCard navigation={this.props.navigation} tweetTitle={tweetTitle} date={date} newsUrl={newsUrlPresentAtStart} tweetDesc={tweetDesc}/>
      )
    }
  }

  loadOlderTweets() {
    this.fetchOldTweets();
  }

  loadNewerTweets() {
      this.fetchNewTweets();
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

  renderFeed() {
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
            <View marginTop={20} backgroundColor="transparent"/>
            
            <FlatList
              bounces={false}
              ItemSeparatorComponent={this.renderSeparator}
              data={this.state.feedData} keyExtractor={(x,i) => i.toString()} renderItem={({item}) =>      
                <View alignItems="center">
              	{this.parseFeedData({item})}
                </View>
                
          	  }
              onEndReached={this.fetchOldTweets}
              onEndThreshold={0}
              //onEndReached={this._onEndReached}
              onEndReachedThreshold={0.2}
              onMomentumScrollBegin={() => {
                console.log('onMomentumScrollBegin');
                this.canAction = true;
              }}
              onMomentumScrollEnd={() => {
                console.log('onMomentumScrollEnd');
                this.canAction = false;
              }}
             refreshControl={
               <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this.fetchNewTweets}
                   title="Pull to refresh"
                   tintColor="darkgrey"
                />
              }
            />
            
            </ImageBackground>
            </View> 
      );
  }

  render() {
    if(this.state.feedData.length == 0) {
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
        <View marginTop={50} alignItems="center">
          <MaterialIndicator color='rgb(115,115,115)' size={35}/>
        </View>
        </ImageBackground>
      </View>
      )
    }

    return (
      <View style={styles.encompCont}>
        {this.renderFeed()}
      </View>
    );
  }
}

const styles = ({
	encompCont: {
    flex: 1,
	},
	imageContainer: {
		flex: 1,
		height: 150
	},
	backgroundVideo: {
		flex:1,
		height: 375
	},
	container: {
		flex: 1,
		justifyContent: 'center'
	}

})