import { useState, useEffect } from "react";
import axios from "axios";

import EventCard from "../../components/EventCard/EventCard";

const EventsBoard = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `/api/events?page=${currentPage}&limit=${eventsPerPage}`
        );
        console.log("🚀 ~ fetchEvents ~ res:", res);
        // setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Events Board</h1>
      {events?.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
      {/* Pagination component */}
    </div>
  );
};

export default EventsBoard;
