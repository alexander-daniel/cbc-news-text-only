const xRay = require("x-ray");
const x = xRay();

const getTitle = async (url) => {
  return new Promise((resolve, reject) => {
    x(
      url,
      ".detailHeadline"
    )((err, title) => {
      if (err) return reject(err);

      resolve(title);
    });
  });
};

const getByline = async (url) => {
  return new Promise((resolve, reject) => {
    x(
      url,
      ".bylineDetails"
    )((err, byline) => {
      if (err) return reject(err);

      resolve(byline);
    });
  });
};

const getContent = async (url) => {
  return new Promise((resolve, reject) => {
    x(url, ".story", ["p"])((err, story) => {
      if (err) return reject(err);

      resolve(story);
    });
  });
};

async function scrapeArticle(url) {
  try {
    // Not efficient
    const story = await getContent(url);
    const byline = await getByline(url);
    const title = await getTitle(url);

    return {
      title,
      byline,
      story,
    };
  } catch (e) {
    throw e;
  }
}

export default scrapeArticle;
