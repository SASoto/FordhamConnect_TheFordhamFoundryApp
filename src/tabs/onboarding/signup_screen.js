/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Text, View, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {emailChanged, passwordChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TextInputUnderline from '../../components/TextInputUnderline';
import ButtonRounded from '../../components/ButtonRounded';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window');

class signup_screen extends Component {
    // Checks when a user has successfuly signed up and allows 
    // for transition to the rest of the app
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.props.loggedInUser();
          }
        });
    }

    onEmailChange(text){
        this.props.emailChanged(text)
    }

    onPasswordChange(text){
        this.props.passwordChanged(text)
    }

    onNewHere() {
        const {email, password} = this.props
        this.props.newUser({email: email || '', password: password || ''})
    }

    checkFlag() {
        if(this.props.loggedIn === null) {
          setTimeout(this.checkFlag.bind(this), 1000)
        }
        else {
          this.props.navigation.navigate("SignedIn")
         }
    }

    checkStuff() {
        if(this.props.loading) {
          {this.checkFlag()}
        }
    }

    render() {
    return (
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
        <View style={styles.signUpCont}>
            <Text style={styles.signUpTxt}>NEW USER</Text>
          </View>
        <View marginTop={(windowSize.height * 2/10) * .1}>
            <View>
              <TextInputUnderline fieldName="FORDHAM EMAIL" fontSize={11} passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
            </View>
            <View marginTop={15}>
              <TextInputUnderline fieldName="FIRST NAME" fontSize={11} passedFunc={()=>console.log("HELLO FIRST NAME")}/>
            </View>
            <View marginTop={15}>
              <TextInputUnderline fieldName="LAST NAME" fontSize={11} passedFunc={()=>console.log("HELLO LAST NAME")}/>
            </View>
            <View marginTop={15}>
              <TextInputUnderline fieldName="PASSWORD" fontSize={11} secureTextEntry={true} passedFunc={this.onPasswordChange.bind(this)} passedVal={this.props.password}/>
            </View>
            <View marginTop={15}>
              <TextInputUnderline fieldName="CONFIRM PASSWORD*" fontSize={11} secureTextEntry={true} passedFunc={()=>console.log("HELLO CONFIRM PASSWORD")}/>
            </View>
        </View>
        <View marginTop={(windowSize.height * 1/10) * .3}>
          <ButtonRounded width={windowSize.width*.85} fillWithColor='#55B5FF' onPress={this.onNewHere.bind(this)}>SIGN UP</ButtonRounded>
        </View>
        <View marginTop={(windowSize.height * 1/10)*.75}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.signUpAcc}>
                I already have a Fordham Connect account.
              </Text>
            </TouchableOpacity>
        </View>
        </View>

        </TouchableWithoutFeedback>
        </ImageBackground>
      {this.checkStuff()}
      </View>
    );
    }
}

const styles = StyleSheet.create({
    signUpCont: {
        marginTop: 20,
        alignItems: "center"
    },
    signUpTxt: {
        color: 'white',
        backgroundColor: 'transparent', 
    },
    signUpAcc: {
    fontFamily: 'HelveticaNeue-Thin',
    color: 'white',
    fontWeight: '300',
    fontSize: 15
    },
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

export default connect(mapStateToProps,{emailChanged, passwordChanged, loginUser, loggedInUser, newUser})(signup_screen)
