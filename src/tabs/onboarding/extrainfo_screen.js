/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Alert, Text, View, ScrollView, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {newUser} from '../../Actions';
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

    onNewHere() {
        const {email, password, confirm, firstname, lastname} = this.props
        this.props.newUser({email: email || '', password: password || '', confirm: confirm || '', firstname: firstname || '', lastname: lastname || '',})
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
            <TitleFordhamConnect marginTop={(windowSize.width*1/10)}/>
            <View style={styles.signUpCont}>
                <Text style={styles.signUpTxt}>SIGN UP</Text>
            </View>
            <View marginTop={40}>
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
                          placeholder="ex. FCRH ’15 or Gabelli ‘87"
                          placeholderTextColor="lightgrey"                            
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
                          placeholder="ex. Greater New York City Area"
                          placeholderTextColor="lightgrey"                            
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
                          value = {null}                    
                          autoCapitalize = 'none'
                          autoCorrect = {false}
                          editable={true}
                          multiline={true}
                          placeholder="ex. Tell use about your work experience, association with the Fordham Foundry, or anything relevant to your education or career!"
                          placeholderTextColor="lightgrey"                            
                        />
                        </View>
                    </View>                     
                </View>
            </View>
            <View marginTop={26} alignItems='center'>
                <View>
                    <Text style={{fontSize: 12, fontFamily: 'SFProText-Light', color:'rgb(155,155,155)'}}>optional fields</Text> 
                </View>
                <View marginTop={10}>
                    <ButtonOutline width={windowSize.width*.85} fillWithColor={'#007AFF'} onPress={() => this.onNewHere.bind(this)}>SIGN UP</ButtonOutline>
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
        paddingLeft: 10,
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
        paddingLeft: 10,
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
    // headline: state.auth.headline,
    bio: state.auth.bio,
    // location: state.auth.headline,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{newUser})(extrainfo_screen)
