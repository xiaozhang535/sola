#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-01
@description: 
=cut

use strict;
use Getopt::Long qw(:config pass_through);
use File::Basename;
#use lib '/usr/local/avs/public_tools/';
#use zero_util qw( InistanceCount);

#my $count=&InistanceCount("$0");#单实例
#if($count>1){
#print("Inistance_exist count: $count");
#exit();
#}

#my $dir = dirname($0);
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
sub  trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s };
my $sanzima_test="WAS/IAD/AAA ";
foreach my $sanzima_item (split(/\//, $sanzima_test))
{
    print("sanzima_itme: '".trim($sanzima_item)."'\n");
}
exit();


my $zone_name="ST.GEORGE\"'S";
$zone_name =~ s/'/\\'/g;
my $value="'$zone_name'";
print $value;
exit();

my $line="大洋州 新西兰  NEW ZEALAND 利特尔顿(基督城)    CHRISTCHURCH    CHC";
$line="北美洲 美国    UNITED STATES   哈特福德    BRADLEY APO OF HARTFORD BDL";
$line="北美洲 美国    STATES   哈特福德    BRADLEY APO OF HARTFORD BDL";
$line="北美洲 海地    HAITI   太子港  PORT-AU & PRINCE  PAP";
$line="特立尼达和多巴哥    TRINIDAD & TOBAGO   西班牙港    PORT  OF  SPAIN POS";
my ($zone, $country_cn, $country, $name_cn, $name, $sanzima);

if($line =~ /^(\S+)\s+(.+)\s+([^a-zA-Z\s]+)\s+(.+)\s+(\S+)$/)
#elsif($line =~ /^(\S+)\s+(\S+)\s+([a-zA-Z]+\s+[a-zA-Z]+)\s+/)
{
    #($zone, $country_cn, $country)=($1,$2,$3);
    ($country_cn, $country, $name_cn, $name, $sanzima)=($1,$2,$3,$4,$5);
}
print("$country_cn, $country, $name_cn, $name, $sanzima\n");
