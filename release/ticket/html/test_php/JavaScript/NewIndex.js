window.onload = function () {//首页提示语，显示IP，所在城市
    if (document.readyState == 'complete') {
        CheckRadio($("bGJDouble"));
        inputonload($("txtGJDeparture"));
        inputonload($("txtGJArrival"));

        CheckRadio($("bJDNone"));
        inputonload($("txtJDDeparture"));
        inputonload($("txtJDArrival"));

        if ($("ulPnr") != null) {
            $("ulPnr").childElements().each(function (d, index) { d.onclick = function () { SltPnr(this, index); } });
        }

        $$("input.txtpnr").each(function (d) {
            d.onkeyup = function () {
                d.value = d.value.strip().replace(/[^A-Za-z0-9]/g, "");
            }
        });

        if ($("txtPNRData") != null && !$("txtPNRData").value.empty()) {
            $("divPNRData").hide();
            $("txtPNRData").show();
        }

        if ($("txtVoyData") != null && !$("txtVoyData").value.empty()) {
            $("divVoyData").hide();
            $("txtVoyData").show();
        }
    }
}

function ForCarrier(e) {
    var objDrop = $("dropCarrierCode");
    if (e.value.empty() || e.value.length == 1) {
        objDrop.options[0].selected = "selected";
    }
    else {
        var strCarrierCode = e.value.toUpperCase();
        var objOption;
        for (var i = 1; i < objDrop.length; i++) {//先删除所有元素
            objOption = objDrop.options[i];
            if (objOption.value.startsWith(strCarrierCode)) {
                objOption.selected = "selected";
                break;
            }
        }
    }
}

//航空公司触发改变舱位
function ChangeCarrier(e, none) {
    $("txtCarrier").value = $("dropCarrierCode").getValue();
}

function SltPnr(e, d) {
    $("ulPnr").childElements().each(function (d) { d.className = ""; });
    e.className = "li0";
    var arrDiv = $("tdPnr").childElements();
    arrDiv.each(function (d) { d.hide(); });
    arrDiv[d].show();
}

function FloatMsg(msg) {
    objFloatDiv = new FloatDiv();
    objFloatDiv.name = "objFloatDiv";
    objFloatDiv.title = null;
    objFloatDiv.content = "<div style='padding-top:14px'><img src='/Images/loading.gif' alt='' /> <b class='fGreen f14'>" + msg + "</b></div>";
    objFloatDiv.width = "320";
    objFloatDiv.height = "60";
    objFloatDiv.open(true);
}

function GetGJPNRInfo() {
    var pnr = $("txtGJPNR").value.strip().replace(/[^A-Za-z0-9]/g, "");
    if (pnr.length != 6) {
        alert("请输入6位PNR编码！");
        return;
    }
    var para = "Action=ExistPnr&InternationalPNR=" + pnr;

     new Ajax.Request(
    "/OrderManage/GjPnrInput.php",
    {
        method: "post",
        parameters: para,
        onFailure: function () {
            alert("请输入6位PNR编码！");
            objFloatDiv.close();
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (content == "OK") {
                if (confirm("该PNR已经在系统中存在，您确定要再次录入此订单吗？")) {
                    FloatMsg("正在分析编码...");
                    window.location.href = "/OrderManage/GjPnrInputView.php?InternationalPNR=" + pnr + "&CompanyID=" + $("hidCompanyID").value + "&role=xss";
                }
//                else {
//                    window.location.href = "/OrderManage/GJOrderPNRInputEntryNew.php?disptype=pnrinput&role=xss";
//                }
            }
            else {
                FloatMsg("正在分析编码...");
                window.location.href = "/OrderManage/GjPnrInputView.php?InternationalPNR=" + pnr + "&CompanyID=" + $("hidCompanyID").value + "&role=xss";
            }
        }
    });
}

function GetGJPNRDataInfo() {
    var pnrData = $("txtPNRData").value.strip();
    if (pnrData == null) {
        alert("请输入复制的PNR编码完整信息！");
        return;
    }
    var para = "Action=ExistPnr&PnrData=" + encodeURIComponent(pnrData);

    new Ajax.Request(
    ServiceUrl(),
    {
         method: "post",
         parameters: para,
         onFailure: function () {
             try { parent.ShowAlert(false, false, "数据异常."); } catch (e) { }
         },
         onSuccess: function (transport) {
             var content = transport.responseText;
             if (content == "OK") {
                 if (confirm("该PNR已经在系统中存在，您确定要再次录入此订单吗？")) {
                    FloatMsg("正在分析编码...");
                    LinkUrl("/OrderManage/GjPnrInputView.php?PNRData=" + encodeURIComponent(pnrData) + "&CompanyID=" + $("hidCompanyID").value + "&role=xss", null, "post");
                 }
             }
             else {
                FloatMsg("正在分析编码...");
                LinkUrl("/OrderManage/GjPnrInputView.php?PNRData=" + encodeURIComponent(pnrData) + "&CompanyID=" + $("hidCompanyID").value + "&role=xss", null, "post");
             }
         }
    });
}

function CalFocus(e, ev, d) {
    CloseDrops(ev);
    MyCalendar = new L_calendar();
    MyCalendar.NewName = "MyCalendar";
    if (d != null) {
        MyCalendar.StartDay = d.value;
    }
    MyCalendar.SetDate(e, e, true, false);
}

function CheckRadio(e) {
    var group = e.getAttribute("group");
    var cancel = true;
    if (group == "radu" || group == "rchd") {
        if (e.className.include("slt")) {
            cancel = false;
        }
    }

    $$("b[group='" + group + "']").each(function (d) {
        d.className = "";
    });
    if (cancel) {
        e.className = "slt";
    }

    if (group == "rgjvoyage") {
        if (e.innerHTML.include("往返")) {
            $("spnGJArrTime").className = "";
            $("txtGJArrTime").disabled = "";
        } else {
            $("spnGJArrTime").className = "distxt";
            $("txtGJArrTime").disabled = "disabled";
        }
    }

    if (group == "rgnvoyage") {
        if (e.innerHTML == "往返") {
            $("spnGNArrTime").className = "";
            $("txtGNArrTime").disabled = "";
        } else {
            $("spnGNArrTime").className = "distxt";
            $("txtGNArrTime").disabled = "disabled";
        }
    }
}

function ShowCount(e) {
    objDrops = new DropClass();
    objDrops.NewName = "objDrops";
    objDrops.FixedObject = e;
    objDrops.ClickObject = e;
    objDrops.InputObject = $("spnCount");
    objDrops.TabWidths = 60;
    objDrops.TabItemWidth = 10;
    objDrops.TabContent = new Array("1^1;2^2;3^3;4^4;5^5;6^6;7^7;8^8;9^9");
    objDrops.ShowTab();
}

function IntTxtFocus(e, ev) {
    inputfocus(e);
    objDrops = new DropClass();
    objDrops.NewName = "objDrops";
    objDrops.Title = "国内及国际热门城市";
    objDrops.FixedObject = e;
    objDrops.ClickObject = e;
    objDrops.InputObject = e;
    objDrops.Widths = 400;
    objDrops.TabWidths = 425;
    objDrops.TabItemWidth = 75;
    objDrops.ShowPage = true;
    objDrops.IsSearch = false;
    objDrops.AjaxUrl = "/FlightQueryGJ/GJFlightQueryEntry.php?Action=GetInfo&Info=";
//    objDrops.Content = GJCityList;

    if (e.id == "txtGJDeparture") {
        objDrops.TabContent = InTabCity;
        objDrops.TabList = InTab;
    }
    else {
        var NewTab = InTab.slice(0);
        var SecT = NewTab.splice(1, 1);
        NewTab.unshift(SecT[0]);

        var NewTabCity = InTabCity.slice(0);
        var SecC = NewTabCity.splice(1, 1);
        NewTabCity.unshift(SecC[0]);

        objDrops.TabContent = NewTabCity;
        objDrops.TabList = NewTab;
    }
    objDrops.ShowTab();


    e.onblur = function () {
        inputblur(e);
        CloseDrops(ev);
    }

    e.onkeydown = function () {
        objDrops.KeyDown(ev);
    }

    e.onkeyup = function () {
//        e.value = e.value.replace(/[^A-Za-z0-9\(\)\u4E00-\u9FA5]/g, "");
        objDrops.KeyUp(ev);
    }
}

function SubmitGJForm() {
    var departCode = ($("txtGJDeparture").getAttribute("code") == null ? "" : $("txtGJDeparture").getAttribute("code"));  //获取离开城市三字码
    var arrivalCode = ($("txtGJArrival").getAttribute("code") == null ? "" : $("txtGJArrival").getAttribute("code")); //获取到达城市三字码
    var departDate = $("txtGJDepTime").value.strip(); //获取航班离开日期
    var backDate = $("txtGJArrTime").value.strip(); //获取航班返回日期
    var passType = "101"; //乘客类型
    var passCount = $("spnCount").innerHTML; //乘客人数

    var voyageType = "";   //航程类型
    var berthType = "";   //舱位类型


    $$("b.slt").each(function (d) {
        var group = d.getAttribute("group");
        switch (group) {
            case "rgjvoyage":
                voyageType = d.getAttribute("mode");
                break;
            case "rberth":
                berthType = d.getAttribute("mode");
                break;
        }
    });

    if (!departCode.empty()) {
        departCode = departCode.strip();
        if (departCode.match("^[a-zA-Z]{3}$") == null) {
            alert("请选择出港城市！");
            $("txtGJDeparture").focus();
            return false;
        }
    } else {
        alert("请选择出港城市！");
        $("txtGJDeparture").focus();
        return false;
    }

    if (!departCode.empty()) {
        arrivalCode = arrivalCode.strip();
        if (arrivalCode.match("^[a-zA-Z]{3}$") == null) {
            alert("请选择到港城市！");
            $("txtGJArrival").focus();
            return false;
        }
    } else {
        alert("请选择到港城市！");
        $("txtGJArrival").focus();
        return false;
    }

    if (departCode == arrivalCode) {
        alert("出发和到达城市不能相同！");
        $("txtGJArrival").focus();
        return false;
    }

    if (voyageType == "2" && departDate > backDate) {
        alert("航班回程日期必须大于航班去程日期！");
        $("txtGJArrTime").focus();
        return false;
    }

    FloatMsg("正在为您努力的查询，大概需要15秒钟...<br/><span id='spnTime'>00:00:00</span>");
    TimeSpanRun();
    //跳转地址加参数
    var url = "FlightQueryGJ/GJFlightQuery.php?Action=OnVoyageLoad&departCode=" + departCode + "&arrivalCode=" + arrivalCode + "&departDate=" + departDate + "&backDate=" + backDate + "&voyageType=" + voyageType + "&berthType=" + berthType + "&passType=" + passType + "&passCount=" + passCount;

    $("txtGJDeparture").value = "";
    $("txtGJArrival").value = "";

    LinkUrl(url);
    return false;
}

function SubmitJDForm() {
    var departCode = ($("txtJDDeparture").getAttribute("code") == null ? "" : $("txtJDDeparture").getAttribute("code"));  //获取离开城市三字码
    var arrivalCode = ($("txtJDArrival").getAttribute("code") == null ? "" : $("txtJDArrival").getAttribute("code")); //获取到达城市三字码
    var departDate = $("txtJDBegin").value.strip(); //获取航班离开日期
    var backDate = $("txtJDEnd").value.strip(); //获取航班返回日期
    var voyageType = "";   //航程类型
    var carrierCode = $("dropCarrierCode").getValue();

    $$("b.slt").each(function (d) {
        var group = d.getAttribute("group");
        switch (group) {
            case "rjdvoyage":
                voyageType = d.getAttribute("mode");
                break;
        }
    });

    if (!departCode.empty()) {
        departCode = departCode.strip();
        if (departCode.match("^[a-zA-Z]{3}$") == null) {
            alert("请选择出港城市！");
            $("txtJDDeparture").focus();
            return false;
        }
    }

    if (!arrivalCode.empty()) {
        arrivalCode = arrivalCode.strip();
        if (arrivalCode.match("^[a-zA-Z]{3}$") == null) {
            alert("请选择到港城市！");
            $("txtJDArrival").focus();
            return false;
        }
    }

    if (departCode == arrivalCode && !departCode.empty()) {
        alert("出发和到达城市不能相同！");
        $("txtJDArrival").focus();
        return false;
    }

    if (voyageType == "RT" && departDate > backDate) {
        alert("航班回程日期必须大于航班去程日期！");
        $("txtJDEnd").focus();
        return false;
    }

    //跳转地址加参数
    var url = "PolicyManage/PolicyGJPriceViewList.php?disptype=jdpolicy";

    if (!departCode.empty()) {
        url += "&departCode=" + departCode;
    }
    if (!arrivalCode.empty()) {
        url += "&arrivalCode=" + arrivalCode;
    }
    if (!departDate.empty()) {
        url += "&departDate=" + departDate;
    }
    if (!backDate.empty()) {
        url += "&backDate=" + backDate;
    }
    if (!voyageType.strip().empty()) {
        url += "&voyageType=" + voyageType;
    }
    if (!carrierCode.empty()) {
        url += "&carrierCode=" + carrierCode;
    }

    $("txtJDDeparture").value = "";
    $("txtJDArrival").value = "";

    LinkUrl(url);
    return false;
}

var normalelapse = 1000;
var nextelapse = normalelapse;
var counter;
var startTime;
var hrtime = null;
// 开始运行   
function TimeSpanRun() {
    counter = 0;
    // 初始化开始时间   
    startTime = new Date().valueOf();
    // nextelapse是定时时间, 初始时为100毫秒   
    // 注意setInterval函数: 时间逝去nextelapse(毫秒)后, onTimer才开始执行   
    hrtime = window.setInterval("OnTimeSpan()", nextelapse);
}
// 停止运行   
function TimeSpanStop() {
    window.clearTimeout(hrtime);
}
// 倒计时函数   
function OnTimeSpan() {
    var d = $("spnTime");
    var hms = new String(d.innerHTML).split(":");
    if (hms.length == 3) {
        var s = new Number(hms[2]);
        var m = new Number(hms[1]);
        var h = new Number(hms[0]);
        s += 1;
        if (s > 59) {
            s = 00;
            m += 1;
        }
        if (m > 59) {
            m = 00;
            h += 1;
        }
        var ss = s < 10 ? ("0" + s) : s;
        var sm = m < 10 ? ("0" + m) : m;
        var sh = h < 10 ? ("0" + h) : h;
        d.innerHTML = sh + ":" + sm + ":" + ss;
        if (sm > 3 || sh > 0) {
            d.className = "fRed";
        }
    }

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

function GetGJPNRPolicyInfo() {
    var AduType = "";
    var ChdType = "";
    var pnrData = $("txtVoyData").value.strip();

    $$("b.slt").each(function (d) {
        var group = d.getAttribute("group");
        switch (group) {
            case "radu":
                AduType = d.getAttribute("mode");
                break;
            case "rchd":
                ChdType = d.getAttribute("mode");
                break;
        }
    });



    if (AduType == "") {
        alert("请选择成人类型！");
        return;
    }

    if (pnrData == "") {
        alert("请输入复制的PNR的航段信息！");
        return;
    }

    FloatMsg("正在为您获取价格...");

    //跳转地址加参数
    var url = "/OrderManage/GJPnrImportViewPolicy.php?disptype=importviewpolicy&role=&AduType=" + AduType + "&ChdType=" + ChdType + "&PnrData=" + encodeURIComponent(pnrData);

    LinkUrl(url);
    return false;
}

//function GetGNPNRInfo() {
//    var pnr = $("txtGNPNR").value.strip().replace(/[^A-Za-z0-9]/g, "");
//    if (pnr.length != 6) {
//        parent.ShowAlert(false, false, "请输入6位PNR编码！");
//        return;
//    }
//    try { parent.LoadImg(true, "正在加载数据") } catch (e) { }
//    window.location.href = "/OrderManage/OrderPNRInput.php?SmallPNR=" + pnr + "&CompanyID=" + $("hidCompanyID").value + "&hidRole=xss";
//}

//function SubmitGNForm() {
//    var departCode = $("txtGNDeparture0").value;  //获取离开城市三字码
//    var arrivalCode = $("txtGNArrival0").value; //获取到达城市三字码
//    var departDate = $("txtGNDepTime").value.strip(); //获取航班离开日期
//    var backDate = $("txtGNArrTime").value.strip(); //获取航班返回日期

//    var voyageType = "";   //航程类型


//    $$("b.slt").each(function (d) {
//        var group = d.getAttribute("group");
//        switch (group) {
//            case "rgnvoyage":
//                voyageType = d.getAttribute("mode");
//                break;
//        }
//    });

//    if (!departCode.empty()) {
//        departCode = departCode.strip();
//        if (departCode.match("^[a-zA-Z]{3}$") == null) {
//            alert("请选择出港城市！");
//            $("txtGNDeparture").focus();
//            return false;
//        }
//    } else {
//        alert("请选择出港城市！");
//        $("txtGNDeparture").focus();
//        return false;
//    }

//    if (!departCode.empty()) {
//        arrivalCode = arrivalCode.strip();
//        if (arrivalCode.match("^[a-zA-Z]{3}$") == null) {
//            alert("请选择到港城市！");
//            $("txtGNArrival").focus();
//            return false;
//        }
//    } else {
//        alert("请选择到港城市！");
//        $("txtGNArrival").focus();
//        return false;
//    }

//    if (departCode == arrivalCode) {
//        alert("出发和到达城市不能相同！");
//        $("txtGNArrival").focus();
//        return false;
//    }

//    if (voyageType == "2" && departDate > backDate) {
//        alert("航班回程日期必须大于航班去程日期！");
//        $("txtGNArrTime").focus();
//        return false;
//    }

//    objFloatDiv = new FloatDiv();
//    objFloatDiv.name = "objFloatDiv";
//    objFloatDiv.title = null;
//    objFloatDiv.content = "<div style='padding-top:14px'><img src='/Images/loading.gif' alt='' /> <b class='fGreen f14'>正在为您努力的查询...</b></div>";
//    objFloatDiv.width = "240";
//    objFloatDiv.height = "45";
//    objFloatDiv.open(true);

//    //跳转地址加参数
//    var url = "OrderManage/OrderFlightsQuery.php?Action=OnVoyageLoad&voyageType=" + voyageType + "&departCode=" + departCode + "&arrivalCode=" + arrivalCode + "&departDate=" + departDate + "&secondDate=" + backDate;

//    LinkUrl(url, null, "post");
//    return false;
//}