
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta charset ="UTF-8">
<title>
	gogofly
</title><link href="Base.css" rel="stylesheet" type="text/css" /><link id="linkSkin" href="Style1/Skin.css" rel="stylesheet" type="text/css" />

    <script language="javascript" type="text/javascript" src="Prototype.js"></script>

    <script language="javascript" type="text/javascript" src="Valid.js"></script>

    <script language="javascript" type="text/javascript" src="Base.js"></script>

    <script language="javascript" type="text/javascript" src="Form.js"></script>

    <script language="javascript" type="text/javascript" src="JS/SysAdvance.js"></script>
    
</head>
<body>
    <form name="form1" method="post" action="SystemManage/sysadvance.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWBAL+raDpAgLS+dK+AwKE8/26DAKTs9eTCuo0VAiC7V+minNt9AN8fJjFy3sk" />
</div>
         <div class="divMain"> 
         <div class="divST">
            
<div class="Tab0">
    <ul>
        <li id="AdvanceTop1_liSysAdvance" class="lis"><a id="AdvanceTop1_linkSysAdvance">意见与建议</a></li>
        <li id="AdvanceTop1_liAdvanceList"><a id="AdvanceTop1_linkAdvanceList" href="AdvanceList.php">用户建议</a></li>
    </ul>
</div>
        </div>
        <div class="divST">
                <table border="0" cellpadding="0" cellspacing="0" class="table0" style="width: 600px;">
                    <tr>
                        <th class="th0">
                            意见与建议</th>
                    </tr>
                    <tr>
                        <td class="tdo">
                            <table border="0" cellpadding="0" cellspacing="4" width="100%">
                                <tr>
                                    <td width="240">
                                        <textarea name="txtContents" id="txtContents" style="width: 230px; height: 240px;" class="inputtext fGray" msg="请在这里填写您的意见或建议..." onfocus="inputfocus(this)" onblur="inputblur(this)">请在这里填写您的意见或建议...</textarea>
                                            </td>
                                    <td valign="top">
                                        <table border="0" cellpadding="0" cellspacing="4" width="100%">
                                            <tr>
                                                <td width="60" height="30">
                                                    Email<span class="fRed">*</span>：
                                                </td>
                                                <td>
                                                    <input name="txtEmail" type="text" id="txtEmail" style="width: 170px" class="inputtext" value="2355728234@qq.com" /> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="30">
                                                    联系电话：
                                                </td>
                                                <td>
                                                    <input name="contactPhone" type="text" id="contactPhone" style="width: 170px" class="inputtext" value="0755-83941087" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="30" colspan="2" align="right">
                                                    <span class="fOrange">为了及时方便地与您沟通，请您留下联系电话。</span></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="3" class="fGray">
                                                    <b>请在左边的方框中告诉我们您遇到的问题：</b>
                                                    <br>1.请详细描述您遇到的问题；
                                                    <br>2.请说明您在相关页面上看到的错误提示信息。
                                                    <br>
                                                    <br><b>同时，您也可以提以下几方面的问题：</b>
                                                    <br>1.您认为我们的网站在哪些功能上有待完善？
                                                    <br>2.您希望我们增加什么功能或哪些方面的内容？
                                                    <br>
                                                    <br><b>您的意见和建议是我们前进的强大动力！</b>
                                                </td>
                                            </tr>
                                            <tr>
                                            </tr>
                                            <tr>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="divFoot">
                <input type="button" onclick="history.back()" value="<<返回" class="btn1" />︱<input type="button" value="提交意见" class="btn1" id="btnSave"  onclick="SubmitForm()"/>
            </div>
		</div>		 
	 </form>
</body>
</html>
