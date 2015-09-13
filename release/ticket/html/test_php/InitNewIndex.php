<?php
$g_html = <<<EOD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset ="UTF-8">
<title>
    系统首页-gogofly
</title><link href="Skins/Base.css" rel="stylesheet" type="text/css" /><link id="linkSkin" href="Skins/Style7/Skin.css" rel="stylesheet" type="text/css" />
    <script language="javascript" type="text/javascript" src="JavaScript/Calendar.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Prototype.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Base.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Valid.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/Form.js"></script>
    <script type="text/javascript" language="javascript" src="FlightQueryGJ/Scripts/FloatDiv.js"></script>
    <script type="text/javascript" language="javascript" src="FlightQueryGJ/Scripts/Drops.js"></script>
    <script type="text/javascript" language="javascript" src="FlightQueryGJ/Scripts/IATA.js"></script>
    <script language="javascript" type="text/javascript" src="JavaScript/NewIndex.js?Date=20130305"></script>
    <style type="text/css">
        html{-webkit-text-size-adjust: none;}
        .pd { padding-top: 9px; text-align:right; }
        .index_bg{background:url(Images/index_bg.png) no-repeat; height:72px; position:fixed; bottom:0px; width:100%}
        .index_bg i{display:inline-block; padding:16px 20px 0px 110px; font-family:华文行楷; font-size:24px; color:#28221a;}
        .bg0{background-position:0px 0px;}
        .bg1{background-position:0px -72px;}
        .bg2{background-position:0px -144px;}
    p.MsoListParagraph
    {margin-bottom:.0001pt;
    text-align:justify;
    text-justify:inter-ideograph;
    text-indent:21.0pt;
    font-size:10.5pt;
    font-family:"Calibri","sans-serif";
            margin-left: 0cm;
            margin-right: 0cm;
            margin-top: 0cm;
        }
    </style>
</head>
<body>
    <form name="form1" method="post" action="newindex.aspx" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWsAMC/q2g6QICruLagQ0C/Jzi3AQCgPyNtAECuL2fwA0CuaC11AsCoMKT8Q0Cz4a6sQ8CgpOv7QwCuv/B9wMC7qCEpAoCqa+x8QgCp8CPgQQCpMDzgQQCpMDngQQCpcCrgQQCpcCHgQQCpcCDgQQCpcDXgQQCpcDjgQQCosCjgQQCosDzgQQCosCLgQQCosDrgQQCosC7gAQCo8CXgQQCo8CngQQCo8DngQQCo8DjgQQCo8C3gAQCoMCvgQQCoMCjgQQCoMD7gQQCscC/gQQCscDzgQQCscCLgQQCscCHgQQCscDvgQQCvsCXgQQCvsCvgQQCvsCngQQCvsCLgQQCvsCHgQQCvsCDgQQCvsDbgQQCvsDngQQCvsD/gQQC9sCXgQQC9sCTgQQC9sCvgQQC9sCngQQC9sCjgQQC9sD7gQQC9sD3gQQC9sDzgQQC9sCHgQQC9sCDgQQC9sCfgQQC9sDXgQQC9sDTgQQC9sDvgQQC9sDrgQQC9sDngQQC9sDjgQQC9sC3gAQC9sCzgAQC98DTnAQC98DrnAQC98DjnAQC98D/nAQC98CXgQQC98CrgQQC98CngQQC98D3gQQC98CPgQQC98CLgQQC98CfgQQC98DbgQQC98DTgQQC98DngQQC98D/gQQC98C7gAQC9MDTnAQC9MDrnAQC9MC7nwQC9MCXgQQC9MCjgQQC9MC/gQQC9MD3gQQC9MDzgQQC9MCHgQQC9MCDgQQC9MDbgQQC9MDngQQC9MD/gQQC9MC7gAQC9MC3gAQC9MCzgAQC9cDvnAQC9cDrnAQC9cCTgQQC9cCvgQQC9cCngQQC9cD3gQQC9cCLgQQC9cCHgQQC9cDTgQQC9cDvgQQC9cDrgQQC9cCzgAQC8sDrnAQC8sC3nwQC8sCTgQQC8sCrgQQC8sCjgQQC8sC/gQQC8sD7gQQC8sD3gQQC8sCPgQQC8sCLgQQC8sDXgQQC8sDrgQQC8sDngQQC8sC3gAQC8sCzgAQC88D/nAQC88C3nwQC88CXgQQC88CTgQQC88CngQQC88CjgQQC88C/gQQC88D3gQQC88DzgQQC88CHgQQC88DXgQQC88DTgQQC88DjgQQC8MDvnAQC8MDnnAQC8MC7nwQC8MCXgQQC8MCrgQQC8MCngQQC8MCjgQQC8MD7gQQC8MDzgQQC8MCLgQQC8MCDgQQC8MDXgQQC8MDvgQQC8MDngQQC8MDjgQQC8MC3gAQCwcDrnAQCwcCXgQQCwcCrgQQCwcCjgQQCwcDzgQQCwcCHgQQCwcCfgQQCwcDbgQQCwcDngQQCwcDjgQQCwcC7gAQCwcC3gAQCwcCzgAQCzsCTgQQCzsCvgQQCzsCngQQCzsCjgQQCzsC/gQQCzsD7gQQCzsD3gQQCzsDzgQQCzsCLgQQCzsDTgQQCzsDrgQQCzsD/gQQCz8DTnAQCz8D/nAQCz8CTgQQCz8CrgQQCz8CngQQCz8D7gQQCz8DzgQQCz8CPgQQCz8CLgQQCz8CHgQQCz8DbgQQCz8DXgQQCz8DTgQQCz8DvgQQCz8DngQQCz8DjgQQCz8D/gQQCz8C3gAQCzMDjnAQCzMCXgQQCzMCTgQQCzMCvgQQCzMCrgQQCzMCngQQCzMCjgQQCzMCPgQQCzMCLgQQCzMCHgQQCzMCDgQQCzMDbgQQCzMDXgQQCzMDTgQQCzMDngQQCzMD/gQQCzMC7gAQCzMC3gAQCzcCXgQQCzcCvgQQCzcCrgQQCzcC/gQQCzcD7gQQCzcD3gQQCzcDzgQQCzcCHgQQCzcCfgQQCzcDbgQQCzcDTgQQCzcDrgQQCzcC7gAQCzcC3gAQCysC3nwQCysCXgQQCysCrgQQCysCngQQCysCjgQQCysD7gQQCysD3gQQCysDzgQQCysCPgQQCysCLgQQCysCHgQQCysCDgQQCysCfgQQCysDbgQQCysDXgQQCysDTgQQCysDvgQQCysDngQQCysD/gQQCysC7gAQCysCzgAQCy8CXgQQCy8CrgQQCy8CjgQQCy8D7gQQCy8D3gQQCy8CPgQQCy8DvgQQCy8DrgQQCy8DngQQCy8DjgQQCy8C7gAQCy8CzgAQCyMC7nwQCyMCXgQQCyMCrgQQCyMCngQQCyMD7gQQCyMCPgQQCyMCHgQQCyMCDgQQCyMCfgQQCyMDXgQQCyMDvgQQCyMDngQQCyMCzgAQC2cCTgQQC2cCvgQQC2cCrgQQC2cC/gQQC2cD7gQQC2cDzgQQC2cCPgQQC2cCLgQQC2cCDgQQC2cDTgQQC2cDvgQQC2cDrgQQC2cDngQQC2cD/gQQC2cC7gAQC2cC3gAQCxsCXgQQCxsCjgQQCxsCPgQQCxsCLgQQCxsCHgQQCxsDbgQQCxsDXgQQCxsDTgQQCxsDvgQQCxsDngQQCxsDjgQQCxsD/gQQCxsC7gAQCxsC3gAQCx8CXgQQCx8CTgQQCx8CvgQQCx8CrgQQCx8C/gQQCx8D3gQQCx8DzgQQCx8CPgQQCx8CfgQQCx8DXgQQCx8DvgQQCx8DjgQQCx8C3gAQCxMDvnAQCxMDrnAQCxMD/nAQCxMCXgQQCxMCTgQQCxMCvgQQCxMCrgQQCxMCngQQCxMCjgQQCxMDzgQQCxMCPgQQCxMCLgQQCxMCDgQQCxMDbgQQCxMDXgQQCxMDTgQQCxMDvgQQCxMDngQQCxMDjgQQCxMD/gQQCxMC3gAQCxMCzgAQCxcDrnAQCxcC7nwQCxcCXgQQCxcCvgQQCxcCngQQCxcC/gQQCxcCPgQQCxcCHgQQCxcCDgQQCxcDbgQQCxcDXgQQCxcDTgQQCxcDvgQQCxcDngQQCxcDjgQQCxcD/gQQCxcC3gAQCxcCzgAQCwsDjnAQCwsCXgQQCwsCTgQQCwsCvgQQCwsCrgQQCwsC/gQQCwsCPgQQCwsCLgQQCwsCHgQQCwsCDgQQCwsCfgQQCwsDbgQQCwsDXgQQCwsDvgQQCwsDrgQQCwsDngQQCwsC7gAQCwsC3gAQCw8DvnAQCw8CXgQQCw8CrgQQCw8CngQQCw8D3gQQCw8CPgQQCw8CHgQQCw8CDgQQCw8CfgQQCw8DbgQQCw8DvgQQCw8DrgQQCw8DngQQCw8DjgQQCw8C7gAQCwMDvnAQCwMDnnAQCwMCTgQQCwMCngQQCwMCjgQQCwMD7gQQCwMD3gQQCwMDzgQQCwMCLgQQCwMCHgQQCwMCDgQQCwMDTgQQCwMDvgQQCwMDrgQQCwMC7gAQCwMC3gAQC0cCjgQQC0cDzgQQC0cCPgQQC0cCLgQQC0cCfgQQC0cDXgQQC0cD/gQQC3sCHgQQC3sCDgQQC3sDbgQQC3sDTgQQC3sDngQQC3sC7gAQC3sCzgAQC38CTgQQC38CvgQQC38D7gQQC38CPgQQC38CLgQQC38CHgQQC38DXgQQC38DTgQQC38DjgQQC38C3gAQCj6TSjwIODafNh6Ep6bTw/lQgiVWkUBGQZA==" />
</div>
    <div style="padding-top:20px;">
    <table cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
            <td id="tdCPP" width="370" valign="top" style="padding-left:30px;display:none;">
                <div style="background:url(Images/paper.jpg) no-repeat 5px 0px; width:350px; height:490px; margin-right:20px;">
                <div style="padding-top:36px;">
                <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <th valign="top" height="44">
                                    &nbsp;
                                </th>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <div class="divIS" style="height:330px;">
                                        <table style="width: 200px;" border="0" cellspacing="0" align="center">
                                            <tr>
                                                <td width="85" class="pd f14">
                                                    冲刺目标：
                                                </td>
                                                <td>
                                                    <span id="lblMonthTopCount" class="f26 fBold fBlue" style="font-family:High Tower Text; line-height:20px;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="85" class="pd f14">
                                                    保底目标：
                                                </td>
                                                <td>
                                                    <span id="lblMonthCount" class="f26 fBold fPurple" style="font-family:High Tower Text; line-height:20px;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd f14">
                                                    完成票量：
                                                </td>
                                                <td>
                                                    <span id="lblComplete" style="font-family:High Tower Text; line-height:20px;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd f14">
                                                    完成比例：
                                                </td>
                                                <td>
                                                    <span id="lblProportion" style="font-family:High Tower Text; line-height:20px;"></span> %
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd f14">
                                                    时间比例：
                                                </td>
                                                <td>
                                                <span id="lblLostTime" class="f26 fBold fGreen" style="font-family:High Tower Text; line-height:20px;"></span> %
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd f14">
                                                    票量PM2.5：
                                                </td>
                                                <td>
                                                <span id="lblPM" style="font-family:微软雅黑; line-height:20px;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd fBold f14">
                                                    当日已出：
                                                </td>
                                                <td>
                                                <span id="lblTodayCount" class="fBold fBlue" style="font-family:High Tower Text; font-size:34px; line-height:20px;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="pd fGray f12">
                                                    当日待出：
                                                </td>
                                                <td style="padding-top: 9px;">
                                                <span id="lblWaitingEtdzCount" class="fGray"></span> <span class="fGray spblock" style="width:50px;"></span> 
                                                <a href="/NewIndex.aspx" class="fGray unline hand">刷新</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th valign="top" class="f14">
                                    您的绩效收入：<a id="linkMoney" class="f26 fBold fYH unline" style="font-family:High Tower Text; line-height:14px;"></a> 元
                                    <input name="hidLowCount" type="hidden" id="hidLowCount" value="3000" />
                                </th>
                            </tr>
                        </table>
                 </div>
                </div>
            </td>

            <td id="tdBooking" valign="top" width="700">
            <div id="divWarn" class="divWar">
                <b style="color: green">温馨提示：</b>请将黑屏中提取的编码信息完整拷贝到下方窗口，<b class="fRed">无需拷贝QTE信息</b>，为您节省流量。<br/>
                <b style="color: #FF0000">注意事项：</b>请勿在订票系统无任何可销售的低舱位或者航班超售的情况下，通过违规手段获取航空公司的低舱位，<br/><b>　　　　　</b>如因此产生的所有损失和赔偿，由采购方自行承担。平台方不承担任何责任。
            </div>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="215">
                        <table style="width: 100%; height: 325px;" border="0" cellspacing="0" cellpadding="0"
                            class="tableul1">
                            <tr>
                                <th valign="top"  class="th0">
                                    <span><b>国际航班查询(试运行)</b></span>
                                </th>
                            </tr>
                            <tr>
                                <td id="td2" class="tddiv" valign="top">
                                    <div class="divIS">
                                        <table style="width: 100%;" border="0" cellspacing="0">
                                            <tr>
                                                <td width="60">
                                                    航程类型：
                                                </td>
                                                <td>
                                                    <b id="bGJDouble" class="slt" mode="2" type="radio" group="rgjvoyage" onclick="CheckRadio(this);">
                                                往返</b> <b mode="1" type="radio" group="rgjvoyage" onclick="CheckRadio(this);">单程</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    出发城市：
                                                </td>
                                                <td>
                                                    <input name="txtGJDeparture" type="text" value="中文/英文" id="txtGJDeparture" class="txt" onfocus="IntTxtFocus(this, event);" msg="中文/英文" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    到达城市：
                                                </td>
                                                <td>
                                                    <input name="txtGJArrival" type="text" value="中文/英文" id="txtGJArrival" class="txt" onfocus="IntTxtFocus(this, event);" msg="中文/英文" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    出发时间：
                                                </td>
                                                <td>
                                                    <input name="txtGJDepTime" type="text" value="2015-07-29" readonly="readonly" id="txtGJDepTime" class="txt" onfocus="CalFocus(this, event);" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span id="spnGJArrTime">返程时间：</span>
                                                </td>
                                                <td>
                                                    <input name="txtGJArrTime" type="text" value="2015-08-05" readonly="readonly" id="txtGJArrTime" class="txt" onfocus="CalFocus(this, event);" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr style="display:none;">
                                                <td>
                                                    舱位等级：
                                                </td>
                                                <td>
                                                    <b id="bEconomy" class="slt" mode="1" type="radio" group="rberth" onclick="CheckRadio(this);">
                                                经济</b> <b id="bBusiness" mode="3" type="radio" group="rberth" onclick="CheckRadio(this);">
                                                    商务</b> <b id="bFirst" mode="4" type="radio" group="rberth" onclick="CheckRadio(this);">
                                                        头等</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="60">
                                                    乘机人数：
                                                </td>
                                                <td>
                                                    成人 <font onclick="ShowCount(this)" class="fontst"><span id="spnCount">1</span>人</font>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" align="right">
                                                    <input type="button" class="btn" id="Button8" onclick="SubmitGJForm()" value="查询航班" />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding-left: 10px">
                        <table style="width: 100%; height: 325px;" border="0" cellspacing="0" cellpadding="0"
                            class="tableul1">
                            <tr>
                                <th valign="top">
                                    <ul id="ulPnr">
                                        <li class="li0"><span>国际编码导入</span></li>
                                        
                                        <li><span>国际价单查询</span></li>
                                    </ul>
                                </th>
                            </tr>
                            <tr>
                                <td id="tdPnr" class="tddiv" valign="top">
                                    <div>
                                        国际成人PNR：<input type="text" class="txt" id="txtGJPNR" style="width: 110px;" />
                                        <input name="Button5" type="button" id="Button5" class="btn" onclick="GetGJPNRInfo()" value="导入编码" />
                                            <span class="fRed fBold">请授权给 <span id="lblOfficeGJ">CKG162</span>.</span>
                                        <div class="divBTs" >
                                            <table style="width: 100%; table-layout:fixed;" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td style="height: 0px; font-size:0px; padding:0px;">&nbsp;</td>
                                                    <td style="font-size:0px; width:90px; padding:0px; table-layout:fixed;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">如果您想导入儿童或其他复杂的编码，<a href="OrderManage/GjPnrDataInput.aspx?disptype=pnrdata&role=xss">请点击这里</a></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <div id="divPNRData" style="width: 435px; padding: 4px; color: #00FF00; height: 150px;
                                                            background-color: black; font-size:7pt; overflow:hidden;" onclick="this.style.display='none';$('txtPNRData').style.display='';$('txtPNRData').focus()">
                                                            <span style="color: Red;">(以下内容为RT结果样例)</span><br />
                                                            >RTHHHHHH<br />
                                                            &nbsp;&nbsp;1.XU/BEI MS HHHHHH
                                                            <br />
                                                            &nbsp;&nbsp;2. MU511 V FR15MAR SHAGMP HK1 0820 1100 E T1--
                                                            <br />
                                                            &nbsp;&nbsp;3.PEK/T PEK/T010-88888888/IN OF A TRADING COMPANY AAAAAA/ZZZZZ
                                                            <br />
                                                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; OOOOO ABCDEFG
                                                            <br />
                                                            &nbsp;&nbsp;4.010-88888888
                                                            <br />
                                                            &nbsp;&nbsp;5.TL/0620/15MAR/PEK888
                                                            <br />
                                                            &nbsp;&nbsp;6.SSR ADTK 1E BY CAN09FEB13/1307 OR CXL MU 511 V15MAR
                                                            <br />
                                                            &nbsp;&nbsp;7.SSR DOCS
                                                            <br />
                                                            &nbsp;&nbsp;8.RMK CA/MMMMMM<br />
                                                            &nbsp;&nbsp;9.RMK TJ AUTH PEK888
                                                            <br />
                                                            10.PEK888
                                                            <br />
                                                        </div>
                                                        <textarea name="txtPNRData" id="txtPNRData" style="width: 433px; padding: 4px; color: #00FF00;
                                                            height: 148px; font-size: 12px; border: 1px solid #888; background-color: black;
                                                            display: none; text-transform: uppercase"></textarea>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height: 20px; padding:0;">
                                                        请将黑屏中的编码信息（即<span style="color: Red;"><b>RT结果</b></span>）拷贝到上方,<span
                                                            style="color: Red;"><b>无需QTE</b></span>！
                                                    </td>
                                                    <td align="right" valign="bottom">
                                                        <input name="Button6" type="button" id="Button6" class="btnpnr" onclick="GetGJPNRDataInfo()" value="提交编码" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                              
                                    <div class="divIS" style="display: none;">
                                        <table style="width: 320px;" border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tr>
                                                <td width="60">
                                                    航程类型：
                                                </td>
                                                <td>
                                                    <b id="bJDNone" class="slt" mode="" type="radio" group="rjdvoyage" onclick="CheckRadio(this);">不限</b> 
                                                    <b mode="RT" type="radio" group="rjdvoyage" onclick="CheckRadio(this);">往返</b> 
                                                    <b mode="OW" type="radio" group="rjdvoyage" onclick="CheckRadio(this);">单程</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    出发机场：
                                                </td>
                                                <td>
                                                    <input name="txtJDDeparture" type="text" value="中文/英文" id="txtJDDeparture" class="txt" onfocus="IntTxtFocus(this, event);" msg="中文/英文" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    到达机场：
                                                </td>
                                                <td>
                                                    <input name="txtJDArrival" type="text" value="中文/英文" id="txtJDArrival" class="txt" onfocus="IntTxtFocus(this, event);" msg="中文/英文" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    出发时间：
                                                </td>
                                                <td>
                                                    <input name="txtJDBegin" type="text" value="2015-07-29" readonly="readonly" id="txtJDBegin" class="txt" onfocus="CalFocus(this, event);" style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span id="Span1">返程时间：</span>
                                                </td>
                                                <td>
                                                    <input type="text" class="txt" id="txtJDEnd" readonly="readonly" onfocus="CalFocus(this,event)"
                                                style="width: 110px;" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="60">
                                                    航空公司：
                                                </td>
                                                <td>
                                                    <input type="text" class="txt" id="txtCarrier" maxlength="2" style="width: 20px; height:14px; text-transform: uppercase;" onkeyup="ForCarrier(this)" /><select name="dropCarrierCode" id="dropCarrierCode" onchange="ChangeCarrier(this,false)">
    <option value="">请选择...</option>
    <option value="2K">2K AEROLINEAS GALAPAGOS S.A.</option>
    <option value="3J">3J 阿莱恩斯航空公司</option>
    <option value="3U">3U 四川航空</option>
    <option value="4D">4D 西奈航空公司</option>
    <option value="4M">4M 阿根廷国家航空公司</option>
    <option value="4N">4N 北部航空公</option>
    <option value="4Q">4Q 萨菲航空公司</option>
    <option value="4V">4V 船夫航空公司</option>
    <option value="5F">5F 北极圈航空服务公司</option>
    <option value="5J">5J 宿雾太平洋航空公司</option>
    <option value="5L">5L 玻利维亚航空公司</option>
    <option value="5T">5T 欧洲航空公司</option>
    <option value="5X">5X 联合包裹公司</option>
    <option value="6A">6A 阿维亚克萨航空公司</option>
    <option value="6E">6E 马尔莫航空公司</option>
    <option value="6U">6U 乌克兰航空公司</option>
    <option value="6V">6V 维加斯航空公司</option>
    <option value="6Y">6Y 尼加拉瓜航空公司</option>
    <option value="7C">7C 济州航空公司</option>
    <option value="7F">7F 冠军航空公司</option>
    <option value="7H">7H 纪元航空公司</option>
    <option value="8G">8G 万能捷运公司</option>
    <option value="8J">8J 塔尔喷气航空公司</option>
    <option value="8L">8L 祥鹏航空</option>
    <option value="8M">8M 缅甸国际航空</option>
    <option value="8S">8S 塞尔航空公司</option>
    <option value="9A">9A 大西洋航空公司</option>
    <option value="9C">9C 春秋航空</option>
    <option value="9E">9E 捷运航空公司</option>
    <option value="9L">9L 科尔根航空公司</option>
    <option value="9M">9M CENTRAL MOUNTAIN AIR</option>
    <option value="9N">9N 跨州航空公司</option>
    <option value="9P">9P 帕兰吉航空公司</option>
    <option value="9U">9U 摩尔多瓦航空公司</option>
    <option value="9W">9W 捷威航空公司</option>
    <option value="AA">AA 美国航空</option>
    <option value="AB">AB 柏林航空</option>
    <option value="AC">AC 加拿大航空公司</option>
    <option value="AE">AE 华信航空</option>
    <option value="AF">AF 法国航空公司</option>
    <option value="AH">AH 阿尔及利亚航空公司</option>
    <option value="AI">AI 印度航空公司</option>
    <option value="AJ">AJ 比利时空运公司</option>
    <option value="AM">AM 墨西哥航空公司</option>
    <option value="AN">AN 澳大利亚安塞特航空公司</option>
    <option value="AO">AO 西班牙商业航空公司</option>
    <option value="AQ">AQ 阿洛哈航空公司</option>
    <option value="AR">AR 阿根廷航空公司</option>
    <option value="AS">AS 阿拉斯加航空公司</option>
    <option value="AT">AT 摩洛哥王家航空公司</option>
    <option value="AU">AU 奥斯特拉尔航空公司</option>
    <option value="AV">AV 哥伦比亚国家航空公司</option>
    <option value="AY">AY 芬兰航空公司</option>
    <option value="AZ">AZ 意大利航空公司</option>
    <option value="B2">B2 白令航空公司</option>
    <option value="B4">B4 博雅航空公司</option>
    <option value="B6">B6 捷蓝航空公司</option>
    <option value="B7">B7 立荣航空</option>
    <option value="BA">BA 英国航空公司</option>
    <option value="BD">BD 英国中部航空公司</option>
    <option value="BE">BE Flybe</option>
    <option value="BI">BI 文莱王家航空公司</option>
    <option value="BK">BK 奥凯航空</option>
    <option value="BL">BL 太平洋航空公司</option>
    <option value="BO">BO 印度尼西亚布拉克航空公司</option>
    <option value="BP">BP 博茨瓦纳航空公司</option>
    <option value="BR">BR 长荣航空公司</option>
    <option value="BU">BU 布拉森斯南美和远东空运公司</option>
    <option value="BW">BW 多巴哥航空公司</option>
    <option value="BX">BX 釜山航空公司</option>
    <option value="C2">C2 加勒比航空公司</option>
    <option value="C4">C4 卡里亚库航空公司</option>
    <option value="C8">C8 芝加哥快运航空公司</option>
    <option value="CA">CA 中国国航</option>
    <option value="CF">CF 福塞特航空公司</option>
    <option value="CG">CG 米尔恩湾航空公司</option>
    <option value="CI">CI 中华航空公司</option>
    <option value="CJ">CJ 中国北方航空公司</option>
    <option value="CM">CM 巴拿马空运公司</option>
    <option value="CN">CN 大新华航空</option>
    <option value="CP">CP 加拿大国际航空公司</option>
    <option value="CU">CU 古巴统一航空公司</option>
    <option value="CW">CW 马绍尔群岛航空公司</option>
    <option value="CX">CX 国泰航空公司</option>
    <option value="CY">CY 塞浦路斯航空公司</option>
    <option value="CZ">CZ 南方航空</option>
    <option value="D3">D3 达洛航空公司</option>
    <option value="D4">D4 艾利斯德尔瑟航空公司</option>
    <option value="DB">DB 不列特国际航空公司</option>
    <option value="DC">DC 金色航空公司</option>
    <option value="DE">DE 康多尔航空公司</option>
    <option value="DI">DI 德英航空公司</option>
    <option value="DL">DL 达美航空</option>
    <option value="DM">DM 梅尔斯克航空公司</option>
    <option value="DR">DR 瑞丽航空</option>
    <option value="DS">DS 塞内加尔航空公司</option>
    <option value="DT">DT 哥拉航空公司</option>
    <option value="DZ">DZ 东海航空</option>
    <option value="E4">E4 亚洲航空公司</option>
    <option value="E9">E9 恩索尔航空公司</option>
    <option value="EB">EB 埃默里世界航空公司</option>
    <option value="ED">ED 夏洛特航空公司</option>
    <option value="EF">EF 远东航空运输公司</option>
    <option value="EG">EG 日本亚洲航空公司</option>
    <option value="EH">EH 厄瓜多尔航空公司</option>
    <option value="EI">EI 爱尔兰航空公司</option>
    <option value="EK">EK 阿联酋航空</option>
    <option value="EL">EL 日本短途航空公司</option>
    <option value="EQ">EQ 厄瓜多尔军运航航空公司</option>
    <option value="ET">ET 埃塞俄比亚航空公司</option>
    <option value="EU">EU 成都航空</option>
    <option value="EY">EY 伊蒂哈德航空</option>
    <option value="EZ">EZ 常青国际航空公司</option>
    <option value="F7">F7 巴布航空公司</option>
    <option value="F9">F9 边疆航空公司</option>
    <option value="FA">FA 芬兰空运公司</option>
    <option value="FB">FB 法恩航空公司</option>
    <option value="FE">FE 远东航空</option>
    <option value="FF">FF 宝塔航空公司</option>
    <option value="FG">FG 阿里亚纳阿富汗航空公司</option>
    <option value="FI">FI 冰岛航空公司</option>
    <option value="FJ">FJ 太平洋航空公司</option>
    <option value="FM">FM 上海航空</option>
    <option value="FQ">FQ 阿鲁巴航空公司</option>
    <option value="FR">FR 瑞安航空公司</option>
    <option value="FV">FV 普利科沃航空</option>
    <option value="G3">G3 戈尔航空公司</option>
    <option value="G5">G5 华夏航空</option>
    <option value="G8">G8 长城公司</option>
    <option value="GA">GA 印度尼西亚航空公司</option>
    <option value="GD">GD 塔埃萨航空公司</option>
    <option value="GE">GE 复兴航空</option>
    <option value="GF">GF 海湾航空公司</option>
    <option value="GH">GH 加纳航空公司</option>
    <option value="GJ">GJ 长龙航空</option>
    <option value="GL">GL 格陵兰航空公司</option>
    <option value="GN">GN 加蓬航空公司</option>
    <option value="GQ">GQ 高天航空公司</option>
    <option value="GS">GS 天津航空</option>
    <option value="GU">GU 危地马拉航空公司</option>
    <option value="GV">GV 里加航空公司</option>
    <option value="GY">GY 圭亚那航空公司</option>
    <option value="H4">H4 中国海南航空公司</option>
    <option value="HA">HA 夏威夷航空公司</option>
    <option value="HD">HD 纽约直长机公司</option>
    <option value="HF">HF 哈帕克劳埃德航空公司</option>
    <option value="HJ">HJ 霍尔姆斯特鲁姆航空公司</option>
    <option value="HM">HM 塞舌尔航空公司</option>
    <option value="HO">HO 吉祥航空</option>
    <option value="HP">HP 亚美利加西方航空公司</option>
    <option value="HU">HU 海南航空</option>
    <option value="HV">HV 泛航航空公司</option>
    <option value="HX">HX 香港航空</option>
    <option value="HY">HY 乌兹别克斯坦航空公司</option>
    <option value="HZ">HZ 萨哈林航空</option>
    <option value="IB">IB 西班牙航空公司</option>
    <option value="IC">IC 印度航空公司</option>
    <option value="IE">IE 所罗门航空公司</option>
    <option value="IF">IF 大华航空公司</option>
    <option value="IG">IG 默里迪恩纳航空公司</option>
    <option value="IH">IH 猎鹰航空公司</option>
    <option value="II">II 商业航空公司</option>
    <option value="IJ">IJ 欧洲跨地区航空公司</option>
    <option value="IL">IL 伊斯坦布尔航空公司</option>
    <option value="IR">IR 伊朗航空公司</option>
    <option value="IT">IT 法国国内航空公司</option>
    <option value="IW">IW 乌特雷默法国航空公司</option>
    <option value="J2">J2 阿塞拜疆航空公司</option>
    <option value="J7">J7 瓦卢喷气机航空公司</option>
    <option value="JB">JB 喷气直升机航空公司</option>
    <option value="JD">JD 首都航空</option>
    <option value="JE">JE 曼克斯航空公司</option>
    <option value="JH">JH 诺德斯特航空公司</option>
    <option value="JJ">JJ TAM航空</option>
    <option value="JK">JK 斯潘航空公司</option>
    <option value="JL">JL 日本航空公司</option>
    <option value="JM">JM 牙买加航空公司</option>
    <option value="JP">JP 亚得利亚航空公司</option>
    <option value="JQ">JQ 捷星航空公司</option>
    <option value="JR">JR 幸福航空</option>
    <option value="JS">JS 朝鲜民航</option>
    <option value="JU">JU 南斯拉夫航空公司</option>
    <option value="JV">JV 熊皮航空公司</option>
    <option value="JW">JW 箭航空公司</option>
    <option value="JY">JY 泽西欧洲航空公司</option>
    <option value="K6">K6 柬埔寨吴哥航空公司</option>
    <option value="KA">KA 港龙航空公司</option>
    <option value="KB">KB 德鲁克航空公司</option>
    <option value="KC">KC 加里宁格勒航空</option>
    <option value="KD">KD 肯德尔航空公司</option>
    <option value="KE">KE 大韩航空公司</option>
    <option value="KF">KF 博特尼亚航空公司</option>
    <option value="KK">KK 地区航空运输公司</option>
    <option value="KL">KL 荷兰王家航空公司</option>
    <option value="KM">KM 马耳他航空公司</option>
    <option value="KN">KN 联合航空</option>
    <option value="KP">KP 基维国际航空公司</option>
    <option value="KQ">KQ 肯尼亚航空公司</option>
    <option value="KR">KR 卡尔航空公司</option>
    <option value="KU">KU 科威特航空公司</option>
    <option value="KW">KW 狂欢节航空公司</option>
    <option value="KX">KX 开曼航空公司</option>
    <option value="KY">KY 昆明航空</option>
    <option value="LA">LA 智利国家航空公司</option>
    <option value="LC">LC 加勒比航空公司</option>
    <option value="LD">LD 香港航空公司货运公司</option>
    <option value="LG">LG 卢森堡航空公司</option>
    <option value="LH">LH 德国汉莎航空公司</option>
    <option value="LI">LI 背风群岛航空公司</option>
    <option value="LJ">LJ 塞拉国家航空公司</option>
    <option value="LM">LM 安的列斯航空公司</option>
    <option value="LO">LO 波兰航空公</option>
    <option value="LP">LP 秘鲁国家航空</option>
    <option value="LR">LR 哥斯达黎加航空公司</option>
    <option value="LT">LT 特内曼国际航空公司</option>
    <option value="LX">LX 瑞士航空公司</option>
    <option value="LY">LY 以色列航空公司</option>
    <option value="M9">M9 莫迪汉航空公司</option>
    <option value="MA">MA 匈牙利航空公司</option>
    <option value="MD">MD 马达加斯加航空公司</option>
    <option value="ME">ME 中东航空公司</option>
    <option value="MF">MF 厦门航空</option>
    <option value="MH">MH 马来西亚航空公司</option>
    <option value="MI">MI 胜安航空公司</option>
    <option value="MJ">MJ 阿根廷航空公司</option>
    <option value="MK">MK 毛里求斯航空公司</option>
    <option value="ML">ML 哥斯达黎加航空公司</option>
    <option value="MM">MM 麦德林航空公司</option>
    <option value="MN">MN 商用航空公司</option>
    <option value="MO">MO 静空国际航空公司</option>
    <option value="MP">MP 荷兰马丁航空公司</option>
    <option value="MQ">MQ 西蒙斯航空公司</option>
    <option value="MR">MR 毛里塔尼亚航空公司</option>
    <option value="MS">MS 埃及航空公司</option>
    <option value="MU">MU 东方航空</option>
    <option value="MW">MW 马亚航空公司</option>
    <option value="MX">MX 墨西哥航空公司</option>
    <option value="MZ">MZ 梅帕蒂航空公司</option>
    <option value="NA">NA 公务航空公司</option>
    <option value="ND">ND 链环航空公司</option>
    <option value="NF">NF 维加斯航空公司</option>
    <option value="NH">NH 全日空航空</option>
    <option value="NI">NI 葡萄牙航空公司</option>
    <option value="NK">NK 斯皮里特航空公司</option>
    <option value="NS">NS 河北航空</option>
    <option value="NT">NT 加那利航空公司</option>
    <option value="NU">NU 日本跨洋航空公司</option>
    <option value="NV">NV 西北地区航空公司</option>
    <option value="NX">NX 澳门航空</option>
    <option value="NZ">NZ 新西兰航空公司</option>
    <option value="O8">O8 暹罗航空公司</option>
    <option value="OA">OA 奥林匹克航空公司</option>
    <option value="OD">OD 苏利亚纳航空公司</option>
    <option value="OE">OE 西方短程航空公司</option>
    <option value="OH">OH 库姆航空公司</option>
    <option value="OK">OK 捷克斯洛伐克航空公司</option>
    <option value="OM">OM 蒙古航空公司</option>
    <option value="ON">ON 瑙鲁航空公司</option>
    <option value="OO">OO 天西航空公司</option>
    <option value="OQ">OQ 重庆航空</option>
    <option value="OS">OS 奥地利航空公司</option>
    <option value="OU">OU 克罗地亚航空公司</option>
    <option value="OZ">OZ 韩亚航空公司</option>
    <option value="PB">PB 布隆迪航空公司</option>
    <option value="PC">PC 斐济航空公司</option>
    <option value="PD">PD 波特航空公司</option>
    <option value="PG">PG 曼谷航空公司</option>
    <option value="PH">PH 波利尼西亚航空公司</option>
    <option value="PJ">PJ 圣皮埃尔航空公司</option>
    <option value="PK">PK 巴基斯坦国际航空公司</option>
    <option value="PL">PL 秘鲁航空公司</option>
    <option value="PN">PN 西部航空</option>
    <option value="PR">PR 菲律宾航空公司</option>
    <option value="PS">PS 乌克兰国际航空公司</option>
    <option value="PT">PT 瑞典西方航空公司</option>
    <option value="PU">PU 乌拉圭国家航空公司</option>
    <option value="PW">PW 精密航空公司</option>
    <option value="PX">PX 新几内亚航空公司</option>
    <option value="PY">PY 苏里南航空公司</option>
    <option value="QA">QA 加勒比航空公司</option>
    <option value="QF">QF 快达航空公司</option>
    <option value="QK">QK 诺瓦航空公司</option>
    <option value="QL">QL 莱索托航空公司</option>
    <option value="QM">QM 马拉维航空公司</option>
    <option value="QP">QP 肯尼亚航空公司</option>
    <option value="QQ">QQ 里诺航空公司</option>
    <option value="QR">QR 卡塔尔航空</option>
    <option value="QS">QS 塔特拉航空公司</option>
    <option value="QU">QU 乌干达航空公司</option>
    <option value="QV">QV 老挝航空公司</option>
    <option value="QW">QW 青岛航空</option>
    <option value="QX">QX 地平线航空公司</option>
    <option value="QY">QY 欧洲航空运输公司</option>
    <option value="RA">RA 尼泊乐王家航空公司</option>
    <option value="RB">RB 叙利亚阿拉伯航空公司</option>
    <option value="RC">RC 大西洋航空公司</option>
    <option value="RD">RD 诺瓦航空公司</option>
    <option value="RG">RG 瓦力格航空公</option>
    <option value="RI">RI 曼达拉航空公司</option>
    <option value="RJ">RJ 约旦王家航空公司</option>
    <option value="RK">RK 非洲航空公司</option>
    <option value="RO">RO 罗马尼亚航空公司</option>
    <option value="RQ">RQ 英基阿地纳航空公司</option>
    <option value="RS">RS 洲际航空公司</option>
    <option value="RV">RV 里夫阿留申航空公司</option>
    <option value="RY">RY 卢旺达航空公司</option>
    <option value="S3">S3 圣巴巴拉航空公司</option>
    <option value="S4">S4 亚速尔国际航空公司</option>
    <option value="S7">S7 西伯利亚航空公司</option>
    <option value="SA">SA 南非航空</option>
    <option value="SB">SB 喀里多尼亚国际航空公司</option>
    <option value="SC">SC 山东航空</option>
    <option value="SD">SD 苏丹航空公司</option>
    <option value="SE">SE 达伊罗货运航空公司</option>
    <option value="SF">SF 包机航空公司</option>
    <option value="SJ">SJ 南方航空运输公司</option>
    <option value="SK">SK 北欧航空公司</option>
    <option value="SL">SL 里奥南部地区航空服务公司</option>
    <option value="SN">SN 比利时世界航空公司</option>
    <option value="SP">SP 亚速尔航空公司</option>
    <option value="SQ">SQ 新加坡航空公司</option>
    <option value="SR">SR 士航空公司</option>
    <option value="SS">SS 科西嘉国际航空公司</option>
    <option value="SU">SU 俄罗斯航空公司</option>
    <option value="SV">SV 沙特阿拉伯航空公司</option>
    <option value="SW">SW 纳米比亚航空公司</option>
    <option value="SY">SY 阳光地区航空公司</option>
    <option value="SZ">SZ 中国西南航空公司</option>
    <option value="T4">T4 泰坦航空公司</option>
    <option value="T8">T8 内乌肯航空公司</option>
    <option value="TA">TA 塔卡国际航空公司</option>
    <option value="TC">TC 坦桑尼亚航空公司</option>
    <option value="TE">TE 立陶宛航空公司</option>
    <option value="TG">TG 泰国国际航空</option>
    <option value="TK">TK 土耳其航空公司</option>
    <option value="TM">TM 莫桑比克航空公司</option>
    <option value="TN">TN 大溪地航空公司</option>
    <option value="TP">TP 葡萄牙航空公司</option>
    <option value="TQ">TQ 环瑞典航空公司</option>
    <option value="TR">TR 环巴西航空公司</option>
    <option value="TS">TS 越洋航空公司</option>
    <option value="TU">TU 突尼斯航空公司</option>
    <option value="TV">TV 西藏航空</option>
    <option value="TW">TW 环球航空公司</option>
    <option value="TY">TY 喀里多尼亚航空公司</option>
    <option value="TZ">TZ 环美航空公司</option>
    <option value="U6">U6 乌拉尔航空公司</option>
    <option value="UA">UA 美联航</option>
    <option value="UB">UB 缅甸航空公司</option>
    <option value="UC">UC 拉德科智利航空公司</option>
    <option value="UD">UD 赫克斯航空公司</option>
    <option value="UG">UG 突尼斯空运公司</option>
    <option value="UK">UK 联合王国航空公司</option>
    <option value="UL">UL 兰卡航空公司</option>
    <option value="UM">UM 津巴布韦</option>
    <option value="UN">UN 环空航空</option>
    <option value="UO">UO 香港快运航空公司</option>
    <option value="UP">UP 巴哈马航空公司</option>
    <option value="UQ">UQ 乌鲁木齐航空</option>
    <option value="US">US 合众国航空公司</option>
    <option value="UT">UT 优梯航空公司</option>
    <option value="UU">UU 奥斯特拉尔航空公司</option>
    <option value="UX">UX 欧罗巴航空公司</option>
    <option value="UY">UY 喀麦隆航空公司</option>
    <option value="V3">V3 瓦努阿图航空公司</option>
    <option value="VA">VA 委内瑞拉国际航空公司</option>
    <option value="VD">VD 鲲鹏航空</option>
    <option value="VE">VE 委内瑞拉航空</option>
    <option value="VI">VI 别克斯航空公司</option>
    <option value="VK">VK 通加鲁航空公司</option>
    <option value="VM">VM 法国地区航空公司</option>
    <option value="VN">VN 越南航空公司</option>
    <option value="VO">VO 蒂罗林航空公司</option>
    <option value="VP">VP 圣保罗航空公司</option>
    <option value="VS">VS 维尔京大西洋航空公司</option>
    <option value="VT">VT 塔希提航空公司</option>
    <option value="VU">VU 象牙航空公司</option>
    <option value="VV">VV 乌克兰空中世界航空</option>
    <option value="VX">VX 哥伦比亚中央航空公司</option>
    <option value="W3">W3 阿瑞克航空</option>
    <option value="W5">W5 马汉航空公司</option>
    <option value="WB">WB 国民航空服务公司</option>
    <option value="WE">WE 莱茵山航空公司</option>
    <option value="WF">WF 维德勒航空公司</option>
    <option value="WH">WH 中国西北航空公司</option>
    <option value="WI">WI 贸易风国际航空公司</option>
    <option value="WJ">WJ 拉布拉多航空公司</option>
    <option value="WL">WL 太平洋大西洋航空公司</option>
    <option value="WM">WM 向风群岛国际航空公司</option>
    <option value="WN">WN 西南航空公司</option>
    <option value="WR">WR 汤加皇家航空公司</option>
    <option value="WS">WS 西捷航空</option>
    <option value="WT">WT 尼日利亚航空公司</option>
    <option value="WX">WX 安塞特快运公司</option>
    <option value="WY">WY 阿曼航空公司</option>
    <option value="XF">XF 符拉迪沃斯托克航空</option>
    <option value="XJ">XJ 梅萨巴航空公司</option>
    <option value="XK">XK 地中海科西嘉航空公司</option>
    <option value="XL">XL 厄瓜多尔航空公司</option>
    <option value="XO">XO 中国新疆航空公司</option>
    <option value="XQ">XQ 行动航空公司</option>
    <option value="XW">XW 中国新华航空公司</option>
    <option value="YM">YM 黑山航空公司</option>
    <option value="YN">YN 魁北克航空公司</option>
    <option value="YP">YP 劳埃德航空公司</option>
    <option value="YR">YR 风景航空公司</option>
    <option value="YU">YU 多米尼加空运公司</option>
    <option value="YX">YX 中西部捷运公司</option>
    <option value="YZ">YZ 几内亚比绍运输公司</option>
    <option value="ZB">ZB 群主航空公司</option>
    <option value="ZC">ZC 斯威士兰皇家航空公司</option>
    <option value="ZH">ZH 深圳航空</option>
    <option value="ZK">ZK 格雷特湖航空公司</option>
    <option value="ZL">ZL 黑泽尔顿航空公司</option>
    <option value="ZM">ZM 扎伊尔夏依波空运公司</option>
    <option value="ZQ">ZQ 新西兰安塞特航空公司</option>
    <option value="ZR">ZR 穆克航空公司</option>
    <option value="ZV">ZV 中西部航空公司</option>
    <option value="ZY">ZY 阿达航空公司</option>

</select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="60">&nbsp;
                                                </td>
                                                <td>
                                                    <input type="button" class="btn" id="Button3" onclick="SubmitJDForm()" value="查询价单政策" />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

        <input name="hidCompanyID" type="hidden" id="hidCompanyID" value="CP00042239" />
            </td>

            <td id="tdCPPAdvice" width="500" valign="top" style="padding-top:36px;padding-left:60px;display:none;">
                <div id="divFaqTop">
                </div>
            </td>

        </tr>
        <tr>
            <td id="tdCPPSentence" colspan="2" style="width:870px;font-size:28px;padding:20px 30px 0px 20px;color:#993300;border-top:1px dotted #444;display:none;"><div id="divSentence" style="font-family:华文新魏; line-height:30px;"></div></td>

        </tr>
    </table>
    </div>
    </form>
</body>
</html>

EOD;
?>
