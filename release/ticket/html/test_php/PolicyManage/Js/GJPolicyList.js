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
    var depname = $.trim($("#txtDepArea").val());
    var arrname = $.trim($("#txtArrArea").val());
    var deparea = $.trim($("#txtDepArea").attr("val"));
    var arrarea = $.trim($("#txtArrArea").attr("val"));
    var depcity = $.trim($("#txtDepCity").val());
    var arrcity = $.trim($("#txtArrCity").val());
    var ticketfrom = $.trim($("#txtTicketFrom").val());
    var ticketto = $.trim($("#txtTicketTo").val());
    var gofrom = $.trim($("#txtGoFrom").val());
    var gotos = $.trim($("#txtGoTo").val());
    var proname = "";
    var provider = "";
    var share = "";
    if ($("#txtProvider").length > 0){
        proname =  $.trim($("#txtProvider").val());
        provider = $.trim($("#txtProvider").attr("val"));
        share = $.trim($("#dropShare").val());
    }
    var office = $.trim($("#txtOffice").val());
    var auditing = $.trim($("#dropAuditing").val());
    var record = $.trim($("#dropRecord").val());
    var tickettype = $("#dropTicketType").val().replace(" ", "");
    var asc = $("#hidAsc").val();
    var ascname = $("#hidAscName").val();

    var para = "Platform=" + plat + "&Carrier=" + carrier + "&PolicyID=" + policyid + "&Flag=" + flag + "&DepName=" + depname + "&ArrName=" + arrname + "&DepArea=" + deparea + "&ArrArea=" + arrarea + "&DepCity=" + depcity + "&ArrCity=" + arrcity + "&ProName=" + proname + "&Provider=" + provider + "&Share=" + share + "&Office=" + office + "&Auditing=" + auditing + "&Record=" + record + "&Asc=" + asc + "&AscName=" + ascname + "&TicketFrom=" + ticketfrom + "&TicketTo=" + ticketto + "&GoFrom=" + gofrom + "&GoTo=" + gotos +
    "&TicketType=" + tickettype;
    return para;
}

function Scan() {
    window.location.href = "GJPolicyList.php?" + GetPara();
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
        case "返点":
            $("#hidAscName").val("DiscountAward");
            break;
    }
    Scan();
}

function ScanProvider(e, d) {
    var url = "GJHangUpPlatform.php?Action=GetProvider";
    scanCombox(e, d, url);
}

function ShowArea(d) {
    var area = [];
    area.push(jsonArea);
    var objTree = new MenuTree();
    objTree.Object = $(d);
    objTree.TheJSON = area;
    objTree.ShowMenu();
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
    }
    $.getJSON("GJPolicyList.php?Action=GetList&Page=" + page + "&callback=?&" + GetPara(),
    function (json) {
        var htm = [];
        htm.push("<table class='tablelist' cellspacing='0'>");
        htm.push("<thead>");
        htm.push("<tr>");
        htm.push("<th>航程信息</th>");
        htm.push("<th width='120'>计算规则</th>");
        htm.push("<th width='190'>基础信息</th>");
        htm.push("</tr>");
        htm.push("<tr>");
        htm.push("<td colspan='3'><label class='mr6'><input type='checkbox' onclick=\"chkAll(this, 'chkID')\"/>全选</label>");
        htm.push("<input type='button' class='btn btn-white mr6' onclick='DeleteAll()' value='删除'/>");
        htm.push("<input type='button' class='btn btn-white' onclick='AuditingAll(true)' value='批量审核'/>");
        htm.push("<input type='button' class='btn btn-white mr6' onclick='AuditingAll(false)' value='撤销审核'/>");
        if (!all) {
            htm.push("<input type='button' class='btn btn-white' onclick='EditForm()' value='批量修改'/>");
            htm.push("<input type='button' class='btn btn-white mr6' onclick='MoveForm()' value='移动到...'/>");
            htm.push("<input type='button' class='btn btn-blue' value='添加政策' onclick=\"window.location.href='GJPolicyEdit.php'\" />");
        }
        else {
            htm.push("<input type='button' class='btn btn-white' onclick='ShareAll(true)' value='批量共享'/>");
            htm.push("<input type='button' class='btn btn-white mr6' onclick='ShareAll(false)' value='撤销共享'/>");
            if ($.trim($("#txtProvider").attr("val")) != "") {
                htm.push("<input type='button' class='btn btn-white' onclick=\"EditForm('" + $.trim($("#txtProvider").attr("val")) + "')\" value='批量修改'/>");
                htm.push("<input type='button' class='btn btn-white' onclick=\"ItineraryForm()\" value='行程单修改'/>");
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
            htm.push("<tr><td colspan='3'>" + json.ret + "</td></tr>");
        }
        else {
            $(json.list).each(function (x) {
                htm.push("<tbody>");
                htm.push("<tr>");
                htm.push("<th colspan='3'><label><input type='checkbox' name='chkID' value='" + this.id + "'/>政策号：</label>");
                htm.push("<span class='albl block' style='width:85px' onclick='RelaxMore(this)'>" + this.id + "</span>");
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
                htm.push("<div>");
                if (all) {
                    if (this.sharequnar) {
                        htm.push("<span style='margin-right:15px' class='lbl b-green radius10 hand' name='spnShare' onclick=\"Share(this, '" + this.id + "')\">已共享</span>");
                    }
                    else {
                        htm.push("<span style='margin-right:15px' class='lbl b-winered radius10 hand' name='spnShare' onclick=\"Share(this, '" + this.id + "')\">未共享</span>");
                    }
                }
                htm.push("<span class='c-gray'>编辑：</span><a href='GJPolicyEdit.php?ID=" + this.id + "' class='c-blue'>行程</a>");
                htm.push(" <a href='GJPolicyEdit.php?ID=" + this.id + "#1' class='c-blue'>返点</a>");
                htm.push(" <a href='GJPolicyEdit.php?ID=" + this.id + "#2' class='c-blue'>条件</a>");
                if (!all) {
                    htm.push(" | <a href='GJPolicyEdit.php?ID=" + this.id + "&Copy=1'>复制</a>");
                }
                else {
                    htm.push(" | <span class='albl hand' pid='" + this.id + "' name='spnItinerary'>行程单</span>");
                }
                htm.push(" | <span class='albl' onclick=\"Delete('" + this.id + "')\">删除</span></div>");
                htm.push("</th>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td class='break'>航司：<s class='albl c-orange' onclick=\"ShowRule(this, '" + this.companyid + "', '" + this.ruleid + "')\">" + this.carrier + "</s>");
                if (this.carriersame != "") {
                    htm.push("，同时适用航司：" + this.carriersame);
                }
                if (this.voyagetype != "1") {
                    htm.push("，航程：" + this.voyagetype);
                }
                htm.push("<div class='overhide break'>出发：" + GetArea(this.deparea, this.deplimit, this.depcitys) + "</div>");
                htm.push("<div class='overhide break'>到达：" + GetArea(this.arrarea, this.arrlimit, this.arrcitys) + "</div>");
                htm.push("<div class='overhide break'>回程：" + GetArea(this.backarea, this.backlimit, this.backcitys) + "</div>");
                htm.push("<div class='overhide break'>PCC：" + this.pcc + " ; 政策生效位置：" + this.validplace +"</div>");
                htm.push("</td>");
                htm.push("<td>混舱：" + this.mixberth + "<br/>跨季：" + this.mixseason + "<br/>混舱并跨季：" + this.mixsb);
                htm.push("<br/>代理费：" + this.mixbase + "</td>");
                htm.push("<td>开票：" + this.officeticket + ", " + this.tickettype + "<br/>审核：" + this.ticketauditing);
                htm.push("<br/>编码：" + this.record + "<br/>更新：" + this.updatetime + "/" + this.account + "</td>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td colspan='3' class='b-lgray'>");

                htm.push("<table class='table'>");
                var jon = this;
                $(this.datelist).each(function (y) {
                    htm.push("<tr class='ntr'><td width='175' rowspan='" + this.berthlist.length + "'");
                    switch (this.datewarn) {
                        case "0":
                            htm.push(" >");
                            break;
                        case "1":
                            htm.push(" class='outtime'>");
                            break;
                        case "2":
                            htm.push(" class='neartime'>");
                            break;
                    }
                    htm.push("开票时限：" + this.dateticketfrom.substr(2) + "/" + this.dateticketto.substr(2));
                    htm.push("<br/>去程时限：" + this.dategofrom.substr(2) + "/" + this.dategoto.substr(2));
                    htm.push("<br/>回程截止：" + (this.datebackto == "" ? "无限制&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : this.datebackto));
                    htm.push("&nbsp;&nbsp;<s class='albl c-blue hand' pid='" + jon.id + "' did='" + this.dateid + "' tf='" + this.dateticketfrom + "' tt='" + this.dateticketto + "' gf='" + this.dategofrom + "' gt='" + this.dategoto + "' bt='" + this.datebackto + "' mw='" + this.datemixway + "' onclick='DateForm(this)'>修改</s>");
                    switch (this.datemixway) {
                        case 1:
                            htm.push("<br/>超出回程算跨季");
                            break;
                        case 2:
                            htm.push("<br/>超出回程无奖励");
                            break;
                        case 3:
                            htm.push("<br/>超出回程不开票");
                            break;
                    }
                    htm.push("</td>");
                    $(this.berthlist).each(function (i) {
                        if (i > 0) {
                            htm.push("</tr><tr class='ntr'>");
                        }
                        htm.push("<td width='360' name='tddiscount'>代理费: " + this.discountbase + "%");
                        if (!this.isother) {
                            htm.push(", <s class='c-green'>奖励: " + this.discount + "%</s>, 单程: " + this.cashsingle + "元, 往返: " + this.cashdouble + "元");
                        }
                        htm.push(", 无奖励时: " + this.ticketfare + "元</td>");
                        htm.push("<td width='72' name='tdberthway'>");
                        switch (this.berthway) {
                            case 1:
                                htm.push("不可混舱");
                                break;
                            case 2:
                                if (this.isother) {
                                    htm.push("不开票");
                                }
                                else {
                                    htm.push("<s class='c-red'>不开票</s>");
                                }
                                break;
                            case 3:
                                htm.push("可混舱不单开");
                                break;
                            default:
                                htm.push("可混舱");
                                break;
                        }
                        htm.push("</td>");
                        htm.push("<td width='25'><s class='albl c-blue hand' pid='" + jon.id + "' bid='" + this.berthid + "' db='" + this.discountbase + "' d='" + this.discount + "' sc='" + this.cashsingle + "' dc='" + this.cashdouble + "' tf='" + this.ticketfare + "' bw='" + this.berthway + "' io='" + this.isother + "' onclick='BerthForm(this)'>修改</s></td>");
                        htm.push("<td>" + (this.isother ? "<s class='c-gray'>剩余" : "<s>适用") + "舱位：</s><s " + (this.berthnoticket ? "class='mline'" : "") + " name='sBerth'>" + this.berth + "</s></td>");
                    });
                    htm.push("</tr>");
                });
                htm.push("</table>");

                htm.push("</td>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td colspan='3' class='ft ntd' style='display:none' id='td" + this.id + "'>");
                htm.push("<ul class='ultable'>");
                htm.push("<li>编码限定：" + this.recordlimt + "</li><li>去程适用航班：" + this.flightsgo + "</li><li>航程限定：" + this.other + "</li>");
                htm.push("<li>成人类型：" + this.adutype + "</li><li>回程适用航班：" + this.flightsback + "</li><li>Addon限定：" + this.addon + "</li>");
                htm.push("<li>儿童奖励：" + this.chdway + "</li><li>不适用航班：" + this.flightsnone + "</li><li>Spa限定：" + this.spa + "</li>");
                htm.push("<li>乘客条件：" + this.years + "，" + this.person + "</li><li>不适用航线：" + this.voyagenone + "</li><li>中转：" + this.changecitys + "</li>");
                htm.push("<li>提前天数：" + this.aheadday + "</li><li>无奖励：" + this.discountnone + "</li><li>票面限定：" + this.pricemin + "</li>");
                htm.push("<li class='wli'>备注：" + this.remark + "</li>");
                htm.push("</ul>");
                htm.push("</td>");
                htm.push("</tr>");
                htm.push("<tr>");
                htm.push("<td colspan='3' class='nbtd'></td>");
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

        Itin = $("span[name='spnItinerary']");
        Itin.click(function () {
            var i = Itin.index($(this));
            ItineraryForm($(this).attr("pid"), json.list[i].itinerary);
        });

        $("div.overhide").each(function (i) {
            if ($(this).height() > 20) {
                $(this).height(20);
                $(this).addClass("hand omit");
                $(this).attr("title", $(this).text());
            }
        });
    });
}

function RelaxMore(d) {
    var id = $(d).text();
    $("#td" + id).toggle("normal");
}

function GetArea(area, limit, city) {
    var info = "";
    if (area == "") {
        if (limit) {
            if ($.trim(city) != "") {
                info = "仅限定：" + city;
            }
            else {
                info = "无";
            }
        }
        else {
            info = "全球";
            if ($.trim(city) != "") {
                info += "，并排除：" + city;
            }
        }
    }
    else {
        var htm = [];
        var arr = area.split(',');
        for (var i = 0; i < arr.length; i++) {
            var isexist = AreaName(jsonArea, arr[i], htm);
            if (isexist) {
                break;
            }
        }
        info = htm.join(',');
        if ($.trim(city) != "") {
            info += "，并排除：" + city;
        }
    }
    return info;
}

function AreaName(json, code, htm) {
    if (json.value == code) {
        htm.push(json.text);
        return true;
    }
    else if (json.son.length > 0) {
        for (var i = 0; i < json.son.length; i++) {
            AreaName(json.son[i], code, htm);
        }
    }
    return false;
}

function ShowRule(d, cid, rid) {
    $.getJSON("GJPolicyList.php?Action=GetRule&RuleID=" + rid + "&CompanyID=" + cid + "&callback=?",
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

function ShowDiscount(d, id) {
    tipPop("正在读取数据...");
    $.getJSON("GJPolicyEdit.php?Action=GetOne&ID=" + id + "&callback=?",
            function (json) {
                if (json.ret != "OK") {
                    alertPop(json.ret);
                }
                else {
                    var htm = [];
                    htm.push("<table class='table' style='width:900px' id='tbEdit'>");
                    htm.push("<tr><th width='150' valign='top'>时间限定</th><th width='260'>奖励信息</th><th>舱位限制</th><th width='50'>混舱</th></tr>");
                    $(json.datelist).each(function () {
                        htm.push("<tr><td rowspan='" + this.berthlist.length + "'>开票：" + this.dateticketfrom.substr(2) + "/" + this.dateticketto.substr(2));
                        htm.push("<br/>去程：" + this.dategofrom.substr(2) + "/" + this.dategoto.substr(2));
                        if (this.dategonone == "") {
                            htm.push("<br/>去程不适用：无限制");
                        }
                        else {
                            htm.push("<br/>去程不适用：<br/>" + this.dategonone.replace(/~/g, "/").replace(/,/g, "<br/>"));
                        }
                        htm.push("<br/>回程截止期：" + (this.datebackto == "" ? "无限制" : this.datebackto));
                        if (this.datebacknone == "") {
                            htm.push("<br/>回程不适用：无限制");
                        }
                        else {
                            htm.push("<br/>回程不适用：<br/>" + this.datebacknone.replace(/~/g, "/").replace(/,/g, "<br/>"));
                        }
                        switch (this.datemixway) {
                            case 1:
                                htm.push("<br/>超出回程时按跨季处理</td>");
                                break;
                            case 2:
                                htm.push("<br/>超出回程时按无奖励处理</td>");
                                break;
                            case 3:
                                htm.push("<br/>超出回程时不开票</td>");
                                break;
                        }
                        $(this.berthlist).each(function (i) {
                            if (i > 0) {
                                htm.push("</tr><tr>");
                            }
                            htm.push("<td>成人：<span class='c-blue'>基础:" + this.discountbase + "%</span>, <span class='c-orange'>奖励:" + this.discount + "%</span>, 无奖励开票费:" + this.ticketfare + "元<br>　　　单程返款:" + this.cashsingle + "元, 往返返款:" + this.cashdouble + "元");
                            if (json.chdway == "2") {
                                htm.push("<br>儿童：基础:" + this.chdbase + "%, 奖励:" + this.chddiscount + "%, 无奖励开票费:" + this.chdticketfare + "元</td>");
                            }
                            htm.push("</td>");
                            htm.push("<td>适用舱位：<span " + (!this.isother ? "class='c-green'" : "") + ">" + this.berth + "</span><br/>Addon舱位：" + this.berthaddon + "</td>");
                            htm.push("<td>" + (this.berthnoticket ? "不开票" : (this.berthnomix ? "不可混舱" : "可混舱")) + "</td>");
                        });
                        htm.push("</tr>");
                    });
                    htm.push("</table>");
                    popLayer("show", "政策[" + id + "]的奖励详情", htm.join(''));
                }
            });
}
//#endregion

function Compare() {
    var htm = [];
    htm.push("<div class='bt10'>");
    htm.push("<table class='table' style='width:500px'>");
    htm.push("<tr>");
    htm.push("<td><span class='fwb'>格式：城市对/起飞日期/承运人(航班号)/舱位/(起飞时间)/(到达时间)。</span><br/>括号中的内容表示选填项(可选),内容中出现<s class='c-red'>换行则表示另一个航段</s>.<br/>");
    htm.push("城市对为机场三字码,航班号可以省略数字,但承运人二字码必须保留! <s class='albl c-blue hand' onclick=\"noteLayer(this, '例1：PEKJFK/12DEC/KE888/E/0800/1200<br/>例2：PEKJFK/12DEC/KE/Y/2330/0400+1<br/>例3：PEKJFK/12DEC/KE/E/0800<br/>例4：PEKJFK/12DEC/KE/E')\">查看例子</s></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td><textarea rows='4' id='txtCode' style='width:480px'></textarea></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td><input type='button' value='查看比较结果' class='btn btn-blue' onclick='CompareTo()'/> <span class='c-red'>*注：红色的返点表示的是本公司发布的政策！</span></td>");
    htm.push("</tr>");
    htm.push("</table>");
    htm.push("</div>");
    htm.push("<div id='divCompare'></div>");

    popLayer("show", "比较政策", htm.join(''));
}

function CompareTo() {
    var code = $("#txtCode").val();
    if (code == "") {
        alert("请填写匹配代码！");
        $("#txtCode").focus();
        return;
    }
    $("#divCompare").text("正在比较政策，请稍候...");
    $.getJSON("GJPolicyList.php?Action=Compare&Code=" + encodeURIComponent(code) + "&callback=?",
    function (json) {
        if (json.ret != "OK") {
            $("#divCompare").html("<span class='c-red'>" + json.ret + "</span>");
        }
        else {
            var htm = [];
            htm.push("<table class='table'>");
            htm.push("<tr>");
            if (json.list[0].companyname != "") {
                htm.push("<th>供应商</th>");
            }
            htm.push("<th>代理费</th>");
            htm.push("<th>奖励</th>");
            htm.push("<th>开票费</th>");
            htm.push("<th>换编码</th>");
            htm.push("<th>开票时间</th>");
            htm.push("<th>备注</th>");
            htm.push("</tr>");
            $(json.list).each(function () {
                htm.push("<tr>");
                if (this.companyname != "") {
                    htm.push("<td>" + this.companyname + "</td>");
                }
                htm.push("<td class='" + this.color + "'>" + this.discountbase + "%</td>");
                htm.push("<td class='" + this.color + "'>" + this.discount + "%+" + this.cash + "元</td>");
                htm.push("<td class='" + this.color + "'>" + this.etdzfare + "元</td>");
                htm.push("<td class='" + this.color + "'>" + this.record + "</td>");
                htm.push("<td class='" + this.color + "'>" + this.dateticketfrom + "/" + this.dateticketto + "</td>");
                if (this.remark != "") {
                    htm.push("<td><span class='albl c-blue hand' onclick=\"noteLayer(this, '" + this.remark + "')\">查看备注</span></td>");
                }
                else {
                    htm.push("<td>无</td>");
                }
                htm.push("</tr>");
            });
            htm.push("</table>");

            $("#divCompare").html(htm.join(''));
            popPosition();
        }
    });
}

function DateForm(d) {
    var htm = [];
    htm.push("<div class='bt6'>");
    htm.push("<table class='table' style='width:430px'>");
    htm.push("<tr>");
    htm.push("<td align='right' width='100'><span class='c-red'>* </span>开票有效期</td>");
    htm.push("<td><input type='text' class='calendar' id='editTicketFrom' value='" + $(d).attr("tf") + "' style='width:100px;' onfocus='WdatePicker(fmtDay)'/> -");
    htm.push("<input type='text' class='calendar' id='editTicketTo' value='" + $(d).attr("tt") + "' style='width:100px;' onfocus='WdatePicker(fmtDay)'/></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'><span class='c-red'>* </span>去程有效期</td>");
    htm.push("<td><input type='text' class='calendar' id='editGoFrom' value='" + $(d).attr("gf") + "' style='width:100px;' onfocus='WdatePicker(fmtDay)'/> -");
    htm.push("<input type='text' class='calendar' id='editGoTo' value='" + $(d).attr("gt") + "' style='width:100px;' onfocus='WdatePicker(fmtDay)'/></td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>回程有效期截止</td>");
    htm.push("<td>");
    htm.push("<input type='text' class='calendar' id='editBackTo' value='" + $(d).attr("bt") + "' placeholder=无限制可不填 style='width:100px;' onfocus='WdatePicker(fmtDay)'/>");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>回程超出截止期时</td>");
    htm.push("<td>");
    htm.push("<label><input type='radio' name='rdDateMixWay' value='1' checked/>按跨季处理</label>");
    htm.push("<label><input type='radio' name='rdDateMixWay' value='2'/>按无奖励处理</label>");
    htm.push("<label><input type='radio' name='rdDateMixWay' value='3'/>不开票</label>");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("</table>");
    htm.push("</div>");
    htm.push("<div style='text-align:right'><input type='button' id='btnDate' class='btn btn-blue' value='执行' /></div>");
    noteLayer(d, htm.join(''));
    $("#divNote").css("z-index", "900");
    $("#divNoteCorner").css("z-index", "901");
    setRadio("rdDateMixWay", $(d).attr("mw"));
    $("#btnDate").click(function () {
        EditDate(d);
    });
}

function EditDate(d) {
    var pid = $(d).attr("pid");
    var id = $(d).attr("did");
    var ticketfrom = $("#editTicketFrom").val();
    var ticketto = $("#editTicketTo").val();
    var gofrom = $("#editGoFrom").val();
    var gotos = $("#editGoTo").val();
    var backto = $("#editBackTo").val();
    var mixway = getRadio("rdDateMixWay");
    if (ticketfrom == "") {
        alert("请开票有效期起始时间");
        return false;
    }
    if (ticketto == "") {
        alert("请开票有效期结束时间");
        return false;
    }
    if (gofrom == "") {
        alert("请去程有效期起始时间");
        return false;
    }
    if (gotos == "") {
        alert("请去程有效期结束时间");
        return false;
    }

    tipPop("正在执行操作...");
    $.post("GJPolicyList.php",
        { Action: "EditDate", ID: id, PID: pid, TicketFrom: ticketfrom, TicketTo: ticketto, GoFrom: gofrom, GoTo: gotos, BackTo: backto, MixWay: mixway }
    , function (data) {
        if (data == "OK") {
            alertPop("执行成功！", function () {
                var htm = [];
                htm.push("开票时限：" + ticketfrom.substr(2) + "/" + ticketto.substr(2));
                htm.push("<br/>去程时限：" + gofrom.substr(2) + "/" + gotos.substr(2));
                htm.push("<br/>回程截止：" + (backto == "" ? "无限制&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : backto));
                htm.push("&nbsp;&nbsp;<s class='albl c-blue hand' pid='" + pid + "' did='" + id + "' tf='" + ticketfrom + "' tt='" + ticketto + "' gf='" + gofrom + "' gt='" + gotos + "' bt='" + backto + "' mw='" + mixway + "' onclick='DateForm(this)'>修改</s>");
                switch (parseInt(mixway)) {
                    case 1:
                        htm.push("<br/>超出回程算跨季");
                        break;
                    case 2:
                        htm.push("<br/>超出回程无奖励");
                        break;
                    case 3:
                        htm.push("<br/>超出回程不开票");
                        break;
                }
                $(d).parent().html(htm.join(''));
            });
        }
        else {
            alertPop(data);
        }
    });
}

function BerthForm(d) {
    var htm = [];
    htm.push("<div class='bt6'>");
    htm.push("<table class='table'>");
    htm.push("<tr>");
    htm.push("<td align='right' width='85'><span class='c-red'>* </span>代理费</td>");
    htm.push("<td><input type='text' id='editBase' value='" + $(d).attr("db") + "' style='width:100px;'/> %</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    var dis = ($(d).attr("io") == "false" ? "" : "disabled='disabled'");
    htm.push("<td align='right'><span class='c-red'>* </span>奖励</td>");
    htm.push("<td><input type='text' id='editDiscount' " + dis + " value='" + $(d).attr("d") + "' style='width:100px;' /> %</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>单程返款</td>");
    htm.push("<td>");
    htm.push("<input type='text' id='editSingleCash' " + dis + " value='" + $(d).attr("sc") + "' style='width:100px;' /> 元");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>往返返款</td>");
    htm.push("<td>");
    htm.push("<input type='text' id='editDoubleCash' " + dis + " value='" + $(d).attr("dc") + "' style='width:100px;' /> 元");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>无奖励开票费</td>");
    htm.push("<td>");
    htm.push("<input type='text' id='editFare' value='" + $(d).attr("tf") + "' style='width:100px;' /> 元");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("<tr>");
    htm.push("<td align='right'>舱位限制</td>");
    htm.push("<td>");
    htm.push("<select id='dropBerthWay'>");
    htm.push("<option value='0'>可混舱</option>");
    htm.push("<option value='1'>不可混舱</option>");
    htm.push("<option value='2'>不开票</option>");
    htm.push("<option value='3'>可混舱不单开</option>");
    htm.push("</select>");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("</table>");
    htm.push("</div>");
    htm.push("<div style='text-align:right'><input type='button' id='btnBerth' class='btn btn-blue' value='执行' /></div>");
    noteLayer(d, htm.join(''));
    $("#divNote").css("z-index", "900");
    $("#divNoteCorner").css("z-index", "901");
    $("#dropBerthWay option[value='" + $(d).attr("bw") + "']").attr("selected", true);
    $("#btnBerth").click(function () {
        EditBerth(d);
    });
}

function EditBerth(d) {
    var pid = $(d).attr("pid");
    var id = $(d).attr("bid");
    var io = $(d).attr("io");
    var base = $("#editBase").val();
    var discount = $("#editDiscount").val();
    var fare = $("#editFare").val();
    var scash = $("#editSingleCash").val();
    var dcash = $("#editDoubleCash").val();
    var bway = $("#dropBerthWay").val();
    if (base != "" && !$.isNumeric(base)) {
        alert("请正确填写代理费");
        return false;
    }
    if (discount != "" && !$.isNumeric(discount)) {
        alert("请正确填写奖励");
        return false;
    }
    if (fare != "" && !$.isNumeric(fare)) {
        alert("请正确填写无奖励开票费");
        return false;
    }
    if (scash != "" && !$.isNumeric(scash)) {
        alert("请正确填写单程返款");
        return false;
    }
    if (dcash != "" && !$.isNumeric(dcash)) {
        alert("请正确填写往返返款");
        return false;
    }

    tipPop("正在执行操作...");
    $.post("GJPolicyList.php",
        { Action: "EditBerth", ID: id, PID: pid, DiscountBase: base, Discount: discount, TicketFare: fare, SingleCash: scash, DoubleCash: dcash, BerthWay: bway }
    , function (data) {
        if (data == "OK") {
            alertPop("执行成功！", function () {
                var tr = $(d).parents("tr.ntr").eq(0);
                var htm = "代理费: " + base + "%";
                if (io == "false") {
                    htm += ", <s class='c-green'>奖励: " + discount + "%</s>, 单程: " + scash + "元,  往返: " + dcash + "元";
                }
                htm += ", 无奖励时: " + fare + "元"
                tr.find("td[name='tddiscount']").html(htm);
                htm = "";
                switch (bway) {
                    case "2":
                        if (io == "false") {
                            htm = "<s class='c-red'>不开票</s>";
                        }
                        else {
                            htm = "不开票";
                        }
                        break;
                    case "3":
                        htm = "可混舱不单开";
                        break;
                    case "1":
                        htm = "不可混舱";
                        break;
                    default:
                        htm = "可混舱";
                        break;
                }
                tr.find("td[name='tdberthway']").html(htm);
                if (bway == "2") {
                    tr.find("s[name='sBerth']").addClass("mline");
                }
                else {
                    tr.find("s[name='sBerth']").removeClass("mline");
                }
                $(d).parent().html("<s class='albl c-blue hand' pid='" + pid + "' bid='" + id + "' db='" + base + "' d='" + discount + "' sc='" + scash + "' dc='" + dcash + "' tf='" + fare + "' bw='" + bway + "' io='" + io + "' onclick='BerthForm(this)'>修改</s>");
            });
        }
        else {
            alertPop(data);
        }
    });
}
//#region 批量操作

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
            htm.push(" <label><input type='checkbox' id='chkSameTo' checked/>开票OFFICE号和票类与目标同步</label>");
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
        $.get("GJPolicyList.php?Action=CarrierList&From=" + from, function (data) {
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
    var same = ($("#chkSameTo").is(":checked") ? "True" : "False"); 
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
    $.get("GJPolicyList.php?Action=Move&Carrier=" + carrier + "&From=" + from + "&To=" + to + "&Same=" + same, function (data) {
        if (data == "OK") {
            alertPop("执行成功！", function () { LoadList(); });
        }
        else {
            alertPop(data);
        }
    });
}
//#endregion

//#region 批量删除
function Delete(id) {
    confirmPop("确定要删除该政策吗？", function () {
        tipPop("正在删除数据...");
        $.post("GJPolicyList.php?Action=Delete&ID=" + id, function (data) {
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

//#region 批量审核，共享
function Share(d, id) {
    var the = $(d);
    the.attr("disabled", true);
    var isshare = !the.hasClass("b-green");
    $.get("GJPolicyList.php?Action=Share&ID=" + id + "&Type=" + (isshare ? "True" : "False"), function (data) {
        if (data == "OK") {
            if (isshare) {
                the.removeClass("b-winered");
                the.addClass("b-green");
                the.text("已共享");
            }
            else {
                the.removeClass("b-green");
                the.addClass("b-winered");
                the.text("未共享");
            }
        }
        else {
            alertPop(data);
        }
        the.attr("disabled", false);
    });
}

function ShareAll(isshare) {
    var ids = getCheckbox("chkID");
    if (ids == "") {
        alertPop("请先选择要批量操作的政策!");
    }
    else {
        confirmPop("是否确认该批量共享操作?", function () {
            tipPop("正在更新数据...");
            $.post("GJPolicyList.php?Action=Share&ID=" + ids + "&Type=" + (isshare ? "True" : "False"), function (data) {
                if (data == "OK") {
                    var chk = $("input[type='checkbox'][name='chkID']");
                    var spn = $("span[name='spnShare']");
                    chk.each(function (i) {
                        if ($(this).is(":checked")) {
                            var the = spn.eq(i);
                            if (isshare) {
                                the.removeClass("b-winered");
                                the.addClass("b-green");
                                the.text("已共享");
                            }
                            else {
                                the.removeClass("b-green");
                                the.addClass("b-winered");
                                the.text("未共享");
                            }
                        }
                    })
                    closeTip();
                }
                else {
                    alertPop(data);
                }
            });
        });
    }
}

function Auditing(d, id) {
    var the = $(d);
    the.attr("disabled", true);
    var isaud = !the.hasClass("b-green");
    $.get("GJPolicyList.php?Action=Auditing&ID=" + id + "&Type=" + (isaud ? "True" : "False"), function (data) {
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
        confirmPop("是否确认该批量审核操作?", function () {
            tipPop("正在更新数据...");
            $.post("GJPolicyList.php?Action=Auditing&ID=" + ids + "&Type=" + (isaud ? "True" : "False"), function (data) {
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
                    })
                    closeTip();
                }
                else {
                    alertPop(data);
                }
            });
        });
    }
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
        $.getJSON("GJPolicyList.php?Action=RuleList&CompanyID=" + id + "&callback=?",
            function (json) {
                if (json.ret != "OK") {
                    alertPop(json.ret);
                }
                else {
                    var htm = [];
                    htm.push("<div class='bt10'>");
                    htm.push("<table class='table' style='width:600px' id='tbEdit'>");
                    htm.push("<tr><td width='100' align='right'>供应OFFICE号</td>");
                    htm.push("<td><input type='text' id='editProOffice'/></td></tr>");
                    htm.push("<tr><td align='right'>航司规则</td>");
                    htm.push("<td><label><input type='radio' name='rdRule' value='' checked/>不修改</label>");
                    $(json.list).each(function () {
                        htm.push("<input type='radio' name='rdRule' value='" + this.id + "'/><label class='albl hand' onclick=\"ShowRule(this, '" + this.cid + "', '" + this.id + "')\">" + this.name + "</label>");
                    });
                    htm.push("</td></tr>");
                    htm.push("<tr><td align='right'>成人类型</td>");
                    htm.push("<td><label><input type='checkbox' name='chkAdu' value='101'/>一般成人</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='102' />学生</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='103' />青年</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='104' />移民</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='105' />劳务</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='106' />海员</label>");
                    htm.push("<label><input type='checkbox' name='chkAdu' value='107' />特殊身份</label></td></tr>");
                    htm.push("<tr><td align='right'>儿童奖励</td>");
                    htm.push("<td><label><input type='radio' name='rdChd' value='' checked/>不修改</label>");
                    htm.push("<label><input type='radio' name='rdChd' value='2'/>与成人相同</label>");
                    htm.push("<label><input type='radio' name='rdChd' value='1' />无奖励</label>");
                    htm.push("<label><input type='radio' name='rdChd' value='4'/>不开票</label>");
                    htm.push("<label><input type='checkbox' id='chkChdNone' disabled='true'/>不单开</label></td></tr>");
                    htm.push("<tr><td align='right'>混舱</td>");
                    htm.push("<td><label><input type='radio' name='rdMixBerth' value='' checked/>不修改</label>");
                    htm.push("<label><input type='radio' name='rdMixBerth' value='1'/>取1/2值</label>");
                    htm.push("<label><input type='radio' name='rdMixBerth' value='2' />取较小值</label></td></tr>");
                    htm.push("<tr><td align='right'>跨季</td>");
                    htm.push("<td><label><input type='radio' name='rdMixSeason' value='' checked/>不修改</label>");
                    htm.push("<label><input type='radio' name='rdMixSeason' value='1'/>取1/2值</label>");
                    htm.push("<label><input type='radio' name='rdMixSeason' value='2' />取较小值</label></td></tr>");
                    htm.push("<tr><td align='right'>混舱并跨季</td>");
                    htm.push("<td><label><input type='radio' name='rdMixBS' value='' checked/>不修改</label>");
                    htm.push("<label><input type='radio' name='rdMixBS' value='1'/>取1/2值</label>");
                    htm.push("<label><input type='radio' name='rdMixBS' value='2' />取较小值</label></td></tr>");
                    htm.push("<tr><td align='right'>代理费</td>");
                    htm.push("<td><label><input type='radio' name='rdMixBase' value='' checked/>不修改</label>");
                    htm.push("<label><input type='radio' name='rdMixBase' value='1'/>取1/2值</label>");
                    htm.push("<label><input type='radio' name='rdMixBase' value='3'/>取较大值</label>");
                    htm.push("<label><input type='radio' name='rdMixBase' value='2' />取较小值</label></td></tr>");
                    htm.push("<tr><td align='right'>票面(不含税)限制</td>");
                    htm.push("<td><label><input type='checkbox' id='chkPrice' value='' checked/>不修改</label> 必须高于 <input type='text' id='editPriceMin' style='width:40px;' disabled='true' value='0'/> 元，或者必须低于 <input type='text' id='editPriceMax' style='width:40px;' value='0' disabled='true'/> 元时政策有效</td></tr>");
                    htm.push("<tr><td align='right'>备注</td>");
                    htm.push("<td><div class='bt6'><label><input type='radio' name='rdRmk' value='' checked/>不修改</label><label><input type='radio' name='rdRmk' value='True'/>覆盖</label><label><input type='radio' name='rdRmk' value='False'/>追加</label></div><input type='text' id='editRemark' style='width:360px;' disabled='true'/></td>");
                    htm.push("</tr>");
                    htm.push("</table>");
                    htm.push("</div>");
                    htm.push("<div style='text-align:right'><input type='button' class='btn btn-blue' onclick=\"EditAll()\" value='执行' /><input type='button' class='btn btn-white' value='关闭' onclick='closePop()'/></div>");

                    popLayer("show", "批量修改政策", htm.join(''));

                    $("#tbEdit input[name='rdChd']").click(function () {
                        if ($(this).val() == "") {
                            $("#chkChdNone").attr("disabled", true);
                        }
                        else {
                            $("#chkChdNone").attr("disabled", false);
                        }
                    });
                    $("#chkPrice").click(function () {
                        if ($(this).is(":checked")) {
                            $("#editPriceMin").attr("disabled", true);
                            $("#editPriceMax").attr("disabled", true);
                        }
                        else {
                            $("#editPriceMin").attr("disabled", false);
                            $("#editPriceMax").attr("disabled", false);
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
            });
    }
}

function EditAll() {
    var ids = getCheckbox("chkID");
    var provideoffice = $.trim($("#editProOffice").val()).toUpperCase();
    var ruleid = getRadio("rdRule");
    var adutype = getCheckbox("chkAdu");
    var chdway = getRadio("rdChd");
    var chdnone = ($("#chkChdNone").is(":checked") ? "True" : "False");
    var mixberth = getRadio("rdMixBerth");
    var mixseason = getRadio("rdMixSeason");
    var mixsb = getRadio("rdMixBS");
    var mixbase = getRadio("rdMixBase");
    var pricetype = ($("#chkPrice").is(":checked") ? "False" : "True");
    var pricemin = $.trim($("#editPriceMin").val());
    if (pricemin != "" && !$.isNumeric(pricemin)) {
        alert("票面限制必须填写数字");
        return false;
    }
    var pricemax = $.trim($("#editPriceMax").val());
    if (pricemax != "" && !$.isNumeric(pricemax)) {
        alert("票面限制必须填写数字");
        return false;
    }
    var remarktype = getRadio("rdRmk");
    var remark = $("#editRemark").val();

    tipPop("正在执行操作...");
    $.post("GJPolicyList.php",
        { Action: "EditAll", ID: ids, OfficeProvider: provideoffice, AduType: adutype, ChdWay: chdway, ChdNone: chdnone, MixBerth: mixberth, MixSeason: mixseason, MixSB: mixsb, MixBase: mixbase, PriceMin: pricemin, PriceMax: pricemax, PriceType: pricetype, RemarkType: remarktype, Remark: remark, RuleID: ruleid }
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

//#region 行程单
function ChangeUnit() {
    $("#spnUnit").text(($("#dropFareWay").val() == "0" ? "元" : "%"));
}

function ChangeIte() {
    var abled = $("#dropAbled").val();
    var dis = (abled == "0");
    $("#dropByWay").attr("disabled", dis);
    $("#txtFree").attr("disabled", dis);
    $("#txtPay").attr("disabled", dis);
    $("#dropFareWay").attr("disabled", dis);
    $("#txtFare").attr("disabled", dis);
}

function ItineraryForm(id, json) {
    if (id == null) {//批量修改
        var ids = getCheckbox("chkID");
        if (ids == "") {
            alertPop("请先选择要批量修改的政策!");
            return;
        }
        id = "";
    }

    var htm = [];
    htm.push("<div class='bt10'>");
    htm.push("<table class='table'>");
    htm.push("<tr>");
    htm.push("<td>行程单规定</td>");
    htm.push("<td><select id='dropAbled' style='width:130px;' onchange='ChangeIte()'><option value='0'>不打印</option><option value='1'>供应打印</option><option value='2'>平台打印</option></select>");
    htm.push("<div class='mt6'><select id='dropByWay' style='width:130px;'><option value='0'>按票面价高开</option><option value='1'>按结算价高开</option></select>");
    htm.push("，免费高开 <input type='text' id='txtFree' style='width:60px;'/> %，");
    htm.push("收费高开 <input type='text' id='txtPay' style='width:60px;'/> %</div>");
    htm.push("<div class='mt6'><select id='dropFareWay' style='width:130px;' onchange='ChangeUnit()'><option value='0'>按固定额度收取</option><option value='1'>按超出部分收取</option><option value='2'>按高开金额收取</option></select>");
    htm.push(" <input type='text' id='txtFare' style='width:60px;'/> <span id='spnUnit'>元</span></div>");
    htm.push("</td>");
    htm.push("</tr>");
    htm.push("</table>");
    htm.push("</div>");
    htm.push("<center><input type='button' class='btn btn-blue' onclick=\"SaveItinerary('" + id + "')\" value='保存' /><input type='button' class='btn btn-white' value='关闭' onclick='closePop()'/></center>");

    popLayer("show", "编辑行程单规定", htm.join(''));
    if (json != null) {
        $("#dropAbled option[value='" + json.abled + "']").attr("selected", true);
        $("#dropByWay option[value='" + json.byway + "']").attr("selected", true);
        $("#txtFree").val(json.free);
        $("#txtPay").val(json.pay);
        $("#dropFareWay option[value='" + json.fareway + "']").attr("selected", true);
        $("#txtFare").val(json.fare);
    }
    ChangeUnit();
    ChangeIte();
}

function SaveItinerary(id) {
    if (id == "") {
        id = getCheckbox("chkID");
    }
    var abled = $("#dropAbled").val();
    var byway = $("#dropByWay").val();
    var free = $("#txtFree").val();
    free = (free == "" ? "0" : free);
    var pay = $("#txtPay").val();
    pay = (pay == "" ? "0" : pay);
    var fareway = $("#dropFareWay").val();
    var fare = $("#txtFare").val();
    fare = (fare == "" ? "0" : fare);

    if (abled != "0") {
        if (!$.isNumeric(free)) {
            alert("请正确填写免费高开！");
            $("#txtFree").focus();
            return;
        }
        if (!$.isNumeric(pay)) {
            alert("请正确填写收费高开！");
            $("#txtPay").focus();
            return;
        }
        if (!$.isNumeric(fare)) {
            alert("请正确填写收取值！");
            $("#txtFare").focus();
            return;
        }
    }
    else {
        free = "0";
        pay = "0";
        fare = "0";
    }

    var para = { Action: "SaveItinerary", ID: id, Abled: abled, ByWay: byway, Free: free, Pay: pay, FareWay: fareway, Fare: fare};

    tipPop("正在保存数据...");
    $.post("GJPolicyList.php", para,
    function (data) {
        if (data != "OK") {
            alertPop(data);
        }
        else {
            alertPop("保存成功！", function () { LoadList(); });
        }
    });
}
//#endregion

//#endregion



