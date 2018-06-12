import React, {Component} from 'react';
import {View, Image, Text, Linking} from 'react-native';

import MatIcon from 'react-native-vector-icons/MaterialIcons';
import ViewContainer from '../../Components/Common/ViewContainer';
import NavBar from '../../Components/Header/NavBar';
import {ClickMe, Confirm} from '../../Components/Common';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import UpdateList from './UpdateList';
import EventList from './EventList';

class home_screen extends Component {
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
			<ScrollableTabView tabBarTextStyle = {{paddingTop:10, fontSize: 20, fontFamily: 'GillSans'}}>
				<UpdateList tabLabel = "Updates"/>
				<EventList tabLabel = "Events"/>
			</ScrollableTabView>
			</ViewContainer>
			);
	}
}

const styles = {
	navBarBackground: {
		backgroundColor: "#f7f7f8",
		//flexDirection: 'row',
		height: 64,
		//alignItems: 'center',
		//justifyContent: 'center'
		
	},
	titleStyle: {
		flex:1,
		justifyContent: 'center',
		marginTop: 12,
		flexDirection: 'row',
		
	},
	infoButton: {
		//flex:1,
		marginRight: 60,
		marginBottom: 14,
    	flexDirection: 'row',
    	alignItems: 'center',
    	justifyContent: 'flex-end',
	},
	feedbackText: {
		fontSize: 20,
		color: '#0981CC',
		fontWeight: '400',
		fontFamily: 'GillSans-Light',
		justifyContent: "center",
		textAlign: 'center'
	}
}

export default home_screen;