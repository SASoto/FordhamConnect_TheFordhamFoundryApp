/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Dimensions, Text, View, Image, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ImageBackground} from 'react-native';

import TextInputUnderline from '../../components/TextInputUnderline';
import ButtonRounded from '../../components/ButtonRounded';
import TitleFordhamConnect from '../../components/TitleFordhamConnect';

const windowSize = Dimensions.get('window');

export default class onboarding_screen extends Component {

  render() {
    return (
      <View flex={1}>
        <ImageBackground
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}

          source={require('../../../Images/background_splash.jpg')}
        >
      <View alignItems="center">
      <TitleFordhamConnect marginTop={(windowSize.width*1/10)}/>
      <View marginTop={(windowSize.height * 6/10)} flexDirection="column" alignItems="center">
        <View>
        <Button title='New Fordham Connect User?' style={styles.button} color='white' width={(windowSize.width*.65)} onPress={() => this.props.navigation.navigate("SignUp")}/>
        </View>
        <View marginTop={10}>
         <Button title='Existing User' style={styles.button} color='white' width={(windowSize.width*.65)} onPress={() => this.props.navigation.navigate("Login")}/>
        </View>
      </View>
      </View>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 100,
    marginBottom: 75
  },
  inputContainer: {
    marginLeft: 15,
    marginBottom: 30
  },
  labelContainer: {
    marginLeft: 7,
    marginBottom: 5
  },
  input: {
    fontFamily: 'GillSans-Light',
    height: 40,
    width: 300,
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    paddingHorizontal: 10
  },
  button: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Medium',
  }
});