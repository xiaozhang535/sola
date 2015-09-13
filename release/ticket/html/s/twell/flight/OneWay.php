<?php
include '../../Public.php';
include 'InitialOneWay.php';
//http://www.qunar.com/twell/flight/Search.jsp?from=qunarindex&searchType=RoundTripFlight&fromCity=%E5%8C%97%E4%BA%AC%28BJS%29&toCity=%E6%AD%A6%E6%B1%89%28WUH%29&fromDate=2015-08-16&toDate=2015-08-20
//http://10.211.55.5/twell/flight/Search.jsp?from=qunarindex&searchType=OnewayFlight&fromCity=%E5%8C%97%E4%BA%AC%28BJS%29&toCity=%E6%AD%A6%E6%B1%89%28WUH%29&fromDate=2015-08-15&toDate=2015-08-18
//http://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=%E5%8C%97%E4%BA%AC&searchArrivalAirport=%E6%AD%A6%E6%B1%89&searchDepartureTime=2015-08-16&searchArrivalTime=2015-08-20&nextNDays=0&startSearch=true&fromCode=BJS&toCode=WUH&from=qunarindex&lowestPrice=null
$arr_req=get_req();

print get_html($arr_req);
?>
