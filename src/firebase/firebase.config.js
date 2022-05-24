// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0GINxM2aWG1xPrHH-4YPkZghtwEyCLGc',
  authDomain: 'fir-react-tut-c3d9a.firebaseapp.com',
  projectId: 'fir-react-tut-c3d9a',
  storageBucket: 'fir-react-tut-c3d9a.appspot.com',
  messagingSenderId: '90505595252',
  appId: '1:90505595252:web:b231273bce3341ce324421',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
