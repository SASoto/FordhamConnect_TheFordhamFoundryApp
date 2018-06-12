import React, {Component} from 'react';
import {Text, StyleSheet, View, Linking} from 'react-native';

import DandMscreenNav from '../../Components/Header/DandMscreenNav';
import {InfoModal} from '../../Components/Common';
import ViewContainer from '../../Components/Common/ViewContainer';
import NavBar from '../../Components/Header/NavBar';
import DandMList from './DandMList';
import {Button, ClickMe} from '../../Components/Common';

class dm_screen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfoModal: false
		}
	}

	renderDes(){
		this.setState({showInfoModal: true})
	}

	onReturn(){
		//this.setState({showModal: false})
		this.setState({showInfoModal: false})
	}

	render () {
		return (
			<ViewContainer>
				<NavBar/>
				<ClickMe onPress = {() => Linking.openURL('https://goo.gl/forms/Gv0ZJiEMQbzauTOo1')}>
					<Text style = {styles.feedbackText}>Leave us feedback by clicking here!</Text>
				</ClickMe>
				<DandMList/>
				<View alignItems = "center" paddingTop = {5} borderTopWidth = {StyleSheet.hairlineWidth}>
				<Button onPress = {() => Linking.openURL('https://www.fordhamfoundry.org/about-us/team/')}> Click to learn more </Button>
				</View>
			</ViewContainer>
			);
	}
}

const styles = ({
	container: {
		backgroundColor: 'maroon',
		alignItems: 'center'
	},
	textStyle: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'GillSans',
		textAlign: 'center'
	},
	feedbackText: {
		fontSize: 20,
		color: '#0981CC',
		fontWeight: '400',
		fontFamily: 'GillSans-Light',
		justifyContent: "center",
		textAlign: 'center'
	}
})

export default dm_screen;