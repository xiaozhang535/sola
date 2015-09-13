<?php
include 'Public.php';
include 'InitPolicyEdit.php';
judge_auth();

$arr_req=get_req();
#print_r($g_configs);
#printf("REQUEST_METHOD: ".$_SERVER['REQUEST_METHOD']."\n");
#print_r($arr_req);
if($arr_req["Action"]==null)
{
    #print get_html($arr_req);
    #exit();
    if(array_key_exists("ID", $arr_req) && $arr_req["ID"]!="")
    {
        if(array_key_exists("Copy", $arr_req) && $arr_req["Copy"]=="1")
        {
            $mysqli = sql_connect();
            $ids=$arr_req["ID"];
            $sql="select s.id strategy_id,s.*,u.*,o.* from strategy s left join user u on s.account_id=u.id left join company c on u.company_id=c.id left join officegroup o on s.officegroupid=o.officegroupid where s.id in ('$ids') ";
            $result = $mysqli->query("$sql");
            if(!$result)
            {
                error_log("$g_today query strategy error. ".$mysqli->error."\n",3,'./errors.log');
                printf("$g_today query strategy error. ".$mysqli->error."\n");
                exit();
            }
            if($row = $result->fetch_array())
            {
                $arr_result=create_strategy_edit_item($row);
                $arr_result["ret"]="OK";
                print get_html(json_encode($arr_result));
            }
            else
            {
                error_log("$g_today query strategy error. ".$mysqli->error."\n",3,'./errors.log');
                printf("$g_today query strategy error. ".$mysqli->error."\n");
                exit();
            }
            $result->close();
            $mysqli->close();
        }
        else
        {
            print get_html();
        }
    }
    else
    {
        print get_html();
    }
}
else if($arr_req["Action"]=="GetAirportList")
{
    #req: http://www.380747.com/PolicyManage/GJPolicyEdit.aspx?Action=GetAirportList&AreaLevel=0101010101&callback=jQuery111109532740074209869_1437057647685&_=1437057647689
    #res: jQuery111109532740074209869_1437057647685([{"text": "FUD-绥芬河机场", "value": "FUD"},{"text": "HEK-黑河机场", "value": "HEK"},{"text": "HRB-哈尔滨太平机场", "value": "HRB"},{"text": "JMU-佳木斯东郊机场", "value": "JMU"},{"text": "LDS-伊春林都机场", "value": "LDS"},{"text": "MDG-牡丹江海浪机场 ", "value": "MDG"},{"text": "NDG-齐齐哈尔三家子机场", "value": "NDG"},{"text": "OHE-漠河机场", "value": "OHE"},{"text": "YLN-依兰机场", "value": "YLN"},{"text": "JGD-加格达奇机场", "value": "JGD"},{"text": "DQA-大庆机场", "value": "DQA"}])
    #req: 亚洲(不含大陆): http://10.211.55.5/test_php/PolicyManage//GJPolicyEdit.php?Action=GetAirportList&AreaLevel=01&callback=jQuery111109700722498819232_1436879181111&_=1436879181119
    $id=intval($arr_req["AreaLevel"]);
    $callback=$arr_req["callback"];
    #printf("id: $id callback: $callback\n");
    $mysqli = sql_connect();
    $sql="select type from three_code where id=$id";
    $result = $mysqli->query("$sql");
    $arr_result=array();
    if(!$result)
    {
        error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
    }
    else
    {
        if($row = $result->fetch_array())
        {
            #print( $row["type"]);
            $sql="select three_code,name from three_code where type='3code' and ".$row["type"]."_id=$id";
            #print( "sql: $sql\n");
            $result_3code = $mysqli->query("$sql");
            if(!$result_3code)
            {
                error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
                #printf("$g_today query now_running error. ".$mysqli->error."\n");
            }
            else
            {
                while($row_3code = $result_3code->fetch_array())
                {
                    $arr_3code = array();
                    $arr_3code["text"]=$row_3code["three_code"]."-".$row_3code["name"];
                    $arr_3code["value"]=$row_3code["three_code"];
                    #printf($row_3code["name"]." ".$row_3code["three_code"]."\n");
                    array_push($arr_result,$arr_3code);
                }
                $result_3code->close();
                printf($callback."(".json_encode($arr_result).")");
            }
        }
        $result->close();
    }
    $mysqli->close();
}
else if($arr_req["Action"]=="GetBerthList")
{
    #req: Action=GetBerthList&Carrier=DL&Key=1
    #rsp: 
    $carrier=$arr_req["Carrier"];
    $berthidx=$arr_req["Key"];
    $mysqli = sql_connect();
    $sql="select berth$berthidx berth from iata where iata='$carrier'";
    #echo $sql;
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
    }
    else
    {
        if($row = $result->fetch_array())
        {
            echo $row["berth"];
        }
        $result->close();
    }
    $mysqli->close();
}
else if($arr_req["Action"]=="Save")
{
    #req: 
    #Action=Save&ID=-1&Carrier=MU&CarrierSame=&OfficeProvider=SZX394&OfficeGroupID=629&OfficeTicket=SZX472&TicketType=BSP&TicketAuditing=True&AduType=101&ChdWay=1&ChdNone=False&MixSeason=2&MixBerth=2&MixSB=2&MixBase=2&DateGroup=2015-07-23%7C2016-03-31%7C2015-05-19%7C2016-03-31%7C%7C%7C%7C1%7C3%2C15%2C10%2C0%2C0%2C0%2C0%2C0%2CF%2FP%2FA%2FJ%2FC%2FD%2FI%2FO%2FY%2FB%2FM%2FE%2FH%2FK%2FL%2FN%2FR%2FS%2FV%2FT%2FG%2FZ%2C%2C0%2CFalse%5E0%2C0%2C10%2C0%2C0%2C0%2C0%2C0%2CQ%2FU%2FW%2FX%2C%2C0%2CTrue&VoyageType=2&DepLimit=True&DepCity=YVR%2FYYZ%2FCDG%2FFRA%2FSFO%2FLHR%2FLAX%2FFCO&DepArea=&ArrLimit=True&ArrCity=PVG&ArrArea=&BackLimit=True&BackCity=PVG&BackArea=0&ChangGNCity=&ChangGJCity=&FlightsGo=&FlightsBack=&FlightsNone=&VoyageNone=&RuleID=00215379&PersonNum=0&PersonDouble=False&YearsFrom=0&YearsTo=0&Record=2&RecordOffice=&RecordNoRight=False&DiscountNone=IT%E7%A5%A8%E9%9D%A2%2C%E5%85%B1%E4%BA%AB%E8%88%AA%E7%8F%AD%2C%E5%8C%85%E6%9C%BA%2F%E5%8C%85%E9%94%80%2F%E7%8B%AC%E9%A3%9E&Addon=4&Spa=3&PriceLow=False&PriceMin=0&PriceMax=0&AheadDay=0&NonStop=False&CarrierIdentity=False&Remark=&Flag=ADD
    #
    #1, save to db
    $mysqli = sql_connect();
    $sql=<<<EOD
insert into strategy(
carrier,
carriersame,
officeprovider,
officegroupid,
officeticket,
tickettype,
ticketauditing,
pcc,
validplace,
adutype,
chdway,
chdnone,
mixseason,
mixberth,
mixsb,
mixbase,
dategroup,
voyagetype,
deplimit,
depcitys,
deparea,
arrlimit,
arrcitys,
arrarea,
backlimit,
backcitys,
backarea,
changgncity,
changgjcity,
flightsgo,
flightsback,
flightsnone,
voyagenone,
ruleid,
personnum,
persondouble,
yearsfrom,
yearsto,
record,
recordoffice,
recordnoright,
discountnone,
addon,
spa,
pricelow,
pricemin,
pricemax,
aheadday,
nonstop,
carrieridentity,
remark,
flag,
account_id)
EOD;
    list($dateticketfrom, $dateticketto, $dategofrom, $dategoto, $datebackto, $goinvalid, $backinvalid,  $datemixway, $cabin_info) = split ('[|]', $arr_req["DateGroup"]);
    #echo "$dateticketfrom, $dateticketto, $dategofrom, $dategoto, $datebackto, $goinvalid,$datemixway,-$cabin_info\n";
    $arr_cabin=split ('[\^]', $cabin_info);
    $arr_berthlist=array();
    $arr_date=array();
    $arr_date["dateticketfrom"]=$dateticketfrom;
    $arr_date["dateticketto"]=$dateticketto;
    $arr_date["dategofrom"]=$dategofrom;
    $arr_date["dategonone"]=""; //tmp
    $arr_date["godatenone"]=""; //tmp
    $arr_date["backdatenone"]=""; //tmp
    $arr_date["datebacknone"]=""; //tmp
    $arr_date["dategoto"]=$dategoto;
    $arr_date["datebackto"]=$datebackto;
    $arr_date["datemixway"]=$datemixway;
    $arr_date["datewarn"]="0";
    $arr_date["dateid"]="0";
    $arr_date["berthlist"]=array();
    for ($i = 0; $i < count($arr_cabin); $i++) 
    {
        $arr_berth=array();
        list($agent, $award, $noaward, $single, $round, $agent_child, $award_child, $noaward_child, $cabin_class, $cabin_addon, $berthway, $isother) = split('[,]', $arr_cabin[$i]);
        #echo "agent: $agent award: $award noaward: $noaward single: $single round: $round agent_child: $agent_child award_child: $award_child noaward_child: $noaward_child cabin_class: $cabin_class cabin_addon: $cabin_addon berthway: $berthway isother: $isother\n";
        $arr_berth["discountbase"]=$agent;
        $arr_berth["discount"]=$award;
        $arr_berth["ticketfare"]=$noaward;
        $arr_berth["cashsingle"]=$single;
        $arr_berth["cashdouble"]=$round;
        $arr_berth["chdbase"]=$agent_child;
        $arr_berth["chddiscount"]=$award_child;
        $arr_berth["chdticketfare"]=$noaward_child;
        $arr_berth["berth"]=$cabin_class;
        $arr_berth["berthway"]=0;//$berthway; //tmp
        $arr_berth["berthid"]="1"; //tmp
        $arr_berth["isother"]=false; //$isother; //tmp
        array_push($arr_date["berthlist"],$arr_berth);
    }
    array_push($arr_berthlist, $arr_date);
    $DateGroup=str_replace('"','\\"',json_encode($arr_berthlist, true));
    $sql.=<<<EOD
 values(
     "{$arr_req["Carrier"]}",
     "{$arr_req["CarrierSame"]}",
     "{$arr_req["OfficeProvider"]}",
     "{$arr_req["OfficeGroupID"]}",
     "{$arr_req["OfficeTicket"]}",
     "{$arr_req["TicketType"]}",
     "{$arr_req["TicketAuditing"]}",
     "{$arr_req["PCC"]}",
     "{$arr_req["ValidPlace"]}",
     "{$arr_req["AduType"]}",
     "{$arr_req["ChdWay"]}",
     "{$arr_req["ChdNone"]}",
     "{$arr_req["MixSeason"]}",
     "{$arr_req["MixBerth"]}",
     "{$arr_req["MixSB"]}",
     "{$arr_req["MixBase"]}",
     "{$DateGroup}",
     "{$arr_req["VoyageType"]}",
     "{$arr_req["DepLimit"]}",
     "{$arr_req["DepCity"]}",
     "{$arr_req["DepArea"]}",
     "{$arr_req["ArrLimit"]}",
     "{$arr_req["ArrCity"]}",
     "{$arr_req["ArrArea"]}",
     "{$arr_req["BackLimit"]}",
     "{$arr_req["BackCity"]}",
     "{$arr_req["BackArea"]}",
     "{$arr_req["ChangGNCity"]}",
     "{$arr_req["ChangGJCity"]}",
     "{$arr_req["FlightsGo"]}",
     "{$arr_req["FlightsBack"]}",
     "{$arr_req["FlightsNone"]}",
     "{$arr_req["VoyageNone"]}",
     "{$arr_req["RuleID"]}",
     "{$arr_req["PersonNum"]}",
     "{$arr_req["PersonDouble"]}",
     "{$arr_req["YearsFrom"]}",
     "{$arr_req["YearsTo"]}",
     "{$arr_req["Record"]}",
     "{$arr_req["RecordOffice"]}",
     "{$arr_req["RecordNoRight"]}",
     "{$arr_req["DiscountNone"]}",
     "{$arr_req["Addon"]}",
     "{$arr_req["Spa"]}",
     "{$arr_req["PriceLow"]}",
     "{$arr_req["PriceMin"]}",
     "{$arr_req["PriceMax"]}",
     "{$arr_req["AheadDay"]}",
     "{$arr_req["NonStop"]}",
     "{$arr_req["CarrierIdentity"]}",
     "{$arr_req["Remark"]}",
     "{$arr_req["Flag"]}",
     {$_SESSION["user_id"]}
 )
EOD;
    error_log("$g_today sql: \n$sql\n",3,'/tmp/errors.log');
    $result = $mysqli->query("$sql");
    if(!$result)
    {
        #error_log("$g_today query now_running error. ".$mysqli->error."\n",3,'./errors.log');
        printf("$g_today query now_running error. sql: $sql. error: ".$mysqli->error."\n");
        $mysqli->close();
        exit();
    }
    $ruleid=$mysqli->insert_id;
    $realid=sprintf("AA%08s", $ruleid);
    $sql="update strategy set id=\"$realid\" where i=$ruleid;";
    $result = $mysqli->query($sql);
    if(!$result)
    {    
        result_no("$g_today strategy error. sql: $sql. error: ".$mysqli->error);
        $mysqli->close();
        exit() ;
    }
    $mysqli->close();

    #2, save to lua conf from db
    save_luaconf();
}
?>
