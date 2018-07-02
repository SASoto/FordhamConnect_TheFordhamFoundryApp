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

    // // Checks when a user has successfuly signed up and allows 
    // // for transition to the rest of the app
    // componentWillMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //       if(user) {
    //         this.props.loggedInUser();
    //       }
    //     });
    // }

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

    // onNewHere() {
    //     const {email, password, confirm, firstname, lastname} = this.props
    //     this.props.newUser({email: email || '', password: password || '', confirm: confirm || '', firstname: firstname || '', lastname: lastname || '',})
    // }

    // checkFlag() {
    //     if(this.props.loggedIn === null) {
    //       setTimeout(this.checkFlag.bind(this), 1000)
    //     }
    //     else {
    //       this.props.navigation.navigate("SignedIn")
    //      }
    // }

    // checkIfFordhamEmail(email) {
    //     // var tempEmailArr = email.split('');
    //     // console.log("EMAIL IS: ", email)
    //     // console.log("AFTER SPLICE: ", tempEmailArr.splice((tempEmailArr.length - 12),tempEmailArr.length - 1))
    //     // var fordhamSignArr = tempEmailArr.splice((tempEmailArr.length - 12),tempEmailArr.length - 1)
    //     var fordhamSign = email.substring(email.length-12, email.length);

    //     console.log("NEWLY JOINED: ",fordhamSign);

    //     if(fordhamSign == '@fordham.edu') {
    //         return true
    //     }

    //     return false
    // }

    // verifyEmail(email) {
    //     // this.setState({validEmail: null})
    //     console.log("EMAIL IS: ", email)
    //     // don't remember from where i copied this code, but this works.
    //     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //     var isFordhamEmail = this.checkIfFordhamEmail(email);

    //     if (re.test(email) && isFordhamEmail) {
    //         // this is a valid email address
    //         // call setState({email: email}) to update the email
    //         // or update the data in redux store.
    //         this.setState({validEmail: true});
    //         this.onEmailChange.bind(this);
    //     }
    //     else {
    //         // invalid email, maybe show an error to the user.
    //         this.setState({validEmail: false})
    //         this.setState({cantSignUp: true})
    //     }

    // }

    // verifyPassword() {
    //     // this.setState({validPassword: null});
    //     //console.log("PASSWORD IS: ", password);

    //     // CHECK THAT PASSWORD IS VALID
    //     // IF TRUE
    //     // if(password.length > 6) {
    //     //     this.setState({validPassword: true})
    //     //     this.setState({password: password})
    //     // } else {
    //     // // IF FALSE
    //     //     this.setState({validPassword: false});
    //     //     this.setState({cantSignUp: true})
    //     // }
    // }

    // // checkPasswordsMatch(text) {
    // //     // this.setState({passwordsMatch: false});
    // //     this.setState({passwordCopy: text})
    // //     //setTimeout(() => {console.log("THE PASSWORD COPY IS: ", this.state.passwordCopy)},500);
    // //     console.log("FIRST: ",this.state.password);
    // //     console.log("SECOND: ",this.state.passwordCopy);
    // //     if((this.state.password == this.state.passwordCopy) && this.state.validPassword) {
    // //         //console.log("THE PASSWORD COPY IS: ", this.state.passwordCopy)
    // //         this.setState({passwordsMatch: true});
    // //     } else {
    // //         this.setState({passwordsMatch: false});
    // //     }
    // // }

    // checkStuff() {
    //     if(this.props.loading) {
    //       {this.checkFlag()}
    //     }
    // }

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
                <View marginTop={2}>
                    <Text style={styles.passMessageStyle}>*password must be at least 8 characters long*</Text>
                </View>
                <View marginTop={13}>
                    <FilledTextInput fieldName="CONFIRM PASSWORD*" fillColor="rgba(106,46,52,0.68)" fontSize={12} secureTextEntry={true} passedFunc={this.onConfirmChange.bind(this)} passedVal={this.props.confirm}/>
                </View>
            </View>
            <View marginTop={26}>
              <ButtonOutline width={windowSize.width*.85} fillWithColor={'#007AFF'} onPress={() => this.props.navigation.navigate('ExtraInfo')}>CONTINUE</ButtonOutline>
            </View>
            <View marginTop={20}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.signUpAccTxt}>
                    Back to sign in
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View backgroundColor="transparent" height={200}/>
        </ScrollView>
        </TouchableWithoutFeedback>
        </ImageBackground>
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
