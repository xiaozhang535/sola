<?php
include '../Public.php';
$domain=$g_configs['query']['domain'];
$html = <<<EOD
(function(e) {
var t = {
id: "f5afbb528717e6d9506a5e46ac674b7b",
filename: "jquery.dialog.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function n(e, t) {
this._cache = [];
this._cFn = e
}
if (!e.kit)
e.kit = {};
if (!e.module)
e.module = {};
if (!e.ui)
e.ui = {};
var t = function() {
var t = {}, n;
var r = function() {
if (!n) {
n = e('<div style="width: 950px;margin: 0 auto;height:0;position: relative;z-index: 999999;"></div>');
n.insertBefore(e(":first", document.body))
}
}
;
t.offset = function() {
r();
return n.offset()
}
;
t.size = function() {
r();
return [n.width(), e(window).height()]
}
;
t.getNode = function() {
r();
return n
}
;
t.getNodeOffset = function(e) {
var n = t.offset()
, r = e.offset();
return {
left: r.left - n.left,
top: r.top - n.top
}
}
;
return function() {
return t
}
}
();
e.module.layer = function(n) {
var r = t();
var i = e(n).appendTo(r.getNode()).hide()
, s = e("[node-type=inner]", i);
var o = {}, u = e(o), a;
o.show = function() {
i.show();
u.trigger("lay_show");
return o
}
;
o.hide = function() {
i.hide();
u.trigger("lay_hide");
return o
}
;
o.getOuter = function() {
return i
}
;
o.getInner = function() {
return s
}
;
o.getWrapSize = function() {
return r.size()
}
;
o.getWrapOffset = function(e) {
return r.getNodeOffset(e)
}
;
o.getSize = function(e) {
if (e || !a) {
a = [i.width(), i.height()]
}
return a
}
;
o.getDom = function(t) {
return e("[node-type=" + t + "]", i)
}
;
o.setPosition = function(e) {
i.css(e);
return o
}
;
return o
}
;
n.prototype = {
constructor: n,
_create: function() {
var e = this._cFn();
this._cache.push({
store: e,
used: true
});
return e
},
getOne: function() {
var e = this._cache;
for (var t = 0, n = e.length; t < n; t += 1) {
if (e[t].used === false) {
e[t].used = true;
return e[t].store
}
}
return this._create()
},
_setStat: function(t, n) {
e.each(this._cache, function(e, r) {
if (t === r.store) {
r.used = n;
return false
}
}
)
},
setUsed: function(e) {
this._setStat(e, true)
},
setUnused: function(e) {
this._setStat(e, false)
},
getLength: function() {
return this._cache.length
}
};
e.kit.Reuse = n;
e.module.dialog = function() {
return function(t, n) {
if (!t)
throw "dialog no template";
var r, i, s, o, u, a, f, l, c, h;
var p = function() {
s = e.extend({}, n);
r = e.module.layer(t);
o = r.getOuter();
u = r.getInner();
a = r.getDom("close").click(function() {
f()
}
)
}
;
p();
c = r.show;
h = r.hide;
f = function(e) {
if (typeof l === "function" && !e) {
if (l() === false) {
return false
}
}
h();
return i
}
;
i = r;
i.show = function() {
c();
return i
}
;
i.hide = f;
i.setMiddle = function() {
var t = i.getWrapSize()
, n = r.getSize(true)
, s = e(window).scrollTop();
var o = {
top: s + (t[1] - n[1]) / 2,
left: (t[0] - n[0]) / 2
};
if (o.top < s)
o.top = s;
if (o.left < 0)
o.left = 0;
return i.setPosition(o)
}
;
i.setClose = function(e) {
a[e ? "show" : "hide"]()
}
;
i.setContent = function(e) {
if (typeof e === "string") {
u.html(e)
} else {
u.append(e)
}
return i
}
;
i.clearContent = function() {
u.empty();
return i
}
;
i.setBeforeHideFn = function(e) {
l = e
}
;
i.clearBeforeHideFn = function() {
l = null
}
;
return i
}
}
();
e.ui.dialog = function() {
var t = '<div class="poplayer_box" node-type="outer" style="display:block;left:420px;top:10px;">' + '     <span class="close" node-type="close"></span>' + '     <div class="poplayer_inner" node-type="inner"></div>' + "</div>";
var n = null ;
var r = function(e) {
e.clearContent();
if (n)
n.setUnused(e)
}
;
var i = function() {
var n = e.module.dialog(t);
e(n).bind("lay_show", function() {
e.ui.mask.show()
}
).bind("lay_hide", function() {
e.ui.mask.hide()
}
);
return n
}
;
var s = [];
var o = function(t) {
var n = [];
e.each(s, function(e, r) {
if (r !== t)
n.push(r)
}
);
s = n
}
;
var u = function(t, n) {
var r = function() {
o(t);
if (!n.isHold) {
e(t).unbind("lay_hide", r);
e(t).unbind("lay_show", i)
}
}
;
var i = function() {
s.push(t)
}
;
e(t).bind("lay_hide", r).bind("lay_show", i)
}
;
var a = function() {
e(document).keydown(function(t) {
if (s.length === 0)
return;
var n = s[s.length - 1];
var r = t.keyCode
, i = t.target
, o = i.nodeName
, u = /^input|textarea$/i;
var a = e.contains(n.getOuter()[0], i);
if (r === 27) {
if (!n.isEsc)
return;
if (u.test(o) && a && i.type !== "button")
return;
n.hide()
} else if (r === 13 || r === 9) {
if (!a) {
t.preventDefault()
}
}
}
)
}
;
return function(t) {
t = e.extend({
isEsc: true,
isHold: false,
closeBtn: true,
width: 500
}, t || {});
var s = t.isHold;
if (!n) {
a();
n = new e.kit.Reuse(i)
}
var o = n.getOne();
o.getInner().css("width", t.width);
o.setClose(t.closeBtn);
if (!s) {
var f = function() {
e(o).unbind("lay_hide", f);
r(o)
}
;
e(o).bind("lay_hide", f)
}
o.isEsc = t.isEsc;
u(o, t);
return o
}
}
();
e.ui.mask = function() {
function s() {
if (i) {
t.css({
width: e(document).width(),
height: Math.max(e(document).height(), e(window).height()),
zIndex: 800
})
} else {
t.css({
position: "fixed",
zIndex: 800
})
}
}
function o() {
clearTimeout(r);
r = setTimeout(s, 500)
}
function u() {
if (i) {
e(window).bind("resize", o)
}
}
function a() {
e(window).unbind("resize", o)
}
function f() {
t = e('<div class="poplayer_bg"></div>').appendTo(document.body);
s();
return t
}
var t, n = 0, r, i = e.browser.msie && e.browser.version === "6.0";
var l = {
show: function() {
n++;
if (n > 1)
return;
if (!t)
f();
u();
t.show()
},
hide: function() {
if (!t || n <= 0)
return;
n--;
if (n === 0) {
a();
t.hide()
}
}
};
return l
}
()
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["f5afbb528717e6d9506a5e46ac674b7b"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "c7c678cc535070047b981876a5014e3e",
filename: "jquery.tab.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function n(t) {
var n = {};
e("[data-tab]", t).each(function() {
var i = e(this);
var s = i.data("tab");
if (!n[s]) {
r(t, s, i.data("tab-id"), i.data("tab-active"));
n[s] = true
}
}
)
}
function r(t, n, r, i) {
if (!n || !r)
return;
var s = i || "active";
var o = t.find("[data-tab='" + n + "'][data-tab-id='" + r + "']");
var u = t.find("[data-panel='" + n + "'][data-panel-id='" + r + "']");
if (o.hasClass(s) && u.is(":visible"))
return;
var a;
(a = t.find("[data-tab='" + n + "']")).removeClass(s);
o.addClass(s);
t.find("[data-panel='" + n + "']").hide().removeClass("js-transition-after js-transition-before");
u.addClass("js-transition-before");
u.show();
setTimeout(function() {
u.addClass("js-transition-after")
}
, 20);
var f = t.find("[data-tab='" + n + "'][data-tab-id='" + r + "']:radio");
if (f.length) {
f.attr("checked", "checked")
}
e.tabs[n] = r;
e(e.tabs).trigger(n + "-change", [r, o, u, a])
}
e.tabs = {};
var t = e(document.body);
e.tabs.changeTab = r;
e.tabs.init = function(i, s) {
var o = i || t;
var s = s || "click";
n(o);
o.delegate("[data-tab]", s, function(t) {
var n = e(this).data("tab");
var i = e(this).data("tab-id");
var s = e(this).data("tab-active");
r(o, n, i, s);
t.stopPropagation()
}
)
}
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["c7c678cc535070047b981876a5014e3e"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "2885a1bec5f42589f977fca010bfb3dc",
filename: "jquery.switchable.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function u(t, n) {
var r = this;
r.config = e.extend({}, e.fn.switchable.defaults, n || {});
r.$container = t;
r._init()
}
var t = document;
var n = ".";
var r = "beforeSwitch";
var i = "switch";
var s = "afterSwitch";
var o = "able-switchable-";
e.extend({
able: {
Switchable: u
}
});
SP = u.prototype;
u.Plugins = [];
e.extend(SP, {
_init: function() {
var t = this
, n = t.config;
t.activeIndex = n.activeIndex;
t.$evtBDObject = e("<div />");
t._parseStructure();
if (n.hasTriggers)
t._bindTriggers();
e.each(u.Plugins, function() {
this._init(t)
}
)
},
_parseStructure: function() {
var e = this
, t = e.$container
, r = e.config;
switch (r.type) {
case 0:
e.$triggers = t.find(n + r.navCls).children();
e.$panels = t.find(n + r.contentCls).children();
break;
case 1:
e.$triggers = t.find(n + r.triggerCls);
e.$panels = t.find(n + r.panelCls);
break
}
e.viewLength = e.$panels.length / r.step
},
_bindTriggers: function() {
var t = this
, n = t.config
, r = t.$triggers
, i = n.events;
r.each(function(r, s) {
if (e.inArray("click", i) !== -1) {
e(s).click(function(e) {
if (t.activeIndex === r)
return t;
if (t.switchTimer)
clearTimeout(t.switchTimer);
t.switchTimer = setTimeout(function() {
t.switchTo(r)
}
, n.delay * 1e3);
e.stopPropagation()
}
)
}
if (e.inArray("hover", i) !== -1) {
e(s).hover(function(e) {
if (t.activeIndex === r)
return t;
if (t.switchTimer)
clearTimeout(t.switchTimer);
t.switchTimer = setTimeout(function() {
t.switchTo(r)
}
, n.delay * 1e3)
}
, function(e) {
if (t.switchTimer)
clearTimeout(t.switchTimer);
e.stopPropagation()
}
)
}
}
)
},
beforeSwitch: function(t) {
if (e.isFunction(t))
this.$evtBDObject.bind(r, t)
},
afterSwitch: function(t) {
if (e.isFunction(t))
this.$evtBDObject.bind(s, t)
},
switchTo: function(t) {
var n = this
, i = n.config
, o = e.makeArray(n.$triggers)
, u = e.makeArray(n.$panels)
, a = n.activeIndex
, f = i.step
, l = a * f
, c = t * f;
n.$evtBDObject.trigger(r, [t]);
if (i.hasTriggers) {
n._switchTrigger(a > -1 ? o[a] : null , o[t])
}
n._switchView(u.slice(l, l + f), u.slice(c, c + f), t);
n.activeIndex = t;
n.$evtBDObject.trigger(s, [t])
},
prev: function() {
var e = this
, t = e.activeIndex;
e.switchTo(t > 0 ? t - 1 : e.viewLength - 1)
},
next: function() {
var e = this
, t = e.activeIndex;
e.switchTo(t < e.viewLength - 1 ? t + 1 : 0)
},
_switchTrigger: function(t, n) {
var r = this.config.activeTriggerCls;
if (t)
e(t).removeClass(r);
e(n).addClass(r)
},
_switchView: function(t, n, r) {
e.each(t, function() {
e(this).hide()
}
);
e.each(n, function() {
e(this).show()
}
)
}
});
e.fn.switchable = function(t) {
var n = this;
var r = n.data("switchables");
n.data("switchables", r ? r : []);
return n.each(function() {
n.data("switchables").push(new u(e(this),t))
}
)
}
;
e.fn.switchable.defaults = {
type: 0,
navCls: o + "nav",
contentCls: o + "content",
triggerCls: o + "trigger",
panelCls: o + "panel",
hasTriggers: true,
activeIndex: 0,
activeTriggerCls: "active",
events: ["click", "hover"],
step: 1,
delay: .1,
viewSize: []
}
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["2885a1bec5f42589f977fca010bfb3dc"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "6c3d4ae0ad0febfe6f9a76151554d071",
filename: "SearchTrack.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
n.exports = function(t) {
function o() {
this.onlyOne = false;
this.config = {
TJ: {
type: "特价机票"
},
DMT: {
type: "国内机票"
},
INT: {
type: "国际机票"
}
}
}
window.search_btn = e.____MODULES["92014247dd2916729a2675b952223cbb"];
var n, r, i;
var s = function(e) {
var t = "/s/track.php?action=Qhome|" + e + "|&t=" + Date.parse(new Date);
(new Image).src = t
}
;
t.extend(o.prototype, {
init: function(e, t, n) {
var r = this;
var i = this.config[e];
i.flt = t;
if (n) {
i.mult = n
}
this.DMT = this.config["DMT"].flt;
this.INT = this.config["INT"].flt;
this.MULT = this.config["INT"].mult;
this.TJ = this.config["TJ"].flt;
this.fltType = i;
this._bindEvents();
window.searTrack = this
},
triggerMult: function(e, n, r) {
if (e.mults) {
this._type = e._type;
t(this).trigger(n, r)
}
},
_updateTime: function(e) {
var n = this;
var r = e.activeEl.closest("form");
var i = r;
if (r.find("[name='searchType']:checked").val() == "MultiTripFlight") {
i = e.activeEl.closest(".muti_control")
} else if (r.find("[name='searchType']:checked").val() == "PriceTrend") {
i = e.activeEl.closest("#js_pricetrend_triplist")
}
var s = i.find("input[name*=fromCity]").val();
if (!s) {
s = ""
}
if (window.QNR) {
var o = s.indexOf("(");
if (o === -1) {
o = s.length
}
t.ajax({
url: "http://flight.qunar.com/twelli/flight/localDate.jsp",
data: {
depCity: decodeURI(s.substr(0, o))
},
dataType: "jsonp",
success: function(e) {
if (!window.QNR) {
window.QNR = {}
}
window.QNR.isLocal = e.isLocal;
var t = e.localDate.replace(/-/g, "/");
GSERVER_TIME = new Date(t);
if (e.isLocal) {
n.fltType.flt.$fromDate.data("q-datepicker-fly").args.minDate = GSERVER_TIME
}
}
})
}
},
triggerNoData: function() {
s("noDatalook")
},
_getCurType: function() {
var e = t(".ch_search_tab .cur");
var n = e.find("a").text();
if (n.indexOf("国际") === 0) {
n = "international"
}
if (n.indexOf("国内") === 0) {
n = "domestic"
}
if (n.indexOf("特价") === 0) {
n = "tejia"
}
return n
},
_bindEvents: function() {
this._bindFocusEvent();
this._bindHomeClickBtn();
this._bindhotCity();
this._bindSelectSuggest();
this._bindnoResult();
this._bindHaveResult()
},
_bindHaveResult: function() {
var e = this;
var o = function(t, i) {
var o = i[1];
var u = i[3];
e.noflag = false;
s(i.join("|") + "|" + r);
if (o !== n && !e.onlyOne) {
s("addItem_flag|" + u + "|" + r);
e.onlyOne = true
}
}
;
var u = function(t, n) {
i = n;
e.notfind = true
}
;
t.each(this.config, function(e, n) {
n.flt && t(n.flt.fromCitySuggest).bind("getResultData", o);
n.flt && t(n.flt.toCitySuggest).bind("getResultData", o)
}
);
t(this).bind("getResultData", o);
this.MULT && t(this.MULT.fromCitySuggest).bind("getResultData", o);
this.MULT && t(this.MULT.toCitySuggest).bind("getResultData", o);
t(this).bind("haveData", u)
},
_bindnoResult: function() {
var e = this;
var n = function(t, n) {
if (!e.noflag && !e.notfind) {
var o = "suggest-nofind-noData|" + encodeURIComponent(n) + "|" + e._type + "|" + r;
s(o);
e.noflag = true;
e.notfind = false
}
if (!e.noflag && e.notfind) {
var o = "suggest-nofind|" + encodeURIComponent(n) + "|" + i + "|" + e._type + "|" + r;
s(o);
e.noflag = true
}
}
;
t.each(this.config, function(e, r) {
r.flt && t(r.flt.fromCitySuggest).bind("suggest-nofind", n);
r.flt && t(r.flt.toCitySuggest).bind("suggest-nofind", n)
}
);
this.MULT && t(this.MULT.fromCitySuggest).bind("suggest-nofind", n);
this.MULT && t(this.MULT.toCitySuggest).bind("suggest-nofind", n);
t(this).bind("suggest-nofind", n)
},
_bindSelectSuggest: function() {
var e = this;
var n = function(t, n) {
if (!e.sflag) {
var i = "suggest-selected|" + n + "|" + e._type + "|" + r;
s(i);
e.sflag = true
}
}
;
t(this).bind("suggest-selected", n);
t.each(this.config, function(e, r) {
r.flt && t(r.flt.fromCitySuggest).bind("suggest-selected", n);
r.flt && t(r.flt.toCitySuggest).bind("suggest-selected", n)
}
);
this.MULT && t(this.MULT.fromCitySuggest).bind("suggest-selected", n);
this.MULT && t(this.MULT.toCitySuggest).bind("suggest-selected", n)
},
_bindFocusEvent: function() {
var e = this;
r = e._getCurType();
var o = function() {
e.sflag = false;
r = e._getCurType();
if (this.value !== n && this.value === "" && !e.deleteONE) {
s("deleteItem_flag|" + this.name + "|" + r);
e.deleteONE = true
}
if (this.value !== n && !e.onlyOne && !e.deleteONE) {
s("addItem_flag|" + this.name + "|" + r);
e.onlyOne = true
}
}
;
var u = function() {
e.onlyOne = false;
e.deleteONE = false;
e.noflag = false;
e.outflag = false;
e.notfind = false;
e._type = this.name;
n = this.value;
t(this).keyup(o)
}
;
var a = function() {
var t = this.name;
var n = this;
if (!e.outflag && e.noflag && !e.sflag) {
r = e._getCurType();
var o = "suggest-nofind|" + encodeURIComponent(this.value) + "|" + i + "|" + this.name + "|" + r;
e.outflag = true;
s(o)
}
}
;
t.each(this.config, function(e, n) {
n.flt && t(n.flt["$fromCity"]).focus(u);
n.flt && t(n.flt["$toCity"]).focus(u);
n.flt && t(n.flt["$fromCity"]).focusout(a);
n.flt && t(n.flt["$toCity"]).focusout(a)
}
);
this.MULT && t(this.MULT.$form.find('input[name="fromCityMulti"]')).focus(u);
this.MULT && t(this.MULT.$form.find('input[name="toCityMulti"]')).focus(u);
this.MULT && t(this.MULT.$form.find('input[name="fromCityMulti"]')).focusout(a);
this.MULT && t(this.MULT.$form.find('input[name="toCityMulti"]')).focusout(a)
},
_bindHomeClickBtn: function() {
var e = this;
t.each(this.config, function(n, r) {
t(r.flt).bind("select_btn", function() {
if (!e.onlyOne) {
search_btn();
e.onlyOne = true
}
}
)
}
)
},
_bindhotCity: function() {
var e = this;
t.each(this.config, function(e, n) {
t(n.flt).bind("no_exhitbit", function(e, t) {
s("no_exhitbit|" + t)
}
)
}
);
t(this.MULT).bind("no_exhitbit", function(e, t) {
s("no_exhitbit|" + t)
}
)
}
});
return new o
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["6c3d4ae0ad0febfe6f9a76151554d071"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "595c23b922f917e6bb08ab2f9dadea82",
filename: "FlightCalendar.conf.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
t.exports = {
HolidayData: {
"2015-01-01": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "元旦",
holidayClass: "yuandan"
},
"2015-02-18": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "除夕",
holidayClass: "chuxi"
},
"2015-02-19": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "春节",
holidayClass: "chunjie"
},
"2015-03-05": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "元宵",
holidayClass: "yuanxiao"
},
"2015-04-05": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "清明",
holidayClass: "qingming"
},
"2015-05-01": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "五一",
holidayClass: "laodong"
},
"2015-06-20": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "端午",
holidayClass: "duanwu"
},
"2015-09-27": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "中秋",
holidayClass: "zhongqiu"
},
"2015-10-01": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "国庆",
holidayClass: "guoqing"
},
"2015-12-25": {
afterTime: 3,
beforeTime: 3,
dayindex: 0,
holidayName: "圣诞",
holidayClass: "shengdan"
}
},
WorkHoliday: {
work: ["2015-02-15", "2015-02-28", "2015-09-06", "2015-10-10"],
vacation: ["2015-02-18", "2015-02-19", "2015-02-20", "2015-02-21", "2015-02-22", "2015-02-23", "2015-02-24", "2015-04-04", "2015-04-05", "2015-04-06", "2015-05-01", "2015-05-02", "2015-05-03", "2015-06-20", "2015-06-21", "2015-06-22", "2015-09-03", "2015-09-04", "2015-09-05", "2015-09-26", "2015-09-27", "2015-10-01", "2015-10-02", "2015-10-03", "2015-10-04", "2015-10-05", "2015-10-06", "2015-10-07"]
},
TransDateEx: {
week: "周",
day: "天",
before: "前",
after: "后"
},
fuzzyDate0: ["暑假", "抗战胜利日", "中秋&国庆", "双十一", "圣诞", "元旦", "春节", "寒假", "清明", "五一", "端午", "中秋", "国庆"],
fuzzyDate: {
"1月": {
valid: true
},
"2月": {
valid: true
},
"3月": {
valid: true
},
"4月": {
valid: true
},
"5月": {
valid: true
},
"6月": {
valid: true
},
"7月": {
valid: true
},
"8月": {
valid: true
},
"9月": {
valid: true
},
"10月": {
valid: true
},
"11月": {
valid: true
},
"12月": {
valid: true
},
"暑假": {
valid: true,
value: "暑假",
range: "92",
endRange: "71",
start: "2015-06-15",
end: "2015-09-15",
last: "2015-08-26",
fuzzy: true
},
"抗战胜利日": {
valid: true,
value: "抗战胜利日",
range: "9",
endRange: "8",
start: "2015-8-30",
end: "2015-9-08",
last: "2015-09-07",
fuzzy: true
},
"中秋&国庆": {
valid: true,
value: "中秋&国庆",
range: "22",
endRange: "19",
start: "2015-9-19",
end: "2015-10-11",
last: "2015-10-08",
fuzzy: true
},
"双十一": {
valid: true,
value: "双十一",
range: "8",
endRange: "5",
start: "2015-11-07",
end: "2015-11-15",
last: "2015-11-12",
fuzzy: true
},
"圣诞": {
valid: true,
value: "圣诞",
range: "11",
endRange: "7",
start: "2015-12-20",
end: "2015-12-31",
last: "2015-12-27",
fuzzy: true
},
"元旦": {
valid: true,
value: "元旦",
range: "11",
endRange: "9",
start: "2015-12-26",
end: "2016-01-06",
last: "2016-01-04",
fuzzy: true
},
"春节": {
valid: true,
value: "春节",
range: "20",
endRange: "13",
start: "2016-02-01",
end: "2016-02-21",
last: "2016-02-14",
fuzzy: true
},
"寒假": {
valid: true,
value: "寒假",
range: "36",
endRange: "29",
start: "2016-01-23",
end: "2016-02-28",
last: "2016-02-21",
fuzzy: true
},
"清明": {
valid: true,
value: "清明",
range: "9",
endRange: "4",
start: "2016-04-01",
end: "2016-04-10",
last: "2016-04-05",
fuzzy: true
},
"五一": {
valid: true,
value: "五一",
range: "11",
endRange: "7",
start: "2016-04-27",
end: "2016-05-08",
last: "2016-05-04",
fuzzy: true
},
"端午": {
valid: true,
value: "端午",
range: "14",
endRange: "11",
start: "2016-06-01",
end: "2016-06-15",
last: "2016-06-12",
fuzzy: true
},
"中秋": {
valid: true,
value: "中秋",
range: "11",
endRange: "8",
start: "2016-09-10",
end: "2016-09-21",
last: "2016-09-18",
fuzzy: true
},
"国庆": {
valid: true,
value: "国庆",
range: "15",
endRange: "14",
start: "2016-9-24",
end: "2016-10-09",
last: "2016-10-08",
fuzzy: true
}
}
}
}
(t.exports, t, e);
e.____MODULES["595c23b922f917e6bb08ab2f9dadea82"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "5380236ba333f0b1ef6eae875f0fdb12",
filename: "jquery.qdatepicker.flight_1.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
(function(t) {
function b(e, t) {
e = e == null  ? "" : e + "";
for (var n = 0, r = t - e.length; n < r; n++)
e = "0" + e;
return e
}
function E(e) {
if (t.inArray(e, p.work) > -1) {
return '<span class="ban">班</span>'
} else if (t.inArray(e, p.vacation) > -1) {
return "<span>休</span>"
} else {
return ""
}
}
function S(e) {
var t = window.SERVER_TIME || new Date;
var n = m[e];
if (n && !n.fuzzy) {
var r;
if (n.range) {
r = n.range
} else if (/^\d{1,2}月$/.test(e)) {
var i = parseInt(e.replace("月", "")) - 1
, s = t.getMonth()
, o = i < s ? t.getFullYear() + 1 : t.getFullYear()
, u = i == s ? t : new Date(o,i,1)
, a = new Date(o,i,(new Date(o,i + 1,0)).getDate())
, r = parseInt(Math.abs(new Date(g.formatDate(a).replace(/-/g, "/")) - new Date(g.formatDate(u).replace(/-/g, "/"))) / 1e3 / 60 / 60 / 24)
}
n.startDate = new Date(u.getTime());
n.endDate = new Date(u.getTime() + r * 24 * 3600 * 1e3)
}
if (n && n.fuzzy) {
n.startDate = T(n.start);
n.endDate = T(n.end);
n.lastDate = T(n.last)
}
return n
}
function x() {
return v
}
function T(e) {
var t = e.split("-");
return new Date(t[0],t[1] - 1,t[2])
}
function N(e) {
var t = {};
for (var n in e) {
var r = n;
var i = e[n];
t[n] = i;
var s = "";
var o = "";
if (i.beforeTime > 0) {
for (var u = 1; u <= i.beforeTime; u++) {
var a = {};
var f = new Date(T(r).getTime() - u * 24 * 3600 * 1e3);
var l = C(f);
a.holidayName = i.holidayName + d.before + u + d.day;
a.dayindex = i.dayindex;
if (!t[l]) {
t[l] = a
} else {
if (i.dayindex > t[l].dayindex && t[l].beforeTime == null ) {
t[l] = a
}
}
}
}
if (i.afterTime > 0) {
for (var u = 1; u <= i.afterTime; u++) {
var a = {};
var c = new Date(T(r).getTime() + u * 24 * 3600 * 1e3);
var h = C(c);
a.holidayName = i.holidayName + d.after + u + d.day;
a.dayindex = i.dayindex;
if (!t[h]) {
t[h] = a
} else {
if (i.dayindex > t[h].dayindex && t[C(new Date(f))].afterTime == null ) {
t[h] = a
}
}
}
}
}
return t
}
function C(e) {
if (typeof e == "number") {
e = new Date(e)
}
return e.getFullYear() + "-" + k(e.getMonth() + 1) + "-" + k(e.getDate())
}
function k(e) {
return e < 10 ? "0" + e : e
}
function L(e) {
e.setHours(0);
e.setMinutes(0);
e.setSeconds(0);
e.setMilliseconds(0);
return e
}
function A(e) {
var t = e.offset();
t["top"] += e.outerHeight();
return t
}
function O(e) {
var n;
if (e && !e.nodeType)
n = jQuery.event.fix(e || window.event).target;
else
n = e;
if (!n)
return null ;
var i = t(n).parents("." + r);
return i.size() > 0 ? i.eq(0).data(r) : null
}
function M() {}
function _(e, t) {
if (!this.init)
return new _(e,t);
else
return this.init(e, t)
}
window.searchTrack = e.____MODULES["6c3d4ae0ad0febfe6f9a76151554d071"];
var n = e.____MODULES["595c23b922f917e6bb08ab2f9dadea82"];
t.fdatepicker = {};
var r = t.fdatepicker.ROOT_KEY = "q-datepicker-fly";
var i;
var s;
var o;
var u = [];
var a = false;
var f = 0;
var l = 0;
var c = n;
var h = c.HolidayData;
var p = c.WorkHoliday;
var d = c.TransDateEx;
var v = c.fuzzyDate0;
var m = c.fuzzyDate;
var g = {
LANG: {
prev: "",
next: "",
day_names: ["日", "一", "二", "三", "四", "五", "六"],
OUT_OF_RANGE: "超出范围",
ERR_FORMAT: "格式错误"
},
CLASS: {
group: "g",
header_mc: "m-h",
header: "h",
cld_mc: "m-c",
cld_wp: "c-wp",
calendar: "c",
next: "e-n",
prev: "e-p",
title: "t",
week: "w",
month: "cm_",
prc_wp: "m-p",
tax_wp: "e-t",
day_default: "st",
day_selected: "st-a",
day_othermonth: "st-s",
day_today: "st-t",
day_hover: "st-h",
day_disabled: "st-d",
day_round: "st-a-r",
day_holiday: "st-holi-",
day_area_bg: "st-area"
},
WEEKDAYS: 7,
STARTDAY: 1,
showOtherMonths: false,
defaultDay: "",
disabledDays: "",
customClass: "",
customActiveClass: "",
multi: 2,
showTip: true,
linkTo: null ,
linkRules: "",
refObj: null ,
forceCorrect: true,
loadMonthStore: [],
dataStore: {},
leftBtn: null ,
rightBtn: null ,
curMonthMove: {},
cldWrap: null ,
hasTax: false,
formatTitle: function(e) {
return e.getFullYear() + "年" + (e.getMonth() + 1) + "月"
},
showOnInit: false,
showOnFocus: false,
container: null ,
minDate: null ,
maxDate: null ,
ui: null ,
sDay: null ,
endDay: null ,
pos: "",
parseDate: function(e) {
var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
return t ? new Date(t[1],t[2] * 1 - 1,t[3]) : null
},
formatDate: function(e) {
return e.getFullYear() + "-" + b(e.getMonth() + 1, 2) + "-" + b(e.getDate(), 2)
},
minuteDate: function(e) {
var t = window.SERVER_TIME || new Date;
t = new Date(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate());
return (e - t) / (24 * 60 * 60 * 1e3)
},
today: function() {
var e = window.SERVER_TIME || new Date;
e = new Date(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate());
return this.formatDate(e)
},
plus: function(e, t) {
return new Date(e.getTime() + t * 24 * 60 * 60 * 1e3)
}
};
var y = function() {
var e = this;
for (var n = 0, r = arguments.length; n < r; n++)
t.each(arguments[n], function(t, n) {
var r;
if (e.prototype[t] && jQuery.isFunction(e.prototype[t]))
r = e.prototype[t];
e.prototype[t] = n;
if (r)
e.prototype[t]["_PARENT_"] = r
}
);
if (!e.prototype["parent"])
e.prototype["parent"] = function() {
return arguments.callee.caller["_PARENT_"].apply(this, arguments)
}
}
;
var w = N(h);
M.implement = y;
t.extend(M.prototype, {
isUI: 1,
init: function() {
var e = this
, n = this.picker
, r = n.ns;
e.attachedEl = e.attachedEl || new t;
t(document).bind("mousedown." + r, function(t) {
var r, i;
if (n.activeEl[0] === t.target && (r = 1) || e.attachedEl.index(t.target) != -1 && (r = 2)) {
if (!n.visible()) {
i = S(n.activeEl.val());
e.drawDate = i ? i.startDate : e.drawDate;
setTimeout(function() {
n.show(e.getDate())
}
, 0)
} else {
n.hide()
}
if (r == 2)
n.activeEl.focus();
return
}
var s;
if ((s = O(t)) && s.key === n.key)
return;
else
n.hide()
}
);
var i = function() {
if (!n.get("container"))
n.getContainer().css(A(n.activeEl))
}
;
i();
t(window).bind("load." + r + " resize." + r, i);
n.activeEl.bind("focus." + r, function(t) {
if (n.get("showOnFocus"))
n.show(e.getDate())
}
);
n.activeEl.bind("keydown." + r, function(t) {
switch (t.keyCode) {
case 40:
e.setDate(new Date(e.getDate().getTime() + 24 * 60 * 60 * 1e3));
var r = e.validate();
if (!r.success) {
return
}
n.show(e.getDate());
break;
case 38:
e.setDate(new Date(e.getDate().getTime() - 24 * 60 * 60 * 1e3));
var r = e.validate();
if (!r.success) {
return
}
n.show(e.getDate());
break;
case 9:
case 27:
n.hide();
break;
default:
e.onKeyDown(t)
}
}
)
},
_init: function(e) {
this.picker = e
},
select: function(e) {
this.picker.activeEl.val(this.picker.args.formatDate(e))
},
posHandler: function(e, t) {
var n = this.picker.activeEl.attr("data-pos"), r = e, i, s = t.parseDate(this.picker.activeEl.val()), o = s ? s.getMonth() : (window.SERVER_TIME || new e).getMonth();
i = new Date(r);
i.setDate(1);
return i
},
change: function(e, n, r) {
var i = this;
var s = i.picker.args
, o = s.leftBtn
, u = s.rightBtn
, a = s.cldWrap;
var f = i.picker.get("minDate")
, c = i.picker.get("maxDate");
var h = r == "+1M" ? false : true;
var p = new Date(new Date(n.getFullYear(),n.getMonth(),1));
var d = s.parseDate(s.formatDate(p));
var v = s.parseDate(s.formatDate(p));
v.setMonth(v.getMonth() + 1);
s.curMonthMove = h ? d : v;
if (t.inArray(s.curMonthMove.getMonth(), s.loadMonthStore) == -1) {
i.drawNewMonth(h, s.curMonthMove);
i.picker._trigger("q-datepicker-change-prc", [e, p, r]);
h ? a.css({
left: "-=" + l + "px"
}) : "";
s.loadMonthStore.push(s.curMonthMove.getMonth())
} else if (s.loadMonthStore.length == 12) {
var m = a.find(".c");
var g = h ? m.last().data("month") : m.first().data("month");
if (s.curMonthMove.getMonth() == g) {
h ? m.last().remove() : m.first().remove();
i.drawNewMonth(h, s.curMonthMove);
i.picker._trigger("q-datepicker-change-prc", [e, p, r]);
h ? a.css({
left: "-=" + l + "px"
}) : a.css({
left: "+=" + l + "px"
})
}
}
if (h) {
!f || f.getFullYear() < e.getFullYear() || f.getFullYear() === e.getFullYear() && f.getMonth() < e.getMonth() - 1 ? o.removeClass("e-dis") : o.addClass("e-dis");
u.removeClass("e-dis")
} else {
var y, b;
if (c) {
b = c.getMonth() - 1;
if (b < 0) {
b = 11;
y = c.getFullYear() - 1
} else {
y = c.getFullYear()
}
}
!c || y > e.getFullYear() || y === e.getFullYear() && b > e.getMonth() + 1 ? u.removeClass("e-dis") : u.addClass("e-dis");
o.removeClass("e-dis")
}
},
renderDateWraper: function(e) {
var n = this;
n.drawDate = e;
L(e);
var r = n.picker.getContainer()
, i = n.picker.args
, s = i["CLASS"]
, o = i["LANG"]
, u = i.hasTax
, a = i.minDate
, f = i.maxDate;
var l = [];
i.dataStore = {};
i.loadMonthStore.length = 0;
l.push('<div class="' + s["group"] + '" style="display:none;">');
l.push('<div class="' + s["header_mc"] + '">');
l.push('<p class="' + s["next"] + "", !f || f.getFullYear() > e.getFullYear() || f.getFullYear() === e.getFullYear() && f.getMonth() > e.getMonth() + 1 ? "" : " e-dis", '"><span href="#" class="icon_arr_right" onclick="FQDP.change( event , \'+1M\' );return false;">', o["next"], "</span></p>");
l.push('<p class="' + s["prev"] + "", !a || a.getFullYear() < e.getFullYear() || a.getFullYear() === e.getFullYear() && a.getMonth() < e.getMonth() ? "" : " e-dis", '"><span href="#" class="icon_arr_left" onclick="FQDP.change( event , \'-1M\' );return false;">', o["prev"], "</span></p>");
l.push("</div>");
l.push('<div class="' + s["cld_mc"] + '">');
l.push('<div class="' + s["cld_wp"] + '">');
l.push("</div>");
l.push("</div>");
l.push('<div class="' + s["prc_wp"] + '">');
l.push('<div class="e_r">');
if (n.picker.isSupportPrc) {
l.push('    <div class="' + s["tax_wp"] + ' js_prc_change" style="display:none;">');
l.push('        <span class="' + (u ? "" : "cur") + '" data-set="">未含税</span><span class="' + (u ? "cur" : "") + '" data-set="tax">含税总价</span>');
l.push("    </div>")
}
if (window.QNR.isLocal) {
l.push("    当前为出发地时间")
}
l.push("</div>");
n.picker.isFuzzy && l.push(n._drawFuzzyDate());
l.push("</div>");
l.push("</div>");
t(l.join("")).appendTo(r.empty()).show();
i.leftBtn = r.find("." + s["prev"]);
i.rightBtn = r.find("." + s["next"]);
i.cldWrap = r.find("." + s["cld_wp"]);
n.picker.isFuzzy && window.QNR.isLocal && n.bindFuzzyEvent(r)
},
bindFuzzyEvent: function(e) {
var n = e.find(".js_fuzzy_wp .m-fuzzy-box").width();
e.find(".js_fuzzy_wp").addClass("e_fuzzy_w").bind("mouseenter", function(e) {
var n = t(this).parent().width() + 15;
t(this).find(".m-fuzzy-box").animate({
width: n + "px"
}, 200)
}
).bind("mouseleave", function() {
t(this).find(".m-fuzzy-box").animate({
width: n + "px"
}, 200)
}
)
},
renderPanelHTML: function(e, t) {
var n = this;
var r = n.picker.args
, i = r.multi
, s = r["CLASS"];
var o = [], u;
u = n.posHandler(e, r);
for (var a = 0; a < t; a++) {
o.push('<div class="' + s["calendar"] + '" data-month="' + u.getMonth() + '">');
o.push(n._drawTitle(u));
o.push(n._drawBody(u));
o.push("</div>");
u.setMonth(u.getMonth() + 1)
}
return o.join("")
},
drawPanel: function(e) {
var n = this;
var r = n.picker.args
, i = n.picker.args.cldWrap;
var s = n.renderPanelHTML(e, r.multi);
i.empty().append(t(s));
n.picker.selectUi()
},
drawNewMonth: function(e, n) {
var r = this;
var i = r.picker.args.cldWrap;
var s = r.renderPanelHTML(n, 1);
e ? t(s).prependTo(i) : t(s).appendTo(i)
},
draw: function(e) {
var n = this;
var r = n.picker.args;
var i = S(n.picker.activeEl.val());
r.activeDate = r.parseDate(n.picker.activeEl.val()) || i && i.startDate;
n.renderDateWraper(e);
n.drawPanel(e);
l = t(n.picker.args.cldWrap.find(".c")[0]).width();
r.loadMonthStore.push(e.getMonth(), e.getMonth() + 1)
},
dispose: function() {
var e = "." + this.picker.ns;
t(document).unbind(e);
t(window).unbind(e)
},
getDate: function() {
var e = this.picker.activeEl.val();
var t = S(e);
var n = t && t.valid ? t.startDate : this.picker.get("parseDate")(e);
return n != n ? null  : n
},
setDate: function(e) {
this.picker.activeEl.val(this.picker.get("formatDate")(e))
},
onBeforeDraw: function(e) {
var t = this;
var n = function(e, t) {
if (e.getFullYear() > t.getFullYear())
return 1;
else if (e.getFullYear() === t.getFullYear())
return (e.getMonth() - t.getMonth()) / (Math.abs(e.getMonth() - t.getMonth()) || 1);
else
return -1
}
;
if (this.selectedDate && this.drawDate)
e.setTime(this.drawDate.getTime());
else {
var r = this.picker
, i = r.get("minDate")
, s = r.get("maxDate")
, o = r.get("multi");
var u = new Date(e.getFullYear(),e.getMonth() + o - 1,1);
if (s && n(u, s) > 0)
for (var a = 1; s && o && o > 1 && o - a > 0; a++) {
u = new Date(e.getFullYear(),e.getMonth() + o - a - 1,1);
if (n(u, s) <= 0) {
u.setMonth(u.getMonth() - o + 1);
break
}
}
else
u = null ;
if (u && (!i || u.getTime() >= i.getTime()))
e.setTime(u.getTime())
}
},
onKeyDown: function(e) {},
onSet: function() {
this.selectedDate = null
},
_drawTitle: function(e) {
var t = this.picker.args;
var n = t["CLASS"];
var r = [];
r.push('<div class="' + n["header"] + '">');
r.push('<div class="' + n["title"] + '">', t.formatTitle(e), "</div>");
r.push("</div>");
return r.join("")
},
_drawBody: function(e) {
var n = this.picker.args
, r = n["STARTDAY"]
, i = n["WEEKDAYS"]
, s = n["LANG"]
, o = n["CLASS"]
, u = n.activeDate
, a = n.minDate
, f = n.maxDate;
if (u && u != u)
u = null ;
var l = window.SERVER_TIME || new Date;
var c = [];
c.push('<div class="thwrap"><table cellspacing="0" cellpadding="0" border="0"><thead><tr>');
for (var p = 0; p < i; p++) {
var d = (r + p) % i;
c.push('<th class="' + o["week"] + d + '">', s["day_names"][d] || "", "</th>")
}
c.push("</tr></thead></table></div>");
c.push('<div class="tdwrap"><table cellspacing="0" cellpadding="0" border="0"><tbody>');
var v = [];
var m = e.getFullYear()
, g = e.getMonth() + 1;
var y = new Date(m,g - 1,1);
var b = 1
, w = (new Date(m,g,0)).getDate();
var S = y.getDay() - r;
while (S < 0)
S += i;
var x = b - S;
var T = i - ((1 - x + w) % i || i) + w;
for (var p = x, N = 0; p <= T; p++,
N++) {
var C = new Date(m,g - 1,p);
var k = n.formatDate(C);
if (N % i == 0)
v.push("</tr>", "<tr>");
var d = (r + N) % i;
v.push('<td class="' + o["week"] + d + " " + o["day_default"]);
var L = false;
if (t.grep(["getFullYear", "getMonth", "getDate"], function(e) {
return C[e]() == l[e]()
}
).length == 3)
v.push(" " + o["day_today"]);
if (u != null  && u.getTime() == C.getTime())
v.push(" " + o["day_selected"]);
var A = false;
if (p < 1 || p > w) {
v.push(" " + o["day_othermonth"]);
A = true
}
var O = n.formatDate(C).replace(/-/g, "") * 1;
var M = a && n.formatDate(a).replace(/-/g, "") * 1;
var _ = f && n.formatDate(f).replace(/-/g, "") * 1;
if (a && O < M || f && O > _ || ~n.disabledDays.toString().indexOf(k)) {
if (!A) {
v.push(" " + o["day_disabled"])
}
L = true
}
var D = this._getDateClass(C);
if (D && !A)
v.push(" " + D);
v.push('"');
if (!L) {
v.push(' onclick="FQDP.select(event,new Date(' + C.getFullYear() + "," + C.getMonth() + "," + C.getDate() + "));", 'return false;"')
}
if (!L && !A) {
v.push(" data-sort=" + n.minuteDate(C) + ">")
} else {
v.push('data-info = "disable">')
}
if (!A || n.showOtherMonths) {
v.push('<div class="t-d">');
v.push('   <div class="d-t">');
v.push(E(k));
v.push("    </div>");
v.push('<span class="');
var P = h[k];
dateText = C.getDate();
if (!L && P && P.holidayClass) {
v.push(" " + o["day_holiday"] + "default");
v.push(" " + o["day_holiday"] + P.holidayClass);
dateText = P.holidayName
}
v.push('">');
var H = window.SERVER_TIME || new Date;
if (C.getMonth() === H.getMonth() && C.getFullYear() === H.getFullYear() && dateText === H.getDate() && n.minuteDate(C) === 0) {
dateText = "今天"
}
v.push(dateText);
v.push("</span>");
v.push("</div>")
} else {
v.push("&nbsp;")
}
v.push("</td>")
}
c.push(v.length > 0 ? v.slice(1, -1).join("") : "");
if (S + T <= 35) {
c.push("<tr>");
for (var p = 0; p < i; p++) {
c.push('<td class="w3 st st-s" data-info="disable">&nbsp;</td>')
}
c.push("</tr>")
}
c.push("</tbody></table></div>");
return c.join("")
},
_drawFuzzyDate: function() {
var e = [], n = this, r, i, s;
var o = 0;
e.push('<div class="e_fuzzy ' + (window.QNR.isLocal ? "e_fuzzy_w " : "") + 'js_fuzzy_wp">');
e.push('<i class="icon_arr_f"></i>');
e.push('<div class="m-fuzzy-box">');
e.push(' <ul class="m-fuzzy-lst clrfix">');
i = n.picker.activeEl.val();
r = S(i) ? i : "";
s = x();
var u = this.picker.args;
var a = window.SERVER_TIME || new Date
, f = a.getMonth()
, l = a.getFullYear();
for (var c = 0; c < 5; c++) {
month = f + c;
if (month > 12) {
month -= 12;
year = l + 1
} else {
year = l
}
start = c == 0 ? a : new Date(year,month,1);
end = new Date(year,month,(new Date(year,month + 1,0)).getDate());
label = start.getMonth() + 1 + "月";
val = u.formatDate(start).replace(/-/g, "/");
iDays = parseInt(Math.abs(new Date(u.formatDate(end).replace(/-/g, "/")) - new Date(u.formatDate(start).replace(/-/g, "/"))) / 1e3 / 60 / 60 / 24);
e.push('<li data-value="', label, '" data-range="', iDays, '"');
e.push('onclick="FQDP.fuzzyselect(event,new Date(' + (new Date(val)).getFullYear() + "," + (new Date(val)).getMonth() + "," + (new Date(val)).getDate() + "));", 'return false;"');
e.push(">", label, "</li>");
o++
}
t.each(s, function(t, n) {
var i = S(n);
_class = r == n ? "st-h" : "";
if (n == "抗战胜利日" || n == "中秋&国庆") {
_class += " st-w"
}
if (i.lastDate > SERVER_TIME && o < 9) {
e.push('<li data-value="', i.value, '" class="', _class, '" data-range="', i.range, '"');
e.push('onclick="FQDP.fuzzyselect(event,new Date(' + i.startDate.getFullYear() + "," + i.startDate.getMonth() + "," + i.startDate.getDate() + "));", 'return false;"');
e.push(">", n, "</li>");
o++
}
}
);
e.push(" </ul>");
e.push("</div>");
e.push("</div>");
return e.join("")
},
_getDateClass: function(e) {
var n = this.picker.args;
var r = n.formatDate(e);
var i = "";
var s = this.picker.activeEl.val();
var o = S(s);
var u = o ? n.formatDate(o.startDate) : s;
var a = parseInt(r.replace(/-/g, ""), 10);
var f = parseInt(u.replace(/-/g, ""), 10);
var l, c, p, d, v, m, g;
var y = this.picker.activeEl.attr("name") == "fromDateMulti";
if (this.picker.get("linkTo") && !y) {
m = this.picker.get("linkTo").data(t.fdatepicker.ROOT_KEY);
l = m.activeEl.val();
c = S(l);
p = c ? n.formatDate(c.endDate) : l;
v = parseInt(u.replace(/-/g, ""));
ecurrVal = parseInt(p.replace(/-/g, ""));
n.sDay = u;
n.endDay = p;
if (typeof s != "undefined" && a == v) {
i = this.addRoundClass("FROM")
}
if (m) {
if (typeof m.activeEl.val() != "undefined" && a == ecurrVal) {
i = this.addRoundClass("BACK")
}
}
if (a < ecurrVal && a > v) {
i = this.addRoundClass("AREAR")
}
} else if (this.picker.get("refObj")) {
g = this.picker.get("refObj").data(t.fdatepicker.ROOT_KEY);
l = g.activeEl.val();
c = S(l);
p = c ? n.formatDate(c.startDate) : l;
u = o ? n.formatDate(o.endDate) : s;
v = parseInt(p.replace(/-/g, ""));
ecurrVal = parseInt(u.replace(/-/g, ""));
n.sDay = p;
n.endDay = u;
if (typeof this.picker.activeEl.val() != "undefined" && a == ecurrVal) {
i = this.addRoundClass("BACK")
}
if (g) {
if (typeof g.activeEl.val() != "undefined" && a == v) {
i = this.addRoundClass("FROM")
}
}
if (a > v && a < ecurrVal) {
i = this.addRoundClass("AREAR")
}
} else if (o && a >= f) {
ecurrVal = parseInt(n.formatDate(o.endDate).replace(/-/g, ""));
v = parseInt(n.formatDate(o.startDate).replace(/-/g, ""));
n.sDay = n.formatDate(o.startDate);
n.endDay = n.formatDate(o.endDate);
if (a < ecurrVal) {
i = this.addRoundClass("AREAR")
}
if (a == ecurrVal) {
i = this.addRoundClass("BACK")
}
if (a == v) {
i = this.addRoundClass("FROM")
}
}
if (h[r])
i += " " + "holi";
return t.trim(i)
}
});
window.FQDP = {};
t.each(["select", "change", "_trigger", "fuzzyselect"], function(e, t) {
window.FQDP[t] = function() {
a = false;
if (!arguments[0])
return;
var e = O(arguments[0]);
if (e && e[t]) {
if (t === "select" || t === "fuzzyselect") {
return e[t].apply(e, Array.prototype.slice.call(arguments))
} else {
return e[t].apply(e, Array.prototype.slice.call(arguments, 1))
}
}
}
}
);
t.extend(_.prototype, {
init: function(e, n) {
n = n || {};
if (n["ui"]) {
if (n["ui"]["isUI"])
this.ui = n["ui"];
else if (typeof n["ui"] == "string" && t.fdatepicker.uis[n["ui"]])
this.ui = new t.fdatepicker.uis[n["ui"]]
}
if (!this.ui)
this.ui = new M;
this.ui._init(this);
n = this.args = t.extend(true, {}, g, n || {});
this.key = ++f;
var i = this.ns = r + this.key;
var s = this.activeEl = t(e);
this.el = t('<div class="' + r + '"></div>').appendTo(s.parent() || document.body).hide();
t(this.el).data(r, this);
this.ui.init();
this.lastShowedDate = null ;
this.showedDate = null ;
if (n["showOnInit"])
this.show();
t.each(n["on"] || {}, function(e, t) {
s.bind(e + "." + i, t)
}
);
return this
},
_trigger: function() {
this.activeEl.triggerHandler.apply(this.activeEl, arguments)
},
select: function() {
if (arguments.length > 1) {
var e = arguments[0] || window.event;
date = arguments[1]
} else {
var e = e || window.event;
date = arguments[0]
}
if (e) {
var n = e.srcElement ? e.srcElement : e.target;
if (t(n).parents("." + this.args.CLASS["calendar"]).data("index") === 1) {
this.activeEl.attr("data-pos", "right")
}
if (t(n).parents("." + this.args.CLASS["calendar"]).data("index") === 0) {
this.activeEl.attr("data-pos", "left")
}
}
this.ui.select(date);
this.hide();
this._trigger("q-datepicker-select", [date])
},
setFuzzy: function(e) {
this.isFuzzy = e
},
fuzzyselect: function() {
var e = function(e) {
t(u).each(function(t, n) {
n.fuzzyInput(e);
n.autoCheck.call(n)
}
)
}
;
t(u).each(function(t, n) {
n.picker.activeEl.bind("blur." + n.picker.ns, e)
}
);
var n = arguments[0].srcElement || arguments[0].target, r, i;
this.activeEl.attr("data-pos", "left");
i = t(n).data("value");
a = true;
this.activeEl.val(i);
o = n;
this.ui.fuzzyselect(arguments[1]);
this.hide();
if (this.get("linkTo")) {
r = this.get("linkTo").data(t.fdatepicker.ROOT_KEY);
r.activeEl.val(i) && r.ui.fuzzyselect(arguments[1])
} else if (this.get("refObj")) {
r = this.get("refObj").data(t.fdatepicker.ROOT_KEY);
if (r.activeEl.val().indexOf("周") != -1 && i.indexOf("周") != -1) {
return
}
r.activeEl.val(i);
r.ui.fuzzyselect(arguments[1])
}
this.activeEl.val(i)
},
_selectTd: function(e, n, r) {
for (var i = parseInt(e), s = n; i < s; i++) {
t("td[data-sort='" + i + "']:not('.st-d')").addClass(g.CLASS["day_area_bg"])
}
},
selectUi: function() {
var e = this, n, r, i, s, a, f, l;
l = e.activeEl.val();
var c = e.args.minuteDate(new Date(l.replace(/-/g, "/")));
var h = e.activeEl[0]["id"];
var p = S(l);
var d = this.el;
s = this.args;
if (s.sDay)
r = s.minuteDate(new Date(s.sDay.replace(/-/g, "/")));
if (s.endDay)
i = s.minuteDate(new Date(s.endDay.replace(/-/g, "/")));
var v = d.find("td[data-sort='" + r + "']")
, m = d.find("td[data-sort='" + i + "']");
d.undelegate(".fly").delegate('td:not(".st-d")', {
"mouseenter.fly": function(o) {
if (t(this).data("info") === "disable") {
return
}
if (S(e.activeEl.val())) {
t(this).addClass(s.CLASS["day_hover"]);
return
}
t(this).addClass(s.CLASS["day_hover"]);
a = t(this).parents(".ch_sch_form");
if (!S(e.activeEl.val()) && a.find("[data-type = 'oneWay']").length < 1) {
n = parseInt(t(this).attr("data-sort"));
if (r === i && c === r && e.activeEl.attr("name") === "fromDate" && n > i) {
return
}
if (r === i && c === r && e.activeEl.attr("name") === "toDate") {
m.addClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
}
if (n > r - 1 && n < i + 1) {
d.find("td").removeClass(s.CLASS["day_area_bg"]);
if (c === i) {
m.removeClass(s.CLASS["day_selected"]).removeClass("st-a-r");
e._selectTd(r + 1, n)
} else {
v.removeClass(s.CLASS["day_selected"]);
e._selectTd(n + 1, i)
}
}
if (n < r) {
if (c === i) {} else {
d.find("td").removeClass(s.CLASS["day_area_bg"]);
v.removeClass(s.CLASS["day_selected"]);
e._selectTd(n + 1, i)
}
}
if (n > i) {
d.find("td").removeClass(s.CLASS["day_area_bg"]);
if (c === i) {
e._selectTd(r + 1, n)
} else {
d.find("td.st-a").removeClass("st-a")
}
}
}
},
"mouseleave.fly": function() {
if (t(this).data("info") === "disable") {
return
}
if (S(e.activeEl.val())) {
t(this).removeClass(s.CLASS["day_hover"]);
return
}
t(this).removeClass(s.CLASS["day_hover"]);
if (!p && a && a.find("[data-type = 'oneWay']").length < 1) {
d.find("td").removeClass(s.CLASS["day_area_bg"]);
v.addClass(s.CLASS["day_selected"]);
m.addClass(s.CLASS["day_round"]);
e._selectTd(r + 1, i)
}
}
});
d.find('li:not(".st-h")').unbind().bind("mouseover", function() {
t(u).each(function(e, t) {
t.picker.activeEl.unbind("blur")
}
);
t(this).addClass(s.CLASS["day_hover"]);
var n, r;
var o = 1
, f = t(this).attr("data-range");
var l = d.find(".st-a");
if (l.length === 0) {
l = d.find(".st-a-r")
}
d.find(".st-a").removeClass("st-a");
d.find(".st-area").removeClass("st-area");
d.find(".st-a-r").removeClass("st-a-r");
var h = t(this).attr("onclick").match(/\d+/g);
var p = new Date(h[0],h[1],h[2]);
o = g.minuteDate(p);
a = t(this).parents(".ch_sch_form");
if (a.find("[data-type = 'oneWay']").length < 1) {
d.find("td").removeClass(s.CLASS["day_area_bg"]);
v.removeClass(s.CLASS["day_selected"]);
m.removeClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
} else {
c && d.find("td[data-sort='" + c + "']").removeClass(s.CLASS["day_selected"]);
i && m.removeClass(s.CLASS["day_selected"] + " " + g.CLASS["day_round"])
}
if (o !== 1) {
e._selectTd(parseInt(o) + 1, parseInt(o) + parseInt(f));
d.find("td[data-sort='" + (parseInt(o) + parseInt(f)) + "']").addClass(s.CLASS["day_round"])
} else {
if (l.find("span").text() === "今天") {
o = 1;
e._selectTd(2, f)
} else {
e._selectTd(2, f)
}
d.find("td[data-sort='" + f + "']").addClass(s.CLASS["day_round"])
}
d.find("td[data-sort='" + o + "']").addClass(s.CLASS["day_round"])
}
).bind("mouseout", function(n) {
var u = t(".st-h");
var f = d.find(".st-a");
var l = d.find(".st-area");
var h = t(".st-t").find("span").text();
var p;
if (u.length > 1) {
f.removeClass("st-a");
l.removeClass("st-area");
d.find(".st-a-r").removeClass("st-a-r");
if (o) {
var y = t(o).attr("onclick").match(/\d+/g)
} else {
var y = u.eq(1).attr("onclick").match(/\d+/g)
}
var b = new Date(y[0],y[1],y[2]);
var w = t(this).attr("data-range");
var E = g.minuteDate(b);
p = d.find("td[data-sort='" + E + "']");
p.addClass(s.CLASS["day_round"]);
e._selectTd(parseInt(E) + 1, parseInt(E) + parseInt(w));
d.find("td[data-sort='" + (parseInt(E) + parseInt(w)) + "']").addClass(s.CLASS["day_round"])
} else {
if (h === "今天") {
var E = 0
} else {
var E = 1
}
p = d.find("td[data-sort='" + E + "']")
}
f.removeClass("st-a");
l.removeClass("st-area");
d.find(".st-a-r").removeClass("st-a-r");
var w = t(this).attr("data-range");
a = t(this).parents(".ch_sch_form");
t(this).removeClass(s.CLASS["day_hover"]);
d.find("td").removeClass(s.CLASS["day_area_bg"]);
p.addClass(s.CLASS["day_round"]);
if (a.find("[data-type = 'oneWay']").length < 1) {
v.addClass(s.CLASS["day_selected"]);
m.addClass(s.CLASS["day_round"]);
e._selectTd(r + 1, i)
} else {
c && d.find("td[data-sort='" + c + "']").addClass(s.CLASS["day_selected"]);
!c && e._selectTd(r + 1, i);
i && m.addClass(s.CLASS["day_round"]);
c && d.find(".st-a-r").removeClass("st-a-r")
}
r != E && p.removeClass(s.CLASS["day_round"]);
i != w && d.find("td[data-sort='" + w + "']").removeClass(s.CLASS["day_round"]);
!c && p.addClass(s.CLASS["day_round"])
}
)
},
set: function(e, n, r) {
if (!this.ui.onSet || this.ui.onSet(e, n, r) === false)
return;
if (typeof e === "string") {
var i = false;
switch (e) {
case "container":
this.el.appendTo(t(n).find(".qcbox-fixed") || document.body);
this.el.css({
top: "",
left: ""
});
break
}
for (var s = 0, o = e.split("."), u = o.length, a = this.args; s < u && (s !== u - 1 && (a[o[s]] || (a[o[s]] = {})) || (a[o[s]] = n)); a = a[o[s]],
s++) {}
}
if (r && this.visible()) {
this._show(this.showedDate)
}
},
get: function(e) {
for (var t = 0, n = this.args, r = e.split("."), i = r.length; t < i && (n = n[r[t]]); t++) {}
return n
},
change: function(e) {
var t = this;
var n = t.args.cldWrap;
if (e == "-1M" && t.args.leftBtn.hasClass("e-dis")) {
return
} else if (e == "+1M" && t.args.rightBtn.hasClass("e-dis")) {
return
}
if (t._scrolling) {
return
}
var r = typeof e === "string" ? i(e, this.showedDate) : e;
var s = this.showedDate;
this.lastShowedDate = this.showedDate;
this.showedDate = r;
this.ui.change(s, r, e);
this._trigger("q-datepicker-change", [s, r, e]);
t._scrolling = true;
var o = e == "-1M" ? "+=" : "-=";
n.animate({
left: o + l + "px"
}, "50", function() {
t._scrolling = false
}
)
},
show: function(e) {
var t = this;
var n, r = t.get("minDate"), i = t.get("maxDate");
searchTrack._updateTime(t);
setTimeout(function() {
if (!e)
Ctime = window.SERVER_TIME || new Date;
else
Ctime = e;
n = new Date(Ctime.getFullYear() + "/" + (Ctime.getMonth() + 1) + "/" + Ctime.getDate());
if (r && n.getTime() < r.getTime())
n.setTime(r.getTime());
else if (i && n.getTime() > i.getTime())
n.setTime(i.getTime());
t.ui.onBeforeDraw(n);
t._show.call(t, n);
t._trigger("q-datepicker-show", [e])
}
, 100)
},
_show: function(e) {
this.lastShowedDate = this.showedDate;
this.showedDate = e;
this.activeEl && t(this.activeEl).trigger("beforeRender");
if (this.ui.draw(e) !== false)
;this.ui.picker.activeEl.closest(".qcbox").addClass("qcbox_on");
this.el.show()
},
hide: function() {
if (this.visible()) {
this.ui.picker.activeEl.closest(".qcbox").removeClass("qcbox_on");
this.el.hide();
this._trigger("q-datepicker-hide")
}
},
dispose: function() {
this.ui.dispose();
this.el.remove();
this.activeEl.unbind("." + this.ns);
this._trigger("q-datepicker-dispose")
},
visible: function() {
return this.el.is(":visible")
},
getContainer: function() {
return this.el
}
});
var D = {
"+M": function(e, t) {
var n = e.getDate();
e.setMonth(e.getMonth() + t);
if (e.getDate() !== n)
e.setDate(0)
},
"-M": function(e, t) {
var n = e.getDate();
e.setMonth(e.getMonth() - t);
if (e.getDate() !== n) {
e.setDate(0)
}
},
"+D": function(e, t) {
e.setDate(e.getDate() + t)
},
"-D": function(e, t) {
e.setDate(e.getDate() - t)
},
"+Y": function(e, t) {
e.setFullYear(e.getFullYear() + t)
},
"-Y": function(e, t) {
e.setFullYear(e.getFullYear() - t)
}
};
t.extend(t.fdatepicker, {
uis: [],
createUI: function(e, n) {
var r = n && t.fdatepicker.uis[n] ? t.fdatepicker.uis[n] : M;
var i = function() {}
;
t.extend(i, r);
t.extend(i.prototype = {}, r.prototype);
if (e) {
t.fdatepicker.uis[e] = i;
i.prototype.name = e
}
return i
},
calcTime: function(e, t) {
e = (e || "").toString();
var n;
if (t)
n = new Date(t.getTime());
else {
n = new Date;
var r = e.match(/^\d+/);
if (r)
n.setTime(r[0] * 1)
}
var i = /([+-])(\d+)([MDY])/g, s;
while (s = i.exec(e)) {
var o = s[1] + s[3];
if (D[o])
D[o](n, s[2] * 1)
}
return n
}
});
t.fdatepicker.createUI("qunar").implement({
init: function() {
this.parent.apply(this, arguments);
var e = this
, t = this.picker;
if (t.activeEl.attr("name") !== "fromDate" && t.activeEl.attr("name").indexOf("Multi") === -1) {
s = e;
u.push(e)
}
var n = t.get("customActiveClass");
var r = this.triggerEl = t.activeEl.wrap('<div class="qunar-dp' + (n ? " " + n : "") + '"></div>').before('<div class="dp-prefix"></div><div class="dp-info"><b/><span class="dp-text"></span></div>').parent();
var i = this.picker.args.prefix || t.activeEl.data("prefix");
if (i) {
r.find(".dp-prefix").text(i);
t.activeEl.css({
left: r.find(".dp-prefix").outerWidth(true) + "px"
})
} else {
r.find(".dp-prefix").remove()
}
t.set("container", r[0]);
this.attachedEl = this.attachedEl.add(r.find(".dp-info > b , .dp-info")).add(r.find(".dp-info > b , .dp-info > .dp-text "));
t.activeEl.attr("maxlength", 10);
t.activeEl.addClass("textbox");
t.activeEl.bind("keyup." + t.ns, function(t) {
e.updateTip(e.validate.call(e))
}
).bind("blur." + t.ns, function(t) {
e.fuzzyInput(t);
e.autoCheck.call(e)
}
);
if (t.get("defaultDay") != null )
this.setDate(this.getDefaultDate());
this.updateTip(this.validate());
this.selectedDate = null ;
this.checkLinked();
this.forIframe(t)
},
forIframe: function(e) {
t(window).bind("blur." + e.ns, function() {
e.hide()
}
)
},
getDefaultDate: function() {
var e = this.picker;
var t = i(e.get("defaultDay"));
var n = e.get("minDate")
, r = e.get("maxDate");
if (n && n.getTime() > t.getTime() || r && r.getTime() < t.getTime())
t = n || r;
return t
},
checkLinked: function(e) {
var n = this.picker, r;
if (!n.get("linkTo") || !(r = n.get("linkTo").data(t.fdatepicker.ROOT_KEY)) || r.ui.name.indexOf("qunar") !== 0)
return;
var s = (n.get("linkRules") || "").split(",");
var o = this.getDate();
if (o == null )
return;
if (e) {
if (e.restPos && e.pos || e.restPos && !r.activeEl.attr("data-pos")) {
r.activeEl.attr("data-pos", e.restPos)
}
}
var u = {};
t.each(["ds", "mind", "maxd"], function(e, t) {
if (s[e])
u[t] = i(s[e], o)
}
);
var a = r.get("strictMinDate")
, f = r.get("strictMaxDate");
if (u["mind"] || a) {
var l = (u["mind"] ? u["mind"].getTime() : -1) > (a ? a.getTime() : -1) ? u["mind"] : a;
r.set("minDate", l, false)
}
if (u["maxd"] || f) {
var l = (u["maxd"] ? u["maxd"].getTime() : Number.MAX_VALUE) > (f ? f.getTime() : Number.MAX_VALUE) ? f : u["maxd"];
r.set("maxDate", l, false)
}
r.set(null , null , true);
var c = r.ui.validate();
var h = S(n.activeEl.val())
, p = S(r.activeEl.val());
if (c && !c["success"] && n.get("forceCorrect") || !h && p) {
r.select(u["ds"]);
r.ui.drawDate = null ;
c = r.ui.validate()
}
!p && c && r.ui.updateTip(c);
var d = "Y";
return d
},
checkRefObj: function(e) {
var n = this.picker, r;
if (!n.get("refObj") || !(r = n.get("refObj").data(t.fdatepicker.ROOT_KEY)) || r.ui.name.indexOf("qunar") !== 0)
return;
if (!S(r.activeEl.val())) {
return
}
var s = (n.get("linkRules") || "").split(",");
var o = this.getDate();
if (o == null )
return;
if (e) {
if (e.restPos && e.pos || e.restPos && !r.activeEl.attr("data-pos")) {
r.activeEl.attr("data-pos", e.restPos)
}
}
var u = {};
t.each(["ds", "mind", "maxd"], function(e, t) {
if (s[e])
u[t] = i(s[e], o)
}
);
var a = r.get("strictMinDate")
, f = r.get("strictMaxDate");
if (u["mind"] || a) {
var l = (u["mind"] ? u["mind"].getTime() : -1) > (a ? a.getTime() : -1) ? u["mind"] : a;
r.set("minDate", l, false)
}
if (u["maxd"] || f) {
var l = (u["maxd"] ? u["maxd"].getTime() : Number.MAX_VALUE) > (f ? f.getTime() : Number.MAX_VALUE) ? f : u["maxd"];
r.set("maxDate", l, false)
}
r.set(null , null , true);
r.activeEl.val(this.picker.args.today());
var c = r.ui.validate();
if (c && !c["success"] && n.get("forceCorrect")) {
r.select(u["ds"]);
r.ui.drawDate = null ;
c = r.ui.validate()
}
c && r.ui.updateTip(c);
var h = "Y";
return h
},
select: function(e, t) {
var n = this.picker;
this.parent.apply(this, arguments);
this.selectedDate = e;
this.drawDate = e;
if (!t)
this.autoCheck()
},
fuzzyInput: function(e) {
var n, r = e.target.value, i, s = S(r);
if (s && s.valid) {
this.fuzzyselect();
n = this.picker.get("linkTo") || this.picker.get("refObj");
i = n && (!S(n.val()) || n.val().indexOf("周") == -1 || r.indexOf("周") == -1);
i && n.data(t.fdatepicker.ROOT_KEY).ui.setFuzzyDate(r)
}
},
fuzzyselect: function(e, t) {
this.selectedDate = e;
this.showText("");
if (!t)
this.autoCheck()
},
setFuzzyDate: function(e) {
var t = S(e)
, n = this.picker.activeEl.val();
if (t) {
this.picker.activeEl.val(e);
this.fuzzyselect(t.startDate)
} else if (!S(n) && this.picker.args.parseDate(n).getTime() >= this.picker.args.parseDate(e).getTime()) {
return
} else {
n = this.picker.args.plus(this.picker.args.parseDate(e), 3);
this.picker.activeEl.val(this.picker.args.formatDate(n));
this.autoCheck()
}
},
showText: function(e) {
var t = this.triggerEl.find(".dp-text");
t.removeClass("errtext").html(e)
},
showErrText: function(e) {
var t = this.triggerEl.find(".dp-text");
t.addClass("errtext").html(e)
},
autoCheck: function() {
var e = this.picker, t, n;
var r = e.activeEl.attr("data-pos");
n = e.activeEl.val();
t = S(n);
if (t && t.valid) {
this.checkLinked({
pos: e.args.pos,
restPos: r
});
e.args.pos = "";
return
}
var i = this.validate();
if (!i["success"] && e.get("forceCorrect")) {
this.setDate(this.getDefaultDate());
this.updateTip(this.validate())
} else {
if (i["formatted"])
e.activeEl.val(i["formatted"]);
this.updateTip(i)
}
this.checkLinked({
pos: e.args.pos,
restPos: r
});
this.checkRefObj({
pos: e.args.pos,
restPos: r
});
e.args.pos = ""
},
updateTip: function(e) {
if (!this.picker.get("showTip"))
return;
if (!e.success)
this.showErrText(e.errmsg);
else
this.showText(e.daytip)
},
validate: function() {
var e = this.picker;
var t = this.picker.activeEl.val();
var n = this.getDate();
var r = this;
if (n && this.selectedDate && this.selectedDate.getTime() != n.getTime())
this.selectedDate = null ;
var i = "";
if (n == null ) {
i = e.get("LANG.ERR_FORMAT");
e._trigger("q-datepicker-error", ["FORMAT", t])
} else {
var s = e.get("minDate")
, o = e.get("maxDate");
if (s && s.getTime() > n.getTime() || o && o.getTime() < n.getTime()) {
i = e.get("LANG.OUT_OF_RANGE");
e.args.pos = "change";
e._trigger("q-datepicker-error", ["RANGE", t])
}
}
var u = {
success: !i,
errmsg: i,
formatted: null ,
daytip: null
};
if (u["success"]) {
var f = e.get("formatDate")(n), l;
switch (e.args.minuteDate(n)) {
case 0:
if (!a)
l = "今天";
break;
case 1:
l = "明天";
break;
case 2:
l = "后天";
break;
default:
l = "周" + e.get("LANG.day_names")[n.getDay()];
break
}
u["daytip"] = w[f] ? w[f]["holidayName"] : l;
u["formatted"] = f
}
return u
},
addRoundClass: function(e) {
if (e == "FROM")
return this.picker.get("CLASS")["day_selected"];
else if (e == "BACK") {
return this.picker.get("CLASS")["day_round"]
} else if (e == "AREAR") {
return this.picker.get("CLASS")["day_area_bg"]
}
}
});
t.fn.fdatepicker = function() {
if (this[0]) {
if (arguments.length > 1 && this.data(r)) {
var e = this.data(r);
if (arguments[0] === "option" || arguments[0] === "setting")
return arguments.length > 2 ? e.set(arguments[1], arguments[2]) : e.get(arguments[1])
} else if (arguments.length <= 1) {
if (this.data(r)) {
this.data(r).dispose();
this.removeData(r)
}
var t = new _(this[0],arguments[0]);
this.data(r, t)
}
}
return this
}
;
i = t.fdatepicker.calcTime
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["5380236ba333f0b1ef6eae875f0fdb12"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "8448b46e861e22652e25c8ccfc4fc8d9",
filename: "jquery.qcbox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function i(e) {
if (typeof e == "string") {
if (r.test(e)) {
return parseInt(e, 10)
}
}
return e
}
function s(e, t) {
if (e.compareDocumentPosition)
return e === t || !!(e.compareDocumentPosition(t) & 16);
if (e.contains && t.nodeType === 1) {
return e.contains(t) && e !== t
}
while (t = t.parentNode)
if (t === e)
return true;
return false
}
if (!e.bui) {
e.bui = {}
}
var t = {};
var n = {};
var r = /^\d+$/;
jQuery.expr[":"].focus = function(e) {
return e === document.activeElement && (e.type || e.href)
}
;
e.RegisterUI = function(n, r) {
if (t[n])
return;
r = r || {};
t[n] = function(t) {
var n = this;
this.el = t;
this.$el = e(t);
this._options = {};
this._plugins = {};
e.each(r.propertychange || {}, function(e, t) {
n.on(e + "_changed", t)
}
);
e.each(r.properties || {}, function(e, t) {
n._options[e] = t
}
)
}
;
t[n].prototype = e.extend({
options: function(t) {
var n = this;
e.each(t, function(e, t) {
n.set(e, t)
}
)
},
dom: function() {
return this.el
},
plugins: function(e, t) {
if (t) {
this._plugins[e] = t
} else {
return this._plugins[e]
}
},
data: function(e, t) {
if (arguments.length == 1) {
return this.get(e) || this.$el.data(n + "-" + e)
} else {
this.$el.data(n + "-" + e, t);
this.set(e, t)
}
},
set: function(t, n, r) {
n = i(n);
var s = {
name: t,
new_value: n,
old_value: this.get(t)
};
if (r != true) {
e(this).trigger(t + "_before_change", [s])
}
this._options[t] = s.new_value;
if (r != true) {
e(this).trigger(t + "_changed", [n])
}
},
get: function(e) {
return this._options[e]
},
on: function(t, n) {
e(this).bind(t, n)
},
un: function(t) {
e(this).unbind(t)
},
fire: function() {
var t = e(this);
t.trigger.apply(t, Array.prototype.slice.apply(arguments))
}
}, r);
e.fn[n] = function(r) {
r = r || {};
if (e.isPlainObject(r)) {
return e.each(this, function() {
var i = e(this).data(n);
if (!i) {
var s = new t[n](this);
e(this).data(n, s);
s.options(r);
s.initialize()
} else {
e(this).data(n).options(r)
}
}
)
} else if (typeof r == "string") {
var i = arguments[0];
var s = Array.prototype.slice.call(arguments, 1);
var o = e(this).data(n);
if (e.isFunction(o[i])) {
return o[i].apply(o, s)
}
}
return this
}
}
;
e.RegisterPlugin = function(e, r, i, s) {
if (!t[e]) {
alert("not found UI[" + e + "]");
return
}
var o = n[e] = n[e] || {};
var u = o[r] = o[r] || {};
u[i] = s
}
;
e.usePlugin = function(t, r) {
e.each(n[r], function(n, r) {
e.each(r, function(e, r) {
if (t.data(n) === e) {
var i = function() {
this.ui = t;
this.initialize()
}
;
i.prototype = r;
t.plugins(n, new i)
}
}
)
}
)
}
;
var o = e.fn.val;
jQuery.fn.val = function(t) {
var n = this[0];
if (n && n.qcbox) {
if (t != null ) {
if (e.trim(t) == "") {
n.qcbox.showPlaceHolder()
} else {
n.qcbox.hidePlaceHolder()
}
}
}
return o.apply(this, Array.prototype.slice.apply(arguments))
}
;
e.RegisterUI("qcbox", {
initialize: function() {
var t = this;
var n = this.$el;
n[0].qcbox = this;
var r = null ;
var i = this.data("customclass");
var s = this.$wrap = n.wrap('<div class="qunar-qcbox' + (i ? " " + i : "") + '"></div>').before('<div class="qcbox-placeholder"></div>').before('<div class="qcbox-prefix"></div><div class="qcbox-info"><b /></div>').after('<div class="qcbox-fixed"></div>').parent();
var o = this.$fixed = s.find(".qcbox-fixed");
var u = this.$handler = s.find(".qcbox-info b");
n.addClass("textbox");
if (this.data("hideicon")) {
u.hide()
}
s.click(function(e) {
t.fire("qcbox-focus")
}
);
e(document.body).bind("mouseup", function(n) {
if (e(n.target).closest(".qunar-qcbox").length == 0) {
t.fire("qcbox-blur")
}
}
);
s.mouseup(function(e) {
n.focus()
}
);
n.bind("blur", function() {
t.resetPlaceHolder()
}
);
n.bind("focus", function() {
t.hidePlaceHolder();
this.select()
}
);
n.bind("showHotCity", function() {
t.plugins("hotcity").showHotcity()
}
);
n.keyup(function(e) {
switch (e.keyCode) {
case 9:
s.find(".qcbox-placeholder").hide();
break;
default:
break
}
}
);
this._resetWidth();
e.usePlugin(t, "qcbox");
this._resetHotcity();
this._resetPlaceHolder()
},
_resetHotcity: function() {
function o() {
var i = r.$el;
var s = r.$fixed;
if (!t.initialized) {
s.empty();
t.$hotcity = s.append("<div class='hotcity'><div>").find(".hotcity");
t.initializeStruct();
t.initialized = true
}
e(t).trigger("hotcity-preshow", [t]);
t.$hotcity.show();
n = 1;
e(t).trigger("hotcity-show")
}
function u() {
if (typeof t == "undefined" || !t.$hotcity)
return;
t.$hotcity.hide();
n = 0;
e(t).trigger("hotcity-hide")
}
var t = this.plugins("hotcity");
if (!t)
return;
var n = 0;
var r = this;
var i = this.$el;
var s = this.$wrap;
t.attachedEl = t.attachedEl || new e;
this.$el.keydown(function(e) {
u()
}
);
t.attachedEl = t.attachedEl.add(s.find(".qcbox-info > b , .qcbox-info")).add(s.find(".qcbox-info > b , .qcbox-info > .qcbox-text ").add(s.find(".qcbox-placeholder"))).add(s.find(".qcbox-prefix"));
e(document).bind("mouseup", function(n) {
var r;
if (i[0] === n.target && (r = 1) || ~t.attachedEl.index(n.target) && (r = 2)) {
if (!t.$hotcity || !t.$hotcity.is(":visible")) {
o()
} else {
u()
}
if (r == 2)
i.focus();
return
}
if (!e(n.target).data("hotcity-nogo") && e(n.target).parents("[data-hotcity-nogo]").length == 0)
u()
}
);
t.showHotcity = o;
t.hideHotcity = u
},
_resetPlaceHolder: function() {
function r() {
var n = t.$el.val();
if (e.trim(n) == "") {
i()
} else {
s()
}
}
function i() {
n.text(t.data("placeholder"));
n.show()
}
function s() {
n.hide()
}
var t = this;
var n = this.$wrap.find(".qcbox-placeholder");
r();
this.showPlaceHolder = i;
this.hidePlaceHolder = s;
this.resetPlaceHolder = r
},
_resetWidth: function() {
var e = this.$el;
var t = this.$wrap;
var n = this.data("prefix");
if (n) {
t.find(".qcbox-prefix").text(n);
e.css({
left: t.find(".qcbox-prefix").outerWidth(true) + "px"
})
} else {
t.find(".qcbox-prefix").remove()
}
t.find(".qcbox-placeholder").css({
width: e.width(),
left: e.css("left"),
"padding-left": e.css("padding-left"),
height: e.height(),
"line-height": e.height() + "px"
})
}
});
e.RegisterUI("qcboxfuzzy", {
initialize: function() {
var t = this;
var n = t.$el;
n[0].qcboxfuzzy = this;
n.parent().find(".qunar-qcbox").remove();
var r = ['<div class="qunar-qcbox">', '<div class="qn-prefix">我想去</div>', '<div class="qn-qcbox"></div>', '<div class="qn-plc"><div class="plc">可输入城市或国家</div>', "</div>"];
var i = ['<div class="qcbox-fixed js_fuzzylist"></div>', '<div class="qcbox-fixed"><div class="q-err"></div></div>'];
var s = t.$wrap = n.before(r.join("")).after(i.join("")).parent();
t.$fixed = s.find(".js_fuzzylist");
t.$qtab = s.find(".qn-qcbox");
t.$topic = s.find("#topic");
t.$suggest = s.find(".js-suggestcontainer");
t.$topic.val("");
s.on("mouseup.fuzzyEvt", function(e) {
if (t.isFuzzyDis()) {
e.stopPropagation();
t.setFuzzyErr();
t.hidePlaceHolder()
}
}
);
n.on("blur.fuzzyEvt", function() {
t.resetPlaceHolder();
s.removeClass("qcbox-fuzzy-on")
}
).on("focus.fuzzyEvt", function() {
t.hidePlaceHolder();
s.addClass("qcbox-fuzzy-on")
}
);
n.bind("showHotfuzzy", function() {
t.plugins("hotfuzzy").showHotfuzzy()
}
);
n.bind("fuzzychange", function() {
if (t.isFuzzyDis()) {
t.hidePlaceHolder()
}
}
);
t.$qtab.delegate(".qtab", "mouseover", function() {
e(this).addClass("qtab-hover")
}
).delegate(".qtab", "mouseout", function() {
e(this).removeClass("qtab-hover")
}
).delegate(".f-delete", "mouseup", function() {
var n = t.$topic.val();
var r = n.replace(/\([^)]*\)/g, "").split(",");
var i = n.split(",");
i.splice(e.inArray(e(this).parent(".qtab").data("txt"), r), 1);
t.$topic.val(i.join(","));
e(this).parent(".qtab").remove();
t.clearFuzzyErr();
var s = [];
e.map(t.$qtab.find(".qtab"), function(t) {
var n = e(t).data("type");
if (e.inArray(n, s) < 0) {
s.push(n)
}
}
);
t.setElWidth()
}
);
n.keydown(function(e) {
switch (e.keyCode) {
case 9:
s.find(".qcbox-placeholder").hide();
break;
case 8:
if (n.val() == "" && t.$topic.val() != "") {
var r = t.$topic.val().split(",");
r.splice(r.length - 1, 1);
t.$topic.val(r.join(","));
t.$qtab.find(".qtab:last-child").remove();
t.clearFuzzyErr();
t.setElWidth()
}
;
default:
t.isFuzzyDis() && e.preventDefault();
break
}
}
);
e(document.body).bind("mouseup", function(r) {
if (e(r.target).closest(".qcbox-fuzzy").length == 0) {
n.val();
t.showPlaceHolder();
t.isFuzzyDis() && t.clearFuzzyErr()
}
}
);
e.usePlugin(t, "qcboxfuzzy");
this._resetHotfuzzy();
this._resetPlaceHolder()
},
setFuzzyErr: function(e) {
var t = this;
var n = !e ? "最多支持输入5项" : e;
t.$wrap.addClass("qcbox-fuzzy-err");
t.$wrap.find(".q-err").html(n)
},
clearFuzzyErr: function() {
var e = this;
e.$wrap.removeClass("qcbox-fuzzy-err")
},
renderTopicHtml: function(e) {
var t = this;
var n = e.topic.length > 3 ? e.topic.substring(0, 3) + ".." : e.topic
, r = e.type || ""
, i = e.code || "";
if (n.replace(/\ +/g, "") == "")
return;
var s = e.topic.length > 3 ? "title=" + e.topic : "";
this.$qtab.append('<div class="qtab" data-type="' + r + '" data-code="' + i + '" data-txt="' + e.topic + '"' + s + '><span class="f-delete"></span>' + n + "</div>");
t.setElWidth()
},
_resetHotfuzzy: function() {
function a() {
var i = r.$el;
var s = r.$fixed;
if (r.$suggest.find(".q-suggest") && r.$suggest.find(".q-suggest").is(":visible")) {
return
}
if (!t.initialized) {
s.empty();
t.$hotfuzzy = s.append("<div class='hotfuzzy'><div>").find(".hotfuzzy");
t.initializeStruct();
t.initialized = true
}
e(t).trigger("hotfuzzy-preshow", [t]);
t.$hotfuzzy.show();
n = 1;
e(t).trigger("hotfuzzy-show")
}
function f() {
if (typeof t == "undefined" || !t.$hotfuzzy)
return;
t.$hotfuzzy.hide();
n = 0;
e(t).trigger("hotfuzzy-hide")
}
var t = this.plugins("hotfuzzy");
if (!t)
return;
var n = 0;
var r = this;
var i = this.$el;
var s = this.$wrap;
var o = new e;
o = o.add(s.find(".qn-qcbox"));
var u = new e;
u = u.add(s.find(".qn-prefix")).add(s.find(".plc")).add(i);
s.keydown(function(e) {
f()
}
);
e(document).bind("mouseup", function(n) {
var r;
if (o.index(n.target) == -1 && (s[0] === n.target || u.index(n.target) != -1)) {
if (!t.$hotfuzzy || !t.$hotfuzzy.is(":visible")) {
a();
i.focus()
} else {
f()
}
return
}
if (e(n.target).parents("[data-hotfuzzy-nogo]").length == 0)
f()
}
);
t.showHotfuzzy = a;
t.hideHotfuzzy = f;
return t
},
_resetPlaceHolder: function() {
function r() {
var n = t.$el.val();
if (e.trim(n) == "") {
i()
} else {
s()
}
}
function i() {
if (t.isFuzzyDis()) {
return
}
n.text(t.data("placeholder"));
n.show()
}
function s() {
n.hide()
}
var t = this;
var n = t.$wrap.find(".plc");
r();
this.showPlaceHolder = i;
this.hidePlaceHolder = s;
this.resetPlaceHolder = r
},
isFuzzyDis: function() {
return this.$topic.size() && this.$topic.val().split(",").length == 5
},
setElWidth: function() {
var e = this;
e.$el.width(e.$wrap.width() - e.$qtab.width() - 58)
},
checkTopic: function() {
var e = this;
e.$el.trigger("fuzzychange")
}
})
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["8448b46e861e22652e25c8ccfc4fc8d9"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "9c35296c6e4e1419be6885fa8e103713",
filename: "jquery.qcbox.qsuggest.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function s(e) {
var t = e.offset();
t["top"] += e.outerHeight();
return t
}
function o(e) {
return e.closest("table").data("data")[e.attr("data-ind") * 1]
}
function u(e) {
var t = this;
var n = t.visible();
var r = e.keyCode;
if (r === 40 && !n) {
t.show();
return
}
var i = t.el.find("tr");
var s = i.filter(".active");
switch (r) {
case 38:
case 40:
if (n) {
t._excludeEl = t._mouseFocus;
s.removeClass("active");
var u = e.keyCode === 38 ? s.prev() : s.next();
if (u.size() === 0)
u = i.filter(r === 38 ? ":last" : ":first");
var a = t.args.getData || o;
var f = a(u);
t.setValue(f);
u.addClass("active");
e.preventDefault();
t._trigger("q-suggest-user-action", [e.type, f, r])
}
break;
case 13:
case 27:
if (n) {
t.hide();
t._trigger("q-suggest-user-action", [e.type, t.getValue(), r])
}
break;
case 18:
case 9:
break;
default:
}
}
function a(e, t) {
if (!this.init)
return new qsuggest(e,t);
else
return this.init(e, t)
}
var t = function() {
var t = "data-detect-oninput"
, n = {}
, r = {}
, i = 1
, s = 1;
var o = function(e, t, r, i) {
if (e.addEventListener)
e.addEventListener(t, r, false);
else if (e.attachEvent)
e.attachEvent("on" + t, r);
(n[i] || (n[i] = [])).push({
t: t,
h: r
})
}
;
var u = function(e, t) {
if (!n[t])
return;
for (var r = 0, i; i = n[t][r]; r++)
if (e.removeEventListener)
e.removeEventListener(i["t"], i["h"], false);
else if (e.detachEvent)
e.detachEvent("on" + i["t"], i["h"]);
delete n[t]
}
;
var a = function(e, t) {
var n = e.value;
var r = function() {
var i;
if ((i = e.value) !== n) {
if (r._sleep !== true)
t.call(e, i, n);
n = e.value
}
}
;
return r
}
;
var f = navigator.userAgent.toLowerCase();
return {
version: "1.3",
bind: function(e, n) {
var u, l = n[t];
if (!l)
n[t] = l = i++;
if (!(u = e.getAttribute(t)))
e.setAttribute(t, u = "" + s++);
var c = a(e, n);
if ("oninput" in e && !/msie\s9/.test(f) && !/opera/.test(f))
o(e, "input", c, l);
else {
var h;
o(e, "focus", function() {
if (!h)
h = setInterval(c, 100)
}
, l);
o(e, "blur", function() {
if (h) {
clearInterval(h);
h = null
}
}
, l)
}
r[l] = {
eid: u,
checker: c
};
return e
},
unbind: function(e, n) {
if (n[t]) {
u(e, n[t]);
delete r[n[t]]
}
return e
},
set: function(e, n) {
var i = e.getAttribute(t);
if (i) {
var s = [];
for (var o in r)
if (r[o]["eid"] === i) {
s.push(r[o]["checker"]);
r[o]["checker"]._sleep = true
}
e.value = n;
for (var u = 0, a = s.length; u < a; u++) {
s[u].call(e);
s[u]._sleep = false
}
} else
e.value = n
},
setFuzzy: function(n, i) {
var s = n.getAttribute(t);
var o = e(n);
var u = e(n).siblings("#topic")
, a = u.val() == "" ? "" : u.val() + ","
, f = i.replace(/\([^)]*\)/g, "")
, l = i.match(/\(([^\)]+)\)/)
, c = l ? l[1] : ""
, h = l ? l[0] : "";
if (u.size() && u.val().indexOf(f) != -1) {
return
}
if (s) {
var p = [];
for (var d in r)
if (r[d]["eid"] === s) {
p.push(r[d]["checker"]);
r[d]["checker"]._sleep = true
}
o.data("qcboxfuzzy").renderTopicHtml({
topic: f,
type: 1,
code: c
});
u.val(a + f + h);
n.value = "";
for (var v = 0, m = p.length; v < m; v++) {
p[v].call(n);
p[v]._sleep = false
}
} else {
o.data("qcboxfuzzy").renderTopicHtml({
topic: f,
type: 1,
code: c
});
u.val(a + f + h);
n.value = ""
}
}
}
}
();
e.qsuggest = {
version: "1.2"
};
var n = e.qsuggest.ROOT_KEY = "q-suggest";
var r = 0;
var i = {
ajax: {
url: null ,
cache: false,
success: function() {}
},
reader: function(e) {
return e
},
loader: function(e) {
return e
},
max: 10,
min: 1,
container: null ,
delay: 100,
rdelay: 1e3,
requestWithNothing: false,
trimQuery: true,
autoSelect: true,
css: {
"z-index": 500
},
setValue: function(e) {
return e
},
render: function(e) {
return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
},
exattr: function(e) {
return e
}
};
e.extend(a.prototype, {
init: function(s, a) {
this.key = ++r;
var f = this.ns = n + this.key;
a = this.args = e.extend(true, {}, i, a || {});
var l = this.activeEl = e(s);
var c = this;
this.el = e('<div class="' + n + (a.customClass ? " " + a.customClass : "") + '"></div>').appendTo(a["container"] || document.body).hide();
this.el.data(n, this);
this._handler = null ;
this._ajaxHandler = null ;
this._excludeEl = null ;
this._mouseFocus = null ;
this._last = [];
this._cache = {};
this._value = null ;
e.each(a["on"] || {}, function(e, t) {
l.bind(e + "." + f, t)
}
);
if (a["css"])
this.el.css(c.args["css"]);
var c = this;
var h = false;
l.bind("keydown." + f, function(e) {
var t = e.keyCode;
if (t >= 229) {
h = true
}
}
);
t.bind(l[0], function() {
c._trigger("q-suggest-inputChange");
c.show()
}
);
l.bind("keydown." + f, function(e) {
if (h) {
h = false;
return
}
var t = c.args.keyevent || u;
t.call(c, e);
h = false
}
);
l.bind("blur." + f, function(e) {
if (c.visible() && c.args.fuzzyFun) {
this.value = "";
c.hide();
return
}
if (c.visible()) {
var t = c.el.find(a.ACT_CLASS || "tr.active");
if (t.length > 0) {
var n = c.args.getData || o;
if (c.args.autoSelect) {
var r = n(t);
r && c.setValue(r)
}
} else {
c._trigger("q-suggest-noresult", [l])
}
c.hide()
}
}
);
e("tr", this.el[0]).live("mouseover." + f + " mouseout." + f + " mousedown." + f, function(t) {
var n = e.nodeName(t.target, "tr") ? e(t.target) : e(t.target).parents("tr").eq(0);
if (e(n[0]).attr("data-sug_type") == 1) {
t.preventDefault();
return
}
var r = n[0] != c._excludeEl;
if (t.type === "mouseover") {
if (r) {
n.parents().children().removeClass("active");
n.addClass("active");
c._excludeEl = null
}
c._mouseFocus = n[0]
} else if (t.type === "mouseout") {
c._mouseFocus = null
} else {
var i = c.args.getData || o;
c.setValue(i(n));
c.hide();
c._trigger("q-suggest-user-action", [t.type, c.getValue(), n.index(), null ])
}
}
);
this._trigger("q-suggest-init", [this]);
return this
},
req: function() {
var t = this;
if (t._handler)
clearTimeout(t._handler);
if (t._timeoutHandler) {
clearTimeout(t._timeoutHandler);
t._timeoutHandler = null
}
if (t._ajaxHandler) {
t._ajaxHandler = null
}
t._handler = setTimeout(function() {
t.args.fuzzyFun ? t.args.fuzzyFun() : "";
var n = t.activeEl.val(), r = t.args.loader(n), i = null , s;
var o = function() {
(t.args.draw || t.draw).apply(t, [].slice.call(arguments))
}
;
if (t.args.trimQuery)
r = e.trim(r);
if (!r && !t.args.requestWithNothing) {
o(null );
return
}
if (t._last && t._last[0] === r) {
o(t._last[1]);
return
}
if (t._last && t._last[0] == r)
i = t._last;
else if (t.args.cache && t._cache[r])
i = t._cache[r];
var u = typeof t.args.ajax.url == "function" ? t.args.ajax.url() : t.args.ajax.url;
if (i)
o((t._last = i)[1]);
else if (!u)
o(null );
else {
u = u.replace(/\*([^*]+)$/, encodeURIComponent(r) + "$1");
var a = t.args.ajax.success;
t._timeoutHandler = setTimeout(function() {
t.hide()
}
, t.args.rdelay);
t._ajaxHandler = e.ajax(e.extend({}, t.args.ajax, {
url: u,
success: function(e, i) {
clearTimeout(t._timeoutHandler);
t._timeoutHandler = null ;
t._ajaxHandler = null ;
if (n !== t.activeEl.val())
return;
var s = t.args.reader.call(t, e, i);
if (t.type(s) === "Array") {
o(s, e);
t._last = t._cache[r] = [r, s, i]
}
a.apply(this, arguments)
}
}))
}
}
, t.args.delay)
},
type: function(e) {
return Object.prototype.toString.call(e).slice(8, -1)
},
show: function() {
this.req()
},
hide: function() {
if (this.visible()) {
this.el.hide();
this._trigger("q-suggest-hide")
}
},
draw: function(t, n) {
this.el.empty();
var r = this.args.min
, i = this.args.max
, o = t ? t.length : 0;
if (!t || !o || o < r) {
this.hide();
return
}
var u = t[0].country;
var a = {
country: "中国",
txt: "所有地点",
val: "所有地点",
type: 0
};
var f = {
country: u,
txt: u,
val: u,
type: 0
};
if (this.args.allPlace && t[o - 1].val != a.val) {
t.push(a)
}
var l = []
, c = this.args.render
, h = this.args.exattr
, p = true;
l.push('<table cellspacing="0" cellpadding="2"><tbody>');
e.each(t, function(e, t) {
if (e >= i)
return false;
var n = "";
if (t.type !== 1 && p) {
p = false;
n = ' class="active'
}
if (t.exClass) {
n = n ? n + " " + t.exClass + '" ' : ' class="' + t.exClass + '" '
} else {
n = n ? n + '" ' : ""
}
l.push("<tr", n, ' data-ind="', e, '" ', h(t), "><td>", c(t), "</td></tr>")
}
);
l.push("</tbody></table>");
this._trigger("q-suggest-beforeshow", [this.el, n]);
var d = e(l.join("")).appendTo(this.el).data("data", t);
if (!this.args["container"])
this.el.css(s(this.activeEl));
this.el.show();
this._trigger("q-suggest-show", [t])
},
dispose: function() {
this._trigger("q-suggest-dispose");
this.activeEl.unbind("." + this.ns);
e(window).unbind("." + this.ns);
this.el.remove()
},
visible: function() {
return this.el.is(":visible")
},
_trigger: function() {
this.activeEl.triggerHandler.apply(this.activeEl, arguments)
},
setValue: function(e) {
if (this.args.fuzzyFun) {
t.setFuzzy(this.activeEl[0], e)
} else {
t.set(this.activeEl[0], e)
}
this._value = e;
this._setExtData();
this._trigger("q-suggest-setvalue", [e, this.activeEl])
},
_setExtData: function() {
var e = this.args.getExtData ? this.args.getExtData(this.el.find("tr.active")) : {};
this._trigger("q-suggest-setextdata", [e, this.activeEl])
},
getValue: function() {
return this._value
},
set: function(e, t) {
var n = false;
switch (e) {
case "container":
this.el.appendTo(t || document.body);
this.el.css({
top: "",
left: ""
});
break
}
if (!n)
for (var r = 0, i = e.split("."), s = i.length, o = this.args; r < s && (r !== s - 1 && (o[i[r]] || (o[i[r]] = {})) || (o[i[r]] = t)); o = o[i[r]],
r++) {}
return t
},
get: function(e) {
for (var t = 0, n = this.args, r = e.split("."), i = r.length; t < i && (n = n[r[t]]); t++) {}
return n
}
});
e.fn.qsuggest = function() {
var t = arguments;
if (arguments.length > 1 && this.data(n)) {
var r = null ;
if (arguments[0] === "option" || arguments[0] === "setting")
this.each(function(i, s) {
var o = e(s);
var u = this.data(n);
if (u)
r = r || (t.length > 2 ? u.set(t[1], t[2]) : u.get(t[1]))
}
);
return r
} else if (arguments.length <= 1) {
this.each(function(r, i) {
var s = e(i);
if (s.data(n)) {
s.data(n).dispose();
s.removeData(n)
}
var o = new a(i,t[0]);
s.data(n, o)
}
)
}
return this
}
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["9c35296c6e4e1419be6885fa8e103713"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "5a1d5de682f5659f68e14940fdb0b462",
filename: "jquery.qhistory.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
function s(e) {
var r = e.contentWindow.QunarHistory;
t = o(r);
n = u(r)
}
function o(t) {
function d(e) {
var t = [], n;
for (var r = 0; r < e.length; r++) {
n = 0;
for (var i = 0; i < t.length; i++) {
if (e[r].fromCity == t[i].fromCity && e[r].toCity == t[i].toCity) {
n = 1;
break
}
}
if (n != 1) {
t.push(e[r])
}
}
return t
}
var n = t.findEntries("SF");
var r = t.findEntries("DL");
var i = []
, s = []
, o = []
, u = [];
e.each(n, function(e, t) {
if (a(t)) {
i.push(l(t));
return false
}
}
);
e.each(n, function(e, t) {
if (!a(t)) {
s.push(l(t));
return false
}
}
);
e.each(r, function(e, t) {
t.roundtrip = true;
if (a(t)) {
o.push(l(t));
return false
}
}
);
e.each(r, function(e, t) {
t.roundtrip = true;
if (!a(t)) {
u.push(l(t));
return false
}
}
);
var f = []
, c = [];
f = f.concat(s).concat(u);
c = c.concat(i).concat(o);
f.sort(function(e, t) {
return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
}
);
c.sort(function(e, t) {
return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
}
);
var h = []
, p = [];
e.each(n, function(e, t) {
if (a(t)) {
h.push(l(t))
} else {
p.push(l(t))
}
}
);
e.each(r, function(e, t) {
t.roundtrip = true;
if (a(t)) {
h.push(l(t))
} else {
p.push(l(t))
}
}
);
h.sort(function(e, t) {
return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
}
);
p.sort(function(e, t) {
return parseInt(t.timestamp, 10) - parseInt(e.timestamp, 10)
}
);
h = d(h);
p = d(p);
return {
domesticFirst: f[0],
interFirst: c[0],
domesticFlightList: p,
interFlightList: h
}
}
function u(e) {
return {
HL: e.findEntries("HL")[0],
HDL: e.findEntries("HDL")[0],
HBL: e.findEntries("HBL")[0],
HLL: e.findEntries("HLL")[0],
HTL: e.findEntries("HTL")[0]
}
}
function a(e) {
var t = e.fromCountry;
var n = e.toCountry;
var r = t;
var i = n;
if (~t.indexOf("-")) {
r = t.split("-")[0];
i = t.split("-")[1]
}
e.fromCountry = r;
e.toCountry = i;
return f(r) !== "中国" || f(i) !== "中国"
}
function f(e) {
return decodeURIComponent(e)
}
function l(t) {
e.each(t, function(e, n) {
t[e] = f(n)
}
);
return t
}
e.qhistory = {};
var t = null ;
var n = null ;
var r = "#js_ifrmHistory";
var i = "/s/history/newhistory.php";
//var i = "/s/history/newhistory.html";
e.qhistory.init = function(o) {
var u = e(o.frameid || r);
u.attr("src", o.src || i);
u.bind("load", function() {
s(u[0]);
var e = {
flight: t,
hotel: n
};
var r = o.success || function() {}
;
r(e)
}
)
}
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["5a1d5de682f5659f68e14940fdb0b462"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "0793922fe0276a9459c2b89066f923bf",
filename: "jquery.qloader.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
var r = $.trim($("#releasemap").html()).split(/\n/);
var i = {};
var s = "scripts/release/";
var o = "@";
var u;
$.each(r, function(e, t) {
if (!t.indexOf(s)) {
u = t.split("#");
i[u[0]] = i[u[0]] || u[1]
}
}
);
(function() {
var e = {};
$.qload = function(t, n) {
var r = i[s + t + ".js"];
//var u = ["/s/prd/scripts/release/", t, o, r, ".js"].join("");
var u = ["/s/prd/scripts/release/", t, ".js"].join("");
if (e[t])
return;
$.ajax({
url: u,
dataType: "script",
cache: true,
success: function() {
e[t] = true;
n()
}
})
}
}
)()
}
(t.exports, t, e);
e.____MODULES["0793922fe0276a9459c2b89066f923bf"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "c5e6bf0fdcae194e7b63e52c8c572f8a",
filename: "hogan-2.0.0.amd.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
window.Hogan = {};
(function(e, t) {
function a(e) {
return String(e === null  || e === undefined ? "" : e)
}
function f(e) {
e = a(e);
return u.test(e) ? e.replace(n, "&amp;").replace(r, "&lt;").replace(i, "&gt;").replace(s, "&#39;").replace(o, "&quot;") : e
}
e.Template = function(e, n, r, i) {
this.r = e || this.r;
this.c = r;
this.options = i;
this.text = n || "";
this.buf = t ? [] : ""
}
;
e.Template.prototype = {
r: function(e, t, n) {
return ""
},
v: f,
t: a,
render: function(t, n, r) {
return this.ri([t], n || {}, r)
},
ri: function(e, t, n) {
return this.r(e, t, n)
},
rp: function(e, t, n, r) {
var i = n[e];
if (!i) {
return ""
}
if (this.c && typeof i == "string") {
i = this.c.compile(i, this.options)
}
return i.ri(t, n, r)
},
rs: function(e, t, n) {
var r = e[e.length - 1];
if (!l(r)) {
n(e, t, this);
return
}
for (var i = 0; i < r.length; i++) {
e.push(r[i]);
n(e, t, this);
e.pop()
}
},
s: function(e, t, n, r, i, s, o) {
var u;
if (l(e) && e.length === 0) {
return false
}
if (typeof e == "function") {
e = this.ls(e, t, n, r, i, s, o)
}
u = e === "" || !!e;
if (!r && u && t) {
t.push(typeof e == "object" ? e : t[t.length - 1])
}
return u
},
d: function(e, t, n, r) {
var i = e.split(".")
, s = this.f(i[0], t, n, r)
, o = null ;
if (e === "." && l(t[t.length - 2])) {
return t[t.length - 1]
}
for (var u = 1; u < i.length; u++) {
if (s && typeof s == "object" && i[u] in s) {
o = s;
s = s[i[u]]
} else {
s = ""
}
}
if (r && !s) {
return false
}
if (!r && typeof s == "function") {
t.push(o);
s = this.lv(s, t, n);
t.pop()
}
return s
},
f: function(e, t, n, r) {
var i = false
, s = null
, o = false;
for (var u = t.length - 1; u >= 0; u--) {
s = t[u];
if (s && typeof s == "object" && e in s) {
i = s[e];
o = true;
break
}
}
if (!o) {
return r ? false : ""
}
if (!r && typeof i == "function") {
i = this.lv(i, t, n)
}
return i
},
ho: function(e, t, n, r, i) {
var s = this.c;
var o = this.options;
o.delimiters = i;
var r = e.call(t, r);
r = r == null  ? String(r) : r.toString();
this.b(s.compile(r, o).render(t, n));
return false
},
b: t ? function(e) {
this.buf.push(e)
}
: function(e) {
this.buf += e
}
,
fl: t ? function() {
var e = this.buf.join("");
this.buf = [];
return e
}
: function() {
var e = this.buf;
this.buf = "";
return e
}
,
ls: function(e, t, n, r, i, s, o) {
var u = t[t.length - 1]
, a = null ;
if (!r && this.c && e.length > 0) {
return this.ho(e, u, n, this.text.substring(i, s), o)
}
a = e.call(u);
if (typeof a == "function") {
if (r) {
return true
} else if (this.c) {
return this.ho(a, u, n, this.text.substring(i, s), o)
}
}
return a
},
lv: function(e, t, n) {
var r = t[t.length - 1];
var i = e.call(r);
if (typeof i == "function") {
i = a(i.call(r));
if (this.c && ~i.indexOf("{{")) {
return this.c.compile(i, this.options).render(r, n)
}
}
return a(i)
}
};
var n = /&/g
, r = /</g
, i = />/g
, s = /\'/g
, o = /\"/g
, u = /[&<>\"\']/;
var l = Array.isArray || function(e) {
return Object.prototype.toString.call(e) === "[object Array]"
}
}
)(Hogan);
(function(e) {
function u(e) {
if (e.n.substr(e.n.length - 1) === "}") {
e.n = e.n.substring(0, e.n.length - 1)
}
}
function a(e) {
if (e.trim) {
return e.trim()
}
return e.replace(/^\s*|\s*$/g, "")
}
function f(e, t, n) {
if (t.charAt(n) != e.charAt(0)) {
return false
}
for (var r = 1, i = e.length; r < i; r++) {
if (t.charAt(n + r) != e.charAt(r)) {
return false
}
}
return true
}
function l(e, t, n, r) {
var i = []
, s = null
, o = null ;
while (e.length > 0) {
o = e.shift();
if (o.tag == "#" || o.tag == "^" || c(o, r)) {
n.push(o);
o.nodes = l(e, o.tag, n, r);
i.push(o)
} else if (o.tag == "/") {
if (n.length === 0) {
throw new Error("Closing tag without opener: /" + o.n)
}
s = n.pop();
if (o.n != s.n && !h(o.n, s.n, r)) {
throw new Error("Nesting error: " + s.n + " vs. " + o.n)
}
s.end = o.i;
return i
} else {
i.push(o)
}
}
if (n.length > 0) {
throw new Error("missing closing tag: " + n.pop().n)
}
return i
}
function c(e, t) {
for (var n = 0, r = t.length; n < r; n++) {
if (t[n].o == e.n) {
e.tag = "#";
return true
}
}
}
function h(e, t, n) {
for (var r = 0, i = n.length; r < i; r++) {
if (n[r].c == e && n[r].o == t) {
return true
}
}
}
function p(e) {
return e.replace(s, "\\\\").replace(n, '\\"').replace(r, "\\n").replace(i, "\\r")
}
function d(e) {
return ~e.indexOf(".") ? "d" : "f"
}
function v(e) {
var t = "";
for (var n = 0, r = e.length; n < r; n++) {
var i = e[n].tag;
if (i == "#") {
t += m(e[n].nodes, e[n].n, d(e[n].n), e[n].i, e[n].end, e[n].otag + " " + e[n].ctag)
} else if (i == "^") {
t += g(e[n].nodes, e[n].n, d(e[n].n))
} else if (i == "<" || i == ">") {
t += y(e[n])
} else if (i == "{" || i == "&") {
t += b(e[n].n, d(e[n].n))
} else if (i == "\n") {
t += E('"\\n"' + (e.length - 1 == n ? "" : " + i"))
} else if (i == "_v") {
t += w(e[n].n, d(e[n].n))
} else if (i === undefined) {
t += E('"' + p(e[n]) + '"')
}
}
return t
}
function m(e, t, n, r, i, s) {
return "if(_.s(_." + n + '("' + p(t) + '",c,p,1),' + "c,p,0," + r + "," + i + ',"' + s + '")){' + "_.rs(c,p," + "function(c,p,_){" + v(e) + "});c.pop();}"
}
function g(e, t, n) {
return "if(!_.s(_." + n + '("' + p(t) + '",c,p,1),c,p,1,0,0,"")){' + v(e) + "};"
}
function y(e) {
return '_.b(_.rp("' + p(e.n) + '",c,p,"' + (e.indent || "") + '"));'
}
function b(e, t) {
return "_.b(_.t(_." + t + '("' + p(e) + '",c,p,0)));'
}
function w(e, t) {
return "_.b(_.v(_." + t + '("' + p(e) + '",c,p,0)));'
}
function E(e) {
return "_.b(" + e + ");"
}
var t = /\S/
, n = /\"/g
, r = /\n/g
, i = /\r/g
, s = /\\/g
, o = {
"#": 1,
"^": 2,
"/": 3,
"!": 4,
">": 5,
"<": 6,
"=": 7,
_v: 8,
"{": 9,
"&": 10
};
e.scan = function(n, r) {
function S() {
if (v.length > 0) {
m.push(new String(v));
v = ""
}
}
function x() {
var e = true;
for (var n = b; n < m.length; n++) {
e = m[n].tag && o[m[n].tag] < o["_v"] || !m[n].tag && m[n].match(t) === null ;
if (!e) {
return false
}
}
return e
}
function T(e, t) {
S();
if (e && x()) {
for (var n = b, r; n < m.length; n++) {
if (!m[n].tag) {
if ((r = m[n + 1]) && r.tag == ">") {
r.indent = m[n].toString()
}
m.splice(n, 1)
}
}
} else if (!t) {
m.push({
tag: "\n"
})
}
g = false;
b = m.length
}
function N(e, t) {
var n = "=" + E
, r = e.indexOf(n, t)
, i = a(e.substring(e.indexOf("=", t) + 1, r)).split(" ");
w = i[0];
E = i[1];
return r + n.length - 1
}
var i = n.length
, s = 0
, l = 1
, c = 2
, h = s
, p = null
, d = null
, v = ""
, m = []
, g = false
, y = 0
, b = 0
, w = "{{"
, E = "}}";
if (r) {
r = r.split(" ");
w = r[0];
E = r[1]
}
for (y = 0; y < i; y++) {
if (h == s) {
if (f(w, n, y)) {
--y;
S();
h = l
} else {
if (n.charAt(y) == "\n") {
T(g)
} else {
v += n.charAt(y)
}
}
} else if (h == l) {
y += w.length - 1;
d = o[n.charAt(y + 1)];
p = d ? n.charAt(y + 1) : "_v";
if (p == "=") {
y = N(n, y);
h = s
} else {
if (d) {
y++
}
h = c
}
g = y
} else {
if (f(E, n, y)) {
m.push({
tag: p,
n: a(v),
otag: w,
ctag: E,
i: p == "/" ? g - E.length : y + w.length
});
v = "";
y += E.length - 1;
h = s;
if (p == "{") {
if (E == "}}") {
y++
} else {
u(m[m.length - 1])
}
}
} else {
v += n.charAt(y)
}
}
}
T(g, true);
return m
}
;
e.generate = function(t, n, r) {
var i = 'var _=this;_.b(i=i||"");' + v(t) + "return _.fl();";
if (r.asString) {
return "function(c,p,i){" + i + ";}"
}
return new e.Template(new Function("c","p","i",i),n,e,r)
}
;
e.parse = function(e, t, n) {
n = n || {};
return l(e, "", [], n.sectionTags || [])
}
,
e.cache = {};
e.compile = function(e, t) {
t = t || {};
var n = e + "||" + !!t.asString;
var r = this.cache[n];
if (r) {
return r
}
r = this.generate(this.parse(this.scan(e, t.delimiters), e, t), e, t);
return this.cache[n] = r
}
}
)(Hogan)
}
(t.exports, t, e);
e.____MODULES["c5e6bf0fdcae194e7b63e52c8c572f8a"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "815dda558568210c859e8337f0d0d295",
filename: "track.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
window.trackAction = function(e, t, n) {
var r = "/s/track.php?action=" + e + "&t=" + Date.parse(new Date);
if (t) {
r += "&rId=" + t
} else {
if (trackAction.rid) {
r += "&rId=" + trackAction.rid
}
}
if (n)
r = r.replace("track.php", "timetrack.php");
(new Image).src = r
}
;
window.trackHotelCityBox = function(e, t) {
(new Image).src = "/s/track.php?_=" + (new Date).getTime() + "&hotel=citybox&q=" + encodeURIComponent(e) + "&c=" + t
}
;
window.gaClk = function(e) {
var t = window["QNRGA"]
, n = +(new Date);
if (window.location.protocol.indexOf("https") >= 0 || !t)
return false;
if (typeof e === "string")
e = {
a: e,
t: n
};
if (t.clk)
t.clk(e);
else {
t = new t;
t.add("utmwv", "0.1");
t.add("t", Math.random());
t.add("utmsr", screen.width + "*" + screen.height);
t.add("utmasr", screen.availWidth + "*" + screen.availHeight);
t.add("utmr", document.referrer || "-1");
t.add("utmp", window.location.href.toString());
t.add("utmhn", window.location.host.toString());
t.add("s", window["_ba_utm_s"] || null );
if (window["_ba_utm_ex"]) {
var r = window["_ba_utm_ex"];
for (var i in r) {
t.add(i, r[i])
}
}
e = e || {};
for (var i in e) {
t.add(i, e[i])
}
var s = [];
var o = t.param;
for (var u in o) {
s.push(u + "=" + encodeURIComponent(o[u]))
}
s = s.join("&");
var a = new Image;
a.src = "/s/clk.php?" + s
}
}
;
window.gaNotClk = function(e) {
var t = window["QNRGA"]
, n = +(new Date);
if (window.location.protocol.indexOf("https") >= 0 || !t)
return false;
if (typeof e === "string")
e = {
a: e,
t: n
};
t = new t;
t.add("utmwv", "0.1");
t.add("t", Math.random());
t.add("utmsr", screen.width + "*" + screen.height);
t.add("utmasr", screen.availWidth + "*" + screen.availHeight);
t.add("utmr", document.referrer || "-1");
t.add("utmp", window.location.href.toString());
t.add("utmhn", window.location.host.toString());
t.add("s", window["_ba_utm_s"] || null );
if (window["_ba_utm_ex"]) {
var r = window["_ba_utm_ex"];
for (var i in r) {
t.add(i, r[i])
}
}
e = e || {};
for (var i in e) {
t.add(i, e[i])
}
t.send()
}
}
(t.exports, t, e);
e.____MODULES["815dda558568210c859e8337f0d0d295"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "dae66dc8119a6a0799fcb9111d4622de",
filename: "Cookie.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
window.Cookie = {
originalString: document.cookie,
read: function() {
this.originalString = document.cookie
},
_getCookieHash: function(e) {
var t = this.originalString.split(";");
var n = {};
var r = !e ? unescape : decodeURIComponent;
for (var i = 0; i < t.length; i++) {
if (t[i].indexOf("=") != -1)
n[t[i].split("=")[0].replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")] = r(t[i].split("=")[1]).replace(/(^\s*)/g, "").replace(/(\s*$)/g, "")
}
return n
},
setCookie: function(e, t, n, r, i, s) {
var o = !s ? escape : encodeURIComponent;
var u = e + "=" + o(t);
if (n)
u += "; expires=" + n.toGMTString();
if (r)
u += "; domain=" + r;
if (i)
u += "; path=" + i;
document.cookie = u;
this.originalString = document.cookie;
this.values = this._getCookieHash()
},
deleteCookie: function(e) {
var t = new Date(1);
document.cookie = e + "=;expires=" + t.toGMTString();
this.originalString = document.cookie;
this.values = this._getCookieHash()
},
refresh: function() {
this.read();
Cookie.values = Cookie._getCookieHash()
}
};
Cookie.values = Cookie._getCookieHash()
}
(t.exports, t, e);
e.____MODULES["dae66dc8119a6a0799fcb9111d4622de"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "027f78b98f7715f13ac8172fea8a9733",
filename: "FlightSearchBox.mustache",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
if (typeof window.QTMPL === "undefined")
window.QTMPL = {};
window.QTMPL["FlightSearchBox"] = new window.Hogan.Template(function(e, t, n) {
var r = this;
r.b(n = n || "");
r.b('<div class="e_csh_sch_flpn searchbox-flight">');
r.b("\n" + n);
r.b('    <div class="ch_search_tab">');
r.b("\n" + n);
r.b('        <div class="rt_link"><a href="http://user.qunar.com/flight_toolbox.jsp?catalog=ownorders&from=qunarindexP1" target="_blank" class="icon-status">出票状态查询</a><a href="http://user.qunar.com/flight_toolbox.jsp?catalog=ownorders&from=tuigai" target="_blank" class="icon-edit">退票改签</a></div>');
r.b("\n" + n);
r.b('        <ul class="ul_search_tab">');
r.b("\n" + n);
//modify
r.b('            <li class="cur" id="js_inter_tab"><a href="#" onclick="return false;">国际·港澳台机票</a></li>');
r.b("\n" + n);
r.b('            <li id="js_domestic_tab"><a href="#" onclick="return false;">国内机票</a></li>');
r.b("\n" + n);
r.b("        </ul>");
r.b("\n" + n);
r.b("    </div>");
r.b("\n" + n);
r.b('    <div class="con">');
r.b("\n" + n);
r.b('        <div class="ch_sch_form ch_sch_flt_bf clrfix" style="display:none" id="js_flighttype_tab_domestic">');
r.b("\n" + n);
r.b('            <form action="/s/twell/flight/Search.php" method="get" id="js_flight_domestic_searchbox">');
r.b("\n" + n);
r.b('                <input type="hidden" value="qunarindex" name="from" />');
r.b("\n" + n);
r.b('                <div class="crl_group">');
r.b("\n" + n);
r.b('                    <div class="controls">');
r.b("\n" + n);
r.b('                        <div class="b_hongbao_lst ">');
r.b("\n" + n);
r.b('                            <a target="_blank" href="http://flight.qunar.com/site/zhuanti/hotel_hongbao.html">买机票获预订酒店5折特权</a>');
r.b("\n" + n);
r.b('                            <!-- div class="hotel_hongbao_icon js_hongbao">');
r.b("\n" + n);
r.b('                                <span class="icon"></span>');
r.b("\n" + n);
r.b('                                <div class="p_tips_wrap p_tips_blue" style="display:none;">');
r.b("\n" + n);
r.b('                                    <div class="p_tips_arr p_tips_arr_l">');
r.b("\n" + n);
r.b('                                        <p class="arr_o">◆</p>');
r.b("\n" + n);
r.b('                                        <p class="arr_i">◆</p>');
r.b("\n" + n);
r.b("                                    </div>");
r.b("\n" + n);
r.b('                                    <div class="p_tips_content">');
r.b("\n" + n);
r.b("                                        <p> 规则说明： </p>");
r.b("\n" + n);
r.b("                                        <p>1. 成功购买国内单程机票，即送300元酒店红包，登陆去哪儿app进入“我的”—“红包”可查询。 <br/>2. 红包可适用20万家酒店，红包在去哪儿app订酒店首单5折，单次最高优惠200元。 <br/>3. 同一用户（账号/设备/手机号）只能参加本活动一次。 </p>");
r.b("\n" + n);
r.b("                                    </div>");
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div -->");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_searchtype_oneway" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="searchType" data-beacon="国内机票-单程" type="radio" class="inp_rad js-searchtype-oneway" value="OnewayFlight" checked="checked" id="js_searchtype_oneway" />');
r.b("\n" + n);
r.b("                            单程</label>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_searchtype_roundtrip" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="searchType"  data-beacon="国内机票-往返" type="radio" class="inp_rad js-searchtype-roundtrip" value="RoundTripFlight" id="js_searchtype_roundtrip" />');
r.b("\n" + n);
r.b("                            往返</label>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b('                <div class="crl_group iwrap">');
r.b("\n" + n);
r.b('                    <div class="crl_sp2_1">');
r.b("\n" + n);
r.b('                        <a class="lnk_change js-exchagne-city" href="#" title="调换出发地和目的地">换</a>');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 40;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="fromCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 30;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="toCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b('                    <div class="crl_sp2_2">');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate fromD" style="z-index: 20;">');
r.b("\n" + n);
r.b('                                <input type="text" id="js_domestic_fromdate" value="" name="fromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls js_arrivalDateDiv" style="display:none">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate toD" style="z-index: 10;">');
r.b("\n" + n);
r.b('                                <input type="text" id="js_domestic_todate" value="" name="toDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls js_arrivalDateDiv_disable">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate toD qcbox_disable" style="z-index: 10;">');
r.b("\n" + n);
r.b('                                <div class="qunar-dp">');
r.b("\n" + n);
r.b('                                    <div class="dp-prefix">日期</div>');
r.b("\n" + n);
r.b('                                    <div class="dp-info"><b></b><span class="dp-text"></span></div>');
r.b("\n" + n);
r.b('                                    <input type="text" value="" class="cinput textbox" style="left: 32px;">');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b('                <div class="crl_group crl_group_submit">');
r.b("\n" + n);
r.b('                    <div class="controls"> <span class="p_btn"><button type="submit" class="button-search"></button>');
r.b("\n" + n);
r.b("                        </span>");
r.b("\n" + n);
r.b('                        <div class="p_text">');
r.b("\n" + n);
r.b('                            <div class="flight_ad js-searchbox-ad"></div>');
r.b("\n" + n);
r.b('                            <p class="linenum">');
r.b("\n" + n);
r.b('                                <span id="js_alsosearch_domestic"></span>');
r.b("\n" + n);
r.b('                                可实时搜索&nbsp;<span class="highlight">28万</span>&nbsp;条国内国际航线');
r.b("\n" + n);
r.b("                            </p>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("            </form>");
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b('        <div class="ch_sch_form ch_sch_flt_bf clrfix" style="display:none" id="js_flighttype_tab_inter">');
r.b("\n" + n);
r.b('            <form action="/s/twell/flight/Search.php" id="js_flight_international_searchbox" method="get">');
r.b("\n" + n);
r.b('                <input type="hidden" value="qunarindex" name="from" />');
r.b("\n" + n);
r.b('                <div class="crl_group">');
r.b("\n" + n);
r.b('                    <div class="controls pos-rel">');
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_intersearchtype_oneway" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="searchType" type="radio" value="OnewayFlight" class="inp_rad js-searchtype-oneway" id="js_intersearchtype_oneway" data-beacon="国际·港澳台机票-单程" />');
r.b("\n" + n);
r.b("                            单程</label>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_intersearchtype_roundtrip" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="searchType" type="radio" value="RoundTripFlight" class="inp_rad js-searchtype-roundtrip" checked="checked" id="js_intersearchtype_roundtrip" data-beacon="国际·港澳台机票-往返" />');
r.b("\n" + n);
r.b("                            往返</label>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo lal_rdo_s" for="js_intersearchtype_multitrip" hidefocus="on"><input class="inp_chk inp_rad js-searchtype-multitrip" type="radio" name="searchType" value="MultiTripFlight" id="js_intersearchtype_multitrip" data-beacon="国际·港澳台机票-多程" /> 多程（<span id="hoverInfo">含缺口</span>）</label>');
r.b("\n" + n);
r.b('                        <div class="morline-point" style="display:none;" id="morlinePoint">      ');
r.b("\n" + n);
r.b("                            <p>“缺口程”机票指的是三地或四地之间的机票行程，举例如下：</p>");
r.b("\n" + n);
r.b("                            <p>1.由城市A到达城市B，再由C城市到达A。</p>");
r.b("\n" + n);
r.b("                            <p>2.由城市A到达城市B，再由B城市到达C。</p>");
r.b("\n" + n);
r.b("                            <p>3.由城市A到达城市B，再由C城市到达D。</p>");
r.b("\n" + n);
r.b('                            <div class="arrow-down"></div>');
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo lab_p" for="searchTypeInterFuzzy">');
r.b("\n" + n);
r.b('                            <input type="radio" class="inp_chk inp_rad js-searchtype-fuzzytrip" value="FuzzyFlight" id="searchTypeInterFuzzy" name="searchType" data-track=\'key=101030009&val=智能搜索radiobutton\' />');
r.b("\n" + n);
r.b('                        智能搜索<i class="new"></i></label>');
r.b("\n" + n);
r.b('                        <label class="lal_rdo lal_rdo_last" for="js_intersearchtype_pricetrend" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="searchType" type="radio" value="PriceTrend" class="inp_rad js-searchtype-pricetrend" id="js_intersearchtype_pricetrend" data-beacon="国际·港澳台机票-价格趋势" />');
r.b("\n" + n);
r.b("                            价格趋势</label>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b('                <div class="crl_group iwrap" id="js_ow_rt_triplist">');
r.b("\n" + n);
r.b('                    <div class="crl_sp2_1">');
r.b("\n" + n);
r.b('                        <a class="lnk_change js-exchagne-city" href="#" title="调换出发地和目的地">换</a>');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 40;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="fromCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 30;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="toCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b('                    <div class="crl_sp2_2">');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate fromD" style="z-index: 20;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" id="fromDate" name="fromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls js_arrivalDateDiv">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate toD" style="z-index: 10;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" id="toDate" name="toDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls js_arrivalDateDiv_disable">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate toD qcbox_disable" style="z-index: 10;">');
r.b("\n" + n);
r.b('                                <div class="qunar-dp">');
r.b("\n" + n);
r.b('                                    <div class="dp-prefix">日期</div>');
r.b("\n" + n);
r.b('                                    <div class="dp-info"><b></b><span class="dp-text"></span></div>');
r.b("\n" + n);
r.b('                                    <input type="text" value="" class="cinput textbox" style="left: 32px;">');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("\n" + n);
r.b("                <!--多程模块 Changed:添加多程模块-->");
r.b("\n" + n);
r.b('                <div class="crl_group more-line iwrap" id="js_multi_triplist">');
r.b("\n" + n);
r.b('                    <div class="crl_sp2_1" id="js_trips_list">    ');
r.b("\n" + n);
r.b('                        <div class="muti_control">                                       ');
r.b("\n" + n);
r.b('                            <div class="crl_lab">第<span>1</span>程</div>');
r.b("\n" + n);
r.b('                            <div class="controls" style="z-index: 102;">');
r.b("\n" + n);
r.b('                                <div class="qcbox qcity">');
r.b("\n" + n);
r.b('                                     <input type="text" value="" name="fromCityMulti" class="cinput" data-qcbox-placeholder="出发地" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                    <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b('                                <div class="qcbox qcity">');
r.b("\n" + n);
r.b('                                     <input type="text" value="" name="toCityMulti" class="cinput" data-qcbox-placeholder="目的地" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                    <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b('                                <div class="qcbox qdate fromD">');
r.b("\n" + n);
r.b('                                    <input type="text" value="" name="fromDateMulti" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" />');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="muti_control">');
r.b("\n" + n);
r.b('                            <div class="crl_lab">第<span>2</span>程</div>');
r.b("\n" + n);
r.b('                            <div class="controls" style="z-index: 101;">');
r.b("\n" + n);
r.b('                                <div class="qcbox qcity">');
r.b("\n" + n);
r.b('                                     <input type="text" value="" name="fromCityMulti" class="cinput" data-qcbox-placeholder="出发地" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                    <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b('                                <div class="qcbox qcity">');
r.b("\n" + n);
r.b('                                     <input type="text" value="" name="toCityMulti" class="cinput" data-qcbox-placeholder="目的地" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                    <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b('                                <div class="qcbox qdate fromD">');
r.b("\n" + n);
r.b('                                    <input type="text" value="" name="fromDateMulti" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div> ");
r.b("\n" + n);
r.b("                        </div>                        ");
r.b("\n" + n);
r.b("                    </div>                                 ");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("                <!--//多程模块-->");
r.b("\n" + n);
r.b("\n" + n);
r.b("                <!--智能模块-->");
r.b("\n" + n);
r.b('                <div class="fuzzy-ser" id="fuzzy-ser" style=\'display:none;\'>');
r.b("\n" + n);
r.b('                    <input type="hidden" value="roundtrip" name="fuzzySchType" />');
r.b("\n" + n);
r.b('                    <div class="fuzzy-ser-i">');
r.b("\n" + n);
r.b('                        <div class="crl_sp_city">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity qfuzzy">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="fromFuzzy" class="textbox" data-qcbox-placeholder="城市名" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" spellcheck="false" autocomplete="off" x-webkit-speech="x-webkit-speech" data-detect-oninput="3">');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="crl_sp_fuzzy">');
r.b("\n" + n);
r.b('                            <div class="qcbox-fuzzy">');
r.b("\n" + n);
r.b('                                <input type="text" style="padding-left:0px;" value="" name="toFuzzy" class="textbox" data-qcboxfuzzy-placeholder="可输入城市或国家" data-qcboxfuzzy-prefix="我想去" data-qcboxfuzzy-suggest="flight-tofuzzy" data-qcboxfuzzy-hotfuzzy="flightfuzzy" spellcheck="false" autocomplete="off" x-webkit-speech="x-webkit-speech" data-detect-oninput="3">');
r.b("\n" + n);
r.b('                                <div class="qcbox-fixed js-suggestcontainer"></div>');
r.b("\n" + n);
r.b('                                <input type="hidden" name="topic" id="topic" value="" />');
r.b("\n" + n);
r.b('                                <input type="hidden" name="arrType" id="arrType" value="" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="clear"></div>');
r.b("\n" + n);
r.b('                        <div class="m-hot">');
r.b("\n" + n);
r.b('                            <div class="h-wrap">');
r.b("\n" + n);
r.b('                                <div class="lab">大家都在搜：</div>');
r.b("\n" + n);
r.b('                                <div class="ifo js-fuz-rec">');
r.b("\n" + n);
r.b("                                    <ul>");
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">免签/落地签</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">海滩</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">第1次出国</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">暑假</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">蜜月</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">亲子</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">文化遗产</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">美食</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">潜水</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">购物</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">电影/音乐</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">山岭/滑雪</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">中世纪城堡</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">穷游</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">世界杯</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">古迹</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">都市</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">毕业季</a></li>');
r.b("\n" + n);
r.b('                                    <li><a class="js-fuz" data-type="2" data-code="" href="#">出国特价</a></li>');
r.b("\n" + n);
r.b("                                </ul>");
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("                <!--//智能模块-->");
r.b("\n" + n);
r.b("\n" + n);
r.b("                <!--价格趋势-->");
r.b("\n" + n);
r.b('                <div class="crl_group iwrap" id="js_pricetrend_triplist">');
r.b("\n" + n);
r.b('                    <div class="crl_sp2_1">');
r.b("\n" + n);
r.b('                        <a class="lnk_change js-exchagne-pcity" href="#" title="调换出发地和目的地">换</a>');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 40;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="pfromCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 30;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="ptoCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b('                    <div class="crl_sp2_2">');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate fromD" style="z-index: 20;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" id="pfromDate" name="pfromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("                <!--//价格趋势-->");
r.b("\n" + n);
r.b("\n" + n);
r.b('                <div class="crl_group crl_group_submit" id="js_submit_module">');
r.b("\n" + n);
r.b('                    <div class="controls"> <span class="p_btn"><button  type="submit" class="button-search"></button></span>');
r.b("\n" + n);
r.b('                        <div class="p_text">');
r.b("\n" + n);
r.b('                            <div class="flight_ad js-searchbox-ad"></div>');
r.b("\n" + n);
r.b('                            <p class="linenum">');
r.b("\n" + n);
r.b('                                <span class="add-moreline"><a id="js_addtrip" href="javascript:void(0);">添加更多航程</a></span>');
r.b("\n" + n);
r.b('                                <span id="js_alsosearch_inter"></span>');
r.b("\n" + n);
r.b('                                <span id="js_realtime_info">可实时搜索&nbsp;<span class="highlight">28万</span>&nbsp;条国内国际航线</span></p>');
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("            </form>");
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b('        <div class="ch_sch_form ch_sch_flt_bf ch_sch_flt_lp clrfix" style="display:none;" id="js_flighttype_tab_tj">');
r.b("\n" + n);
r.b('            <form action="/s/twell/flight/Search.php" method="get" id="js_flight_tj_searchbox">');
r.b("\n" + n);
r.b('                <input type="hidden" value="qunarindex" name="from" />');
r.b("\n" + n);
r.b('                <input type="hidden" name="searchType" value="DealsFlight" />');
r.b("\n" + n);
r.b('                <input type="hidden" name="drange" value="15" />');
r.b("\n" + n);
r.b('                <div class="crl_group">');
r.b("\n" + n);
r.b('                    <div class="controls">');
r.b("\n" + n);
r.b('                        <div class="b_hongbao_lst ">');
r.b("\n" + n);
r.b('                            <a target="_blank" href="http://flight.qunar.com/site/zhuanti/hotel_hongbao.html">买机票获预订酒店5折特权</a>');
r.b("\n" + n);
r.b('                            <!-- div class="hotel_hongbao_icon js_hongbao">');
r.b("\n" + n);
r.b('                                <span class="icon"></span>');
r.b("\n" + n);
r.b('                                <div class="p_tips_wrap p_tips_blue" style="display:none;">');
r.b("\n" + n);
r.b('                                    <div class="p_tips_arr p_tips_arr_l">');
r.b("\n" + n);
r.b('                                        <p class="arr_o">◆</p>');
r.b("\n" + n);
r.b('                                        <p class="arr_i">◆</p>');
r.b("\n" + n);
r.b("                                    </div>");
r.b("\n" + n);
r.b('                                    <div class="p_tips_content">');
r.b("\n" + n);
r.b("                                        <p> 规则说明： </p>");
r.b("\n" + n);
r.b("                                        <p>1. 成功购买国内单程机票，即送300元酒店红包，登陆去哪儿app进入“我的”—“红包”可查询。 <br/>2. 红包可适用20万家酒店，红包在去哪儿app订酒店首单5折，单次最高优惠200元。 <br/>3. 同一用户（账号/设备/手机号）只能参加本活动一次。 </p>");
r.b("\n" + n);
r.b("                                    </div>");
r.b("\n" + n);
r.b("                                </div>");
r.b("\n" + n);
r.b("                            </div -->");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_searchtype_domestic" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="search" type="radio" class="inp_rad js-searchtype-domestic" value="domestic" checked="checked" id="js_searchtype_domestic" data-beacon="特价机票-国内航线" />');
r.b("\n" + n);
r.b("                            国内航线</label>");
r.b("\n" + n);
r.b('                        <label class="lal_rdo" for="js_searchtype_international" hidefocus="on">');
r.b("\n" + n);
r.b('                            <input name="search" type="radio" class="inp_rad js-searchtype-international" value="international" id="js_searchtype_international" data-beacon="特价机票-国际·港澳台航线" />');
r.b("\n" + n);
r.b("                            国际·港澳台航线</label>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b('                <div class="crl_group iwrap">');
r.b("\n" + n);
r.b('                    <div class="crl_sp2_1">');
r.b("\n" + n);
r.b('                        <a class="lnk_change js-exchagne-city" href="#" title="调换出发地和目的地">换</a>');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 40;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="fromCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qcity" style="z-index: 30;">');
r.b("\n" + n);
r.b('                                <input type="text" value="" name="toCity" class="cinput" data-qcbox-placeholder="');
r.b(r.v(r.f("placeholder", e, t, 0)));
r.b('" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" spellcheck="false" />');
r.b("\n" + n);
r.b('                                <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b('                    <div class="crl_sp2_2">');
r.b("\n" + n);
r.b('                        <div class="controls">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate fromD" style="z-index: 20;">');
r.b("\n" + n);
r.b('                                <input type="text" id="js_domestic_fromdate" value="" name="fromDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b('                        <div class="controls js-backdate" style="visibility:hidden;">');
r.b("\n" + n);
r.b('                            <div class="qcbox qdate toD" style="z-index: 10;">');
r.b("\n" + n);
r.b('                                <input type="text" id="js_domestic_todate" value="" name="toDate" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" spellcheck="false" style="display:none;" />');
r.b("\n" + n);
r.b("                            </div>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b('                <div class="crl_group crl_group_submit">');
r.b("\n" + n);
r.b('                    <div class="controls"> <span class="p_btn"><button type="submit" class="button-search"></button></span>');
r.b("\n" + n);
r.b('                        <div class="p_text">');
r.b("\n" + n);
r.b('                            <div class="flight_ad js-searchbox-ad"></div>');
r.b("\n" + n);
r.b('                            <p class="linenum">');
r.b("\n" + n);
r.b('                                <span id="js_alsosearch_domestic"></span>');
r.b("\n" + n);
r.b('                                可实时搜索&nbsp;<span class="highlight">28万</span>&nbsp;条国内国际航线');
r.b("\n" + n);
r.b("                            </p>");
r.b("\n" + n);
r.b("                        </div>");
r.b("\n" + n);
r.b("                    </div>");
r.b("\n" + n);
r.b("                </div>");
r.b("\n" + n);
r.b("            </form>");
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b("    </div>");
r.b("\n" + n);
r.b('    <div class="foot">');
r.b("\n" + n);
r.b('        <a href="http://www.qunar.com/xiaobao/flight.html" target="_blank" class="img"></a>');
r.b("\n" + n);
r.b('        <abbr id="flightSearchBoxAd" style="display:none;" data-type="qad" data-query="f=s&cur_page_num=0&rep=1&tag=99&vataposition=QNR_Mjg%3D_CN&vatacon=&rows=1&qtype=js&vataframe=bannerDefault" data-style="width:100%;"></abbr>');
r.b("\n" + n);
r.b("    </div>");
r.b("\n" + n);
r.b("</div>");
r.b("\n");
return r.fl();
}
);
if (typeof t !== "undefined")
t.exports = window.QTMPL["FlightSearchBox"]
}
(t.exports, t, e);
e.____MODULES["027f78b98f7715f13ac8172fea8a9733"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "84f6503d9af7b9b0bee74ceb424517c3",
filename: "FlightHotCity.mustache",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
if (typeof window.QTMPL === "undefined")
window.QTMPL = {};
window.QTMPL["FlightHotCity"] = new window.Hogan.Template(function(e, t, n) {
var r = this;
r.b(n = n || "");
r.b('<div class="ui-city-sug"');
if (r.s(r.f("width", e, t, 1), e, t, 0, 34, 60, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b(' style="width:');
n.b(n.v(n.f("width", e, t, 0)));
n.b('px"')
}
);
e.pop()
}
r.b(' data-hotcity-nogo="true">');
r.b("\n" + n);
r.b('    <i class="ico-close js_close_flight_hotcity" id="closeXI20"></i>');
r.b("\n" + n);
r.b("    ");
if (r.s(r.f("hisLength", e, t, 1), e, t, 0, 184, 396, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b('<div class="m-hst">搜索历史：');
if (n.s(n.f("cityHistory", e, t, 1), e, t, 0, 224, 374, "{{ }}")) {
n.rs(e, t, function(e, t, n) {
n.b('<span title="');
n.b(n.v(n.f("fcity", e, t, 0)));
n.b(" - ");
n.b(n.v(n.f("tcity", e, t, 0)));
n.b('" data-fcity="');
n.b(n.v(n.f("fcity", e, t, 0)));
n.b('"  data-tcity="');
n.b(n.v(n.f("tcity", e, t, 0)));
n.b('" class="js_history">');
n.b(n.v(n.f("fcity_abbr", e, t, 0)));
n.b("&nbsp;-&nbsp;");
n.b(n.v(n.f("tcity_abbr", e, t, 0)));
n.b("</span>")
}
);
e.pop()
}
n.b("</div>")
}
);
e.pop()
}
r.b("\n" + n);
r.b('    <div class="m-hct-nav">');
r.b("\n" + n);
if (r.s(r.f("sort", e, t, 1), e, t, 0, 456, 623, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b('        <span data-key="');
n.b(n.v(n.f("key", e, t, 0)));
n.b('" data-tab="');
n.b(n.v(n.f("type", e, t, 0)));
n.b("-flight-hotcity-");
n.b(n.v(n.f("cityType", e, t, 0)));
n.b('" data-tab-id="dfh-');
n.b(n.v(n.f("tab", e, t, 0)));
n.b('">');
n.b(n.v(n.f("tab", e, t, 0)));
n.b('<i class="i1"></i><i class="i2"></i></span>');
n.b("\n")
}
);
e.pop()
}
r.b("    </div>");
r.b("\n" + n);
if (r.s(r.f("sort", e, t, 1), e, t, 0, 657, 774, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b('    <div data-panel="');
n.b(n.v(n.f("type", e, t, 0)));
n.b("-flight-hotcity-");
n.b(n.v(n.f("cityType", e, t, 0)));
n.b('" data-panel-id="dfh-');
n.b(n.v(n.f("tab", e, t, 0)));
n.b('" class="m-hct-lst"></div>');
n.b("\n")
}
);
e.pop()
}
r.b("</div>");
return r.fl();
}
);
if (typeof t !== "undefined")
t.exports = window.QTMPL["FlightHotCity"]
}
(t.exports, t, e);
e.____MODULES["84f6503d9af7b9b0bee74ceb424517c3"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "b63e59968d1a60041e5c1b3e860c4ec8",
filename: "FlightHotCityList.mustache",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
if (typeof window.QTMPL === "undefined")
window.QTMPL = {};
window.QTMPL["FlightHotCityList"] = new window.Hogan.Template(function(e, t, n) {
var r = this;
r.b(n = n || "");
if (r.s(r.f("charSort", e, t, 1), e, t, 0, 13, 521, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("cityList", e, t, 1), e, t, 0, 27, 507, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("char", e, t, 1), e, t, 0, 37, 497, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
r.b('<dl class="e-hct-lst ');
if (r.s(r.f("clshct", e, t, 1), e, t, 0, 71, 82, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b("e-hct-lst-h")
}
);
e.pop()
}
r.b('">');
r.b("\n" + n);
r.b(" <dt>");
r.b(r.v(r.f("char", e, t, 0)));
r.b("</dt>");
r.b("\n" + n);
r.b(" <dd>");
r.b("\n" + n);
r.b("   <ul>");
r.b("\n" + n);
if (r.s(r.f("list", e, t, 1), e, t, 0, 142, 463, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
if (!n.s(n.f("titles", e, t, 1), e, t, 1, 0, 0, "")) {
n.b('         <li><a class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
if (n.s(n.f("titles", e, t, 1), e, t, 0, 308, 446, "{{ }}")) {
n.rs(e, t, function(e, t, n) {
n.b('         <li><a title="');
n.b(n.v(n.f("titles", e, t, 0)));
n.b('" class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
);
e.pop()
}
}
);
e.pop()
}
r.b("   </ul>");
r.b("\n" + n);
r.b(" </dd>");
r.b("\n" + n);
r.b("</dl>");
r.b("\n")
}
);
e.pop()
}
}
);
e.pop()
}
}
);
e.pop()
}
r.b("\n" + n);
if (r.s(r.f("fuzzy_c", e, t, 1), e, t, 0, 548, 908, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("countryList", e, t, 1), e, t, 0, 565, 891, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("char", e, t, 1), e, t, 0, 575, 881, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
r.b('<dl class="e-hct-lst ');
if (r.s(r.f("clshct", e, t, 1), e, t, 0, 609, 620, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b("e-hct-lst-h")
}
);
e.pop()
}
r.b('">');
r.b("\n" + n);
r.b(' <span class="e-fuzzy-line"></span>');
r.b("\n" + n);
r.b(" <dt>");
r.b(r.v(r.f("char", e, t, 0)));
r.b("</dt>");
r.b("\n" + n);
r.b(" <dd>");
r.b("\n" + n);
r.b("   <ul>");
r.b("\n" + n);
if (r.s(r.f("listCountry", e, t, 1), e, t, 0, 723, 840, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b('       <li><a class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
);
e.pop()
}
r.b("   </ul>");
r.b("\n" + n);
r.b(" </dd>");
r.b("\n" + n);
r.b("</dl>");
r.b("\n")
}
);
e.pop()
}
}
);
e.pop()
}
}
);
e.pop()
}
r.b("\n" + n);
r.b("\n" + n);
if (r.s(r.f("fuzzy", e, t, 1), e, t, 0, 933, 1281, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("hotword", e, t, 1), e, t, 0, 946, 1268, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
if (r.s(r.f("char", e, t, 1), e, t, 0, 956, 1258, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
r.b('<dl class="e-hct-lst ');
if (r.s(r.f("clshct", e, t, 1), e, t, 0, 990, 1001, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b("e-hct-lst-h")
}
);
e.pop()
}
r.b('">');
r.b("\n" + n);
r.b(' <span class="e-fuzzy-line"></span>');
r.b("\n" + n);
r.b(" <dt>");
r.b(r.v(r.f("char", e, t, 0)));
r.b("</dt>");
r.b("\n" + n);
r.b(" <dd>");
r.b("\n" + n);
r.b("   <ul>");
r.b("\n" + n);
if (r.s(r.f("listfuzzy", e, t, 1), e, t, 0, 1102, 1219, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b('       <li><a class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
);
e.pop()
}
r.b("   </ul>");
r.b("\n" + n);
r.b(" </dd>");
r.b("\n" + n);
r.b("</dl>");
r.b("\n")
}
);
e.pop()
}
}
);
e.pop()
}
}
);
e.pop()
}
r.b("\n" + n);
if (!r.s(r.f("charSort", e, t, 1), e, t, 1, 0, 0, "")) {
r.b("<ul>");
r.b("\n" + n);
if (r.s(r.f("cityList", e, t, 1), e, t, 0, 1326, 1434, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b(' <li><a class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
);
e.pop()
}
r.b("</ul>");
r.b("\n")
}
r.b("\n" + n);
r.b("\n" + n);
if (r.s(r.f("fuzzyArea", e, t, 1), e, t, 0, 1484, 1636, "{{ }}")) {
r.rs(e, t, function(e, t, r) {
r.b("<ul>");
r.b("\n" + n);
if (r.s(r.f("countryList", e, t, 1), e, t, 0, 1506, 1613, "{{ }}")) {
r.rs(e, t, function(e, t, n) {
n.b(' <li><a class="js-hotcitylist" data-country="');
n.b(n.v(n.f("country", e, t, 0)));
n.b('" data-code="');
n.b(n.v(n.f("code", e, t, 0)));
n.b('" href="#">');
n.b(n.v(n.f("name", e, t, 0)));
n.b("</a></li>");
n.b("\n")
}
);
e.pop()
}
r.b("</ul>");
r.b("\n")
}
);
e.pop()
}
return r.fl();
}
);
if (typeof t !== "undefined")
t.exports = window.QTMPL["FlightHotCityList"]
}
(t.exports, t, e);
e.____MODULES["b63e59968d1a60041e5c1b3e860c4ec8"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "d3b78f6fa0b1d36c6f22536ea2364ffa",
filename: "FlightCityHistory.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
t.exports = function(e) {
function r(e, t) {
e = e == null  ? "" : e + "";
for (var n = 0, r = t - e.length; n < r; n++)
e = "0" + e;
return e
}
function s(e) {
var r = window.QunarHistory.data.flight;
t.length = 0;
if (e.type == "domesticfrom") {
n = r.domesticFlightList.slice(1, 4)
} else if (e.type == "interfrom") {
n = r.interFlightList.slice(1, 4)
}
for (var i = 0; i < n.length; i++) {
var s = {
fcity: "",
tcity: "",
fcity_abbr: "",
tcity_abbr: ""
};
var o = n[i].fromCity
, u = n[i].toCity;
s.fcity = o;
s.tcity = u;
var a = o.indexOf("(") == -1 ? o : o.substring(0, o.indexOf("("));
var f = u.indexOf("(") == -1 ? u : u.substring(0, u.indexOf("("));
s.fcity_abbr = a.length > 5 ? a.slice(0, 4) + ".." : a;
s.tcity_abbr = f.length > 5 ? f.slice(0, 4) + ".." : f;
t.push(s)
}
}
function o() {
return t
}
function u() {
var e;
if (t.length != 0) {
e = 1
}
return e
}
var t = []
, n = [];
var i = function(e) {
return e.getFullYear() + "-" + r(e.getMonth() + 1, 2) + "-" + r(e.getDate(), 2)
}
;
return {
init: s,
cityHistory: o,
hisLength: u
}
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["d3b78f6fa0b1d36c6f22536ea2364ffa"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "71e5d69c16744437dce3276233aab626",
filename: "FlightSearchBox.conf.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
t.exports = {
hotCity: {
domesticfromtj: [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "特价国际"
}],
domesticfrom: [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "国际·港澳台"
}],
"domesticto-tj": [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "特价国际"
}],
domesticto: [{
title: "国内热门",
key: "domesticto"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "国际·港澳台"
}],
interfrom: [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "国际·港澳台"
}],
interto: [{
title: "国际·港澳台",
key: "国际·港澳台-to"
}, {
title: "亚洲/大洋洲",
key: "亚洲/大洋洲"
}, {
title: "美洲",
key: "美洲"
}, {
title: "欧洲",
key: "欧洲"
}, {
title: "非洲",
key: "非洲"
}, {
title: "国内热门",
key: "domesticto"
}],
"interfrom-tj": [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "特价国际"
}],
"interto-tj": [{
title: "国际·港澳台",
key: "特价国际"
}, {
title: "亚洲/大洋洲",
key: "m亚洲/大洋洲"
}, {
title: "美洲",
key: "m美洲"
}, {
title: "欧洲",
key: "m欧洲"
}, {
title: "非洲",
key: "m非洲"
}, {
title: "国内热门",
key: "domesticfrom"
}],
multifrom: [{
title: "国内热门",
key: "domesticfrom"
}, {
title: "ABCDE",
key: "ABCDE"
}, {
title: "FGHJ",
key: "FGHJ"
}, {
title: "KLMNP",
key: "KLMNP"
}, {
title: "QRSTW",
key: "QRSTW"
}, {
title: "XYZ",
key: "XYZ"
}, {
title: "国际·港澳台",
key: "特价国际"
}],
multito: [{
title: "国际·港澳台",
key: "特价国际"
}, {
title: "亚洲/大洋洲",
key: "m亚洲/大洋洲"
}, {
title: "美洲",
key: "m美洲"
}, {
title: "欧洲",
key: "m欧洲"
}, {
title: "非洲",
key: "m非洲"
}, {
title: "国内",
key: "domesticfrom"
}],
data: {
domesticfrom: {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "上海",
country: "中国",
code: "SHA"
}, {
name: "北京",
country: "中国",
code: "BJS"
}, {
name: "广州",
country: "中国",
code: "CAN"
}, {
name: "昆明",
country: "中国",
code: "KMG"
}, {
name: "深圳",
country: "中国",
code: "SZX"
}, {
name: "成都",
country: "中国",
code: "CTU"
}, {
name: "杭州",
country: "中国",
code: "HGH"
}, {
name: "厦门",
country: "中国",
code: "XMN"
}, {
name: "天津",
country: "中国",
code: "TSN"
}, {
name: "青岛",
country: "中国",
code: "TAO"
}, {
name: "重庆",
country: "中国",
code: "CKG"
}, {
name: "南京",
country: "中国",
code: "NKG"
}, {
name: "沈阳",
country: "中国",
code: "SHE"
}, {
name: "西安",
country: "中国",
code: "SIA"
}, {
name: "福州",
country: "中国",
code: "FOC"
}, {
name: "武汉",
country: "中国",
code: "WUH"
}, {
name: "大连",
country: "中国",
code: "DLC"
}, {
name: "宁波",
country: "中国",
code: "NGB"
}, {
name: "长沙",
country: "中国",
code: "CSX"
}, {
name: "海口",
country: "中国",
code: "HAK"
}, {
name: "郑州",
country: "中国",
code: "CGO"
}, {
name: "南宁",
country: "中国",
code: "NNG"
}, {
name: "长春",
country: "中国",
code: "CGQ"
}, {
name: "济南",
country: "中国",
code: "TNA"
}, {
name: "温州",
country: "中国",
code: "WNZ"
}, {
name: "哈尔滨",
country: "中国",
code: "HRB"
}, {
name: "乌鲁木齐",
country: "中国",
code: "URC"
}, {
name: "晋江",
country: "中国",
code: "JJN"
}, {
name: "延吉",
country: "中国",
code: "YNJ"
}, {
name: "贵阳",
country: "中国",
code: "KWE"
}]
}],
title: "热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
domesticto: {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "上海",
country: "中国",
code: "SHA"
}, {
name: "北京",
country: "中国",
code: "BJS"
}, {
name: "广州",
country: "中国",
code: "CAN"
}, {
name: "昆明",
country: "中国",
code: "KMG"
}, {
name: "西安",
country: "中国",
code: "SIA"
}, {
name: "成都",
country: "中国",
code: "CTU"
}, {
name: "深圳",
country: "中国",
code: "SZX"
}, {
name: "厦门",
country: "中国",
code: "XMN"
}, {
name: "乌鲁木齐",
country: "中国",
code: "URC"
}, {
name: "南京",
country: "中国",
code: "NKG"
}, {
name: "重庆",
country: "中国",
code: "CKG"
}, {
name: "杭州",
country: "中国",
code: "HGH"
}, {
name: "大连",
country: "中国",
code: "DLC"
}, {
name: "长沙",
country: "中国",
code: "CSX"
}, {
name: "海口",
country: "中国",
code: "HAK"
}, {
name: "哈尔滨",
country: "中国",
code: "HRB"
}, {
name: "青岛",
country: "中国",
code: "TAO"
}, {
name: "沈阳",
country: "中国",
code: "SHE"
}, {
name: "三亚",
country: "中国",
code: "SYX"
}, {
name: "济南",
country: "中国",
code: "TNA"
}, {
name: "武汉",
country: "中国",
code: "WUH"
}, {
name: "郑州",
country: "中国",
code: "CGO"
}, {
name: "贵阳",
country: "中国",
code: "KWE"
}, {
name: "南宁",
country: "中国",
code: "NNG"
}, {
name: "福州",
country: "中国",
code: "FOC"
}, {
name: "天津",
country: "中国",
code: "TSN"
}, {
name: "长春",
country: "中国",
code: "CGO"
}, {
name: "太原",
country: "中国",
code: "TYN"
}, {
name: "南昌",
country: "中国",
code: "KHN"
}, {
name: "丽江",
country: "中国",
code: "LJG"
}]
}],
fuzzy: true,
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "华北",
country: "中国"
}, {
name: "华南",
country: "中国"
}, {
name: "东北",
country: "中国"
}, {
name: "华东",
country: "中国"
}, {
name: "华中",
country: "中国"
}, {
name: "西南",
country: "中国"
}, {
name: "西北",
country: "中国"
}]
}],
title: "热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
interfrom: {
cityList: [{
name: "上海",
country: "中国",
code: "SHA"
}, {
name: "北京",
country: "中国",
code: "BJS"
}, {
name: "广州",
country: "中国",
code: "CAN"
}, {
name: "昆明",
country: "中国",
code: "KMG"
}, {
name: "西安",
country: "中国",
code: "SIA"
}, {
name: "成都",
country: "中国",
code: "CTU"
}, {
name: "深圳",
country: "中国",
code: "SZX"
}, {
name: "厦门",
country: "中国",
code: "XMN"
}, {
name: "乌鲁木齐",
country: "中国",
code: "URC"
}, {
name: "南京",
country: "中国",
code: "NKG"
}, {
name: "重庆",
country: "中国",
code: "CKG"
}, {
name: "杭州",
country: "中国",
code: "HGH"
}, {
name: "大连",
country: "中国",
code: "DLC"
}, {
name: "长沙",
country: "中国",
code: "CSX"
}, {
name: "海口",
country: "中国",
code: "HAK"
}, {
name: "哈尔滨",
country: "中国",
code: "HRB"
}, {
name: "青岛",
country: "中国",
code: "TAO"
}, {
name: "沈阳",
country: "中国",
code: "SHE"
}, {
name: "三亚",
country: "中国",
code: "SYX"
}, {
name: "济南",
country: "中国",
code: "TNA"
}, {
name: "武汉",
country: "中国",
code: "WUH"
}, {
name: "郑州",
country: "中国",
code: "CGO"
}, {
name: "贵阳",
country: "中国",
code: "KWE"
}, {
name: "南宁",
country: "中国",
code: "NNG"
}, {
name: "福州",
country: "中国",
code: "FOC"
}, {
name: "天津",
country: "中国",
code: "TSN"
}, {
name: "长春",
country: "中国",
code: "CGQ"
}, {
name: "太原",
country: "中国",
code: "TYN"
}, {
name: "南昌",
country: "中国",
code: "KHN"
}, {
name: "丽江",
country: "中国",
code: "LJG"
}],
title: "热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
ABCDE: {
charSort: true,
cityList: [{
"char": "A",
list: [{
name: "阿里",
country: "中国",
code: "NGQ"
}, {
name: "阿尔山",
country: "中国",
code: "YIE"
}, {
name: "安庆",
country: "中国",
code: "AQG"
}, {
name: "阿勒泰",
country: "中国",
code: "AAT"
}, {
name: "安康",
country: "中国",
code: "AKA"
}, {
name: "鞍山",
country: "中国",
code: "AOG"
}, {
name: "安顺",
country: "中国",
code: "AVA"
}, {
name: "阿克苏",
country: "中国",
code: "AKU"
}, {
name: "阿拉善左旗",
country: "中国",
code: "AXF"
}, {
name: "阿拉善右旗",
country: "中国",
code: "RHT"
}]
}, {
"char": "B",
list: [{
name: "包头",
country: "中国",
code: "BAV"
}, {
name: "北海",
country: "中国",
code: "BHY"
}, {
name: "北京",
country: "中国",
code: "BJS"
}, {
name: "百色",
country: "中国",
code: "AEB"
}, {
name: "保山",
country: "中国",
code: "BSD"
}, {
name: "博乐",
country: "中国",
code: "BPL"
}, {
name: "毕节",
country: "中国",
code: "BFJ"
}, {
name: "巴彦淖尔",
country: "中国",
code: "RLK"
}]
}, {
"char": "C",
list: [{
name: "长治",
country: "中国",
code: "CSX"
}, {
name: "池州",
country: "中国",
code: "JUH"
}, {
name: "长春",
country: "中国",
code: "CGQ"
}, {
name: "常州",
country: "中国",
code: "CZX"
}, {
name: "昌都",
country: "中国",
code: "BPX"
}, {
name: "朝阳",
country: "中国",
code: "CHG"
}, {
name: "常德",
country: "中国",
code: "CGD"
}, {
name: "长白山",
country: "中国",
code: "NBS"
}, {
name: "成都",
country: "中国",
code: "CTU"
}, {
name: "重庆",
country: "中国",
code: "CKG"
}, {
name: "长沙",
country: "中国",
code: "CSX"
}, {
name: "赤峰",
country: "中国",
code: "CIF"
}]
}, {
"char": "D",
list: [{
name: "大同",
country: "中国",
code: "DAT"
}, {
name: "大连",
country: "中国",
code: "DLC"
}, {
name: "东营",
country: "中国",
code: "DOY"
}, {
name: "大庆",
country: "中国",
code: "DQA"
}, {
name: "丹东",
country: "中国",
code: "DDG"
}, {
name: "大理",
country: "中国",
code: "DLU"
}, {
name: "敦煌",
country: "中国",
code: "DNH"
}, {
name: "达州",
country: "中国",
code: "DAX"
}, {
name: "稻城",
country: "中国",
code: "DCY"
}]
}, {
"char": "E",
list: [{
name: "恩施",
country: "中国",
code: "ENH"
}, {
name: "鄂尔多斯",
country: "中国",
code: "DSN"
}, {
name: "二连浩特",
country: "中国",
code: "ERL"
}, {
name: "额济纳旗",
country: "中国",
code: "EJN"
}]
}],
title: "拼音A-E城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
FGHJ: {
charSort: true,
cityList: [{
"char": "F",
list: [{
name: "佛山",
country: "中国",
code: "FUO"
}, {
name: "福州",
country: "中国",
code: "FOC"
}, {
name: "阜阳",
country: "中国",
code: "FUG"
}, {
name: "抚远",
country: "中国",
code: "FYJ"
}]
}, {
"char": "G",
list: [{
name: "贵阳",
country: "中国",
code: "KWE"
}, {
name: "桂林",
country: "中国",
code: "KWL"
}, {
name: "广州",
country: "中国",
code: "CAN"
}, {
name: "广元",
country: "中国",
code: "GYS"
}, {
name: "格尔木",
country: "中国",
code: "GOQ"
}, {
name: "赣州",
country: "中国",
code: "KOW"
}, {
name: "固原",
country: "中国",
code: "GYU"
}]
}, {
"char": "H",
list: [{
name: "哈密",
country: "中国",
code: "HMI"
}, {
name: "呼和浩特",
country: "中国",
code: "HET"
}, {
name: "黑河",
country: "中国",
code: "HEK"
}, {
name: "海拉尔",
country: "中国",
code: "HLD"
}, {
name: "哈尔滨",
country: "中国",
code: "HRB"
}, {
name: "海口",
country: "中国",
code: "HAK"
}, {
name: "黄山",
country: "中国",
code: "TXN"
}, {
name: "杭州",
country: "中国",
code: "HGH"
}, {
name: "邯郸",
country: "中国",
code: "HDG"
}, {
name: "合肥",
country: "中国",
code: "HFE"
}, {
name: "黄龙",
country: "中国",
code: "JZH"
}, {
name: "汉中",
country: "中国",
code: "HZG"
}, {
name: "和田",
country: "中国",
code: "HTN"
}, {
name: "淮安",
country: "中国",
code: "HIA"
}]
}, {
"char": "J",
list: [{
name: "鸡西",
country: "中国",
code: "JXA"
}, {
name: "晋江",
country: "中国",
code: "JJN"
}, {
name: "锦州",
country: "中国",
code: "JNZ"
}, {
name: "景德镇",
country: "中国",
code: "JDZ"
}, {
name: "嘉峪关",
country: "中国",
code: "JGN"
}, {
name: "井冈山",
country: "中国",
code: "JGS"
}, {
name: "济宁",
country: "中国",
code: "JNG"
}, {
name: "九江",
country: "中国",
code: "JIU"
}, {
name: "佳木斯",
country: "中国",
code: "JMU"
}, {
name: "济南",
country: "中国",
code: "TNA"
}, {
name: "加格达奇",
country: "中国",
code: "JGD"
}, {
name: "金昌",
country: "中国",
code: "JIC"
}, {
name: "揭阳",
country: "中国",
code: "SWA"
}]
}],
title: "拼音F-J城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
KLMNP: {
charSort: true,
cityList: [{
"char": "K",
list: [{
name: "喀什",
country: "中国",
code: "KHG"
}, {
name: "昆明",
country: "中国",
code: "KMG"
}, {
name: "康定",
country: "中国",
code: "KGT"
}, {
name: "克拉玛依",
country: "中国",
code: "KRY"
}, {
name: "库尔勒",
country: "中国",
code: "KRL"
}, {
name: "库车",
country: "中国",
code: "KCA"
}, {
name: "喀纳斯",
country: "中国",
code: "KJI"
}, {
name: "凯里",
country: "中国",
code: "KJH"
}]
}, {
"char": "L",
list: [{
name: "兰州",
country: "中国",
code: "LHW"
}, {
name: "洛阳",
country: "中国",
code: "LYA"
}, {
name: "丽江",
country: "中国",
code: "LJG"
}, {
name: "荔波",
country: "中国",
code: "LLB"
}, {
name: "林芝",
country: "中国",
code: "LZY"
}, {
name: "柳州",
country: "中国",
code: "LZH"
}, {
name: "泸州",
country: "中国",
code: "LZO"
}, {
name: "连云港",
country: "中国",
code: "LYG"
}, {
name: "黎平",
country: "中国",
code: "HZH"
}, {
name: "连城",
country: "中国",
code: "LCX"
}, {
name: "拉萨",
country: "中国",
code: "LXA"
}, {
name: "临沧",
country: "中国",
code: "LNJ"
}, {
name: "临沂",
country: "中国",
code: "LYI"
}, {
name: "吕梁",
country: "中国",
code: "LLV"
}]
}, {
"char": "M",
list: [{
name: "芒市",
country: "中国",
code: "LUM"
}, {
name: "牡丹江",
country: "中国",
code: "MDG"
}, {
name: "满洲里",
country: "中国",
code: "NZH"
}, {
name: "绵阳",
country: "中国",
code: "MIG"
}, {
name: "梅县",
country: "中国",
code: "MXZ"
}, {
name: "漠河",
country: "中国",
code: "OHE"
}]
}, {
"char": "N",
list: [{
name: "南京",
country: "中国",
code: "NKG"
}, {
name: "南充",
country: "中国",
code: "NAO"
}, {
name: "南宁",
country: "中国",
code: "NNG"
}, {
name: "南阳",
country: "中国",
code: "NNY"
}, {
name: "南通",
country: "中国",
code: "NTG"
}, {
name: "南昌",
country: "中国",
code: "KHN"
}, {
name: "那拉提",
country: "中国",
code: "NLT"
}, {
name: "宁波",
country: "中国",
code: "NGB"
}]
}, {
"char": "P",
list: [{
name: "攀枝花",
country: "中国",
code: "PZI"
}, {
name: "普洱",
country: "中国",
code: "SYM"
}]
}],
title: "拼音K-P城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
QRSTW: {
charSort: true,
cityList: [{
"char": "Q",
list: [{
name: "衢州",
country: "中国",
code: "JUZ"
}, {
name: "黔江",
country: "中国",
code: "JIQ"
}, {
name: "秦皇岛",
country: "中国",
code: "SHP"
}, {
name: "庆阳",
country: "中国",
code: "IQN"
}, {
name: "且末",
country: "中国",
code: "IQM"
}, {
name: "齐齐哈尔",
country: "中国",
code: "NDG"
}, {
name: "青岛",
country: "中国",
code: "TAO"
}]
}, {
"char": "R",
list: [{
name: "日喀则",
country: "中国",
code: "RKZ"
}]
}, {
"char": "S",
list: [{
name: "深圳",
country: "中国",
code: "SZX"
}, {
name: "石家庄",
country: "中国",
code: "SJW"
}, {
name: "三亚",
country: "中国",
code: "SYX"
}, {
name: "沈阳",
country: "中国",
code: "SHE"
}, {
name: "上海",
country: "中国",
code: "SHA"
}, {
name: "神农架",
country: "中国",
code: "HPG"
}]
}, {
"char": "T",
list: [{
name: "唐山",
country: "中国",
code: "TVS"
}, {
name: "铜仁",
country: "中国",
code: "TEN"
}, {
name: "塔城",
country: "中国",
code: "TCG"
}, {
name: "腾冲",
country: "中国",
code: "TCZ"
}, {
name: "台州",
country: "中国",
code: "HYN"
}, {
name: "天水",
country: "中国",
code: "THQ"
}, {
name: "天津",
country: "中国",
code: "TSN"
}, {
name: "通辽",
country: "中国",
code: "TGO"
}, {
name: "吐鲁番",
country: "中国",
code: "TLQ"
}, {
name: "太原",
country: "中国",
code: "TYN"
}]
}, {
"char": "W",
list: [{
name: "威海",
country: "中国",
code: "WEH"
}, {
name: "武汉",
country: "中国",
code: "WUH"
}, {
name: "梧州",
country: "中国",
code: "WUZ"
}, {
name: "文山",
country: "中国",
code: "WNH"
}, {
name: "无锡",
country: "中国",
code: "WUX"
}, {
name: "潍坊",
country: "中国",
code: "WEF"
}, {
name: "武夷山",
country: "中国",
code: "WUS"
}, {
name: "乌兰浩特",
country: "中国",
code: "HLH"
}, {
name: "温州",
country: "中国",
code: "WNZ"
}, {
name: "乌鲁木齐",
country: "中国",
code: "URC"
}, {
name: "万州",
country: "中国",
code: "WXN"
}, {
name: "乌海",
country: "中国",
code: "WUA"
}]
}],
title: "拼音Q-W城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
XYZ: {
charSort: true,
cityList: [{
"char": "X",
list: [{
name: "兴义",
country: "中国",
code: "ACX"
}, {
name: "西昌",
country: "中国",
code: "XIC"
}, {
name: "厦门",
country: "中国",
code: "XMN"
}, {
name: "香格里拉",
country: "中国",
code: "DIG"
}, {
name: "西安",
country: "中国",
code: "SIA"
}, {
name: "西宁",
country: "中国",
code: "XNN"
}, {
name: "襄阳(中国)",
country: "中国",
code: "XFN"
}, {
name: "锡林浩特",
country: "中国",
code: "XIL"
}, {
name: "西双版纳",
country: "中国",
code: "JHG"
}, {
name: "徐州",
country: "中国",
code: "XUZ"
}]
}, {
"char": "Y",
list: [{
name: "义乌",
country: "中国",
code: "YIW"
}, {
name: "永州",
country: "中国",
code: "LLF"
}, {
name: "榆林",
country: "中国",
code: "UYN"
}, {
name: "扬州",
country: "中国",
code: "YTY"
}, {
name: "延安",
country: "中国",
code: "ENY"
}, {
name: "运城",
country: "中国",
code: "YCU"
}, {
name: "烟台",
country: "中国",
code: "YNT"
}, {
name: "银川",
country: "中国",
code: "INC"
}, {
name: "宜昌",
country: "中国",
code: "YIH"
}, {
name: "宜宾",
country: "中国",
code: "YBP"
}, {
name: "宜春",
country: "中国",
code: "YIC"
}, {
name: "盐城",
country: "中国",
code: "YNZ"
}, {
name: "延吉",
country: "中国",
code: "YNJ"
}, {
name: "玉树",
country: "中国",
code: "YUS"
}, {
name: "伊宁",
country: "中国",
code: "YIN"
}, {
name: "伊春",
country: "中国",
code: "LDS"
}]
}, {
"char": "Z",
list: [{
name: "珠海",
country: "中国",
code: "ZUH"
}, {
name: "昭通",
country: "中国",
code: "ZAT"
}, {
name: "张家界",
country: "中国",
code: "DYG"
}, {
name: "舟山",
country: "中国",
code: "HSN"
}, {
name: "郑州",
country: "中国",
code: "CGO"
}, {
name: "中卫",
country: "中国",
code: "ZHY"
}, {
name: "芷江",
country: "中国",
code: "HJJ"
}, {
name: "湛江",
country: "中国",
code: "ZHA"
}, {
name: "遵义",
country: "中国",
code: "ZYI"
}, {
name: "张掖",
country: "中国",
code: "YZY"
}, {
name: "张家口",
country: "中国",
code: "ZQZ"
}]
}],
title: "拼音X-Z城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
},
"国际·港澳台": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "清迈",
country: "泰国",
code: "CNX"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "巴黎",
country: "法国",
code: "PAR"
}, {
name: "槟城",
country: "马来西亚",
code: "PEN"
}, {
name: "多伦多",
country: "加拿大",
code: "YTO"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "法兰克福",
country: "德国",
code: "FRA"
}]
}],
fuzzy_c: true,
fuzzy: true,
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "中国",
country: "中国",
code: "CN"
}, {
name: "韩国",
country: "韩国",
code: "KR"
}, {
name: "泰国",
country: "泰国",
code: "TH"
}, {
name: "美国",
country: "美国",
code: "US"
}, {
name: "加拿大",
country: "加拿大",
code: "CA"
}, {
name: "日本",
country: "日本",
code: "JP"
}, {
name: "澳大利亚",
country: "澳大利亚",
code: "AU"
}, {
name: "英国",
country: "英国",
code: "GB"
}, {
name: "法国",
country: "法国",
code: "FR"
}, {
name: "马来西亚",
country: "马来西亚",
code: "MY"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "东南亚",
country: "东南亚"
}, {
name: "港澳台",
country: "港澳台"
}, {
name: "日韩",
country: "日韩"
}, {
name: "欧洲",
country: "欧洲"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "热门国际城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"国际·港澳台-to": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "清迈",
country: "泰国",
code: "CNX"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "巴黎",
country: "法国",
code: "PAR"
}, {
name: "槟城",
country: "马来西亚",
code: "PEN"
}, {
name: "多伦多",
country: "加拿大",
code: "YTO"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "法兰克福",
country: "德国",
code: "FRA"
}]
}],
fuzzy_c: true,
fuzzy: true,
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "中国",
country: "中国",
code: "CN"
}, {
name: "韩国",
country: "韩国",
code: "KR"
}, {
name: "泰国",
country: "泰国",
code: "TH"
}, {
name: "美国",
country: "美国",
code: "US"
}, {
name: "加拿大",
country: "加拿大",
code: "CA"
}, {
name: "日本",
country: "日本",
code: "JP"
}, {
name: "澳大利亚",
country: "澳大利亚",
code: "AU"
}, {
name: "英国",
country: "英国",
code: "GB"
}, {
name: "法国",
country: "法国",
code: "FR"
}, {
name: "马来西亚",
country: "马来西亚",
code: "MY"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "东南亚",
country: "东南亚"
}, {
name: "港澳台",
country: "港澳台"
}, {
name: "日韩",
country: "日韩"
}, {
name: "欧洲",
country: "欧洲"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "热门国际城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"特价国际": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "清迈",
country: "泰国",
code: "CNX"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "巴黎",
country: "法国",
code: "PAR"
}, {
name: "槟城",
country: "马来西亚",
code: "PEN"
}, {
name: "多伦多",
country: "加拿大",
code: "YTO"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "法兰克福",
country: "德国",
code: "FRA"
}]
}],
title: "热门国际城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"热门城市和国家": {
fuzzyArea: true,
cityList: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "巴厘岛",
country: "印度尼西亚",
code: "DPS"
}, {
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "苏梅岛",
country: "泰国",
code: "USM"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "清迈",
country: "泰国",
code: "CNX"
}, {
name: "加德满都",
country: "尼泊尔",
code: "KTM"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "迪拜",
country: "阿拉伯联合酋长国",
code: "DXB"
}],
countryList: [{
name: "中国",
country: "中国",
code: "CN"
}, {
name: "韩国",
country: "韩国",
code: "KR"
}, {
name: "泰国",
country: "泰国",
code: "TH"
}, {
name: "美国",
country: "美国",
code: "US"
}, {
name: "加拿大",
country: "加拿大",
code: "CA"
}, {
name: "日本",
country: "日本",
code: "JP"
}, {
name: "澳大利亚",
country: "澳大利亚",
code: "AU"
}, {
name: "英国",
country: "英国",
code: "GB"
}, {
name: "法国",
country: "法国",
code: "FR"
}, {
name: "马来西亚",
country: "马来西亚",
code: "MY"
}],
title: "热门城市和国家",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"亚洲/大洋洲": {
charSort: true,
fuzzy_c: true,
fuzzy: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "巴厘岛",
country: "印度尼西亚",
code: "DPS"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "河内",
country: "越南",
code: "HAN"
}, {
name: "加德满都",
country: "尼泊尔",
code: "KTM"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "马累",
country: "马尔代夫",
code: "MLE"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "迪拜",
country: "阿拉伯联合酋长国",
code: "DXB"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "名古屋",
country: "日本",
code: "NGO"
}, {
name: "奥克兰",
country: "新西兰",
code: "AKL"
}, {
name: "布里斯班",
country: "澳大利亚",
code: "BNE"
}, {
name: "槟城",
country: "马来西亚",
code: "PEN"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "新德里",
country: "印度",
code: "DEL"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}]
}],
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "新加坡",
country: "新加坡",
code: "SG"
}, {
name: "韩国",
country: "韩国",
code: "KR"
}, {
name: "泰国",
country: "泰国",
code: "TH"
}, {
name: "马来西亚",
country: "马来西亚",
code: "MY"
}, {
name: "日本",
country: "日本",
code: "JP"
}, {
name: "澳大利亚",
country: "澳大利亚",
code: "AU"
}, {
name: "越南",
country: "越南",
code: "VN"
}, {
name: "印度尼西亚",
country: "印度尼西亚",
code: "IN"
}, {
name: "菲律宾",
country: "菲律宾",
code: "PH"
}, {
name: "尼泊尔",
country: "尼泊尔",
code: "NP"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "港澳台",
country: "港澳台"
}, {
name: "日韩",
country: "日韩"
}, {
name: "新马泰",
country: "新马泰"
}, {
name: "澳新",
country: "澳新"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "亚洲/大洋洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"美洲": {
charSort: true,
fuzzy_c: true,
fuzzy: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "多伦多",
country: "加拿大",
code: "YTO"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "芝加哥",
country: "美国",
code: "CHI"
}, {
name: "华盛顿",
country: "美国",
code: "WAS"
}, {
name: "西雅图",
country: "美国",
code: "SEA"
}, {
name: "波士顿",
country: "美国",
code: "BOS"
}, {
name: "底特律",
country: "美国",
code: "DTT"
}, {
name: "亚特兰大",
country: "美国",
code: "ATL"
}, {
name: "蒙特利尔",
country: "加拿大",
code: "YMQ"
}, {
name: "休斯敦",
country: "美国",
code: "HOU"
}, {
name: "火奴鲁鲁",
country: "美国",
code: "HNL"
}, {
name: "达拉斯",
country: "美国",
code: "DFW"
}, {
name: "拉斯维加斯",
country: "美国",
code: "LAS"
}, {
name: "费城",
country: "美国",
code: "PHI"
}, {
titles: "圣保罗（巴西）",
name: "圣保罗",
country: "巴西",
code: "SAO"
}, {
name: "明尼阿波利斯",
country: "美国",
code: "MSP"
}, {
name: "渥太华",
country: "加拿大",
code: "YOW"
}, {
name: "凤凰城",
country: "美国",
code: "PHX"
}, {
name: "墨西哥城",
country: "墨西哥",
code: "MEX"
}, {
name: "迈阿密",
country: "美国",
code: "MIA"
}, {
name: "丹佛",
country: "美国",
code: "DEN"
}, {
name: "奥兰多",
country: "美国",
code: "ORL"
}, {
name: "卡尔加里",
country: "加拿大",
code: "YYC"
}, {
name: "埃德蒙顿",
country: "加拿大",
code: "YEA"
}, {
name: "布宜诺斯艾利斯",
country: "阿根廷",
code: "BUE"
}, {
name: "里约热内卢",
country: "巴西",
code: "RIO"
}, {
name: "匹兹堡",
country: "美国",
code: "PIT"
}]
}],
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "美国",
country: "美国",
code: "US"
}, {
name: "加拿大",
country: "加拿大",
code: "CA"
}, {
name: "巴西",
country: "巴西",
code: "BR"
}, {
name: "墨西哥",
country: "墨西哥",
code: "MX"
}, {
name: "阿根廷",
country: "阿根廷",
code: "AR"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "美国东海岸",
country: "美国东海岸"
}, {
name: "美国西部",
country: "美国西部"
}, {
name: "北美五大湖",
country: "北美五大湖"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "美洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"欧洲": {
charSort: true,
fuzzy_c: true,
fuzzy: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "巴黎",
country: "法国",
code: "PAR"
}, {
name: "法兰克福",
country: "德国",
code: "FRA"
}, {
name: "莫斯科",
country: "俄罗斯",
code: "MOS"
}, {
name: "阿姆斯特丹",
country: "荷兰",
code: "AMS"
}, {
titles: "罗马（意大利）",
name: "罗马",
country: "意大利",
code: "ROM"
}, {
name: "米兰",
country: "意大利",
code: "MIL"
}, {
name: "马德里",
country: "西班牙",
code: "MAD"
}, {
name: "慕尼黑",
country: "德国",
code: "MUC"
}, {
name: "柏林",
country: "德国",
code: "BER"
}, {
name: "斯德哥尔摩",
country: "瑞典",
code: "STO"
}, {
name: "伊斯坦布尔",
country: "土耳其",
code: "IST"
}, {
titles: "伯明翰（英国）",
name: "伯明翰",
country: "英国",
code: "BHX"
}, {
titles: "巴塞罗那(西班牙)",
name: "巴塞罗那",
country: "西班牙",
code: "BCN"
}, {
name: "雅典",
country: "希腊",
code: "ATH"
}, {
name: "哥本哈根",
country: "丹麦",
code: "CPH"
}, {
name: "苏黎世",
country: "瑞士",
code: "ZRH"
}, {
name: "布鲁塞尔",
country: "比利时",
code: "BRU"
}, {
name: "赫尔辛基",
country: "芬兰",
code: "HEL"
}, {
name: "爱丁堡",
country: "英国",
code: "EDI"
}, {
name: "维也纳",
country: "奥地利",
code: "VIE"
}, {
titles: "格拉斯哥（英国）",
name: "格拉斯哥",
country: "英国",
code: "GLA"
}, {
name: "日内瓦",
country: "瑞士",
code: "GVA"
}, {
name: "圣彼得堡",
country: "俄罗斯",
code: "LED"
}, {
titles: "都柏林(爱尔兰)",
name: "都柏林",
country: "爱尔兰",
code: "DUB"
}, {
name: "汉堡",
country: "德国",
code: "HAM"
}, {
name: "杜塞尔多夫",
country: "德国",
code: "DUS"
}, {
name: "布拉格",
country: "捷克",
code: "PRG"
}, {
name: "布达佩斯",
country: "匈牙利",
code: "BUD"
}, {
name: "基辅",
country: "乌克兰",
code: "IEV"
}]
}],
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "英国",
country: "英国",
code: "GB"
}, {
name: "法国",
country: "法国",
code: "FR"
}, {
name: "俄罗斯",
country: "俄罗斯",
code: "RU"
}, {
name: "荷兰",
country: "荷兰",
code: "NL"
}, {
name: "意大利",
country: "意大利",
code: "IT"
}, {
name: "西班牙",
country: "西班牙",
code: "ES"
}, {
name: "德国",
country: "德国",
code: "DE"
}, {
name: "瑞典",
country: "瑞典",
code: "SE"
}, {
name: "土耳其",
country: "土耳其",
code: "TR"
}, {
name: "希腊",
country: "希腊",
code: "GR"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
listfuzzy: [{
name: "西欧",
country: "西欧"
}, {
name: "北欧",
country: "北欧"
}, {
name: "中东欧",
country: "中东欧"
}, {
name: "南欧",
country: "南欧"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "欧洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"非洲": {
charSort: true,
fuzzy_c: true,
fuzzy: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "开罗",
country: "埃及",
code: "CAI"
}, {
name: "约翰内斯堡",
country: "南非",
code: "JNB"
}, {
name: "内罗毕",
country: "肯尼亚",
code: "NBO"
}, {
name: "开普敦",
country: "南非",
code: "CPT"
}, {
name: "毛里求斯",
country: "毛里求斯",
code: "MRU"
}, {
name: "拉各斯",
country: "尼日利亚",
code: "LOS"
}, {
name: "喀土穆",
country: "苏丹",
code: "KRT"
}, {
name: "亚的斯亚贝巴",
country: "埃塞俄比亚",
code: "ADD"
}, {
name: "阿克拉",
country: "加纳",
code: "ACC"
}, {
name: "达累斯萨拉姆",
country: "坦桑尼亚",
code: "DAR"
}, {
name: "塞舌尔",
country: "塞舌尔共和国",
code: "SEZ"
}, {
name: "阿尔及尔",
country: "阿尔及利亚",
code: "ALG"
}, {
name: "的黎波里",
country: "利比亚",
code: "TIP"
}, {
name: "阿布贾",
country: "尼日利亚",
code: "ABV"
}, {
name: "卡萨布兰卡",
country: "摩洛哥",
code: "CAS"
}, {
name: "突尼斯",
country: "突尼斯",
code: "TUN"
}]
}],
countryList: [{
"char": "国家",
clshct: true,
listCountry: [{
name: "埃及",
country: "埃及",
code: "EG"
}, {
name: "南非",
country: "南非",
code: "ZA"
}, {
name: "肯尼亚",
country: "肯尼亚",
code: "KE"
}, {
name: "尼日利亚",
country: "尼日利亚",
code: "NG"
}, {
name: "埃塞俄比亚",
country: "埃塞俄比亚",
code: "ET"
}]
}],
hotword: [{
"char": "热词",
clshct: true,
clshct: true,
listfuzzy: [{
name: "非洲南部",
country: "非洲南部"
}, {
name: "北非",
country: "北非"
}, {
name: "东非",
country: "东非"
}, {
name: "所有地点",
country: "所有地点"
}]
}],
title: "非洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"m亚洲/大洋洲": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "香港",
country: "中国香港",
code: "HKG"
}, {
name: "新加坡",
country: "新加坡",
code: "SIN"
}, {
name: "首尔",
country: "韩国",
code: "SEL"
}, {
name: "曼谷",
country: "泰国",
code: "BKK"
}, {
name: "吉隆坡",
country: "马来西亚",
code: "KUL"
}, {
name: "东京",
country: "日本",
code: "TYO"
}, {
name: "台北",
country: "中国台湾",
code: "TPE"
}, {
name: "悉尼",
country: "澳大利亚",
code: "SYD"
}, {
name: "澳门",
country: "中国澳门",
code: "MFM"
}, {
name: "普吉",
country: "泰国",
code: "HKT"
}, {
name: "墨尔本",
country: "澳大利亚",
code: "MEL"
}, {
name: "胡志明市",
country: "越南",
code: "SGN"
}, {
name: "大阪",
country: "日本",
code: "OSA"
}, {
name: "巴厘岛",
country: "印度尼西亚",
code: "DPS"
}, {
name: "马尼拉",
country: "菲律宾",
code: "MNL"
}, {
name: "河内",
country: "越南",
code: "HAN"
}, {
name: "加德满都",
country: "尼泊尔",
code: "KTM"
}, {
name: "金边",
country: "柬埔寨",
code: "PNH"
}, {
name: "雅加达",
country: "印度尼西亚",
code: "JKT"
}, {
name: "马累",
country: "马尔代夫",
code: "MLE"
}, {
name: "暹粒",
country: "柬埔寨",
code: "REP"
}, {
name: "迪拜",
country: "阿拉伯联合酋长国",
code: "DXB"
}, {
name: "釜山",
country: "韩国",
code: "PUS"
}, {
name: "名古屋",
country: "日本",
code: "NGO"
}, {
name: "奥克兰",
country: "新西兰",
code: "AKL"
}, {
name: "布里斯班",
country: "澳大利亚",
code: "BNE"
}, {
name: "槟城",
country: "马来西亚",
code: "PEN"
}, {
name: "高雄",
country: "中国台湾",
code: "KHH"
}, {
name: "新德里",
country: "印度",
code: "DEL"
}, {
name: "济州岛",
country: "韩国",
code: "CJU"
}]
}],
title: "亚洲/大洋洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"m美洲": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "纽约",
country: "美国",
code: "NYC"
}, {
name: "洛杉矶",
country: "美国",
code: "LAX"
}, {
name: "多伦多",
country: "加拿大",
code: "YTO"
}, {
name: "温哥华",
country: "加拿大",
code: "YVR"
}, {
name: "旧金山",
country: "美国",
code: "SFO"
}, {
name: "芝加哥",
country: "美国",
code: "CHI"
}, {
name: "华盛顿",
country: "美国",
code: "WAS"
}, {
name: "西雅图",
country: "美国",
code: "SEA"
}, {
name: "波士顿",
country: "美国",
code: "BOS"
}, {
name: "底特律",
country: "美国",
code: "DTT"
}, {
name: "亚特兰大",
country: "美国",
code: "ATL"
}, {
name: "蒙特利尔",
country: "加拿大",
code: "YMQ"
}, {
name: "休斯敦",
country: "美国",
code: "HOU"
}, {
name: "火奴鲁鲁",
country: "美国",
code: "HNL"
}, {
name: "达拉斯",
country: "美国",
code: "DFW"
}, {
name: "拉斯维加斯",
country: "美国",
code: "LAS"
}, {
name: "费城",
country: "美国",
code: "PHI"
}, {
titles: "圣保罗（巴西）",
name: "圣保罗",
country: "巴西",
code: "SAO"
}, {
name: "明尼阿波利斯",
country: "美国",
code: "MSP"
}, {
name: "渥太华",
country: "加拿大",
code: "YOW"
}, {
name: "凤凰城",
country: "美国",
code: "PHX"
}, {
name: "墨西哥城",
country: "墨西哥",
code: "MEX"
}, {
name: "迈阿密",
country: "美国",
code: "MIA"
}, {
name: "丹佛",
country: "美国",
code: "DEN"
}, {
name: "奥兰多",
country: "美国",
code: "ORL"
}, {
name: "卡尔加里",
country: "加拿大",
code: "YYC"
}, {
name: "埃德蒙顿",
country: "加拿大",
code: "YEA"
}, {
name: "布宜诺斯艾利斯",
country: "阿根廷",
code: "BUE"
}, {
name: "里约热内卢",
country: "巴西",
code: "RIO"
}, {
name: "匹兹堡",
country: "美国",
code: "PIT"
}]
}],
title: "美洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"m欧洲": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "伦敦",
country: "英国",
code: "LON"
}, {
name: "巴黎",
country: "法国",
code: "PAR"
}, {
name: "法兰克福",
country: "德国",
code: "FRA"
}, {
name: "莫斯科",
country: "俄罗斯",
code: "MOS"
}, {
name: "阿姆斯特丹",
country: "荷兰",
code: "AMS"
}, {
titles: "罗马（意大利）",
name: "罗马",
country: "意大利",
code: "ROM"
}, {
name: "米兰",
country: "意大利",
code: "MIL"
}, {
name: "马德里",
country: "西班牙",
code: "MAD"
}, {
name: "慕尼黑",
country: "德国",
code: "MUC"
}, {
name: "柏林",
country: "德国",
code: "BER"
}, {
name: "斯德哥尔摩",
country: "瑞典",
code: "STO"
}, {
name: "伊斯坦布尔",
country: "土耳其",
code: "IST"
}, {
titles: "伯明翰（英国）",
name: "伯明翰",
country: "英国",
code: "BHX"
}, {
titles: "巴塞罗那(西班牙)",
name: "巴塞罗那",
country: "西班牙",
code: "BCN"
}, {
name: "雅典",
country: "希腊",
code: "ATH"
}, {
name: "哥本哈根",
country: "丹麦",
code: "CPH"
}, {
name: "苏黎世",
country: "瑞士",
code: "ZRH"
}, {
name: "布鲁塞尔",
country: "比利时",
code: "BRU"
}, {
name: "赫尔辛基",
country: "芬兰",
code: "HEL"
}, {
name: "爱丁堡",
country: "英国",
code: "EDI"
}, {
name: "维也纳",
country: "奥地利",
code: "VIE"
}, {
titles: "格拉斯哥（英国）",
name: "格拉斯哥",
country: "英国",
code: "GLA"
}, {
name: "日内瓦",
country: "瑞士",
code: "GVA"
}, {
name: "圣彼得堡",
country: "俄罗斯",
code: "LED"
}, {
titles: "都柏林(爱尔兰)",
name: "都柏林",
country: "爱尔兰",
code: "DUB"
}, {
name: "汉堡",
country: "德国",
code: "HAM"
}, {
name: "杜塞尔多夫",
country: "德国",
code: "DUS"
}, {
name: "布拉格",
country: "捷克",
code: "PRG"
}, {
name: "布达佩斯",
country: "匈牙利",
code: "BUD"
}, {
name: "基辅",
country: "乌克兰",
code: "IEV"
}]
}],
title: "欧洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"m非洲": {
charSort: true,
cityList: [{
"char": "城市",
clshct: true,
list: [{
name: "开罗",
country: "埃及",
code: "CAI"
}, {
name: "约翰内斯堡",
country: "南非",
code: "JNB"
}, {
name: "内罗毕",
country: "肯尼亚",
code: "NBO"
}, {
name: "开普敦",
country: "南非",
code: "CPT"
}, {
name: "毛里求斯",
country: "毛里求斯",
code: "MRU"
}, {
name: "拉各斯",
country: "尼日利亚",
code: "LOS"
}, {
name: "喀土穆",
country: "苏丹",
code: "KRT"
}, {
name: "亚的斯亚贝巴",
country: "埃塞俄比亚",
code: "ADD"
}, {
name: "阿克拉",
country: "加纳",
code: "ACC"
}, {
name: "达累斯萨拉姆",
country: "坦桑尼亚",
code: "DAR"
}, {
name: "塞舌尔",
country: "塞舌尔共和国",
code: "SEZ"
}, {
name: "阿尔及尔",
country: "阿尔及利亚",
code: "ALG"
}, {
name: "的黎波里",
country: "利比亚",
code: "TIP"
}, {
name: "阿布贾",
country: "尼日利亚",
code: "ABV"
}, {
name: "卡萨布兰卡",
country: "摩洛哥",
code: "CAS"
}, {
name: "突尼斯",
country: "突尼斯",
code: "TUN"
}]
}],
title: "非洲热门城市",
desc: "可直接输入中文名/拼音/英文名/三字码",
cls: "inter"
},
"国内": {
cityList: [{
name: "上海",
country: "中国",
code: "SHA"
}, {
name: "北京",
country: "中国",
code: "BJS"
}, {
name: "广州",
country: "中国",
code: "CAN"
}, {
name: "昆明",
country: "中国",
code: "KMG"
}, {
name: "西安",
country: "中国",
code: "SIA"
}, {
name: "成都",
country: "中国",
code: "CTU"
}, {
name: "深圳",
country: "中国",
code: "SZX"
}, {
name: "厦门",
country: "中国",
code: "XMN"
}, {
name: "乌鲁木齐",
country: "中国",
code: "URC"
}, {
name: "南京",
country: "中国",
code: "NKG"
}, {
name: "重庆",
country: "中国",
code: "CKG"
}, {
name: "杭州",
country: "中国",
code: "HGH"
}, {
name: "大连",
country: "中国",
code: "DLC"
}, {
name: "长沙",
country: "中国",
code: "CSX"
}, {
name: "海口",
country: "中国",
code: "HAK"
}, {
name: "哈尔滨",
country: "中国",
code: "HRB"
}, {
name: "青岛",
country: "中国",
code: "TAO"
}, {
name: "沈阳",
country: "中国",
code: "SHE"
}, {
name: "三亚",
country: "中国",
code: "SYX"
}, {
name: "济南",
country: "中国",
code: "TNA"
}, {
name: "武汉",
country: "中国",
code: "WUH"
}, {
name: "郑州",
country: "中国",
code: "CGO"
}, {
name: "贵阳",
country: "中国",
code: "KWE"
}, {
name: "南宁",
country: "中国",
code: "NNG"
}, {
name: "福州",
country: "中国",
code: "FOC"
}, {
name: "天津",
country: "中国",
code: "TSN"
}, {
name: "长春",
country: "中国",
code: "CGQ"
}, {
name: "石家庄",
country: "中国",
code: "SJW"
}, {
name: "太原",
country: "中国",
code: "TYN"
}, {
name: "兰州",
country: "中国",
code: "LHW"
}],
title: "热门国内城市",
desc: "可直接输入中文名/拼音/英文名/三字码"
}
}
},
specPlace: ["所有地点", "中国", "日本", "泰国", "马来西亚", "韩国", "英国", "美国", "澳大利亚", "加拿大", "法国", "德国", "俄罗斯", "菲律宾", "印度", "新西兰", "西班牙", "意大利"]
}
}
(t.exports, t, e);
e.____MODULES["71e5d69c16744437dce3276233aab626"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "af143b174d558b14e7b23af2968b503d",
filename: "FlightHotCity.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
e.____MODULES["84f6503d9af7b9b0bee74ceb424517c3"];
e.____MODULES["b63e59968d1a60041e5c1b3e860c4ec8"];
var i = e.____MODULES["d3b78f6fa0b1d36c6f22536ea2364ffa"];
n.exports = function(t) {
function u(e) {
var n = r[e.type];
var s = r.data;
var o = [];
var u = null ;
var a = null ;
if (e.type == "domesticfrom" || e.type == "interfrom") {
i.init(e);
u = i.cityHistory();
a = i.hisLength()
}
t.each(n, function(e, t) {
var n = {
key: t.key,
tab: t.title,
title: s[t.key].title
};
o.push(n)
}
);
var f = QTMPL.FlightHotCity.render({
sort: o,
type: e.type,
cityType: e.cityType,
cityHistory: u,
hisLength: a,
width: e.width
});
return t(f)
}
function a(e, n) {
var i = e.type + "-flight-hotcity-" + e.cityType;
t(t.tabs).bind(i + "-change", function(e, t, n, i) {
var s = n.data("key");
var o = i;
c(r.data[s], o)
}
);
t(n).bind("hotcity-show", function() {
if (e.type == "interto") {
var i = n.ui.$el.closest("form").find("[name=fromCity]").val();
if (o == i) {
return
} else {
o = i
}
var s = n.ui.$wrap.find("[data-panel='interto-flight-hotcity-to'][data-panel-id='dfh-国际·港澳台']");
var u = {
q: i.replace(/\([^)]*\)/g, "")
};
t.ajax({
url: "http://flight.qunar.com/suggest/inter_arrcity_suggest.jsp?sort=F",
dataType: "jsonp",
data: u || {},
timeout: 200,
success: function(e) {
if (e && e.result && e.result.length > 0) {
r.data["国际·港澳台-to"].cityList[0].list = e.result
}
c(r.data["国际·港澳台-to"], s, "国际·港澳台-to")
},
error: function() {}
})
}
}
);
l(e, n);
f(e, n)
}
function f(e, n) {
n.$hotcity.delegate(".js_history", "click", function(e) {
e.preventDefault();
var r = t(this)
, i = n.ui.$el;
var s = r.attr("data-fcity")
, o = r.attr("data-tcity");
i.val(s);
i.closest("form").find("[name=toCity]").val(o);
i.closest("form").find("[name=fromDate]").focus();
trackAction("QH|HCT|route|" + s + "-" + o);
n.hideHotcity()
}
)
}
function l(e, n) {
n.$hotcity.delegate("a.js-hotcitylist", "click", function(r) {
r.preventDefault();
var i = t(this)
, s = n.ui.$el;
var o = i.data("code");
o = o ? "(" + o + ")" : "";
var u = s.data("q-suggest");
if (u) {
u.setValue((i.attr("title") || i.text()) + o)
} else {
s.val(i.text() + o)
}
s.data("country", i.data("country"));
s.data("valided", true);
t(e).trigger("setvalue", [s]);
t(e).trigger("hotcity-select", [i.text()]);
n.hideHotcity()
}
)
}
function c(e, t, n) {
if (t.html() && n != "国际·港澳台-to") {
return
}
var r = QTMPL.FlightHotCityList.render(e);
t.html(r)
}
function h() {
this.cityType = null ;
this.$dom = null ;
this.data = {}
}
var n = ".js_close_flight_hotcity";
var r = e.____MODULES["71e5d69c16744437dce3276233aab626"].hotCity;
var s = 500;
var o;
t.extend(h.prototype, {
init: function(e) {
var r = this;
t.RegisterPlugin("qcbox", "hotcity", "flight", {
initialize: function() {
r.cityType = e.cityType;
r.data = e.data;
r.type = e.type;
r.defaultTab = e.defaultTab;
r.width = e.width || s
},
initializeStruct: function() {
var e = this.ui.$el
, i = this.ui
, s = this;
r.$dom = u(r);
this.$hotcity.append(r.$dom);
r.$dom.find(n).click(function() {
s.hideHotcity()
}
);
a(r, s);
t.tabs.init(r.$dom)
}
})
},
switchCity: function(e) {
this.type = e.type;
this.width = e.width || s
}
});
return h
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["af143b174d558b14e7b23af2968b503d"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "6c448cebaa242c37eff4a2ce48358ed5",
filename: "FlightSuggest.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
n.exports = function(t) {
function a(e) {
for (var t = 0, n = e.length; t < n; t++) {
var r = e;
r[t].ftype = r[t].type;
if (r[t].type === 4 || r[t].type === 9) {
var i = r[t].type;
var o = t - 1;
var u = false;
for (var a = t; a < n && !u; a++) {
if (r[a].type === i) {
r[a].ftype = r[o].ftype
} else {
t = a - 1;
a = 100;
u = true
}
}
}
if (r[t].ftype === 3) {
r[t].ftypename = "city"
}
if (r[t].ftype === 1) {
r[t].ftypename = "city"
}
if (r[t].display.indexOf("机场") !== -1 || r[t].display.indexOf("Airport") !== -1) {
r[t].ftypename = "airport"
}
if (r[t].ftype === 6) {
r[t].ftypename = "attraction"
}
if (r[t].ftype === 8) {
r[t].ftypename = "country"
}
if (r[t].ftype === 7) {
r[t].ftypename = "state"
}
}
s = e
}
function f(e, n, r, s, o, f) {
var l = function(e, n) {
if (!e)
return;
e = e.result;
return t(e).not(n).length == 0 && t(n).not(e).length == 0
}
;
var h = [];
if (e) {
h = c(e, o);
if (e.result && e.result.length > 0) {
a(e.result);
if (!l(i, e.result)) {
var p = [];
p.push("getResultData", encodeURIComponent(s.val()), e.result.length, s.attr("name"));
t(f).trigger("getResultData", [p]);
u.triggerMult(f, "getResultData", [p])
}
i = t.extend({}, e)
}
}
if (h.length === 0) {
if (i) {
i.userInput = e.userInput;
h = h.concat(c(i, o))
} else {
h = [0];
r._trigger("q-suggest-noresult", [s])
}
}
return h
}
function c(e, t) {
var n = false;
var r = e.result || []
, i = []
, s = e.userInput.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
, o = new RegExp("(" + s + ")","i")
, u = t ? "167" : "1678"
, a = new RegExp("[" + u + "]");
for (var f = 0, c = r.length; f < c; f += 1) {
var h = r[f];
if (h.type == 7) {
n = true
}
if (h.type == 8) {
n = false
}
if (h.type === 9 && !n) {
continue
}
i.push({
txt: l(h, o),
val: h.key,
type: a.test(h.type) ? 1 : 0,
country: h.country,
code: h.code
})
}
return i
}
function h(e) {
var t = e.closest("table").data("data")
, n = t[e.attr("data-ind") * 1];
return n
}
function p(e, n, r, i) {
var o = n.visible();
var a = e.keyCode;
if (a === 40 && !o) {
n.show();
return
}
if (!o)
return;
var f = n.el.find('tr[data-sug_type="0"]');
var l = f.filter(".active");
switch (a) {
case 38:
case 40:
n._excludeEl = n._mouseFocus;
var c = f.index(l);
c = e.keyCode === 38 ? c - 1 : c + 1;
if (c >= f.length)
c = 0;
if (c < 0)
c = f.length - 1;
l.removeClass("active");
l = f.eq(c);
var p = "";
if (l.length > 0) {
p = h(l);
!i ? n.setValue(p.val + (p.code ? "(" + p.code + ")" : "")) : "";
l.addClass("active")
}
e.preventDefault();
n._trigger("q-suggest-user-action", [e.type, p.val, a]);
break;
case 13:
if (l.length > 0) {
var p = "";
var d = null ;
p = h(l);
n.setValue(p.val + (p.code ? "(" + p.code + ")" : ""));
var v = l.index();
if (p.val === "所有地点") {
v = "00";
d = "allPlace"
} else {
d = s[v].ftypename
}
var m = d + "|" + encodeURIComponent(p.val) + "|" + v;
t(r).trigger("suggest-selected", m);
u.triggerMult(r, "suggest-selected", m);
trackAction("QH|HCT|suggest|" + p.val)
}
;
case 27:
n.hide();
n._trigger("q-suggest-user-action", [e.type, n.getValue(), a]);
break;
case 18:
case 9:
break
}
}
function d() {}
var n = "http://www.qunar.com/suggest/livesearch2.jsp?lang=zh&q=*&sa=true&ver=1&callback=?";
var r = false;
var i = null ;
var s = null ;
var o;
var u = e.____MODULES["6c3d4ae0ad0febfe6f9a76151554d071"];
var l = function(e, t) {
var n = e.type
, r = e.display;
if (r.indexOf(o) != -1) {
o = o.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
t = new RegExp("(" + o + ")","i")
}
r = r.replace(t, '<span class="keyString">$1</span>');
if (n === 4) {
r = "·邻近机场：" + r
} else if (n === 9) {
r = "·相关城市：" + r
}
if (e.length)
r += "-" + e.length + "公里";
if (n === 1) {
r += "-该城市没有机场"
} else if (n === 2) {
r += "-该地区的机场有"
} else if (n === 6) {
r += "-该景点没有机场"
} else if (n === 7) {
r += "-该目的地为省份"
} else if (n === 8) {
r += "-该目的地为国家"
}
return r
}
;
t.extend(d.prototype, {
init: function(e) {
var r = this;
t.RegisterPlugin("qcbox", "suggest", e.name, {
initialize: function() {
var i = this.ui.$el;
i.qsuggest({
ajax: {
url: n,
dataType: "jsonp",
cache: false
},
delay: 200,
allPlace: e.allPlace,
render: function(e) {
return e.txt
},
reader: function(t) {
return f(t, e.tiptext, this, i, this.args.allPlace, r)
},
loader: function(e) {
return e.replace(/\s/g, "")
},
container: e.container,
exattr: function(e) {
return "data-sug_type=" + e.type
},
keyevent: function(e) {
p(e, this, r)
},
getData: function(e) {
var t = e.closest("table").data("data")
, n = t[e.attr("data-ind") * 1];
return n.val ? n.val + (n.code ? "(" + n.code + ")" : "") : undefined
},
getExtData: function(e) {
if (e.length < 1) {
return {}
}
var t = e.closest("table").data("data")
, n = t[e.attr("data-ind") * 1];
return n
},
draw: function(e, n) {
this.el.empty();
var r = this.args.min
, i = this.args.max
, s = e ? e.length : 0;
if (!e || !s || s < r) {
this.hide();
return
}
var o = {
country: "中国",
txt: "所有地点",
val: "所有地点",
type: 0
};
if (this.args.allPlace && e[s - 1].val != o.val) {
e.push(o)
}
var a = []
, f = this.args.render
, l = this.args.exattr
, c = true;
a.push('<table cellspacing="0" cellpadding="2"><tbody>');
var s = e.length - 1;
t.each(e, function(e, n) {
var r = "";
if (n.type !== 1 && c) {
c = false;
r = ' class="active'
}
if (n.exClass) {
r = r ? r + " " + n.exClass + '" ' : ' class="' + n.exClass + '" '
} else {
r = r ? r + '" ' : ""
}
t(u).trigger("haveData", s);
a.push("<tr", r, ' data-ind="', e, '" ', l(n), "><td>", f(n), "</td></tr>")
}
);
a.push("</tbody></table>");
this._trigger("q-suggest-beforeshow", [this.el, n]);
var h = t(a.join("")).appendTo(this.el).data("data", e);
if (!this.args["container"])
this.el.css(_calc_pos(this.activeEl));
this.el.show();
this._trigger("q-suggest-show", [e])
},
on: {
"q-suggest-show": function() {
i.bind("keydown.kd", function(e) {
e.keyCode == 13 && e.preventDefault()
}
)
},
"q-suggest-setextdata": function(e, t, n) {
n.data("country", t.country);
n.data("valided", true)
},
"q-suggest-setvalue": function(e, n, i) {
t(r).trigger("setvalue", [i])
},
"q-suggest-noresult": function(e, n) {
n.data("country", null );
n.data("valided", false);
t(r).trigger("setvalue", [n]);
t(r).trigger("suggest-noresult")
},
"q-suggest-hide": function(e) {
i.unbind("keydown.kd")
},
"q-suggest-beforeshow": function(e, n, i) {
if (!!i && !!i.c) {
var s = ['<div class="qcity_guess">你要找的是不是<span class="hl">', i.result[0].key, "</span></div>"];
n.append(s.join(""))
}
if (i && i.result.length == 0) {
var s = ['<div class="qcity_guess">找不到<span class="hl">', o, "</span></div>"];
var a = true;
var f = t(e.target).data("q-suggest");
if (f && f.args.allPlace && "所有地点".indexOf(i.userInput) > -1) {
a = false
}
a ? n.append(s.join("")) : "";
t(r).bind("suggest-nofind", function(e, t) {
u.triggerMult(r, "suggest-nofind", t)
}
);
t(r).trigger("suggest-nofind", o)
}
},
"q-suggest-user-action": function(e, n, i, o) {
var a = null ;
if (n == "mousedown") {
if (i === "所有地点") {
o = "00";
a = "allplace"
} else {
a = s[o].ftypename
}
var f = a + "|" + encodeURIComponent(i) + "|" + o;
t(r).trigger("suggest-selected", f);
u.triggerMult(r, "suggest-selected", f);
trackAction("QH|HCT|suggest|" + i)
}
},
"q-suggest-inputChange": function(e) {
o = i.val().replace(/\s+/g, " ");
o = o.replace(/^\s+/, "");
o = o.replace(/\s+$/, "")
}
}
})
}
});
t.RegisterPlugin("qcboxfuzzy", "suggest", e.name, {
initialize: function() {
var i = this.ui.$el;
i.qsuggest({
ajax: {
url: n,
dataType: "jsonp",
cache: false
},
delay: 200,
allPlace: e.allPlace,
render: function(e) {
return e.txt
},
reader: function(t) {
return f(t, e.tiptext, this, i, this.args.allPlace, r)
},
loader: function(e) {
return e.replace(/\s/g, "")
},
container: e.container,
exattr: function(e) {
return "data-sug_type=" + e.type
},
keyevent: function(e) {
p(e, this, r, true)
},
getData: function(e) {
var t = e.closest("table").data("data")
, n = t[e.attr("data-ind") * 1];
return n.val ? n.val + (n.code ? "(" + n.code + ")" : "") : undefined
},
getExtData: function(e) {
if (e.length < 1) {
return {}
}
var t = e.closest("table").data("data")
, n = t[e.attr("data-ind") * 1];
return n
},
draw: function(e, n) {
if (this.activeEl.data("qcboxfuzzy").isFuzzyDis()) {
return
}
this.el.empty();
var r = this.args.min
, i = this.args.max
, s = e ? e.length : 0;
if (!e || !s || s < r) {
this.hide();
return
}
var o = {
country: "中国",
txt: "所有地点",
val: "所有地点",
type: 0
};
if (this.args.allPlace && e[s - 1].val != o.val) {
e.push(o)
}
var a = []
, f = this.args.render
, l = this.args.exattr
, c = true;
a.push('<table cellspacing="0" cellpadding="2"><tbody>');
var s = e.length - 1;
t.each(e, function(e, n) {
if (e >= i)
return false;
var r = "";
if (n.type !== 1 && c) {
c = false;
r = ' class="active'
}
if (n.exClass) {
r = r ? r + " " + n.exClass + '" ' : ' class="' + n.exClass + '" '
} else {
r = r ? r + '" ' : ""
}
t(u).trigger("haveData", s);
a.push("<tr", r, ' data-ind="', e, '" ', l(n), "><td>", f(n), "</td></tr>")
}
);
a.push("</tbody></table>");
this._trigger("q-suggest-beforeshow", [this.el, n]);
var h = t(a.join("")).appendTo(this.el).data("data", e);
if (!this.args["container"])
this.el.css(_calc_pos(this.activeEl));
this.el.show();
this._trigger("q-suggest-show", [e])
},
on: {
"q-suggest-show": function() {
i.bind("keydown.kd", function(e) {
e.keyCode == 13 && e.preventDefault()
}
)
},
"q-suggest-setextdata": function(e, t, n) {
n.data("country", t.country);
n.data("valided", true)
},
"q-suggest-setvalue": function(e, n, i) {
t(r).trigger("setvalue", [i])
},
"q-suggest-noresult": function(e, n) {
n.data("country", null );
n.data("valided", false);
t(r).trigger("setvalue", [n]);
t(r).trigger("suggest-noresult")
},
"q-suggest-hide": function(e) {
i.unbind("keydown.kd")
},
"q-suggest-beforeshow": function(e, n, i) {
if (!!i && !!i.c) {
var s = ['<div class="qcity_guess">你要找的是不是<span class="hl">', i.userInput, "</span></div>"];
n.append(s.join(""))
}
if (i && i.result.length == 0) {
var s = ['<div class="qcity_guess">找不到<span class="hl">', o, "</span></div>"];
var a = true;
var f = t(e.target).data("q-suggest");
if (f && f.args.allPlace && "所有地点".indexOf(i.userInput) > -1) {
a = false
}
a ? n.append(s.join("")) : "";
t(r).bind("suggest-nofind", function(e, t) {
u.triggerMult(r, "suggest-nofind", t)
}
);
t(r).trigger("suggest-nofind", o)
}
},
"q-suggest-user-action": function(e, n, i, o) {
var a = null ;
if (n == "mousedown") {
if (i === "所有地点") {
o = "00";
a = "allplace"
} else {
a = s[o].ftypename
}
var f = a + "|" + encodeURIComponent(i) + "|" + o;
t(r).trigger("suggest-selected", f);
u.triggerMult(r, "suggest-selected", f);
trackAction("QH|HCT|suggest|" + i)
}
},
"q-suggest-inputChange": function(e) {
o = i.val().replace(/\s+/g, " ");
o = o.replace(/^\s+/, "");
o = o.replace(/\s+$/, "")
}
},
fuzzyFun: function() {
var e = i.siblings("#topic");
if (e.size() && e.val().split(",").length == 5) {
return
}
}
})
}
})
},
isvalid: function() {
return r
}
});
return d
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["6c448cebaa242c37eff4a2ce48358ed5"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "f541beac2ee24780cfa7e4ab1808279c",
filename: "SearchCaution.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
var r = window.SERVER_TIME;
var i = new Date(r.getTime() + 1e3 * 60 * 60 * 24 * 363);
var s;
var o = "/s/twell/flight/Search.php?";
t.exports = function() {
function c(e) {
var t = "";
for (var n in e) {
t += "&" + n + "=" + e[n]
}
return o + t
}
function p(e) {
var t = {
fromCity: e.fromCity,
toCity: e.toCity,
fromDate: e.fd
};
if (e.td) {
t.toDate = e.td
}
t.from = "qunarindex";
t.searchType = e.type === "特价" ? "DealsFlight" : h[e.searchType];
return t
}
function d(e) {
try {
(new Image).src = "/s/track.php?action=" + e + "&t=" + Math.random()
} catch (t) {}
}
var e = $.ui.dialog({
width: 522
})
, t = {};
var n = function(e) {
var t = e || {};
var n = "";
if (e.round) {
n = "<p>" + (e.type === "特价" ? "从" : "去程") + '：&nbsp;<span class="fb">' + e.departureDate + "</span></p>";
n = n + "<p>" + (e.type === "特价" ? "到" : "回程") + '：&nbsp;<span class="fb">' + e.arrivalDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
} else {
n = "<p>" + (e.type === "特价" ? "从" : "去程") + '：&nbsp;<span class="fb">' + e.departureDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
}
return n
}
;
var r = function(e) {
var t = '<div class="p_lyr_ct" style="width:522px;">' + '<div class="lyr_in"> <a id="search-caution-close" class="btn_close" href="javascript:;"></a>' + '<div class="lyr_ct" style="width: 450px;">' + '<div class="b_alt_day">' + '<div class="p1">目前<span class="fb">' + (e.type === "特价" ? "特价" : e.fromCity + '</span>到<span class="fb">' + e.toCity) + "</span>机票最远支持搜索以下日期的航班：</div>" + '<div class="p2">' + n(e) + "</div>" + '<div class="p_btn">' + '<a href="' + e.href + '" class="btn_sure_bl" id="search-caution-ok"><span>确&nbsp;定</span></a>' + "</div>" + "</div>" + '<div class="b_alt_dode clearfix">' + '<a href="http://app.qunar.com/" target="_blank">' + '<p class="m_code_img"><img src="http://simg4.qunarzz.com/site/images/flight/home/img_qnkhd.png"></p>' + '<p class="m_code_rt">' + '<span class="h1">为您提供更多航班搜索，<br>我们一直在努力！</span>' + '<span class="h3">扫描或点击下载去哪儿旅行客户端</span>' + "</p>" + "</a>" + "</div>" + "</div>" + "</div>" + "</div>";
return t
}
;
var u = function() {
a()
}
;
var a = function() {
e.hide()
}
;
var f = function() {
$("#search-caution-close").click(a);
$("#search-caution-ok").click(u)
}
;
var l = function(e, t) {
return Math.min(e, t)
}
;
var h = {
oneway: "OnewayFlight",
roundtrip: "RoundTripFlight"
};
var v = function(e, t) {
var n = t || "-";
var r = e.getMonth() + 1;
var i = e.getDate();
r < 10 && (r = "0" + r);
i < 10 && (i = "0" + i);
return e.getFullYear() + n + r + n + i
}
;
t.check = function(e) {
s = i;
this.data = {};
this.data.fromCity = e.fromCity;
this.data.toCity = e.toCity;
var t = false;
var n = new Date(e.fd.replace(/-/g, "/"));
var r = new Date(e.td.replace(/-/g, "/"));
if (e.searchType === "oneway") {
if (n > s) {
t = true;
this.data.type = e.type;
this.data.round = false;
this.data.departureDate = v(s);
var o = p(e);
o.fromDate = this.data.departureDate;
this.data.href = c(o)
}
} else if (e.searchType === "roundtrip") {
if (n > s || r > s) {
t = true;
this.data.type = e.type;
this.data.round = true;
this.data.departureDate = v(new Date(l(n, s)));
this.data.arrivalDate = v(new Date(l(r, s)));
var o = p(e);
o.fromDate = this.data.departureDate;
o.toDate = this.data.arrivalDate;
this.data.href = c(o)
}
} else {
if (n > s) {
t = true;
this.data.type = e.type;
this.data.departureDate = v(s);
var o = p(e);
o.fromDate = this.data.departureDate;
o.drange = e.drange;
o.search = e.search;
this.data.href = c(o)
}
}
return t
}
;
t.show = function() {
var t = r(this.data);
e.setContent(t);
e.show();
e.setMiddle();
f();
var n = ["FL", "EQR"].join("|");
d(n)
}
;
return t
}
()
}
(t.exports, t, e);
e.____MODULES["f541beac2ee24780cfa7e4ab1808279c"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "e37c305530c521d03f3e5f5a520689cb",
filename: "BaseFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
n.exports = function(t) {
function A(e) {
return e.prevAll(".dp-prefix")
}
function O(e) {
e.fdatepicker("setting", "linkTo", null )
}
function M(e, t) {
e.fdatepicker("setting", "linkTo", t);
t.data("q-datepicker-fly").ui.setFuzzyDate(e.val());
var n = e.data("q-datepicker-fly").ui;
n.checkLinked({
pos: n.picker.args.pos,
restPos: 0
})
}
function _(e) {
return e !== ""
}
function D(e) {
var e = new Date(e);
var t = window.SERVER_TIME || new Date;
if (e.getTime() < t.getTime()) {
e = new Date(t.getTime() + 2 * 24 * 60 * 60 * 1e3)
}
var n = e.getFullYear();
var r = e.getMonth() + 1;
var i = e.getDate();
r = r < 10 ? "0" + r : r;
i = i < 10 ? "0" + i : i;
return [n, r, i].join("-")
}
function P(e) {
var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
return t ? new Date(t[1],t[2] * 1 - 1,t[3]) : null
}
function H(e, n) {
t.each(n, function(t, n) {
if (t === "value") {
var r = e.data("q-suggest");
if (r) {
r.setValue(n)
}
e.val(n)
} else {
switch (t) {
case "country":
e.data("country", n);
break;
case "valided":
e.data("valided", n);
break
}
}
}
)
}
function B(e) {
return t.extend({}, e.data(), {
value: t.trim(e.val())
})
}
function j() {}
var n = e.____MODULES["af143b174d558b14e7b23af2968b503d"];
var r = e.____MODULES["6c448cebaa242c37eff4a2ce48358ed5"];
var i = "input[name=fromCity]";
var s = "input[name=toCity]";
var o = "input[name=fromDate]";
var u = "input[name=toDate]";
var a = ".js-exchagne-city";
var f = "input[name=from]";
var l = "input[name=pfromCity]";
var c = "input[name=ptoCity]";
var h = "input[name=pfromDate]";
var p = ".js-exchagne-pcity";
var d = "#js_searchtype_domestic";
var v = "#js_searchtype_international";
var m = "input[name=search]";
var g = "input[name=drange]";
var y = ".js-searchtype-oneway";
var b = ".js-searchtype-roundtrip";
var w = ".js-searchtype-multitrip";
var E = ".js-searchtype-fuzzytrip";
var S = ".js-searchtype-pricetrend";
var x = ".js_arrivalDateDiv_disable";
var T = ".js_arrivalDateDiv";
var N = ".js-suggestcontainer";
var C = ".js-backdate";
var k = 3630;
var L = e.____MODULES["71e5d69c16744437dce3276233aab626"].specPlace;
t.extend(j.prototype, {
init: function(e) {
var n = this;
if (n._inited) {
return
}
var r = t(e.form);
var N = e.hotcity;
var k = e.photcity;
var L = e.delay || null ;
n.isFuzzy = e.isFuzzy;
n.placeHolder = e.placeHolder;
n.pplaceHolder = e.pplaceHolder;
n.form = e.form;
n.$form = r;
n.$toDate = r.find(u);
n.$fromDate = r.find(o);
n.$fromCity = r.find(i);
n.$toCity = r.find(s);
n.$backdate = r.find(C);
n.$onewayRadio = t(y, r);
n.$roundtripRadio = t(b, r);
n.$multitripRadio = t(w, r);
n.$fuzzytripRadio = t(E, r);
n.$pricetrendRadio = t(S, r);
n.$pfromCity = r.find(l);
n.$ptoCity = r.find(c);
n.$pfromDate = r.find(h);
n.$pexchange = t(p, r);
n.$arrDateWp_dis = t(x, r);
n.$arrDateWp = t(T, r);
n.$tjDomesticRadio = t(d, r);
n.$tjInternationalRadio = t(v, r);
n.$tjSearchRadio = t(m, r);
n.$tjDateRange = t(g, r);
n.$exchange = t(a, r);
n.$from = t(f, r);
n.alsosearch = e.alsosearch;
n._initCityInput(N);
n._initDatePicker(L);
if (k) {
n._initpCityInput(k);
n._initpDatePicker(L)
}
n._bindEvents();
n.$toDatePrefix = A(n.$toDate);
n.$fromDatePrefix = A(n.$fromDate);
n._inited = true;
t(n).trigger("initialized");
n.$onewayRadio.trigger("click");
n.imfs = e.imfs;
return n
},
_searchType: function() {
var e = this.$onewayRadio[0];
if (e) {
return this.$onewayRadio[0].checked ? "oneway" : "roundtrip"
}
},
_tjSearchType: function() {
var e = this.$tjDomesticRadio[0];
if (e) {
return this.$tjDomesticRadio[0].checked ? "domestic" : "international"
}
},
_initCityInput: function(e) {
var i = this;
var s = i.$fromCity.nextAll(N);
var o = i.$toCity.nextAll(N);
var u = i.$fromCity
, a = i.$toCity;
var f = new n;
var l = new n;
var c = new r;
var h = new r;
this.fromCitySuggest = c;
this.toCitySuggest = h;
i.fromHotCity = f;
i.toHotCity = l;
u.data("qcbox-placeholder", i.placeHolder);
a.data("qcbox-placeholder", i.placeHolder);
t.each([f, l, c, h], function(e, n) {
t(n).bind("setvalue", function(e, n) {
i._clearError(n);
t(i).trigger("boxchange");
t(i).trigger("citychange")
}
)
}
);
t(f).bind("hotcity-show", function() {
try {
i.$fromCity.data("q-suggest").hide()
} catch (e) {}
if (!this.$dom[0]) {
t(i).trigger("no_exhitbit", this.cityType)
}
trackAction("QH|HCT|open")
}
);
t(l).bind("hotcity-show", function() {
try {
i.$toCity.data("q-suggest").hide()
} catch (e) {}
if (!this.$dom[0]) {
t(i).trigger("no_exhitbit", this.cityType)
}
trackAction("QH|HCT|open")
}
);
f.init({
type: e.fromtype,
cityType: "from",
defaultTab: e.fromDefaultTab,
width: e.hotcityWidth
});
c.init({
name: "flight-fromcity",
container: s,
tiptext: u.data("qcbox-placeholder"),
allPlace: this.isFuzzy
});
u.qcbox();
l.init({
type: e.totype,
cityType: "to",
defaultTab: e.toDefaultTab,
width: e.hotcityWidth
});
h.init({
name: "flight-tocity",
container: o,
tiptext: a.data("qcbox-placeholder"),
allPlace: this.isFuzzy
});
a.qcbox()
},
_initpCityInput: function(e) {
var i = this;
var s = i.$pfromCity.nextAll(N);
var o = i.$ptoCity.nextAll(N);
var u = i.$pfromCity
, a = i.$ptoCity;
var f = new n;
var l = new n;
var c = new r;
var h = new r;
this.pfromCitySuggest = c;
this.ptoCitySuggest = h;
i.pfromHotCity = f;
i.ptoHotCity = l;
u.data("qcbox-placeholder", i.pplaceHolder);
a.data("qcbox-placeholder", i.pplaceHolder);
t.each([f, l, c, h], function(e, n) {
t(n).bind("setvalue", function(e, n) {
i._clearError(n);
t(i).trigger("boxchange");
t(i).trigger("citychange")
}
)
}
);
t(f).bind("hotcity-show", function() {
try {
i.$pfromCity.data("q-suggest").hide()
} catch (e) {}
if (!this.$dom[0]) {
t(i).trigger("no_exhitbit", this.cityType)
}
trackAction("QH|HCT|open")
}
);
t(l).bind("hotcity-show", function() {
try {
i.$ptoCity.data("q-suggest").hide()
} catch (e) {}
if (!this.$dom[0]) {
t(i).trigger("no_exhitbit", this.cityType)
}
trackAction("QH|HCT|open")
}
);
f.init({
type: e.fromtype,
cityType: "from",
defaultTab: e.fromDefaultTab,
width: e.hotcityWidth
});
c.init({
name: "flight-fromcity",
container: s,
tiptext: u.data("qcbox-placeholder"),
allPlace: false
});
u.qcbox();
l.init({
type: e.totype,
cityType: "to",
defaultTab: e.toDefaultTab,
width: e.hotcityWidth
});
h.init({
name: "flight-tocity",
container: o,
tiptext: a.data("qcbox-placeholder"),
allPlace: false
});
a.qcbox()
},
_initDatePicker: function(e) {
var n = this;
var r = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date
, i = new Date(r.getFullYear(),r.getMonth(),r.getDate())
, s = new Date(r.getFullYear(),r.getMonth(),r.getDate() + k);
var o = e ? e.fromDateDelay : 2;
toDateDelay = e ? e.toDateDelay : 5;
var u = new Date(r.getFullYear(),r.getMonth(),r.getDate() + o)
, a = new Date(r.getFullYear(),r.getMonth(),r.getDate() + toDateDelay);
var f = n.$fromDate
, l = n.$toDate;
var c = l.fdatepicker({
ui: "qunar",
refObj: f,
defaultDay: a.valueOf(),
maxDate: s,
on: {
"q-datepicker-select": function() {
t(n).trigger("boxchange")
},
"q-datepicker-show": function() {
trackAction("QH|DP|open")
}
}
});
var h = f.fdatepicker({
ui: "qunar",
linkRules: n._type && n._type == "国际" ? "+7D,+0D" : "+3D,+0D",
minDate: i,
maxDate: s,
linkTo: c,
defaultDay: u.valueOf(),
on: {
"q-datepicker-select": function() {
t(n).trigger("boxchange")
},
"q-datepicker-show": function() {
trackAction("QH|DP|open")
}
}
});
f.bind("q-datepicker-select", function() {
if (c.is(":visible")) {
c.focus();
c.data("q-datepicker-fly").show()
}
}
);
if (this.isFuzzy) {
f.data("q-datepicker-fly").setFuzzy(true);
l.data("q-datepicker-fly").setFuzzy(true)
}
},
_initpDatePicker: function(e) {
var n = this;
var r = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date
, i = new Date(r.getFullYear(),r.getMonth(),r.getDate())
, s = new Date(r.getFullYear(),r.getMonth(),r.getDate() + k);
var o = e ? e.fromDateDelay : 2;
toDateDelay = e ? e.toDateDelay : 5;
var u = new Date(r.getFullYear(),r.getMonth(),r.getDate() + o)
, a = new Date(r.getFullYear(),r.getMonth(),r.getDate() + toDateDelay);
var f = n.$pfromDate;
var l = f.fdatepicker({
ui: "qunar",
linkRules: "+3D,+0D",
minDate: i,
maxDate: s,
defaultDay: u.valueOf(),
on: {
"q-datepicker-select": function() {
t(n).trigger("boxchange")
},
"q-datepicker-show": function() {
trackAction("QH|DP|open")
}
}
});
if (this.isFuzzy) {
f.data("q-datepicker-fly").setFuzzy(true)
}
},
parseDate: function(e) {
return P(e)
},
_bindEvents: function() {
var e = this;
e._submitCheck();
e._bindExChangeCityEvent();
e._bindSearchTypeChangeEvent();
e._bindAlsoSearch()
},
_checkAlsoSearch: function(e, t) {
function r() {
var t = n.alsosearch || [];
if (t.length == 0) {
e && e(null );
return
}
var r = 0
, i = t.length
, s = function(n) {
if (n) {
e && e(t[r - 1])
} else {
var i = t[r++];
if (i) {
i.toggle(s)
} else {
e && e(null )
}
}
}
;
s(false)
}
clearTimeout(this._also_timer);
var n = this;
if (t) {
r()
} else {
this._also_timer = setTimeout(r, 10)
}
},
_bindAlsoSearch: function() {
var e = this;
var n = e.alsosearch;
if (!n) {
return
}
t(e).bind("boxchange", function() {
e._checkAlsoSearch()
}
)
},
_bindExChangeCityEvent: function() {
var e = this;
e.$exchange.click(function(t) {
var n = e.getToCity();
e.setToCity(e.getFromCity());
e.setFromCity(n);
var r = e.getFromCity().value;
var i = r.indexOf("(");
if (i === -1) {
i = r.length
}
trackAction("QH|FC|change");
t.preventDefault()
}
);
e.$pexchange.click(function(t) {
var n = e.getpToCity();
e.setpToCity(e.getpFromCity());
e.setpFromCity(n);
var r = e.getpFromCity().value;
var i = r.indexOf("(");
if (i === -1) {
i = r.length
}
trackAction("QH|FC|change");
t.preventDefault()
}
)
},
_bindSearchTypeChangeEvent: function() {
var e = this;
var n = e.$form
, r = e.$fromDate
, i = e.$toDate;
e.$onewayRadio.click(function() {
O(r);
r.attr("data-type", "oneWay");
e.$arrDateWp.hide();
e.$arrDateWp_dis.show()
}
);
e.$roundtripRadio.click(function() {
M(r, i);
r.attr("data-type", "");
e.$arrDateWp_dis.hide();
e.$arrDateWp.hide().show()
}
);
e.$arrDateWp_dis.click(function() {
e.$roundtripRadio.trigger("click")
}
);
t(e).trigger("searchtypechagne")
},
_showError: function(e, t) {
var n = this;
var r;
switch (e) {
case "from":
r = n.$fromCity;
break;
case "to":
r = n.$toCity;
break;
case "pfrom":
r = n.$pfromCity;
break;
case "pto":
r = n.$ptoCity;
break
}
if (!r.data("org-placeholder")) {
r.data("org-placeholder", r.data("qcbox-placeholder"))
}
r.data("qcbox-placeholder", t);
r.val("");
r.parent().parent().addClass("qcbox_err")
},
_clearError: function(e) {
e.data("qcbox-placeholder", e.data("org-placeholder"));
e.parent().parent().removeClass("qcbox_err")
},
_checkCity: function(e, t) {
var n = this;
var r = t.value;
if (_(r) && !t.valided) {
return false
}
return true
},
_checkpCity: function(e, n) {
var r = this;
var i = n.value;
if (t.trim(i) === "" || !n.valided) {
return false
}
return true
},
_submitCheck: function() {
var n = this;
n.$form.submit(function(r) {
var i = n.getFromCity()
, s = n.getToCity();
var o = true;
var u = i.value;
var a = s.value;
var f = n.$tjDateRange.val();
gaClk("机票|" + t("#js_searchbox_flight .ul_search_tab li.cur a").text() + "|搜索");
if (n.$multitripRadio.length && n.$multitripRadio[0].checked) {
o = n.imfs.submitCheck();
if (o) {
var l = n.imfs.getMultiValue();
n.$toCity.val(l.toCity);
n.$fromDate.val(l.fromDate);
n.$fromCity.val(l.fromCity)
}
return o
}
if (n.$pricetrendRadio.length && n.$pricetrendRadio[0].checked) {
var c = n.getpFromCity()
, h = n.getpToCity();
pfromCityVal = c.value,
pfromCountryVal = c.country,
ptoCityVal = h.value,
ptoCountryVal = h.country,
pfromDateVal = n.pfromDate();
if (!pfromCityVal) {
n._showError("pfrom", "出发地不能为空");
o = false
}
if (!ptoCityVal) {
n._showError("pto", "目的地不能为空");
o = false
}
if (o && !n._checkpCity("pfrom", c)) {
n._showError("pfrom", "城市错误");
o = false
}
if (o && !n._checkpCity("pto", h)) {
n._showError("pto", "城市错误");
o = false
}
if (o && pfromCityVal === ptoCityVal) {
n._showError("pto", "不能和出发地相同");
o = false
}
if (o && pfromCountryVal === "中国" && ptoCountryVal === "中国") {
n._showError("pto", "暂不支持国内航线");
o = false
}
if (o) {
var l = {
from: "qunarindex",
searchType: "PriceTrend",
pfromCity: pfromCityVal,
ptoCity: ptoCityVal,
pfromDate: pfromDateVal
};
var p = l.pfromCity.match(/^(.*)\((\w+)\)$/)
, d = l.ptoCity.match(/^(.*)\((\w+)\)$/);
var v = {
fromCity: p ? p[1] : l.pfromCity,
toCity: d ? d[1] : l.ptoCity,
fromDate: l.pfromDate,
fromCode: p ? p[2] : "",
toCode: d ? d[2] : "",
from: l.from,
isInter: true
};
location.href = "http://flight.qunar.com/site/pricetrend.htm?" + t.param(v)
}
return false
}
if (!n._checkCity("from", i)) {
i.qcbox.$el.trigger("mouseup");
o = false
} else if (!n._checkCity("to", s)) {
s.qcbox.$el.trigger("mouseup");
o = false
}
if (u === a && _(u) && t.inArray(u, L) == -1) {
n._showError("to", "不能和出发地相同");
o = false
}
if (encodeURIComponent(u) === "%E6%9E%97%E6%B5%A9" && encodeURIComponent(a) === "%E6%B0%B8%E8%83%9C") {
n._showError("from", decodeURIComponent("%E5%AF%B9%E4%B8%8D%E8%B5%B7"));
n._showError("to", decodeURIComponent("%E4%BB%96%E4%BB%AC%E6%98%AF%E5%86%A4%E5%AE%B6"));
o = false
}
if (!o) {
return false
}
var m = {
fd: n.fromDate(),
td: n.toDate(),
fromCity: u,
toCity: a,
search: n._tjSearchType(),
drange: f,
type: n._type,
searchType: n._searchType()
};
var g = e.____MODULES["f541beac2ee24780cfa7e4ab1808279c"];
if (g.check(m)) {
g.show();
return false
}
t(n).trigger("select_btn");
n._checkAlsoSearch(function(e) {
if (e) {
var i = e.getAdUrl();
if (i) {
var s = window.screen.availHeight * 1;
var o = window.screen.availWidth * 1;
var u = "qunar_" + (new Date).valueOf();
var a = window.open("about:blank", u, "scrollbars=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes,width=" + Math.round(o) + ",height=" + Math.round(s));
if (t.browser.msie && t.browser.version == "6.0" && !t.support.style) {
a.blur();
a.opener.focus();
a.location = i
} else {
r.preventDefault();
n.$form.attr("target", u);
setTimeout(function() {
n.$form[0].submit();
setTimeout(function() {
location.href = i
}
, 10)
}
, 10)
}
}
}
}
, true)
}
)
},
getId: function() {
return this.form
},
setFromCity: function(e) {
H(this.$fromCity, e);
this._clearError(this.$fromCity);
t(this).trigger("boxchange");
return this
},
getFromCity: function() {
return B(this.$fromCity)
},
setpFromCity: function(e) {
H(this.$pfromCity, e);
this._clearError(this.$pfromCity);
t(this).trigger("pboxchange");
return this
},
getpFromCity: function() {
return B(this.$pfromCity)
},
setToCity: function(e) {
H(this.$toCity, e);
this._clearError(this.$toCity);
t(this).trigger("boxchange");
return this
},
getToCity: function() {
return B(this.$toCity)
},
setpToCity: function(e) {
H(this.$ptoCity, e);
this._clearError(this.$ptoCity);
t(this).trigger("pboxchange");
return this
},
getpToCity: function() {
return B(this.$ptoCity)
},
fromDate: function(e) {
if (e == null ) {
return this.$fromDate.val()
} else {
this.$fromDate.data("q-datepicker-fly").select(P(e));
t(this).trigger("boxchange")
}
return this
},
pfromDate: function(e) {
if (e == null ) {
return this.$pfromDate.val()
} else {
this.$pfromDate.data("q-datepicker-fly").select(P(e));
t(this).trigger("boxchange")
}
return this
},
toDate: function(e) {
if (e == null ) {
return this.$toDate.val()
} else {
this.$toDate.data("q-datepicker-fly").select(P(e));
t(this).trigger("boxchange")
}
return this
},
fromParam: function(e) {
if (e == null ) {
return this.$from.val()
} else {
this.$from.val(e)
}
return this
},
getDom: function() {
return this.$form
},
fill: function(e) {
if (!e) {
return
}
var t = this;
t.setFromCity({
value: e.fromCity,
country: e.fromCountry,
valided: true
});
t.setToCity({
value: e.toCity,
country: e.toCountry,
valided: true
});
trackAction("QH|HCT|history|" + encodeURIComponent(e.fromCity));
trackAction("QH|HCT|history|" + encodeURIComponent(e.toCity));
t.fromDate(D(e.fromDate));
if (e.roundtrip) {
t.toDate(D(e.toDate));
t.$roundtripRadio.attr("checked", "checked");
t.$roundtripRadio.trigger("click")
} else {
t.$onewayRadio.attr("checked", "checked");
t.$onewayRadio.trigger("click")
}
if (t.$pfromCity && t.$pfromCity.length) {
if (e.fromCountry === "中国" && e.toCountry === "中国") {
return
}
t.setpFromCity({
value: e.fromCity,
country: e.fromCountry,
valided: true
});
t.setpToCity({
value: e.toCity,
country: e.toCountry,
valided: true
});
t.pfromDate(D(e.fromDate))
}
}
});
return j
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["e37c305530c521d03f3e5f5a520689cb"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "7faee6b693f4e2083d1acf173419d3a9",
filename: "TJFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
var i = e.____MODULES["e37c305530c521d03f3e5f5a520689cb"];
n.exports = function(e) {
function t() {
this._type = "特价"
}
e.extend(t.prototype, i.prototype, {
changeSerchType: function() {
var t = this;
t.$tjSearchRadio.bind("change", function(n) {
var r = e(this).val();
switch (r) {
case "domestic":
t.fromHotCity.switchCity({
type: "domesticfromtj"
});
t.toHotCity.switchCity({
type: "domesticto-tj"
});
break;
case "international":
t.fromHotCity.switchCity({
type: "interfrom-tj",
width: 500
});
t.toHotCity.switchCity({
type: "interto-tj",
width: 500
});
break
}
}
)
}
});
return t
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["7faee6b693f4e2083d1acf173419d3a9"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "04906f9559e5922f0bffca5711ca1c68",
filename: "MultiFlightSearchBox.mustache",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
if (typeof window.QTMPL === "undefined")
window.QTMPL = {};
window.QTMPL["MultiFlightSearchBox"] = new window.Hogan.Template(function(e, t, n) {
var r = this;
r.b(n = n || "");
r.b('<div class="muti_control">');
r.b("\n" + n);
r.b('    <div class="crl_lab">第<span>');
r.b(r.v(r.f("trip", e, t, 0)));
r.b("</span>程</div>");
r.b("\n" + n);
r.b('    <div class="controls" style="z-index: ');
r.b(r.v(r.f("zindex", e, t, 0)));
r.b(';">');
r.b("\n" + n);
r.b('        <div class="qcbox qcity">');
r.b("\n" + n);
r.b('             <input type="text" name="fromCityMulti" class="cinput" data-qcbox-placeholder="出发地" data-qcbox-prefix="出发" data-qcbox-suggest="flight-fromcity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
r.b("\n" + n);
r.b('            <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b('        <div class="qcbox qcity">');
r.b("\n" + n);
r.b('             <input type="text" name="toCityMulti" class="cinput" data-qcbox-placeholder="目的地" data-qcbox-prefix="到达" data-qcbox-suggest="flight-tocity" data-qcbox-hotcity="flight" autocomplete="off" x-webkit-speech="x-webkit-speech" />');
r.b("\n" + n);
r.b('            <div class="qsuggest-contaier js-suggestcontainer"></div>');
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b('        <div class="qcbox qdate fromD">');
r.b("\n" + n);
r.b('            <input type="text" name="fromDateMulti" class="cinput" autocomplete="off" maxlength="10" data-prefix="日期" />');
r.b("\n" + n);
r.b("        </div>");
r.b("\n" + n);
r.b('        <div class="clo-icon-btn" id="delete');
r.b(r.v(r.f("trip", e, t, 0)));
r.b('"></div>');
r.b("\n" + n);
r.b("    </div>");
r.b("\n" + n);
r.b("</div>");
r.b("\n" + n);
r.b("\n");
return r.fl();
}
);
if (typeof t !== "undefined")
t.exports = window.QTMPL["MultiFlightSearchBox"]
}
(t.exports, t, e);
e.____MODULES["04906f9559e5922f0bffca5711ca1c68"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "dab9b2454ae676d2f64621da2dd8f916",
filename: "BaseMultiFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
e.____MODULES["04906f9559e5922f0bffca5711ca1c68"];
n.exports = function(t) {
function x(e) {
return e.prevAll(".dp-prefix")
}
function T(e) {
e.fdatepicker("setting", "linkTo", null );
e.data("q-datepicker-fly").select(L(e.val()))
}
function N(e, t) {
e.fdatepicker("setting", "linkTo", t);
e.data("q-datepicker-fly").select(L(e.val()))
}
function C(e) {
return e !== ""
}
function k(e) {
var e = new Date(e.replace(/-/g, "/"));
var t = window.SERVER_TIME || new Date;
if (e.getTime() < t.getTime()) {
e = new Date(t.getTime() + 2 * 24 * 60 * 60 * 1e3)
}
var n = e.getFullYear();
var r = e.getMonth() + 1;
var i = e.getDate();
r = r < 10 ? "0" + r : r;
i = i < 10 ? "0" + i : i;
return [n, r, i].join("-")
}
function L(e) {
var t = e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
return t ? new Date(t[1],t[2] * 1 - 1,t[3]) : null
}
function A(e, n) {
t.each(n, function(t, n) {
if (t === "value") {
var r = e.data("q-suggest");
if (r) {
r.setValue(n)
}
e.val(n)
} else {
switch (t) {
case "country":
e.data("country", n);
break;
case "valided":
e.data("valided", n);
break
}
}
}
)
}
function O(e) {
return t.extend({}, e.data(), {
value: t.trim(e.val())
})
}
function M() {}
var n = e.____MODULES["af143b174d558b14e7b23af2968b503d"];
var r = e.____MODULES["6c448cebaa242c37eff4a2ce48358ed5"];
var i = "input[name=fromCityMulti]";
var s = "input[name=toCityMulti]";
var o = "input[name=fromDateMulti]";
var u = "input[name=toDateMulti]";
var a = "input[name=fromCity]";
var f = "input[name=toCity]";
var l = "input[name=fromDate]";
var c = ".js-exchagne-city";
var h = "input[name=from]";
var p = ".js-searchtype-deals";
var d = ".js-searchtype-oneway";
var v = ".js-searchtype-roundtrip";
var m = ".js-searchtype-multitrip";
var g = ".js-searchtype-fuzzytrip";
var y = ".js-searchtype-pricetrend";
var b = ".js-suggestcontainer";
var w = ".js-backdate";
var E = 363;
var S = t("#js_searchbox_flight");
t.extend(M.prototype, {
init: function(e) {
var n = this;
if (n._inited) {
return
}
this.tripCount = 2;
this.trip_zh = ["一", "二", "三", "四", "五", "六"];
var r = t(e.form);
this.hotCityConfig = e.hotcity;
this.delay = e.delay || null ;
n.moreSearboxArr = [];
n.form = e.form;
n.$form = r;
n.$toDate = r.find(u);
n.$fromDate = r.find(o);
n.$fromCity = r.find(i);
n.$toCity = r.find(s);
n.$backdate = r.find(w);
n.$onewayRadio = t(d, r);
n.$roundtripRadio = t(v, r);
n.$multitripRadio = t(m, r);
n.$fuzzyRadio = t(g, r);
n.$pricetrendRadio = t(y, r);
n.$dealsRadio = t(p, r);
n.$exchange = t(c, r);
n.$from = t(h, r);
n.alsosearch = e.alsosearch;
n.placeHolder = {};
for (var a = 0; a < n.$fromCity.length; a++) {
n._initCityInput(this.hotCityConfig, n.$fromCity.eq(a), n.$toCity.eq(a), n.$fromDate.eq(a));
n._initDatePicker(this.delay, n.$fromDate.eq(a));
a == 1 && N(n.$fromDate.eq(0), n.$fromDate.eq(1))
}
n._bindEvents();
n.$toDatePrefix = x(n.$toDate);
n.$fromDatePrefix = x(n.$fromDate);
n._inited = true;
t(n).trigger("initialized");
n.$onewayRadio.trigger("click");
//$("#js_inter_tab").trigger("click");
return n
},
_initCityInput: function(e, i, s, o) {
var u = this;
var a = i.nextAll(b);
var f = s.nextAll(b);
var l = new n;
var c = new n;
var h = new r;
var p = new r;
this.fromCitySuggest = h;
this.toCitySuggest = p;
t.each([l, c, h, p], function(e, n) {
t(n).bind("setvalue", function(e, n) {
u._clearError(n);
t(u).trigger("boxchange");
t(u).trigger("citychange")
}
)
}
);
t(l).bind("hotcity-show", function() {
if (!this.$dom[0]) {
t(u).trigger("no_exhitbit", this.cityType)
}
try {
i.data("q-suggest").hide()
} catch (e) {}
trackAction("QH|HCT|open")
}
);
t(c).bind("hotcity-show", function() {
if (!this.$dom[0]) {
t(u).trigger("no_exhitbit", this.cityType)
}
try {
s.data("q-suggest").hide()
} catch (e) {}
trackAction("QH|HCT|open")
}
);
t(l).bind("hotcity-select", function(e, t) {
s.focus();
s.trigger("showHotCity");
trackAction("QH|HCT|select|" + encodeURIComponent(t))
}
);
t(c).bind("hotcity-select", function(e, t) {
o.focus();
o.data("q-datepicker-fly").show();
trackAction("QH|HCT|select|" + encodeURIComponent(t))
}
);
l.init({
type: e.fromtype,
cityType: "from",
defaultTab: e.fromDefaultTab,
width: e.hotcityWidth
});
h.init({
name: "flight-fromcity",
container: a,
tiptext: i.data("qcbox-placeholder"),
typename: "mult"
});
i.qcbox();
c.init({
type: e.totype,
cityType: "to",
defaultTab: e.toDefaultTab,
width: e.hotcityWidth
});
p.init({
name: "flight-tocity",
container: f,
tiptext: s.data("qcbox-placeholder"),
typename: "mult"
});
s.qcbox();
u.setCityData(i, {
value: "",
country: "",
valided: true
});
u.setCityData(s, {
value: "",
country: "",
valided: true
});
i.focus(function() {
if (!this.value) {
u._addLinkedCity(i, "from")
}
}
);
s.focus(function() {
if (!this.value) {
u._addLinkedCity(s, "to")
}
}
)
},
_initDatePicker: function(e, n) {
var r = this;
var i = typeof SERVER_TIME !== "undefined" ? SERVER_TIME : new Date
, s = new Date(i.getFullYear(),i.getMonth(),i.getDate())
, o = new Date(i.getFullYear(),i.getMonth(),i.getDate() + E);
var u = e ? e.fromDateDelay : 2;
toDateDelay = e ? e.toDateDelay : 5;
var a = new Date(i.getFullYear(),i.getMonth(),i.getDate() + u)
, f = new Date(i.getFullYear(),i.getMonth(),i.getDate() + toDateDelay);
var l = n.fdatepicker({
ui: "qunar",
linkRules: "+7D,+0D",
minDate: s,
maxDate: o,
linkTo: null ,
single: true,
defaultDay: a.valueOf(),
on: {
"q-datepicker-select": function() {
t(r).trigger("boxchange")
},
"q-datepicker-show": function() {
trackAction("QH|DP|open")
}
}
})
},
parseDate: function(e) {
return L(e)
},
_bindEvents: function() {
var e = this;
var t = this;
e.$form.submit(function(e) {
search_btn()
}
);
e._bindSearchTypeChangeEvent();
e._bindHoverInfoEvent();
e._bindAddTripEvent()
},
_bindSearchTypeChangeEvent: function() {
var e = this;
var n = e.$form
, r = e.$fromDate
, i = e.$toDate
, s = t("#js_ow_rt_triplist")
, o = t("#js_multi_triplist")
, u = t("#fuzzy-ser")
, a = t("#js_pricetrend_triplist")
, f = t("#js_addtrip")
, l = t("#js_realtime_info")
, c = t("#js_submit_module");
e.$onewayRadio.click(function() {
s.show();
l.show();
c.removeClass("more-line-btn");
o.hide();
f.hide();
u.hide();
c.removeClass("morline-btn").removeClass("itlgent-btn");
a.hide()
}
);
e.$roundtripRadio.click(function() {
s.show();
l.show();
c.removeClass("more-line-btn");
o.hide();
f.hide();
u.hide();
c.removeClass("morline-btn").removeClass("itlgent-btn");
a.hide()
}
);
e.$multitripRadio.click(function() {
s.hide();
o.show();
f.show();
l.hide();
c.addClass("more-line-btn");
u.hide();
c.addClass("morline-btn").removeClass("itlgent-btn");
S.addClass("e_csh_sch_fl_mor");
a.hide()
}
);
e.$fuzzyRadio.click(function() {
s.hide();
o.hide();
f.hide();
l.hide();
c.removeClass("more-line-btn");
u.show();
c.removeClass("morline-btn").addClass("itlgent-btn");
a.hide()
}
);
e.$pricetrendRadio.click(function() {
s.hide();
o.hide();
f.hide();
l.hide();
c.removeClass("more-line-btn");
u.hide();
c.removeClass("morline-btn").removeClass("itlgent-btn");
a.show()
}
);
t(e).trigger("searchtypechagne")
},
_bindHoverInfoEvent: function() {
var e = t("#morlinePoint");
var n = t("#hoverInfo");
n.bind("mouseover", function() {
e.show()
}
);
n.bind("mouseout", function() {
e.hide()
}
)
},
_bindAddTripEvent: function() {
var e = this
, n = e.$form;
e.zindexCount = 0;
t("#js_addtrip").click(function() {
e.tripCount++;
e.zindexCount++;
var r = t(QTMPL.MultiFlightSearchBox.render({
trip: e.tripCount,
zindex: 100 - e.zindexCount
}));
t("#js_trips_list").append(r);
var u = e.tripCount - 1
, a = n.find(i).eq(u)
, f = n.find(s).eq(u)
, l = n.find(o);
$fromDate = l.eq(u);
e._initCityInput(e.hotCityConfig, a, f, $fromDate);
e._initDatePicker(e.delay, $fromDate);
N(l.eq(u - 1), $fromDate);
var c = t("#delete" + e.tripCount);
e.moreSearboxArr.push({
trip: e.tripCount,
sbox: r,
deleEle: c
});
t(e).trigger("addMultiClick", e);
e._bindDeleteTripEvent(c);
e.tripCount == 6 && t("#js_addtrip").hide()
}
);
t("#js_multi_triplist .q-datepicker-fly").addClass("q-datepicker-fly")
},
_bindDeleteTripEvent: function(e) {
var n = this;
e.click(function() {
var r = parseInt(e[0].id.charAt(6), 10) - 3;
n.moreSearboxArr[r].sbox.remove();
n._updateLink(r);
n._updateTrips(r);
n.tripCount--;
n.tripCount < 6 && t("#js_addtrip").show()
}
)
},
_updateTrips: function(e) {
var t = this;
t.moreSearboxArr.splice(e, 1);
for (var n = e; n < t.moreSearboxArr.length; n++) {
var r = n + 3;
t.moreSearboxArr[n].trip = r;
t.moreSearboxArr[n].sbox.find("span")[0].innerHTML = r;
var i = t.moreSearboxArr[n].sbox.find(".qcbox");
t.moreSearboxArr[n].deleEle[0].id = "delete" + r
}
},
_updateLink: function(e) {
e += 2;
var t = this.$form.find(o);
if (e < this.tripCount - 1) {
N(t.eq(e - 1), t.eq(e))
}
},
_addLinkedCity: function(e, t) {
var n = this.$form.find(i)
, r = this.$form.find(s)
, o = -1;
var u, a;
o = t == "from" ? n.index(e) : r.index(e);
if (t == "from" && o != 0) {
a = this.getCityData(r.eq(o - 1));
a.value && this.setCityData(e, {
value: a.value,
country: "",
valided: true
})
} else if (t == "to" && o != r.length - 1) {
u = this.getCityData(n.eq(o + 1));
u.value && this.setCityData(e, {
value: u.value,
country: "",
valided: true
})
}
},
_showError: function(e, t, n) {
var r = this;
var o;
switch (e) {
case "from":
o = r.$form.find(i).eq(n);
break;
case "to":
o = r.$form.find(s).eq(n);
break
}
if (!o.data("org-placeholder")) {
o.data("org-placeholder", o.data("qcbox-placeholder"))
}
o.data("qcbox-placeholder", t);
o.val("");
o.parent().parent().addClass("qcbox_err")
},
_clearError: function(e) {
e.data("qcbox-placeholder", e.data("org-placeholder"));
e.parent().parent().removeClass("qcbox_err")
},
_checkCity: function(e, t) {
var n = this;
var r = t.value;
if (C(r) && !t.valided) {
return false
}
return true
},
submitCheck: function() {
var e = this
, t = e.$form;
var n = t.find(i)
, r = t.find(s);
var o, u, a, f, l = true;
for (var c = 0; c < n.length; c++) {
o = e.getCityData(n.eq(c));
u = e.getCityData(r.eq(c));
a = o.value;
f = u.value;
if (!C(a) || !e._checkCity("from", o)) {
o.qcbox.$el.trigger("mouseup");
l = false;
break
} else if (!C(f) || !e._checkCity("to", u)) {
u.qcbox.$el.trigger("mouseup");
l = false;
break
}
if (a === f && C(a)) {
e._showError("to", "不能和出发地相同", c);
l = false;
break
}
}
return l
},
getId: function() {
return this.form
},
setFromCity: function(e) {
this.setCityData(this.$fromCity.eq(0), e)
},
setCityData: function(e, n) {
A(e, n);
this._clearError(e);
t(this).trigger("boxchange");
return this
},
getCityData: function(e) {
return O(e)
},
fromDate: function(e) {
if (e == null ) {
return this.$fromDate.val()
} else {
this.$fromDate.data("q-datepicker-fly").select(L(e));
t(this).trigger("boxchange")
}
return this
},
toDate: function(e) {
if (e == null ) {
return this.$toDate.val()
} else {
this.$toDate.data("q-datepicker-fly").select(L(e));
t(this).trigger("boxchange")
}
return this
},
fromParam: function(e) {
if (e == null ) {
return this.$from.val()
} else {
this.$from.val(e)
}
return this
},
getDom: function() {
return this.$form
},
fill: function(e) {
if (!e) {
return
}
var t = this;
t.setCityData(t.$fromCity.eq(0), {
value: e.fromCity,
country: e.fromCountry,
valided: true
});
t.setCityData(t.$toCity.eq(0), {
value: e.toCity,
country: e.toCountry,
valided: true
});
trackAction("QH|HCT|history|" + encodeURIComponent(e.fromCity));
trackAction("QH|HCT|history|" + encodeURIComponent(e.toCity));
t.fromDate(k(e.fromDate))
},
getMultiValue: function() {
var e = /\(([A-Z]{3})\)$/;
var n = t(i)
, r = t(s)
, u = t(o);
var a = []
, f = []
, l = [];
for (var c = 0; c < n.length; c++) {
a.push(n[c].value);
f.push(r[c].value);
l.push(u[c].value)
}
return {
fromCity: a.join(","),
toCity: f.join(","),
fromDate: l.join(",")
}
}
});
return M
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["dab9b2454ae676d2f64621da2dd8f916"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "681d913194dacbca08ac8ff7cda322de",
filename: "InterMultiFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
var i = e.____MODULES["dab9b2454ae676d2f64621da2dd8f916"];
n.exports = function(e) {
function n() {}
var t = "#js_inter_backdate";
e.extend(n.prototype, i.prototype, {
backdatepanel: function() {
return e(t)
}
});
return n
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["681d913194dacbca08ac8ff7cda322de"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "d0cc25e64cb4a096b71b9e7656c9fea6",
filename: "InterFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
var i = e.____MODULES["e37c305530c521d03f3e5f5a520689cb"];
n.exports = function(e) {
function n() {
this._type = "国际"
}
var t = "#js_inter_backdate";
e.extend(n.prototype, i.prototype, {
backdatepanel: function() {
return e(t)
}
});
return n
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["d0cc25e64cb4a096b71b9e7656c9fea6"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "6e846e68344eac6cd6aedb3e73c97115",
filename: "FlightHotFuzzy.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
e.____MODULES["05775f3840e8a7906dc2835913045d60"];
var i = e.____MODULES["551cb5b97f07990559c6049580f9dc17"];
var s = function(e) {
function r(t) {
var r = QTMPL.FlightHotFuzzy.render({
cateList: n.cateList
});
return e(r)
}
function s(e, t) {
o(e, t)
}
function o(t, n) {
n.$hotfuzzy.delegate("a.js-fuzzylist", "click", function(r) {
r.preventDefault();
var i = e(this)
, s = n.ui.$el
, o = n.ui.$qtab
, u = n.ui.$topic
, a = u.val();
var f = i.data("type");
var l = i.text();
var c = i.data("code").length > 0 ? i.data("code") : "";
var h = l + (c ? "(" + c + ")" : "");
if (a.indexOf(h) < 0) {
u.val((a == "" ? a : a + ",") + h);
n.ui.$el.data("qcboxfuzzy").renderTopicHtml({
topic: l,
type: f,
code: c
})
}
s.data("valided", true);
s.blur();
e(t).trigger("setvalue", [s]);
n.hideHotfuzzy()
}
)
}
function u(t) {
e(".js-fuz-rec").delegate("a.js-fuz", "click", function(n) {
n.preventDefault();
var r = e(this)
, i = t.ui.$el
, s = t.ui.$qtab
, o = t.ui.$topic
, u = o.val();
if (t.ui.isFuzzyDis()) {
t.ui.setFuzzyErr();
return
}
var a = r.data("type");
var f = r.text();
var l = r.data("code").length > 0 ? r.data("code") : "";
var c = f + (l ? "(" + l + ")" : "");
if (u.indexOf(c) < 0) {
o.val((u == "" ? u : u + ",") + c);
t.ui.$el.data("qcboxfuzzy").renderTopicHtml({
topic: f,
type: a,
code: l
})
}
i.data("valided", true);
t.ui.checkTopic()
}
)
}
function a() {
this.$dom = null ;
this.data = {}
}
var t = ".js_close_flight_hotfuzzy";
var n = i;
e.extend(a.prototype, {
init: function(n) {
var i = this;
e.RegisterPlugin("qcboxfuzzy", "hotfuzzy", "flightfuzzy", {
initialize: function() {
i.data = n.data;
i.type = n.type;
u(this)
},
initializeStruct: function() {
var e = this.ui.$el
, n = this.ui
, o = this;
i.$dom = r(i);
this.$hotfuzzy.append(i.$dom);
i.$dom.find(t).click(function() {
o.hideHotfuzzy()
}
);
s(i, o)
}
})
}
});
return a
}
(jQuery);
n.exports = s
}
(t.exports, t, e);
e.____MODULES["6e846e68344eac6cd6aedb3e73c97115"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "2a741cbb28b35685ef93cb2fef565de3",
filename: "BaseFuzzySearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
var i = e.____MODULES["af143b174d558b14e7b23af2968b503d"];
var s = e.____MODULES["6c448cebaa242c37eff4a2ce48358ed5"];
var o = e.____MODULES["6e846e68344eac6cd6aedb3e73c97115"];
var u = function(e) {
function c(e) {
return e !== ""
}
function h(t, n) {
e.each(n, function(e, n) {
if (e === "value") {
var r = t.data("q-suggest");
if (r) {
r.setValue(n)
}
t.val(n)
} else {
switch (e) {
case "country":
t.data("country", n);
break;
case "valided":
t.data("valided", n);
break
}
}
}
)
}
function p(t) {
return e.extend({}, t.data(), {
value: e.trim(t.val())
})
}
function d() {}
var t = "input[name=fromFuzzy]";
var n = "input[name=toFuzzy]";
var r = "input[name=from]";
var u = "input[name=arrType]";
var a = "input[name=topic]";
var f = ".search_selbox";
var l = ".js-suggestcontainer";
e.extend(d.prototype, {
init: function(i) {
var s = this;
if (s._inited) {
return
}
var o = e(i.form);
var f = i.hotcity;
s.placeHolder = i.placeHolder;
s.isFuzzy = i.isFuzzy;
s.form = i.form;
s.$form = o;
s.$fromCity = o.find(t);
s.$toFuzzy = o.find(n);
s.$arrType = o.find(u);
s.$topic = o.find(a);
s.$from = e(r, o);
s._initCityInput(f);
s._initFuzzyInput();
s._bindEvents();
s._inited = true;
e(s).trigger("initialized");
return s
},
_searchType: function(t) {
var n = this;
return e("#searchType").val()
},
_initCityInput: function(t) {
var n = this;
var r = n.$fromCity.nextAll(l);
var o = n.$fromCity;
var u = new i;
var a = new s;
this.fromCitySuggest = a;
n.fromHotCity = u;
o.data("qcbox-placeholder", n.placeHolder);
e.each([u, a], function(t, r) {
e(r).bind("setvalue", function(t, r) {
n._clearError(r);
e(n).trigger("citychange")
}
)
}
);
e(u).bind("hotcity-show", function() {
try {
n.$fromCity.data("q-suggest").hide()
} catch (t) {}
if (!this.$dom[0]) {
e(n).trigger("no_exhitbit", this.cityType)
}
trackAction("QH|HCT|open")
}
);
u.init({
type: t.fromtype,
cityType: "from",
defaultTab: t.fromDefaultTab
});
a.init({
name: "flight-fromcity",
container: r,
tiptext: o.data("qcbox-placeholder"),
allPlace: n.isFuzzy
});
o.qcbox()
},
_initFuzzyInput: function(t) {
var n = this;
var r = n.$toFuzzy;
var i = n.$toFuzzy.nextAll(l);
var u = new o;
var a = new s;
this.toCitySuggest = a;
n.toHotFuzzy = u;
r.data("qcbox-placeholder", n.placeHolder);
e.each([u, a], function(t, i) {
e(i).bind("setvalue", function(e, t) {
n._clearError(t);
r.trigger("fuzzychange")
}
)
}
);
e(u).bind("hotfuzzy-show", function() {
try {
n.$toFuzzy.data("q-suggest").hide()
} catch (t) {}
if (!this.$dom[0]) {
e(n).trigger("no_exhitbit", this.fuzzyType)
}
}
);
u.init({
type: "",
fuzzyType: "toFuzzy"
});
a.init({
name: "flight-tofuzzy",
container: i,
tiptext: r.data("qcbox-placeholder"),
allPlace: n.isFuzzy
});
r.qcboxfuzzy()
},
_bindEvents: function() {
var e = this;
e._submitCheck()
},
_showError: function(e, t) {
var n = this;
var r;
switch (e) {
case "from":
r = n.$fromCity;
break
}
if (!r.data("org-placeholder")) {
r.data("org-placeholder", r.data("qcbox-placeholder"))
}
r.data("qcbox-placeholder", t);
r.val("");
r.parent().parent().addClass("qcbox_err")
},
_clearError: function(e) {
e.data("qcbox-placeholder", e.data("org-placeholder"));
e.parent().parent().removeClass("qcbox_err")
},
_checkCity: function(e, t) {
var n = this;
var r = t.value;
if (!c(r) && !t.valided) {
return false
}
return true
},
_submitCheck: function() {
var t = this;
t.$form.submit(function(n) {
var r = t.getFromCity();
var i = r.value;
if (t.$topic.val() == "") {
t.$topic.val("免签/落地签");
t.$arrType.val(2)
} else if (t.$topic.val().replace(/\([^)]*\)/g, "") == i.replace(/\([^)]*\)/g, "")) {
t.$toFuzzy.data("qcboxfuzzy").setFuzzyErr("不能和出发地相同");
return false
} else {
var s = [];
e.map(t.$toFuzzy.data("qcboxfuzzy").$qtab.find(".qtab"), function(t) {
s.push(e(t).data("type"))
}
);
t.$arrType.val(s.join(","))
}
if (!t._checkCity("from", r)) {
r.qcbox.$el.trigger("mouseup");
return false
}
e(t).trigger("select_btn")
}
)
},
getId: function() {
return this.form
},
getFromCity: function() {
return p(this.$fromCity)
},
setFromCity: function(e) {
h(this.$fromCity, e);
this._clearError(this.$fromCity);
return this
},
fromParam: function(e) {
if (e == null ) {
return this.$from.val()
} else {
this.$from.val(e)
}
return this
},
getDom: function() {
return this.$form
},
fill: function(e) {
if (!e) {
return
}
var t = this;
t.setFromCity({
value: (e.searchDepartureAirport || e.fromCity) + (e.fromCode ? "(" + e.fromCode + ")" : ""),
country: "",
valided: false
});
trackAction("QH|HCT|history|" + encodeURIComponent(e.fromCity))
}
});
return d
}
(jQuery);
n.exports = u
}
(t.exports, t, e);
e.____MODULES["2a741cbb28b35685ef93cb2fef565de3"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "730e44f6d1437e50c5f7efd3e06bd421",
filename: "DomesticFlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
var i = e.____MODULES["e37c305530c521d03f3e5f5a520689cb"];
n.exports = function(e) {
function t() {
this._cityTempData = {
from: {},
to: {}
};
this._type = "国内"
}
e.extend(t.prototype, i.prototype, {
changeSerchType: function() {
function a(e) {
r.data("q-datepicker-fly").setFuzzy(e);
i.data("q-datepicker-fly").setFuzzy(e);
s.data("q-suggest").args.allPlace = e;
o.data("q-suggest").args.allPlace = e
}
var e = this
, t = e.$fromDatePrefix
, n = e.$toDatePrefix
, r = e.$fromDate
, i = e.$toDate
, s = e.$fromCity
, o = e.$toCity;
var u = {
fromDate: r.val(),
toDate: i.val()
};
e.$onewayRadio.click(function() {
t.html("日期");
n.html("日期");
e._restoreCity()
}
);
e.$roundtripRadio.click(function() {
t.html("日期");
n.html("日期");
e.$backdate.css({
visibility: "visible"
});
e._restoreCity()
}
)
},
_saveCityAndClear: function() {
var t = this
, n = t._cityTempData;
n.from = e.extend({}, t.getFromCity());
n.to = e.extend({}, t.getToCity());
t._setPlaceHolder(t.$fromCity, "出发地(可不填)");
t._setPlaceHolder(t.$toCity, "目的地(可不填)");
t.setFromCity({
value: "",
country: "",
valided: true
}).setToCity({
value: "",
country: "",
valided: true
})
},
_restoreCity: function() {
var e = this;
var t = e._cityTempData;
e._setPlaceHolder(e.$fromCity, e.placeHolder);
e._setPlaceHolder(e.$toCity, e.placeHolder);
e.setFromCity(t.from);
e.setToCity(t.to)
},
_setPlaceHolder: function(e, t) {
e.data("org-placeholder", t);
e.data("qcbox-placeholder", t)
}
});
return t
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["730e44f6d1437e50c5f7efd3e06bd421"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "89090db65dde52b7d77fe5f05d62952b",
filename: "AlsoSearch.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
t.exports = function() {
function e(e) {
return document.getElementById(e)
}
function t(e) {
return ["http://clk.qunar.com/q?k=", e.s || "", "&e=", e.e].join("")
}
function n(e) {
var t = document.createElement("script")
, n = document.getElementsByTagName("head")[0];
t.charset = "utf-8";
t.async = true;
t.src = e;
n.insertBefore(t, n.lastChild)
}
function r() {
if (!r._singleton) {
r._singleton = this;
this.init()
}
return r._singleton
}
function i() {
var e = window.external && window.external.max_version;
return e || /maxthon/i.test(navigator.userAgent)
}
r.prototype = {
init: function() {
this._status = 0;
this._calls = [];
this._url = "http://a.qunar.com/vataplan?f=s&cur_page_num=0&rep=1&tag=99&vataposition=QNR_OTU%3D_CN&vatacon=&rows=10&callback="
},
getData: function(e) {
if (this._status === 2) {
e(this.$data)
} else {
this._calls.push(e);
if (this._status === 0) {
this._loadData()
}
}
},
_dataReady: function() {
this._status = 2;
var e = this._calls;
for (var t = 0, n = e.length; t < n; t++) {
e[t](this.$data)
}
},
_loadData: function() {
var e = this
, t = "also_search_" + (new Date).valueOf();
window[t] = function(n) {
e.$data = n && n.key_data || [];
var r = "", i, s;
for (var o = 0, u = e.$data.length; o < u; o++) {
r = e.$data[o].description;
i = r.split("||");
s = {
show: i[1] || "yes",
city: i[0] ? i[0].split(",") : []
};
e.$data[o].description = s
}
e._dataReady();
try {
delete window[t]
} catch (a) {}
}
;
e._status = 1;
n(this._url + t)
}
};
r.prototype.constructor = r;
var s = i();
var o = 0;
var u = function(e, t) {
this.id = e;
this._cks_key = "check_" + o++;
this.opts = t || {};
this.init()
}
;
u.prototype = {
init: function() {
this._dc = new r
},
_findAD: function(e, t) {
var n = this;
if (!e || s) {
t([]);
return
}
if (e === n._nowKey)
return;
n._nowKey = e;
this._dc.getData(function(r) {
if (n._nowKey !== e)
return;
if (n._lastKey !== e) {
n.$curAD = null
}
n._lastKey = n._nowKey;
n._nowKey = null ;
var i, s = [], o, u;
var a = n.opts.getCountry.call(n);
for (var f = 0, l = r.length; f < l; f++) {
i = r[f].description.city;
for (o = 0,
u = i.length; o < u; o++) {
if (a == "中国" && i[o] == "国内全部" || a !== "中国" && i[o] == "国际全部" || i[o] === e) {
s.push(r[f]);
return t(s)
}
}
}
t([])
}
)
},
toggle: function(e) {
var t = this;
var n = this.opts.getKey.call(this);
t._findAD(n, function(n) {
t._show(n, e)
}
)
},
_show: function(e, t) {
var n = 0;
if (e.length > 1) {
n = Math.floor(Math.random() * e.length)
}
var r = e[n];
this.$last_AD = this.$curAD;
this.$curAD = r;
this._render(r);
this._bindEvent();
this.opts.onChange && this.opts.onChange.call(this, !!r);
t && t.call(this, !!r)
},
_render: function(t) {
var n = this.opts
, r = this.id;
var i = e(n.container);
var s = this._cks_key;
if (!i)
return;
if (t) {
if (this.$last_AD === t) {
t[s] = this.$last_AD[s]
} else {
t[s] = t.description.show === "yes" ? true : false
}
var o = t[s] ? 'checked="checked"' : "";
var u = t.title.split("||");
var a = ['<label class="chk_lab" for="alsosearchchk_', r, '">', '<input name="" autocomplete="off" id="alsosearchchk_', r, '" type="checkbox" ', o, ' class="inp_chk" />', u[1], u[0], "</label>"].join("");
if (i) {
i.innerHTML = a;
i.style.display = "inline"
}
} else {
i.style.display = "none";
i.innerHTML = ""
}
},
_bindEvent: function() {
var t = e(this.opts.container), n, r = this;
if (t) {
n = t.getElementsByTagName("input")[0];
n && (n.onclick = function() {
r.$curAD[r._cks_key] = this.checked
}
)
}
t = n = null
},
getAdUrl: function() {
if (!this.$curAD || !this.$curAD[this._cks_key])
return "";
return t(this.$curAD)
},
action: function() {
if (!this.$curAD || !this.$curAD[this._cks_key])
return false;
try {
var e = window.screen.availHeight * 1;
var n = window.screen.availWidth * 1;
var r = window.open("about:blank", "qunar", "scrollbars=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes,toolbar=yes,width=" + Math.round(n) + ",height=" + Math.round(e));
r.blur();
r.opener.focus();
r.location = t(this.$curAD)
} catch (i) {}
},
isActive: function() {
return !!this.$curAD
}
};
u.prototype.constructor = u;
return u
}
()
}
(t.exports, t, e);
e.____MODULES["89090db65dde52b7d77fe5f05d62952b"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "2232191a5b9f0d077f6f7f8337fe79ab",
filename: "FlightSearchBox.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
e.____MODULES["027f78b98f7715f13ac8172fea8a9733"];
n.exports = function(t) {
function M(e) {
var n = t(h)
, r = t(p)
, i = t(m)
, s = t(v)
, o = t(d)
, u = t(g);
n.click(function() {
gaClk("机票tab|" + t(this).text());
n.addClass("cur");
r.removeClass("cur");
o.removeClass("cur");
i.show();
s.hide();
u.hide();
if (!C) {
B();
C = true
}
}
);
r.click(function() {
gaClk("机票tab|" + t(this).text());
r.addClass("cur");
n.removeClass("cur");
o.removeClass("cur");
s.show();
i.hide();
u.hide()
}
);
o.click(function(e) {
gaClk("机票tab|" + t(this).text());
o.addClass("cur");
n.removeClass("cur");
r.removeClass("cur");
u.show();
i.hide();
s.hide();
if (!k) {
P();
k = true
}
}
)
}
function _() {
var e = b;
if (IP_ADDRESS) {
e.setFromCity({
value: IP_ADDRESS,
valided: true
})
}
e.fromParam(T)
}
function D() {
var e = {};
var n = window.location.search.replace("?", "");
var r = n.split("&");
t.each(r, function(t, n) {
var r = n.split("=");
var i = r[0]
, s = r[1];
e[i] = s || ""
}
);
return e
}
function P() {
var e = x;
t(e).on("initialized", function() {
e.changeSerchType()
}
);
e.init({
form: O,
hotcity: {
fromtype: "domesticfromtj",
totype: "domesticto-tj",
fromDefaultTab: "热门",
toDefaultTab: "热门"
},
isFuzzy: false,
placeHolder: "城市名（可不填）"
});
n.init("TJ", e);
j()
}
function H() {
var e = b;
var r = new f("domestic",{
container: "js_alsosearch_domestic",
getKey: function() {
return e.getToCity().value
},
getCountry: function() {
return e.getToCity().country
}
});
t(e).bind("initialized", function() {
e.changeSerchType()
}
);
e.init({
form: L,
hotcity: {
fromtype: "domesticfrom",
totype: "domesticto",
fromDefaultTab: "热门",
toDefaultTab: "热门"
},
alsosearch: [r],
isFuzzy: true,
placeHolder: "输入国家/城市/机场"
});
n.init("DMT", e);
j()
}
function B() {
var e = w;
var r = E;
var i = S;
var s = new f("domestic_inter",{
container: "js_alsosearch_inter",
getKey: function() {
return e.getToCity().value
},
getCountry: function() {
return e.getToCity().country
}
});
e.init({
form: A,
hotcity: {
fromtype: "interfrom",
totype: "interto",
fromDefaultTab: "热门",
toDefaultTab: "国际热门",
hotcityWidth: 500
},
photcity: {
fromtype: "multifrom",
totype: "multito",
fromDefaultTab: "热门",
toDefaultTab: "国际热门",
hotcityWidth: 500
},
alsosearch: [s],
delay: {
fromDateDelay: 15,
toDateDelay: 22
},
imfs: r,
isFuzzy: true,
placeHolder: "输入国家/城市/机场",
pplaceHolder: "城市名(必填)"
});
r.init({
form: A,
hotcity: {
fromtype: "multifrom",
totype: "multito",
fromDefaultTab: "热门",
toDefaultTab: "国际热门",
hotcityWidth: 500
},
alsosearch: [s],
delay: {
fromDateDelay: 15,
toDateDelay: 22
}
});
i.init({
form: A,
hotcity: {
fromtype: "interfrom",
totype: "interto",
fromDefaultTab: "热门",
toDefaultTab: "国际热门"
},
isFuzzy: true,
placeHolder: "输入城市"
});
if (IP_ADDRESS) {
e.setFromCity({
value: IP_ADDRESS,
valided: true
});
e.setpFromCity({
value: IP_ADDRESS,
valided: true
});
r.setFromCity({
value: IP_ADDRESS,
valided: true
});
i.setFromCity({
value: IP_ADDRESS,
valided: true
})
}
e.fromParam(T);
if (N && N.interFirst) {
e.fill(N.interFirst);
r.fill(N.interFirst);
i.fill(N.interFirst)
}
/*modify*/
/*var o = new a("js_flight_international_searchbox");
o.$jq(e);*/
n.init("INT", e, r);
t(r).bind("addMultiClick", function(t, r) {
n.init("INT", e, r)
}
);
j()
}
function j() {
t("#js_searchbox").delegate(".js_hongbao .icon", "mouseenter", function() {
t(this).parent().find(".p_tips_wrap").show()
}
);
t("#js_searchbox").delegate(".js_hongbao .icon", "mouseleave", function() {
t(this).parent().find(".p_tips_wrap").hide()
}
)
}
function F() {}
var n = e.____MODULES["6c3d4ae0ad0febfe6f9a76151554d071"];
var r = e.____MODULES["7faee6b693f4e2083d1acf173419d3a9"]
, i = e.____MODULES["681d913194dacbca08ac8ff7cda322de"]
, s = e.____MODULES["d0cc25e64cb4a096b71b9e7656c9fea6"]
, o = e.____MODULES["2a741cbb28b35685ef93cb2fef565de3"]
, u = e.____MODULES["730e44f6d1437e50c5f7efd3e06bd421"]
, a = e.____MODULES["bbeaf2a81ae402d459b7624f09c2dc0f"]
, f = e.____MODULES["89090db65dde52b7d77fe5f05d62952b"];
var l = false;
var c = null ;
var h = "#js_inter_tab";
var p = "#js_domestic_tab";
var d = "#js_tj_tab";
var v = "#js_flighttype_tab_domestic";
var m = "#js_flighttype_tab_inter";
var g = "#js_flighttype_tab_tj";
var y = null ;
var b = new u;
var w = new s;
var E = new i;
var S = new o;
var x = new r;
var T = D().from;
var N = null ;
var C = false;
var k = false;
var L = "#js_flight_domestic_searchbox";
var A = "#js_flight_international_searchbox";
var O = "#js_flight_tj_searchbox";
t.extend(F.prototype, {
init: function(e) {
if (l) {
return
}
c = t(e);
var n = QTMPL.FlightSearchBox.render({
placeholder: "城市名"
});
c.html(n);
H(this);
M(this);
_();
l = true;
return c
},
parseHistory: function(e) {
if (!e) {
return
}
N = e;
var n = N.domesticFirst;
var r = N.interFirst;
n && b.fill(N.domesticFirst);
if (!y) {
y = t(h)
}
if (r && (!n || parseInt(r.timestamp, 10) - parseInt(n.timestamp, 10) > 0)) {
t(m).show();
y.trigger("click")
}
}
});
return F
}
(jQuery)
}
(t.exports, t, e);
e.____MODULES["2232191a5b9f0d077f6f7f8337fe79ab"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "80f7c723bd58f67fc0f0df1fbd2da1c2",
filename: "home.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(t, n, r) {
(function(t) {
function i() {
function E() {
if (!i) {
if (!QNR.AD.isInited) {
QNR.AD.initCallBack = function() {
QNR.AD.loadOneAD("ifrCataAd");
i = true
}
} else {
QNR.AD.loadOneAD("ifrCataAd");
i = true
}
}
}
var e = new n;
e.init("#js_searchbox_flight");
var i = false;
t("#js_nva_cgy a").click(function(e) {
e.preventDefault()
}
);
var c = t("#js_searchbox");
var p = c.find(".js-searchnav");
var v = c.find(".js-searchbox-panel");
var m = d();
var g = m.tab ? m.tab : "flight";
var y = m.from ? m.from : null ;
var b = null ;
var w = null ;
if (m.ex_track && m.ex_track === "auto_4efe832e") {
g = "hotel";
w = "f_sg"
}
if (y && y === "mobile") {
Cookie.setCookie("QN163", 1, null , ".qunar.com", "/")
} else {
Cookie.setCookie("QN163", 0, null , ".qunar.com", "/")
}
p.click(function() {
p.removeClass("cur");
t(this).addClass("cur");
var e = t(this).attr("data-for");
v.hide();
var n = t("#js_searchbox_" + e);
n.show();
switch (e) {
case "flight":
E();
trackAction("QH|SB|flight");
gaClk("tab_flight");
break;
case "hotel":
t.qload("hotel", function() {
s(n, y, w)
}
);
trackAction("QH|SB|hotel");
gaClk("tab_hotel");
break;
case "tuan":
t.qload("tuan", function() {
o(n)
}
);
trackAction("QH|SB|tuan");
gaClk("tab_tuan");
break;
case "piao":
t.qload("piao", function() {
u(n)
}
);
trackAction("QH|SB|piao");
gaClk("tab_piao");
break;
case "package":
t.qload("package", function() {
f(n)
}
);
trackAction("QH|SB|package");
gaClk("tab_package");
break;
case "car":
t.qload("car", function() {
a(n)
}
);
trackAction("QH|SB|car");
gaClk("tab_car");
break;
case "train":
if (!b) {
b = new r(n)
} else {
!b.isReady && b.init(n)
}
gaClk("tab_train");
break
}
}
);
l(e);
var S = {
flight: true,
hotel: true,
tuan: true,
piao: true,
"package": true,
car: true
};
if (QNR.AD) {
QNR.AD.initCallBack = null
}
if (g && g !== "flight" && S[g]) {
h(g, c)
}
if (g === "flight" || !S[g]) {
E()
}
}
function s(e, t, n) {
var r = new HotelSearchBox;
r.init(e);
if (t || n) {
r.setExtraFromParam(n);
r.setUrlFromParam(t);
r.initSearchBoxFromParam()
}
}
function o(e) {
TuanLoader.load(e)
}
function u(e) {
PiaoLoader.load(e)
}
function a(e) {
CarLoader.load(e)
}
function f(e) {
PackageLoader.load(e)
}
function l(e) {
t.qhistory.init({
success: function(t) {
e.parseHistory(t.flight);
window.QunarHistory.data = t
}
})
}
function c() {
var e = new HotPiaoBox;
e.init()
}
function h(e, t) {
var n = t.find("li[data-for='" + e + "']");
n.click()
}
function p(e) {
var t = {};
if (e) {
var n = e.charAt(0) === "?" || e.charAt(0) === "#" ? e.substr(1) : e;
var r = n.split("&");
for (var i = 0, s = r.length; i < s; i++) {
var o = r[i].indexOf("=");
if (o > 0) {
try {
t[decodeURIComponent(r[i].substr(0, o))] = decodeURIComponent(r[i].substr(o + 1))
} catch (u) {}
}
}
}
return t
}
function d() {
var e = p(location.search);
var n = p(location.hash);
var r = t.extend({}, n, e);
return r
}
window.patch = {};
window.GSERVER_TIME = null ;
window.QunarHistory = {};
var n = e.____MODULES["2232191a5b9f0d077f6f7f8337fe79ab"];
var r = e.____MODULES["68e710ac058a54890a45afa4d0ad3ce1"];
//document.domain = "qunar.com";
document.domain = "106.185.49.38";
(new Image).src = "/s/images/loading.gif";
t(function() {
i()
}
);
t.qload("patch", function() {
var e = window.patch;/*modify*/
/* e.onsale.initData();
e.guide.init();
e.travel.init();
e.tuan.init();
e.gongyu.init();
e.piao.init();
e.dujia.init();
e.editor.initData()*/
}
)
}
)(jQuery)
}
(t.exports, t, e);
e.____MODULES["80f7c723bd58f67fc0f0df1fbd2da1c2"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "fe4268194880ee18201dac398d5c733e",
filename: "respond.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
var r = 0;
$(window).on("resize", function() {
if ($(window).width() < 1200) {
$("html").addClass("q_home_respond");
$(".q_header").removeClass("q_header_max");
if (!r) {
gaClk("窄版");
r = 1
}
} else {
$("html").removeClass("q_home_respond");
$(".q_header").addClass("q_header_max");
if (!r) {
gaClk("宽版");
r = 1
}
}
}
).trigger("resize")
}
(t.exports, t, e);
e.____MODULES["fe4268194880ee18201dac398d5c733e"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "ec5cd60b3daca538b011c9675bfe4176",
filename: "adv.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
(function(e) {
"$doc:nomunge, $head:nomunge";
function y(t, n, r, i) {
var s, o = n.document, u = o.getElementById(t);
if (u) {
r.id = t;
if (/MSIE/i.test(navigator.appVersion)) {
var a = [];
a.push('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
for (var f in r) {
if (r.hasOwnProperty(f)) {
f = f.toLowerCase();
if (f === "data") {
i.movie = r[f]
} else if (f === "styleclass") {
a.push(' class="', r[f], '"')
} else if (f !== "classid") {
a.push(" ", f, '="', r[f], '"')
}
}
}
a.push(">");
for (var l in i) {
if (i.hasOwnProperty(l)) {
a.push('<param name="', l, '" value="', i[l], '" />')
}
}
a.push("</object>");
u.outerHTML = a.join("");
s = o.getElementById(r.id)
} else {
var c = o.createElement("object");
c.style.outline = "none";
c.setAttribute("type", "application/x-shockwave-flash");
for (var h in r) {
if (r.hasOwnProperty(h)) {
h = h.toLowerCase();
if (h === "styleclass") {
c.setAttribute("class", r[h])
} else if (h !== "classid") {
c.setAttribute(h, r[h])
}
}
}
for (var p in i) {
if (i.hasOwnProperty(p) && p.toLowerCase() !== "movie") {
var d = o.createElement("param");
d.setAttribute("name", p);
d.setAttribute("value", i[p]);
c.appendChild(d)
}
}
u.parentNode.replaceChild(c, u);
s = c
}
if (t === "banner_dynamic_left" && typeof e.codeReheight === "function") {
e.codeReheight()
}
}
return s
}
function b(e, t, n, r) {
if (!g())
return null ;
return y(e, t, n, r)
}
function w(e) {
return r.getElementById(e)
}
function E(e, t) {
return e.getAttribute("data-" + t)
}
function C(e) {
var t = [];
for (var n in e) {
t.push(n + "=" + encodeURIComponent(e[n]))
}
return t.join("&")
}
function k(e) {
var t = x
, n = "/js.ng/";
if (e.type === "qde_text") {
n = e.adurl ? "/" + e.adurl + "?" : "/qadjs14_css.nghtml?"
}
var r = N;
if (e.id === QNR.AD.__cur_qde_ad) {
N = String(+(new Date)) + parseInt(Math.random() * 1e7, 10)
}
var i = ["http://", t, n, "framId=", e.id, "&", e.query, "&tile=", r];
if (d) {
i.push("&city=", d)
}
if (u) {
i.push("&adtest=beta")
}
if (h) {
i.push(h)
}
return i.join("")
}
function L(e) {
return lt(e.id).urlPath(e)
}
function A(e) {
var t = "";
switch (e.type) {
case "qde":
case "qde_text":
t = k(e);
break;
case "qad":
t = L(e);
break;
default:
break
}
return t
}
function O() {
return r.createElement("div")
}
function M() {
var e = r.createElement("iframe");
e.setAttribute("height", 0);
e.setAttribute("frameBorder", 0);
e.setAttribute("scrolling", "no");
e.style.display = "none";
return e
}
function _(e, t) {
if (t && t.parentNode) {
t.parentNode.insertBefore(e, t)
}
}
function D(e, t) {
var n = e === "div" ? O() : M();
if (t && t.style) {
n.style.cssText = t.style
}
if (e === "iframe") {
n.style.display = "none"
}
return n
}
function P(e, t) {
t = t || "div";
var n = S(e)
, r = D(t, n);
return r
}
function H(e) {
var t = P(e, "div")
, n = w(e);
if (n && n.parentNode) {
n.parentNode.insertBefore(t, n)
}
return t
}
function B(e) {
var t = r.createElement("script");
t.charset = "utf-8";
t.async = true;
t.src = e;
s.insertBefore(t, s.lastChild)
}
function F(e) {
if (!j) {
j = O();
j.style.display = "none";
document.body.appendChild(j)
}
j.appendChild(e)
}
function q() {
if (I)
return I;
var e = r[t]("abbr")
, n = [];
for (var i = 0, s = e.length; i < s; i++) {
if (E(e[i], "type") && E(e[i], "lazyAD") !== "1") {
n.push(e[i])
}
}
return n
}
function R(e, t) {
e = e || [];
t = t || {};
var n = {}, r, i, s, u = /chan=([a-z_]+)/, a;
for (var f = 0, c = e.length; f < c; f++) {
r = e[f];
i = S(r);
if (i.type === "qad") {
i.callback = QNR.AD.getCallbackName(i.id, true)
}
s = A(i);
if (!l && i.type === "qde") {
a = u.exec(s);
if (a && a[1])
l = a[1]
}
if (s) {
n[i.id] = s
}
}
return {
ads: n,
domain: o
}
}
function z() {
if (U) {
setTimeout(function() {
if (U) {
U.parentNode.removeChild(U);
U = null
}
}
, 0)
}
}
function W(e) {
var t = r.createElement("div");
t.style.display = "none";
var n = [];
f = "/s/vata.php?chan=" + (l || ""),
n.push('<form name="vata_main_form" target="vata_main_frame" action="' + f + '" method="POST">');
e.ads = e.ads || {};
for (var i in e.ads) {
if (e.ads.hasOwnProperty(i)) {
n.push('<input type="text" name="', i, '" value="', e.ads[i], '" />')
}
}
n.push("</form>");
n.push("<iframe src='' name='vata_main_frame' id='vata_main_frame'></iframe>");
t.innerHTML = n.join("");
U = t;
F(t);
if (/MSIE/i.test(navigator.appVersion)) {
w("vata_main_frame").src = "javascript:'<script>window.onload=function(){document.write(\\'<script>document.domain=\\\"" + o + "\\\";parent.document.vata_main_form.submit();<\\\\/script>\\');document.close();};</script>'"
} else {
r.vata_main_form.submit()
}
}
function X(e) {
var t = q();
var n = [], r, i = function(t) {
r = E(t, "type");
if (r === "qde_auto") {
it(t)
} else if (a === 1 || r === "qde_text") {
st(t, e || {})
} else {
n.push(t)
}
}
;
for (var s = 0, o = t.length; s < o; s++) {
i(t[s])
}
var u = n.length;
if (u == 1) {
st(n[0], e || {})
} else if (u > 1) {
I = n;
W(R(n, e))
}
}
function V(e, t) {
if (e.attachEvent) {
e.attachEvent("onload", t)
} else {
e.onload = t
}
}
function $(e, t) {
if (e == null  || e != e.window) {
return false
}
var n = e.frameElement;
var r = e.document.body;
var i = function(s) {
n.style.display = "";
var o = r.offsetHeight;
if (!s) {
V(e, function() {
i(true)
}
)
}
if (o == 0) {
n.style.display = "none"
} else {
n.style.height = o + "px";
t && t()
}
}
;
i()
}
function Q(e, t) {
var n = J[t];
var r = n && n.join("") || "";
if (r) {
n.length = 0;
e.write(r)
} else {
ut(t, false)
}
}
function Y(e, t) {
var n = G[t] || 0;
G[t] = "";
n && e.write(n)
}
function Z(e, t) {
e = e || "ad_queue_all";
if (!J[e]) {
J[e] = []
}
J[e].push(t)
}
function et(e) {
return c + (K ? "&rnd=" + e : "") + "#" + e
}
function tt(e, t, n, r) {
var i = [];
if (e) {
i[i.length] = "<style>" + e + "</style>"
}
if (t) {
i[i.length] = t.replace(/(scr)_(ipt)/gi, "$1$2")
}
if (n) {
i[i.length] = '<script type="text/javascript">' + n + "</script>"
}
if (r) {
i[i.length] = '<script type="text/javascript" src="' + r + '"></script>'
}
return i.join("")
}
function nt(e, t) {
var n = et(e)
, r = P(e, "iframe");
r.src = n;
if (t == 1) {
F(r)
} else {
var i = w(e);
_(r, i)
}
}
function rt(e, t, n) {
var r = w(e)
, i = P(e, "iframe");
i.style.display = "";
i.src = t;
i.id = n || e;
r.parentNode.replaceChild(i, r)
}
function it(e) {
var t = e.getAttribute("data-src");
if (t) {
rt(e.id, t)
}
}
function st(e) {
var t = S(e), n = t.id, r, i, s = "";
if (!n) {
return
}
if (t.type === "qad") {
t.callback = QNR.AD.getCallbackName(n);
i = A(t);
if (i)
B(i)
} else {
i = A(t);
if (!i)
return;
if (t.type === "qde_text") {
s = "call_show=1;";
r = tt("", "", s, i);
Z(n, r)
} else {
r = '<script type="text/javascript" src="' + i + '"></script>';
G[n] = r
}
nt(n, 0)
}
}
function ot(e, t, n, r, i, s) {
if (n === '<div style="display:none"></div>') {
return
}
var o = w(e)
, u = ""
, f = false;
if (!o)
return;
f = n && /top.QNR.AD.run_in_content/.test(n);
if (f)
s = 1;
if (!f) {
ut(e, true)
}
if (a === 1) {
if (s != 1) {
r = r || "";
r = "call_show = 1;" + r
}
u = tt(t, n, r, i);
if (f) {
u = u + "<script>writeContent(document,Current_ad_id);</script>"
}
Z(e, u);
return
}
if (s == 1) {
u = tt(t, n, r, i);
if (u) {
u = '<script type="text/javascript">Current_ad_id = "' + e + '";</script>' + u
}
} else {
r = "call_show=1;" + r;
u = tt(t, n, r, i);
s = 0
}
Z(e, u);
nt(e, s)
}
function ut(e, t) {
var n = QNR.AD._DE;
if (e) {
if (n[e]) {
n[e](t);
delete n[e]
}
return
}
for (var r in n) {
n[r](false)
}
QNR.AD._DE = {}
}
function at(e) {
this.$aid = e;
this.params = {}
}
function lt(e, t) {
if (!ft[e]) {
ft[e] = new at(e)
}
t && t(ft[e]);
return ft[e]
}
if (typeof e.QNR === "undefined") {
e.QNR = {}
}
QNR._AD = {};
var t = "getElementsByTagName";
var n = e, r = n.document, i = r.body, s = r[t]("head")[0], o = "qunar.com", u = false, a = 0, f, l, c, h, p, d, v;
try {
r.domain = o
} catch (m) {}
var g = function() {
var e = n.navigator
, t = "application/x-shockwave-flash";
var r = false, i, s;
var o = e.mimeTypes && e.mimeTypes[t] ? e.mimeTypes[t].enabledPlugin : 0;
if (o) {
s = o.description;
if (parseInt(s.substring(s.indexOf(".") - 2), 10) >= 8) {
r = true
}
} else if (n.ActiveXObject) {
try {
i = new n.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if (i) {
r = true
}
} catch (u) {}
}
g = function() {
return r
}
;
o = i = s = e = null ;
return r
}
;
var S = function() {
function n(t) {
var n = {}, r;
if (!t)
return {};
n.id = t.id;
for (var i = 0, s = e.length; i < s; i++) {
r = e[i];
n[r] = E(t, r)
}
if (n.type === "qde_text") {
n["adurl"] = E(t, "adurl")
}
return n
}
var e = ["type", "style", "query", "main"]
, t = {};
return function(e) {
var r, i;
if (typeof e === "string") {
r = e
} else {
r = e.id;
i = e
}
if (!t[r])
t[r] = n(i || w(r));
return t[r]
}
}
();
var x = "qde.qunar.com"
, T = "a.qunar.com";
var N = String(+(new Date)) + parseInt(Math.random() * 1e7, 10);
var j;
var I;
var U;
var J = {};
var K = /MSIE 6\.0/.test(navigator.userAgent);
var G = {};
at.prototype = {
constructor: at,
createCall: function(e) {
var t = this;
QNR._AD[this.$aid] = function(n) {
e(n, t)
}
},
createDiv: function() {
return H(this.$aid)
},
set: function(e, t) {
this.params[e] = t;
return this
},
getId: function() {
return this.$aid
},
run_in_iframe: function(e, t) {
if (typeof t == "undefined") {
t = 1
}
QNR.AD.add_AD_iframe(this.$aid, e, t)
},
urlPath: function(e) {
var t = ["http://", T, "/vataplan?", "framId=", e.id, "&", e.query, "&callback=", e.callback, "&tile=", N];
if (p) {
t.push(p)
}
var n = C(this.params);
n && t.push("&", n);
if (d) {
t.push("&city=", d)
}
return t.join("")
},
load: function() {
QNR.AD.loadOneAD(this.$aid)
}
};
var ft = {};
QNR.AD = {
version: "4.3",
_AD: {},
_DE: {},
run_in_content: ot,
run_queue_list: function() {
var e = "ad_queue_all";
var t = J[e];
var n = t && t.join("") || "";
if (n) {
t.length = 0;
n += '<script type="text/javascript">writeContent(document,"ad_queue_all");</script>';
Z(e, n);
nt(e, 1)
}
z();
ut()
},
writeHeadScript: Y,
create_div_container: H,
writeContent: Q,
$inject_flash: b,
createAdFrame: rt,
createQAd: lt,
add_AD_iframe: function(e, t, n) {
if (!t)
return;
if (n)
t = t + '<script type="text/javascript">call_show=1;</script>';
Z(e, t);
nt(e, 0)
},
init: function(e) {
u = e.debug || false;
a = e.type || "";
if (K) {
a = 1
}
d = e.ip || "";
h = e.qde_plus || "";
p = e.qad_plus || "";
c = e.blank_html || "";
v = e;
if (u) {
x = "qdebeta.qunar.com"
}
X(e)
},
show: function(e, t) {
$(e, function() {
QNR.AD.callWinShowFun(t, e)
}
)
},
getCallbackName: function(e, t) {
return (t ? "parent." : "") + "QNR._AD." + e
},
callWinShowFun: function(e, t) {
var n = e + "_win_"
, r = QNR._AD[n];
if (r)
r(e, t)
},
createWinShowCall: function(e, t) {
var n = e + "_win_";
QNR._AD[n] = t
},
createCallback: function(e, t) {
var n = lt(e);
n.createCall(function(e) {
var r = n.createDiv();
t(r, e)
}
)
},
createQdeCallback: function(e, t) {
QNR.AD._DE[e] = function(n) {
t(n, e)
}
},
callBackQDE: ut,
change_one_async: function() {
var e = v;
e.type = 1;
QNR.AD.init(e);
z()
},
loadOneAD: function(e) {
var t = w(e);
if (t) {
st(t)
}
}
}
}
)(this)
}
(t.exports, t, e);
e.____MODULES["ec5cd60b3daca538b011c9675bfe4176"] = t.exports
}
)(this);
(function(e) {
var t = {
id: "03c4d937bd5f252bb22c371e23ef69fb",
filename: "ips.js",
exports: {}
};
if (!e.____MODULES) {
e.____MODULES = {}
}
var n = function(e, t, n) {
window.QNR.ips = function(e) {
function o(e, n) {
s.push(e);
if (i) {
return
}
var o = t.createElement("script");
a.callback = function(e) {
if (r !== null ) {
return
}
r = e.city || "";
u();
o.parentNode.removeChild(o)
}
;
o.type = "text/javascript";
o.charset = "utf-8";
o.src = "/s/ips.php?callback=QNR.ips.callback&_=" + +(new Date);
o.async = true;
var f = t.getElementsByTagName("head");
container = f ? f[0] : document.documentElement;
container.insertBefore(o, container.firstChild);
i = 1;
setTimeout(function() {
a.callback({})
}
, n || 2e3)
}
function u() {
for (var e = 0, t = s.length; e < t; e++) {
s[e].call(null , r)
}
s.length = 0
}
function a(e, t) {
e = e || function() {}
;
if (r !== null ) {
e.call(null , r)
} else {
o(e, t)
}
}
var t = e.document
, n = location.search.match(/debug=city=([^&#]+)/)
, r = n ? decodeURI(n[1]) : null
, i = 0
, s = [];
return a
}
(this)
}
(t.exports, t, e);
e.____MODULES["03c4d937bd5f252bb22c371e23ef69fb"] = t.exports
}
)(this);
$("#js_inter_tab").trigger("click");
