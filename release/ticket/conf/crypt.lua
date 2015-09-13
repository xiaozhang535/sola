local aes = require "resty.aes"
local str = require "resty.string"
--local aes_128_cbc_with_iv = assert(aes:new("1234567890123456", nil, aes.cipher(128,"cbc"), {iv="1234567890123456"}))
local aes_128_cbc_with_iv = assert(aes:new("1234567890123456", nil, aes.cipher(128,"cbc"), {iv="\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"}))
-- AES 128 CBC with IV and no SALT
local encrypted = aes_128_cbc_with_iv:encrypt("abcdefghigklmnopqrstuvwxyz0123456789")
scan.say("AES 128 CBC (WITH IV) Encrypted base64: ", scan.encode_base64(encrypted))
scan.say("AES 128 CBC (WITH IV) Encrypted HEX: ", str.to_hex(encrypted))
scan.say("AES 128 CBC (WITH IV) Decrypted: ",
aes_128_cbc_with_iv:decrypt(encrypted))
