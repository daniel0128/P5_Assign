function barChart(data,names,len, high, chartX,chartY){
    var dataNum = data.length;
    var max_min = getMaxAndMin(data);
    var max = max_min[0],min = max_min[1];
    var threshold = Math.ceil(max);
    var distance = len/dataNum;
    stroke(0);
    for(i=0;i<dataNum;i++) {
        if(mouseX>1+i*distance+chartX&&mouseX<1+i*distance+chartX+distance-2
            && mouseY<chartY && mouseY>chartY-data[i]/threshold*high){
            textSize(12);
            text(data[i],chartX+1+i*distance+(distance-2)/2,chartY-data[i]/threshold*high-5);
            fill(0,255,0);
        }else{
            fill(0,0,255);
        }
        rect(1 + i * distance + chartX, chartY, distance - 2, - data[i]  / threshold * high);
    }
    graphAxisX(names,true,false,chartX,chartY,len);
    graphAxisY(data,false,false,chartX,chartY,high);
}

function lineGraph(data,names,len,high,chartX,chartY){
    var dataNum = data.length;
    var max_min = getMaxAndMin(data);
    var max = max_min[0],min = max_min[1];
    var threshold = Math.ceil(max);
    var distance = len/dataNum;
    stroke(0);
    graphAxisX(names,true,false,chartX,chartY,len);
    graphAxisY(data,false,false,chartX,chartY,high);
    for(i=0;i<dataNum-1;i++){
        line(chartX+1+i*distance+(distance-2)/2,chartY-data[i]/threshold*high,
            chartX+1+(i+1)*distance+(distance-2)/2,chartY-data[i+1]/threshold*high);
    }
}

function scatterPlot(columnX,columnY,len,high,chartX,chartY){
    var dataNum = columnX.length;
    var max_minX = getMaxAndMin(columnX);
    var max_minY = getMaxAndMin(columnY);
    var maxX = max_minX[0], minX = max_minX[1];
    var maxY = max_minY[0], minY = max_minY[1];
    var thresholdX = Math.ceil(maxX-minX);
    var thresholdY = Math.ceil(maxY-minY);
    var r;
    stroke(0);
    graphAxisX(columnX,false,true,chartX,chartY,len);
    graphAxisY(columnY,false,true,chartX,chartY,high);
    for(i = 0; i<dataNum;i++){
        if(mouseX>chartX+(columnX[i]-minX)*len/thresholdX-4 && mouseX<chartX+(columnX[i]-minX)*len/thresholdX+4 &&
            mouseY>chartY-(columnY[i]-minY)*high/thresholdY-4 && mouseY<chartY-(columnY[i]-minY)*high/thresholdY+4){
            fill(0);
            textSize(12);
            text("("+columnX[i]+","+columnY[i]+")",mouseX-4,mouseY-4);
            stroke(0);
            fill(0,255,0);
            r= 10;
        }else{
            stroke(0,0,255);
            fill(0,0,255);
            r=4;
        }
        ellipse(chartX+(columnX[i]-minX)*len/thresholdX,chartY-(columnY[i]-minY)*high/thresholdY,r,r);
    }
}

function stackedBarChart(data,names,len,high,chartX,chartY){
    var rowCount = data.length;
    var columnCount = data[0].length;
    var sumArray= [];
    for(i=0;i<rowCount;i++){
        sumArray[i]=0;
        for(j=0;j<columnCount;j++){
            sumArray[i]+= parseFloat(data[i][j]);
        }
    }
    var max_min = getMaxAndMin(sumArray);
    var max = max_min[0],min = max_min[1];
    var threshold = Math.ceil(max);
    var distance = len/rowCount;
    stroke(0);
    for(i=0;i<rowCount;i++){
        if(mouseX>1+i*distance+chartX&&mouseX<1+i*distance+chartX+distance-2
            && mouseY<chartY && mouseY>chartY-data[i][0]/threshold*high){
            textSize(12);
            text(data[i][0],chartX+1+i*distance+(distance-2)/2,chartY-sumArray[i]/threshold*high-5);
            fill(0,255,0);
        }else{
            fill(0,0,255);
        }
        rect(1 + i * distance + chartX, chartY, distance - 2, - data[i][0]  / threshold * high);
        for(j=1;j<columnCount;j++){
            if(mouseX>1+i*distance+chartX&&mouseX<1+i*distance+chartX+distance-2
                && mouseY<chartY-data[i][j-1]/threshold*high && mouseY>chartY-(parseFloat(data[i][j])+parseFloat(data[i][j-1]))/threshold*high){
                textSize(12);
                text(data[i][j],chartX+1+i*distance+(distance-2)/2,chartY-sumArray[i]/threshold*high-5);
                fill(0,255,0);
            }else{
                fill(0,0,255);
            }
            rect(1 + i * distance + chartX,chartY-data[i][j-1]/threshold*high,distance-2,-data[i][j]/threshold*high);
        }
    }
    graphAxisX(names,true,false,chartX,chartY,len);
    graphAxisY(sumArray,false,false,chartX,chartY,high);
}

function boxPlot(data,len,high,chartX,chartY){
    var rowCount = data.length;
    //var columnCount = data[0].length;
    var boxW = len/10;
    var boxWidth = boxW*rowCount;
    var qWidth = boxW*.8;
    var extreWidth = qWidth/2;
    var qBlankX = boxW*.1;
    var axisH = high*.8;
    var qBlankY = high*.1;
    var startX = chartX-boxWidth/2;
    var summarys=[];
    var minimums=[];
    var maxs=[];

    for(i=0;i<rowCount;i++){
        summarys[i]=summaryData(data[i]);
        minimums[i] = summarys[i][0];
        maxs[i] = summarys[i][4];
    }

    var minThre = Math.floor(getMaxAndMin(minimums)[1]);
    var maxThre = Math.ceil(getMaxAndMin(maxs)[0]);
    var thres = maxThre-minThre;

    stroke(0);
    rect(startX,chartY,boxWidth,-high);
    for(i=0;i<rowCount;i++){
        line(startX+i*boxW+boxW/2-extreWidth/2,
            chartY-qBlankY-( parseFloat(summarys[i][4]) - minThre )/thres*axisH,
            startX+i*boxW+boxW/2+extreWidth/2,
            chartY-qBlankY-( parseFloat(summarys[i][4]) - minThre )/thres*axisH);//max

        line(startX+i*boxW+boxW/2-extreWidth/2,
            chartY-qBlankY-( parseFloat(summarys[i][0])-minThre)/thres*axisH,
            startX+i*boxW+boxW/2+extreWidth/2,
            chartY-qBlankY-( parseFloat(summarys[i][0])-minThre)/thres*axisH);//min

        line(startX+i*boxW+boxW/2,
            chartY-qBlankY-( parseFloat(summarys[i][0])-minThre)/thres*axisH,
            startX+i*boxW+boxW/2,
            chartY-qBlankY-( parseFloat(summarys[i][4]) - minThre )/thres*axisH);//vertical
        rect(startX+qBlankX+boxW*i,
            chartY-qBlankY-( parseFloat(summarys[i][1])-minThre )/thres*axisH,
            qWidth,
            -(summarys[i][5])/thres*axisH);//iqr
        line(startX+qBlankX+boxW*i,
            chartY-qBlankY-( parseFloat(summarys[i][2])-minThre )/thres*axisH,
            startX+qBlankX+boxW*i+qWidth,
            chartY-qBlankY-( parseFloat(summarys[i][2])-minThre )/thres*axisH);//median
        //text("("+mouseX+","+mouseY+")",mouseX,mouseY);
    }
}

function graphAxisX(data,catagorized,standard,beginX,beginY,len){
    var dataNum = data.length;
    var distance;
    line(beginX,beginY,beginX+len,beginY);
    if(catagorized){
        distance = len/dataNum;
        for(i=0;i<dataNum;i++){
            line(beginX+1+i*distance+(distance-2)/2,beginY,
                beginX+1+i*distance+(distance-2)/2,beginY+1);
            textSize(12);
            textAlign(CENTER);
            fill(0);
            text(data[i],beginX+1+i*distance+(distance-2)/2,beginY+15);
        }
    }else{
        distance = len/5;
        var maxi = getMaxAndMin(data)[0];
        var mini = getMaxAndMin(data)[1];
        var thresholdX = maxi-mini;
        for(i=0;i<5;i++){
            line(beginX+i*distance,beginY,beginX+i*distance,beginY+2);
            textSize(12);
            textAlign(CENTER);
            fill(0);
            if(standard){
                text(parseFloat(mini)+i*thresholdX/5,beginX+i*distance,beginY+15);
            }else {
                text(i*maxi/5,beginX+i*distance,beginY+15);
            }
        }
    }
}

function graphAxisY(data,catagorized,standard,beginX,beginY,high){
    var dataNum = data.length;
    var distance;
    line(beginX,beginY,beginX,beginY-high);
    if(catagorized){
        //todo:tag
        distance = high/dataNum;
        for(i=0;i<dataNum;i++){
            line(beginX,beginY+1+i*distance+(distance-2)/2,
                beginX-1,beginY-1-i*distance+(distance-2)/2);
            textSize(12);
            textAlign(CENTER,CENTER);
            fill(0);
            text(data[i],beginX-20,beginY+1+i*distance+(distance-2)/2);

        }
    }else{
        var maxi = getMaxAndMin(data)[0];
        var mini = getMaxAndMin(data)[1];
        var thresholdY = maxi-mini;
        distance = high/5;
        for(i=0;i<5;i++){
            line(beginX,beginY-i*distance,beginX-2,beginY-i*distance);
            textSize(12);
            textAlign(CENTER,CENTER);
            fill(0);
            if(standard){
                text(parseFloat(mini)+i*thresholdY/5,beginX-20,beginY-i*distance);
            } else{
                text(i*maxi/5,beginX-20,beginY-i*distance);
            }
        }
    }
}