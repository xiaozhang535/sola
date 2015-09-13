//RadioButton事件
function RadioClick(e)
{
    if (e.className.endsWith("ico30"))
    {
        var idInfo = e.id.substr(3); 
        var name = e.getAttribute("name");
        var group = name.substr(3);
        $$('img[name="' + name + '"]').each(function (d) {
            if (!d.className.endsWith("ico83")) {
                d.className = "icodiv ico30"
            }
        });
        e.className = "icodiv ico31";
        $("form1").getInputs('radio', group).each(function(d){d.checked = "";});
        $(idInfo).checked = "checked";
    }
}
function SelectedRadio(group)
{
    var obj;
    $("form1").getInputs("radio",group).each(function(d){
        if (d.checked)
        {
            obj = d;
            throw $break;
        }
    })
    return obj;
}
//CheckBox事件
function CheckBoxClick(e)
{
    var idInfo = e.id.substr(3); 
    if (e.className.endsWith("ico32"))
    {
        e.className = "icodiv ico33"; 
        $(idInfo).checked = "checked";
    } 
    else if (e.className.endsWith("ico33"))
    {
        e.className = "icodiv ico32"; 
        $(idInfo).checked = "";
    } 
    else
        return false;  
}
//针对自定义的CheckBox
function SelectedCheckBoxValue(group)
{
    var str = "";
    $("form1").getInputs("checkbox",group).each(function(d){
        if (d.title == "false" && d.checked)
        {
            str += "," + d.value;
        }
    })
    if (!str.empty())
        str = str.substr(1);  
    return str;
}
//针对原始的CheckBox
function CheckBoxSelectedValue(group)
{
    var str = "";
    $("form1").getInputs("checkbox",group).each(function(d){
        if (d.checked)
        {
            str += "," + d.value;
        }
    })
    if (!str.empty())
        str = str.substr(1);  
    return str;
}
//CheckBox的Enable
function CheckBoxEnable(e, t)
{
    if (!t)
    { 
        $("img" + e.id).className = "icodiv ico34";
        $("spn" + e.id).className = "inputspan fGray";
        e.title = "true";
    }
    else
    {
        $("img" + e.id).className = e.checked ? "icodiv ico33" : "icodiv ico32";
        $("spn" + e.id).className = "hand inputspan";
        e.title = "false";
    } 
}
//CheckBox的Enable
function CheckBoxChecked(e, t)
{
    e.checked = t; 
    $("img" + e.id).className = e.checked ? "icodiv ico33" : "icodiv ico32";
}
//当焦点时清空错误信息
function txtFocus(e)
{
	$(e.id.replace(/txt/,"spn")).innerHTML = "";
	e.select();
}
//当焦点时去掉提示语
function inputfocus(e) {
	e.style.color='#000000';
	if(!e.value.strip().empty() && e.value.strip() != e.getAttribute("msg"))
	{e.select();}
	else
	{e.value = "";}
}
//当失去焦点未更改时，恢复提示语
function inputblur(e,val){
    if (e.value.strip().empty()) {
        e.style.color = '#999999';
        e.value = e.getAttribute("msg");
        if (val != null)
            $(e.id.replace("Text", "")).value = val; //只适用与下拉列表的初始化
    }
    else if (e.value != e.getAttribute("msg")) {
        e.style.color = '#000000';
    }
}
//当加载时，提示语置灰
function inputonload(e){
	if(e.value== e.getAttribute("msg"))
	{e.style.color='#999999';}
}
//把表单中的text文本框的值都过滤空格
function InputTextStrip()
{
    if ($("form1") != null)
    { 
        $("form1").getInputs("text").each(function(d){
            d.value = d.value.strip();
        });
    }
}
//提交表单组成参数
function AddParameter(strName)
{
    para = "";
    if ($("txt"+ strName).value != $("txt"+ strName).getAttribute("text"))
            para = "&"+ strName +"=" + $("txt"+ strName).value;     
    return para;
}

function FormReset()
{
    $$("img.ico30").each(function(d){
        if ($(d.id.replace("img","")).checked)
        {
            RadioClick(d);
        }
    });
    $$("img.ico32").each(function(d){
        if ($(d.id.replace("img","")).checked)
        {
            CheckBoxClick(d);
        }
    }); 
    $$("img.ico33").each(function(d){
        if (!$(d.id.replace("img","")).checked)
        {
            CheckBoxClick(d);
        }
    });  
}

//Ajax提交表单元素,只适用于浮动窗框架内的表单提交保存数据
function AjaxSumbit(Parameter,BackValue)
{
    $("btnSave").disabled = "disabled";
    try{parent.LoadImg(true,"正在保存")}
    catch(e){}
    new Ajax.Request(
    ServiceUrl(),
    {
        method:"post",
        parameters:Parameter,
        onFailure:function(){
            try{parent.ShowAlert(false,false,"保存数据时异常.");}catch(e){} 
            $("btnSave").disabled = "";  
        },
        onSuccess:function(transport)
        {
	        var content = transport.responseText;
	        if (Logout(content))
	        {
	            if (content == "OK")
	            {//将文本框的text属性置为新的更新数据，以便下次判断
	                try { parent.ShowAlert(true, true, null, BackValue); } catch (e) { } 
	                $("btnSave").disabled = "";
	            }
	            else
	            {
		            try{parent.ShowAlert(false,false,"保存数据失败." + content);}catch(e){}
		            $("btnSave").disabled = ""; 
	            }
	        }
        } 
    });
}

function ShowLog(strOrderID)
{
    parent.objFloatDiv = new parent.FloatDiv();
    parent.objFloatDiv.name = "objFloatDiv";
    var objFloat = parent.objFloatDiv;
    objFloat.width = "480";
    objFloat.height = "350";  
    objFloat.title="操作记录 - " + strOrderID;
    objFloat.mode="frame";
    objFloat.url = "/OrderManage/Frame/OrderLogList.php?OrderID="+strOrderID; 
    objFloat.open();
}