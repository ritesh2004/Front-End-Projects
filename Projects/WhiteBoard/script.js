// Get canvas element and set its dimensions to the size of the screen
var canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("color-picker");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");
const size = document.getElementById("size");
const tool = document.getElementById("tool");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Get 2D drawing context
const ctx = canvas.getContext("2d");

// Write welcome message at the center of the canvas
ctx.font = "5vw Arial";
ctx.textAlign = "center";
ctx.fillText(`Start drawing!`, canvas.width / 2, canvas.height / 2);

// Set line 
ctx.lineWidth = size.value;

// Size event listener
size.addEventListener("change", function () {
    ctx.lineWidth = this.value;
});

let currentTool = tool.value;
// Tool event listener
tool.addEventListener("change", function () {
    currentTool = this.value;
});
let lineStart = { x: 0, y: 0 };

// Set color
ctx.strokeStyle = colorPicker.value;

// undo feature
let undo = [];
let redo = [];


// Color picker event listener
colorPicker.addEventListener("change", function () {
    ctx.strokeStyle = this.value;
});
// Save button event listener
saveButton.addEventListener('click', (e) => {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
});

// Clear button event listener
clearButton.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Flag for drawing activity
var drawing = false;

// Last coordinates of mouse
var lastX;
var lastY;

// Set up mouse events
canvas.addEventListener("mousedown", function (e) {
    lastX = e.offsetX;
    lastY = e.offsetY;
    lineStart = { x: e.offsetX, y: e.offsetY };
    drawing = true;        
});
canvas.addEventListener("mouseup", function (ev) {
    drawing = false;
    if(currentTool == "line"){
        ctx.beginPath();
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(ev.offsetX, ev.offsetY)
        ctx.stroke();
    }
});
canvas.addEventListener("mousemove", function (e) {
    if (drawing) {
        switch (currentTool) {
            case "pen":
                // Draw a line from the last coordinates to the current ones
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                // Update last coordinates
                lastX = e.offsetX;
                lastY = e.offsetY;
                break;
            case "line":
                break
        }
    }
});
canvas.addEventListener('touchstart', function (e) {
    lastX = e.touches[0].pageX;
    lastY = e.touches[0].pageY;
    drawing = true;
});
canvas.addEventListener('touchend', function () {
    drawing = false;
});
canvas.addEventListener('touchmove', function (e) {
    if (drawing) {
        // Draw a line from the last coordinates to the current ones
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.touches[0].pageX, e.touches[0].pageY);
        ctx.stroke();

        // Update last coordinates
        lastX = e.touches[0].pageX;
        lastY = e.touches[0].pageY;
    }
});
