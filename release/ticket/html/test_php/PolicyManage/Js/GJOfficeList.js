$(document).ready(function () {
    LoadList();
});

function LoadList() {
    var txt = $.trim($("#txtScan").val());
    $("#divList").html("<img src='/Images/loading.gif'> 正在加载数据，请稍候...");
    $.getJSON("GJOfficeList.php?Action=GetList&Scan=" + txt + "&callback=?",
    function (json) {
        var htm = [];
        htm.push("<table class='table'>");
        htm.push("<tr>");
        htm.push("<th>OFFICE号</th>");
        htm.push("<th>名称</th>");
        htm.push("<th>票类</th>");
        htm.push("<th>开票工作时间</th>");
        htm.push("<th>废票工作时间</th>");
        htm.push("<th>退票改签工作时间</th>");
        htm.push("<th class='thc'>状态</th>");
        htm.push("<th>操作</th>");
        htm.push("</tr>");
        if (json.ret != "OK") {
            htm.push("<tr><td colspan='8'>" + json.ret + "</td></tr>");
        }
        else {
            $(json.list).each(function () {
                htm.push("<tr>");
                htm.push("<td>" + this.office + "</td>");
                htm.push("<td>" + this.name + "</td>");
                htm.push("<td>" + this.type + "</td>");
                htm.push("<td>" + this.worktime + "</td>");
                htm.push("<td>" + this.voidtime + "</td>");
                htm.push("<td>" + this.refundtime + "</td>");
                if (this.enable) {
                    htm.push("<td align='center'><span class='lbl radius10 hand b-green' onclick=\"DisableOffice(this, '" + this.id + "')\">已启用</span></td>");
                }
                else {
                    htm.push("<td align='center'><span class='lbl radius10 hand b-winered' onclick=\"DisableOffice(this, '" + this.id + "')\">已禁用</span></td>");
                }
                htm.push("<td><a href='GJOfficeEdit.php?ID=" + this.id + "'>编辑</a> <a href='GJOfficeEdit.php?ID=" + this.id + "&Copy=1'>复制</a> <span class='albl hand' onclick=DelOffice('" + this.id + "')>删除</span></td>");
                htm.push("</tr>");
            });
        }
        htm.push("</table>");
        $("#divList").html(htm.join(''));
    });
}

function DelOffice(id) {
    confirmPop("确认要删除该开票组吗？", function () {
        tipPop("正在删除，请稍候...");
        $.get("GJOfficeList.php?Action=DelOffice&ID=" + id, function (data) {
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

function DisableOffice(d, id) {
    var the = $(d);
    the.attr("disabled", true);
    var type = !the.hasClass("b-green");
    if (!type) {
        confirmPop("禁用该开票组将同时禁用与该开票组相关的政策！<br>确认要禁用吗？", function () {
            Disabled(the, id, type);
        });
    }
    else {
        Disabled(the, id, type);
    }
}

function Disabled(the, id, type) {
    $.get("GJOfficeList.php?Action=DisableOffice&ID=" + id + "&Type=" + (type ? "True" : "False"), function (data) {
        if (data == "OK") {
            if (type) {
                the.removeClass("b-winered");
                the.addClass("b-green");
                the.text("已启用");
            }
            else {
                the.removeClass("b-green");
                the.addClass("b-winered");
                the.text("已禁用");
            }
        }
        else {
            alertPop(data);
        }
        the.attr("disabled", false);
    });
}

function Scan() {
    var txt = $.trim($("#txtScan").val());
    window.location.href = "GJOfficeList.php?Scan=" + txt;
}