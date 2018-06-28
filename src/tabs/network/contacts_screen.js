import React, { Component } from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button, FlatList} from 'react-native';
import firebase from 'firebase';

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
            starredContacts: [],
                //{'userID': '1'}, {'userID': '2'}, {'userID': '3'}
            //],
              myData: [],//[
            //     { 'userID': '1', 'firstname': 'Fordham Foundry', 'content': 'hello'}, {'userID': '2', 'firstname': 'Mary Johnson','content': 'there'},
            //     { 'userID': '3', 'firstname': 'Dagger John', 'content': "guys"},{ 'userID': '4', 'firstname': 'Lily', 'content': 'hello'},
            //     {'userID': '5', 'firstname': 'Paul','content': 'there'}, { 'userID': '6', 'firstname': 'Al', 'content': "guys"},
            //     { 'userID': '7', 'firstname': 'Milton', 'content': 'hello'}, {'userID': '8', 'firstname': 'Anthony','content': 'there'},
            //     { 'userID': '9', 'firstname': 'Mary', 'content': "guys"},{ 'userID': '10', 'firstname': 'John', 'content': 'hello'}, 
            //     {'userID': '11', 'firstname': 'Trevor','content': 'there'}, { 'userID': '12', 'firstname': 'Deirdre', 'content': "guys"},
            //     { 'userID': '13', 'firstname': 'Michael', 'content': 'hello'}, {'userID': '14', 'firstname': 'Kevin','content': 'there'},
            //     { 'userID': '15', 'firstname': 'Allan', 'content': "guys"}//]}]
            // ],

        }
        //console.log("My Data is ", this.state.myData)
        // this.getCombinedContactList = this.getCombinedContactList.bind(this);
        // this.getFavoritedContacts = this.getFavoritedContacts.bind(this);
        // this.searchForUserID = this.searchForUserID.bind(this);
        // this.sortContactList = this.sortContactList.bind(this);
        // this.checkIfFavorited = this.checkIfFavorited.bind(this);
    }

    componentWillMount() {
        var fullContactsArr = [];
        //var testArray = [];
        //console.log("Trying to construct our full user list...")
        //var database = firebase.database()
        usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        return firebase.database().ref('users/').once('value')
        .then(function(snapshot) {
        //console.log("Found a reference to the list, by firstnames...")
        // Make sure we remove all previous listeners..??
        //usersList.off();
        //console.log(usersList)
        //console.log("Other previous listeners disabled.")
        //usersList.on('value', function(snapshot) {
            //console.log(snapshot.val())
            //console.log("And foo, also.")
            snapshot.forEach(function(childSnapshot) {
                //console.log("Another person in da list...")
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childData.firstname + ' ' + childData.lastname)
                var contactObj = {'userID':childKey, 'fullname':childData.firstname + ' ' + childData.lastname};//, 'initials': childData.initials};
                //console.log("OBJECT: ", contactObj);
                fullContactsArr.push(contactObj);
                //testArray.push("foo")
            });
            //console.log("The full array should look like...", fullContactsArr)
            //console.log("And the first element would be...", fullContactsArr[0])
            //console.log("Length of fullContactsArr is ", fullContactsArr.length)
            //console.log("Length of testArray is ", testArray.length)

        }).then(() => {
            this.setState({myData: fullContactsArr})
        })
        //console.log("In componentWillMount, myData is : ", this.state.myData)
        //console.log("In componentWillMount, fullContactsArr is : ", fullContactsArr)
    }

    componentDidMount() {
        this.getCombinedContactList()
        //console.log("Trying to generate the contact list from the database...")
        //this.usersRef = firebase.database().ref('users').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
        // Make sure we remove all previous listeners.
        //this.usersRef.off();
        //usersRef.on('value', function(snapshot) {
          //snapshot.forEach(function(childSnapshot) {
            //console.log("Another first name...")
            //var childData = childSnapshot.val();
            //console.log(childData.firstname + ' ' + childData.lastname)
          //});
        //});        
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
          if (a.fullname < b.fullname)
            return -1;
          if (a.fullname > b.fullname)
            return 1;
          return 0;
        }

        return myArray.sort(compare);
        //console.log("SORTED: ", myData)


 //        // for(var i=0; i<myData.length; i++) {
 //        //     var valA = myData[i].content;
 //        //     var valB = myData[i+1].content;
 //        // 	myData[i].sort(function(a,b) {
 //        // 		var nameA = a.toLowerCase(), nameB = b.toLowerCase();
 //        // 		if(nameA < nameB)
 //        // 			return -1;
 //        // 		else if (nameA > nameB)
 //        // 			return 1;
 //        // 		else
 //        // 			return 0;
 //        // 	})
 //        // }

 //    	//return myData
    }

    //Searches for specified userID
    // searchForUserID(nameKey, myArray) {
    //     for (var i=0; i < myArray.length; i++) {
    //         if (myArray[i].userID === nameKey) {
    //             return i;
    //         }
    //     }
    // }

    checkIfFavorited(passedUID) {
        for (var i=0; i < this.state.starredContacts.length; i++) {
            if (this.state.starredContacts[i].userID === passedUID) {
                return true;
            }
        }
    }

    getFavoritedContacts() {

        //var removeKeysArr = [];
        var favoritedContactsArr = [];
        // for(var i=0; i<this.state.starredContacts.length; i++) {
        //    //var indexOfUser =  this.searchForUserID(this.state.starredContacts[i].userID, this.state.myData);
        //    //var contactUID = this.state.myData[indexOfUser].userID;
        //    //var contactFName = this.state.myData[indexOfUser].fullname;

        //    //var contactObj = {'userID':contactUID, 'fullname':contactFName};
        //    //console.log("OBJECT: ", contactObj);
        //    //favoritedContactsArr.push(contactObj);
        //    //this.setState({myData: this.state.myData.splice(indexOfUser,1)})
        // }
        console.log("Once again, MyData is ", this.state.myData)
        console.log("Trying to get the favorites for this user...")

        var currentUserId = firebase.auth().currentUser.uid;
        //usersFavs = firebase.database().ref('favorite_users/' + currentUserId).orderByValue();//.startAt('Cha').endAt('Cha\uf8ff');
        return firebase.database().ref('favorite_users/' + currentUserId).once('value').then(function(snapshot) {
        //console.log("Pulled a reference to userFavs.")
        //console.log("usersFavs is ", usersFavs)
        // Make sure we remove all previous listeners..?
        //usersFavs.off();

        //usersFavs.on('value', function(snapshot) {

            //console.log("Testing...")
          snapshot.forEach(function(childSnapshot) {
            //console.log("Another name...")
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            //console.log(childKey)
            //console.log(childData)
            //var favObj = {'userID':childKey, 'fullname':childData};
            //console.log("Pushing OBJECT: " + childKey + ' ' + childData);
            favoritedContactsArr.push({userID: childKey, fullname: childData});
            console.log("After push, favoritedContactsArr is ", favoritedContactsArr)
            //alert("Within forEach " + favoritedContactsArr.length);
            //removeKeysArr.push(favObj.userID);
            //console.log("Within forEach, My Data is ", this.state.myData)
            //this.setState({myData: this.state.myData.splice(childKey,1)})        //Removes the contact from the full contact list since it's a favorite.
          });
        //console.log("Can we get myData here? ", this.state.myData)
        
        }).then(() => {
        //setTimeout(() => {     
            //console.log("Favorites to remove are ", favoritedContactsArr)
            //console.log("removeKeysArr is ", removeKeysArr)
            //console.log("First element of favoritedContactsArr is ", favoritedContactsArr[0])
            //alert("Within getFavoritedContacts, it has length " + favoritedContactsArr.length);
            //console.log("favoritedContactsArr.length is ", Object.keys(favoritedContactsArr).length)
            for(var i=0; i<favoritedContactsArr.length; i++) {
                //console.log("Iteration number ", i)
                //console.log("Here myData is ", this.state.myData)
                //console.log("And the userID to be removed is ", favoritedContactsArr[i].userID)
                for(var j=0; j<this.state.myData.length; j++) {
                    //console.log("Checking fav " + favoritedContactsArr[i].userID + " against user " + this.state.myData[j].userID)
                    //console.log("j Iteration is ", j)
                    if(favoritedContactsArr[i].userID == this.state.myData[j].userID){
                        this.state.myData.splice(j,1);
                        //console.log("Removing this one!")
                        break;
                    }
                }
                //this.setState({myData: this.state.myData.splice(favoritedContactsArr[i].userID,1)})
            }
        //},2000)
            console.log("AFTER INITIAL REMOVE: ", this.state.myData)
        
            this.setState({starredContacts: favoritedContactsArr})
            return favoritedContactsArr;
        })
    }

    getCombinedContactList() {
        //console.log("My Data is ", this.state.myData)
        //var favoritedContactsArr = this.getFavoritedContacts()
        var favoritedContactsArr = [];
        var currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('favorite_users/' + currentUserId).once('value')
        .then(function(snapshot) {
        // usersFavs = firebase.database().ref('favorite_users/' + currentUserId).orderByValue();
        // usersFavs.on('value', function(snapshot) {

            //console.log("Testing...")
          snapshot.forEach(function(childSnapshot) {
            //console.log("Another name...")
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            //console.log(childKey)
            //console.log(childData)
            //var favObj = {'userID':childKey, 'fullname':childData};
            console.log("Pushing yet another: " + childKey + ' ' + childData);
            favoritedContactsArr.push({userID: childKey, fullname: childData});
            console.log("After NEW push, favoritedContactsArr is ", favoritedContactsArr)
            //alert("Within forEach " + favoritedContactsArr.length);
            //removeKeysArr.push(favObj.userID);
            //console.log("Within forEach, My Data is ", this.state.myData)
            //this.setState({myData: this.state.myData.splice(childKey,1)})        //Removes the contact from the full contact list since it's a favorite.
          })
        }); 
        this.getFavoritedContacts()
        .then(() => {
        //console.log("Favs array is ", favoritedContactsArr)
        favoritedContactsArr = this.sortContactList(favoritedContactsArr)
        //console.log("And sorted, it is...")
        //  NEED THIS LATER favoritedContactsArr = this.sortContactList(favoritedContactsArr);
        // this.setState({lengthOfFavorites: favoritedContactsArr.length})
        
        // //console.log("BEFORE REMOVE: ", myData)
        // for(var i=0; i<favoritedContactsArr.length; i++) {
        //     //console.log("FAVORITED UID: ", favoritedContactsArr[i].userID)
        //     var indexToDelete = this.searchForUserID(favoritedContactsArr[i].userID,myData);
        //     myData.splice(indexToDelete,1);
        // }
        //setTimeout(() => {
        console.log("AFTER REMOVE: ", this.state.myData)
        //console.log("FIRST ELEMENT OF myData is : ", this.state.myData[0])
        this.state.myData = this.sortContactList(this.state.myData)
        var joinedData = favoritedContactsArr.concat(this.state.myData);
        this.setState({contactList: joinedData});
        //joinedData = this.sortContactList(joinedData);
        //console.log("at the end of getCombinedContactList joinedData is ", joinedData)
        console.log("at the end of getCombinedContactList contactList is ", this.state.contactList)        
        // console.log("STATE IS AFTER: ", this.state.contactList);
        return joinedData
        //},4000)
        })

        // console.log("BEFORE SET STATE: ", joinedData)
        // console.log("STATE IS BEFORE: ", this.state.contactList);



    }


    changeFavoritedStatus(passedUID, removeOrAdd) {
        //console.log('SOMEONE NEW HAS BEEN FAVORITED')
        this.setState({contactList: []});
        //console.log("passed uid: ", passedUID);
        //console.log("passed value: ", removeOrAdd);

        if(removeOrAdd) {
            // HANDLES REMOVING FROM FAVORITED LIST
            var currentUserId = firebase.auth().currentUser.uid;
            // add uid (object) to contact list
            console.log("Adding the contact " + passedUID + " back to the full contact list.")
            
            // remove uid (object) from favorited list
            firebase.database().ref('favorite_users/' + currentUserId + '/' + passedUID).remove()
            .then(() => {   
                var fullContactsArr = this.state.myData;
                //usersList = firebase.database().ref('users/').orderByChild('firstname');//.startAt('Cha').endAt('Cha\uf8ff');
                return firebase.database().ref('/users/' + passedUID).once('value')
                .then(function(snapshot) {
                    //console.log("Another person in da list...")
                    var userKey = snapshot.key;
                    var userData = snapshot.val();
                    var contactObj = {'userID':userKey, 'fullname':userData.firstname + ' ' + userData.lastname};//, 'initials': childData.initials};
                    //console.log("OBJECT: ", contactObj);
                    fullContactsArr.push(contactObj);
                    //testArray.push("foo")
                })
                .then(() => {
                    this.setState({myData: fullContactsArr})
                })
                .then(() => {
                    console.log(passedUID + " was removed from the favorites of user " + currentUserId + " on the server")
                // call get CombinedContactList()
                this.getCombinedContactList()  
                })
            })
        }
        else {
            // HANDLES ADDING TO FAVORITED LIST
            var currentUserId = firebase.auth().currentUser.uid;
            // add passeduid to favorited list
            console.log("Adding the contact " + passedUID + " back to the favorites list.")
            firebase.database().ref('/users/' + passedUID).once('value').then(function(snapshot) {
                var fullName = (snapshot.val().firstname + " " + snapshot.val().lastname);
                console.log("Fullname is initially " + fullName)
                firebase.database().ref('favorite_users/' + currentUserId + '/' + passedUID).set(fullName)
                // ...
            })
            // .then(() => {
            //     console.log("Fullname is now" + fullName)
                
              
            // })
            // call getCombinedContactList();
            .then(() => {
                this.getCombinedContactList()
            })
            //var fullName = firebase.database().ref('users/' + passedUID + '/firstname/') + " " + firebase.database().ref('users/' + passedUID + '/lastname/')
            //var lastName = firebase.database().ref('/users/' + passedUID + '/lastname/')
            // search for index of passed uid in contactlist
            
        }   

    }

    renderListItem(item) {
        var isFavorited = this.checkIfFavorited(item.userID)
        if(isFavorited) {
            return (
                <View flex={1} marginTop={25}>
                <StarredContactListItem favorited={true} destination="ContactProfile" navigation={this.props.navigation} changeFavoritedStatus={this.changeFavoritedStatus.bind(this)} userID={item.userID} userfname={item.fullname} usercontent={item.content}/>
                </View>
            )

        } else {
            return (
                <View flex={1} marginTop={15}>
                <StarredContactListItem favorited={false} destination="ContactProfile" navigation={this.props.navigation} changeFavoritedStatus={this.changeFavoritedStatus.bind(this)} userID={item.userID} userfname={item.fullname} usercontent={item.content}/>
                </View>
           )
        }
    }

    whatIsRendered() {
        //console.log("In whatIsRendered, My data is: ",this.state.myData);
        //console.log("In whatIsRendered, the length of myData is: ", this.state.myData.length);
        if(this.state.contactList.length > 0) {
            //console.log("My Data is ", this.state.myData)
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
        //setTimeout(() => {
        //console.log("COMBINED: ",joinedData)
        //console.log("STATE IS AFTER: ", this.state.contactList);
        //},10000)
        return (
            <View flex={1}>
            {this.whatIsRendered()}
            </View>
        )
	}
}

// const styles = ({
	
// })