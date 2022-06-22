import { stateType } from "./Reducer/AppContext";
//function used to getting the user entered word from each attempt
const GetTheWordFromArray = (state: stateType) => {
  let word = "";
  state.board[state.currentAttempt].letters.forEach((letter) => {
    word += letter.value;
  });
  return word;
};
export default GetTheWordFromArray;
