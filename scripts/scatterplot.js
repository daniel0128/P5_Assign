var table;
var values;
var visHeight;
var visWidth;
var blankX;
var blankY;

function preload() {
    table = loadTable("data/people_2D.csv", "csv");
}
function setup() {
    values = new Array();
    var headers = table.getRow(0);
    table.removeRow(0);
    //console.log("headers: "+headers);
    for(i=0;i<table.getColumnCount();i++){
        values[i] = table.getColumn(i);
    }
    createCanvas(windowWidth, windowHeight *.95);
    noStroke();
    //noLoop();  // Run once and stop
}
function draw() {
    background(255);
    visHeight = height*.9;
    visWidth = width*.9;
    blankY = (height-visHeight)/2;
    blankX = (width-visWidth)/2;
    scatterPlot(values[1],values[2],visWidth,visHeight,blankX,visHeight+blankY);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight *.95);
    redraw();
}