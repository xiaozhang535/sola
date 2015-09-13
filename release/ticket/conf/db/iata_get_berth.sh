#!/bin/bash

<<COMMENT
@author: ginozhang
@date: 2015-07-22
@description: 
COMMENT

cat iata_2char.txt | while read iata;do 
#echo "DL"| while read iata;do 
    for((idx=1;$idx<=5;idx++));do
        berth=$(curl -s -H 'Accept:*/*'  -H 'Accept-Language:zh-CN,zh;q=0.8' -H 'Cookie:ASP.NET_SessionId=igkdwwisblcmjw55vw33rh55; HYACCOUNT=EC68F6C4441AE658; HYPASSPORT=EC68F6C4441AE658|woshigy; SkinID=7' -H 'Referer:http://www.380747.com/PolicyManage/GJPolicyEdit.aspx?ID=AA00373626&Copy=1' -H 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36' -H 'X-Requested-With:XMLHttpRequest' "http://www.380747.com/PolicyManage/GJPolicyEdit.aspx?Action=GetBerthList&Carrier=$iata&Key=$idx")
        echo "$iata $idx $berth"
        sleep 1;
    done
    #exit;
done
