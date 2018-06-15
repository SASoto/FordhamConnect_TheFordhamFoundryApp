import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, FlatList} from 'react-native';

import StarredContactListItem from '../../components/StarredContactListItem';
import ContactListItem from '../../components/ContactListItem';

// let starredContacts = [
//     {'userID': '1'}, {'userID': '2'}, {'userID': '3'}
// ]

// let myData = [
//     { 'userID': '1', 'firstname': 'Fordham Foundry', 'content': 'hello'}, {'userID': '2', 'firstname': 'Mary Johnson','content': 'there'},
//     { 'userID': '3', 'firstname': 'Dagger John', 'content': "guys"},{ 'userID': '4', 'firstname': 'Fordham Foundry', 'content': 'hello'},
//     {'userID': '5', 'firstname': 'Mary Johnson','content': 'there'}, { 'userID': '6', 'firstname': 'Dagger John', 'content': "guys"},
//     { 'userID': '7', 'firstname': 'Fordham Foundry', 'content': 'hello'}, {'userID': '8', 'firstname': 'Mary Johnson','content': 'there'},
//     { 'userID': '9', 'firstname': 'Dagger John', 'content': "guys"},{ 'userID': '10', 'firstname': 'Fordham Foundry', 'content': 'hello'}, 
//     {'userID': '11', 'firstname': 'Mary Johnson','content': 'there'}, { 'userID': '12', 'firstname': 'Dagger John', 'content': "guys"},
//     { 'userID': '13', 'firstname': 'Fordham Foundry', 'content': 'hello'}, {'userID': '14', 'firstname': 'Mary Johnson','content': 'there'},
//     { 'userID': '15', 'firstname': 'Dagger John', 'content': "guys"}//]}]
// ]



const windowSize = Dimensions.get('window');
export default class contacts_screen extends Component {
	constructor(props) {
        super(props);

        this.state = {
            contactList: [],
            // firstContact: true,
            // firstFavContact: true,
            starredContacts: [
                {'userID': '1'}, {'userID': '2'}, {'userID': '3'}
            ],
            myData: [
                { 'userID': '1', 'firstname': 'Fordham Foundry', 'content': 'hello'}, {'userID': '2', 'firstname': 'Mary Johnson','content': 'there'},
                { 'userID': '3', 'firstname': 'Dagger John', 'content': "guys"},{ 'userID': '4', 'firstname': 'Lily', 'content': 'hello'},
                {'userID': '5', 'firstname': 'Paul','content': 'there'}, { 'userID': '6', 'firstname': 'Al', 'content': "guys"},
                { 'userID': '7', 'firstname': 'Milton', 'content': 'hello'}, {'userID': '8', 'firstname': 'Anthony','content': 'there'},
                { 'userID': '9', 'firstname': 'Mary', 'content': "guys"},{ 'userID': '10', 'firstname': 'John', 'content': 'hello'}, 
                {'userID': '11', 'firstname': 'Trevor','content': 'there'}, { 'userID': '12', 'firstname': 'Deirdre', 'content': "guys"},
                { 'userID': '13', 'firstname': 'Michael', 'content': 'hello'}, {'userID': '14', 'firstname': 'Kevin','content': 'there'},
                { 'userID': '15', 'firstname': 'Allan', 'content': "guys"}//]}]
            ]
        }

        // this.getCombinedContactList = this.getCombinedContactList.bind(this);
        // this.getFavoritedContacts = this.getFavoritedContacts.bind(this);
        // this.searchForUserID = this.searchForUserID.bind(this);
        // this.sortContactList = this.sortContactList.bind(this);
        // this.checkIfFavorited = this.checkIfFavorited.bind(this);
    }

    componentDidMount() {
        this.getCombinedContactList()
    }

    // getOnlyContent() {

    // 	var onlyContentArr = []
    // 	// console.log(myData['A'].length)
    // 	// console.log(myData['A'][0].User.length)
    // 	// console.log(myData['A'][0].User[0].content)
    // 	for (var i = 0; i < myData['A'][0].User.length; i++) {
    // 		onlyContentArr.push(myData['A'][0].User[i].content);
    // 	}

    // 	return onlyContentArr;
    // }

	sortContactList(myArray) {
		//var onlyContentArr = this.getOnlyContent();
        function compare(a,b) {
          if (a.firstname < b.firstname)
            return -1;
          if (a.firstname > b.firstname)
            return 1;
          return 0;
        }

        return myArray.sort(compare);
        //console.log("SORTED: ", myData)


        // for(var i=0; i<myData.length; i++) {
        //     var valA = myData[i].content;
        //     var valB = myData[i+1].content;
        // 	myData[i].sort(function(a,b) {
        // 		var nameA = a.toLowerCase(), nameB = b.toLowerCase();
        // 		if(nameA < nameB)
        // 			return -1;
        // 		else if (nameA > nameB)
        // 			return 1;
        // 		else
        // 			return 0;
        // 	})
        // }

    	//return myData
    }

    //Searches for specified userID
    searchForUserID(nameKey, myArray) {
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].userID === nameKey) {
                return i;
            }
        }
    }

    checkIfFavorited(passedUID) {
        for (var i=0; i < this.state.starredContacts.length; i++) {
            if (this.state.starredContacts[i].userID === passedUID) {
                return true;
            }
        }
    }

    getFavoritedContacts() {
        var favoritedContactsArr = [];

        for(var i=0; i<this.state.starredContacts.length; i++) {
           var indexOfUser =  this.searchForUserID(this.state.starredContacts[i].userID, this.state.myData);
           var contactUID = this.state.myData[indexOfUser].userID;
           var contactFName = this.state.myData[indexOfUser].firstname;

           var contactObj = {'userID':contactUID, 'firstname':contactFName};
           //console.log("OBJECT: ", contactObj);
           favoritedContactsArr.push(contactObj);
           this.setState({myData: this.state.myData.splice(indexOfUser,1)})
        }

        //console.log("AFTER REMOVE: ", myData)
        
        return favoritedContactsArr;
    }

    getCombinedContactList() {
        var favoritedContactsArr = this.getFavoritedContacts()
        favoritedContactsArr = this.sortContactList(favoritedContactsArr);
        // this.setState({lengthOfFavorites: favoritedContactsArr.length})
        
        // //console.log("BEFORE REMOVE: ", myData)
        // for(var i=0; i<favoritedContactsArr.length; i++) {
        //     //console.log("FAVORITED UID: ", favoritedContactsArr[i].userID)
        //     var indexToDelete = this.searchForUserID(favoritedContactsArr[i].userID,myData);
        //     myData.splice(indexToDelete,1);
        // }
        // //console.log("AFTER REMOVE: ", myData)

        var joinedData = favoritedContactsArr.concat(this.state.myData);
        //joinedData = this.sortContactList(joinedData);
        // console.log("BEFORE SET STATE: ", joinedData)
        // console.log("STATE IS BEFORE: ", this.state.contactList);


        this.setState({contactList: joinedData});
        
        // console.log("STATE IS AFTER: ", this.state.contactList);
        return joinedData
    }

    renderListItem(item) {
        var isFavorited = this.checkIfFavorited(item.userID)
        if(isFavorited) {
            return (
                <View flex={1} marginTop={25}>
                <StarredContactListItem favorited={true} destination="ContactProfile" navigation={this.props.navigation} userID={item.userID} userfname={item.firstname} usercontent={item.content}/>
                </View>
            )

        } else {
            return (
                <View flex={1} marginTop={15}>
                <StarredContactListItem favorited={false} destination="ContactProfile" navigation={this.props.navigation} userID={item.userID} userfname={item.firstname} usercontent={item.content}/>
                </View>
           )
        }
    }

    whatIsRendered() {
        if(this.state.contactList.length > 0) {
            return (
                <View flex={1}>
                    
                    <FlatList
                    data={this.state.contactList}
                    //KEY COULD BE USERID
                    renderItem={({item}) =>
                        // console.log(item)
                        <View>
                        {this.renderListItem(item)}
                        </View>
                        
                    }
                    keyExtractor={(item, index) => item.userID}//{(x,i) => i.toString()} 
                    />
        
                </View>
            );
            // console.log("EMPTY: ",this.state.contactList)
        }

        return (
            <View flex={1} justifyContent="center" alignItems="center">
                <Text> Loading contacts ... </Text>
            </View>
        )
        // console.log("NOT EMPTY")
        // console.log("STATE IS AFTER: ", this.state.contactList);
        
    }

	render() {
        //console.log("COMBINED: ",joinedData)
        //console.log("STATE IS AFTER: ", this.state.contactList);
        return (
            <View flex={1}>
            {this.whatIsRendered()}
            </View>
        )
	}
}

// const styles = ({
	
// })