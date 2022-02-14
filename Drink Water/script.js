const totalVolume = 2000; // 2l of total water to be drunken
let currentVolume = 0;
let overflow = false;
const smallCups = document.querySelectorAll(".cup-small");
const liters = document.querySelector("#liters");
const percentage = document.querySelector("#percentage");
const remained = document.querySelector("#remained");
const banner = document.querySelector("#banner");
const add_250_btn = document.querySelector("#add-250");
const remove_250_btn = document.querySelector("#remove-250");
const add_500_btn = document.querySelector("#add-500");
const remove_500_btn = document.querySelector("#remove-500");
const add_1l_btn = document.querySelector("#add-1l");
const remove_1l_btn = document.querySelector("#remove-1l");
const add_btn_grp = [add_250_btn, add_500_btn, add_1l_btn];
const remove_btn_grp = [remove_250_btn, remove_500_btn, remove_1l_btn];

add_btn_grp.forEach((button) => {
	let btnValue = parseInt(button.previousElementSibling.innerText);
	button.addEventListener("click", () => addVolume(btnValue));
});

remove_btn_grp.forEach((button) => {
	let btnValue = parseInt(
		button.previousElementSibling.previousElementSibling.innerText
	);
	console.log(btnValue);
	button.addEventListener("click", (button) => reduceVolume(btnValue));
});

updateBigCup(currentVolume);

function addVolume(increment) {
	currentVolume += increment;
	console.log("Current volume", currentVolume);
	updateBigCup(currentVolume);
}

function reduceVolume(decrement) {
	currentVolume -= decrement;
	console.log("Current volume", currentVolume);
	updateBigCup(currentVolume);
}

function updateBanner() {
	console.log(percentage.style.height);
	if (percentage.style.height === "330px" && overflow) {
		console.log(overflow);
		banner.style.visibility = "visible";
		banner.innerText = `You have over achieved your drinking goal by ${
			(currentVolume - totalVolume) / 1000
		} L !`;
		add_btn_grp.forEach((button) => {
			button.disabled = true;
		});
	} else if (percentage.style.height === "330px") {
		banner.style.visibility = "visible";
		banner.innerText = "You have achieved your drinking goal for the day!!";
		add_btn_grp.forEach((button) => {
			button.disabled = true;
		});
	} else if (percentage.style.height === "0px") {
		banner.style.visibility = "visible";
		banner.innerText = "Your glass is empty! Please drink some water !!";
		remove_btn_grp.forEach((button) => {
			button.disabled = true;
		});
	} else {
		banner.style.visibility = "hidden";
		overflow = false;
		add_btn_grp.forEach((button) => {
			button.disabled = false;
		});
		remove_btn_grp.forEach((button) => {
			button.disabled = false;
		});
	}
}

function updateBigCup(currentVolume) {
	if (!currentVolume) {
		percentage.style.visibility = "hidden";
		percentage.style.height = 0;
		console.log(currentVolume);
		liters.innerText = `${2 - currentVolume / 1000} L`;
		console.log(currentVolume);
	} else if (currentVolume > totalVolume) {
		percentage.style.visibility = "visible";
		percentage.style.height = "330px";
		percentage.innerText = "100%";
		remained.style.visibility = "hidden";
		remained.style.height = 0;
		overflow = true;
	} else if (currentVolume < 0) {
		percentage.style.visibility = "hidden";
		percentage.style.height = 0;
		liters.innerText = "2 L";
	} else if (currentVolume === totalVolume) {
		percentage.style.visibility = "visible";
		percentage.style.height = "330px";
		percentage.innerText = "100%";
		remained.style.visibility = "hidden";
		remained.style.height = 0;
		overflow = false;
	} else {
		percentage.style.visibility = "visible";
		percentage.style.height = `${(currentVolume / totalVolume) * 330}px`;
		percentage.innerText = `${(currentVolume / totalVolume) * 100}%`;
		remained.style.visibility = "visible";
		remained.style.height = "12px";
		liters.innerText = `${2 - currentVolume / 1000} L`;
	}
	updateBanner();
}
