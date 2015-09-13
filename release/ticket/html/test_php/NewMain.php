<?php
include 'PolicyManage/Public.php';
include 'InitNewMain.php';
judge_auth();

$arr_req=get_req();
print get_html($arr_req);
?>
