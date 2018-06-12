import React, {Component} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Input} from '../../Components/Common';
import {connect} from 'react-redux';
import {jobUpdate} from '../../Actions';

class JobForm extends Component{
  render(){
    return (
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View alignItems = "center" flexDirection = "column" marginTop = {10} marginBottom = {20} backgroundColor = "white">
          <View style = {styles.containerStyle}>
          <Input 
            label="Job Title"
            placeholder="Job Title/Position"
            value={this.props.title}
            onChangeText={text => this.props.jobUpdate({prop: 'title', value: text})}
            maxLength = {50}
          />
          </View>
        
          <View style = {styles.containerStyle}>
          <Input 
            label="Business/Name:"
            placeholder="Business/Name"
            value={this.props.name}
            onChangeText={text => this.props.jobUpdate({prop: 'name', value: text})}
          />
          </View>
        
          <View style = {styles.containerStyle}>
          <Input 
            label="Description:"
            placeholder="Description: Lookin' for..."
            value={this.props.description}
            onChangeText={text => this.props.jobUpdate({prop: 'description', value: text})}
            multiline = {true}
            height = {80}
            maxLength = {550}
          />
          </View>
          <View style = {styles.containerStyle}>
          <Input 
            label="Contact:"
            placeholder="Email:"
            value={this.props.contact}
            onChangeText={text => this.props.jobUpdate({prop: 'contact', value: text})}
          />
          </View>
          <View style = {styles.containerStyle}>
          <Input 
            label="Link:"
            placeholder="Link: http://..."
            value={this.props.link}
            onChangeText={text => this.props.jobUpdate({prop: 'link', value: text})}
          />
          </View>
      </View>
      
      </TouchableWithoutFeedback>
    )
  }
}

const styles = ({
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10
  },
  pickerTextStyle:{
    fontSize: 18,
    paddingLeft: 23
  },
  itemStyle:{
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pickerStyle:{
    //flex:1, 
    //width: 100,
    //height: 200
  }
});
 
mapStateToProps = (state) => {
  const {title,contact,description,category, link} = state.jobForm
  return {title,contact,description,category, link}
}

export default connect(mapStateToProps, {jobUpdate})(JobForm)