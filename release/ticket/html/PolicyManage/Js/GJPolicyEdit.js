$(document).ready(function () {
    BindTab();

    BindArea("Dep");
    BindArea("Arr");
    BindArea("Back");

    BindCityType("Dep");
    BindCityType("Arr");
    BindCityType("Back");

    loadCombox();
    BindEdit();

    if ($("#txtProvideOffice").is(":disabled")) {
        alertPop("您还没有设置支付宝收款账户，请设置后再编辑政策！", function () { BackUrl(); });
        return;
    }
});

//#region 城市发布
//绑定区域
function BindArea(table) {
    var tree = $('#tb' + table + 'Area div.tree');
    tree.html("<ul>" + HtmlArea(jsonArea) + "</ul>");

    tree.find("li").click(function () {
        var nt = $(this).next();
        var ft = $(this).children().first();
        if (ft.is("i")) {
            if (ft.hasClass("ib")) {
                ft.removeClass("ib");
                if (nt.is("ul")) {
                    nt.hide();
                }
            }
            else {
                ft.addClass("ib");
                if (nt.is("ul")) {
                    nt.show();
                }
            }
        }
    });

    tree.each(function () {
        $(this).find("li").eq(0).click();
    })

    tree.find("li").hover(
        function () {
            if ($(this).children().eq(1).is(":checked")) {
                $(this).children().eq(3).show();
            }
        },
        function () {
            $(this).children().eq(3).hide();
        });

    tree.find("input").click(function (e) {
        ChkTreeItem($(this));
        if (!$(this).is(":checked") && $(this).parent().hasClass("sli")) {
            $(this).parent().removeClass('sli');
            $("#div" + table + "Citys").html('');
        }
        e.stopPropagation();
    });

    tree.find("s").click(function (e) {
        var tab = table;
        tree.find("li").removeClass("sli");
        $(this).parent().addClass("sli");
        $("#div" + tab + "Citys").html("<img src='/images/loading.gif'> 正在读取机场列表...");
        $.getJSON("GJPolicyEdit.aspx?Action=GetAirportList&AreaLevel=" + $(this).attr("level") + "&callback=?", function (data) {
            var htm = [];
            var ext = $('#txt' + tab + 'Citys').val();
            for (var i = 0; i < data.length; i++) {
                var json = data[i];
                var chk = "";
                if (ext != "" && ext.indexOf(json.value) >= 0) {
                    chk = "checked";
                }
                htm.push("<label><input type='checkbox' value='" + json.value + "' text='" + json.text + "' " + chk + " onclick=\"GetAllBox('" + tab + "')\"/>" + json.text + "</label>");
            }
            $("#div" + tab + "Citys").html(htm.join(''));
        });
        e.stopPropagation();
    });
}
//绑定发布城市类型
function BindCityType(tab) {
    var rd = $("input[name='rd" + tab + "Citys']:checked");
    var vals = rd.val();
    $('#txt' + tab + 'Citys').val('');

    if (vals == "False") {
        $('#tb' + tab + 'Area div.tree').show();
        $("#div" + tab + "Citys").show();
        rd.parent().parent().find("input[type='text']").attr("disabled", false);
        GetAllBox(tab);
    }
    else {
        $('#tb' + tab + 'Area div.tree').hide();
        $("#div" + tab + "Citys").hide();
        rd.parent().parent().find("input[type='text']").attr("disabled", true);
    }
    $("#txt" + tab + "Citys").attr("placeholder", "请选择机场三字码, 以\"/\"分隔");
}
//点击区域树连锁关系
function ChkTree(d) {
    var chk = d.is(":checked");
    var chks = d.parent().parent().find("li input");
    var isallchk = true;
    chks.each(function () {
        if (!$(this).is(":checked")) {
            isallchk = false;
            return;
        }
    });
    var isnotchk = false;
    chks.each(function () {
        if ($(this).is(":checked")) {
            isnotchk = true;
            return;
        }
    });
    var prev = d.parent().parent().prev("li");
    if (prev.length > 0) {
        var pchk = prev.find("input");
        pchk[0].checked = isallchk;
        if (isnotchk) {
            prev.find("span").addClass("c-blue");
        }
        else {
            prev.find("span").removeClass("c-blue");
        }
        ChkTree(pchk);
    }
}
//点击选择区域树节点
function ChkTreeItem(d) {
    var chk = d.is(":checked");
    var sonchk = d.parent().next("ul").find("input");
    if (chk) {
        d.next().addClass("c-blue");
        d.next().next().show();
    }
    else {
        d.next().next().hide();
        d.next().removeClass("c-blue");
    }
    for (var i = 0; i < sonchk.length; i++) {
        sonchk[i].checked = chk;
        if (chk) {
            sonchk.eq(i).next().addClass("c-blue");
        }
        else {
            sonchk.eq(i).next().removeClass("c-blue");
        }
    }
    ChkTree(d);
}
//递归区域树
function HtmlArea(json) {
    var htm = [];
    htm.push("<li>" + (json.son.length == 0 ? "<m></m>" : "<i></i>"));
    htm.push("<input type='checkbox' value='" + json.value + "'/><span>" + json.text + "</span>");
    if (json.value != "") {
        htm.push("<s class='albl' level='" + json.value + "'>查看机场</s>");
    }
    htm.push("</li>");
    if (json.son.length > 0) {
        htm.push("<ul>");
        for (var i = 0; i < json.son.length; i++) {
            htm.push(HtmlArea(json.son[i]));
        }
        htm.push("</ul>");
    }
    return htm.join('');
}
//全选反选
function ChkResChk(tab) {
    var chks = $('#div' + tab + 'Citys').find("input");
    for (i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            chks[i].checked = false;
        }
        else {
            chks[i].checked = "checked";
        }
    }
    GetAllBox(tab);
}
//得到所有已勾选城市
function GetAllBox(tab) {
    var ext = $('#txt' + tab + 'Citys').val();
    var boxs = $("#div" + tab + "Citys").find("input");
    var isallchk = false;
    boxs.each(function () {
        if ($(this).is(":checked")) {
            if (ext.indexOf($(this).val() + "/") == -1) {
                ext += $(this).val() + "/";
            }
        }
        else {
            if (ext.indexOf($(this).val() + "/") >= 0) {
                ext = ext.replace($(this).val() + "/", "");
            }
            isallchk = true;
        }
    });
    $('#txt' + tab + 'Citys').val(ext);

    var treechk = $('#tb' + tab + 'Area div.tree li.sli').find("input");
    if (!isallchk) {
        $('#txt' + tab + 'Citys').val('');
    }
    if (treechk.length > 0) {
        treechk[0].checked = isallchk;
        ChkTreeItem(treechk);
    }
}
//搜索城市
var lastd, lastval = "", lastx = 0;
function ScanChk(d, tab) {
    var val = $(d).prev().val().toUpperCase();
    if (lastd == d && lastval != "" && lastval == val) {
        lastx += 1;
    }
    else {
        lastd = d;
        lastval = val;
        lastx = 0;
    }
    var div = $("#div" + tab + "Citys");
    div.find("label").removeClass('b-lorange');
    if (val != "") {
        var chks = div.find("input[type='checkbox'][text*='" + val + "']");
        var divs = div.find("div.div-tab");
        if (chks.length == lastx) {
            lastx = 0;
        }
        if (chks.length > 0) {
            var chk = chks.eq(lastx);
            chk.parent().addClass("b-lorange");
            chk.focus();
        }
    }
}

function TurnCity() {
    var deplimit = getRadio("rdDepCitys");
    var depcitys = $("#txtDepCitys").val();
    var depareas = GetAreasVal("tbDepArea");
    BindArea("Dep");

    var arrlimit = getRadio("rdArrCitys");
    var arrcitys = $("#txtArrCitys").val();
    var arrareas = GetAreasVal("tbArrArea");
    BindArea("Arr");

    setRadio("rdDepCitys", arrlimit);
    AreaEdit(arrareas, "tbDepArea");
    setRadio("rdArrCitys", deplimit);
    AreaEdit(depareas, "tbArrArea");

    BindCityType("Dep");
    $("#txtDepCitys").val(arrcitys);
    BindCityType("Arr");
    $("#txtArrCitys").val(depcitys);
}
//#endregion

//#region 排除旅行日期
function AddDate(d) {
    var htm = [];
    htm.push("<div class='mt6'>");
    htm.push("<input type='text' class='calendar' style='width:100px;' onfocus=\"WdatePicker(fmtData)\"/> - ");
    htm.push("<input type='text' class='calendar' style='width:100px;' onfocus=\"WdatePicker(fmtData)\"/> ");
    htm.push("<input type='button' class='btn btn-white' value='删除' onclick='DelDate(this)'/>");
    htm.push("</div>");
    $(d).parent().parent().append(htm.join(''));
}
function DelDate(d) {
    $(d).parent().remove();
}
//#endregion

//#region 时限舱位
function AddBerth(d) {
    var td = $(d).parents("td[name='tdBerthList']").eq(0);
    var tables = td.find("table.table");
    var table = tables.eq(0)
    var count = tables.length;
    var htm = table.html().replace("舱位1", "舱位" + count + "<div><input type='button' class='btn-mini btn-red' onclick='DelBerth(this)' value='删除' /></div>");
    htm = "<div class='mt15'><table class='table' name='tbBerth'>" + htm + "</table></div>";
    table.next().append(htm);
}

function DelBerth(d) {
    var div = $(d).parents("div.mt15").eq(0);
    var divs = div.parent();
    div.remove();
    OtherBerth(divs[0]);
}

function AddGroup() {
    var div = $("#divDateGroup div.bt20").eq(0);
    var count = $("#divDateGroup div.bt20").length + 1;
    var htm = div.html().replace("时间限定1", "时间限定" + count + "<div><input type='button' class='btn-mini btn-red' onclick='DelGroup(this)' value='删除' /></div>");
    var rnd = Math.random().toString().substr(2,3);
    var htm = htm.replace(/rdDateMixWay/g, "rdDateMixWay" + rnd);
    htm = "<div class='bt20'>" + htm + "</div>";
    $("#divDateGroup").append(htm);
}

function DelGroup(d) {
    var div = $(d).parents("div.bt20").eq(0);
    div.remove();
}

function OtherBerth(d) {
    var td = $(d).parents("td.ptd").eq(0);
    var berths = td.find("input[name='txtBerths']");
    var lab = td.find("td[name='tdOtherBerth'] span");
    lab.show();
    lab.attr("hid", "0");
    var all = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    berths.each(function () {
        for (var i = 0; i < all.length; i++) {
            var b = $(this).val().toUpperCase();
            if (b.indexOf(all[i]) > -1) {
                var the = td.find("span[name='spnBerth'][val='" + all[i] + "']");
                the.hide();
                the.attr("hid", "1");
            }
        }
    });
}

function ChangeBerthWay(d) {
    var tb = $(d).parents("table.table").eq(0);
    var val = $(d).val();
    if (val == "2") {
        tb.find("input[name!='txtBerths']").attr("disabled", true);
    }
    else {
        tb.find("input").attr("disabled", false);
        ChdType();
    }
}

//获取舱位类型下的舱位
function BerthType(d) {
    var carrier = $("#txtCarrier").val();
    var par = $(d).parent().parent().find("input[type='text']");
    $.get("GJPolicyEdit.aspx?Action=GetBerthList&Carrier=" + carrier + "&Key=" + $(d).val(), function (data) {
        if (data != "") {
            var data = data.replace(/,/g, "/");
            var val = par.val();
            if ($(d).is(":checked")) {
                if (val.indexOf(data) == -1) {
                    par.val(val + (val == "" ? data : "/" + data));
                }
            }
            else {
                if (par.val().indexOf(data) > -1) {
                    val = $.trim((val + "/").replace(data + "/", "").replace(/\//g, " ")).replace(/ /g, "/");
                    par.val(val);
                }
            }
        }
    });
}
//#endregion

//#region 其他
function BindTab() {
    var thisUrl = self.location.href;
    var inx = 0;
    if (thisUrl.indexOf("#") > -1){
        inx = thisUrl.substr(thisUrl.indexOf("#") + 1);
        inx = parseInt(inx);
    }
    $(".tabcon").hide();
    var as = $('#ulTab li a');
    $(".tabcon").eq(inx).show();
    as.eq(inx).addClass('sa');
    as.click(function () {
        if (!Validate(inx)) {
            return;
        }
        as.removeClass('sa');
        $(this).addClass('sa');
        $(".tabcon").hide();
        var i = as.index($(this));
        $(".tabcon").eq(i).show();
    });
}
//下一步
function Next(d, n) {
    if (d > n && !Validate(n)) {
        return;
    }
    $(".tabcon").hide();
    var as = $('#ulTab li a');
    as.removeClass('sa');
    as.eq(d).addClass('sa');
    $(".tabcon").eq(d).show();
    $(document.body).scrollTop(0);
}

function ChdType() {
    var val = getRadio("rdChd");
    switch (val) {
        case "1":
        case "3":
            $("input[name='txtChdBase']").attr("disabled", true);
            $("input[name='txtChdDiscount']").attr("disabled", true);
            $("input[name='txtChdTicketFare']").attr("disabled", true);
            break;
        case "2":
            $("input[name='txtChdBase']").attr("disabled", false);
            $("input[name='txtChdDiscount']").attr("disabled", false);
            $("input[name='txtChdTicketFare']").attr("disabled", false);
            $("select[name='dropBerthWay']").each(function (i) {
                var val = $(this).val();
                if (val == "2") {
                    $("input[name='txtChdBase']").eq(i).attr("disabled", true);
                    $("input[name='txtChdDiscount']").eq(i).attr("disabled", true);
                    $("input[name='txtChdTicketFare']").eq(i).attr("disabled", true);
                }
            });
            break;
    }
}

function ChkPerson(d) {
    var chk = $(d).is(":checked");
    $("#txtPersonNum").attr("disabled", chk);
    if (chk) {
        $("#txtPersonNum").val('');
    }
}

//checkbox和input[text]的启用关系
function ChkToBox(d) {
    var name = $(d).attr("id").replace("chk", "txt");
    if ($(d).is(":checked")) {
        $("#" + name).attr("disabled", false);
    }
    else {
        $("#" + name).attr("disabled", true);
    }
}
//开票组工作时间联动
function ChangeOffice() {
    var val = $("#txtTicketOffice").attr("val");
    var sel = $("#txtTicketOffice").parent().find("ul li[val='" + val + "']");
    var htm = [];
    if (sel.length > 0) {
        htm.push("<table class='table'>");
        htm.push("<tr>");
        htm.push("<th>开票工作时间</th>");
        htm.push("<th>废票工作时间</th>");
        htm.push("<th>退票改签工作时间</th>");
        htm.push("</tr>");
        htm.push("<tr>");
        htm.push("<td valign='top'>" + sel.attr("worktime") + "</td>");
        htm.push("<td valign='top'>" + sel.attr("voidtime") + "</td>");
        htm.push("<td valign='top'>" + sel.attr("refundtime") + "</td>");
        htm.push("</tr>");
        htm.push("</table>");
        setRadio("rdType", sel.attr("type"));
    }
    $("#hidWork").val(htm.join(''));
}
//显示工作时间
function ShowWork(d) {
    noteLayer(d, $("#hidWork").val());
}
//返回上一页
function BackUrl() {
    window.location.href = $("#hidBackUrl").val();
}
//航段类型
function VoyType() {
    var rd = getRadio("rdVoyage");
    if (rd == "2") {
        $("#txtSingleCash").attr("disabled", false);
        $("#txtDoubleCash").attr("disabled", true);
        $("#tbBackArea").hide();
        $("#txtBackFlights").attr("disabled", true);
    }
    else {
        $("#txtSingleCash").attr("disabled", (rd == "3"));
        $("#txtDoubleCash").attr("disabled", false);
        $("#tbBackArea").show();
        $("#txtGoFlights").attr("disabled", false);
        $("#txtBackFlights").attr("disabled", false);
    }
}
//必须直飞
function NonStop() {
    if ($("#chkNonStop").is(":checked")) {
        $("#divChangeCity").hide();
    }
    else {
        $("#divChangeCity").show();
    }
}

function AddonType() {
    var rd = getRadio("rdAddon");
    $("#tdChangeIn input").attr("disabled", (rd == "4"));
}

function SpaType() {
    var rd = getRadio("rdSPA");
    $("#tdChangeOut input").attr("disabled", (rd == "3"));
}

//显示航司规则
function ShowRule(d, cid, rid) {
    $.getJSON("GJPolicyList.aspx?Action=GetRule&RuleID=" + rid + "&CompanyID=" + cid + "&callback=?",
    function (json) {
        if (json.ret != "OK") {
            alertPop(json.ret);
        }
        else {
            var htm = [];
            htm.push("<table class='table' cellspacing='0'>");
            htm.push("<tr>");
            htm.push("<td width='90' align='right'>规则名</td>");
            htm.push("<td>" + json.name + "</td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td align='right'>适用航司</td>");
            htm.push("<td>" + json.carrier + "</td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td align='right'>OPEN票</td>");
            htm.push("<td>" + json.open + "</td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td align='right'>Q值</td>");
            htm.push("<td>" + json.q + "</td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td align='right'>票价基础</td>");
            htm.push("<td>" + json.basis + "</td>");
            htm.push("</tr>");
            htm.push("<tr>");
            htm.push("<td align='right'>有奖励航段规则</td>");
            htm.push("<td>" + json.effective + "<div class='mt6'>" + json.noeffective + "</div><div class='mt6'>" + json.spa + "<br>　　" + json.spagroup + "<br>　　" + json.spanogroup + "</div><div class='mt6'>" + json.nospa + "<br>　　" + json.nospagroup + "<br>　　" + json.nospanogroup + "</div><div class='mt6'>" + json.addon + "</div><div class='mt6'>" + json.noaddon + "</div></td>");
            htm.push("</tr>");
            htm.push("</table>");
            noteLayer(d, htm.join(''));
        }
    });
}
//#endregion

//#region 编辑还原
//获取区域码值
function GetAreasVal(name) {
    var chks = $('#' + name + ' div.tree').find("input[type='checkbox']:checked");
    var areas = [];
    chks.each(function (i) {
        if ($(this).val() != "") {
            if (areas.length == 0) {
                areas.push($(this).val());
            }
            else {
                var lastchk = areas[areas.length - 1];
                if ($(this).val().indexOf(lastchk) != 0) {
                    areas.push($(this).val());
                }
            }
        }
    });
    return areas.join(',');
}
//不适用日期编辑
function DateEdit(date, td) {
    var arrDate = date.split(',');
    var divs = td.find("div");
    if (arrDate.length > 1) {
        for (var i = 0; i < arrDate.length - divs.length; i++) {
            divs.eq(0).find("input[type='button']").click();
        }
    }
    divs = td.find("div");
    for (var i = 0; i < arrDate.length; i++) {
        var arrOne = arrDate[i].split('~');
        var inp = divs.eq(i).find("input[type='text']");
        inp.eq(0).val(arrOne[0]);
        inp.eq(1).val(arrOne[1]);
    }
}
//区域树默认值绑定
function AreaEdit(areas, name) {
    var tree = $("#" + name + " div.tree");
    var boxs = tree.find("input");
    var arrarea = areas.split(',');
    for (var i = 0; i < arrarea.length; i++) {
        var box = tree.find("input[value='" + arrarea[i] + "']");
        box.click();
        var ulp = box.parent().parent();
        for (var j = 0; j < 5; j++) {
            var lip = ulp.prev();
            if (lip.is("li")) {
                if (ulp.is(":hidden")) {
                    lip.click();
                    ulp = lip.parent();
                }
            }
            else {
                break;
            }
        }
    }
}
//绑定编辑数据
function BindEdit() {
    if ($("#hidID").val() != "") {
        //#region 基础
        $("#txtCarrier").val(jsonEdit.carrier);
        $("#txtSameCarrier").val(jsonEdit.carriersame);
        $("#txtProvideOffice").val(jsonEdit.officeprovider);
        setCombox("txtTicketOffice", jsonEdit.officegroupid);
        $("#txtTicketOffice").val(jsonEdit.officeticket);
        setRadio("rdType", jsonEdit.tickettype);
        setRadio("rdVoyage", jsonEdit.voyagetype);
        $("#chkNonStop").attr("checked", jsonEdit.nonstop);
        $("#chkSameCarrier").attr("checked", jsonEdit.carrieridentity);
        setCheckbox("chkAdu", jsonEdit.adutype);
        setRadio("rdChd", jsonEdit.chdway);
        $("#chkChdNone").attr("checked", jsonEdit.chdnone);
        $("#chkAuditing").attr("checked", jsonEdit.ticketauditing);
        setRadio("rdMixBerth", jsonEdit.mixberth);
        setRadio("rdMixSeason", jsonEdit.mixseason);
        setRadio("rdMixBS", jsonEdit.mixsb);
        setRadio("rdMixBase", jsonEdit.mixbase);
        //#endregion
        //#region 航段
        setRadio("rdDepCitys", jsonEdit.deplimit);
        AreaEdit(jsonEdit.deparea, "tbDepArea");
        setRadio("rdArrCitys", jsonEdit.arrlimit);
        AreaEdit(jsonEdit.arrarea, "tbArrArea");
        setRadio("rdBackCitys", jsonEdit.backlimit);
        AreaEdit(jsonEdit.backarea, "tbBackArea");

        BindCityType("Dep");
        $("#txtDepCitys").val(jsonEdit.depcity);
        BindCityType("Arr");
        $("#txtArrCitys").val(jsonEdit.arrcity);
        BindCityType("Back");
        $("#txtBackCitys").val(jsonEdit.backcity);

        var rdc = "";
        var citys = jsonEdit.changegncity;
        if (jsonEdit.changegncity.substr(0, 1) == "!") {
            rdc = "!";
            citys = jsonEdit.changegncity.substr(1);
        }
        setRadio("rdChangeIn", rdc);
        $("#txtChangInCity").val(citys);
        rdc = "";
        citys = jsonEdit.changegjcity;
        if (jsonEdit.changegjcity.substr(0, 1) == "!") {
            rdc = "!";
            citys = jsonEdit.changegjcity.substr(1);
        }
        setRadio("rdChangeOut", rdc);
        $("#txtChangOutCity").val(citys);
        $("#txtGoFlights").val(jsonEdit.flightsgo);
        $("#txtBackFlights").val(jsonEdit.flightsback);
        $("#txtNoFlights").val(jsonEdit.flightsnone);
        $("#txtNoVoyages").val(jsonEdit.voyagenone);
        //#endregion
        //#region 条件
        setRadio("rdRule", jsonEdit.ruleid);
        $("#txtPersonNum").val(jsonEdit.personnum == "0" ? "" : jsonEdit.personnum);
        if (jsonEdit.persondouble) { $("#chkDoublePerson").click(); }
        $("#txtYearFrom").val(jsonEdit.yearsfrom == "0" ? "" : jsonEdit.yearsfrom);
        $("#txtYearTo").val(jsonEdit.yearsto == "0" ? "" : jsonEdit.yearsto);
        setRadio("rdRecord", jsonEdit.record);
        $("#chkRecordNoRights").attr("checked", jsonEdit.recordnoright);
        if (jsonEdit.recordoffice != "") {
            $("#chkRecordToOffice").click();
            $("#txtRecordToOffice").val(jsonEdit.recordoffice);
        }
        setCheckbox("chkNoDiscount", jsonEdit.discountnone);
        setRadio("rdAddon", jsonEdit.addon);
        setRadio("rdSPA", jsonEdit.spa);
        $("#chkPriceLow").attr("checked", jsonEdit.pricelow);
        $("#txtPriceMin").val(jsonEdit.pricemin == "0" ? "" : jsonEdit.pricemin);
        $("#txtPriceMax").val(jsonEdit.pricemax == "0" ? "" : jsonEdit.pricemax);
        $("#txtAheadDay").val(jsonEdit.aheadday == "0" ? "" : jsonEdit.aheadday);
        $("#txtRemark").val(jsonEdit.remark);
        $("#txtFlag").val(jsonEdit.flag);
        //#endregion

        //#region 时间
        if (jsonEdit.datelist.length > 1) {
            for (var i = 1; i < jsonEdit.datelist.length; i++) {
                AddGroup();
            }
        }
        
        var ticketdatefrom = $("input[name='txtTicketDateFrom']");
        var ticketdateto = $("input[name='txtTicketDateTo']");
        var godatefrom = $("input[name='txtGoDateFrom']");
        var godateto = $("input[name='txtGoDateTo']");
        var mixdatemay = $("td[name='tdDateMixWay']");
        var backdateto = $("input[name='txtBackDateTo']");
        var godatenone = $("td[name='tdGoDateNone']");
        var backdatenone = $("td[name='tdBackDateNone']");
        var berthadd = $("input[name='btnBerthAdd']");
        var tdberth = $("td[name='tdBerthList']");
        $(jsonEdit.datelist).each(function (i) {
            ticketdatefrom.eq(i).val(this.dateticketfrom);
            ticketdateto.eq(i).val(this.dateticketto);
            godatefrom.eq(i).val(this.dategofrom);
            godateto.eq(i).val(this.dategoto);
            mixdatemay.eq(i).find("input[group='DateMixWay'][value='" + this.datemixway + "']")[0].checked = true;
            DateEdit(this.dategonone, godatenone.eq(i));
            backdateto.eq(i).val(this.datebackto);
            DateEdit(this.datebacknone, backdatenone.eq(i));
            if (this.berthlist.length > 1) {
                for (var j = 1; j < this.berthlist.length; j++) {
                    if (!this.berthlist[j].isother) {
                        AddBerth(berthadd.eq(i)[0]);
                    }
                }
            }

            var berthgroup = tdberth.eq(i);
            var berths = berthgroup.find("table[name='tbBerth']");
            var other = berthgroup.find("table[name='tbOther']");
            var nb = 0;
            $(this.berthlist).each(function (x) {
                if (!this.isother) {
                    var berth = berths.eq(nb);
                    berth.find("input[name='txtBaseDiscount']").val(this.discountbase);
                    berth.find("input[name='txtTicketFare']").val(this.ticketfare);
                    berth.find("input[name='txtChdTicketFare']").val(this.chdticketfare);
                    berth.find("input[name='txtAwardDiscount']").val(this.discount);
                    berth.find("input[name='txtSingleCash']").val(this.cashsingle);
                    berth.find("input[name='txtDoubleCash']").val(this.cashdouble);
                    berth.find("input[name='txtChdBase']").val(this.chdbase);
                    berth.find("input[name='txtChdDiscount']").val(this.chddiscount);
                    berth.find("input[name='txtAddonBerths']").val(this.berthaddon);
                    berth.find("select[name='dropBerthWay'] option[value='" + this.berthway + "']").attr("selected", true);
                    var way = berth.find("select[name='dropBerthWay']")[0];
                    ChangeBerthWay(way);
                    var txtB = berth.find("input[name='txtBerths']");
                    txtB.val(this.berth);
                    OtherBerth(txtB[0]);
                    nb++;
                }
                else {
                    other.find("input[name='txtBaseDiscount']").val(this.discountbase);
                    other.find("input[name='txtTicketFare']").val(this.ticketfare);
                    other.find("input[name='txtChdBase']").val(this.chdbase);
                    other.find("input[name='txtChdTicketFare']").val(this.chdticketfare);
                    other.find("select[name='dropBerthWay'] option[value='" + this.berthway + "']").attr("selected", true);
                    var way = other.find("select[name='dropBerthWay']")[0];
                    ChangeBerthWay(way);
                }
            });
        });
        //#endregion

        VoyType();
        ChdType();
        NonStop();
        AddonType();
        SpaType();
    }
}
//#endregion

//验证OFFICE
function ValOffice(code) {
    var regu = /^[a-zA-Z]{3}[0-9]{3}$/gi;
    var re = new RegExp(regu);
    if (re.test(code))
        return true;
    else
        return false;
}
function Validate(n) {
    switch (n) {
        case 0:
            //#region 基础信息
            var carrier = $("#txtCarrier").val().toUpperCase();
            var provideoffice = $("#txtProvideOffice").val().toUpperCase();
            var ticketoffice = $("#txtTicketOffice").val().toUpperCase();
            var officegroupid = $("#txtTicketOffice").attr('val');

            if (carrier.length != 2) {
                alertPop("请正确填写航空公司二字码！", function () {
                    $("#txtCarrier").focus();
                });
                return false;
            }
            if (!ValOffice(provideoffice)) {
                alertPop("请正确填写供应商OFFICE号！", function () {
                    $("#txtProvideOffice").focus();
                });
                return false;
            }
            if (ticketoffice == "" || (ticketoffice != "" && !ValOffice(ticketoffice.substr(0, 6)))) {
                alertPop("请正确填写开票OFFICE号！", function () {
                    $("#txtTicketOffice").focus();
                });
                return false;
            }
            else {
                ticketoffice = ticketoffice.substr(0, 6);
            }
            if (!$.isNumeric(officegroupid)) {
                alertPop("请先选择一个开票组，<br>确认工作时间后才可以修改OFFICE号！", function () {
                    $("#txtTicketOffice").focus();
                });
                return false;
            }
            //#endregion
            //#region 航程信息
            var voyagetype = getRadio("rdVoyage");
            var deplimit = getRadio("rdDepCitys");
            var depcitys = $("#txtDepCitys").val();
            var depareas = GetAreasVal("tbDepArea");
            var arrlimit = getRadio("rdArrCitys");
            var arrcitys = $("#txtArrCitys").val();
            var arrareas = GetAreasVal("tbArrArea");
            var backlimit = getRadio("rdBackCitys");
            var backcitys = $("#txtBackCitys").val();
            var backareas = GetAreasVal("tbBackArea");

            if (deplimit == "False") {
                if (depareas == "") {
                    alertPop("请选择始发区域！", function () {
                        $("input[name='rdDepCitys']").eq(0).focus();
                    });
                    return false;
                }
            }
            else {
                depareas = "";
                if (depcitys == "") {
                    alertPop("请填写始发区域的限定机场！", function () {
                        $("#txtDepCitys").focus();
                    });
                    return false;
                }
            }

            if (arrlimit == "False") {
                if (arrareas == "") {
                    alertPop("请选择到达区域！", function () {
                        $("input[name='rdArrCitys']").eq(0).focus();
                    });
                    return false;
                }
            }
            else {
                arrareas = "";
                if (arrcitys == "") {
                    alertPop("请填写到达区域的限定机场！", function () {
                        $("#txtArrCitys").focus();
                    });
                    return false;
                }
            }

            if (voyagetype != "2") {
                if (backlimit == "False") {
                    if (backareas == "") {
                        alertPop("请选择返回区域！", function () {
                            $("input[name='rdBackCitys']").eq(0).focus();
                        });
                        return false;
                    }
                }
                else {
                    backareas = "";
                    if (backcitys == "") {
                        alertPop("请填写返回区域的限定机场！", function () {
                            $("#txtBackCitys").focus();
                        });
                        return false;
                    }
                }
            }
            //#endregion
            break;
        case 1:
            //#region 时间限定
            var adutype = getCheckbox("chkAdu");
            var chdway = getRadio("rdChd");
            if (adutype == "") {
                alertPop("请选择成人类型！", function () {
                    $("input[type='checkbox'][name='chkAdu']").focus();
                });
                return false;
            }

            var validate = true;
            $("#divDateGroup div.bt20").each(function (i) {
                validate = true;
                var inx = i + 1;
                var dataticketfrom = $(this).find("input[name='txtTicketDateFrom']");
                var dataticketto = $(this).find("input[name='txtTicketDateTo']");
                var datagofrom = $(this).find("input[name='txtGoDateFrom']");
                var datagoto = $(this).find("input[name='txtGoDateTo']");
                var datagonone = [], gdn = 0;
                var gocals = $(this).find("td[name='tdGoDateNone'] input.calendar");
                gocals.each(function (x) {
                    if ($(this).val() != "") {
                        gdn++;
                        if (x % 2 == 1) {
                            datagonone.push("~" + $(this).val());
                        }
                        else {
                            datagonone.push("," + $(this).val());
                        }
                    }
                });
                datagonone = datagonone.join('').substr(1);

                var databacknone = [], bdn = 0;
                var backcals = $(this).find("td[name='tdBackDateNone'] input.calendar");
                backcals.each(function (x) {
                    if ($(this).val() != "") {
                        bdn++;
                        if (x % 2 == 1) {
                            databacknone.push("~" + $(this).val());
                        }
                        else {
                            databacknone.push("," + $(this).val());
                        }
                    }
                });
                databacknone = databacknone.join('').substr(1);

                if (dataticketfrom.val() == "") {
                    alertPop("请正确[时间组" + inx + "]填写开票起始有效期！", function () {
                        dataticketfrom.focus();
                    });
                    validate = false;
                    return false;
                }
                if (dataticketto.val() == "") {
                    alertPop("请正确[时间组" + inx + "]填写开票结束有效期！", function () {
                        dataticketto.focus();
                    });
                    validate = false;
                    return false;
                }
                if (datagofrom.val() == "") {
                    alertPop("请正确[时间组" + inx + "]填写去程起始有效期！", function () {
                        datagofrom.focus();
                    });
                    validate = false;
                    return false;
                }
                if (datagoto.val() == "") {
                    alertPop("请正确[时间组" + inx + "]填写去程结束有效期！", function () {
                        datagoto.focus();
                    });
                    validate = false;
                    return false;
                }

                if (gdn % 2 != 0 || (datagonone != "" && datagonone.indexOf("~") == -1)) {
                    alertPop("请正确[时间组" + inx + "]填写去程不适用日期！", function () {
                        gocals.eq(0).focus();
                    });
                    validate = false;
                    return false;
                }
                if (bdn % 2 != 0 || (databacknone != "" && databacknone.indexOf("~") == -1)) {
                    alertPop("请正确[时间组" + inx + "]填写回程不适用日期！", function () {
                        backcals.eq(0).focus();
                    });
                    validate = false;
                    return false;
                }

                var valiberth = true;
                $(this).find("table[name='tbBerth']").each(function (j) {
                    var n = j + 1;
                    var discountbase = $(this).find("input[name='txtBaseDiscount']");
                    var discountaward = $(this).find("input[name='txtAwardDiscount']");
                    var ticketfare = $(this).find("input[name='txtTicketFare']");
                    var cashsingle = $(this).find("input[name='txtSingleCash']");
                    var cashdouble = $(this).find("input[name='txtDoubleCash']");
                    var chdbase = $(this).find("input[name='txtChdBase']");
                    var chddiscount = $(this).find("input[name='txtChdDiscount']");
                    var chdticketfare = $(this).find("input[name='txtChdTicketFare']");
                    var berths = $(this).find("input[name='txtBerths']");
                    var noticket = $(this).find("select[name='dropBerthWay']");

                    if (noticket.val() != "2") {
                        if (discountbase.val() != "" && !$.isNumeric(discountbase.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的代理费！", function () {
                                discountbase.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (discountaward.val() != "" && !$.isNumeric(discountaward.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的奖励！", function () {
                                discountaward.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (ticketfare.val() != "" && !$.isNumeric(ticketfare.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的开票费！", function () {
                                ticketfare.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (cashsingle.val() != "" && !$.isNumeric(cashsingle.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的单程直减！", function () {
                                cashsingle.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (cashdouble.val() != "" && !$.isNumeric(cashdouble.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的往返直减！", function () {
                                cashdouble.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (chdbase.val() != "" && !$.isNumeric(chdbase.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的儿童代理费！", function () {
                                chdbase.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (chddiscount.val() != "" && !$.isNumeric(chddiscount.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的儿童奖励！", function () {
                                chddiscount.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                        if (chdticketfare.val() != "" && !$.isNumeric(chdticketfare.val())) {
                            alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的儿童开票费！", function () {
                                chdticketfare.focus();
                            });
                            valiberth = false;
                            return false;
                        }
                    }
                    if (j == 0) {
                        OtherBerth(berths[0]);
                    }
                    if (berths.val() == "") {
                        alertPop("请正确填写[时间组" + inx + "][舱位" + n + "]的舱位！", function () {
                            berths.focus();
                        });
                        valiberth = false;
                        return false;
                    }
                });
                if (!valiberth) {
                    validate = false;
                    return false;
                }

                var odiscountbase = $(this).find("table[name='tbOther'] input[name='txtBaseDiscount']");
                var oticketfare = $(this).find("table[name='tbOther'] input[name='txtTicketFare']");
                var ochdticketfare = $(this).find("table[name='tbOther'] input[name='txtChdTicketFare']");
                var onoticket = $(this).find("table[name='tbOther'] select[name='dropBerthWay']");
                if (onoticket.val() != "2") {
                    if (odiscountbase.val() != "" && !$.isNumeric(odiscountbase.val())) {
                        alertPop("请正确填写[时间组" + inx + "][其他舱位]的代理费！", function () {
                            odiscountbase.focus();
                        });
                        validate = false;
                        return false;
                    }
                    if (oticketfare.val() != "" && !$.isNumeric(oticketfare.val())) {
                        alertPop("请正确填写[时间组" + inx + "][其他舱位]的开票费！", function () {
                            oticketfare.focus();
                        });
                        validate = false;
                        return false;
                    }
                    if (ochdticketfare.val() != "" && !$.isNumeric(ochdticketfare.val())) {
                        alertPop("请正确填写[时间组" + inx + "][其他舱位]的儿童开票费！", function () {
                            ochdticketfare.focus();
                        });
                        validate = false;
                        return false;
                    }
                }
            });
            return validate;
            //#endregion
            break;
        case 2:
            //#region 条件限定
            var ruleid = getRadio("rdRule");
            var personnum = ($("#txtDoublePerson").is(":checked") ? "" : $("#txtPersonNum").val());
            var yearfrom = $("#txtYearFrom").val();
            var yearto = $("#txtYearTo").val();
            var record = getRadio("rdRecord");
            var recordoffice = ($("#chkRecordToOffice").is(":checked") ? $("#txtRecordToOffice").val() : "");
            var pricemin = $("#txtPriceMin").val();
            var pricemax = $("#txtPriceMax").val();
            var aheadday = $("#txtAheadDay").val();

            if (ruleid == "") {
                alertPop("请选择一个航司规则！", function () {
                    $("input[name='rdRule']:first").focus();
                });
                return false;
            }
            if (record == "") {
                alertPop("请选择换编码类型！", function () {
                    $("input[name='record']:first").focus();
                });
                return false;
            }
            if (personnum != "" && !$.isNumeric(personnum)) {
                alertPop("请正确填写适用人数！", function () {
                    $("#txtPersonNum").focus();
                });
                return false;
            }
            if ((yearfrom != "" && !$.isNumeric(yearfrom)) || (yearto != "" && !$.isNumeric(yearto))) {
                alertPop("请正确填写适用年龄！", function () {
                    $("#txtYearTo").focus();
                });
                return false;
            }
            if (pricemin != "" && !$.isNumeric(pricemin)) {
                alertPop("请正确填写票面限制金额（正整数）！", function () {
                    $("#txtPriceMin").focus();
                });
                return false;
            }
            if (pricemax != "" && !$.isNumeric(pricemax)) {
                alertPop("请正确填写票面限制金额（正整数）！", function () {
                    $("#txtPriceMax").focus();
                });
                return false;
            }
            if (aheadday != "" && !$.isNumeric(aheadday)) {
                alertPop("请正确填写提前出票天数（正整数）！", function () {
                    $("#txtAheadDay").focus();
                });
                return false;
            }
            if ($("#chkRecordToOffice").is(":checked") && recordoffice == "") {
                alertPop("请正确填写不开票的订位OFFICE号！", function () {
                    $("#txtRecordToOffice").focus();
                });
                return false;
            }
            //#endregion
            break;
    }
    return true;
}

function Save(d) {
    var id = $("#hidID").val();
    if (!Validate(0)) {
        return;
    }
    //#region 基础信息
    var carrier = $("#txtCarrier").val().toUpperCase();
    var carriersame = $("#txtSameCarrier").val().toUpperCase();
    var provideoffice = $("#txtProvideOffice").val().toUpperCase();
    var ticketoffice = $("#txtTicketOffice").val().toUpperCase();
    ticketoffice = ticketoffice.substr(0, 6);
    var officegroupid = $("#txtTicketOffice").attr('val');
    var tickettype = getRadio("rdType");
    var ticketauditing = ($("#chkAuditing").is(":checked") ? "True" : "False");
    //#endregion

    //#region 航程信息
    var voyagetype = getRadio("rdVoyage");
    var deplimit = getRadio("rdDepCitys");
    var depcitys = $("#txtDepCitys").val();
    var depareas = GetAreasVal("tbDepArea");
    var arrlimit = getRadio("rdArrCitys");
    var arrcitys = $("#txtArrCitys").val();
    var arrareas = GetAreasVal("tbArrArea");
    var backlimit = getRadio("rdBackCitys");
    var backcitys = $("#txtBackCitys").val();
    var backareas = GetAreasVal("tbBackArea");
    var changegn = getRadio("rdChangeIn") + $("#txtChangInCity").val().toUpperCase();
    var changegj = getRadio("rdChangeOut") + $("#txtChangOutCity").val().toUpperCase();
    var flightsgo = $("#txtGoFlights").val().toUpperCase();
    var flightsback = $("#txtBackFlights").val().toUpperCase();
    var flightsnone = $("#txtNoFlights").val().toUpperCase();
    var voyagenone = $("#txtNoVoyages").val().toUpperCase();

    if (deplimit == "False") {
        if (depareas == "0") {
            depareas = "";
        }
    }
    else {
        depareas = "";
    }

    if (arrlimit == "False") {
        if (arrareas == "0") {
            arrareas = "";
        }
    }
    else {
        arrareas = "";
    }

    if (voyagetype != "2") {
        if (backlimit == "False") {
            if (backareas == "0") {
                backareas = "";
            }
        }
        else {
            backareas = "";
        }
    }
    //#endregion

    //#region 时间限定
    if (!Validate(1)) {
        return;
    }
    var adutype = getCheckbox("chkAdu");
    var chdway = getRadio("rdChd");
    var chdnone = ($("#chkChdNone").is(":checked") ? "True" : "False");
    var mixseason = getRadio("rdMixSeason");
    var mixberth = getRadio("rdMixBerth");
    var mixsb = getRadio("rdMixBS");
    var mixbase = getRadio("rdMixBase");

    var dategroup = [];
    $("#divDateGroup div.bt20").each(function (i) {
        //#region 时间
        var dateone = [];
        var dataticketfrom = $(this).find("input[name='txtTicketDateFrom']").val();
        var dataticketto = $(this).find("input[name='txtTicketDateTo']").val();
        var datagofrom = $(this).find("input[name='txtGoDateFrom']").val();
        var datagoto = $(this).find("input[name='txtGoDateTo']").val();
        var datamixway = $(this).find("input[group='DateMixWay']:checked").val();
        var databackto = $(this).find("input[name='txtBackDateTo']").val();

        var datagonone = [], gdn = 0;
        var gocals = $(this).find("td[name='tdGoDateNone'] input.calendar");
        gocals.each(function (x) {
            if ($(this).val() != "") {
                gdn++;
                if (x % 2 == 1) {
                    datagonone.push("~" + $(this).val());
                }
                else {
                    datagonone.push("," + $(this).val());
                }
            }
        });
        datagonone = datagonone.join('').substr(1);

        var databacknone = [], bdn = 0;
        var backcals = $(this).find("td[name='tdBackDateNone'] input.calendar");
        backcals.each(function (x) {
            if ($(this).val() != "") {
                bdn++;
                if (x % 2 == 1) {
                    databacknone.push("~" + $(this).val());
                }
                else {
                    databacknone.push("," + $(this).val());
                }
            }
        });
        databacknone = databacknone.join('').substr(1);
        //#endregion

        //#region 舱位
        var berthgroup = [];
        $(this).find("table[name='tbBerth']").each(function (j) {
            var berthone = [];
            var discountbase = $(this).find("input[name='txtBaseDiscount']").val();
            var discountaward = $(this).find("input[name='txtAwardDiscount']").val();
            var ticketfare = $(this).find("input[name='txtTicketFare']").val();
            var cashsingle = $(this).find("input[name='txtSingleCash']").val();
            var cashdouble = $(this).find("input[name='txtDoubleCash']").val();
            var chdbase = $(this).find("input[name='txtChdBase']").val();
            var chddiscount = $(this).find("input[name='txtChdDiscount']").val();
            var chdticketfare = $(this).find("input[name='txtChdTicketFare']").val();
            var berths = $(this).find("input[name='txtBerths']").val().toUpperCase();
            var berthsaddon = $(this).find("input[name='txtAddonBerths']").val().toUpperCase();
            var berthway = $(this).find("select[name='dropBerthWay']").val();

            berthone.push(discountbase == "" ? "0" : discountbase); //代理费
            berthone.push(discountaward == "" ? "0" : discountaward); //奖励
            berthone.push(ticketfare == "" ? "0" : ticketfare); //开票费
            berthone.push(cashsingle == "" ? "0" : cashsingle); //单程直减
            berthone.push(cashdouble == "" ? "0" : cashdouble); //往返直减
            berthone.push(chdbase == "" ? "0" : chdbase); //儿童代理费
            berthone.push(chddiscount == "" ? "0" : chddiscount); //儿童奖励
            berthone.push(chdticketfare == "" ? "0" : chdticketfare); //儿童开票费
            berthone.push(berths.replace(/,/, "/")); //舱位
            berthone.push(berthsaddon.replace(/,/, "/")); //Addon舱位
            berthone.push(berthway);  //混舱方式
            berthone.push("False"); //不是其他舱位
            berthgroup.push(berthone.join(","))
        });

        var otb = $(this).find("table[name='tbOther']");
        var odiscountbase = otb.find("input[name='txtBaseDiscount']").val();
        var oticketfare = otb.find("input[name='txtTicketFare']").val();
        var ochdbase = otb.find("input[name='txtChdBase']").val();
        var ochdticketfare = otb.find("input[name='txtChdTicketFare']").val();
        var oberthway = otb.find("select[name='dropBerthWay']").val();
        var berthother = [];
        $(this).find("td[name='tdOtherBerth'] span[name='spnBerth']").each(function () {
            if ($(this).attr("hid") == "0") {
                berthother.push($(this).attr("val"));
            }
        });
        berthother = berthother.join("/");
        if (berthother != "") {
            var berthone = [];
            berthone.push(odiscountbase == "" ? "0" : odiscountbase); //代理费
            berthone.push("0"); //奖励
            berthone.push(oticketfare == "" ? "0" : oticketfare); //开票费
            berthone.push("0"); //单程直减
            berthone.push("0"); //往返直减
            berthone.push(ochdbase == "" ? "0" : ochdbase); //儿童代理费
            berthone.push("0"); //儿童奖励
            berthone.push(ochdticketfare == "" ? "0" : ochdticketfare); //儿童开票费
            berthone.push(berthother); //舱位
            berthone.push(""); //Addon舱位
            berthone.push(oberthway); //混舱方式
            berthone.push("True"); //是其他舱位
            berthgroup.push(berthone.join(","));
        }
        //#endregion

        dateone.push(dataticketfrom);
        dateone.push(dataticketto);
        dateone.push(datagofrom);
        dateone.push(datagoto);
        dateone.push(databackto);
        dateone.push(datagonone);
        dateone.push(databacknone);
        dateone.push(datamixway);
        dateone.push(berthgroup.join("^"));
        dategroup.push(dateone.join("|"));
    });
    dategroup = dategroup.join("$");
    //#endregion

    //#region 条件限定
    var ruleid = getRadio("rdRule");
    var personnum = ($("#txtDoublePerson").is(":checked") ? "" : $("#txtPersonNum").val());
    var persondouble = ($("#chkDoublePerson").is(":checked") ? "True" : "False");
    var yearfrom = $("#txtYearFrom").val();
    var yearto = $("#txtYearTo").val();
    var record = getRadio("rdRecord");
    var recordnorights = ($("#chkRecordNoRights").is(":checked") ? "True" : "False");
    var recordoffice = ($("#chkRecordToOffice").is(":checked") ? $("#txtRecordToOffice").val() : "");
    var discountnone = getCheckbox("chkNoDiscount");
    var addon = getRadio("rdAddon");
    var spa = getRadio("rdSPA");
    var pricelow = ($("#chkPriceLow").is(":checked") ? "True" : "False");
    var pricemin = $("#txtPriceMin").val();
    var pricemax = $("#txtPriceMax").val();
    var aheadday = $("#txtAheadDay").val();
    var nonstop = ($("#chkNonStop").is(":checked") ? "True" : "False");
    var carrieridentity = ($("#chkSameCarrier").is(":checked") ? "True" : "False");
    var remark = $("#txtRemark").val();
    var flag = $("#txtFlag").val();

    if (personnum == "") {
        personnum = "0";
    }
    if (yearfrom == "") {
        yearfrom = "0";
    }
    if (yearto == "") {
        yearto = "0"
    }
    if (pricemin == "") {
        pricemin = "0";
    }
    if (pricemax == "") {
        pricemax = "0";
    }
    if (aheadday == "") {
        aheadday = "0";
    }
    if (!Validate(2)) {
        return;
    }
    //#endregion

    var the = $(d);
    the.attr("disabled", true);
    the.removeClass("btn-blue");
    the.addClass("btn-gray");

    tipPop("正在保存数据...");

    $.post("ss.php",
    { Action: "Save", ID: id,
        Carrier: carrier, CarrierSame: carriersame, OfficeProvider: provideoffice, OfficeGroupID: officegroupid, OfficeTicket: ticketoffice, TicketType: tickettype, TicketAuditing: ticketauditing, AduType: adutype, ChdWay: chdway, ChdNone: chdnone, MixSeason: mixseason, MixBerth: mixberth, MixSB: mixsb, MixBase: mixbase, DateGroup: dategroup,

        VoyageType: voyagetype, DepLimit: deplimit, DepCity: depcitys, DepArea: depareas, ArrLimit: arrlimit, ArrCity: arrcitys, ArrArea: arrareas, BackLimit: backlimit, BackCity: backcitys, BackArea: backareas, ChangGNCity: changegn, ChangGJCity: changegj, FlightsGo: flightsgo, FlightsBack: flightsback, FlightsNone: flightsnone, VoyageNone: voyagenone,

        RuleID: ruleid, PersonNum: personnum, PersonDouble: persondouble, YearsFrom: yearfrom, YearsTo: yearto, Record: record, RecordOffice: recordoffice, RecordNoRight: recordnorights, DiscountNone: discountnone, Addon: addon, Spa: spa, PriceLow: pricelow, PriceMin: pricemin, PriceMax: pricemax, AheadDay: aheadday, NonStop: nonstop, CarrierIdentity: carrieridentity, Remark: remark, Flag: flag
    },
    function (data) {
        if (data != "OK") {
            alertPop(data);
        }
        else {
            if (id == "") {
                confirmPop("添加成功！<br>是否继续添加政策？", function () { Next(0, 2); }, function () { BackUrl(); });
            }
            else {
                alertPop("保存成功！", function () {
                    BackUrl();
                });
            }
        }

        the.attr("disabled", false);
        the.removeClass("btn-gray");
        the.addClass("btn-blue");
    });
}
