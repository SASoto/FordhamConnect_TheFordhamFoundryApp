import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView, Image, Button, TouchableWithoutFeedback} from 'react-native';

// import { NavigationActions } from 'react-navigation';

import {MainViewTabNav} from '../router';

const windowSize = Dimensions.get('window');
export default class mainview_screen2 extends Component {
	constructor(props) {
		super(props)

		this.state = {
			touchDisabled: false
		}

		this.goToTop = this.goToTop.bind(this);
		this.onTabButtonPress = this.onTabButtonPress.bind(this);
		//this.handleScroll = this.handleScroll.bind(this);
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	}

	handleScroll() {
		console.log(this.refs.myScrollView.scrollProperties.offset);
	}

	onTabButtonPress() {
		// if(!this.state.hasScrolled) {
		// 	this.setState({hasScrolled: true});
			this.setState({touchDisabled: true})
			this.refs._scrollView.scrollTo({x:0, y:240, animated: true});
		//}
		// else {
		// 	this.setState({hasScrolled: false});
		// 	this.refs._scrollView.scrollTo({x:0, y:0, animated: true});
		// }

		//console.log("KEVIN SMITH")
		//this.state.scrollState = false
	}

	render() {
		return (
			//pagingEnabled={true}
			<ScrollView ref='_scrollView' flex={1}  pagingEnabled={true} overScrollMode={"never"} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
				
				<View flex={1} alignItems="center">
					<Image resizeMode="cover" style={styles.imgCont} source={require('../../../Images/foundrydoorstretch.png')}/>
				</View>
					
				
				<View flex={1} height={445*2}>
					<MainViewTabNav/>
				</View>
				
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
		//alignItems: 'center',
		height: 235
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