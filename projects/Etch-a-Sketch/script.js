const center = document.querySelector(".center");
const input = document.querySelector(".slider");
const colorPicker = document.querySelector("#colorPicker");
let btnArr = Array.from(document.querySelectorAll("button"));

let pressed = null;
let gridSize = 16;

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

let removeDivs = number => {
    for (let i = 0; i < number; ++i) {
        center.removeChild(center.children[gridSize**2 - 1 - i]);
    }
} 

let addDivs = number => {
    for (let i = 0; i < number; ++i) {
        let cont = document.createElement("div");
        cont.classList.add("sketch");
        cont.addEventListener("mouseover", () => {
            if (!mouseDown) return;

            if (pressed == null)
                cont.style.backgroundColor = colorPicker.value;
            
            else if (pressed == 0) {
                let red = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);

                cont.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            } else if (pressed == 1) {
                cont.style.backgroundColor = "white";
            }
        });
        center.appendChild(cont);
    }
} 

let clear = () => {
    Array.from(center.children).forEach(item => {
        item.style.backgroundColor = "white";
    });
}

addDivs(16**2);

input.addEventListener("mousemove", () => {
    let temp = input.value;
    document.querySelector(".sliderText").innerText = `${temp} x ${temp}`;
});

input.addEventListener("change", () => {
    let temp = +input.value;
    
    if (temp < gridSize) {
        clear();
        removeDivs(gridSize**2 - temp**2);
        center.style.gridTemplateColumns = `repeat(${temp}, 1fr)`;
        center.style.gridTemplateRows = `repeat(${temp}, 1fr)`;
    } else if (temp > gridSize) {
        center.style.gridTemplateColumns = `repeat(${temp}, 1fr)`;
        center.style.gridTemplateRows = `repeat(${temp}, 1fr)`;
        addDivs(temp**2 - gridSize**2);
        clear();
    }

    gridSize = temp;
});

btnArr[0].addEventListener("click", () => {
    if (pressed == null) {
        btnArr[0].classList.add("pressed");
        pressed = 0;
    } else if (pressed == 0) {
        pressed = null;
        btnArr[0].classList.remove("pressed");
    } else {
        btnArr[1].classList.remove("pressed");
        btnArr[0].classList.add("pressed");
        pressed = 0;
    }
});

btnArr[1].addEventListener("click", () => {
    if (pressed == null) {
        btnArr[1].classList.add("pressed");
        pressed = 1;
    } else if (pressed == 1) {
        pressed = null;
        btnArr[1].classList.remove("pressed");
    } else {
        btnArr[0].classList.remove("pressed");
        btnArr[1].classList.add("pressed");
        pressed = 1;
    }
});

btnArr[2].addEventListener("click", clear);
