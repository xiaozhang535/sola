var DropClick = null;
var InputClick = null;
function OpenDropList(e, html, width, ct, dmc) {//显示Combox的下拉列表，指定对象，下拉列表内容及列表宽度
    DropClick = ct;
    InputClick = e;
    if ($("divDropList") != null) {
        $("divDropList").remove();
    }
    var divDrop = document.createElement("DIV");
    divDrop.id = "divDropList";
    divDrop.className = "divDList";
    document.body.appendChild(divDrop);
    $("divDropList").innerHTML = "<div id='divCons'></div>";
    $("divDropList").style.display = "none";
    $("divCons").innerHTML = html;
    var ap = getXY(e);
    $("divDropList").style.width = width != null ? width + "px" : (ap[2] + 2) + "px";

    var intX = ap[0];
    var allX = document.viewport.getWidth();
    var w = $("divDropList").getWidth();
    if ((intX + w) > allX) {
        //intX = intX - w + ap[2] + 2;
        intX = allX - w;
    }
    $("divDropList").style.left = intX + "px";

    var objt = ap[1] + ap[3] + 3;
    var objh = $("divDropList").getHeight();
    if ((objt + objh > document.documentElement.scrollHeight) && (objh < ap[1])) {//上翻
        $("divDropList").style.top = (ap[1] - 3 - objh) + "px";
    }
    else {//下翻
        $("divDropList").style.top = objt + "px";
    }

    $("divCons").style.width = ($("divDropList").getWidth() - 4) + "px";
    $("divCons").style.height = ($("divDropList").getHeight() - 2) + "px";
    RelaxList(dmc);
}
function RelaxList(dm) {//展开下拉列表的动画效果
    dm = (dm == null ? true : dm);
    $("divDropList").style.height = "auto";
    if (dm) {
        var divh = $("divDropList").getHeight();
        $("divDropList").style.height = "1px";
        $("divDropList").show();
        var hh = 6;
        var ow = window.setInterval(function () {
            var th = $("divDropList").getHeight() + hh;
            if (document.all)
                hh += 6;
            else
                hh += 3;
            if (th >= divh) {
                th = divh;
                window.clearInterval(ow);
            }
            $("divDropList").style.height = th + 2 + "px";
        }, 10);
    }
    else {
        $("divDropList").show();
    }
}

function CloseDrop(e) {
    if (e == true) {
        $("divDropList").hide();
        return;
    }
    var obj = arguments[0];
    if ($("divDropList") != null && obj != null) {
        if ($("divDropList").style.display != "none" && obj != DropClick && obj != InputClick) {
            while (true) {
                if (obj.tagName == "BODY") {
                    $("divDropList").hide();
                    break;
                }
                else {
                    if (obj.id == "divDropList") {
                        break;
                    }
                    else
                        obj = obj.parentNode;
                }
            }
        }
    }
} //当失去焦点是隐藏下拉列表

function SelectOption(id, val, text) {
    $(id).value = val;
    $(id + "Text").style.color = "#000000";
    $(id + "Text").value = text;
    $("divDropList").hide();
}

function DropSelected(id, val) {
    var arra = new Array();
    eval("arra = arr" + id);
    $(id).value = val;
    for (var i = 0; i < arra.length; i++) {
        var arr = arra[i].split(',');
        if ($(id).value == arr[2]) {
            $(id + "Text").value = arr[1];
            break;
        }
    }
}


var arrDropTemp = null;
function DefautOpiton(id) {
    var arra = $("ul" + id).getElementsByTagName("a");
    for (var i = 0; i < arra.length; i++) {
        if ($(id).value == arra[i].getAttribute("text")) {
            arra[i].className = "sa";
            break;
        }
    }
}

function SelectOp() {
    if ($$("a.sa").length > 0)
        $$("a.sa")[0].className = "";
}


function searchitem(e, ev) {
    var evt = window.event || ev;
    var keyCode = evt.keyCode;
    var id = e.id.replace("Text", "");
    if (keyCode == 8 && e.value.empty()) {
        $(id).value = "";
        if ($("divDropList") != null)
            $("divDropList").hide();
    }
    if (keyCode == 13 || keyCode == 38 || keyCode == 40 || keyCode == 8)
        return;

    var str = "<script>arrDropTemp = arr" + id + ";</script>";
    str.evalScripts();
    var arr = new Array();
    arrDropTemp.each(function (d) {
        var sar = d.split(',');
        var vv = e.value.toUpperCase();
        if (!e.value.strip().empty() && (sar[0].startsWith(vv) || sar[0].include("&nbsp;" + vv))) {
            arr.push(d);
            if (arr.length > 8)
                throw $break;
        }
    });
    arrDropTemp = arr;
    if (arrDropTemp.length > 0) {
        var str = "<script>Show" + id + "($('" + e.id + "'), arrDropTemp, false);</script>";
        str.evalScripts();
    }
    else {
        if ($("divDropList") != null)
            $("divDropList").hide();
    }
}


function selectitem(e, ev) {
    var evt = window.event || ev;
    var keyCode = evt.keyCode;
    if (keyCode != 38 && keyCode != 40 && keyCode != 13 && keyCode != 9) { return; }
    var id = e.id.replace("Text", "");
    var list = $("ul" + id);
    var selectli = $$("a.sa");
    var chd = list.getElementsByTagName("a");
    if (selectli.length == 0) {
        chd[0].className = "sa";
    }
    else {
        for (var i = 0; i < chd.length; i++) {
            if (chd[i] == selectli[0]) {
                break;
            }
        }
    }
    if (keyCode == 40) {
        if (chd.length - 1 > i) {
            selectli[0].className = "";
            chd[i + 1].className = "sa";
        }
    }
    else if (keyCode == 38) {
        if (i > 0) {
            selectli[0].className = "";
            chd[i - 1].className = "sa";
        }
    }
    else if (keyCode == 13 || keyCode == 9) {
        if (document.all) {
            evt.keyCode = 9;
            selectli[0].click();
        }
        else {
            eval(selectli[0].getAttribute("onclick"));
        }
    }
}

function CloseDropDown(e) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;
    CloseDrop(srcElement);
}

if (document.all)
    document.attachEvent("onclick", CloseDropDown);
else
    document.addEventListener("click", CloseDropDown, true);