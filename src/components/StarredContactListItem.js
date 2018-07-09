import React, { Component } from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

export default class StarredContactListItem extends Component {
	render() {

		if(this.props.favorited)
			var iconOrView = (
				<View marginHorizontal={50} justifyContent="center">
				<MatIcon name="star" size={25} color="black"/>
				</View>
			)
		else {
			var iconOrView = (
				<View marginHorizontal={50} justifyContent="center">
					<View margin={13}/>
				</View>
			)
		}

		return (
			<TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.destination, {userID: this.props.userID, favorited: this.props.favorited, userfname: this.props.userfname, changeFavoritedStatus: this.props.changeFavoritedStatus})}>
				<View style={styles.encompCont}>
					<View height={55} justifyContent="center">
						<View flexDirection="row">
							{iconOrView}
							<View flex={1} flexDirection="row">
								<View style={styles.userBubble} marginRight={10}/>
								<View justifyContent="center">
								<Text>{this.props.userfname}</Text>							
								</View>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

//<Button title="Favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		flex: 1,
	},
	nameStyle: {
		fontFamily: 'HelveticaNeue-Medium',
		color: 'black',
		fontSize: 16
	},
	userBubble: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'grey'
	}

})