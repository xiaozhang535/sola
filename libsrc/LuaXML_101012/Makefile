# 2009-03-16 by gf

# generic compiler and linker settings:
CC     = gcc
#INCDIR = -I../lua/src
INCDIR = -I/usr/include/lua5.1 -I/usr/local/include/luajit-2.0/
LIB    = 
#LIBDIR =  -L. -L../lua/src
LIBDIR =  -L. -L/usr/local/lib/
CFLAGS = -Os -Wall -c #-g

# generic platform specific rules:
ARCH            = $(shell uname -s)
ifeq ($(ARCH),Linux)
  CFLAGS += -fPIC
  LFLAGS =  -fPIC -shared
  #LFLAGS =  -fPIC 
  #LIBS          = $(LIBDIR) $(LIB) -llua -ldl
  LIBS          = $(LIBDIR) $(LIB) -lluajit-5.1 -ldl
  EXESUFFIX =
  SHLIBSUFFIX = .so
  #SHLIBSUFFIX = .a

else  
  ifeq ($(ARCH),Darwin) # MacOSX
    LFLAGS = -bundle 
    LIBS          = $(LIBDIR) -L/usr/local/lib $(LIB) -llua
    EXESUFFIX = .app
    SHLIBSUFFIX = .so
    
  else  # windows, MinGW
    LFLAGS =  -shared
    LIBS          = $(LIBDIR) $(LIB) -llua51 -mconsole -s
    EXESUFFIX = .exe
    SHLIBSUFFIX = .dll

  endif
endif

# project specific targets:
all:  LuaXML_lib$(SHLIBSUFFIX)

# project specific link rules:
LuaXML_lib$(SHLIBSUFFIX): LuaXML_lib.o
	$(CC) -o $@ $(LFLAGS) $^ $(LIBS) 

# project specific dependencies:
LuaXML_lib.o:  LuaXML_lib.c

# generic rules and targets:
.c.o:
	$(CC) $(CFLAGS) $(INCDIR) -c $<
clean:
	rm -f *.o *~ LuaXML_lib.so LuaXML_lib.dll

