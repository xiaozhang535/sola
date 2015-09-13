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
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <air:AvailabilitySearchReq TraceId="trace" AuthorizedBy="user" TargetBranch="$TARGETBRANCH" xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:com="http://www.travelport.com/schema/common_v31_0">
         <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
         <air:SearchAirLeg>
            <air:SearchOrigin>
               <com:Airport Code="HKG"/>
            </air:SearchOrigin>
            <air:SearchDestination>
               <com:Airport Code="LAX"/>
            </air:SearchDestination>
            <air:SearchDepTime PreferredTime="2015-06-29">
            </air:SearchDepTime>            
         </air:SearchAirLeg>
         <air:AirSearchModifiers>
            <air:PreferredProviders>
               <com:Provider Code="$Provider"/>
            </air:PreferredProviders>
         </air:AirSearchModifiers>
      </air:AvailabilitySearchReq>
   </soapenv:Body>
</soapenv:Envelope>
EOM;
$message = <<<EOM
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
<soapenv:Header/>
<soapenv:Body>
<air:LowFareSearchReq xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:com="http://www.travelport.com/schema/common_v31_0" AuthorizedBy="user" SolutionResult="true" TargetBranch="$TARGETBRANCH" TraceId="trace" MaxNumberOfExpertSolutions="1">
    <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
    <air:SearchAirLeg>
        <air:SearchOrigin>
            <com:Airport Code="SFO"/>
        </air:SearchOrigin>
        <air:SearchDestination>
            <com:Airport Code="MCO"/>
        </air:SearchDestination>
        <air:SearchDepTime PreferredTime="$day"/>
    </air:SearchAirLeg>
    <air:SearchAirLeg>
        <air:SearchOrigin>
            <com:Airport Code="MCO"/>
        </air:SearchOrigin>
        <air:SearchDestination>
            <com:Airport Code="SFO"/>
        </air:SearchDestination>
        <air:SearchDepTime PreferredTime="$day_ret"/>
    </air:SearchAirLeg>
    <air:AirSearchModifiers MaxSolutions="1">
        <air:PreferredProviders>
            <com:Provider Code="$Provider"/>
        </air:PreferredProviders>
        <air:PermittedCarriers>
            <com:Carrier Code="DL"/>
        </air:PermittedCarriers>
    </air:AirSearchModifiers>
    <com:SearchPassenger BookingTravelerRef="gr8AVWGCR054r57Jt0+8bA==" Code="ADT"/>
</air:LowFareSearchReq>
</soapenv:Body>
</soapenv:Envelope>
EOM;
//single
if (true )
{
$message = <<<EOM
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
<soapenv:Header/>
<soapenv:Body>
    <air:LowFareSearchReq xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:com="http://www.travelport.com/schema/common_v31_0" AuthorizedBy="user" SolutionResult="true" TargetBranch="$TARGETBRANCH" TraceId="trace" >
        <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
        <air:SearchAirLeg>
            <air:SearchOrigin>
                <com:Airport Code="SFO"/>
            </air:SearchOrigin>
            <air:SearchDestination>
                <com:Airport Code="MCO"/>
            </air:SearchDestination>
            <air:SearchDepTime PreferredTime="$day"/>
        </air:SearchAirLeg>
        <air:AirSearchModifiers MaxSolutions="1">
            <air:PreferredProviders>
                <com:Provider Code="$Provider"/>
            </air:PreferredProviders>
        </air:AirSearchModifiers>
        <com:SearchPassenger BookingTravelerRef="gr8AVWGCR054r57Jt0+8bA==" Code="ADT"/>
        <air:AirPricingModifiers CurrencyType="CNY" />
    </air:LowFareSearchReq>
</soapenv:Body>
</soapenv:Envelope>
EOM;
}
//set currenty CAD
if (false )
{
$message = <<<EOM
<?xml version="1.0"?>
<!--Release 8.0-->
<!--Version Dated as of 11/Nov/2014 16:39:20-->
<!--Air Search For ACH(ACH) LFS Request-->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
  <soapenv:Body>
    <air:LowFareSearchReq xmlns:air="http://www.travelport.com/schema/air_v31_0" AuthorizedBy="user" SolutionResult="true" TargetBranch="$TARGETBRANCH" TraceId="trace">
      <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v31_0" OriginApplication="UAPI"/>
      <air:SearchAirLeg>
        <air:SearchOrigin>
          <com:Airport xmlns:com="http://www.travelport.com/schema/common_v31_0" Code="SFO"/>
        </air:SearchOrigin>
        <air:SearchDestination>
          <com:Airport xmlns:com="http://www.travelport.com/schema/common_v31_0" Code="MCO"/>
        </air:SearchDestination>
        <air:SearchDepTime PreferredTime="$day"/>
      </air:SearchAirLeg>
      <air:AirSearchModifiers MaxSolutions="1">
        <air:PreferredProviders>
          <com:Provider xmlns:com="http://www.travelport.com/schema/common_v31_0" Code="$Provider"/>
        </air:PreferredProviders>
      </air:AirSearchModifiers>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v31_0" BookingTravelerRef="gr8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v31_0" BookingTravelerRef="LQ/blhXrSyydUeLLbiAK0Q==" Code="ADT"/>
      <air:AirPricingModifiers CurrencyType="CAD" ProhibitAdvancePurchaseFares="false" ProhibitMaxStayFares="false" ProhibitMinStayFares="false" ProhibitNonRefundableFares="false" ProhibitRestrictedFares="false">
      </air:AirPricingModifiers>
    </air:LowFareSearchReq>
  </soapenv:Body>
</soapenv:Envelope>
EOM;
}
$file = "001-".$Provider."_AirLowFareReq.xml"; // file name to save the request xml for test only(if you want to save the request/response)
prettyPrint($message,$file);//call function to pretty print xml

$start_time=time();
$time_start = microtime(true);

$auth = base64_encode("$CREDENTIALS"); 
//$soap_do = curl_init ("https://americas.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService");
$soap_do = curl_init ("https://apac.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService");
//$soap_do = curl_init ("https://apac.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/");
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
$file = "001-".$Provider."_AirLowFareRsp.xml"; // file name to save the response xml for test only(if you want to save the request/response)
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
