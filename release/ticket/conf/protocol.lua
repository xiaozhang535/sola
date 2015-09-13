package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
local P = {}
protocol = P
local public=require ("public");

local url="/B2BGateway/connect/uAPI/AirService";
local TARGETBRANCH = 'P7022986';
local CREDENTIALS = 'Universal API/uAPI9170948637-485aa294:rwxHzGjHN6A5FH6mAWCBgzJtY';
local Provider = '1G'; --- Any provider you want to use like 1G/1P/1V/ACH
local auth = scan.encode_base64(CREDENTIALS); 

function P.init_header()
    ---scan.req.set_header("X-My-Header", val);
    scan.req.set_header("Content-Type", "text/xml;charset=UTF-8");
    ---scan.req.set_header("Accept","gzip,deflate"); 
    scan.req.set_header("Cache-Control","no-cache");
    scan.req.set_header("Pragma","no-cache");
    scan.req.set_header("SOAPAction","\"\"");
    scan.req.set_header("Authorization","Basic " .. auth);
end
function P.send_LowFareSearch(req)
    if type(req) ~= "table" or req["fromCity"] == nil or req["fromDate"] == nil or req["toCity"] == nil or req["tripType"] ==nil then
        scan.say("request is wrong");
        return nil;
    end
    local fromDate,retDate;
    if req["tripType"] == "2" then
        if req["retDate"] == nil then
            scan.say("request is wrong");
            return nil;
        else
            retDate=os.date("%Y-%m-%d", os.time({year=string.sub(req["retDate"],1,4),month=string.sub(req["retDate"],5,6),day=string.sub(req["retDate"],7,8)}));
        end
    end
    fromDate=os.date("%Y-%m-%d", os.time({year=string.sub(req["fromDate"],1,4),month=string.sub(req["fromDate"],5,6),day=string.sub(req["fromDate"],7,8)}));

    P.init_header();
    local message=[[
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
        <air:LowFareSearchReq xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:com="http://www.travelport.com/schema/common_v31_0" AuthorizedBy="user" SolutionResult="true" TargetBranch="]] .. TARGETBRANCH .. [[" TraceId="trace">
            <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
            <air:SearchAirLeg>
                <air:SearchOrigin>
                    <com:Airport Code="]] .. req["fromCity"] .. [["/>
                </air:SearchOrigin>
                <air:SearchDestination>
                    <com:Airport Code="]] .. req["toCity"] .. [["/>
                </air:SearchDestination>
                <air:SearchDepTime PreferredTime="]] .. fromDate .. [["/>
            </air:SearchAirLeg>
            ]];
    if retDate ~= nil then
        message=message .. [[
        <air:SearchAirLeg>
            <air:SearchOrigin>
                <com:Airport Code="]] .. req["toCity"] .. [["/>
            </air:SearchOrigin>
            <air:SearchDestination>
                <com:Airport Code="]] .. req["fromCity"] .. [["/>
            </air:SearchDestination>
            <air:SearchDepTime PreferredTime="]].. retDate ..[["/>
        </air:SearchAirLeg>
        ]];
    end
    message=message .. [[
            <air:AirSearchModifiers MaxSolutions="2" >
                <air:PreferredProviders>
                    <com:Provider Code="1G"/>
                </air:PreferredProviders>
            </air:AirSearchModifiers>
            <com:SearchPassenger BookingTravelerRef="ga8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
            <com:SearchPassenger BookingTravelerRef="ga8AVWGCR064r57Jt0+8bA==" Code="CNN"/>
            <air:AirPricingModifiers CurrencyType="CNY"/>
        </air:LowFareSearchReq>
        </soapenv:Body>
        </soapenv:Envelope>
        ]];
    scan.log(scan.DEBUG, "request lowfare: ", message);
    return public.jiaopenurl(url , message);
end
function P.send_search_flights()
    P.init_header();
    message=[[
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Header/>
    <soapenv:Body>
    <air:AvailabilitySearchReq TraceId="trace" AuthorizedBy="user" TargetBranch="]] .. TARGETBRANCH .. [[" xmlns:air="http://www.travelport.com/schema/air_v29_0" xmlns:com="http://www.travelport.com/schema/common_v29_0">
    <com:BillingPointOfSaleInfo OriginApplication="UAPI"/>
    <air:SearchAirLeg>
    <air:SearchOrigin>
    <com:Airport Code="HKG"/>
    </air:SearchOrigin>
    <air:SearchDestination>
    <com:Airport Code="LAX"/>
    </air:SearchDestination>
    <air:SearchDepTime PreferredTime="2015-07-01">
    </air:SearchDepTime>            
    </air:SearchAirLeg>
    <air:AirSearchModifiers>
    <air:PreferredProviders>
    <com:Provider Code="]] .. Provider .. [["/>
    </air:PreferredProviders>
    </air:AirSearchModifiers>
    </air:AvailabilitySearchReq>
    </soapenv:Body>
    </soapenv:Envelope>
    ]]
    scan.log(scan.DEBUG, "request flight: ", message);
    return public.jiaopenurl(url , message);
end
function P.send_search_price(airSegments)
    P.init_header();
    message=[[
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
  <soapenv:Body>
    <air:AirPriceReq xmlns:air="http://www.travelport.com/schema/air_v29_0" AuthorizedBy="user" TargetBranch="]] .. TARGETBRANCH .. [[" TraceId="trace">
      <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v29_0" OriginApplication="UAPI"/>
      <air:AirItinerary>
        <air:AirSegment ArrivalTime="2015-06-29T12:25:00.000+02:00" AvailabilityDisplayType="General" AvailabilitySource="S" Carrier="AY" ChangeOfPlane="false" DepartureTime="2015-06-29T07:30:00.000+00:00" Destination="HEL" ETicketability="Yes" Equipment="319" FlightNumber="3126" FlightTime="175" Group="0" Key="NAarnSW9Q5CRTr3eIMxlxg==" LinkAvailability="true" OptionalServicesIndicator="false" Origin="LHR" ParticipantLevel="Secure Sell" PolledAvailabilityOption="Polled avail used" ProviderCode="1G" TravelTime="175"/>
        <air:AirSegment ArrivalTime="2015-07-01T09:10:00.000+00:00" AvailabilityDisplayType="General" AvailabilitySource="S" Carrier="AY" ChangeOfPlane="false" DepartureTime="2015-07-01T07:45:00.000+02:00" Destination="LHR" ETicketability="Yes" Equipment="320" FlightNumber="5905" FlightTime="205" Group="1" Key="vTD623uySz2FAB0tuTJLhg==" LinkAvailability="true" OptionalServicesIndicator="false" Origin="HEL" ParticipantLevel="Secure Sell" PolledAvailabilityOption="Polled avail used" ProviderCode="]] .. Provider .. [[" TravelTime="205"/>
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
    message=[[
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
  <soapenv:Body>
    <air:AirPriceReq xmlns:air="http://www.travelport.com/schema/air_v29_0" AuthorizedBy="user" TargetBranch="]] .. TARGETBRANCH .. [[" TraceId="trace">
      <com:BillingPointOfSaleInfo xmlns:com="http://www.travelport.com/schema/common_v29_0" OriginApplication="UAPI"/>
      <air:AirItinerary>
    ]] .. airSegments .. [[
</air:AirItinerary>
      <air:AirPricingModifiers PlatingCarrier="QF"/>
      <com:SearchPassenger xmlns:com="http://www.travelport.com/schema/common_v29_0" BookingTravelerRef="gr8AVWGCR064r57Jt0+8bA==" Code="ADT"/>
      <air:AirPricingCommand CabinClass="Economy"/>
    </air:AirPriceReq>
  </soapenv:Body>
</soapenv:Envelope>
    ]]
    scan.log(scan.DEBUG, "request price: ", message);
    return public.jiaopenurl(url , message);
end
return P;
