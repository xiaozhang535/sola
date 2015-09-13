
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset ="UTF-8">
<title>
	gogofly
</title><link type="text/css" rel="stylesheet" href="Css/Base.css?d=201412081" />
    <script language="javascript" type="text/javascript" src="DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Js/poplayer.js"></script>
    <script type="text/javascript" src="Js/forms.js"></script>
    <script type="text/javascript">
        var fmtData = { doubleCalendar: true, position: { top: 1 }};
        var fmtDay = { doubleCalendar: true, position: { top: 1 }, minDate: '%y-%M-%d' };
    </script>
    <script type="text/javascript" src="Js/GJPolicyPriceList.js?d=201503041"></script>
    <style>
        .ultable{margin:0px; padding:0px; list-style:none;}
        .ultable li{float:left; padding:4px 8px 0px 8px; width:350px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; -o-text-overflow:ellipsis;}
        .ultable .ws{width:40px; padding:2px 8px;}
        .ultable .wli{width:1050px; padding-bottom:4px;}
    </style>
</head>
<body>
    <form name="form1" method="post" action="http://www.380747.com/PolicyManage/gjpolicypricelist.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWGwL+raDpAgKa7MDGBQKAw8nGDAKszMP3CwLV08qECQKw/oyEAgL9/uceApnWv1ICi7KY2QoC34bV8gQCj8fVnAcC4OywwA4C5PuewQwC/IidvAwC84idvAwC8oidvAwCnPrh/AgC2ILg3QECurvmqA8C0PHdgg4C+9j/NwK4u8qoDwLasPurDAKwtcVzAtiNoNUMAsWNlNQMAqHg6JUP+wYm5QOnNbSjirDd1tfdZBhDBiw=" />
</div>
    
<div class="bt10">
    <ul id="ucGJPolicyTop_ulTop" class="tab tab-orange"><li><a  href="GJPolicyList.php">国际总量政策</a></li><li><a class='sa' href="GJPolicyPriceList.php">国际价单政策</a></li><li><a  href="GJCarrierRuleList.php">航空公司规则</a></li><li><a  href="GJOfficeList.php">开票组设置</a></li><li><a  href="GJHangUpList.php">政策挂起</a></li></ul>
</div>
    <div class="bt10">
        <input name="txtCarrier" type="text" maxlength="2" id="txtCarrier" class="upper" placeholder="航空公司" style="width:100px;" />
        <input name="txtDepCity" type="text" id="txtDepCity" class="upper" placeholder="出发城市" style="width:100px;" />
        <input name="txtTicketFrom" type="text" id="txtTicketFrom" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="开票起始时间" style="width:80px;" />
        <input name="txtTicketTo" type="text" id="txtTicketTo" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="开票结束时间" style="width:80px;" />
        <select name="dropAuditing" id="dropAuditing" style="width:110px;">
	<option value=" ">是否审核</option>
	<option value="True">已审核</option>
	<option value="False">未审核</option>

</select>
        <input name="txtFlag" type="text" id="txtFlag" placeholder="政策标签" style="width:100px;" />        
    </div>
    <div class="bt10">
        <input name="txtPolicyID" type="text" id="txtPolicyID" placeholder="政策号" style="width:100px;" />
        <input name="txtArrCity" type="text" id="txtArrCity" class="upper" placeholder="到达城市" style="width:100px;" />
        <input name="txtGoFrom" type="text" id="txtGoFrom" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="旅行起始时间" style="width:80px;" />
        <input name="txtGoTo" type="text" id="txtGoTo" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="旅行结束时间" style="width:80px;" />
        <select name="dropRecord" id="dropRecord" style="width:110px;">
	<option value=" ">是否换编</option>
	<option value="1">无需换编码</option>
	<option value="2">换编码出票</option>

</select>
        <select name="dropOfficeGroup" id="dropOfficeGroup" style="width:110px;">
	<option value=" ">选择开票组</option>
	<option value="101">境外票常规可VOID</option>
	<option value="480">航空公司GSA开票</option>
	<option value="628">白天</option>
	<option value="629">长时间</option>
	<option value="630">境外票不可VOID</option>
	<option value="646">MOW境外电子票</option>

</select>
        
        <input type="submit" class="btn btn-green" value="搜索" onclick="Scan();return false;" />
    </div>
    <div id="divList"></div>
    <input type="hidden" name="hidPage" id="hidPage" value="1" /><input type="hidden" name="hidALL" id="hidALL" />
    <input type="hidden" name="hidAsc" id="hidAsc" value="0" /><input type="hidden" name="hidAscName" id="hidAscName" value="Updatetime" />
    </form>
</body>
</html>
