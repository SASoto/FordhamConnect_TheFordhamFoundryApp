import React, {Component} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';

const windowSize = Dimensions.get('window');
export default class TitleFordhamConnect extends Component {
  render() {
    const {fordhamTxt, connectTxt, foundryTxt, signInTxt} = styles;

    return (
      <View>
        <View flexDirection="column" marginTop={this.props.marginTop}>
          <View>
            <Text style={fordhamTxt}>Fordham</Text>
          </View>
          <View style={styles.fordhamCont}>
            <Text style={connectTxt}>connect</Text>
          </View>
          <View style={styles.foundryCont}>
            <Text style={foundryTxt}>by The Fordham Foundry</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = ({
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
    //alignItems: "flex-start"
  },
  foundryTxt: {
    color: 'white',
    marginLeft: 2,
    backgroundColor: 'transparent',
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: '300'

  }
})