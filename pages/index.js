import React from "react";
import { read } from '@extractus/feed-extractor';
import Layout from "../components/layout";

const CBCNewsPage = (props) => {
  const { stories, montrealStories, worldStories, sportsStories } = props;

  return (
    <Layout title={"CBC News"}>

      <h1 id="top-of-page">{'CBC News'}</h1>
      <p>{`${new Date().toDateString()}`}</p>

      <a style={{ marginRight: '10px' }} href="#top-news">{"Top Stories"}</a>
      <a style={{ marginRight: '10px' }} href="#montreal-news">{"Montréal"}</a>
      <a style={{ marginRight: '10px' }} href="#world-news">{"World"}</a>
      <a style={{ marginRight: '10px' }} href="#sports-news">{"Sports"}</a>

      <hr></hr>

      <h1 id="top-news">{'Top Stories'}</h1>
      <ul>
        {stories.map((p, i) => (
          <li key={i}>
            <a href={`/story?url=${p.link}`}>{p.title}</a>
          </li>
        ))}
      </ul>

      <h1 id="montreal-news">{'Montréal News'}</h1>
      <hr></hr>
      <ul>
        {montrealStories.map((p, i) => (
          <li key={i}>
            <a href={`/story?url=${p.link}`}>{p.title}</a>
          </li>
        ))}
      </ul>

      <h1 id="world-news">{'World News'}</h1>
      <hr></hr>
      <ul>
        {worldStories.map((p, i) => (
          <li key={i}>
            <a href={`/story?url=${p.link}`}>{p.title}</a>
          </li>
        ))}
      </ul>


      <h1 id="sports-news">{'Sports News'}</h1>
      <hr></hr>
      <ul>
        {sportsStories.map((p, i) => (
          <li key={i}>
            <a href={`/story?url=${p.link}`}>{p.title}</a>
          </li>
        ))}
      </ul>

    </Layout>
  );
};

export async function getServerSideProps() {

  const feed = await read(
    "https://www.cbc.ca/cmlink/rss-topstories"
  );

  const montrealFeed = await read(
    "https://www.cbc.ca/cmlink/rss-canada-montreal"
  );

  const worldFeed = await read(
    "https://rss.cbc.ca/lineup/world.xml"
  );

  const sportsFeed = await read(
    "https://rss.cbc.ca/lineup/sports.xml"
  );

  return {
    props: {
      stories: feed.entries,
      montrealStories: montrealFeed.entries,
      worldStories: worldFeed.entries,
      sportsStories: sportsFeed.entries
    },
  };
}

export default CBCNewsPage;
