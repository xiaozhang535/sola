$(document).ready(function () {
    if (!$.support.leadingWhitespace) {
        alertPop("您当前的浏览器不能很好的显示新版政策，<br/>推荐使用Chrome, 火狐, Opera, Safari等浏览器浏览！");
    }

    LoadList();
    loadCombox();
});

//#region 搜索，排序
function GetPara() {
    var plat = $("#hidALL").val();
    var carrier = $.trim($("#txtCarrier").val());
    var policyid = $.trim($("#txtPolicyID").val());
    var flag = $.trim($("#txtFlag").val());
    var depcity = $.trim($("#txtDepCity").val());
    var arrcity = $.trim($("#txtArrCity").val());
    var ticketfrom = $.trim($("#txtTicketFrom").val());
    var ticketto = $.trim($("#txtTicketTo").val());
    var gofrom = $.trim($("#txtGoFrom").val());
    var gotos = $.trim($("#txtGoTo").val());
    var proname = "";
    var provider = "";
    if ($("#txtProvider").length > 0) {
        proname = $.trim($("#txtProvider").val());
        provider = $.trim($("#txtProvider").attr("val"));
    }
    var officeid = "";
    if (plat != "ALL") {
        officeid = $("#dropOfficeGroup").val().replace(" ", "");
    }
    var auditing = $.trim($("#dropAuditing").val());
    var record = $.trim($("#dropRecord").val());
    var asc = $("#hidAsc").val();
    var ascname = $("#hidAscName").val();

    var para = "Platform=" + plat + "&Carrier=" + carrier + "&PolicyID=" + policyid + "&Flag=" + flag + "&DepCity=" + depcity + "&ArrCity=" + arrcity + "&ProName=" + proname + "&Provider=" + provider + "&OfficeID=" + officeid + "&Auditing=" + auditing + "&Record=" + record + "&Asc=" + asc + "&AscName=" + ascname + "&TicketFrom=" + ticketfrom + "&TicketTo=" + ticketto + "&GoFrom=" + gofrom + "&GoTo=" + gotos;
    return para;
}

function Scan() {
    window.location.href = "GJPolicyPriceList.php?" + GetPara();
}

function ShowList() {
    if ($("#btnShowAll").val() == "全部列表") {
        $("#hidPage").val("0");
        LoadList();
        $("#btnShowAll").val("分页显示");
    }
    else {
        $("#hidPage").val("1");
        LoadList();
        $("#btnShowAll").val("全部列表");
    }
}

function Sort(d) {
    var val = $(d).val();
    var sortname = val.substr(0, 2);
    var sort = "";
    if (val.indexOf("升序") > 0) {
        $("#hidAsc").val("1");
        sort = "降序";
    }
    else {
        $("#hidAsc").val("0");
        sort = "升序";
    }
    $(d).val(sortname + sort);
    switch (sortname) {
        case "时间":
            $("#hidAscName").val("Updatetime");
            break;
        case "价格":
            $("#hidAscName").val("Price");
            break;
    }
    Scan();
}

function ScanProvider(e, d) {
    var url = "GJHangUpPlatform.php?Action=GetProvider";
    scanCombox(e, d, url);
}
//#endregion

//#region 列表加载
function LoadList() {
    $("#divList").html("<img src='/Images/loading.gif'> 正在加载数据，请稍候...");
    var all = ($("#hidALL").val() == "ALL");
    var page = $("#hidPage").val();
    var sorttime = "时间升序";
    var sort = ($("#hidAsc").val() == "0" ? "升序" : "降序");
    switch ($("#hidAscName").val()) {
        case "Updatetime":
            sorttime = "时间" + sort;
            break;
        case "Price":
            sorttime = "价格" + sort;
            break;
    }
    $.getJSON("GJPolicyPriceList.php?Action=GetList&Page=" + page + "&callback=?&" + GetPara(),
    function (json) {
        var htm = [];
        htm.push("<table class='tablelist' cellspacing='0'>");
        htm.push("<thead>");
        htm.push("<tr>");
        htm.push("<th>航程信息</th>");
        htm.push("<th width='130'>限制条件</th>");
        htm.push("<th width='150'>时间限定</th>");
        htm.push("<th width='170'>基础信息</th>");
        htm.push("</tr>");
        htm.push("<tr>");
        htm.push("<td colspan='4'><label class='mr6'><input type='checkbox' onclick=\"chkAll(this, 'chkID')\"/>全选</label>");
        htm.push("<input type='button' class='btn btn-white mr6' onclick='DeleteAll()' value='删除'/>");
        htm.push("<input type='button' class='btn btn-white' onclick='AuditingAll(true)' value='批量审核'/>");
        htm.push("<input type='button' class='btn btn-white mr6' onclick='AuditingAll(false)' value='撤销审核'/>");
        if (!all) {
            htm.push("<input type='button' class='btn btn-white' onclick='EditForm()' value='批量修改'/>");
            htm.push("<input type='button' class='btn btn-white mr6' onclick='MoveForm()' value='移动到...'/>");
            htm.push("<input type='button' class='btn btn-blue' value='添加政策' onclick=\"window.location.href='GJPolicyPriceEdit.php'\" />");
        }
        else {
            if ($.trim($("#txtProvider").attr("val")) != "") {
                htm.push("<input type='button' class='btn btn-white' onclick=\"EditForm('" + $.trim($("#txtProvider").attr("val")) + "')\" value='批量修改'/>");
//                htm.push("<input type='button' class='btn btn-white' onclick=\"ItineraryForm()\" value='行程单修改'/>");
            }
        }
        if (page != "0") {
            htm.push("<input type='button' class='btn btn-blue fright' id='btnShowAll' onclick='ShowList()' value='全部列表'/>");
        }
        else {
            htm.push("<input type='button' class='btn btn-blue fright' id='btnShowAll' onclick='ShowList()' value='分页显示'/>");
        }
        htm.push("<input type='button' class='btn btn-white fright mr6' id='btnShowAll' onclick=\"Sort(this)\" value='" + sorttime + "'/>");
        htm.push("</td>");
        htm.push("</tr>");
        htm.push("</thead>");

        if (json.ret != "OK") {
            htm.push("<tr><td colspan='4'>" + json.ret + "</td></tr>");
        }
        else {
            $(json.list).each(function (x) {
                htm.push("<tbody>");
                htm.push("<tr>");
                htm.push("<th colspan='4'><label><input type='checkbox' name='chkID' value='" + this.id + "'/>政策号：</label>");
                htm.push("<span class='block' style='width:85px'>" + this.id + "</span>");
                if (this.isauditing) {
                    htm.push("<span class='lbl b-green radius10 hand' name='spnAuditing' onclick=\"Auditing(this, '" + this.id + "')\">已审核</span>");
                }
                else {
                    htm.push("<span class='lbl b-winered radius10 hand' name='spnAuditing' onclick=\"Auditing(this, '" + this.id + "')\">未审核</span>");
                }
                if (all) {
                    htm.push("&nbsp;&nbsp;&nbsp;<span class='lbl b-gray radius10'>" + this.comname + "</span>");
                }
                if (!this.officeenable) {
                    htm.push("&nbsp;&nbsp;&nbsp;<span class='lbl b-orange radius10'>" + this.officename + "被禁用</span>");
                }
                else if (!all) {
                    htm.push("&nbsp;&nbsp;&nbsp;<span class='lbl b-purple radius10'>" + this.officename + "</span>");
                }
                if (this.flag != "" && !all) {
                    htm.push("&nbsp;&nbsp;&nbsp;<span class='lbl b-blue radius10'>" + this.flag + "</span>");
                }
                if (!this.iswork) {
                    htm.push("&nbsp;&nbsp;&nbsp;<span class='lbl b-red radius10' title='" + this.worktime + "'>已下班</span>");
                }
                htm.push("<div><a href='GJPolicyPriceEdit.php?ID=" + this.id + "' class='c-blue'>编辑</a>");
                if (!all) {
                    htm.push(" | <a href='GJPolicyPriceEdit.php?ID=" + this.id + "&Copy=1'>复制</a>");
                }
                else {
                    //                    htm.push(" | <span class='albl hand' pid='" + this.id + "' name='spnItinerary'>行程单</span>");
                }

                htm.push(" | <span class='albl' onclick=\"Delete('" + this.id + "')\">删除</span></div>");
                htm.push("</th>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td class='break'>航司：<s class='c-orange'>" + this.carrier + "</s>, 周期：" + this.weeks);
                htm.push("<div style='height:55px;' class='overhide'>" + this.citylist.replace(/\|/g, "<br/>") + "</div></td>");
                htm.push("<td>成人：" + this.adutype + "<br/>儿童：" + this.chdway + "<br/>人数：" + this.person + "<br/>年龄：" + this.years + "</td>");
                htm.push("<td>开票：" + this.dateticketfrom + "/" + this.dateticketto + "<br/>去程：" + this.datefrom + "/" + this.dateto + "<br/>回程：" + this.backdateto);
                htm.push("<br/>停留：" + this.stayday + "</td>");
                htm.push("<td>价格：<s class='fwb c-winered f16'>" + this.price + "</s>元<br/>编码：" + this.record + "<br/>提前出票：" + this.aheadday + "<br/>更新：" + this.updatetime + "/" + this.account + "</td>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td colspan='4' class='ft break' id='td" + this.id + "'>");
                htm.push("备注：" + this.remark + "</td>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td colspan='4' class='nbtd'></td>");
                htm.push("</tr>");
                htm.push("</tbody>");
            });
        }
        htm.push("</table>");
        if (page != "0") {
            htm.push(json.page);
            htm.push("<div class=clear></div>");
        }
        $("#divList").html(htm.join(''));

        //        Itin = $("span[name='spnItinerary']");
        //        Itin.click(function () {
        //            var i = Itin.index($(this));
        //            ItineraryForm($(this).attr("pid"), json.list[i].itinerary);
        //        });
    });
}
//#endregion

//#region 批量删除
function Delete(id) {
    confirmPop("确定要删除该政策吗？", function () {
        tipPop("正在删除数据...");
        $.post("GJPolicyPriceList.php?Action=Delete&ID=" + id, function (data) {
            if (data == "OK") {
                alertPop("删除成功！", function () { LoadList(); });
            }
            else {
                alertPop(data);
            }
        });
    });
}

function DeleteAll() {
    var ids = getCheckbox("chkID");
    if (ids == "") {
        alertPop("请先选择要批量删除的政策!");
    }
    else {
        Delete(ids);
    }
}
//#endregion

//#region 批量审核
function Auditing(d, id) {
    var the = $(d);
    the.attr("disabled", true);
    var isaud = !the.hasClass("b-green");
    $.get("GJPolicyPriceList.php?Action=Auditing&ID=" + id + "&Type=" + (isaud ? "True" : "False"), function (data) {
        if (data == "OK") {
            if (isaud) {
                the.removeClass("b-winered");
                the.addClass("b-green");
                the.text("已审核");
            }
            else {
                the.removeClass("b-green");
                the.addClass("b-winered");
                the.text("未审核");
            }
        }
        else {
            alertPop(data);
        }
        the.attr("disabled", false);
    });
}

function AuditingAll(isaud) {
    var ids = getCheckbox("chkID");
    if (ids == "") {
        alertPop("请先选择要批量操作的政策!");
    }
    else {
        tipPop("正在更新数据...");
        $.post("GJPolicyPriceList.php?Action=Auditing&ID=" + ids + "&Type=" + (isaud ? "True" : "False"), function (data) {
            if (data == "OK") {
                var chk = $("input[type='checkbox'][name='chkID']");
                var spn = $("span[name='spnAuditing']");
                chk.each(function (i) {
                    if ($(this).is(":checked")) {
                        var the = spn.eq(i);
                        if (isaud) {
                            the.removeClass("b-winered");
                            the.addClass("b-green");
                            the.text("已审核");
                        }
                        else {
                            the.removeClass("b-green");
                            the.addClass("b-winered");
                            the.text("未审核");
                        }
                    }
                });
            }
            else {
                alertPop(data);
            }
        });
    }
}
//#endregion

//#region 批量转移
function MoveForm() {
    tipPop("正在读取数据...");
    $.getJSON("GJPolicyList.php?Action=OfficeList&callback=?",
    function (json) {
        if (json.ret != "OK") {
            alertPop(json.ret);
        }
        else {
            var htm = [];
            htm.push("<div class='bt10'>");
            htm.push("<table class='table' style='width:500px'>");
            htm.push("<tr>");
            htm.push("<td width='90'>指定源开票组</td>");
            htm.push("<td><select id='dropFromOffice' style='width:150px' onchange='GetCarrier()'>");
            htm.push("<option value=''>请选择源开票组</option>");
            $(json.list).each(function () {
                htm.push("<option value='" + this.id + "'>" + this.office + "-" + this.name + "</option>");
            });
            htm.push("</select></td></tr>");
            htm.push("<tr>");
            htm.push("<td>选择航空公司</td>");
            htm.push("<td class='ntd'><ul id='ulCarrier' class='ultable'>&nbsp;&nbsp;请先选择源开票组！</ul></td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td>指定目标开票组</td>");
            htm.push("<td><select id='dropToOffice' style='width:150px'>");
            htm.push("<option value=''>请选择目标开票组</option>");
            $(json.list).each(function () {
                htm.push("<option value='" + this.id + "'>" + this.office + "-" + this.name + "</option>");
            });
            htm.push("</select>");
            htm.push("</td></tr>");
            htm.push("</table>");
            htm.push("</div>");
            htm.push("<div style='text-align:right'><input type='button' class='btn btn-blue' onclick=\"Move()\" value='执行' /><input type='button' class='btn btn-white' value='关闭' onclick='closePop()'/>");
            htm.push("</div>");

            popLayer("show", "移动政策", htm.join(''));
        }
    });
}

function GetCarrier() {
    var from = $("#dropFromOffice").val();
    if (from == "") {
        $("#ulCarrier").html('');
    }
    else {
        $("#ulCarrier").html('&nbsp;&nbsp;正在读取...');
        $.get("GJPolicyPriceList.php?Action=CarrierList&From=" + from, function (data) {
            if (data != "") {
                var htm = [];
                htm.push("<li><label><input type='checkbox' onclick=\"chkAll(this, 'chkC')\"/>全选</label></li><br/>");
                var arrC = data.split(',');
                for (var i = 0; i < arrC.length; i++) {
                    htm.push("<li class='ws'><label><input type='checkbox' value='" + arrC[i] + "' name='chkC'/>" + arrC[i] + "</label></li>");
                }
                $("#ulCarrier").html(htm.join(''));
            }
            else {
                $("#ulCarrier").html('该开票组未发布政策！');
            }
        });
    }
}

function Move() {
    var from = $("#dropFromOffice").val();
    var to = $("#dropToOffice").val();
    if (from == "") {
        alert("请选择源开票组！");
        $("#dropFromOffice").focus();
        return;
    }
    var carrier = getCheckbox("chkC");
    if (carrier == "") {
        alert("请选择航空公司！");
        return;
    }
    if (to == "") {
        alert("请选择目标开票组！");
        $("#dropToOffice").focus();
        return;
    }
    if (to == from) {
        alert("源开票组和目标开票组不能相同！");
        $("#dropToOffice").focus();
        return;
    }
    tipPop("正在执行操作...");
    $.get("GJPolicyPriceList.php?Action=Move&Carrier=" + carrier + "&From=" + from + "&To=" + to, function (data) {
        if (data == "OK") {
            alertPop("执行成功！", function () { LoadList(); });
        }
        else {
            alertPop(data);
        }
    });
}
//#endregion

//#region 批量修改
function EditForm(id) {
    var ids = getCheckbox("chkID");
    if (ids == "") {
        alertPop("请先选择要批量修改的政策!");
    }
    else {
        tipPop("正在读取数据...");
        id = (id == null ? "" : id);
        var htm = [];
        htm.push("<div class='bt10'>");
        htm.push("<table class='table' style='width:500px' id='tbEdit'>");
        htm.push("<tr><td width='80' align='right'>换编码</td>");
        htm.push("<td><label><input type='radio' name='rdRecord' value='' checked/>不修改</label>");
        htm.push("<label><input type='radio' name='rdRecord' value='1'/>无需换编码</label>");
        htm.push("<label><input type='radio' name='rdRecord' value='2'/>需换编码</label>");
        htm.push("</td></tr>");
        htm.push("<tr><td align='right'>成人类型</td>");
        htm.push("<td><label><input type='radio' name='rdAdu' value='' checked/>不修改</label>");
        htm.push("<label><input type='radio' name='rdAdu' value='101'/>一般成人</label>");
        htm.push("<label><input type='radio' name='rdAdu' value='105' />劳务</label>");
        htm.push("<label><input type='radio' name='rdAdu' value='102'/>留学生</label></td></tr>");
        htm.push("<tr><td align='right'>儿童费率</td>");
        htm.push("<td><label><input type='radio' name='rdChd' value='' checked/>不修改</label>");
        htm.push("<label><input type='radio' name='rdChd' value='3'/>不开儿童票</label>");
        htm.push("<label><input type='radio' name='rdChd' value='2' />成人价格的75%</label>");
        htm.push("<label><input type='radio' name='rdChd' value='1'/>与成人价格相同</label></td></tr>");
        htm.push("<tr><td align='right'>机票价格</td>");
        htm.push("<td><label><input type='checkbox' id='chkPrice' checked/>不修改</label> <input style='width:60px' type='text' id='editPrice' disabled/> 元</td></tr>");
        htm.push("<tr><td align='right'>提前出票</td>");
        htm.push("<td><label><input type='checkbox' id='chkAhead' checked/>不修改</label> <input style='width:60px' type='text' id='editAhead' disabled/> 天</td></tr>");
        htm.push("<tr><td align='right'>最少停留</td>");
        htm.push("<td><label><input type='checkbox' id='chkMin' checked/>不修改</label> <input style='width:60px' type='text' id='editMinDay' disabled/> 天</td></tr>");
        htm.push("<tr><td align='right'>最多停留</td>");
        htm.push("<td><label><input type='checkbox' id='chkMax' checked/>不修改</label> <input style='width:60px' type='text' id='editMaxDay' disabled/> 天</td></tr>");
        htm.push("<tr><td align='right'>备注</td>");
        htm.push("<td><div class='bt6'><label><input type='radio' name='rdRmk' value='' checked/>不修改</label><label><input type='radio' name='rdRmk' value='True'/>覆盖</label><label><input type='radio' name='rdRmk' value='False'/>追加</label></div><input type='text' id='editRemark' style='width:360px;' disabled='true'/></td>");
        htm.push("</tr>");
        htm.push("</table>");
        htm.push("</div>");
        htm.push("<div style='text-align:right'><input type='button' class='btn btn-blue' onclick=\"EditAll()\" value='执行' /><input type='button' class='btn btn-white' value='关闭' onclick='closePop()'/></div>");

        popLayer("show", "批量修改政策", htm.join(''));

        $("#chkPrice").click(function () {
            if ($(this).is(":checked")) {
                $("#editPrice").attr("disabled", true);
            }
            else {
                $("#editPrice").attr("disabled", false);
            }
        });
        $("#chkAhead").click(function () {
            if ($(this).is(":checked")) {
                $("#editAhead").attr("disabled", true);
            }
            else {
                $("#editAhead").attr("disabled", false);
            }
        });
        $("#chkMin").click(function () {
            if ($(this).is(":checked")) {
                $("#editMinDay").attr("disabled", true);
            }
            else {
                $("#editMinDay").attr("disabled", false);
            }
        });
        $("#chkMax").click(function () {
            if ($(this).is(":checked")) {
                $("#editMaxDay").attr("disabled", true);
            }
            else {
                $("#editMaxDay").attr("disabled", false);
            }
        });
        $("#tbEdit input[name='rdRmk']").click(function () {
            if ($(this).val() == "") {
                $("#editRemark").attr("disabled", true);
            }
            else {
                $("#editRemark").attr("disabled", false);
            }
        });
    }
}

function EditAll() {
    var ids = getCheckbox("chkID");
    var record = getRadio("rdRecord");
    var adutype = getRadio("rdAdu");
    var chdway = getRadio("rdChd");
    var price = "";
    if (!$("#chkPrice").is(":checked")) {
        price = $("#editPrice").val();
        if (!$.isNumeric(price)) {
            alert("机票价格必须填写数字");
            $("#editPrice").focus();
            return false;
        }
    }
    var ahead = "";
    if (!$("#chkAhead").is(":checked")) {
        ahead = $("#editAhead").val();
        if (!$.isNumeric(ahead)) {
            alert("提前出票天数必须填写数字");
            $("#editAhead").focus();
            return false;
        }
    }
    var minday = "";
    if (!$("#chkMin").is(":checked")) {
        minday = $("#editMinDay").val();
        if (!$.isNumeric(minday)) {
            alert("最少停留天数必须填写数字");
            $("#editMinDay").focus();
            return false;
        }
    }
    var maxday = "";
    if (!$("#chkMax").is(":checked")) {
        maxday = $("#editMaxDay").val();
        if (!$.isNumeric(maxday)) {
            alert("最多停留天数必须填写数字");
            $("#editMaxDay").focus();
            return false;
        }
    }
   
    var remarktype = getRadio("rdRmk");
    var remark = $("#editRemark").val();

    tipPop("正在执行操作...");
    $.post("GJPolicyPriceList.php",
        { Action: "EditAll", ID: ids, Record: record, AduType: adutype, ChdWay: chdway, Price: price, Ahead: ahead, MinDay: minday, MaxDay: maxday, RemarkType: remarktype,  Remark: remark}
    , function (data) {
        if (data == "OK") {
            alertPop("执行成功！", function () { LoadList(); });
        }
        else {
            alertPop(data);
        }
    });
}
//#endregion