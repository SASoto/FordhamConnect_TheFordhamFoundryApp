import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {readEvents, remindMe} from '../../Actions'
import {EventDisplay} from './EventDisplay'
import {Spinner} from '../../Components/Common';

class EventList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curKey: ''
		}

	}

	componentWillMount(){
		this.props.readEvents()
	}

	renderEvents(){
		events = this.props.events

		if (this.props.loading){
			return <Spinner size="large"/>
		}
		else if(events === null){
			return <View alignItems = "center"><Text>No Upcoming Events!</Text></View>
		}
		else {list = []
		for(key in events){
			list.push(
				<EventDisplay 
				title={key}
				location={events[key].location}
				time={events[key].time}
				date={events[key].date}
				alarm_year={events[key].alarm_year}
				alarm_month={events[key].alarm_month}
				alarm_day={events[key].alarm_day}
				alarm_hour={events[key].alarm_hour}
				alarm_min={events[key].alarm_min}
				remindMe={this.props.remindMe}
				link={events[key].link}
				/>
				)
			}
		}
		return <View>{list}</View>
	}

	render () {
		return (
				<ScrollView marginTop = {10}>
					{this.renderEvents()}
				</ScrollView>
			)
	}
}

const mapStateToProps = state =>{
	const {events, loading} = state.eventList
	return {events, loading}
}

export default connect(mapStateToProps, { readEvents, remindMe })(EventList)