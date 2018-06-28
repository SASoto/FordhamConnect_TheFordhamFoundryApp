import React, {Component} from 'react';
import {Dimensions, Text, View, TextInput, Button} from 'react-native';

import InputErrorBox from './InputErrorBox';
// import {Button, Spinner} from '../../Components/Common';
// import ViewContainer from '../../Components/Common/ViewContainer';

const windowSize = Dimensions.get('window')
export default class FilledTextInput extends Component {
  render(){
    //const {input, textStyle} = styles;

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
        fontFamily: 'SFProText-Regular',
        color: 'rgb(255,255,255)',
        //fontWeight: '300',
        fontSize: passedfontsize_text
      },
      input:{
        fontFamily: 'SFProText-Light',
        height: 37,
        width: windowSize.width * .85,
        color: 'rgb(255,255,255)',
        fontSize: passedfontsize_input,
        backgroundColor: 'transparent',
        paddingLeft: 10,
        //marginLeft: 10
        //paddingHorizontal: 10
      },
      inputBackground: {
        marginTop: 10,
        height: 37,
        width: windowSize.width * .85,
        backgroundColor: this.props.fillColor,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,0.17)',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 1
      }
    });

    return(
        <View>
          <View backgroundColor="transparent"><Text style={styles.textStyle}>{this.props.fieldName}</Text></View>
            <View style={styles.inputBackground}>
              <TextInput
                style = {styles.input}
                secureTextEntry={secureOrNot}
                autoCapitalize = 'none'
                autoCorrect = {false}
                onChangeText= {this.props.passedFunc}
                value = {this.props.passedVal}
              />
            </View>
        </View>
    );
  }
}