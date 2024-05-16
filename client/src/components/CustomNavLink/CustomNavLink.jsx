import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./CustomNavLink.module.css";
import { NavLink } from "react-router-dom";

const CustomNavLink = ({
  color = "primary",
  to,
  className,
  children,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={classnames(styles.navLink, styles[color], className)}
      {...props}
    >
      {children}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  color: PropTypes.oneOf(["primary"]),
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CustomNavLink;
