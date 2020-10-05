import { Wrapper } from "components/Wrapper";
import { onKey } from "lib/onKey";
import { submitWord } from "lib/SubmitWord";
import { makeWords } from "lib/Words";
import Head from "next/head";
import { CSSProperties, useState } from "react";
import styles from "../styles/Home.module.scss";

const initialWords = makeWords();

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [input, setInput] = useState("");
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(initialWords[targetIndex]);
  const [outgoing, setOutGoing] = useState<Array<string>>([""]);
  const [upcoming, setUpcoming] = useState(
    initialWords.slice(targetIndex + 1, initialWords.length)
  );
  const [inputStyles, setInputStyles] = useState<CSSProperties>();

  onKey((key) => {
    if (key === " ") {
      setInput("");
      submitWord(input, target);
      setTargetIndex(targetIndex + 1);
      setTarget(initialWords[targetIndex + 1]);
      setUpcoming(initialWords.slice(targetIndex + 2, initialWords.length));
      setOutGoing([...outgoing, target]);
      return;
    }

    if (key === "Backspace") {
      setInput(input.slice(0, -1));
    }

    if (input.length >= target.length && input !== target) {
      setInputStyles({
        background: "red",
      });
    } else {
      setInputStyles({
        background: "#eee",
      });
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
        <h1 className={styles.title}>
          Hello, I'm <a href="https://resume.evanchristians.co.za">Evan!</a>
        </h1>
        <article className={styles.wordsContainer}>
          {outgoing?.map((word, key) => {
            if (word.length > 0) {
              return <span key={key}>{word}&nbsp;</span>;
            } else return null;
          })}
          <span className={styles.target}>{target}&nbsp;</span>
          {upcoming.map((word, key) => (
            <span key={key}>{word}&nbsp;</span>
          ))}
        </article>

        <div style={inputStyles} className={styles.inputContainer}>
          {input}
        </div>
      </main>
    </Wrapper>
  );
};

export default Index;
