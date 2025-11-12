import { useContext } from "react";
import { Link } from "react-router-dom";
import ProgresContext from "./ProgresContext";

const LinkProgresBars = ({ to, children, className }) => {
  const [_, setProgressBar] = useContext(ProgresContext);
  return (
    <Link onClick={() => setProgressBar(true)} to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkProgresBars;
