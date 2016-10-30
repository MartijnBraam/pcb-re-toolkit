var selectedComponent = null;

document.addEventListener("DOMContentLoaded", function () {
    var pcbs = document.querySelectorAll('.pcb');

    for (var i = 0; i < pcbs.length; i++) {
        pcbs[i].addEventListener("click", clickPcb);
    }
    bindChipEditor();
});

function clickPcb(event) {
    var component = getComponent(event);
    removeComponentSelections();

    if (component && drawMode == 'none') {
        selectedComponent = component;
        selectedComponent.classList.add('selected');
        updateEditor();
    }
}

function removeComponentSelections() {
    var components = document.querySelectorAll('.component');
    for (var i = 0; i < components.length; i++) {
        components[i].classList.remove('selected');
    }
}

function getComponent(event) {
    for (var i = 0; i < event.path.length; i++) {
        if (event.path[i].classList.contains('component')) {
            return event.path[i];
        }
    }
    return null;
}

function updateEditor() {
    var noComponentText = document.getElementById('no-component-selected');
    if (selectedComponent) {
        noComponentText.style.display = 'none';
    } else {
        noComponentText.style.display = 'block';
    }

    var type = selectedComponent.getAttribute('data-type');
    var editors = document.querySelectorAll('.editor');
    for (var i = 0; i < editors.length; i++) {
        editors[i].style.display = 'none';
    }
    var editor = document.getElementById('edit-' + type);
    editor.style.display = 'block';

    if (type == 'chip') {
        var inputName = document.getElementById('edit-chip-name');
        inputName.value = selectedComponent.getAttribute('data-name');
        var inputPins = document.getElementById('edit-chip-pins');
        inputPins.value = selectedComponent.getAttribute('data-pins');
        var inputPinSpacing = document.getElementById('edit-chip-pin-spacing');
        inputPinSpacing.value = selectedComponent.getAttribute('data-pin-spacing');
        var inputPinOffset = document.getElementById('edit-chip-pin-offset');
        inputPinOffset.value = selectedComponent.getAttribute('data-pin-offset');
        var directions = selectedComponent.getAttribute('data-directions');
        var inputDirectionTop = document.getElementById('edit-chip-pins-top');
        var inputDirectionBottom = document.getElementById('edit-chip-pins-bottom');
        var inputDirectionLeft = document.getElementById('edit-chip-pins-left');
        var inputDirectionRight = document.getElementById('edit-chip-pins-right');

        directions = directions.split('');

        inputDirectionTop.checked = directions.indexOf('t') > -1;
        inputDirectionBottom.checked = directions.indexOf('b') > -1;
        inputDirectionLeft.checked = directions.indexOf('l') > -1;
        inputDirectionRight.checked = directions.indexOf('r') > -1;
    }
}

function bindChipEditor() {
    var elements = ['edit-chip-name', 'edit-chip-pins', 'edit-chip-pin-spacing', 'edit-chip-pin-offset'];
    for (var i = 0; i < elements.length; i++) {
        var element = document.getElementById(elements[i]);
        element.addEventListener('change', function (event) {
            var setting = this.id.replace('edit-chip-', '');
            selectedComponent.setAttribute('data-' + setting, this.value);
            rebuildChip(selectedComponent);
        });
    }
}