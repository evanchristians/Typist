import randomWords from "random-words";

export const makeWords = (count = 36) => {
  let words: string[] = [];
  for (let i = 0; i <= count; i++) {
    words.push(randomWords(1)[0]);
  }

  return words;
};
