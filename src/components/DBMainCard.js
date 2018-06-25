import React, {Component} from 'react';
import {Dimensions, Text, View, Button, Image, TouchableOpacity} from 'react-native';

import MatIcon from 'react-native-vector-icons/dist/MaterialIcons';

const windowSize = Dimensions.get('window');
export default class DBMainCard extends Component {

	render() {
		return (
			
			<View style={styles.encompCont}>
				<View paddingTop={15} paddingLeft={24} flexDirection="row">
					<View marginRight={8}>
						<View height={30} width={30} borderRadius={15} backgroundColor="blue"/>
					</View>
					<View flex={1} flexDirection="column">
						<Text>Sample Text</Text>
						<Text>Sample Text</Text>
					</View>
				</View>
				<View paddingLeft={24} marginTop={10}>
					<Text>SAMPLE TEXT</Text>
				</View>
				<View marginVertical={10} paddingRight={10} alignItems="flex-end">
					<Text># Comments</Text>
				</View>
				<View flex={1} borderBottomWidth={1} borderColor="grey"/>
				<View justifyContent="center" marginTop={16} marginBottom={14} marginLeft={28} shadowOpacity={0.3} shadowRadius={1} shadowOffset={{width: 0, height: 1}}>
					<TouchableOpacity onPress={() => console.log("do nothing")}>
						<View style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>
							DISCUSS
							</Text>
						</View>
					</TouchableOpacity>
				</View>	
			</View>
			
		)
	}
}

//<Button title="favor" onPress={this.props.handleFavorites}/>

const styles = ({
	encompCont: {
		//flex: 1,
		backgroundColor: 'rgba(106, 46, 52, 0.1)',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: windowSize.width * .9,
		//borderWidth: 0.2,
		borderRadius: 6,
		//shadowOpacity: 0
		//shadowRadius: 1
	},
	imageContainer: {
		flex: 1,
		height: 200,
		//width: windowSize.width * .75//344
	},
	buttonStyle: {
		width: 100,
		height: 30,
		paddingVertical: 7,
		paddingHorizontal: 16,
		borderRadius: 10,
		backgroundColor: 'rgb(0, 122, 255)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonTextStyle: {
	    alignSelf: 'center',
	    color: 'white',
	    fontSize: 15,
	    fontFamily: 'HelveticaNeue-Medium',
	}
})