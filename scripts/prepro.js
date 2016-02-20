function getMaxAndMin(data){
    var result = [data[0],data[0]];
    for (i=1;i<data.length;i++){
        if(data[i]>result[0])
            result[0]=data[i];
        if(data[i]<result[1])
            result[1] = data[i];
    }
    return result;
}
function sortNumber(a,b)
{
    return a - b
}

function summaryData(data){
    var result = [];
    data.sort(sortNumber);
    var dataNum = data.length;
    var min = parseFloat( data[0] );
    var q_1 = parseFloat( data[parseInt((parseFloat(dataNum)+1) *.25)] );
    var q_2 = parseFloat( data[parseInt((parseFloat(dataNum)+1) *.5)] );
    var q_3 = parseFloat( data[parseInt((parseFloat(dataNum)+1) *.75)] );
    var max = parseFloat( data[dataNum-1] );
    var qr = parseFloat(q_3)-parseFloat(q_1);
    result[0] = min;
    result[1] = q_1;
    result[2] = q_2;
    result[3] = q_3;
    result[4] = max;
    result[5] = qr;
    return result;
}
