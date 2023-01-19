# Would-You-Rather

## Usage

JavaScript
```javascript
const WouldYouRather = require("either-wyr");

WouldYouRather({ count: 3 }).then(console.log); // [Question, Question, Question]
WouldYouRather().then(console.log); // [Question]

```

## Question

```javascript
{
  id: Number,
  slug: String,
  isAdult: Boolean,
  title: String,
  description: String | null,
  sentence: String,
  url: String,
  shortUrl: String,
  commentCount: Number,
  createdAt: Date,
  updatedAt: Date,
  options: [
    {
      type: "blue",
      question: String,
      voteCount: Number
    },
    {
      type: "red",
      question: String,
      voteCount: Number
    }
  ],
  author: {
    id: Number,
    name: String,
    isDeleted: Boolean,
    url: String,
    email: String | null
  },
  tags: [
    {
      id: Number,
      name: String,
      slug: String,
      url: String,
      createdAt: Date,
    }
  ]
}
```

#### Example reponse
```json
[
	{
		"id": 123,
		"isAdult": false,
		"title": "LOL",
		"description": null,
		"sentence": "Would you rather be very fat or be very thin?",
		"url": "http://either.io/123/fat-thin",
		"slug": "fat-thin",
		"shortUrl": "http://wyr.be/bG1hbw",
		"commentCount": 1337,
		"createdAt": "2009-10-08T20:22:43.000Z",
		"updatedAt": "2009-10-08T22:05:30.000Z",
		"options": [
			{
				"type": "blue",
				"question": "Be very fat",
				"voteCount": 123456
			},
			{
				"type": "red",
				"question": "Be very thin",
				"voteCount": 123456
			}
		],
		"author": {
			"id": 123987,
      "isDeleted": false,
			"name": "Xaliks",
			"url": "http://either.io/user/123987",
			"email": "email@lol.com"
		},
		"tags": [
			{
				"id": 8,
				"name": "Sex",
				"url": "http://either.io/tags/11/sex",
				"slug": "sex",
				"createdAt": "2012-01-10T16:22:33.000Z"
			}
		]
	}
]

```
