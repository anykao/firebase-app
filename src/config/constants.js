import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAuKVukKfg58l7MJS7Qr8uFEK0mP8LRwaU",
  authDomain: "anykao-5a6b5.firebaseapp.com",
  databaseURL: "https://anykao-5a6b5.firebaseio.com",
  storageBucket: "anykao-5a6b5.appspot.com",
  messagingSenderId: "594632193797"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
