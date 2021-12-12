function leftTime(finish){
    let year =finish.slice(0,4);
    let month =finish.slice(5,7);
    let day =finish.slice(8,10);
    let hour =finish.slice(13,15);
    let minute =finish.slice(16,18);
    let newTime = new Date(year,month-1,day,hour,minute);
    let nowTime = new Date();
    let difference = newTime-nowTime;
    let result;
    if(parseInt(parseInt(difference/1000/60)/60/24/365)==0){ //년
        if(parseInt(parseInt(difference/1000/60/60/24)/30)==0){ //달
            if(parseInt(difference/1000/60/60/24)==0){ //일
                if(parseInt(difference/1000/60/60)==0){ //시
                        result = parseInt(difference/1000/60)+1;
                        return result+"분";
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