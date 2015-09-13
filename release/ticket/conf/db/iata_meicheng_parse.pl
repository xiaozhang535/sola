#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-22
@description: 
=cut

use strict;
use Getopt::Long qw(:config pass_through);
use File::Basename;

my ($file_dbvalue, $file_iata_berth, $file_iata_describe)=("mysql_value_iata.sql", "iata_berth.txt", "iata.txt");
my ($fd_dbvalue, $fd_iata_berth, $fd_iata_describe);
my $mysql="mysql -uroot -pdatacenter123 -hlocalhost ticket_lua";
`$mysql < mysql_db_iata.txt`;
open($fd_dbvalue, ">$file_dbvalue");
open($fd_iata_berth, "<$file_iata_berth");
while(my $line=<$fd_iata_berth>)
{
    chomp $line;
    if($line=~/^(\S\S)\s+/)
    {
        if($line=~/^(\S\S)\s+(\d)\s+(\S+)/)
        {
            my ($carrier, $berthidx, $berth)=($1,$2,$3);
            my $sql="insert into iata(iata, berth$berthidx) values('$carrier', '$berth') on duplicate key update berth$berthidx='$berth';";
            syswrite(STDOUT, "$carrier, $berthidx, $berth sql: $sql\n");
            syswrite($fd_dbvalue, "$sql\n");
            `$mysql -e "$sql"`;
        }
    }
    else
    {
        syswrite(STDOUT, "error: $line\n");
    }
}
close($fd_iata_berth);
close($fd_dbvalue);
