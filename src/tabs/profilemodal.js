import React, {Component} from 'react';
import {Dimensions, Keyboard, Modal, View, Image, ScrollView, ImageBackground, Button, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Linking} from 'react-native';
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
	}

	onEmailChange(text){
        this.props.emailChanged(text)
    }

    onFirstNameChange(text){
        this.props.firstnameChanged(text)
    }

    onLastNameChange(text){
		this.props.lastnameChanged(text)
    }

    onInitialsChange(text) {
    	this.props.initialsChanged(text)
    }

    onHeadlineChange(text){
        this.props.headlineChanged(text)
    }

    onWebsiteChange(text){
        this.props.websiteChanged(text)
    }

    onLocationChange(text){
        this.props.locationChanged(text)
    }

    onBioChange(text){
        this.props.bioChanged(text)
    }

	componentDidMount() {
		console.log("componentWillMount is running from profilemodal!")
		this.setState({tempEmail: this.props.email, tempFirstName: this.props.firstname, tempLastName: this.props.lastname, tempInitials: this.props.initials, tempHeadline: this.props.headline, tempWebsite: this.props.website, tempLocation: this.props.location, tempBio: this.props.bio})   
    }

    resetProfileModal() {
    	console.log("resetProfileModal was run!!")
    	this.setState({tempEmail: this.props.email, tempFirstName: this.props.firstname, tempLastName: this.props.lastname, tempInitials: this.props.initials, tempHeadline: this.props.headline, tempWebsite: this.props.website, tempLocation: this.props.location, tempBio: this.props.bio})
    	
    	this.props.modalFunc()
    }

    setNewProfileData() {
    	var userID = firebase.auth().currentUser.uid

    	firebase.database().ref('users/' + userID).set({
    		email: this.props.email,
    		firstname: this.state.tempFirstName[0].toUpperCase() + this.state.tempFirstName.slice(1),
    		lastname: this.state.tempLastName[0].toUpperCase() + this.state.tempLastName.slice(1),
    		initials: this.state.tempFirstName[0].toUpperCase() + this.state.tempLastName[0].toUpperCase(),
    		headline: this.state.tempHeadline,
    		website: this.state.tempWebsite,
    		location: this.state.tempLocation,
    		bio: this.state.tempBio,
  		})
  		.then(() => {
  			this.onFirstNameChange(this.state.tempFirstName[0].toUpperCase() + this.state.tempFirstName.slice(1))
  			this.onLastNameChange(this.state.tempLastName[0].toUpperCase() + this.state.tempLastName.slice(1))
  			this.onInitialsChange(this.state.tempFirstName[0].toUpperCase() + this.state.tempLastName[0].toUpperCase())
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
		                position: 'absolute',
		                width: '100%',
		                height: '100%',
	              	}}

	              	source={require('../../Images/plussilvergradient.png')}

	            >
								
				
					
					<View flex={1}>
						<ImageBackground
							resizeMode='cover'
							style={{
								height: Header.HEIGHT * 1.5
							}}

			              source={require('../../Images/positionedblur.png')}

						>
							<View flex={1} paddingTop={25} justifyContent="center">
								<View flexDirection="row" justifyContent="space-between">
									<TouchableOpacity justifyContent='center' onPress={this.resetProfileModal.bind(this)}>
										<View paddingLeft={30} justifyContent='center'>
											<MatIcon name="close" size={24} color="rgb(255,255,255)"/>
										</View>
									</TouchableOpacity>
									<View paddingRight={20} justifyContent='center'>
										<TouchableOpacity onPress={this.setNewProfileData.bind(this)}>
											<Text style={{fontFamily:"SFProText-Regular",fontSize:14, color:"rgb(255,255,255)"}}>Save</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</ImageBackground>
						<KeyboardAwareScrollView flex={1} bounces={false} scrollEnabled={true} extraScrollHeight={40} keyboardOpeningTime={200}>
						<ScrollView flex={1} scrollEnabled={false} showsVerticalScrollIndicator={false}>
						<View flex={1} alignItems="flex-start">
                        <View paddingTop={20} paddingLeft={28}>

                            <View flexDirection="row">
                            	<LinearGradient colors={['rgb(0,122,255)', 'rgb(85,181,255)']} style={styles.profPic}>
                                    <Text style={{fontFamily: 'SFProText-Light', fontSize: 18, color: 'rgb(255,255,255)'}}>{this.props.initials}</Text>
                                </LinearGradient>                           
                                <View marginLeft={16} justifyContent="center" width={150}>
                                    <Text style={styles.userNameStyle}>{this.props.firstname} {this.props.lastname}</Text>
                                </View>
                            </View>
						<View marginTop={20}>
							<View>
					          <View backgroundColor="transparent"><Text style={styles.textStyle}>FORDHAM EMAIL*</Text></View>
						        <View style={styles.inputBackground}>
						        	<View flexDirection="row" backgroundColor="transparent">
								        <TextInput
								          style = {styles.emailInput}				        
								          autoCapitalize = 'none'
								          value = {this.props.email}
								          autoCorrect = {false}
								          editable={false}
								        />
								        <View justifyContent="center" paddingBottom={3}>
								        	<Image style={{justifyContent: 'center', alignItems: 'center'}} source={require('../../Images/https_24px.png')}/>
								        </View>
								    </View>
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
						          maxLength={15}
						          onChangeText={(text) => this.setState({tempFirstName: text})}
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
						          maxLength={15}	
						          onChangeText={(text) => this.setState({tempLastName: text})}
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
						          maxLength={15}
						          onChangeText={(text) => this.setState({tempHeadline: text})}
						          placeholder="ex. FCRH '15 or Gabelli '87 (30 characters or less, please.)"			      				          
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
						          textContentType={URL}	
						          onChangeText={(text) => this.setState({tempWebsite: text})}
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
						          maxLength={40}
						          editable={true}			
						          onChangeText={(text) => this.setState({tempLocation: text})}     				          
						          placeholder="ex. Greater New York City Area (40 characters or less, please.)"
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
						          maxLength={600}
						          onChangeText={(text) => this.setState({tempBio: text})}	
						          placeholder="ex. Tell use about your work experience, association with the Fordham Foundry, or anything relevant to your education or career! (600 characters or less, please.)"      				          
						        />
						        </View>
					        </View>						
						</View>					
					</View>
					</View>
					</ScrollView>
					<View backgroundColor="transparent" height={500}/>
					</KeyboardAwareScrollView>
				</View>
				</ImageBackground>
				</View>
			</Modal>
			);
	}
}

const styles = ({
  profPic: {
  	width: 46,
  	height: 46,
  	borderRadius: 23,
  	justifyContent: 'center',
  	alignItems: 'center',
  	shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
        width: 0,height: 2
    },          
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  userNameStyle: {
 	fontFamily: 'SFProText-Regular',
 	fontSize: 13,
 	color: 'rgb(115,115,115)'
  },
  textStyle: {
    fontFamily: 'SFProText-Light',
    color: 'rgb(115,115,115)',
    fontSize: 12
  },
  emailInput: {
  	fontFamily: 'SFProText-Light',
    height: 37,
    //width: windowSize.width * .65,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    marginRight: 10
  },
  input:{
    fontFamily: 'SFProText-Light',
    height: 37,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  inputBackground: {
  	justifyContent: 'center',
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
    height: 90,
    width: windowSize.width * .85,
    color: 'rgb(115,115,115)',
    fontSize: 13,
    backgroundColor: 'transparent',
    //paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 11,
    lineHeight: 30
  },
  inputBackground4Bio: {
  	//justifyContent: 'center',
  	marginTop: 10,
    height: 100,
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
  	//marginRight: 14,
  	backgroundColor: '#47101E',
  	borderRadius: 8,
  	// paddingTop: 10,
  	// paddingBottom: 10,
  	paddingHorizontal: 25,
  },
  saveTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
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
  }
}

export default connect(mapStateToProps, {emailChanged, firstnameChanged, lastnameChanged, initialsChanged, headlineChanged, websiteChanged, locationChanged, bioChanged})(profilemodal)