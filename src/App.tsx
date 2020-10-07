import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { Theme } from "./theme";
import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import { makeWords } from "./lib/Words";
import { Word } from "./components/Word";
import { WordsContainer } from "./components/WordsContainer";

const initialStateProps = {
  words: makeWords(),
  lang: "en"
};

export const App = () => {
  const [words, setWords] = useState(initialStateProps.words);
  const [lang, setLang] = useState(initialStateProps.lang)

  return (
    <ChakraProvider theme={Theme}>
      <CSSReset />
      <Wrapper>
        <WordsContainer>
          {words.map((word) => (
            <Word>{word}</Word>
          ))}
        </WordsContainer>
      </Wrapper>
    </ChakraProvider>
  );
};
