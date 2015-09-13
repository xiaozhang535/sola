//bg是否显示背景，msg显示消息
function LoadImg(bg, msg, over) {//加载数据提示框
    if (bg == null) { bg = true }
    if (over == null) { over = false }
    if (msg == null) { msg = "正在载入"; }
    var divcenter = document.createElement("DIV");
    divcenter.id = "divLoadImg";
    if (!bg)
        divcenter.className = "divLoad";
    else
        divcenter.className = "divLoadbg";

    if (over) {
        if ($("frmImgBg") == null) {
            var frm = document.createElement("IFRAME");
            frm.id = "frmImgBg";
            frm.name = "frmImgBg";
            frm.frameBorder = 0;
            frm.className = "OpBg";
            document.body.appendChild(frm);
        }
        else
            $("frmImgBg").show();
    }
    else {
        if ($("frmImgBg") != null) { $("frmImgBg").hide(); }
    }

    var centerhtml = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tr><td align='right' width='60' style='padding-top:15px; padding-right:6px;'><img src='/Images/loading.gif' alt='' /></td><td  style='padding-top:16px; font-size:9pt;'>" + msg + "<b>, </b>请稍候<b>...</b></td></tr></table>";
    document.body.appendChild(divcenter);
    $("divLoadImg").innerHTML = centerhtml;
    var w = $("divLoadImg").getWidth();
    var h = $("divLoadImg").getHeight();
    var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
    var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
    var th = (parseInt((dh - (h + 22)) / 2) - 30)
    th = th < 30 ? 30 : th;
    var tw = parseInt((dw - w) / 2) < 0 ? 0 : parseInt((dw - w) / 2)
    $("divLoadImg").style.top = th + "px";
    $("divLoadImg").style.left = tw + "px";
}
function CloseLoadImg() {//关闭提示框
    if ($("divLoadImg") != null) { $("divLoadImg").remove(); }
    if ($("frmImgBg") != null) { $("frmImgBg").remove(); }
}

var FMouseX = null, FMouseY = null; var FMoveable = true; var FMoveStart = false; var ophr = null;
var FSpeed = document.all ? 10 : 20;
function FloatDiv() { }
FloatDiv.prototype = {
    _VersionInfo: "Version:1.3.2;作者: 任维",
    name: "", //属性 命名新实例的名称，例如， var objFloat = new FloatDiv(); objFloat.name="objFloat";
    moveable: true, //属性 是否允许移动
    dialog: true, //属性 是否有模式对话框
    showbg: true, //属性 是否显示半透明背景
    showclose: true, //属性 是否显示关闭的按钮
    mode: "html", //属性 显示内容为html还是frame
    closemode: true, //属性 关闭模式为动画还是直接关闭
    closedparent: false, //属性 关闭按钮点击关闭后，是否执行父级页面的函数
    width: "280", //属性 层宽度
    height: "90", //属性 层高度
    title: "", //属性 层标题
    align: "center", //属性 当mode为html时显示内容的水平位置
    valign: "middle", //属性 当mode为html时显示内容的垂直位置
    content: "", //属性 当mode为html时的内容
    url: "", //属性 当mode为frame时的地址链接
    shining: function () {//浮动层的标题栏闪烁效果
        var tim = 0;
        var hs = window.setInterval(function () {
            tim++;
            if (tim % 2 == 0)
                $("trShine").className = 'tdc';
            else
                $("trShine").className = 'thc';
            if (tim == 5)
                window.clearInterval(hs);
        }, 80);
    },
    close: function () {//关闭浮动层，带有动画效果, 第一个参数表示是否有返回值，第二个参数表示指定的返回值
        if ($("frmBg") != null) {
            $("frmBg").hide();
        }

        if (this.closemode) {
            var hh = 0;
            var fliter = 100;
            var th = parseInt($("divF").style.top);
            var clhf = window.setInterval(function () {
                fliter -= 10;
                hh += 5;
                $("divF").setStyle({ opacity: (fliter / 100) });
                $("divF").style.top = th - hh + "px";
                if (fliter == 20) {
                    $("frmCenter").src = "";
                    window.clearInterval(clhf);
                    $("divF").hide();
                    $("divF").setStyle({ opacity: 100 });
                }
            }, FSpeed);
        }
        else {
            $("frmCenter").src = "";
            $("divF").hide();
            $("divF").setStyle({ opacity: 100 });
        }

        if (document.all) {
            document.detachEvent("onmouseover", this.drag);
        }
        else {
            document.removeEventListener("mouseover", this.drag, false);
        }
        //$("divF").style.zIndex = "101";
        CloseLoadImg();

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

    drag: function (e) {
        e = window.event || e;
        var w = $("divF").getWidth();
        var h = $("divF").getHeight();
        var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
        var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
        var LayerLeft = parseInt($("divF").style.left);
        var LayerTop = parseInt($("divF").style.top);
        if (FMouseX == null || FMouseY == null) { return; }
        if (FMoveStart) {
            var ll = e.clientX - FMouseX;
            var tt = e.clientY - FMouseY;
            if (ll <= 0)
                ll = 0;
            if (tt <= 0)
                tt = 0;
            if (ll + w >= dw)
                ll = dw - w;
            if (tt + h >= dh)
                tt = dh - h;
            $("divF").style.left = ll + "px"; $("divF").style.top = tt + "px"
        }
    },

    open: function () {
        if (ophr != null)
            window.clearInterval(ophr);

        document.onmousemove = "";
        CloseLoadImg();
        FMoveable = this.moveable;
        if (this.dialog) {
            if (this.showbg != null) {
                if ($("frmBg") == null) {
                    var frm = document.createElement("IFRAME");
                    frm.id = "frmBg";
                    frm.name = "frmBg";
                    frm.frameBorder = 0;
                    document.body.appendChild(frm);
                    var strHtm = "<html>\r\n";
                    strHtm += "<head>\r\n";
                    strHtm += "<scr" + "ipt type=\"text/javas" + "cript\">\r\n";
                    strHtm += "window.onload = function(){\r\n";
                    strHtm += "document.onmousedown = function(){parent.objFloatDiv.shining();}\r\n";
                    strHtm += "}\r\n";
                    strHtm += "</scr" + "ipt>\r\n";
                    strHtm += "</head>\r\n";
                    strHtm += "<body oncontextmenu='return false' style='background:#000;'>\r\n";
                    strHtm += "</body>\r\n";
                    strHtm += "</html>";
                    window.frmBg.document.writeln(strHtm);
                    window.frmBg.document.close();
                }
                else
                    $("frmBg").show();
                $("frmBg").className = this.showbg ? "OpBg" : "OpBgNone";
            }
        }
        $("tdFme").style.width = this.width + "px";
        if (!this.moveable) {
            $("thFloatTitle").style.cursor = "default";
            $("thFloatCloseTitle").style.cursor = "default";
        }
        else {
            $("thFloatTitle").style.cursor = "";
            $("thFloatCloseTitle").style.cursor = "";
        }

        if (this.title == null) {
            $("trShine").hide();
        }
        else {
            $("spnFloatTitle").innerHTML = this.title;
        }

        if (this.showclose)
            $("divFloatCloseImg").show();
        else
            $("divFloatCloseImg").hide();

        var objthis = this;
        if (this.closedparent) {
            $("divFloatCloseImg").onclick = function () { objthis.close(true); };
        }
        else {
            $("divFloatCloseImg").onclick = function () { objthis.close(); };
        }

        $("tdFloatContent").style.height = this.height + "px";
        if (this.mode == "html") {
            $("tdFloatContent").align = this.align;
            $("tdFloatContent").valign = this.valign;
            $("frmCenter").hide();
            $("divFloatContent").show();
            $("divFloatContent").innerHTML = this.content;
            $("divFloatContent").style.height = this.height + "px";
            $("divFloatContent").style.overflow = "auto";
            $("divFloatContent").style.width = this.width + "px";
        }
        else if (this.mode == "frame") {
            $("tdFloatContent").align = "center";
            $("tdFloatContent").valign = "top";
            $("divFloatContent").hide();
            $("frmCenter").show();
        }

        if (this.mode == "frame")
            LoadImg(false);

        var w = $("divF").getWidth();
        var h = $("divF").getHeight();
        var dh = document.all ? document.body.offsetHeight : document.viewport.getHeight();
        var dw = document.all ? document.body.offsetWidth : document.viewport.getWidth();
        var th = (parseInt((dh - (h + 22)) / 2) - 20)
        th = th < 10 ? 10 : th;
        th += document.documentElement.scrollTop;
        var tw = parseInt((dw - w) / 2) < 0 ? 0 : parseInt((dw - w) / 2)
        var hh = 40;
        $("divF").style.top = th - hh + "px";
        $("divF").style.left = tw + "px";

        var nMax = 101;
        $$("div.DivFloat").each(function (d) {
            if (parseInt(d.style.zIndex) > nMax) {
                nMax = parseInt(d.style.zIndex);
            }
        })
        $("divF").style.zIndex = (nMax + 1);

        var fliter = 20;
        $("divF").setStyle({ opacity: (fliter / 100) });
        $("divF").show();
        $("divF").focus();

        var linkurl = this.url;
        var thismode = this.mode;
        ophr = window.setInterval(function () {
            fliter += 10;
            hh -= 5;
            $("divF").setStyle({ opacity: (fliter / 100) });
            $("divF").style.top = th - hh + "px";
            if (fliter == 100) {
                $("divF").setStyle({ opacity: (100) });
                if (thismode == "frame") {
                    var rnd = Math.random();
                    if (linkurl.include("?")) {
                        var arrPara = linkurl.split("?");
                        $("frmCenter").src = arrPara[0] + "?random=" + rnd + "&" + arrPara[1];
                    }
                    else {
                        $("frmCenter").src = linkurl + "?random=" + rnd;
                    }
                }
                window.clearInterval(ophr);
            }
        }, FSpeed);

        $("trShine").onmousedown = function (e) {
            if (FMoveable) { FMoveStart = true; }
            var nMX = 101;
            $$("div.DivFloat").each(function (d) {
                if (parseInt(d.style.zIndex) > nMX) {
                    nMX = parseInt(d.style.zIndex);
                }
            });
            $("divF").style.zIndex = (nMX + 1);
            e = window.event || e;
            FMouseX = e.clientX - parseInt($("divF").style.left);
            FMouseY = e.clientY - parseInt($("divF").style.top);
            if (this.setCapture)
                this.setCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        $("trShine").onmouseup = function (e) {
            FMoveStart = false;
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

//succ是否显示成功，back关闭后是否触发事件，msg失败后作为显示信息，成功时可以不传，也可以作为成功后的返回值
function ShowAlert(succ, back, msg, value, w, h) {
    w = w == null ? "450" : w;
    h = h == null ? "120" : h;
    objFloatDiv = new FloatDiv();
    objFloatDiv.name = "objFloatDiv";
    objFloatDiv.showclose = false;
    objFloatDiv.width = w;
    objFloatDiv.height = h;
    objFloatDiv.title = "系统提示";
    var classN = succ == "0" ? "class='imgWarn imgAlert'" : (succ ? "class='imgWarn imgRight'" : "class='imgWarn imgError'");
    var close = back ? "objFloatDiv.close(true,'" + value + "')" : "objFloatDiv.close()";
    var mess = msg == null ? "<span class='fGreen f14 fBold'>操作成功!</span>" : (succ ? "<span class='fGreen f14 fBold'>" + msg + "</span>" : "<span class='fRed f14 fBold'>" + msg + "</span>");
    var html = "<table border='0' cellspacing='0' cellpadding='4'><tr><td><img border='0' src='/Images/no.gif' " + classN + " alt=''/></td><td style='width:260px; white-space:normal' align='left'>" + mess + "</td></tr>";
    html += "<tr><td align='center' colspan='2'><input type='submit' value='确  认' class='btn1' id='btnClose' onclick=\"" + close + ";return false;\"/></td></tr></table>";
    objFloatDiv.content = html;
    objFloatDiv.open();
}
//active代表哪个按钮执行动作，0确认按钮，1取消按钮，2都执行动作(此时value值分0,1,以区分动作)，3不执行任何动作
//msg显示需要确认的信息, succ当操作成功时显示Right.gif，默认Alert.gif, value成功时需要返回的值
function ShowConfirm(active, msg, succ, value, w, h) {
    w = w == null ? "450" : w;
    h = h == null ? "120" : h;
    objFloatDiv = new FloatDiv();
    objFloatDiv.name = "objFloatDiv";
    objFloatDiv.showclose = false;
    objFloatDiv.width = w;
    objFloatDiv.height = h;
    objFloatDiv.title = "系统提示";
    var classN = succ ? "class='imgWarn imgRight'" : "class='imgWarn imgAlert'";
    var close0 = "objFloatDiv.close()";
    var close1 = "objFloatDiv.close()";
    switch (active) {
        case 0:
            close0 = "objFloatDiv.close(true,'" + value + "')";
            break;
        case 1:
            close1 = "objFloatDiv.close(true,'" + value + "')";
            break;
        case 2:
            close0 = "objFloatDiv.close(true,'0')";
            close1 = "objFloatDiv.close(true,'1')";
            break;
        case 3:
            break;
    }
    var html = "<table border='0' cellspacing='0' cellpadding='4'><tr><td><img border='0' src='/Images/no.gif' " + classN + " alt=''/></td><td style='width:260px; white-space:normal' align='left'><span class='f14 fBold'>" + msg + "</span></td></tr>";
    html += "<tr><td align='center' colspan='2'><input type='button' value='确认操作' class='btn1' id='btnOK' onclick=\"" + close0 + "\"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='取消操作' class='btn1' id='btnClose' onclick=\"" + close1 + "\"/></td></tr></table>";
    objFloatDiv.content = html;
    objFloatDiv.open();
}

var strFloatHtm = "<div id='divF' class='DivFloat' style='display:none;'><table border='0' cellspacing='0' cellpadding='0' id='tdFme' class='FTable'><tr class='thc' id='trShine'>";
strFloatHtm += "<th id='thFloatTitle' height='30' align='left'><span id='spnFloatTitle'></span></th><th width='10%' id='thFloatCloseTitle'>";
strFloatHtm += "<div class='icodiv ico11' style='float:right; margin-right:4px;' id='divFloatCloseImg'></div>";
strFloatHtm += "</th></tr>";
strFloatHtm += "<tr><td id='tdFloatContent' align='center' valign='top' colspan='2'><div id='divFloatContent' style='overflow:auto;'></div><iframe scrolling='auto' style='border:0px; width:100%;height:100%' frameborder='0' id='frmCenter' onload='CloseLoadImg()'></iframe></td></tr>";
strFloatHtm += "</table></div>";

document.writeln(strFloatHtm);
var objFloatDiv = new FloatDiv();
