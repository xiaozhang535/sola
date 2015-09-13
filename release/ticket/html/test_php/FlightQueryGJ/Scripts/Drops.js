function DropClass() { }
DropClass.prototype = {
    _VersionInfo: "Version:1.0;作者: 任维",
    NewName: "", //属性 命名新实例的名称，例如， var objFloat = new FloatDiv(); objFloat.name="objFloat";
    FixedObject: null, //需要定位的控件
    ClickObject: null, //点击触发的控件
    InputObject: null, //存入值的控件
    ShowPage: false, //是否显示分页
    Align: "left", //显示浮动层的位置
    Title: "", //是否有标题，无标题则不显示头部
    OnChange: "", //是否有触发改变事件
    IsSearch: true, //如果是Input text，是否支持数组内查询

    Widths: 240, //列表模式下层的总宽度
    RightTextWidths: 80, //列表模式下当有两个文本时，第二个文本的宽度
    AjaxUrl: "", //请求的服务器路径 例如: "Ordermanage/GetList.php?Action=GetInfo&Value=", 最后的参数必须以=号结尾， 应该是想下面 Content 格式，AjaxUrl和Content不能同时指定！
    Content: new Array(), //列表模式下内容数组,3个元素认为是链接，2个元素不是 new Array("北京^PEK", "香港^HKG") new Array("北京~beijing^PEK", "香港~hongkong^HKG")  new Array("我的订单^连接^blank", "我的订单^连接^blank")

    TabWidths: 460, //TAB页形式下，层的总宽度
    TabItemWidth: 50, //每个元素的宽度，而不是每个tab页的宽度
    TabList: new Array(), //tab页数组  new Array("国内热门", "国际热门", "亚洲");
    TabContent: new Array(), //每个tab页内的内容数组，3个元素认为是链接，2个元素不是  new Array("北京^PEK;上海^SHA;广州^CAN", "香港^HKG;澳门^MFM;台北^TSA")

    GetY: function () {//定位Y坐标
        var obj = this.FixedObject;
        if (obj != null) {
            var y = obj.offsetTop;
            while (obj = obj.offsetParent) y += obj.offsetTop;
            return y;
        }
        else { return 0; }
    },
    GetX: function () {//定位X坐标
        var obj = this.FixedObject;
        if (obj != null) {
            var x = obj.offsetLeft;
            while (obj = obj.offsetParent) x += obj.offsetLeft;
            return x;
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
                if (obj.id == "divDropsLayer") {
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

        var docW = document.documentElement.scrollWidth;
        var docH = document.documentElement.scrollHeight;

        var DorpLayer = document.getElementById("divDropsLayer");
        DorpLayer.style.display = "block";

        var thew = DorpLayer.offsetWidth;
        var theh = DorpLayer.offsetHeight;

        var pdh = 1; //与底部间距
        var LT = top + this.FixedObject.offsetHeight + pdh;
        if (LT + theh > docH) {
            DorpLayer.style.top = (top - theh - pdh) + "px";
        }
        else {
            DorpLayer.style.top = LT + "px";
        }

        var left = this.GetX() - 1;
        var fw = this.FixedObject.offsetWidth;
        if (this.Align.toLowerCase() == "center") {
            left += parseInt((fw - thew) / 2);
        }
        else if (this.Align.toLowerCase() == "right") {
            left = left + fw - thew - 4;
        }

        if (left + thew > docW) {
            DorpLayer.style.left = (docW - thew - 15) + "px";
        }
        else {
            DorpLayer.style.left = left + "px";
        }
    },
    CreateDiv: function () {//创建浮动层
        if (document.getElementById("divDropsLayer") == null) {
            var fd = document.createElement("DIV");
            fd.id = "divDropsLayer";
            fd.className = "DivFloat";
            fd.style.zIndex = 8;
            fd.style.padding = "1px";
            fd.style.display = "none";
            var strHtm = "<table border='0' cellspacing='0' cellpadding='0' id='tdFme' class='FTable' width='100%'>";
            strHtm += "<tr id='trDropTitle'><th height='18' align='left'' class='thc' style='cursor:default;'>";
            strHtm += "<span id='tdDropTitle'></span>";
            strHtm += "</th></tr>";
            strHtm += "<tr><td align='left' valign='top' id='tdDropContent'>";
            strHtm += "</td></tr>";
            strHtm += "<tr id='trDropPage'><td id='tdDropPage' style='padding-top:0px;'>";
            strHtm += "</td></tr>";
            strHtm += "</table>";
            fd.innerHTML = strHtm;
            document.body.appendChild(fd);
        }
    },
    Close: function (e) {//关闭浮动层
        var objLayer = document.getElementById("divDropsLayer");
        if (e == true) {
            objLayer.style.display = "none";
            return;
        }
        var obj = arguments[0];
        if (objLayer != null && obj != null) {
            if (objLayer.style.display != "none" && obj != this.ClickObject && obj != this.FixedObject && obj != this.InputObject && !this.Include(obj)) {
                objLayer.style.display = "none";
            }
        }
    },
    ItemOver: function () {
        var obj = arguments[0];
        if (obj.className != "sa")
            obj.className = "ov";
    },
    ItemOut: function () {
        var obj = arguments[0];
        if (obj.className != "sa")
            obj.className = "";
    },
    SelectTab: function () {//热门城市选择Tab页
        var arrNode = arguments[0].parentNode.childNodes;
        var arrPNode = arguments[0].parentNode.parentNode.childNodes;
        for (var j = 1; j < arrPNode.length; j++) {
            arrPNode[j].style.display = "none";
        }
        for (var i = 0; i < arrNode.length; i++) {
            arrNode[i].className = '';
            if (arrNode[i] == arguments[0]) {
                arrPNode[i + 1].style.display = "";
            }
        }
        arguments[0].className = "lis";
    },
    KeyDown: function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (key != 37 && key != 38 && key != 39 && key != 40 && key != 13 && key != 9) { return; }
        var chd = document.getElementById("ulDP").childNodes;
        for (var i = 0; i < chd.length; i++) {
            if (chd[i].className == "sa") {
                break;
            }
        }
        if (key == 40) {
            chd[i].className = "";
            var thechd;
            if (chd.length - 1 > i)
                thechd = chd[i + 1];
            else
                thechd = chd[0];
            thechd.className = "sa";
            this.SelectItem(thechd);
        }
        else if (key == 38) {
            chd[i].className = "";
            var thechd;
            if (i > 0)
                thechd = chd[i - 1];
            else
                thechd = chd[chd.length - 1];
            thechd.className = "sa";
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
            if (document.getElementById("liDP") != null) {
                var arrNode = document.getElementById("liDP").childNodes;
                for (var i = 0; i < arrNode.length; i++) {
                    if (arrNode[i].className == "sa")
                        break;
                }

                var p = (arrNode.length > 5 ? i : (i + 1));

                if (key == 37 && i > 0)
                    this.Page(p - 1);
                if (key == 39 && i < arrNode.length - 1)
                    this.Page(p + 1);
                e.keyCode = 39;
            }
        }
    },
    KeyUp: function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (key != 37 && key != 38 && key != 39 && key != 40 && key != 13 && key != 9) {
            this.InputObject.removeAttribute("code");
            this.ScanDrop();
        }
    },
    SelectItem: function () {//选择一个城市
        var d = arguments[0];
        if (this.InputObject.tagName.toLowerCase() == "input") {
            var arrTxt = d.getAttribute("text").split("-");
            this.InputObject.value = arrTxt[0];
            this.InputObject.style.color = "#000000";
        }
        else {
            var arrTxt = d.getAttribute("text").split("-");
            this.InputObject.innerHTML = arrTxt[0];
        }
        this.InputObject.setAttribute("code", d.getAttribute("code"));
        if (this.OnChange != "") {
            eval(this.OnChange.replace(/this/g, this.NewName + ".InputObject"));
        }
        if (arguments.length == 2)
            this.Close(true);
    },
    Page: function () {
        var tp = arguments[0];
        if (document.getElementById("ulDP" + (tp - 1)) == null) return;
        document.getElementById("ulDP").innerHTML = document.getElementById("ulDP" + (tp - 1)).innerHTML;
        var arrNode = document.getElementById("liDP").childNodes;

        if (arrNode.length > 5) {
            for (var i = 0; i < arrNode.length; i++) {
                arrNode[i].className = '';
                arrNode[i].style.display = "none";
            }
            var count = arrNode.length - 2;

            if (tp < count - 2) {
                document.getElementById("labdroppage_next").style.display = "";
                document.getElementById("labdroppage_next").innerHTML = "<u onclick=\"" + this.NewName + ".Page(" + (tp + 1) + ")\">>></u>";
            }

            if (tp > 3) {
                document.getElementById("labdroppage_prev").style.display = "";
                document.getElementById("labdroppage_prev").innerHTML = "<u onclick=\"" + this.NewName + ".Page(" + (tp - 1) + ")\"><<</u>";
            }

            var fp = 0;
            var lp = 0;
            if (tp - 1 <= 0 || tp - 2 <= 0) { fp = 1; lp = 5; }
            else if (tp + 1 >= count || tp + 2 >= count) { fp = count - 5; lp = count; }
            else { fp = tp - 2; lp = tp + 2; }

            for (var j = fp; j < lp + 1; j++) {
                document.getElementById("labdroppage_" + j).style.display = "";
            }
        }
        else {
            for (var i = 0; i < arrNode.length; i++) {
                arrNode[i].className = '';
            }
        }

        document.getElementById("labdroppage_" + tp).className = "sa";
    },
    ScanDrop: function () {
        document.getElementById("divDropsLayer").style.width = this.Widths + "px";
        document.getElementById("tdDropContent").style.height = "auto";
        var strHtm = "";
        var x = 0;
        var y = 0;
        var val = "";
        if (this.InputObject.tagName.toLowerCase() == "input") {
            val = this.InputObject.value.toLowerCase();
        }

        if (this.Title != "") {
            document.getElementById("trDropTitle").style.display = "";
            document.getElementById("tdDropTitle").innerHTML = this.Title;
        }
        else {
            document.getElementById("trDropTitle").style.display = "none";
        }

        if (!this.AjaxUrl.empty()) {
            var arrurl = this.AjaxUrl.split('?');
            var para = arrurl[1] + this.InputObject.value;
            var strvalue = "";
            new Ajax.Request(
            arrurl[0],
            {
                method: "post",
                asynchronous: false,
                parameters: para,
                onFailure: function () {
                    strvalue = "获取列表失败!^";
                },
                onSuccess: function (transport) {
                    var content = transport.responseText;
                    if (content.startsWith("OK|")) {
                        strvalue = content.substr(3);
                    }
                    else {
                        strvalue = content + "^";
                    }
                }
            });

            this.Content = strvalue.split('|');
        }

        strHtm = "<ul class='ulList' id='ulDP' style='width:" + this.Widths + "px'></ul>";
        strHtm += "<ul id='ulDP0' style='display:none'>";
        for (var i = 0; i < this.Content.length; i++) {
            var arrIt = this.Content[i].split('^');
            var txts = arrIt[0].split("~");

            if (val != "" && this.IsSearch) {
                if (arrIt[0].toLowerCase().indexOf(val) >= 0 || arrIt[1].indexOf(val) >= 0) { } else { continue; }
            }

            var onew = this.Widths - 18;
            var leftw = onew - this.RightTextWidths - 9;

            if (arrIt.length > 2) {//此时表示是连接，可以传空值，如不传，不是连接
                strHtm += "<li onclick='" + this.NewName + ".Close(true)'><a href='" + arrIt[1] + "' target='" + arrIt[2] + "'>";
            }
            else {
                var isselect = (x == 0 ? "class='sa'" : "");
                if (this.InputObject.getAttribute("code") != null) {
                    isselect = (this.InputObject.getAttribute("code") == arrIt[1] ? "class='sa'" : "");
                }
                strHtm += "<li onclick='" + this.NewName + ".SelectItem(this,true)' code=\"" + arrIt[1] + "\" text=\"" + txts[0] + "\" onmouseover='" + this.NewName + ".ItemOver(this)'  onmouseout='" + this.NewName + ".ItemOut(this)' " + isselect + ">";
            }

            if (txts.length == 1) {
                strHtm += "<span style='width:" + onew + "px'>" + arrIt[0] + "</span>";
            }
            else {
                strHtm += "<span style='width:" + leftw + "px'>" + txts[0] + "</span><font style='width:" + this.RightTextWidths + "px'>" + txts[1] + "</font>";
            }

            strHtm += (arrIt.length > 2) ? "</a></li>" : "</li>";

            x++;

            if (x == 10)//显示10条
            {
                if (this.ShowPage) {
                    y++;
                    strHtm += "</ul>";
                    strHtm += "<ul id='ulDP" + y + "' style='display:none'>";
                    x = 0;
                }
            }
        }
        strHtm += "</ul>";

        y = (x == 0 ? y : y + 1);

        document.getElementById("tdDropContent").innerHTML = strHtm;

        if (this.ShowPage) {
            var strPage = "";
            if (y > 1) {
                strPage = "<ul class='ulList' style='width:" + this.Widths + "px'><li id='liDP' style='width:" + this.Widths + "px; text-align:center'>";
                if (y > 5) {
                    strPage += "<label id='labdroppage_prev' style='display:none'></label>";
                    for (var j = 0; j < y; j++) {
                        var pc = (j == 0 ? "class='sa'" : "");
                        var no = (j > 4 ? " style='display:none'" : "");
                        var pg = (j + 1);
                        strPage += "<label " + pc + no + " onclick='" + this.NewName + ".Page(" + pg + ")' id='labdroppage_" + pg + "'>" + pg + "</label>";
                    }
                    strPage += "<label id='labdroppage_next'><u onclick='" + this.NewName + ".Page(2)'>>></u></label>";
                }
                else {
                    for (var j = 0; j < y; j++) {
                        var pc = (j == 0 ? "class='sa'" : "");
                        var pg = (j + 1);
                        strPage += "<label " + pc + " onclick='" + this.NewName + ".Page(" + pg + ")' id='labdroppage_" + pg + "'>" + pg + "</label>";
                    }
                }
                strPage += "</li></ul>";
                document.getElementById("tdDropContent").style.height = "225px";
                document.getElementById("trDropPage").style.display = "";
                document.getElementById("tdDropPage").innerHTML = strPage;
            }
            else {
                document.getElementById("trDropPage").style.display = "none";
                document.getElementById("tdDropContent").style.height = "auto";
            }

        }
        else {
            document.getElementById("trDropPage").style.display = "none";
            document.getElementById("ulDP").style.height = "auto";
            if (x >= 10)//显示10条
            {
                document.getElementById("ulDP").style.height = "220px";
            }
        }

        if (document.getElementById("ulDP0").innerHTML == "") { document.getElementById("ulDP0").innerHTML = "<li>未找到符合的结果！</li>"; }

        document.getElementById("ulDP").innerHTML = document.getElementById("ulDP0").innerHTML;
    },
    ShowList: function () {//列表方式显示热门城市
        this.ScanDrop();
        this.SetXY();
    },
    ShowTab: function () {//Tab页方式显示城市
        document.getElementById("divDropsLayer").style.width = this.TabWidths + "px";
        if (this.Title != "") {
            document.getElementById("trDropTitle").style.display = "";
            document.getElementById("tdDropTitle").innerHTML = this.Title;
        }
        else {
            document.getElementById("trDropTitle").style.display = "none";
        }
        var strHtm = "";
        if (this.TabList.length > 0) {
            strHtm += "<ul class='Tab1'>";
            for (var j = 0; j < this.TabList.length; j++) {
                var clslis = (j == 0 ? " class='lis'" : "");
                strHtm += "<li" + clslis + " onclick='" + this.NewName + ".SelectTab(this)' style='margin-left:4px;'><span>" + this.TabList[j] + "</span></li>";
            }
            strHtm += "</ul>";
        }

        for (var i = 0; i < this.TabContent.length; i++) {
            var arrTab = this.TabContent[i].split(';');
            var clsdis = (i > 0 ? " display:none;" : "");
            strHtm += "<ul class='ulItem' style='width:" + this.TabWidths + "px; " + clsdis + "'>";
            for (var x = 0; x < arrTab.length; x++) {
                var arrIt = arrTab[x].split('^');
                if (arrIt.length > 2) {//此时表示是连接，可以传空值，如不传，不是连接
                    strHtm += "<li onclick='" + this.NewName + ".Close(true)'><a href='" + arrIt[1] + "' style='width:" + this.TabItemWidth + "px' target='" + arrIt[2] + "'>" + arrIt[0] + "</a></li>";
                }
                else {
                    strHtm += "<li onclick='" + this.NewName + ".SelectItem(this,true)' code=\"" + arrIt[1] + "\" text=\"" + arrIt[0] + "\"><a href='javascript:void(0)' style='width:" + this.TabItemWidth + "px'>" + arrIt[0] + "</a></li>";
                }
            }
            strHtm += "</ul>";
        }

        document.getElementById("tdDropContent").style.height = "auto";
        document.getElementById("tdDropContent").innerHTML = strHtm;

        if (this.ShowPage) {
            document.getElementById("trDropPage").style.display = "";
            document.getElementById("tdDropPage").innerHTML = "";
        }
        else {
            document.getElementById("trDropPage").style.display = "none";
        }
        this.SetXY();
    }
}

var objDrops = new DropClass();
objDrops.NewName = "objDrops";
objDrops.CreateDiv();

function CloseDrops(e) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;
    objDrops.Close(srcElement);
}

if (document.all)
    document.attachEvent("onclick", CloseDrops);
else
    document.addEventListener("click", CloseDrops, true);
   
 
