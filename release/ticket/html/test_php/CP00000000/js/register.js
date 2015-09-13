var dAccount = "请填写一个您要申请的帐号.";
var dVal = "请输入您在下图中看到的字符，不区分大小写.";
function ChangeImg() {//更改验证码
    $("tdVal").innerHTML = "<img alt='' src='/Login/ValidateReg.ashx?" + Math.random() + "' style='cursor:pointer' onclick='ChangeImg()' />";
}
function CharMode(iN) {//测试某个字符是属于哪一类.
    if (iN >= 48 && iN <= 57)//数字
        return 1;
    if (iN >= 65 && iN <= 90)//大写字母
        return 2;
    if (iN >= 97 && iN <= 122)//小写
        return 4;
    else
        return 8; //特殊字符
}
function bitTotal(num) {//计算出当前密码当中一共有多少种模式
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
function checkStrong(sPW) {//返回密码的强度级别
    if (sPW.length < 6 || sPW.length > 16)
        return 0; //密码太短
    if (sPW == $("txtAccount").value.strip() && !sPW.empty())
        return 1; //密码和帐号相同
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {//测试每一个字符的类别并统计一共有多少种模式.
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}
function pwStrength(pwd) {//检验密码强度
    $("ulPwd").hide();
    $("spnPwd").hide();
    $("spnPwdMess").show();
    if (pwd.empty())
        return;
    Lcolor = Mcolor = Hcolor = "#F5F8FC";
    level = checkStrong(pwd);
    switch (level) {
        case 0:
            $("spnPwd").show();
            $("spnPwdMess").hide();
            $("spnPwd").innerHTML = pwd.length < 6 ? "密码太短" : "密码过长";
            break
        case 1:
            $("ulPwd").show();
            $("spnPwdMess").hide();
            Lcolor = "#FF0000";
            break;
        case 2:
            $("ulPwd").show();
            $("spnPwdMess").hide();
            Mcolor = "#FF9900";
            break;
        default:
            $("ulPwd").show();
            $("spnPwdMess").hide();
            Hcolor = "#33CC00";
            break;
    }
    $("liL").style.background = Lcolor;
    $("liM").style.background = Mcolor;
    $("liH").style.background = Hcolor;
    return;
}
function txtBlur(e) {
    e.value = e.value.strip();
    if (e.value.empty() || e.value == dAccount || e.value == dVal) {
        e.style.color = "#999999";
        if (e.id == "txtAccount")
            e.value = dAccount;
    }
}
function txtFoc(e) {
    if (e.value == dAccount) {
        e.value = "";
        e.style.color = "#000000";
        if (e.id == "txtAccount")
            $("btnCheck").show();
    }
    $(e.id.replace(/txt/, "spn")).innerHTML = "";
    if (e.value.empty()) {
        $(e.id.replace(/txt/, "spn")).hide();
        if ($(e.id.replace(/txt/, "spn") + "Mess") != null)
            $(e.id.replace(/txt/, "spn") + "Mess").show();
    }
}
window.onload = function () {
    $("txtAccount").onblur = function () { txtBlur(this); }
    $("txtAccount").onfocus = function () { txtFoc(this); $("btnCheck").show(); $("spnAccount").className = "fRed"; $("spnAccount").hide(); }
    $("btnCheck").onclick = function () { CheckAccount(); }
    $("txtPwd").onblur = function () { pwStrength(this.value); }
    $("txtPwd").onfocus = function () { txtFoc(this); }
    $("txtPwd2").onfocus = function () { txtFoc(this); }
    $("txtEmail").onfocus = function () { txtFoc(this); }
    $("txtLComName").onfocus = function () { txtFoc(this); }
    $("txtAddress").onfocus = function () { txtFoc(this); }
    $("txtTel").onfocus = function () { txtFoc(this); }
    $("txtQQ").onfocus = function () { txtFoc(this); }
    $("txtContactor").onfocus = function () { txtFoc(this); }
    $("txtMobile").onfocus = function () { txtFoc(this); }
    $("btnReg").onclick = function () { return CheckForm(); }

    if ($("txtVal") != null) {
        $("txtVal").onfocus = function () { txtFoc(this); }
    }
    if ($("txtIATA") != null) {
        $("txtIATA").onfocus = function () { txtFoc(this); }
    }
    if ($("txtOffice") != null) {
        $("txtOffice").onfocus = function () { txtFoc(this); }
    }
    
    txtBlur($("txtAccount"));
    if ($("trValImg") != null) {
        ChangeImg();
    }
}
function CheckAccount() {//检查帐号是否可用
    if ($("txtAccount").value.strip() == dAccount) {
        $("spnAccount").show();
        $("spnAccount").innerHTML = "< 您还没有填写要注册的帐号.";
        $("btnCheck").hide();
        return;
    }
    else if (!ValAccount($("txtAccount").value.strip())) {
        $("spnAccount").show();
        $("spnAccount").innerHTML = "< 注册的帐号中不能含有特殊字符.";
        $("btnCheck").hide();
        return;
    }
    $("btnCheck").disabled = "disabled";
    var para = "Action=CheckAccount&Account=" + $("txtAccount").value.strip();
    new Ajax.Request(
    "Register.php",
	{
	    method: "post",
	    parameters: para,
	    onSuccess: function (transport) {
	        var content = transport.responseText;
	        if (content == "OK") {
	            $("spnAccount").innerHTML = "< 该帐号可以使用.";
	            $("spnAccount").className = "fGreen";
	        }
	        else {
	            $("spnAccount").innerHTML = "< " + content;
	            $("spnAccount").className = "fRed";
	        }
	        $("spnAccount").show();
	        $("btnCheck").disabled = "";
	        $("btnCheck").hide();
	    }
	});
}
function CheckForm() {//检查注册表单
    InputTextStrip();
    var IsVal = true;
    var strAccount = $("txtAccount").value;
    if (strAccount.empty() || strAccount == dAccount) {
        $("spnAccount").innerHTML = "< 您还没有填写登录帐号.";
        $("spnAccount").show();
        $("btnCheck").hide();
        IsVal = false;
    } else if (strAccount.length < 2 || strAccount.length > 20) {
        $("spnAccount").innerHTML = "< 请填写2-20位字符(支持中文),以字母开头.";
        $("spnAccount").show();
        $("btnCheck").hide();
        IsVal = false;
    }
    var strPwd = $("txtPwd").value;
    if (strPwd.empty()) {
        $("spnPwd").innerHTML = "< 您还没有填写密码.";
        $("spnPwd").show();
        $("spnPwdMess").hide();
        IsVal = false;
    } else if (strPwd.length < 6) {
        $("spnPwd").innerHTML = "< 密码太短.";
        $("spnPwd").show();
        $("spnPwdMess").hide();
        IsVal = false;
    } else if (strPwd.length > 16) {
        $("spnPwd").innerHTML = "< 密码过长.";
        $("spnPwd").show();
        $("spnPwdMess").hide();
        IsVal = false;
    }
    if ($("txtPwd2").value.empty()) {
        $("spnPwd2").innerHTML = "< 您还没有填写确认密码.";
        $("spnPwd2").show();
        IsVal = false;
    } else if ($("txtPwd2").value != strPwd) {
        $("spnPwd2").innerHTML = "< 确认密码错误, 与密码不符.";
        $("spnPwd2").show();
        IsVal = false;
    }
    if ($("txtEmail").value.empty()) {
        $("spnEmail").innerHTML = "< 您还没有填写Email.";
        $("spnEmail").show();
        $("spnEmailMess").hide();
        IsVal = false;
    } else if (!ValEmail($("txtEmail").value)) {
        $("spnEmail").innerHTML = "< Email的格式错误.";
        $("spnEmail").show();
        $("spnEmailMess").hide();
        IsVal = false;
    } else if (!CheckEmail()) {
        $("spnEmail").innerHTML = "< 该Email已被注册.";
        $("spnEmail").show();
        $("spnEmailMess").hide();
        IsVal = false;
    }

    if ($("txtContactor").value.empty()) {
        $("spnContactor").innerHTML = "< 您还没有填写联系人.";
        $("spnContactor").show();
        IsVal = false;
    }

    if ($("txtMobile").value.empty()) {
        $("spnMobile").innerHTML = "< 您还没有填写联系人手机.";
        $("spnMobile").show();
        $("spnMobileMess").hide();
        IsVal = false;
    } else if (!ValMobile($("txtMobile").value)) {
        $("spnMobile").innerHTML = "< 手机号码格式错误.";
        $("spnMobile").show();
        $("spnMobileMess").hide();
        IsVal = false;
    }

    if ($("txtLComName").value.empty()) {
        $("spnLComName").innerHTML = "< 您还没有填写公司名称.";
        $("spnLComName").show();
        IsVal = false;
    }
    //    if ($("txtSComName").value.empty()) {
    //        $("spnSComName").innerHTML = "< 您还没有填写公司简称.";
    //        $("spnSComName").show();
    //        IsVal = false;
    //    }
    //    if ($("dropProvince").getValue().empty()) {
    //        $("spnProvince").innerHTML = "< 您还没有填写公司所在省份.";
    //        $("spnProvince").show();
    //        IsVal = false;
    //    }
    //    if ($("dropCity").getValue().empty()) {
    //        $("spnProvince").innerHTML = "< 您还没有填写公司所在城市.";
    //        $("spnProvince").show();
    //        IsVal = false;
    //    }
    //    if ($("dropArea").getValue().empty()) {
    //        $("spnProvince").innerHTML = "< 您还没有填写公司所在地区.";
    //        $("spnProvince").show();
    //        IsVal = false;
    //    }
    //    if ($("txtAddress").value.empty()) {
    //        $("spnAddress").innerHTML = "< 您还没有填写公司地址.";
    //        $("spnAddress").show();
    //        IsVal = false;
    //    }
    //    if ($("txtTel").value.empty()) {
    //        $("spnTel").innerHTML = "< 您还没有填写公司电话.";
    //        $("spnTel").show();
    //        $("spnTelMess").hide();
    //        IsVal = false;
    //    }

    if ($("txtIATA") != null){
        if ($("txtIATA").value.empty()) {
            $("spnIATA").innerHTML = "< 您还没有填写IATA号.";
            $("spnIATA").show();
            IsVal = false;
        }
    }

    if ($("txtOffice") != null){
        if ($("txtOffice").value.empty()) {
            $("spnOffice").innerHTML = "< 您还没有填写Office号.";
            $("spnOffice").show();
            IsVal = false;
        }
    }

    if ($("txtQQ").value.empty()) {
        $("spnQQ").innerHTML = "< 您还没有填写QQ号码.";
        $("spnQQ").show();
        IsVal = false;
    }

    if ($("txtVal") != null && $("txtVal").value.empty()) {
        $("spnVal").innerHTML = "< 您还没有输入验证码.";
        $("spnVal").show();
        IsVal = false;
    }

    if (IsVal) {//提交表单数据
        $("btnReg").disabled = "disabled";
        var para = "Action=Register&Account=" + $("txtAccount").value + "&Pwd=" + $("txtPwd").value + "&Email=" + $("txtEmail").value
        + "&LComName=" + $("txtLComName").value + "&Province=" + $("dropProvince").options[$("dropProvince").selectedIndex].innerHTML
        + "&City=" + $("dropCity").options[$("dropCity").selectedIndex].innerHTML + "&Area=" + $("dropArea").options[$("dropArea").selectedIndex].innerHTML
        + "&Address=" + $("txtAddress").value + "&Tel=" + $("txtTel").value + "&Contactor=" + $("txtContactor").value
        + "&Mobile=" + $("txtMobile").value + "&QQ=" + $("txtQQ").value + "&Rights=" + $("hidRights").value;

        if ($("txtVal") != null) {
            para += "&Val=" + $("txtVal").value;
        }

        if ($("txtIATA") != null) {
            para += "&IATA=" + $("txtIATA").value;
        }

        if ($("txtOffice") != null) {
            para += "&Office=" + $("txtOffice").value;
        }

        new Ajax.Request(
        $("form1").action,
	    {
	        method: "post",
	        parameters: para,
	        onSuccess: function (transport) {
	            var content = transport.responseText;
	            if (content != "OK") {
	                var arrInfo = content.split('|');
	                if (arrInfo[0] == "Account") {
	                    $("spnAccount").innerHTML = "< " + arrInfo[1];
	                    $("spnAccount").className = "fRed";
	                    $("spnAccount").show();
	                    $("btnCheck").hide();
	                }
	                else if (arrInfo[0] == "Val") {
	                    $("spnVal").innerHTML = "< " + arrInfo[1];
	                    $("spnVal").show();
	                } else {
	                    window.location.href = "/Homepage/CP00000000/Message.php?Info=" + content;
	                }
	                $("btnReg").disabled = "";
	            } else {
	                window.location.href = "/Homepage/CP00000000/RegResult.php";
	            }
	        }
	    });
    }
    return false;
}
function CheckEmail() {
    var isok = true;
    new Ajax.Request(
     "Register.php",
    {
        method: "post",
        asynchronous: false,
        parameters: "Action=CheckEmail&Email=" + $("txtEmail").value,
        onFailure: function () { isok = false; },
        onSuccess: function (transport) {
            var content = transport.responseText;
            isok = (content == "OK");
        }
    });
    return isok;
}

function ShowMore() {
    if ($("tb").style.display == "") {
        $("tb").style.display = "none";
    }
    else {
        $("tb").style.display = "";
    }
}

function SendCode(e) {
    var strMobile = $("txtMobile").value;
    if (strMobile.empty()) {
        alert("您还没有填写联系人手机");
        $("txtMobile").focus();
        return;
    }
    else if (!ValMobile(strMobile)) {
        alert("手机号码格式错误");
        $("txtMobile").focus();
        return;
    }
    if (e.id == "spnSend") {
        e.innerHTML = "正在发送，请稍候...";
        e.onclick = function () { };
        e.className = "fGray";
    }
    $("txtMobile").disabled = true;
    new Ajax.Request(
    "Register.php",
	{
	    method: "post",
	    parameters: "Action=SendCode&Mobile=" + strMobile,
	    onSuccess: function (transport) {
	        var content = transport.responseText;
	        if (content != "OK") {
	            alert(content);
	            $("txtMobile").disabled = false;
	            if (e.id == "spnSend") {
	                e.innerHTML = "发送验证码到手机";
	                e.onclick = function () { SendCode(this) };
	                e.className = "fBlue hand";
	            }
	        }
	        else {
	            $("spnSecond").show();
	            if (e.id == "spnSend") {
	                $("spnValAgain").show();
	                e.hide();
	            }
	            TimeSpanRun();
	        }
	    }
	});
}


var normalelapse = 1000;
var nextelapse = normalelapse;
var counter;
var startTime;
var hrtime = null;
// 开始运行   
function TimeSpanRun() {
    $("spnAgain").className = "fGray";
    $("spnAgain").onclick = function () { };
    counter = 0;
    // 初始化开始时间   
    startTime = new Date().valueOf();
    // nextelapse是定时时间, 初始时为100毫秒   
    // 注意setInterval函数: 时间逝去nextelapse(毫秒)后, onTimer才开始执行   
    hrtime = window.setInterval("OnTimeSpan()", nextelapse);
}
// 倒计时函数
var sec = 60;
function OnTimeSpan() {
    sec -= 1;
    if (sec == 0) {
        $("spnSecond").hide();
        sec = 60;
        $("spnAgain").onclick = function () {
            SendCode(this);
        }
        $("spnAgain").className = "fBlue hand";
        $("txtMobile").disabled = false;
        window.clearInterval(hrtime);
        return;
    }

    $("spnSecond").innerHTML = "，已等待(" + sec + ")秒";
    // 清除上一次的定时器   
    window.clearInterval(hrtime);
    // 自校验系统时间得到时间差, 并由此得到下次所启动的新定时器的时间nextelapse   
    counter++;
    var counterSecs = counter * normalelapse;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = counterSecs - elapseSecs;
    nextelapse = normalelapse + diffSecs;
    if (nextelapse < 0) nextelapse = 0;
    if (counter > 100) {
        counter = 0;
        startTime = new Date().valueOf();
    }
    // 启动新的定时器   
    hrtime = window.setInterval("OnTimeSpan()", nextelapse);
}