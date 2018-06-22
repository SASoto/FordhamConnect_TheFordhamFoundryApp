import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button} from 'react-native';

import firebase from 'firebase';
import {connect} from 'react-redux';

import DBMainCard from '../../components/DBMainCard';

const windowSize = Dimensions.get('window');
export default class discboard_screen extends Component {
	constructor(props) {
        super(props);

    }

	render() {
		return (
			<DBMainCard/>
  		);
	}
}

// const mapStateToProps = (state) => {
//   return {
//   	firstname: state.auth.firstname,
//   	lastname: state.auth.lastname,
//     email: state.auth.email,
//     user: state.auth.user,
//     // password: state.auth.password,
//     // error: state.auth.error,
//     // loading: state.auth.loading,
//     loggedIn: state.auth.loggedIn
//   }
// }

// export default connect(mapStateToProps)(discboard_screen)