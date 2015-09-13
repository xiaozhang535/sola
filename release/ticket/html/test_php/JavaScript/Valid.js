//检验PNR
function ValPnr(pnr) {
    var regu =/^[a-zA-Z]{1}[0-9a-zA-Z]{4,5}$/gi; 
    var re = new RegExp(regu);
    if (re.test(pnr))
		return true;
    else
		return false;
}

function ValIATA(code) {
    var regu = /^[a-zA-Z]{3}$/gi;
    var re = new RegExp(regu);
    if (re.test(code))
        return true;
    else
        return false;
}

function ValOffice(code) {
    var regu = /^[a-zA-Z]{3}[0-9]{3}$/gi;
    var re = new RegExp(regu);
    if (re.test(code))
        return true;
    else
        return false;
}

function ValJBNo(code) {
    var regu = /^[0-9]{10}$/gi;
    var re = new RegExp(regu);
    if (re.test(code))
        return true;
    else
        return false;
}

//验证数字的长度大小
function ValNumLength(num, nLength) {
    var regu = "";
    if (nLength == "5") {
        regu = /^[0-9]{0,5}$|^[0-9]{0,5}\.[0-9]{1,2}$/;
    } else if (nLength == "6") {
        regu = /^[0-9]{0,6}$|^[0-9]{0,6}\.[0-9]{1,2}$/;
    } else if (nLength == "7") {
        regu = /^[0-9]{0,7}$|^[0-9]{0,7}\.[0-9]{1,2}$/;
    } else if (nLength == "8") {
        regu = /^[0-9]{0,8}$|^[0-9]{0,8}\.[0-9]{1,2}$/;
    } else if (nLength == "9") {
        regu = /^[0-9]{0,9}$|^[0-9]{0,9}\.[0-9]{1,2}$/;
    } else if (nLength == "10") {
        regu = /^[0-9]{0,10}$|^[0-9]{0,10}\.[0-9]{1,2}$/;
    }
    var re = new RegExp(regu);
    if (re.test(num))
        return true;
    else
        return false;
}

function ValInteger(integer) {
    var regu = /^\d+$/;
    var re = new RegExp(regu);
    if (re.test(integer))
        return true;
    else
        return false;
}

//比较两个时间的大小边界条件
function CompareDateTime(StartTime, EndTime) {
    try {
        var aDate, oDate1, oDate2, iDays;
        aDate = StartTime.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])   //转换为12-13-2008格式     
        aDate = EndTime.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)   //把相差的毫秒数转换为天数 

//        if (iDays > 30) {
//            try { parent.ShowAlert(0, false, '查询时间必须在30天之内!'); } catch (e) { }
//            return false;
//        }
    } catch (e) {
        try { parent.ShowAlert(0, false, '请从控件中选取日期!'); } catch (e) { }
        return false;
    }
    return true;
}

//日期格式化
//Date.prototype.format = function (format) {
//    var o = {
//        "M+": this.getMonth() + 1, //month 
//        "d+": this.getDate(), //day 
//        "h+": this.getHours(), //hour 
//        "m+": this.getMinutes(), //minute 
//        "s+": this.getSeconds(), //second 
//        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
//        "S": this.getMilliseconds() //millisecond 
//    }

//    if (/(y+)/.test(format)) {
//        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//    }

//    for (var k in o) {
//        if (new RegExp("(" + k + ")").test(format)) {
//            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//        }
//    }
//    return format;
//}

//检验身份证
function ValIdCardNo(num) 
{   
    num = num.toUpperCase();  
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) { 
        return false; 
    }
    var len, re; 
    len = num.length; 
    if (len == 15)  { 
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/); 
        var arrSplit = num.match(re); 
        //检查生日日期是否正确 
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]); 
        var bGoodDay; 
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
        if (!bGoodDay){ 
            return false; 
        } else {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2','x'); 
            var nTemp = 0, i;   
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6); 
            for(i = 0; i < 17; i ++) { 
                nTemp += num.substr(i, 1) * arrInt[i]; 
            } 
            num += arrCh[nTemp % 11];   
            return num;   
        }   
    } else if (len == 18) { 
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
        var arrSplit = num.match(re); 
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
        var bGoodDay; 
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
        if (!bGoodDay)  { 
            return false; 
        } else { 
            var valnum; 
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
            var nTemp = 0, i; 
            for(i = 0; i < 17; i ++) { 
                nTemp += num.substr(i, 1) * arrInt[i]; 
            } 
            valnum = arrCh[nTemp % 11]; 
            if (valnum != num.substr(17, 1)) { 
                return false; 
            } 
            return num; 
        } 
    } 
	return false;
}
//检查时间
function ValDateTime(objTime) {
    var aDate = objTime.split("-")
    try {
        var oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])   //转换为12-13-2008格式
        return true;
    }
    catch (e) {
        return false;
    }
}
//检查电话
function ValPhone(objPhone) {
    var regu = /^[0][0-9]{2,3}[-][0-9]{7,8}$|^[1-9]{7,8}$|^[0][0-9]{11,12}$|^[0][0-9]{2,3}[-][0-9]{7,8}[-][0-9]{1,5}$/;
    var re = new RegExp(regu);
    if (re.test(objPhone))
        return true;
    else
        return false;
}
//检查手机
function ValMobile(objMobile) {
    var regu = /^[1][3,5,8,7]{1}[0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(objMobile))
        return true;
    else
        return false;
}
//验证邮箱格式
function ValEmail(objEmail) {
    var regu = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;
    var re = new RegExp(regu);
    if (re.test(objEmail))
        return true;
    else
        return false;
}
//验证用户名格式
function ValAccount(objAccount) {
    var regu = /^[\u4e00-\u9fa5a-zA-Z0-9_\-]{2,15}$/gi;
    var re = new RegExp(regu);
    if (re.test(objAccount))
        return true;
    else
        return false;
}
//验证QQ在线代码格式
function ValQQ(objQQ) {
    if (objQQ.include("</a>") && objQQ.include("<img") && objQQ.include("http://wpa.qq.com"))
        return true;
    else
        return false;
}
//验证IP地址
function ValIP(objIP) {
    var regu = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    var re = new RegExp(regu);
    if (re.test(objIP))
        return true;
    else
        return false;
}

//验证英文网站域名或IP
//function ValDomain(objDomain)
//{
//    if (objDomain.include(":"))
//    {
//        var port =  objDomain.substr(objDomain.indexOf(":") + 1);
//        if (!isNaN(port))
//            objDomain = objDomain.substr(0, objDomain.indexOf(":"));
//        else
//            return false;
//    } 
//    var regu=/^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$|^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/gi;
//	var re = new RegExp(regu);
//    if (re.test(objDomain)) 
//		return true;
//    else
//		return false;
//}
