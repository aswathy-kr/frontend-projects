let jokeBox = document.getElementById("joke");
let poweredBy = document.getElementById("powered-by");
let jokeBtn = document.getElementById("jokeBtn");
jokeBtn.addEventListener("click", generateJoke);

generateJoke();

function generateJoke() {
	const config = {
		headers: {
			Accept: "application/json",
		},
	};

	let resObj = { joke: "", poweredBy: "" };

	const dadJoke = new Promise((resolve, reject) => {
		setTimeout(() => {
			axios
				.get("https://icanhazdadjoke.com/", config)
				.then((res) => res.data)
				.then((data) => {
					resObj.joke = data.joke;
					resObj.poweredBy = "ICanHazDadJokes.com";
					resolve(resObj);
				})
				.catch((err) => reject(err));
		}, 0);
	});

	const icndbJoke = new Promise((resolve, reject) => {
		setTimeout(() => {
			axios
				.get("https://api.icndb.com/jokes/random")
				.then((res) => res.data)
				.then((data) => {
					resObj.joke = data.value.joke;
					resObj.poweredBy = "The Internet Chuck Norris Database Jokes";
					resolve(resObj);
				})
				.catch((err) => reject(err));
		}, 0);
	});

	const finalJoke = Promise.any([dadJoke, icndbJoke]);
	finalJoke
		.then((res) => {
			console.log(res);
			jokeBox.innerHTML = res.joke;
			poweredBy.innerHTML = `Powered by ${res.poweredBy}`;
		})
		.catch((err) => console.error(err));
}
