#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-13
@description: 美程无忧PCC数据解析,并导入到数据库;同时加入到lua(zone_conf.lua)文件中去
=cut

use strict;
use Getopt::Long qw(:config pass_through);
use File::Basename;

my ($file_sanzima)=("threecode_meicheng.txt"); 
my $FD;
open($FD, "<$file_sanzima");

my ($province_id, $region_id, $country_id, $area_id, $continent_id, $global_id, $type)=(-1,-1,-1,-1,-1,-1,"");
my ($province_name, $region_name, $country_name, $area_name, $continent_name, $global_name)=("","","","","","");
my $name;
my $isChine=0;
my $pre="";
my $idx=0;
my ($name1,$name2,$name3,$name4);
my $level=0;
my $values="";
my $pcclua="zones={\n";
while(my $line=<$FD>)
{
    chomp $line;
    if($line =~ /^([A-Z]{3,3})/)
    {
        #syswrite(STDOUT, "3code: $1\n");
        if($isChine==1)
        {
            if($idx==1)
            {
                $province_id=$province_id+1;
                $province_name=$name1;
                $name=$name1;
                syswrite(STDOUT,"$province_id $name1 $province_id $region_id $country_id $area_id $continent_id $global_id province null\n");
                $values.=($values eq ""?"":",")."($province_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'province')";
            }
            elsif($idx==2)
            {
                $region_id+=1;
                $region_name=$name1;
                $province_id=-1;
                syswrite(STDOUT,"$region_id $name1 $province_id $region_id $country_id $area_id $continent_id $global_id region null\n");
                $values.=($values eq ""?"":",")."($region_id, '$name1','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'region')";
                $province_id=$region_id*100+1;
                $province_name=$name2;
                syswrite(STDOUT,"$province_id $name2 $province_id $region_id $country_id $area_id $continent_id $global_id province null\n");
                $values.=($values eq ""?"":",")."($province_id, '$name2','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'region')";
            }
        }
        elsif($level==2)
        {
            if($idx==1)
            {
                $country_id+=1;
                $country_name=$name1;
                syswrite(STDOUT,"$country_id $name1 $province_id $region_id $country_id $area_id $continent_id $global_id country null\n");
                $values.=($values eq ""?"":",")."($country_id, '$name1','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'country')";
            }
            elsif($idx==2)
            {
                $area_id+=1;
                $country_id=-1;
                $area_name=$name1;
                syswrite(STDOUT,"$area_id $name1 $province_id $region_id $country_id $area_id $continent_id $global_id area null\n");
                $values.=($values eq ""?"":",")."($area_id, '$name1','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'area')";
                $country_id=$area_id*100+1;
                $country_name=$name2;
                syswrite(STDOUT,"$country_id $name2 $province_id $region_id $country_id $area_id $continent_id $global_id country null\n");
                $values.=($values eq ""?"":",")."($country_id, '$name2','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'country')";
            }
        }
        $idx=0;
        while(1)
        {
            if($line=~/^([A-Z]+)-([^A-Z]+)(.*)/)
            {
                my $three_code=$1;
                $name=$2;
                syswrite(STDOUT,"-1 $name $province_id $region_id $country_id $area_id $continent_id $global_id 3code $three_code\n");
                $values.=($values eq ""?"":",")."(-1, '$name','$three_code',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'3code')";
                $pcclua.="\t$three_code = {".
                "province=\"".($province_id==-1?"":$province_name)."\",".
                "region=\"".($region_id==-1?"":$region_name)."\",".
                "country=\"".($country_id==-1?"":$country_name)."\",".
                "area=\"".($area_id==-1?"":$area_name)."\",".
                "continent=\"".($continent_id==-1?"":$continent_name)."\",".
                "global=\"".($global_id==-1?"":$global_name)."\",".
                "},\n";
                $line=$3;
            }
            else
            {
                last;
            }
        }
    }
    elsif($line =~ /^(\S+)/)
    {
        $name=$1;
        if($name =~ /全球/)
        {
            $global_id=0;
            $global_name=$name;
            #syswrite(STDOUT, "not 3code: $line\n");
            syswrite(STDOUT,"$global_id $name $province_id $region_id $country_id $area_id $continent_id $global_id global null\n");
            $values.=($values eq ""?"":",")."($global_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'global')";
        }
        elsif($name =~ /中国大陆/)
        {
            $country_id=10101;
            $country_name=$name;
            syswrite(STDOUT,"$country_id $name $province_id $region_id $country_id $area_id $continent_id $global_id country null\n");
            $values.=($values eq ""?"":",")."($country_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'country')";
            $isChine=1;
        }
        #elsif($name =~ /亚洲|欧洲|非洲|北美洲|南美洲|大洋洲/)
        elsif($name =~ /^[^A-Z]+洲/)
        {
            $isChine=0;
            ($province_id, $region_id, $country_id, $area_id)=(-1,-1,-1,-1);
            if($continent_id==-1)
            {
                $continent_id=1;
            }
            else
            {
                $continent_id++;
            }
            $continent_name=$name;
            syswrite(STDOUT,"$continent_id $name $province_id $region_id $country_id $area_id $continent_id $global_id continent null\n");
            $values.=($values eq ""?"":",")."($continent_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'continent')";
            if($name=~/欧洲|非洲|南美洲/)
            {
                $level=1;
            }
            else
            {
                $level=2;
            }
        }
        elsif($isChine==1 )
        {
            if($region_id==-1)
            {
                $region_id=$country_id*100+1;
                $region_name=$name;
                syswrite(STDOUT,"$region_id $name $province_id $region_id $country_id $area_id $continent_id $global_id region null\n");
                $values.=($values eq ""?"":",")."($region_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'region')";
            }
            elsif($province_id==-1)
            {
                $province_id=$region_id*100+1;
                $province_name=$name;
                syswrite(STDOUT,"$province_id $name $province_id $region_id $country_id $area_id $continent_id $global_id province null\n");
                $values.=($values eq ""?"":",")."($province_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'province')";
            }
            else
            {
                $idx++;
                if($idx==1)
                {
                    $name1=$name;
                }
                elsif($idx==2)
                {
                    $name2=$name;
                }
                elsif($idx==3)
                {
                    $name3=$name;
                }
                elsif($idx==4)
                {
                    $name4=$name;
                }
            }
        }
        elsif($isChine==0 )
        {
            if($level==1)
            {
                if($country_id==-1)
                {
                    $country_id=$continent_id*100+1;
                }
                else
                {
                    $country_id+=1;
                }
                $country_name=$name;
                syswrite(STDOUT,"$country_id $name $province_id $region_id $country_id $area_id $continent_id $global_id country null\n");
                $values.=($values eq ""?"":",")."($country_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'country')";
            }
            else
            {
                if($area_id==-1)
                {
                    $area_id=$continent_id*100+1;
                    $area_name=$name;
                    syswrite(STDOUT,"$area_id $name $province_id $region_id $country_id $area_id $continent_id $global_id area null\n");
                    $values.=($values eq ""?"":",")."($area_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'area')";
                }
                elsif($country_id==-1)
                {
                    if($name=~/日本/)
                    {
                        $country_id=$area_id*100+2;
                    }
                    else
                    {
                        $country_id=$area_id*100+1;
                    }
                    $country_name=$name;
                    syswrite(STDOUT,"$country_id $name $province_id $region_id $country_id $area_id $continent_id $global_id country null\n");
                    $values.=($values eq ""?"":",")."($country_id, '$name','',$province_id,$region_id,$country_id,$area_id,$continent_id,$global_id,'country')";
                }
                else
                {
                    $idx++;
                    if($idx==1)
                    {
                        $name1=$name;
                    }
                    elsif($idx==2)
                    {
                        $name2=$name;
                    }
                    elsif($idx==3)
                    {
                        $name3=$name;
                    }
                    elsif($idx==4)
                    {
                        $name4=$name;
                    }
                }
            }
        }
    }
    #SZX = {small_zone="华南", country="中国大陆", zone="亚洲"}
#id         name           province_id region_id country_id area_id continent_id global_id type      
#0          全球           -1          -1        -1         -1      -1           -1        global     
#01         亚洲(不含大陆) -1          -1        -1         -1      -1           0         continent 
#0101       东亚           -1          -1        -1         -1      01           0         area
#010101     中国大陆       -1          -1        -1         -1      -1           0         country
#01010101   东北           -1          -1        010101     -1      -1           0         region
#0101010101 黑(黑龙江)     -1          01010101  010101     -1      -1           0         province 
#-1         绥芬河机场     0101010101  01010101  010101     -1      -1           0         threecode  FUD


#010102     日本           -1          -1        -1         0101    01           0         country

#id   idx      three_code     name_cn     parent_id
#1    -1        FUD            绥芬河机场  0101010101

#three_code.lua
#FUD={province="黑(黑龙江)", region="东北", country="中国大陆", area="东亚", continent="亚洲", global="全球"}

#global continent      area country  region province
#全球   亚洲(不含大陆) 东亚 日本
#                           中国大陆 东北   黑(黑龙江)
}
$pcclua.="};";
close($FD);

#lua config file
my $FD_zone_lua;
my $file_zone_lua="../zone_conf.lua";
open($FD_zone_lua, ">$file_zone_lua");
syswrite($FD_zone_lua, "$pcclua\n");
close($FD_zone_lua);
#exit();

#db
my $FD_value;
my $file_value_mysql="mysql_value_threecode.sql";
open($FD_value, ">$file_value_mysql");
syswrite($FD_value, "insert into three_code(id,name,three_code,province_id,region_id,country_id,area_id,continent_id,global_id,type) values $values");
close($FD_value);
`mysql -uroot -pdatacenter123 ticket_lua < mysql_db_threecode.txt`;
`mysql -uroot -pdatacenter123 ticket_lua < $file_value_mysql`;
#`mysql -uroot -pdatacenter123 ticket_lua -e "insert into three_code(id,name,three_code,province_id,region_id,country_id,area_id,continent_id,global_id,type) values $values"`;
#`mysql -uroot -pdatacenter123 ticket_lua -e "insert into three_code(id,name,three_code,province_id,region_id,country_id,area_id,continent_id,global_id,type) values $values"`;
