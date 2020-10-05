import { Wrapper } from "components/Wrapper";
import { onKey } from "lib/onKey";
import { makeWords } from "lib/Words";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

const initialWords = makeWords();

interface IndexProps {}
interface OutgoingWordProps {
  text: string;
  isWrong?: boolean;
}

const Index: React.FC<IndexProps> = ({}) => {
  const [input, setInput] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(initialWords[targetIndex]);
  const [outgoing, setOutGoing] = useState<Array<OutgoingWordProps>>([]);
  const [upcoming, setUpcoming] = useState(
    initialWords.slice(targetIndex + 1, initialWords.length)
  );
  const [inputStyles, setInputStyles] = useState<CSSProperties>();

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
    if (key === " " && input.length > 0) {
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

    if (input.length <= 50 && key !== "Backspace") setInput(input + key);
  });

  return (
    <Wrapper>
      <Head>
        <title>Typist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
          {input ? input : "␣"}
        </div>
      </main>
      <p className={styles.title}>
        Hello, I'm{" "}
        <a href="https://resume.evanchristians.co.za" target="_blank">
          Evan!
        </a>
      </p>
    </Wrapper>
  );
};

export default Index;
