import { useContext } from "react";
import { Link } from "react-router-dom";
import SharePost from "../../ui/SharePost/SharePost";
import { Context } from "../../utils/Reducer/AppContext";
import "./result.scss";
const Result: React.FC = () => {
  const contextData = useContext(Context);

  return (
    <div
      className="  overflow-hidden w-full h-[calc(100vh-120px)] justify-center items-center text-center  flex flex-wrap sharepost-container  z-50 "
    >
      {
        contextData?.state.gameStatus === "playing" ? <div>The game is not completed yet Please complete the game <span className=" text-blue-700 text-xl">
          <Link to={`/`}>HERE</Link>
        </span>
        </div>
          : (

            contextData?.state.gameStatus === "completed" ? (
              <SharePost />
            ) : (
              contextData?.state.gameStatus === "over" ? <SharePost /> : undefined
            ))
      }
    </div>
  );
};

export default Result;
