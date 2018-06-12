import React, {Component} from 'react';
import {View, ListView, StyleSheet} from 'react-native';

import DandMRow from './DandMRow';
import data from '../../Data/DandM';

class DandMList extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
		  dataSource: ds.cloneWithRows(data),
		};
	}

	render () {
		return (
			<ListView
				removeClippedSubviews={false}
				style = {styles.container}
				dataSource={this.state.dataSource}
        		renderRow={(data) => <DandMRow {...data}/>}
        		renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
			/>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default DandMList;