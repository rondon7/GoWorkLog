import * as firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCp2nZgxv0dDUqccTdJensCEm2lKZN6jmM',
  authDomain: 'goworklog-2a7ff.firebaseapp.com',
  databaseURL: 'https://goworklog-2a7ff.firebaseio.com',
  projectId: 'goworklog-2a7ff',
  storageBucket: 'goworklog-2a7ff.appspot.com',
  messagingSenderId: '1079049916295',
  appId: '1:1079049916295:android:b5ec9382fca30a54bb0d22',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase};
