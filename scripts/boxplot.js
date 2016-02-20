var table;
var values;
var visHeight;
var visWidth;
var blankX;
var blankY;

function preload() {
    table = loadTable("data/a1_a2.csv", "csv");
}

function setup() {
    values = [];
    var headers = table.getRow(0);
    table.removeRow(0);
    var temp = table.getArray();

    for (i=0;i<temp[0].length;i++){
        values[i]=[];
        for(j=0;j<temp.length;j++){
            values[i][j]=parseFloat( temp[j][i]);
        }
    }
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
    //barChart(values[1],visWidth,visHeight,blankX,visHeight+blankY);
    //console.log(width,height);
    //console.log("hello",visWidth,visHeight,width/2,visHeight+blankY);
    boxPlot(values,visWidth,visHeight,width/2,visHeight+blankY);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight *.95);
    redraw();
}

function drawMouse(){
    fill(0,255,0);
    ellipse(mouseX,mouseY,3,3);
}