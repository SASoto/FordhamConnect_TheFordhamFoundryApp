/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Alert, Text, View, ImageBackground, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import {emailChanged, passwordChanged, firstnameChanged, lastnameChanged, loginUser, loggedInUser, newUser} from '../../Actions';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TextInputUnderline from '../../components/TextInputUnderline';
import ButtonRounded from '../../components/ButtonRounded';
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

    onFirstNameChange(text){
        this.props.firstnameChanged(text)
    }

    onLastNameChange(text){
        this.props.lastnameChanged(text)
    }

    onPasswordChange(text){
        this.props.passwordChanged(text)
    }

    onNewHere() {
        const {email, password, firstname, lastname} = this.props
        //CHECK THAT VALID EMAIL AND VALID PASSWORD, ELSE SHOW ALERT MESSAGE OR ERROR MESSAGE
        //ADDITIONAL CODE HERE
        this.props.newUser({email: email || '', password: password || '', firstname: firstname || '', lastname: lastname || '',})
    }

    checkFlag() {
        if(this.props.loggedIn === null) {
          setTimeout(this.checkFlag.bind(this), 1000)
        }
        else {
          this.props.navigation.navigate("SignedIn")
         }
    }

    checkIfFordhamEmail(email) {
        // var tempEmailArr = email.split('');
        // console.log("EMAIL IS: ", email)
        // console.log("AFTER SPLICE: ", tempEmailArr.splice((tempEmailArr.length - 12),tempEmailArr.length - 1))
        // var fordhamSignArr = tempEmailArr.splice((tempEmailArr.length - 12),tempEmailArr.length - 1)
        var fordhamSign = email.substring(email.length-12, email.length);

        console.log("NEWLY JOINED: ",fordhamSign);

        if(fordhamSign == '@fordham.edu') {
            return true
        }

        return false
    }

    verifyEmail(email) {
        // this.setState({validEmail: null})
        console.log("EMAIL IS: ", email)
        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var isFordhamEmail = this.checkIfFordhamEmail(email);

        if (re.test(email) && isFordhamEmail) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            this.setState({validEmail: true});
            this.onEmailChange.bind(this);
        }
        else {
            // invalid email, maybe show an error to the user.
            this.setState({validEmail: false})
            this.setState({cantSignUp: true})
        }

    }

    verifyPassword(password) {
        // this.setState({validPassword: null});
        //console.log("PASSWORD IS: ", password);

        // CHECK THAT PASSWORD IS VALID
        // IF TRUE
        if(password.length > 6) {
            this.setState({validPassword: true})
            this.setState({password: password})
        } else {
        // IF FALSE
            this.setState({validPassword: false});
            this.setState({cantSignUp: true})
        }
    }

    // checkPasswordsMatch(text) {
    //     // this.setState({passwordsMatch: false});
    //     this.setState({passwordCopy: text})
    //     //setTimeout(() => {console.log("THE PASSWORD COPY IS: ", this.state.passwordCopy)},500);
    //     console.log("FIRST: ",this.state.password);
    //     console.log("SECOND: ",this.state.passwordCopy);
    //     if((this.state.password == this.state.passwordCopy) && this.state.validPassword) {
    //         //console.log("THE PASSWORD COPY IS: ", this.state.passwordCopy)
    //         this.setState({passwordsMatch: true});
    //     } else {
    //         this.setState({passwordsMatch: false});
    //     }
    // }

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
                  <TextInputUnderline fieldName="FIRST NAME" fontSize={11} passedFunc={this.onFirstNameChange.bind(this)} passedVal={this.props.firstname}/>
                </View>
                <View marginTop={15}>
                  <TextInputUnderline fieldName="LAST NAME" fontSize={11} passedFunc={this.onLastNameChange.bind(this)} passedVal={this.props.lastname}/>
                </View>
                <View marginTop={15}>
                  <TextInputUnderline fieldName="PASSWORD" fontSize={11} secureTextEntry={true} passedFunc={this.onPasswordChange.bind(this)} passedVal={this.props.password}/>
                </View>
                <View marginTop={15}>
                  <TextInputUnderline fieldName="CONFIRM PASSWORD*" fontSize={11} secureTextEntry={true} passedFunc={() => console.log("do nothing")}/>
                </View>
            </View>
            <View marginTop={(windowSize.height * 1/10) * .3}>
              <ButtonRounded width={windowSize.width*.85} fillWithColor={'#007AFF'} onPress={this.onNewHere.bind(this)}>SIGN UP</ButtonRounded>
            </View>
            <View marginTop={(windowSize.height * 1/10)*.75}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.signUpAccTxt}>
                    I already have an account!
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
    signUpAccTxt: {
    fontFamily: 'HelveticaNeue-Thin',
    color: 'white',
    fontWeight: '300',
    fontSize: 15
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
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    error: state.auth.error,
    loading: state.auth.loading,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{emailChanged, passwordChanged, firstnameChanged, lastnameChanged, loginUser, loggedInUser, newUser})(signup_screen)
