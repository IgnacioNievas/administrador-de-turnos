import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDiQVvHwqsqv1ap6MaJRNHsIy813GuiIxg',
	authDomain: 'administrador-a3eb3.firebaseapp.com',
	projectId: 'administrador-a3eb3',
	storageBucket: 'administrador-a3eb3.appspot.com',
	messagingSenderId: '688344029237',
	appId: '1:688344029237:web:afdbd157e7cbba7043397c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
