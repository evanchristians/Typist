import { Wrapper } from "components/Wrapper";
import { onKey } from "lib/onKey";
import { Words } from "lib/Words";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  onKey((key) => {
    console.log(key);
  });
  const words = Words();
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
        <p>{words}</p>
      </main>
    </Wrapper>
  );
}
