import { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import { useEventsListQuery } from "../../redux/api/eventsApi";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./EventsBoard.module.css";
import Loader from "../../components/Loader/Loader";

const EventsBoard = () => {
  const { data: events, isLoading } = useEventsListQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil((events?.length || 0) / itemsPerPage);

  if (isLoading) {
    return <Loader />;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = events?.slice(startIndex, endIndex);

  return (
    <div className={styles.eventsWrapper}>
      <h1>Events</h1>
      <div className={styles.eventsContainer}>
        {displayedEvents?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsBoard;
