import PropTypes from "prop-types";

import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ checked, ...rest }) => {
  return (
    <label className={styles.toggle}>
      <input type="checkbox" checked={checked} {...rest} />
      <span className={styles.slider} />
    </label>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default ToggleSwitch;
