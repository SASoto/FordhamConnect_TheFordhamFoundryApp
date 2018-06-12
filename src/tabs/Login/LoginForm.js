import React,{Component} from 'react';
import { AsyncStorage } from "react-native";
import {Text, View, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, Spinner} from '../../Components/Common';
import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';

import {createRootNavigator} from '../Router';

class LoginForm extends Component{
  constructor(testkey) {
    super()
    this.testkey= testkey;
  }

  onEmailChange(text){
    this.props.emailChanged(text)
  }

  onPasswordChange(text){
    this.props.passwordChanged(text)
  }

  onButtonPress(){
    const {email, password} = this.props
    this.props.loginUser({ email, password })
    //console.log("WTF")
    if(this.props.loggedIn)
      {this.props.testkey}
  }

  onNewHere() {
    const {email, password} = this.props
    this.props.newUser({email: email || '', password: password || ''})
  }
  //else return?
  renderButton(){
    if(this.props.loading){
      return (<Spinner size="large"/>)
    }
    else {
    return (
      <View alignItems = "center">
      <Button onPress={this.onButtonPress.bind(this)}>
         Login     
      </Button>
      </View>
    )}
  }

  renderErrorMess() {
    if(this.props.loading === false)
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
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <View style = {styles.container}>
    <TouchableOpacity onPress={() => this.props.gobackkey.goBack()}>
      <Text>Back</Text>
    </TouchableOpacity>
      <View style = {styles.logoContainer}>
          <Image
            style = {styles.logo}
            source = {require('../../../Images/logo.png')}
          />
          <Text style = {styles.quote}>
            Fordham University's Business Incubator
          </Text>
      </View>

      <KeyboardAvoidingView
        style = {styles.emailContainer}
        behavior = 'padding'>

        <TextInput 
          style = {styles.input}
          autoCapitalize = 'none'
          autoCorrect = {false}
          onChangeText = {this.onEmailChange.bind(this)}
          placeholder = "user@example.com"
          placeholderTextColor = 'rgba(0,0,0,0.6)'
          value = {this.props.email}
        />

        <TextInput
          style = {styles.input}
          autoCapitalize = 'none'
         //autoCorrect = 'false'
          secureTextEntry
          onChangeText = {this.onPasswordChange.bind(this)}
          placeholder = "********"
          placeholderTextColor = 'rgba(0,0,0,0.6)'
          value = {this.props.password}
        />

        {this.renderErrorMess()}

        {this.renderButton()}
        
        <Button onPress = {this.onNewHere.bind(this)}>
          Sign Up
        </Button> 
      </KeyboardAvoidingView>
    </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = ({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emailContainer:{
    padding:10,
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  logo:{
    height: 200,
    width: 200,
  },
  sign: {
    fontFamily: 'GillSans-Light',
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    fontWeight: '400'
  },
  quote:{
    fontFamily : 'GillSans-Light', 
    fontSize: 15,
    marginTop: 2,
    width:350, 
    textAlign: 'center'
  },
  input:{
    fontFamily: 'GillSans-Light',
    height: 40,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  errorTextStyle:{
    fontSize:15,
    alignSelf:'center',
    color:'red',

  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, newUser})(LoginForm)