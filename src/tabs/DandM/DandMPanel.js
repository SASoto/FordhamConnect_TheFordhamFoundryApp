import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';

import arrofImages from '../../Data/DandMimagesarr';
import arrofEmails from '../../Data/DandMemailarr';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

class DandMPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            DandMid: props.DandMid,
            DandMname: props.DandMname,
            DandMtitle: props.DandMtitle,
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
            expanded : !this.state.expanded
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


    render(){
        return ( 
        <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
            <View style={[styles.container,{height: this.state.animation}]}>
                <View flexDirection ="row">
                <View padding = {8}>
                <Image source={arrofImages[this.state.DandMid]} style={styles.photo}/>
                </View>
                <View style={styles.nameandtitlecont} flex = {2} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.nameStyle}>{this.state.DandMname}</Text>
                    <Text style={styles.title}>{this.state.DandMtitle}</Text>
                </View>
                <View style={styles.emailcont}>
                <TouchableOpacity onPress = {() => Linking.openURL(arrofEmails[this.state.DandMid])}>
                <MatIcon name = "mail-outline" size = {40}/>
                </TouchableOpacity>
                </View>
                </View>
                <View flexDirection = "column">
                {this.renderView()}
                </View>
            </View>
        </TouchableHighlight>
        );
    }
}

var styles = ({
    container: {
        overflow:'hidden',
    },
    nameandtitlecont: {
        flexDirection: 'column'
    },
    nameStyle: {
        paddingTop: 8,
        marginRight: 8,
        marginLeft: 8,
        fontSize: 20,
        fontFamily: 'GillSans',
        fontWeight: '400'
    },
    title       : {
        paddingTop: 6,
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'GillSans-Light'
    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body        : {
        flexDirection: 'column',
        padding: 10,
        paddingTop: 30,
        paddingBottom: 10,
        paddingTop: 0
    },
    photo: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    emailcont: {
        marginRight: 17.5,
        justifyContent: 'center'
    } 
});

export default DandMPanel;