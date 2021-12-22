//------------------------------------------------------------------------
//테이블 인덱스 반환
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
//------------------------------------------------------------------------
//행 추가
function appendRow(time, newWord, color){
    pushTokenToBox("ToDoBody",time, newWord, color);
    storageSave();
    // let tbody = document.getElementById("ToDoBody");
    // let newRow = tbody.insertRow(index(time, tbody));
    // let backColor = getComputedStyle(document.getElementById("ToDo")).backgroundColor;
    // let input = document.createElement("input");    
    // let button = document.createElement("button");

    // newRow.style.backgroundColor = transColor(color, time);
    // button.innerHTML = "X";
    // input.setAttribute("type", "checkbox");
    // $(button).addClass("delete");
    // $(button).click(deletClickHandler);
    // $(input).click(checkboxClickHandler);
    // for(let i=0; i<5;i++){
    //     let cell = newRow.insertCell(i)
    //     switch(i){
    //         case 0:
    //             cell.appendChild(input)
    //             cell.style.backgroundColor = backColor;
    //             $(cell).addClass("empty ")
    //             break;
    //         case 1:
    //             cell.innerHTML = time;
    //             $(cell).addClass("endTime textCenter")
    //             break;
    //         case 2:
    //             cell.innerHTML = newWord;
    //             $(cell).addClass("work textCenter")
    //             break;
    //         case 3:
    //             cell.innerHTML = leftTime(time);
    //             setInterval(function(){
    //                 cell.innerHTML = leftTime(time);
    //             },1000);
    //             $(cell).addClass("leftTime textCenter")
    //             break;
    //         case 4:
    //             cell.appendChild(button);
    //             cell.style.backgroundColor = backColor;
    //             $(cell).addClass("empty textCenter")
    //             break;
    //     }
    // }
    // setInterval(function(){
    //     newRow.style.backgroundColor = transColor(color, time);
    // },1000);
    // storageSave();

}
//------------------------------------------------------------------------
//행삭제 핸들러
function deletClickHandler(){
    let parentId = this.parentNode.parentNode.parentNode.getAttribute('id');
    let rowIndex = this.parentNode.parentNode.rowIndex;
    if(parentId == "ToDoBody")
        document.getElementById("ToDoBody").deleteRow(rowIndex-1);
    else
        document.getElementById("DoneBody").deleteRow(rowIndex-1);
        storageSave();
}
//------------------------------------------------------------------------
//체크박스 클릭 핸들러
function checkboxClickHandler(){
    let parentID = this.parentNode.parentNode.parentNode;
    let trArray;
    let backColor;
    let tr = this.parentNode.parentNode;
    let time = tr.children[1].innerHTML;
    if(parentID.getAttribute('id') == "ToDoBody"){
        parentID = document.getElementById("DoneBody");
        trArray = parentID.children;
        backColor = getComputedStyle(document.getElementById("Done")).backgroundColor;
    }
    else{
        parentID = document.getElementById("ToDoBody");
        trArray = parentID.children;
        backColor = getComputedStyle(document.getElementById("ToDo")).backgroundColor;
    }
    parentID.insertBefore(tr, trArray[index(time, parentID)]);
    let parentTd =  this.parentNode;
    parentTd.style.backgroundColor = backColor;
    let button = parentTd.parentNode.lastChild;
    button.style.backgroundColor = backColor;   
    storageSave();
}
//------------------------------------------------------------------------
//테이블 생성
function createTable(div){
    div.innerHTML = "";
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
                    thToDo[i].innerHTML = "마감시간";
                    thDone[i].innerHTML = "마감시간";
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
function transColor(color, time){
    let newTime = convertTime(time);
    let nowTime = new Date();
    let difference = newTime-nowTime;
    let trans = 0;

    difference = newTime-nowTime;
    if(parseInt(parseInt(difference/1000/60)/60/24/365)==0){ //년
        if(parseInt(parseInt(difference/1000/60/60/24)/30)==0){ //달
            if(parseInt(difference/1000/60/60/24)==0){ //일
                if(parseInt(difference/1000/60/60)==0){ //시
                    if(parseInt(difference/1000/60)==0){ //분
                        trans = 255-2*parseInt(difference/1000);
                    }
                    else{
                        trans = 136 - parseInt(difference/1000/60);
                    }
                }
                else{
                    trans = 77 -parseInt(difference/1000/60/60);
                }
            }
            else{
                trans = 54 -parseInt(difference/1000/60/60/24);
            }
        }
        else{
            trans = 24 - 2*parseInt(parseInt(difference/1000/60/60/24)/30);
        }
    }
    else{
        trans = 0;
    }
    if(difference <=0) trans = 255;
    trans = trans.toString(16);
    return color + trans;
}