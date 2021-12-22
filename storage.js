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
            pushTokenToBox(list.boxName, list.endTime[i],list.content[i], list.color[i]);
        }
    }
    if(localStorage.getItem("DoneBody") != null){
        let list = JSON.parse(localStorage.getItem("DoneBody"));
        for(let i in list.content){
            // console.log(list.boxName+", "+ list.endTime[i]+", "+ list.content[i]+", "+ list.color[i])
            pushTokenToBox(list.boxName, list.endTime[i],list.content[i], list.color[i]);
        }
    }
}
//------------------------------------------------------------------------
function getTokenStringFromBox(boxName){
    let div = document.getElementById(boxName).parentNode.parentNode 
    // let backColor = getComputedStyle(div).backgroundColor;
    let box = {
        endTime: [],
        content: [],
        color: [],
        boxName: boxName,
    }
    let trArray = document.getElementById(boxName).children;
    for(let tr of trArray){
        let backColor = getComputedStyle(tr).backgroundColor;
        backColor = backColor.slice(5,backColor.length-1);
        backColor = backColor.split(", ");
        let color ="#";
        for(let i=0;i<3;i++){
            let code = parseInt(backColor[i]).toString(16);
            if(parseInt(backColor[i])<16){
                code +="0";
            }
            color += code;
        }
        box.color.push(color);
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
function pushTokenToBox(boxName, time, newWord, color){
    console.log(boxName);
    let tbody = document.getElementById(boxName);
    let newRow = tbody.insertRow(index(time, tbody));
    let backColor;
    if(boxName == "ToDoBody"){
        backColor = getComputedStyle(document.getElementById("ToDo")).backgroundColor;

    }
    else{
        console.log(boxName+", "+time+", "+newWord+", "+color);
        backColor = getComputedStyle(document.getElementById("Done")).backgroundColor;
    } 
        
    let input = document.createElement("input");    
    let button = document.createElement("button");
    newRow.style.backgroundColor = transColor(color, time);
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
    setInterval(function(){
        newRow.style.backgroundColor = transColor(color, time);
    },1000);
}
