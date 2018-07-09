import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView, Image, Button, TouchableWithoutFeedback} from 'react-native';

import { NavigationActions } from 'react-navigation';

import {MainViewTabNav} from '../router';

const windowSize = Dimensions.get('window');
export default class mainview_screen2 extends Component {

	constructor(props) {
		super(props)

		this.state = {
			hasScrolled: false
		}

		this.goToTop = this.goToTop.bind(this);
		this.onTabButtonPress = this.onTabButtonPress.bind(this);
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	}

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
		flexDirection: "row",
		height: 40,
	}
})