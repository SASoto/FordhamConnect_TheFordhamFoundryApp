/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Alert, Text, View, ScrollView, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {headlineChanged, locationChanged, bioChanged, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TextInputUnderline from '../../components/TextInputUnderline';
import FilledTextInput from '../../components/FilledTextInput';
import ButtonRounded from '../../components/ButtonRounded';
import ButtonOutline from '../../components/ButtonOutline';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window');

class extrainfo_screen extends Component {
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

    onHeadlineChange(text){
        this.props.headlineChanged(text)
    }

    onLocationChange(text){
        this.props.locationChanged(text)
    }

    onBioChange(text){
        this.props.bioChanged(text)
    }

    onNewHere() {
        const {email, password, confirm, firstname, lastname, headline, location, bio} = this.props
        console.log("In onNewHere email is " + email + ", password is " + password + ", firstname is " + firstname + ", headline is " + headline + ", location is " + location + ", bio is " + bio)
        this.props.newUser({email: email || '', password: password || '', confirm: confirm || '', firstname: firstname || '', lastname: lastname || '', headline: headline || '', location: location || '', bio: bio || '' })
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
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <View alignItems="center">
            <TitleFordhamConnect marginTop={(windowSize.height * 1/10)}/>
            <View style={styles.signUpCont}>
                <Text style={styles.signUpTxt}>SIGN UP</Text>
            </View>
            <View marginTop={(windowSize.height * 1/10)}>
                <View>
                    <View>
                      <View backgroundColor="transparent"><Text style={styles.textStyle}>PERSONAL HEADLINE</Text></View>
                        <View style={styles.inputBackground}>
                        <TextInput
                          style = {styles.input}
                          value = {null}                    
                          autoCapitalize = 'none'
                          autoCorrect = {false}
                          editable={true}           
                          onChangeText={this.onHeadlineChange.bind(this)}
                          passedVal={this.props.headline}               
                          placeholder="ex. FCRH ’15 or Gabelli ‘87"
                          placeholderTextColor="rgba(216,214,214,0.3)"                            
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
                          value = {null}                    
                          autoCapitalize = 'none'
                          autoCorrect = {false}
                          editable={true}      
                          onChangeText={this.onLocationChange.bind(this)}
                          passedVal={this.props.location}                      
                          placeholder="ex. Greater New York City Area"
                          placeholderTextColor="rgba(216,214,214,0.3)"                            
                        />
                        </View>
                    </View>
                </View>
            </View>
            <View marginTop={(windowSize.height * 2/10)} alignItems='center'>
                <View>
                    <Text style={{fontSize: 12, fontFamily: 'SFProText-Light', color:'rgb(155,155,155)'}}>optional fields</Text> 
                </View>
                <View marginTop={10}>
                    <ButtonOutline width={windowSize.width*.85} fillWithColor={'#007AFF'} onPress={this.onNewHere.bind(this)}>SIGN UP</ButtonOutline>
                </View>
            </View>
            <View marginTop={20}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.signUpAccTxt}>
                    Cancel
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View backgroundColor="transparent" height={250}/>
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
        marginTop: -5,
        alignItems: "center",
    },
    signUpTxt: {
        color: 'rgb(255,255,255)',
        //backgroundColor: 'transparent',
        fontSize: 12,
        fontFamily: 'SFProText-Light',
    },
    signUpAccTxt: {
    fontFamily: 'SFProText-Regular',
    color: 'rgb(255,255,255)',
    fontWeight: '300',
    fontSize: 12
    },
    textStyle: {
        fontFamily: 'SFProText-Light',
        color: 'rgb(255,255,255)',
        fontSize: 12
    },
    input:{
        fontFamily: 'SFProText-Light',
        height: 37,
        width: windowSize.width * .85,
        color: 'rgb(255,255,255)',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 8,
        //marginLeft: 10
        //paddingHorizontal: 10
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
    input4Bio: {
        fontFamily: 'SFProText-Light',
        height: 100,
        width: windowSize.width * .85,
        color: 'rgb(255,255,255)',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 8,
    },
    inputBackground4Bio: {
        marginTop: 10,
        height: 100,
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
    headline: state.auth.headline,
    bio: state.auth.bio,
    location: state.auth.location,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{headlineChanged, locationChanged, bioChanged, newUser})(extrainfo_screen)