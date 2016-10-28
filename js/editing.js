document.addEventListener("DOMContentLoaded", function () {
    var selectors = document.querySelectorAll('section > .selector input');

    for (var i = 0; i < selectors.length; i++) {
        selectors[i].addEventListener("change", fileUpload, false);
    }
});

function fileUpload(e) {
    var reader = new FileReader();
    var canvas = document.getElementById(this.getAttribute('data-target'));
    var ctx = canvas.getContext('2d');
    var wrapper = document.getElementById(this.getAttribute('data-target') + '-wrapper');
    this.parentNode.style.display = 'none';
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            wrapper.style.width = img.width + 'px';
            wrapper.style.height = img.height + 'px';
            pcbWidth = img.width;
            pcbHeight = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);

}