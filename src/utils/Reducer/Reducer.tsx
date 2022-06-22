import CheckingTheWord from "../checkingTheWord";
import GetTheWordFromArray from "../GetTheWordFromArray";
import { actionsWords, stateType, refinedLayout } from "./AppContext";

export type actionType = {
  type: string;
  data: string;
  payload?: string;
  cookieState?: stateType;
  set?: Set<string>;
  date?: Date;
  lettersArray?: string[];
  attemptNumber?: number;
  positionNumber?: number;
  input?: React.ChangeEvent<HTMLInputElement>;
  clueCardUrlArray?: { _id: string; url: string }[];
};
const Reducer = (state: stateType, action: actionType): stateType => {
  switch (action.type) {
    // getting the new state for new day
    case actionsWords.getNewStateForTheDay:
      const day = new Date().getDate();
      if (state.trackingDays === 0) {
        return {
          ...state,
          trackingDays: state.trackingDays + 1,
          presentDate: day,
          correctWord: action.data,
          todayTenLetters: action.lettersArray!,
          clueCardUrlArray: action.clueCardUrlArray!,
          clueCardsShown: 0,
        };
      } else {
        if (state.presentDate !== day) {
          return {
            ...state,
            board: refinedLayout,
            currentAttempt: 0,
            currentLetter: 0,
            result: undefined,
            gameStatus: "playing",
            word: "",
            correctWord: action.data, //need to check this one
            showModal: false,
            todayTenLetters: action.lettersArray!,
            trackingDays: state.trackingDays + 1,
            presentDate: day,
            clueCardUrlArray: action.clueCardUrlArray!,
            clueCardsShown: 0,
            currentMode: "primary",
            nextWordTimer: new Date().getTime()
          };
        } else {
          if (state.currentMode === "secondary" && state.nextWordTimer === 0) {
            return {
              ...state,
              board: refinedLayout,
              currentAttempt: 0,
              currentLetter: 0,
              result: undefined,
              gameStatus: "playing",
              word: "",
              correctWord: action.data, //need to check this one
              showModal: false,
              todayTenLetters: action.lettersArray!,
              presentDate: day,
              clueCardUrlArray: action.clueCardUrlArray!,
              clueCardsShown: 0,
              nextWordTimer: new Date().getTime()


            }
          } else {

            return state;
          }
        }
      }
    case actionsWords.setTimer:
      return {
        ...state,
        timer: {
          hours: state.timer.hours - action.date!.getHours(),
          minutes: state.timer.minutes - action.date!.getMinutes(),
          seconds: state.timer.seconds - action.date!.getSeconds(),
        },
      };

    // starting the 24-hour timer
    case actionsWords.startTimer:
      if (state.timer.seconds > 0 && state.timer.minutes > 0) {
        return {
          ...state,
          timer: { ...state.timer, seconds: state.timer.seconds - 1 },
        };
      } else {
        if (state.timer.seconds === 0 && state.timer.minutes > 0) {
          return {
            ...state,
            timer: {
              ...state.timer,
              minutes: state.timer.minutes - 1,
              seconds: 59,
            },
          };
        } else
          return {
            ...state,
            timer: {
              hours: state.timer.hours - 1,
              minutes: 59,
              seconds: 59,
            },
          };
      }
    case actionsWords.onKeyPress:
      if (state.currentLetter > 4) return state;
      if (state.currentAttempt >= 6) return state;
      if (state.gameStatus === "completed") return state;
      const newBoard = state.board;
      newBoard[state.currentAttempt].letters[state.currentLetter].value =
        action.data;
      // blinkinf logic remove everything below  if anything goes wrong
      newBoard[state.currentAttempt].letters[state.currentLetter].status = "";

      if (state.currentLetter < 4) {
        newBoard[state.currentAttempt].letters[state.currentLetter + 1].status =
          "blink";
      } else {
        if (state.currentAttempt < 6 && state.currentLetter < 4) {
          newBoard[state.currentAttempt + 1].letters[0].status = "blink";
        }
      }

      return {
        ...state,
        board: newBoard,
        result: undefined,
        currentLetter: state.currentLetter + 1,
        isAValidWord: true,
      };

    case actionsWords.getWordBank:
      return { ...state, wordBank: action.set! };
    // checking the whether user entered word correct or not
    case actionsWords.checkTheWord:
      // getting the entered word using this below function
      const enteredWord = GetTheWordFromArray(state);
      // if the uer did not enter all five letters we will do nothing and return the state as it is
      if (state.currentLetter !== 5) return state;
      const wordResult = CheckingTheWord(
        state
      );
      if (wordResult.isCorrect) {

        return {
          ...state,
          board: wordResult.newBoard,
          currentLetter: 0,
          result: wordResult.isCorrect,
          gameStatus: "completed",
          word: wordResult.word!,
          Score: wordResult.score!,
          showModal: true,
          gamesPlayed: state.gamesPlayed + 1,
          gamesWon: state.gamesWon + 1,
          currentWinStreak: state.currentWinStreak + 1,
          maxWinStreak:
            state.currentWinStreak === state.maxWinStreak
              ? state.maxWinStreak + 1
              : state.maxWinStreak,
          currentMode: "secondary",
          nextWordTime: new Date().getHours() >= 23 ? 0 : new Date(new Date().getTime() + 3600000).getTime(),

        }
      } else {

        if (!state.wordBank.has(enteredWord)) {
          // alert("not in the word list");
          // const nBoard = state.board.map((attempt) => {
          //   if (!(attempt.rowId === state.currentAttempt.toString())) return attempt
          //       return attempt.letters.map((letter,index)=>{
          //         if(index===0) return {...letter,value:"",status:"blink"}
          //         return {...letter,value:"",status:""}
          //       })
          // })
          const nBoard = state.board;
          nBoard[state.currentAttempt].letters[0].status = "blink";
          nBoard[state.currentAttempt].letters[0].value = "";
          for (let k = 1; k < 5; k++) {
            nBoard[state.currentAttempt].letters[k].status = "";
            nBoard[state.currentAttempt].letters[k].value = "";
          }
          return {
            ...state,
            isAValidWord: false,
            board: nBoard,
            gameStatus: "playing",
            currentLetter: 0,
          };
          // return { ...state, isAValidWord: false };
        }
        if (state.currentAttempt === state.board.length - 1) {
          return {
            ...state,
            board: wordResult.newBoard,
            result: wordResult.isCorrect,
            gameStatus: "over",
            word: wordResult.word!,
            showModal: true,
            gamesPlayed: state.gamesPlayed + 1,
            currentWinStreak: 0,
            Score: wordResult.score!,
            nextWordTime: new Date().getHours() >= 23 ? 0 : new Date(new Date().getTime() + 3600000).getTime(),
            currentMode: "secondary"

          };
        } else {
          const nBoard = wordResult.newBoard;
          nBoard[state.currentAttempt + 1].letters[0].status = "blink";
          return {
            ...state,
            board: nBoard,
            currentAttempt: state.currentAttempt + 1,
            currentLetter: 0,
            result: wordResult.isCorrect,
            gameStatus: "playing",
            word: wordResult.word!,
          };
        }
      }
    // CLUECARD MODAL BEGIN
    case actionsWords.toggleClueCardModal:
      return { ...state, showClueCardModal: !state.showClueCardModal };
    case actionsWords.increaseTheHintsShownCount:
      if (state.clueCardsShown >= 4) return state;
      return { ...state, clueCardsShown: state.clueCardsShown + 1 };
    // CLUECARD MODAL END
    case actionsWords.onDelete:
      if (state.currentLetter === 0) return state;
      if (state.gameStatus === "completed" || state.gameStatus === "over")
        return state;
      const boradAfterDelete = state.board;
      boradAfterDelete[state.currentAttempt].letters[
        state.currentLetter - 1
      ].value = "";
      if (state.currentLetter < 5) {
        boradAfterDelete[state.currentAttempt].letters[
          state.currentLetter - 1
        ].status = "blink";

        boradAfterDelete[state.currentAttempt].letters[
          state.currentLetter
        ].status = "";
      } else {
        boradAfterDelete[state.currentAttempt].letters[
          state.currentLetter - 1
        ].status = "blink";
      }
      return {
        ...state,
        board: boradAfterDelete,
        currentLetter: state.currentLetter - 1,
        isAValidWord: true,
      };
    // setting the cluecard url after game finishes
    case actionsWords.setCluecardUrl:
      return { ...state, clueCardUrl: action.data };
    case actionsWords.closemodal:
      return { ...state, showModal: false };
    case actionsWords.onCancelPost:
      return {
        ...state,
        showModal: false,
        currentLetter: 5,
      };

    case actionsWords.getcookiess:
      return {
        ...state,
        ...action.cookieState,
        timer: {
          hours: 23 - new Date().getHours(),
          seconds: 59 - new Date().getSeconds(),
          minutes: 59 - new Date().getMinutes(),
        },
      };
    case "showTimer":
      return {
        ...state,
        nextWordTimer: state.nextWordTimer <= 0 ? 0 : state.nextWordTime - new Date().getTime()
      }
    case actionsWords.toggleRules:
      return { ...state, showRules: !(state.showRules) }
    case actionsWords.adminLoginSuccess:
      return { ...state, IsAdminLoggedIN: true };
    case actionsWords.adminLogout:
      return { ...state, IsAdminLoggedIN: false };
    default:
      return state;
  }
};
export default Reducer;
