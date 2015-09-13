<?php
$g_configs=parse_ini_file("/root/ticket_src/release/ticket/html/test_php/config.ini", true);
?>
<html>
<head> <meta charset ="UTF-8" ></head>
<title>test</title>
<body>
<!-- http://code.jquery.com/jquery-1.3.2.min.js -->
<script type="text/javascript" src="jquery-1.3.2.min.js"></script>
<script>
$(document).ready(function(){
    $("#form1").submit(function(e)
    {
        e.preventDefault(); //STOP default action
        //$("#query").prop("disabled", true);
        $('input[type="submit"]').attr('disabled', true);
        $("textarea#content").html("wait for a minute...");
        var data = {};
        data["cid"] = "test";
        $('form input, form select, form textarea').each(
            function(index){  
                var input = $(this);
                if("tripType"==input.attr("name"))
                {
                    switch(input.val())
                    {
                    case "单程":
                        data[input.attr("name")] = "1";
                        break;
                    case "往返":
                        data[input.attr("name")] = "2";
                        break;
                    case "多程":
                        data[input.attr("name")] = "3";
                        break;
                    }
                }
                else 
                {
                    data[input.attr("name")] = input.val();
                }
                delete data["undefined"];
                delete data[""];
                //console.log('Type: ' + input.attr('type') + 'Name: ' + input.attr('name') + 'Value: ' + input.val());
            }
        );
        console.log(data);
        $.ajax(
            {
                url : "<?php printf("http://".$g_configs['ticketsrv']['ticket_host']."/search");?>",
                    type: "POST",
                    data : JSON.stringify(data),
                 success:function(maindta)
                {

                    //alert("ok");
                    $("textarea#content").html(maindta);
                    $('input[type="submit"]').attr('disabled' , false);
                    //$("#query").removeAttr('disabled');

                },
                    error: function(jqXHR, textStatus, errorThrown)
                {
                    //$("#query").removeAttr('disabled');
                    $("textarea#content").html("server error");
                    $('input[type="submit"]').attr('disabled' , false);
                }
        });
    });
});</script>
<form id="form1"  method="post">
    行程类型:<select name="tripType" >
      <option value="单程">单程</option>
      <option value="往返">往返</option>
      <!--option value="多程">多程</option-->
    </select></br>
    出发地: <input type="text" name="fromCity" value="SFO" /></br>
    目的地: <input type="text" name="toCity" value="MCO"/></br>
    去程日期: <input type="text" name="fromDate" value="<?PHP echo date('Ymd',strtotime('+3 day'));?>" /></br>
    回程日期: <input type="text" name="retDate" value="" /></br>
    <input type="submit" name="query" value="查询" />
</form>
    &nbsp;&nbsp;&nbsp;&nbsp;内容：<textarea id="content" name="content" cols="100" rows="250"></textarea> </br>
<?php
error_log("init\n",3,'../logs/php.log'); 
?>
