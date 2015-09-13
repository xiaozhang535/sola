/***********************************************************************
 * File : aes.c
 * Brief: 
 * 
 * History
 * ---------------------------------------------------------------------
 * 2015-07-28     ginozhang   1.0    created
 * 
 ***********************************************************************
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * MCrypt API available online:
 * http://linux.die.net/man/3/mcrypt
 * apt install libmcrypt-dev
 * gcc -o test aes.c -lmcrypt
 */
#include <mcrypt.h>

#include <math.h>
#include <stdint.h>
#include <stdlib.h>

int encrypt(
    void* buffer,
    int buffer_len, /* Because the plaintext could include null bytes*/
    char* IV, 
    char* key,
    int key_len 
){
  MCRYPT td = mcrypt_module_open("rijndael-128", NULL, "cbc", NULL);
  int blocksize = mcrypt_enc_get_block_size(td);
  if( buffer_len % blocksize != 0 ){
      printf("buffer_len%d %% blocksize%d != 0\n", buffer_len, blocksize);
      //return 1;
  }

  mcrypt_generic_init(td, key, key_len, IV);
  mcrypt_generic(td, buffer, buffer_len);
  mcrypt_generic_deinit (td);
  mcrypt_module_close(td);
  
  return 0;
}

int decrypt(
    void* buffer,
    int buffer_len,
    char* IV, 
    char* key,
    int key_len 
){
  MCRYPT td = mcrypt_module_open("rijndael-128", NULL, "cbc", NULL);
  int blocksize = mcrypt_enc_get_block_size(td);
  if( buffer_len % blocksize != 0 ){return 1;}
  
  mcrypt_generic_init(td, key, key_len, IV);
  mdecrypt_generic(td, buffer, buffer_len);
  mcrypt_generic_deinit (td);
  mcrypt_module_close(td);
  
  return 0;
}

void display(char* ciphertext, int len){
  int v;
  for (v=0; v<len; v++){
    printf("%X ", ciphertext[v]);
  }
  printf("\n");
}
//http://wenku.baidu.com/view/e89d2ad976a20029bd642d22.html
int main()
{
  MCRYPT td, td2;
  char plaintext[48] = "abcdefghigklmnopqrstuvwxyz0123456789"; //12
  int buffer_len = 48; //strlen(plaintext);
  //char* IV = "AAAAAAAAAAAAAAAA";
  char IV[16]={0}; 
  //char IV[16]="1234567890123456"; 
  char key[] = "1234567890123456";
  int keysize = strlen(key); /* 128 bits */
  char* buffer;
  int i;
  for(i=36; i<48; i++)
  {
      plaintext[i]=0xc;
  }

  buffer = calloc(1, buffer_len);
  strncpy(buffer, plaintext, buffer_len);

  printf("==C==\n");
  printf("plain:   %s\n", plaintext);
  encrypt(buffer, buffer_len, IV, key, keysize); 
  printf("cipher:  "); display(buffer , buffer_len);
  decrypt(buffer, buffer_len, IV, key, keysize);
  printf("decrypt: %s\n", buffer);
  
  return 0;
}
