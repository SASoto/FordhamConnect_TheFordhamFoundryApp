import React, {Component} from 'react';
import {Dimensions, Keyboard, Modal, View, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';
import {Header} from 'react-navigation';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {emailChanged, firstnameChanged, lastnameChanged, initialsChanged, headlineChanged, websiteChanged, locationChanged, bioChanged} from '../Actions';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const windowSize = Dimensions.get('window');
class profilemodal extends Component {
	constructor(props) {
		super(props);

		this.state = {
		 	tempEmail: "",
		 	tempFirstName: "",
		 	tempLastName: "",
		 	tempInitials: "",
		 	tempHeadline: "",
		 	tempWebsite: "",
		 	tempLocation: "",
		 	tempBio: "",
		 	propsShouldChange: false
		}
		//console.log("Construction complete!")
	}

	onEmailChange(text){
		// if(!propsShouldChange)
		// 	this.setState({propsShouldChange: true})

        this.props.emailChanged(text)
    }

    onFirstNameChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})

        this.props.firstnameChanged(text)
    }

    onLastNameChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})
		
        this.props.lastnameChanged(text)
    }

    onHeadlineChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})
		
        this.props.headlineChanged(text)
    }

    onWebsiteChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})
		
        this.props.websiteChanged(text)
    }

    onLocationChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})
		
        this.props.locationChanged(text)
    }

    onBioChange(text){
   //  	if(!propsShouldChange)
			// this.setState({propsShouldChange: true})
		
        this.props.bioChanged(text)
    }

	componentDidMount() {
		console.log("componentWillMount is running from profilemodal!")
		this.setState({tempEmail: this.props.email, tempFirstName: this.props.firstname, tempLastName: this.props.lastname, tempInitials: this.props.initials, tempHeadline: this.props.headline, tempWebsite: this.props.website, tempLocation: this.props.location, tempBio: this.props.bio})
        // this.fetchuserProfileData()       
    }

    // componentWillUnmount() {
    // 	console.log("componentWillUnmount is running from profilemodal")
    // }

    resetProfileModal() {
    	//if(this.state.propsShouldChange) {
    		console.log("resetProfileModal was run!!")
    		this.setState({tempEmail: this.props.email, tempFirstName: this.props.firstname, tempLastName: this.props.lastname, tempInitials: this.props.initials, tempHeadline: this.props.headline, tempWebsite: this.props.website, tempLocation: this.props.location, tempBio: this.props.bio})
    	//}
    	
    	this.props.modalFunc()
    }

    setNewProfileData() {
    	// console.log("Trying to set new profile data.")
    	// console.log("Trying to set to firebase...")
    	// console.log("CURRENTY FIRST NAME IS: ",this.state.tempFirstName)
    	// console.log("CURRENTLY LAST NAME IS: ",this.state.tempLastName)
    	var userID = firebase.auth().currentUser.uid

    	firebase.database().ref('users/' + userID).set({
    		email: this.props.email,
    		firstname: this.state.tempFirstName[0].toUpperCase() + this.state.tempFirstName.slice(1),
    		lastname: this.state.tempLastName[0].toUpperCase() + this.state.tempLastName.slice(1),
    		initials: this.state.tempInitials,
    		headline: this.state.tempHeadline,
    		website: this.state.tempWebsite,
    		location: this.state.tempLocation,
    		bio: this.state.tempBio,
  		})
  		.then(() => {
  			// this.onEmailChange(this.state.tempEmail)
  			this.onFirstNameChange(this.state.tempFirstName[0].toUpperCase() + this.state.tempFirstName.slice(1))
  			this.onLastNameChange(this.state.tempLastName[0].toUpperCase() + this.state.tempLastName.slice(1))
  			this.onHeadlineChange(this.state.tempHeadline)
  			this.onWebsiteChange(this.state.tempWebsite)
  			this.onLocationChange(this.state.tempLocation)
  			this.onBioChange(this.state.tempBio)
  		})
  		.then(() =>{
  			console.log("Completed firebase calls.")
  			this.setState({tempEmail: this.props.email, tempFirstName: this.props.firstname, tempLastName: this.props.lastname, tempInitials: this.props.initials, tempHeadline: this.props.headline, tempWebsite: this.props.website, tempLocation: this.props.location, tempBio: this.props.bio});
  			alert("Success! Your profile information has been updated.")

  		})
	}

	render () {
		//console.log("Rendering profilemodal for ..." + this.props.firstname + " " + this.props.lastname)
		return (
			<Modal
				animationType="slide"
	        	transparent={false}
	        	visible={this.props.modalVisible}
			>
			<View flex={1}>
				<ImageBackground
					resizeMode="cover"
					style={{
		                flex: 1,
		                //resizeMode,
		                position: 'absolute',
		                width: '100%',
		                height: '100%',
		                //alignItems: 'center',
	              	}}

	              	source={require('../../Images/plussilvergradient.png')}

	            >
								
				
					
					<View flex={1}>
						<ImageBackground
							resizeMode='cover'
							style={{
								//flex: 1,
								height: Header.HEIGHT * 1.5
								//position: 'absolute',
								//top:0,

								//width: '100%',
								//height: '100%',
							}}

			              source={require('../../Images/positionedblur.png')}

						>
							<View flex={1} paddingTop={20} justifyContent="center">
								<View flexDirection="row" justifyContent="space-between">
									<TouchableOpacity onPress={this.resetProfileModal.bind(this)}>
										<View paddingLeft={30} justifyContent='center'>
											<MatIcon name="close" size={24} color="rgb(255,255,255)"/>
										</View>
									</TouchableOpacity>
									<View paddingRight={20} justifyContent='center'>
										<TouchableOpacity onPress={this.setNewProfileData.bind(this)}>
											<Text style={{fontFamily:"SFProText-Medium",fontSize:16, color:"rgb(255,255,255)"}}>Save</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</ImageBackground>
						<KeyboardAwareScrollView flex={1} bounces={false} scrollEnabled={false} extraScrollHeight={40} keyboardOpeningTime={200}>
						<ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
						<View flex={1} alignItems="flex-start">
                        <View paddingTop={20} paddingLeft={28}>

                            <View flexDirection="row">
                            	<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
                                    <Text style={{fontFamily: 'SFProText-Light', fontSize: 24, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
                                </LinearGradient>                           
                                <View marginLeft={16} justifyContent="center">
                                    <Text style={styles.userNameStyle}>{this.props.firstname} {this.props.lastname}</Text>
                                </View>
                            </View>
						<View marginTop={20}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL*</Text></View>
						        <View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}				        
						          autoCapitalize = 'none'
						          value = {this.props.email}
						          autoCorrect = {false}
						          editable={false}
						        />		
						        </View>			        
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FIRST NAME*</Text></View>
					        	<View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}				          
						          autoCapitalize = 'none'
						          value = {this.props.firstname}
						          autoCorrect = {false}
						          editable={true}
						          onChangeText={(text) => this.setState({tempFirstName: text})}
        						  //value={this.state.tempFirstName}				  		         				       
						        />
						        </View>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>LAST NAME*</Text></View>
						        <View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}				       
						          autoCapitalize = 'none'
						          value = {this.props.lastname}
						          autoCorrect = {false}
						          editable={true}	
						          onChangeText={(text) => this.setState({tempLastName: text})}
        						  //value={this.state.tempLastName}		     				          
						        />
						        </View>
					        </View>
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>PERSONAL HEADLINE</Text></View>
						        <View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}
						          value = {this.props.headline}			          
						          autoCapitalize = 'none'
						          autoCorrect = {false}
						          editable={true}
						          onChangeText={(text) => this.setState({tempHeadline: text})}
        						  //value={this.state.tempHeadline}	
						          placeholder="ex. FCRH '15 or Gabelli '87"			      				          
						        />
						        </View>				       
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>WEBSITE LINK</Text></View>
						        <View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}	
						          value = {this.props.website}			          
						          autoCapitalize = 'none'
						          autoCorrect = {false}
						          editable={true}		
						          onChangeText={(text) => this.setState({tempWebsite: text})}
        						  //value={this.state.tempWebsite}	
						          placeholder="ex. LinkedIn/a personal site"	      				          
						        />	
						        </View>				        
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>LOCATION</Text></View>
						        <View style={styles.inputBackground}>
						        <TextInput
						          style = {styles.input}
						          value = {this.props.location}			          
						          autoCapitalize = 'none'
						          autoCorrect = {false}
						          editable={true}			
						          onChangeText={(text) => this.setState({tempLocation: text})}
        						  //value={this.state.tempLocation}	      				          
						          placeholder="ex. Greater New York City Area"
						        />
						        </View>				        
					        </View>						
						</View>
						<View marginTop={15}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>BIO</Text></View>
						        <View style={styles.inputBackground4Bio}>
						        <TextInput
						          style = {styles.input4Bio}
						          value = {this.props.bio}			          
						          autoCapitalize = 'none'
						          autoCorrect = {false}
						          editable={true}
						          multiline={true}
						          onChangeText={(text) => this.setState({tempBio: text})}
        						  //value={this.state.tempBio}	
						          placeholder="ex. Tell use about your work experience, association with the Fordham Foundry, or anything relevant to your education or career!"      				          
						        />
						        </View>
					        </View>						
						</View>					
					</View>
					</View>
					</ScrollView>
					</KeyboardAwareScrollView>
				</View>
				</ImageBackground>
				</View>
			</Modal>
			);
	}
}

//<View height={((windowSize.height*1/10) * .9)} backgroundColor="grey" justifyContent="center" alignItems="flex-end">
//<TouchableOpacity style={styles.saveButtonCont} onPress={() => console.log('does nothing')}>
//		<Text style={styles.saveTxt}>SAVE</Text>
//</TouchableOpacity>
//</View>

const styles = ({
  profPic: {
  	width: 60,
  	height: 60,
  	borderRadius: 30,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  userNameStyle: {
 	fontFamily: 'SFProText-Regular',
 	fontSize: 15,
 	color: 'rgb(115,115,115)'
  },
  textStyle: {
    fontFamily: 'SFProText-Light',
    color: 'rgb(115,115,115)',
    fontSize: 12
  },
  // input:{
  //   fontFamily: 'SFProText-Light',
  //   height: 40,
  //   width: windowSize.width * .85,
  //   color: 'rgb(115,115,115)',
  //   fontSize: 13
  //   //paddingHorizontal: 10
  // },
  input:{
    fontFamily: 'SFProText-Light',
    height: 37,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    //marginLeft: 10
    //paddingHorizontal: 10
  },
  inputBackground: {
    marginTop: 10,
    height: 37,
    width: windowSize.width * .85,
    backgroundColor: 'rgba(106,46,52,0.1)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  input4Bio: {
  	fontFamily: 'SFProText-Light',
    height: 60,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingLeft: 10,
  },
  inputBackground4Bio: {
  	marginTop: 10,
    height: 60,
    width: windowSize.width * .85,
    backgroundColor: 'rgba(106,46,52,0.1)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  saveButtonCont: {
  	//width: 75,
  	marginRight: 14,
  	backgroundColor: '#47101E',
  	borderRadius: 8,
  	// paddingLeft: 1,
  	// paddingRight: 1,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingHorizontal: 25,
  	//position: 'absolute'
  	//paddingBottom: 8
  },
  saveTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
    // fontWeight: '300',
  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    initials: state.auth.initials,
    headline: state.auth.headline,
    website: state.auth.website,
    location: state.auth.location,
    bio: state.auth.bio,
    //user: state.auth.user,
  }
}

export default connect(mapStateToProps, {emailChanged, firstnameChanged, lastnameChanged, initialsChanged, headlineChanged, websiteChanged, locationChanged, bioChanged})(profilemodal)

//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>
