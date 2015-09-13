$(document).ready(function () {
    LoadList();
});

function LoadList() {
    var txt = $.trim($("#txtScan").val());
    var cid = $("#hidCID").val();
    
    $("#divList").html("<img src='/Images/loading.gif'> 正在加载数据，请稍候...");
    $.getJSON("GJCarrierRuleList.php?Action=GetList&CID=" + cid + "&Scan=" + txt + "&callback=?",
    function (json) {
        var htm = [];
        htm.push("<table class='table'>");
        htm.push("<tr>");
        htm.push("<th>规则名</th>");
        htm.push("<th>适用航司</th>");
        htm.push("<th>OPEN票</th>");
        htm.push("<th>Q值</th>");
        htm.push("<th>票价基础</th>");
        htm.push("<th>操作</th>");
        htm.push("</tr>");
        if (json.ret != "OK") {
            htm.push("<tr><td colspan='8'>" + json.ret + "</td></tr>");
        }
        else {
            if (cid != "") {
                $("#hTitle").text(json.name + "-航司规则列表");
            }
            $(json.list).each(function () {
                htm.push("<tr>");
                htm.push("<td>" + this.name + "</td>");
                htm.push("<td class='break'>" + this.carrier + "</td>");
                htm.push("<td>" + this.open + "</td>");
                htm.push("<td>" + this.q + "</td>");
                htm.push("<td>" + this.basis + "</td>");
                htm.push("<td><a href='GJCarrierRuleEdit.php?CID=" + cid + "&ID=" + this.id + "'>编辑</a> <a href='GJCarrierRuleEdit.php?CID=" + cid + "&ID=" + this.id + "&Copy=1'>复制</a> <span class='albl hand' onclick=Delete('" + this.id + "')>删除</span></td>");
            });
        }
        htm.push("</table>");
        $("#divList").html(htm.join(''));
    });
}

function Delete(id) {
    var cid = $("#hidCID").val();
    confirmPop("删除该航司规则将会使应用该规则的政策失效！<br>确认要删除该航司规则吗？", function () {
        tipPop("正在删除，请稍候...");
        $.get("GJCarrierRuleList.php?Action=Delete&CID=" + cid + "&ID=" + id, function (data) {
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

function Scan() {
    var txt = $.trim($("#txtScan").val());
    var cid = $("#hidCID").val();
    window.location.href = "GJCarrierRuleList.php?CID=" + cid + "&Scan=" + txt;
}

function Add() {
    var cid = $("#hidCID").val();
    window.location.href = "GJCarrierRuleEdit.php?CID=" + cid;
}

function BackUrl() {
    window.location.href = "GJProviderList.php";
}