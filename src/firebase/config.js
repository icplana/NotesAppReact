// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const { 
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID,
//   VITE_MEASUREMENTID
// } = getEnvironments()


// console.log( import.meta.env )
// console.log(process.env)


// Your web app's Firebase configuration

//Produccion
const firebaseConfig = {
  apiKey: "AIzaSyAiRtHad7hVBdg1ob83F_-ip03FGMh816U",
  authDomain: "react-cursos-ec023.firebaseapp.com",
  projectId: "react-cursos-ec023",
  storageBucket: "react-cursos-ec023.appspot.com",
  messagingSenderId: "82711057362",
  appId: "1:82711057362:web:6165187cc8b120f20aee0b"
};

//Testing
// const firebaseConfig =  {
//   apiKey: 'AIzaSyAO0HbL56kzMIzUFETyudKjoIAWAACLsqE',
//   authDomain: 'react-cursos-testing-22769.firebaseapp.com',
//   projectId: 'react-cursos-testing-22769',
//   storageBucket: 'react-cursos-testing-22769.appspot.com',
//   messagingSenderId: '837319059406',
//   appId: '1:837319059406:web:2854103b97e5d73fb92d9f',
//   measurementId: 'G-YJF63FN2P'
// }


//VARIABLES DE ENTORNO
// const firebaseConfig = {
//   apiKey: VITE_APIKEY,
//   authDomain: VITE_AUTHDOMAIN,
//   projectId: VITE_PROJECTID,
//   storageBucket: VITE_STORAGEBUCKET,
//   messagingSenderId: VITE_MESSAGINGSENDERID,
//   appId: VITE_APPID,
//   measurementId: VITE_MEASUREMENTID
// };


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )