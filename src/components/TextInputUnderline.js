import React, {Component} from 'react';
import {Dimensions, Text, View, TextInput, Button} from 'react-native';

import InputErrorBox from './InputErrorBox';
// import {Button, Spinner} from '../../Components/Common';
// import ViewContainer from '../../Components/Common/ViewContainer';

const windowSize = Dimensions.get('window')
export default class TextInputUnderline extends Component {
  render(){
    if(this.props.secureTextEntry) {
      var secureOrNot = true;
    } else {
      var secureOrNot = false;
    }

    if(this.props.fontSize != null) {
      var passedfontsize_text = this.props.fontSize;
      var passedfontsize_input = this.props.fontSize + 3;
    } else {
      var passedfontsize_text = 13;
      var passedfontsize_input = this.props.fontSize + 3;
    }

    const styles = ({
      textStyle: {
        fontFamily: 'HelveticaNeue-Thin',
        color: 'white',
        fontWeight: '300',
        fontSize: passedfontsize_text
      },
      input:{
        fontFamily: 'HelveticaNeue-Thin',
        height: 40,
        width: windowSize.width * .85,
        color: 'white',
        fontSize: passedfontsize_input
      }
    });

    return(
        <View>
          <View backgroundColor="transparent"><Text style={styles.textStyle}>{this.props.fieldName}</Text></View>
        <TextInput
          style = {styles.input}
          secureTextEntry={secureOrNot}
          autoCapitalize = 'none'
          autoCorrect = {false}
          onChangeText= {this.props.passedFunc}
          value = {this.props.passedVal}
        />
        <View borderBottomWidth={1} borderColor="#979797"/>
        </View>
    );
  }
}