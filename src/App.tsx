import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Home from "./components/Home/Home";
import Header from "./ui/Header/Header";
import NotFoundPage from "./components/NotfoundPage/NotFoundPage";
import React, { useContext, useEffect } from "react";
import { actionsWords, Context, stateType } from "./utils/Reducer/AppContext";
import GetTheWords from "./utils/GetTheWords";
import GetTodaysWord from "./utils/GetTodaysWord"
import AdminLogin from "./admin/adminLogin/AdminLogin";
import AdminInner from "./admin/adminLogin/AdminInner";
import GetRadmonWordOfTheDay from "./utils/GetRandomWordOfTheDay"
import Cookies from "js-cookie"
import moment from "moment";
import Result from "./components/Result/Result";
import CheckingTheWord from "./utils/checkingTheWord";
import GetRandomWordOfTheDay from "./utils/GetRandomWordOfTheDay";
// export const ServerPort = "http://localhost:6237";
export const ServerPort = "https://mb2212.vanillanetworks.co.in";
const App: React.FC = () => {
  const contextData = useContext(Context);

  const [cookies, setCookie] = useCookies(["v1"]);

  const parsedDate = new Date();
  const navigate = useNavigate()

  // ///////////////////////
  // const onEnter = () => {
  //   if (
  //     contextData?.state.gameStatus === "completed" ||
  //     contextData?.state.gameStatus === "over"
  //   ) {
  //     navigate("/result");
  //   }
  //   if (contextData?.state.currentLetter !== 5) return;
  //   contextData?.dispatch({ type: actionsWords.checkTheWord, data: "" });
  //   const wordResult = CheckingTheWord(
  //     contextData?.state
  //   );
  //   if (
  //     wordResult.isCorrect ||
  //     (contextData.state.currentAttempt === 5 && wordResult.isValidWord && wordResult.isGameOver)
  //   ) {

  //     navigate("/result");
  //   }
  // };
  // //////////////////







  useEffect(() => {

    contextData?.dispatch({
      type: actionsWords.setTimer,
      data: "",
      date: parsedDate,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeInterval = setInterval(() => {
      contextData?.dispatch({ type: actionsWords.startTimer, data: "" });
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [contextData?.state.timer]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCookies = (state: stateType) => {
    contextData?.dispatch({
      type: actionsWords.getcookiess,
      data: "",
      cookieState: state,
    });
  };

  useEffect(() => {
    // getting state stored in cookies
    // getCookies(cookies.v1);
    const cookieState = Cookies.get("V2") === undefined ? contextData?.state : JSON.parse(Cookies.get("V2")!)
    getCookies(cookieState);
    // getCookies(JSON.parse(localStorage.getItem("state")!))
    // console.log(JSON.parse(Cookies.get('V2')!))
    GetTheWords().then((words) => {
      contextData?.dispatch({
        type: actionsWords.getWordBank,
        data: "",
        set: words.wordSet,
      });
    });
    // getting the date and month
    if (contextData?.state.presentDate !== parsedDate.getDate()) {
      // getting the new word of the day logic goes here
      GetTodaysWord(moment().format("MM/DD/YYYY"), contextData);
    } else {
      if (contextData.state.currentMode === "primary") {
        GetTodaysWord(moment().format("MM/DD/YYYY"), contextData)
      } else {
        // GetTodaysWord(GetRadmonWordOfTheDay(24), contextData)
        return
      }
    }


  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCookie("v1", contextData?.state, {
      path: "/",
    });
    // console.log(Cookies.get("V2"))
    // const CookieStateCheck = Cookies.get("V2") === undefined ? contextData?.state : JSON.parse(Cookies.get("V2")!)
    Cookies.set('V2', JSON.stringify(contextData?.state), { path: "/", expires: 365 })
    // localStorage.setItem("state", JSON.stringify(contextData?.state))

  }, [
    // eslint-disable-line react-hooks/exhaustive-deps
    contextData?.state.gameStatus,
    contextData?.state.currentAttempt,
    contextData?.state.correctWord,
    contextData?.state.todayTenLetters,
    contextData?.state.clueCardsShown,
    contextData?.state.showClueCardModal,
    contextData?.state.currentMode,
    // contextData?.state.secondaryTimer
  ]);
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (contextData?.state.nextWordTimer === 0 && contextData.state.currentMode === "secondary") {
      GetTodaysWord(GetRadmonWordOfTheDay(24), contextData)
    } else {
      return
    }



  }, [contextData?.state.nextWordTimer])
  useEffect(() => {
    if (contextData?.state.gameStatus === "completed" || contextData?.state.gameStatus === "over") {

      const HourInterval = setInterval(() => {
        contextData?.dispatch({ type: "showTimer", data: "" })
      }, 1000)
      return () => clearInterval(HourInterval)
    } else return
  }, [contextData?.state.nextWordTime, contextData?.state.gameStatus])

  // for hour timer

  // useEffect(() => {
  //   if (contextData?.state.gameStatus === "completed" || contextData?.state.gameStatus === "over") {

  //     const secondaryTimeInterval = setInterval(() => {
  //       contextData?.dispatch({ type: actionsWords.startSecondaryTimer, data: "" })
  //     }, 1000)
  //     return () => clearInterval(secondaryTimeInterval)
  //   } else return
  // }, [contextData?.state.secondaryTimer, contextData?.state.gameStatus])

  // useEffect(() => {
  //   if (contextData?.state.secondaryTimer?.minutes === 0 && contextData.state.secondaryTimer.seconds === 1) {
  //     GetTodaysWord(GetRadmonWordOfTheDay(24), contextData)
  //   }
  // }, [contextData?.state.secondaryTimer?.seconds])





  return (
    <div className="text-gray-600 body-font h-full w-full overflow-x-hidden">
      {window.location.pathname === "/admin" ? undefined : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            contextData?.state.IsAdminLoggedIN ? <AdminInner /> : <AdminLogin />
          }
        />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
