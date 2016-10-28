var cursorTop;
var cursorBottom;
var pcbWidth;
var pcbHeight;

document.addEventListener("DOMContentLoaded", function () {

    var pcbs = document.querySelectorAll('section > .pcb');
    cursorTop = document.querySelector('#pcb-top-wrapper .cursor');
    cursorBottom = document.querySelector('#pcb-bottom-wrapper .cursor');
    pcbs[0].addEventListener("mousemove", updateCursorTop, false);
    pcbs[1].addEventListener("mousemove", updateCursorBottom, false);
});

function updateCursorTop(event) {
    var pcb = event.currentTarget.getBoundingClientRect();
    var x = event.pageX - pcb.left;
    var y = event.pageY - pcb.top;

    cursorTop.style.top = y + "px";
    cursorTop.style.left = x + "px";

    cursorBottom.style.top = y + "px";
    cursorBottom.style.left = (pcbWidth - x) + "px";
}

function updateCursorBottom(event) {
    var pcb = event.currentTarget.getBoundingClientRect();
    var x = event.pageX - pcb.left;
    var y = event.pageY - pcb.top;

    cursorBottom.style.top = y + "px";
    cursorBottom.style.left = x + "px";

    cursorTop.style.top = y + "px";
    cursorTop.style.left = (pcbWidth - x) + "px";
}