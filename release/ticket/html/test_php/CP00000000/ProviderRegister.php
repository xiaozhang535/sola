
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
<meta charset ="UTF-8">
<title>
	gogofly-供应商注册
</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="description" content="gogofly是中国领先的国际机票分销交易平台,提供优势政策、航线自主选择、在线预订、在线支付、快速出票，实现实时交易并提供专业的售前、售中、售后服务；为各类机票代理人提供国际机票采购、供应等一站式解决方案。" /><meta name="keywords" content="国际机票,gogofly,国际PNR导入,直接显示国际政策,机票B2B,机票代理,机票分销,机票平台,机票预订" /><link href="css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" language="javascript" src="../Prototype.js"></script>
    <script type="text/javascript" language="javascript" src="../FloatDiv.js"></script>
    <script type="text/javascript" language="javascript" src="../Form.js"></script>
    <script type="text/javascript" language="javascript" src="../Valid.js"></script>
    <script type="text/javascript" language="javascript" src="../Area.js"></script>
    <script type="text/javascript" language="javascript" src="js/register.js?Date=20131008"></script>
</head>
<body>
    <form name="form1" method="post" action="ProviderRegister.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

    
<!--顶部开始-->

<!--顶部结束-->
<!--导航栏开始-->
<div style="padding-top:10px;">
        <div style="width:1000px; margin:0 auto;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="topBg">
                <tr>
                    <td width="200">
                        <a href="../index.php" id="linkLogo"><img alt="gogofly-中国领先的国际机票在线采购和分销交易平台" src="Images/logo.gif" border="0" width="185" height="50"/></a>
                    </td>
                    
                    <td>
                        <ul class="ulBan0">
                            <li><a id="top1_linkDefault" class="sa" href="../index.php">首页</a></li>
                            <li><a id="top1_linkAboutUs" href="AboutUs.php">关于我们</a></li>
                            <li><a id="top1_linkNews" href="NewsList.php">新闻中心</a></li>
                            <li><a id="top1_linkProduct" href="Product.php">产品介绍</a></li>
                            <li><a id="top1_linkHelp" href="Help.php?text=gjzc">帮助中心</a></li>
                            
                            <li><a id="top1_linkProvision" href="Provision.php">服务条款</a></li>
                            <li><a id="top1_linkContact" href="Contact.php">联系我们</a></li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </div>
<!--导航栏结束-->
    <div class="divMain" style="margin-top: 30px;">
        <div class="divCon">
            <div class="divBan">
                <div class="header-text reg_gy">
                    <a href="../index.php" title="" class="head">首页</a><a href="ProviderRegister.php#" title="" class="fBold">供应商注册</a></div>
            </div>
            <div class="divText">
                <div style="margin:0 auto; padding:20px; background:#FFF;">
                <table width="100%" border="0" align="center" cellpadding="5" cellspacing="0">
                    <tr>
                        <td height="80" valign="top">
                            <span style="font-size:12px; color:#FF6633;"><b>提示：当您注册成功后，我们的工作人员会主动联系您，确认相关信息后，您方可登录gogofly！<br/>　　　请您务必填写准确的手机号码和联系人姓名。</b><br/>　　　感谢您对gogofly的大力支持，谢谢！</span>
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" align="center" cellpadding="5" cellspacing="0">
                <tr>
                    <td width="80" align="right">
                        <span class="fRed">*</span>登录帐号：
                    </td>
                    <td width="250">
                        <input id="txtAccount" type="text" class="inputReg" maxlength="20" />
                    </td>
                    <td>
                        <input id="btnCheck" type="button" value="检查帐号是否可用" class="inputBtn" />
                        <span class="fRed" id="spnAccount" style="display: none;"></span> 
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <span class="fRed">*</span>密码：
                    </td>
                    <td >
                        <input id="txtPwd" type="password" class="inputReg" maxlength="16" />
                    </td>
                    <td>
                        <span id="spnPwdMess" class="fGray">6-16个字符组成，区分大小写.</span> <span class="fRed" id="spnPwd"
                            style="display: none;"></span>
                        <ul id="ulPwd" style="display: none;">
                            <li id="liL">弱</li>
                            <li id="liM">中</li>
                            <li id="liH">强</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <span class="fRed">*</span>确认密码：
                    </td>
                    <td>
                        <input id="txtPwd2" type="password" class="inputReg" maxlength="16" />
                    </td>
                    <td>
                        <span class="fRed" id="spnPwd2" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>公司名称：</td>
                    <td>
                        <input id="txtLComName" type="text" class="inputReg" value="" maxlength="30" />
                    </td>
                    <td>
                        <span class="fRed" id="spnLComName" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>IATA号：</td>
                    <td>
                        <input id="txtIATA" type="text" class="inputReg" value="" maxlength="20" />
                    </td>
                    <td>
                        <span class="fRed" id="spnIATA" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>OFFICE号：</td>
                    <td>
                        <input id="txtOffice" type="text" class="inputReg" value="" maxlength="6" />
                    </td>
                    <td>
                        <span class="fRed" id="spnOffice" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>QQ：</td>
                    <td>
                        <input id="txtQQ" type="text" class="inputReg" value="" maxlength="20" />
                    </td>
                    <td>
                        <span class="fRed" id="spnQQ" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>Email：</td>
                    <td>
                        <input id="txtEmail" type="text" class="inputReg" value="" maxlength="30" />
                    </td>
                    <td>
                        <span id="spnEmailMess" class="fGray">发送安全数据 (如：找回密码) 时使用.</span>
                        <span class="fRed" id="spnEmail" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>联 系 人：</td>
                    <td>
                        <input id="txtContactor" type="text" class="inputReg" value="" maxlength="10" />
                    </td>
                    <td>
                        <span class="fRed" id="spnContactor" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right"><span class="fRed">*</span>联系人手机：</td>
                    <td>
                        <input id="txtMobile" type="text" class="inputReg" value="" maxlength="20" />
                    </td>
                    <td style="line-height:14px;">
                        <span class="fGray" id="spnMobileMess">该手机号非常重要，如遇紧急订单时，客服将通过此手机号联系，请正确填写!</span>
                        <span class="fRed" id="spnMobile" style="display: none;"></span>
                    </td>
                </tr>
               <tr id="trVal">
	<td align="right"><span class="fRed">*</span>验证码：</td>
	<td>
                        <input id="txtVal" type="text" class="inputReg" value="" maxlength="5" />
                    </td>
	<td style="line-height:14px;">
                        
                        <span class="fRed" id="spnVal" style="display: none;"></span>
                    </td>
</tr>

                <tr id="trValImg">
	<td align="right">&nbsp;</td>
	<td height="60"><table width="100%"><tr><td id="tdVal"></td><td align="center"><a href="javascript:ChangeImg()">看不清楚？ 换张图片</a></td></tr></table></td>
	<td></td>
</tr>

                <tr>
                    <td align="right">&nbsp;</td>
                    <td  id="td1"><span class="f12 fBlue hand" onclick="ShowMore()">--> 显示更多项目</span></td>
                    <td>
                    </td>
                </tr>
                <tbody id="tb" style="display:none;">
                <tr>
                    <td align="right">公司所在地：</td>
                    <td>
                        <select id="dropProvince" onchange="GetCity();GetArea();" onfocus="$('spnProvince').innerHTML=''">
                            <option value="" selected="selected">请选择</option>
                        </select>
                        <select onchange="GetArea();" id="dropCity" onfocus="$('spnProvince').innerHTML=''">
                            <option value="" selected="selected">请选择</option>
                        </select>
                        <select id="dropArea" onfocus="$('spnProvince').innerHTML=''">
                            <option value="" selected="selected">请选择</option>
                        </select>
                        <script type="text/javascript" language="javascript">                            GetProvince()</script>
                    </td>
                    <td>
                        <span class="fRed" id="spnProvince" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right">公司地址：</td>
                    <td>
                        <input id="txtAddress" type="text" class="inputReg" value="" maxlength="30" />
                    </td>
                    <td>
                        <span class="fRed" id="spnAddress" style="display: none;"></span>
                    </td>
                </tr>
                <tr>
                    <td align="right">公司电话：</td>
                    <td>
                        <input id="txtTel" type="text" class="inputReg" value="" maxlength="20" />
                    </td>
                    <td>
                        <span id="spnTelMess" class="fGray">需要带区号 (例：028-88888888)</span><span class="fRed"
                            id="spnTel" style="display: none;"></span>
                    </td>
                </tr>
                
                </tbody>
                <tr>
                    <td align="right">
                    </td>
                    <td>
                        <input id="btnReg" type="submit" value="确认并同意服务条款" class="inputBtnReg" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="Provision.php" target="_blank">查看服务条款</a>
                        <input id="hidRights" type="hidden" value="010005,010024,010023,010026,01002101,01002102,01002103,01002104,01002105,01002106,01002107,01002108,01002109,01002110,01002111,01002112,02001011,02001001,02001003,02001012,02001013,02001004,02001005,02001006,02001010,02001007,02001008,02001009,010002,010001,010003,01000401,01000402,01000403,01000404,01000405,01000406,01000407,01000408,01000409,01000410,01000411,01000412,02000113,02000101,02000102,02000104,02000104,02000103,02000106,02000107,02000105,02000114,02000108,02000112,02000109,02000110,02000111,020011,020015,020003,04000205,04000202,04000203,040007,04000105,04000102,04000103,040006,010009,010027,010031,010013,010014,01001401,01001402,01001403,01001404,01001405,01001406,01001407,010007,010025,010028,010029,200201,20020501,20020502,20020503,20020504,20020505,200209,200202,200204,200302,030012,03001201,03001202,03001203,03001204,03001205,03001206,03001207,03001208" />
                    </td>
                    <td>
                    </td>
                </tr>
                <tr id='trSer' style="display: none;">
                    <td colspan="3">
                        <div style="width: 100%; overflow: auto; height: 100px;" id='divServer'>
                        </div>
                    </td>
                </tr>
            </table>
                </div>
            </div>
        </div>
        <div class="divModel divM_B">
            <div id="contact1_divTelInfo" style="margin-bottom:30px;">
    <div class="divBan">
        <div class="header-text contact">
        </div>
    </div>
    <div class="divTel">
    <ul>
        <li class="ico">业务合作</li>
        <li><span class="spblock" style="width:110px; height:56px;vertical-align:top;">供应商合作：</span><span class="spblock" style="height:56px;">028-85002277-6204<br/>028-85002277-6202</span></li>
        <li><span class="spblock" style="width:110px; height:28px;vertical-align:top;">采购商咨询：</span><span class="spblock" style="height:28px;">028-85002277-3<br/>15882250984</span></li>
        <li><span class="spblock" style="width:110px;">产品咨询：</span><span class="spblock">028-85002277-3</span></li>
        <li><span class="spblock" style="width:110px;">技术支持：</span><span class="spblock">028-85002277-4</span></li>
    </ul>
    <ul>
        <li class="ico">gogofly热线电话</li>
        <li><span class="spblock" style="width:110px;">服务总机：</span><span class="spblock">028-85002277</span></li>
        <li><span class="spblock" style="width:110px;">紧急电话：</span><span class="spblock">18040305120</span></li>
    </ul>
</div>
</div>
<div id="contact1_divQQInfo" style="margin-bottom:30px;">
    <div class="divBan">
        <div class="header-text online">
        </div>
    </div>
    <div class="divQQ">
        <ul>
            <li class="ico">在线客服</li>
            <li>客服1：　　<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905168&amp;site=qq&amp;menu=yes'>
                <img border='0' src='http://wpa.qq.com/pa?p=2:259905168:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
            <li>客服2：　　<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905160&amp;site=qq&amp;menu=yes'>
                <img border='0' src='http://wpa.qq.com/pa?p=2:259905160:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
            <li>客服3：　　<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905177&amp;site=qq&amp;menu=yes'>
                <img border='0' src='http://wpa.qq.com/pa?p=2:259905177:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
            <li>客服4：　　<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905178&amp;site=qq&amp;menu=yes'>
                <img border='0' src='http://wpa.qq.com/pa?p=2:259905178:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
            <li>客服5：　　<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905198&amp;site=qq&amp;menu=yes'>
                <img border='0' src='http://wpa.qq.com/pa?p=2:259905198:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
            <li>疑难订单咨询： <a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=259905121&amp;site=qq&amp;menu=yes'>
		<img border='0' src='http://wpa.qq.com/pa?p=2:259905121:46' alt='点击这里给我发消息' title='点击这里给我发消息' /></a></li>
        </ul>
    </div>
</div>

        </div>
        <div class="clear"></div>
    </div>
    <div id="foot1_divInfos">
    <div class="divSplitFoot"></div>
    <div class="clear"></div>
    <!--内容2开始-->
    <div class="divMain" style="margin-top:30px; margin-bottom:40px;">
        <div style="padding: 0px 30px;">
            <div class="divModel">
                <div class="foot-1">
                    <span class="f14" style="color:#666;">精准的国际政策匹配，<br/>快捷的国际业务流程！</span>
                </div>
            </div>
            <div class="divModel divM_S">
                <div class="foot-2">
                    <span class="f14" style="color:#666;">为机票行业的从业者<br/>提供电子客票业务完整解决方案！</span>
                </div>
            </div>
            <div class="divModel divM_S">
                <div class="foot-3">
                    <span class="f14" style="color:#666;">无论是业务报表还是财务报表，<br/>我们都能为您准确呈现！</span>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <!--内容2结束-->
</div>

    <!--底部开始-->
    <div id="foot1_divFoots" style="background: #333; border-bottom:1px solid #222; clear:both;">
        <div class="divMain">
            <div class="divCopy">
                <div class="divCopyText">
                    Copyright &copy; 2009 - 2012 gogofly Inc. All Rights Reserved.&nbsp;航讯美程 版权所有&nbsp;<a href="http://www.miibeian.gov.cn/" target="_blank">蜀ICP备10206884号-4</a><br/>Technical support : 成都航讯美程电子商务有限公司 
<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36157804-1']);
    _gaq.push(['_setDomainName', '380747.com']);
    _gaq.push(['_setAllowLinker', true]);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F8de25f0a1d6081b3344b201f3440b99b' type='text/javascript'%3E%3C/script%3E"));
</script>
                    </div>
            </div>
        </div>
    </div>
    
    <div style="display: none" id="divTongji"></div>
    <!--底部结束-->
    </form>
</body>
</html>
