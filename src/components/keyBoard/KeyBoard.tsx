import { useCallback, useContext, useEffect } from "react";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import calculateScore from "../../utils/calculateScore"
import "./KeyBoard.scss";
import Button from "../../ui/Buuton/Button";
import CheckingTheWord from "../../utils/checkingTheWord";
import { useNavigate } from "react-router";
const KeyBoard = () => {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const navigate = useNavigate();
  const contextdata = useContext(Context);

  const onEnter = () => {
    if (
      contextdata?.state.gameStatus === "completed" ||
      contextdata?.state.gameStatus === "over"
    ) {
      navigate("/result");
      return
    }
    if (contextdata?.state.currentLetter !== 5) return;
    contextdata?.dispatch({ type: actionsWords.checkTheWord, data: "" });
    const wordResult = CheckingTheWord(
      contextdata?.state
    );
    if (
      wordResult.isCorrect ||
      (contextdata.state.currentAttempt === 5 && wordResult.isValidWord && wordResult.isGameOver)
    ) {
      navigate("/result");
    }
  }
  // const onEnter = () => {
  //   if (
  //     contextdata?.state.gameStatus === "completed" ||
  //     contextdata?.state.gameStatus === "over"
  //   ) {
  //     navigate("/result");
  //   }
  //   if (contextdata?.state.currentLetter !== 5) return;
  //   contextdata?.dispatch({ type: actionsWords.checkTheWord, data: "" });
  //   const wordResult = CheckingTheWord(
  //     contextdata?.state
  //   );
  //   if (
  //     wordResult.isCorrect ||
  //     (contextdata.state.currentAttempt === 5 && wordResult.isValidWord && wordResult.isGameOver)
  //   ) {

  //     navigate("/result");
  //   }
  // };

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        contextdata?.dispatch({ type: actionsWords.onDelete, data: "" });
      } else {
        keys.map((row) => {
          return row.forEach((letter) => {
            if (letter === event.key) {
              return contextdata?.dispatch({
                type: actionsWords.onKeyPress,
                data: letter,
              });
            }
          });
        });
      }
    },
    [keys] // eslint-disable-line react-hooks/exhaustive-deps
  ); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);


  return (
    <div className="relative w-100  mx-auto keyboard-button-container ">
      <div className="keyboard-container">
        {keys.map((keyrow) => {
          return (
            <div key={Math.random()} className="keyboard-row">
              {keyrow.map((keyletter) => {
                return (
                  <button
                    key={Math.random()}
                    className="keyboard-letter "
                    onClick={() => {
                      contextdata?.dispatch({
                        type: actionsWords.onKeyPress,
                        data: keyletter,
                      });
                    }}
                  >
                    {keyletter}
                  </button>
                );
              })}
            </div>
          );
        })}

      </div>

      <Button onEnter={onEnter} />
    </div>
  );
};

export default KeyBoard;
