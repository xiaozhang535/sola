//bg是否显示背景，msg显示消息
function chatloading() {//加载数据提示框
    var divcenter = document.createElement("DIV");
    divcenter.id = "divloading";
    divcenter.className = "divLoad";
    var centerhtml = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr><td align='right' width='40' style='padding-top:15px; padding-right:6px;'><img src='/Images/loading.gif' alt='' /></td><td  style='padding-top:16px; font-size:9pt;'>正在载入<b>, </b>请稍候<b>...</b></td></tr></table>";
    document.body.appendChild(divcenter);
    $("divloading").innerHTML = centerhtml;
    
    var w = $("divloading").getWidth();
    var h = $("divloading").getHeight();
    var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
    var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
    var th = (parseInt((dh - (h + 22)) / 2) - 30)
    th = th < 30 ? 30 : th;
    var tw = parseInt((dw - w) / 2) < 0 ? 0 : parseInt((dw - w) / 2)
    $("divloading").style.top = th + "px";
    $("divloading").style.left = tw + "px";
}
function closechatloading() {//关闭提示框
    if ($("divloading") != null) { $("divloading").parentNode.removeChild($("divloading")); }
}

var CMouseX = null, CMouseY = null, cophr = null, CTempID = null; 
var CMoveStart = false;
var CSpeed = 20;
function ChatDiv() { }
ChatDiv.prototype = {
    _Version: "Version:1.0.0;作者: 任维",

    id: "", //自定义层ID
    closemode: true, //属性 关闭模式为动画还是直接关闭
    closedparent: false, //属性 关闭按钮点击关闭后，是否执行父级页面的函数
    width: "280", //属性 层宽度
    height: "90", //属性 层高度
    title: "", //属性 层标题
    url: "", //属性 当mode为frame时的地址链接
    close: function () {//关闭浮动层，带有动画效果, 第一个参数表示是否有返回值，第二个参数表示指定的返回值
        var objDiv = $("divChat_" + this.id);
        if (this.closemode) {
            var hh = 0;
            var fliter = 100;
            var th = parseInt(objDiv.style.top);
            var clhf = window.setInterval(function () {
                fliter -= 10;
                hh += 5;
                objDiv.setStyle({ opacity: (fliter / 100) });
                objDiv.style.top = th - hh + "px";
                if (fliter == 20) {
                    window.clearInterval(clhf);
                    objDiv.parentNode.removeChild(objDiv);
                }
            }, CSpeed);
        }
        else {
            objDiv.parentNode.removeChild(objDiv);
        }

        if (document.all) {
            document.detachEvent('onmouseover', this.drag);
        }
        else {
            document.removeEventListener("mouseover", this.drag, false);
        }
        closechatloading();

        var callback = (arguments.length > 0) ? arguments[0] : false;
        if (callback) {
            var inpback = window.frames["frmmain"].document.getElementById("txtBack");
            if (inpback != null) {
                inpback.value = (arguments.length > 1) ? arguments[1].replace(/<br>/gi, "\n") : ""; //如果指定了返回值，则添加
                inpback.focus(); //为了触发onfocus()事件
                inpback.blur();
            }
        }
    },

    min: function () {//关闭浮动层，带有动画效果, 第一个参数表示是否有返回值，第二个参数表示指定的返回值
        var objDiv = $("divChat_" + this.id);
        var objthis = this;
        objDiv.setAttribute("left", parseInt(objDiv.style.left));
        objDiv.style.left = "-800px";
        $("trChatmin").show();
        var limin = document.createElement("LI");
        limin.id = "limin" + this.id;
        $("ulChatMin").appendChild(limin);
        $("limin" + this.id).innerHTML = "<a href='javascript:'>" + this.title + "</a>";
        $("limin" + this.id).onclick = function () {
            objthis.max();
        }
    },

    max: function () {
        var objDiv = $("divChat_" + this.id);
        var ll = parseInt(objDiv.getAttribute("left"));
        objDiv.removeAttribute("left");
        objDiv.style.left = ll + "px";
        this.settop();
        $("limin" + this.id).parentNode.removeChild($("limin" + this.id));
        if ($("ulChatMin").childElements().length == 0) {
            $("trChatmin").hide();
        }
    },

    drag: function (e) {
        if (CTempID == null)
            return;
        e = window.event || e;
        var objDiv = $("divChat_" + CTempID);
        var w = objDiv.getWidth();
        var h = objDiv.getHeight();
        var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
        var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
        var LayerLeft = parseInt(objDiv.style.left);
        var LayerTop = parseInt(objDiv.style.top);
        if (CMouseX == null || CMouseY == null) { return; }
        if (CMoveStart) {
            var ll = e.clientX - CMouseX;
            var tt = e.clientY - CMouseY;
            if (ll <= 0)
                ll = 0;
            if (tt <= 0)
                tt = 0;
            if (ll + w >= dw)
                ll = dw - w;
            if (tt + h >= dh)
                tt = dh - h;
            objDiv.style.left = ll + "px";
            objDiv.style.top = tt + "px";
        }
    },

    settop: function () {
        var objDiv = $("divChat_" + this.id);
        var nMax = 101;
        $$("div.DivFloat").each(function (d) {
            if (parseInt(d.style.zIndex) > nMax) {
                nMax = parseInt(d.style.zIndex);
            }
        })
        objDiv.style.zIndex = (nMax + 1);
        return $$("div.DivFloat").length;
    },

    open: function () {
        if (cophr != null)
            window.clearInterval(cophr);

        //        if ($("frmCBg") == null) {
        //            var frm = document.createElement("IFRAME");
        //            frm.id = "frmCBg";
        //            frm.name = "frmCBg";
        //            frm.className = "OpBgNone";
        //            frm.frameBorder = 0;
        //            document.body.appendChild(frm);
        //            var strHtm = "<html>\r\n";
        //            strHtm += "<head>\r\n";
        //            strHtm += "<scr" + "ipt type=\"text/javas" + "cript\">\r\n";
        //            strHtm += "window.onload = function(){\r\n";
        //            strHtm += "document.onclick = function(){parent.objFloatDiv.shining();}\r\n";
        //            strHtm += "}\r\n";
        //            strHtm += "</scr" + "ipt>\r\n";
        //            strHtm += "</head>\r\n";
        //            strHtm += "<body oncontextmenu='return false' style='background:#000;'>\r\n";
        //            strHtm += "</body>\r\n";
        //            strHtm += "</html>";
        //            window.frmBg.document.writeln(strHtm);
        //            window.frmBg.document.close();
        //        }

        var strChatHtm = "<table border='0' cellspacing='0' cellpadding='0' style='width:" + this.width + "px' class='FTable'>";
        strChatHtm += "<tr class='thb' id='trChat_" + this.id + "'>";
        strChatHtm += "<th height='30' align='left'><span id='spnChatTitle_" + this.id + "'></span></th>";
        strChatHtm += "<th width='50' align='right' style='cursor:default'><img src='images/Icons022.png' style='margin-right:8px; cursor:pointer' id='divChatMin_" + this.id + "' /><img src='images/Icons023.png' id='divChatClose_" + this.id + "' style='margin-right:4px; cursor:pointer' /></th>";
        strChatHtm += "</tr><tr>";
        strChatHtm += "<td align='center' style='height:" + this.height + "px;padding:0' valign='top' colspan='2'>";
        strChatHtm += "<iframe scrolling='auto' style='border:0px;width:100%;height:100%' frameborder='0' id='frmChat_" + this.id + "' name='frmChat_" + this.id + "' onload='closechatloading()'></iframe>";
        strChatHtm += "</td></tr></table>";

        var divChat = document.createElement("DIV");
        divChat.id = "divChat_" + this.id;
        divChat.className = "DivFloat";
        divChat.style.display = "none";
        document.body.appendChild(divChat);
        divChat.innerHTML = strChatHtm;

        var objthis = this;
        var objDiv = $("divChat_" + this.id);
        var objTr = $("trChat_" + this.id);
        var objFrm = $("frmChat_" + this.id);

        document.onmousemove = "";
        closechatloading();

        if (this.title == null) {
            objTr.hide();
        }
        else {
            $("spnChatTitle_" + this.id).innerHTML = this.title;
        }

        if (this.closedparent) {
            $("divChatClose_" + this.id).onclick = function () { objthis.close(true); };
        }
        else {
            $("divChatClose_" + this.id).onclick = function () { objthis.close(); };
        }
        $("divChatMin_" + this.id).onclick = function () { objthis.min(); };
        chatloading();

        var w = objDiv.getWidth();
        var h = objDiv.getHeight();
        var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
        var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
        var th = (parseInt((dh - (h + 22)) / 2) - 20)
        th = th < 10 ? 10 : th;
        th += document.documentElement.scrollTop;
        var tw = parseInt((dw - w) / 2) < 0 ? 0 : parseInt((dw - w) / 2)

        var num = this.settop();
        var hh = 40 - (num * 10);
        objDiv.style.top = th - hh + "px";
        objDiv.style.left = (tw + (num * 10)) + "px";

        var fliter = 20;
        objDiv.setStyle({ opacity: (fliter / 100) });
        objDiv.show();
        objDiv.focus();

        var linkurl = this.url;
        var tmpid = this.id;
        cophr = window.setInterval(function () {
            fliter += 10;
            hh -= 5;
            objDiv.setStyle({ opacity: (fliter / 100) });
            objDiv.style.top = th - hh + "px";
            if (fliter == 100) {
                objDiv.setStyle({ opacity: (100) });
                var rnd = Math.random();
                if (linkurl.include("?")) {
                    var arrPara = linkurl.split("?");
                    objFrm.src = arrPara[0] + "?_frmid=" + tmpid + "&_r=" + rnd + "&" + arrPara[1];
                }
                else {
                    objFrm.src = linkurl + "?_frmid=" + tmpid + "&_r=" + rnd;
                }
                window.clearInterval(cophr);
            }
        }, CSpeed);

        objTr.onmousedown = function (e) {
            objthis.settop();
            CMoveStart = true;
            CTempID = tmpid;
            e = window.event || e;
            CMouseX = e.clientX - parseInt(objDiv.style.left);
            CMouseY = e.clientY - parseInt(objDiv.style.top);
            if (this.setCapture)
                this.setCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        objTr.onmouseup = function (e) {
            CMoveStart = false;
            CTempID = null;
            if (this.releaseCapture)
                this.releaseCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }

        if (document.all)
            document.attachEvent("onmousemove", this.drag);
        else
            document.addEventListener("mouseover", this.drag, false);
    }
}