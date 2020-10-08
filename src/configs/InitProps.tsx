import { makeWords } from "../lib/Words";

const initialWords = makeWords();

export interface WasAttemptedProps {
  text: string;
  isWrong: boolean;
}

export const InitProps = {
  words: initialWords,
  numWords: 0,
  numChars: 0,
  lang: "en",
  currInput: "",
  goal: initialWords[0],
  goalIndex: 0,
  wasAttempted: [],
  toAttempt: initialWords.slice(1, initialWords.length),
  numAttempts: 0,
  numWrongAttempts: 0,
  wpm: 0,
  acc: 0,
  initTime: 0,
  disableInputs: false,
};
