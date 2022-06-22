import moment from 'moment'
import Timer from "../timer/Timer";
const DisplayProgress = () => {
  return (
    <div className="lg:w-1/2 w-full lg:py-0 lg:mt-[0] lg:pr-4 mb-6 mt-6 lg:mt-0 lg:mb-0  flex items-center ">
      <div className="lg:rounded-xl sm:rounded-0 lg:mt-[-130px]  relative px-8 lg:py-10 w-full py-4 lg:bg-gradient-to-b from-[#47d4aa] to-[#8ddb90]">
        <span className="lg:text-white text-black text-3xl flex justify-center text-center ">
          Next Quiz will be available in
        </span>
        <span className="text-white mt-2 flex justify-center">
          <Timer color={window.visualViewport.width > 1024 ? "white" : "black"} fontSize="2rem" />
        </span>

      </div>
    </div>
  );
};

export default DisplayProgress;
