import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity, Button, FlatList, ImageBackground} from 'react-native';

//import Video from 'react-native-video';
import base64 from '../base64function';
import TransitionPanel from '../../components/TransitionPanel';

// SHOULD BE READ FROM DATABASE
const CONS_KEY = 'W0n6YI1nVz3oqehhM68kNZE67';
const CONS_SECRET = 'goG3kTESuUYT2ywJ8UbkBxAR9Qkq1T2AQkMwwyR2lAk59fU3sn';

const AUTH_URL = 'https://api.twitter.com/oauth2/token';
const TIMELINE_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

// SHOULD BE READ FROM DATABASE
const USER_ID = '1002710784957472769';

const TIMELINE_COUNT = '4';

const windowSize = Dimensions.get('window');

import FeedCard from '../../components/FeedCard';

export default class feed_screen extends Component {
  // static navigationOptions = {
  //   // drawerLabel: 'Home',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../../../Images/fordham-rams-logo.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // };

	constructor(props) {
        super(props);

        this.state = {
            feedVisible: null,
            result: null,
            feedData: [],
            refreshing: null
        }

        this.fetchToken = this.fetchToken.bind(this);
        this.fetchTwitterFeed = this.fetchTwitterFeed.bind(this);
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
			this.setState({result: result});
			this.fetchTwitterFeed();
      return;
			})
		})
		.catch((error) => {});
	}

	fetchTwitterFeed() {
	//HANDLING APPLICATION-ONLY AUTH
	// console.log("[From screen_twfeed] [fetchTwitterFeed()] trying to get twitter feed using", this.state.result);
	//const {bearToken} = this.state.result.access_token;
	// console.log("[From screen_twfeed] [fetchTwitterFeed()] bearToken is: ", this.state.result.access_token);
	// console.log("[From screen_twfeed] [fetchTwitterFeed()] after encoding", base64.btoa(this.state.result.access_token));
	//console.log("[From screen_twfeed] [fetchTwitterFeed()] after encoding toString",this.state.result.access_token.toString('base64'))

  this.setState({feedData: []})
	const url = `${TIMELINE_URL}?user_id=${USER_ID}&count=${TIMELINE_COUNT}&include_rts=1`;//${TIMELINE_COUNT}`;

	const header = {
		Authorization: 'Bearer ' + this.state.result.access_token,
	};

	const requestOption = {
		method: 'GET',
		headers: header,
	};

	fetch(url, requestOption)
	.then((response) => {
	response.json().then((result) => 
	{
		this.setState({feedData: result})
    console.log("FEED: ", this.state.feedData)

    // if(this.state.refreshing) {
      //this.setState({refreshing: false})
      this.setState({feedVisible: true})
    //}
	})
	})
	.catch((error) => {})
	}

	renderSeparator() {
		return (
			<View
			style={{
				height: 2,
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

    var date = tweet.item.user.created_at;
    var formattedDate = new Date(date);
    var newDate = formattedDate.toString();
    var dateArr = newDate = newDate.split(' ');
    date = dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[3];

    var tweettext = tweet.item.text.split(' ');
    console.log(tweettext)
    var link = tweettext[tweettext.length-1];
    tweettext = tweettext.slice(0,tweettext.length - 1).join(' ');

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
    }

    // CHECK IF PHOTO, VIDEO, or GIF
    // NEXT PAGE SHOULD SHOW ALL IMAGES/MEDIA
    if(final_type == "photo") {
      //image = (<Image style={styles.imageContainer} source={{uri: image_url}}/>);
      return (
       // <TransitionPanel navigation={this.props.navigation} destination='Tweet' post_url={null}>
            <FeedCard titleorname={name} scnameorsource={screenname} date={date} link={link} imageurl={image_url} descortweet={tweettext}/>
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
         	<FeedCard titleorname={name} scnameorsource={screenname} date={date} link={link} imageonlineurl={image_online_url} descortweet={tweettext}/>
       // </TransitionPanel>
      );

    // HANDLING VIDEOS
    } else {
      var image_online_url = entities_parsed_media_1[38] + entities_parsed_media_1[39];
      image_online_url = image_online_url.split('"');      
      image_online_url = image_online_url[1];
      image_online_url = image_online_url.slice(0,5) + ':' + image_online_url.slice(5,image_online_url.length)
      
      // image = (
      //   <Video url={image_online_url} inlineOnly={true}/>
      // );
      return (
        //<TransitionPanel navigation={this.props.navigation} destination='Tweet' post_url={image_online_url}>
        	<FeedCard navigation={this.props.navigation} titleorname={name} scnameorsource={screenname} date={date} link={link} imageonlineurl={image_online_url} descortweet={tweettext}/>
        //</TransitionPanel>
      );

    }
  }

  renderFeed() {
       return (
        <View flex={1}>
            <FlatList
              // onRefresh={this.onRefresh()}
              // refreshing={this.state.refreshing}
              data={this.state.feedData} keyExtractor={(x,i) => i} renderItem={({item}) =>      
              <View flex={1} marginTop={27} alignItems="center">
              	{this.parseFeedData({item})}
              </View>
          	}/>
        </View>
      );
  }

  screenRendered() {
    // CONNECTION IS BEING ESTABLISHED
    if(this.state.feedVisible == null) {
      return (
          <Text>
            Wait for it...
          </Text>
      );
    } // FEED IS VISIBLE
    else if(this.state.feedData.length > 0 && this.state.feedVisible) {
      return (
        this.renderFeed()
      );
    } // ERROR IN CONNECTION
    else {
      return (
        <View>
          <Text>Error Retrieving Twitter Feed</Text>
          <Text>Please reload the feed by pulling down on the screen.</Text>
        </View>
      );
    }
  }

  render() {
    return (
        <View flex={1} style={styles.encompCont}>
        {this.screenRendered()}
      </View>
    );
  }
}

const styles = ({
	encompCont: {
		// justifyContent: 'center',
		// alignItems: 'center'
    backgroundColor: '#5B1728'//'#47101E'//#530F1C'
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