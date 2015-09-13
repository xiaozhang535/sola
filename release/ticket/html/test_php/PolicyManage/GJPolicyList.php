<?php
#req: http://www.380747.com/PolicyManage/GJPolicyList.aspx?Action=GetList&Page=1&callback=jQuery11110604594005504623_1437061376820&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType=&_=1437061376821
#rsp: PolicyManage/GJPolicyList_json.html

include 'InitPolicyList.php';
include 'Public.php';
judge_auth();

$arr_req=get_req();
#printf("REQUEST_METHOD: ".$_SERVER['REQUEST_METHOD']."\n");
#print_r($_GET);
#error_log("$g_today query now_running error. ".$arr_req["Action"]."\n",3,'/tmp/errors.log');
if($arr_req["Action"]==null)
{
    if($arr_req["Page"]!=null)
    {
        print get_html($arr_req["Page"]);
    }
    else
    {
        print get_html(1);
    }
}
else if($arr_req["Action"]=="Auditing")
{
    if($arr_req["ID"]==null || $arr_req["ID"]==""
        || $arr_req["Type"]==null || $arr_req["Type"]=="")
    {
        echo "NO";
        exit();
    }
    $arr_id=split ('[,]', $arr_req["ID"]);
    $ids="";
    for ($j = 0; $j < count($arr_id); $j++)
    {
        if($ids!="")
        {
            $ids.=",";
        }
        $ids.="\"".$arr_id[$j]."\"";
    }
    $mysqli = sql_connect();
    $sql="update strategy set isauditing='".$arr_req["Type"]."' where id in ($ids)";
    #echo $sql;
    #exit();
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        error_log("$g_today update strategy error. ".$mysqli->error."\n",3,'./errors.log');
        printf("$g_today update strategy error. ".$mysqli->error."\n");
        exit();
    }
    $mysqli->close();
    #printf("OK");
    save_luaconf();
}
else if($arr_req["Action"]=="GetList")
{
    $pageidx=intval($arr_req["Page"]);
    $callback=$arr_req["callback"];

    $mysqli = sql_connect();

    #get all account id in same company
    $sql="select id from user where company_id in (select company_id from user where id='".$_SESSION["user_id"]."')";
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        printf("$g_today query user error. ".$mysqli->error."\n");
        exit();
    }
    $ids="";
    while($row = $result->fetch_array())
    {
        if($ids!="")
        {
            $ids.=",";
        }
        $ids.=$row["id"];
    }
    $result->close();

    $sql="select count(*) count from strategy where account_id in ($ids)";
    $count=0;
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
        printf("$g_today query now_running error. ".$mysqli->error."\n");
        exit();
    }
    if($row = $result->fetch_array())
    {
        $count=$row["count"];
    }
    else
    {
        error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
        printf("$g_today query now_running error. ".$mysqli->error."\n");
        exit();
    }
    $result->close();
    #printf("$g_today count: $count\n");
    $arr_result=array();
    $arr_result["ret"]="OK";
    if($count==0)
    {
        printf($callback."(".json_encode($arr_result).")");
        $mysqli->close();
        exit();
    }
    $recodecount=10;
    $pagecount=intval($count/$recodecount)+($count%$recodecount!=0?1:0);
    $page="<div class='page'><ul>";
    #head
    $pagedisplay=0;
    if($pageidx>6)
    {
        $pagedisplay++;
        $page.="<li><a href='GJPolicyList.php?Page=".($pageidx-1)."&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType=' class='ft'>上一页</a></li>";
        $page.="<li><a href='GJPolicyList.php?Page=1&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType='>1...</a></li>";
    }
    #middle
    $idx=($pageidx-5)>0?($pageidx-5):1;
    for(; $idx<=$pageidx; $idx++)
    {
        $pagedisplay++;
        $page.="<li><a href='GJPolicyList.php?Page=$idx&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType='".($idx==$pageidx?" class='sa'":"").">$idx</a></li>";
    }
    #tail
    #if($pageidx+4<$pagecount-$pagedisplay)
    {
        #for($idx=$pageidx+1; $idx<$pageidx+4; $idx++)
        $idx=$pageidx+1;
        $i=1;
        for(; $idx<=$pagecount && $i<=10-$pagedisplay; $idx++,$i++)
        {
            $page.="<li><a href='GJPolicyList.php?Page=$idx&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType='".($idx==$pageidx?" class='sa'":"").">$idx</a></li>";
        }
        if($i+$pagedisplay>=10 && $idx<=$pagecount && 10<$pagecount)
        {
            $page.="<li><a href='GJPolicyList.php?Page=$pagecount&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType=' >$pagecount...</a></li>";
        }
        if($pageidx<$pagecount)
        {
            $page.="<li><a href='GJPolicyList.php?Page=".($pageidx+1)."&Platform=&Carrier=&PolicyID=&Flag=&DepName=&ArrName=&DepArea=&ArrArea=&DepCity=&ArrCity=&ProName=&Provider=&Share=&Office=&Auditing=&Record=&Asc=0&AscName=Updatetime&TicketFrom=&TicketTo=&GoFrom=&GoTo=&TicketType=' class='ft'>下一页</a></li>";
        }
    }
    $page.="</ul></div>";
    $arr_result["page"]=$page;

    $limit=($pageidx-1)*$recodecount;
    $sql="select s.id strategy_id,s.*,u.*,o.* from strategy s left join user u on s.account_id=u.id left join company c on u.company_id=c.id left join officegroup o on s.officegroupid=o.officegroupid where s.account_id in ($ids) limit $limit,$recodecount";
    $count=0;
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
        printf("$g_today query now_running error. ".$mysqli->error."\n");
        exit();
    }
    $arr_result["list"]=array();
    while($row = $result->fetch_array())
    {
        array_push($arr_result["list"], create_strategy_item($row));
    }
    printf($callback."(".json_encode($arr_result).")");
    $result->close();
    $mysqli->close();
}
else if($arr_req["Action"]=="Delete")
{
    #req: Action=Delete&ID=AA00373524
    #rsp: OK
    if($arr_req["ID"]==null && !array_key_exists("ID",$arr_req))
    {
        printf("id is null\n");
        exit();
    }
    $arr_id=split ('[,]', $arr_req["ID"]);
    $ids="";
    for ($j = 0; $j < count($arr_id); $j++)
    {
        if($ids!="")
        {
            $ids.=",";
        }
        $ids.="\"".$arr_id[$j]."\"";
    }
    $mysqli = sql_connect();
    $sql="delete from strategy where id in ($ids)";
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        result_no("$g_today query now_running error. ".$mysqli->error);
        exit();
    }
    echo "OK";
    #$arr_result=array();
    #result_ok($arr_result);
    exit();
}
?>
