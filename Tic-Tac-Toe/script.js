let origBoard;
let huPlayer = "O";
let aiPlayer = "X";
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[6, 4, 2],
	[2, 5, 8],
	[1, 4, 7],
	[0, 3, 6],
];

const cells = document.querySelectorAll(".cell");
//document.querySelector("#yes").addEventListener("click", yes);
startGame();

function selectSym(sym) {
	huPlayer = sym;
	aiPlayer = sym === "O" ? "X" : "O";
	origBoard = Array.from(Array(9).keys());
	// for (let i = 0; i < cells.length; i++) {
	// 	cells[i].addEventListener("click", turnClick, false);
	// }
	// if (aiPlayer === "X") {
	// 	turn(bestSpot(), aiPlayer);
	// }
	document.querySelector(".selectSym").style.display = "none";
	document.querySelector("#initiator").style.display = "block";
}

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	document.querySelector("#text").innerText = "";
	document.querySelector(".selectSym").style.display = "block";
	document.querySelector("#initiator").style.display = "none";

	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.removeProperty("background-color");
		cells[i].style.removeProperty("color");
	}
}

function no() {
	document.querySelector("#initiator").style.display = "none";
	document.querySelector("#replay-btn").style.display = "none";
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", turnClick, false);
	}
	if (aiPlayer === "X" || aiPlayer === "O") {
		turn(bestSpot(), aiPlayer);
	}
}

function yes() {
	document.querySelector("#initiator").style.display = "none";
	document.querySelector("#replay-btn").style.display = "none";
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", turnClick, false);
	}
	// if (huPlayer === "X" || huPlayer === "O") {
	// 	console.log("target id " + square.target.id);
	// 	turn(square.target.id, huPlayer);
	// }
}

function turnClick(square) {
	console.log("Before if");
	//cells[square.target.id].removeEventListener("click", turnClick, false);
	if (typeof origBoard[square.target.id] === "number") {
		console.log("I entered here", square.target.id);
		document.getElementById(square.target.id).style.color = "yellow";
		turn(square.target.id, huPlayer);
		if (!checkWin(origBoard, huPlayer) && !checkTie())
			turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerHTML = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
	checkTie();
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every((elem) => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player === huPlayer ? "blue" : "#c7271f";
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("click", turnClick, false);
	}
	declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");
	//document.querySelector("#replay-btn").style.display = "block";
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector("#text").innerText = who;
	document.querySelector("#replay-btn").style.display = "block";
}

function emptySquares() {
	return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length === 0) {
		for (let cell of cells) {
			cell.style.backgroundColor = "green";
			cell.removeEventListener("click", turnClick, false);
		}
		declareWinner("Tie game");
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, huPlayer)) {
		return { score: -10 };
	} else if (checkWin(newBoard, aiPlayer)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}

	var moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player === aiPlayer) move.score = minimax(newBoard, huPlayer).score;
		else move.score = minimax(newBoard, aiPlayer).score;
		newBoard[availSpots[i]] = move.index;
		if (
			(player === aiPlayer && move.score === 10) ||
			(player === huPlayer && move.score === -10)
		)
			return move;
		else moves.push(move);
	}

	let bestMove, bestScore;
	if (player === aiPlayer) {
		bestScore = -1000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		bestScore = 1000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
