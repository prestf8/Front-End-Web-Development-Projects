const profileGetter = document.querySelector(".main__search-submit");
const input = document.querySelector(".main__search");
const switchLightingButton = document.querySelector(".header__switchLighting");
const logo = document.querySelector(".main__logo");
const header = document.querySelector(".header");
const user = document.querySelector(".main__profile");
const error = document.querySelector(".main__displayError");
let dark = false;

const clientId = "31addaff84ef3993768e";
const clientSecret = "d98ceb9fc9afb2f4886acbee7fdf878278fc5aab";

async function getProfile(user) {
	let rawData = await fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`)

	let convertedData = await rawData.json()

	return {
		"username": convertedData.login,
		"name": convertedData.name,
		"profilePicture": convertedData.avatar_url,
		"url": convertedData.url,
		"company": convertedData.company,
		"location": convertedData.location,
		"numberOfPublicRepos": convertedData.public_repos,
		"numberOfFollowers": convertedData.followers,
		"numberOfFollowing": convertedData.following
	}
}

async function displayUser(e) {
	e.preventDefault();
	let data = await getProfile(input.value);

	for(const [key, value] of Object.entries(data)) {
		if (!value) {
			data[key] = "Not specified";
		}
	}
	
	if(data.username != "Not specified") {
		error.style.display = "none";
		user.style.display = "block";


		user.innerHTML = `
		<section class="profile">
			<div class="profile__pfp-container">
				<img class="profile__pfp" src=${data.profilePicture} />
			</div>
			<div class="profile__content">
				<h2 class="profile__username">
					${data.username}
				</h2>
				<p class="profile__name">${data.name}</p>
				<p class="profile__location">
					<span class="bold">Location: 
					</span>
					${data.location}
				</p>
				<p class="profile__company">
					<span class="bold">Company: 
					</span>
					${data.company}
				</p>
				<p class="profile__repositories">
					<span class="bold">Public Repositories Count: 
					</span>
					${data.numberOfPublicRepos}
				</p>
				<p class="profile__followers">
					<span class="bold">Followers: 
					</span>
					${data.numberOfFollowers}
				</p>
				<p class="profile__following">
					<span class="bold">Following: 
					</span>
					${data.numberOfFollowing}
				</p>
			</div>
		</section>
		`
	} else {
		error.style.display = "block";
		user.style.display = "none";
	}
}

function switchLighting() {
	if (dark) {
		logo.src = "../images/github-logo.png";
		document.documentElement.style.setProperty("--whiteDark", "white");
		document.documentElement.style.setProperty("--darkWhite", "black");
		dark = !dark;
		switchLightingButton.textContent = "Dark";
	} else {
		logo.src = "../images/github-logo-white.png";
		document.documentElement.style.setProperty("--whiteDark", "black");
		document.documentElement.style.setProperty("--darkWhite", "white");
		dark = !dark;
		switchLightingButton.textContent = "Light";
	}
}

profileGetter.addEventListener("click", displayUser);
switchLightingButton.addEventListener("click", switchLighting)
