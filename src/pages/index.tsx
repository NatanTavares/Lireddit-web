import Head from "next/head";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { NavigationBar } from "../components/NavigationBar";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <Head>
        <title>Lireddit | Home</title>
      </Head>

      <main>
        <NavigationBar />
        {!!data && data.posts.map((post) => <p key={post.id}>{post.title}</p>)}
      </main>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
