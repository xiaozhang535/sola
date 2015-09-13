function Step(d) {//点击下一步时
    if (d == 1) {
        var strAccount = $("txtAccount").value.strip();
        if (strAccount.empty()) {
            $("spnAccount").innerHTML = "< 您还没有填写登录帐号.";
        }
        else if (strAccount.length < 2 || strAccount.length > 20) {
            $("spnAccount").innerHTML = "< 请填写2-20位字符(支持中文),以字母开头.";
        }
        else {//找帐号对应的ID
            $("btnStep1").disabled = "disabled";
            var para = "Action=GetUserID&Account=" + strAccount;
            new Ajax.Request(
            $("form1").action,
	        {
	            method: "post",
	            parameters: para,
	            onSuccess: function (transport) {
	                var content = transport.responseText;
	                if (content.startsWith("ERROR")) {
	                    $("spnAccount").innerHTML = "< " + content;
	                    $("spnAccount").className = "fRed";
	                    $("btnStep1").disabled = "";
	                }
	                else {
	                    window.location.href = "?Step=2&ID=" + content;
	                }
	            }
	        });
        }
    }
    else if (d == 2) {
        var strEmail = $("txtEmail").value.strip();
        if (strEmail.empty()) {
            $("spnEmail").innerHTML = "< 您还没有填写Email.";
        }
        else if (!ValEmail(strEmail)) {
            $("spnEmail").innerHTML = "< Email的格式错误.";
        }
        else {//发送密码后返回
            $("btnStep2").disabled = "disabled";
            var para = "Action=GetEmail&Email=" + strEmail + "&ID=" + $("hidID").value;
            new Ajax.Request(
            $("form1").action,
	        {
	            method: "post",
	            parameters: para,
	            onSuccess: function (transport) {
	                var content = transport.responseText;
	                if (content == "OK") {
	                    window.location.href = "?Step=3";
	                }
	                else {
	                    $("spnEmail").innerHTML = "< " + content;
	                    $("spnEmail").className = "fRed";
	                    $("btnStep2").disabled = "";
	                }
	            }
	        });
        }
    }
    return false;
}
function txtFocus(e) {
    $(e.id.replace(/txt/, "spn")).innerHTML = "";
}
window.onload = function () {
    if ($("txtAccount") != null)
        $("txtAccount").focus();
    if ($("txtEmail") != null)
        $("txtEmail").focus();
}
