import React, { Component } from 'react';
import {Platform, StyleSheet, ImageBackground, View, Linking, List, FlatList, Text, Button, SectionList, Dimensions, TouchableHighlight, TouchableOpacity, Image} from 'react-native';

import TransPanel from './comp_transpanel';
import {MaterialIndicator} from 'react-native-indicators';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

// WP REST API 
const REQUEST_URL_EVENTS = 'https://fordhamfoundry.org/wp-json/tribe/events/v1/events';
const REQUEST_URL_POSTS  = 'https://fordhamfoundry.org/wp-json/wp/v2/posts';
const REQUEST_URL_IMAGES = 'https://fordhamfoundry.org/wp-json/wp/v2/media';
// Windowsize is referenced in the styles below.

class SectionListItem extends Component {
  checkIfConnected(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    }).catch(err => {});
  }

    render () {
        return (
            <TouchableOpacity style={styles.sectionListItemEncompCont} onPress={() => this.checkIfConnected(this.props.item.link)}>
              <View flex={1}>
                <View flexDirection="row" paddingLeft={20} paddingVertical={20}>
                    <View flex={8} justifyContent="center" marginRight={10}>
                    <Text style={{fontFamily:'SFProText-Regular', fontSize:16, color:'rgb(115,115,115)'}}>{this.props.item.title}</Text>
                    </View>
                    <View flex={1} justifyContent="center">
                      <MatIcon name="keyboard-arrow-right" size={20} color="rgba(15,14,14,0.5)"/>
                    </View>
                </View>
              </View>
            </TouchableOpacity>
        )
    }
}

class SectionHeader extends Component {
    render() {
      if(this.props.section.title == '') {
        var sectionTitle = (null)
      } else {
        var sectionTitle = (
          <View justifyContent="center">
            <Text style={{fontFamily: 'SFProText-Light', fontSize: 14, color: 'rgb(115,115,115)'}}>{this.props.section.title}</Text>
          </View>
        )
      }

        return (
            <View flex={1} paddingHorizontal={18} paddingVertical={15} alignItems="flex-end">
              {sectionTitle}
            </View>
        )
    }
}

const windowSize = Dimensions.get('window');
export default class foundryevents_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isLoading: true,
      sitedata_posts:[],
      sitedata_images:[],
      sitedata_events:[],
      postList: [],
      refreshing: false,
    }
    this.fetch_Data = this.fetch_Data.bind(this);
    this.fetchLatestData = this.fetchLatestData.bind(this);
  }

  componentDidMount() {
    this.mounted = true
    this.fetch_Data();
  }

  componentWillUnmount() {
    this.mounted = false
  }

  // This is where the magic happens! Fetches the data from our API and updates the application state.
  fetch_Data() {
    this.setState({sitedata_posts: []});

    fetch(REQUEST_URL_EVENTS)
		.then((response) => {
      response.json().then((responseJson) => {
  			events = responseJson
        //console.log('POSTS:',posts)
        if(this.mounted && events != null)
          this.setState({sitedata_events: events});
  			 //this.setState({sitedata_posts: posts});
         //console.log("STATE EVENTS:",this.state.sitedata_posts)
         //return posts;
  		})
      .then(() => {
        this.createSectionedList()
      })
    })
    .catch((error) => {
      console.log(error)//this.setState({refreshing: false});
    })

    this.setState({refreshing: false});
		// .then(() => {
  //     if(this.mounted)
  //       return fetch(REQUEST_URL_IMAGES)
		// })
		// .then((response) => {
  //     response.json().then((responseJson) => {
  // 		// this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
  // 			images = responseJson
  //       if(this.mounted)
  // 			 this.setState({sitedata_images: images});
  // 		})
  //   })
    // .then(() => {
    //   //this.setState({sitedata_posts: posts});
    //   const sectionedList = this.createSectionedList();
    //   if(this.mounted)
    //     this.setState({postList: sectionedList});
    // })
  }

  fetchLatestData() {
    fetch(REQUEST_URL_EVENTS)
    .then((response) => {
      response.json().then((responseJson) => {
        events = responseJson
        //console.log('POSTS:',posts)
        if(events != null) {
          const lengthofcurrevents = this.state.sitedata_events.events.length;
          const curreventsarr = this.state.sitedata_events.events;
          const latesteventsarr = events.events;
          //console.log("WHAT IS THE EVENT: ",latesteventsarr);
          // const latesteventincurrlistid = this.state.sitedata_events.events[lengthofcurrevents-1];
          // const latesteventinlistid = events.events[events.events[events.events.length-1]].id;

          if(latesteventsarr.length > lengthofcurrevents) {
            console.log("LATEST EVENTS IS GREATER THAN curreventsarr")
            const olderEvents = this.state.sitedata_events;
            latesteventsarr = latesteventsarr.slice(lengthofcurrevents);
            this.setState({sitedata_events: [...latesteventsarr,...olderEvents]});
          }

        }
         //console.log("STATE EVENTS:",this.state.sitedata_posts)
         //return posts;
      })
      .then(() => {
        this.createSectionedList()
      })
    })
    .catch((error) => {
      this.setState({refreshing: false});
    })

    this.setState({refreshing: false});
  }

  createSectionedList() {
    //EVENTS
    const setOfEvents = this.state.sitedata_events.events;
    // console.log("SET OF EVENTS ARR: ",this.state.sitedata_events)
    // console.log("SET OF EVENTS OBJ: ",this.state.sitedata_events.events)
    // console.log("SINGLE EVENT OBJ: ",this.state.sitedata_events.events[0])
    //console.log("SET OF EVENTSL",this.state.sitedata_posts)
    var sectionedList = [];
    var eventsInOneDay = [];
      
    var onDate = this.returnEventDate(setOfEvents[0]);
    for(var i=0; i<setOfEvents.length; i++) {
      var currDate = this.returnEventDate(setOfEvents[i]);
      if(currDate != onDate) {
          sectionedList.push({title: onDate, data: eventsInOneDay});
          onDate = currDate;
          eventsInOneDay = [];
          var eventData = this.returnEventData(setOfEvents[i]);
          eventsInOneDay.push(eventData);
      } else { //Name starts with the same letter we are currently on
          var eventData = this.returnEventData(setOfEvents[i]);
          eventsInOneDay.push(eventData)
      }

    }
    sectionedList.push({title: onDate, data: eventsInOneDay});
    for(var i=0; i<12; i++) {
      sectionedList.push({title: '', data: []});
    }

    this.setState({postList: sectionedList});

    //POSTS
        // const setOfEvents = this.state.sitedata_posts;
        // //console.log("SET OF EVENTSL",this.state.sitedata_posts)
        // var sectionedList = [];
        // var eventsInOneDay = [];
          
        // var onDate = this.returnEventDate(setOfEvents[0]);
        // for(var i=0; i<setOfEvents.length; i++) {
        //   var currDate = this.returnEventDate(setOfEvents[i]);
        //   if(currDate != onDate) {
        //       sectionedList.push({title: onDate, data: eventsInOneDay});
        //       onDate = currDate;
        //       eventsInOneDay = [];
        //       var eventData = this.returnEventData(setOfEvents[i]);
        //       eventsInOneDay.push(eventData);
        //   } else { //Name starts with the same letter we are currently on
        //       var eventData = this.returnEventData(setOfEvents[i]);
        //       eventsInOneDay.push(eventData)
        //   }

        // }
        // sectionedList.push({title: onDate, data: eventsInOneDay});
        // for(var i=0; i<12; i++) {
        //   sectionedList.push({title: '', data: []});
        // }

        // this.setState({postList: sectionedList});
        //return sectionedList;
    }

  // Instead of immediately rendering the template, we now check if there is data in the 'card' variable
  // and render a loading view if it's empty, or the 'card' template if there is data.
  render() {
    //if(this.state.postList.length > 0)
      return (this.renderCard());
    // else 
    //   return (this.renderLoadingView());
  }

  // The loading view template just shows the message "Wait for it..."
  // renderLoadingView() {
  //   return (
  //     <View style={styles.container}>
  //       <ImageBackground
  //         resizeMode='cover'
  //         style={{
  //           flex: 1,
  //           position: 'absolute',
  //           width: '100%',
  //           height: '100%',
  //         }}

  //         source={require('../../../Images/plussilvergradient.png')}
  //       >
  //       <View marginTop={50} alignItems="center">
  //         <MaterialIndicator color='rgb(115,115,115)' size={35}/>
  //       </View>
  //       </ImageBackground>
  //     </View>
  //   );
  // }

  returnEventDate(event) {
    //console.log("EXAMPLE OF AN EVENT:", event)
    // const regex_1 = /(<([^>]+)>)/ig;
    // const regex_2 = /&#([0-9]{1,4});/g;

    if(event.date == null || event.date == undefined)
      return 'undefined'
    else {
      var date = event.date;
      var formattedDate = new Date(date);
      //console.log("FORMATTED DATE: ",formattedDate);
      var newDate = formattedDate.toString();
      var dateArr = newDate = newDate.split(' ');
      //console.log("DATE OF EVENT: ",dateArr);
      date = dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];
      //console.log("DATE OBJECT: ",date);

      return date;
    }
  }

  returnEventData(event) {
    // const regex_1 = /(<([^>]+)>)/ig;
    // const regex_2 = /&#([0-9]{1,4});/g;

    var title = event.title;//.rendered.replace(regex_1, '');
    // title = title.replace(regex_2, '');
    // title = title.replace("&nbsp", '');
    // title = title.replace("&hellip", '...');

    // var desc = event.excerpt.rendered.replace(regex_1, '');
    // desc = desc.replace(regex_2, '');
    // desc = desc.replace("&nbsp", '');
    // desc = desc.replace("&hellip", '...');
    // desc = desc.replace(";", '');

    var link = event.url
    // var media = event.featured_media
    // var imageUrl = this.getImageData(media)
    //console.log("IMAGE URL:",imageUrl)

    return {title: title, link: link};
  }

  // getImageData(media_id) {
  //   //console.log("STATE IMAGES:",this.state.sitedata_images)
  //   //console.log("MEDIA ID HERE:",media_id)
  //   const numImages = this.state.sitedata_images.length
  //   for(var i = 0; i < numImages; i++) {
  //     if(this.state.sitedata_images[i].id == media_id)
  //     {
  //       const image_url = this.state.sitedata_images[i].guid.rendered;
  //       return image_url;
  //     }
  //   }

  //   return;
  // }

  // renderSeparator() {
  //   return (
  //     <View
  //       style={{
  //         height: 2,
  //         width: windowSize.width,
  //         backgroundColor: "#CED0CE",
  //       }}
  //     />
  //   );
  // }

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

  renderCard() {
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
            <SectionList        
                ListEmptyComponent={<View marginTop={50} alignItems="center">
                                      <MaterialIndicator color='rgb(115,115,115)' size={35}/>
                                    </View>}
                stickySectionHeadersEnabled={false}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({item, index}) => {
                    return (<SectionListItem item={item} index={index}/>)
                }}
                renderSectionHeader={({section}) => {return(<SectionHeader section={section}/>)}}
                sections={this.state.postList}
                keyExtractor={(item, index) => index}
                refreshing={this.state.refreshing}
                onRefresh={this.fetchLatestData}
            />
        </ImageBackground>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dummyView: {
  	height: windowSize.height * .5,
  	width: windowSize.width
  },
  encompassingView: {
  	height: windowSize.height,// * .5,
  	width: windowSize.width,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descText: {
  	padding: 5,
  	fontSize: 14,
  	textAlign: 'center'
  },
  linkText: {
  	color: 'blue',
  	fontSize: 12,
  	textAlign: 'center'
  },
  imageContainer: {    
    flex: 1,
    height: 100
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    height: 150,
    width: windowSize.width,
    backgroundColor: '#1488BC',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  sectionListItemEncompCont: {
    flex: 1,
    backgroundColor: "#dbd1ce",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1.3,
    shadowOpacity: 0.3
  }
});