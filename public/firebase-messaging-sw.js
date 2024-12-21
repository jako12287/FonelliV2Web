importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB0X6zSYT77qeD7vZY37IXBiStUCo_YpNM",
  authDomain: "fonelli-app.firebaseapp.com",
  databaseURL: "https://fonelli-app-default-rtdb.firebaseio.com",
  projectId: "fonelli-app",
  storageBucket: "fonelli-app.firebasestorage.app",
  messagingSenderId: "881976711903",
  appId: "1:881976711903:web:e703952eb514af07d7276a",
  measurementId: "G-ES6PVJCR1R",
});

// const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log(
    "[firebase-messaging-sw.js] Notificación clickeada:",
    event.notification
  );
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una ventana abierta con la URL, enfócala
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // Si no hay una ventana abierta, ábrela
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
