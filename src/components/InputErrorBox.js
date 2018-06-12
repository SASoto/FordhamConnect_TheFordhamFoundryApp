import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

export default class InputErrorBox extends Component {
  render() {
    const {fordhamTxt, connectTxt, foundryTxt, signInTxt} = styles;

    return (
      <View>
        <Text>Incorrect blah blah blah</Text>
      </View>
    );
  }
}

const styles = ({
  fordhamCont: {
    marginTop: -25
  },
  fordhamTxt: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 50,
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: '100',
  },
  connectTxt: {
    color: 'white',
    fontSize: 48,
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold'
  },
  foundryCont: {
    marginTop: -5,
    //alignItems: "flex-start"
  },
  foundryTxt: {
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue-Thin',
  }
})