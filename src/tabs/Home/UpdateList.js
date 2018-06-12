import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {readUpdates} from '../../Actions';
import {connect} from 'react-redux';
import {Spinner} from '../../Components/Common';
import {UpdateDisplay} from './UpdateDisplay';

class UpdateList extends Component {
	constructor(props) {
		super(props);

	}

	componentWillMount(){
		this.props.readUpdates()
		console.log(this.props.updates)
	}

	renderUpdates(){
		updates = this.props.updates

		list = []
		//temp = ''
		for(key in updates){
			const temp = key

			list.unshift(
				<UpdateDisplay
					key = {key}
					title = {updates[key].business} //updates[key].business is the name i.e Pathos or Ventir
					update = {updates[key].update} //updates[key].update is the description/announcment
					date = {updates[key].date} //updates[key].date is the date it was posted
					link = {updates[key].link}
				/>
			)

			//style like mentor page, events too?
		}
		return <View>{list}</View>
	}
	
	render () {
		console.log(this.props.updates)
		if (this.props.loading){
			return <Spinner size="large"/>
		}
		return (
				<ScrollView marginTop = {10}>{this.renderUpdates()}</ScrollView>
		)
	}
}

const mapStateToProps = state => {
	const { updates,loading } = state.updateList
	return { updates,loading }
}

export default connect(mapStateToProps, { readUpdates })(UpdateList)