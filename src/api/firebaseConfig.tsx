import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveTokenToDatabase } from "."; // Asegúrate de que este método esté bien definido

// Variables de entorno
export const vapidKey = import.meta.env.VITE_vapidKey;
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase si no está inicializado
export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
export const messaging = getMessaging(app);

// Función para solicitar permisos de notificación y guardar el token
export const requestPermission = async (userId: string) => {
  try {
    const response = await Notification.requestPermission();

    if (response === "granted") {
      const token = await getToken(messaging, { vapidKey });

      if (token) {
        console.log("Token obtenido:", token);
        await saveTokenToDatabase(userId, token); // Guarda el token en la base de datos
      } else {
        console.warn("No se pudo obtener el token de notificación");
      }
    } else {
      console.warn("Permiso de notificaciones denegado");
    }
  } catch (error) {
    console.error("Error al solicitar el permiso de notificaciones:", error);
  }
};

// Configura un único listener para las notificaciones


// Registra el Service Worker si no está ya registrado
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length === 0) {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("Service Worker registrado con éxito:", registration);
      } else {
        console.log("Service Worker ya estaba registrado");
      }
    } catch (error) {
      console.error("Error al registrar el Service Worker:", error);
    }
  }
};
