const darkModeButton = document.querySelector(".header__dark-mode");
const searchBar = document.querySelector(".header__search");
const h4 = document.querySelector(".main__h4");
const popup = document.querySelector(".main__popup");
const mainContent = document.querySelector(".main__content");

let dark = false;
const closeButton = document.querySelector(".main__x");

if (!sessionStorage.getItem("unactivated")) {
	sessionStorage.setItem("unactivated", "true");
}

window.addEventListener("load", function(e) {
	mainContent.style.transform = `translateY(0)`;
	mainContent.style.opacity = `1`;
})

function activateDarkMode(e) {
	if (!dark) {
		document.body.classList.add("dark-theme");
		dark=true;

		darkModeButton.textContent = "Light";

		document.documentElement.style.setProperty('--blackWhite', "white");
		document.documentElement.style.setProperty('--whiteBlack', "black");
		document.documentElement.style.setProperty('--gettingStartedButtonColor', "black");
		document.documentElement.style.setProperty('--grayWhite', "white");

		if (sessionStorage.getItem("unactivated") == "true") {
			console.log(sessionStorage.getItem("unactivated"));
			popup.classList.add("activated");
			sessionStorage.setItem("unactivated", "false");
		}

	} else {
		document.body.classList.remove("dark-theme");
		dark=false;

		darkModeButton.textContent = "Dark";

		document.documentElement.style.setProperty('--blackWhite', "black");
		document.documentElement.style.setProperty('--whiteBlack', "white");
		document.documentElement.style.setProperty('--gettingStartedButtonColor', "cornflowerblue")
		document.documentElement.style.setProperty('--grayWhite', "rgba(0,0,0,0.75)");
	}
}

function extendSearchBar(e) {
	searchBar.classList.add("extended");
}

function reduceSearchBar(e) {
	searchBar.classList.remove("extended");
}
function closePopup(e) {
	popup.classList.remove("activated");
}


darkModeButton.addEventListener("click", activateDarkMode);
searchBar.addEventListener("focus", extendSearchBar);
searchBar.addEventListener("blur", reduceSearchBar);
closeButton.addEventListener("click", closePopup, true);