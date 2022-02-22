let jokeBox = document.getElementById("joke");
let jokeBtn = document.getElementById("jokeBtn");
jokeBtn.addEventListener("click", generateJoke);

generateJoke();

function generateJoke() {
	const config = {
		headers: {
			Accept: "application/json",
		},
	};
	axios
		.get("https://icanhazdadjoke.com/", config)
		.then((res) => res.data)
		.then((data) => {
			console.log(data.joke);
			jokeBox.innerHTML = data.joke;
		})
		.catch((err) => console.error(err));
	//jokeBtn.classList.add("active");
}
