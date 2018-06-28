import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

import FavoriteButton from './FavoriteButton';

const windowSize = Dimensions.get('window');
export default class ProfileCard extends Component {

	render() {
		return (
			<View style={styles.encompCont}>
				<View padding={20}>
					<View flexDirection="row">
						<View width={60} height={60} borderRadius={30} backgroundColor="grey" marginRight={15}/>
						<View flexDirection="row">
							<View justifyContent = "center" flexDirection="column">
								<Text>{this.props.userfname}</Text>
							</View>
							<View justifyContent="center">
								<FavoriteButton handleFavorites={this.props.handleFavorites} favorited={this.props.favorited} userID={this.props.userID}/>
							</View>
						</View>
					</View>
					<View>
						<View>
							<Text>SAMPLE TEXT</Text> 
						</View>
						<View borderBottomWidth={1} borderColor="black"/>
						<View>
							<Text>SAMPLE TEXT</Text> 
						</View>
						<View>
							<Button title="Email" onPress={() => console.log('do nothing')}/> 
						</View>
					</View>
				</View>
			</View>
		)
	}
}

//<Button title="favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		flexDirection: "column",
		width: windowSize.width * .9,
		borderWidth: 1,
		borderRadius: 3,
	}
})