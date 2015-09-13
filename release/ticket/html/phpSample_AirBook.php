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
<!-- Air Booking For Galileo(1G) with LFS Request -->
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
        <univ:AirCreateReservationReq xmlns:univ="http://www.travelport.com/schema/universal_v31_0" AuthorizedBy="user" RetainReservation="Both" TargetBranch="$TARGETBRANCH" TraceId="trace">
            <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v31_0" OriginApplication="UAPI"/>
            <com:BookingTraveler xmlns:com="http://www.travelport.com/schema/common_v31_0" DOB="1983-04-07" Gender="M" Key="gr8AVWGCR064r57Jt0+8bA==" TravelerType="ADT">
                <com:BookingTravelerName First="Zhang" Last="Zhicheng"/>
                <com:DeliveryInfo>
                    <com:ShippingAddress>
                        <com:AddressName>Smiths</com:AddressName>
                        <com:Street>Rossmarkt 6</com:Street>
                        <com:City>Frankfurt</com:City>
                        <com:State>Hesse</com:State>
                        <com:PostalCode>60311</com:PostalCode>
                        <com:Country>DE</com:Country>
                    </com:ShippingAddress>
                </com:DeliveryInfo>
                <com:PhoneNumber AreaCode="49" CountryCode="086" Location="FRA" Number="261111111"/>
                <com:Email EmailID="test@travelport.com" Type="Home"/>
                <!--com:SSR Carrier="UA" FreeText="P/DE/F1234567/DE/12May57/M/01Jun14/Heinrich/Frederick" SegmentRef="FxUPDmXkROqwcyM2KUHfDg==" Status="HK" Type="DOCS"/-->
                <com:Address>
                    <com:AddressName>Smiths</com:AddressName>
                    <com:Street>Rossmarkt 6</com:Street>
                    <com:City>Frankfurt</com:City>
                    <com:State>Hesse</com:State>
                    <com:PostalCode>60311</com:PostalCode>
                    <com:Country>DE</com:Country>
                </com:Address>
            </com:BookingTraveler>
            <com:FormOfPayment xmlns:com="http://www.travelport.com/schema/common_v31_0" Key="jwt2mcK1Qp27I2xfpcCtAw==" Type="Cash"/>
        <air:AirPricingSolution Key="ayTTA7EBQcSLKcFyJ1P6dw==" TotalPrice="CNY1898" BasePrice="USD269.77" ApproximateTotalPrice="CNY1898" ApproximateBasePrice="CNY1660" EquivalentBasePrice="CNY1660" Taxes="CNY238" ApproximateTaxes="CNY238" QuoteDate="2015-08-01">
        <air:AirSegment Key="Bb2RI+KjSFy4HcMMe84+Eg==" Group="0" Carrier="UA" FlightNumber="1586" ProviderCode="1G" Origin="SFO" Destination="MCO" DepartureTime="2015-08-05T06:30:00.000-07:00" ArrivalTime="2015-08-05T17:59:00.000-04:00" FlightTime="509" TravelTime="509" Distance="2438" ClassOfService="W" Equipment="739" NumberOfStops="1" ChangeOfPlane="false" OptionalServicesIndicator="false" AvailabilitySource="S" ParticipantLevel="Secure Sell" LinkAvailability="true" PolledAvailabilityOption="O and D cache or polled status used with different local status" AvailabilityDisplayType="Fare Specific Fare Quote Unbooked">
          <air:FlightDetails Key="ZGyuxOlmSn+AeiKPUf8/gg==" Origin="SFO" Destination="ORD" DepartureTime="2015-08-05T06:30:00.000-07:00" FlightTime="258" TravelTime="258" Equipment="739" OriginTerminal="3" DestinationTerminal="1">
                    <air:Connection SegmentIndex="0" FlightDetailsIndex="1"/>
                    <air:Meals>FoodForPurchase</air:Meals>
                    <air:InFlightServices>Non-smoking</air:InFlightServices>
                    <air:InFlightServices>Non-smoking</air:InFlightServices>
                  </air:FlightDetails>
          <air:FlightDetails Key="OVFu0YnsSHGQl4mkAN4qPg==" Origin="ORD" Destination="MCO" ArrivalTime="2015-08-05T17:59:00.000-04:00" FlightTime="174" TravelTime="174" Equipment="739" OriginTerminal="1">
                    <air:Meals>FoodAndBeveragesForPurchase</air:Meals>
                    <air:InFlightServices>Non-smoking</air:InFlightServices>
                    <air:InFlightServices>Non-smoking</air:InFlightServices>
                  </air:FlightDetails>
                </air:AirSegment>
          <air:AirPricingInfo Key="oQbdXFAYTjaydPBpKshFNQ==" TotalPrice="CNY1898" BasePrice="USD269.77" ApproximateTotalPrice="CNY1898" ApproximateBasePrice="CNY1660" EquivalentBasePrice="CNY1660" ApproximateTaxes="CNY238" Taxes="CNY238" LatestTicketingTime="2015-08-02T23:59:00.000+10:00" PricingMethod="Manual" IncludesVAT="false" ETicketability="Yes" PlatingCarrier="UA" ProviderCode="1G">
            <air:FareInfo Key="yL3BEUl6TFCPrZyd2B1THg==" FareBasis="WAA00AZN" PassengerTypeCode="ADT" Origin="SFO" Destination="MCO" EffectiveDate="2015-08-01T21:17:00.000+10:00" DepartureDate="2015-08-05" Amount="CNY1660" NotValidBefore="2015-08-05" NotValidAfter="2015-08-05">
                      <common_v31_0:Endorsement Value="NONREF/0VALUAFTDPT/CHGFEE"/>
              <air:FareRuleKey FareInfoRef="yL3BEUl6TFCPrZyd2B1THg==" ProviderCode="1G">6UUVoSldxwi8YVpXmIrfwsbKj3F8T9EyxsqPcXxP0TIjSPOlaHfQe5cuasWd6i8Dly5qxZ3qLwOXLmrFneovA5cuasWd6i8Dly5qxZ3qLwOXLmrFneovA0v5WALzwHErO422wYI1U7dguxBNix7AA1/IXfluB151Qu0ZscBMSQ7AvMKi/VPtcudUnj/xsDuu3xlmQOQjE+afdLO1f1+DFWLgFn3B9sPd6v9tEaRJgF5C/YIEuJEelpGL74YNUBfVsbbOoAyZ1UFJTyB5x9tYSbUSm61kBU5OuGdrtUQs3wL6g5i15AO3QEACA4xcw3/+Ps2kBTFkA92F/oTXxxF6MRsvlJFXSYuYHZNO0IOqY3aUuA32Ku4i9d+JY2T4mE/2iYqD1taBKM9e1u/ZdGuhdafpkLd2H/NTccvr40e6Z37hTdRV2s3CuDzD4Wdjal2fly5qxZ3qLwOXLmrFneovA5cuasWd6i8DUAh2WcSFc+w=</air:FareRuleKey>
                    </air:FareInfo>
            <air:BookingInfo BookingCode="W" CabinClass="Economy" FareInfoRef="yL3BEUl6TFCPrZyd2B1THg==" SegmentRef="Bb2RI+KjSFy4HcMMe84+Eg=="/>
            <air:TaxInfo Category="AY" Amount="CNY35" Key="H/gpQcjVTZahTEVjEY3UrA=="/>
            <air:TaxInfo Category="US" Amount="CNY125" Key="Yro4Lyf1RW+lhFRnbcK91Q=="/>
            <air:TaxInfo Category="XF" Amount="CNY28" Key="1pYaqN1nQIeHjiAdXywj1g==">
              <common_v31_0:TaxDetail Amount="USD5.00" OriginAirport="SFO"/>
            </air:TaxInfo>
            <air:TaxInfo Category="ZP" Amount="CNY50" Key="t/P9XyEQSS2F7LMdySXMRA==">
              <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="SFO"/>
              <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="ORD"/>
            </air:TaxInfo>
                    <air:FareCalc>SFO UA ORL 269.77WAA00AZN USD269.77END</air:FareCalc>
                    <air:PassengerType BookingTravelerRef="gr8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
                    <air:ChangePenalty>
                      <air:Amount>CNY1230.0</air:Amount>
                    </air:ChangePenalty>
                    <air:BaggageAllowances>
                      <air:BaggageAllowanceInfo TravelerType="ADT" Origin="SFO" Destination="ORL" Carrier="UA">
                        <air:URLInfo>
                          <air:URL>MYTRIPANDMORE.COM/BAGGAGEDETAILSUA.BAGG</air:URL>
                        </air:URLInfo>
                        <air:TextInfo>
                          <air:Text>0P</air:Text>
                          <air:Text>BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER STATUS/ ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC.</air:Text>
                        </air:TextInfo>
                        <air:BagDetails ApplicableBags="1stChecked" BasePrice="USD25.00" ApproximateBasePrice="CNY153" TotalPrice="USD25.00" ApproximateTotalPrice="CNY153">
                          <air:BaggageRestriction>
                            <air:TextInfo>
                              <air:Text>UPTO50LB/23KG AND UPTO62LI/158LCM</air:Text>
                            </air:TextInfo>
                          </air:BaggageRestriction>
                        </air:BagDetails>
                        <air:BagDetails ApplicableBags="2ndChecked" BasePrice="USD35.00" ApproximateBasePrice="CNY214" TotalPrice="USD35.00" ApproximateTotalPrice="CNY214">
                          <air:BaggageRestriction>
                            <air:TextInfo>
                              <air:Text>UPTO50LB/23KG AND UPTO62LI/158LCM</air:Text>
                            </air:TextInfo>
                          </air:BaggageRestriction>
                        </air:BagDetails>
                      </air:BaggageAllowanceInfo>
                      <air:CarryOnAllowanceInfo Origin="SFO" Destination="ORL" Carrier="UA">
                        <air:TextInfo>
                          <air:Text>BAGGAGE ALLOWANCE DATA NOT AVAILABLE</air:Text>
                        </air:TextInfo>
                      </air:CarryOnAllowanceInfo>
                    </air:BaggageAllowances>
                </air:AirPricingInfo>
            </air:AirPricingSolution>
            <com:ActionStatus xmlns:com="http://www.travelport.com/schema/common_v31_0" ProviderCode="1G" TicketDate="2015-08-01T21:24:26" Type="TAW"/>
        </univ:AirCreateReservationReq>
    </soapenv:Body>
</soapenv:Envelope>
EOM;
$file = "001-".$Provider."_AirBookReq.xml"; // file name to save the request xml for test only(if you want to save the request/response)
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
$file = "001-".$Provider."_AirBookRsp.xml"; // file name to save the response xml for test only(if you want to save the request/response)
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
