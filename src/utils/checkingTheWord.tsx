import { boardLayout, stateType } from "../utils/Reducer/AppContext";
import CalculateScore from "./calculateScore";

const CheckingTheWord = (
  // board: boardLayout[],
  state: stateType
  // currentAttempt: number,
  // correctWord: string,
  // wordBank: Set<string>,
) => {
  let countOfMatchedLetters = 0; //to check whether all letteres matched or not
  //   Getting the new Board by checking letters of the word
  const newBoard = state.board.map((row, index) => {
    if (index === state.currentAttempt) {
      const newRow = { ...row };
      const newLetter = row.letters.map((letter, index) => {
        // if (correctWord.indexOf(letter.value) === index) {
        if (letter.value.toLowerCase() === state.correctWord[index].toLowerCase()) {
          countOfMatchedLetters += 1;
          return { ...letter, status: "correct" };
        } else {
          return { ...letter, status: "wrong" };
        }
      });
      return { ...newRow, letters: newLetter };
    } else {
      return row;
    }
  });

  let testWord = "";
  state.board[state.currentAttempt].letters.forEach((letter) => {
    testWord = testWord.concat(letter.value);
  });
  if (state.wordBank.has(testWord.toLowerCase())) {

    if (countOfMatchedLetters === state.correctWord.length) {

      if (testWord.toLowerCase() === state.correctWord.toLowerCase()) {
        return { newBoard, score: CalculateScore(state), isCorrect: true, word: testWord, isGameOver: false, isValidWord: true };
      } else {
        if (state.currentAttempt === 5) return { newBoard, isCorrect: false, isGameOver: true, isValidWord: true, score: 0 }
        return { newBoard, isCorrect: false, word: testWord, isGameOver: false, isValidWord: true };
      }
    } else {
      // CalculateScore(state)
      if (state.currentAttempt === 5) return { newBoard, isCorrect: false, isGameOver: true, isValidWord: true, score: 0 }

      return { newBoard, isCorrect: false };
    }
  } else {
    return { newBoard, isValidWord: false }
  }
};
export default CheckingTheWord;
