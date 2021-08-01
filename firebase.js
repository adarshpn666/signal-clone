import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDNRWfU_p7T0N7M5CdtH0Qy2cByQ2P8SiM",
    authDomain: "signal-clone-1fe83.firebaseapp.com",
    projectId: "signal-clone-1fe83",
    storageBucket: "signal-clone-1fe83.appspot.com",
    messagingSenderId: "266453233255",
    appId: "1:266453233255:web:ccd2dc8b56397112e1eec2"
  };

  let app;
  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const db = firebase.firestore();
  const auth = firebase.auth();

  export {db, auth};