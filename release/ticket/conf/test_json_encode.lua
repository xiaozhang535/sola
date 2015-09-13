local cjson=require("cjson");

local arr_result = {};
arr_result["status"]=0;
arr_result["msg"]="success";
arr_result["routings"]={};
for i=1,2 do
    local routings={};
    routings["data"]="success";
    routings["adultPrice"]=i;
    table.insert(arr_result["routings"], routings);
end

json_text = cjson.encode(arr_result);
print( json_text);
