import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

const windowSize = Dimensions.get('window');

export default class ButtonOutline extends Component {
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

    if(this.props.height != null) {
      var useHeight = this.props.height;
    }

    return (
      //any component or tag inside Button will be displayed as text
      <TouchableOpacity onPress={this.props.onPress}>
      <View borderRadius={useBR} width={this.props.width} height={useHeight} borderWidth={1} borderColor="pink">
        
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
  // container: {
  //   //backgroundColor: '#bdbdbd',
  //   //borderColor: '#bdbdbd',
  //   //borderWidth: 1,
  //   borderRadius: 10,
  // },
  textStyle: {
    alignSelf: 'center',
    color: 'rgb(255,255,255)',
    fontSize: 12,
    fontFamily: 'SFProText-Semibold',
    // fontWeight: '300',
  },
});