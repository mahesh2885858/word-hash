import { useContext } from "react";
import SharePost from "../../ui/SharePost/SharePost";
import { Context } from "../../utils/Reducer/AppContext";
import "./result.scss";
const Result: React.FC = () => {
  const contextData = useContext(Context);

  return (
    <div
      className="  overflow-hidden w-full h-full  flex flex-wrap sharepost-container bg-blue-400/25 z-50 "
    >
      {contextData?.state.gameStatus === "completed" ? (
        <SharePost />
      ) : undefined}
      {contextData?.state.gameStatus === "over" ? <SharePost /> : undefined}
    </div>
  );
};

export default Result;
