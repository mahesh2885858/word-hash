import wordBank from "../utils/WordBank.txt";
const GetTheWords = async () => {
  let wordSet = new Set("");
  let todaysWord = ""
 await fetch(wordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordsArray = result.split("\n");
      todaysWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
      wordSet = new Set(wordsArray);
    });

  return { wordSet, todaysWord };
};
export default GetTheWords;
