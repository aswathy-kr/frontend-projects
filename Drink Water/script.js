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
const current_vol_change = 0;
const add_btn_grp = [add_250_btn, add_500_btn, add_1l_btn];
const remove_btn_grp = [remove_250_btn, remove_500_btn, remove_1l_btn];

add_btn_grp.forEach((button) => {
	button.addEventListener("click", () => addVolume());
});

remove_btn_grp.forEach((button) => {
	button.addEventListener("click", () => reduceVolume());
});

updateBigCup();

function addVolume() {
	if (percentage.style.height === "330px") {
		banner.style.visibility = "visible";
		banner.innerText =
			"You have achieved your drinking goal! You can't add more!!";
		add_btn_grp.forEach((button) => {
			button.disabled = true;
			console.log(button);
		});
	} else {
	}
}

function reduceVolume() {
	if (percentage.style.height == 0) {
		banner.style.visibility = "visible";
		banner.innerText = "Your glass is empty! Please drink some water!!";
		remove_btn_grp.forEach((button) => {
			button.disabled = true;
			console.log(button);
		});
	}
}

// smallCups.forEach((cup, idx) => {
// 	cup.addEventListener("click", () => highlightCups(idx));
// 	console.log(cup.name);
// });

// function highlightCups(idx) {
// 	if (
// 		smallCups[idx].classList.contains("full") &&
// 		!smallCups[idx].nextElementSibling.classList.contains("full")
// 	) {
// 		idx--;
// 		console.log("reduced", idx);
// 	}

// 	smallCups.forEach((cup, idx2) => {
// 		console.log(idx2, idx);
// 		if (idx2 <= idx) {
// 			cup.classList.add("full");
// 		} else {
// 			cup.classList.remove("full");
// 		}
// 	});

// 	updateBigCup();
// }

function updateBigCup() {
	if (current_vol_change === 0) {
		percentage.style.visibility = "hidden";
		percentage.style.height = "10px";
	} else {
		percentage.style.visibility = "visible";
		//percentage.style.height = `${(fullCups / totalCups) * 330}px`;
		//percentage.innerText = `${(fullCups / totalCups) * 100}%`;
	}
}

// function updateBigCup() {
// 	const fullCups = document.querySelectorAll(".cup-small.full").length;
// 	const totalCups = smallCups.length;

// 	if (fullCups === 0) {
// 		percentage.style.visibility = "hidden";
// 		percentage.style.height = 0;
// 	} else {
// 		percentage.style.visibility = "visible";
// 		percentage.style.height = `${(fullCups / totalCups) * 330}px`;
// 		percentage.innerText = `${(fullCups / totalCups) * 100}%`;
// 	}

// 	if (fullCups === totalCups) {
// 		remained.style.visibility = "hidden";
// 		remained.style.height = 0;
// 	} else {
// 		remained.style.visibility = "visible";
// 		liters.innerText = `${2 - (250 * fullCups) / 1000}`;
// 	}
// }
