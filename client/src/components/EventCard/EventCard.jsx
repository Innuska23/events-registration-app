import PropTypes from "prop-types";

import styles from "./EventCard.module.css";
import CustomNavLink from "../CustomNavLink/CustomNavLink";

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
          <CustomNavLink to={`/registration/${event._id}`}>
            Register
          </CustomNavLink>
          <CustomNavLink to={`/view/${event._id}`}>View</CustomNavLink>
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
