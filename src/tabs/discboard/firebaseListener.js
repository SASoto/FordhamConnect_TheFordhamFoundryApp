import firebase from 'firebase';
//import {setListener} from './firebaseListener';
//export const endpoints = {
// export var MAIN_END_POINT = null;
//};

export const getReplies = (updaterFn) => {
	console.log("UPDATERFN: ",updaterFn)
	//console.log("MAIN_END_POINT: ", replyEndpoint)
	//console.log("GOT replyEndpoint: ",replyEndpoint)
	//console.log("UPDATERFN: ",updaterFn)
	setListener('/discBoardreplies/-LGlVd-Rrxh-Zp7OqqAx/',updaterFn);
}

export const setListener = (endpoint,updaterFn) => {
   firebase.database().ref(endpoint).on('value', updaterFn);
   //return () => firebase.database().ref(endpoint).off();
}