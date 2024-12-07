let canvas = document.querySelector("#canvas");
let innerCanvas;
let color = 'rgba(0, 0, 0, 0.33)';

let red = 'rgba(255, 0, 0, 0.33)';
let yellow = 'rgba(255, 255, 0, 0.33)';
let blue = 'rgba(0, 0, 255, 0.33)';
let black = 'rgba(0, 0, 0, 0.33)'; 

function createGrid(size) {
    innerCanvas = document.createElement("div");
    innerCanvas.setAttribute("style", "display: flex; flex-direction: column; width: 100%; height: 100%");
    canvas.appendChild(innerCanvas);

    for (let i = 1; i <= size; i++) {
        let row = createRow(size, i);
        innerCanvas.appendChild(row);
    }
}

function createRow(size, rowIndex) {
    let row = document.createElement("span");
    row.style.display = "flex";
    row.style.flex = "1 1 auto";
    for (let i = 1; i <= size * 1.5; i++) {
        let pixel = document.createElement("div");
        pixel.setAttribute("id", "pixel");
        pixel.style.boxSizing = "borderBox";
        pixel.style.border = "black solid 1px";
        pixel.addEventListener("mouseover", (event) => {
            if (!checkForRainbow())
            {
                let shadedColor = checkShading(pixel.style.backgroundColor, color);
                if (shadedColor != null) {
                    color = shadedColor;
                }
                else {
                    let selectedColor = document.querySelector('input[name="color"]:checked').value;
                    switch(selectedColor) {
                        case "black":
                            color = black;
                            break;
                        case "red":
                            color = red;
                            break;
                        case "yellow":
                            color = yellow;
                            break;
                        case "blue":
                            color = blue;
                            break;
                        default: 
                            break;
                    }
                }
            }
            pixel.style.backgroundColor = color;
        });

        // Calculating the borders to remove
        if (i === 1) pixel.style.borderLeft = "none";
        if (i === size * 1.5) pixel.style.borderRight = "none";
        if (rowIndex === 1) pixel.style.borderTop = "none";
        if (rowIndex === size) pixel.style.borderBottom = "none";

        pixel.style.flex = "1 1 auto";
        row.appendChild(pixel);
    }
    return row;
}

function updateGrid(size) {
    canvas.removeChild(innerCanvas);
    createGrid(size);
}

createGrid(16);

let slider = document.querySelector("#slider");

slider.addEventListener("input", (event) => {
    updateGrid(slider.value);
});

let colors = document.querySelector("#colors");

colors.addEventListener("input", (event) => {
    let selectedColor = document.querySelector('input[name="color"]:checked').value;
    switch(selectedColor) {
        case "black":
            color = black;
            break;
        case "red":
            color = red;
            break;
        case "yellow":
            color = yellow;
            break;
        case "blue":
            color = blue;
            break;
        default: 
            break;
    }
});

let clear = document.querySelector("#clear");

clear.addEventListener("click", (event) => {
    updateGrid(slider.value);
});

function checkForRainbow() {
    if (document.querySelector('input[name="color"]:checked').value === "rainbow") {
        color = returnRandomColor();
        return true;
    }
    else return false;
}

function returnRandomColor() {
    let randomNumber = Math.floor(Math.random() * 361);
    return randomColor = `hsl(${randomNumber}, 100%, 50%, 100%)`;
}

function checkShading(currentColor, changeColor) {
    let alpha = currentColor.slice(-5, -1)
    let currentColorWithoutAlpha = currentColor.slice(0, -7);
    let changeColorWithoutAlpha = changeColor.slice(0, -7);
    let colorType = currentColor.slice(0, 4); // rgb( if rainbow and rgba if colors

    if (currentColorWithoutAlpha === changeColorWithoutAlpha) {
        switch (alpha) {
            case "0.33":
                return `${changeColorWithoutAlpha}, 0.66)`;
            case "0.66":
                return `${changeColorWithoutAlpha}, 0.99)`;
            case "0.99":
                return `${changeColorWithoutAlpha}, 0.99)`;
            default:
                return null;
        }
    }
    else {
        return null;
    }
}