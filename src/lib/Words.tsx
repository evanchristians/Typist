import randomWords from "random-words";
import randomGermanWord from "random-noun-generator-german";

export const makeWords = (count = 36) => {
  return Array(count)
    .fill(undefined)
    .map((_) => randomWords(1)[0].toLowerCase());
};

export const makeGermanWords = (count = 36) => {
  return Array(count)
    .fill(undefined)
    .map((_) => randomGermanWord().toLowerCase());
};
