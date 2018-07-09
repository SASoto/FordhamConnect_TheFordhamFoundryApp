import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

export default class TabBarLikeButton extends Component {
  render() {

    return (
      //any component or tag inside Button will be displayed as text
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={!this.props.underline ? styles.contNotUnderlined : styles.contUnderlined}>
          <Text style={styles.textStyle}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    ); 
  }
}

const styles = ({
  contNotUnderlined: {
    padding: 8

  },
  contUnderlined: {
    padding: 8,
    borderColor: 'blue',
    borderBottomWidth: 1,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Medium',
  },
});