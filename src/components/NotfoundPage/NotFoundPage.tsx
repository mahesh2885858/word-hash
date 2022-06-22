import { Link } from "react-router-dom";
import "./notfoundpage.scss";
const NotFoundPage: React.FC = () => {
  return (
    <div className="notfound-div">
      <p>The page you are looking for is not found</p>
      <p>
        Go to <Link to={`/`}> Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
