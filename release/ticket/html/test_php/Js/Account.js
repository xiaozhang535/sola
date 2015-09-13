function ShowQQ() {
    if ($("txtQQ").value.empty() || $("txtQQ").value == $("txtQQ").getAttribute("msg")) {
        $("lblQQ").hide();
        $("lblShow").hide();
        $("spnQQ").innerHTML = "";
        return;
    }
}

window.onload = function () {//所有文本框加入焦点方法
    $("txtRealName").onfocus = function () { txtFocus(this); }
    $("txtQQ").onfocus = function () { txtFocus(this); inputfocus(this); }
    $("txtQQ").onblur = function () { inputblur(this); ShowQQ(); }
    $("txtMobile").onfocus = function () { txtFocus(this); }
    $("txtTel").onfocus = function () { txtFocus(this); }
    $("txtEmail").onfocus = function () { txtFocus(this); }
}

function ResetForm() {//重置表单，并清空错误信息
    $('form1').reset();
    $("spnRealName").innerHTML = "";
    $("spnQQ").innerHTML = "";
    $("spnMobile").innerHTML = "";
    $("spnTel").innerHTML = "";
    $("spnEmail").innerHTML = "";
}

function SubmitForm()
{//提交表单时对元素判断
	var IsVal = true;
	InputTextStrip();//过滤文本框空格
    if ($("txtRealName").value.empty())
    {
        $("spnRealName").innerHTML = "< 您还没有填写真实姓名！";
		IsVal = false;
    } 
	if ($("txtRealName").value.length > 20)
    {
        $("spnRealName").innerHTML = "< 真实姓名的最大字符长度为20位！";
		IsVal = false;
    }
    if ($("txtEmail").value.empty()) {
        $("spnEmail").innerHTML = "< 您还没有帐号的邮箱！";
        IsVal = false;
    } else if ($("txtEmail").value.length > 50) {
        $("spnEmail").innerHTML = "< 邮箱的最大字符长度为50位！";
        IsVal = false;
    } else if (!ValEmail($("txtEmail").value)) {
        $("spnEmail").innerHTML = "< 请输入正确的邮箱格式(例: hangyi@qq.com)！";
        IsVal = false;
    }

    if ($("txtMobile").value.empty() && $("txtTel").value.empty())
    {
        $("spnMobile").innerHTML = "< 联系手机和电话任意填写一项！";
		IsVal = false;
    } 
	if (!$("txtMobile").value.empty() && !ValMobile($("txtMobile").value))
    {
        $("spnMobile").innerHTML = "< 请输入正确的手机格式！";
		IsVal = false;
    }
	if ($("txtQQ").value.length > 1024)
    {
        $("spnQQ").innerHTML = "< QQ在线代码的最大字符长度为1024位！(当前字数"+$("txtQQ").value.length+")";
		IsVal = false;
    }
	if (IsVal)
	{
        $("btnSave").disabled = "disabled";
        try{parent.Loading("正在保存数据,请稍候...")}catch(e){}
        var sp = "Action=SaveAccount&ID=" + $("hidID").value;
		var para = sp;//如果文本框的值没有发生改变就不提交
		para += AddParameter("RealName");
        para += AddParameter("Email");
        para += AddParameter("Mobile");
        para += AddParameter("Tel");
        var strQQ = $("txtQQ").value == $("txtQQ").getAttribute("msg") ? "" : $("txtQQ").value;
        if (strQQ != $("txtQQ").getAttribute("text"))
            para += "&QQ=" + encodeURIComponent(strQQ);
        if (para == sp)
        {
			try{parent.Loading("保存数据成功."); parent.CloseLoading(2000);}catch(e){}
			$("btnSave").disabled = "";  
			return;
        }
        //Ajax提交表单元素
        new Ajax.Request(
        ServiceUrl(),
        {
	        method:"post",
	        parameters:para,
	        onFailure:function(){
	            try{parent.Loading("保存数据时异常.", false); parent.CloseLoading(2000); $("btnSave").disabled = ""; }catch(e){} 
	        },
	        onSuccess:function(transport)
	        {
		        var content = transport.responseText;
		        if (Logout(content))
	            { 
		            if (content == "OK")
		            {//将文本框的text属性置为新的更新数据，以便下次判断
		                try{parent.Loading("保存数据成功."); parent.CloseLoading(2000);}catch(e){}
                        $("txtRealName").setAttribute("text", $("txtRealName").value);
                        $("txtQQ").setAttribute("text", $("txtQQ").value);
                        $("txtMobile").setAttribute("text", $("txtMobile").value);
                        $("txtTel").setAttribute("text", $("txtTel").value);
                        $("txtEmail").setAttribute("text", $("txtEmail").value);
		            }
		            else
		            {
			            try{parent.Loading("保存数据失败." + content); parent.CloseLoading(3000);}catch(e){}
		            }
		            $("btnSave").disabled = ""; 
		        } 
	        } 
        });
	}
}

function ShowPassword() {
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "450";
    objFloat.height = "265";
    objFloat.title = "修改登录密码";
    objFloat.mode = "frame";
    objFloat.url = "/SystemManage/Frame/UserPassword.php";
    objFloat.open();
}