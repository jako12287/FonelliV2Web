// Importa las bibliotecas necesarias para Firebase Messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

// Inicializa Firebase en el Service Worker
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

// Recupera una instancia de Firebase Messaging
const messaging = firebase.messaging();

// Maneja mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Mensaje en segundo plano recibido:",
    payload
  );

  // Datos para la notificación
  const notificationTitle = payload.notification?.title || "Título por defecto";
  const notificationBody =
    payload.notification?.body || "Tienes un nuevo mensaje.";
  const notificationOptions = {
    body: notificationBody,
    icon: "/icon.png", // Asegúrate de que la ruta sea correcta
    vibrate: [100, 50, 100],
    data: { url: "https://www.fonellipedidos.com" }, // URL personalizada
  };

  // Muestra la notificación al usuario
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
