const timeDisplay = document.querySelector(".main__time");
const inputForm = document.querySelector(".main__input");
const inputTitle = document.querySelector(".main__input-title");
const inputDescription = document.querySelector(".main__input-description");
const clearAllButton = document.querySelector(".main__todo-list-clear-all");
const todoList = document.querySelector(".main__todo-list");

class Time {
  static addZeroes(type) {
    return (type < 10) ? "0" + type : type;
  }

  setTime() {
    const d = new Date();

    let hours = d.getHours();

    hours = (hours == 0) ? 12 : hours;

    let dates = {
      seconds: d.getSeconds(),
      minutes: d.getMinutes(),
      hours,
    }

    timeDisplay.textContent = `${Time.addZeroes(dates.hours)}:${Time.addZeroes(dates.minutes)}:${Time.addZeroes(dates.seconds)} 
    `;
  }
}

function switchMode(e) {
  if (this.classList.contains("main__todo-li--unactivated")) {
    this.classList.remove("main__todo-li--unactivated");
    this.classList.add("main__todo-li--activated");
  } else {
    this.classList.remove("main__todo-li--activated");
    this.classList.add("main__todo-li--unactivated");
  }
}

function liFunctionality(element) {
  element.querySelector(".main__todo-li-delete").addEventListener("click", deleteLi);

  element.querySelector(".main__todo-li-delete").addEventListener("mouseover", function() {
    this.parentNode.parentNode.classList.remove("main__todo-li--not-hovered");
  });

  element.querySelector(".main__todo-li-delete").addEventListener("mouseout", function() {
    this.parentNode.parentNode.classList.add("main__todo-li--not-hovered");
  });

  element.addEventListener("click", switchMode);

  return element;
}


function createTodo(title, description) {
  let li = document.createElement("li");
  li.className = "main__todo-li main__todo-li--unactivated main__todo-li--not-hovered";

  li.innerHTML = `<div class="main__todo-li-text-container">
                    <a class="main__todo-li-title">
                      ${title}
                    </a>
                    <a class="main__todo-li-description">
                    ${description}
                    </a>
                  </div>
                  <div class="main__todo-li-controls-container">
                    <p class="main__todo-li-delete"><i class="fas fa-window-close"></i></p>
                  </div>`  

  li = liFunctionality(li);

  todoList.appendChild(li);

  inputTitle.value = "";
  inputDescription.value = "";
}

function getInputValues(e) {
  e.preventDefault();

  let title = inputTitle.value;
  let description = inputDescription.value;

  if (title && description) {
    createTodo(title, description);
  }
}

function deleteAllLi() {
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}

function deleteLi(e) {
  for(let i of todoList.querySelectorAll("li")) {
    if (this.parentNode.parentNode === i) {
      this.parentNode.parentNode.style.display="none";
      todoList.removeChild(this.parentNode.parentNode);
    }
  }
}

inputForm.addEventListener("submit", getInputValues);
clearAllButton.addEventListener("click", deleteAllLi);


let time = new Time();
time.setTime();
setInterval(time.setTime, 1000);