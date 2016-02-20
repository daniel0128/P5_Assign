var table;
var values;
var names;
var visHeight;
var visWidth;
var blankX;
var blankY;


function preload() {
    table = loadTable("data/people_test.csv", "csv");
}

function setup() {
    var headers = table.getRow(0);
    table.removeRow(0);
    names = table.getColumn(0);
    table.removeColumn(0);
    values = table.getArray();
    createCanvas(windowWidth, windowHeight *.95);
    noStroke();
    //noLoop();
}

function draw() {
    background(255);
    visHeight = height*.9;
    visWidth = width*.9;
    blankY = (height-visHeight)/2;
    blankX = (width-visWidth)/2;
    stackedBarChart(values,names,visWidth,visHeight,blankX,visHeight+blankY);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight *.95);
    redraw();
}

function drawMouse(){
    fill(0,255,0);
    ellipse(mouseX,mouseY,3,3);
}