import React, {Component} from 'react';
import {Alert, Keyboard, Dimensions, Text, TextInput, View, ScrollView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

// import {SkypeIndicator} from 'react-native-indicators';

// import TextInputUnderline from '../../components/TextInputUnderline';
import FilledTextInput from '../../components/FilledTextInput';
import ButtonRounded from '../../components/ButtonRounded';
import ButtonOutline from '../../components/ButtonOutline';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';
// import {Button, Spinner} from '../../Components/Common';
// import ViewContainer from '../../Components/Common/ViewContainer';

const windowSize = Dimensions.get('window');
class forgotpassword_screen extends Component {
  constructor(props) {
    super(props)
  }

  onEmailChange(text){
    this.props.emailChanged(text)
  }

  // Sends a password reset email to the user via Firebase
  onResetPress(){
    var auth = firebase.auth()
    const {email} = this.props
    var emailAddress = email

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
      //alert('An email with a password reset link has been sent to your email address.')
      Alert.alert(
          'Help is on the way!',
          "An email with a password reset link has been sent to your email address, " + emailAddress,
          [
            {text: 'OK'},
          ],
        )
    }).catch(function(error) {
      // An error happened.
      alert(error)
    });
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
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <View alignItems="center">
            <TitleFordhamConnect marginTop={(windowSize.height * 2/10)}/>
            <View marginTop={(windowSize.height * 1/10)}>
              <Text style={styles.forgotPassTxtStyle}>FORGOT YOUR PASSWORD?</Text>
            </View>
            <View width={221} marginTop={16}>
              <Text style={styles.enterTxtStyle}>Enter your email below to receive your password reset instructions.</Text>
            </View>
            <View marginTop={10}>
              <FilledTextInput fillColor="rgba(106,46,52,0.68)" passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
            </View>
            <View marginTop={20}>
              <ButtonOutline width={windowSize.width*.85} onPress={this.onResetPress.bind(this)}>SEND RESET</ButtonOutline>
            </View>
            <View marginTop={25}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.goBackTxtStyle}>Back to sign in</Text>
               </TouchableOpacity>
            </View>
          </View>
        <View backgroundColor="transparent" height={200}/>
        </ScrollView>
        </TouchableWithoutFeedback>
        </ImageBackground>
        {this.renderErrorMess()}
        
        </View>
    );
  }
}

const styles = ({
  signInCont: {
    marginTop: 17,
    alignItems: "center",
  },
  signInTxt: {
    color: 'rgb(255,255,255)',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontFamily: 'SFProText-Light',
  },
  enterTxtStyle: {
    fontFamily: 'SFProText-Light',
    color: 'rgb(255,255,255)',
    fontSize: 14
  },
  goBackTxtStyle: {
    fontFamily: 'SFProText-Regular',
    color: 'rgb(255,255,255)',
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
    paddingLeft: 10,
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
    fontFamily: 'SFProText-Medium',
    color: 'rgb(255,255,255)',
    fontSize: 16,
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

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(forgotpassword_screen)
