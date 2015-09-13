function GetCookie(name) {//获取指定名称的Cookie
    var strArg = name + "=";
    var nArgLen = strArg.length;
    var nCookieLen = document.cookie.length;
    var nEnd;
    var i = 0;
    var j;
    while (i < nCookieLen) {
        j = i + nArgLen;
        if (document.cookie.substring(i, j) == strArg) {
            nEnd = document.cookie.indexOf(";", j);
            if (nEnd == -1) nEnd = document.cookie.length;
            return unescape(document.cookie.substring(j, nEnd));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function SetCookie(name, value, expires) {//设置Cookie,指定名称，值，有效期(天)
    var exp = new Date();
    exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + "; expires=" + exp.toGMTString() + "; path=/";
}
function getXY(obj) {
    var a = new Array(); /*返回对象的left,top,width,height*/
    var t = obj.offsetTop;
    var l = obj.offsetLeft;
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    while (obj = obj.offsetParent) {
        t += obj.offsetTop;
        l += obj.offsetLeft;
    }
    a[0] = l;
    a[1] = t;
    a[2] = w;
    a[3] = h;
    return a;
}
//弹出浮动窗时设置关闭窗口时触发事件
function SetBack(e, func) {
    if ($("txtBack") == null) {
        var inpFocus = document.createElement("TEXTAREA");
        inpFocus.id = "txtBack";
        inpFocus.style.width = "1px";
        inpFocus.style.height = "1px";
        inpFocus.style.zIndex = -1;
        inpFocus.style.position = "absolute";
        document.body.appendChild(inpFocus);
    }
    $("txtBack").style.left = "-20px";
    if (e != null) {
        var ap = getXY(e);
        $("txtBack").style.top = ap[1] + "px";
    }
    else {
        $("txtBack").style.top = "1px";
    }
    $("txtBack").onfocus = function () { eval(func); }
}
function LinkUrl(hrefurl, target, method) {
    if ($("tmpForm") != null)
        $("tmpForm").remove();
    var arrUrl = hrefurl.split('?');
    var tmpForm = document.createElement("Form");
    tmpForm.id = "tmpForm";
    tmpForm.action = arrUrl[0];
    tmpForm.method = (method == null) ? "get" : method;
    tmpForm.target = (target == null) ? "" : target;
    if (arrUrl.length > 1) {
        var hashpara = arrUrl[1].toQueryParams(); //将地址参数转换为字典
        $H(hashpara).each(function (para) {//再将字典转换为哈希表
            var tmphid = document.createElement("input");
            tmphid.name = para.key;
            tmphid.type = "hidden";
            tmphid.value = para.value;
            tmpForm.appendChild(tmphid);
        });
    }
    document.body.appendChild(tmpForm);
    $("tmpForm").submit();
}

//实现表格的宽度拖拽
var dropTable;
var dropMove = false;
var dropStart = 0;
var dropTdW = 0;
var dropTableW = 0;
function DownSize(obj, ev) {
    var evt = window.event || ev;
    dropTable = obj.parentNode.parentNode.parentNode.parentNode;
    dropTableW = dropTable.offsetWidth;
    dropTable.style.width = dropTableW + "px";
    dropMove = true;
    dropStart = evt.clientX;
    var droptd = obj.parentNode;
    dropTdW = droptd.offsetWidth;
    if (obj.setCapture)
        obj.setCapture();
    else if (window.captureEvents)
        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
}
function MoveSize(obj, ev) {
    var evt = window.event || ev;
    if (dropMove) {
        var droptd = dropTable.rows[0].cells[2];
        var mw = evt.clientX - dropStart;
        if (dropTdW + mw > 100) {
            droptd.style.width = (dropTdW + mw) + "px";
            dropTable.style.width = (dropTableW + mw) + "px";
        }
    }
}
function UpSize(obj) {
    dropMove = false;
    if (obj.releaseCapture)
        obj.releaseCapture();
    else if (window.captureEvents)
        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
}

//用AJAX访问页面时判断登录是否失效
var hrout;
function Logout(mess) {
    if (mess.startsWith("Logout|")) {
        return true; //gino
        var strError = mess.substr(7);
        if (!strError.startsWith("登录超时")) {
            alert(strError);
        }
        try {
            parent.window.location.href = "/?Logout=1";
        }
        catch (e) {
            window.location.href = "/?Logout=1";
        }
        return false;
    }
    return true;
}

function ToolTip(d, content) {
    if (d.title.empty() && (content == null || content.empty()))
        return;
    if ($("frmTipBg") != null) {
        $("frmTipBg").show();
    }
    else {
        var div = document.createElement("IFRAME");
        div.id = "frmTipBg";
        div.className = "ToolTipBg";
        div.frameborder = "0";
        document.body.appendChild(div);
        var win = $("frmTipBg").contentWindow.document;
        win.designMode = "on";
        win.open();
        win.writeln('<html><head>');
        win.writeln('<style>body {background: #FEFADA; margin: 0px; padding: 0px; border:0px}</style>');
        win.writeln('</head><body></body></html>');
        win.close();
        win.designMode = "off";
    }
    if ($("divToolTip") != null) {
        $("divToolTip").show();
        $("divToolTip").style.width = "auto";
        $("divToolTip").style.height = "auto";
        $("frmTipBg").style.width = "auto";
        $("frmTipBg").style.height = "auto";
    }
    else {
        var divToolTip = document.createElement("DIV");
        divToolTip.id = "divToolTip";
        divToolTip.className = "Tooltip";
        document.body.appendChild(divToolTip);
        $("divToolTip").innerHTML = "<div id='divTipCon' style='line-height:18px;'></div>";
    }

    d.style.cursor = "pointer";
    $("divTipCon").innerHTML = (content != "" && content != null) ? content : d.title.replace(/\r/gi, "<br/>");
    d.title = "";
    var w = $("divTipCon").getWidth();
    var h = $("divTipCon").getHeight();
    $("frmTipBg").style.width = w + 6 + "px";
    $("frmTipBg").style.height = h + 6 + "px";

    d.onmouseout = function (e) {
        $("divToolTip").hide();
        $("frmTipBg").hide();
        if (this.releaseCapture)
            this.releaseCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        if (content == null || content.empty())
            this.title = $("divTipCon").innerHTML;
    }
    d.onmousemove = function (e) {
        e = window.event || e;
        var intX = 0, intY = 0;
        var allX = document.viewport.getWidth(), allY = document.viewport.getHeight();
        if (e.pageX || e.pageY) {
            intX = e.pageX; intY = e.pageY;
            allY += document.documentElement.scrollTop;
        }
        else if (e.clientX || e.clientY) {
            if (document.documentElement.scrollTop) {
                intX = e.clientX + document.documentElement.scrollLeft;
                intY = e.clientY + document.documentElement.scrollTop;
                allY += document.documentElement.scrollTop;
            }
            else {
                intX = e.clientX + document.body.scrollLeft;
                intY = e.clientY + document.body.scrollTop;
                allY += document.body.scrollTop;
            }
        }
        var w = $("divToolTip").getWidth();
        var h = $("divToolTip").getHeight();
        if ((intX + w) > allX) {
            intX = intX - w + 10;
            if (intX < 10)
                intX = 10;
        }
        if ((intY + h) > allY) {
            intY = intY - h - 5;
        }
        else {
            intY += 22;
        }
        //取得tooltip对象
        $("divToolTip").style.top = intY + "px";
        $("divToolTip").style.left = intX + "px";
        $("frmTipBg").style.top = intY + "px";
        $("frmTipBg").style.left = intX + "px";
        if (this.setCapture)
            this.setCapture();
        else if (window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    }
}

var clTip = null;
function NewTip(d, content, isclose) {
    clTip = d;
    if ($("divNewTip") != null) {
        $("divNewTip").show();
    }
    else {
        var divNewTip = document.createElement("DIV");
        divNewTip.id = "divNewTip";
        divNewTip.style.position = "absolute";
        divNewTip.style.zIndex = 30;
        divNewTip.style.float = "left";
        document.body.appendChild(divNewTip);
        if (isclose == null || !isclose) {
            $("divNewTip").innerHTML = "<table border='0' cellpadding='0' cellspacing='0'><tr><td style='background-color: #FEFBE4; border: 1px solid #BEB49C;' id='tdTipCon'></td></tr><tr><td><div style='background: url(../Images/newtips.gif) -16px 0px; height: 11px; width: 15px; margin-left: auto; margin-right: auto; position: relative; top: -1px;'></div></td></tr></table>";
        }
        else {
            $("divNewTip").innerHTML = "<table border='0' cellpadding='0' cellspacing='0'><tr><td style='background-color: #FEFBE4; border: 1px solid #BEB49C; border-bottom:0px; height:14px; font-size:1px;'><div style='background: url(../Images/newtips.gif) -30px 0px; height: 11px; width: 15px; float:right; margin:3px 3px 0px 0px; cursor:pointer' onclick='CloseTip(true)'></div></td></tr><tr><td style='background-color: #FEFBE4; border: 1px solid #BEB49C;border-top:0px;' id='tdTipCon'></td></tr><tr><td><div style='background: url(../Images/newtips.gif) -16px 0px; height: 11px; width: 15px; margin-left: auto; margin-right: auto; position: relative; top: -1px;'></div></td></tr></table>";
        }
        if (document.all)
            document.attachEvent("onclick", CloseNewTip);
        else
            document.addEventListener("click", CloseNewTip, true);
    }
    $("tdTipCon").innerHTML = content;
}

function CloseNewTip(e) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;
    CloseTip(srcElement);
}

function CloseTip() {
    var obj = arguments[0];
    if (obj == true) {
        $("divNewTip").hide();
        return;
    }
    if ($("divNewTip") != null && obj != null) {
        if ($("divNewTip").style.display != "none" && obj != clTip) {
            while (true) {
                if (obj.tagName == "BODY") {
                    $("divNewTip").hide();
                    break;
                }
                else {
                    if (obj.id == "divNewTip" || obj.id == clTip.id) {
                        break;
                    }
                    else
                        obj = obj.parentNode;
                }
            }
        }
    }
} //当失去焦点是隐藏下拉列表

//获取本页地址
function ServiceUrl() { return $("form1") != null ? $("form1").action : "/Service"; }
//加载即执行
if ($("linkSkin") != null) {
    var sk = GetCookie("SkinID");
    sk = (sk == null ? "7" : sk);
    $("linkSkin").href = "/Skins/Style" + sk + "/Skin.css";
}
var thisUrl = self.location.href;
var thisPara = self.location.search.replace("?", "");
if (parent.location.href == thisUrl && !thisUrl.toLowerCase().include("/newmain") && !thisUrl.toLowerCase().include("/main8000")) {//防止页面被框架外显示
    if (thisUrl.toLowerCase().include("/frame") || thisUrl.toLowerCase().include("/menu"))
        window.location.href = "/Message.php?Info=页面禁止被访问！";
    else {
        var sk = GetCookie("SkinID");
        if (sk == "1") {
            window.location.href = '/Main8000.php?BackUrl=' + encodeURIComponent(thisUrl);
        }
        else {
            window.location.href = '/NewMain.php?BackUrl=' + encodeURIComponent(thisUrl);
        }
    }
}
else {
    if (thisUrl.toLowerCase().include("/newmain")) {
        SetCookie("SkinID", "7", 7);
    }
    else if (thisUrl.toLowerCase().include("/main8000")) {
        SetCookie("SkinID", "1", 7);
    }
}

if (document.all) {
    window.attachEvent("onload", InitFrame);
}
function InitFrame() {//解决IE6框架有横向滚动条的问题
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject)
        Sys.ie = ua.match(/msie ([\d.]+)/)[1];
    else if (document.getBoxObjectFor)
        Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];

    if (Sys.ie && parseFloat(Sys.ie) <= 6) {
        if (document.body.scrollHeight > document.viewport.getHeight()) {
            document.documentElement.style.overflowY = "scroll";
        }
        else {
            document.documentElement.style.overflowY = "auto";
        }
    }
}

function RedirectPage(ev, d, url) {
    var evt = window.event || ev;
    var keyCode = evt.keyCode;
    if (keyCode == 13) {
        var strUrl = url.replace("###", d.value);
        window.location.href = strUrl;
    }
}
