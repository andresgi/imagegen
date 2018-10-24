var node = document.getElementById('txtTest');
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.beginPath();
context.rect(0, 0, canvas.width, canvas.height);
context.lineWidth = "1.5";
context.strokeStyle = "black";
context.fillStyle = 'white';
context.fill();
context.stroke();
context.fillStyle = '#282828';
var cw = canvas.width;
var ch = canvas.height;

var maxWidth = 350;
var lineHeight = 30;
var x = 60;
var y = 100;
var text = node.innerHTML;

context.font = '29px Arial';

var height = wrapTextVCentered(context, text, x, y, maxWidth, lineHeight, true);

var y = (canvas.height - height) / 2;

wrapTextVCentered(context, text, x, y, maxWidth, lineHeight, false);

var img = canvas.toDataURL("image/png");
document.write('<img id="quote" src="' + img + '"/>');
canvas.style.display = "none";

function wrapTextVCentered(context, text, x, y, maxWidth, lineHeight, measureOnly) {
    var height = 0;
    var convtext = text.replace(/\n/g, ' |br| ');
    var words = convtext.split(' ');
    var line = '';

    context.textBaseline = 'top';

    for (var n = 0; n < words.length; n++) {
        var newline = false;
        if (words[n].indexOf("|br|") > -1) newline = true;

        var metrics = maxWidth;
        var testWidth = maxWidth;
        var testLine = line + words[n] + ' ';

        if (context.measureText) {
            metrics = context.measureText(testLine);
            testWidth = metrics.width;
        }

        if ((testWidth > maxWidth && n > 0) || newline) {
            if (!measureOnly) { context.fillText(line, x, y); }
            if (!newline) line = words[n] + ' ';
            if (newline) line = "";
            y += lineHeight;
            height += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (!measureOnly) { context.fillText(line, x, y); }

    height += lineHeight;
    return (height);
}