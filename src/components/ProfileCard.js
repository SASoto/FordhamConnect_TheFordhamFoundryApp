import React, {Component} from 'react';
import {Dimensions, Linking, ImageBackground, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import {MaterialIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import FavoriteButton from './FavoriteButton';

const windowSize = Dimensions.get('window');
export default class ProfileCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: null,
			initials: null,
			headline: null,
			location: null,
			bio: null,
		}
		
	}

	componentDidMount() {
		this.mounted = true;
        this.fetchProfileData(this.props.userID)       
    }

    componentWillUnmount() {
    	this.mounted = false
  	}

	fetchProfileData(passedUID) {
		var contactInfo = {email: "", headline: "", location: "", bio: ""}

		firebase.database().ref('/users/' + passedUID).once('value').then(function(snapshot) {
  			var contactEmail = snapshot.val().email
  			var contactInitials = snapshot.val().initials
  			var contactHeadline = (snapshot.val().headline || " ")
  			var contactLocation = (snapshot.val().location || " ")
  			var contactBio = snapshot.val().bio

  			contactInfo = {email: contactEmail, initials: contactInitials, headline: contactHeadline, location: contactLocation, bio: contactBio}
		})
		.then(() => {
			if(this.mounted)
				this.setState({email: contactInfo.email, initials: contactInfo.initials, headline: contactInfo.headline, location: contactInfo.location, bio: contactInfo.bio})
		})
	}

	checkStuff() {
		if(this.state.initials == null || this.state.bio == null || this.state.headline == null || this.state.email == null || this.state.location == null)
		{
		    return (
		      <View style={styles2.loadingOverlay}>
		        <MaterialIndicator color='white' size={35}/>
		      </View>
		    )
		}
	}

	render() {
		const styles =({
			encompCont: {
				marginTop: 20,
				alignItems: 'center',
				backgroundColor: '#dbd1ce',
				borderRadius: 8,
	            width: windowSize.width*.9,
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
				fontSize: 15,
				color: 'rgb(115,115,115)'
			},
			headlineStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 13,
				color: 'rgb(115,115,115)'
			},
			locationStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 13,
				color: 'rgb(115,115,115)'
			},
			bioStyle: {
				fontFamily: 'SFProText-Light',
				fontSize: 14,
				color: 'rgb(115,115,115)',
			},
			gradientCont: {
				flex: 1,
				backgroundColor: 'red',
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				shadowOffset: {
					width: 0,height: 2
				},
				shadowRadius: 4,
				shadowOpacity: 1,
				width: windowSize.width * .9,
			}

		})
		
		return (
			<View style={styles.encompCont}>
				
		        <View flexDirection="column" padding={20}>
					<View alignItems="flex-end">
						<FavoriteButton changeFavoritedStatus={this.props.changeFavoritedStatus} favorited={this.props.favorited} userID={this.props.userID}/>
					</View>
					<View flexDirection="row">
						<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
                            <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>{this.state.initials}</Text>
                        </LinearGradient>						
						<View justifyContent = "center" flexDirection="column">
							<Text style={styles.nameStyle}>{this.props.userfname}</Text>
							<Text style={styles.headlineStyle}>{this.state.headline}</Text> 
						</View>						
					</View>
					
					<View marginTop={15}>
						<Text style={styles.locationStyle}>{this.state.location}</Text> 
					</View>
					<View marginVertical={7} height={1} width={250} backgroundColor="rgb(151,151,151)"/>
					<View paddingRight={25}>
						<Text style={styles.bioStyle}>{this.state.bio}</Text> 
					</View>
					<View marginTop={5} alignItems="flex-end">
					<TouchableOpacity onPress={() => Linking.openURL('mailto:'+this.state.email)}>
						<MatIcon name="mail-outline" size={25} color="rgb(106,46,52)"/>
					</TouchableOpacity> 
					</View>
					
				</View>				
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