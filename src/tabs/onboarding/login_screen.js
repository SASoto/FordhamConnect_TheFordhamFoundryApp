import React, {Component} from 'react';
import {Keyboard, Dimensions, Text, TextInput, View, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import {SkypeIndicator} from 'react-native-indicators';

import TextInputUnderline from '../../components/TextInputUnderline';
import ButtonRounded from '../../components/ButtonRounded';
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
    this.props.loginUser({ email, password })
    console.log("THE USER EMAIL: ", this.props.email)
    //console.log("THE USER firstname: ", this.props.firstname)
  }

  // Sends a password reset email to the user via Firebase
  onResetPress(){
    var auth = firebase.auth()
    const {email} = this.props
    var emailAddress = email

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
      alert('An email with a password reset link has been sent to your email address.')
    }).catch(function(error) {
      // An error happened.
      alert(error)
    });
  }
  // Checks if loggedIn value has changed to true
  checkFlag() {
    if(this.props.loggedIn === null) {
      setTimeout(this.checkFlag.bind(this), 1000)
    }
    else {
      this.props.navigation.navigate("SignedIn")
    //   const resetAction = NavigationActions.reset({
    //     index:0,
    //     actions: [
    //       NavigationActions.navigate("SignedIn")
    //     ]
    //   })
    //   this.props.navigation.dispatch(resetAction)
     }
  }

  // Checks if loading value has changed to true
  // If so, check for change in loggedIn value
  checkStuff() {
    if(this.props.loading === true) {
      // console.log("IS THE USER LOADING? ",this.props.loading)
      
      {this.checkFlag()}
        return (
          <View style={styles.loadingOverlay}>
            <SkypeIndicator color='white' size={35}/>
          </View>
        )
    }
  }

  renderErrorMess() {
    if(this.props.loading === false && this.props.loggedIn === false)
    {
      return (
        <Text style = {styles.errorTextStyle}> 
        {this.props.error}
        </Text>
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
        <View alignItems="center">
          <TitleFordhamConnect marginTop={(windowSize.width*3/10)}/>
          <View style={styles.signInCont}>
            <Text style={styles.signInTxt}>SIGN IN</Text>
          </View>
        <View marginTop={(windowSize.height * 2/10)*.75}>
          <View>
          <TextInputUnderline fieldName="EMAIL" passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
          </View>
          <View marginTop={25}>
          <View>
            <View backgroundColor="transparent"><Text style={styles.passTxtStyle}>PASSWORD</Text></View>
               <View flexDirection="row" justifyContent="space-between">
                <TextInput
                  style = {styles.passInputStyle}
                  secureTextEntry={true}
                  autoCapitalize = 'none'
                  autoCorrect = {false}
                  onChangeText= {this.onPasswordChange.bind(this)}
                  value = {this.props.password}
                />
                <TouchableOpacity onPress={this.onResetPress.bind(this)}>
                  <Text style={styles.forgotPassTxtStyle}>forgot?</Text>
                </TouchableOpacity>
              </View>
              <View borderBottomWidth={1} borderColor="#979797"/>
            </View>
          </View>
        </View>
        <View marginTop={(windowSize.height * 1/10)/2}>
          <ButtonRounded width={windowSize.width*.85} fillWithColor='#007AFF' onPress={this.onLoginPress.bind(this)}>SIGN IN</ButtonRounded>
        </View>
        <View marginTop={(windowSize.height * 1/10)/2}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
              <Text style={styles.createAcc}>
                First time user?
              </Text>
           </TouchableOpacity>
        </View>
        
        </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
        {this.renderErrorMess()}
        {this.checkStuff()}
        </View>
    );
  }
}

const styles = ({
  signInCont: {
    marginTop: 20,
    alignItems: "center"
  },
  signInTxt: {
    color: 'white',
    backgroundColor: 'transparent', 
  },
  createAcc: {
    fontFamily: 'SFProText-Regular',
    color: 'white',
    fontWeight: '300',
    fontSize: 15
  },
  passTxtStyle: {
    fontFamily: 'SFProText-Regular',
    color: 'white',
    fontWeight: '300',
    fontSize: 13
  },
  passInputStyle:{
    fontFamily: 'SFProText-Regular',
    height: 40,
    width: windowSize.width * .65,
    color: 'white',
    fontSize: 16
    //paddingHorizontal: 10
  },
  forgotPassTxtStyle: {
    fontFamily: 'SFProText-Regular',
    color: 'white',
    fontSize: 13,
    paddingTop: 10
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
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(login_screen)
