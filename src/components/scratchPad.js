// const players = [
// 	{ name: "Player 1", correctCategories: ["Entertainment", "Science", "Sports"] },
// 	{ name: "Player 2", correctCategories: ["Entertainment", "Science", "Sports"] }
// ]

// // Then the buttons
// 			for(var i = 0; i< 4; i++) {
// 			// Reset the button classes
// 			var button = document.getElementById(`choice-${i}`);
// 			button.classList.remove("btn-success", "btn-danger", "btn-secondary");
// 			// Set the button text
// 			if (choices[i] !== undefined) {
// 				button.value = choices[i];
// 				button.disabled = false;
// 			} else {
// 				button.value = "";
// 				button.disabled = true;
// 			}

const player = {
	"index": 0,
	"name": "Player A", 
	"correctCategories": ["none", "food_and_drink", "sport_and_leisure", "science", "history", "geography", "movies", "music", "general_knowledge"]
}

players = [{"index":0,"name":"Player A","correctCategories":["sport_and_leisure","geography","music","food_and_drink","science","history","movies","general_knowledge"]},{"index":1,"name":"Player B","correctCategories":["sport_and_leisure","movies","food_and_drink","science","history","geography","music","general_knowledge"]}]

const props = {
	"gameState": {
		"players": [
			{ "name": "Pat", "correctCategories": [] },
			{ "name": "Chris", "correctCategories": [] }],
		"categoryList": [{ "title": "General Knowledge", "cssClass": "cat-general" }],
		"currentPlayerIndex": 0,
		"currentCategory": { "key": "07", "queryTag": "music", "title": "Music", "cssClass": "cat-music" }
	}
}

const newProps3 = {
	"index": 3
	, "text": "Incorrect answer 3"
	, "status": "clickable"
	, "gameState": {
		"players": [{
			"name": "Pat"
			, "correctCategories": []
		}
			, {
			"name": "Chris"
			, "correctCategories": []
		}],
		"currentCategory": {
			"key": "05"
			, "queryTag": "sport_and_leisure"
			, "title": "Sport and Leisure"
			, "cssClass": "cat-sport"
		}
	}
}

const newProps = {
	"index": 3
	, "text": "Incorrect answer 3"
	, "status": "clickable"
	, "gameState": {
		"players": [{
			"name": "Pat"
			, "correctCategories": []
		}
			, {
			"name": "Chris"
			, "correctCategories": []
		}]
		, "currentPlayerIndex": 0
		, "currentPhase": {
			"key": "01"
			, "title": "Welcome"
			, "cssClass": "phase-welcome"
		}
		,
		"currentCategory": {
			"key": "05"
			, "queryTag": "sport_and_leisure"
			, "title": "Sport and Leisure"
			, "cssClass": "cat-sport"
		}
	}
	, "currentQuestion": {
		"questionText": "How many referees work a soccer game?"
		, "choices": ["Incorrect answer 1"
			, "Incorrect answer 2"
			, "Correct answer"
			, "Incorrect answer 3"]
		, "correctAnswer": "Correct answer"
		, "correctIndex": 2
		, "categoryTag": "sport_and_leisure"
	}
	, "categoryList": [{
		"key": "01"
		, "queryTag": "food_and_drink", "title": "Food and Drink", "cssClass": "cat-food"
	}, { "key": "05", "queryTag": "sport_and_leisure", "title": "Sport and Leisure", "cssClass": "cat-sport" }, { "key": "08", "queryTag": "science", "title": "Science", "cssClass": "cat-science" }, {
		"key": "04", "queryTag": "history", "title": "History"
		, "cssClass": "cat-history"
	}, { "key": "02", "queryTag": "geography", "title": "Geography", "cssClass": "cat-geography" }, { "key": "06", "queryTag": "movies", "title": "Film and TV", "cssClass": "cat-movies" }
		, { "key": "07", "queryTag": "music", "title": "Music", "cssClass": "cat-music" }, {
		"key": "03"
		, "queryTag": "general_knowledge"
		, "title": "General Knowledge"
		, "cssClass": "cat-general"
	}
	]
}


const example = [
	{
		"category": "History",
		"correctAnswer": "George VI",
		"id": 9669,
		"incorrectAnswers": [
			"Henry VIII",
			"James IV",
			"William II"
		],
		"question": "Who Was The Last King To Sit On The English Throne?",
		"type": "Multiple Choice"
	},
	{
		"category": "Art and Literature",
		"correctAnswer": "The Hunchback Of Natre Damme",
		"id": 11296,
		"incorrectAnswers": [
			"A Tale of Two Cities",
			"Les Miserables",
			"The Count of Monte Cristo"
		],
		"question": "Which famous book begins with the line \"On January 6, 1482, the people of Paris were awakened by the tumultuous clanging of all the bells in the city\"?",
		"type": "Multiple Choice"
	},
	{
		"category": "General Knowledge",
		"correctAnswer": "His System Of Wind Force Indicators",
		"id": 7804,
		"incorrectAnswers": [
			"Being the first person to circumnavigate the globe alone",
			"Discovering Hawaii",
			"Surviving adrift at sea for 2 weeks"
		],
		"question": "For what is the eighteenth and nineteenth century sailor Sir Francis Beaufort best remembered?",
		"type": "Multiple Choice"
	},
	{
		"category": "Science",
		"correctAnswer": "Appendix",
		"id": 1050,
		"incorrectAnswers": [
			"Bowel",
			"Spleen",
			"Pancreas"
		],
		"question": "Which fingerlike projection is attached to the large intestine?",
		"type": "Multiple Choice"
	},
	{
		"category": "Food and Drink",
		"correctAnswer": "Leek ",
		"id": 10667,
		"incorrectAnswers": [
			"Carrot",
			"Potato",
			"Onion"
		],
		"question": "Which vegetable is also a Welsh emblem?",
		"type": "Multiple Choice"
	}
]

const questionText = {
	"currentCategory": "Sport and Leisure",
	"currentQuestion": {
		"choices": [
			"Incorrect answer 3",
			"Correct answer"],
		"question": "At which sporting venue are the Grace Gates?",
		"correctIndex": 1,
		"correctAnswer": "Correct answer"
	}
}

const questionData = {
	"currentCategory": "Geography",
	"currentQuestion": {
		"choices": [
			"Incorrect answer 3",
			"Correct answer"
		],
		"question": "Which Is The Longest River In Britain?",
		"correctIndex": 1,
		"correctAnswer": "Correct answer"
	}
}

var props2 = {
	"index": 0,
	"text": "Correct answer",
	"gameState": {
		"players": "[{…}, {…}]",
		"currentPlayerIndex": 0,
		"currentCategory": "{cssClass: \"cat-general\", key: \"03\", queryTag: \"gen…}"
	},
	"currentQuestion": {
		"questionText": "What was the real name of Eric Morecambes partner?",
		"choices": "[\"Correct answer\", \"Incorrect answer 2\", \"Incorrect…]",
		"correctAnswer": "Correct answer",
		"correctIndex": 0,
		"categoryTag": "general_knowledge"
	}
}