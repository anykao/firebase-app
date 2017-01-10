import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCfVdUXZ23oxQ2Vs47rVwUUFBhpzzHXRl0",
  authDomain: "anykao-185ad.firebaseapp.com",
  databaseURL: "https://anykao-185ad.firebaseio.com",
  storageBucket: "anykao-185ad.appspot.com",
  messagingSenderId: "630091638331"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
