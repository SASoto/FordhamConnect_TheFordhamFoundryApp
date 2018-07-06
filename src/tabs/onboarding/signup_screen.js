/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Alert, Text, View, ScrollView, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {emailChanged, passwordChanged, confirmChanged, firstnameChanged, lastnameChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TextInputUnderline from '../../components/TextInputUnderline';
import FilledTextInput from '../../components/FilledTextInput';
import ButtonRounded from '../../components/ButtonRounded';
import ButtonOutline from '../../components/ButtonOutline';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window');

class signup_screen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            validEmail: null,

            validPassword: null,
            password: null,
            passwordCopy: null,
            passwordsMatch: null,

            cantSignUp: true
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

    onPasswordChange(text){
        this.props.passwordChanged(text)
    }

    onConfirmChange(text){
        this.props.confirmChanged(text)
    }

    onNewHere() {
        const {email, password, confirm, firstname, lastname} = this.props
        //console.log("In onNewHere email is " + email + ", password is " + password + ", firstname is " + firstname + ", headline is " + headline + ", location is " + location + ", bio is " + bio)
        this.props.newUser({email: email || '', password: password || '', confirm: confirm || '', firstname: firstname || '', lastname: lastname || ''})
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
        if(this.props.loading && this.props.navigation.state.key == 'SignUp') {
          {this.checkFlag()}
        }
    }

    render() {
    return (
      <View flex={1}>
        <ImageBackground
            resizeMode='cover'
            style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}

              source={require('../../../Images/background_splash.jpg')}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView flex={1} top={0} bottom={0} showsVerticalScrollIndicator={false}>
            <View alignItems="center">
            <TitleFordhamConnect marginTop={(windowSize.height * 1/10) * 1.5}/>
            <View style={styles.signUpCont}>
                <Text style={styles.signUpTxt}>SIGN UP</Text>
            </View>
            <View marginTop={50}>
                <View>
                  <FilledTextInput fieldName="FORDHAM EMAIL*" fillColor="rgba(106,46,52,0.68)" fontSize={12} passedFunc={this.onEmailChange.bind(this)} passedVal={this.props.email}/>
                </View>
                <View marginTop={15}>
                  <FilledTextInput fieldName="FIRST NAME*" fillColor="rgba(106,46,52,0.68)" fontSize={12} passedFunc={this.onFirstNameChange.bind(this)} passedVal={this.props.firstname}/>
                </View>
                <View marginTop={15}>
                  <FilledTextInput fieldName="LAST NAME*" fillColor="rgba(106,46,52,0.68)" fontSize={12} passedFunc={this.onLastNameChange.bind(this)} passedVal={this.props.lastname}/>
                </View>
                <View marginTop={15}>
                  <FilledTextInput fieldName="PASSWORD*" fillColor="rgba(106,46,52,0.68)" fontSize={12} secureTextEntry={true} passedFunc={this.onPasswordChange.bind(this)} passedVal={this.props.password}/>
                </View>
                <View marginTop={7}>
                    <Text style={styles.passMessageStyle}>*password must be at least 8 characters long</Text>
                </View>
                <View marginTop={10}>
                    <FilledTextInput fieldName="CONFIRM PASSWORD*" fillColor="rgba(106,46,52,0.68)" fontSize={12} secureTextEntry={true} passedFunc={this.onConfirmChange.bind(this)} passedVal={this.props.confirm}/>
                </View>
            </View>
            <View marginTop={26}>
              <ButtonOutline width={windowSize.width*.85} fillWithColor={'#007AFF'} onPress={this.onNewHere.bind(this)}>SIGNUP</ButtonOutline>
            </View>
            <View marginTop={20}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={styles.signUpAccTxt}>I already have an account</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View backgroundColor="transparent" height={200}/>
        <View backgroundColor="transparent" height={200}/>
        <View backgroundColor="transparent" height={200}/>
        </ScrollView>
        </TouchableWithoutFeedback>
        </ImageBackground>
        {this.checkStuff()}
      </View>
    );
    }
}

const styles = StyleSheet.create({
    signUpCont: {
        marginTop: -12,
        alignItems: "center",
    },
    signUpTxt: {
        color: 'rgb(255,255,255)',
        fontSize: 12,
        fontFamily: 'SFProText-Light',
    },
    signUpAccTxt: {
    fontFamily: 'SFProText-Regular',
    color: 'rgb(255,255,255)',
    fontWeight: '300',
    fontSize: 12
    },
    passMessageStyle: {
        fontFamily: 'SFProText-Light',
        fontSize: 12,
        color: 'rgb(155,155,155)'
    },
    disabledSignUp: {
        borderWidth: 2,
        borderColor: 'black'
    }

});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    confirm: state.auth.confirm,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, confirmChanged, firstnameChanged, lastnameChanged, loginUser, loggedInUser, newUser})(signup_screen)
