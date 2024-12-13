// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyB0X6zSYT77qeD7vZY37IXBiStUCo_YpNM",
//     authDomain: "fonelli-app.firebaseapp.com",
//     databaseURL: "https://fonelli-app-default-rtdb.firebaseio.com",
//     projectId: "fonelli-app",
//     storageBucket: "fonelli-app.firebasestorage.app",
//     messagingSenderId: "881976711903",
//     appId: "1:881976711903:web:e703952eb514af07d7276a",
//     measurementId: "G-ES6PVJCR1R",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: ''
//     };

//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

// Inicializa la app de Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0X6zSYT77qeD7vZY37IXBiStUCo_YpNM",
  authDomain: "fonelli-app.firebaseapp.com",
  databaseURL: "https://fonelli-app-default-rtdb.firebaseio.com",
  projectId: "fonelli-app",
  storageBucket: "fonelli-app.firebasestorage.app",
  messagingSenderId: "881976711903",
  appId: "1:881976711903:web:e703952eb514af07d7276a",
  measurementId: "G-ES6PVJCR1R",
});

// Recupera una instancia de Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Estado del permiso:", Notification.permission);

  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Usa los datos del payload para obtener el título y el cuerpo de la notificación
  const notificationTitle = payload.notification.title || "Default Title";
  const notificationBody = payload.notification.body || "Tienes un nuevo mensaje.";

  const notificationOptions = {
    body: notificationBody,
    vibrate: [100, 50, 100],
    data: { url: "https://miapp.com/mensajes" },
    icon: "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png",
  };

  // Mostrar la notificación con los datos extraídos del payload
  self.registration.showNotification(notificationTitle, notificationOptions);
});

