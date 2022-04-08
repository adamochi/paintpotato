const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
// WHEN DO YOU START PUTTING STUFF IN VARIABLES LIKE THIS?^^ DOING LIKE THIS WHEN I HAVE TO REPEAT IT, TO AVOID MISTAKES ETC.

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStlye = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
        //  ctx.closePath();
    }
}

 function handleColorClick(event) {
     const color = event.target.style.backgroundColor;
     ctx.strokeStyle = color;
     ctx.fillStlye = color;
 }

 function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
 }
 function handleModeClick(event) {
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
 }

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(potato => potato.addEventListener("click", handleColorClick)
);

if(range) {
    range.addEventListener("input", handleRangeChange);
} // the way he found out it is input^^, is by making many mistakes. google it!

if(mode){
    mode.addEventListener("click", handleModeClick);
}