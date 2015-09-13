package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
require('LuaXml');
require('public');
local message=[[
<?xml version="1.0"?>
<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP:Body>
    <air:AvailabilitySearchRsp xmlns:air="http://www.travelport.com/schema/air_v29_0" xmlns:common_v29_0="http://www.travelport.com/schema/common_v29_0" TraceId="trace" TransactionId="33A7B2040A076477AA9882DDAFF8E164" ResponseTime="759" DistanceUnits="MI">
      <common_v29_0:NextResultReference>H4sIAAAAAAAAAJ1UPUwUQRR+t3cnoJgLYojBKBqIYMHucedBzqNBQESXn3jEmLtQDLvDMri3u8zOHYsxJtoYCxsbowmFGklMLIyViYmFjdqhsdJYGFot7LTCmeUWWIledIvdnTff+97fN/PkG8RdCs3zqILkMiOmPEApWlKJy7xr7w/dfY2WoxAZhZhLLmPPAYDIYky8uVO3ZpdkI+UuEqbNyYbuykhHDsPUlflOybbkYY9RpLEp+xK21Ouf2sh604oE9UXYgyidIiUs4jDoKarcQQmoFE5VsnVsKhs0ikDmHayRWaIhRmwrxxl07GwxZGswnDaxR2ZMvJNJFUwuI5a/ZLBPFa1QTGQZSp5RYhkcEjeoXXYYNG/bHLUYNjDluw0lm2K/xgW4CnEVdtmUGCRYNTrUrhAd00GeUdUWZ5twzynTagdCzfTzDxq5M+9HRy6svrzTd0sC8McCnCVbg+XPXfjwYvrkwRtr0wGbGG/v/3G1y8UHiY7xVgkiKiRcjKg25+tgCC25DOS/Dyofxuc8CvK/debr8Y/f3716+0yCWAFaiDtJ8SymWBfAcZuNkArXIux1fHPVzqA9nFY1G3EglCHE/Cr5pBvdaiSxFtNL8Okz/n+eK4KzdNXWsY/M8SbzDh8NVVYtyD+EQUzYeCISxAvQqHNrUEIBEsSqIJP4BRRsC3MAC9VYP2/rSDAxOKDa1FDEWhGYUE2s6j+ONmqKCwUIAbRwH1n4yAKymdPzfk+fL37+KbRCoS0MmkEulk/xV4BeX//5ZWJafiiBdBbqyBgxTeLyQ0cG56ht2aZtLDFo/S29rb2cn8x4/3JMNKwzHEzzYfJofmLLoSPPyjOP3zTNLvRNdkaFnN0dSQa5iap9/IoSuXcl1brm4xcboG6YacrI2JTnOcL9WE0F+lO9/WPs/tPVrpsSRHlbuZBNwm+WbVLZbfLAIUtYhr6Rh3TEz35+30TVgYv8czidzCR7k6l0NpVOZjPJ7r50NplJZdLpE6me3gzHnTk34jjeL+TFwxrNBQAA</common_v29_0:NextResultReference>
      <air:FlightDetailsList>
        <air:FlightDetails Key="jQ/3K8uaQE61fdETC7fs4A==" Origin="HKG" Destination="LAX" DepartureTime="2015-06-29T09:30:00.000+08:00" ArrivalTime="2015-06-29T07:55:00.000-07:00" FlightTime="805" TravelTime="805" Equipment="77W" OriginTerminal="1" DestinationTerminal="B"/>
        <air:FlightDetails Key="HZ6WKas1S+KWUFbRXohhcg==" Origin="HKG" Destination="LAX" DepartureTime="2015-06-29T09:30:00.000+08:00" ArrivalTime="2015-06-29T07:55:00.000-07:00" FlightTime="805" TravelTime="805" Equipment="773" OriginTerminal="1" DestinationTerminal="B"/>
      </air:FlightDetailsList>
      <air:AirSegmentList>
        <air:AirSegment Key="zCbr8q92QDmAMvCYPR9kbg==" Group="0" Carrier="CX" FlightNumber="898" Origin="HKG" Destination="LAX" DepartureTime="2015-06-29T09:30:00.000+08:00" ArrivalTime="2015-06-29T07:55:00.000-07:00" FlightTime="805" TravelTime="805" ETicketability="Yes" Equipment="77W" ChangeOfPlane="false" ParticipantLevel="Secure Sell" LinkAvailability="true" PolledAvailabilityOption="Polled avail exists" OptionalServicesIndicator="false" AvailabilitySource="A" AvailabilityDisplayType="General">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo CabinClass="First" BookingCounts="F4|A4"/>
            <air:BookingCodeInfo CabinClass="Business" BookingCounts="J9|C9|D9|I9"/>
            <air:BookingCodeInfo CabinClass="PremiumEconomy" BookingCounts="W9|R9|E9"/>
            <air:BookingCodeInfo CabinClass="Economy" BookingCounts="Y9|B9|H9|K9|M9|L9|V9|S9|N9|Q9|O9"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="jQ/3K8uaQE61fdETC7fs4A=="/>
        </air:AirSegment>
        <air:AirSegment Key="pEFIKdy9S86M5RDadrvDOA==" Group="0" Carrier="AA" FlightNumber="8941" Origin="HKG" Destination="LAX" DepartureTime="2015-06-29T09:30:00.000+08:00" ArrivalTime="2015-06-29T07:55:00.000-07:00" FlightTime="805" TravelTime="805" ETicketability="Yes" Equipment="773" ChangeOfPlane="false" ParticipantLevel="Secure Sell" LinkAvailability="true" PolledAvailabilityOption="Polled avail exists" OptionalServicesIndicator="false" AvailabilitySource="O" AvailabilityDisplayType="General">
          <air:CodeshareInfo OperatingCarrier="CX" OperatingFlightNumber="898">CATHAY PACIFIC AIRWAYS L</air:CodeshareInfo>
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo CabinClass="First" BookingCounts="FA"/>
            <air:BookingCodeInfo CabinClass="Business" BookingCounts="JA"/>
            <air:BookingCodeInfo CabinClass="Economy" BookingCounts="SA|YA|BA|HA|MA|NA|KA|LA|QA|VA|GA"/>
            <air:BookingCodeInfo CabinClass="PremiumEconomy" BookingCounts="WA"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="HZ6WKas1S+KWUFbRXohhcg=="/>
        </air:AirSegment>
      </air:AirSegmentList>
      <air:AirItinerarySolution Key="bSV8/lk5StWcyc0qznCXTg==">
        <air:AirSegmentRef Key="zCbr8q92QDmAMvCYPR9kbg=="/>
        <air:AirSegmentRef Key="pEFIKdy9S86M5RDadrvDOA=="/>
        <air:Connection SegmentIndex="8"/>
        <air:Connection SegmentIndex="10"/>
        <air:Connection SegmentIndex="12"/>
        <air:Connection SegmentIndex="14"/>
      </air:AirItinerarySolution>
    </air:AvailabilitySearchRsp>
  </SOAP:Body>
</SOAP:Envelope>

]];
local msg_price="";
local airSegments="";
local hashAirSegment={};
local my_xml = xml.eval(message);
if my_xml ~= nil then
    --[[
    while true do
        local seg = my_xml:find("air:AirSegment"); --find 是一次性的，同时只返回一个值
        if seg == nil then
            break;
        end
        print(seg);
        --if type(seg) == "table" then
    end
    ]]
    local soap = my_xml:find("air:AirSegmentList");
    if soap ~= nil and type(soap) == "table" then
        --print(soap);
        for k, v in pairs(soap) do  
            print("k: ", k, " v: ", v);
            if k ~= 0 and type(v) == "table" then
                local availInfo = v:find("air:AirAvailInfo");
                if availInfo ~= nil then
                    print("vailInfo: ", availInfo);
                end
                --airSegment
                local airSegment="";
                local key="";
                for k_s, v_s in pairs(v) do
                    --print("type_k_s: ", type(k_s), " k_s: ", k_s, " v_s: ", v_s);
                    if type(k_s) == "string" then
                        airSegment=airSegment .. " " .. k_s .. "=\"" .. v_s .. "\"";
                        if k_s == "Key" then
                            key=v_s;
                        end
                    end
                end
                print ("airSegment: ", airSegment);
                if airSegment ~= "" then
                    airSegments=airSegments .. "<air:AirSegment " .. airSegment .. "/>\n";
                end
                if key ~= "" then
                    print( "key: ", key);
                    hashAirSegment[key]=airSegment;
                end
            end
        end
        --print(public.dump(soap));
    end
    for k, v in pairs(hashAirSegment) do
        print(v);
        print( "key: ", k, " val: ", v);
    end
else
    print("error xml");
end
if airSegments ~= "" then
    msg_price=[[
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
  <soapenv:Body>
    <air:AirPriceReq xmlns:air="http://www.travelport.com/schema/air_v29_0" AuthorizedBy="user" TargetBranch="TRGT_BRCH" TraceId="trace">
      <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v29_0" OriginApplication="UAPI"/>
      <air:AirItinerary>
    ]] .. airSegments .. [[
</air:AirItinerary>
      <air:AirPricingModifiers PlatingCarrier="QF"/>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v29_0" BookingTravelerRef="gr8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v29_0" BookingTravelerRef="KAnpOljGv5hGShsrlYIhwm==" Code="CHD"/>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v29_0" BookingTravelerRef="BAMOKrJu4hGShsrlYIhwmw==" Code="INF"/>
      <air:AirPricingCommand CabinClass="Economy"/>
    </air:AirPriceReq>
  </soapenv:Body>
</soapenv:Envelope>
    ]]
    print (msg_price);
end
