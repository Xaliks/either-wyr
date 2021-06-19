const fetch = require("node-fetch");
const cheerio = require("cheerio");
const base_url = "http://either.io";

async function WouldYouRather(data = { comments: false }) {
  try {
    const WYR_data = await fetch(base_url).then((resp) => resp.text());
    const $ = cheerio.load(WYR_data);

    const title = $("#question-title").text();
    const wyr = $(".option a").text().split(" \n");
    const votes = [
      Number($(".result-1 .count").html().replace(/,/g, "")),
      Number($(".result-2 .count").html().replace(/,/g, "")),
    ];
    const total_votes = votes[0] + votes[1];
    const percentage = [
      ((votes[0] / total_votes) * 100).toFixed(2),
      ((votes[1] / total_votes) * 100).toFixed(2),
    ];
    const description = $(".more-info").text() || null;
    const author = $("#question-author a").text();
    const tag = $(".tags li a").text();

    const resp = {
      title,
      description,
      author,
      questions: [
        {
          type: "blue",
          question: wyr[1],
          votes: votes[0],
          percentage: percentage[0],
        },
        {
          type: "red",
          question: wyr[2],
          votes: votes[1],
          percentage: percentage[1],
        },
      ],
      total_votes,
      tag,
    };

    if (data.comments) {
      resp.comments = [];
      $(".comment-list li")
        .toArray()
        .forEach((comment) => {
          if (!comment.attribs.id) return;
          const comment_id = comment.attribs.id;
          const comment_question_type = comment.attribs.class;
          const comment_text = $(`#${comment_id} .comment-block p`)
            .html()
            .trim();
          const comment_author_username = $(`#${comment_id} h4 a`).html();
          const comment_author_avatar = $(`#${comment_id} .thumb img`).attr(
            "src"
          );
          const comment_author_url =
            base_url + $(`#${comment_id} h4 a`).attr("href");
          const comment_likes = $(`#${comment_id} .agree-count`).html();
          const comment_timestamp = $(
            `#${comment_id} .comment-block .timestamp`
          ).html();
          const comment_replies = [];

          $(`#${comment_id} .comment-list li`)
            .toArray()
            .forEach((reply) => {
              if (!reply.attribs.id) return;
              const reply_id = reply.attribs.id;
              const reply_question_type = reply.attribs.class.slice(8);
              const reply_text = $(`#${reply_id} .comment-block p`)
                .html()
                .trim();
              const reply_author_username = $(`#${reply_id} h4 a`).html();
              const reply_author_avatar = $(`#${reply_id} .thumb img`).attr(
                "src"
              );
              const reply_author_url =
                base_url + $(`#${reply_id} h4 a`).attr("href");
              const reply_likes = $(`#${reply_id} .agree-count`).html();
              const reply_timestamp = $(
                `#${reply_id} .comment-block .timestamp`
              ).html();

              comment_replies.push({
                id: reply_id.slice(8),
                question_type: reply_question_type,
                text: reply_text,
                author: {
                  username: reply_author_username,
                  avatar: reply_author_avatar,
                  url: reply_author_url,
                },
                likes: reply_likes,
                timestamp: reply_timestamp,
              });
            });

          resp.comments.push({
            id: comment_id.slice(8),
            question_type: comment_question_type.slice(8),
            text: comment_text,
            author: {
              username: comment_author_username,
              avatar: comment_author_avatar,
              url: comment_author_url,
            },
            likes: comment_likes,
            timestamp: comment_timestamp,
            replies: comment_replies,
          });
        });
    }
    return resp;
  } catch (e) {
    WouldYouRather(data);
  }
}

module.exports = WouldYouRather;
