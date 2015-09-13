
window.onload = function () {
    if ($("txtQuestion") != null) {
        $("txtQuestion").onfocus = function () { inputfocus(this) }
        $("txtQuestion").onblur = function () { inputblur(this) }
        inputonload($("txtQuestion"));
    }
}

function ChangeIt(e, type) {
    var val = e.value;
    var txt = $(e.id + "Text").value;
    $$("span.spblock").each(function (d) {
        if (d.id.startsWith("spn" + type)) {
            d.innerHTML = txt;
            d.setAttribute("text", val);
        }
    });
}

function SetClickIt(e) {
    var group = e.getAttribute("FaqClassType");
    $$("span[FaqClassType='" + group + "']").each(function (d) {
        d.className = "spblock NoS";
    });
    e.className = "spblock Sel";

    OnQuery(1);
}

function OnQuery(mode) {
    if (mode == 1) {
        $("txtQuestion").value = "";
    }

    var url = "FaqList.php?Question=" + ($("txtQuestion").value == $("txtQuestion").getAttribute("msg") ? "" : encodeURIComponent($("txtQuestion").value));
    $$("span[FaqClassType='faq']").each(function (d) {
        if (d.className == "spblock Sel") url += "&ClassID=" + d.getAttribute("index");
    });

    LinkUrl(url, null, "get");
//    window.location.href = url;
}

function ShowSetting(e) {
    SetBack(e, "OnQuery(0)");
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.mode = "frame";
    objFloat.closemode = false;
    objFloat.title = "提问";
    objFloat.url = "/Faq/Question.php";
    objFloat.width = "700";
    objFloat.height = "260";
    objFloat.open();
}

function OnKeyWordChange()
{
    if ($("dropKeyWords")) {
        if ($("dropKeyWords").value != "选择关键字...") {
            $("txtQuestion").value = $("dropKeyWords").value;
            OnQuery(0);
        }
        else {
            $("txtQuestion").value = "输入关键字...";
            $("txtQuestion").style.color = "#ADADAD";
        }
    }
    $("dropKeyWords").style.color = "#ADADAD";
}