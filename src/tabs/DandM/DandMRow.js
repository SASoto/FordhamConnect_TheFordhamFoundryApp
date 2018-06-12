import React from 'react';
import {Text} from 'react-native';

import DandMPanel from './DandMPanel';

const styles = ({
  descStyle: {
    fontSize: 18,
    fontFamily: 'GillSans-Light',
  },
});

const DandMRow = (props) => (
  <DandMPanel DandMid = {`${props.id}`} DandMname = {`${props.name}`} DandMtitle = {`${props.title}`}>
  
  <Text style = {styles.descStyle}>{`${props.desc}`}</Text>
  
  </DandMPanel>
);

export default DandMRow;