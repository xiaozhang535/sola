//初始化RadioList点击事件
function loadRadioList() {
    $("div.radiolist").each(function () {
        var nm = $(this).attr("name");
        var item = $(this).find("i");
        item.click(function () {
            item.removeClass("si");
            $(this).addClass("si");
        });
    });
}

//获得RadioList被选中的值
function getRadioList(name) {
    var item = $("div.radiolist[name='" + name + "'] i.si");
    var val = item.attr("value");
    var txt = item.text();
    return val;
}

//获得RadioButton被选中的值
function getRadio(name) {
    var item = $("input[type='radio'][name='" + name + "']:checked");
    var val = "";
    if (item.length > 0) { 
        val = item.val();
    }
    return val;
}

//获得CheckBox被选中的值
function getCheckbox(name) {
    var item = $("input[type='checkbox'][name='" + name + "']:checked");
    var val = [];
    if (item.length > 0) {
        item.each(function () {
            val.push($(this).val());
        });
    }
    return val.join(',');
}

//设置Radio被选中
function setRadio(name, val) {
    var rd = $("input[name='" + name + "'][value='" + val + "']");
    if (rd.length > 0) {
        rd[0].checked = true;
    }
}
//设置Checkbox被选中
function setCheckbox(name, val) {
    var arrval = val.split(',')
    $("input[name='" + name + "']").each(function () {
        var ischeck = false;
        for (var i = 0; i < arrval.length; i++) {
            if ($(this).val() == arrval[i]) {
                ischeck = true
                break;
            }
        }
        $(this).attr("checked", ischeck);
    });
}
//设置Radio被选中并点击
function clickRadio(name, val) {
    $("input[name='" + name + "'][value='" + val + "']").eq(0).click();
}

//选择全部Checkbox
function chkAll(d, name) {
    var ischk = $(d).is(":checked");
    $("input[type='checkbox'][name='" + name + "']").each(function () {
        $(this)[0].checked = ischk;
    });
}

//设置默认Combox值
function setCombox(id, val) {
    var box = $("#" + id).parent();
    var li = box.find("ul li[val='" + val + "']");
    li.addClass("sli");
    li.click();
}

function cmbpos(box, list) {
    var off = box.offset();
    var h = box.height() + 2;
    var th = off.top + h;
    var lh = list.height();
    var dt = $(window).height() + $(document.body).scrollTop();
    list.show();
    list.css("position", "absolute");
    if ((th + lh > dt)) {//上翻
        if (lh > off.top) {
            list.height(lh - off.top - 5);
        }
        list.offset({ top: (off.top - lh - 5) });
    }
    else {
        list.offset({ top: (th) });
    }
}

function loadCombox() {
    $("div.combox").each(function () {
        var box = $(this);
        var corn = box.find("i");
        var ipt = box.find("input");
        var list = box.find("ul");
        ipt.attr("sel", "0");
        var off = box.offset();
        var h = box.height() + 2;
        var w = ipt.width();
        var th = off.top + h;
        box.width(w + 30);
        list.offset({ top: (th), left: (off.left + 1) });
        list.hide();

        list.hover(
            function () {
                ipt.attr("sel", "1");
            },
            function () {
                ipt.attr("sel", "0");
            }
        );
        ipt.blur(function () {
            if ($(this).attr("sel") == "0") {
                list.hide();
            }
        });
        ipt.keydown(function (e) {
            var key = e.which;
            if (key != 38 && key != 40 && key != 13 && key != 9) { return; }
            var sli = list.find("li.sli");
            var lis = list.find("li");
            var i = lis.index(sli);
            if (sli.length == 0) {
                lis.eq(0).addClass("sli");
            }
            var lh = list.height();
            if (key == 40) {
                if (lis.length - 1 > i) {
                    sli.removeClass("sli");
                    var offlis = lis.eq(i + 1).offset();
                    lis.eq(i + 1).addClass("sli");
                    if (offlis.top >= th + lh + 2) {
                        list.scrollTop(list.scrollTop() + 26);
                    }
                }
            }
            else if (key == 38) {
                if (i > 0) {
                    sli.removeClass("sli");
                    var offlis = lis.eq(i - 1).offset();
                    lis.eq(i - 1).addClass("sli");
                    if (offlis.top <= th + 2 && list.scrollTop() > 0) {
                        list.scrollTop(list.scrollTop() - 26);
                    }
                }
            }
            else if (key == 13 || key == 9) {
                e.which = 9;
                sli.click();
            }
        });
        ipt.click(function () {
            var ul = box.find("ul");
            if (ul.children().length > 0) {
                ul.children().each(function () {
                    $(this).show();
                });
                cmbpos(box, ul);
            }
        });

        if (corn.length > 0) {
            list.children().click(function () {
                ipt.val($(this).text());
                ipt.attr("val", $(this).attr("val"));
                ipt.attr("sel", "0");
                if (ipt.attr("change") != "undefined") {
                    eval(ipt.attr("change"));
                }
                var sli = list.find("li.sli");
                sli.removeClass("sli");
                $(this).addClass("sli");
                list.hide();
            });
            ipt.keyup(function (e) {
                var key = e.which;
                if (key == 13 || key == 38 || key == 40 || key == 9)
                    return;
                var txt = $(this).val();
                list.children().each(function () {
                    if ($(this).text().toLowerCase().indexOf(txt.toLowerCase()) == 0) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                });
                cmbpos(box, list);
            })
            corn.click(function () {
                ipt.focus();
                list.children().each(function () {
                    $(this).show();
                });
                cmbpos(box, list);
            });
        }
    });
}

var hrup = null;
function scanCombox(e, d, url) {
    var evt = window.event || ev;
    var key = evt.keyCode;
    if (key == 13 || key == 37 || key == 38 || key == 39 || key == 40 || key == 9)
        return;

    if (hrup != null) { window.clearTimeout(hrup); }
    hrup = window.setTimeout(function () {
        var ipt = $(d);
        var txt = ipt.val();
        var box = ipt.parent();
        var list = box.find('ul');
        list.html('');
        //var data = { ret: "OK", items: [{ name: "平台设置", val: "Platform" }, { name: "短信管理", val: "SMS" }, { name: "系统管理", val: "System"}] };
        $.getJSON(url + "&Text=" + txt + "&callback=?", function (data) {
            if (data.ret == "OK") {
                $.each(data.items, function (i, item) {
                    list.append("<li val='" + item.val + "'>" + item.name + "</li>");
                });
                list.children().click(function () {
                    ipt.val($(this).text());
                    ipt.attr("val", $(this).attr("val"));
                    ipt.attr("sel", "0");
                    if (ipt.attr("change") != "undefined") {
                        eval(ipt.attr("change"));
                    }
                    var sli = list.find("li.sli");
                    sli.removeClass("sli");
                    $(this).addClass("sli");
                    list.hide();
                });
            }
            else {
                list.append("<li>未找到相关信息," + item.ret + "</li>");
            }
            cmbpos(box, list);
            window.clearTimeout(hrup);
        });
    }, 800);
}
