import randomWords from "random-words";
import randomGermanWord from "random-noun-generator-german";

export const makeWords = (count = 36) => {
  let words: string[] = [];
  for (let i = 0; i <= count; i++) {
    words.push(randomWords(1)[0]);
  }

  return words;
};

export const makeGermanWords = (count = 36) => {
  let words: string[] = [];
  for (let i = 0; i <= count; i++) {
    words.push(randomGermanWord().toLowerCase());
  }

  return words;
};
