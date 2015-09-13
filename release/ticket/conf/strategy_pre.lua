package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
local P = {}
strategy_pre = P;

function P.strategy_filter_pre(req)
    --例如指定销售地,指定航空公司
    --strategy
    if req["fromCity"] == "SFO" and req["toCity"] == "MCO" then
        req["carrier"] = "DL";
    end
    --加一个航段
end
return P;
