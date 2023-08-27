import Firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBxbwkNWQ1wzMdaUsf1wL8cQdNd93GRrw8",
    authDomain: "quiz-4051f.firebaseapp.com",
    databaseURL: "https://quiz-4051f-default-rtdb.firebaseio.com",
    projectId: "quiz-4051f",
    storageBucket: "quiz-4051f.appspot.com",
    messagingSenderId: "941783998367",
    appId: "1:941783998367:web:5f3bc4a8a72b6b6e9327aa",
    measurementId: "G-L019S2KEFN"
};

// Initialize Firebase
// if (!firebase.apps.length) {
try {
    Firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}
// }

export default Firebase;
