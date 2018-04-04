importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAnkUsz67OmDrDfmeudP7qzl7GOUf3fiH0",
  authDomain: "quackquack-quackchat.firebaseapp.com",
  databaseURL: "https://quackquack-quackchat.firebaseio.com",
  projectId: "quackquack-quackchat",
  storageBucket: "",
  messagingSenderId: "571642064077"
});

const messaging = firebase.messaging();
