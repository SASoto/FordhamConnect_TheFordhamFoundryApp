import React, {Component} from 'react';
import {Dimensions, Linking, ImageBackground, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {SkypeIndicator} from 'react-native-indicators';

import FavoriteButton from './FavoriteButton';

const windowSize = Dimensions.get('window');
export default class ProfileCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: null,
			headline: null,
			location: null,
			bio: null,
		}
		
	}

	componentWillMount() {
        this.fetchProfileData(this.props.userID)       
    }

	componentDidMount() {
        //this.fetchProfileData(this.props.userID)       
    }

	fetchProfileData(passedUID) {
		//var userId = firebase.auth().currentUser.uid;
		var contactInfo = {email: "", headline: "", location: "", bio: ""}

		firebase.database().ref('/users/' + passedUID).once('value').then(function(snapshot) {
  			var contactEmail = snapshot.val().email
  			var contactHeadline = (snapshot.val().headline || " ")
  			var contactLocation = (snapshot.val().location || " ")
  			var contactBio = snapshot.val().bio

  			//console.log("User headline is ...", contactHeadline)
  			//console.log("User bio is ...", contactBio)
  			contactInfo = {email: contactEmail, headline: contactHeadline, location: contactLocation, bio: contactBio}
  			console.log("ContactInfo is ", contactInfo)
  			console.log("ContactInfo bio is ", contactInfo.bio)
  			//console.log("state headline is ", this.state.headline)

  			//return contactInfo
  			// ...
		})
		.then(() => {
			this.setState({email: contactInfo.email, headline: contactInfo.headline, location: contactInfo.location, bio: contactInfo.bio})
			console.log("And now this.state has bio " + this.state.bio)
			console.log("And email is... ", this.state.email)
		})
	}

	checkStuff() {
		if(this.state.bio == null || this.state.headline == null || this.state.email == null || this.state.location == null)
		{
		    return (
		      <View style={styles2.loadingOverlay}>
		        <SkypeIndicator color='white' size={35}/>
		      </View>
		    )
		}
	}

	render() {
		const styles =({
			encompCont: {
				//flex: 1,
				borderRadius: 8,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 2
				},
				height: 260,
				shadowRadius: 4,
				shadowOpacity: 1,
				width: windowSize.width * .9,
				//height: 260
			},
			nameStyle: {
				fontFamily: 'SFProText-Regular',
				fontSize: 15,
				color: 'rgb(115,115,115)'
			},
			headlineStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 12,
				color: 'rgb(115,115,115)'
			},
			locationStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 12,
				color: 'rgb(115,115,115)'
			},
			bioStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 14,
				color: 'rgb(115,115,115)'
			}

		})
		
		return (
			<View style={styles.encompCont}>
				<ImageBackground
		          resizeMode='cover'
		          style={{
		            flex: 1,
		            //borderRadius: 8	      
		          }}

		            source={require('../../Images/plussilvergradient.png')}
		        >
		        <View padding={23} flexDirection="column">
					<View alignItems="flex-end">
						<FavoriteButton changeFavoritedStatus={this.props.changeFavoritedStatus} favorited={this.props.favorited} userID={this.props.userID}/>
					</View>
					<View flexDirection="row">
						<View width={60} height={60} borderRadius={30} backgroundColor="grey" marginRight={14}/>
						<View flexDirection="row">
							<View justifyContent = "center" flexDirection="column">
								<Text style={styles.nameStyle}>{this.props.userfname}</Text>
								<Text style={styles.headlineStyle}>{this.state.headline}</Text> 
							</View>
						</View>
					</View>
					
					<View marginTop={15}>
						<Text>{this.state.location}</Text> 
					</View>
					<View marginVertical={7} borderBottomWidth={1} borderColor="black"/>
					<View>
						<Text style={styles.bioStyle}>{this.state.bio}</Text> 
					</View>
													
				</View>
				<View flex={1} marginTop={10} paddingRight={23} alignItems="flex-end">
					<TouchableOpacity onPress={() => Linking.openURL('mailto:'+this.state.email)}>
						<MatIcon name="mail-outline" size={25} color="rgb(106,46,52)"/>
					</TouchableOpacity> 
				</View>
				</ImageBackground>
				{this.checkStuff()}
			</View>
		)
	}
}

const styles2 = ({
	loadingOverlay: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'rgba(0,0,0,0.3)'
   }
})