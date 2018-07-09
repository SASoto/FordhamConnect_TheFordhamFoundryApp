import React, {Component} from 'react';
import {Dimensions, Text, View, Image, TouchableOpacity} from 'react-native';

const windowSize = Dimensions.get('window');
export default class TitleFordhamConnect extends Component {
  render() {
    const {fordhamTxt, connectTxt, foundryTxt, signInTxt} = styles;

    return (
      <View>
        <View marginTop={this.props.marginTop}>
          <Image style={styles.imgCont} source={require('../../Images/foundrylogoonboarding.png')} resizeMode="cover"/>
        </View>
      </View>
    );
  }
}

const styles = ({
  imgCont: {
    height: 90, 
    width: 270
  },
  fordhamCont: {
    marginTop: -15
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
    fontSize: 46,
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold'
  },
  foundryCont: {
    marginTop: -5,
  },
  foundryTxt: {
    color: 'white',
    marginLeft: 2,
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: '300'

  }
})