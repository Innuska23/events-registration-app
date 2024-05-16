import { Circles } from "react-loader-spinner";

const Loader = () => (
  <div>
    <Circles
      height="80"
      width="80"
      color="#3b71ca"
      ariaLabel="circles-loading"
      wrapperClass=""
      visible={true}
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

export default Loader;
