#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-01
@description: 
=cut

use strict;
use Getopt::Long qw(:config pass_through);
use File::Basename;
my $programName = basename($0);
my $usage = <<EOF;

Usage: $0 [options] 
  -c|--cnt                            test int
  -f|--file                            test string
  -h|--help                            Show this help message

EOF

my ($showHelp, $test_file, $test_cnt)=(0,'', 0);
my %options = ( 
        'h|help' => \$showHelp,
        'f|file=s' => \$test_file, 
        'c|cnt=i' => \$test_cnt, 
    );
GetOptions(%options);
if ($showHelp) {
    print $usage; 
    exit 1; 
}
my $print_ori=0;
my ($FD, $file);
$file="sanzima.txt";
open($FD, "<$file");
my $lastitem="";
my $country="";
my $last_country="";
my %g_hashCountry;
my $zone_name_cn="";
my $zone_name="";
my $zone_id="";
my %zone;
my $iszone=0;
my @sanzima;
my $g_id=1;
my $mysql="insert into sanzima(name, name_cn, sanzima, country_id, zone_id, type) values()";
my $g_values="";
while(my $line=<$FD>)
{
    chomp $line;
    if($line=~/^国家/)
    {
        if($lastitem=~/^(\S+)\s+(.*)$/)
        {
            ($zone_name_cn, $zone_name)=($1, $2);
            $print_ori==1 and print ("zone $zone_name_cn $zone_name\n");
            $zone{"$zone_name_cn"}="$zone_name";
            $iszone=1;

            $zone_name =~ s/'/\\'/g;$zone_name=trim($zone_name);
            $zone_name_cn =~ s/'/\\'/g;$zone_name_cn=trim($zone_name_cn);
            my $value="'$zone_name', '$zone_name_cn', '', $g_id, $g_id, 'zone'";
            print("id: $g_id value $value\n");
            $g_values.=",($value)";
            $zone_id=$g_id;
            $g_id++;
        }
        elsif($lastitem=~/^(\S+)\s*$/)
        {
            ($zone_name_cn)=($1);
            print ("zone $zone_name_cn \n");
            $zone{"$zone_name_cn"}="";
            $iszone=1;

            $zone_name_cn =~ s/'/\\'/g;$zone_name_cn=trim($zone_name_cn);
            my $value="'', '$zone_name_cn', '', $g_id, $g_id, 'zone'";
            print("id: $g_id value $value\n");
            $g_values.=",($value)";
            $zone_id=$g_id;
            $g_id++;
        }
        else
        {
            print ("error $lastitem\n");
        }
        $print_ori==1 and print ("guojia $line\n");
    }
    else
    {
        if($lastitem ne "")
        {
            if($iszone == 0)
            {
                #print("sanzima $zone_name_cn $lastitem\n");
                push(@sanzima, "$zone_name_cn $lastitem");
                &deal_item($lastitem);
            }
        }
        $lastitem=$line;
        if($iszone == 1)
        {
            $iszone=0;
        }
    }
}
close($FD);
print("sanzima $zone_name_cn $lastitem\n");
&deal_item($lastitem);
print("\n");
push(@sanzima, "$zone_name_cn $lastitem");

exit();
for(my $i = 0; $i < @sanzima; $i++)
{
    #大洋州 新西兰  NEW ZEALAND 利特尔顿(基督城)    CHRISTCHURCH    CHC
    if($sanzima[$i] =~ /^(\S+)\s+(\S+)\s+([a-zA-Z]+)/)
    {
    }
    else
    {
        print("error ".$sanzima[$i]."\n");
    }
}
sub  trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };
sub deal_item()
{
    my $lastitem=shift ;
    my ($country_cn, $country, $name_cn, $name, $sanzima);
    #美国    UNITED STATES   哈特福德    BRADLEY APO OF HARTFORD BDL
    if($lastitem =~ /^(\S+)\s+(.+)\s+([^a-zA-Z\s]+)\s+(.+)\s+(\S+)$/)
#elsif($line =~ /^(\S+)\s+(\S+)\s+([a-zA-Z]+\s+[a-zA-Z]+)\s+/)
    {
        #($zone, $country_cn, $country)=($1,$2,$3);
        ($country_cn, $country, $name_cn, $name, $sanzima)=($1,$2,$3,$4,$5,$6);
        $print_ori==1 and print("sanzima $zone_name_cn, $country_cn, $country, $name_cn, $name, $sanzima\n");

        $country =~ s/'/\\'/g;$country=trim($country);
        $country_cn =~ s/'/\\'/g;$country_cn=trim($country_cn);
        if(!defined($g_hashCountry{"$country"}))
        #if($last_country ne $country)
        {
            $g_hashCountry{"$country"}=$g_id;
            my $value="'$country', '$country_cn', '', ".$g_hashCountry{"$country"}.", $zone_id, 'country'";
            print("id: $g_id value $value\n");
            $g_values.=",($value)";
            $g_id++;
            #$last_country=$country;
        }
        $name =~ s/'/\\'/g;$name=trim($name);
        $name_cn =~ s/'/\\'/g;$name_cn=trim($name_cn);
        foreach my $sanzima_item (split(/\//, $sanzima))
        {
            my $value="'$name', '$name_cn', '$sanzima_item', ".$g_hashCountry{"$country"}.", $zone_id, 'sanzima'";
            print("id: $g_id value $value\n");
            $g_values.=",($value)";
            $g_id++;
        }
    }
    else{
        print("unkown $zone_name_cn $lastitem\n");
    }
}
