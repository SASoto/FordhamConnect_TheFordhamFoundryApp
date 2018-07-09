import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, ScrollView, Image, Button, TouchableWithoutFeedback} from 'react-native';

import { NavigationActions } from 'react-navigation';

import {DummyFeedStack, DiscussionStack, ChatStack} from '../router';

import TabBarLikeButton from '../../components/TabBarLikeButton';

const windowSize = Dimensions.get('window');
export default class mainview_screen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loadFeed: true,
			loadDB: false,
			loadMyDB: false,
			hasScrolled: false,
		}

		this.renderFeed = this.renderFeed.bind(this);
		this.renderDB = this.renderDB.bind(this);
		this.renderMyDB= this.renderMyDB.bind(this);
		this.goToTop = this.goToTop.bind(this);
	}

	renderFeed() {
		if(!this.state.hasScrolled) {
			this.setState({hasScrolled: true});
		}
		this.refs._scrollView.scrollTo({x:0, y:250, animated: true});
		this.setState({loadFeed: true, loadDB: false, loadMyDB: false});
	}

	renderDB() {
		if(!this.state.hasScrolled) {
			this.setState({hasScrolled: true});
		}
		this.refs._scrollView.scrollTo({x:0, y:250, animated: true});
		this.setState({loadFeed: false, loadDB: true, loadMyDB: false});
	}

	renderMyDB() {
		if(!this.state.hasScrolled) {
			this.setState({hasScrolled: true});
				this.refs._scrollView.scrollTo({x:0,y:250,animated:true});
		}

		this.setState({loadFeed: false, loadDB: false, loadMyDB: true});
	}

	whatToRender() {
		if(this.state.loadDB) {
			return (<View flex={1}><DiscussionStack/></View>)
		} 
		else if (this.state.loadMyDB) {
			return (<View flex={1}><ChatStack/></View>)
		}
		else {
			return (<DummyFeedStack/>)
		}
	}

	goToTop() {
		this.refs._scrollView.scrollTo({x:0, y:0, animated: true});
	}

	render() {
		return (
				<ScrollView ref='_scrollView' scrollEnabled={false} flex={1}>
					<View>
					<TouchableWithoutFeedback onPress={() => this.goToTop()}>
					<View>	
						<Image style={styles.imgCont} source={require('../../../Images/KindMind.jpg')}/>
						<View alignItems="center">
						<View style={styles.tabBarStyle}>

							<TabBarLikeButton title="Feed" underline={this.state.loadFeed} onPress={() => this.renderFeed()}/>
							
							<View marginLeft={10}>
							<TabBarLikeButton title="The Discussion Board" underline={this.state.loadDB} onPress={() => this.renderDB()}/>
							</View>
						</View>
					</View>
					</View>
					</TouchableWithoutFeedback>
					<View flex={1} height={(windowSize.height - 38)}>
						{this.whatToRender()}
					</View>
					</View>
	
				</ScrollView>
			
		)
	}
}

const styles = StyleSheet.create({
	imgCont: {
		flex: 1,
		height: 250
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