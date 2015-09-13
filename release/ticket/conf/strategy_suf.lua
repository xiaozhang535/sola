package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua;/root/ticket_src/release/ticket/conf/lua_conf/?.lua"
local P = {}
strategy_suf = P;
local public=require ("public");
require ("strategy_conf");
require ("zone_conf");

-- 0: hit
function judge_city(strategy, strategy_city, req, req_city)
    local t_exclude=strategy[strategy_city]["exclude"];
    local t_include=strategy[strategy_city]["include"];
    local zone=zones[req[req_city]];
    scan.log(scan.DEBUG,"strategy_city: ", strategy_city, " req_city: ", req_city, " city: ", req[req_city],"  t_exclude: ", public.dump(t_exclude), " t_include: ", public.dump(t_include), " zone: ", public.dump(zone));
    if t_exclude ~= nil and t_exclude ~= "" then
        for index = 1, table.getn(t_exclude) do
            if t_exclude[index] == req[req_city] then
                scan.log(scan.DEBUG, "req[req_city]: ", req[req_city], " t_exclude[index]: ", t_exclude[index], " index: ", index);
                return 3;
            end
            if zone ~= nil and t_exclude[index] ~= "" and ( t_exclude[index] == zone["province"] or 
                t_exclude[index] == zone["region"] or t_exclude[index] == zone["country"] or 
                t_exclude[index] == zone["area"] or t_exclude[index] == zone["continent"] or
                t_exclude[index] == zone["global"]) then
                scan.log(scan.DEBUG, "t_exclude[index]:  ", t_exclude[index], " zone[province]: ",
                zone["province"], " zone[region]: ", zone["region"], " zone[country]: ", zone["country"],
                " zone[area]: ", zone["area"], " zone[continent]: ", zone["continent"],
                " zone[global]: ", zone["global"],
                " index: ", index);
                return 4;
            end
        end
    end
    if t_include ~= nil and t_include ~= "" then
        for index = 1, table.getn(t_include) do
            if t_include[index] == req[req_city] then
                scan.log(scan.DEBUG, "req[req_city]: ", req[req_city], " t_include[index]: ", t_include[index], " index: ", index);
                return 0;
            end
            if zone ~= nil and t_include[index] ~= "" and ( t_include[index] == zone["province"] or 
                t_include[index] == zone["region"] or t_include[index] == zone["country"] or 
                t_include[index] == zone["area"] or t_include[index] == zone["continent"] or
                t_include[index] == zone["global"]) then
                scan.log(scan.DEBUG, "t_include[index]:  ", t_include[index], " zone[province]: ",
                zone["province"], " zone[region]: ", zone["region"], " zone[country]: ", zone["country"],
                " zone[area]: ", zone["area"], " zone[continent]: ", zone["continent"],
                " zone[global]: ", zone["global"],
                " index: ", index);
                return 0;
            end
        end
    end
    return 5;
end

function judge_strategy_condition(strategy, req, num_carriers, carrier)
    scan.log(scan.DEBUG, public.dump(req));
    --carrier
    if num_carriers ~= 1 or strategy["carriers"][carrier] == nil then
        return 1;
    end
    --trip_type
    if strategy["trip_type"] ~= "" and strategy["trip_type"] ~= req["tripType"] then
        scan.log(scan.DEBUG, "trip type error. strategy: ", strategy["trip_type"]," req: ",req["tripType"]);
        return 2;
    end
    --from_city undown from_city belong: 全球、欧洲、亚洲(不含大陆)、土耳其、中国大陆、华南、HKG
    if strategy["from_city"] ~= "" and strategy["from_city"] ~= req["fromCity"] then
        local iret=judge_city(strategy, "from_city", req, "fromCity");
        if iret ~= 0 then
            return iret;
        end
    end
    scan.log(scan.DEBUG, "hit from_city: ", req["fromCity"]);
    --to_city undown
    if strategy["to_city"] ~= "" and strategy["to_city"] ~= req["toCity"] then
        local iret=judge_city(strategy, "to_city", req, "toCity");
        if iret ~= 0 then
            return iret;
        end
    end
    scan.log(scan.DEBUG, "hit to_city: ", req["toCity"]);

    return 0;
end
function P.strategy_filter_suf(req, price_info)
    scan.log(scan.DEBUG, public.dump(req));
    --航司、航程(单程、往返、所有)、出发地->到达地、回程
    --获取此航程信息
    local carriers={};
    local carrier;
    local num_carriers=0;
    local cabin_class={};
    local booking_counts={};
    local base_price=tonumber(string.sub(price_info["ApproximateBasePrice"],4));
    local taxes=tonumber(string.sub(price_info["ApproximateTaxes"],4));
    local total_price=tonumber(string.sub(price_info["ApproximateTotalPrice"],4));
    local final_price=99999999;
    local final_key;
    local hash_price={};
    for k, v in pairs(price_info) do
        --airseg
        if type(v) == "table" and v["Carrier"] ~= nil then
            if carriers[v["Carrier"]] == nil then
            carriers[v["Carrier"]]=1;
            carrier=v["Carrier"];
            num_carriers=num_carriers+1;
        end
        end
        if type(v) == "table" and v["CabinClass"] ~= nil then
            cabin_class[v["CabinClass"]]=1;
        end
        --F6|P6|A3|G0|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X9|V9|E4
        if type(v) == "table" and v["BookingCounts"] ~= nil then
            for i in string.gmatch(v["BookingCounts"], "(%a)[1-9]") do
                booking_counts[i]=1;
            end
        end
        --scan.log(scan.DEBUG,"k: ", k, " v: ", public.dump(v));
    end
    scan.log(scan.DEBUG, "Carrier: ", public.dump(carriers));

    for index = 1, table.getn(strategys) do
        local strategy=strategys[index];
        local bstrategy=judge_strategy_condition(strategy, req, num_carriers, carrier);
        scan.log(scan.DEBUG, "id: ",strategy["id"], " num_carriers: ", num_carriers, " carrier: ", carrier," bstrategy: ", bstrategy, " fromCity: ", req["fromCity"], " toCity: ", req["toCity"]);
        --carrier
        if bstrategy == 0 then
            for idxPrice = 1, table.getn(strategy["price_info"]) do
                local price_info=strategy["price_info"][idxPrice];
                for idxCabin = 1, table.getn(price_info["cabin_class"]) do
                    --cabin class
                    if booking_counts[price_info["cabin_class"][idxCabin]] ~= nil then
                        scan.log(scan.DEBUG, "hit. cabin class: ", price_info["cabin_class"][idxCabin]);
                        --base_price
                        local price=base_price*(100-price_info["agent"]-price_info["award"])/100+taxes;
                        if final_price>price then
                            final_price=price;
                            final_key=strategy["id"];
                            hash_price[strategy["id"]]=price;
                        end
                        scan.log(scan.DEBUG,"id: ",strategy["id"]," price: ", price," final_price: ", final_price, " idxCabin: ", idxCabin);
                        break;
                    end
                end
            end
        end
    end
    if final_key ~= nil then
        price_info["final_key"]=final_key;
        price_info["final_price"]=tostring(final_price);
    end
end
return P;
