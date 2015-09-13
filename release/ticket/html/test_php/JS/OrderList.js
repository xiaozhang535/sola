var objTimer;

//所有文本框加入焦点方法
window.onload = function () {
    if ($("txtOrderID") != null) {
        $("txtOrderID").onfocus = function () { inputfocus(this) }
        $("txtOrderID").onblur = function () { inputblur(this) }
        inputonload($("txtOrderID"));
    }

    if ($("txtFlightNo") != null) {
        $("txtFlightNo").onfocus = function () { inputfocus(this) }
        $("txtFlightNo").onblur = function () { inputblur(this) }
        inputonload($("txtFlightNo"));
    }

    if ($("txtDealAccount") != null) {
        $("txtDealAccount").onfocus = function () { inputfocus(this) }
        $("txtDealAccount").onblur = function () { inputblur(this) }
        inputonload($("txtDealAccount"));
    }

    if ($("txtRelationID") != null) {
        $("txtRelationID").onfocus = function () { inputfocus(this) }
        $("txtRelationID").onblur = function () { inputblur(this) }
        inputonload($("txtRelationID"));
    }

    if ($("txtPNR") != null) {
        $("txtPNR").onfocus = function () { inputfocus(this) }
        $("txtPNR").onblur = function () { inputblur(this) }
        inputonload($("txtPNR"));
    }

    if ($("txtTicketNo") != null) {
        $("txtTicketNo").onfocus = function () { inputfocus(this) }
        $("txtTicketNo").onblur = function () { inputblur(this) }
        inputonload($("txtTicketNo"));
    }

    if ($("txtPassengerName") != null) {
        $("txtPassengerName").onfocus = function () { inputfocus(this) }
        $("txtPassengerName").onblur = function () { inputblur(this) }
        inputonload($("txtPassengerName"));
    }

    if ($("txtSalerCompanyName") != null) {
        $("txtSalerCompanyName").onfocus = function () { inputfocus(this) }
        $("txtSalerCompanyName").onblur = function () { inputblur(this) }
        inputonload($("txtSalerCompanyName"));
    }

    if ($("txtProviderName") != null) {
        $("txtProviderName").onfocus = function () { inputfocus(this) }
        $("txtProviderName").onblur = function () { inputblur(this) }
        inputonload($("txtProviderName"));
    }

    if ($("chkAutoRefresh") != null) {
        var strCookie = GetCookie("OrderListRefresh");

        if (strCookie == null) strCookie = "";

        var strKey = $("hidTabName").value + "=1";

        var index = strCookie.indexOf(strKey, 0);

        if (index > -1) {
            $("chkAutoRefresh").checked = true;

            var TimerValue = $("hidTimerValue").value;

            $("lblAutoRefresh").innerHTML = "自动刷新(" + TimerValue + ")";

            OnSetTimer();
        }
    }
    TimeSpanRun();
}
//按钮下拉
function MoreC(e, con, width) {
    var ap = getXY(e);
    var html = "<table border='0' cellspacing='0' cellpadding='0'>";
    html += "<tr>";
    html += "<td style='word-break: break-all; word-wrap:break-word; text-align:center; font-size:12px; line-height:20px; padding:4px;'>" + con + "</td>";
    html += "</tr>";
    html += "</table>";
    OpenDropList(e, html, width, e);
    $("divDropList").style.left = (ap[0] + 2) + "px";
}

function ChangeBg(e) {
    var nid = e.id.substr(7);
    $("trItem0" + nid).className = "trOver";
    $("trItem1" + nid).className = "trOver";
}

function RemoveBg(e) {
    var nid = e.id.substr(7);
    $("trItem0" + nid).className = $("trItem0" + nid).getAttribute("oldclass");
    $("trItem1" + nid).className = $("trItem1" + nid).getAttribute("oldclass");
}

function SubmitForm(role, type, order) {
    var IsVal = true;
    var para = "role=" + role + '&disptype=' + type + '&ordertype=' + order;
    if ($("txtOrderID")) {
        if ($("txtOrderID").value != "订单号...") {
            para += "&txtOrderID=" + encodeURIComponent($("txtOrderID").value);
        }
    }
    if ($("txtRelationID")) {
        if ($("txtRelationID").value != "相关单号...") {
            para += "&txtRelationID=" + encodeURIComponent($("txtRelationID").value);
        }
    }
    if ($("txtPNR")) {
        if ($("txtPNR").value != "PNR...") {
            para += "&txtPNR=" + encodeURIComponent($("txtPNR").value);
        }
    }
    if ($("txtTicketNo")) {
        if ($("txtTicketNo").value != "票号...") {
            para += "&txtTicketNo=" + encodeURIComponent($("txtTicketNo").value);
        }
    }
    if ($("txtDealAccount")) {
        if ($("txtDealAccount").value != "处理人...") {
            para += "&txtDealAccount=" + encodeURIComponent($("txtDealAccount").value);
        }
    }
     if ($("txtPassengerName")) {
        if ($("txtPassengerName").value != "乘客姓名...") {
            para += "&txtPassengerName=" + encodeURIComponent($("txtPassengerName").value);
        }
    }
    if ($("txtSalerCompanyName")) {
        if ($("txtSalerCompanyName").value != "分销商...") {
            para += "&txtSalerCompanyName=" + encodeURIComponent($("txtSalerCompanyName").value);
        }
    }
    if ($("txtProviderName")) {
        if ($("txtProviderName").value != "供应商...") {
            para += "&txtProviderName=" + encodeURIComponent($("txtProviderName").value);
        }
    }

    if ($("dropDealState")) {
        if ($("dropDealState").value != -1) {
            para += "&dropDealState=" + encodeURIComponent($("dropDealState").value);
        }
    }
    
     if ($("dropOrderType")) {
        if ($("dropOrderType").value != -1) {
            para += "&dropOrderType=" + encodeURIComponent($("dropOrderType").value);
        }
    }
    //创建方式
    if ($("dropCreateMode")) {
        if ($("dropCreateMode").value != -1) {
            para += "&dropCreateMode=" + encodeURIComponent($("dropCreateMode").value);
        }
    }
    if ($("dropOrderState")) {
        if ($("dropOrderState").value != -1) {
            para += "&dropOrderState=" + encodeURIComponent($("dropOrderState").value);
        }
    }
    if ($("dropOrderGJGN")) {
        if ($("dropOrderGJGN").value != -1) {
            para += "&dropOrderGJGN=" + encodeURIComponent($("dropOrderGJGN").value);
        }
    }
     if ($("dropBuyerPayState")) {
        if ($("dropBuyerPayState").value != -1) {
            para += "&dropbuyerpayState=" + encodeURIComponent($("dropBuyerPayState").value);
        }
    }
    if ($("dropProviderPayState")) {
        if ($("dropProviderPayState").value != -1) {
            para += "&dropproviderpayState=" + encodeURIComponent($("dropProviderPayState").value);
        }
    }
     if ($("dropStartTime")) {
        para += "&dropStartTime=" + encodeURIComponent($("dropStartTime").value);
    }
    if ($("dropEndTime")) {
        para += "&dropEndTime=" + encodeURIComponent($("dropEndTime").value);
    }
    if ($("dropDepartureTime")) {
        if ($("dropDepartureTime").value != "航班出发日期...") {
            para += "&dropDepartureTime=" + encodeURIComponent($("dropDepartureTime").value);
        }
    }
    if ($("dropRefundReason")) {
        if ($("dropRefundReason").value != -1) {
            para += "&dropRefundReason=" + encodeURIComponent($("dropRefundReason").value);
        }
    }

    if ($("dropEtdzUnit")) {
        if ($("dropEtdzUnit").value != -1) {
            para += "&dropEtdzUnit=" + encodeURIComponent($("dropEtdzUnit").value);
        }
    }
    if ($("dropStartTime") && $("dropEndTime")) {
        if ($("dropStartTime").value.replace(/-/g, "") > $("dropEndTime").value.replace(/-/g, "")) {
            try { parent.ShowAlert(false, false, "结束时间不能大于开始时间"); } catch (e) { }
            IsVal = false;
        }
    }
    if ($("txtFlightNo")) {
        if ($("txtFlightNo").value != "航班号...") {
            para += "&txtFlightNo=" + encodeURIComponent($("txtFlightNo").value);
        }
    }

    if ($("dropOrderClass")) {
        if ($("dropOrderClass").value != -1) {
            para += "&dropOrderClass=" + encodeURIComponent($("dropOrderClass").value);
        }
    }

    if ($("dropCarrier")) {
        if ($("dropCarrier").value != -1) {
            para += "&dropCarrier=" + encodeURIComponent($("dropCarrier").value);
        }
    }

    if ($("dropDeparture")) {
        if ($("dropDeparture").value != -1) {
            para += "&dropDeparture=" + encodeURIComponent($("dropDeparture").value);
        }
    }

    if ($("dropProviderType")) {
        if ($("dropProviderType").value != -1) {
            para += "&dropProviderType=" + encodeURIComponent($("dropProviderType").value);
        }
    }

    if ($("cxbIsMylock")) {
        para += "&cxbIsMylock=" + encodeURIComponent($("cxbIsMylock").checked);
    }

    if ($("cxbIsMyOrder")) {
        para += "&cxbIsMyOrder=" + encodeURIComponent($("cxbIsMyOrder").checked);
    }
    // alert(encodeURIComponent($("dropDeparture").checked));
    //        return;

    para += "&DelFlag=" + $("hidDelFlag").value;

    //para+="&Type="+$("hidType").value;

    para += "&IspostBack=1";

    if (IsVal) {
        LinkUrl("OrderList.php?" + para);
    }
}

function RefundAuditing(orderID, type, role) {
    LinkUrl("RefundOrderAuditing.php?orderID=" + orderID + "&Type=" + type + "&role=" + role);
}

function GJRefundAuditing(orderID, type, role) {
    LinkUrl("GJRefundOrderAuditing.php?orderID=" + orderID + "&Type=" + type + "&role=" + role);
}

function Clear() {
    if ($("txtOrderID")) {
        $("txtOrderID").value = "订单号...";
        $("txtOrderID").style.color = "#ADADAD";
    }

    if ($("txtFlightNo")) {
        $("txtFlightNo").value = "航班号...";
        $("txtFlightNo").style.color = "#ADADAD";
    }
    if ($("txtPNR")) {
        $("txtPNR").value = "PNR...";
        $("txtPNR").style.color = "#ADADAD";
    }
    if ($("txtTicketNo")) {
        $("txtTicketNo").value = "票号..."
        $("txtTicketNo").style.color = "#ADADAD";
    }
    if ($("txtPassengerName")) {
        $("txtPassengerName").value = "乘客姓名...";
        $("txtPassengerName").style.color = "#ADADAD";
    }
    if ($("txtSalerCompanyName")) {
        $("txtSalerCompanyName").value = "分销商...";
        $("txtSalerCompanyName").style.color = "#ADADAD";
    }
    if ($("txtRelationID")) {
        $("txtRelationID").value = "相关单号...";
        $("txtRelationID").style.color = "#ADADAD";
    }
    if ($("dropOrderType")) {
        $("dropOrderTypeText").style.color = "#ADADAD";
        $("dropOrderTypeText").value = "订单类型...";
    }
    if ($("dropOrderState")) {
        $("dropOrderStateText").style.color = "#ADADAD";
        $("dropOrderStateText").value = "订单状态...";
    }
    if ($("dropOrderGJGN")) {
        $("dropOrderGJGNText").style.color = "#ADADAD";
        $("dropOrderGJGNText").value = "国际国内...";
    }
     if ($("dropProviderType")) {
        $("dropProviderTypeText").style.color = "#ADADAD";
        $("dropProviderTypeText").value = "供应商类型...";
    }
    if ($("dropPayState")) {
        $("dropPayStateText").style.color = "#ADADAD";
        $("dropPayStateText").value = "支付状态...";
    }
    if ($("dropEtdzUnit")) {
        $("dropEtdzUnitText").style.color = "#ADADAD";
        $("dropEtdzUnitText").value = "出票单位...";
    }
    if ($("dropRefundReason")) {
        $("dropRefundReasonText").style.color = "#ADADAD";
        $("dropRefundReasonText").value = "退废原因...";
    }
    if ($("dropCreateMode")) {
        $("dropCreateModeText").style.color = "#ADADAD";
        $("dropCreateModeText").value = "创建方式...";
    }
    if ($("dropDealState")) {
        $("dropDealStateText").style.color = "#ADADAD";
        $("dropDealStateText").value = "处理状态...";
    }
    if ($("txtDealAccount")) {
        $("txtDealAccount").value = "处理人...";
        $("txtDealAccount").style.color = "#ADADAD";
    }
}

function ShowOrderLockTime(d, id) {
    var htm = [];
    htm.push("<ul>");
    htm.push("<li><a href='javascript:void(0)' onclick=\"UnLockTime('Normal', '" + id + "')\">解锁出票时间</a></li>");
    htm.push("<li><a href='javascript:void(0)' onclick=\"UnLockTime('Void', '" + id + "')\">解锁废票时间</a></li>");
    htm.push("<li><a href='javascript:void(0)' onclick=\"UnLockTime('Refund', '" + id + "')\">解锁退改时间</a></li>");
    htm.push("</ul>");
    MoreC(d, htm.join(''), 100);
}

function UnLockTime(act, id) {
    var para = "Action=UnLockTime&OrderID=" + id + "&Type=" + act;
    //Ajax提交表单元素
    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content == "OK") {
                    var msg = "延长";
                    switch (act) {
                        case "Normal":
                            msg += "出票时间";
                            break;
                        case "Void":
                            msg += "废票时间";
                            break;
                        case "Refund":
                            msg += "退改时间";
                            break;
                    }
                    msg += "15分钟, 请采购商重新提交尝试！";
                    try { parent.ShowAlert(true, false, msg); } catch (e) { }
                }
            }
        }
    });
}

function ShowOrderRefundDiv(e, OrderID, bVOID, role, BuyerID) {
    var html = "<ul>";
    if (bVOID == 1) {
        html += "<li><a href=RefundOrderApply.php?type=void&orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">废票</a></li>";
    }
    html += "<li><a href=RefundOrderApply.php?Type=refund&orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">退票</a></li>";
    html += "<li><a href=UpgradeOrderApply.php?orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">升舱</a></li>";
    html += "<li><a href=ResignOrderApply.php?orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">改签</a></li>";
    html += "<li><a href=RefundOrderApply.php?Type=Pricedifference&orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">差价退款</a></li>";
    html += "</ul>";
    MoreC(e, html, null);
}

function ShowGJOrderRefundDiv(e, OrderID, bVOID, role, BuyerID) {
    var html = "<ul>";
    if (bVOID == 1) {
        html += "<li><a href=GJRefundOrderApplyNew.php?type=void&orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">废票</a></li>";
    }
    html += "<li><a href=GJRefundOrderApplyNew.php?Type=refund&orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">退票审核</a></li>";
    html += "<li><a href=GJOrderChangeApply.php?orderID=" + OrderID + "&role=" + role + "&BuyerID=" + BuyerID + ">改期</a></li>";
    html += "</ul>";
    MoreC(e, html, null);
}

function ShowOrderRecordRefundDiv(e, OrderID, bVOID, IsGJ) {
    if (IsGJ == 1) {
        window.location.href = "GJRefundOrder.php?&OrderID=" + OrderID + "&role=yys";
    }
    else {
        window.location.href = "RefundOrderEx.php?&OrderID=" + OrderID + "&role=yys";
    }
//    var html = "<table width='100%' border='0' cellspacing='0' cellpadding='4' style='background:#FFFFCE;'>";

//    html += "<tr><td>";
//    if (IsGJ == 1) {
//        html += "◇<a class='fBold' href=\"GJRefundOrderApplyNew.php?Type=refund&orderID=" + OrderID + "&role=yys\">退票</a>";
//    }
//    else {
//        html += "◇<a class='fBold' href=\"RefundOrderEx.php?.php?Type=refund&orderID=" + OrderID + "&role=yys\">退票</a>";
//    }
//    html += "</td></tr>";
//    html += "<tr>";
//    if (IsGJ == 1) {
//        html += "<td><br>◇<a class='fBold' href=\"GJOrderChangeApply.php?orderID=" + OrderID + "&role=yys\">改期</a></td>";
//    }
//    else {
//        html += "<td><br>◇<a class='fBold' href=\"GJOrderChangeApply.php?orderID=" + OrderID + "&role=yys\">改期</a></td>";
//    }

//    html += "</tr>";
//    if (bVOID == 1) {
//        html += "<tr>";
//        if (IsGJ == 1) {
//            html += "<td><br>◇<a class='fBold' href=\"GJRefundOrderApplyNew.php?type=void&orderID=" + OrderID + "&role=yys\">废票</a></td>";
//        }
//        else {
//            html += "<td><br>◇<a class='fBold' href=\"GJRefundOrderApplyNew.php?type=void&orderID=" + OrderID + "&role=yys\">废票</a></td>";
//        }
//        html += "</tr>";
//    }
//    html += "</table>";
//    OpenDropList(e, html, 80);
}

function ShowChdPnr(d, OrderID, role) {
    SetBack(d, "OrderPayRedirect('" + role + "')");
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "400";
    objFloat.height = "100";
    objFloat.title = "请输入儿童编码";
    objFloat.mode = "frame";
    objFloat.url = "/OrderManage/Frame/ChdPnrInput.php?OrderId=" + OrderID + "&role=" + role;
    objFloat.open();
}

function ShowMem(d, OrderID,type) {
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "490";
    objFloat.height = "400";
    objFloat.title = "订单：" + OrderID + "（仅本公司可以看到）";
    objFloat.mode = "frame";
    if (type != "misc") {
        objFloat.url = "/OrderManage/Frame/OrderMem.php?OrderId=" + OrderID;
    }
    else {
        objFloat.url = "/OrderManage/Frame/OrderMemMISC.php?OrderId=" + OrderID;
    }
    objFloat.open();
}

function ShowRemark(d, OrderID,type) {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    SetBack(null, "ReloadForm()");
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "600";
    objFloat.height = "386";
    objFloat.title = "订单：" + OrderID + "（所有人可以看到）";
    objFloat.mode = "frame";
    if (type == "misc") {
        objFloat.url = "/OrderManage/Frame/OrderRemarkMISC.php?OrderId=" + OrderID;
    }
    else {
        objFloat.url = "/OrderManage/Frame/OrderRemark.php?OrderId=" + OrderID;
    }
    objFloat.open();
}

function SmsSend(d, OrderID, role) {
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "520";
    objFloat.height = "430";
    objFloat.title = "短息发送";
    objFloat.mode = "frame";
    objFloat.url = "/OrderManage/Frame/OrderSMSSend.php?OrderId=" + OrderID + "&role=" + role;
    objFloat.open();
}

function OrderPayRedirect(role) {
    var orderid = $("txtBack").value;
    window.location.href = "OrderPayDetail.php?OrderID=" + orderid + "&role=" + role + "&CrossPay=0&RequestUrl=pnrinput";
}

function ShowJBPrintDiv(e, OrderID, Pnr, PrintMode) {
    var tl = "none";
    var para = "Action=GetTicket&orderID=" + OrderID + "&pnr=" + Pnr + "&PrintMode=" + PrintMode; //如果文本框的值没有发生改变就不提交
    //Ajax提交表单元素
    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content != "") {
                    OpenDropList(e, content, 420);
                    //                $("divDropList").style.left = ($("divDropList").offsetLeft - (420 - getXY(e)[2])) + "px";
                }
            }
        }
    });
}

function ShowOrderPrintDiv(e, OrderID, Pnr) {
    window.location.href = "../JBManager/OrderformPrint.php?OrderID=" + OrderID;
}

function ShowBalancePrintDiv(e, OrderID, Pnr) {
    window.location.href = "../JBManager/OrderformPrint3.php?OrderID=" + OrderID;
}

function CopyPNRInfo(PNR) {
    window.clipboardData.setData("Text", PNR);
}

function GetPNRInfo(OrderID) {
    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }
    if (IsVal) {
        try { parent.LoadImg(false, "正在获取") } catch (e) { }
        var para = "Action=GetPNRInfo&OrderID=" + OrderID;
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "获取编码信息异常."); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content.startsWith('OK')) {
                        if (content.substring(3).blank() == false) {
                            ShowPNRInfo(content.substring(3));
                            try { parent.CloseLoadImg() } catch (e) { }
                        }
                        else {
                            try { parent.ShowAlert(false, false, "编码信息为空"); } catch (e) { }
                        }
                    }
                    else {
                        try { parent.ShowAlert(false, false, "没有获取到编码信息." + content.substring(3)); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

function ShowPNRInfo(strPNRInfo) {
    var html = "";
    html += "<textarea name=\"txtPNRInfo\" class='inputtext' rows=\"2\" cols=\"20\" readonly=\"readonly\" id=\"txtPNRInfo\" style=\"width: 600px; height:400px; color:#00FF00; background:#000000; font-size:14px\">" + strPNRInfo + "</textarea>";
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.title = "PNR信息";
    objFloat.content = html;
    objFloat.width = "600";
    objFloat.height = "403";
    objFloat.open();
}

function CancelOrder(OrderID, Role, IsXEPNR, ethis) {
    SetBack(ethis, "Command('" + OrderID + "','" + Role + "','" + IsXEPNR + "')");
    //alert(OrderID+"-"+Role+"-"+IsXEPNR+"-"+ethis);
    try { parent.ShowConfirm(0, "请确认是否删除此订单？", false); } catch (e) { }
}

function Command(OrderID, Role, IsXEPNR) {
    var IsVal = true;
    //alert("123");
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        var para = "Action=CancelOrder&OrderID=" + OrderID + "&role=" + Role + "&xepnr=" + IsXEPNR;
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "删除订单发生异常"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        window.location.href = thisUrl;
                        //try{parent.ShowAlert(true,true,"删除订单成功!");}catch(e){}
                    }
                    else {
                        try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}


function AuthPNR(OrderID) {
    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        var para = "Action=AuthPNR&OrderID=" + OrderID;
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "编码授权发生错误"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        window.location.href = thisUrl;
                        //try{parent.ShowAlert(true,true,"删除订单成功!");}catch(e){}
                    }
                    else {
                        try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

function OrderOver(OrderID) {
    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        var para = "Action=OrderOver&OrderID=" + OrderID;
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "设置完成状态发生错误"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        window.location.href = thisUrl;
                        //try{parent.ShowAlert(true,true,"删除订单成功!");}catch(e){}
                    }
                    else {
                        try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

function ReloadForm() {
    window.location.href = window.location.href;
}

//补录订单删除
function CancelRecordOrder(OrderID, Role,e) {
    if (confirm("请确认是否取消此订单？") == false)
        return;

    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        SetBack(e, "ReloadForm()");
        try { parent.LoadImg(true, "订单取消中") } catch (e) { }
        var para = "Action=CancelRecordOrder&OrderID=" + OrderID + "&role=" + Role
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "取消订单发生异常"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        try { parent.ShowAlert(true, true, "取消订单成功!"); } catch (e) { }
                    }
                    else {
                        try { parent.ShowAlert(false, false, content); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

//再次支付补录订单
function PayAgain(OrderID, Role, e) {

    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        SetBack(e, "ReloadForm()");
        try { parent.LoadImg(true, "订单支付中") } catch (e) { }
        var para = "Action=PayAgain&OrderID=" + OrderID + "&role=" + Role
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "订单支付时发生异常"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        try { parent.ShowAlert(true, true, "订单支付成功!"); } catch (e) { }
                    }
                    else {
                        try { parent.ShowAlert(false, false, content); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

//再次退款补录订单
function RefundAgain(OrderID, Role, e) {

    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        SetBack(e, "ReloadForm()");
        try { parent.LoadImg(true, "订单退款中") } catch (e) { }
        var para = "Action=RefundAgain&OrderID=" + OrderID + "&role=" + Role
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "订单退款时发生异常"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        try { parent.ShowAlert(true, true, "订单退款成功!"); } catch (e) { }
                    }
                    else {
                        try { parent.ShowAlert(false, false, content); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

function ETDZCancelApply(OrderID, Role) {
    if (confirm("请确认是否申请取消出票？") == false)
        return;

    var IsVal = true;
    if (OrderID.blank()) {
        try { parent.ShowAlert(false, false, "订单号不能为空!"); } catch (e) { }
        IsVal = false;
    }

    if (IsVal) {
        try { parent.LoadImg(true, "申请取消中") } catch (e) { }
        var para = "Action=ETDZCancelApply&OrderID=" + OrderID + "&role=" + Role
        new Ajax.Request(
		        ServiceUrl(),
        {
            method: "post",
            parameters: para,
            onFailure: function () {
                try { parent.ShowAlert(false, false, "申请取消订单发生异常"); } catch (e) { }
                $("btnSave").disabled = "";
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (Logout(content)) {
                    if (content == "OK") {
                        try { parent.ShowAlert(true, true, "申请取消订单成功!"); } catch (e) { }
                    } else {
                        try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                        $("btnSave").disabled = "";
                    }
                }
            }
        });
    }
}

function GetCompanyInfo(companyid, domain, t) {
    //try{parent.LoadImg(true,"获取公司信息")}catch(e){}
    var para = "Action=GetCompanyInfo&companyid=" + companyid + "&domain=" + domain;
    new Ajax.Request(
	        ServiceUrl(),
    {
        method: "post",
        asynchronous: false,
        parameters: para,
        onFailure: function () {
            try { parent.ShowAlert(false, false, "获取公司信息发生异常"); } catch (e) { }
            $("btnSave").disabled = "";
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content.startsWith("OK")) {
                    ShowCompanyInfo(t, content, domain, companyid);
                } else {
                    try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                    $("btnSave").disabled = "";
                }
            }
        }
    });
}

function ShowCompanyInfo(e, content, domain, companyid) {
    var objInfo = content.split("|")[1].evalJSON();
    var html = "<table id='tblContact' width='100%' border='0' cellspacing='0' cellpadding='4' style='background:#FFFFCE;'>";
    html += "<tr>";
    html += "<td width='60' align='right'><span class='fBold'>公司全称:</span></td>";
    html += "<td colspan='5'>" + objInfo.CompanyName + "(" + companyid + ")</td>";
    html += "<td width='35' align='right'><span class='fBold'>帐号:</span></td>";
    html += "<td width='90'>" + objInfo.Account + "</td>";
    html += "<td width='60' align='right'><a href='javascript:void(0);' id='aEdit' onclick='EditContactInfo()'>编辑</a><a href='javascript:void(0);' id='aSave' onclick=\"SaveContactInfo('" + domain + "', '" + companyid + "')\" style='display:none'>保存</a>&nbsp;&nbsp;<a href='javascript:void(0);' id='aCancel' onclick='CancelContactInfo()' style='display:none'>取消</a></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td align='right'><span class='fBold'>平台备注:</span></td>";
    html += "<td colspan='5'><span id='spnPlatformRemark'>" + (objInfo.PlatformRemark == "" || objInfo.PlatformRemark == null ? "-" : objInfo.PlatformRemark);
    html += "</span><input type='text' class='inputtext' style='width:352px;height:12px;display:none;' id='txtPlatformRemark'></td>";
    html += "<td align='right'><span class='fBold'>注册:</span></td>";
    html += "<td colspan='2'>" + objInfo.CreateTime + "</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td align='right'><span class='fBold'>联系人:</span></td>";
    html += "<td width='60'><span id='spnContact'>" + (objInfo.Contactor == "" || objInfo.Contactor == null ? "-" : objInfo.Contactor);
    html += "</span><input type='text' class='inputtext' style='width:50px;height:12px;display:none;' id='txtContact'></td>";

    html += "<td width='35' align='right'><span class='fBold'>手机:</span></td>";
    html += "<td width='90'><span id='spnMobile'>" + (objInfo.Mobile == "" || objInfo.Mobile == null ? "-" : objInfo.Mobile);
    html += "</span><input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtMobile'></td>";

    html += "<td width='35' align='right'><span class='fBold'>电话:</span></td>";
    html += "<td><span id='spnTel'>" + (objInfo.Tel == "" || objInfo.Tel == null ? "-" : objInfo.Tel);
    html += "</span><input type='text' class='inputtext' style='width:100px;height:12px;display:none;' id='txtTel'></td>";

    html += "<td width='35' align='right'><span class='fBold'>QQ:</span></td>";
    html += "<td colspan='2'><span id='spnQQ'>" + (objInfo.QQ == "" || objInfo.QQ == null ? "-" : objInfo.QQ);
    html += "</span><input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtQQ'></td>";
    html += "</tr>";
    var i = 0;
    if (objInfo.ContactInfoList.length > 0) {
        var objContactInfo;
        for (i = 0; i < objInfo.ContactInfoList.length; i++) {
            objContactInfo = objInfo.ContactInfoList[i];
            html += "<tr" + (objContactInfo.Mark == "1" ? " style='display:none;'" : "") + ">";
            html += "<td align='right'><span class='fBold'>联系人:</span></td>";
            html += "<td><span id='spnName" + i + "'>" + (objContactInfo.Name == "" || objContactInfo.Name == null ? "-" : objContactInfo.Name);
            html += "</span><input type='text' class='inputtext' style='width:50px;height:12px;display:none;' id='txtName" + i + "'></td>";

            html += "<td align='right'><span class='fBold'>手机:</span></td>";
            html += "<td><span id='spnMobile" + i + "'>" + (objContactInfo.Mobile == "" || objContactInfo.Mobile == null ? "-" : objContactInfo.Mobile);
            html += "</span><input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtMobile" + i + "'></td>";

            html += "<td align='right'><span class='fBold'>电话:</span></td>";
            html += "<td><span id='spnTel" + i + "'>" + (objContactInfo.Tel == "" || objContactInfo.Tel == null ? "-" : objContactInfo.Tel);
            html += "</span><input type='text' class='inputtext' style='width:100px;height:12px;display:none;' id='txtTel" + i + "'></td>";

            html += "<td align='right'><span class='fBold'>QQ:</span></td>";
            html += "<td><span id='spnQQ" + i + "'>" + (objContactInfo.QQ == "" || objContactInfo.QQ == null ? "-" : objContactInfo.QQ);
            html += "</span><input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtQQ" + i + "'></td>";

            //            html += "<td align='right'><span class='fBold'>说明:</span></td>";
            if (objContactInfo.Mark == "" || objContactInfo.Mark == null) {
                html += "<td><span id='spnMark" + i + "'>-</span>";
            } else if (objContactInfo.Mark == "0") {
                html += "<td><span id='spnMark" + i + "'>出票联系人</span>";
            } else if (objContactInfo.Mark == "1") {
                html += "<td><span id='spnMark" + i + "'>政策联系人</span>";
            } else if (objContactInfo.Mark == "2") {
                html += "<td><span id='spnMark" + i + "'>紧急联系人</span>";
            } else if (objContactInfo.Mark == "3") {
                html += "<td><span id='spnMark" + i + "'>业务联系人</span>";
            } else if (objContactInfo.Mark == "4") {
                html += "<td><span id='spnMark" + i + "'>财务联系人</span>";
            } else if (objContactInfo.Mark == "5") {
                html += "<td><span id='spnMark" + i + "'>公司联系人</span>";
            }
            html += "<select id='slcMark" + i + "' style='width: 90px;height:20px;display:none;'><option value='0' selected='selected'>出票联系人</option><option value='1'>政策联系人</option><option value='2'>紧急联系人</option><option value='3'>业务联系人</option><option value='4'>财务联系人</option><option value='5'>公司联系人</option></select></td>";
            html += "</tr>";
        }
    }

    html += "<tr>";
    html += "<td align='right'><span class='fBold'>联系人:</span></td>";
    html += "<td><span id='spnName" + i + "'>-</span>";
    html += "<input type='text' class='inputtext' style='width:50px;height:12px;display:none;' id='txtName" + i + "'></td>";

    html += "<td align='right'><span class='fBold'>手机:</span></td>";
    html += "<td><span id='spnMobile" + i + "'>-</span>";
    html += "<input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtMobile" + i + "'></td>";

    html += "<td align='right'><span class='fBold'>电话:</span></td>";
    html += "<td><span id='spnTel" + i + "'>-</span>";
    html += "<input type='text' class='inputtext' style='width:100px;height:12px;display:none;' id='txtTel" + i + "'></td>";

    html += "<td align='right'><span class='fBold'>QQ:</span></td>";
    html += "<td><span id='spnQQ" + i + "'>-</span>";
    html += "<input type='text' class='inputtext' style='width:80px;height:12px;display:none;' id='txtQQ" + i + "'></td>";

    html += "<td><span id='spnMark" + i + "'>-</span>";
    html += "<select id='slcMark" + i + "' style='width: 90px;height:20px;display:none;'><option value='0' selected='selected'>出票联系人</option><option value='1'>政策联系人</option><option value='2'>紧急联系人</option><option value='3'>业务联系人</option><option value='4'>财务联系人</option><option value='5'>公司联系人</option></select></td>";
    html += "</tr>";
    
    if (objInfo.AgentTel != null) {
        html += "<tr>";
        html += "<td align='right'><span class='fBold'>客服电话:</span></td>";
        html += "<td colspan='8'>" + (objInfo.AgentTel == "" ? "-" : objInfo.AgentTel) + "</td>";
        html += "</tr>";
    }
    if (objInfo.AgentQQ != null) {
        html += "<tr>";
        html += "<td align='right'><span class='fBold'>客服QQ:</span></td>";
        html += "<td colspan='8'>" + (objInfo.AgentQQ == "" ? "-" : objInfo.AgentQQ) + "</td>";
        html += "</tr>";
    }
    html += "</table>";

    OpenDropList(e, html, 690);
}

function EditContactInfo() {
    $("aEdit").hide();
    $("aSave").show();
    $("aCancel").show();
    var objHeight = 0;

    $("txtContact").value = $("spnContact").innerHTML;
    $("txtPlatformRemark").value = $("spnPlatformRemark").innerHTML;
    $("txtMobile").value = $("spnMobile").innerHTML;
    $("txtTel").value = $("spnTel").innerHTML;
    $("txtQQ").value = $("spnQQ").innerHTML;
    $("spnContact").hide();
    $("spnPlatformRemark").hide();
    $("spnMobile").hide();
    $("spnTel").hide();
    $("spnQQ").hide();
    $("txtContact").show();
    $("txtPlatformRemark").show();
    $("txtMobile").show();
    $("txtTel").show();
    $("txtQQ").show();
    objHeight += 12;

    var i = 0;
    while ($("txtName" + i)) {
        $("txtName" + i).value = $("spnName" + i).innerHTML;
        $("txtMobile" + i).value = $("spnMobile" + i).innerHTML;
        $("txtTel" + i).value = $("spnTel" + i).innerHTML;
        $("txtQQ" + i).value = $("spnQQ" + i).innerHTML;
        switch ($("spnMark" + i).innerHTML) {
            case "政策联系人":
                $("slcMark" + i).selectedIndex = 1;
                break;
            case "紧急联系人":
                $("slcMark" + i).selectedIndex = 2;
                break;
            case "业务联系人":
                $("slcMark" + i).selectedIndex = 3;
                break;
            case "财务联系人":
                $("slcMark" + i).selectedIndex = 4;
                break;
            case "公司联系人":
                $("slcMark" + i).selectedIndex = 5;
                break;
            default:
                $("slcMark" + i).selectedIndex = 0;
                break;
        }
        $("spnName" + i).hide();
        $("spnMobile" + i).hide();
        $("spnTel" + i).hide();
        $("spnQQ" + i).hide();
        $("spnMark" + i).hide();
        $("txtName" + i).show();
        $("txtMobile" + i).show();
        $("txtTel" + i).show();
        $("txtQQ" + i).show();
        $("slcMark" + i).show();
        objHeight += 6;
        i++;
    }

    $("divDropList").style.height = ($("divDropList").style.height.replace("px", "") * 1 + objHeight) + "px";
    $("divCons").style.height = ($("divCons").style.height.replace("px", "") * 1 + objHeight) + "px";
    $("tblContact").style.height = ($("tblContact").style.height.replace("px", "") * 1 + objHeight) + "px";
}

function CancelContactInfo() {
    $("aSave").hide();
    $("aCancel").hide();
    $("aEdit").show();
    var objHeight = 0;

    $("txtContact").hide();
    $("txtPlatformRemark").hide();
    $("txtMobile").hide();
    $("txtTel").hide();
    $("txtQQ").hide();
    $("spnContact").show();
    $("spnPlatformRemark").show();
    $("spnMobile").show();
    $("spnTel").show();
    $("spnQQ").show();
    objHeight -= 12;

    var i = 0;
    while ($("txtName" + i)) {
        $("txtName" + i).hide();
        $("txtMobile" + i).hide();
        $("txtTel" + i).hide();
        $("txtQQ" + i).hide();
        $("slcMark" + i).hide();
        $("spnName" + i).show();
        $("spnMobile" + i).show();
        $("spnTel" + i).show();
        $("spnQQ" + i).show();
        $("spnMark" + i).show();
        objHeight -= 6;
        i++;
    }

    $("divDropList").style.height = ($("divDropList").style.height.replace("px", "") * 1 + objHeight) + "px";
    $("divCons").style.height = ($("divCons").style.height.replace("px", "") * 1 + objHeight) + "px";
    $("tblContact").style.height = ($("tblContact").style.height.replace("px", "") * 1 + objHeight) + "px";
}

function SaveContactInfo(domain, companyid) {
    var para = "Action=SaveContactInfo&Companyid=" + companyid + "&Domain=" + domain;
    para += "&Contact=" + $("txtContact").value;
    para += "&PlatformRemark=" + $("txtPlatformRemark").value;
    para += "&Mobile=" + $("txtMobile").value;
    para += "&Tel=" + $("txtTel").value;
    para += "&QQ=" + $("txtQQ").value;

    var strInfo = "";
    var i = 0;
    while ($("txtName" + i)) {
        if (!$("txtName" + i).value.empty() && $("txtName" + i).value != "-")
            strInfo += "|" + $("slcMark" + i).selectedIndex + "," + $("txtName" + i).value + "," + $("txtMobile" + i).value + "," + $("txtTel" + i).value + "," + $("txtQQ" + i).value;
        i++;
    }
    para += "&ContactInfo=" + strInfo.substr(1)

    $("aSave").disabled = "disabled";
    try { parent.Loading("正在保存..."); } catch (e) { }
    new Ajax.Request(
        ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onFailure: function () { $("aSave").disabled = ""; try { parent.Loading("保存数据异常.", false); parent.CloseLoading(3000); } catch (e) { } },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                $("aSave").disabled = "";
                if (content == "OK") {
                    try { parent.Loading("保存数据成功."); parent.CloseLoading(3000); } catch (e) { }
                    $("spnContact").innerHTML = $("txtContact").value;
                    $("spnPlatformRemark").innerHTML = $("txtPlatformRemark").value;
                    $("spnMobile").innerHTML = $("txtMobile").value;
                    $("spnTel").innerHTML = $("txtTel").value;
                    $("spnQQ").innerHTML = $("txtQQ").value;

                    var i = 0;
                    while ($("txtName" + i)) {
                        $("spnName" + i).innerHTML = $("txtName" + i).value;
                        $("spnMobile" + i).innerHTML = $("txtMobile" + i).value;
                        $("spnTel" + i).innerHTML = $("txtTel" + i).value;
                        $("spnQQ" + i).innerHTML = $("txtQQ" + i).value;
                        switch ($("slcMark" + i).selectedIndex) {
                            case 1:
                                $("spnMark" + i).innerHTML = "政策联系人";
                                break;
                            case 2:
                                $("spnMark" + i).innerHTML = "紧急联系人";
                                break;
                            case 3:
                                $("spnMark" + i).innerHTML = "业务联系人";
                                break;
                            case 4:
                                $("spnMark" + i).innerHTML = "财务联系人";
                                break;
                            case 5:
                                $("spnMark" + i).innerHTML = "公司联系人";
                                break;
                            default:
                                $("spnMark" + i).innerHTML = "出票联系人";
                                break;
                        }
                        i++;
                    }

                    CancelContactInfo();
                } else {
                    try { parent.Loading("保存数据失败." + content, false); parent.CloseLoading(3000); } catch (e) { }
                }
            }
        }
    });
}

function RemoteToLocalEtdz(orderid, role, t) {
    if (confirm("您是否确认转平台出票？") == false)
        return;

    var para = "Action=RemoteToLocalEtdz&orderid=" + orderid + "&role=" + role
    new Ajax.Request(
	ServiceUrl(),
    {
        method: "post",
        asynchronous: false,
        parameters: para,
        onFailure: function () {
            try { parent.ShowAlert(false, false, "获取公司信息发生异常"); } catch (e) { }
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content.startsWith("OK")) {
                    SetBack(t, "OrderRedirect()");
                    try { parent.ShowAlert("0", false, "转平台出票成功。"); } catch (e) { }
                }
                else {
                    try { parent.ShowAlert(false, false, content.substring(3)); } catch (e) { }
                }
            }
        }
    });
}

function OrderRedirect() {
    window.location.href = thisUrl;
}

function OrderUnlock(strOrderId, d,type) {
    try { parent.Loading("正在解锁..."); } catch (e) { }

    new Ajax.Request(
    ServiceUrl(),
    {
        method: "post",
        parameters: "Action=OnFormUnload&OrderID=" + strOrderId + "&type="+type,
        onFailure: function () {
            try { parent.Loading("解锁时异常.", false); parent.CloseLoading(2000); } catch (e) { }
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (content == "OK") {
                try { parent.Loading("解锁成功"); } catch (e) { }
                try { parent.CloseLoading(2000); } catch (e) { }
//                d.style.display = "none";
//                $("liLock" + d.id.replace("liUnLock", "")).style.display = "none";

//                $("spanLockInfo" + d.id.replace("liUnLock", "")).style.display = "none";
//                $("spanEtdz" + d.id.replace("liUnLock", "")).style.display = "";

                location.href = location.href;
            }
            else {
                try { parent.CloseLoading(2000); } catch (e) { }
                try { parent.ShowAlert("0", false, content); } catch (e) { }
            }
        }
    });
}

function OnSetTimer() {
    var IsAutoRefresh = $("chkAutoRefresh").checked;

    var strCookie = GetCookie("OrderListRefresh");

    if (strCookie == null) strCookie = "";

    var strKey = $("hidTabName").value + "=";

    //寻找该tab页名称
    var index = strCookie.indexOf(strKey, 0);

    //未找到
    if (index == -1) {

        //如果是需要刷新,则添加该键值
        if (IsAutoRefresh) {
            strCookie += "&" + strKey + "1";
        }
    }
    //找到该键值
    else {
        //如果不需要刷新
        if (IsAutoRefresh == false) {
            //搜寻此字符串
            strReplace = "&" + strKey + "1";
            if (strCookie.indexOf(strReplace, 0) != -1) {
                strCookie = strCookie.replace(strReplace, "");
            }
            else {
                strReplace = strKey + "1";
                strCookie = strCookie.replace(strReplace, "");
            }
        }
    }

    SetCookie("OrderListRefresh", strCookie, 30);

    if (IsAutoRefresh) //开启timer
    {
        ontimer();

        objTimer = window.setInterval("ontimer()", 1000);
    }
    else //关闭timer
    {
        window.clearInterval(objTimer);

        $("lblAutoRefresh").innerHTML = "自动刷新";

        $("hidTimerValue").value = "16";
    }

}

function ontimer() {
    if ($("chkAutoRefresh").checked == false)
        return;

    var TimerValue = $("hidTimerValue").value;

    TimerValue = TimerValue - 1;

    if (TimerValue == 0) {
        //window.location.reload(); 

        window.location.href = self.location.href;

        $("hidTimerValue").value = "16"
    }
    else {
        $("lblAutoRefresh").innerHTML = "自动刷新(" + TimerValue + ")";

        $("hidTimerValue").value = TimerValue;
    }
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
    var arrU = $$("u");
    if (arrU.length == 0) {
        TimeSpanStop();
    }
    arrU.each(function (d) {
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
    });

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

function ShowMoreTab(e) {
    var html = tabHtml;
    $$("li.abc").each(function (d) {
        var inf = d.id.replace("liT", "");
        if (d.className.include("lis")) {
            html = html.replace("N" + inf, "checked='true' disabled='disabled'");
        }
        else {
            html = html.replace("N" + inf, "checked='true'");
        }
    });
    OpenDropList(e, html, 120, e);
}

function ShowThisTab(e) {
    var inf = e.id.replace("chkT", "");
    var sTab = null;
    $$("li.abc").each(function (d) {
        if (d.id.endsWith(inf)) {
            sTab = d;
            throw $break;
        }
    });
    if (e.checked) {
        if (sTab == null) {
            var liTab = document.createElement("LI");
            liTab.id = "liT" + inf;
            liTab.className = "abc";
            liTab.innerHTML = "<a href='" + $("lblT" + inf).getAttribute("href") + "'>" + $("lblT" + inf).innerHTML + "</a>";
            $("ulTab").insertBefore(liTab, $("liMore"));
            ShowMoreTab($("liMore"));
        }
    }
    else {
        if (sTab != null) {
            sTab.remove();
            ShowMoreTab($("liMore"));
        }
    }

    var NewCookie = "";
    $$("li.abc").each(function (d) {
        NewCookie += "," + d.id;
    })
    NewCookie = NewCookie.substr(1);

    //获取角色
    var role = NewCookie.substr(0, 6);

    //获取原cookie
    var cookie = GetCookie("OrderListTab");

    if (cookie != null) {
        var arrItem = cookie.split('.');

        var FoundMatch = false;

        var i;
        for (i = 0; i < arrItem.length; i++) {
            if (arrItem[i].startsWith(role)) {
                arrItem[i] = NewCookie;
                FoundMatch = true;
                break;
            }
        }

        if (FoundMatch == false) {
            cookie = cookie + "." + NewCookie;
        }
        else {
            cookie = "";
            for (i = 0; i < arrItem.length; i++) {
                cookie += "." + arrItem[i];
            }
            cookie = cookie.substr(1);
        }
    }
    else {
        cookie = NewCookie;
    }

    SetCookie("OrderListTab", cookie, 30);
}

function ShowOrderShortCut(s, orderid, role, action) {
    var id = s.id.replace("imgT", "");
    if ($("trItem0" + id).style.display == "none") {
        s.innerHTML = "[快速查看]";
        RelaxInfo(false, id);
       
    }
    else {
        $("trItem0" + id).hide();
        $("trItem1" + id).hide();
        $("trMore" + id).show();
        if ($("divMore" + id).innerHTML.empty()) {
            try { parent.Loading("数据读取中..."); } catch (e) { }
            new Ajax.Request(
            ServiceUrl(),
            {
                method: "post",
                parameters: "Action=ShowShortCut&OrderID=" + orderid + "&role=" + role + "&Act=" + action + "&Index=" + id,
                onFailure: function () {
                    try { parent.Loading("数据读取异常.", false); parent.CloseLoading(2000); } catch (e) { }
                },
                onSuccess: function (transport) {
                    var content = transport.responseText;
                    try { parent.CloseLoading(2000); } catch (e) { }
                    if (Logout(content)) {
                        if (content.startsWith("OK")) {
                            $("divMore" + id).innerHTML = content.substr(3);
                            RelaxInfo(true, id);
                            s.innerHTML = "[收起-]";
                        }
                        else {
                            try { parent.CloseLoading(2000); } catch (e) { }
                            try { parent.ShowAlert("0", false, "数据读取失败:" + content); } catch (e) { }
                        }
                    }
                }
            });
        }
        else {
            RelaxInfo(true, id);
            s.innerHTML = "[收起-]";
        }
    }
}

function RelaxInfo(isrelax, id) {//展开下拉列表的动画效果
    var info = $("divMore" + id);
    var divh = info.getHeight();
    if (isrelax) {
        info.style.height = "84px";
        var hh = 6;
        var ot = window.setInterval(function () {
            var th = info.getHeight() + hh;
            if (document.all)
                hh += 6;
            else
                hh += 3;
            if (th >= divh) {
                th = divh;
                window.clearInterval(ot);
                InitFrame();
            }
            info.style.height = th + "px";
        }, 10);
    }
    else {
        hh = 6;
        ot = window.setInterval(function () {
            var th = info.getHeight() - hh;
            if (document.all)
                hh += 6;
            else
                hh += 3;
            if (th <= 84) {
                window.clearInterval(ot);
                $("trItem0" + id).show();
                $("trItem1" + id).show();
                $("trMore" + id).hide();
                th = divh;
                InitFrame();
            }
            info.style.height = th + "px";
        }, 10);
    }
}

var stopscroll = false;
var scrolling = false;
var scrp;
var sup;
function Scroll() {//首页信息滚动
    var marquees = $("ulMeq");
    marquees.onmouseover = function () {
        stopscroll = true;
        window.clearInterval(scrp);
    }
    marquees.onmouseout = function () {
        stopscroll = false;
        Scroll();
    }
    if (marquees.childElements().length < 2) { return; }
    scrp = window.setInterval("Scrolling()", 5000); //每5秒向上滚动一次
}
function Scrolling() {
    if (stopscroll == true) return;
    stopscroll = false;
    if (!scrolling)
        scrollUp();
}
function scrollUp() {//向上滚动
    var marquees = $("ulMeq");
    marquees.scrollTop++;
    var speed = document.all ? 50 : 60;
    var hh = document.all ? 17 : 18;
    if (marquees.scrollTop > hh) {
        var len = marquees.childElements().length;
        marquees.insert(marquees.childElements()[0], len - 1)
        marquees.scrollTop = 0;
        scrolling = false;
        window.clearTimeout(sup);
    }
    else {
        scrolling = true;
        sup = window.setTimeout("scrollUp()", speed);
    }
}

function ShowOnlineUser(e, oid, cid) {
//    var html = "";
//    new Ajax.Request(
//    ServiceUrl(),
//    {
//        method: "post",
//        asynchronous: false,
//        parameters: "Action=GetOnlineList&Oid=" + oid + "&Cid=" + cid + "&r=" + Math.random(),
//        onFailure: function (transport) {
//            alert(transport.responseText);
//        },
//        onSuccess: function (transport) {
//            var content = transport.responseText;
//            if (!content.empty()) {
//                html = content;
//            }
//        }
//    });

//    if (html.empty())
//        html = "没有在线用户";
//    OpenDropList(e, html, 200);
}

function ShowClientQQ(e, acc) {
        var html = "";
        new Ajax.Request(
        ServiceUrl(),
        {
            method: "post",
            asynchronous: false,
            parameters: "Action=GetOnlineQQList&Account=" + acc + "&r=" + Math.random(),
            onFailure: function (transport) {
                alert(transport.responseText);
            },
            onSuccess: function (transport) {
                var content = transport.responseText;
                if (!content.empty()) {
                    html = content;
                }
            }
        });

        if (html.empty())
            html = "没有在线客服";
        OpenDropList(e, html, 220, e);
}

function OverOrder(strOrderID) {
    var para = "Action=OverOrder&OrderID=" + strOrderID;
    try { parent.Loading("正在保存..."); } catch (e) { }
    new Ajax.Request(
        ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onFailure: function () { try { parent.Loading("保存数据异常.", false); parent.CloseLoading(3000); } catch (e) { } },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content == "OK") {
                    try { parent.Loading("保存数据成功."); parent.CloseLoading(3000); } catch (e) { }
                    OrderRedirect();
                } else {
                    try { parent.Loading("保存数据失败." + content, false); parent.CloseLoading(3000); } catch (e) { }
                }
            }
        }
    });
}

function OnDropChange() {
    SubmitForm($("hidRole").value, $('hidDispType').value, $('hidOrderType').value);
}

function AuditRmk(id, d, e) {
    var objBtn = e;
    var para = "Action=OnAuditRmk";
    para += "&OrderID=" + id;
    para += "&CreateTime=" + d;
    objBtn.disabled = "disabled";
    new Ajax.Request(
	ServiceUrl(),
    {
        method: "post",
        parameters: para,
        onFailure: function () {
            try { parent.ShowAlert(false, false, "保存时发生异常."); } catch (e) { }
            objBtn.disabled = "";
        },
        onSuccess: function (transport) {
            var content = transport.responseText;
            if (Logout(content)) {
                if (content == "OK") {
                    try { parent.Loading("修改成功."); parent.CloseLoading(3000); } catch (e) { }
                    objBtn.style.display = "none";
                } else {
                    try { parent.Loading("修改失败." + content); parent.CloseLoading(8000); } catch (e) { }
                }
                objBtn.disabled = "";
            }
        }
    });
    return false;
}

function NotTodayPay() {
    try { parent.ShowAlert(false, false, "非当日提交的订单，运价和政策有可能已经发生变动，为避免您的损失，请重新提交订单", 1, 500, 110); } catch (e) { }
}


function NotCPPWorkTimePay(nOrderType, strOrderID) {
    SetBack($("txtBack"), "ContinuePay('" + nOrderType + "', '" + strOrderID + "')");
    try { parent.ShowConfirm(2, "当前是供应商的下班时间，如果您现在支付，该订单将会在供应商上班的第一时间得到处理，是否确认支付？", 1, true, 450, 120); } catch (e) { }
}

function ContinuePay(nOrderType, strOrderID) {
    if ($("txtBack").value == 0) { //确认支付
        if (nOrderType == '1') //国际
        {
            window.location.href = "GjPayBefore.php?OrderID=" + strOrderID + "&SetSellInfo=1";
        }
        else {
            window.location.href = "GnPayBefore.php?OrderID=" + strOrderID + "&SetSellInfo=1";
        }
    }
}