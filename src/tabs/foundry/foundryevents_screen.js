import React, { Component } from 'react';
import {Platform, StyleSheet, ImageBackground, 
        View, Linking, List, FlatList, Text, Button, SectionList, 
        Dimensions, TouchableHighlight, TouchableOpacity, Image, RefreshControl} from 'react-native';

import TransPanel from './comp_transpanel';
import {MaterialIndicator} from 'react-native-indicators';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

// WP REST API 
const REQUEST_URL_EVENTS = 'https://fordhamfoundry.org/wp-json/tribe/events/v1/events';
const REQUEST_URL_POSTS  = 'https://fordhamfoundry.org/wp-json/wp/v2/posts';
const REQUEST_URL_IMAGES = 'https://fordhamfoundry.org/wp-json/wp/v2/media';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
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
              <View flex={1} flexDirection="row" paddingLeft={20} paddingVertical={30}>
                <View flex={8} flexDirection="column" justifyContent="center">
                    <View justifyContent="center">
                      <Text style={{fontFamily:'SFProText-Regular', fontSize:15, color:'rgb(115,115,115)'}}>{this.props.item.title}</Text>
                      <Text style={{fontFamily:'SFProText-Light', fontSize: 14, color: 'rgb(115,115,115)'}}>{this.props.item.excerpt}</Text>
                    </View>
                </View>
                <View flex={1} justifyContent="center">
                  <MatIcon name="keyboard-arrow-right" size={20} color="rgba(15,14,14,0.5)"/>
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
            <Text style={{fontFamily: 'SFProText-Light', fontSize: 12, color: 'rgb(115,115,115)'}}>{this.props.section.title}</Text>
          </View>
        )
      }

        return (
            <View flex={1} paddingHorizontal={18} paddingTop={5} paddingBottom={15} alignItems="flex-end">
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
        if(this.mounted && events != null)
          this.setState({sitedata_events: events});
  		})
      .then(() => {
        this.createSectionedList()
      })
    })
    .catch((error) => {
      console.log(error)
    })

    this.setState({refreshing: false});
  }

  fetchLatestData() {
    fetch(REQUEST_URL_EVENTS)
    .then((response) => {
      response.json().then((responseJson) => {
        events = responseJson
        if(events != null) {
          const lengthofcurrevents = this.state.sitedata_events.events.length;
          const curreventsarr = this.state.sitedata_events.events;
          const latesteventsarr = events.events;

          if(latesteventsarr.length > lengthofcurrevents) {
            console.log("LATEST EVENTS IS GREATER THAN curreventsarr")
            const olderEvents = this.state.sitedata_events;
            latesteventsarr = latesteventsarr.slice(lengthofcurrevents);
            this.setState({sitedata_events: [...latesteventsarr,...olderEvents]});
          }

        }
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
    if(this.state.sitedata_events.events == null || this.state.sitedata_events.events == undefined) return;
    
    const setOfEvents = this.state.sitedata_events.events;
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
  }

  // Instead of immediately rendering the template, we now check if there is data in the 'card' variable
  // and render a loading view if it's empty, or the 'card' template if there is data.
  render() {
      return (this.renderCard());
  }

  returnEventDate(event) {

    if(event.date_utc == null || event.date_utc == undefined)
      return 'undefined'
    else {
      var date = event.date;
      var splitDate = date.split(' ');
      var firstHalfOfDate = splitDate[0].split('-');
      var dayofEvent = firstHalfOfDate[2];

      if(firstHalfOfDate[1][0] == '0')
        var monthOfEvent = monthNames[(firstHalfOfDate[1].slice(1)-1)];
      else
        var monthOfEvent = monthNames[(firstHalfOfDate[1]-1)];
      var yearOfEvent = firstHalfOfDate[0];

      date = monthOfEvent + ' ' + dayofEvent + ', ' + yearOfEvent;

      return date;
    }
  }

  returnEventData(event) {
    const regex_1 = /(<([^>]+)>)/ig;
    const regex_2 = /&#([0-9]{1,4});/g;

    var title = event.title;
    var excerpt = event.excerpt.replace(regex_1, '');
    excerpt = excerpt.replace(regex_2, '');
    var link = event.url

    return {title: title, excerpt: excerpt, link: link};
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 2,          
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 1.3,
          shadowOpacity: 1
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
        <View height={3} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
            <View marginTop={5} marginBottom={5} alignItems="center" backgroundColor="transparent">
              <View flexDirection="row">
                <View justifyContent="center" marginRight={5}>
                  <Image source={require('../../../Images/arrow_downward_24px.png')}/>
                </View>
                <View justifyContent="center">
                  <Text style={{fontSize: 10, fontFamily: 'SFProText-Light', color: '#737373'}}>pull down to refresh</Text>
                </View>
              </View>
            </View>
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
                refreshControl={
                  <RefreshControl
                     refreshing={this.state.refreshing}
                     onRefresh={this.fetchLatestData}                     
                     tintColor="darkgrey"
                  />
                }
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