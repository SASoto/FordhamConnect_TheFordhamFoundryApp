import React, {Component} from 'react';
import {Keyboard, Dimensions, Text, View, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import TextInputUnderline from '../../components/TextInputUnderline';
import ButtonRounded from '../../components/ButtonRounded';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';
// import {Button, Spinner} from '../../Components/Common';
// import ViewContainer from '../../Components/Common/ViewContainer';

const windowSize = Dimensions.get('window');

class login_screen extends Component {

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
    const {email, password} = this.props
    this.props.loginUser({ email, password })
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
      {this.checkFlag()}
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
          style={{
            flex: 1,
            //resizeMode,
            position: 'absolute',
            width: '100%',
            height: '100%',
            //alignItems: 'center',
          }}

          source={require('../../../Images/background_splash.jpg')}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View alignItems="center">
          <TitleFordhamConnect marginTop={(windowSize.width*1/10)}/>
          <View style={styles.signInCont}>
            <Text style={styles.signInTxt}>SIGN IN</Text>
          </View>
        <View marginTop={(windowSize.height * 2/10)*.75}>
          <View>
          <TextInputUnderline fieldName="EMAIL" passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
          </View>
          <View marginTop={25}>
          <TextInputUnderline fieldName="PASSWORD" secureTextEntry={true} passedFunc={this.onPasswordChange.bind(this)} passedVal={this.props.password}/>
          </View>
        </View>
        <View marginTop={windowSize.height * 1/10}>
          <ButtonRounded width={windowSize.width*.85} fillWithColor='#55B5FF' onPress={this.onLoginPress.bind(this)}>SIGN IN</ButtonRounded>
        </View>
        <View marginTop={windowSize.height * 1/10}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.createAcc}>
                I do not have a Fordham Connect account.
              </Text>
           </TouchableOpacity>
        </View>
        <View marginTop={windowSize.height * 1/10}>
          <ButtonRounded width={windowSize.width*.5} fillWithColor='#55B5FF' onPress={this.onResetPress.bind(this)}>
              FORGOT PASSWORD
          </ButtonRounded>
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
    fontFamily: 'HelveticaNeue-Thin',
    color: 'white',
    fontWeight: '300',
    fontSize: 15
  }
})

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(login_screen)
