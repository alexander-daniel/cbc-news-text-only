import React from "react";
import { withRouter } from "next/router";
import Layout from "../components/layout";
import scrapeArticle from "../lib/scrape";

const CBCNewsStory = (props) => {
  const { title, byline, story } = props;

  return (
    <Layout title={`CBC | ${title}`}>

      <h2>{title}</h2>
      <small style={{ fontSize: "8pt" }}>{`[ ${byline} ]`}</small>
      <hr />

      {story.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const storyURL = query.url;

  if (!storyURL) {
    return { title: "", byline: "", content: [] };
  }
  const data = await scrapeArticle(storyURL);
  const { title, byline, story } = data;

  return {
    props: {
      title,
      byline,
      story,
    },
  };
}

export default withRouter(CBCNewsStory);
