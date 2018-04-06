let captchaValues = [
	{
		question: 'Un plus trois', 
		codes: [97, 107, 99],
		answer: 'Quatre'
	},
	{
		question: 'Six divisé par deux', 
		codes: [102, 111, 98],
		answer: 'Trois'
	},
	{
		question: 'Quatre multiplié par 5', 
		codes: [100, 106, 101],
		answer: 'Vingt'
	}
];

let question = document.querySelector('#question');
let answer = document.querySelector('#answer');
let txtResult = document.querySelector('#txtResult');
let result = document.querySelector('#result');
let availableQuestions = captchaValues.length;
let selectedQuestion = null;
let isHuman = false;
let pressedKeys = [];
let resultInLetters = [];

function selectQuestion()
{
	const index = Math.floor(Math.random() * availableQuestions);
	selectedQuestion = captchaValues[index];

	const text = `Veuillez utiliser le pavé numérique 
		<strong>${selectedQuestion.question}</strong>(échap pour nouvelle saisie)`;

	console.log(text);
}