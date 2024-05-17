import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./Button.module.css";

const Button = ({
  color = "primary",
  variant = "rounded",
  size = "mid",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={classnames(
        styles.button,
        styles[color],
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "danger"]),
  variant: PropTypes.oneOf(["default", "outline"]),
  size: PropTypes.oneOf(["large", "mid", "small"]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
