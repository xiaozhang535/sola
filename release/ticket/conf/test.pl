#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-13
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
my $values="1";
syswrite(STDOUT, ($values eq ""?"":",")."\n");

my $line="FUD-绥芬河机场HEK-黑河机场HRB-哈尔滨太平机场JMU-佳木斯东郊机场LDS-伊春林都机场MDG-牡丹江海浪机场 NDG-齐齐哈尔三家子机场OHE-漠河机场YLN-依兰机场JGD-加格达奇机场DQA-大庆机场";
while(1)
{
    if($line=~/^([A-Z]+)-([^A-Z]+)(.*)/)
    {
        syswrite(STDOUT, "code: $1 name: $2\n");
        $line=$3;
    }
    else
    {
        last;
    }
}
