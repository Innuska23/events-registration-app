import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>Date: {event.date.toLocaleDateString()}</p>
      <p className={styles.organizer}>Organizer: {event.organizer}</p>
    </div>
  );
};

export default EventCard;
