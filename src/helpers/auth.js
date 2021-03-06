import { ref, firebaseAuth } from '../config/constants'

export function auth(email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function signInWithFacebook() {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
    .then((result) => {
      var token = result.credential.accessToken
      var user = result.user
      console.log(token, user)
    })
    .catch((error) => console.log('Oops', error))
}

export function signInWithEmail(cb) {
  return firebaseAuth().signInWithPopup(new firebaseAuth.EmailAuthProvider())
    .then((result) => {
        cb(result.credential)
      })
    .catch((error) => console.log('Oops', error))
}
