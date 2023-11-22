import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9qJs3zo4el-PCoelpR9QNvd7C6VzOyl8",
    authDomain: "https://timbre-pas.firebaseapp.com",
    databaseURL: "https://timbre-pas-default-rtdb.firebaseio.com",
    projectId: "timbre-pas",
    storageBucket: "timbre-pas.appspot.com",
    messagingSenderId: "94183082992",
    appId: "1:94183082992:web:b242197ea73b1611a76b35",
    measurementId: "G-16PJB54563"
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{ firebase };