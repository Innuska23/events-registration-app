import EventCard from "../../components/EventCard/EventCard";
import { useEventsListQuery } from "../../redux/api/eventsApi";

import styles from "./EventsBoard.module.css";

const EventsBoard = () => {
  // const [events, setEvents] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const { data: events } = useEventsListQuery();
  console.log("🚀 ~ EventsBoard ~ events:", events);

  return (
    <div>
      <h1>Events</h1>
      <div className={styles.eventsContainer}>
        {" "}
        {events?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Pagination component */}
    </div>
  );
};

export default EventsBoard;
