package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
--local LuaXml=require('LuaXml');
--require('LuaXml');
local cjson=require("cjson");
local public=require ("public");
local protocol=require ("protocol");
local tmprsp=require ("tmprsp");
local lz    = require("zlib");
local strategy_pre    = require("strategy_pre");
local strategy_suf    = require("strategy_suf");

local status, err;
--1, get json data, parse json
scan.req.read_body();
--scan.say(public.dump(scan.var.request_body));
--json_text = '[ true, { "foo": "bar" } ]';
--scan.say(json_text);
local req = cjson.decode(scan.var.request_body);
--req = cjson.decode(json_text);
--scan.say(public.dump(req));
scan.log(scan.DEBUG, public.dump(req));
--2, strategy filter
strategy_pre.strategy_filter_pre(req);
--3, translate soap, send to 1G
--4, get soap data, parse, compute price(strategy filter)
--5, respose to qunaer
--

local res = protocol.send_LowFareSearch(req);
if res == nil then
    scan.exit(0);
end
local body=lz.inflate()(res.body, "finish");
--local body=tmprsp.send_LowFareSearch(req);
scan.log(scan.DEBUG, "body: \n", public.dump(body));
local hashAirSegment={};
local hashFareInfo={};
local hashPriceInfo ={};
local my_xml = xml.eval(body);
if my_xml ~= nil then
    --0, fault
    local fault=my_xml:find("SOAP:Fault");
    if fault ~= nil then
        scan.say("fault: ", public.dump(fault));
    end
    --1, get airsegment
    local airseg = my_xml:find("air:AirSegmentList");
    if airseg ~= nil and type(airseg) == "table" then
        --print(airseg);
        for k, v in pairs(airseg) do  
            --print("k: ", k, " v: ", v);
            if k ~= 0 and type(v) == "table" then
                --[[
                local availInfo = v:find("air:AirAvailInfo");
                if availInfo ~= nil then
                    print("vailInfo: ", availInfo);
                end
                ]]
                --airSegment
                local item="";
                local key="";
                local items={};
                for k_s, v_s in pairs(v) do
                    --print("type_k_s: ", type(k_s), " k_s: ", k_s, " v_s: ", v_s);
                    if type(k_s) == "string" then
                        item=item .. " " .. k_s .. "=\"" .. v_s .. "\"";
                        items[k_s]=v_s;
                        if k_s == "Key" then
                            key=v_s;
                        end
                    end
                    if type(v_s) == "table" and v_s[0] == "air:AirAvailInfo" then
                        for k_s_k, v_s_v in pairs(v_s) do
                            if type(v_s_v) == "table" and v_s_v[0] == "air:BookingCodeInfo" then
                                items["BookingCounts"]=v_s_v["BookingCounts"];
                            end
                        end
                    end
                end
                if key ~= "" then
                    scan.log(scan.DEBUG, "key: ", key, " item: ", item);
                    --hashAirSegment[key]=item;
                    hashAirSegment[key]=items;
                end
            end
        end
        --print(public.dump(airseg));
    end
    --2, get fareinfo
    local fareinfo = my_xml:find("air:FareInfoList");
    if fareinfo ~= nil and type(fareinfo) == "table" then
        for k, v in pairs(fareinfo) do  
            --fareinfo
            if k ~= 0 and type(v) == "table" then
                local item="";
                local key="";
                for k_s, v_s in pairs(v) do
                    if type(k_s) == "string" and (k_s == "Key" or k_s == "FareBasis") then
                        item=item .. " " .. k_s .. "=\"" .. v_s .. "\"";
                        if k_s == "Key" then
                            key=v_s;
                        end
                    end
                end
                if key ~= "" then
                    scan.log(scan.DEBUG, "key: ", key, " item: ", item);
                    hashFareInfo[key]=item;
                end
            end
        end
    end
    --3, airprice solution
    local airprice = my_xml:find("air:LowFareSearchRsp");
    scan.log(scan.DEBUG, "airprice: ", public.dump(airprice));
    if airprice ~= nil and type(airprice) == "table" then
        for k, v in pairs(airprice) do  
            if type(v) == "table" and v[0] == "air:AirPricingSolution" then
                scan.log(scan.DEBUG, "item: ", v[0]);
                for k_s, v_s in pairs(v) do
                    if type(v_s) == "table" and v_s[0] == "air:AirPricingInfo" then
                        --if v_s[0] == "air:AirPricingInfo" then
                        --end
                        local item=""; -- price
                        local items={};
                        local key="";
                        local hashSegmentRef={};
                        local passengerType="";
                        for k_s_k, v_s_v in pairs(v_s) do
                            if type(k_s_k) == "string" then
                                item=item .. " " .. k_s_k .. "=\"" .. v_s_v .. "\"";
                                items[k_s_k]=v_s_v;
                                if k_s_k == "Key" then
                                    key=v_s_v;
                                end
                            end
                            if type(v_s_v) == "table" and v_s_v[0] == "air:BookingInfo" then
                                local segkey=v_s_v["SegmentRef"];
                                hashSegmentRef[segkey]=1;
                                hashAirSegment[segkey]["FareInfoRef"]=hashFareInfo[v_s_v["FareInfoRef"]];
                                hashAirSegment[segkey]["CabinClass"]=v_s_v["CabinClass"];
                                hashAirSegment[segkey]["BookingCode"]=v_s_v["BookingCode"];
                                --v_s_v["FareInfoRef"];
                                --v_s_v["SegmentRef"];
                                --v_s_v["CabinClass"];
                                --v_s_v["BookingCode"];
                            end
                            if type(v_s_v) == "table" and v_s_v[0] == "air:PassengerType" then
                                passengerType=v_s_v["Code"];
                            end
                        end
                        if key ~= "" then
                            --hashAirSegment[key]=item;
                            hashPriceInfo[key]=items;
                            hashPriceInfo[key]["passengerType"]=passengerType;
                            local idx=1;
                            for segkey, segval in pairs(hashSegmentRef) do
                                scan.log(scan.DEBUG, "seg: ", public.dump(hashAirSegment[segkey]));
                                --scan.say("seg: ", public.dump(hashAirSegment[segkey]));
                                hashPriceInfo[key][idx]=hashAirSegment[segkey];
                                idx=idx+1;
                            end
                        end
                        scan.log(scan.DEBUG, "price: ", item);
                        --scan.say("passengerType: ", passengerType, " price: ", item);
                        --scan.say("==========\n");
                    end
                end
            end
        end
    end

    for k, v in pairs(hashPriceInfo) do
        --scan.log(scan.DEBUG, "key: ", k, " val: ", v);
        scan.log(scan.DEBUG, public.dump(req));
        strategy_suf.strategy_filter_suf(req, hashPriceInfo[k]);
        scan.say(public.dump(hashPriceInfo[k]));
    end
else
    scan.say("error xml");
end
scan.exit(0);

--scan.say("body: ", message);
--res = public.jiaopenurl(url , { method="", body=message});
res = protocol.send_search_flights();
--res = {status=200, body='<?xml version="1.0"?><SOAP:Body><air:AvailabilitySearchRsp xmlns:air="http://www.travelport.com/schema/air_v29_0" xmlns:common_v29_0="http://www.travelport.com/schema/common_v29_0" TraceId="trace" TransactionId="105A68AE0A07643B406EE47D59F64ACD" ResponseTime="734" DistanceUnits="MI">"</air:AvailabilitySearchRsp></SOAP:Body>'};
--scan.say("status: ", res.status);
--scan.say("header: ", res.header);
--scan.say("body: ", res.body);
scan.log(scan.DEBUG, "body: ", res.body);
local msg_price="";
local airSegments="";
local my_xml = xml.eval(res.body);
if my_xml ~= nil then
    --[[
    local soap = my_xml:find("SOAP:Body");
    if soap ~= nil then
        scan.say(res.body);
        scan.log(scan.DEBUG, "body: ", public.dump(soap));
        --scan.say(public.dump(soap));
    end
    ]]
    local soap = my_xml:find("air:AirSegmentList");
    if soap ~= nil and type(soap) == "table" then
        --print(soap);
        for k, v in pairs(soap) do  
            --print("k: ", k, " v: ", v);
            if k ~= 0 and type(v) == "table" then
                --[[
                local availInfo = v:find("air:AirAvailInfo");
                if availInfo ~= nil then
                    print("vailInfo: ", availInfo);
                end
                ]]
                --airSegment
                local airSegment="";
                for k_s, v_s in pairs(v) do
                    --print("type_k_s: ", type(k_s), " k_s: ", k_s, " v_s: ", v_s);
                    if type(k_s) == "string" then
                        airSegment=airSegment .. " " .. k_s .. "=\"" .. v_s .. "\"";
                    end
                end
                --print ("airSegment: ", airSegment);
                if airSegment ~= "" then
                    airSegments=airSegments .. "<air:AirSegment " .. airSegment .. "  ProviderCode=\"1G\" />\n";
                end
                break;
            end
        end
        --print(public.dump(soap));
    end
else
    scan.say("error xml");
    
end
if airSegments ~= "" then
    res = protocol.send_search_price(airSegments);
    scan.log(scan.DEBUG, "body: ", res.body);
end
--[[
res = protocol.send_search_price();
scan.log(scan.DEBUG, "body: ", res.body);
my_xml = xml.eval(res.body);
if my_xml ~= nil then
    local soap = my_xml:find("SOAP:Body");
    if soap ~= nil then
        scan.log(scan.DEBUG, "body: ", public.dump(soap));
        scan.say(res.body);
        --scan.say(public.dump(soap));
    end
end
]]
