import EventParticipants from "./pages/EventParticipants/EventParticipants";
import EventRegistration from "./pages/EventRegistration/EventRegistration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import EventsBoard from "./pages/EventsBoard/EventsBoard";

function App() {
  // const eventId = "123456789"; ///

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="*" element={<EventsBoard />} />
            <Route path="/events" element={<EventsBoard />} />
            <Route path="/registration/:id" element={<EventRegistration />} />
            <Route path="/view" element={<EventParticipants />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
