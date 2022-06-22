import moment from "moment";
import { useContext, useEffect } from "react";
import Letters from "../../ui/Letters/Letters";
import TickerModal from "../../ui/tickermodal/TickerModal";
import GetClueCardUrl from "../../utils/GetClueCardUrl";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import Board from "../Board/Board";
import BottomNav from "../BottomNav/BottomNav";
import KeyBoard from "../keyBoard/KeyBoard";
import DisplayProgress from "../../ui/displayprogress/DisplayProgress";
import Rules from "../../ui/rules/Rules"
import "./home.scss";
import ClueCardModal from "../clecardModal/ClueCardModal";
const Home = () => {
  const contextdata = useContext(Context);
  // getting the cluecard url if game staus changes
  const geturl = async () => {
    const data = await GetClueCardUrl(moment().format("MM/DD/YYYY"));
    contextdata?.dispatch({ type: actionsWords.setCluecardUrl, data: data });
  };
  useEffect(() => {
    geturl();
  }, [contextdata?.state.gameStatus]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="lg:w-8/12 sm:w-11/12 lg:pt-[42px] lg:shadow sm:shadow-none lg:rounded-2xl sm:rounded-0 sm:border-0 lg:my-12 lg:mt-0  mx-auto">
      <div className="lg:w-11/12 mx-auto mt-2 lg:mt-8 flex flex-wrap ">
        {contextdata?.state.gameStatus === "completed" ||
          contextdata?.state.gameStatus === "over" ? (
          <DisplayProgress />
        ) : (
          <Letters />
        )}






        <Board />
        <div>
          {contextdata?.state.isAValidWord ? undefined : (
            // contextdata?.state.result === undefined ? undefined : contextdata
            // .state.result ? (
            //   <TickerModal />
            // ) : (
            //   <TickerModal />
            // )

            <TickerModal />
          )}
        </div>
        {contextdata?.state.showClueCardModal ? <ClueCardModal /> : undefined}
        {contextdata?.state.showRules ? <Rules /> : undefined}
      </div>
      <KeyBoard />
      {false && <BottomNav />}
    </div>
  );
};

export default Home;
