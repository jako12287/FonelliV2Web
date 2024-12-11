import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveTokenToDatabase } from ".";

export const vapidKey = import.meta.env.VITE_vapidKey;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = async (userId: string) => {
  try {
    const response = await Notification.requestPermission();
    console.log("TCL: requestPermission -> response", response);
    if (response === "granted") {
      console.log("Permission granted!");
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        saveTokenToDatabase(userId, token);
      }
      console.log("TCL: requestPermission -> token", token);
    } else {
      console.log("Permission denied!");
    }
  } catch (error) {}
};
