$(document).ready(function () {
    LoadList();
});

function LoadList() {
    var txt = $.trim($("#txtScan").val());
    $("#divList").html("<img src='/Images/loading.gif'> 正在加载数据，请稍候...");
    $.getJSON("GJHangUpList.php?Action=GetList&Scan=" + txt + "&callback=?",
    function (json) {
        var htm = [];
        htm.push("<table class='table'>");
        htm.push("<tr>");
        htm.push("<th>航司</th>");
        htm.push("<th>票类</th>");
        htm.push("<th>政策类型</th>");
        htm.push("<th>起始时间</th>");
        htm.push("<th>过期时间</th>");
        htm.push("<th>挂起原因</th>");
        htm.push("<th>更新时间</th>");
        htm.push("<th>操作员</th>");
        htm.push("<th>操作</th>");
        htm.push("</tr>");
        if (json.ret != "OK") {
            htm.push("<tr><td colspan='9'>" + json.ret + "</td></tr>");
        }
        else {
            $(json.list).each(function () {
                htm.push("<tr>");
                htm.push("<td>" + this.carrier + "</td>");
                htm.push("<td>" + this.tickettype + "</td>");
                htm.push("<td>" + (this.auditingtype == "0" ? "不限类型" : (this.auditingtype == "1" ? "无需审核政策" : "需审核政策")) + "</td>");
                htm.push("<td>" + this.starttime + "</td>");
                htm.push("<td>" + this.expiretime + "</td>");
                htm.push("<td>" + this.reason + "</td>");
                htm.push("<td>" + this.updatetime + "</td>");
                htm.push("<td>" + this.account + "</td>");
                htm.push("<td><span class='albl hand' name='spnEdit'>编辑</span> <span class='albl hand' onclick=Delete('" + this.id + "')>删除</span></td>");
            });
        }
        htm.push("</table>");
        $("#divList").html(htm.join(''));

        spns = $("span[name='spnEdit']");
        spns.click(function () {
            var i = spns.index($(this));
            EditRule(json.list[i]);
        })
    });
}

function Delete(id) {
    confirmPop("确认要删除该挂起规则吗？", function () {
        tipPop("正在删除，请稍候...");
        $.get("GJHangUpList.php?Action=Delete&ID=" + id, function (data) {
            if (data == "OK") {
                alertPop("删除成功!", function () {
                    LoadList();
                });
            }
            else {
                alertPop(data);
            }
        });
    });
}

function EditRule(json) {
    var htm = [];
    htm.push("<div class='bt10'>");
    htm.push("<table class='table'>");
    htm.push("<tr>");
    htm.push("<td>航司</td>");
    htm.push("<td><input type='text' id='txtCarrier' placeholder='航司二字码,全部挂起可不填' class='upper' maxlength='2'/></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td>票类</td>");
    htm.push("<td><label><input type='checkbox' name='chkType' value='BSP'/>BSP</label> <label><input type='checkbox' name='chkType' value='B2B'/>B2B</label> <label><input type='checkbox' name='chkType' value='境外电子'/>境外电子</label></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td>政策类型</td>");
    htm.push("<td><label><input type='radio' name='rdAuditing' value='0' checked/>不限类型</label> <label><input type='radio' name='rdAuditing' value='1'/>无需审核政策</label> <label><input type='radio' name='rdAuditing' value='2'/>需审核政策</label></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td>有效时间</td>");
    htm.push("<td><input type='text' class='calendar' style='width:100px' id='txtStartTime' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm', readOnly:true})\"/> - <input type='text' class='calendar' id='txtExpireTime' style='width:100px' onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm', readOnly:true})\"/></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td>挂起原因</td>");
    htm.push("<td><input type='text' id='txtReason' style='width:300px'/></td>");
    htm.push("</tr>");
    htm.push("</table>");
    htm.push("</div>");
    htm.push("<center><input type='button' class='btn btn-blue' onclick='Save()' value='保存' /><input type='hidden' id='hidID' /><input type='button' class='btn btn-white' value='关闭' onclick='closePop()'/></center>");

    popLayer("show", "添加挂起规则", htm.join(''));

    if (json != null) {
        $("#txtCarrier").val(json.carrier);
        $("#txtReason").val(json.reason);
        $("#txtStartTime").val(json.starttime);
        $("#txtExpireTime").val(json.expiretime);
        $("#hidID").val(json.id);
        setCheckbox("chkType", json.tickettype);
        setRadio("rdAuditing", json.auditingtype)
    }
}

function Save() {
    var id = $("#hidID").val();
    var carrier = $("#txtCarrier").val();
    var reason = $("#txtReason").val();
    var tickettype = getCheckbox("chkType");
    var auditingtype = getRadio("rdAuditing");
    var starttime = $("#txtStartTime").val();
    var expiretime = $("#txtExpireTime").val();

    if (expiretime == "") {
        alert("请选择过期时间！");
        $("#txtExpireTime").focus();
        return;
    }

    tipPop("正在保存数据...");
    $.post("GJHangUpList.php",
    { Action: "Save", ID: id, Carrier: carrier, TicketType: tickettype, AuditingType: auditingtype, StartTime: starttime, ExpireTime: expiretime, Reason: reason },
    function (data) {
        if (data != "OK") {
            alertPop(data);
        }
        else {
            alertPop("保存成功！", function () {
                LoadList();
            });
        }
    });
}
