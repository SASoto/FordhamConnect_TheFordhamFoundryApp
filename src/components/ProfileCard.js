import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

import FavoriteButton from './FavoriteButton';

const windowSize = Dimensions.get('window');
export default class ProfileCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			headline: "",
			bio: "",
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
		var contactInfo = {headline: "", bio: ""}

		firebase.database().ref('/users/' + passedUID).once('value').then(function(snapshot) {
  			var contactHeadline = (snapshot.val().headline || " ")
  			var contactBio = snapshot.val().bio

  			//console.log("User headline is ...", contactHeadline)
  			//console.log("User bio is ...", contactBio)
  			contactInfo = {headline: contactHeadline, bio: contactBio}
  			console.log("ContactInfo is ", contactInfo)
  			console.log("ContactInfo bio is ", contactInfo.bio)
  			//console.log("state headline is ", this.state.headline)

  			//return contactInfo
  			// ...
		})
		.then(() => {
			this.setState({headline: contactInfo.headline, bio: contactInfo.bio})
			console.log("And now this.state has bio " + this.state.bio)
		})
	}

	render() {
		//this.fetchProfileData(this.props.userID)
		// .then(() =>{
		// 	console.log("state info is now... ", this.state.headline)
		// })
		
		return (
			<View style={styles.encompCont}>
				<View padding={20}>
					<View flexDirection="row">
						<View width={60} height={60} borderRadius={30} backgroundColor="grey" marginRight={15}/>
						<View flexDirection="row">
							<View justifyContent = "center" flexDirection="column">
								<Text>{this.props.userfname}</Text>
							</View>
							<View justifyContent="center">
								<FavoriteButton changeFavoritedStatus={this.props.changeFavoritedStatus} favorited={this.props.favorited} userID={this.props.userID}/>
							</View>
						</View>
					</View>
					<View>
						<View>
							<Text>{this.state.headline}</Text> 
						</View>
						<View borderBottomWidth={1} borderColor="black"/>
						<View>
							<Text>{this.state.bio}</Text> 
						</View>
						<View>
							<Button title="Email" onPress={() => console.log('do nothing')}/> 
						</View>
					</View>
				</View>
			</View>
		)
	}
}

//<Button title="favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		flexDirection: "column",
		width: windowSize.width * .9,
		borderWidth: 1,
		borderRadius: 3,
	}
})