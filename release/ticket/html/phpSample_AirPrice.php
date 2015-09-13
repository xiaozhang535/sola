<?php 
/* 
* uAPI sample communication in php language 
* 
* This example requires the cURL library to be installed and working. 
* 
* Please note, in the sample code below, the variable $CREDENTIALS is created by binding your username and password together with a colon e.g. 
* 
* $auth = base64_encode("Universal API/API1234567:mypassword"); 
* 
* The variable $TARGETBRANCH should be set to the TargetBranch provided by Travelport. 
* 
* (C) 2014 Travelport, Inc. 
* This code is for illustration purposes only. 
*/
$TARGETBRANCH = 'P7022986';
$CREDENTIALS = 'Universal API/uAPI9170948637-485aa294:rwxHzGjHN6A5FH6mAWCBgzJtY';
$Provider = '1G'; // Any provider you want to use like 1G/1P/1V/ACH
$day=date('Y-m-d',strtotime('+4 day'));
$day_ret=date('Y-m-d',strtotime('+7 day'));

$message = <<<EOM
<!-- Release 15.1 -->
<!-- Version Dated as of 11/May/2015 15:11:13 -->
<!-- Air Pricing For Galileo(1G) with LFS Request -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <air:AirPriceReq xmlns:air="http://www.travelport.com/schema/air_v31_0" AuthorizedBy="user" CheckFlightDetails="true" TargetBranch="$TARGETBRANCH" TraceId="trace">
            <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v31_0" OriginApplication="UAPI"/>
            <air:AirItinerary>
                <air:AirSegment Key="Rd+BMvOxSlaRUh5QXH+1KQ==" Group="0" Carrier="UA" FlightNumber="1586" Origin="SFO" Destination="MCO" DepartureTime="2015-08-05T06:30:00.000-07:00" ArrivalTime="2015-08-05T17:59:00.000-04:00" FlightTime="509" Distance="2438" ETicketability="Yes" Equipment="739" ChangeOfPlane="false" ParticipantLevel="Secure Sell" LinkAvailability="true" PolledAvailabilityOption="Polled avail exists" OptionalServicesIndicator="false" NumberOfStops="1" AvailabilitySource="A" AvailabilityDisplayType="Fare Shop/Optimal Shop" ProviderCode="$Provider" />
            </air:AirItinerary>
            <!--air:AirPricingModifiers CurrencyType="CNY" ProhibitNonRefundableFares="true">
                <air:PenaltyFareInformation ProhibitPenaltyFares="true"/>
            </air:AirPricingModifiers-->
            <air:AirPricingModifiers CurrencyType="CNY">
            </air:AirPricingModifiers>
            <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v31_0" BookingTravelerRef="gr8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
            <air:AirPricingCommand>
            </air:AirPricingCommand>
        </air:AirPriceReq>
    </soapenv:Body>
</soapenv:Envelope>
EOM;
$file = "001-".$Provider."_AirPriceReq.xml"; // file name to save the request xml for test only(if you want to save the request/response)
prettyPrint($message,$file);//call function to pretty print xml

$start_time=time();
$time_start = microtime(true);

$auth = base64_encode("$CREDENTIALS"); 
//$soap_do = curl_init ("https://americas.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService");
$soap_do = curl_init ("https://apac.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService");
//$soap_do = curl_init ("http://107.170.199.87:9999/B2BGateway/connect/uAPI/AirService");
$header = array(
"Content-Type: text/xml;charset=UTF-8", 
"Accept: gzip,deflate", 
"Cache-Control: no-cache", 
"Pragma: no-cache", 
"SOAPAction: \"\"",
"Authorization: Basic $auth", 
"Content-length: ".strlen($message),
); 
//curl_setopt($soap_do, CURLOPT_CONNECTTIMEOUT, 30); 
//curl_setopt($soap_do, CURLOPT_TIMEOUT, 30); 
curl_setopt($soap_do, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($soap_do, CURLOPT_SSL_VERIFYHOST, false); 
curl_setopt($soap_do, CURLOPT_POST, true ); 
curl_setopt($soap_do, CURLOPT_POSTFIELDS, $message); 
curl_setopt($soap_do, CURLOPT_HTTPHEADER, $header);
curl_setopt($soap_do, CURLOPT_RETURNTRANSFER, true); // this will prevent the curl_exec to return result and will let us to capture output
$return = curl_exec($soap_do);
//print "return: ".$return."\n";

$end_time=time();
$time_end = microtime(true);

print "use time: ".($end_time-$start_time)."s\n";
print "use time: ".($time_end-$time_start)."s\n";
$file = "001-".$Provider."_AirPriceRsp.xml"; // file name to save the response xml for test only(if you want to save the request/response)
$content = prettyPrint($return,$file);
parseOutput($content);
//print '<br>';
//echo $return;
//print '<br>';
//print_r(curl_getinfo($soap_do));

//Pretty print XML
function prettyPrint($result,$file){
	$dom = new DOMDocument;
	$dom->preserveWhiteSpace = false;
	$dom->loadXML($result);
	$dom->formatOutput = true;		
	//call function to write request/response in file	
	outputWriter($file,$dom->saveXML());
	return $dom->saveXML();
}

//function to write output in a file
function outputWriter($file,$content){	
	file_put_contents($file, $content); // Write request/response and save them in the File
}

function parseOutput($content){	//parse the Search response to get values to use in detail request
	$AirAvailabilitySearchRsp = $content; //use this if response is not saved anywhere else use above variable
	//echo $AirAvailabilitySearchRsp;
	$xml = simplexml_load_String("$AirAvailabilitySearchRsp", null, null, 'SOAP', true);	
	
	if($xml)
		echo "Processing! Please wait!";
	else{
		trigger_error("Encoding Error!", E_USER_ERROR);
	}

	$Results = $xml->children('SOAP',true);
	foreach($Results->children('SOAP',true) as $fault){
		if(strcmp($fault->getName(),'Fault') == 0){
			trigger_error("Error occurred request/response processing!", E_USER_ERROR);
		}
	}
	
	$count = 0;
	$fileName = "flights.txt";
	if(file_exists($fileName)){
		file_put_contents($fileName, "");
	}
	foreach($Results->children('air',true) as $nodes){
		foreach($nodes->children('air',true) as $hsr){
			if(strcmp($hsr->getName(),'AirSegmentList') == 0){
				foreach($hsr->children('air',true) as $hp){
					if(strcmp($hp->getName(),'AirSegment') == 0){
						$count = $count + 1;
						file_put_contents($fileName,"\r\n"."Air Segment ".$count."\r\n"."\r\n", FILE_APPEND);
						foreach($hp->attributes() as $a => $b	){
								$GLOBALS[$a] = "$b";
								//echo "$a"." : "."$b";
								file_put_contents($fileName,$a." : ".$b."\r\n", FILE_APPEND);
						}												
					}					
				}
			}
			//break;
		}
	}
	$Token = 'Token';
	$TokenKey = 'TokenKey';
	$fileName = "tokens.txt";
	if(file_exists($fileName)){
		file_put_contents($fileName, "");
	}
	foreach($Results->children('air',true) as $nodes){
		foreach($nodes->children('air',true) as $hsr){
			if(strcmp($hsr->getName(),'HostTokenList') == 0){			
				foreach($hsr->children('common_v31_0', true) as $ht){
					if(strcmp($ht->getName(), 'HostToken') == 0){
						$GLOBALS[$Token] = $ht[0];
						foreach($ht->attributes() as $a => $b){
							if(strcmp($a, 'Key') == 0){
								file_put_contents($fileName,$TokenKey.":".$b."\r\n", FILE_APPEND);
							}
						}						
						file_put_contents($fileName,$Token.":".$ht[0]."\r\n", FILE_APPEND);
					}
				}
			}
		}
	}
	
	echo "\r\n"."Processing Done. Please check results in files.";

}

?>
