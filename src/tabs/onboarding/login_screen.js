import React, {Component} from 'react';
import {Keyboard, Dimensions, Text, TextInput, View, ScrollView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {emailChanged, passwordChanged, firstnameChanged, lastnameChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import {MaterialIndicator} from 'react-native-indicators';

import TextInputUnderline from '../../components/TextInputUnderline';
import FilledTextInput from '../../components/FilledTextInput';
import ButtonRounded from '../../components/ButtonRounded';
import ButtonOutline from '../../components/ButtonOutline';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';
// import {Button, Spinner} from '../../Components/Common';
// import ViewContainer from '../../Components/Common/ViewContainer';

const windowSize = Dimensions.get('window');

class login_screen extends Component {
  constructor(props) {
    super(props)

    this.checkStuff = this.checkStuff.bind(this)
  }

  // Tracks change in email prop value
  onEmailChange(text){
    this.props.emailChanged(text)
  }

  // Tracks change in password prop value
  onPasswordChange(text){
    this.props.passwordChanged(text)
  }

   // Logs in user with current email and password prop value
  onLoginPress(){
    const {email, password} = this.props;
    this.props.loginUser({ email, password})
  }

  // componentDidMount() {
  //   this.checkStuff();
  // }
  // Sends a password reset email to the user via Firebase
  // onResetPress(){
  //   var auth = firebase.auth()
  //   const {email} = this.props
  //   var emailAddress = email

  //   auth.sendPasswordResetEmail(emailAddress).then(function() {
  //   // Email sent.
  //     alert('An email with a password reset link has been sent to your email address.')
  //   }).catch(function(error) {
  //     // An error happened.
  //     alert(error)
  //   });
  // }

  // Checks if loggedIn value has changed to true
  checkFlag() {
    if(this.props.loggedIn === null) {
      setTimeout(this.checkFlag.bind(this), 1000)
    }
    else if (this.props.loggedIn === true) { //if loggedin is true
      if(this.props.loading === true) {
        setTimeout(this.checkFlag.bind(this), 1000)
      } else {
        this.props.navigation.navigate("SignedIn");
      }
    }
    else {
      //If props.loggedin is false
    }
  }

  // Checks if loading value has changed to true
  // If so, check for change in loggedIn value
  checkStuff() {
    if(this.props.loading === true) {
      {this.checkFlag()}
      return (
        <View style={styles.loadingOverlay}>
          <MaterialIndicator color='white' size={35}/>
        </View>
      )
    }
  }

  render(){
    return(
      <View flex={1}>
        <ImageBackground
          resizeMode='cover'
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}

          source={require('../../../Images/background_splash.jpg')}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView flex={1} top={0} bottom={0} showsVerticalScrollIndicator={false}>
        <View alignItems="center">
          <TitleFordhamConnect marginTop={(windowSize.height * 1/10) * 1.5}/>
          <View style={styles.signInCont}>
            <Text style={styles.signInTxt}>SIGN IN</Text>
          </View>
        <View marginTop={(windowSize.height * 2/10)}>
          <View>
          <FilledTextInput fieldName="FORDHAM EMAIL*" fillColor="rgba(106,46,52,0.68)" passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
          </View>
          <View marginTop={13}>
          
            <View flexDirection="row" justifyContent="space-between">
              <View backgroundColor="transparent">
                <Text style={styles.passTxtStyle}>PASSWORD*</Text>
              </View>
              <View justifyContent="center">  
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPass')}>             
                <Text style={styles.forgotPassTxtStyle}>Forgot?</Text>
              </TouchableOpacity>
              </View>
            </View>
              <View style={styles.inputBackground}>
                <TextInput
                  style = {styles.passInputStyle}
                  secureTextEntry={true}
                  autoCapitalize = 'none'
                  autoCorrect = {false}
                  onChangeText= {this.onPasswordChange.bind(this)}
                  value = {this.props.password}
                />
              </View>
            </View>
          
        </View>
        <View marginTop={23}>
          <ButtonOutline width={windowSize.width*.85} onPress={this.onLoginPress.bind(this)}>SIGN IN</ButtonOutline>
        </View>
        <View marginTop={23}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
              <Text style={styles.createAcc}>
                First time user?
              </Text>
           </TouchableOpacity>
        </View>
        
        </View>
        <View backgroundColor="transparent" height={200}/>
        </ScrollView>
        </TouchableWithoutFeedback>
        </ImageBackground>
        {this.checkStuff()}
        </View>
    );
  }
}
//#6A2E34

const styles = ({
  signInCont: {
    marginTop: -12,
    alignItems: "center",
  },
  signInTxt: {
    color: 'rgb(255,255,255)',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'SFProText-Light',
  },
  createAcc: {
    fontFamily: 'SFProText-Regular',
    color: 'rgb(255,255,255)',
    //fontWeight: '300',
    fontSize: 12
  },
  passTxtStyle: {
    fontFamily: 'SFProText-Light',
    color: 'rgb(255,255,255)',
    fontWeight: '300',
    fontSize: 13
  },
  passInputStyle:{
    fontFamily: 'SFProText-Light',
    height: 37,
    width: windowSize.width * .85,
    color: 'rgb(255,255,255)',
    fontSize: 16,
    // backgroundColor: 'rgba(106,46,52,0.68)',
    padding: 8,
  },
  inputBackground: {
    marginTop: 10,
    height: 37,
    width: windowSize.width * .85,
    backgroundColor: 'rgba(106,46,52,0.68)',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.17)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  forgotPassTxtStyle: {
    fontFamily: 'SFProText-Regular',
    color: 'rgb(255,255,255)',
    fontSize: 11,
    //
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
    //backgroundColor: 'grey'
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    email: state.auth.email,
    password: state.auth.password,
    // initials: state.auth.initials,
    // headline: state.auth.headline,
    // website: state.auth.website,
    // location: state.auth.location,
    // bio: state.auth.bio,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(login_screen)
