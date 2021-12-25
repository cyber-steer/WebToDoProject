//------------------------------------------------------------------------
//DIV정보 저장하기
function storageSave(){
    let id = document.getElementById("user").innerHTML;
    localStorage.setItem(id,getTokenStringFromUser());
}
//------------------------------------------------------------------------
//DIV정보 불러오기
function restoreTokenList(){
    let id = document.getElementById("user").innerHTML;
    let user = JSON.parse(localStorage.getItem(id));
    if(user != null){
        let toDO = JSON.parse(user.ToDo)
        let done = JSON.parse(user.Done)
        for(let i in toDO.content){
            pushTokenToBox(toDO.boxName, toDO.endTime[i],toDO.content[i], toDO.color[i]);
        }
        for(let i in done.content){
            pushTokenToBox(done.boxName, done.endTime[i],done.content[i], done.color[i],true);
        }
    }
}
//------------------------------------------------------------------------
//유저 목록 저장하기
function storageUserListSave(id, pw){
    localStorage.setItem("account",getTokenStringFromAccount(id,pw));
}
//------------------------------------------------------------------------
//유저 목록 불러오기
function restoreUserList(){
    let account = JSON.parse(localStorage.getItem("account"));
    return account;
}
//------------------------------------------------------------------------
//저장할 DIV
function getTokenStringFromBox(boxName){
        let box = {
            endTime: [],
            content: [],
            color: [],
            boxName: boxName,
        }
        let trArray = document.getElementById(boxName).children;
        for(let tr of trArray){
            color = convertColor(getComputedStyle(tr).backgroundColor);
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
//------------------------------------------------------------------------
//유저 목록 저장할 리스트
function getTokenStringFromAccount(id,pw){
    let account;
    if(localStorage.getItem("account") == null){
        console.log("haven't user")
        account = {
            nickName : [],
            id: [],
            pw: []
        }
    }
    else{
        account =  JSON.parse(localStorage.getItem("account"));
    }
    if(!(userSelect(id))){
        account.nickName.push(id);
        account.id.push(id);
        account.pw.push(pw);
    }
    return JSON.stringify(account);
}
//------------------------------------------------------------------------
//유저 정보 저장할 정보
function getTokenStringFromUser(){
    let user = {
        ToDo: getTokenStringFromBox("ToDoBody"),
        Done: getTokenStringFromBox("DoneBody")
    }
    return JSON.stringify(user);
}

//------------------------------------------------------------------------
//출력할 DIV 정보
function pushTokenToBox(boxName, time, newWord, color, check=false){
        let tbody = document.getElementById(boxName);
        let newRow = tbody.insertRow(index(time, tbody));
        let backColor;
        if(boxName == "ToDoBody"){
            backColor = getComputedStyle(document.getElementById("ToDo")).backgroundColor;
    
        }
        else{
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
                    cell.children[0].checked = check;
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
        // setInterval(function(){
        //     newRow.style.backgroundColor = transColor(color, time);
        // },1000);
    }