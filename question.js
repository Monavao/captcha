let captchaValues = [
	{
		question: 'Un plus trois', 
		codes: [97, 107, 99],
		answer: 'Quatre'
	},
	{
		question: 'Six multiplié par deux', 
		codes: [102, 111, 98],
		answer: 'Douze'
	},
	{
		question: 'Quatre multiplié par cinq', 
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

	const text = `Veuillez utiliser le pavé numérique pour taper cette opération:<br><br>
		<strong>${selectedQuestion.question}</strong> (échap pour nouvelle saisie)`;

	console.log(text);
	display(text, question);
}

function display(content, location)
{
	location.innerHTML = content;
}

window.addEventListener('keydown', handleKeyboardEvent);

txtResult.addEventListener('keydown', checkText);

function handleKeyboardEvent(event)
{
	console.log(event.keyCode);

	// Reset
	if(event.keyCode === 27)
	{
		pressedKeys = [];

		console.log('Saisie annulée');
		return;
	}

	// Press F5 or F12
	if(event.keyCode === 116 || event.keyCode === 123)
	{
		return;
	}

	pressedKeys.push(event.keyCode);

	if(pressedKeys.length === 3)
	{
		console.log('3 saisies : humain');
		isHuman = true;
		check();
	}
}

function check()
{
	const isGoodKey = compareArrays(pressedKeys, selectedQuestion.codes);
	//console.log(isGoodKey);
	if(isHuman && !isGoodKey)
	{
		display('Erreur de saisie ou de calcul - Appuyer sur F5 pour recommencer', result);
	}
	else if(isHuman && isGoodKey)
	{
		document.getElementById('answer').style.display = 'block';
		display('Correct! Maintenant veuillez saisir le résultat du calcul:', result)
	}
}

function compareArrays(a, b)
{
	for(let i = 0; i < a.length; i++)
	{
		if(a[i] !== b[i])
		{
			return false;
		}

		return true;
	}
}

function checkText(event)
{
	if(event.keyCode >= 65 && event.keyCode <= 90)
	{
		resultInLetters.push(event.key);
	}
	else if(event.keyCode === 8)
	{
		resultInLetters.splice(resultInLetters.length -1, 1);
		//console.log(resultInLetters);
	}
	else if(event.keyCode === 13)
	{
		if(resultInLetters.join('').toLowerCase() === selectedQuestion.answer.toLowerCase())
		{
			display('Validé !', result);
		}
	}
	else
	{
		display('Mauvaise réponse', result);
	}
}

selectQuestion();