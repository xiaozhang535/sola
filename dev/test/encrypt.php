<?php
//PHP doesn't support PKCS5Padding
//http://us3.php.net/manual/en/ref.mcrypt.php#69782
function pkcs5_pad ($text, $blocksize) 
{ 
    $pad = $blocksize - (strlen($text) % $blocksize); 
    return $text . str_repeat(chr($pad), $pad); 
}
//requires 'mcrypt'
$cipher = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_CBC, '');
$iv_size = mcrypt_enc_get_iv_size($cipher);
//      AES Key        : 'd2cb415e067c7b13'
//      AES IV         : 'e36dc751d0433f05'
//      HMAC KEY       : 'd6cfaad283353507'
//      Ciphertext(b64): 'Ru7RLA4o+iQZNJXBx0iXtgWSQuV8/uqj6R6M59egKfHhaBFuMTl9Mpsb4yx6\nkgokQAf1HUcLg32zGCPo8bH4Df5RUPXWSUfHNb3cR7Mf5I8=\n'
//      HMACb16        : '0f291f903f6abc951084bedb2210f48b30c4eb3e1bcce99b0967c5fda99d72a6'
// How do you do 256-bit AES encryption in PHP vs. 128-bit AES encryption???
// The answer is:  Give it a key that's 32 bytes long as opposed to 16 bytes long.
// We're using 16 bytes:
$key128   = "d2cb415e067c7b13";
$iv       = "e36dc751d0433f05";
$hmac_key = "d6cfaad283353507";
// This is the plain-text to be encrypted:
$cleartext = "s_hostname:jonasnuts.blogs.sapo.pt OR s_hostname:jonasnuts.com;1350305502";
$cleartext = pkcs5_pad($cleartext, mcrypt_get_block_size('des','cbc'));
printf("plainText: %s\n\n",$cleartext);
    
// The mcrypt_generic_init function initializes the cipher by specifying both
// the key and the IV.  The length of the key determines whether we're doing
// 128-bit, 192-bit, or 256-bit encryption.  
// Let's do 256-bit encryption here:
// Now let's do 128-bit encryption:
if (mcrypt_generic_init($cipher, $key128, $iv) != -1) {
    // PHP pads with NULL bytes if $cleartext is not a multiple of the block size..
    printf("len: %d", strlen($cleartext));
    $cipherText = mcrypt_generic($cipher, $cleartext );
    mcrypt_generic_deinit($cipher);
    
    // Display the result in hex.
    $b64ciphertext = base64_encode($cipherText);
    printf("Ciphertext(b64): %s (%d chars)\n", $b64ciphertext, strlen($b64ciphertext));
    printf("hmac (hex)     : %s\n\n", hash_hmac('sha256', $cipherText, $hmac_key));
}
?>
