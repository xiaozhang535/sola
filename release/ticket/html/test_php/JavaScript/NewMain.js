var stopscroll = false;
var scrolling = false;
var scrp;
var sup;
var speed = (document.all ? 30 : 40);
var delays = 8000;
var marquees;
var hh = 0;
var ulh = 0;

window.onload = function () {
    $("ulM").childElements().each(function (d) { d.onclick = function () { ClickRoot(this); } });

    $("ulT").childElements().each(function (d) {
        var da = d.down(0);
        if (da.childElements().length == 1) {
            if (da.className.include("kf")) {
                da.onclick = function () { GetClient(); }
            }
            else if (!da.className.include("bz")) {
                da.onclick = function () { ClickTop(this); ClickMenu(); }
            }
        }
        else {
            da.onclick = function () { ShowFM(this); }
        }
    });

    $$("div.tt").each(function (d) {
        d.down(0).onclick = function () { HideMenu(); }
        d.next(0).childElements().each(function (d) {
            if (d.className != "hr") {
                d.onclick = function () { ClickMenu(this); ClickTop(); }
            }
        });
    });

    marquees = $("divMeq");
    hh = marquees.offsetHeight;
    marquees.onmouseover = function () {
        stopscroll = true;
        window.clearInterval(scrp);
    }
    marquees.onmouseout = function () {
        stopscroll = false;
        scrp = window.setInterval("Scrolling()", delays); //每10秒向上滚动一次
    }

    GetBoardList();
    window.setInterval("GetBoardList()", 1800000); //公告定时刷新

    //    GetOrderCount();//在菜单上显示订单列表的条目数
    //    window.setInterval("GetOrderCount()", 29000);//条目数定时刷新

    //GetBoard(99);//直接弹出公告

    //GetMessage();//聊天消息
}

//window.onresize = function () {
//    fixH();
//}

//function fixH() {
//    var wh = document.viewport.getHeight();
//    $('frmmain').style.height = (wh - 89) + "px";
//}

//----------菜单事件---->
function ClickRoot(e) {
    var nx = 0;
    $("ulM").childElements().each(function (d, index) { if (d == e) { nx = index; } d.className = d.className.replace("_c", ""); });
    if (e != null) {
        e.className = e.className + "_c";
        var arrdiv = $$("div.tt");
        arrdiv.each(function (d) { d.up(0).hide(); });
        arrdiv[nx].up(0).show();
        $("tdLeft").show();
        $("aRx").className = "la";
    }
}

function HideMenu(e) {
    if ($("tdLeft").style.display == "") {
        $("tdLeft").hide();
        e.className = "ra";
    }
    else {
        $("tdLeft").show();
        e.className = "la";
    }
}

function ClickMenu(e) {
    var arrli = $$("li.sli");
    if (arrli.length > 0) { arrli[0].className = ""; }
    if (e != null) { e.className = "sli"; }
}

function ClickTop(e) {
    $("ulT").childElements().each(function (d) {
        var da = d.down(0);
        da.className = da.className.substr(0, 2);
    });
    if (e != null) { e.className = e.className + "_c"; }
}

function ShowFM(e) {
    $("ulT").childElements().each(function (d) {
        var da = d.down(0);
        if (da.childElements().length != 1) {
            var inf = da.id.substr(1);
            da.className = inf;
            $("div" + inf).hide();
        }
    });

    var nm = e.id.substr(1);
    var sub = $("div" + nm);
    e.className = nm + "_ov";
    var dec = getXY(e);
    sub.style.top = (dec[1] + dec[3]) + "px";
    sub.style.left = dec[0] + "px";
    sub.show();
    $("txtFocus").focus();
}

function ShowMsgDiv(e) {
    var sub = $("divmsg");
    var dec = getXY(e);
    sub.style.top = (dec[1] + dec[3] + 2) + "px";
    sub.style.left = dec[0] + "px";
    sub.show();
    $("txtFocus").focus();
}

var IsClose = true;
function FMHide() {
    if (IsClose) {
        $("ulT").childElements().each(function (d) {
            var da = d.down(0);
            if (da.childElements().length != 1) {
                var inf = da.id.substr(1);
                da.className = inf;
                $("div" + inf).hide();
            }
        });
        $("divmsg").hide();
    }
}

function StopFM() { IsClose = false; }
function GoFM() { IsClose = true; }

function HideLi(inf) {
    $("div" + inf).hide();
    ClickTop();
    ClickRoot();
    ClickMenu();
    $("a" + inf).className = inf;
    IsClose = true;
}
//----------菜单事件----/

//----------公告滚动---->
function Scrolling() {
    ulh = $("ulMeq0").offsetHeight;
    if (ulh > hh) {
        if ($("ulMeq1").childElements().length == 0)
            $("ulMeq1").innerHTML = $("ulMeq0").innerHTML;
    }
    else {
        return;
    }

    if (stopscroll == true) { return; }
    stopscroll = false;

    if (!scrolling) {
        scrollUp();
    }
}

function scrollUp() {//向上滚动
    marquees.scrollTop++;
    if (marquees.scrollTop % hh == 0) {
        scrolling = false;
        window.clearTimeout(sup);
        if (marquees.scrollTop >= ulh) {
            marquees.insert(marquees.childElements()[0], 1);
            marquees.scrollTop = 0;
        }
    }
    else {
        scrolling = true;
        sup = window.setTimeout("scrollUp()", speed);
    }
}

function GetBoardList() {
    var para = "Action=GetBoardList&Count=10";
    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (content != "NO") {
                var arrInfo = content.split("|");
                $("ulMeq0").innerHTML = arrInfo[1];
                $("ulMeq1").innerHTML = "";
                window.clearInterval(scrp);
                scrp = window.setInterval("Scrolling()", delays); //每10秒向上滚动一次
                if (!arrInfo[0].empty()) {
                    GetBoard(arrInfo[0]);
                }
            }
        }
    });
}

function GetBoard(id) {
    var para = "Action=GetBoard&ID=" + id;
    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (content != "NO") {
                var arrInfo = content.split("♀");
                ShowBoard(arrInfo[0], arrInfo[1], id);
            }
        }
    });
}

function GetClient() {
    var para = "Action=GetClient";
    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (content != "NO") {
                ShowBoard("在线客服", content);
            }
        }
    });
}

function ShowBoard(t, html, id) {
    objFloatDiv = new FloatDiv();
    objFloatDiv.name = "objFloatDiv";
    objFloatDiv.title = t;
    objFloatDiv.dialog = false;
    objFloatDiv.width = "800";
    objFloatDiv.height = "450";
    objFloatDiv.align = "left";
    objFloatDiv.showclose = true;
    var htm = "<table width='100%' border='0'cellspacing='0' cellpadding='4'><tr><td>" + html + "</td></tr><tr><td align='center' height='30'><input type='button' value='关闭窗口' class='btn1' onclick='objFloatDiv.close();";
    if (id != null) {
        htm += "NoAlter()'/>&nbsp;<label class='f12 fGray'><input id='chkNoAlter' type='checkbox' value='" + id + "' />我已阅读，不再弹出</label></td></tr></table>";
        objFloatDiv.showclose = false;
    }
    else {
        htm += "'/></td></tr></table>";
    }
    objFloatDiv.content = htm;
    objFloatDiv.open();
}

function NoAlter() {
    if ($("chkNoAlter").checked) {
        var para = "Action=NoAlter&ID=" + $("chkNoAlter").value;
        new Ajax.Request(
        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onSuccess: function (transport) {
                var content = transport.responseText;
            }
        });
    }
}
//----------公告滚动----/

//----------聊天对话框---->
function ShowChat(id, title, rec) {
    var objChat = new ChatDiv();
    objChat.id = id;
    if ($("divChat_" + id) != null) { //窗口存在
        objChat.max();
    }
    else {

        objChat.title = title;
        objChat.width = "600";
        objChat.height = "430";
        objChat.url = "ChatTool/MChat.php?Rec=" + rec;
        objChat.open();
    }
}

function ClickChat(id, title, rec) {
    var li = $("li" + id);
    ShowChat(id, title, rec);
    li.parentNode.removeChild(li);
    IsClose = true;
    if ($("ulmsg").childElements().length == 0) {
        $("imgmsg").hide();
        FMHide();
    }
}

var IsGetMessage = false;
function GetMessage() {
    IsGetMessage = true;
    var UserID = $("hidUserID").value;
    var UserName = $("hidUserID").value;
    var Account = $("hidUserAccount").value;
    var CompanyID = $("hidCompanyID").value;
    var CompanyName = $("hidCompanyName").value;
    new Ajax.Request(
    "ChatTool/Message.ashx",
    {
        method: "get",
        parameters: "action=message&userid=" + UserID + "&username=" + UserName + "&account=" + Account + "&companyid=" + CompanyID + "&companyname=" + CompanyName + "&r=" + Math.random(),
        onFailure: function (transport) {
            Loading(transport.responseText);
            CloseLoading(3000);
            GetMessage();
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            IsGetMessage = false;
            if (content.startsWith("ERROR")) {
                Loading(content.replace("ERROR:", ""));
                CloseLoading(3000);
            }
            else {
                try {
                    var json = content.evalJSON();
                    for (var i = 0; i < json.length; i++) {
                        var msg = json[i];
                        var mid = msg.msgid;
                        var mname = msg.companyname;
                        if ($("divChat_" + mid) != null) { //窗口存在
                            var txtmsg = window.frames["frmChat_" + mid].document.getElementById("txtMsg");
                            if (txtmsg != null) {
                                txtmsg.value = $H(msg).toJSON(); //如果指定了返回值，则添加
                                txtmsg.focus(); //为了触发onfocus()事件
                                txtmsg.blur();
                            }

                            if ($("limin" + mid) != null) {
                                $("limin" + mid).className = "sli";
                            }
                        }
                        else {
                            $("imgmsg").show(); //闪烁消息显示
                            var tt = mid.split('_')[0];
                            if ($("li" + mid) == null) { //消息列表不存在，添加
                                var limsg = document.createElement("LI");
                                limsg.id = "li" + mid;
                                $("ulmsg").appendChild(limsg);
                                $("li" + mid).innerHTML = "<a href='javascript:'><i>" + tt + "有新消息。</i><b id='b" + mid + "'>1</b></a>";
                            }
                            else { //已存在就增加数字
                                $("b" + mid).innerHTML = parseInt($("b" + mid).innerHTML) + 1;
                            }

                            var strrec = "";
                            for (var j = 0; j < msg.receivers.length; j++) {
                                var rec = msg.receivers[j];
                                strrec += "|" + rec.userid + "," + rec.account + "," + rec.username + "," + rec.companyid + "," + rec.companyname;
                            }
                            if (!strrec.empty()) {
                                strrec = strrec.substr(1);
                            }
                            $("li" + mid).onclick = function () { ClickChat(mid, "【" + mname + "】" + tt, strrec); };
                        }
                    }
                }
                catch (e) { }
            }
            GetMessage();
        }
    });
}
//----------聊天对话框----/

//----------主页提示条---->
function Loading(html, b) {//正在保存的提示条
    //alert(html);
    $("spnLoadMsg").innerHTML = html;
    $("spnLoadMsg").show();
    if (b == null || b == true)
        $("spnLoadMsg").style.backgroundColor = "#009900";
    else
        $("spnLoadMsg").style.backgroundColor = "#FF0000";
}
//关闭提示条
function CloseLoading(t) {//如果t是null立即关闭，否则延迟t(毫秒)关闭
    if (t == null)
        $("spnLoadMsg").hide();
    else
        window.setTimeout("CloseLoading()", t)
}
//----------主页提示条----/

//在菜单上显示订单列表的条目数
//function GetOrderCount() {
//    var strCD = $("hidCD").value;
//    if (!strCD.empty()) {
//        var para = "Action=GetOrderCount&CD=" + $("hidCD").value;
//        new Ajax.Request(
//        ServiceUrl(),
//        {
//            method: "post",
//            parameters: para,
//            onSuccess: function (transport) {
//                var content = transport.responseText;
//                var arrB = $("divcd").getElementsBySelector('b');
//                if (content.empty()) {
//                    $("scd_count").hide();
//                    arrB.each(function (d) { d.hide(); });
//                }
//                else {
//                    var arrInfo = content.split(';');
//                    var nAllCount = 0;
//                    for (var i = 0; i < arrInfo.length; i++) {
//                        var arrKey = arrInfo[i].split(':');
//                        var objB = $(arrKey[0]);
//                        var nCount = parseInt(arrKey[1]);
//                        if (objB != null) {
//                            if (nCount == 0) {
//                                objB.hide();
//                            }
//                            else {
//                                nAllCount += nCount;
//                                objB.innerHTML = arrKey[1];
//                                objB.show();
//                            }
//                        }
//                    }

//                    if (nAllCount > 0) {
//                        $("scd_count").innerHTML = nAllCount;
//                        $("scd_count").show();
//                    }
//                    else {
//                        $("scd_count").hide();
//                    }
//                }
//            }
//        });
//    }
//}