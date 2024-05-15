import { useEffect, useRef, useState } from "react";

import EventCard from "../../components/EventCard/EventCard";
import { useLazyEventsListQuery } from "../../redux/api/eventsApi";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import { useOnScreen } from "../../hooks/useOnScreen";

import styles from "./EventsBoard.module.css";

const DEFAULT_ITEM_PER_PAGE = 9;

const EventsBoard = () => {
  const [sortEvent, setSortEvent] = useState();
  const [fetch, { data: eventData, isLoading, isFetching }] =
    useLazyEventsListQuery();
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEM_PER_PAGE);
  const totalPages = Math.ceil((eventData?.count || 0) / itemsPerPage);

  const [mode, setMode] = useState("pagination");

  useEffect(() => {
    fetch({
      ...sortEvent,
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortEvent, currentPage, itemsPerPage]);

  useEffect(() => {
    if (
      mode === "infiniteScroll" &&
      isOnScreen &&
      !isLoading &&
      eventData?.count > itemsPerPage
    ) {
      setCurrentPage(1);
      setItemsPerPage((prevPage) => prevPage + DEFAULT_ITEM_PER_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnScreen, mode]);

  useEffect(() => {
    if (mode === "pagination") {
      setCurrentPage(1);
      setItemsPerPage(DEFAULT_ITEM_PER_PAGE);
    }
  }, [mode]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortEvent = (field) => () => {
    setSortEvent((current) => {
      if (!current) {
        return { field, direction: "asc" };
      }
      if (current?.field === field) {
        if (current?.direction === "asc") return { field, direction: "desc" };
        if (current?.direction === "desc") return null;
      }
      if (current?.field !== field) {
        return { field, direction: "asc" };
      }
    });
  };

  const getSortDirection = (field) => {
    if (field === sortEvent?.field) {
      return sortEvent.direction === "asc" ? "↑" : "↓";
    }
  };

  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === "pagination" ? "infiniteScroll" : "pagination"
    );
  };

  return (
    <>
      <div className={styles.eventsWrapper}>
        <h1>Events</h1>

        <div className={styles.buttonWrapper}>
          <div>
            <button
              className={styles.button}
              onClick={handleSortEvent("title")}
            >
              Title {getSortDirection("title")}
            </button>
            <button className={styles.button} onClick={handleSortEvent("date")}>
              Event date {getSortDirection("date")}
            </button>
            <button
              className={styles.button}
              onClick={handleSortEvent("organizer")}
            >
              Organizer {getSortDirection("organizer")}
            </button>
          </div>
          <div>
            <button className={styles.button} onClick={toggleMode}>
              Toggle Mode ({mode})
            </button>
          </div>
        </div>

        {isLoading || (mode === "pagination" && isFetching && <Loader />)}

        <div className={styles.eventsContainer}>
          {eventData?.events?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {mode === "pagination" && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div ref={ref} style={{ maxWidth: 10 }} />
    </>
  );
};

export default EventsBoard;
