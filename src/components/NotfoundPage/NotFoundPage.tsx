import { Link } from "react-router-dom";
import "./notfoundpage.scss";
const NotFoundPage: React.FC = () => {
  return (
    <div className="notfound-div h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center">
      <p>The page you are looking for is not found</p>
      <p>
        Go to <Link to={`/`} className="text-xl text-blue-600"> Home Page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
