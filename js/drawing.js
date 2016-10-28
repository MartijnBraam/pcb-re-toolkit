var drawMode = 'none';
var mouseDown = false;
var currentObject = null;
var drawButtons = [];
document.addEventListener("DOMContentLoaded", function () {
    drawButtons = document.querySelectorAll('.draw-button');
    var addChipButton = document.getElementById('add-chip');

    for (var i = 0; i < drawButtons.length; i++) {
        drawButtons[i].addEventListener('click', function (event) {
            if (this.classList.contains('active')) {
                drawMode = 'none';
                disableAllDraws();
            } else {
                disableAllDraws();
                this.classList.add('active');
                drawMode = this.getAttribute('data-type');
            }
        });
    }

    var pcbs = document.querySelectorAll('.pcb');
    console.log(pcbs);
    for (i = 0; i < pcbs.length; i++) {
        pcbs[i].addEventListener("mousedown", drawMouseDown);
        pcbs[i].addEventListener("mouseup", drawMouseUp);
        pcbs[i].addEventListener("mousemove", drawMouseMove, false);
    }

    console.log(pcbs);
    for (i = 0; i < pcbs.length; i++) {
        pcbs[i].addEventListener("mousedown", drawMouseDown);
        pcbs[i].addEventListener("mouseup", drawMouseUp);
        pcbs[i].addEventListener("mousemove", drawMouseMove, false);
    }
});

function disableAllDraws() {
    for (var i = 0; i < drawButtons.length; i++) {
        drawButtons[i].classList.remove('active');
    }
}

function drawMouseDown(event) {
    if (drawMode != 'none') {
        mouseDown = true;

        var pcbRect = event.currentTarget.getBoundingClientRect();
        var x = event.pageX - pcbRect.left;
        var y = event.pageY - pcbRect.top;


        currentObject = document.createElement('div');
        currentObject.classList.add('creating');
        currentObject.classList.add('component');
        currentObject.classList.add('type-' + drawMode);
        currentObject.setAttribute('data-type', drawMode);

        currentObject.style.top = y + "px";
        currentObject.style.left = x + "px";
        currentObject.style.width = 0;
        currentObject.style.height = 0;

        var pcb = getPCB(event.path);
        var drawingLayer = document.getElementById('components-' + pcb);
        drawingLayer.appendChild(currentObject);
    }
}

function drawMouseUp(event) {
    if (drawMode != 'none') {
        mouseDown = false;
        currentObject.classList.remove('creating');

        var type = currentObject.getAttribute('data-type');
        if (type == 'chip') {
            for (var cornerId = 0; cornerId < 4; cornerId++) {
                var corner = document.createElement('div');
                corner.classList.add('corner');
                if (cornerId == 0) {
                    corner.classList.add('active');
                }
                currentObject.appendChild(corner);
            }
        }
    }
}

function drawMouseMove(event) {
    if (mouseDown && drawMode != 'none') {
        var objectRect = currentObject.getBoundingClientRect();
        var x = event.pageX;
        var y = event.pageY;

        var width = x - objectRect.left;
        var height = y - objectRect.top;
        currentObject.style.width = width + "px";
        currentObject.style.height = height + "px";
    }
}

function getPCB(path) {
    for (var i = 0; i < path.length; i++) {
        if (path[i].nodeName == 'SECTION') {
            return path[i].id;
        }
    }
}