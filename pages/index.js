import React from "react";
import Parser from "rss-parser";
import Layout from "../components/layout";

const CBCNewsPage = (props) => {
  const { stories } = props;

  return (
    <Layout title={"CBC News"}>
      <p>{`${new Date().toDateString()}`}</p>

      <p>{"Top Stories"}</p>

      <ul>
        {stories.map((p, i) => (
          <li key={i}>
            <a href={`/story?url=${p.link}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  const parser = new Parser();

  const feed = await parser.parseURL(
    "https://www.cbc.ca/cmlink/rss-topstories"
  );

  return {
    props: {
      stories: feed.items,
    },
  };
}

export default CBCNewsPage;
