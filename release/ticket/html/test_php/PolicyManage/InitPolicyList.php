<?php
function get_html($pageidx)
{
$g_html = <<<EOD
<!DOCTYPE html>
<html>
<head>
<meta charset ="UTF-8">
<title>
    gogofly
</title><link type="text/css" rel="stylesheet" href="Css/Base.css?d=201412021" />
    <style>
        .ultable{margin:0px; padding:0px; list-style:none;}
        .ultable li{float:left; padding:4px 8px 0px 8px; width:350px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; -o-text-overflow:ellipsis;}
        .ultable .ws{width:40px; padding:2px 8px;}
        .ultable .wli{width:1050px; padding-bottom:4px;}
    </style>
    <script language="javascript" type="text/javascript" src="../JavaScript/DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="../JavaScript/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="Js/poplayer.js"></script>
    <script type="text/javascript" src="Js/forms.js"></script>
    <script type="text/javascript" src="Js/GJAreas.js"></script>
    <script type="text/javascript" language="javascript" src="Js/menutree.js"></script>
    <script type="text/javascript" src="Js/GJPolicyList.js?d=201501091"></script>
    <script type="text/javascript">
        var fmtData = { doubleCalendar: true, position: { top: 1} };
        var fmtDay = { doubleCalendar: true, position: { top: 1 }, minDate: '%y-%M-%d' };
    </script>
</head>
<body>
    <form name="form1" method="post" action="GJPolicyList.php" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="
__VIEWSTATE" value="" />
</div>

<div>

    <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWHgL+raDpAgKa7MDGBQLHlcmGAQK0mc3/DwKszMP3CwLV08qECQKYh6azCgKw/oyEAgL9/uceApnWv1ICi7KY2QoC34bV8gQCgMPJxgwCj8fVnAcC4OywwA4C5PuewQwCuvuNuwQC4q71kwMChLTIlAoChM3n5AcC/IidvAwC84idvAwC8oidvAwC8YidvAwC8IidvAwC94idvAwCsLXFcwLYjaDVDALFjZTUDAKh4OiVD6gm3q6Wp7qywDfsVu8jzBpkDRc6" />
</div>
    
<div class="bt10">
    <ul id="ucGJPolicyTop_ulTop" class="tab tab-orange"><li><a class='sa' href="GJPolicyList.php">国际总量政策</a></li><li><a  href="GJPolicyPriceList.php">国际价单政策</a></li><li><a  href="GJCarrierRuleList.php">航空公司规则</a></li><li><a  href="GJOfficeList.php">开票组设置</a></li><li><a  href="GJHangUpList.php">政策挂起</a></li></ul>
</div>
    <div class="bt10">
        <input name="txtCarrier" type="text" maxlength="2" id="txtCarrier" class="upper" placeholder="航空公司" style="width:100px;" />
        <input name="txtDepArea" type="text" id="txtDepArea" class="treelist" onclick="ShowArea(this)" placeholder="出发区域" style="width:80px;" />
        <input name="txtArrArea" type="text" id="txtArrArea" class="treelist" onclick="ShowArea(this)" placeholder="到达区域" style="width:80px;" />
        <input name="txtTicketFrom" type="text" id="txtTicketFrom" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="开票起始时间" style="width:80px;" />
        <input name="txtTicketTo" type="text" id="txtTicketTo" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="开票结束时间" style="width:80px;" />
        <input name="txtOffice" type="text" id="txtOffice" class="upper" placeholder="开票OFFICE号" style="width:100px;" />
        <select name="dropAuditing" id="dropAuditing" style="width:110px;">
    <option value=" ">是否审核</option>
    <option value="True">已审核</option>
    <option value="False">未审核</option>

</select>
        
        <input name="txtFlag" type="text" id="txtFlag" placeholder="政策标签" style="width:100px;" />        
    </div>
    <div class="bt10">
        <input name="txtPolicyID" type="text" id="txtPolicyID" placeholder="政策号" style="width:100px;" />
        <input name="txtDepCity" type="text" id="txtDepCity" class="upper" placeholder="出发城市" style="width:100px;" />
        <input name="txtArrCity" type="text" id="txtArrCity" class="upper" placeholder="到达城市" style="width:100px;" />
        <input name="txtGoFrom" type="text" id="txtGoFrom" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="去程起始时间" style="width:80px;" />
        <input name="txtGoTo" type="text" id="txtGoTo" class="calendar" onfocus="WdatePicker(fmtData)" placeholder="去程结束时间" style="width:80px;" />
        <select name="dropTicketType" id="dropTicketType" style="width:110px;">
    <option value=" ">选择票类</option>
    <option value="BSP">BSP</option>
    <option value="B2B">B2B</option>
    <option value="境外电子">境外电子</option>

</select>
        <select name="dropRecord" id="dropRecord" style="width:110px;">
    <option value=" ">是否换编</option>
    <option value="1">无需换编码</option>
    <option value="2">换编码出票</option>
    <option value="3">大编出票(无需换编)</option>
    <option value="4">大编出票(需换编码)</option>
    <option value="5">需换编码(外放无位可不换)</option>

</select>
        
        <input type="submit" class="btn btn-green" value="搜索" onclick="Scan();return false;" />
        <input type="submit" class="btn btn-purple" value="比较政策" onclick="Compare();return false;" />
    </div>
    <div id="divList"></div>
    <input type="hidden" name="hidPage" id="hidPage" value="{$pageidx}" /><input type="hidden" name="hidALL" id="hidALL" />
    <input type="hidden" name="hidAsc" id="hidAsc" value="0" /><input type="hidden" name="hidAscName" id="hidAscName" value="Updatetime" />
    </form>
</body>
</html>
EOD;
    return $g_html;
}
?>
