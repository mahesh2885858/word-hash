import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import GameCompleteScreen from "../gameCompleteScreen/GameCompleteScreen";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import { IoMdArrowRoundBack } from "react-icons/io/index";
import "./sharepost.scss";

import GameOverScreen from "../gameOverScreen/GameOverScreen";
import { PostButton } from "../../components/postButton/PostButton";
const SharePost: React.FC = () => {
  const [showShareButtons, setShowShareButtons] = useState(false);

  const navigate = useNavigate();
  const contextData = useContext(Context);
  const isGameCompleted =
    contextData?.state.gameStatus === "completed" ? true : false;
  return (
    <div className=" bg-white  w-full h-full sharepost-container">
      {/* <h1 className=" font-cursive text-xl mt-9 lg:text-4xl lg:mb-2 lg:mt-20 mx-auto text-center">
        WordHash
      </h1> */}

      <div className="  w-full mt-0 pt-2 lg:mt-0 mb-6 mx-auto text-center">
        {isGameCompleted ? <GameCompleteScreen /> : <GameOverScreen />}
        <button
          className="
        text-center bg-[#39853c] mt-2 px-10  text-white hover:bg-[#39853c]/95 font-bold text-xl py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-3 ease-linear transition-all duration-150
        "
          onClick={() => setShowShareButtons(!showShareButtons)}
        >
          Share
        </button>
        {showShareButtons && <PostButton />}
        {isGameCompleted ? (
          <div>
            <button
              className=" text-3xl absolute top-3 left-3"
              onClick={() => {
                navigate("/");

                contextData?.dispatch({
                  type: actionsWords.onCancelPost,
                  data: "",
                });
              }}
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        ) : (
          <div>
            <button
              className=" text-3xl absolute top-3 left-3"
              onClick={() => {
                navigate("/");

              }}
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;
