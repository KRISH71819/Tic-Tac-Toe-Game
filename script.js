let boxes = document.querySelectorAll(".box");
let newgame = document.querySelector(".newgame");
let curr = document.querySelector(".curr-player");
let his = document.querySelectorAll(".win");
let reset = document.querySelector(".reset");

let turn = true;
let [a, b, c] = [-1, -1, -1];
const winpat = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let winner = () => {
  for (let i = 0; i < winpat.length; i++) {
    if (
      boxes[winpat[i][0]].innerText === boxes[winpat[i][1]].innerText &&
      boxes[winpat[i][1]].innerText === boxes[winpat[i][2]].innerText &&
      boxes[winpat[i][0]].innerText !== ""
    ) {
      [a, b, c] = [winpat[i][0], winpat[i][1], winpat[i][2]];
      return boxes[winpat[i][0]].innerText;
    }
  }
  return null;
};

let count = 0;
let drawbox = "";
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText != "") return;
    if (turn) {
      box.innerText = "O";
      box.style.color = "#ff26a5";
      curr.innerText = "Player 'X's Turn";
      curr.style.color = "#00ffd5";
    } else {
      box.innerText = "X";
      box.style.color = "#00ffd5";
      curr.innerText = "Player 'O's Turn";
      curr.style.color = "#ff26a5";
    }

    box.classList.add("pop");
    setTimeout(() => box.classList.remove("pop"), 250);

    let win = winner();
    if (win) {
      curr.innerText = `Player '${win}' Wins! 🎉`;
      curr.style.color = "#ffff00";

      boxes[a].style.backgroundColor = "#ffff00";
      boxes[b].style.backgroundColor = "#ffff00";
      boxes[c].style.backgroundColor = "#ffff00";

      if (boxes[a].innerText === "X") {
        his[0].innerText = parseInt(his[0].innerText) + 1;
      } else if (boxes[a].innerText === "O") {
        his[2].innerText = parseInt(his[2].innerText) + 1;
      }

      boxes.forEach((box) => (box.disabled = true));
    }
    if (!win) count++;
    drawbox = turn ? "X" : "O";
    if (count === 9 && !win) {
      his[1].innerText = parseInt(his[1].innerText) + 1;
      curr.innerText = "Match Draw 😐";
      curr.style.color = "#ffff00";
      drawbox = box.innerText;
    }
    turn = !turn;
  });
});

newgame.addEventListener("click", () => {
  for (let i = 0; i < 9; i++) {
    boxes[i].innerText = "";
  }
  if (a != -1) {
    boxes[a].style.backgroundColor = "";
    boxes[b].style.backgroundColor = "";
    boxes[c].style.backgroundColor = "";

    if (boxes[a].innerText === "X") {
      curr.innerText = "Player 'O's Turn";
      curr.style.color = "#ff26a5";
    } else {
      curr.innerText = "Player 'X's Turn";
      curr.style.color = "#00ffd5";
    }

  } else if (count === 9) {
    if (drawbox === "X") {
      curr.innerText = "Player 'O's Turn";
      curr.style.color = "#ff26a5";
    } else if (drawbox === "O") {
      curr.innerText = "Player 'X's Turn";
      curr.style.color = "#00ffd5";
    }
  }
  boxes.forEach((box) => (box.disabled = false));
  count = 0;
  [a, b, c] = [-1, -1, -1];
});

reset.addEventListener("click", () => {
  his[0].innerText = "0";
  his[1].innerText = "0";
  his[2].innerText = "0";
});
