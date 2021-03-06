import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

const windowSize = Dimensions.get('window');

export default class ButtonRounded extends Component {
  render() {
    const {container, buttonStyle, textStyle} = styles;

    if(this.props.padding != null) {
      var usePadding = this.props.padding;
    } else {
      var usePadding = 8;
    }

    if(this.props.borderRadius != null) {
      var useBR = this.props.borderRadius;
    } else {
      var useBR = 10;
    }

    if(this.props.fillWithColor != null) {
        var useFill = this.props.fillWithColor;
    } else {
        var useFill = 'transparent';
    }

    if(this.props.height != null) {
      var useHeight = this.props.height;
    }

    return (
      //any component or tag inside Button will be displayed as text
      <TouchableOpacity onPress={this.props.onPress}>
      <View borderRadius={useBR} width={this.props.width} height={useHeight} backgroundColor={useFill}>
        
          <View padding={usePadding}>
          <Text style={textStyle}>
            {this.props.children}
          </Text>
          </View>
       
      </View>
      </TouchableOpacity>
    ); 
  }
}

const styles = ({
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'HelveticaNeue-Medium',
    // fontWeight: '300',
  },
});