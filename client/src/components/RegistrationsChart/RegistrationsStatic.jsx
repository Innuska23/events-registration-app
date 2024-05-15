import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import styles from "./RegistrationsStatic.module.css";

const RegistrationStat = ({ chartData }) => {
  return (
    <div className={styles.staticWrapper}>
      <LineChart width={600} height={400} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="participant" stroke="#0056b3" />
      </LineChart>
    </div>
  );
};

RegistrationStat.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      participant: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RegistrationStat;
