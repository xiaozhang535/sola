<?php
function get_html(&$arr_req)
{
$html = <<<EOD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
<meta charset ="UTF-8">
<title>
	gogofly - 国际机票查询预订,国际机票政策查询,国际机票分销
</title><meta name="description" content="gogofly是中国领先的国际机票分销交易平台,提供优势政策、航线自主选择、在线预订、在线支付、快速出票，实现实时交易并提供专业的售前、售中、售后服务；为各类机票代理人提供国际机票采购、供应等一站式解决方案。" /><meta name="keywords" content="国际机票,gogofly,国际PNR导入,国际机票平台,国际机票预订" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta property="qc:admins" content="215122677763007476375" />
<meta property="wb:webmaster" content="b7f9e18c3cc92f41" />
<link href="CP00000000/css/style.css" rel="stylesheet" type="text/css" />
<link href="favicon.ico" rel="Shortcut Icon" />
<link href="favicon.ico" rel="Bookmark" /></head>
<body>
    <form id="form1" onsubmit="return SubmitForm()" action>
    
<!--顶部开始-->

<!--顶部结束-->
<!--导航栏开始-->
<div style="padding-top:10px;">
        <div style="width:1000px; margin:0 auto;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="topBg">
                <tr>
                    <td width="200">
                        <a href="index.php" id="linkLogo"><img alt="gogofly-中国领先的国际机票在线采购和分销交易平台" src="CP00000000/Images/logo.gif" border="0" width="185" height="50"/></a>
                    </td>
                    
                    <td>
                        <ul class="ulBan0">
                            <li><a id="top1_linkDefault" class="sa" href="index.php">首页</a></li>
                            <li><a id="top1_linkAboutUs" href="CP00000000/AboutUs.php">关于我们</a></li>
                            <li><a id="top1_linkNews" href="CP00000000/NewsList.php">新闻中心</a></li>
                            <li><a id="top1_linkProduct" href="CP00000000/Product.php">产品介绍</a></li>
                            <li><a id="top1_linkHelp" href="CP00000000/Help.php?text=gjzc">帮助中心</a></li>
                            
                            <li><a id="top1_linkProvision" href="CP00000000/Provision.php">服务条款</a></li>
                            <li><a id="top1_linkContact" href="CP00000000/Contact.php">联系我们</a></li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </div>
<!--导航栏结束-->


    <div class="divScreenBg Screen0">
        <div style="margin:0 auto; margin-top:312px; width:380px; text-align:right; padding-right:86px;">
            <a href="http://www.jp126.com" target="_blank"><img src="CP00000000/images/download.png" alt="iEterm windows版" /></a>
        </div>
    </div>
    <div id="divPoint"></div>

    <div class="divConBg">
        <div class="divLoginBg">
                <div class="divQQLog"><a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100360064&redirect_uri=http://10.211.55.5/Homepage/CP00000000/Authorization.php&state=qq_authorize" class="aqq"></a>
                        
                </div>
                <input name="txtAccount" type="text" id="txtAccount" class="inputText inputAcc" value="" msg="帐号或邮箱" onfocus="inputfocus(this)" onblur="inputblur(this)" />
                <input id="txtPassword" type="password" class="inputText inputPwd" autocomplete="off"/>
                <div class="divFgt">
                    <input id="chkRemeber" type="checkbox" /><label for="chkRemeber" class="fWhite">记住登录状态</label><span
                        class="spblock" style="padding-left: 90px;"><a href="CP00000000/Remember.php" target="_blank"
                            class="fWhite">忘记密码？</a></span>
                </div>
                <div id="divVad" class="divVad" style="display:none;">
                    <input id="txtVal" type="text" class="inputText inputVad" maxlength="4" autocomplete="off"/>
                    <span id="spnImg" class="spblock" style="margin-left:16px; padding-top:3px; width:72px;"></span>
                    <span class="spblock" style="margin-left:8px; padding-top:9px; "><a href="javascript:ChangeImg()" class="fWhite">换一张</a></span>
                </div>
                <input id="btnLogin" type="submit" value="" class="inputBtnLog"/>
                <div class="divLogWeb">
                    <span id="spnReg"><a href="CP00000000/Register.php" target="_blank" class="acg"></a></span>&nbsp;&nbsp;&nbsp;
                    <a href="CP00000000/ProviderRegister.php" target="_blank" class="agy"></a>
                </div>
            </div>
    </div>

    <!--内容1开始-->
    <div class="divMain" style="margin-top:15px;">
        <div class="clear"></div>
        <div style="padding: 0px 30px;">
            <div class="divModel">
                <div class="index-1"></div>
                <div style="font-size: 14px; color: #666; line-height: 24px;">
                    “客户为本，专业为源，服务为王”的理念<br />
                    客户需求为导向，与产业链各方紧密合作<br />
                    专业打造中国领先的国际机票在线交易网站
                </div>
            </div>
            <div class="divModel divM_S">
                <div class="index-2"></div>
                <div style="font-size: 14px; color: #666; line-height: 24px;">
                    在线预订/在线支付/快速出票<br />
                    会员管理/订单管理/政策管理<br />
                    分销管理/报表管理/财务管理
                </div>
            </div>
            <div class="divModel divM_S">
                <div class="index-3"></div>
                <div style="font-size:14px; color:#666; line-height:24px;">
                    低价国际机票/低价国内机票/航线自主选择<br/>
                    专业的业务服务/专业的技术团队<br/>
                    <span class="spblock" style="width:240px; text-align:right; color:#FF7900; font-size:16px;">-- Please choose us!</span>
                </div>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
    <!--内容1结束-->
    <script type="text/javascript" language="javascript" src="JavaScript/Prototype.js"></script>
    <script type="text/javascript" language="javascript" src="CP00000000/js/default.js?date=20130827"></script>
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
    _gaq.push(['_setDomainName', '10.211.55.5']);
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
    <div id="foot1_divFriend" style="background: #666;  border-top:1px solid #888">
        <div class="divMain">
                <div class="divFootText">
                    <b>友情链接：</b>
                    <a href="http://www.alipay.com" target="_blank">支付宝</a> ︱
                    <a href="http://www.tenpay.com" target="_blank">财付通</a> ︱
                    <a href="http://www.yeepay.com" target="_blank">易宝支付</a> ︱
		    <a href="http://www.yeego.net" target="_blank">中航易购</a> ︱
                    <a href="http://www.qunar.com" target="_blank">去哪儿网</a> ︱
                    <a href="http://www.ctrip.com/" target="_blank">携程网</a> ︱
                    <a href="http://www.elong.com" target="_blank">艺龙网</a> ︱
                    <a href="http://www.8000yi.com" target="_blank">八千翼</a> ︱
                    <a href="http://www.carnoc.com" target="_blank">民航资源网</a> ︱
                    <a href="http://www.travelsky.net" target="_blank">中国航信</a> ︱
                    <a href="http://www.travelsky.com" target="_blank">信天游</a> ︱
                    <a href="http://www.iata.org" target="_blank">国际航协</a><br/> 
                    <a href="http://www.cata.org.cn" target="_blank">中国航协</a>︱
                    <a href="http://www.klm.com.cn" target="_blank">荷兰皇家航空</a> ︱
                    <a href="http://www.airfrance.com.cn" target="_blank">法国航空</a> ︱
                    <a href="http://www.silkair.com" target="_blank">胜安航空</a> ︱
                    <a href="http://www.lufthansa.com.cn" target="_blank">汉莎航空</a> ︱
                    <a href="http://www.etihadairways.com/sites/etihad/cn/zh/home/pages/home.php" target="_blank">阿提哈德航空</a> ︱
                    <a href="http://www.dragonair.com/da/sc_INTL/homepage?CX_FCN=CXHOME0_Home" target="_blank">港龙航空</a> ︱
                    <a href="http://www.airmacau.com.mo/" target="_blank">澳门航空</a> ︱
                    <a href="http://gb.evaair.com/gate/gb/www.evaair.com/html/b2c/chinese/" target="_blank">长荣航空</a> ︱
                    <a href="http://www.koreanair.com/" target="_blank">大韩航空</a> ︱
                    <a href="http://www.hongkongairlines.com/zh_CN/homepage" target="_blank">香港航空</a><br/>
                    <a href="http://www.airchina.com.cn" target="_blank">中国国航</a> ︱
                    <a href="http://www.ceair.com/" target="_blank">东方航空</a> ︱
                    <a href="http://www.csair.com" target="_blank">南方航空</a> ︱
                    <a href="http://www.hnair.com" target="_blank">海南航空</a> ︱
                    <a href="http://www.scal.com.cn" target="_blank">四川航空</a> ︱
                    <a href="http://www.xiamenair.com" target="_blank">厦门航空</a></div>
        </div>
    </div>
    <div style="display: none" id="divTongji"></div>
    <!--底部结束-->
    </form>
</body>
</html>
EOD;
    return $html;
}
?>
