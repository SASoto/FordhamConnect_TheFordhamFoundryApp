/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, ActivityIndicator, View, ImageBackground} from 'react-native';

import {SkypeIndicator} from 'react-native-indicators';
import {loggedInUser, logoutUser} from '../../Actions';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window')
class signup_screen extends Component {

    // componentWillMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if(user) {
    //             this.props.loggedInUser();
    //         } else {
    //             this.props.logoutUser();
    //         }
    //     });
    // }

  checkLoggedIn(){
    const routeName = this.props.loggedIn ? "SignedIn" : "SignedOut";
    // if(routeName === "SignedIn") 
    // {
    this.props.navigation.navigate(routeName)
        // const resetAction = NavigationActions.reset({
        //   index:0,
        //   actions: [
        //     NavigationActions.navigate({routeName})
        //   ]
        // })
        // this.props.navigation.dispatch(resetAction)
    // }
    // else {
        //this.props.navigation.navigate("SignedOut")
        // const resetAction = NavigationActions.reset({
        //   index:0,
        //   actions: [
        //     NavigationActions.navigate({routeName})
        //   ]
        // })
        // this.props.navigation.dispatch(resetAction)
    //}

  //});
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.props.loggedInUser();
      } else {
        this.props.logoutUser();
      }
    });
    setTimeout(this.checkLoggedIn.bind(this), 1200);
        //{this.checkLoggedInt()}
  }

    render() {
        const resizeMode = 'cover';
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
            <View alignItems='center'>
            <TitleFordhamConnect marginTop={(windowSize.width * 4/10)}/>
            </View>
            <SkypeIndicator color='#bdbdbd' size={30} />
            </ImageBackground>
        </View>
    );
    }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps,{loggedInUser, logoutUser})(signup_screen)
