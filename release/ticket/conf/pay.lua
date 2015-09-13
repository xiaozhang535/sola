package.path = package.path .. ";/root/ticket_src/release/ticket/conf/?.lua"
local cjson=require("cjson");
local public=require ("public");
local protocol=require ("protocol");
local lz    = require("zlib");
local strategy_pre    = require("strategy_pre");
local strategy_suf    = require("strategy_suf");
