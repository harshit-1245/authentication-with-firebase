// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgNvWi4ll3OdSbaO2xIcxcfd9tECKoRFI',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'learning-firebase-47175',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: '711615931481',
  appId: '1:711615931481:android:62db15380ca247a22efd48',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
