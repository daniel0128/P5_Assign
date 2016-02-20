var table;
var values;
var visHeight;
var visWidth;
var blankX;
var blankY;

function preload() {
    table = loadTable("data/People1D.csv", "csv");
}

function setup() {
    values = new Array();
    var headers = table.getRow(0);
    table.removeRow(0);
    console.log("headers: "+headers);
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
    barChart(values[1],values[0],visWidth,visHeight,blankX,visHeight+blankY);
    //background(244,248,252);
    //line(mouseX,0,mouseX,100);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight *.95);
    redraw();
}
