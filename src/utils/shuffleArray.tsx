// function to get the daily ten letters and shuffling them which includes word of the day
const shuffleArray = (wordOfTheDay: string) => {
  const consonentsArray = "bcdfghjklmnpqrstvwxyz".split("");
  // const alphaArray = alphabets.split("");

  const vowelsArray = ["a", "e", "i", "o", "u"]
  const wordArray = wordOfTheDay.split("");
  // new logic for no of vowels
  let numberOfVowels: number = 0;
  let vowelsInTheWord: string[] = []
  wordArray.forEach((letter, index) => {
    if (!vowelsArray.includes(letter)) return
    vowelsInTheWord.push(letter)
    return numberOfVowels += 1
  })
  // console.log(numberOfVowels)
  // test begin
  let newArray: string[]
  let b: string[] = [];
  if (numberOfVowels >= 3) {
    // let k=0
    while (b.length < 5) {

      const index = Math.floor(Math.random() * consonentsArray.length);
      if (!(b.indexOf(consonentsArray[index]) >= 0) && !(wordArray.indexOf(consonentsArray[index]) >= 0)) {

        b.push(consonentsArray[index]);
      }
    }

  }
  else {

    // const newVowelsArray: string[] = []
    const limit = numberOfVowels === 2 ? 1 : (numberOfVowels === 1 ? 2 : 3)
    let k = 0;
    while (k < limit) {

      const randomIndex = Math.floor(Math.random() * vowelsArray.length)
      if (!(b.indexOf(vowelsArray[randomIndex]) >= 0) && !(wordArray.indexOf(vowelsArray[randomIndex]) >= 0)) {

        b.push(vowelsArray[randomIndex]);
        k++;
      }
    }
    // for (let j = 0; j < limit; j++) {
    //   const randomIndex = Math.floor(Math.random() * vowelsArray.length)
    //   if (!(b.indexOf(vowelsArray[randomIndex]) >= 0) && !(wordArray.indexOf(vowelsArray[randomIndex]) >= 0)) {

    //     b.push(vowelsArray[randomIndex])
    //   }
    // }
    // console.log(newVowelsArray)
    while (b.length < 5) {
      const index = Math.floor(Math.random() * consonentsArray.length);
      if (!(b.indexOf(consonentsArray[index]) >= 0) && !(wordArray.indexOf(consonentsArray[index]) >= 0)) {

        b.push(consonentsArray[index]);
      }
    }


  }

  // test end
  const newArr = [...wordArray, ...b];
  let j, x, i;
  for (i = newArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = x;
  }
  return newArr;
};

export default shuffleArray;
