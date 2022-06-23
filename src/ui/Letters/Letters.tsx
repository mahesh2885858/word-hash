import React, { useContext } from "react";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import Loader from "../loader/Loader"
import "./letters.scss";

const Letters: React.FC = () => {
  const contextData = useContext(Context);
  const topArray = contextData?.state.todayTenLetters.filter(
    (letter, index) => index < 5
  );
  const bottomArray = contextData?.state.todayTenLetters.filter(
    (letter, index) => index >= 5
  );

  return (
    <div className="lg:w-1/2 w-full lg:py-6 lg:pt-[65px] lg:pr-4 mb-6 lg:mb-0 flex flex-col ">
      <h1 className="text-gray-600 lg:text-2xl sm:text-sm mb-1 text-center  lg:text-center title-font font-medium  lg:mb-4">
        Guess Today's Word
      </h1>
      <div className="lg:rounded-xl items-center justify-center lg:shadow relative overflow-hidden flex flex-col lg:gap-[0.5rem]  gap-4 sm:rounded-0 relative px-8 lg:py-10 py-4    letters-container">
        {/* <div className="circle1"></div> */}
        {/* <div className="circle2"></div> */}
        {contextData?.state.todayTenLetters.length! > 0 && contextData?.state.wordBank.size! > 0 ? <>
          <div className="flex relative z-10 justify-center  w-full gap-4 lg:gap-2">
            {topArray!.map((letter, index) => {
              return (
                <span
                  className="text-xl flex cursor-pointer justify-center items-center text-center lg:w-12 lg:mb-2 lg:h-12 w-[50px] h-[50px]  font-medium  lg:py-1 lg:px-2 py-2 shadow rounded-md text-white lg:text bg-[#69b86a]  uppercase customspan "
                  key={index}
                  onClick={() => contextData?.dispatch({ type: actionsWords.onKeyPress, data: letter })}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          <div className="flex relative z-10 justify-center  w-full gap-4 lg:gap-2">

            {bottomArray!.map((letter, index) => {
              return (
                <span
                  className="text-xl flex justify-center cursor-pointer items-center text-center lg:w-12 lg:h-12 w-[50px] h-[50px]  font-medium  lg:py-1 lg:px-2 py-2 shadow rounded-md  text-white bg-[#69b86a]  uppercase customspan "
                  onClick={() => contextData?.dispatch({ type: actionsWords.onKeyPress, data: letter })}

                  key={index}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </> : <Loader />}

        {/* <div className="circle3"></div> */}
        {/* <div className="circle4"></div> */}
      </div>
      <div className="flex justify-center items-center mt-0 mx-auto gap-8">

        {contextData?.state.currentAttempt! > 0 ? (
          <button
            onClick={() => {
              contextData?.dispatch({
                type: actionsWords.increaseTheHintsShownCount,
                data: "",
              });
              contextData?.dispatch({
                type: actionsWords.toggleClueCardModal,
                data: "",
              });
            }}
            className="mx-auto bg-[#009f06] p-[10px] mob:py-[6px] lg:mt-4 rounded-md text-white "
          >
            Hint
          </button>
        ) : undefined}
        <button
          onClick={() => {
            contextData?.dispatch({
              type: actionsWords.toggleRules,
              data: "",
            });
          }}

          className="mx-auto bg-[#009f06] p-[10px] mob:py-[6px] lg:mt-4 rounded-md text-white "
        >
          Rules
        </button>
      </div>

    </div>
  );
};

export default Letters;
