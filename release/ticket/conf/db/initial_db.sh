#!/bin/bash

<<COMMENT
@author: ginozhang
@date: 2015-08-06
@description: 
COMMENT

mysqlcmd='mysql -uroot -hlocalhost -pdatacenter123';
$mysqlcmd < mysql_db_strategy.txt
$mysqlcmd < mysql_db_iata.txt
$mysqlcmd < mysql_db_threecode.txt
$mysqlcmd < mysql_db_user.txt
./iata_meicheng_parse.pl;
./threecode_meicheng_parse.pl;
