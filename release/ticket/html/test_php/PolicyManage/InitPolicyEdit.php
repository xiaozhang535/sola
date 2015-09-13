<?php
function get_html($str_item)
{
    if($str_item==NULL || $str_item=="")
    {
        $str_item="{}";
    }
$html = <<<EOD
<!DOCTYPE html>
<html>
<head>
<meta charset ="UTF-8">
<title>
    gogofly test
</title><link type="text/css" rel="stylesheet" href="Css/Base.css?d=201412081" />
    <script language="javascript" type="text/javascript" src="../JavaScript/DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="../JavaScript/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Js/poplayer.js"></script>
    <script type="text/javascript" src="Js/forms.js"></script>
    <script type="text/javascript" src="Js/GJAreas.js"></script>
    <script type="text/javascript">
        var fmtData = {doubleCalendar:true,position:{top:1},minDate:'%y-%M-%d'};
        var jsonEdit = ${str_item} ;
        //var jsonEdit = {ret:"OK", id:"AA00398278", carrier:"MU", carriersame:"FM", officeprovider:"SZX394", officeticket:"SZX472", tickettype:"BSP", ticketauditing:true, adutype:"101", chdway:"2", chdnone:false, deplimit:"False", depcity:"", deparea:"010101", arrlimit:"False", arrcity:"", arrarea:"0", backlimit:"False", backcity:"", backarea:"0", changegncity:"", changegjcity:"", flightsgo:"", flightsback:"", flightsnone:"", voyagenone:"", personnum:"0", persondouble:false, yearsfrom:"0", yearsto:"0", record:"2", recordoffice:"", recordnoright:false, discountnone:"IT票面,共享航班,包机/包销/独飞", mixberth:"2", mixseason:"2", mixsb:"2", mixbase:"2", addon:"1", spa:"1", voyagetype:"1", pricelow:false, nonstop:false, carrieridentity:false, remark:"需换我司记录出票； @.可开蓝联行程单需出票前注明否则视为放弃,代理费已航司公布为准如有疑问请咨询； @.改/退票需收取100RMB服务费需提前二个工作提交逾期不予以受理；如有外航段请审核； @.未涉及的销售规则均已票号对应航司公布适用条件为准,新PNR需授权的请采购提供授权号像我司确认；此政策票量有限。", officegroupid:"628", pricemin:"900", pricemax:"0", aheadday:"0", ruleid:"00215379", flag:"32 72", datelist:[{dateticketfrom:"2015-05-19", dateticketto:"2016-03-31", dategofrom:"2015-08-01", dategoto:"2016-03-31", datebackto:"", dategonone:"", datebacknone:"", datemixway:1, berthlist:[{discountbase:"3", discount:"17", ticketfare:"10", cashsingle:"0", cashdouble:"0", chddiscount:"0", chdticketfare:"0", berth:"F/J/Y/U", berthaddon:"", berthway:0, isother:false, chdbase:"3"},{discountbase:"3", discount:"12", ticketfare:"10", cashsingle:"0", cashdouble:"0", chddiscount:"0", chdticketfare:"0", berth:"P/C/BM/E", berthaddon:"", berthway:0, isother:false, chdbase:"3"},{discountbase:"3", discount:"5", ticketfare:"10", cashsingle:"-10", cashdouble:"-20", chddiscount:"0", chdticketfare:"0", berth:"D/H/K/L/N/R/S/B", berthaddon:"", berthway:0, isother:false, chdbase:"3"},{discountbase:"0", discount:"0", ticketfare:"10", cashsingle:"0", cashdouble:"0", chddiscount:"0", chdticketfare:"0", berth:"A/G/I/O/Q/T/V/W/X/Z", berthaddon:"", berthway:0, isother:true, chdbase:"0"}]}]};
    </script>
    <script type="text/javascript" src="Js/GJPolicyEdit.js?d=201503111"></script>
    <style type="text/css">
        .div-tab{padding:10px; line-height:20px; height:110px; overflow:auto;}
        .div-tab label{display:inline-block; width:240px; padding-left:2px;}
    </style>
</head>
<body>
    <form name="form1" method="post" action="GJPolicyEdit.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWBgL+raDpAgKpqvWrCQL7vrPiAwKQo8KrDQLQjbCsAgKdwuOUB5FA0KFl1DaVXMMejn7IBPb/ThRV" />
</div>
    
<div class="bt10">
    <ul id="ucGJPolicyTop_ulTop" class="tab tab-orange"><li><a class='sa' href="GJPolicyList.php">国际总量政策</a></li><li><a  href="GJPolicyPriceList.php">国际价单政策</a></li><li><a  href="GJCarrierRuleList.php">航空公司规则</a></li><li><a  href="GJOfficeList.php">开票组设置</a></li><li><a  href="GJHangUpList.php">政策挂起</a></li></ul>
</div>
    <div class="bt10">
        <ul class="tabmini tab-blue" id='ulTab'>
            <li><a href="#0">政策行程</a></li><li><a href="#1">时限及舱位</a></li><li><a href="#2">条件及备注</a></li>
            <div class="tright"><span class="albl c-green" onclick="BackUrl()">返回列表</span></div>
        </ul>
    </div>
    <div class='tabcon'>
    <div class="bt20">
        <table class="table">
            <thead>
                <tr>
                    <th colspan="4"><span class="f14">基本信息</span></th>
                </tr>
            </thead>
            <tr>
                <td align="right" width="100"><span class="c-red">* </span>航空公司</td>
                <td width="400"><input type="text" id="txtCarrier" placeholder="航空公司二字码" class="upper" maxlength="2"/></td>
                <td align="right" width="100">同时适用航司</td>
                <td><input type="text" id="txtSameCarrier" class="upper" maxlength="8"  placeholder=多个用"/"分隔,可不填 /></td>
            </tr>
            <tr>
                <td align="right"><span class="c-red">* </span>供应商OFFICE号</td>
                <td><input name="txtProvideOffice" type="text" value="SZX394" maxlength="6" id="txtProvideOffice" class="upper" /></td>
                <td align="right"><span class="c-red">* </span>开票OFFICE号</td>
                <td><div class="combox"><input name="txtTicketOffice" type="text" maxlength="6" id="txtTicketOffice" class="upper" placeholder="选择开票组或填写OFFICE号" change="ChangeOffice()" /><i></i>
                        <ul>
                            <li val='101' type='BSP' worktime='一,二,三,四,五,08:30至18:00<br>六,08:30至12:00<br>日,节日,不工作' voidtime='一,二,三,四,五,09:00至17:00<br>六,09:00至11:30<br>日,节日,不工作' refundtime='一,二,三,四,五,09:00至17:00<br>六,日,节日,不工作'>SZX472-境外票常规可VOID</li>
                            <li val='480' type='BSP' worktime='一,二,三,四,五,08:30至17:00<br>六,日,节日,不工作' voidtime='六,日,节日,08:00至08:01<br>一,二,三,四,五,不工作' refundtime='一,二,三,四,五,10:00至16:00<br>六,日,节日,不工作'>SZX472-航空公司GSA开票</li>
                            <li val='628' type='BSP' worktime='一,二,三,四,五,六,日,节日,08:30至18:00' voidtime='一,二,三,四,五,六,日,节日,09:00至17:00' refundtime='一,二,三,四,五,09:00至17:00<br>六,日,节日,不工作'>SZX472-白天</li>
                            <li val='629' type='BSP' worktime='一,二,三,四,五,六,日,节日,08:30至23:00' voidtime='一,二,三,四,五,六,日,节日,09:00至18:00' refundtime='一,二,三,四,五,09:00至17:00<br>六,日,节日,不工作'>SZX472-长时间</li>
                            <li val='630' type='BSP' worktime='一,二,三,四,五,六,日,节日,08:30至23:00' voidtime='一,二,三,四,五,六,日,节日,08:00至08:01' refundtime='一,二,三,四,五,09:00至16:00<br>六,日,节日,不工作'>SZX472-境外票不可VOID</li>
                            <li val='646' type='BSP' worktime='一,二,三,四,五,六,日,节日,08:30至23:00' voidtime='一,二,三,四,五,09:00至21:00<br>六,日,节日,不工作' refundtime='一,二,三,四,五,12:00至20:00<br>六,日,节日,不工作'>SZX472-MOW境外电子票</li>
                        </ul>
                    </div>
                    &nbsp;&nbsp;<span id='spnWork' val="" class="albl c-blue hand" onclick="ShowWork(this)">工作时间</span><input id="hidWork" type="hidden" />
                 </td>
            </tr>
            <tr>
                <td align="right"><span class="c-red">* </span>PCC</td>
                <td><input name="txtPCC" type="text" value="HKG" maxlength="4" id="txtPCC" class="upper" /></td>
                <td align="right" width="100"><span class="c-red">* </span>政策生效位置</td>
                <td> 
                    <label><input type="checkbox" name="chkValidPlace" id="chkValidPlace" value="1"/>查询伽利略价格之前</label>
                    <label><input type="checkbox" name="chkValidPlace" id="chkValidPlace" value="2"/>查询伽利略价格之后</label>
                </td>
            </tr>
            
        </table>
    </div>
    <div class="bt20">
        <table class="table">
            <thead>
                <tr>
                    <th colspan="4"><span class="f14">航程信息</span><div></div></th>
                </tr>
            </thead>
            <tr>
                <td align="right" width="100"><span class="c-red">* </span>航程类型</td>
                <td width="400">
                <label><input type="radio" name="rdVoyage" value="1" checked onclick="VoyType()"/>不限定</label>
                <label><input type="radio" name="rdVoyage" value="2" onclick="VoyType()"/>仅限单程</label>
                <label><input type="radio" name="rdVoyage" value="3" onclick="VoyType()"/>仅限往返</label></td>
                <td align="right" width="100">航程限定</td>
                <td>
                    <label><input type="checkbox" id="chkNonStop" onclick="NonStop()"/>必须直飞</label>
                    <label><input type="checkbox" id="chkSameCarrier"/>全程必须是</label><s class="albl c-blue hand" onclick="noteLayer(this, '在航段分析过程（与政策无关）中<br>视为同一承运人的航司有：<br>MU=FM, AF=KL, AE=CI<br>BR=B7, CX=KA, LH=OS=LX')">同一承运人</s></td>
            </tr>
            <tr>
                <td colspan="4" class="ptd">
                    <div class="bt20">
                        <table class="table" id="tbDepArea">
                            <tr>
                                <th colspan="2"><b>始发区域</b></th>
                            </tr>
                            <tr class="ntr">
                                <td class="ntd" valign="top" width="300">
                                    <div class="tree"></div>
                                </td>
                                <td valign="top">
                                    <div class="bt6">
                                        <label><input type="radio" name="rdDepCitys" value="False" onclick="BindCityType('Dep')" checked/>按区域范围<span class="c-red">排除机场</span></label>
                                        <label><input type="radio" name="rdDepCitys" value="True" onclick="BindCityType('Dep')"/>仅限定机场</label>
                                        <input type='button' class='btn btn-white' value='全选/反选' onclick="ChkResChk('Dep')"/>
                                        <input type='text' style="width:234px" maxlength='20' placeholder="在已显示的机场列表中查找"/> 
                                        <input type='button' class='btn btn-green' value='搜索' onclick="ScanChk(this, 'Dep')"/>
                                    </div>
                                    <div class="bt10">
                                        <textarea id="txtDepCitys" class="upper" placeholder=请选择机场三字码,以"/"分隔 style="width:580px; height:55px"></textarea>
                                    </div>
                                    <div class="div-tab" id="divDepCitys"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="bt20">
                        <table class="table" id="tbArrArea">
                            <tr>
                                <th colspan="2"><b>到达区域</b></th>
                            </tr>
                            <tr class="ntr">
                                <td class="ntd" valign="top" width="300">
                                    <div class="tree"></div>
                                </td>
                                <td valign="top">
                                    <div class="bt6">
                                        <label><input type="radio" name="rdArrCitys" value="False" onclick="BindCityType('Arr')" checked/>按区域范围<span class="c-red">排除城市</span></label>
                                        <label><input type="radio" name="rdArrCitys" value="True" onclick="BindCityType('Arr')"/>仅限定机场</label>
                                        <input type='button' class='btn btn-white' value='全选/反选' onclick="ChkResChk('Arr')"/>
                                        <input type='text' style="width:234px" maxlength='20'/> 
                                        <input type='button' class='btn btn-green' value='搜索' onclick="ScanChk(this, 'Arr')"/>
                                        <input type='button' class='btn btn-blue' value='翻转出发与到达' onclick="TurnCity()"/>
                                    </div>
                                    <div class="bt10">
                                        <textarea id="txtArrCitys" class="upper" style="width:580px; height:55px"></textarea>
                                    </div>
                                    <div class="div-tab bt10" id="divArrCitys"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="bt20">
                        <table class="table" id="tbBackArea">
                            <tr>
                                <th colspan="2"><b>返回区域</b></th>
                            </tr>
                            <tr class="ntr">
                                <td class="ntd" valign="top" width="300">
                                    <div class="tree"></div>
                                </td>
                                <td valign="top">
                                    <div class="bt6">
                                        <label><input type="radio" name="rdBackCitys" value="False" onclick="BindCityType('Back')" checked/>按区域范围<span class="c-red">排除城市</span></label>
                                        <label><input type="radio" name="rdBackCitys" value="True" onclick="BindCityType('Back')"/>仅限定机场</label>
                                        <input type='button' class='btn btn-white' value='全选/反选' onclick="ChkResChk('Back')"/>
                                        <input type='text' style="width:234px" maxlength='20'/> 
                                        <input type='button' class='btn btn-green' value='搜索' onclick="ScanChk(this, 'Back')"/>
                                    </div>
                                    <div class="bt10">
                                        <textarea id="txtBackCitys" class="upper" style="width:580px; height:55px"></textarea>
                                    </div>
                                    <div class="div-tab bt10" id="divBackCitys"></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="bt20" id="divChangeCity">
                        <table class="table">
                            <tr>
                                <th colspan="4"><b>中转城市</b></th>
                            </tr>
                            <tr>
                                <td align="right" width="100"><span class="c-red">* </span>Add-on</td>
                                <td>
                                    <label><input type="radio" name="rdAddon" value="1" onclick="AddonType()" checked/>不限定</label>
                                    <label><input type="radio" name="rdAddon" value="2" onclick="AddonType()"/>去/回程必须包含</label>
                                    <label><input type="radio" name="rdAddon" value="3" onclick="AddonType()"/>任意程包含</label>
                                    <label><input type="radio" name="rdAddon" value="4" onclick="AddonType()"/>全程不能包含</label></td>
                                <td align="right" width="100"><span class="c-red">* </span>SPA</td>
                                <td>
                                 <label><input type="radio" name="rdSPA" value="1" onclick="SpaType()" checked/>不限定</label>
                                    <label><input type="radio" name="rdSPA" value="2" onclick="SpaType()"/>必须包含SPA</label>
                                    <label><input type="radio" name="rdSPA" value="3" onclick="SpaType()"/>不能包含SPA</label></td>
                            </tr>
                            <tr>
                                <td align="right">境内中转点</td>
                                <td id="tdChangeIn"><label><input type="radio" value="" name="rdChangeIn" checked/>限定</label>
                                    <label><input type="radio" value="!" name="rdChangeIn"/>排除</label>
                                    <input type="text" id="txtChangInCity" class="upper" placeholder=输入机场三字码,以"/"分隔 style="width:280px;"/></td>
                                <td align="right">境外中转点</td>
                                <td id="tdChangeOut"><label><input type="radio" value="" name="rdChangeOut" checked/>限定</label>
                                    <label><input type="radio" value="!" name="rdChangeOut"/>排除</label>
                                    <input type="text" id="txtChangOutCity" class="upper" placeholder=输入机场三字码,以"/"分隔 style="width:280px;"/></td>
                            </tr>
                        </table>
                    </div>
                    <table class="table">
                        <tr>
                            <th colspan="4"><b>限定航班号</b></th>
                        </tr>
                            <tr>
                            <td align="right" width="100">去程适用航班</td>
                            <td><input type="text" id="txtGoFlights" placeholder=必须以航司二字码开头,以"/"分隔,例:CA380/CA747,可不填  class="upper" style="width:360px;"/></td>
                            <td align="right" width="100">回程适用航班</td>
                            <td><input type="text" id="txtBackFlights" placeholder=无限制可不填 class="upper" style="width:360px;"/></td>
                        </tr>
                        <tr>
                            <td align="right">不适用的航班</td>
                            <td><input type="text" id="txtNoFlights" placeholder=无限制可不填 class="upper" style="width:360px;"/></td>
                            <td align="right">不适用的航线</td>
                            <td><input type="text" id="txtNoVoyages" placeholder=例如：PEK-ICN/SHA-NRT,无限制可不填 class="upper" style="width:360px;" /></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <center>
        <input type="hidden" name="HiddenField1" id="HiddenField1" />
        <input name="btnSave0" type="button" id="btnSave0" class="btn-large btn-green" onclick="Save(this)" value="立即保存" />
        <input type="button" class="btn-large btn-white" onclick="Next(1, 0)" value="下一步" />
    </center>
    </div>
    <div class='tabcon'>
        <div class="bt20">
            <table class="table">
            <thead>
                <tr>
                    <th colspan="4"><span class='f14'>规则及乘客类型</span></th>
                </tr>
            </thead>
            <tr>
                <td align="right" width="120"><label style="margin-right:0"><span class="c-red">* </span><input type="checkbox" onclick="chkAll(this, 'chkAdu')"/>成人类型</label></td>
                <td width="400"><label><input type="checkbox" name="chkAdu" value="101"/>一般成人</label>
                    <label><input type="checkbox" name="chkAdu" value="102" />学生</label>
                    <label><input type="checkbox" name="chkAdu" value="103" />青年</label>
                    <label><input type="checkbox" name="chkAdu" value="104" />移民</label>
                    <label><input type="checkbox" name="chkAdu" value="105" />劳务</label>
                    <label><input type="checkbox" name="chkAdu" value="106" />海员</label>
                    <label><input type="checkbox" name="chkAdu" value="107" />特殊身份</label></td>
                <td align="right" width="120">儿童奖励</td>
                <td>
                    <label><input type="radio" name="rdChd" onclick="ChdType()" value="1" checked/>与成人相同</label>
                    <label><input type="radio" name="rdChd" onclick="ChdType()" value="2"/>指定奖励</label>
                    <label><input type="radio" name="rdChd" onclick="ChdType()" value="3"/>不开票</label>
                    <label><input type="checkbox" id="chkChdNone"/>不单开</label>
                </td>
            </tr>
            <tr>
                <td align="right">混舱</td>
                <td>
                    <label><input type="radio" name="rdMixBerth" value="1" checked/>取1/2值</label>
                    <label><input type="radio" name="rdMixBerth" value="2" />取较小值</label>
                    &nbsp;&nbsp;<span class="albl c-blue hand" onclick="noteLayer(this, '去回程的舱位只要不是落在同一条舱位下，便视为混舱<br>当某一条舱位允许混舱时，<br>行程的回程舱位分别去匹配其他各条舱位的【适用舱位】<br>当其中有任意一组舱位不允许混舱时，该政策无效。<br>当该条舱位不允许混舱时，<br>行程的去程和回程舱位必须同时符合该条舱位的【适用舱位】政策才生效。<br>如该条舱位不开票，则当行程中包含其中任意舱位时，该政策无效。<br>混舱政策计算按混舱设置规则执行。<br>请各供应商确保理解该规则后录入政策。')">混舱说明</span>
                    </td>
                <td align="right" width="120">跨季</td>
                <td>
                    <label><input type="radio" name="rdMixSeason" value="1" checked/>取1/2值</label>
                    <label><input type="radio" name="rdMixSeason" value="2" />取较小值</label>
                    &nbsp;&nbsp;<span class="albl c-blue hand" onclick="noteLayer(this, '行程的回程时间超过【回程有效期截止】时该政策视为跨季<br/>当某一时间组允许跨季时，<br/>行程的回程时间分别去匹配其他各个时间组的【去程有效期】，<br/>当时间组不允许跨季时，<br>行程的回程时间只在本时间组内查找。<br>跨季政策计算按跨季设置规则执行。<br>请各供应商确保理解该规则后录入政策。')">跨季说明</span>
                </td>
            </tr>
            <tr>
                <td align="right">混舱并跨季</td>
                <td>
                    <label><input type="radio" name="rdMixBS" value="1" checked />取1/2值</label>
                    <label><input type="radio" name="rdMixBS" value="2"/>取较小值</label>
                    </td>
                <td align="right">代理费</td>
                <td>
                    <label><input type="radio" name="rdMixBase" value="3" checked/>取较大值</label>
                    <label><input type="radio" name="rdMixBase" value="2"/>取较小值</label>
                    <label><input type="radio" name="rdMixBase" value="1"/>取1/2值</label>
                    &nbsp;&nbsp;<span class="c-red">*注:当混舱或跨季时应用</span>
                </td>
            </tr>
        </table>
        </div>
        <div id="divDateGroup">
            <div class="bt20">
                <table class="table table-3b">
                    <thead>
                        <tr>
                            <th colspan="4"><span class="f14">时间限定1</span></th>
                        </tr>
                    </thead>
                    <tr>
                        <td align="right" width="120"><span class="c-red">* </span>开票有效期</td>
                        <td width="400"><input type="text" class="calendar" name="txtTicketDateFrom" placeholder="YYYY-MM-DD" style="width:100px;" onfocus="WdatePicker(fmtData)"/> -
                            <input type="text" class="calendar" name="txtTicketDateTo" style="width:100px;" onfocus="WdatePicker(fmtData)"/></td>
                        <td align="right" width="120">回程超出截止期时</td>
                        <td name="tdDateMixWay">
                            <label><input type="radio" group="DateMixWay" name="rdDateMixWay" value="1" checked/>按跨季处理</label>
                            <label><input type="radio" group="DateMixWay" name="rdDateMixWay" value="2"/>按无奖励处理</label>
                            <label><input type="radio" group="DateMixWay" name="rdDateMixWay" value="3"/>不开票</label>
                        </td>
                    </tr>
                    <tr>
                        <td align="right"><span class="c-red">* </span>去程有效期</td>
                        <td><input type="text" class="calendar" name="txtGoDateFrom" style="width:100px;" onfocus="WdatePicker(fmtData)"/> -
                            <input type="text" class="calendar" name="txtGoDateTo" style="width:100px;" onfocus="WdatePicker(fmtData)"/></td>
                        <td align="right">回程有效期截止</td>
                        <td>
                            <input type="text" class="calendar" name="txtBackDateTo" placeholder=无限制可不填 style="width:100px;" onfocus="WdatePicker(fmtData)"/>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">去程不适用日期</td>
                        <td valign="top" name="tdGoDateNone">
                            <div>
                                <input type="text" class="calendar" placeholder=无限制可不填 style="width:100px;" onfocus="WdatePicker(fmtData)"/> -
                                <input type="text" class="calendar" style="width:100px;" onfocus="WdatePicker(fmtData)"/>
                                <input type="button" class="btn btn-white" value="添加" onclick="AddDate(this)" />
                            </div>
                         </td>
                        <td align="right">回程不适用日期</td>
                        <td valign="top" name="tdBackDateNone">
                            <div>
                                <input type="text" class="calendar" placeholder=无限制可不填 style="width:100px;" onfocus="WdatePicker(fmtData)"/> -
                                <input type="text" class="calendar" style="width:100px;" onfocus="WdatePicker(fmtData)"/>
                                <input type="button" class="btn btn-white" value="添加" onclick="AddDate(this)"/>
                            </div>
                         </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="4" class="ptd table-mini" name="tdBerthList">
                            <table class="table" name='tbBerth'>
                                <tr>
                                    <th colspan="2"><b>舱位1</b></th>
                                </tr>
                                <tr>
                                    <td width="120" align="right">成人政策</td>
                                    <td>
                                        代理费 <input type="text" style="width:30px;" name="txtBaseDiscount" value="0" maxlength="5"/> %,
                                        奖励 <input type="text" style="width:30px;" value="0" name="txtAwardDiscount" maxlength="5"/> %,
                                        <span class="albl c-blue hand" onclick="noteLayer(this, '只有当奖励为零时，开票费选项才生效！<br>奖励为零时有以下两种情况：<br>1.政策录入时奖励为零<br>2.通过规则计算后奖励为零(例如:奖励票面为零时)<br/>如想在有奖励时加开票费，请经过折算后添加到单程或往返返款中<br/>儿童开票费同上')">无奖励开票费</span> <input type="text" style="width:30px;" value="10" name="txtTicketFare" maxlength="5"/> 元,
                                        单程返款 <input type="text" style="width:30px;" name="txtSingleCash" value="0" maxlength="5"/> 元,
                                        往返返款 <input type="text" style="width:30px;" name="txtDoubleCash" value="0" maxlength="5"/> 元
                                    </td>
                                </tr>
                                <tr>
                                    <td width="120" align="right">儿童政策</td>
                                    <td>
                                        代理费 <input type="text" style="width:30px;" name="txtChdBase" disabled="disabled" value="0" maxlength="5"/> %,
                                        奖励 <input type="text" style="width:30px;" name="txtChdDiscount" disabled="disabled" maxlength="5" value="0"/> %,
                                        无奖励开票费 <input type="text" style="width:30px;" name="txtChdTicketFare" disabled="disabled" maxlength="5" value="10"/> 元
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"><span class="c-red">* </span>适用舱位</td>
                                    <td>
                                        <label><input type="checkbox" value="1" onclick="BerthType(this)" />头等</label>
                                        <label><input type="checkbox" value="2" onclick="BerthType(this)" />公务</label>
                                        <label><input type="checkbox" value="3" onclick="BerthType(this)" />经济</label>
                                        <label><input type="checkbox" value="4" onclick="BerthType(this)" />超值公务</label>
                                        <label><input type="checkbox" value="5" onclick="BerthType(this)" />高端经济</label>
                                        <input type="text" name="txtBerths" class="upper" maxlength='60' onblur="OtherBerth(this)" placeholder=舱位以"/"分隔,可不填 style="width:360px;"/>
                                        &nbsp;<select name="dropBerthWay" onchange="ChangeBerthWay(this)">
                                            <option value="0">可混舱</option>
                                            <option value="1">不可混舱</option>
                                            <option value="2">不开票</option>
                                            <option value="3">可混舱不单开</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">限定Add-on段舱位</td>
                                    <td>
                                        <label><input type="checkbox" value="1" onclick="BerthType(this)" />头等</label>
                                        <label><input type="checkbox" value="2" onclick="BerthType(this)" />公务</label>
                                        <label><input type="checkbox" value="3" onclick="BerthType(this)" />经济</label>
                                        <label><input type="checkbox" value="4" onclick="BerthType(this)" />超值公务</label>
                                        <label><input type="checkbox" value="5" onclick="BerthType(this)" />高端经济</label>
                                        <input type="text" name="txtAddonBerths" maxlength='60' placeholder=无限制可不填 class="upper" style="width:360px;"/>
                                    </td>
                                </tr>
                            </table>
                            <div></div>
                            <center class="mt6"><input type="button" name="btnBerthAdd" class="btn btn-blue" onclick="AddBerth(this)" value="继续添加舱位" /></center>
                            <div class="mt6">
                            <table class="table" name="tbOther">
                                <tr>
                                    <th colspan="2" valign="middle"><b>剩余的舱位</b></th>
                                </tr>
                                <tr>
                                    <td width="120" align="right">政策奖励</td>
                                    <td>
                                        成人代理费 <input type="text" style="width:30px;" name="txtBaseDiscount" value="0" maxlength="5"/> %,
                                        成人无奖励开票费 <input type="text" style="width:30px;" value="10" name="txtTicketFare" maxlength="5"/> 元,
                                        儿童代理费 <input type="text" style="width:30px;" name="txtChdBase" value="0" disabled="disabled" maxlength="5"/> %,
                                        儿童无奖励开票费 <input type="text" style="width:30px;" name="txtChdTicketFare" disabled="disabled" maxlength="5" value="10"/> 元
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right"><span class="c-red">* </span>适用舱位</td>
                                    <td name="tdOtherBerth">
                                        <span name="spnBerth" val="A">A/</span><span name="spnBerth" val="B">B/</span><span name="spnBerth" val="C">C/</span><span name="spnBerth" val="D">D/</span><span name="spnBerth" val="E">E/</span><span name="spnBerth" val="F">F/</span><span name="spnBerth" val="G">G/</span><span name="spnBerth" val="H">H/</span><span name="spnBerth" val="I">I/</span><span name="spnBerth" val="J">J/</span><span name="spnBerth" val="K">K/</span><span name="spnBerth" val="L">L/</span><span name="spnBerth" val="M">M/</span><span name="spnBerth" val="N">N/</span><span name="spnBerth" val="O">O/</span><span name="spnBerth" val="P">P/</span><span name="spnBerth" val="Q">Q/</span><span name="spnBerth" val="R">R/</span><span name="spnBerth" val="S">S/</span><span name="spnBerth" val="T">T/</span><span name="spnBerth" val="U">U/</span><span name="spnBerth" val="V">V/</span><span name="spnBerth" val="W">W/</span><span name="spnBerth" val="X">X/</span><span name="spnBerth" val="Y">Y/</span><span name="spnBerth" val="Z">Z/</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<select name="dropBerthWay" onchange="ChangeBerthWay(this)">
                                            <option value="0">可混舱</option>
                                            <option value="1">不可混舱</option>
                                            <option value="2">不开票</option>
                                            <option value="3">可混舱不单开</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    <center>
        <input type="button" class="btn-large btn-white" onclick="Next(0, 1)" value="上一步" />
        <input type="button" class="btn-large btn-blue" onclick="AddGroup()" value="添加一段时间" />
        <input name="btnSave1" type="button" id="btnSave1" class="btn-large btn-green" onclick="Save(this)" value="立即保存" />
        <input type="button" class="btn-large btn-white" onclick="Next(2, 1)" value="下一步" /></center>
    </div>
    <div class='tabcon'>
    <div class="bt20">
        <table class="table">
            <thead>
                <tr>
                    <th colspan="4"><span class="f14">条件限定</span></th>
                </tr>
            </thead>
            <tr>
                <td align="right" width="120"><span class="c-red">* </span>航司规则</td>
                <td colspan="3">
                    <input type='radio' name='rdRule' value='00215459'/><label class='albl hand' title='' onclick="ShowRule(this, 'CP00042239', '00215459')">境外票</label> <input type='radio' name='rdRule' value='00215379'/><label class='albl hand' title='' onclick="ShowRule(this, 'CP00042239', '00215379')">BSP</label> 
                </td>
            </tr>
            <tr>
                <td align="right"><span class="c-red">* </span>票类</td>
                <td width="400"><label><input type="radio" name="rdType" value="BSP" checked/>BSP</label> <label><input type="radio" name="rdType" value="B2B"/>B2B</label> <label><input type="radio" name="rdType" value="境外电子"/>境外电子</label></td>
                <td align="right" width="120">审核出票</td>
                <td>
                    <label><input type="checkbox" id="chkAuditing"/>需要审核后出票</label>
                </td>
            </tr>
            <tr>
                <td align="right"><span class="c-red">* </span>换编码</td>
                <td id='tdRecord'>
                    <label><input type="radio" name="rdRecord" value="1" />无需换编码</label>
                    <label><input type="radio" name="rdRecord" value="2" />换编码出票</label>
                    <label><input type="radio" name="rdRecord" value="3" />大编出票(无需换编)</label><br/>
                    <label><input type="radio" name="rdRecord" value="4" />大编出票(需换编码)</label>
                    <label><input type="radio" name="rdRecord" value="5" />需换编码(外放无位可不换)</label>
                    <label><input type="checkbox" id="chkRecordNoRights"/>换编码不授权</label><br/>
                    <label><input type="checkbox" id="chkRecordToOffice" onclick="ChkToBox(this)"/>当订位OFFICE号为</label><input type="text" id="txtRecordToOffice" class="upper" style="width:200px;" disabled="disabled" maxlength="64"/> 时不开票
                </td>
                <td align="right">无奖励说明<br/>(仅在购票限制中显示)</td>
                <td id="tdNoDiscount">
                    <label><input type="checkbox" name="chkNoDiscount" value="港澳台"/>港澳台</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="外籍" />外籍</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="非汉字姓名" />非汉字姓名</label><br/>
                    <label><input type="checkbox" name="chkNoDiscount" value="套票" />套票</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="整团" />整团</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="小团" />小团</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="IT票面" checked/>IT票面</label><br/>
                    <label><input type="checkbox" name="chkNoDiscount" value="缺口" />缺口</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="共享航班" checked/>共享航班</label>
                    <label><input type="checkbox" name="chkNoDiscount" value="包机/包销/独飞" checked/>包机/包销/独飞</label>
                </td>
            </tr>
            <tr>
                <td align="right">适用人数</td>
                <td><input type="text" id="txtPersonNum" placeholder=无限制可不填 style="width:100px;"/> 人以上，
                    <label><input type="checkbox" id="chkDoublePerson" onclick="ChkPerson(this)"/>只适用于双人</label>
                </td>
                <td align="right">适用年龄</td>
                <td><input type="text" id="txtYearFrom" placeholder=无限制可不填 style="width:100px;"/> - <input type="text"  id="txtYearTo" style="width:100px;"/> 周岁</td>
            </tr>
            <tr>
                <td align="right">票面(不含税)限制</td>
                <td>
                    必须高于 <input type="text" id="txtPriceMin" placeholder=可不填 style="width:60px;"/> 元，或者必须低于 <input type="text" id="txtPriceMax" placeholder=可不填 style="width:60px;"/> 元时政策有效
                </td>
                <td align="right">其他限制</td>
                <td>
                    <label><input type="checkbox" id="chkPriceLow"/>票面略低</label>; 提前 <input type="text" id="txtAheadDay" maxlength='3' placeholder=可不填 style="width:60px;"/> 天出票有效
                </td>
            </tr>
        </table>
    </div>
    <div class="bt20">
        <table class="table">
            <thead>
                <tr>
                    <th colspan="2"><span class="f14">其他</span></th>
                </tr>
            </thead>
            <tr>
                <td align="right" width="120">政策标签</td>
                <td><input type="text" id="txtFlag" class="upper" placeholder="例：东航短线政策,最多10个字" maxlength="10" /> (简短的说明该政策的内容，将在政策列表中显示，但采购商不会看到)</td>
            </tr>
            <tr>
                <td align="right" width="120">备注</td>
                <td><input type="text" id="txtRemark" style="width:950px;"  /></td>
            </tr>
        </table>
    </div>
    <center>
        <input type="button" class="btn-large btn-white" onclick="Next(1, 2)" value="上一步" />
        <input type="button" class="btn-large btn-green" onclick="Save(this)" value="立即保存" />
        <input type="hidden" name="hidID" id="hidID" value="-1"/><input type="hidden" name="hidBackUrl" id="hidBackUrl" value="GJPolicyList.php" />
        <input type="button" class="btn-large btn-white" value="返回列表" onclick="BackUrl()"/></center>
    </div>
    </form>
</body>
</html>

EOD;
    return $html;
}
?>
