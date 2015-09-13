
function SubmitForm()
{
	var IsVal = true;
	InputTextStrip();//过滤文本框空格
   if ($("txtContents").value.empty() || $("txtContents").value.strip() == $("txtContents").getAttribute("msg"))
    {
       alert("您还未填写您的意见与建议内容!");
       IsVal=false; 
   }
    if (IsVal) 
	{
        $("btnSave").disabled = "disabled";
        var sp = "Action=SaveAdvance";
        sp+="&Contents="+$("txtContents").value;
        sp+="&Email="+$("txtEmail").value;
        sp+="&tel="+$("contactPhone").value;
        sp+="&type=sms_SysAdvance";
		var para = sp;//如果文本框的值没有发生改变就不提交
        //Ajax提交表单元素
        new Ajax.Request(
        ServiceUrl(),
        {
	        method:"post",
	        parameters:para,

	        onFailure:function(){
	            try{parent.ShowAlert(false,false,"提交数据时异常.");}catch(e){} 
	            $("btnSave").disabled = "";
	        },
	        onSuccess:function(transport)
	        {
		        var content = transport.responseText;
		        if (Logout(content))
	            { 
		            if (content == "OK")
		            {   
		                    SetBack($("btnSave"), "Reconfirm()");	  
		                    try{parent.ShowAlert(true,true,"提交数据成功");}catch(e){}
		            }
		            else
		            {
			            try{parent.ShowAlert(false,false,"提交数据失败." + content);}catch(e){}
			            $("btnSave").disabled = ""; 
		            }
		            $("btnSave").disabled = "";
		        }  
	        } 
        });
	}

}


function Reconfirm()
{
  window.location.href ="AdvanceList.php?type=sms_AdvanceList";
}