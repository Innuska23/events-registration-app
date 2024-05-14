import EventParticipants from "./pages/EventParticipants/EventParticipants";
import EventRegistration from "./pages/EventRegistration/EventRegistration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EventsBoard from "./pages/EventsBoard/EventsBoard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="*" element={<EventsBoard />} />
            <Route path="/events" element={<EventsBoard />} />
            <Route path="/registration/:id" element={<EventRegistration />} />
            <Route path="/view/:id" element={<EventParticipants />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
