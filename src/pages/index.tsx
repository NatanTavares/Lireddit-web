import Head from "next/head";
import type { NextPage } from "next";
import { NavigationBar } from "../components/NavigationBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lireddit | Home</title>
      </Head>

      <main>
        <NavigationBar />
      </main>
    </>
  );
};

export default Home;
