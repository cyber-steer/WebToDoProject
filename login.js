//------------------------------------------------------------------------
//로그인 버튼 클릭 핸들러
function loginClickHandler(){
    let id = document.getElementById("id").value;
    let pw = document.getElementById("pw").value;
    let account = restoreUserList();
    if(id =="" || pw ==""){
        alert("아이디와 비밀번호를 전부 입력해주세요")
        return;
    }
    if(this.innerHTML == "로그인"){
        if(userSelect(id)){
            for(let password of account.pw){
                if(password == pw){
                    alert("로그인되었습니다");
                    document.getElementById("user").innerHTML = id;
                    createTable(document.getElementById("output"));
                    restoreTokenList();
                    storageUserListSave(id,pw);
                    document.getElementById("id").value="";
                    document.getElementById("pw").value="";
                    return;
                }
            }
            alert("비밀번호가 틀립니다");
            document.getElementById("pw").value="";
            return;
        }
        else{
            document.getElementById("id").value="";
            document.getElementById("pw").value="";
            alert("등록된 아이디가 아닙니다");
        } 
    }
    else{//회원가입
        if(userSelect(id)){
            alert("등록된 아이디 입니다")
        }
        else{
            storageUserListSave(id,pw);
            spanClickHandler();
            alert("회원가입이 완료되었습니다")
        }
        document.getElementById("id").value="";
        document.getElementById("pw").value="";

    }
}
//------------------------------------------------------------------------
//로그인 버튼에 마우스를 올릴때
function loginOverHandler(){
    this.style.backgroundColor = "lightgray";
}
//------------------------------------------------------------------------
//로그인 버튼에서 마우스가 사라질때
function loginOutHandler(){
    this.style.backgroundColor = "white";
}
//------------------------------------------------------------------------
//회원가입 버튼 클릭 핸들러
function singupClickHander(){
    let div = document.getElementById
}
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//아이디 검색
function userSelect(id){
    let account = restoreUserList();
    if(account == null) return false;
    for(let user of account.id){
        if(user == id) return true;
    }
    return false;
}
//------------------------------------------------------------------------
//로그인 창 만들기
function spanClickHandler(){
    let btn = document.getElementById("loginBtn");
    let span = document.getElementById("singup");
    if(btn.innerHTML == "로그인"){
        btn.innerHTML = "가입"
        span.innerHTML = "로그인"
    }
    else{
        btn.innerHTML= "로그인";
        span.innerHTML= "회원가입";
    } 
    
}

//------------------------------------------------------------------------