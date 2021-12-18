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
    return rowIndex;
}
function createTable(div){
    let divToDo = document.createElement("div");
    let divDone = document.createElement("div");
    let divToDotable = document.createElement("div");
    let divDonetable = document.createElement("div");
    divToDo.setAttribute("id", "ToDo");
    divDone.setAttribute("id", "Done");
    divToDotable.setAttribute("class", "tableDiv");
    divDonetable.setAttribute("class", "tableDiv");

    let tableToDo = document.createElement("table");
    let tableDone = document.createElement("table");
    let theadToDo = document.createElement("thead");
    let theadDone = document.createElement("thead");
    let tbodyToDo = document.createElement("tbody");
    let tbodyDone = document.createElement("tbody");
    tbodyToDo.setAttribute("id", "ToDoBody");
    tbodyDone.setAttribute("id", "DoneBody");
    let backColor = getComputedStyle(divToDo).backgroundColor;
    console.log(backColor);
    let thToDo = [];
    let thDone = [];
    for(let i=0;i<5;i++){
            thToDo.push(document.createElement("th"));
            thDone.push(document.createElement("th"));
            switch(i){
                case 0:
                    thToDo[i].setAttribute("class", "empty");
                    thDone[i].setAttribute("class", "empty");
                    break;
                case 1:
                    thToDo[i].setAttribute("class", "endTime");
                    thDone[i].setAttribute("class", "endTime");
                    thToDo[i].innerHTML = "완료시간";
                    thDone[i].innerHTML = "완료시간";
                    break;
                case 2:
                    thToDo[i].setAttribute("class", "work");
                    thDone[i].setAttribute("class", "work");
                    thToDo[i].innerHTML = "해야 할 일";
                    thDone[i].innerHTML = "해야 할일";
                    break;
                case 3:
                    thToDo[i].setAttribute("class", "leftTime");
                    thDone[i].setAttribute("class", "leftTime");
                    thToDo[i].innerHTML = "남은 시간";
                    thDone[i].innerHTML = "남은 시간";
                    break;
                case 4:
                    thToDo[i].setAttribute("class", "empty");
                    thDone[i].setAttribute("class", "empty");
                    break;
            }
            theadToDo.appendChild(thToDo[i]);
            theadDone.appendChild(thDone[i]);
    }
    div.appendChild(divToDo);
    div.appendChild(divDone);
    divToDo.appendChild(divToDotable)
    divDone.appendChild(divDonetable)
    divToDotable.appendChild(tableToDo);
    divDonetable.appendChild(tableDone);
    tableToDo.appendChild(theadToDo);
    tableToDo.appendChild(tbodyToDo);
    tableDone.appendChild(theadDone);
    tableDone.appendChild(tbodyDone);
    

}
