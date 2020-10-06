import { Wrapper } from "components/Wrapper";
import { getTime } from "lib/getTime";
import { onKey } from "lib/onKey";
import { makeWords } from "lib/Words";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

let initialWords = makeWords();

interface OutgoingWordProps {
  text: string;
  isWrong?: boolean;
}

const Index = ({}) => {
  const [input, setInput] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(initialWords[targetIndex]);
  const [outgoing, setOutGoing] = useState<Array<OutgoingWordProps>>([]);
  const [upcoming, setUpcoming] = useState(
    initialWords.slice(targetIndex + 1, initialWords.length)
  );
  const [inputStyles, setInputStyles] = useState<CSSProperties>();
  const [startTime, setStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [inputCounter, setInputCounter] = useState(0);

  useEffect(() => {
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
  }, [input]);

  onKey((key) => {
    if (inputCounter === initialWords.length) return;

    if (!startTime) {
      setStartTime(getTime());
    }

    if (key === " " && input.length > 0) {
      setInputCounter(inputCounter + 1);
      const durationInMinutes = (getTime() - startTime) / 60000.0;
      if (input === target) {
        setWordCount(wordCount + 1);
        setWpm(parseInt(((wordCount + 1) / durationInMinutes).toFixed(2)));
      } else {
        setWpm(parseInt((wordCount / durationInMinutes).toFixed(2)));
      }
      setInput("");
      setTargetIndex(targetIndex + 1);
      setTarget(initialWords[targetIndex + 1]);
      setUpcoming(initialWords.slice(targetIndex + 2, initialWords.length));
      setOutGoing([
        ...outgoing,
        { text: target, isWrong: input !== target ? true : false },
      ]);
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
      <h1>Typist</h1>

      <main className={styles.main}>
        <div className={styles.wpmContainer}>wpm: {wpm}</div>
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

        <div style={inputStyles} className={styles.inputContainer}>
          {input ? input : "..."}
        </div>
      </main>
      <p className={styles.title}>
        <a href="https://resume.evanchristians.co.za" target="_blank">
          $(whoami)
        </a>{" "}
        &middot;{" "}
        <a href="https://github.com/evanchristians" target="_blank">
          github
        </a>{" "}
        &middot;{" "}
        <a href="https://www.linkedin.com/in/evan-christians-50ba30159/" target="_blank">
          linkedin
        </a>
      </p>
    </Wrapper>
  );
};

export default Index;
