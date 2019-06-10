import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDlyrrdsEkeePRTRCRnGiNmkG4gRdOvrz4",
    authDomain: "todoapp-36718.firebaseapp.com",
    databaseURL: "https://todoapp-36718.firebaseio.com",
    projectId: "todoapp-36718",
    storageBucket: "",
    messagingSenderId: "748062708235",
    appId: "1:748062708235:web:1fd6ca1a1c4b0789"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;