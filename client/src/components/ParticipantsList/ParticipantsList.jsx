import PropTypes from "prop-types";
import styles from "./ParticipantsList.module.css";

const ParticipantsList = ({ participants, eventName }) => {
  return (
    <div className={styles.participantsWrapper}>
      <h2>{eventName} Participants</h2>
      {participants && participants.length > 0 ? (
        <div className={styles.participantsContainer}>
          {participants.map((participant) => (
            <div key={participant._id} className={styles.participantCard}>
              <p>{participant.fullName}</p>
              <p>{participant.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No participants found</p>
      )}
    </div>
  );
};

ParticipantsList.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  eventName: PropTypes.string.isRequired,
};

export default ParticipantsList;
