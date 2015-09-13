function CheckForm() {//检查登录的表单
    if ($("txtAccount").value == "") {
        alert("请输入您的登录帐号！");
        $("txtAccount").focus();
        return false;
    }
    if ($("txtPassword").value == "") {
        alert("请输入您的密码！");
        $("txtPassword").focus();
        return false;
    }
/*
    //tmp
    if ($("divVad").style.display != "none" && $("txtVal").value.strip() == "") {
        alert("请输入验证码！");
        $("txtVal").focus();
        return false;
    }
*/
    return true;
}


function ChangeImg() {//更改验证码
  /* //tmp
    if ($("divVad").style.display != "none")
        $("spnImg").innerHTML = "<img alt='' src='../../Login/ValidateCode.ashx?" + Math.random() + "' style='cursor:pointer' onclick='ChangeImg()' />";
        */
}

window.onload = function () {
    if (document.readyState == 'complete') {
        ChangeImg();
        if ($("txtAccount").value.strip() == "")
            $("txtAccount").focus();
        else
            $("txtPassword").focus();
        inputonload($("txtAccount"));
    }

    ChangeScreen();
}

//当加载时，提示语置灰
function inputonload(e) {
    if (e.value == e.getAttribute("msg")) {
        e.style.color = "#999999"
    }
}

//当焦点时去掉提示语
function inputfocus(e) {
    e.style.color = '#000000';
    var val = e.value.strip();
    if (val != "" && val != e.getAttribute("msg"))
    { e.select(); }
    else
    { e.value = ""; } 
}

//当失去焦点未更改时，恢复提示语
function inputblur(e, val) {
    var val = e.value.strip();
    if (val == "") {
        e.style.color = '#999999';
        e.value = e.getAttribute("msg");
    }
}

function SubmitForm() {
    if (CheckForm()) {//提交登录信息
        $("btnLogin").disabled = "disabled";
        $("btnLogin").className = "inputBtnLogSL";
        var pass = $("txtPassword").value;
        var para = "Action=Login&Account=" + $("txtAccount").value.strip() + "&Password=" + pass + "&Remember=" + ($("chkRemeber").checked ? "1" : "0");
        if ($("divVad").style.display == "")
            para += "&Validate=" + $("txtVal").value;
        new Ajax.Request(
        "../../test_php/Default.php",
        {
            method: "post",
            asynchronous: false,
            parameters: para,
            onFailure: function (transport) { alert(transport.responseText); },
            onSuccess: function (transport) {
                var content = transport.responseText;
                //alert(content);
                var arrInfo = content.split('|');
                if (arrInfo[1] == "OK") {//登录成功跳转的主框架
                    window.location.href = "../../test_php/NewMain.php";
                }
                else {
                    if (parseInt(arrInfo[0]) > 2) {
                        $("divVad").show();
                    }
                    alert(arrInfo[1].substr(arrInfo[1].indexOf("，") + 1));
                    ChangeImg();
                    $("btnLogin").disabled = "";
                    $("btnLogin").className = "inputBtnLog";
                }
            }
        });
    }

    return false;
}

var nhr;
var delays = 8000;
function ChangeScreen() {
    var arrScreen = $$("div.divScreenBg");
    if (arrScreen.length > 1) {
        $("divPoint").show();
        for (var i = 0; i < arrScreen.length; i++) {
            var objItem = arrScreen[i];
            if (i == 0) {
                $("divPoint").innerHTML += "<span class='spanSL' onclick='Changing(0)'></span>";
            }
            else {
                $("divPoint").innerHTML += "<span onclick='Changing(" + i + ")'></span>";
                objItem.hide();
            }

//            objItem.onmouseover = function () {
//                window.clearInterval(nhr);
//            }
//            objItem.onmouseout = function () {
//                nhr = window.setInterval("Changing()", delays);
//            }
        }

        nhr = window.setInterval("Changing()", delays);
    }
    else {
        $("divPoint").hide();
    }
}


function Changing(ix) {//切换动画效果
    var arrScreen = $$("div.divScreenBg");
    var nNow = 0, nNext = 0;
    var objNow, objNext;
    arrScreen.each(function (d, index) {
        if (d.style.display == "") {
            objNow = d;
            nNow = index;
            nNext = (index == arrScreen.length - 1 ? 0 : index + 1);
        }
    });
    if (ix != null) {
        if (nNow == ix) {
            return;
        }
        nNext = ix;
    }
    objNext = arrScreen[nNext];
    GetFilter(objNext, 0);
    objNext.style.display = "";

    var nowfliter = 100;
    var nextfliter = 0;
    var fac = 5; //衰减频率
    var speed = 50;//图片切换速度
    var clhf = window.setInterval(function () {
        nowfliter -= fac;
        nextfliter += fac;
        GetFilter(objNow, nowfliter / 100);
        GetFilter(objNext, nextfliter / 100);
        if (nowfliter == 0) {
            window.clearInterval(clhf);
            objNow.hide();
            GetFilter(objNow, 1);
        }
    }, speed);

    $("divPoint").childElements().each(function (d, index) {
        if (index == nNext) {
            d.className = "spanSL";
        }
        else {
            d.className = "";
        }
    });
}

function GetFilter(d, op) {
    if (document.all) {
        d.style.filter = "Alpha(Opacity=" + (op * 100) + ")";
        d.style.opacity = op;
    }
    else {
        d.setStyle({ opacity: op });
    }
}
