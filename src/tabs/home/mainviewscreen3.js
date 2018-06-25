import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView, Image, Button, TouchableWithoutFeedback} from 'react-native';

import { NavigationActions } from 'react-navigation';

import {MainViewTabNav} from '../router';

const windowSize = Dimensions.get('window');
export default class mainview_screen2 extends Component {
	// static navigationOptions = ({navigation}) => {
 //    return {
 //      tabBarOnPress({ navigation, defaultHandler }) {
 //        // perform your logic here
 //        // this is mandatory to perform the actual switch
 //        // you can omit this if you want to prevent it
 //        // defaultHandler: {console.log("HELLO")}
 //        console.log("HELLO")
 //        //jumpToIndex(scene.index);
 //      }
 //    };
 //  };
	// static navigationOptions = {
	// 	  tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
	// 	  const { route, index } = scene;

	// 	  if (route.key === previousScene.key) {
	// 	    const stackNavigation = route.routes[0];
	// 	    if (!!stackNavigation && !!stackNavigation.params && !!stackNavigation.params.scrollToTop) {
	// 	      stackNavigation.params.scrollToTop();
	// 	    }
	// 	  }
	// 	  console.log("wtf is going on")

	// 	  jumpToIndex(index);
	// 	}
	// }

	constructor(props) {
		super(props)

		this.state = {
			hasScrolled: false
		}

		this.goToTop = this.goToTop.bind(this);
		this.onTabButtonPress = this.onTabButtonPress.bind(this);
		//this.handleScroll = this.handleScroll.bind(this);
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	}

	// handleScroll() {
	// 	if(this.refs._scrollView.)
	// }

	// handleScroll (event: Object) {
	//  console.log(event.nativeEvent.contentOffset.y);
	//  if(event.nativeEvent.contentOffset.y == 10 || event.nativeEvent.contentOffset.y > 10)
	//  	this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	// }

	onTabButtonPress() {
		if(!this.state.hasScrolled) {
			this.setState({hasScrolled: true});
			this.refs._scrollView.scrollTo({x:0, y:145, animated: true});
		}
		else {
			this.setState({hasScrolled: false});
			this.refs._scrollView.scrollTo({x:0, y:0, animated: true});
		}

		console.log("KEVIN SMITH")
		//this.state.scrollState = false
	}

	render() {
		return (
			<ScrollView ref='_scrollView' flex={1} scrollEnabled={false} stickyHeaderIndices={[1]}>
				<TouchableWithoutFeedback style={styles.touchSpace} onPress={() => this.onTabButtonPress()}>
				<View flex={1}>
					<Image style={styles.imgCont} source={require('../../../Images/KindMind.jpg')}/>
				</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback style={styles.touchSpace} onPress={() => this.onTabButtonPress()}>
				<View flex={1} height={windowSize.height}>

					<MainViewTabNav/>
				</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	touchSpace: {
		// position: 'absolute',
		// flex: 1,
		// marginLeft: -50
	},
	absView: {
		flex:1 ,
		backgroundColor: 'transparent',
		
	},
	imgCont: {
		//flex: 1,
		height: 150
	},
	buttonTxt: {
		fontSize: 14,
		fontFamily: 'HelveticaNeue-Medium'
	},
	tabBarStyle: {
		//flex: 1,
		flexDirection: "row",
		height: 40,
		// position: 'absolute',
		// top: 40,
		// left: 0,
	}
})