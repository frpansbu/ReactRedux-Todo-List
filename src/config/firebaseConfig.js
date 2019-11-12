import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBBWCPKSQLrjy8NBqBT6515meLHBm18Wfg",
    authDomain: "todo-rrf-316-f5cc3.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-f5cc3.firebaseio.com",
    projectId: "todo-rrf-316-f5cc3",
    storageBucket: "todo-rrf-316-f5cc3.appspot.com",
    messagingSenderId: "553174073304",
    appId: "1:553174073304:web:d67addca62f2d49140bcad",
    measurementId: "G-1J6T9CJ55D"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;