import { db, auth } from '../database/firebaseDb'
import { doc, addDoc, serverTimestamp } from 'firebase/firestore'

const createNotificationData = async ({ title, text, status } = noteData) => {
  return await addDoc(
    doc(db, 'notifications', auth.currentUser.uid, 'notificationDatas'),
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
