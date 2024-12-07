let canvas = document.querySelector("#canvas");
let innerCanvas;

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
    for (let i = 1; i <= size; i++) {
        let pixel = document.createElement("div");
        pixel.setAttribute("id", "pixel");
        pixel.style.boxSizing = "borderBox";
        pixel.style.border = "black solid 1px";
        pixel.addEventListener("mouseover", (event) => {
            pixel.style.backgroundColor = "black";
        });

        // Calculating the borders to remove
        if (i === 1) pixel.style.borderLeft = "none";
        if (i === size) pixel.style.borderRight = "none";
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

createGrid(8);

let slider = document.querySelector("#slider");

slider.addEventListener("input", (event) => {
    updateGrid(slider.value);
});