# Would-You-Rather

## Usage

```javascript
const WYR = require("would-you-rather");

WYR({ comments: true }).then(console.log); // { ..., comments: [{}, {}, {}] }
WYR().then(console.log); // { ... }
```

## Response

```json
{
  "title": "Title",
  "description": "Description",
  "author": "Author",
  "questions": [
    {
      "type": "blue",
      "question": "Question 1",
      "votes": 123456,
      "percentage": "35.98"
    },
    {
      "type": "red",
      "question": "Question 2",
      "votes": 123456,
      "percentage": "64.02"
    }
  ],
  "total_votes": 123456,
  "tag": "Travel",
  "comments": [
    {
      "question_type": "blue",
      "text": "text",
      "author": {
        "username": "author",
        "avatar": "URL",
        "url": "URL"
      },
      "likes": 123456,
      "timestamp": "10 years ago",
      "replies": [
        {
          "question_type": "red",
          "text": "text",
          "author": {
            "username": "author",
            "avatar": "URL",
            "url": "URL"
          },
          "likes": 123456,
          "timestamp": "10 years ago"
        }
      ]
    }
  ]
}

```
