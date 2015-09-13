<?php
$g_today = date("Y-m-d H:i:s");
$post_data = json_decode(file_get_contents('php://input'), true);
if($post_data == NULL)
{
    parse_str(file_get_contents('php://input'), $arr_req);
    #print_r($arr_req);
    error_log("$g_today web input: ".file_get_contents('php://input')."\n",3,'./errors.log');
    $strategy="{\n";
    $strategy.="id=\"".$arr_req["ID"]."\",\n";
    $strategy.="carriers={".$arr_req["Carrier"]."=1},\n";
    //1: all 2: single 3: round
    $strategy.="trip_type=\"".($arr_req["VoyageType"]==1?"":($arr_req["VoyageType"]==2?"1":2))."\",\n";
    $arr_dep_city=split ('[/]', $arr_req["DepCity"]);
    $dep_city="";
    for ($j = 0; $j < count($arr_dep_city); $j++) 
    {
        if($j!=0)
        {
            $dep_city.=",";
        }
        $dep_city.="\"".$arr_dep_city[$j]."\"";
    }
    $strategy.="from_city = {include={ $dep_city },exclude={\"\"}},\n";
    $arr_arrive_city=split ('[/]', $arr_req["ToCity"]);
    $arrive_city="";
    for ($j = 0; $j < count($arr_arrive_city); $j++) 
    {
        if($j!=0)
        {
            $arrive_city.=",";
        }
        $arrive_city.="\"".$arr_arrive_city[$j]."\"";
    }
    $strategy.="to_city = {include={ $arrive_city },exclude={\"\"}},\n";
    list($bill_valid_s, $bill_valid_e, $dep_valid_s, $dategoto, $datebackto, $dep_invalid_e, $unkown1,  $back_invalid_type, $cabin_info) = split ('[|]', $arr_req["DateGroup"]);
    echo "$bill_valid_s, $bill_valid_e, $dep_valid_s, $dategoto, $datebackto, $dep_invalid_e,$back_invalid_type,-$cabin_info\n";
    $arr_cabin=split ('[\^]', $cabin_info);
    $strategy.="price_info ={\n";
    for ($i = 0; $i < count($arr_cabin); $i++) 
    {
        list($agent, $award, $noaward, $single, $round, $agent_child, $award_child, $noaward_child, $cabin_class, $cabin_addon, $cabin_unkown1, $b_end) = split('[,]', $arr_cabin[$i]);
        echo "agent: $agent award: $award noaward: $noaward single: $single round: $round agent_child: $agent_child award_child: $award_child noaward_child: $noaward_child cabin_class: $cabin_class cabin_addon: $cabin_addon cabin_unkown1: $cabin_unkown1 b_end: $b_end\n";
        $strategy.="\t{\n";
        $arr_cabin_class=split ('[/]', $cabin_class);
        $strategy.="\t\tcabin_class={";
        for ($j = 0; $j < count($arr_cabin_class); $j++) 
        {
            if($j!=0)
            {
                $strategy.=",";
            }
            $strategy.="\"".$arr_cabin_class[$j]."\"";
        }
        $strategy.="},agent=$agent, award=$award, noaward=$noaward, single=$single, round=$round\n";
        $strategy.="\t},\n";
    }
    $strategy.="},\n";
    $strategy.="}\n";
    echo "$strategy\n";
    error_log("$g_today strategy: \n$strategy\n",3,'./errors.log');
}
else
{
    result_no("post data is NULL or json format is wrong. post: ".file_get_contents('php://input'));
}
function result_no($result_info, $use_original)
{
    global $g_today;
    $arr = array();
    $arr["result"]="no";
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
?>
