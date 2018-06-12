import React, {Component} from 'react';
import {View, Text, Linking, Button} from 'react-native';
import {connect} from 'react-redux';

import JobList from './JobList';
import {ClickMe, InfoModal} from '../../Components/Common'

import MatIcon from 'react-native-vector-icons/MaterialIcons';

class job_screen extends Component {

	render () {
		const {state} = this.props.navigation;
		return (
			<View flex = {1} backgroundColor = "white">
				<ClickMe onPress = {() => Linking.openURL('https://goo.gl/forms/Gv0ZJiEMQbzauTOo1')}>
					<Text style = {styles.feedbackText}>Leave us feedback by clicking here!</Text>
				</ClickMe>
				<View style = {styles.infoCont}>
						<Text style = {styles.infoText}>Looking for someone to help take your business to the next level? Or lend a helping hand? Post your job or skill here!</Text>
				</View>
				<JobList wayto = {this.props.navigation}/>
			</View>
			);
	}
}

const styles = ({
	infoCont: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		marginBottom: 10
	},
	infoText: {
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
});

export default job_screen;