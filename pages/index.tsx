import { Wrapper } from "components/Wrapper";
import { getTime } from "lib/getTime";
import { onKey } from "lib/onKey";
import { makeGermanWords, makeWords } from "lib/Words";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

let initialWords = makeWords();

interface OutgoingWordProps {
  text: string;
  isWrong?: boolean;
}

const Index = ({}) => {
  const [lang, setLang] = useState("en");
  const [placeholder, setPlaceHolder] = useState("_");
  const [input, setInput] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(initialWords[targetIndex]);
  const [outgoing, setOutGoing] = useState<Array<OutgoingWordProps>>([]);
  const [inputStyles, setInputStyles] = useState<CSSProperties>();
  const [startTime, setStartTime] = useState(0);
  const [words, setWords] = useState(initialWords);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [inputCounter, setInputCounter] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [upcoming, setUpcoming] = useState(
    initialWords.slice(targetIndex + 1, initialWords.length)
  );
  const [blockInputs, setBlockInputs] = useState(false);
  const [wordCountInput, setWordCountInput] = useState("36");

  useEffect(() => {
    if (!target) {
      return setInputStyles({
        background: "#16A085",
      });
    }

    if (input !== target.slice(0, input.length)) {
      setInputStyles({
        background: "#ff1d15aa",
        color: "white",
      });
    } else {
      setInputStyles({
        background: "#eee",
      });
    }
    if (inputCounter > 0)
      setAccuracy(
        Math.floor(((inputCounter - errorCount) / inputCounter) * 100)
      );
  }, [input, errorCount]);

  useEffect(() => {
    if (lang === "en") {
      setWords(
        makeWords(wordCountInput ? parseInt(wordCountInput) : undefined)
      );
    } else {
      setWords(
        makeGermanWords(wordCountInput ? parseInt(wordCountInput) : undefined)
      );
    }
  }, [lang]);

  useEffect(() => {
    if (parseInt(wordCountInput) >= 10) {
      setWords(
        lang === "de"
          ? makeGermanWords(parseInt(wordCountInput))
          : makeWords(parseInt(wordCountInput))
      );
    }
  }, [wordCountInput]);

  useEffect(() => {
    setInput("");
    setTargetIndex(0);
    setTarget(words[0]);
    setOutGoing([]);
    setStartTime(0);
    setWordCount(0);
    setCharCount(0);
    setInputCounter(0);
    setErrorCount(0);
    setAccuracy(0);
    setWpm(0);
    setUpcoming(words.slice(1, words.length));
  }, [words]);

  onKey((key) => {
    if (inputCounter === words.length || blockInputs === true) return;
    setPlaceHolder("");

    if (!startTime) {
      setStartTime(getTime());
    }

    if (key === " " && input.length > 0) {
      setCharCount(charCount + input.length);
      setInputCounter(inputCounter + 1);
      const durationInMinutes = (getTime() - startTime) / 60000.0;
      if (input === target) {
        setWordCount(Math.floor((charCount + input.length) / 5));
        setWpm(parseInt(((wordCount + 1) / durationInMinutes).toFixed(2)));
      } else {
        setWpm(parseInt((wordCount / durationInMinutes).toFixed(2)));
      }
      setInput("");
      setTargetIndex(targetIndex + 1);
      setTarget(words[targetIndex + 1]);
      setUpcoming(words.slice(targetIndex + 2, words.length));
      setOutGoing([
        ...outgoing,
        { text: target, isWrong: input !== target ? true : false },
      ]);
      setErrorCount(input !== target ? errorCount + 1 : errorCount);

      return;
    }

    if (key === "Backspace") {
      setInput(input.slice(0, -1));
    }

    if (input.length <= 50 && key !== "Backspace" && key !== " ")
      setInput(input + key);
  });

  return (
    <Wrapper>
      <Head>
        <title>Typist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.languageSelectorContainer}>
        <span
          className={styles.languageSelector}
          style={{ background: lang === "de" ? "#eee" : "none" }}
          onClick={() => {
            setLang("de");
          }}
        >
          de
        </span>{" "}
        |{" "}
        <span
          className={styles.languageSelector}
          style={{ background: lang === "en" ? "#eee" : "none" }}
          onClick={() => {
            setLang("en");
          }}
        >
          en
        </span>
      </div>
      <main className={styles.main}>
        <div className={styles.flex}>
          <div className={styles.wpmContainer}>
            wpm: {wpm} acc: {accuracy}%
          </div>

          <div className={styles.wordCountContainer}>
            word count:{" "}
            <input
              className={styles.wordCountInput}
              onKeyDown={(e) => {
                if (e.key === "Backspace")
                  return setWordCountInput(wordCountInput.slice(0, -1));
                if (parseInt(wordCountInput + e.key) < 100)
                  return setWordCountInput(
                    isNaN(+e.key) || e.key === " "
                      ? wordCountInput
                      : wordCountInput + e.key
                  );
              }}
              onFocus={() => {
                setBlockInputs(true);
                wordCountInput ?? undefined;
              }}
              onBlur={() => {
                setBlockInputs(false);
              }}
              value={wordCountInput}
            />
          </div>

          <div
            className={styles.resetButton}
            onClick={() => {
              setWords(
                lang === "de"
                  ? makeGermanWords(
                      wordCountInput === ""
                        ? undefined
                        : parseInt(wordCountInput)
                    )
                  : makeWords(
                      wordCountInput === ""
                        ? undefined
                        : parseInt(wordCountInput)
                    )
              );
            }}
          >
            reset
          </div>
        </div>
        <article className={styles.wordsContainer}>
          {outgoing?.map((word, key) => {
            if (word.text.length > 0) {
              return (
                <span
                  className={word.isWrong ? styles.isWrong : styles.isRight}
                  key={key}
                >
                  {word.text}
                </span>
              );
            } else return null;
          })}
          <span className={styles.target}>{target}</span>
          {upcoming.map((word, key) => (
            <span className={styles.word} key={key}>
              {word}
            </span>
          ))}
        </article>

        <div className={styles.flex}>
          <div style={inputStyles} className={styles.inputContainer}>
            {input ? input : placeholder}
          </div>
        </div>
      </main>
      <p className={styles.title}>
        <a href="https://resume.evanchristians.co.za" target="_blank">
          me
        </a>{" "}
        &middot;{" "}
        <a href="https://github.com/evanchristians/Typist" target="_blank">
          code
        </a>
      </p>
    </Wrapper>
  );
};

export default Index;
