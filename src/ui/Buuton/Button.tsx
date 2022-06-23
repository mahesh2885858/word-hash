import { useContext } from "react";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";

const Button = ({ onEnter }: { onEnter: () => void }) => {
  const contextdata = useContext(Context);
  return (
    <div ref={contextdata?.myRef} className="button-container lg:mt-0 lg:gap-3 mx-auto lg:w-[450px] flex justify-center lg:mb-0 mt-0 mb-6">

      <button
        className="bg-[#39853c] lg:mt-0 px-4 lg:px-14 lg:ml-6 text-white active:bg-pink-600 font-bold  text-xl py-2 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-1 ease-linear transition-all duration-150 "
        onClick={onEnter}
      >
        Submit
      </button>
      {contextdata?.state.currentLetter! > 0 &&
        contextdata?.state.gameStatus === "playing" ? (
        <button
          className="bg-[#39853c] lg:mt-0 px-6 lg:px-14 lg:ml-6 text-white active:bg-pink-600 font-bold text-xl py-2 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-1 ease-linear transition-all duration-150 "
          onClick={() =>
            contextdata?.dispatch({ type: actionsWords.onDelete, data: "" })
          }
        >
          Clear
        </button>
      ) : undefined}
    </div>
  );
};

export default Button;
