import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>
        Date: {new Date(event.date).toLocaleDateString()}
      </p>

      <div className={styles.cardFooter}>
        <p className={styles.organizer}>Organizer: {event.organizer}</p>
        <div className={styles.buttonWrapper}>
          <NavLink to={`/registration/${event._id}`}>Register</NavLink>
          <NavLink to={`/view/${event._id}`}>View</NavLink>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
