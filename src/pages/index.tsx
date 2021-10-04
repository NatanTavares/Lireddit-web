import { NavigationBar } from "../components/NavigationBar";
import { usePostsQuery } from "../generated/graphql";
import type { NextPage } from "next";
import Head from "next/head";

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

export default Home;
