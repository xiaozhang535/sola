#!/usr/bin/perl -w

=pod
@author: ginozhang
@date: 2015-07-28
@description: 
=cut

use strict;
use Crypt::CBC;
use MIME::Base64::Perl;
use Digest::HMAC;
use Digest::SHA qw(hmac_sha128_hex);



my $cipher = Crypt::CBC->new(
        -key         => 'd2cb415e067c7b13',
        -iv          => 'e36dc751d0433f05', #random 16chars!!!!!! shold NOT repeat between requests
        -cipher      => 'OpenSSL::AES',     #this is same as Rijndael
        -literal_key => 1,        
        -header      => "none",
        -keysize     => 16
  );  


$encrypted = $cipher->encrypt( "s_hostname:jonasnuts.blogs.sapo.pt OR s_hostname:jonasnuts.com;1350305502");
$base64 = encode_base64($encrypted);
$digest = hmac_sha128_hex($encrypted, "d6cfaad283353507");

print("Ciphertext(b64): $base64\n");
print("Digest(hex)    : $digest\n" );
