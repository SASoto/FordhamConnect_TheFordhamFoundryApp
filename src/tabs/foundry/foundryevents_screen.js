import React, { Component } from 'react';
import {Platform, StyleSheet, View, Linking, List, FlatList, Text, Button, Dimensions, TouchableHighlight, TouchableOpacity, Image} from 'react-native';

import TransPanel from './comp_transpanel';

// WP REST API 
const REQUEST_URL_POSTS  = 'https://fordhamfoundry.org/wp-json/wp/v2/posts';
const REQUEST_URL_IMAGES = 'https://fordhamfoundry.org/wp-json/wp/v2/media';
// Windowsize is referenced in the styles below.
const windowSize = Dimensions.get('window');
// console.log(windowSize)

export default class foundryevents_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //isLoading: true,
      sitedata_posts:[],
      sitedata_images:[]
    }
    this.fetch_Data = this.fetch_Data.bind(this);
    //this.fetch_ImageData = this.fetch_ImageData.bind(this);
    //this.getImage = this.getImage.bind(this);
  }

  // componentDidMount() {
  //   this.fetch_Data();
  // }


  // fetchData = async() => {
  // 	const response = await
  //   fetch(REQUEST_URL)
  //   const posts = await response.json();
  //   this.setState({site_data:posts});
  // }

  // This is where the magic happens! Fetches the data from our API and updates the application state.
  fetch_Data() {
    this.setState({
      // We'll also set card to null when loading new cards so that the loading message shows.
      sitedata_posts: [],
      sitedata_images: []
    });

    fetch(REQUEST_URL_POSTS)
		.then((response) => response.json())
		.then((responseJson) => {
		// this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
			posts = responseJson

			this.setState({sitedata_posts: posts});
		})
		.then(() => {
			//this.fetch_ImageData(1933);
			//console.log("in here")
			return fetch(REQUEST_URL_IMAGES)// + '/' + 1933)
		})
		.then((response) => response.json())
		.then((responseJson) => {
		// this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
			image = responseJson
			this.setState({sitedata_images: image});
			//console.log(this.state.sitedata_images)
			//return responseJson.guid.rendered
			//const image_url = responseJson.guid.rendered;
			//return (this.getImage());
		})
		.catch((error) => {
			console.error(error);
		})
  }

 //  fetch_ImageData = (image_id) => {
 //  	// this.setState({
 //   //    // We'll also set card to null when loading new cards so that the loading message shows.
 //   //    sitedata_image: ''
 //   //  });
 //   	//const me = this;
	// //const image_id = item.featured_media;
	// //console.log(image_id);
	// //console.log(REQUEST_URL_IMAGES + '/' + image_id);
	// fetch(REQUEST_URL_IMAGES + '/' + image_id)
	// .then((response) => response.json())
	// .then((responseJson) => {
	// // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
	// 	//images = responseJson//.guid.rendered
	// 	this.setState({sitedata_images: responseJson.guid.rendered});
	// 	//console.log(this.state.sitedata_images)
	// 	//return responseJson.guid.rendered
	// 	//const image_url = responseJson.guid.rendered;
	// 	//return (this.getImage());
	// })
	// .catch((error) => {
	// 	console.error(error);
	// })
 //  }

  // Instead of immediately rendering the template, we now check if there is data in the 'card' variable
  // and render a loading view if it's empty, or the 'card' template if there is data.
  render() {
    if (this.state.sitedata_posts.length == 0 || this.state.sitedata_images == 0) {
      return this.renderLoadingView();
    }
    return (this.renderCard());
    
  }

  // The loading view template just shows the message "Wait for it..."
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Wait for it...
        </Text>
      </View>
    );
  }
//<View style={styles.imageContainer}>
//<Image style={styles.imageContainer} source={{uri: this.state.card.pic}}/>

  decodeHTML = ({item}) => {

  	//{this.fetch_ImageData({item})}

  	const regex_1 = /(<([^>]+)>)/ig;
  	const regex_2 = /&#([0-9]{1,4});/g;

  	var date = item.date;

  	var formattedDate = new Date(date);
  	var newDate = formattedDate.toString();//formattedDate.getDay().toString() + " " + formattedDate.getMonth().toString() + " " + formattedDate.getYear().toString();
  	var dateArr = newDate = newDate.split(' ');
  	date = dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[3];

  	var title = item.title.rendered.replace(regex_1, '');
  	title = title.replace(regex_2, '');
  	title = title.replace("&nbsp", '');
  	title = title.replace("&hellip", '...');

  	var desc = item.excerpt.rendered.replace(regex_1, '');
  	desc = desc.replace(regex_2, '');
  	desc = desc.replace("&nbsp", '');
  	desc = desc.replace("&hellip", '...');
  	desc = desc.replace(";", '');

  	var link = item.link
  	var media = item.featured_media
	// var dec_title = function(title) {
	//   return title.replace(/&#(\d+);/g, function(match, dec) {
	//     return String.fromCharCode(dec);
	//   });
	// };
	//{this.fetch_ImageData({item})}

  	return (
  		<View>
	  		<TransPanel navigation={this.props.navigation} post_url={item.featured_media} destination='MoreInfo'>
	  			<View marginTop = {5}>
	  				<View>
	  					<View>
		  					<Text style={styles.titleText}>{title}</Text>
		  				</View>
		  				<View alignItems="center" marginTop = {5}>
		  					<Text>{date}</Text>
		  				</View>
		  			</View>
		  		</View>
		  		<View>
		  			<View padding = {2}>
						<Text style={styles.descText}>{desc}</Text>
						<TouchableOpacity onPress={() => Linking.openURL(link)}>
							<Text style={styles.linkText}>{link}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TransPanel>
			<View marginTop={5}>
				{this.getImage(media)}
			</View>
		</View>
  	);
  }

//<Image style={styles.imageContainer} source={{uri: this.state.sitedata_image}}/>
//<Text>{media_id}</Text>
  getImage = (media_id) => {
  	const numImages = this.state.sitedata_images.length
  	for(var i = 0; i < numImages; i++) {
  		if(this.state.sitedata_images[i].id == media_id)
  		{
    		const image_url = this.state.sitedata_images[i].guid.rendered;
    		return (
	  			<Image style={styles.imageContainer} source={{uri: image_url}}/>
	  		);
  		}
  	}

  	return;

  	//var image_url = ''
  	//const media_id = item.featured_media;
  	//const image_url = this.fetch_ImageData(media_id)

 //  	fetch(REQUEST_URL_IMAGES + '/' + image_id)
	// .then((response) => response.json())
	// .then((responseJson) => {
	// // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
	// 	//images = responseJson//.guid.rendered
	// 	//this.setState({sitedata_image: responseJson.guid.rendered});
	// 	//image_url = responseJson.guid.rendered;
	// 	//const image_url = responseJson.guid.rendered;
	//return (<Text>{this.state.sitedata_images}</Text>);
	//console.log(this.state.sitedata_image)
	// })

  	//const url = this.state.sitedata_image
  	//const image_URL = image_url
  	//console.log(image_url)
  	// const whatvar = this.state.sitedata_image
  	// console.log(whatvar)
  	//if(this.state.sitedata_image != '') {
	//}
  }

  renderSeparator = () => {
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

  // This is the original render function, now renamed to renderCard, which will render our main template. 
	// <View>
	// 	<Text style={styles.titleText}>{item.title.rendered.replace(regex, '')}</Text>
	// 	<Text>{item.excerpt.rendered.replace(regex, '')}</Text>
	// 	<Text>{item.link}</Text>
	// </View>
	// {this.fetch_ImageData({item})}
	// {this.getImage({item})}

  renderCard() {
  	//const regex = /(<([^>]+)>)/ig;
    return (
    	<View flex={1} marginTop={20}>
	    	<View style={styles.encompassingView}>
		          <FlatList
		          	ItemSeparatorComponent={this.renderSeparator}
		          	data={this.state.sitedata_posts} keyExtractor={(x,i) => i} renderItem={({item}) =>		  
		        	<View>
		        	{this.decodeHTML({item})}
		        	</View>
		    	  }/>
	    	</View>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dummyView: {
  	height: windowSize.height * .5,
  	width: windowSize.width
  },
  encompassingView: {
  	height: windowSize.height,// * .5,
  	width: windowSize.width,
  	//alignItems: 'center'
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
    //alignItems: 'center',
    flex: 1,
    height: 150
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
});

// Using WebView
// <View justifyContent='center' flex={1}>
// 	<View alignItems='center'>
//     	<Text>Hello There!</Text>
//     	<Button title="Visit the Foundry Website" onPress={() => this.props.navigation.navigate("FFSite")}/>
// 	</View>
// </View>}

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>