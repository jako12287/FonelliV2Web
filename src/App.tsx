import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import  { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import store from "./redux/store";


function App() {

//   console.log("Firebase app initialized:", app);
// const messaging = getMessaging();
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   toast()
//   // ...
// });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
}

  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Toaster />
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
