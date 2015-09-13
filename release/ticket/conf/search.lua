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

--1, get json data, parse json
--2, pre strategy filter
--3, translate soap, send to 1G
--4, get soap data, parse, compute price(strategy filter)
--5, respose to qunaer

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
--
--3, translate soap, send to 1G
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
--4, get soap data, parse, compute price(strategy filter)
local my_xml = xml.eval(body);
if my_xml ~= nil then
    --0, fault
    local fault=my_xml:find("SOAP:Fault");
    if fault ~= nil then
        --arr_result["status"]=1;
        --arr_result["msg"]=public.dump(fault);
        scan.exit(0);
    end
    --1, get airsegment
    local airseg = my_xml:find("air:AirSegmentList");
    if airseg ~= nil and type(airseg) == "table" then
        --print(airseg);
        local idx_seg=1;
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
                local seg={};
                seg=v;
                for k_s, v_s in pairs(v) do
                    --print("type_k_s: ", type(k_s), " k_s: ", k_s, " v_s: ", v_s);
                    if type(k_s) == "string" then
                        --item=item .. " " .. k_s .. "=\"" .. v_s .. "\"";
                        --items[k_s]=v_s;
                        if k_s == "Key" then
                            key=v_s;
                        end
                    end
                    if type(v_s) == "table" and v_s[0] == "air:AirAvailInfo" then
                        for k_s_k, v_s_v in pairs(v_s) do
                            if type(v_s_v) == "table" and v_s_v[0] == "air:BookingCodeInfo" then
                                items["BookingCounts"]=v_s_v["BookingCounts"];
                                seg["BookingCounts"]=v_s_v["BookingCounts"];
                            end
                        end
                    end
                end
                if key ~= "" then
                    --scan.log(scan.DEBUG, "key: ", key, " item: ", item);
                    --hashAirSegment[key]=item;
                    --hashAirSegment[key]=items;
                    hashAirSegment[key]=v;
                    hashAirSegment[key]["idx"]=idx_seg;
                    idx_seg=idx_seg+1;
                    --[[
                    if v["Origin"] == req["fromCity"] or v["Destination"] == req["toCity"] then
                        table.insert(arr_result["hashAirSegmentFrom"], seg);
                    else
                        table.insert(arr_result["hashAirSegmentRet"], seg);
                    end
                    ]]
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
                            --local idx=1;
                            for segkey, segval in pairs(hashSegmentRef) do
                                scan.log(scan.DEBUG, "seg: ", public.dump(hashAirSegment[segkey]));
                                --scan.say("seg: ", public.dump(hashAirSegment[segkey]));
                                hashPriceInfo[key][hashAirSegment[segkey]["idx"]]=hashAirSegment[segkey];
                                --idx=idx+1;
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
--5, respose to qunaer
    local arr_result ={};
    arr_result["status"]=0;
    arr_result["msg"]="success";
    arr_result["routings"]={};
    for k, v in pairs(hashPriceInfo) do
        --scan.log(scan.DEBUG, "key: ", k, " val: ", v);
        scan.log(scan.DEBUG, public.dump(req));
        strategy_suf.strategy_filter_suf(req, hashPriceInfo[k]);
        --scan.say(public.dump(hashPriceInfo[k]));
        --scan.say(cjson.encode(hashPriceInfo[k]));
        local routings={};
        routings["data"]="extra";
        if  v["final_price"] ~= nil then
            routings["adultPrice"]=tonumber(v["final_price"]);
        else
            routings["adultPrice"]=tonumber(v["TotalPrice"]);
        end
        routings["adultTax"]=tonumber(string.sub(v["Taxes"],4));
        routings["childPrice"]=0;
        routings["childTax"]=0;
        routings["currencyCode"]="CNY";
        routings["priceType"]=0; --tmp 报价类型:0 普通价 / 1 留学生价
        routings["applyType"]=0; --tmp 报价类型:0 预定价 / 1 申请价
        routings["adultTaxType"]=1; --tmp 0 未含税 / 1 已含税
        routings["childTaxType"]=1; --tmp 儿童税费类型:0 未含税 / 1 已含税
        routings["rule"]={};
        routings["fromSegments"]={};
        routings["retSegments"]={};
        local isFrom=true;
        for k_seg, v_seg in pairs(v) do  
            if type(v_seg) == "table" then
                if v_seg["Origin"] == req["toCity"] then
                    isFrom=false;
                end
                local arrSeg={};
                arrSeg["carrier"]=v_seg["Carrier"];
                arrSeg["depAirport"]=v_seg["Origin"];
                arrSeg["depTime"]=v_seg["DepartureTime"]; --tmp 
                arrSeg["arrAirport"]=v_seg["Destination"];
                arrSeg["arrTime"]=v_seg["ArrivalTime"]; --tmp
                arrSeg["stopCities"]=""; --tmp v_seg[""];
                arrSeg["codeShare"]=false; --tmp v_seg[""];
                arrSeg["cabin"]=v_seg["BookingCode"];
                arrSeg["aircraftCode"]=v_seg["Equipment"]; --tmp
                arrSeg["flightNumber"]=v_seg["FlightNumber"];
                if isFrom then
                    table.insert(routings["fromSegments"], arrSeg);
                else
                    table.insert(routings["retSegments"], arrSeg);
                end
            end
        end

        table.insert(arr_result["routings"], routings);
    end
    --scan.say(public.dump(arr_result));
    scan.say(cjson.encode(arr_result));
else
    scan.say("error xml");
end
scan.exit(0);

