import Head from "next/head";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { NavigationBar } from "../components/NavigationBar";
import { createUrqlClient } from "../utils/createUrqlClient";

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

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
