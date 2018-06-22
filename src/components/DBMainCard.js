import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class DBMainCard extends Component {

	render() {
		return (
			<View flex={1} alignItems="center">
			<View style={styles.encompCont}>
				
				<Image style={styles.imageContainer} source={require('../../Images/foundry-logo-top-bar.png')}/>
				<View margin={20} flexDirection="column" alignItems="flex-end">
					<Text>SAMPLE TEXT</Text>
					<Text>SAMPLE TEXT</Text>
					<Text>SAMPLE TEXT</Text>
				</View>
				
			</View>
			</View>
		)
	}
}

//<Button title="favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		flex: 1,
		flexDirection: 'column',
		width: windowSize.width * .9,
		borderWidth: 1,
		borderRadius: 3,
	},
	imageContainer: {
		flex: 1,
		height: 200,
		//width: windowSize.width * .75//344
	}
})