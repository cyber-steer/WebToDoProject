//------------------------------------------------------------------------
//로컬스토리지 저장
function storageSave(){
    localStorage.setItem("ToDoBody",getTokenStringFromBox("ToDoBody"));
    localStorage.setItem("DoneBody",getTokenStringFromBox("DoneBody"));
    console.log("save");
}
//------------------------------------------------------------------------
//로컬스토리지 불러오기
function restoreTokenList(){
    if(localStorage.getItem("ToDoBody") != null){
        let list = JSON.parse(localStorage.getItem("ToDoBody"));
        for(let i in list.content){
            pushTokenToBox(list.boxName, list.endTime[i],list.content, list.color);
        }
    }
}
//------------------------------------------------------------------------
function pushTokenToBox(boxName, time, newWord, backColor){
    console.log(boxName);
    console.log(time);
    console.log(newWord);
    console.log(backColor);
    let tbody = document.getElementById(boxName);
    let newRow = tbody.insertRow(index(time, tbody));
    let input = document.createElement("input");    
    let button = document.createElement("button");
    newRow.style.backgroundColor = color;
    button.innerHTML = "X";
    input.setAttribute("type", "checkbox");
    $(button).addClass("delete");
    $(button).click(deletClickHandler);
    $(input).click(checkboxClickHandler);
    for(let i=0; i<5;i++){
        let cell = newRow.insertCell(i)
        switch(i){
            case 0:
                cell.appendChild(input)
                cell.style.backgroundColor = backColor;
                $(cell).addClass("empty textCenter");
                break;
            case 1:
                cell.innerHTML = time;
                $(cell).addClass("endTime");
                break;
            case 2:
                cell.innerHTML = newWord;
                $(cell).addClass("work textCenter");
                break;
            case 3:
                cell.innerHTML = leftTime(time);
                $(cell).addClass("leftTime textCenter");
                setInterval(function(){
                    cell.innerHTML = leftTime(time);
                },1000)
                break;
            case 4:
                cell.appendChild(button);
                cell.style.backgroundColor = backColor;
                $(cell).addClass("empty textCenter");
                break;
        }
    }
    storageSave();
}
function getTokenStringFromBox(boxName){
    let div = document.getElementById(boxName).parentNode.parentNode 
    let backColor = getComputedStyle(div).backgroundColor;
    let box = {
        endTime: [],
        content: [],
        color: backColor,
        boxName: boxName
    }
    let trArray = document.getElementById(boxName).children;
    let array = [];
    for(let tr of trArray){
        for(let i=0;i<2;i++){
            switch(i){
                case 0:
                    box.endTime.push(tr.children[1].innerHTML);
                    break;
                case 1:
                    box.content.push(tr.children[2].innerHTML);
                    break;
            }
        }
    }
    return JSON.stringify(box);
}