function AjaxInput() { }
AjaxInput.prototype = {
    _VersionInfo: "Version:1.0;作者: 任维",
    NewName: "", //属性 命名新实例的名称，例如， var objFloat = new FloatDiv(); objFloat.name="objFloat";
    AjaxUrl: "", //请求的服务器路径
    AjaxPara: "", //请求的参数
    ClickObject: null, //被点击的控件
    InputObject: null, //需要输入的文本框
    GetY: function () {//定位Y坐标
        var obj = this.InputObject;
        if (obj != null) {
            var y = obj.offsetTop;
            while (obj = obj.offsetParent) y += obj.offsetTop;
            return y;
        }
        else { return 0; }
    },

    GetX: function () {//定位X坐标
        var obj = this.InputObject;
        if (obj != null) {
            var y = obj.offsetLeft;
            while (obj = obj.offsetParent) y += obj.offsetLeft;
            return y;
        }
        else { return 0; }
    },

    Include: function () {//关闭时判断点击的元素是不是在浮动层内
        var obj = arguments[0];
        var Inc = false;
        while (true) {
            if (obj.tagName == "BODY")
                break;
            else {
                if (obj.id == "divAjaxLayer") {
                    Inc = true;
                    break;
                }
                else
                    obj = obj.parentNode;
            }
        }
        return Inc;
    },

    SetXY: function () {//定位浮动层位置
        var top = this.GetY();
        var left = this.GetX();
        $("divAjaxLayer").style.top = top + this.InputObject.clientHeight + 2 + "px";
        $("divAjaxLayer").style.left = left + "px";
    },

    CreateDiv: function () {//创建浮动层
        if ($("divAjaxLayer") == null) {
            var fd = document.createElement("DIV");
            fd.id = "divAjaxLayer";
            fd.className = "DivFloat";
            fd.style.zIndex = 8;
            fd.style.padding = "1px";
            var strHtm = "<table border='0' cellspacing='0' cellpadding='0' id='tdFme' class='FTable' width='240'>";
            strHtm += "<tr><th height='18' align='left'' class='thc' style='cursor:default;'>";
            strHtm += "<span id='tdTitle'></span>";
            strHtm += "</th></tr>";
            strHtm += "<tr><td align='left' valign='top' id='tdAjaxContent'>";
            strHtm += "</td></tr>";
            strHtm += "<tr><td id='tdAjaxPage' style='padding-top:0px;'>";
            strHtm += "</td></tr>";
            strHtm += "</table>";
            fd.innerHTML = strHtm;
            document.body.appendChild(fd);
            $("divAjaxLayer").hide();
        }
    },

    Close: function (e) {//关闭浮动层
        var objLayer = $("divAjaxLayer");
        if (e == true) {
            objLayer.style.display = "none";
            return;
        }
        var obj = arguments[0];
        if (objLayer != null && obj != null) {
            if (objLayer.style.display != "none" && obj != this.ClickObject && obj != this.InputObject && !this.Include(obj)) {
                objLayer.style.display = "none";
            }
        }
    },

    ItemOver: function () {
        var obj = arguments[0];
        obj.className = "ov";
    },

    ItemOut: function () {
        var obj = arguments[0];
        if (obj.getAttribute("cls") == "sa")
            obj.className = "sa";
        else
            obj.className = "";
    },

    KeyDown: function (e) {
        e = window.event || e;
        var key = e.keyCode;
        if (key != 37 && key != 38 && key != 39 && key != 40 && key != 13 && key != 9) { return; }
        var chd = $("ulCT").childNodes;
        for (var i = 0; i < chd.length; i++) {
            if (chd[i].className == "sa") {
                break;
            }
        }
        if (key == 40) {
            chd[i].className = "";
            chd[i].setAttribute("cls", "");
            var thechd;
            if (chd.length - 1 > i)
                thechd = chd[i + 1];
            else
                thechd = chd[0];
            thechd.className = "sa";
            thechd.setAttribute("cls", "sa");
            this.SelectItem(thechd);
        }
        else if (key == 38) {
            chd[i].className = "";
            chd[i].setAttribute("cls", "");
            var thechd;
            if (i > 0)
                thechd = chd[i - 1];
            else
                thechd = chd[chd.length - 1];
            thechd.className = "sa";
            thechd.setAttribute("cls", "sa");
            this.SelectItem(thechd);
        }
        else if (key == 13 || key == 9) {
            if (document.all) {
                e.keyCode = 9;
                this.SelectItem(chd[i], true);
            }
            else {
                this.SelectItem(chd[i], true);
            }
        }
        else if (key == 37 || key == 39) {
            if ($("liCP") != null) {
                var arrNode = $("liCP").childNodes;
                for (var i = 0; i < arrNode.length; i++) {
                    if (arrNode[i].className == "sa")
                        break;
                }
                if (key == 37 && i > 0)
                    this.Page(i - 1);
                if (key == 39 && i < arrNode.length - 1)
                    this.Page(i + 1);
                e.keyCode = 39;
            }
        }
    },

    KeyUp: function (e) {
        e = window.event || e;
        var key = e.keyCode;
        if (key != 37 && key != 38 && key != 39 && key != 40 && key != 13 && key != 9)
            this.ScanAjax();
    },

    SelectItem: function () {//选择一个城市
        var d = arguments[0];
        this.InputObject.value = d.getAttribute("text");
        $(this.InputObject.id + "0").value = d.getAttribute("code");
        this.InputObject.style.color = "#000000";
        if (arguments.length == 2)
            this.Close(true);
    },

    Page: function () {
        $("ulCT").innerHTML = $("ulCT" + arguments[0]).innerHTML;
        var arrNode = $("liCP").childNodes;
        for (var i = 0; i < arrNode.length; i++) {
            arrNode[i].className = '';
        }
        arrNode[arguments[0]].className = "sa";
    },

    ScanAjax: function () {
        var strHtm = "";
        var x = 0;
        var y = 0;
        var val = this.InputObject.value.toLowerCase();
        if (val == "") {
            $("tdTitle").innerHTML = "";
            $("tdAjaxContent").innerHTML = "";
            $("tdAjaxPage").innerHTML = "";
            this.Close(true);
        }
        else {
            $("divAjaxLayer").show();
            $("tdTitle").innerHTML = this.InputObject.value;
            strHtm = "<ul class='ulList' id='ulCT'></ul>";
            strHtm += "<ul id='ulCT0' style='display:none'>";
            var serurl = this.AjaxUrl;
            var para = this.AjaxPara + this.InputObject.value;
            var newname = this.NewName;
            new Ajax.Request(
            serurl,
            {
                method: "post",
                asynchronous: false,
                parameters: para,
                onFailure: function () {
                    strHtm += "<li><span>获取列表失败!</span></li>";
                },
                onSuccess: function (transport) {
                    var content = transport.responseText;
                    if (content.startsWith("OK|")) {
                        var AjaxList = content.substr(3).split('|');
                        for (var i = 0; i < AjaxList.length; i++) {
                            var arrIt = AjaxList[i].split(',');
                            var isselect = x == 0 ? "cls='sa' class='sa'" : "";
                            strHtm += "<li onclick='" + newname + ".SelectItem(this,true)' code=\"" + arrIt[0] + "\" text=\"" + arrIt[1] + "\" onmouseover='" + newname + ".ItemOver(this)'  onmouseout='" + newname + ".ItemOut(this)' " + isselect + "><span>" + arrIt[2] + "</span></li>";
                            x++;
                            if (x == 10)//显示10条
                            {
                                y++;
                                strHtm += "</ul>";
                                strHtm += "<ul id='ulCT" + y + "' style='display:none'>";
                                x = 0;
                            }
                        }
                    }
                    else {
                        strHtm += "<li><span>" + content + "</span></li>";
                    }
                }
            });

            strHtm += "</ul>";
            $("tdAjaxContent").style.height = "240px";
            $("tdAjaxContent").innerHTML = strHtm;
            var strPage = "";
            if (y > 0) {
                strPage = "<ul class='ulList'><li style='text-align:center' id='liCP'>";
                for (var j = 0; j < (y + 1); j++) {
                    var pc = j == 0 ? "class='sa'" : "";
                    strPage += "<label " + pc + " onclick='" + newname + ".Page(" + j + ")'>" + (j + 1) + "</label>";
                }
                strPage += "</li></ul>";
            }
            $("tdAjaxPage").innerHTML = strPage;
            $("ulCT").innerHTML = $("ulCT0").innerHTML;
        }
    },

    ShowListHot: function () {//列表方式显示热门城市
        this.InputObject = arguments[0];
        this.ClickObject = (arguments.length == 1) ? arguments[0] : arguments[1];
        this.CreateDiv();
        this.SetXY();
    }
}

var objAjax = new AjaxInput();
objAjax.NewName = "objAjax";

function CloseAjax(e) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;
    objAjax.Close(srcElement);
}

if (document.all)
    document.attachEvent("onclick", CloseAjax);
else
    document.addEventListener("click", CloseAjax, true);
   
 