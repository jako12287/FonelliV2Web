import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { saveTokenToDatabase } from ".";

export const vapidKey =
  "BDScco0DXtm8g8J5fL3d53YTWWPKH5WkWa6Df5GGXq4YmVZj_OPAGrnt_6fqnX1gOMV3sMs--25ctPIOX4n__sQ";
const firebaseConfig = {
  apiKey: "AIzaSyB0X6zSYT77qeD7vZY37IXBiStUCo_YpNM",
  authDomain: "fonelli-app.firebaseapp.com",
  databaseURL: "https://fonelli-app-default-rtdb.firebaseio.com",
  projectId: "fonelli-app",
  storageBucket: "fonelli-app.firebasestorage.app",
  messagingSenderId: "881976711903",
  appId: "1:881976711903:web:e703952eb514af07d7276a",
  measurementId: "G-ES6PVJCR1R",
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
