import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import arrofImages from '../../Data/FFBusimagesarr';
import arrofWeb from '../../Data/FFBusemailarr';
import IonIcon from 'react-native-vector-icons/Ionicons';

class FFBusPanel extends Component{
    constructor(props){
        super(props);
        this.state = {       
            FFBusid: props.FFBusid,
            FFBusname: props.FFBusname,
            expanded: false,
        };
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    toggle(){
        let initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });
    }

    renderView() {
        if(this.state.expanded) {
            return (
            <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}> 
                {this.props.children}
            </View>
            );
        }
    }

    renderButton() {
        if(arrofWeb[this.state.FFBusid] === '')
        {
            return (
                <View width = {50}/>
            );
        }
        else {
            return (
                <View style={styles.iconCont}>
                    <TouchableOpacity onPress = {() => Linking.openURL(arrofWeb[this.state.FFBusid])}>
                    <IonIcon name = "md-globe" size = {40}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }


    render(){
        return ( 
        <TouchableHighlight 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
            <View style={[styles.container,{height: this.state.animation}]}>
                <View flexDirection = "row">
                <View padding = {8}>
                <Image source={arrofImages[this.state.FFBusid]} style={styles.photo}/>
                </View>
                <View alignItems = "center" justifyContent = "center" flex = {2} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.nameStyle}>{this.state.FFBusname}</Text>
                </View>
                {this.renderButton()}
                </View>
                {this.renderView()}
            </View>
        </TouchableHighlight>
        );
    }
}

var styles = ({
    container: {
        backgroundColor: 'white'
    },
    nameCont: {
        alignItems: 'center'
    },
    nameStyle: {
        marginRight: 8,
        marginLeft: 8,
        fontSize: 26,
        fontWeight: '400',
        fontFamily: 'GillSans-Light'
    },
    title: {
        paddingTop: 6,
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'GillSans'
    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 0
    },
    photo: {
        height: 80,
        width: 90,
        borderRadius: 20,
    },
    iconCont: {
        marginRight: 17.5,
        justifyContent: 'center'
    } 
});

export default FFBusPanel;