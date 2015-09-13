
<!DOCTYPE html>
<html>
<head>
<meta charset ="UTF-8">
<title>
	gogofly
</title><link type="text/css" rel="stylesheet" href="Css/Base.css" />
    <script type="text/javascript" src="jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Js/poplayer.js"></script>
    <script type="text/javascript" src="Js/GJCarrierRuleList.js?d=20141023"></script>
</head>
<body>
    <form name="form1" method="post" action="http://www.380747.com/PolicyManage/gjcarrierrulelist.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWAwL+raDpAgLNkuWwCALbjdieCwjmM5tzT6BFAxdJw5AffVJbadDN" />
</div>
    
<div class="bt10">
    <ul id="ucGJPolicyTop_ulTop" class="tab tab-orange"><li><a  href="GJPolicyList.php">国际总量政策</a></li><li><a  href="GJPolicyPriceList.php">国际价单政策</a></li><li><a class='sa' href="GJCarrierRuleList.php">航空公司规则</a></li><li><a  href="GJOfficeList.php">开票组设置</a></li><li><a  href="GJHangUpList.php">政策挂起</a></li></ul>
</div>
    
    <div class="bt10">
    <input name="txtScan" type="text" id="txtScan" placeholder="搜索规则名" />
        <input type="submit" class="btn btn-green" value="搜索" onclick="Scan();return false;" />
        <input type="button" class="btn btn-blue" value="添加航司规则" onclick="Add()" />
        
    </div>
    <div id="divList"></div>
    <input type="hidden" name="hidCID" id="hidCID" />
    </form>
</body>
</html>
