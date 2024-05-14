import RegistrationForm from "../../components/EventForm/EventForm";

import styles from "./EventRegistration.module.css";

const EventRegistration = () => {
  return (
    <div className={styles.registrationWrapper}>
      <h1>Event Registration</h1>
      <RegistrationForm />
    </div>
  );
};

export default EventRegistration;
