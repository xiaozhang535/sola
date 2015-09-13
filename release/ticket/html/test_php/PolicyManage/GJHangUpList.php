
<!DOCTYPE html>
<html>
<head id="Head1">
<meta charset ="UTF-8">
<title>
	gogofly
</title><link type="text/css" rel="stylesheet" href="Css/Base.css" />
    <script language="javascript" type="text/javascript" src="DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Js/poplayer.js"></script>
    <script type="text/javascript" src="Js/forms.js"></script>
    <script type="text/javascript" src="Js/GJHangUpList.js?d=201502101"></script>
</head>
<body>
    <form name="form1" method="post" action="http://www.380747.com/PolicyManage/gjhanguplist.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWAgL+raDpAgLNkuWwCMwrnz7ACsVRUxmo3u+PtnJDtKz4" />
</div>
    
<div class="bt10">
    <ul id="ucGJPolicyTop_ulTop" class="tab tab-orange"><li><a  href="GJPolicyList.php">国际总量政策</a></li><li><a  href="GJPolicyPriceList.php">国际价单政策</a></li><li><a  href="GJCarrierRuleList.php">航空公司规则</a></li><li><a  href="GJOfficeList.php">开票组设置</a></li><li><a class='sa' href="GJHangUpList.php">政策挂起</a></li></ul>
</div>
    <div class="bt10">
        <input name="txtScan" type="text" id="txtScan" placeholder="搜索航空公司或票类" />
        <input type="submit" class="btn btn-green" value="搜索" onclick="LoadList(); return false;" />
        <input type="button" class="btn btn-blue" value="新增挂起规则" onclick="EditRule()" />
    </div>
    <div id="divList"></div>
    </form>
</body>
</html>
