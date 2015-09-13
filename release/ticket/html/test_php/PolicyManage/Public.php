<?php
$lifetime = 86400; //sec
session_set_cookie_params($lifetime);
ini_set('session.save_path','/tmp'); //auth
session_start(); 
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
$g_today = date("Y-m-d H:i:s");
$g_configs=parse_ini_file("/root/ticket_src/release/ticket/html/test_php/config.ini", true);
function create_strategy_edit_item($row)
{
    $arr_item=array();
    $arr_item["id"]=$row["strategy_id"];
    $arr_item["account"]=$row["user"];
    $arr_item["updatetime"]=$row["update_time"];
    $arr_item["carrier"]=$row["carrier"];
    $arr_item["carriersame"]=$row["carriersame"];
    $arr_item["officeprovider"]=$row["officeprovider"];
    $arr_item["officeticket"]=$row["officeticket"];
    $arr_item["tickettype"]=$row["tickettype"];
    $arr_item["ticketauditing"]=$row["ticketauditing"]=="True"?true:false;
    $arr_item["pcc"]=$row["pcc"];
    $arr_item["validplace"]=$row["validplace"];
    $arr_item["adutype"]=$row["adutype"];
    $arr_item["chdway"]=$row["chdway"];
    $arr_item["deplimit"]=$row["deplimit"];//=="True"?true:false;
    $arr_item["depcity"]=$row["depcitys"];
    $arr_item["deparea"]=$row["deparea"];
    $arr_item["arrlimit"]=$row["arrlimit"];//=="True"?true:false;
    $arr_item["arrcity"]=$row["arrcitys"];
    $arr_item["arrarea"]=$row["arrarea"];
    $arr_item["backlimit"]=$row["backlimit"];//=="True"?true:false;
    $arr_item["backcity"]=$row["backcitys"];
    $arr_item["backarea"]=$row["backarea"];
    $arr_item["changegncity"]="";//tmp
    $arr_item["changegjcity"]="";//tmp
    $arr_item["changecitys"]=$row["changecitys"];
    $arr_item["flightsgo"]=$row["flightsgo"];
    $arr_item["flightsback"]=$row["flightsback"];
    $arr_item["flightsnone"]=$row["flightsnone"];
    $arr_item["voyagenone"]=$row["voyagenone"];
    $arr_item["person"]=$row["personnum"];//==0?"人数:无限制":"";
    $arr_item["years"]=$row["yearsfrom"];//($row["yearsfrom"]==0&&$row["yearsto"]==0)?"年龄:无限制":"";
    $arr_item["record"]=$row["record"];//==2?"换编码出票":"";
    $arr_item["recordoffice"]="";// tmp
    $arr_item["discountnone"]=$row["discountnone"];
    $arr_item["mixberth"]=$row["mixberth"];//==1?"取1/2值":"取较小值";
    $arr_item["mixseason"]=$row["mixseason"];//==1?"取1/2值":"取较小值";
    $arr_item["mixsb"]=$row["mixsb"];//==1?"取1/2值":"取较小值";
    $arr_item["mixbase"]=$row["mixbase"];//==1?"取较大值":($row["mixbase"]==2?"取较小值":"取1/2值");
    $arr_item["addon"]=$row["addon"];//==1?"不限定":"";
    $arr_item["spa"]=$row["spa"];//==1?"不限定":"";
    $arr_item["voyagetype"]=$row["voyagetype"];//==1?"1":($row["voyagetype"]==2?"仅限单程":"仅限往返");
    $arr_item["nonstop"]=$row["nonstop"]=="True"?true:false;
    $arr_item["carrieridentity"]=$row["carrieridentity"]=="True"?true:false;
    $arr_item["other"]=$row["other"]==""?"无":"";
    $arr_item["remark"]=$row["remark"];
    $arr_item["officegroupid"]=$row["officegroupid"];
    $arr_item["isauditing"]=$row["isauditing"]=="True"?true:false;
    $arr_item["companyid"]=$row["company_id"];
    $arr_item["pricemin"]=$row["pricemin"];//==0?"必须高于 1000 元":"";
    $arr_item["ruleid"]=$row["ruleid"];
    $arr_item["comname"]=$row["comname"]==""?"深圳环游天下":"";
    $arr_item["officeenable"]=$row["officeenable"]=="True"?true:false;
    $arr_item["officename"]=$row["officename"];
    $arr_item["flag"]=$row["flag"];
    $arr_item["recordlimt"]=$row["recordlimt"];
    $arr_item["iswork"]=$row["iswork"]=="True"?true:false;
    $arr_item["worktime"]=$row["worktime"]==""?"一,二,三,四,五,六,日,节日,08:30至18:00":$row["worktime"];
    $arr_item["aheadday"]=$row["aheadday"];
    $arr_item["sharequnar"]=$row["sharequnar"]=="True"?true:false;

    $arr_item["itinerary"]=array();
    $arr_item["itinerary"]["abled"]="0";
    $arr_item["itinerary"]["byway"]="0";
    $arr_item["itinerary"]["free"]="0";
    $arr_item["itinerary"]["pay"]="0";
    $arr_item["itinerary"]["fareway"]="0";
    $arr_item["itinerary"]["fare"]="0";
    $arr_item["datelist"]=json_decode($row["dategroup"]);
    return $arr_item;

}
function create_strategy_item($row)
{
    $arr_item=array();
    $arr_item["id"]=$row["strategy_id"];
    $arr_item["account"]=$row["user"];
    $arr_item["updatetime"]=$row["update_time"];
    $arr_item["carrier"]=$row["carrier"];
    $arr_item["carriersame"]=$row["carriersame"];
    $arr_item["officeprovider"]=$row["officeprovider"];
    $arr_item["officeticket"]=$row["officeticket"];
    $arr_item["tickettype"]=$row["tickettype"];
    $arr_item["ticketauditing"]=$row["ticketauditing"]=="True"?"需审核后出票":"无需审核出票";
    $arr_item["pcc"]=$row["pcc"];
    $arr_item["validplace"]=$row["validplace"]==1?"查询伽利略价格之前":"查询伽利略价格之后";
    $arr_item["adutype"]=$row["adutype"]==101?"一般成人":"";
    $arr_item["chdway"]=$row["chdway"]==2?"指定奖励":"";
    $arr_item["deplimit"]=$row["deplimit"]=="True"?true:false;
    $arr_item["depcitys"]=$row["depcitys"];
    $arr_item["deparea"]=$row["deparea"];
    $arr_item["arrlimit"]=$row["arrlimit"]=="True"?true:false;
    $arr_item["arrcitys"]=$row["arrcitys"];
    $arr_item["arrarea"]=$row["arrarea"];
    $arr_item["backlimit"]=$row["backlimit"]=="True"?true:false;
    $arr_item["backcitys"]=$row["backcitys"];
    $arr_item["backarea"]=$row["backarea"];
    $arr_item["changecitys"]=$row["changecitys"];
    $arr_item["flightsgo"]=$row["flightsgo"];
    $arr_item["flightsback"]=$row["flightsback"];
    $arr_item["flightsnone"]=$row["flightsnone"];
    $arr_item["voyagenone"]=$row["voyagenone"];
    $arr_item["person"]=$row["personnum"]==0?"人数:无限制":"";
    $arr_item["years"]=($row["yearsfrom"]==0&&$row["yearsto"]==0)?"年龄:无限制":"";
    $arr_item["record"]=$row["record"]==2?"换编码出票":"";
    $arr_item["discountnone"]=$row["discountnone"];
    $arr_item["mixberth"]=$row["mixberth"]==1?"取1/2值":"取较小值";
    $arr_item["mixseason"]=$row["mixseason"]==1?"取1/2值":"取较小值";
    $arr_item["mixsb"]=$row["mixsb"]==1?"取1/2值":"取较小值";
    $arr_item["mixbase"]=$row["mixbase"]==1?"取较大值":($row["mixbase"]==2?"取较小值":"取1/2值");
    $arr_item["addon"]=$row["addon"]==1?"不限定":"";
    $arr_item["spa"]=$row["spa"]==1?"不限定":"";
    $arr_item["voyagetype"]=$row["voyagetype"]==1?"1":($row["voyagetype"]==2?"仅限单程":"仅限往返");
    $arr_item["other"]=$row["other"]==""?"无":"";
    $arr_item["remark"]=$row["remark"];
    $arr_item["isauditing"]=$row["isauditing"]=="True"?true:false;
    $arr_item["companyid"]=$row["company_id"];
    $arr_item["pricemin"]=$row["pricemin"]==0?"必须高于 1000 元":"";
    $arr_item["ruleid"]=$row["ruleid"];
    $arr_item["comname"]=$row["comname"]==""?"深圳环游天下":"";
    $arr_item["officeenable"]=$row["officeenable"]=="True"?true:false;
    $arr_item["officename"]=$row["officename"];
    $arr_item["flag"]=$row["flag"];
    $arr_item["recordlimt"]=$row["recordlimt"];
    $arr_item["iswork"]=$row["iswork"]=="True"?true:false;
    $arr_item["worktime"]=$row["worktime"]==""?"一,二,三,四,五,六,日,节日,08:30至18:00":$row["worktime"];
    $arr_item["aheadday"]=$row["aheadday"];
    $arr_item["sharequnar"]=$row["sharequnar"]=="True"?true:false;

    $arr_item["itinerary"]=array();
    $arr_item["itinerary"]["abled"]="0";
    $arr_item["itinerary"]["byway"]="0";
    $arr_item["itinerary"]["free"]="0";
    $arr_item["itinerary"]["pay"]="0";
    $arr_item["itinerary"]["fareway"]="0";
    $arr_item["itinerary"]["fare"]="0";
    $arr_item["datelist"]=json_decode($row["dategroup"]);
    return $arr_item;

}
function judge_auth()
{
    #echo "user: ".$_SESSION["user_name"];
    #exit();
    if(!array_key_exists("user_name",$_SESSION))
    {
        #header("Location:/test_php/index.php");
        echo "<script>top.location.href='/test_php/index.php';</script>";
        exit();
    }
}
function get_req()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
    {
        #$arr_req = file_get_contents('php://input');
        $arr_req = $_POST;
        if(count($arr_req)==0)
        {
            $arr_req=$_GET;
        }
    }
    else
    {
        $arr_req=$_GET;
    }
    return $arr_req;
}
function sql_connect()
{
    global $g_configs;
    $mysqli = new mysqli($g_configs['db']['db_host'], $g_configs['db']['db_user'],                      
        $g_configs['db']['db_passwd'], $g_configs['db']['db_dbname'],$g_configs['db']['db_port']);
    #printf("mysql: ".$g_configs['db']['db_host']." ". $g_configs['db']['db_user']." ".                      $g_configs['db']['db_passwd']." ". $g_configs['db']['db_dbname']." ".$g_configs['db']['db_port']."\n");
    if ($mysqli->connect_errno) {
        printf("Connect mysql failed: ".$mysqli->connect_error);
        exit();
    }
    $mysqli->query("set character set 'utf8'"); 
    $mysqli->query("set names 'utf8'"); 
    return $mysqli;
}
function result_no($result_info, $use_original)
{
    global $g_today;
    $arr = array();
    $arr["ret"]="NO";
    if($use_original!=null && $use_original!="")
    {  
        $arr["result_info"]=$result_info;
    }  
    else
    {  
        $arr["result_info"]="系统异常";
    }  
    error_log("$g_today web output. error. $result_info\n",3,'./errors.log');
    echo json_encode($arr, true);
}
function result_ok(&$arr_result)
{
    global $g_today;
    $arr_result["ret"]="OK";
    $result=json_encode($arr_result, true);
    error_log("$g_today web output. ok. $result\n",3,'./errors.log');
    echo $result;
}
function save_luaconf()
{
    $mysqli = sql_connect();
    $sql="select id, carrier, carriersame,voyagetype,deplimit,depcitys,deparea,arrlimit,arrcitys,arrarea,backlimit,backcitys,backarea,dategroup  from strategy where isauditing='True'";
    $result_strategy = $mysqli->query("$sql");
    if(!$result_strategy)
    {
        error_log("$g_today query now_running error: ".$mysqli->error." \n",3,'./errors.log');
        printf("$g_today query now_running error: ".$mysqli->error." \n");
        exit();
        #printf("$g_today query now_running error. ".$mysqli->error."\n");
    }
    $strategy="strategys={\n";
    while($row_strategy = $result_strategy->fetch_array())
    {
        $strategy.="{\n";
        $strategy.="\tid=\"".$row_strategy["id"]."\",\n";
        $strategy.="\tcarriers={".$row_strategy["carrier"]."=1},\n";
        $strategy.="\ttrip_type=\"".($row_strategy["voyagetype"]==1?"":($row_strategy["voyagetype"]==2?"1":2))."\",\n";
        $strategy.=create_lua_city($mysqli, $row_strategy, "dep", "from");
        $strategy.=create_lua_city($mysqli, $row_strategy, "arr", "to");
        $strategy.=create_lua_city($mysqli, $row_strategy, "back", "back");

        $price_info="\tprice_info ={\n";
        foreach (json_decode($row_strategy["dategroup"], true) as $arr_date)
        {
            foreach ($arr_date["berthlist"] as $arr_berth)
            {
                $price_info.="\t{\n";
                $price_info.="\t\tcabin_class={";
                $arr_cabin_class=split ('[/]', $arr_berth["berth"]);
                for ($j = 0; $j < count($arr_cabin_class); $j++) 
                {
                    if($j!=0)
                    {
                        $price_info.=",";
                    }
                    $price_info.="\"".$arr_cabin_class[$j]."\"";
                }
                $price_info.="},agent=".$arr_berth["discountbase"].", award=".$arr_berth["discount"].", noaward=".$arr_berth["ticketfare"].", single=".$arr_berth["cashsingle"].", round=".$arr_berth["cashdouble"]."\n";
                $price_info.="\t},\n";
            }
        }
        $strategy.="$price_info\t},\n";
        $strategy.="},\n";
    }
    $result_strategy->close();
    $mysqli->close();

    $strategy.="\n};\n";
    #echo $strategy;
    error_log( "strategy: $strategy\n",3,'/tmp/errors.log');
    $protocol_updatelua="{'type':'update', 'rules':[{'name':'strategy_conf', 'content_luafile':'".  base64_encode($strategy)."'}]}";
    echo (send_ticketsrv($protocol_updatelua)==0)?"OK":"NO";
}
function send_ticketsrv($ori_content)
{
    global $g_configs;
    $length=strlen($ori_content)+7; #ucStart uPkgLen ucCmd ucEnd
    $content=pack("C1", 4) . pack("N1", $length). pack("C1", 0).$ori_content.pack("C1", 5);
    $address = $g_configs['ticketsrv']['ticket_host']; //'10.209.1.45';
    $service_port = $g_configs['ticketsrv']['ticket_port'];//9091;

    /* Create a TCP/IP socket. */
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    if ($socket === false) {
        error_log( "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n",3,'./ errors.log');
        return 1;
    } else {
            #echo "OK.\n";
    }
     #echo "Attempting to connect to '$address' on port '$service_port'...";
    #error_log("Attempting to connect to '$address' on port '$service_port'...\n",3,'./errors.log'); 
    $result = socket_connect($socket, $address, $service_port);
    if ($result === false) {
        error_log( "socket_connect() failed.\nReason: ($result) " .
socket_strerror(socket_last_error($socket)) . "\n",3,'./errors.log');
        return 1;
    } else {
            #echo "OK.\n";
    }
    #echo "Sending request... $length\n";
    socket_write($socket, $content, $length);
    #echo "OK.\n";

    #error_log("Reading response:\n\n",3,'./errors.log');
    while ($out = socket_read($socket, 2048)) {
            #echo $out;
            #error_log("$out",3,'./errors.log');
    }
    #error_log("Closing socket\n",3,'./errors.log');
    #echo "Closing socket...";
    socket_close($socket);
    #echo "OK.\n\n";
    return 0;
}
#                                                dep[citys] from[_city]
function create_lua_city($mysqli, $row_strategy, $src_key, $dest_key)
{
    $strategy="";
    $limit=$row_strategy[$src_key."limit"];
    $citys=$row_strategy[$src_key."citys"];
    $area=$row_strategy[$src_key."area"];
    $arr_city=split ('[/]', $citys);
    $city="";
    for ($j = 0; $j < count($arr_city); $j++) 
    {
        if($arr_city[$j]=="")
        {
            continue;
        }
        if($j!=0)
        {
            $city.=",";
        }
        $city.="\"".$arr_city[$j]."\"";
    }
    if($limit=="True")
    {
        $strategy.="\t${dest_key}_city = {include={ $city },exclude={\"\"}},\n";
    }
    else
    {
        $include="";
        if($area=="")
        {
            $include="\"全球\"";
        }
        else
        {
            $arr_area=split ('[,]', $area);
            for ($j = 0; $j < count($arr_area); $j++) 
            {
                if($arr_area[$j]=="")
                {
                    continue;
                }
                if($j!=0)
                {
                    $include.=",";
                }
                $sql="select name from three_code where id=".intval($arr_area[$j]);
                #echo $sql;
                $result_3code = $mysqli->query("$sql");
                if(!$result_3code)
                {
                    printf("$g_today query 3code error: ".$mysqli->error." \n");
                    exit();
                }
                if($row_3code=$result_3code->fetch_array())
                {
                    $include.="\"".$row_3code["name"]."\"";
                }
                else
                {
                    printf("$g_today no such 3code. id: ".$arr_area[$j]." \n");
                    exit();
                }
            }
        }
        if($city=="")
        {
            $city="\"\"";
        }
        $strategy.="\t${dest_key}_city = {include={ $include },exclude={ $city }},\n";
    }
    return $strategy;
}
?>
