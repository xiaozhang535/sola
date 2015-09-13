package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
local P = {}
strategy_pre = P;
function P.send_LowFareSearch(req)
--    local body=
    --[[
<?xml version="1.0"?>
<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP:Body>
    <air:LowFareSearchRsp xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:common_v31_0="http://www.travelport.com/schema/common_v31_0" TraceId="trace" TransactionId="6AC938060A0764773BCD7EED1D07C661" ResponseTime="3296" DistanceUnits="MI" CurrencyType="CNY">
      <common_v31_0:ResponseMessage Code="4039" Type="Warning" ProviderCode="1G">"Result size exceeded the maximum allowable and some results were discarded. It may be necessary to narrow your search using search modifiers."</common_v31_0:ResponseMessage>
      <air:FlightDetailsList>
        <air:FlightDetails Key="LUEy1RA1SFmgt2iobpR74g==" Origin="SFO" Destination="ORD"/>
        <air:FlightDetails Key="UEUo9n49RbqNpiCoe9O0Bw==" Origin="ORD" Destination="MCO"/>
      </air:FlightDetailsList>
      <air:AirSegmentList>
        <air:AirSegment Key="QxKmIkWZRY+F24Jfym1FUQ==" Group="0" Carrier="UA" FlightNumber="1586" Origin="SFO" Destination="MCO" DepartureTime="2015-07-12T05:50:00.000-07:00" ArrivalTime="2015-07-12T17:40:00.000-04:00" FlightTime="530" Distance="2438" ETicketability="Yes" Equipment="CHG" ChangeOfPlane="true" ParticipantLevel="Secure Sell" PolledAvailabilityOption="Polled avail exists" OptionalServicesIndicator="false" NumberOfStops="1" AvailabilitySource="A" AvailabilityDisplayType="Fare Shop/Optimal Shop">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo BookingCounts="F9|C9|A9|D9|Z9|P9|Y9|B9|M9|E9|U9|H9|Q9|V9|W9|S9|TR|L9|K9|G9|N9"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="LUEy1RA1SFmgt2iobpR74g=="/>
          <air:FlightDetailsRef Key="UEUo9n49RbqNpiCoe9O0Bw=="/>
        </air:AirSegment>
      </air:AirSegmentList>
      <air:FareInfoList>
        <air:FareInfo Key="HNJxuD8PRfWrO05fEcm+UA==" FareBasis="WAA00AZN" PassengerTypeCode="ADT" Origin="SFO" Destination="MCO" EffectiveDate="2015-07-07T23:10:00.000+00:00" DepartureDate="2015-07-12" Amount="CNY1860" NegotiatedFare="false" NotValidBefore="2015-07-12" NotValidAfter="2015-07-12">
          <air:FareSurcharge Key="blCDctDiTHeoOiOe/XPKGA==" Type="Other" Amount="USD32.56"/>
          <air:BaggageAllowance>
            <air:NumberOfPieces>0</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="HNJxuD8PRfWrO05fEcm+UA==" ProviderCode="1G">gws-eJxNjDsOwyAQRA+Dph8Wx4iOFVa64MKxIlz4/sfIgpXPIEALb17OWehvjIz5Lw6n2xX7tgAVYvtRVsicYoS3qYIWvFRJPYwYDi/j67c82gAN5dVo9tqqBXWc231FoIRgrAPLHLRjvVxkuopj0uVpBgSfwJQ+1sTDY+IX7Eq7TXW+AWKoLoM=</air:FareRuleKey>
          <air:Brand Key="GZi2ASg8TdOdsF0LQony9g==" BrandID="5575" UpSellBrandID="5574">
            <air:UpsellBrand FareBasis="WAA00AZN" FareInfoRef="a//YbVacS1OZmHd43WWkKg=="/>
          </air:Brand>
        </air:FareInfo>
        <air:FareInfo Key="a//YbVacS1OZmHd43WWkKg==" FareBasis="WAA00AZN" PassengerTypeCode="ADT" Origin="SFO" Destination="MCO" EffectiveDate="2015-07-07T23:10:00.000+00:00" DepartureDate="2015-07-12" Amount="CNY3450" NegotiatedFare="false" PrivateFare="PrivateFare" NotValidBefore="2015-07-12" NotValidAfter="2015-07-12">
          <air:FareTicketDesignator Value="UPDI"/>
          <air:BaggageAllowance>
            <air:NumberOfPieces>2</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="a//YbVacS1OZmHd43WWkKg==" ProviderCode="1G">gws-eJxNjEEOwyAMBB+D9m4DIeWGFZRbaaUUVfSQ/z+jBpSqa/lgeXZSSpZ4oZXW9BeD01RBPTJQYHXv2wOLjY7AehWQBm8RIvkoMRxs0cZzTlO0DVBRmo3+b0UD3VZw7KoNfAvKGvgtOOlYr2/Wz+K4JL/UAMcRFONlrc+8w9MP7GKODKjs/ALU+i9R</air:FareRuleKey>
          <air:Brand Key="CY43FL9MROyKzlM2qZbZbA==" BrandID="5574" UpSellBrandFound="false"/>
        </air:FareInfo>
      </air:FareInfoList>
      <air:RouteList>
        <air:Route Key="4P5hJsILRaqUS1T66q/j5A==">
          <air:Leg Key="oQWOrzXWS8+Zw7RyFua8wA==" Group="0" Origin="SFO" Destination="ORL"/>
        </air:Route>
      </air:RouteList>
      <air:AirPricingSolution Key="WtrZy91tTXmji0evbOyzcQ==" TotalPrice="CNY2113" BasePrice="USD302.33" ApproximateTotalPrice="CNY2113" ApproximateBasePrice="CNY1860" EquivalentBasePrice="CNY1860" Taxes="CNY253" ApproximateTaxes="CNY253">
        <air:Journey TravelTime="P0DT8H50M0S">
          <air:AirSegmentRef Key="QxKmIkWZRY+F24Jfym1FUQ=="/>
        </air:Journey>
        <air:LegRef Key="oQWOrzXWS8+Zw7RyFua8wA=="/>
        <air:AirPricingInfo Key="6XmjT/VwTGWE6uxKgU/bAQ==" TotalPrice="CNY2113" BasePrice="USD302.33" ApproximateTotalPrice="CNY2113" ApproximateBasePrice="CNY1860" EquivalentBasePrice="CNY1860" Taxes="CNY253" ApproximateTaxes="CNY253" LatestTicketingTime="2015-07-08T23:59:00.000+00:00" PricingMethod="Guaranteed" ETicketability="No" PlatingCarrier="UA" ProviderCode="1G">
          <air:FareInfoRef Key="HNJxuD8PRfWrO05fEcm+UA=="/>
          <air:BookingInfo BookingCode="W" CabinClass="Economy" FareInfoRef="HNJxuD8PRfWrO05fEcm+UA==" SegmentRef="QxKmIkWZRY+F24Jfym1FUQ=="/>
          <air:TaxInfo Category="AY" Amount="CNY35"/>
          <air:TaxInfo Category="US" Amount="CNY140"/>
          <air:TaxInfo Category="XF" Amount="CNY28">
            <common_v31_0:TaxDetail Amount="USD4.50" OriginAirport="SFO"/>
          </air:TaxInfo>
          <air:TaxInfo Category="ZP" Amount="CNY50">
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="SFO"/>
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="ORD"/>
          </air:TaxInfo>
          <air:FareCalc>SFO UA ORL Q32.56 269.77WAA00AZN USD302.33END</air:FareCalc>
          <air:PassengerType Code="ADT"/>
        </air:AirPricingInfo>
      </air:AirPricingSolution>
      <air:AirPricingSolution Key="S61lcgn6SECivxlCbbsOWw==" TotalPrice="CNY3822" BasePrice="USD561.86" ApproximateTotalPrice="CNY3822" ApproximateBasePrice="CNY3450" EquivalentBasePrice="CNY3450" Taxes="CNY372" ApproximateTaxes="CNY372">
        <air:Journey TravelTime="P0DT8H50M0S">
          <air:AirSegmentRef Key="QxKmIkWZRY+F24Jfym1FUQ=="/>
        </air:Journey>
        <air:LegRef Key="oQWOrzXWS8+Zw7RyFua8wA=="/>
        <air:AirPricingInfo Key="ilmCPhM+Toqj6a16Essgug==" TotalPrice="CNY3822" BasePrice="USD561.86" ApproximateTotalPrice="CNY3822" ApproximateBasePrice="CNY3450" EquivalentBasePrice="CNY3450" Taxes="CNY372" ApproximateTaxes="CNY372" LatestTicketingTime="2015-07-08T23:59:00.000+00:00" PricingMethod="Guaranteed" ProviderCode="1G">
          <air:FareInfoRef Key="a//YbVacS1OZmHd43WWkKg=="/>
          <air:BookingInfo BookingCode="P" CabinClass="First" FareInfoRef="a//YbVacS1OZmHd43WWkKg==" SegmentRef="QxKmIkWZRY+F24Jfym1FUQ=="/>
          <air:TaxInfo Category="AY" Amount="CNY35"/>
          <air:TaxInfo Category="US" Amount="CNY259"/>
          <air:TaxInfo Category="XF" Amount="CNY28"/>
          <air:TaxInfo Category="ZP" Amount="CNY50"/>
          <air:PassengerType Code="ADT"/>
        </air:AirPricingInfo>
      </air:AirPricingSolution>
      <air:BrandList>
        <air:Brand Key="DS3VuEoCQVicJSJADmo5kQ==" BrandID="5574" Name="United First" BrandedDetailsAvailable="true" Carrier="UA">
          <air:Title Type="External">United First</air:Title>
          <air:Title Type="Short">UF</air:Title>
          <air:Text Type="Upsell">Treat yourself with a United First&#xAE; experience, with extra wide leather seats and expanded legroom.</air:Text>
          <air:Text Type="Strapline">Treat yourself to the additional benefits of premium cabin seating</air:Text>
          <air:ImageLocation Type="Upsell" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Unit1st-150x150.jpg</air:ImageLocation>
          <air:ImageLocation Type="Agent" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Unit1st-150x150.jpg</air:ImageLocation>
          <air:ImageLocation Type="Consumer" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Unit1st-150x150.jpg</air:ImageLocation>
        </air:Brand>
        <air:Brand Key="o812zqBmT5evnHSgnJyQOg==" BrandID="5575" Name="United Economy&#xAE;" BrandedDetailsAvailable="true" Carrier="UA">
          <air:Title Type="External">United Economy&#xAE;</air:Title>
          <air:Title Type="Short">UAJ</air:Title>
          <air:Text Type="Upsell">Economy Plus&#xAE; available for sale on Smartpoint, check seat map for pricing

Up to 5 extra inches of legroom with Economy Plus&#xAE;
&#x2022;  Enjoy extra space to work and relax
&#x2022;  Sit near the front of the Economy cabin
&#x2022;  Earn Premier Qualifying Dollars</air:Text>
          <air:Text Type="Strapline">Economy Plus&#xAE; available for sale on Smartpoint, check seat map for pricing</air:Text>
          <air:ImageLocation Type="Upsell" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Econ-150x150.jpg</air:ImageLocation>
          <air:ImageLocation Type="Agent" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Econ-150x150.jpg</air:ImageLocation>
          <air:ImageLocation Type="Consumer" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.travelport.com/documents/10431/13406/United-Travelport-Econ-150x150.jpg</air:ImageLocation>
        </air:Brand>
      </air:BrandList>
    </air:LowFareSearchRsp>
  </SOAP:Body>
</SOAP:Envelope>
]]
    local body=[[
<?xml version="1.0"?>
<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP:Body>
    <air:LowFareSearchRsp xmlns:air="http://www.travelport.com/schema/air_v31_0" xmlns:common_v31_0="http://www.travelport.com/schema/common_v31_0" TraceId="trace" TransactionId="52A1E6550A07643C5EC96545BFD4D2BE" ResponseTime="10326" DistanceUnits="MI" CurrencyType="USD">
      <common_v31_0:ResponseMessage Code="4039" Type="Warning" ProviderCode="1G">"Result size exceeded the maximum allowable and some results were discarded. It may be necessary to narrow your search using search modifiers."</common_v31_0:ResponseMessage>
      <air:FlightDetailsList>
        <air:FlightDetails Key="ou1aac25SR+TrUw3eew+Iw==" Origin="SFO" Destination="SLC" DepartureTime="2015-07-07T13:00:00.000-07:00" ArrivalTime="2015-07-07T15:51:00.000-06:00" FlightTime="111" TravelTime="449" Equipment="757" OnTimePerformance="60" OriginTerminal="1" DestinationTerminal="2"/>
        <air:FlightDetails Key="dhJGU3I3SKOXs7AH9hs7ng==" Origin="SLC" Destination="MCO" DepartureTime="2015-07-07T17:10:00.000-06:00" ArrivalTime="2015-07-07T23:29:00.000-04:00" FlightTime="259" TravelTime="449" Equipment="757" OnTimePerformance="80" OriginTerminal="2"/>
        <air:FlightDetails Key="brmtPyDlSQG7jD7XHpHXbw==" Origin="MCO" Destination="SLC" DepartureTime="2015-07-10T06:20:00.000-04:00" ArrivalTime="2015-07-10T08:58:00.000-06:00" FlightTime="278" TravelTime="528" Equipment="320" OnTimePerformance="90" DestinationTerminal="2"/>
        <air:FlightDetails Key="kXqN9V8TTvqP989Mb5oWig==" Origin="SLC" Destination="SFO" DepartureTime="2015-07-10T11:05:00.000-06:00" ArrivalTime="2015-07-10T12:08:00.000-07:00" FlightTime="123" TravelTime="528" Equipment="757" OnTimePerformance="70" OriginTerminal="2" DestinationTerminal="1"/>
      </air:FlightDetailsList>
      <air:AirSegmentList>
        <air:AirSegment Key="xm4xQL+1RpyYbikaNldkPQ==" Group="0" Carrier="DL" FlightNumber="2375" Origin="SFO" Destination="SLC" DepartureTime="2015-07-07T13:00:00.000-07:00" ArrivalTime="2015-07-07T15:51:00.000-06:00" FlightTime="111" Distance="599" ETicketability="Yes" Equipment="757" ChangeOfPlane="false" ParticipantLevel="Non statusing on request" PolledAvailabilityOption="Polled avail used" OptionalServicesIndicator="false" AvailabilitySource="S" AvailabilityDisplayType="Fare Shop/Optimal Shop">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo BookingCounts="F3|P3|A0|G0|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X9|V9|E9"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="ou1aac25SR+TrUw3eew+Iw=="/>
        </air:AirSegment>
        <air:AirSegment Key="byR5r9amTMKgUdHXi3rfEA==" Group="0" Carrier="DL" FlightNumber="1180" Origin="SLC" Destination="MCO" DepartureTime="2015-07-07T17:10:00.000-06:00" ArrivalTime="2015-07-07T23:29:00.000-04:00" FlightTime="259" Distance="1922" ETicketability="Yes" Equipment="757" ChangeOfPlane="false" ParticipantLevel="Non statusing on request" PolledAvailabilityOption="Polled avail used" OptionalServicesIndicator="false" AvailabilitySource="S" AvailabilityDisplayType="Fare Shop/Optimal Shop">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo BookingCounts="F9|P9|A9|G8|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X9|V0|E0"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="dhJGU3I3SKOXs7AH9hs7ng=="/>
        </air:AirSegment>
        <air:AirSegment Key="3bxcRfAoTwGmbMOeXx7uWA==" Group="1" Carrier="DL" FlightNumber="2264" Origin="MCO" Destination="SLC" DepartureTime="2015-07-10T06:20:00.000-04:00" ArrivalTime="2015-07-10T08:58:00.000-06:00" FlightTime="278" Distance="1922" ETicketability="Yes" Equipment="320" ChangeOfPlane="false" ParticipantLevel="Non statusing on request" PolledAvailabilityOption="Polled avail used" OptionalServicesIndicator="false" AvailabilitySource="S" AvailabilityDisplayType="Fare Shop/Optimal Shop">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo BookingCounts="F6|P6|A3|G0|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X9|V9|E4"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="brmtPyDlSQG7jD7XHpHXbw=="/>
        </air:AirSegment>
        <air:AirSegment Key="KVv1lCFJQluWLo5CFSEBpA==" Group="1" Carrier="DL" FlightNumber="2375" Origin="SLC" Destination="SFO" DepartureTime="2015-07-10T11:05:00.000-06:00" ArrivalTime="2015-07-10T12:08:00.000-07:00" FlightTime="123" Distance="599" ETicketability="Yes" Equipment="757" ChangeOfPlane="false" ParticipantLevel="Non statusing on request" PolledAvailabilityOption="Polled avail used" OptionalServicesIndicator="false" AvailabilitySource="S" AvailabilityDisplayType="Fare Shop/Optimal Shop">
          <air:AirAvailInfo ProviderCode="1G">
            <air:BookingCodeInfo BookingCounts="F9|P9|A9|G9|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X0|V0|E0"/>
          </air:AirAvailInfo>
          <air:FlightDetailsRef Key="kXqN9V8TTvqP989Mb5oWig=="/>
        </air:AirSegment>
      </air:AirSegmentList>
      <air:FareInfoList>
        <air:FareInfo Key="KdAkkCarS9mRiYy9WAVDoQ==" FareBasis="LA00A0VD" PassengerTypeCode="ADT" Origin="SFO" Destination="MCO" EffectiveDate="2015-07-03T06:37:00.000+00:00" DepartureDate="2015-07-07" Amount="USD269.77" NegotiatedFare="false" NotValidBefore="2015-07-07" NotValidAfter="2015-07-07">
          <air:BaggageAllowance>
            <air:NumberOfPieces>0</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="KdAkkCarS9mRiYy9WAVDoQ==" ProviderCode="1G">gws-eJxNjcEOwiAQRD+mmfss1iI3iKSnioeqCZf+/2c4UE07GyDLzryNMTralZ6XeNKAbcgL3msGCpzO4/6Em4L3MHUFlLAkMvGT8WP4PjrKULtRVu6Jqt9aJJR+r/OBHcB5stRsLTxy3IO9S/klAsxuYAh/aqB2nowNqVeo7QtCry4w</air:FareRuleKey>
          <air:Brand Key="0rhFi3D7SsKbWFtrMA1W5A==" BrandID="5769" UpSellBrandID="5770">
            <air:UpsellBrand FareBasis="LA00A0VD" FareInfoRef="KrqlNV9RS3ifS3zIJqwjxA=="/>
          </air:Brand>
        </air:FareInfo>
        <air:FareInfo Key="UhFU7357TIyAFDZxncQ9xw==" FareBasis="UA07A0UD" PassengerTypeCode="ADT" Origin="MCO" Destination="SFO" EffectiveDate="2015-07-03T06:37:00.000+00:00" DepartureDate="2015-07-10" Amount="USD247.44" NegotiatedFare="false" NotValidBefore="2015-07-10" NotValidAfter="2015-07-10">
          <air:BaggageAllowance>
            <air:NumberOfPieces>0</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="UhFU7357TIyAFDZxncQ9xw==" ProviderCode="1G">gws-eJxNjLEOwyAQQz8GeffRaygbqChTkw4pQ5b8/2f0gEaNEYfM2S+l5Cl3Bt7SRQ6HKy/UrQArvN1tfsNrUO1uBU2omSGzFgyGsK/+R7D3oEU5Gnv7b/rN5XliBQ6cJ8kt1spKHcXucvkYASIPMMaTGslwDTakvYY6vj3pLhs=</air:FareRuleKey>
          <air:Brand Key="rkpBinTCTeO1H4r/dEOIag==" BrandID="5769" UpSellBrandID="5770">
            <air:UpsellBrand FareBasis="SA00A0NQ" FareInfoRef="Co9zADnCR6CttApp9Tt3OQ=="/>
          </air:Brand>
        </air:FareInfo>
        <air:FareInfo Key="KrqlNV9RS3ifS3zIJqwjxA==" FareBasis="LA00A0VD" PassengerTypeCode="ADT" Origin="SFO" Destination="MCO" EffectiveDate="2015-07-03T06:37:00.000+00:00" DepartureDate="2015-07-07" Amount="USD419.07" NegotiatedFare="false" PrivateFare="PrivateFare" NotValidBefore="2015-07-07" NotValidAfter="2015-07-07">
          <air:FareTicketDesignator Value="WNUPH"/>
          <air:BaggageAllowance>
            <air:NumberOfPieces>3</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="KrqlNV9RS3ifS3zIJqwjxA==" ProviderCode="1G">gws-eJxNjMEOwiAQRD+GzH22oMgNIjYeKj3UmnDp/3+GC2jSIWyy2TcvxjhRLvS08RSDw+QF+5aBgkn/677ChkAP0a2AGiyJTPxk/BwetR/Hq4rWDirK0Wj3WjQofW7zCidDa8D5alPDWt3RjWLfUn6rASI3MIS/9bE/7RlsSgkCqOz4Aq5eLus=</air:FareRuleKey>
          <air:Brand Key="2sd+UueQTVmdl5BSdsW9Zg==" BrandID="5770" UpSellBrandFound="false"/>
        </air:FareInfo>
        <air:FareInfo Key="Co9zADnCR6CttApp9Tt3OQ==" FareBasis="SA00A0NQ" PassengerTypeCode="ADT" Origin="MCO" Destination="SFO" EffectiveDate="2015-07-03T06:37:00.000+00:00" DepartureDate="2015-07-10" Amount="USD798.60" NegotiatedFare="false" PrivateFare="PrivateFare" NotValidBefore="2015-07-10" NotValidAfter="2015-07-10">
          <air:FareTicketDesignator Value="WNUPH"/>
          <air:BaggageAllowance>
            <air:NumberOfPieces>3</air:NumberOfPieces>
            <air:MaxWeight/>
          </air:BaggageAllowance>
          <air:FareRuleKey FareInfoRef="Co9zADnCR6CttApp9Tt3OQ==" ProviderCode="1G">gws-eJxNjMEOwyAMQz8G+e4URssNNFbtsDFNrIde+v+fsQCbVEeJZMV+McaJcuFMG08yOEx+YKsZKJh06/rC7DxddwVUoSYysbwxGELs/Tlmh+iyCxyN/m/63edVsWHx1KwBV29Ti7W6oxvF7lL+KAEiCxjCn3rb7vYcbEgJAijs+AKv8i7p</air:FareRuleKey>
          <air:Brand Key="4NIdZzHKSp69k2gInM1/nA==" BrandID="5770" UpSellBrandFound="false"/>
        </air:FareInfo>
      </air:FareInfoList>
      <air:RouteList>
        <air:Route Key="ZheAKZH0Q2+LfUjhRjBfsw==">
          <air:Leg Key="Qi5Wd7e0TVOb9TFSrtmVcw==" Group="0" Origin="SFO" Destination="ORL"/>
          <air:Leg Key="MvGTQWunQgq0MN07q58waQ==" Group="1" Origin="ORL" Destination="SFO"/>
        </air:Route>
      </air:RouteList>
      <air:AirPricingSolution Key="A8WKIUyZQvqPApjw4Z1NGg==" TotalPrice="USD601.20" BasePrice="USD517.21" ApproximateTotalPrice="USD601.20" ApproximateBasePrice="USD517.21" Taxes="USD83.99" ApproximateTaxes="USD83.99">
        <air:Journey TravelTime="P0DT7H29M0S">
          <air:AirSegmentRef Key="xm4xQL+1RpyYbikaNldkPQ=="/>
          <air:AirSegmentRef Key="byR5r9amTMKgUdHXi3rfEA=="/>
        </air:Journey>
        <air:Journey TravelTime="P0DT8H48M0S">
          <air:AirSegmentRef Key="3bxcRfAoTwGmbMOeXx7uWA=="/>
          <air:AirSegmentRef Key="KVv1lCFJQluWLo5CFSEBpA=="/>
        </air:Journey>
        <air:LegRef Key="Qi5Wd7e0TVOb9TFSrtmVcw=="/>
        <air:LegRef Key="MvGTQWunQgq0MN07q58waQ=="/>
        <air:AirPricingInfo Key="b6j+b4G8QfadD4eSbgGZCQ==" TotalPrice="USD601.20" BasePrice="USD517.21" ApproximateTotalPrice="USD601.20" ApproximateBasePrice="USD517.21" Taxes="USD83.99" ApproximateTaxes="USD83.99" LatestTicketingTime="2015-07-03T23:59:00.000+00:00" PricingMethod="Guaranteed" ETicketability="No" PlatingCarrier="DL" ProviderCode="1G">
          <air:FareInfoRef Key="KdAkkCarS9mRiYy9WAVDoQ=="/>
          <air:FareInfoRef Key="UhFU7357TIyAFDZxncQ9xw=="/>
          <air:BookingInfo BookingCode="L" CabinClass="Economy" FareInfoRef="KdAkkCarS9mRiYy9WAVDoQ==" SegmentRef="xm4xQL+1RpyYbikaNldkPQ=="/>
          <air:BookingInfo BookingCode="L" CabinClass="Economy" FareInfoRef="KdAkkCarS9mRiYy9WAVDoQ==" SegmentRef="byR5r9amTMKgUdHXi3rfEA=="/>
          <air:BookingInfo BookingCode="U" CabinClass="Economy" FareInfoRef="UhFU7357TIyAFDZxncQ9xw==" SegmentRef="3bxcRfAoTwGmbMOeXx7uWA=="/>
          <air:BookingInfo BookingCode="U" CabinClass="Economy" FareInfoRef="UhFU7357TIyAFDZxncQ9xw==" SegmentRef="KVv1lCFJQluWLo5CFSEBpA=="/>
          <air:TaxInfo Category="AY" Amount="USD11.20"/>
          <air:TaxInfo Category="US" Amount="USD38.79"/>
          <air:TaxInfo Category="XF" Amount="USD18.00">
            <common_v31_0:TaxDetail Amount="USD4.50" OriginAirport="SFO"/>
            <common_v31_0:TaxDetail Amount="USD4.50" OriginAirport="SLC"/>
            <common_v31_0:TaxDetail Amount="USD4.50" OriginAirport="MCO"/>
            <common_v31_0:TaxDetail Amount="USD4.50" OriginAirport="SLC"/>
          </air:TaxInfo>
          <air:TaxInfo Category="ZP" Amount="USD16.00">
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="SFO"/>
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="SLC"/>
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="MCO"/>
            <common_v31_0:TaxDetail Amount="USD4.00" OriginAirport="SLC"/>
          </air:TaxInfo>
          <air:FareCalc>SFO DL X/SLC DL ORL 269.77LA00A0VD DL X/SLC DL SFO 247.44UA07A0UD USD517.21END</air:FareCalc>
          <air:PassengerType Code="ADT"/>
        </air:AirPricingInfo>
        <air:Connection SegmentIndex="0"/>
        <air:Connection SegmentIndex="2"/>
      </air:AirPricingSolution>
      <air:AirPricingSolution Key="Z3N0gDRVTjWH4JAH8aa+cA==" TotalPrice="USD1354.20" BasePrice="USD1217.67" ApproximateTotalPrice="USD1354.20" ApproximateBasePrice="USD1217.67" Taxes="USD136.53" ApproximateTaxes="USD136.53">
        <air:Journey TravelTime="P0DT7H29M0S">
          <air:AirSegmentRef Key="xm4xQL+1RpyYbikaNldkPQ=="/>
          <air:AirSegmentRef Key="byR5r9amTMKgUdHXi3rfEA=="/>
        </air:Journey>
        <air:Journey TravelTime="P0DT8H48M0S">
          <air:AirSegmentRef Key="3bxcRfAoTwGmbMOeXx7uWA=="/>
          <air:AirSegmentRef Key="KVv1lCFJQluWLo5CFSEBpA=="/>
        </air:Journey>
        <air:LegRef Key="Qi5Wd7e0TVOb9TFSrtmVcw=="/>
        <air:LegRef Key="MvGTQWunQgq0MN07q58waQ=="/>
        <air:AirPricingInfo Key="fClo5vrhQYef+nEbKmyNRw==" TotalPrice="USD1354.20" BasePrice="USD1217.67" ApproximateTotalPrice="USD1354.20" ApproximateBasePrice="USD1217.67" Taxes="USD136.53" ApproximateTaxes="USD136.53" LatestTicketingTime="2015-07-04T23:59:00.000+00:00" PricingMethod="Guaranteed" ProviderCode="1G">
          <air:FareInfoRef Key="KrqlNV9RS3ifS3zIJqwjxA=="/>
          <air:FareInfoRef Key="Co9zADnCR6CttApp9Tt3OQ=="/>
          <air:BookingInfo BookingCode="L" CabinClass="Economy" FareInfoRef="KrqlNV9RS3ifS3zIJqwjxA==" SegmentRef="xm4xQL+1RpyYbikaNldkPQ=="/>
          <air:BookingInfo BookingCode="A" CabinClass="First" FareInfoRef="KrqlNV9RS3ifS3zIJqwjxA==" SegmentRef="byR5r9amTMKgUdHXi3rfEA=="/>
          <air:BookingInfo BookingCode="P" CabinClass="First" FareInfoRef="Co9zADnCR6CttApp9Tt3OQ==" SegmentRef="3bxcRfAoTwGmbMOeXx7uWA=="/>
          <air:BookingInfo BookingCode="P" CabinClass="First" FareInfoRef="Co9zADnCR6CttApp9Tt3OQ==" SegmentRef="KVv1lCFJQluWLo5CFSEBpA=="/>
          <air:TaxInfo Category="AY" Amount="USD11.20"/>
          <air:TaxInfo Category="US" Amount="USD91.33"/>
          <air:TaxInfo Category="XF" Amount="USD18.00"/>
          <air:TaxInfo Category="ZP" Amount="USD16.00"/>
          <air:PassengerType Code="ADT"/>
        </air:AirPricingInfo>
        <air:Connection StopOver="true" SegmentIndex="0"/>
        <air:Connection SegmentIndex="2"/>
      </air:AirPricingSolution>
      <air:BrandList>
        <air:Brand Key="bz425ND7So+fkB9fsOqlSQ==" BrandID="5769" Name="Main Cabin - Internal Name" BrandedDetailsAvailable="true" Carrier="DL">
          <air:Title Type="External">Main Cabin - External Commercial Brand Name</air:Title>
          <air:Title Type="Short">Short</air:Title>
          <air:Text Type="Upsell">Main Cabin - Upsell Marketing Text</air:Text>
          <air:Text Type="Strapline">Main Cabin - Strap Line</air:Text>
          <air:ImageLocation Type="Upsell" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.pp.travelport.com/documents/10431/12001/Basiceconomy.png</air:ImageLocation>
        </air:Brand>
        <air:Brand Key="Mxs3V6dJT+K17smhziCmJw==" BrandID="5770" Name="First Class - Internal Name" BrandedDetailsAvailable="true" Carrier="DL">
          <air:Title Type="External">First Class - External Commercial Brand Name</air:Title>
          <air:Title Type="Short">Short</air:Title>
          <air:Text Type="Upsell">First Class - Upsell Marketing Text</air:Text>
          <air:Text Type="Strapline">First Class - Strap Line</air:Text>
          <air:ImageLocation Type="Agent" ImageWidth="150" ImageHeight="150">https://merchandisingmanagement.pp.travelport.com/documents/10431/12001/basiceco.png</air:ImageLocation>
        </air:Brand>
      </air:BrandList>
    </air:LowFareSearchRsp>
  </SOAP:Body>
</SOAP:Envelope>
    ]]
    return body;
end
return P;
