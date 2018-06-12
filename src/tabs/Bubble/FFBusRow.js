import React from 'react';
import {Text} from 'react-native';

import FFBusPanel from './FFBusPanel';

const styles = ({
  descStyle: {
    fontSize: 18,
    fontFamily: 'GillSans-Light',
  },
});

const FFBusRow = (props) => (
  <FFBusPanel FFBusid = {`${props.id}`} FFBusname = {`${props.name}`}>
  
  <Text style = {styles.descStyle}>{`${props.desc}`}</Text>
  
  </FFBusPanel>
);

export default FFBusRow;