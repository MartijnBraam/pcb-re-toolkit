function rebuildChip(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    var chipRect = element.getBoundingClientRect();

    var labelElement = document.createElement('div');
    labelElement.classList.add('label');
    labelElement.style.lineHeight = chipRect.height + "px";
    labelElement.innerHTML = element.getAttribute('data-name');
    element.appendChild(labelElement);

    var directions = element.getAttribute('data-directions');
    var pinCount = parseInt(element.getAttribute('data-pins'), 10);
    var pinSides = directions.length;
    var pinsPerSide = Math.floor(pinCount / pinSides);

    var pinSpacing = parseInt(element.getAttribute('data-pin-spacing'), 10);
    var pinOffset = parseInt(element.getAttribute('data-pin-offset'), 10);


    var sides = ['t', 'b', 'l', 'r'];
    for (var i = 0; i < sides.length; i++) {
        if (directions.indexOf(sides[i]) > -1) {
            for (var pinIndex = 0; pinIndex < pinsPerSide; pinIndex++) {
                var pinElement = document.createElement('div');
                pinElement.classList.add('pin');
                pinElement.classList.add('pin-' + sides[i]);

                if (sides[i] == 'l' || sides[i] == 'r') {
                    pinElement.style.top = (pinOffset + (pinSpacing * pinIndex)) + "px";
                }

                element.appendChild(pinElement);
            }
        }
    }
}