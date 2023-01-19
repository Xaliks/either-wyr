const { fetch } = require("undici");

async function getQuestions(options = { count: 1 }) {
  if (typeof options.count !== "number") throw new Error("either-wyr", `[options.count] Must be number! Provided: ${typeof count}`);

  const questions = await fetch(`http://either.io/questions/next/${options.count}`).then((response) => response.json());

  return questions.questions.map((question) => {
    return {
      id: parseInt(question.id),
      isAdult: question.is_adult !== "0",
      title: question.title,
      description: question.moreinfo || null,
      sentence: question.twitter_sentence,
      url: `http://either.io/${question.id}/${question.slug}`,
      slug: question.slug,
      shortUrl: question.short_url,
      commentCount: parseInt(question.comment_total) || 0,
      createdAt: new Date(parseInt(question.created_on) * 1000),
      updatedAt: new Date(parseInt(question.updated_on) * 1000),
      options: [
        {
          type: "blue",
          question: question.option_1,
          voteCount: parseInt(question.option1_total),
        },
        {
          type: "red",
          question: question.option_2,
          voteCount: parseInt(question.option2_total),
        },
      ],
      author: {
        id: parseInt(question.user_id),
        name: question.display_name,
        isDeleted: question.user_is_deleted !== "0",
        url: `http://either.io/user/${question.user_id}`,
        email: question.email || null,
      },
      tags: question.tags.map((tag) => {
        return {
          id: parseInt(tag.id),
          name: tag.name.replace(/&amp;amp;/g, "&").replace(/&amp;/g, "&"),
          url: `http://either.io/tags/${tag.id}/${tag.slug}`,
          slug: tag.slug,
          createdAt: new Date(parseInt(tag.created_on) * 1000),
        }
      })
    }
  })
}

module.exports = getQuestions;
