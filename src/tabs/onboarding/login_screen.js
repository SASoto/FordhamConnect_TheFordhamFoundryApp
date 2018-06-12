import React, {Component} from 'react';
import {Dimensions, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
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
        </View>
        </ImageBackground>
        {this.checkStuff()}
        {this.renderErrorMess()}
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
