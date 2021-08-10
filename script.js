const divsContainer = document.querySelector(".divs-container");
const btnClear = document.getElementById("btn-clear");
const inputSquare = document.getElementById("input-square");
const totalSquare = document.querySelector(".total-square");
const eye = document.querySelectorAll(".eye");

btnClear.addEventListener("click", clearSketch);
totalSquare.textContent = `${inputSquare.value}x${inputSquare.value}`;
inputSquare.addEventListener("change", updateHandler);
inputSquare.addEventListener("mousemove", () => {
    totalSquare.textContent = `${inputSquare.value}x${inputSquare.value}`;
});
inputSquare.addEventListener("mouseup", clearSketch);
window.addEventListener("load", updateHandler);

eye.forEach((e) => {
    e.addEventListener("click", isVisible);
});

function isVisible() {
    let div = document.querySelectorAll(".game");
    if (this.textContent === "visibility") {
        this.textContent = "visibility_off";
    } else {
        this.textContent = "visibility";
    }
    div.forEach((e) => {
        e.classList.toggle("active");
    });
}

function updateHandler() {
    removeDivs();
    createDivs(inputSquare.value);
    divsContainer.style.gridTemplateRows = `repeat(${inputSquare.value}, 1fr)`;
    divsContainer.style.gridTemplateColumns = `repeat(${inputSquare.value}, 1fr)`;
}

function createDivs(number) {
    for (let i = 0; i < number; i++) {
        const div = document.createElement("div");
        let divColumn = [];
        divColumn[i] = divsContainer.appendChild(div);
        div.classList.add("game");
        div.addEventListener("mouseover", addTrail);
        for (let j = 1; j < number; j++) {
            const div = document.createElement("div");
            let divRow = [];
            divRow[i] = divsContainer.appendChild(div);
            div.classList.add("game");
            div.addEventListener("mouseover", addTrail);
        }
    }
}

function removeDivs() {
    let div = document.querySelectorAll(".game");
    div.forEach((e) => {
        divsContainer.removeChild(e);
    });
}

function addTrail() {
    this.style.background = "black";
}

function clearSketch() {
    let div = document.querySelectorAll(".game");
    div.forEach((e) => {
        e.style.background = "white";
    });
}
