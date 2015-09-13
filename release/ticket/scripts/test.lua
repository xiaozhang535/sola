require ("strategy_conf");

local test_table_cnt={};
test_table_cnt["a"] = 1;
print (table.getn(test_table_cnt));

BasePrice = "USD517.21";
print (string.sub(BasePrice, 4));

local booking_counts={};
for i in string.gmatch("F6|P6|A3|G0|Y9|B9|M9|S9|H9|Q9|K9|L9|U9|T9|X9|V9|E4", "(%a)[1-9]") do
    print(i)
    booking_counts[i]=1;
end
num_carrier=1;
carrier="ET";
local base_price=tonumber("1000");
local taxes=tonumber("50");
local total_price=tonumber("1050");
local final_price=99999999;
local hash_price={};
local priceInfo={};
priceInfo[1]={};
priceInfo[1]["Carrier"]="ET";

function judge_strategy_condition(strategy, num_carrier, carrier)
    if num_carrier == 1 and strategy["carriers"][carrier] ~= nil then
        return 1;
    end
    return 0;
end

for index = 1, table.getn(strategys) do
    local strategy=strategys[index];
    print ("id: ",strategy["id"]);
    local bstrategy=judge_strategy_condition(strategy, num_carrier, carrier);
    --carrier
    if bstrategy == 1 then
        print ("2");
        for idxPrice = 1, table.getn(strategy["price_info"]) do
            local price_info=strategy["price_info"][idxPrice];
            for idxCabin = 1, table.getn(price_info["cabin_class"]) do
                --cabin class
                if booking_counts[price_info["cabin_class"][idxCabin]] ~= nil then
                    print ("hit. cabin class: ", price_info["cabin_class"][idxCabin]);
                    --base_price
                    local price=base_price*(100-price_info["agent"]-price_info["award"])/100+taxes;
                    if final_price>price then
                        final_price=price;
                        hash_price[strategy["id"]]=price;
                        print ("id: ",strategy["id"]," price: ", price);
                    end
                    break;
                end
            end
        end
    end
end

    
