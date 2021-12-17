function index(newTime, table){
    let row = table.children;
    let trData = [];
    let rowIndex = 0;
    let year =newTime.slice(0,2);
    let month =newTime.slice(3,5);
    let day =newTime.slice(6,8);
    let hour =newTime.slice(10,12);
    let minute =newTime.slice(13,15);
    newTime = new Date("20"+year,month-1,day,hour,minute);
    for(let tr of row){
        trData.push(tr.children[1].innerHTML);
    }
    for(let i=0; i<row.length; i++){
        year = trData[i].slice(0,2);
        month = trData[i].slice(3,5);
        day = trData[i].slice(6,8);
        hour = trData[i].slice(10,12);
        minute = trData[i].slice(13,15);
        let endTime = new Date("20"+year,month-1,day,hour,minute);
        if(endTime - newTime > 0){
            rowIndex = i;
            break;
        }
        else
            rowIndex = i+1;
    }
    console.log(rowIndex);
    return rowIndex;
}