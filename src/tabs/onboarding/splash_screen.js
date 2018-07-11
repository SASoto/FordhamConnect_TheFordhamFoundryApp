import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, ActivityIndicator, View, ImageBackground, Image} from 'react-native';

import {MaterialIndicator} from 'react-native-indicators';
import {loggedInUser, logoutUser} from '../../Actions';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import firebase from 'firebase';

import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window')
class splash_screen extends Component {

  componentDidMount() {
    this.mounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.props.loggedInUser()
        setTimeout(() => {this.props.navigation.navigate('SignedIn')},1200)
        
      } else {
        this.props.logoutUser()
        setTimeout(() => {this.props.navigation.navigate('SignedOut')},1200)
      }
    })
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
                        height: '100%',
                      }}

                      source={require('../../../Images/launchscreenblur.png')}
                    >
                    <View alignItems='center'>
                    <Image style={{marginTop: (windowSize.height * 2/10)}} source={require('../../../Images/Circularupdate2.png')}/>
                    </View>
                    <MaterialIndicator color='white' size={40} />
                    </ImageBackground>
                </View>
            );
    }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps,{loggedInUser, logoutUser})(splash_screen)
