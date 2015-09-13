
//#region 弹出层
var dragging = false;
var iX, iY;
function popLayer(bg, title, html, url, w, h, close) {
    closeTip();
    var divbg = document.createElement('DIV');
    divbg.id = "divPopBg";
    switch (bg) {
        case "none":
            divbg.className = "popbg-none";
            divbg.style.zIndex = -10;
            break;
        case "show":
            divbg.className = 'popbg';
            break;
        case "hide":
            divbg.className = 'popbg-hide';
            break;
    }
    $(document.body).append(divbg);

    var div = document.createElement('DIV');
    div.id = 'divPop';
    div.className = 'pop';
    var htm = [];
    htm.push("<div id='divPopTitle' class='poptitle'><span id='lblPopTitle'></span><div id='divPopClose' onclick='closePop()'>×</div></div>");
    htm.push("<div><div id='divPopContent' class='popcontent'></div>");
    htm.push("<iframe src='' frameborder='0' id='ifrPop' name='ifrPop' class='iframe' width='100%' scrolling='auto'></iframe></div>");

    div.innerHTML = htm.join("");
    $(document.body).append(div);

    $('#lblPopTitle').html(title);
    if (html != null && html != "") {
        $('#divPopContent').html(html);
        if (w != null) {
            $('#divPopContent').width(w);
        }
        if (h != null) {
            $('#divPopContent').height(h);
        }
        $("#ifrPop").hide();
    }
    else if (url != null && url != null) {
        $('#divPopContent').hide();
        $("#ifrPop").attr("src", url);
        if (w != null) {
            $('#ifrPop').width(w);
        }
        if (h != null) {
            $('#ifrPop').height(h);
        }
        $("#ifrPop").hide();
        $("#ifrPop").ready(function () {
            $("#ifrPop").show();
        });
    }

    $("#divPopTitle").mousedown(function (e)//e鼠标事件  
    {
        $(this).css("cursor", "move"); //改变鼠标指针的形状  
        var offset = $(this).offset(); //DIV在页面的位置  
        var x = e.pageX - offset.left; //获得鼠标指针离DIV元素左边界的距离  
        var y = e.pageY - offset.top; //获得鼠标指针离DIV元素上边界的距离  
        $(document).bind("mousemove", function (ev)//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件  
        {
            $("#divPopTitle").stop(); //加上这个之后  
            var _x = ev.pageX - x; //获得X轴方向移动的值  
            var _y = ev.pageY - y; //获得Y轴方向移动的值  
            $("#divPop").css({ "left": _x + "px", "top": _y + "px" });
        });
    });

    $(document).mouseup(function () {
        $("#divPopTitle").css("cursor", "default");
        $(this).unbind("mousemove");
    })

    if (close != null && close == false) {
        $('#divPopClose').hide();
    }
    else {
        $('#divPopClose').show();
    }

    popPosition();
    $('#divPop').fadeIn('fast');
}

function popPosition() {
    var wh = $(window).height();
    var ww = $(window).width();
    var dh = $(document).height();
    var st = $(window).scrollTop();
    var ph = $('#divPop').height();
    var pw = $('#divPop').width();
    var l = parseInt((ww - pw) / 2);
    var t = parseInt((wh - ph) / 2) + st;
    if (t < 0) { t = 10; }
    $('#divPop').css("top", t + 'px');
    $('#divPop').css("left", l + 'px');
    $('#divPopBg').width(ww);
    $('#divPopBg').height(dh >= wh ? dh : wh);
}

var popFn = null;
function closePop() {
    if (popFn != null) {
        (popFn)(jQuery);
        popFn = null;
    }
    $('#divPop').remove();
    $('#divPopBg').remove();
}

function alertPop(html, fn) {
    var htm = [];
    htm.push("<span>" + html + "</span>")
    htm.push("<div style='margin-top:15px; text-align:right'><input type='button' id='btnAlert' class='btn btn-blue' value='确定' onclick='closePop()'/></div>")
    popLayer("show", "美程无忧提示", htm.join(''));
    if (fn != null) {
        popFn = fn;
    }
}

function confirmPop(html, fn, cn) {
    var htm = [];
    htm.push("<span>" + html + "</span>");
    htm.push("<div style='margin-top:15px; text-align:right'>");
    htm.push("<input type='button' id='btnConfirmYes' class='btn btn-blue' value='确定'/> ");
    htm.push("<input type='button' id='btnConfirmNo' class='btn btn-white' value='取消'/></div>");
    popLayer("show", "美程无忧提示", htm.join(''));
    $("#btnConfirmYes").click(function () {
        if (fn != null) {
            popFn = fn;
        }
        closePop();
    });

    $("#btnConfirmNo").click(function () {
        if (cn != null) {
            popFn = cn;
        }
        closePop();
    });
}

function tipPop(html, time) {
    var divbg = document.createElement('DIV');
    divbg.id = "divTipPopBg";
    divbg.className = 'popbg';
    divbg.style.zIndex = 1100;
    $(document.body).append(divbg);

    var div = document.createElement('DIV');
    div.id = 'divTipPop';
    div.className = 'pop';
    div.style.zIndex = 1110;
    var htm = [];
    htm.push("<div class='popcontent'>");
    htm.push("<table cellspacing='0' cellpadding='0' border='0'><tr>");
    htm.push("<td width='28' valign='middle'><img src='/Images/loading.gif'></td><td id='tdTipPopContent' valign='middle'></td>");
    htm.push("</tr></table>");
    htm.push("</div>");
    div.innerHTML = htm.join("");
    $(document.body).append(div);
    $('#tdTipPopContent').html(html);

    var wh = $(window).height();
    var ww = $(window).width();
    var dh = $(document).height();
    var st = $(window).scrollTop();
    var ph = $('#divTipPop').height();
    var pw = $('#divTipPop').width();
    var l = parseInt((ww - pw) / 2);
    var t = parseInt((wh - ph) / 2) + st - 50;
    if (t < 0) { t = 155; }
    $('#divTipPop').css("top", t + 'px');
    $('#divTipPop').css("left", l + 'px');
    $('#divTipPopBg').width(ww);
    $('#divTipPopBg').height(dh >= wh ? dh : wh);
    $('#divTipPop').show();

    if (time != null) {
        var ht = window.setTimeout(function () {
            closeTip();
            window.clearTimeout(ht);
        }, time);
    }
}

function closeTip() {
    if ($('#divTipPop').length > 0) {
        $('#divTipPop').remove();
        $('#divTipPopBg').remove();
    }
}
//#endregion 弹出层

//#region 浮动说明
function noteLayer(d, html, width, height) {
    closeNote();
    var div = document.createElement('DIV');
    div.id = 'divNote';
    div.className = 'note';
    var divcor = document.createElement('DIV');
    divcor.id = 'divNoteCorner';
    divcor.className = 'notecorner';
    var htm = [];
    htm.push("<div id='divNoteClose' class='noteclose' onclick='closeNote()'>×</div>");
    htm.push("<div id='divNoteContent' class='notecontent'></div>");
    div.innerHTML = htm.join("");
    $(document.body).append(div);
    $(document.body).append(divcor);
    $('#divNoteContent').html(html);

    var ww = $(window).width();
    var h = $(d).height();
    var w = $(d).width();
    var off = $(d).offset();
    var t = off.top;
    var l = off.left;
    $('#divNoteCorner').offset({ top: (t + h + 1), left: (l + 6) });
    if (width != null) {
        $('#divNote').width(width);
    }
    if (height != null) {
        $('#divNote').height(height);
    }
    var dw = $('#divNote').width();
    var lt = l - 50;
    if (lt + dw + 10 > ww) {
        lt = ww - dw - 20;
    }
    $('#divNote').offset({ top: (t + h + 7), left: lt });

    $(document).bind("click", function (e) {
        var obj = e.target;
        if (obj != d && !$.contains($("#divNote")[0], obj)) {
            closeNote();
        }
    })
}

function closeNote() {
    $('#divNote').remove();
    $('#divNoteCorner').remove();
    $(document).unbind("click");
}
//#endregion