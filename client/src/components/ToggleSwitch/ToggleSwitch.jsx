import PropTypes from "prop-types";

import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.label}>{label}</span>
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.toggleInput}
          id="toggleSwitch"
        />
        <label htmlFor="toggleSwitch" className={styles.toggleLabel}>
          <span className={styles.toggleInner} />
        </label>
        <span className={styles.toggleText} />
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
