import { ChakraProvider, CSSReset, Box, Flex } from "@chakra-ui/core";
import { Theme } from "./theme";
import React, { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import { Word } from "./components/Word";
import { WordsContainer } from "./components/WordsContainer";
import { OnKey } from "./lib/OnKey";
import { Now } from "./lib/Now";
import { InitProps, WasAttemptedProps } from "./configs/InitProps";
import { InfoBox } from "./components/InfoBox";
import { State } from "./lib/State";

export const App = () => {
  const [wasAttempted, setWasAttempted] = useState<
    Array<WasAttemptedProps | undefined>
  >(InitProps.wasAttempted);
  const [boxBg, setBoxBg] = useState<string>();
  const [boxColor, setBoxColor] = useState<string>();

  const [
    {
      words,
      numWords,
      lang,
      currInput,
      goalIndex,
      toAttempt,
      numAttempts,
      numWrongAttempts,
      numChars,
      wpm,
      acc,
      initTime,
      disableInputs,
    },
    setState,
  ] = useState(InitProps);

  OnKey((key) => {
    if (numAttempts === words.length || disableInputs) return;

    if (!initTime) State(setState, "initTime", Now());

    if (key === " " && currInput.length > 0) {
      State(setState, "numChars", numChars + currInput.length);
      State(setState, "numAttempts", numAttempts + 1);
      const durationInMinutes = (Now() - initTime) / 60000.0;
      if (currInput === words[goalIndex]) {
        State(
          setState,
          "numWords",
          Math.floor((numChars + currInput.length) / 4.7)
        );
        State(
          setState,
          "wpm",
          parseInt(((numWords + 1) / durationInMinutes).toFixed(2))
        );
      } else {
        State(
          setState,
          "wpm",
          parseInt((numWords / durationInMinutes).toFixed(2))
        );
      }
      State(setState, "currInput", "");
      State(setState, "goalIndex", goalIndex + 1);
      State(setState, "toAttempt", words.slice(goalIndex + 2, words.length));
      setWasAttempted([
        ...wasAttempted,
        {
          text: words[goalIndex],
          isWrong: currInput !== words[goalIndex] ? true : false,
        },
      ]);
      State(
        setState,
        "numWrongAttempts",
        currInput !== words[goalIndex] ? numWrongAttempts + 1 : numWrongAttempts
      );
    } else if (key === "Backspace") {
      State(setState, "currInput", currInput.slice(0, -1));
    }

    if (currInput.length <= 50 && key !== "Backspace" && key !== " ")
      State(setState, "currInput", currInput + key);
  });

  useEffect(() => {
    if (numAttempts) {
      State(
        setState,
        "acc",
        Math.floor(((numAttempts - numWrongAttempts) / numAttempts) * 100)
      );
    }
  }, [numAttempts, numWrongAttempts]);

  useEffect(() => {
    if (
      currInput &&
      currInput !== words[goalIndex].slice(0, currInput.length)
    ) {
      setBoxBg("red.100");
      setBoxColor("white");
    } else {
      setBoxBg("grey.100");
      setBoxColor("black");
    }
  }, [currInput]);
  return (
    <ChakraProvider theme={Theme}>
      <CSSReset />
      <Wrapper>
        <Box>
          <InfoBox>
            wpm: {wpm} acc: {acc}
          </InfoBox>
          <WordsContainer>
            {wasAttempted.map((word) =>
              word ? (
                <Word
                  isWrong={word.isWrong}
                  color={!word.isWrong ? "green.100" : "red.100"}
                >
                  {word.text}
                </Word>
              ) : null
            )}
            <Word color="blue.100">{words[goalIndex]}</Word>
            {toAttempt.map((word) => (
              <Word>{word}</Word>
            ))}
          </WordsContainer>
          <Flex justifyContent="center">
            <InfoBox minWidth={300} bg={boxBg} color={boxColor}>
              {currInput}
            </InfoBox>
          </Flex>
        </Box>
      </Wrapper>
    </ChakraProvider>
  );
};

export const getStaticProps = () => {};
