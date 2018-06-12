import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {fetchJobs, jobDelete} from '../../Actions';
import JobForm from './JobForm';
import firebase from 'firebase';

import JobCreate from './JobCreate';
import {JobDisplay} from './JobDisplay';
import {Button, Confirm, Spinner, CSCol} from '../../Components/Common';
import ViewContainer from '../../Components/Common/ViewContainer';

class JobList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			showDesModal: false,
			curKey: null,
			canDelete: false
		}
	}

	componentWillMount(){
		this.props.fetchJobs()
	}

	renderModal(){
		 this.setState({showModal: true})
	}

	onReturn(){
		this.setState({showModal: false})
		this.setState({showDesModal: false})
	}
	
	renderDes(key,del){
		this.setState({curKey: key})
		this.setState({canDelete: del})
		this.setState({showDesModal: true})
	}

	deleteJob(key){
		this.setState({showDesModal: false})
		this.setState({curKey: null})
		this.setState({canDelete: false})
		this.props.jobDelete(key)
	}

	fetchJobBoard(){
		jb = this.props.jb
		rows=[]

		if(this.props.user === null){
			currentUserId = -1
		}else{
			currentUserId = firebase.auth().currentUser.uid
		}

		for(var key in jb){
			const temp = key

			if(currentUserId === jb[key].user){ //If current user created job, show delete button
				rows.unshift(
				<TouchableOpacity onPress={() => {this.renderDes(temp,true)}}>
					<CSCol>
							<Text style={styles.userJobStyle}>{jb[key].title}</Text>
							<Text style={styles.nameStyle}>{jb[key].name}</Text>
							<Text style = {styles.dateStyle}>{jb[key].date}</Text>
					</CSCol>

				</TouchableOpacity>
				)
			}else{ //If user did not create this job, dont show delete button (2nd param in renderDes)
				rows.unshift(
				<TouchableOpacity onPress={ ()=>{this.renderDes(temp,false)} }>
					<CSCol>
							<Text style={styles.jobStyle}>{jb[key].title}</Text>
							<Text style = {styles.nameStyle}>{jb[key].name}</Text>
							<Text style = {styles.dateStyle}>{jb[key].date}</Text>
					</CSCol>
				</TouchableOpacity>
				)
			}
		}
		return <ScrollView>{rows}</ScrollView>
	}

	checkIf() {
		if (this.props.loading){
			return <Spinner size="large"/>
		}
		else if(this.props.jb === null)
		{	
			if(this.state.showDesModal === true)
			{	
				{this.onReturn()}
			}
			return (
				<View alignItems = "center">
					<Text> No Jobs Posted </Text>
				</View>
			);
		}
		else {
			return (
				this.fetchJobBoard()
			);
		}
	}

	render() {
		return(
			<View flex = {1} backgroundColor = "white">
				<View  alignItems = "center" paddingBottom = {5} borderBottomWidth = {StyleSheet.hairlineWidth}>
					<Button onPress = {() => this.props.wayto.navigate('JCForm')}>
						Post to the Job Board!
					</Button>
				</View>
			
				{this.checkIf()}

			<Confirm 
				visible={this.state.showDesModal}
				onReturn={this.onReturn.bind(this)}
			>
					<JobDisplay 
						visible={this.state.showDesModal}
						onReturn={this.onReturn.bind(this)}
						jobBoard={this.props.jb} 
						jobKey={this.state.curKey} 
						canDelete={this.state.canDelete} 
						jobDelete={this.props.jobDelete}
					/> 
			</Confirm>
			</View>

		
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 8
	},
 	separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  dateStyle: {
  	paddingTop: 6,
  	paddingLeft: 8,
  	fontSize: 14,
  	fontFamily: "GillSans"
  },
  nameStyle: {
  	fontSize: 16,
  	paddingLeft: 8,
  	fontFamily: "GillSans"
  },
  jobStyle: {
  	fontSize: 20,
	paddingLeft: 8,
	color: 'darkblue',
	fontWeight: '400',
	fontFamily: "GillSans"
  },
  textStyle: {
	fontSize: 16,
	fontWeight: 'bold'
  },
  userJobStyle:{
	fontSize: 20,
	paddingLeft: 8,
	color: '#4AB312',
	fontWeight: '400',
	fontFamily: "GillSans"
  }
});

const mapStateToProps = state => {
	const {jb} = state.jobForm //took out email
	const {user} = state.auth
	const {loading} = state.jobForm
	return {jb, user, loading} //took out email
};

export default connect(mapStateToProps, {fetchJobs,jobDelete})(JobList);