import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyByx2dcqeelRkZaplDpImZ6Mnoo9x6b3as",
  authDomain: "cashsale-app.firebaseapp.com",
  databaseURL: "https://cashsale-app-default-rtdb.firebaseio.com",
  projectId: "cashsale-app",
  storageBucket: "cashsale-app.appspot.com",
  messagingSenderId: "731347246512",
  appId: "1:731347246512:web:afaf7636713829d4360a75",
  measurementId: "G-CHZVTF10FZ"
}

// if (!firebase.apps.length) {
//     firebase.initializeApp(config)
// }
firebase.initializeApp(config);

export const db = firebase.database()
export default firebase