import React, { useContext, useEffect, useState } from "react";
import { ServerPort } from "../../App";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
const ClueCardModal = () => {
  const contextData = useContext(Context);
  const [hint, setHint] = useState<string[]>([]);
  const [loading, setLoading] = useState(true)
  const nextCluecard = () => {
    if (contextData?.state.clueCardUrlArray.length! > 0) {


      const limit =
        contextData?.state.clueCardsShown! <= 4
          ? contextData?.state.clueCardsShown
          : 4;
      for (let i = 0; i < limit!; i++) {
        const hintUrl = contextData?.state.clueCardUrlArray[i].url
          .split("/")
          .pop();

        setHint((pre) => [...pre, hintUrl!]);
      }
    } else {
      return
    }
  };
  useEffect(() => {
    nextCluecard();
  }, []);
  return (
    <div className=" absolute bg-white top-0 left-0 z-50 lg:h-full w-full h-[1030px] overflow-y-scroll   flex flex-col justify-center items-center">
      <p className="text-black mb-4">{contextData?.state.clueCardsShown === 4 ? "You have used all Hints For the day" : `You have ${4 - contextData?.state.clueCardsShown!} Clues Left`}</p>
      <div className=" flex flex-col justify-center  gap-3 relative">

        {hint.length > 0 ? <>
          <div className="flex lg:flex-row flex-col gap-3 justify-center">

            {hint.map((item, index) => {
              if (index < 2) {

                return (
                  <div className="relative flex justify-center items-center" onLoad={() => setLoading(false)}>

                    <img src={`${ServerPort}/${item}`} alt="" width={250} key={index} />
                    <p className="absolute top-0 left-0 width-full bg-red">

                      {loading ? "...Loading" : undefined}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex lg:flex-row gap-3 flex-col justify-center">

            {hint.map((item, index) => {
              if (index >= 2) {

                return (
                  <div className="relative  justify-center items-center" onLoad={() => setLoading(false)}>

                    <img src={`${ServerPort}/${item}`} alt="" width={250} key={index} />
                    <p className="absolute top-0 left-0 width-full bg-red">

                      {loading ? "...Loading" : undefined}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </> : "no cluecards"}

      </div>
      <button
        className="mt-2"
        onClick={() => {
          contextData?.dispatch({
            type: actionsWords.toggleClueCardModal,
            data: "",
          });
        }}
      >
        close
      </button>
    </div>
  );
};

export default ClueCardModal;
