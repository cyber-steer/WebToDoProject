function convertTime(time){
    let year =time.slice(0,2);
    let month =time.slice(3,5);
    let day =time.slice(6,8);
    let hour =time.slice(10,12);
    let minute =time.slice(13,15);
    let newTime = new Date("20"+year,month-1,day,hour,minute);
    return newTime;

}
function leftTime(finish){
    let newTime = convertTime(finish);
    let nowTime = new Date();
    let difference = newTime-nowTime;
    let result;
    if(difference<=0){
        return "만료";
    }
    else if(parseInt(parseInt(difference/1000/60)/60/24/365)==0){ //년
        if(parseInt(parseInt(difference/1000/60/60/24)/30)==0){ //달
            if(parseInt(difference/1000/60/60/24)==0){ //일
                if(parseInt(difference/1000/60/60)==0){ //시
                    if(parseInt(difference/1000/60)==0){ //분
                        result = parseInt(difference/1000);
                        return result+"초";
                    }
                    else{
                        result = parseInt(difference/1000/60);
                        return result+"분";
                    }
                }
                else{
                    result = parseInt(difference/1000/60/60);
                    return result+"시";
                }
            }
            else{
                 result = parseInt(difference/1000/60/60/24);
                 return result+"일";
            }
        }
        else{
             result = parseInt(parseInt(difference/1000/60/60/24)/30);
             return result+"달";
        }
    }
    else{
        result = parseInt(difference/1000/60/60/24/365);
        return result+"년";
    }
}
function convertColor(backColor){
    if(backColor.charAt(3) == "a"){
        backColor = backColor.slice(5,backColor.length-1);
        backColor = backColor.split(", ");
        backColor.pop();
    }
    else{
        backColor = backColor.slice(4,backColor.length-1);
        backColor = backColor.split(", ");

    }
    let color ="#";
    for(let i=0;i<3;i++){
        let code = parseInt(backColor[i]).toString(16);
        if(parseInt(backColor[i])<16){
            code +="0";
        }
        color += code;
    }
    console.log(color);
    return color;
}