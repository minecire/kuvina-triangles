var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var formula = document.getElementById("formula");
var moduloSlider = document.getElementById("modulo");
var scaleSlider = document.getElementById("scale");
var generateButton = document.getElementById("generate");
var initialOnes = document.getElementById("initOnes");

var currentLine = new Array(canvas.width);
var currentHeight = 0;
function generateLine(previousLine, formula, modulo)
{
    var newLine = new Array(previousLine.length);
    for(var i = 0; i < previousLine.length; i++){
        var a = previousLine[i-1];
        var b = previousLine[i];
        var c = previousLine[i+1];
        if(i == 0){a=previousLine[i];}
        if(i == previousLine.length-1){c=previousLine[i];}
        newLine[i] = parseFormula(formula, a, b, c, modulo);
    }
    return newLine;
}

function parseFormula(formula, a, b, c, modulo)
{
    return eval(formula) % modulo;
}

function draw()
{
    
    var scale = parseInt(scaleSlider.value)/100.0;
    var modulo = parseInt(moduloSlider.value);
    // canvas.width = window.innerWidth; //set game window size to browser window size
    // canvas.height = window.innerHeight;
    for(var i = 0; i < currentLine.length; i++)
    {
        ctx.fillStyle = valueToColor(currentLine[i], modulo);
        ctx.fillRect(i*scale, currentHeight*scale, scale, scale);
    }
    currentLine = generateLine(currentLine, formula.value, parseInt(modulo));
    currentHeight++;
}

function valueToColor(value, mod)
{
    if(value == 0){
        return "#000000";
    }
    else{
        var hue = value * 360.0 / (mod-1);
        var sat = 100;
        var val = 50;
        return "hsl("+hue+"deg "+sat+"% "+val+"%)";
    }
}


var loop;
function initiateDraw()
{
    var scale = parseInt(scaleSlider.value)/100.0;
    currentHeight = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    currentLine = new Array(Math.floor(canvas.width/scale));
    for(var i = 0; i < currentLine.length; i++)
    {
        currentLine[i] = 0;
    }
    for(var i = 0; i < parseInt(initialOnes.value); i++) {
        currentLine[Math.floor(currentLine.length/2-parseInt(initialOnes.value)/2)+i] = 1;
    }
    loop = setInterval(draw, 1000/600);
}

initiateDraw();