// Java Document
function L_calendar(){}
L_calendar.prototype={
    _VersionInfo:"Version:1.0&#13;作者: lingye",
    Moveable:true,
    NewName:"",
    insertId:"",
    ClickObject:null,
    InputObject:null,
	IsDouble:true,//代表是否是双日历控件，默认true
	AllEnable:false,//代表是否所有的日期都能有效，默认false
    InputDate:null,
    IsOpen:false,
    MouseX:0,
    MouseY:0,
    GetDateLayer:function(){
//        if (parent.window.L_DateLayer != null)
//        {
//            alert('aaa');
//            return  parent.window.L_DateLayer;
//        }
//        else
//        {
//            alert('bbb');
            return window.L_DateLayer;
//        }
    },
    L_TheYear:new Date().getFullYear(), //定义年的变量的初始值
	L_TheYearT:new Date().getFullYear(), //定义年的变量的初始值
    L_TheMonth:new Date().getMonth()+1,//定义月的变量的初始值
	L_TheMonthT:new Date().getMonth()+1,//定义月的变量的初始值
    L_WDay:new Array(39),//定义写日期的数组
	L_WDayT:new Array(39),//定义写日期的数组
    MonHead:new Array(31,28,31,30,31,30,31,31,30,31,30,31),               //定义阳历中每个月的最大天数
    GetY:function(){
        var obj = this.InputObject;
        if(obj!=null){
            var y = obj.offsetTop;
            while (obj = obj.offsetParent) y += obj.offsetTop;
            return y;}
        else{return 0;}
        },
    GetX:function(){
        var obj = this.InputObject;
        if(obj!=null){
            var y = obj.offsetLeft;
            while (obj = obj.offsetParent) y += obj.offsetLeft;
            return y;}
        else{return 0;}
        },
    CreateHTML:function(){
        var htmlstr="";
		var strR = this.IsDouble ? "" : "<b>&gt;</b>";
        htmlstr+="<div id=main>\r\n";
/*第一个日历*/
		htmlstr+="<div id=\"L_calendar\">\r\n";
        htmlstr+="<span id=\"SelectYearLayer\" style=\"z-index: 10;position: absolute;top: 3; left: 19;display: none\"></span>\r\n";
        htmlstr+="<span id=\"SelectMonthLayer\" style=\"z-index: 10;position: absolute;top: 3; left: 78;display: none\"></span>\r\n";
        htmlstr+="<div id=\"L_calendar-year-month\"><div id=\"L_calendar-PrevM\" onclick=\"parent."+this.NewName+".PrevM()\" title=\"前一月\"><b>&lt;</b></div><div id=\"L_calendar-year\"></div><div id=\"L_calendar-month\"></div><div id=\"L_calendar-NextM\" onclick=\"parent."+this.NewName+".NextM()\" title=\"后一月\">"+strR+"</div></div>\r\n";
        htmlstr+="<div id=\"L_calendar-week\"><ul onmouseup=\"StopMove()\"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div>\r\n";
        htmlstr+="<div id=\"L_calendar-day\">\r\n";
        htmlstr+="<ul>\r\n";
        for(var i=0;i<this.L_WDay.length;i++){
            htmlstr+="<li id=\"L_calendar-day_"+i+"\" style=\"background-color:#FFFFFF\" onmouseover=\"this.style.background='#CCCCCC'\" onmouseout=\"this.style.background='#FFFFFF'\"></li>\r\n";
            }
        htmlstr+="</ul>\r\n";
        htmlstr+="<span id=\"L_calendar-today\" onclick=\"parent."+this.NewName+".Today()\"><b>Today</b></span>\r\n";
        htmlstr+="</div>\r\n</div>\r\n";
/*第一个结束*/
		if (this.IsDouble)
		{/*第二个日历*/
			htmlstr+="<div id=\"L_calendarT\">\r\n";
			htmlstr+="<span id=\"SelectYearLayerT\" style=\"z-index: 10;position: absolute;top: 3; left: 177;display: none\"></span>\r\n";
			htmlstr+="<span id=\"SelectMonthLayerT\" style=\"z-index: 10;position: absolute;top: 3; left: 236;display: none\"></span>\r\n";
			htmlstr+="<div id=\"L_calendar-year-monthT\"><div id=\"L_calendar-PrevMT\" onclick=\"parent."+this.NewName+".PrevM()\" title=\"前一月\"></div><div id=\"L_calendar-yearT\" ></div><div id=\"L_calendar-monthT\" ></div><div id=\"L_calendar-NextMT\" onclick=\"parent."+this.NewName+".NextM()\" title=\"后一月\"><b>&gt;</b></div></div>\r\n";
			htmlstr+="<div id=\"L_calendar-weekT\"><ul onmouseup=\"StopMove()\"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div>\r\n";
			htmlstr+="<div id=\"L_calendar-dayT\">\r\n";
			htmlstr+="<ul>\r\n";
			for(var i=0;i<this.L_WDayT.length;i++){
				htmlstr+="<li id=\"L_calendar-dayT_"+i+"\" style=\"background-color:#FFFFFF\" onmouseover=\"this.style.background='#CCCCCC'\" onmouseout=\"this.style.background='#FFFFFF'\"></li>\r\n";
				}
			htmlstr+="</ul>\r\n";
			htmlstr+="</div>\r\n</div>\r\n";
		/*第二个结束*/
		}

        htmlstr+="</div>\r\n";
        htmlstr+="<scr" + "ipt type=\"text/javas" + "cript\">\r\n";
        htmlstr+="var MouseX,MouseY;";
        htmlstr+="var Moveable="+this.Moveable+";\r\n";
        htmlstr+="var MoveaStart=false;\r\n";
        htmlstr+="document.onmousemove=function(e)\r\n";
        htmlstr+="{\r\n";
        htmlstr+="var DateLayer=parent.document.getElementById(\"L_DateLayer\");\r\n";
        htmlstr+="    e = window.event || e;\r\n";
        htmlstr+="var DateLayerLeft=DateLayer.style.posLeft || parseInt(DateLayer.style.left.replace(\"px\",\"\"));\r\n";
        htmlstr+="var DateLayerTop=DateLayer.style.posTop || parseInt(DateLayer.style.top.replace(\"px\",\"\"));\r\n";
        htmlstr+="if(MoveaStart){DateLayer.style.left=(DateLayerLeft+e.clientX-MouseX)+\"px\";DateLayer.style.top=(DateLayerTop+e.clientY-MouseY)+\"px\"}\r\n";
        htmlstr+=";\r\n";
        htmlstr+="}\r\n";
        
        htmlstr+="document.getElementById(\"L_calendar-week\").onmousedown=function(e){\r\n";
        htmlstr+="if(Moveable){MoveaStart=true;}\r\n";
        htmlstr+="    e = window.event || e;\r\n";
        htmlstr+=" MouseX = e.clientX;\r\n";
        htmlstr+=" MouseY = e.clientY;\r\n";
        htmlstr+="    }\r\n";
		
		if (this.IsDouble)
		{/*第二个日历*/
		    htmlstr+="document.getElementById(\"L_calendar-weekT\").onmousedown=function(e){\r\n";
            htmlstr+="if(Moveable){MoveaStart=true;}\r\n";
            htmlstr+="    e = window.event || e;\r\n";
            htmlstr+=" MouseX = e.clientX;\r\n";
            htmlstr+=" MouseY = e.clientY;\r\n";
            htmlstr+="    }\r\n";
        }
        
        htmlstr+="function StopMove(){\r\n";
        htmlstr+="MoveaStart=false;\r\n";
        htmlstr+="    }\r\n";
        htmlstr+="</scr"+"ipt>\r\n";
        var stylestr="";
        stylestr+="<style type=\"text/css\">";
        stylestr+="body{background:#fff;font-size:12px;margin:0px;padding:0px;text-align:left}\r\n";
		stylestr+="#main{width:320px;padding:0px;height:180px;z-index:9;text-align:center}\r\n";
        stylestr+="#L_calendar{width:158px;padding:0px;height:180px;z-index:9;text-align:center;float:left}\r\n";
        stylestr+="#L_calendar-year-month{height:23px;line-height:23px;z-index:9;}\r\n";
        stylestr+="#L_calendar-year{line-height:23px;width:60px;float:left;z-index:9;position: absolute;top: 3; left: 35;cursor:default}\r\n";
        stylestr+="#L_calendar-month{line-height:23px;width:48px;float:left;z-index:9;position: absolute;top: 3; left: 84;cursor:default}\r\n";
        stylestr+="#L_calendar-PrevM{position: absolute;top: 3; left: 5;cursor:pointer}";
        stylestr+="#L_calendar-NextM{position: absolute;top: 3; left: 145;cursor:pointer}";
        stylestr+="#L_calendar-week{height:23px;line-height:23px;z-index:9;}\r\n";
        stylestr+="#L_calendar-day{height:136px;z-index:9;}\r\n";
        stylestr+="#L_calendar-week ul{cursor:move;list-style:none;margin:0px;padding:0px;}\r\n";
        stylestr+="#L_calendar-week li{width:20px;height:20px;float:left;margin:1px;padding:0px;text-align:center;}\r\n";
        stylestr+="#L_calendar-day ul{list-style:none;margin:0px;padding:0px;}\r\n";
        stylestr+="#L_calendar-day li{cursor:pointer;width:20px;height:20px;float:left;margin:1px;padding:0px;}\r\n";
        stylestr += "#L_calendar-day font{color:#CCCCCC;font-family: Verdana, Arial, Helvetica, sans-serif; display:inline-block;width:18px;height:18px; padding-top:2px;}\r\n";
        stylestr+="#L_calendar-control{height:25px;z-index:9;}\r\n";
        stylestr+="#L_calendar-today{cursor:pointer;float:left;width:63px;height:20px;line-height:20px;margin:1px;text-align:center;display:none}";
        stylestr+="#L_calendarT{border-left:0px; width:158px;padding:0px;height:180px;z-index:9;text-align:center;float:left}\r\n";
        stylestr+="#L_calendar-year-monthT{height:23px;line-height:23px;z-index:9;}\r\n";
        stylestr+="#L_calendar-yearT{line-height:23px;width:60px;float:left;z-index:9;position: absolute;top: 3; left: 191;cursor:default}\r\n";
        stylestr+="#L_calendar-monthT{line-height:23px;width:48px;float:left;z-index:9;position: absolute;top: 3; left: 239;cursor:default}\r\n";
        stylestr+="#L_calendar-PrevMT{position: absolute;top: 3; left: 163;cursor:pointer}";
        stylestr+="#L_calendar-NextMT{position: absolute;top: 3; left: 303;cursor:pointer}";
        stylestr+="#L_calendar-weekT{height:23px;line-height:23px;z-index:9;}\r\n";
        stylestr+="#L_calendar-dayT{height:136px;z-index:9;}\r\n";
        stylestr+="#L_calendar-weekT ul{cursor:move;list-style:none;margin:0px;padding:0px;}\r\n";
        stylestr+="#L_calendar-weekT li{width:20px;height:20px;float:left;margin:1px;padding:0px;text-align:center;}\r\n";
        stylestr+="#L_calendar-dayT ul{list-style:none;margin:0px;padding:0px;}\r\n";
        stylestr+="#L_calendar-dayT li{cursor:pointer;width:20px;height:20px;float:left;margin:1px;padding:0px;}\r\n";
        stylestr += "#L_calendar-dayT font{color:#CCCCCC;font-family: Verdana, Arial, Helvetica, sans-serif; display:inline-block;width:18px;height:18px; padding-top:2px;}\r\n";
        stylestr+="#L_calendar-controlT{height:25px;z-index:9;}\r\n";
        stylestr+="#L_calendar-todayT{cursor:pointer;float:left;width:63px;height:20px;line-height:20px;margin:1px;text-align:center;}";
        stylestr+="</style>";
        var strLink = document.getElementById("linkSkin").href;
        var TempLateContent="<html>\r\n";
        TempLateContent+="<head>\r\n";
        TempLateContent+="<title></title>\r\n";
        TempLateContent+="<link href='"+strLink+"' type='text/css' rel='stylesheet' />\r\n";
        TempLateContent+=stylestr;
        TempLateContent+="</head>\r\n";
        TempLateContent+="<body>\r\n";
        TempLateContent+=htmlstr;
        TempLateContent+="</body>\r\n";
        TempLateContent+="</html>\r\n";
        this.GetDateLayer().document.writeln(TempLateContent);
        this.GetDateLayer().document.close();
        },
    InsertHTML:function(id,htmlstr){
        var L_DateLayer=this.GetDateLayer();
        if(L_DateLayer){L_DateLayer.document.getElementById(id).innerHTML=htmlstr;}
        },
    WriteHead:function (yy,mm) //往 head 中写入当前的年与月
    {
        this.InsertHTML("L_calendar-year",yy + " 年");
        this.InsertHTML("L_calendar-month",mm + " 月");
    },
	WriteHeadT:function (yy,mm) //往 head 中写入当前的年与月
    {
        this.InsertHTML("L_calendar-yearT",yy + " 年");
        this.InsertHTML("L_calendar-monthT",mm + " 月");
    },
    IsPinYear:function(year)            //判断是否闰平年
    {
        if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
    },
    GetMonthCount:function(year,month) //闰年二月为29天
    {
        var c=this.MonHead[month-1];if((month==2)&&this.IsPinYear(year)) c++;return c;
    },
    GetDOW:function(day,month,year)     //求某天的星期几
    {
        var dt=new Date(year,month-1,day).getDay()/7; return dt;
    },
    GetText:function(obj){
        if(obj.innerText){return obj.innerText}
        else{return obj.textContent}
        },
    PrevM:function() //往前翻月份
    {
        if(this.L_TheMonth>1){this.L_TheMonth--}else{this.L_TheYear--;this.L_TheMonth=12;}
        this.SetDay(this.L_TheYear,this.L_TheMonth);
    },
    NextM:function() //往后翻月份
    {
        if(this.L_TheMonth==12){this.L_TheYear++;this.L_TheMonth=1}else{this.L_TheMonth++}
        this.SetDay(this.L_TheYear,this.L_TheMonth);
    },
    Today:function() //Today Button
    {
        var today;
        this.L_TheYear = new Date().getFullYear();
        this.L_TheMonth = new Date().getMonth()+1;
        today=new Date().getDate();
        if(this.InputObject){
        this.InputObject.value=this.L_TheYear + "-" + this.L_TheMonth + "-" + today;
        }
        this.CloseLayer();
    },
    SetDay:function (yy,mm)   //主要的写程序**********
    {
        this.WriteHead(yy,mm);
        //设置当前年月的公共变量为传入值
        this.L_TheYear=yy;
        this.L_TheMonth=mm;
		
        var b=new Date(yy,mm-1,1);
		var a=new Date();
		
        for (var i = 0; i < 39; i++){this.L_WDay[i]=""} //将显示框的内容全部清空
        var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay(); //某月第一天的星期几
        for (i=0;i<firstday;i++)this.L_WDay[i]=this.GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1    //上个月的最后几天
        for (i = firstday; day1 < this.GetMonthCount(yy,mm)+1; i++){this.L_WDay[i]=day1;day1++;}//本月的日期
        for (i=firstday+this.GetMonthCount(yy,mm);i<39;i++){this.L_WDay[i]=day2;day2++}//剩余的空余部分
        for (i = 0; i < 39; i++)
        {
            var da=this.GetDateLayer().document.getElementById("L_calendar-day_"+i+"");
            var month,day;
            if (this.L_WDay[i]!="")
            { 
                if(i<firstday){
                    da.innerHTML="<font style=\"display:none;\" onclick=\"\">" + this.L_WDay[i] + "</font>";
                    month=(mm==1?12:mm-1);
                    day=this.L_WDay[i];
                }
                else if(i>=firstday+this.GetMonthCount(yy,mm)){
                    da.innerHTML="<font style=\"display:none;\"  onclick=\"\">" + this.L_WDay[i] + "</font>";
                    month=(mm==12?1:mm+1);
                    day=this.L_WDay[i];
                }
                else{
                    //month=(mm==1?12:mm);
                    month=mm;
                    day=this.L_WDay[i];
					
					if(((new Date().getFullYear()-yy)*356+(new Date().getMonth()+1-month)*31+(new Date().getDate()-day))>0)
					{
					    if( ((new Date().getFullYear())==yy-1) && (new Date().getMonth()+1==12) )
					    {
					        da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'F')\">" + this.L_WDay[i] + "</font>";
					    }
					    else
					    {
					        if (this.AllEnable)
					             da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'F')\">" + this.L_WDay[i] + "</font>";
					        else
                                da.innerHTML="<font onclick=\"\">" + this.L_WDay[i] + "</font>";
					    }
					}
					else{
				        da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'F')\">" + this.L_WDay[i] + "</font>";
					}
                }
                da.title=month+" 月"+day+" 日";
                da.style.background=(yy == new Date().getFullYear()&&month==new Date().getMonth()+1&&day==new Date().getDate())? "#CCCCCC":"#FFFFFF";
                if(this.InputDate!=null){
                    if(yy==this.InputDate.getFullYear() && month== this.InputDate.getMonth() + 1 && day==this.InputDate.getDate()){
                        da.style.background="#A5D1D1";
                    }
                }
              }
        }
			
		if (Number(mm)==12){
		    mm=1; 
		    yy=Number(yy)+1;
		}
		else{
		    mm=Number(mm)+1;
		}
		
		if (this.IsDouble)
		{/*第二个日历*/
		    this.WriteHeadT(yy,mm);
		    this.L_TheYearT=yy;
		    this.L_TheMonthT=mm;
		    //第二个月
		    for (var i = 0; i < 39; i++){this.L_WDayT[i]=""} //将显示框的内容全部清空
            var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay(); //某月第一天的星期几
            for (i=0;i<firstday;i++)this.L_WDayT[i]=this.GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1    //上个月的最后几天
            for (i = firstday; day1 < this.GetMonthCount(yy,mm)+1; i++){this.L_WDayT[i]=day1;day1++;}
            for (i=firstday+this.GetMonthCount(yy,mm);i<39;i++){this.L_WDayT[i]=day2;day2++}
            for (i = 0; i < 39; i++)
            {
                var da=this.GetDateLayer().document.getElementById("L_calendar-dayT_"+i+"");
                var month,day;
                if (this.L_WDayT[i]!="")
                { 
                    if(i<firstday){
                        da.innerHTML="<font style=\"display:none;\" onclick=\"\">" + this.L_WDayT[i] + "</font>";
                        month=(mm==1?12:mm-1);
                        day=this.L_WDayT[i];
                    }
                    else if(i>=firstday+this.GetMonthCount(yy,mm)){
                        da.innerHTML="<font style=\"display:none;\" onclick=\"\">" + this.L_WDayT[i] + "</font>";
                        month=(mm==12?1:mm+1);
                        day=this.L_WDayT[i];
                    }
                    else{
					    //month=(mm==1?12:mm);
                        month=mm;
                        day=this.L_WDayT[i];
					    if(((new Date().getFullYear()-yy)*356+(new Date().getMonth()+1-month)*31+(new Date().getDate()-day))>0)
					    {
						    if( ((new Date().getFullYear())==yy-1) && (new Date().getMonth()+1==12) )
						    {
                                da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'T')\">" + this.L_WDayT[i] + "</font>";
						    }
						    else
						    {
						        if (this.AllEnable)
						             da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'T')\">" + this.L_WDayT[i] + "</font>";
						        else
						        { 
						            da.innerHTML="<font onclick=\"\">" + this.L_WDayT[i] + "</font>";
						            if(document.all){
                                        da.onclick="";
                                    }
                                    else{
                                        da.setAttribute("onclick","");
                                    }
                                } 
						    }
				        }
				        else{
                            da.innerHTML="<font class=\"font\" onclick=\"parent."+this.NewName+".DayClick("+month+","+day+",'T')\">" + this.L_WDayT[i] + "</font>";
					    }
                    }
                    da.title=month+" 月"+day+" 日";
                    da.style.background=(yy == new Date().getFullYear()&&month==new Date().getMonth()+1&&day==new Date().getDate())? "#CCCCCC":"#FFFFFF";
                }
            }
        }
    },
    
    DayClick:function(mm,dd,flag) //点击显示框选取日期，主输入函数*************
    {
        var yy=this.L_TheYear;
        
        if( flag=="T" )
        {
            yy=this.L_TheYearT;
        }
        //判断月份，并进行对应的处理
        if(mm<1)
        {
            yy--;
            mm=12+mm;
        }
        else if(mm>12)
        {
            yy++;
            mm=mm-12;
        }
        if (mm < 10)
        {
            mm = "0" + mm;
        }
        if (this.ClickObject)
        {
            if (!dd)
            {
                return;
            }
            if ( dd < 10)
            {
                dd = "0" + dd;
            }
            this.InputObject.value= yy +"-"+ mm +"-"+ dd ; //注：在这里你可以输出改成你想要的格式
			this.InputObject.style.color="#000000";
            this.CloseLayer();
        }
        else
        {
            this.CloseLayer();
            alert("您所要输出的控件对象并不存在！");
        }
    },
    SetDate:function(){
        if (arguments.length < 1){alert("对不起！传入参数太少！");return;}
        else if (arguments.length > 4){alert("对不起！传入参数太多！");return;}
        this.InputObject = arguments[0];
        this.ClickObject= (arguments.length==1) ? arguments[0] : arguments[1];
		this.IsDouble=(arguments.length<3) ? true : arguments[2];  //代表是否为双日历控件，默认true
		this.AllEnable=(arguments.length<4) ? false : arguments[3];  //代表是否所有的日期都能有效，默认false
        var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
        var r = this.InputObject.value.match(reg); 
        if(r!=null){
            r[2]=r[2]-1; 
            var d= new Date(r[1], r[2],r[3]); 
            if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3]){
                this.InputDate=d;        //保存外部传入的日期
            }
            else this.InputDate="";
            this.L_TheYear=r[1];
            this.L_TheMonth=r[2]+1;
            }
        else{
            this.L_TheYear=new Date().getFullYear();
            this.L_TheMonth=new Date().getMonth() + 1
            }
        this.CreateHTML();
        var top=this.GetY();
        var left=this.GetX();
        var docW = document.documentElement.scrollWidth;
        var layerW = 0;
        var DateLayer=document.getElementById("L_DateLayer");
        DateLayer.style.top=top+this.ClickObject.clientHeight+5+"px";
        DateLayer.style.display="block";
        if(document.all){
            this.GetDateLayer().document.getElementById("L_calendar").style.width="160px";
            this.GetDateLayer().document.getElementById("L_calendar").style.height="180px"
			if (this.IsDouble){
			    layerW = 318;
			}
			else{
			    layerW = 160;
			}
        }
        else{
            this.GetDateLayer().document.getElementById("L_calendar").style.width="154px";
            this.GetDateLayer().document.getElementById("L_calendar").style.height="180px"
			DateLayer.style.height="182px";
			if (this.IsDouble){
				layerW = 315;
			}
			else{
				layerW = 156;
			}
        }
        DateLayer.style.width= layerW + "px";
        if (docW < (left + layerW))
        {
            left = docW - layerW;
        }
		DateLayer.style.left=left+"px";
        this.SetDay(this.L_TheYear,this.L_TheMonth);
        document.onclick=function(e)
        {
            e = window.event || e;
            var srcElement = e.srcElement || e.target;
            MyCalendar.CloseLayer(srcElement);
        }
    },
    CloseLayer:function(){
        try{
            var DateLayer=document.getElementById("L_DateLayer");
            if((DateLayer.style.display=="" || DateLayer.style.display=="block") && arguments[0]!=this.ClickObject && arguments[0]!=this.InputObject){
                DateLayer.style.display="none";
            }
        }
        catch(e){}
        }
    }
    
document.writeln('<iframe id="L_DateLayer" name="L_DateLayer" frameborder="0" scrolling="no" style="position:absolute;width:318px; height:185px;z-index:8;display:none;"></iframe>');
var MyCalendar=new L_calendar();
MyCalendar.NewName="MyCalendar";


