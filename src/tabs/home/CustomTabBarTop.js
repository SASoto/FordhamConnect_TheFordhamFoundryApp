import React,{Component} from "react";
import { View, Text, Image} from "react-native";
import {TopTabBar, SafeAreaView} from "react-navigation";
// import { LinearGradient } from "expo";
// import { Ionicons  } from '@expo/vector-icons';

export default class CustomTabBarTop extends Component {
  render() {
    return (
      <View flex={1}>
        <View>
        <Image style={{flex: 1, height: 50}} source={require('../../../Images/KindMind.jpg')}/>
        </View>
      </View>
    );
  }
};

const styles = {
  actionButton: {
    backgroundColor: "#6200EE",
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: 40,
    left: 155,
    zIndex: 999
  },
  buttonIcon: {
    textAlign: "center",
  }
}
