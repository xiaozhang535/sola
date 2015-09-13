<?php
include 'PolicyManage/Public.php';

$arr_req=get_req();
if(!array_key_exists("Action", $arr_req) || $arr_req["Action"]!="Login")
{
    echo "1|错误号：20001，no action!";
}
else 
{
    #req: Action=Login&Account=ggg&Password=jj&Remember=1&_=
    #rsp: 1|错误号：20005，登录名不存在或密码错误!。
    #
    if($_SESSION["user_name"])
    {
        echo "1|OK";
        #header("Location:NewMain.php");
    }
    else
    {
        if(!array_key_exists("Account",$arr_req) || !array_key_exists("Password",$arr_req))
        {
            echo "1|错误号：20002，没有登录名或密码!";
            exit();
        }
        $mysqli=sql_connect();
        $sql="select u.id id, user, company_id, comname from user u left join company c on u.company_id=c.id where u.user='".
            $arr_req["Account"]."' and u.password='".$arr_req["Password"]."'";
        $result = $mysqli->query("$sql");
        if(!$result)
        {
            echo "1|错误号：20003，系统异常!";
            exit();
        }
        if($row = $result->fetch_array())
        {
            $_SESSION["user_id"] = $row["id"];
            $_SESSION["user_name"] = $row["user"];
            #$_SESSION["company_id"] = $row["company_id"];
            $_SESSION["user_company"] = $row["comname"];
            #echo $_SESSION["user_id"]." j: ".$_SESSION["user_name"]." ".$_SESSION["user_company"];
            echo "1|OK";
            #header("Location:NewMain.php");
        }
        else
        {
            echo "1|错误号：20005，登录名不存在或密码错误!";
            exit();
        }
        $result->close();
        $mysqli->close();
    }

}

?>
