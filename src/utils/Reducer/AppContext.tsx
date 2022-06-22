import { createContext, useReducer, useRef } from "react";
import Reducer, { actionType } from "./Reducer";

export interface boardLayout {
  rowId: string;
  letters: {
    value: string;
    id: string;
    status: string;
  }[];
}

export interface stateType {
  board: boardLayout[];
  currentAttempt: number;
  currentLetter: number;
  result: undefined | boolean;
  gameStatus: "over" | "completed" | "playing";
  word: string;
  correctWord: string;
  showModal: boolean;
  gamesPlayed: number;
  gamesWon: number;
  currentWinStreak: number;
  maxWinStreak: number;
  wordBank: Set<string>;
  trackingDays: number;
  presentDate: number;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  todayTenLetters: string[];
  IsAdminLoggedIN: boolean;
  clueCardUrl: string;
  isAValidWord: boolean | undefined;
  clueCardsShown: number;
  showClueCardModal: boolean;
  clueCardUrlArray: { _id: string; url: string }[];
  Score: number;
  showRules: boolean;
  currentMode: "primary" | "secondary";
  nextWordTime: number;
  nextWordTimer: number;
}

export const refinedLayout = [
  {
    rowId: "0",
    letters: [
      { value: "", id: "10", status: "blink" },
      { value: "", id: "11", status: "" },
      { value: "", id: "12", status: "" },
      { value: "", id: "13", status: "" },
      { value: "", id: "14", status: "" },
    ],
  },
  {
    rowId: "1",
    letters: [
      { value: "", id: "20", status: "" },
      { value: "", id: "21", status: "" },
      { value: "", id: "22", status: "" },
      { value: "", id: "23", status: "" },
      { value: "", id: "24", status: "" },
    ],
  },
  {
    rowId: "2",
    letters: [
      { value: "", id: "30", status: "" },
      { value: "", id: "31", status: "" },
      { value: "", id: "32", status: "" },
      { value: "", id: "33", status: "" },
      { value: "", id: "34", status: "" },
    ],
  },
  {
    rowId: "3",
    letters: [
      { value: "", id: "40", status: "" },
      { value: "", id: "41", status: "" },
      { value: "", id: "42", status: "" },
      { value: "", id: "43", status: "" },
      { value: "", id: "44", status: "" },
    ],
  },
  {
    rowId: "4",
    letters: [
      { value: "", id: "50", status: "" },
      { value: "", id: "51", status: "" },
      { value: "", id: "52", status: "" },
      { value: "", id: "53", status: "" },
      { value: "", id: "54", status: "" },
    ],
  },
  {
    rowId: "5",
    letters: [
      { value: "", id: "60", status: "" },
      { value: "", id: "61", status: "" },
      { value: "", id: "62", status: "" },
      { value: "", id: "63", status: "" },
      { value: "", id: "64", status: "" },
    ],
  },
];
export const initialState: stateType = {
  board: refinedLayout,
  currentAttempt: 0,
  currentLetter: 0,
  result: undefined,
  gameStatus: "playing",
  word: "",
  correctWord: "first",
  showModal: false,
  gamesPlayed: 0,
  gamesWon: 0,
  currentWinStreak: 0,
  maxWinStreak: 0,
  wordBank: new Set(""),
  trackingDays: 0,
  presentDate: new Date().getDate(),
  timer: {
    hours: 23,
    minutes: 59,
    seconds: 59,
  },
  todayTenLetters: [],
  IsAdminLoggedIN: false,
  clueCardUrl: "",
  isAValidWord: true,
  clueCardsShown: 0,
  showClueCardModal: false,
  clueCardUrlArray: [],
  Score: 0,
  showRules: false,
  currentMode: "primary",
  nextWordTime: new Date().getTime(),
  nextWordTimer: new Date().getTime()
};
export interface contextType {
  state: stateType;
  dispatch: React.Dispatch<actionType>;
  myRef: React.RefObject<HTMLDivElement>;
  scrollToKeyBoard: () => void

}
export const actionsWords = {
  onKeyPress: "ON_KEY_PRESS",
  checkTheWord: "CHECK_THE_WORD",
  onDelete: "ON_DELETE",
  closemodal: "CLOSE_MODAL",
  onCancelPost: "CANCEL_POST",
  getcookiess: "GET_COOKIES",
  getWordBank: "GET_WORD_BANK",
  getNewStateForTheDay: "GET_NEW_STATE_FOR_DAY",
  startTimer: "START_TIMER",
  setTimer: "SET_TIMER",
  adminLoginSuccess: "ADMIN_LOGIN_SUCCESS",
  adminLogout: "ADMIN_LOGOUT",
  setCluecardUrl: "SET_CLUECARD_URL",
  toggleClueCardModal: "TOGGLE_CLUE_CARD_MODAL",
  increaseTheHintsShownCount: "INCREASE_THE_HINTS_SHOWN_COUNT",
  toggleRules: "TOGGLE_RULES"
};
export const Context = createContext<contextType | null>(null);
const ContextProvider: React.FC = ({ children }) => {
  const myRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(Reducer, initialState);
  const scrollToKeyBoard = () => {
    return myRef.current!.scrollIntoView({ behavior: 'smooth', block: "center" })
  }
  return (
    <Context.Provider value={{ state, dispatch, myRef, scrollToKeyBoard }}>{children}</Context.Provider>
  );
};
export default ContextProvider;
