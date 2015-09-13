<?php
include '../../Public.php';
//http://www.qunar.com/twell/flight/Search.jsp?from=qunarindex&searchType=RoundTripFlight&fromCity=%E5%8C%97%E4%BA%AC%28BJS%29&toCity=%E6%AD%A6%E6%B1%89%28WUH%29&fromDate=2015-08-16&toDate=2015-08-20
//http://10.211.55.5/twell/flight/Search.jsp?from=qunarindex&searchType=OnewayFlight&fromCity=%E5%8C%97%E4%BA%AC%28BJS%29&toCity=%E6%AD%A6%E6%B1%89%28WUH%29&fromDate=2015-08-15&toDate=2015-08-18
//http://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=%E5%8C%97%E4%BA%AC&searchArrivalAirport=%E6%AD%A6%E6%B1%89&searchDepartureTime=2015-08-16&searchArrivalTime=2015-08-20&nextNDays=0&startSearch=true&fromCode=BJS&toCode=WUH&from=qunarindex&lowestPrice=null

$arr_req=get_req();
//http://10.211.55.5/s/twell/flight/Search.php?from=qunarindex&searchType=OnewayFlight&fromCity=%E5%8C%97%E4%BA%AC%28BJS%29&toCity=%E6%B7%B1%E5%9C%B3%28SZX%29&fromDate=2015-08-25&toDate=2015-08-18
//print '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
//print "searchDepartureAirport: -".substr($arr_req["fromCity"],0, -5)."-";
//var_dump($arr_req);
header("Location:OneWay.php?searchDepartureAirport=".substr($arr_req["fromCity"],0, -5)."&searchArrivalAirport=".substr($arr_req["toCity"],0, -5)."&searchDepartureTime=".$arr_req["fromDate"]."&nextNDays=0&startSearch=true&fromCode=".substr($arr_req["fromCity"],-4, -1)."&toCode=".substr($arr_req["toCity"],-4, -1)."&from=qunarindex&lowestPrice=null");

#print get_html($arr_req);
?>
