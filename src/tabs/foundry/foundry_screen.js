import React, {Component} from 'react';
import {Dimensions, Image, Text, StyleSheet, View, ScrollView, Linking} from 'react-native';

import {FoundryTabNav} from '../router';

const windowSize = Dimensions.get('window');
export default class foundry_screen extends Component {
	constructor(props) {
		super(props)

		// this.state = {
		// 	hasScrolled: false
		// }

		this.goToTop = this.goToTop.bind(this);
		this.onTabButtonPress = this.onTabButtonPress.bind(this);
		//this.handleScroll = this.handleScroll.bind(this);
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: false});
	}

	onTabButtonPress() {
		// if(!this.state.hasScrolled) {
		// 	this.setState({hasScrolled: true});
			this.refs._scrollView.scrollTo({x:0, y:219, animated: true});
		//}
		// else {
		// 	this.setState({hasScrolled: false});
		// 	this.refs._scrollView.scrollTo({x:0, y:0, animated: true});
		// }

		//console.log("KEVIN SMITH")
		//this.state.scrollState = false
	}

	render () {
		return (
			<ScrollView ref='_scrollView' flex={1} pagingEnabled={true} overScrollMode={"never"} showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
				<View flex={1} alignItems="center">
					<Image resizeMode="cover" style={styles.imgCont} source={require('../../../Images/slide4.png')}/>
				</View>
				<View flex={1} height={445*2}>
					<FoundryTabNav/>
				</View>
			</ScrollView>
			);
	}
}

const styles = ({
	imgCont: {
		//flex: 1,
		//alignItems: 'center',
		height: 235
	}
})
//<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>