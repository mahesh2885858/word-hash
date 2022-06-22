import { useContext } from "react";
import { Context } from "../../utils/Reducer/AppContext";
import Timer from "../timer/Timer";
import confettiImage from "../../images/confetti.png";
import StarRatings from "react-star-ratings";
import "./gamecompletescreen.scss";
const GameCompleteScreen: React.FC = () => {
  const contextData = useContext(Context);
  const score = contextData?.state.board.length! - contextData?.state.currentAttempt!
  // const ratingFunction = (rating: number) => {
  // setScore(parseInt(

  // (rating / 20).toFixed(0)
  // ))
  // }
  // const percentageOfScore = contextData?.state.Score
  // const scoreReal = Math.ceil(percentageOfScore! / 20)
  return (
    <>
      <img src={confettiImage} alt="" className=" mx-auto mt-5" />
      <h2 className="text-gray-600 text-3xl mb-1 text-center title-font mt-1 font-medium lg:mb-4">
        Congratulations
      </h2>
      <div className=" flex flex-row gap-1 justify-center">
        {contextData?.state.word.split("").map((letter, i) => {
          return (
            <span key={i} className=" text-2xl text-center w-14 flex justify-center items-center h-14 font-medium inline-block py-2 px-3 uppercase shadow text-white bg-[#39853c] last:mr-0 ">
              {letter}
            </span>
          );
        })}
      </div>
      <div className="text-2xl font-medium text-black mt-4">You Scored</div>
      <div>
        <span className=" text-3xl text-black mr-1">{`${contextData?.state.Score! < 1 ? Math.ceil(contextData?.state.Score!) : contextData?.state.Score}`}</span>
        <span className="text-2xl">{`/${5}`}</span>
        {/* <span className=" text-3xl text-black mr-1">{`${score
          }`}</span>
        <span className="text-2xl">{`/${contextData?.state.board.length}`}</span> */}
        <div>
          <StarRatings
            rating={contextData?.state.Score}
            starDimension={`20px`}
            starRatedColor="rgb(241, 196, 15)"
            starSpacing="0px"
            starEmptyColor="white"
          />
        </div>
        <div className="text-gray-800 text-xl mt-2">You have used {contextData?.state.clueCardsShown} hints</div>
        <div>
          <p className=" text-base lg:text-lg font-bold text-gray-600 mt-3 ">
            Next Quiz Will be available in :
          </p>
        </div>
        <Timer color="rgb(75 85 99 / 1)" />
      </div>
    </>
  );
};

export default GameCompleteScreen;
