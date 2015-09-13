
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset ="UTF-8">
<title>
	帐户信息-gogofly
</title><link href="Base.css" rel="stylesheet" type="text/css" /><link id="linkSkin" href="Style1/Skin.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" language="javascript" src="Prototype.js"></script>
    <script language="javascript" type="text/javascript" src="Valid.js"></script> 
    <script language="javascript" type="text/javascript" src="Base.js"></script>
    <script language="javascript" type="text/javascript" src="Form.js"></script> 
    <script language="javascript" type="text/javascript" src="DropDown.js"></script>
    <script language="javascript" type="text/javascript" src="Js/Account.js"></script> 
</head>
<body>
    <form name="form1" method="post" action="test_php/SystemManage/account.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWBwL+raDpAgLQjbCsAgLp/cWfCwKE8/26DAKxhYrZCQKL+4qxCwK3+7bDBbnDTF9JKUpCHIrBwzwD6ZUya2L2" />
</div>
        <div class="divMain">
            
<div class="Tab0">
    <ul>
        <li id="AccountTop1_liAccount" class="lis"><a id="AccountTop1_linkAccount">个人信息</a></li>
    </ul>
</div>
            <div class="divColorBg">
                <div class="divSTable btl">
                    <table width="100%" border="0" cellspacing="0" cellpadding="4">
                        <tr>
                            <td align="right" class="tdl">个人帐户基本信息：</td>
                            <td width="63" align="right" style="padding:9px 4px;">登录帐号：</td>
                            <td width="210">
                                <span id="lblAccount" class="fBold">Gary</span>
                                <input type="hidden" name="hidID" id="hidID" value="CP00043913" />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td align="right">&nbsp;</td>
                            <td align="right">登录密码：</td>
                            <td colspan="2">
                                <input type="button" name="button2" class="btn1" value="修改登录密码"  onclick="ShowPassword()"/>&nbsp;
                                <a id="linkRight" href="SystemRights.php?Show=Self&amp;ID=1402&amp;UserID=CP00043913&amp;Organization=Department">查看我的权限</a>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">&nbsp;</td>
                            <td align="right">真实姓名：</td>
                            <td>
                                <input name="txtRealName" type="text" value="高元" id="txtRealName" class="inputtext" text="高元" style="width: 200px;" />
                            </td>
                            <td>
                                <span id="spnRealName" class="fRed"></span>
                            </td>
                        </tr>
                        <tr>
                            <td align="right">&nbsp;</td>
                            <td align="right">邮　　箱：</td>
                            <td>
                                <input name="txtEmail" type="text" value="2355728234@qq.com" id="txtEmail" class="inputtext" text="2355728234@qq.com" style="width: 200px;" />
                            </td>
                            <td>
                                <span id="spnEmail" class="fRed"></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="divST">
                    <div class="divSTable">
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="right" class="tdl">
                                    个人帐户其他信息：</td>
                                <td width="63" align="right">
                                    联系手机：
                                </td>
                                <td width="210">
                                    <input name="txtMobile" type="text" id="txtMobile" class="inputtext" text="" style="width: 200px;" /></td>
                                <td>
                                    <span id="spnMobile" class="fRed"></span></td>
                            </tr>
                            <tr>
                                <td align="right">&nbsp;
                                    
                              </td>
                                <td align="right">
                                    联系电话：
                                </td>
                                <td>
                                    <input name="txtTel" type="text" value="0755-83941087" id="txtTel" class="inputtext" text="0755-83941087" style="width: 200px;" /></td>
                                <td><span id="spnTel" class="fRed"></span>
                              </td>
                            </tr>
                        </table>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="right" class="tdl">&nbsp;</td>
                                <td align="right" valign="top" width="63">
                                    QQ： </td>
                                <td width="360">
                                <textarea name="txtQQ" rows="4" cols="20" id="txtQQ" class="inputtext" text="2355728234" msg="请在这里粘贴QQ在线代码" style="width: 350px; height:60px;">2355728234</textarea>                                </td>
                                <td><span id="lblQQ">QQ在线效果↓<br /></span><span id="lblShow">2355728234</span><span id="spnQQ" class="fRed"></span></td>
                            </tr>
                        </table>
						<table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="right" class="tdl">&nbsp;</td>
                                <td align="right" valign="top" width="63">
                                    &nbsp;</td>
                                <td>
                                <span class="fGray">(请到<a href="http://wp.qq.com" target="_blank">http://wp.qq.com</a>页面上生成客服QQ的在线状态代码,然后复制到文本框中。)</span></td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
            <div class="divFoot">
                <input type="button" value="<<返回" class="btn1" id="Button1"  onclick="LinkUrl('Setting.php')"/>︱<input type="button" value="保存更改" class="btn1" id="btnSave"  onclick="SubmitForm()"/>&nbsp;&nbsp;&nbsp;&nbsp;<a
                    href="javascript:void(0)" onclick="ResetForm()">取消</a></div>
        </div>
    </form>
</body>
</html>
