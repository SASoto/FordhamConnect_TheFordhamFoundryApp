import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

const windowSize = Dimensions.get('window');

export default class CustomTabButton extends Component {
  render() {
    return (
      //any component or tag inside Button will be displayed as text
      <View backgroundColor='rgb(221, 215, 218)' justifyContent="center">
        <View style={styles.tabButtonStyle}>
          <View paddingTop={2}>
            <Text style={styles.tabTxtStyle}>{this.props.tabName}</Text>
          </View>
        </View>
        <View height={3} backgroundColor="rgb(191, 187, 187)" elevation={null}/>
      </View>
    ); 
  }
}

const styles = ({
  tabButtonStyle: {
    height: 50,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgb(221, 215, 218)',
    borderBottomWidth: 4,
    borderColor: 'rgb(106,46,52)'
  },
  tabTxtStyle: {
    color: 'rgb(106,46,52)',
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  }
});