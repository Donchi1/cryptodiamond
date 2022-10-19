import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// export const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//   authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
//   appId: import.meta.env.REACT_APP_FIREBASE_APP,
//   measurementId: import.meta.env.REACT_APP_FIREBASE_MESUREMENT,
// }
const firebaseConfig = {
  apiKey: 'AIzaSyDhdVCY2VGN8fUY1pCv7D-4XgmB9v5kW_g',
  authDomain: 'cryptodiamond-b3d6f.firebaseapp.com',
  projectId: 'cryptodiamond-b3d6f',
  storageBucket: 'cryptodiamond-b3d6f.appspot.com',
  messagingSenderId: '697768059158',
  appId: '1:697768059158:web:8db57d72c73a3fd67eb037',
  measurementId: 'G-H5PTZ71D94',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export { app, db, auth, storage }
