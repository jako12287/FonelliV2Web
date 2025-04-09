import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import store from "./redux/store";
import { registerServiceWorker } from "./api/firebaseConfig";

function App() {
  registerServiceWorker();
  // registerOnMessageListener();

  return (
    <Provider store={store}>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
