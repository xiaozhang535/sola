
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset ="UTF-8">
<title>
	gogofly
</title><link rel="stylesheet" type="text/css" href="Base.css" /><link id="linkSkin" rel="stylesheet" type="text/css" href="Style7/Skin.css" />
    <script language="javascript" type="text/javascript" src="Prototype.js"></script>
    <script language="javascript" type="text/javascript" src="Base.js"></script>
    <script language="javascript" type="text/javascript" src="Form.js"></script>
    <script language="javascript" type="text/javascript" src="Valid.js"></script>
    <script language="javascript" type="text/javascript" src="DropDown.js"></script>
    <script language="javascript" type="text/javascript" src="Calendar.js"></script>
    <script language="javascript" type="text/javascript" src="AjaxInput.js"></script>
    <script language="javascript" type="text/javascript" src="JS/FaqList.js"></script>
    <style type="text/css">
        .style1
        {
            width: 56px;
        }
       .Sel{margin-right:6px; padding:3px 6px; background:#FFF8D9; border:2px solid #FF6600; cursor:pointer; font-family:宋体;}
        .NoS{margin-right:6px; padding:4px 7px; background:#EEEEEE; border:1px solid #888888; cursor:pointer; font-family:宋体;}
        .DIS{margin-right:6px; padding:4px 7px; background:#EEEEEE; border:1px solid #AAAAAA; color:#AAAAAA; font-family:宋体;}
    </style>
    </head>
<body>
    <form name="form1" method="post" action="http://www.380747.com/Faq/faqlist.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWAgL+raDpAgKhpZunCG0xc/C8EPr13EtM/lf9lQQ57CEX" />
</div>
    <div class="divMain">
        <div class="divColorBg">
            <div class="divSTable">
                <table class='tablePageSub' id='tbFaqClass' style='width:100%' border='0' cellspacing='0' cellpadding='0'><tr><td width='100%'><span id='spn2000' FaqClassType='faq' index='2000' name='spn2000' class='spblock Sel' onclick="SetClickIt(this)">最近更新</span><span id='spn4000' FaqClassType='faq' index='4000' name='spn2000' class='spblock NoS' onclick="SetClickIt(this)">精华</span><span id='spn1000' FaqClassType='faq' index='1000' name='spn1000' class='spblock NoS' onclick="SetClickIt(this)">所有</span>|&nbsp;<span id='spn5000' FaqClassType='faq' index='5000' name='spn2000' class='spblock NoS' onclick="SetClickIt(this)">我的提问</span><span id='spn3000' FaqClassType='faq' index='3000' name='spn2000' class='spblock NoS' onclick="SetClickIt(this)">我的收藏</span>|&nbsp;<span id='spn1' FaqClassType='faq' index='1' name='spn1' class='spblock NoS' onclick="SetClickIt(this)">客服</span><span id='spn2' FaqClassType='faq' index='2' name='spn2' class='spblock NoS' onclick="SetClickIt(this)">采购商</span><span id='spn3' FaqClassType='faq' index='3' name='spn3' class='spblock NoS' onclick="SetClickIt(this)">供应商</span><span id='spn8' FaqClassType='faq' index='8' name='spn8' class='spblock NoS' onclick="SetClickIt(this)">政策相关</span><span id='spn5' FaqClassType='faq' index='5' name='spn5' class='spblock NoS' onclick="SetClickIt(this)">行业知识</span><span id='spn6' FaqClassType='faq' index='6' name='spn6' class='spblock NoS' onclick="SetClickIt(this)">公司制度</span><span id='spn4' FaqClassType='faq' index='4' name='spn4' class='spblock NoS' onclick="SetClickIt(this)">系统使用</span><span id='spn9' FaqClassType='faq' index='9' name='spn9' class='spblock NoS' onclick="SetClickIt(this)">BUG及建议</span><span id='spn7' FaqClassType='faq' index='7' name='spn7' class='spblock NoS' onclick="SetClickIt(this)">其他</span></td></tr></table>
            </div> 
            <div>
                <table class='tablePageSub' border='0' cellspacing='0' cellpadding='0' width='100%' >
                    <tr>
                        <td width='430' align="left" >
                            <span class='cmb' id='cmbdropKeyWords' style='width:124px; '><input name='dropKeyWordsText' id='dropKeyWordsText' type='text' style='width:100px;color:#999999;  cursor:pointer;' value='选择关键字...' onclick="this.blur();ShowdropKeyWords($('dropKeyWordsText'), arrdropKeyWords, this);" readonly='readonly' tabindex='0'/><input readonly='readonly' class='ip0 ico12' onclick="this.blur();ShowdropKeyWords($('dropKeyWordsText'), arrdropKeyWords, this);"/><input type='hidden' id='dropKeyWords' value=''/></span><script language='javascript' type='text/javascript'>var arrdropKeyWords=new Array('选择关键字...,选择关键字...,,','儿童,儿童,儿童,','婴儿,婴儿,婴儿,','预订,预订,预订,','指令,指令,指令,','白屏,白屏,白屏,','eterm,eterm,eterm,'); function ShowdropKeyWords(e, arr, cl, bt){bt = bt == null ? true : bt; var title= bt ? "" : ""; var html="<ul id='uldropKeyWords'>" + title; arr.each(function(d){var arr = d.split(','); html += "<li><a href='javascript:void(0)' text='" + arr[2] + "' showtext='" + arr[1] + "' title='" + arr[3] + "' onmouseover='SelectOp()' onclick=\"SelectOption('dropKeyWords','" + arr[2] + "','" + arr[1] + "');OnKeyWordChange();\">" + arr[0] + "</a></li>"}); html += '</ul>'; OpenDropList(e, html, 127, cl); DefautOpiton('dropKeyWords'); }</script>&nbsp;
                             <span class="cmb"><input name="txtQuestion" type="text" value="输入关键字..." maxlength="200" id="txtQuestion" msg="输入关键字..." style="width:280px;" /></span> 
                        </td>
                        <td style="padding-top: 2px; padding-left: 2px;" align="left"  width='50'>
                            <input id="btnSerch" type="button" value="立即查询" class="btn0" onclick="OnQuery(0)" />
                        </td>
                        <td style="padding-top: 2px; padding-left: 2px;" align="left"  width='50'>
                            <input id="Button1" type="button" value="提 问" class="btn0" onclick="ShowSetting(this)" />
                        </td>
                        <td id="tdPageInfo" align="right">
                        </td>

                    </tr>
                </table>
            </div>
            <br/>
            <div id="divInfo" class="divST"><table width='100%' border='0' cellspacing='0' class='tablebody' cellpadding='0'><thead><tr><td width='90' class='l'>类别</td><td>问题描述</td><td width='80'>问题提出人</td><td width='50'>查看/回复</td><td width='80' class='r'>最后回复人</td></tr></thead><tr><td colspan='6'>还没有相关记录!</td></tr></table><table width='100%' border='0' cellspacing='0' cellpadding='0' class='tablePageSub'><tr><td align='right'>1/1 页&nbsp;共0条</td></tr></table></div>
        </div>
    </div>
    </form>
</body>
</html>
