import faker from "faker";

export const Words = (count = 20): string => {
  return new Array(count).fill(undefined).map((_) => faker.random.word()).join(" ");
};
