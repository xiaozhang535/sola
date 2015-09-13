
/*
 * Copyright (C) Igor Sysoev
 * Copyright (C) Nginx, Inc.
 */


#include <ngx_config.h>
#include <ngx_core.h>
#include <ngx_event.h>
#include <ngx_channel.h>

#define NGX_SCAN
#ifdef NGX_SCAN
#include<json.h>
void ngx_signal_handler(int signo);

#pragma pack(1)
typedef    struct {
    uint8_t        ucStart;        
    uint32_t        uPkgLen;        
    uint8_t        ucCmd;        
}tSrvHeader;
#pragma pack()

#endif

static void ngx_start_worker_processes(ngx_cycle_t *cycle, ngx_int_t n,
    ngx_int_t type);
static void ngx_start_cache_manager_processes(ngx_cycle_t *cycle,
    ngx_uint_t respawn);
static void ngx_pass_open_channel(ngx_cycle_t *cycle, ngx_channel_t *ch);
static void ngx_signal_worker_processes(ngx_cycle_t *cycle, int signo);
static ngx_uint_t ngx_reap_children(ngx_cycle_t *cycle);
static void ngx_master_process_exit(ngx_cycle_t *cycle);
static void ngx_worker_process_cycle(ngx_cycle_t *cycle, void *data);
static void ngx_worker_process_init(ngx_cycle_t *cycle, ngx_int_t worker);
static void ngx_worker_process_exit(ngx_cycle_t *cycle);
static void ngx_channel_handler(ngx_event_t *ev);
#if (NGX_THREADS)
static void ngx_wakeup_worker_threads(ngx_cycle_t *cycle);
static ngx_thread_value_t ngx_worker_thread_cycle(void *data);
#endif
static void ngx_cache_manager_process_cycle(ngx_cycle_t *cycle, void *data);
static void ngx_cache_manager_process_handler(ngx_event_t *ev);
static void ngx_cache_loader_process_handler(ngx_event_t *ev);


ngx_uint_t    ngx_process;
ngx_pid_t     ngx_pid;
ngx_uint_t    ngx_threaded;

sig_atomic_t  ngx_reap;
sig_atomic_t  ngx_sigio;
sig_atomic_t  ngx_sigalrm;
sig_atomic_t  ngx_terminate;
sig_atomic_t  ngx_quit;
sig_atomic_t  ngx_debug_quit;
ngx_uint_t    ngx_exiting;
sig_atomic_t  ngx_reconfigure;
sig_atomic_t  ngx_reopen;

sig_atomic_t  ngx_change_binary;
ngx_pid_t     ngx_new_binary;
ngx_uint_t    ngx_inherited;
ngx_uint_t    ngx_daemonized;

sig_atomic_t  ngx_noaccept;
ngx_uint_t    ngx_noaccepting;
ngx_uint_t    ngx_restart;


#if (NGX_THREADS)
volatile ngx_thread_t  ngx_threads[NGX_MAX_THREADS];
ngx_int_t              ngx_threads_n;
#endif


static u_char  master_process[] = "master process";


static ngx_cache_manager_ctx_t  ngx_cache_manager_ctx = {
    ngx_cache_manager_process_handler, "cache manager process", 0
};

static ngx_cache_manager_ctx_t  ngx_cache_loader_ctx = {
    ngx_cache_loader_process_handler, "cache loader process", 60000
};


static ngx_cycle_t      ngx_exit_cycle;
static ngx_log_t        ngx_exit_log;
static ngx_open_file_t  ngx_exit_log_file;

#ifdef NGX_SCAN
enum {
    STX_HEAD =0x04, //为了与旧协议的区别
    STX_END= 0x05,
    MAX_LEN_BUFFER =1000000
};
static uint8_t szRcvBuf[MAX_LEN_BUFFER];
static uint8_t szSendBuf[MAX_LEN_BUFFER];
#define    NETWORK2HOST_32(v)        (uint32_t)(ntohl(v))
#define    GET_32_CONV(s, l)    do {(l) = NETWORK2HOST_32(*((uint32_t *)(s))); (s) += sizeof(uint32_t); } while (0)
#define    GET_8_CONV(s, l)    do {(l) = *((uint8_t *)(s)); (s) += sizeof(uint8_t); } while (0)
#define PDU_ERR_WRONG_PKG -104
int pkg_mssrv_unpack_header(const uint8_t *pkg_bufp, const int32_t pkg_buf_len, uint8_t* cmd)
{
    const uint8_t *pData = pkg_bufp;
    const uint8_t *pBufEnd = pkg_bufp + pkg_buf_len - 1;
    int i;

    if (NULL == pkg_bufp || pBufEnd <= pkg_bufp){
        return -1;
    }
    if (STX_HEAD != *pData++ || STX_END != *pBufEnd){
        return PDU_ERR_WRONG_PKG;
    }
    GET_32_CONV(pData, i);
    if (i != pkg_buf_len){
        return PDU_ERR_WRONG_PKG;
    }
    int iCmd;
    GET_8_CONV(pData, iCmd);
    if(cmd){
        *cmd=iCmd;
    }
    //int32_t iLenBody=pkg_buf_len-(int32_t)(pData-pkg_bufp)-1;
    return (int32_t)(pData-pkg_bufp);
}
int send_client(ngx_cycle_t *cycle, int fd, const char* pszBuf)
{
    uint32_t uLen=ngx_strlen(pszBuf);
    uint32_t len = sizeof(szSendBuf);
    uint32_t uLenLeft;
    uint32_t uLenSend;

    uint8_t *pch;
    ////u_char  *last;
    int32_t *puiDataLen;
    //1, 封包
    if (len <= (int32_t)sizeof(uint8_t))  
        return -100;  
    len -= (int32_t)sizeof(uint8_t);  
    pch=(uint8_t *)szSendBuf;  
    *pch++=STX_HEAD;  
    /*len*/  
    if (len <= (int32_t)sizeof(uint32_t))  
        return -100;  
    len -= (int32_t)sizeof(uint32_t);  
    puiDataLen=(int32_t *)pch;  
    pch+=sizeof(uint32_t);  
    ////last = ngx_cpystrn(pch, (u_char *)pszBuf, uLen);
    //tmp last error
    pch+=uLen;  
    if (len <= uLen)  
        return -100;  
    len-=uLen;  
    if (len <= (int32_t)sizeof(uint8_t)){  
        return -1;  
    }  
    len -= (int32_t)sizeof(uint8_t);  
    *pch++=STX_END;  
    *puiDataLen=htonl(pch-szSendBuf);  
    //return pch-pkg_bufp;  
    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "send to client. buf: %s len: %d", pszBuf, pch-szSendBuf);

    uLenLeft = pch-szSendBuf;
    uLenSend = 0;
    while(uLenLeft>0){
        int byte_send = send(fd, szSendBuf + uLenSend, uLenLeft, 0);
        if(byte_send<=0){
            ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "send error. %d\n", errno);
            return -24;
        }
        uLenSend+=byte_send;
        uLenLeft-=byte_send;
    }
    return 0;
}
int write_file(const char * full_file_name, const char* pszBuffer, const uint32_t uLen, const char* pszWriteType)
{
	FILE             *fp; 
	uint32_t uWroteCount = 0;
	if(!full_file_name )
    {
		return -1;
    }
    if(!pszBuffer || uLen<=0)
    {
        return -2;
    }
    if ((fp = fopen(full_file_name, pszWriteType)) == NULL)
    {
        return -3;
    }
    if( (uWroteCount=fwrite((const void *)pszBuffer, sizeof( char ), uLen, fp))<=0 || uWroteCount<uLen)
    {
        fclose(fp);
        return -4;
    }
    fclose(fp);
    return 0;
}

int32_t
ngx_handle_cmd(ngx_cycle_t *cycle, const char *pkg_bufp, const int32_t pkg_buf_len)
{
    struct json_object *new_obj;
    const char* pstring;
    json_object *my_string, *my_array; //*my_int, *my_object;
    int i;
    u_char  *p;
    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"json: -%s-", pkg_bufp);
    //#{'type':'update', 'rules':[{'name':'collect|public|rule1','content_luafile':''},{...}]}
    new_obj = json_tokener_parse((const char *)pkg_bufp);
    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "new_obj.to_string()=-%s-", json_object_to_json_string(new_obj));
    my_string = json_object_object_get(new_obj, "type");
    if((pstring=json_object_get_string(my_string))==0)
    {
        //error
        goto CMD_ERROR;
    }
    if(ngx_strncmp(pstring, "update", ngx_strlen("update"))==0)
    {
        my_array = json_object_object_get(new_obj, "rules");
        if(json_object_is_type(my_array, json_type_array))
        {
            for(i=0; i < json_object_array_length(my_array); i++)
            {
                json_object *obj = json_object_array_get_idx(my_array, i);
                json_object *objname = json_object_object_get(obj, "name");
                json_object *objcontent = json_object_object_get(obj, "content_luafile");
                const char* pname=json_object_get_string(objname);
                const char* pcontent = json_object_get_string(objcontent);
                int32_t iRtn=0;
                int32_t allocated=cycle->conf_prefix.len+1+ngx_strlen(pname)+100;
                ngx_str_t   auth, encoded;
                u_char  *last;
                //p = ngx_pnalloc(cycle->pool, allocated);
                p=ngx_calloc(allocated, cycle->log);
                if (p == NULL) {
                    //error
                }
                last = ngx_cpystrn(p, cycle->conf_prefix.data, cycle->conf_prefix.len);
                if(ngx_strncmp(pname,"collect",ngx_strlen("collect"))==0 
                        || ngx_strncmp(pname,"public",ngx_strlen("public"))==0 )
                {
                    ngx_snprintf(last, allocated-(last-p), "/%s.lua", pname);
                }
                else
                {
                    ngx_snprintf(last, allocated-(last-p), "/lua_conf/%s.lua", pname);
                }
                //*last++ = '/'; 
                //ngx_cpystrn(last, (u_char*)pname, strlen(pname)+1);
                ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "rule: -%s-", p);
                encoded.len=ngx_strlen(pcontent);
                encoded.data=(u_char*)pcontent;
                auth.len = ngx_base64_decoded_length(encoded.len);
                auth.data = ngx_calloc(auth.len + 1, cycle->log);
                if (auth.data == NULL) {
                    //error
                }  
                if (ngx_decode_base64(&auth, &encoded) != NGX_OK) {
                    //error
                }
                auth.data[auth.len] = '\0';
                if((iRtn=write_file((const char *)p, (const char*)auth.data, auth.len, "wb"))<0)
                {
                    //error
                    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "write rule error. rtn: %d rule: %s\n", iRtn, p);
                }
                json_object_put(objname);
                json_object_put(objcontent);
                json_object_put(obj);
                if(p)
                {
                    ngx_free(p);
                }
            }
        }
        json_object_put(my_array);
    }
    json_object_put(new_obj);
    return 0;
CMD_ERROR:
    ngx_log_error(NGX_LOG_ERR, cycle->log, 0,"json: -%s-", pkg_bufp);
    json_object_put(new_obj);
    return -1;
}
void
ngx_cmdevent_accept(ngx_event_t *ev)
{
#if 0
    socklen_t          socklen;
    ngx_err_t          err;
    ngx_log_t         *log;
    ngx_uint_t         level;
    ngx_socket_t       s;
    ngx_event_t       *rev, *wev;
    ngx_listening_t   *ls;
    ngx_connection_t  *c, *lc;
    ngx_event_conf_t  *ecf;
    u_char             sa[NGX_SOCKADDRLEN];

    lc = ev->data;
    ls = lc->listening;
    ev->ready = 0;
    ngx_log_debug2(NGX_LOG_DEBUG_EVENT, ev->log, 0,
                   "accept on %V, ready: %d", &ls->addr_text, ev->available);
    do {
        socklen = NGX_SOCKADDRLEN;
        s = accept(lc->fd, (struct sockaddr *) sa, &socklen);
        if (s == (ngx_socket_t) -1) {
            err = ngx_socket_errno;

            if (err == NGX_EAGAIN) {
                ngx_log_debug0(NGX_LOG_DEBUG_EVENT, ev->log, err,
                               "accept() not ready");
                return;
            }

            level = NGX_LOG_ALERT;

            if (err == NGX_ECONNABORTED) {
                level = NGX_LOG_ERR;

            } else if (err == NGX_EMFILE || err == NGX_ENFILE) {
                level = NGX_LOG_CRIT;
            }
            ngx_log_error(level, ev->log, err, "accept() failed");
            if (err == NGX_ECONNABORTED) {
                if (ngx_event_flags & NGX_USE_KQUEUE_EVENT) {
                    ev->available--;
                }

                if (ev->available) {
                    continue;
                }
            }
            return;
        }
        c = ngx_get_connection(s, ev->log);
        if (c == NULL) {
            if (ngx_close_socket(s) == -1) {
                ngx_log_error(NGX_LOG_ALERT, ev->log, ngx_socket_errno,
                              ngx_close_socket_n " failed");
            }

            return;
        }
        c->pool = ngx_create_pool(ls->pool_size, ev->log);
        if (c->pool == NULL) {
            ngx_close_accepted_connection(c);
            return;
        }

        c->sockaddr = ngx_palloc(c->pool, socklen);
        if (c->sockaddr == NULL) {
            ngx_close_accepted_connection(c);
            return;
        }

        ngx_memcpy(c->sockaddr, sa, socklen);

        log = ngx_palloc(c->pool, sizeof(ngx_log_t));
        if (log == NULL) {
            ngx_close_accepted_connection(c);
            return;
        }
            if (!(ngx_event_flags & (NGX_USE_AIO_EVENT|NGX_USE_RTSIG_EVENT))) {
                if (ngx_nonblocking(s) == -1) {
                    ngx_log_error(NGX_LOG_ALERT, ev->log, ngx_socket_errno,
                                  ngx_nonblocking_n " failed");
                    ngx_close_accepted_connection(c);
                    return;
                }
            }
        *log = ls->log;

        c->recv = ngx_recv;
        c->send = ngx_send;
        c->recv_chain = ngx_recv_chain;
        c->send_chain = ngx_send_chain;

        c->log = log;
        c->pool->log = log;

        c->socklen = socklen;
        c->listening = ls;
        c->local_sockaddr = ls->sockaddr;
        c->local_socklen = ls->socklen;

        c->unexpected_eof = 1;
        rev = c->read;
        wev = c->write;

        wev->ready = 1;

        if (ngx_event_flags & (NGX_USE_AIO_EVENT|NGX_USE_RTSIG_EVENT)) {
            /* rtsig, aio, iocp */
            rev->ready = 1;
        }

        if (ev->deferred_accept) {
            rev->ready = 1;
#if (NGX_HAVE_KQUEUE)
            rev->available = 1;
#endif
        }

        rev->log = log;
        wev->log = log;

        /*
         * TODO: MT: - ngx_atomic_fetch_add()
         *             or protection by critical section or light mutex
         *
         * TODO: MP: - allocated in a shared memory
         *           - ngx_atomic_fetch_add()
         *             or protection by critical section or light mutex
         */

        c->number = ngx_atomic_fetch_add(ngx_connection_counter, 1);
        if (ls->addr_ntop) {
            c->addr_text.data = ngx_pnalloc(c->pool, ls->addr_text_max_len);
            if (c->addr_text.data == NULL) {
                ngx_close_accepted_connection(c);
                return;
            }

            c->addr_text.len = ngx_sock_ntop(c->sockaddr, c->socklen,
                                             c->addr_text.data,
                                             ls->addr_text_max_len, 0);
            if (c->addr_text.len == 0) {
                ngx_close_accepted_connection(c);
                return;
            }
        }
        ngx_log_debug3(NGX_LOG_DEBUG_EVENT, log, 0,
                       "*%uA accept: %V fd:%d", c->number, &c->addr_text, s);

    }
    return ;
#endif
}
ngx_int_t
ngx_open_listening_cmdsockets(ngx_cycle_t *cycle, int ep)
{
    ngx_core_conf_t   *ccf;
    int               reuseaddr;
    //ngx_uint_t        i, tries, failed;
    ////ngx_uint_t        i, failed;
    ngx_err_t         err;
    ngx_log_t        *log;
    ngx_socket_t      s;
    ngx_listening_t  *ls;
    ngx_listening_t  lso;
    //char            text[]="172.25.32.42";
    struct sockaddr_in  *sa;
    socklen_t socklen;
    struct epoll_event ev;
    //ngx_event_t       *rev;
    //ngx_connection_t    *c;
    ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx, ngx_core_module);

    ////i=0;
    ls=&lso;

    ls->backlog=NGX_LISTEN_BACKLOG;
    ls->addr_text.len=ccf->cmdlisten.host.len;
    ls->addr_text.data = ngx_pnalloc(cycle->pool, ls->addr_text.len+1); //多一个字节用于下面的char赋值
    if (ls->addr_text.data == NULL) {
        return NGX_ERROR;
    }
    ngx_memcpy(ls->addr_text.data, ccf->cmdlisten.host.data, ls->addr_text.len);
    sa = ngx_palloc(cycle->pool, sizeof(struct sockaddr_in));
    if (sa == NULL) {
        return NGX_ERROR;
    }
    sa->sin_family = AF_INET;
    sa->sin_port = htons(ccf->cmdlisten.port);
    sa->sin_addr.s_addr = inet_addr((char*)ls->addr_text.data);
    socklen = sizeof(struct sockaddr_in);


    ls->sockaddr = (struct sockaddr*)sa;
    ls->socklen = socklen;

    reuseaddr = 1;
    log = cycle->log;
    //ls->sockaddr->sa_family=AF_INET;
    ls->type=SOCK_STREAM;

    s = ngx_socket(ls->sockaddr->sa_family, ls->type, 0);
    if (s == (ngx_socket_t) -1) {
        ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                ngx_socket_n " %V failed", &ls->addr_text);
    }
    if (setsockopt(s, SOL_SOCKET, SO_REUSEADDR,
                (const void *) &reuseaddr, sizeof(int))
            == -1)
    {
        ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                "setsockopt(SO_REUSEADDR) %V failed",
                &ls->addr_text);

        if (ngx_close_socket(s) == -1) {
            ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                    ngx_close_socket_n " %V failed",
                    &ls->addr_text);
        }

        return NGX_ERROR;
    }
    if (ngx_nonblocking(s) == -1) {
        ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                ngx_nonblocking_n " %V failed",
                &ls->addr_text);

        if (ngx_close_socket(s) == -1) {
            ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                    ngx_close_socket_n " %V failed",
                    &ls->addr_text);
        }

        return NGX_ERROR;
    }
    /*{
    struct sockaddr_in stAddr;
    memset(&stAddr, 0, sizeof(stAddr));
    stAddr=*(struct sockaddr_in*)ls->sockaddr;
    ngx_log_debug2(NGX_LOG_DEBUG_CORE, log, 0, "bind: %s %d", inet_ntoa(stAddr.sin_addr), ntohs(stAddr.sin_port));
    }*/
    ngx_log_debug2(NGX_LOG_DEBUG_CORE, log, 0, "bind() %V #%d ", &ls->addr_text, s);
    if (bind(s, ls->sockaddr, ls->socklen) == -1) {
        err = ngx_socket_errno;
        ngx_log_error(NGX_LOG_EMERG, log, err,
                "bind() to %V failed", &ls->addr_text);

        if (ngx_close_socket(s) == -1) {
            ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                    ngx_close_socket_n " %V failed",
                    &ls->addr_text);
        }

        if (err != NGX_EADDRINUSE) {
            return NGX_ERROR;
        }

        /////failed = 1;
    }
    if (listen(s, ls->backlog) == -1) {
        ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                "listen() to %V, backlog %d failed",
                &ls->addr_text, ls->backlog);

        if (ngx_close_socket(s) == -1) {
            ngx_log_error(NGX_LOG_EMERG, log, ngx_socket_errno,
                    ngx_close_socket_n " %V failed",
                    &ls->addr_text);
        }

        return NGX_ERROR;
    }

    ls->listen = 1;

    ls->fd = s;

#if 0
    c = ngx_get_connection(ls->fd, cycle->log);
    if (c == NULL) {
        return NGX_ERROR;
    }
    c->log = &ls->log;

    c->listening = &ls->
    ls->connection = c;

    rev = c->read;

    rev->log = c->log;
    rev->accept = 1;
    rev->handler = ngx_cmdevent_accept;
#endif
    //设置与要处理的事件相关的文件描述符
    ev.data.fd=s;
    //ev.data.ptr = (void *) c; //((uintptr_t) c | ev->instance);
    //设置要处理的事件类型
    ev.events=EPOLLIN|EPOLLET;
    //注册epoll事件
    //if(epoll_ctl(ep,EPOLL_CTL_ADD,c->fd,&ev)== -1)
    if(epoll_ctl(ep,EPOLL_CTL_ADD,s,&ev)== -1)
    {
        //ngx_log_error(NGX_LOG_ALERT, ev->log, ngx_errno,
        //              "epoll_ctl(%d, %d) failed", op, c->fd);
        return NGX_ERROR;
    }

    //rev->active = 1;
    return s;
}
#endif

void
ngx_master_process_cycle(ngx_cycle_t *cycle)
{
    char              *title;
    u_char            *p;
    size_t             size;
    ngx_int_t          i;
    ngx_uint_t         n, sigio;
#ifdef NGX_SCAN
    int            efd = -1;
    int sfd,s;
    struct epoll_event event;
    //struct epoll_event ev;
    struct epoll_event *event_list;
    ngx_uint_t           nevents=20;
    //ngx_msec_t timer=1000;
    int                events;

    ngx_err_t          err;
    //ngx_connection_t  *c;
    uint32_t           revents;
    //ngx_event_t       *rev, *wev;
#else
    sigset_t           set;
#endif
    struct itimerval   itv;
    ngx_uint_t         live;
    ngx_msec_t         delay;
    ngx_listening_t   *ls;
    ngx_core_conf_t   *ccf;

#ifndef NGX_SCAN
    //http://blog.sina.com.cn/s/blog_6af9566301013xp4.html?qq-pf-to=pcqq.c2c
    sigemptyset(&set);
    sigaddset(&set, SIGCHLD);
    sigaddset(&set, SIGALRM);
    sigaddset(&set, SIGIO);
    sigaddset(&set, SIGINT);
    sigaddset(&set, ngx_signal_value(NGX_RECONFIGURE_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_REOPEN_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_NOACCEPT_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_TERMINATE_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_SHUTDOWN_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_CHANGEBIN_SIGNAL));

    if (sigprocmask(SIG_BLOCK, &set, NULL) == -1) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                      "sigprocmask() failed");
    }

    sigemptyset(&set);

#endif

    size = sizeof(master_process);

    for (i = 0; i < ngx_argc; i++) {
        size += ngx_strlen(ngx_argv[i]) + 1;
    }

    title = ngx_pnalloc(cycle->pool, size);

    p = ngx_cpymem(title, master_process, sizeof(master_process) - 1);
    for (i = 0; i < ngx_argc; i++) {
        *p++ = ' ';
        p = ngx_cpystrn(p, (u_char *) ngx_argv[i], size);
    }

    ngx_setproctitle(title);


    ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx, ngx_core_module);

    ngx_start_worker_processes(cycle, ccf->worker_processes,
                               NGX_PROCESS_RESPAWN);
    ngx_start_cache_manager_processes(cycle, 0);

    ngx_new_binary = 0;
    delay = 0;
    sigio = 0;
    live = 1;

#ifdef NGX_SCAN
    //init epoll
    if (efd == -1) {
        efd = epoll_create(cycle->connection_n / 2);
        if (efd == -1) {
            ngx_log_error(NGX_LOG_EMERG, cycle->log, ngx_errno,
                          "epoll_create() failed");
            return ;
        }
    }
    event_list = ngx_alloc(sizeof(struct epoll_event) * nevents,
            cycle->log);
    if (event_list == NULL) {
        return ;
    }
    //ginozhang create socket bind 81
    sfd = ngx_open_listening_cmdsockets(cycle, efd);
    if (sfd == -1)
        abort ();

    //add to epoll
    //end ginozhang
#endif
    for ( ;; ) {
        if (delay) {
            if (ngx_sigalrm) {
                sigio = 0;
                delay *= 2;
                ngx_sigalrm = 0;
            }

            ngx_log_debug1(NGX_LOG_DEBUG_EVENT, cycle->log, 0,
                           "termination cycle: %d", delay);

            itv.it_interval.tv_sec = 0;
            itv.it_interval.tv_usec = 0;
            itv.it_value.tv_sec = delay / 1000;
            itv.it_value.tv_usec = (delay % 1000 ) * 1000;

            if (setitimer(ITIMER_REAL, &itv, NULL) == -1) {
                ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                              "setitimer() failed");
            }
        }

        ngx_log_debug0(NGX_LOG_DEBUG_EVENT, cycle->log, 0, "sigsuspend");

#ifndef NGX_SCAN
        sigsuspend(&set);
#else
        //ginozhang epoll
        //events = epoll_wait(efd, event_list, (int) nevents, timer);
        events = epoll_wait(efd, event_list, (int) nevents, -1);
        err = (events == -1) ? ngx_errno : 0;
        if (err) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, err, "epoll_wait() failed");
            //! 出现信号中断时epoll_wait也会返回,因此这里不能退出
            //continue ;
        }
        if (events == 0) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, 0, "epoll_wait() returned no events with timeout");
            //continue;
        }
        for (i = 0; i < events; i++) {
            revents = event_list[i].events;
            ngx_log_debug2(NGX_LOG_DEBUG_EVENT, cycle->log, 0,
                    "epoll: fd:%d ev:%04XD",
                    event_list[i].data.fd, revents);
            if ((event_list[i].events & EPOLLERR) ||
                    (event_list[i].events & EPOLLHUP) ||
                    (!(event_list[i].events & EPOLLIN)))
            {
                /* An error has occured on this fd, or the socket is not
                   ready for reading (why were we notified then?) */
                fprintf (stderr, "epoll error\n");
                close (event_list[i].data.fd);
                continue;
            }
            else if (sfd == event_list[i].data.fd)
            {
                /* We have a notification on the listening socket, which
                   means one or more incoming connections. */
                while (1)
                {
                    struct sockaddr in_addr;
                    socklen_t in_len;
                    int infd;
                    char hbuf[NI_MAXHOST], sbuf[NI_MAXSERV];
                    uint32_t uiTimeout = 6000;
                    struct timeval tmTimeout;
                    tmTimeout.tv_sec  = uiTimeout / 1000;
                    tmTimeout.tv_usec = (uiTimeout %1000) * 1000;

                    in_len = sizeof in_addr;
                    infd = accept (sfd, &in_addr, &in_len);
                    if (infd == -1)
                    {
                        if ((errno == EAGAIN) ||
                                (errno == EWOULDBLOCK))
                        {
                            /* We have processed all incoming
                               connections. */
                            break;
                        }
                        else
                        {
                            perror ("accept");
                            break;
                        }
                    }

                    s = getnameinfo (&in_addr, in_len,
                            hbuf, sizeof hbuf,
                            sbuf, sizeof sbuf,
                            NI_NUMERICHOST | NI_NUMERICSERV);
                    if (s == 0)
                    {
                        ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"Accepted connection on descriptor %d "
                                "(host=%s, port=%s)", infd, hbuf, sbuf);
                    }

                    /* Make the incoming socket non-blocking and add it to the
                       list of fds to monitor. */
                    /*s = ngx_nonblocking (infd);
                    if (s == -1)
                        abort ();*/
                    if(setsockopt(infd, SOL_SOCKET, SO_RCVTIMEO, (void*)&tmTimeout, sizeof(tmTimeout)) == -1
                            || setsockopt(infd, SOL_SOCKET, SO_SNDTIMEO, (void*)&tmTimeout, sizeof(tmTimeout)) == -1
                            )
                    {
                        ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "setsockopt error. %s\n", strerror(errno));
                        close(infd);
                        break;
                    }

                    event.data.fd = infd;
                    event.events = EPOLLIN | EPOLLET;
                    s = epoll_ctl (efd, EPOLL_CTL_ADD, infd, &event);
                    if (s == -1)
                    {
                        perror ("epoll_ctl");
                        close(infd);
                        break;
                    }
                }
                continue;
            }
            else
            {
                ////uint8_t bHasRecvData = 0;
                const int iPkgMinLen = sizeof(tSrvHeader) + sizeof(char);
                uint32_t		usRecvBufLen = sizeof(szRcvBuf);
                uint32_t uLenLeft = usRecvBufLen;
                uint32_t uLenRecved = 0;
                uint32_t uMaxCount = 20;
                uint32_t uCount = 0;
                while ((uCount++)<uMaxCount)
                {
                    int32_t iLen = recv(event_list[i].data.fd, szRcvBuf + uLenRecved, uLenLeft, 0);
                    if(iLen==0 || (iLen<0 && EAGAIN != errno)){
                        ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"client close the socket. or recv error. %s", strerror(errno));
                        close (event_list[i].data.fd);
                        break;
                        //return ;
                    }
                    else if(iLen>0){
                        ////bHasRecvData = 1;
                        uLenRecved+=iLen;
                        uLenLeft-=iLen;
                    }
                    if (iLen >= iPkgMinLen)
                    {
                        int iRet = pkg_mssrv_unpack_header(szRcvBuf, uLenRecved, NULL);
                        if(iRet>0){
                            //收到合法包，跳出
                            usRecvBufLen=uLenRecved;
                            ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"recv: %s", szRcvBuf+iPkgMinLen-1);
                            szRcvBuf[usRecvBufLen-1]='\0';
                            if(0==(iRet=ngx_handle_cmd(cycle, (const char*)szRcvBuf+iPkgMinLen-1, usRecvBufLen-iPkgMinLen)))
                            {
                                //reload
                                ngx_signal_handler(ngx_signal_value(NGX_RECONFIGURE_SIGNAL));
                                send_client(cycle, event_list[i].data.fd, "{\"result\":\"ok\"}");
                                ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"reload conf");
                                close (event_list[i].data.fd);
                            }
                            else{
                                ngx_log_error(NGX_LOG_ERR, cycle->log, 0,"cmd error. iRet: %d", iRet);
                            }
                            break;
                        }
                    }
                    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"recv. uLenRecved: %d usRecvBufLen: %d buf: %s",uLenRecved, usRecvBufLen, szRcvBuf);
                    continue;
                }
                if (uCount>=uMaxCount)
                {
                    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0, "socket timeout.");
                    close (event_list[i].data.fd);
                }
#if 0
                /* We have data on the fd waiting to be read. Read and
                   display it. We must read whatever data is available
                   completely, as we are running in edge-triggered mode
                   and won't get a notification again for the same
                   data. */
                int done = 0;

                while (1)
                {
                    ssize_t count;
                    char buf[512]={0};

                    count = read (event_list[i].data.fd, buf, sizeof buf);
                    if (count == -1)
                    {
                        /* If errno == EAGAIN, that means we have read all
                           data. So go back to the main loop. */
                        if (errno != EAGAIN)
                        {
                            perror ("read");
                            done = 1;
                        }
                        break;
                    }
                    else if (count == 0)
                    {
                        /* End of file. The remote has closed the
                           connection. */
                        done = 1;
                        break;
                    }

                    /* Write the buffer to standard output */
                    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"recv: %s", buf);
                    if(ngx_strncmp(buf, "reload", 6)==0)
                    {
                        //ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"reload");
                        ngx_signal_handler(ngx_signal_value(NGX_RECONFIGURE_SIGNAL));
                    }
                }

                if (done)
                {
                    ngx_log_error(NGX_LOG_DEBUG, cycle->log, 0,"Closed connection on descriptor %d",
                            event_list[i].data.fd);

                    /* Closing the descriptor will make epoll remove it
                       from the set of descriptors which are monitored. */
                    close (event_list[i].data.fd);
                }
#endif
            }
        }
        if(events>0)
        {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, 0, "epoll_wait() returned events. num: %d", events);
            //continue;
        }
        //sleep(1);
#endif

        ngx_time_update();

        ngx_log_debug1(NGX_LOG_DEBUG_EVENT, cycle->log, 0,
                       "wake up, sigio %i", sigio);

        if (ngx_reap) {
            ngx_reap = 0;
            ngx_log_debug0(NGX_LOG_DEBUG_EVENT, cycle->log, 0, "reap children");

            live = ngx_reap_children(cycle);
        }

        if (!live && (ngx_terminate || ngx_quit)) {
            ngx_master_process_exit(cycle);
        }

        if (ngx_terminate) {
            if (delay == 0) {
                delay = 50;
            }

            if (sigio) {
                sigio--;
                continue;
            }

            sigio = ccf->worker_processes + 2 /* cache processes */;

            if (delay > 1000) {
                ngx_signal_worker_processes(cycle, SIGKILL);
            } else {
                ngx_signal_worker_processes(cycle,
                                       ngx_signal_value(NGX_TERMINATE_SIGNAL));
            }

            continue;
        }

        if (ngx_quit) {
            ngx_signal_worker_processes(cycle,
                                        ngx_signal_value(NGX_SHUTDOWN_SIGNAL));

            ls = cycle->listening.elts;
            for (n = 0; n < cycle->listening.nelts; n++) {
                if (ngx_close_socket(ls[n].fd) == -1) {
                    ngx_log_error(NGX_LOG_EMERG, cycle->log, ngx_socket_errno,
                                  ngx_close_socket_n " %V failed",
                                  &ls[n].addr_text);
                }
            }
            cycle->listening.nelts = 0;

            continue;
        }

        if (ngx_reconfigure) {
            ngx_reconfigure = 0;

            if (ngx_new_binary) {
                ngx_start_worker_processes(cycle, ccf->worker_processes,
                                           NGX_PROCESS_RESPAWN);
                ngx_start_cache_manager_processes(cycle, 0);
                ngx_noaccepting = 0;

                continue;
            }

            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reconfiguring");

            cycle = ngx_init_cycle(cycle);
            if (cycle == NULL) {
                cycle = (ngx_cycle_t *) ngx_cycle;
                continue;
            }

            ngx_cycle = cycle;
            ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx,
                                                   ngx_core_module);
            ngx_start_worker_processes(cycle, ccf->worker_processes,
                                       NGX_PROCESS_JUST_RESPAWN);
            ngx_start_cache_manager_processes(cycle, 1);

            /* allow new processes to start */
            ngx_msleep(100);

            live = 1;
            ngx_signal_worker_processes(cycle,
                                        ngx_signal_value(NGX_SHUTDOWN_SIGNAL));
        }

        if (ngx_restart) {
            ngx_restart = 0;
            ngx_start_worker_processes(cycle, ccf->worker_processes,
                                       NGX_PROCESS_RESPAWN);
            ngx_start_cache_manager_processes(cycle, 0);
            live = 1;
        }

        if (ngx_reopen) {
            ngx_reopen = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reopening logs");
            ngx_reopen_files(cycle, ccf->user);
            ngx_signal_worker_processes(cycle,
                                        ngx_signal_value(NGX_REOPEN_SIGNAL));
        }

        if (ngx_change_binary) {
            ngx_change_binary = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "changing binary");
            ngx_new_binary = ngx_exec_new_binary(cycle, ngx_argv);
        }

        if (ngx_noaccept) {
            ngx_noaccept = 0;
            ngx_noaccepting = 1;
            ngx_signal_worker_processes(cycle,
                                        ngx_signal_value(NGX_SHUTDOWN_SIGNAL));
        }
    }
}


void
ngx_single_process_cycle(ngx_cycle_t *cycle)
{
    ngx_uint_t  i;

    if (ngx_set_environment(cycle, NULL) == NULL) {
        /* fatal */
        exit(2);
    }

    for (i = 0; ngx_modules[i]; i++) {
        if (ngx_modules[i]->init_process) {
            if (ngx_modules[i]->init_process(cycle) == NGX_ERROR) {
                /* fatal */
                exit(2);
            }
        }
    }

    for ( ;; ) {
        ngx_log_debug0(NGX_LOG_DEBUG_EVENT, cycle->log, 0, "worker cycle");

        ngx_process_events_and_timers(cycle);

        if (ngx_terminate || ngx_quit) {

            for (i = 0; ngx_modules[i]; i++) {
                if (ngx_modules[i]->exit_process) {
                    ngx_modules[i]->exit_process(cycle);
                }
            }

            ngx_master_process_exit(cycle);
        }

        if (ngx_reconfigure) {
            ngx_reconfigure = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reconfiguring");

            cycle = ngx_init_cycle(cycle);
            if (cycle == NULL) {
                cycle = (ngx_cycle_t *) ngx_cycle;
                continue;
            }

            ngx_cycle = cycle;
        }

        if (ngx_reopen) {
            ngx_reopen = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reopening logs");
            ngx_reopen_files(cycle, (ngx_uid_t) -1);
        }
    }
}


static void
ngx_start_worker_processes(ngx_cycle_t *cycle, ngx_int_t n, ngx_int_t type)
{
    ngx_int_t      i;
    ngx_channel_t  ch;

    ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "start worker processes");

    ngx_memzero(&ch, sizeof(ngx_channel_t));

    ch.command = NGX_CMD_OPEN_CHANNEL;

    for (i = 0; i < n; i++) {

        ngx_spawn_process(cycle, ngx_worker_process_cycle,
                          (void *) (intptr_t) i, "worker process", type);

        ch.pid = ngx_processes[ngx_process_slot].pid;
        ch.slot = ngx_process_slot;
        ch.fd = ngx_processes[ngx_process_slot].channel[0];

        ngx_pass_open_channel(cycle, &ch);
    }
}


static void
ngx_start_cache_manager_processes(ngx_cycle_t *cycle, ngx_uint_t respawn)
{
    ngx_uint_t       i, manager, loader;
    ngx_path_t     **path;
    ngx_channel_t    ch;

    manager = 0;
    loader = 0;

    path = ngx_cycle->paths.elts;
    for (i = 0; i < ngx_cycle->paths.nelts; i++) {

        if (path[i]->manager) {
            manager = 1;
        }

        if (path[i]->loader) {
            loader = 1;
        }
    }

    if (manager == 0) {
        return;
    }

    ngx_spawn_process(cycle, ngx_cache_manager_process_cycle,
                      &ngx_cache_manager_ctx, "cache manager process",
                      respawn ? NGX_PROCESS_JUST_RESPAWN : NGX_PROCESS_RESPAWN);

    ngx_memzero(&ch, sizeof(ngx_channel_t));

    ch.command = NGX_CMD_OPEN_CHANNEL;
    ch.pid = ngx_processes[ngx_process_slot].pid;
    ch.slot = ngx_process_slot;
    ch.fd = ngx_processes[ngx_process_slot].channel[0];

    ngx_pass_open_channel(cycle, &ch);

    if (loader == 0) {
        return;
    }

    ngx_spawn_process(cycle, ngx_cache_manager_process_cycle,
                      &ngx_cache_loader_ctx, "cache loader process",
                      respawn ? NGX_PROCESS_JUST_SPAWN : NGX_PROCESS_NORESPAWN);

    ch.command = NGX_CMD_OPEN_CHANNEL;
    ch.pid = ngx_processes[ngx_process_slot].pid;
    ch.slot = ngx_process_slot;
    ch.fd = ngx_processes[ngx_process_slot].channel[0];

    ngx_pass_open_channel(cycle, &ch);
}


static void
ngx_pass_open_channel(ngx_cycle_t *cycle, ngx_channel_t *ch)
{
    ngx_int_t  i;

    for (i = 0; i < ngx_last_process; i++) {

        if (i == ngx_process_slot
            || ngx_processes[i].pid == -1
            || ngx_processes[i].channel[0] == -1)
        {
            continue;
        }

        ngx_log_debug6(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                      "pass channel s:%d pid:%P fd:%d to s:%i pid:%P fd:%d",
                      ch->slot, ch->pid, ch->fd,
                      i, ngx_processes[i].pid,
                      ngx_processes[i].channel[0]);

        /* TODO: NGX_AGAIN */

        ngx_write_channel(ngx_processes[i].channel[0],
                          ch, sizeof(ngx_channel_t), cycle->log);
    }
}


static void
ngx_signal_worker_processes(ngx_cycle_t *cycle, int signo)
{
    ngx_int_t      i;
    ngx_err_t      err;
    ngx_channel_t  ch;

    ngx_memzero(&ch, sizeof(ngx_channel_t));

#if (NGX_BROKEN_SCM_RIGHTS)

    ch.command = 0;

#else

    switch (signo) {

    case ngx_signal_value(NGX_SHUTDOWN_SIGNAL):
        ch.command = NGX_CMD_QUIT;
        break;

    case ngx_signal_value(NGX_TERMINATE_SIGNAL):
        ch.command = NGX_CMD_TERMINATE;
        break;

    case ngx_signal_value(NGX_REOPEN_SIGNAL):
        ch.command = NGX_CMD_REOPEN;
        break;

    default:
        ch.command = 0;
    }

#endif

    ch.fd = -1;


    for (i = 0; i < ngx_last_process; i++) {

        ngx_log_debug7(NGX_LOG_DEBUG_EVENT, cycle->log, 0,
                       "child: %d %P e:%d t:%d d:%d r:%d j:%d",
                       i,
                       ngx_processes[i].pid,
                       ngx_processes[i].exiting,
                       ngx_processes[i].exited,
                       ngx_processes[i].detached,
                       ngx_processes[i].respawn,
                       ngx_processes[i].just_spawn);

        if (ngx_processes[i].detached || ngx_processes[i].pid == -1) {
            continue;
        }

        if (ngx_processes[i].just_spawn) {
            ngx_processes[i].just_spawn = 0;
            continue;
        }

        if (ngx_processes[i].exiting
            && signo == ngx_signal_value(NGX_SHUTDOWN_SIGNAL))
        {
            continue;
        }

        if (ch.command) {
            if (ngx_write_channel(ngx_processes[i].channel[0],
                                  &ch, sizeof(ngx_channel_t), cycle->log)
                == NGX_OK)
            {
                if (signo != ngx_signal_value(NGX_REOPEN_SIGNAL)) {
                    ngx_processes[i].exiting = 1;
                }

                continue;
            }
        }

        ngx_log_debug2(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                       "kill (%P, %d)", ngx_processes[i].pid, signo);

        if (kill(ngx_processes[i].pid, signo) == -1) {
            err = ngx_errno;
            ngx_log_error(NGX_LOG_ALERT, cycle->log, err,
                          "kill(%P, %d) failed", ngx_processes[i].pid, signo);

            if (err == NGX_ESRCH) {
                ngx_processes[i].exited = 1;
                ngx_processes[i].exiting = 0;
                ngx_reap = 1;
            }

            continue;
        }

        if (signo != ngx_signal_value(NGX_REOPEN_SIGNAL)) {
            ngx_processes[i].exiting = 1;
        }
    }
}


static ngx_uint_t
ngx_reap_children(ngx_cycle_t *cycle)
{
    ngx_int_t         i, n;
    ngx_uint_t        live;
    ngx_channel_t     ch;
    ngx_core_conf_t  *ccf;

    ngx_memzero(&ch, sizeof(ngx_channel_t));

    ch.command = NGX_CMD_CLOSE_CHANNEL;
    ch.fd = -1;

    live = 0;
    for (i = 0; i < ngx_last_process; i++) {

        ngx_log_debug7(NGX_LOG_DEBUG_EVENT, cycle->log, 0,
                       "child: %d %P e:%d t:%d d:%d r:%d j:%d",
                       i,
                       ngx_processes[i].pid,
                       ngx_processes[i].exiting,
                       ngx_processes[i].exited,
                       ngx_processes[i].detached,
                       ngx_processes[i].respawn,
                       ngx_processes[i].just_spawn);

        if (ngx_processes[i].pid == -1) {
            continue;
        }

        if (ngx_processes[i].exited) {

            if (!ngx_processes[i].detached) {
                ngx_close_channel(ngx_processes[i].channel, cycle->log);

                ngx_processes[i].channel[0] = -1;
                ngx_processes[i].channel[1] = -1;

                ch.pid = ngx_processes[i].pid;
                ch.slot = i;

                for (n = 0; n < ngx_last_process; n++) {
                    if (ngx_processes[n].exited
                        || ngx_processes[n].pid == -1
                        || ngx_processes[n].channel[0] == -1)
                    {
                        continue;
                    }

                    ngx_log_debug3(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                                   "pass close channel s:%i pid:%P to:%P",
                                   ch.slot, ch.pid, ngx_processes[n].pid);

                    /* TODO: NGX_AGAIN */

                    ngx_write_channel(ngx_processes[n].channel[0],
                                      &ch, sizeof(ngx_channel_t), cycle->log);
                }
            }

            if (ngx_processes[i].respawn
                && !ngx_processes[i].exiting
                && !ngx_terminate
                && !ngx_quit)
            {
                if (ngx_spawn_process(cycle, ngx_processes[i].proc,
                                      ngx_processes[i].data,
                                      ngx_processes[i].name, i)
                    == NGX_INVALID_PID)
                {
                    ngx_log_error(NGX_LOG_ALERT, cycle->log, 0,
                                  "could not respawn %s",
                                  ngx_processes[i].name);
                    continue;
                }


                ch.command = NGX_CMD_OPEN_CHANNEL;
                ch.pid = ngx_processes[ngx_process_slot].pid;
                ch.slot = ngx_process_slot;
                ch.fd = ngx_processes[ngx_process_slot].channel[0];

                ngx_pass_open_channel(cycle, &ch);

                live = 1;

                continue;
            }

            if (ngx_processes[i].pid == ngx_new_binary) {

                ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx,
                                                       ngx_core_module);

                if (ngx_rename_file((char *) ccf->oldpid.data,
                                    (char *) ccf->pid.data)
                    == NGX_FILE_ERROR)
                {
                    ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                                  ngx_rename_file_n " %s back to %s failed "
                                  "after the new binary process \"%s\" exited",
                                  ccf->oldpid.data, ccf->pid.data, ngx_argv[0]);
                }

                ngx_new_binary = 0;
                if (ngx_noaccepting) {
                    ngx_restart = 1;
                    ngx_noaccepting = 0;
                }
            }

            if (i == ngx_last_process - 1) {
                ngx_last_process--;

            } else {
                ngx_processes[i].pid = -1;
            }

        } else if (ngx_processes[i].exiting || !ngx_processes[i].detached) {
            live = 1;
        }
    }

    return live;
}


static void
ngx_master_process_exit(ngx_cycle_t *cycle)
{
    ngx_uint_t  i;

    ngx_delete_pidfile(cycle);

    ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "exit");

    for (i = 0; ngx_modules[i]; i++) {
        if (ngx_modules[i]->exit_master) {
            ngx_modules[i]->exit_master(cycle);
        }
    }

    ngx_close_listening_sockets(cycle);

    /*
     * Copy ngx_cycle->log related data to the special static exit cycle,
     * log, and log file structures enough to allow a signal handler to log.
     * The handler may be called when standard ngx_cycle->log allocated from
     * ngx_cycle->pool is already destroyed.
     */

    ngx_exit_log_file.fd = ngx_cycle->log->file->fd;

    ngx_exit_log = *ngx_cycle->log;
    ngx_exit_log.file = &ngx_exit_log_file;
    ngx_exit_log.next = NULL;

    ngx_exit_cycle.log = &ngx_exit_log;
    ngx_exit_cycle.files = ngx_cycle->files;
    ngx_exit_cycle.files_n = ngx_cycle->files_n;
    ngx_cycle = &ngx_exit_cycle;

    ngx_destroy_pool(cycle->pool);

    exit(0);
}


static void
ngx_worker_process_cycle(ngx_cycle_t *cycle, void *data)
{
    ngx_int_t worker = (intptr_t) data;

    ngx_uint_t         i;
    ngx_connection_t  *c;

    ngx_process = NGX_PROCESS_WORKER;

    ngx_worker_process_init(cycle, worker);

    ngx_setproctitle("worker process");

#if (NGX_THREADS)
    {
    ngx_int_t         n;
    ngx_err_t         err;
    ngx_core_conf_t  *ccf;

    ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx, ngx_core_module);

    if (ngx_threads_n) {
        if (ngx_init_threads(ngx_threads_n, ccf->thread_stack_size, cycle)
            == NGX_ERROR)
        {
            /* fatal */
            exit(2);
        }

        err = ngx_thread_key_create(&ngx_core_tls_key);
        if (err != 0) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, err,
                          ngx_thread_key_create_n " failed");
            /* fatal */
            exit(2);
        }

        for (n = 0; n < ngx_threads_n; n++) {

            ngx_threads[n].cv = ngx_cond_init(cycle->log);

            if (ngx_threads[n].cv == NULL) {
                /* fatal */
                exit(2);
            }

            if (ngx_create_thread((ngx_tid_t *) &ngx_threads[n].tid,
                                  ngx_worker_thread_cycle,
                                  (void *) &ngx_threads[n], cycle->log)
                != 0)
            {
                /* fatal */
                exit(2);
            }
        }
    }
    }
#endif

    for ( ;; ) {

        if (ngx_exiting) {

            c = cycle->connections;

            for (i = 0; i < cycle->connection_n; i++) {

                /* THREAD: lock */

                if (c[i].fd != -1 && c[i].idle) {
                    c[i].close = 1;
                    c[i].read->handler(c[i].read);
                }
            }

            if (ngx_event_timer_rbtree.root == ngx_event_timer_rbtree.sentinel)
            {
                ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "exiting");

                ngx_worker_process_exit(cycle);
            }
        }

        ngx_log_debug0(NGX_LOG_DEBUG_EVENT, cycle->log, 0, "worker cycle");

        ngx_process_events_and_timers(cycle);

        if (ngx_terminate) {
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "exiting");

            ngx_worker_process_exit(cycle);
        }

        if (ngx_quit) {
            ngx_quit = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0,
                          "gracefully shutting down");
            ngx_setproctitle("worker process is shutting down");

            if (!ngx_exiting) {
                ngx_close_listening_sockets(cycle);
                ngx_exiting = 1;
            }
        }

        if (ngx_reopen) {
            ngx_reopen = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reopening logs");
            ngx_reopen_files(cycle, -1);
        }
    }
}


static void
ngx_worker_process_init(ngx_cycle_t *cycle, ngx_int_t worker)
{
    sigset_t          set;
    uint64_t          cpu_affinity;
    ngx_int_t         n;
    ngx_uint_t        i;
    struct rlimit     rlmt;
    ngx_core_conf_t  *ccf;
    ngx_listening_t  *ls;

    if (ngx_set_environment(cycle, NULL) == NULL) {
        /* fatal */
        exit(2);
    }

    ccf = (ngx_core_conf_t *) ngx_get_conf(cycle->conf_ctx, ngx_core_module);

    if (worker >= 0 && ccf->priority != 0) {
        if (setpriority(PRIO_PROCESS, 0, ccf->priority) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "setpriority(%d) failed", ccf->priority);
        }
    }

    if (ccf->rlimit_nofile != NGX_CONF_UNSET) {
        rlmt.rlim_cur = (rlim_t) ccf->rlimit_nofile;
        rlmt.rlim_max = (rlim_t) ccf->rlimit_nofile;

        if (setrlimit(RLIMIT_NOFILE, &rlmt) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "setrlimit(RLIMIT_NOFILE, %i) failed",
                          ccf->rlimit_nofile);
        }
    }

    if (ccf->rlimit_core != NGX_CONF_UNSET) {
        rlmt.rlim_cur = (rlim_t) ccf->rlimit_core;
        rlmt.rlim_max = (rlim_t) ccf->rlimit_core;

        if (setrlimit(RLIMIT_CORE, &rlmt) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "setrlimit(RLIMIT_CORE, %O) failed",
                          ccf->rlimit_core);
        }
    }

#ifdef RLIMIT_SIGPENDING
    if (ccf->rlimit_sigpending != NGX_CONF_UNSET) {
        rlmt.rlim_cur = (rlim_t) ccf->rlimit_sigpending;
        rlmt.rlim_max = (rlim_t) ccf->rlimit_sigpending;

        if (setrlimit(RLIMIT_SIGPENDING, &rlmt) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "setrlimit(RLIMIT_SIGPENDING, %i) failed",
                          ccf->rlimit_sigpending);
        }
    }
#endif

    if (geteuid() == 0) {
        if (setgid(ccf->group) == -1) {
            ngx_log_error(NGX_LOG_EMERG, cycle->log, ngx_errno,
                          "setgid(%d) failed", ccf->group);
            /* fatal */
            exit(2);
        }

        if (initgroups(ccf->username, ccf->group) == -1) {
            ngx_log_error(NGX_LOG_EMERG, cycle->log, ngx_errno,
                          "initgroups(%s, %d) failed",
                          ccf->username, ccf->group);
        }

        if (setuid(ccf->user) == -1) {
            ngx_log_error(NGX_LOG_EMERG, cycle->log, ngx_errno,
                          "setuid(%d) failed", ccf->user);
            /* fatal */
            exit(2);
        }
    }

    if (worker >= 0) {
        cpu_affinity = ngx_get_cpu_affinity(worker);

        if (cpu_affinity) {
            ngx_setaffinity(cpu_affinity, cycle->log);
        }
    }

#if (NGX_HAVE_PR_SET_DUMPABLE)

    /* allow coredump after setuid() in Linux 2.4.x */

    if (prctl(PR_SET_DUMPABLE, 1, 0, 0, 0) == -1) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                      "prctl(PR_SET_DUMPABLE) failed");
    }

#endif

    if (ccf->working_directory.len) {
        if (chdir((char *) ccf->working_directory.data) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "chdir(\"%s\") failed", ccf->working_directory.data);
            /* fatal */
            exit(2);
        }
    }

    sigemptyset(&set);

    if (sigprocmask(SIG_SETMASK, &set, NULL) == -1) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                      "sigprocmask() failed");
    }

    srandom((ngx_pid << 16) ^ ngx_time());

    /*
     * disable deleting previous events for the listening sockets because
     * in the worker processes there are no events at all at this point
     */
    ls = cycle->listening.elts;
    for (i = 0; i < cycle->listening.nelts; i++) {
        ls[i].previous = NULL;
    }

    for (i = 0; ngx_modules[i]; i++) {
        if (ngx_modules[i]->init_process) {
            if (ngx_modules[i]->init_process(cycle) == NGX_ERROR) {
                /* fatal */
                exit(2);
            }
        }
    }

    for (n = 0; n < ngx_last_process; n++) {

        if (ngx_processes[n].pid == -1) {
            continue;
        }

        if (n == ngx_process_slot) {
            continue;
        }

        if (ngx_processes[n].channel[1] == -1) {
            continue;
        }

        if (close(ngx_processes[n].channel[1]) == -1) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                          "close() channel failed");
        }
    }

    if (close(ngx_processes[ngx_process_slot].channel[0]) == -1) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                      "close() channel failed");
    }

#if 0
    ngx_last_process = 0;
#endif

    if (ngx_add_channel_event(cycle, ngx_channel, NGX_READ_EVENT,
                              ngx_channel_handler)
        == NGX_ERROR)
    {
        /* fatal */
        exit(2);
    }
}


static void
ngx_worker_process_exit(ngx_cycle_t *cycle)
{
    ngx_uint_t         i;
    ngx_connection_t  *c;

#if (NGX_THREADS)
    ngx_terminate = 1;

    ngx_wakeup_worker_threads(cycle);
#endif

    for (i = 0; ngx_modules[i]; i++) {
        if (ngx_modules[i]->exit_process) {
            ngx_modules[i]->exit_process(cycle);
        }
    }

    if (ngx_exiting) {
        c = cycle->connections;
        for (i = 0; i < cycle->connection_n; i++) {
            if (c[i].fd != -1
                && c[i].read
                && !c[i].read->accept
                && !c[i].read->channel
                && !c[i].read->resolver)
            {
                ngx_log_error(NGX_LOG_ALERT, cycle->log, 0,
                              "*%uA open socket #%d left in connection %ui",
                              c[i].number, c[i].fd, i);
                ngx_debug_quit = 1;
            }
        }

        if (ngx_debug_quit) {
            ngx_log_error(NGX_LOG_ALERT, cycle->log, 0, "aborting");
            ngx_debug_point();
        }
    }

    /*
     * Copy ngx_cycle->log related data to the special static exit cycle,
     * log, and log file structures enough to allow a signal handler to log.
     * The handler may be called when standard ngx_cycle->log allocated from
     * ngx_cycle->pool is already destroyed.
     */

    ngx_exit_log_file.fd = ngx_cycle->log->file->fd;

    ngx_exit_log = *ngx_cycle->log;
    ngx_exit_log.file = &ngx_exit_log_file;
    ngx_exit_log.next = NULL;

    ngx_exit_cycle.log = &ngx_exit_log;
    ngx_exit_cycle.files = ngx_cycle->files;
    ngx_exit_cycle.files_n = ngx_cycle->files_n;
    ngx_cycle = &ngx_exit_cycle;

    ngx_destroy_pool(cycle->pool);

    ngx_log_error(NGX_LOG_NOTICE, ngx_cycle->log, 0, "exit");

    exit(0);
}


static void
ngx_channel_handler(ngx_event_t *ev)
{
    ngx_int_t          n;
    ngx_channel_t      ch;
    ngx_connection_t  *c;

    if (ev->timedout) {
        ev->timedout = 0;
        return;
    }

    c = ev->data;

    ngx_log_debug0(NGX_LOG_DEBUG_CORE, ev->log, 0, "channel handler");

    for ( ;; ) {

        n = ngx_read_channel(c->fd, &ch, sizeof(ngx_channel_t), ev->log);

        ngx_log_debug1(NGX_LOG_DEBUG_CORE, ev->log, 0, "channel: %i", n);

        if (n == NGX_ERROR) {

            if (ngx_event_flags & NGX_USE_EPOLL_EVENT) {
                ngx_del_conn(c, 0);
            }

            ngx_close_connection(c);
            return;
        }

        if (ngx_event_flags & NGX_USE_EVENTPORT_EVENT) {
            if (ngx_add_event(ev, NGX_READ_EVENT, 0) == NGX_ERROR) {
                return;
            }
        }

        if (n == NGX_AGAIN) {
            return;
        }

        ngx_log_debug1(NGX_LOG_DEBUG_CORE, ev->log, 0,
                       "channel command: %d", ch.command);

        switch (ch.command) {

        case NGX_CMD_QUIT:
            ngx_quit = 1;
            break;

        case NGX_CMD_TERMINATE:
            ngx_terminate = 1;
            break;

        case NGX_CMD_REOPEN:
            ngx_reopen = 1;
            break;

        case NGX_CMD_OPEN_CHANNEL:

            ngx_log_debug3(NGX_LOG_DEBUG_CORE, ev->log, 0,
                           "get channel s:%i pid:%P fd:%d",
                           ch.slot, ch.pid, ch.fd);

            ngx_processes[ch.slot].pid = ch.pid;
            ngx_processes[ch.slot].channel[0] = ch.fd;
            break;

        case NGX_CMD_CLOSE_CHANNEL:

            ngx_log_debug4(NGX_LOG_DEBUG_CORE, ev->log, 0,
                           "close channel s:%i pid:%P our:%P fd:%d",
                           ch.slot, ch.pid, ngx_processes[ch.slot].pid,
                           ngx_processes[ch.slot].channel[0]);

            if (close(ngx_processes[ch.slot].channel[0]) == -1) {
                ngx_log_error(NGX_LOG_ALERT, ev->log, ngx_errno,
                              "close() channel failed");
            }

            ngx_processes[ch.slot].channel[0] = -1;
            break;
        }
    }
}


#if (NGX_THREADS)

static void
ngx_wakeup_worker_threads(ngx_cycle_t *cycle)
{
    ngx_int_t   i;
    ngx_uint_t  live;

    for ( ;; ) {

        live = 0;

        for (i = 0; i < ngx_threads_n; i++) {
            if (ngx_threads[i].state < NGX_THREAD_EXIT) {
                if (ngx_cond_signal(ngx_threads[i].cv) == NGX_ERROR) {
                    ngx_threads[i].state = NGX_THREAD_DONE;

                } else {
                    live = 1;
                }
            }

            if (ngx_threads[i].state == NGX_THREAD_EXIT) {
                ngx_thread_join(ngx_threads[i].tid, NULL);
                ngx_threads[i].state = NGX_THREAD_DONE;
            }
        }

        if (live == 0) {
            ngx_log_debug0(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                           "all worker threads are joined");

            /* STUB */
            ngx_done_events(cycle);
            ngx_mutex_destroy(ngx_event_timer_mutex);
            ngx_mutex_destroy(ngx_posted_events_mutex);

            return;
        }

        ngx_sched_yield();
    }
}


static ngx_thread_value_t
ngx_worker_thread_cycle(void *data)
{
    ngx_thread_t  *thr = data;

    sigset_t          set;
    ngx_err_t         err;
    ngx_core_tls_t   *tls;
    ngx_cycle_t      *cycle;

    cycle = (ngx_cycle_t *) ngx_cycle;

    sigemptyset(&set);
    sigaddset(&set, ngx_signal_value(NGX_RECONFIGURE_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_REOPEN_SIGNAL));
    sigaddset(&set, ngx_signal_value(NGX_CHANGEBIN_SIGNAL));

    err = ngx_thread_sigmask(SIG_BLOCK, &set, NULL);
    if (err) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, err,
                      ngx_thread_sigmask_n " failed");
        return (ngx_thread_value_t) 1;
    }

    ngx_log_debug1(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                   "thread " NGX_TID_T_FMT " started", ngx_thread_self());

    ngx_setthrtitle("worker thread");

    tls = ngx_calloc(sizeof(ngx_core_tls_t), cycle->log);
    if (tls == NULL) {
        return (ngx_thread_value_t) 1;
    }

    err = ngx_thread_set_tls(ngx_core_tls_key, tls);
    if (err != 0) {
        ngx_log_error(NGX_LOG_ALERT, cycle->log, err,
                      ngx_thread_set_tls_n " failed");
        return (ngx_thread_value_t) 1;
    }

    ngx_mutex_lock(ngx_posted_events_mutex);

    for ( ;; ) {
        thr->state = NGX_THREAD_FREE;

        if (ngx_cond_wait(thr->cv, ngx_posted_events_mutex) == NGX_ERROR) {
            return (ngx_thread_value_t) 1;
        }

        if (ngx_terminate) {
            thr->state = NGX_THREAD_EXIT;

            ngx_mutex_unlock(ngx_posted_events_mutex);

            ngx_log_debug1(NGX_LOG_DEBUG_CORE, cycle->log, 0,
                           "thread " NGX_TID_T_FMT " is done",
                           ngx_thread_self());

            return (ngx_thread_value_t) 0;
        }

        thr->state = NGX_THREAD_BUSY;

        if (ngx_event_thread_process_posted(cycle) == NGX_ERROR) {
            return (ngx_thread_value_t) 1;
        }

        if (ngx_event_thread_process_posted(cycle) == NGX_ERROR) {
            return (ngx_thread_value_t) 1;
        }

        if (ngx_process_changes) {
            if (ngx_process_changes(cycle, 1) == NGX_ERROR) {
                return (ngx_thread_value_t) 1;
            }
        }
    }
}

#endif


static void
ngx_cache_manager_process_cycle(ngx_cycle_t *cycle, void *data)
{
    ngx_cache_manager_ctx_t *ctx = data;

    void         *ident[4];
    ngx_event_t   ev;

    /*
     * Set correct process type since closing listening Unix domain socket
     * in a master process also removes the Unix domain socket file.
     */
    ngx_process = NGX_PROCESS_HELPER;

    ngx_close_listening_sockets(cycle);

    /* Set a moderate number of connections for a helper process. */
    cycle->connection_n = 512;

    ngx_worker_process_init(cycle, -1);

    ngx_memzero(&ev, sizeof(ngx_event_t));
    ev.handler = ctx->handler;
    ev.data = ident;
    ev.log = cycle->log;
    ident[3] = (void *) -1;

    ngx_use_accept_mutex = 0;

    ngx_setproctitle(ctx->name);

    ngx_add_timer(&ev, ctx->delay);

    for ( ;; ) {

        if (ngx_terminate || ngx_quit) {
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "exiting");
            exit(0);
        }

        if (ngx_reopen) {
            ngx_reopen = 0;
            ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "reopening logs");
            ngx_reopen_files(cycle, -1);
        }

        ngx_process_events_and_timers(cycle);
    }
}


static void
ngx_cache_manager_process_handler(ngx_event_t *ev)
{
    time_t        next, n;
    ngx_uint_t    i;
    ngx_path_t  **path;

    next = 60 * 60;

    path = ngx_cycle->paths.elts;
    for (i = 0; i < ngx_cycle->paths.nelts; i++) {

        if (path[i]->manager) {
            n = path[i]->manager(path[i]->data);

            next = (n <= next) ? n : next;

            ngx_time_update();
        }
    }

    if (next == 0) {
        next = 1;
    }

    ngx_add_timer(ev, next * 1000);
}


static void
ngx_cache_loader_process_handler(ngx_event_t *ev)
{
    ngx_uint_t     i;
    ngx_path_t   **path;
    ngx_cycle_t   *cycle;

    cycle = (ngx_cycle_t *) ngx_cycle;

    path = cycle->paths.elts;
    for (i = 0; i < cycle->paths.nelts; i++) {

        if (ngx_terminate || ngx_quit) {
            break;
        }

        if (path[i]->loader) {
            path[i]->loader(path[i]->data);
            ngx_time_update();
        }
    }

    exit(0);
}
