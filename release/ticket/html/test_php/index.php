<?php
include 'PolicyManage/Public.php';
include 'InitIndex.php';
$arr_req=get_req();
#echo $arr_req["Logout"];
#echo "user_name: ".$arr_req["Logout"]." ".$_SESSION["user_name"];
#exit();
if(array_key_exists("Logout",$arr_req) && $arr_req["Logout"]==0)
{
    unset($_SESSION["user_id"]);
    unset($_SESSION["user_name"]);
    unset($_SESSION["user_company"]);
}
#echo "user_name: ".$arr_req["Logout"]." ".$_SESSION["user_name"];
#exit();
if(!array_key_exists("user_name",$_SESSION))
{
    print get_html($arr_req);
}
else
{
    header("Location:NewMain.php");
}
?>
