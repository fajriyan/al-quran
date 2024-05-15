import { useContext } from "react";
import { Link } from "react-router-dom";
import ProgresContext from "./ProgresContext";

const LinkProgresBars = ({ to, children, className }) => {
  const [progressBar, setProgressBar] = useContext(ProgresContext);
  const setProgressBefore = () => {
    setProgressBar(true);
  };
  return (
    <Link onClick={setProgressBefore} to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkProgresBars;
