<?php
function get_html(&$arr_req)
{
$html = <<<EOD
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset ="UTF-8">
<title>
    gogofly
</title><link href="Skins/NewBase.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript" src="JavaScript/Prototype.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Base.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Valid.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/FloatDiv.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/ChatDiv.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/NewMain.js?Date=20130319"></script>
</head>
<body style="overflow: hidden;">
    <!--form name="form1" method="get" action="newmain.php" id="form1" onsubmit="return false;"-->
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWCAL+raDpAgKPpNKPAgLokNS1BQKeqNjdAwLun8xDAvDGxJoLAse19pMLAtCN6JwLpD09kSbDCdKxNUeJap/X7TthMqI=" />
</div>
    <div>
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="top_bg">
                    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="logo" align="right"><img id="imgLogo" src="Images/New/new-logo.png" style="border-width:0px;" /></td>
                            <td style="width:500px;">
                                <ul id="ulT">
                                    <li><a href="NewIndex.php" target="frmmain" class="ix_c"><b>首页</b></a></li>
                                    <li><a href='javascript:' id='acd' class='cd'><b>催单</b><i></i><s id='scd_count' style='display:none;'></s></a></li>
                                    <li><a href="javascript:void(0)" class="kf"><b>客服</b></a></li>
                                    
                                </ul>
                                <div class='top_f_menu' id='divcd' style='display:none;' onmouseover='StopFM()' onmouseout='GoFM()'><ul><li><span>国际供应催单</span></li><li class='lr'></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_etdz&ordertype=gj" target='frmmain'><i>待出票</i><b id='gj_gys_waiting_etdz' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_auditing_sellout&ordertype=gj" target='frmmain'><i>审核卖出价</i><b id='gj_gys_auditing_sellout' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_auditing_over&ordertype=gj" target='frmmain'><i>审核完成</i><b id='gj_gys_auditing_over' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_auditing&ordertype=gj" target='frmmain'><i>改签审核</i><b id='gj_gys_waiting_auditing' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_pause_deal_order&ordertype=gj" target='frmmain'><i>暂不能出票</i><b id='gj_gys_pause_deal_order' style='display:none;'></b></a></li><li class='lr'></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_void&ordertype=gj" target='frmmain'><i>废票费审核</i><b id='gj_gys_waiting_void' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_refund&ordertype=gj" target='frmmain'><i>退票费审核</i><b id='gj_gys_waiting_refund' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_refund_audit_over&ordertype=gj" target='frmmain'><i>退废已审核</i><b id='gj_gys_refund_audit_over' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_refund_confirmed&ordertype=gj" target='frmmain'><i>退废待处理</i><b id='gj_gys_waiting_refund_confirmed' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_refund_refuse&ordertype=gj" target='frmmain'><i>退废拒绝</i><b id='gj_gys_refund_refuse' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_remoney&ordertype=gj" target='frmmain'><i>待退款</i><b id='gj_gys_waiting_remoney' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_remoneyed&ordertype=gj" target='frmmain'><i>已退款</i><b id='gj_gys_remoneyed' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_remoneyfail&ordertype=gj" target='frmmain'><i>退款失败</i><b id='gj_gys_remoneyfail' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_list&ordertype=gj" target='frmmain'><i>所有订单</i><b id='gj_gys_list' style='display:none;'></b></a></li></ul><ul><li><span>国内供应催单</span></li><li class='lr'></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_list&ordertype=gn" target='frmmain'><i>所有订单</i><b id='gn_gys_list' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_etdz&ordertype=gn" target='frmmain'><i>待出票</i><b id='gn_gys_waiting_etdz' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_pre_etdz&ordertype=gn" target='frmmain'><i>预处理</i><b id='gn_gys_pre_etdz' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_auditing_apply&ordertype=gn" target='frmmain'><i>出票审核</i><b id='gn_gys_waiting_auditing_apply' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_auditing&ordertype=gn" target='frmmain'><i>改签审核</i><b id='gn_gys_waiting_auditing' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_pause_deal_order&ordertype=gn" target='frmmain'><i>暂不能出票</i><b id='gn_gys_pause_deal_order' style='display:none;'></b></a></li><li class='lr'></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_void&ordertype=gn" target='frmmain'><i>废票处理</i><b id='gn_gys_waiting_void' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_refund&ordertype=gn" target='frmmain'><i>退票处理</i><b id='gn_gys_waiting_refund' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_refound_not_acceptance&ordertype=gn" target='frmmain'><i>未受理退废票</i><b id='gn_gys_refound_not_acceptance' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_refound_translation&ordertype=gn" target='frmmain'><i>退废调度CPP</i><b id='gn_gys_refound_translation' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_pause_deal_order_refound&ordertype=gn" target='frmmain'><i>暂不能退废</i><b id='gn_gys_pause_deal_order_refound' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_refund_refuse&ordertype=gn" target='frmmain'><i>退废拒绝</i><b id='gn_gys_refund_refuse' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_remoney&ordertype=gn" target='frmmain'><i>待退款</i><b id='gn_gys_waiting_remoney' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_remoneyed&ordertype=gn" target='frmmain'><i>已退款</i><b id='gn_gys_remoneyed' style='display:none;'></b></a></li><li onclick="HideLi('cd')"><a href="OrderManage/OrderList.php?role=gys&disptype=gys_remoneyfail&ordertype=gn" target='frmmain'><i>退款失败</i><b id='gn_gys_remoneyfail' style='display:none;'></b></a></li></ul></div>
                            </td>
                            <td id="tdOurHome" align="center" style="display:none;"><a href="OurHomeIndex.php" target="frmmain"><img src="Images/team.png" border="0" /></a></td>

                            <td align="right" class="top_right">
                                <img src="Images/New/newmessage.gif" id="imgmsg" style="display:none;" alt="新消息" onclick="ShowMsgDiv(this)"/>&nbsp;&nbsp;
                                <span id="spanFaq" style="display:none;"><a href="Faq/FaqList.php?ClassID=2000" target="_blank">常见问题</a>&nbsp;︱</span>
                                
                                <a href="SystemManage/SysAdvance.php" target="frmmain" onclick="ClickTop()">意见反馈</a><br />
                                <a id="linkAccount" onclick="ClickTop()" href="SystemManage/Account.php" target="frmmain" style="font-weight:bold;">{$_SESSION["user_name"]}</a>&nbsp;
                                
                                <span id="spanLogOut"><span id="lblCompanyName">&lt;{$_SESSION["user_company"]}&gt;</span>&nbsp;&nbsp;<a href="index.php?Logout=0">[退出]</a></span>
                                <div class='top_f_message' id='divmsg' style='display:none;' onmouseover='StopFM()' onmouseout='GoFM()'>
                                    <ul id="ulmsg"></ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="left_bg_l" valign="top">
                                <ul id="ulM"><li class='gj_c'><a href='javascript:' title='国际'></a></li><li class='gn'><a href='javascript:' title='国内'></a></li><li class='zc'><a href='javascript:' title='政策'></a></li><li class='bb'><a href='javascript:' title='报表'></a></li><li class='tl'><a href='javascript:' title='工具'></a></li><li class='sz'><a href='javascript:' title='设置'></a></li></ul>
                                <div class="rx">
                                    <a id="aRx" href="javascript:" title="收放菜单" class="la" onclick="HideMenu(this)">
                                    </a>
                                </div>
                            </td>
                            <td id="tdLeft" valign="top" class="left_bg_r"><div id='divgj' ><div class='tt'><b class='gj'></b>国际</div><ul><li><a href="FlightQueryGJ/GJFlightQueryEntry.php?role=xss" target='frmmain'><b>⊙</b><u>航班查询</u></a></li><li><a href="OrderManage/GjPnrDataInput.php?disptype=pnrdata&role=xss" target='frmmain'><b>⊙</b><u>PNR创建订单</u></a></li><li><a href="OrderManage/GJOrderPNRInputEntryNew.php?disptype=pnrinput&role=xss" target='frmmain'><b>⊙</b><u>创建申请单</u></a></li><li class='hr'></li><li><a href="OrderManage/OrderList.php?role=xss&disptype=xss_today_order&ordertype=gj" target='frmmain'><b>⊙</b><u>采购订单</u></a></li><li><a href="OrderManage/OrderList.php?role=gys&disptype=gys_waiting_etdz&ordertype=gj" target='frmmain'><b>⊙</b><u>供应订单</u></a></li><li class='hr'></li><li><a href="OrderManage/DeliveryList.php" target='frmmain'><b>⊙</b><u>申请行程单</u></a></li><li><a href="OrderManage/DeliveryOrderList.php?TabName=WaitingPay" target='frmmain'><b>⊙</b><u>已申请行程单</u></a></li><li><a href="OrderManage/DeliveryManage.php?TabName=WaitingPrint" target='frmmain'><b>⊙</b><u>行程单管理</u></a></li></ul></div><div id='divgn' style='display:none;'><div class='tt'><b class='gn'></b>国内</div><ul><li><a href="OrderManage/OrderPNRInputEntry.php?disptype=pnrinput&role=xss" target='frmmain'><b>⊙</b><u>PNR创建订单</u></a></li><li><a href="OrderManage/ApplyOrderPNRInputEntry.php?disptype=pnrinput&role=xss" target='frmmain'><b>⊙</b><u>创建申请单</u></a></li><li class='hr'></li><li><a href="OrderManage/OrderList.php?role=xss&disptype=xss_today_order&ordertype=gn" target='frmmain'><b>⊙</b><u>采购订单</u></a></li><li><a href="OrderManage/OrderList.php?role=gys&disptype=gys_list&ordertype=gn" target='frmmain'><b>⊙</b><u>供应订单</u></a></li></ul></div><div id='divzc' style='display:none;'><div class='tt'><b class='zc'></b>政策</div><ul><li><a href="PolicyManage/GJPolicyList.php" target='frmmain'><b>⊙</b><u>国际政策维护</u></a></li><li class='hr'></li><li><a href="PolicyManage/PolicyCommonList.php" target='frmmain'><b>⊙</b><u>国内政策维护</u></a></li></ul></div><div id='divbb' style='display:none;'><div class='tt'><b class='bb'></b>报表</div><ul><li><a href="bill/GJTicketReport.php?TicketReportTag=5&TicketReportType=5&class=gj_all&role=yys" target='frmmain'><b>⊙</b><u>国际机票明细</u></a></li><li><a href="Bill/TicketSummary.php?IsInternational=1&IsFirst=1" target='frmmain'><b>⊙</b><u>国际机票汇总</u></a></li><li class='hr'></li><li><a href="bill/GNTicketReport.php?TicketReportTag=5&TicketReportType=5&class=gn_all&role=yys" target='frmmain'><b>⊙</b><u>国内机票明细</u></a></li><li><a href="Bill/TicketSummary.php?IsInternational=0&IsFirst=1" target='frmmain'><b>⊙</b><u>国内机票汇总</u></a></li></ul></div><div id='divtl' style='display:none;'><div class='tt'><b class='tl'></b>工具</div><ul><li><a href="JBManager/JBTest.php" target='frmmain'><b>⊙</b><u>信息单打印</u></a></li><li><a href="OrderManage/AirportCodeSearch.php" target='frmmain'><b>⊙</b><u>三字代码查询</u></a></li><li><a href="http://www.jp126.com" target='_blank'><b>⊙</b><u>iEterm下载</u></a></li></ul></div><div id='divsz' style='display:none;'><div class='tt'><b class='sz'></b>设置</div><ul><li><a href="SystemManage/Account.php" target='frmmain'><b>⊙</b><u>个人信息</u></a></li></ul></div></td>

                            <td style="border-top: 1px solid #CCC;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">
                                    <tr>
                                        <td class="td_maq">
                                            <img src="Images/no.gif" alt="" />
                                            <div id="divMeq">
                                                <ul id="ulMeq0">
                                                </ul>
                                                <ul id="ulMeq1">
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <iframe id="frmmain" scrolling="auto" src="NewIndex.php" frameborder="0" width="100%" name="frmmain" height="100%"></iframe>
                                        </td>
                                    </tr>
                                    <tr id="trChatmin" style="display:none;">
                                        <td style="height:20px; padding:0px; background-color:#e3e8ec;">
                                            <ul class="chatUl" id="ulChatMin"></ul>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <input name="hidCompanyID" type="hidden" id="hidCompanyID" value="CP00042239" />
    <input name="hidCompanyName" type="hidden" id="hidCompanyName" value="深圳环游天下" />
    <input name="hidUserID" type="hidden" id="hidUserID" value="CP00043913" />
    <input name="hidUserName" type="hidden" id="hidUserName" value="高元" />
    <input name="hidUserAccount" type="hidden" id="hidUserAccount" value="Gary" />
    <input name="hidParentCompanyID" type="hidden" id="hidParentCompanyID" value="CP00000000" />
    <input name="hidCD" type="hidden" id="hidCD" value=",gj,gn" />
    <input type="text" id="txtFocus" onblur="FMHide()" style=" position:absolute; top:0px; left:-10px; width:1px; height:1px;"/>
    <div class="top_msg">
        <span style="display: none;" id="spnLoadMsg"></span>
    </div>
    </form>
</body>
</html>

EOD;
    return $html;
}
?>
