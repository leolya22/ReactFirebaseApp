import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyANxDZgSF6sKkyIIPQr4Ev4OkpTPXjWzoQ",
    authDomain: "react2023leo.firebaseapp.com",
    projectId: "react2023leo",
    storageBucket: "react2023leo.appspot.com",
    messagingSenderId: "652079360176",
    appId: "1:652079360176:web:10a076f0837d4b3d903375"
};

firebase.initializeApp(firebaseConfig);

export default firebase;