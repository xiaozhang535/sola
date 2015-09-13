<?php
echo "hello, php\n";
$DateGroup="2015-05-19|2016-03-31|2015-05-19|2016-03-31||||3|3,15,10,0,1,0,0,0,F/P/A/J/C/D/I/O/Y/B/M/E/H/K/L/N/R/S/V/T/G/Z,AA,0,False^2,0,10,0,0,0,0,10,F,BB,0,False^0,0,10,0,0,0,0,10,B,CC,0,False^0,0,10,0,0,0,0,0,Q/U/W/X,,0,True";
list($bill_valid_s, $bill_valid_e, $dep_valid_s, $dep_valid_e, $dep_invalid_s, $dep_invalid_e, $unkown1,  $back_invalid_type, $cabin_info) = split ('[|]', $DateGroup);
echo "$bill_valid_s, $bill_valid_e, $dep_valid_s, $dep_valid_e, $dep_invalid_s, $dep_invalid_e,$back_invalid_type,-$cabin_info\n";
$arr_cabin=split ('[\^]', $cabin_info);
for ($i = 0; $i < count($arr_cabin); $i++) 
#while($arr_cabin = each($arr_cabins))
{
    echo "arr_cabin: ".$arr_cabin[$i]."\n";
    list($agent, $award, $noaward, $single, $round, $agent_child, $award_child, $noaward_child, $cabin, $cabin_addon, $cabin_unkown1, $b_end) = split('[,]', $arr_cabin[$i]);
    echo "agent: $agent award: $award noaward: $noaward single: $single round: $round agent_child: $agent_child award_child: $award_child noaward_child: $noaward_child cabin: $cabin cabin_addon: $cabin_addon cabin_unkown1: $cabin_unkown1 b_end: $b_end\n";
}
//list($agent, $award, $noaward, $single, $round, $agent_child, $award_child, $noaward_child, $cabin, $cabin_addon, $cabin_unkown1, $cabin_unkown2, $agent_left,$noaward_left, $agent_child_left, $noaward_child_left, $cabin_unkown3, $cabin_unkown4, $cabin_unkown5, $cabin_left, $cabin_unkown6,$cabin_unkown7, $cabin_unkown8) = split (',', $cabin_info);
//echo "agent: $agent award: $award noaward: $noaward single: $single round: $round agent_child: $agent_child award_child: $award_child noaward_child: $noaward_child cabin: $cabin cabin_addon: $cabin_addon cabin_unkown1: $cabin_unkown1 cabin_unkown2: $cabin_unkown2 agent_left: $agent_left noaward_left: $noaward_left agent_child_left: $agent_child_left noaward_child_left: $noaward_child_left cabin_unkown3: $cabin_unkown3 cabin_unkown4: $cabin_unkown4 cabin_unkown5: $cabin_unkown5 cabin_left: $cabin_left cabin_unkown6: $cabin_unkown6 cabin_unkown7: $cabin_unkown7 cabin_unkown8: $cabin_unkown8\n";
?>
