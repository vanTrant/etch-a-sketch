const divsContainer = document.querySelector(".divs-container");
let divColumn = [];
let divRow = [];

//Create 16x16 grid of square divs
createDivs(16, 16);
console.log(divColumn.length + " - " + divRow.length);

function createDivs(row, column) {
    for (let i = 0; i < column; i++) {
        const div = document.createElement("div");
        divColumn[i] = divsContainer.appendChild(div);
        div.classList.add("game");
        div.addEventListener("mouseover", addTrail);
        for (let j = 0; j < row; j++) {
            const div = document.createElement("div");
            divRow[i] = divsContainer.appendChild(div);
            div.classList.add("game");
            div.addEventListener("mouseover", addTrail);
        }
    }
}

function addTrail() {
    this.style.background = "black";
    console.log(this);
}
