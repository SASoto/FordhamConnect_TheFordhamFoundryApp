import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class FavoriteButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			contactIsFavorited: null
		}
	}

	componentWillMount() {
		if(this.props.favorited) {
			this.setState({contactIsFavorited: true})
		} else {
			this.setState({contactIsFavorited: false})
		}
	}

	changefavoritedstatus_tofalse() {
		this.setState({contactIsFavorited: !this.state.contactIsFavorited});
		this.props.handleFavorites(this.props.userID, 0);
	}

	changefavoritedstatus_totrue() {
		this.setState({contactIsFavorited: !this.state.contactIsFavorited});
		this.props.handleFavorites(this.props.userID, 1);
	}

	renderIcon() {
		if(this.state.contactIsFavorited) {
			return (
				<TouchableOpacity onPress={() => this.changefavoritedstatus_tofalse()}>
				<MatIcon name="star" size={25} color="black"/>
				</TouchableOpacity>
			)
		}

		return (
			<TouchableOpacity onPress={() => this.changefavoritedstatus_totrue()}>
			<MatIcon name="star-border" size={25} color="black"/>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View>
				{this.renderIcon()}
			</View>
		)
	}
}

const styles = ({
})