













<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">



<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>订单填写-国内机票-去哪儿网Qunar.com</title>
    <link rel="stylesheet" href="/s/prd/styles/release/order.css">
</head>
<body>

<!--未登录导航star-->
<div class="pubnav">
    <div class="nav_inner over-flow fix">
        <p class="servise_phone">
            去哪儿网机票
        </p>

        <!-- IATA信息显示 -->
        
        <!-- /IATA信息显示 -->

        <!-- IATA信息显示 -->
        
        <div data-type="cpa" class="orangejt_tips m-iatatips j-hoverElement">
            <span class="m-iata"></span>

            <div class="tips_contair j-tipElement">
                <div class="bot"></div>
                <div class="top"></div>
                <div class="tips_content">
                    <p><span>北京嘉信浩远信息技术有限公司（为您提供出票服务的代理商）</span></p>
                    <p><span class="flight-name">中国南方航空公司授权代理</span><span class="fr">IATA号：08328121</span>
                    </p>
                </div>
            </div>
        </div>
        
        <!-- /IATA信息显示 -->

        <ul class="login_info" id="login_status"></ul>
        <input type="hidden" id="this_page_url" value=""/>
    </div>
</div>
<!--未登录导航end-->
<!--代码商banner star-->
<div class="b_agentbanner">
    <div class="e_agentbanner">
        <div class="banner">
            <!-- 每个代理商自己的banner -->
            <div class="logo"><a target="_top" href="javascript:void(0)">
                
                
                
                
                
                
                    <img id="logoImg" src="http://simg1.qunarzz.com/tts/products_logo/djth-nlogo.gif" alt="低价特惠"/>
                
            </a><b></b></div>
            <div class="m_fl_piao">
            </div>
            <div class="m_fr_rbz">
                <div class="b_acc_hp">
                    <a href="http://www.qunar.com/xiaobao/flight.html" target="_blank">
                        <img src="http://simg1.qunarzz.com/tts/images/bg_bao_tts_v1.png" alt="全网预订保障 去哪儿都放心">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<!--代码商banner end-->


<!--页面title与订单流程star-->
<div class="proces_step">
    <div class="p_title">填写订单</div>
    <ul>
        <li>选择航班<em class="prenode"><s></s></em></li>
        <li>填写订单<em class="current"><s></s></em></li>
        <li>确认并支付<em class="nexnode"><s></s></em></li>
        <li>预订完成<em class="lastNode"></em></li>
    </ul>
</div>
<!--页面title与订单流程end-->
<div id="js_bookingContent" class="hide">
    <!--提交后的页面提示模块star-->
    <div class="moduletip_wt hide" id="js_ufeesTips"></div>
    <div class="moduletip_wt hide" id="js_bookingTips"></div>
    <!--提交后的页面提示模块end-->

    <!--航班信息star-->
    <div class="module_flight">
        <div class="flight_ft flight_exp" id="js_fligtInfo"><!--展开的情况下的class值为flight_exp,收起则去掉flight_exp--></div>
    </div>
    <!--航班信息end-->
    <!--提示特价票-->
    <div id="js-no_xcd_tip" class="moduletip_wt" style="display:none;"></div>
    <!--\提示特价票-->
    <form onsubmit="return false;" name="booking_main" id="js_booking_form">
        <!--乘机人信息star-->
        <div class="module_passinfo" id="module_passinfo"></div>
        <!--乘机人信息end-->
        <!--联系人信息star-->
        <div class="module_contact" id="module_contact"></div>
        <div class="b_meals module_foodInfo" id="module_foodInfo" style="display: none"></div>
        <!--联系人信息end-->

        <!--礼品信息star-->
        <div class="b_gift" id="module_gift"></div>
        <!--礼品信息end-->
        <!--代金券信息star-->
        <div class="b_gift" id="module_coupon"></div>
        <!--代金券信息end-->

        <!--报销信息star miao.qunar.com okmiao.qunar.com miaosha.qunar.com  不显示-->

        <div class="reimbur_info" id="reimbur_info"></div>

        <!--报销信息end-->
        <!--订单基本信息star-->
        <div class="moduletip_wt hide" id="module_vcode"></div>
        <!--订单基本信息end-->
        <!--显示代金券使用说明-->
        <!-- 取消代金券区域显示 @kangjia -->
        <!-- <div id="module_voucher"></div> -->
        <!--订单基本信息star-->
        <div class="moduletip_wt" id="moduletip_wt"></div>
        <!--订单基本信息end-->

        <!--阅读并同意star-->
        <div class="agreen_info" id="module_agreement"></div>
        <!--阅读并同意star-->
        <!--提交按钮star-->
        <div class="wt_submit">
    		<span id="bt_submit" class="btn_sbm_w">
				<em class="btn_txt"></em>
    			<button class="bt_submit" type="submit"><em><em>提交订单</em></em></button>
			</span>
        </div>
        <!--提交按钮end-->
    </form>
</div>
<!--正在加载star-->
<div class="mdloading" id="js_bookingMdloading">
    <div class="inner">
        <p><img src="http://source.qunar.com/tts/images/demo/ajax-loader.gif" alt=""/></p>

        <p class="loading_tip">正在获取数据，请稍等...</p>
    </div>
</div>
<!--正在加载end-->

<!--版权信息star-->

<div class="footer">
    <p>
            去哪儿网机票
        版权所有 &copy;2015 <a target="_blank" href="http://www.miibeian.gov.cn/">京ICP备05021087号</a></p>
</div>
<script type="text/javascript">
    var SERVER_TIME = new Date(1439909576649);
    var CLIENT_TIME = new Date();
    var needChangeName = false
    if (needChangeName) {
        var $fScope = {agentName: '环飞商旅网'}
    } else {
        var $fScope = {agentName: '去哪儿网度假'}
    }
    document.domain = "10.211.55.5"; //gino
</script>
<script type="text/javascript" src="/s/prd/jquery-1.7.2.js"></script>
<!--版权信息end-->

</body>
<script src="/s/prd/scripts/release/booking.js"></script>
<script>
    (function (G, pid) {
        var doc = G.document;
        G._ba_utm_init = function () {
            G['_ba_utm_l'] = 'f';
            G['_ba_utm_s'] = pid;
            G['_ba_utm_ex'] = {a: location.hostname};
        };
        var s = doc.createElement('script'),
                header = doc.getElementsByTagName('head')[0] || doc.documentElement;
        s.src = 'http://bc.qunar.com/js/ga.min.js';
        s.async = true;
        header.insertBefore(s, header.firstChild);
    })(this, 560);
</script>
</html>
