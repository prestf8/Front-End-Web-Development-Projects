let text = {

	background_urls: ["background-1.jpg", "background-2.jpg", "background-3.jpg", "background-4.jpg", "background-5.jpg", "background-6.jpg", "background-7.jpg", "background-8.png"],

	quotes: [
		"All sufferings come from false pride.",
		"An unjust law is no law at all.",
		"The more a man judges, the less he loves.",
		"Love is the most dangerous thing in the world.",
		"Silent gratitude isn\'t much use to anyone.",
		"The only true wisdom is knowing that you know nothing.",
		"The mind is the reality. You are what you think.",
		"An empty man is full of himself.",
		"It costs nothing to dream, but everything if you don\'t.",
		"The brighter stars emerge out of the blackest darkness.",
		"Many argue; not many converse."
	]
};

const clock = document.querySelector(".main__time");
const name = document.querySelector(".main__name")
const focus_question = document.querySelector('.main__focus-question');
const focus = document.querySelector('.main__focus');
const quote = document.querySelector('.main__quote');
const right_arrow = document.querySelector('.right_arrow--forward');
const left_arrow = document.querySelector('.right_arrow--backward');
const body = document.querySelector('body');
const todoButton = document.querySelector(".right__todo-button");
const checklist = document.querySelector(".right__checklist");
const checklistContent = document.querySelector(".right__checklist-content");
const newTodo = document.querySelector(".right__checklist-new-todo");
const numberOfTodoHeader = document.querySelector(".right__checklist-title");

let backgroundImageOrder = 0;
let quoteOrder = 0;
let checklistOn = false;
let numberOfTodo = 0;

function addZeros(unit) {
	if (unit < 10) {
		return "0"+unit;
	}
	return unit;
}

function getTime() {
	let time = new Date();

	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();

	let timeDisplay = `${hours}:${addZeros(minutes)}:${addZeros(seconds)}`;

	clock.textContent = timeDisplay;

	setInterval(getTime, 1000);
}

function getLocalData() {

	if (localStorage.getItem("name") == null) {
		name.textContent = "Insert Name";
	} else {
		name.textContent = localStorage.getItem("name");
	}

	if (localStorage.getItem("focus") == null) {
		focus.textContent = "Insert Focus";
	} else {
		focus.textContent = localStorage.getItem("focus");
	}
}

function setLocalData(e) {

	let selected = e.target.className == "main__name" ? "name" : "focus";

	if(e.type == 'blur') {
		localStorage.setItem(selected, e.target.textContent);
	}
	
	if (e.type == "keypress") {
		if (e.which == 13) {
			localStorage.setItem(selected, e.target.textContent);
			(selected == "name") ? name.blur() : focus.blur();
		}
	}
}

function changeBackground() {
	body.style.backgroundImage = `url(../images/${text.background_urls[backgroundImageOrder]})`;
	// console.log(`url(../images/${text.background_urls[backgroundImageOrder]})`);
}

function rightArrowNavigation(e) {

	if (e.target.classList[1] == "right_arrow--backward" || e.target.classList[1] == "fa-angle-right") {
		backgroundImageOrder++;
	} else {
		backgroundImageOrder--;
	}

	if (backgroundImageOrder >= text.background_urls.length) {
		backgroundImageOrder = 0;
	} else if (backgroundImageOrder < 0) {
		backgroundImageOrder = text.background_urls.length-1;
	}

	changeBackground()
}

function changeQuote() {
	quoteOrder++;

	if (quoteOrder >= text.quotes.length) {
		quoteOrder = 0;
	}

	quote.textContent = text.quotes[quoteOrder]; 
	
	setTimeout(changeQuote, 20000);

}


function checklistSwitch() {
	if (checklistOn) {
		checklist.style.display = "none";
		todoButton.style.backgroundColor = 	"transparent";

		checklistOn = false;
	} else {
		checklist.style.display = "block";
		todoButton.style.backgroundColor = 	"rgba(0,0,0,0.6)";

		checklistOn = true;
	}
}

function setTodo(e) {
	if(e.which==13) {
		if(e.target.value != "") {
			let newDiv = document.createElement("div");
			let targetValue = document.createTextNode(e.target.value);
			let checkBox = document.createElement("INPUT");
			checkBox.setAttribute("type", "checkbox");
			checkBox.style.marginRight = "5px";			
			newDiv.appendChild(checkBox);
			newDiv.appendChild(targetValue);

			(window.innerWidth < 1366) ? newDiv.style.fontSize = "1.4rem" : newDiv.style.fontSize = "1.7rem";
			newDiv.style.fontFamily = "Lato";
			checklistContent.appendChild(newDiv);
			e.target.value = "";
			numberOfTodo++;			
			numberOfTodoHeader.textContent = `${numberOfTodo} THINGS TO DO`;
		}
	}
}

name.addEventListener('keypress', setLocalData)
name.addEventListener('blur', setLocalData)
focus.addEventListener('keypress', setLocalData)
focus.addEventListener('blur', setLocalData)
right_arrow.addEventListener('click', rightArrowNavigation)
left_arrow.addEventListener('click', rightArrowNavigation)
todoButton.addEventListener('click', checklistSwitch)
newTodo.addEventListener("keypress", setTodo)


getTime();
getLocalData();
changeQuote();




