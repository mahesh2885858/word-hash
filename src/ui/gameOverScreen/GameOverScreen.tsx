import React, { useContext } from "react";
import { Context } from "../../utils/Reducer/AppContext";
import Timer from "../timer/Timer";

const GameOverScreen: React.FC = () => {
  const contextData = useContext(Context);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <h1 className=" font-extrabold text-xl lg:text-3xl">Game Over</h1>
      <p className=" text-xl">The Correct Word Is</p>
      <div className="flex flex-row justify-center gap-1 my-3">
        {contextData?.state.correctWord.split("").map((letter, index) => {
          return (
            <span className=" uppercase lg:text-2xl lg:p-3 text-xl p-2 bg-[#39853c] text-white" key={index}>
              {letter}
            </span>
          );
        })}
      </div>
      <div>
        <p className=" lg:text-xl mt-3">Next Quizz will be available in :</p>
        <Timer color="black" />
      </div>
      <p className=" text-xl mt-6 capitalize">
        let's see how your friends will do this
      </p>
    </div>
  );
};

export default GameOverScreen;
