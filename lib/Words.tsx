import faker from "faker";

export const makeWords = (count = 24) => {
  let words: string[] = [];
  for (let i = 0; i <= count; i++) {
    words.push(faker.random.word().toLowerCase());
  }

  return words;
};
