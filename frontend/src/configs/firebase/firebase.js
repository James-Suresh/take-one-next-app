// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQfDX6dQJhg6p7m-fhwpvc5d_Km906M7w',
  authDomain: 'take-one-app.firebaseapp.com',
  projectId: 'take-one-app',
  storageBucket: 'take-one-app.appspot.com',
  messagingSenderId: '233445033779',
  appId: '1:233445033779:web:bec740697149927a2fe046',
  measurementId: 'G-SV3XS6003B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// // Import the functions you need from the SDKs you need
// import Firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
//   measurementId: ''
// }

// // Initialize Firebase
// if (!Firebase.apps.length) {
//   Firebase.initializeApp(firebaseConfig)
// }

// export default Firebase
