const divsContainer = document.querySelector(".divs-container");
const btnColor = document.getElementById("btn-color");
const btnRainbow = document.getElementById("btn-rainbow");
const btnClear = document.getElementById("btn-clear");
const btnEraser = document.getElementById("btn-eraser");
const inputPen = document.getElementById("pen-color");
const inputBg = document.getElementById("bg-color");
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
btnEraser.addEventListener("click", toggleEraser);
inputBg.addEventListener("change", changeBgColor);
btnRainbow.addEventListener("click", toggleRainbow);

eye.forEach((e) => {
    e.addEventListener("click", isVisible);
});

function randomizer(max) {
    return Math.floor(Math.random() * max);
}

function changeBgColor() {
    let div = document.querySelectorAll(".game");
    for (let i = 0; i < div.length; i++) {
        if (div[i].className === "game active" || div[i].className === "game") {
            div[i].style.background = `${inputBg.value}`;
        }
    }
}

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
    eye.forEach((e) => {
        if (e.textContent === "visibility") {
            e.textContent = "visibility_off";
        }
    });
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
    if (btnRainbow.className === "active" && btnColor.className === "inactive") {
        this.style.background = `rgb(${randomizer(255)},${randomizer(255)},${randomizer(255)})`;
    } else {
        this.style.background = `${inputPen.value}`;
        this.classList.add("trail");
    }
}

function removeTrail() {
    this.style.background = `${inputBg.value}`;
    this.classList.remove("trail");
}

function clearSketch() {
    let div = document.querySelectorAll(".game");
    div.forEach((e) => {
        e.style.background = "white";
    });
}

function toggleEraser() {
    this.classList.toggle("active");
    let div = document.querySelectorAll(".game");
    div.forEach((e) => {
        if (btnEraser.className === "active") {
            e.removeEventListener("mouseover", addTrail);
            e.addEventListener("mouseover", removeTrail);
        } else e.addEventListener("mouseover", addTrail);
    });
}

function toggleRainbow() {
    this.classList.toggle("active");
    btnColor.classList.toggle("active");
    btnColor.classList.toggle("inactive");
    inputPen.classList.toggle("inactive");
}
