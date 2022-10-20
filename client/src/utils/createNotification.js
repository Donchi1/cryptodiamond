import { db, auth } from '../database/firebaseDb'
import {  addDoc, serverTimestamp, collection } from 'firebase/firestore'

const createNotificationData = async ({ title, text, status } = noteData) => {
   await addDoc(
     collection(db, 'notifications', auth.currentUser.uid, 'notificationDatas'),
    {
      date: serverTimestamp(),
      title,
      text,
      status,
      recent: true,
      uid: auth.currentUser.uid,
    },
  )
}

export default createNotificationData
