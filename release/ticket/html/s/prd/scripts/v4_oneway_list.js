function CACTI_monitoring(e) {
    this.timerList = e.timerList || ["t_done"];
    this._timersEnded = 0;
    this._url = e.url;
    this._pageId = e.pageId;
    this._init()
}
function SingleTripFlightWrapperListEntity() {
    SingleTripFlightWrapperListEntity.superclass.constructor.call(this)
}
function SingleTripFlightWrapperEntity(e) {
    SingleTripFlightWrapperEntity.superclass.constructor.call(this, e);
    this._type = "SingleTripFlightWrapperEntity"
}
function _sortByTypeAndPrice(e, t, n, r) {
    for (var i = 0; i < e.length - 1; i++) {
        for (var s = 0; s < e.length - 1 - i; s++) {
            var o = e[s];
            var u = e[s + 1];
            if (t[o].deptTimeValue() !== t[u].deptTimeValue()) {
                continue
            }
            var a = t[o].type === "transfer" ? t[o].firstTrip() : t[o];
            var f = t[u].type === "transfer" ? t[u].firstTrip() : t[u];
            var l = 1;
            var c = 1;
            var h = 0;
            var p = 0;
            var d = r === "norank" ? _getLowestPrice(o, t) : _getsortPrice(o, t);
            var v = r === "norank" ? _getLowestPrice(u, t) : _getsortPrice(u, t);
            if (d > v) {
                p += l
            }
            if (d < v) {
                h += l
            }
            if (h == p) {
                h += n && a.isCodeShare() ? 0 : c;
                p += n && f.isCodeShare() ? 0 : c
            }
            if (h == p) {
                h += o > u ? 0 : 1;
                p += o < u ? 0 : 1
            }
            if (h < p) {
                e[s + 1] = o;
                e[s] = u
            }
        }
    }
}
function _calculateTimeD(e) {
    var t = "14:00".split(":");
    var n = e.split(":");
    var r = new Date;
    r.setHours(parseInt(n[0], 10), parseInt(n[1], 10));
    var i = new Date;
    i.setHours(parseInt(t[0], 10), parseInt(t[1], 10));
    return Math.abs(i - r) / 1e3
}
function PagerUI(e) {
    PagerUI.superclass.constructor.call(this, e);
    this._type = "PagerUI"
}
function pageCreator(e, t, n) {
    var r = t;
    var i = e;
    var s = s || 4;
    this.renderPrevpage = function() {}
    ;
    this.renderNextpage = function() {}
    ;
    this.renderPage = function() {}
    ;
    this.renderPrefixDot = function() {}
    ;
    this.renderSuffixDot = function() {}
    ;
    this._renderPage = function(e) {
        this.renderPage(e, e == i)
    }
    ;
    this.render = function() {
        var e = false;
        var t = false;
        var n = r - 1;
        for (var o = 0; o <= n; o++) {
            if (o == 0 && i > 0) {
                this.renderPrevpage(i - 1)
            }
            if (i - s > o && !e) {
                this._renderPage(0);
                if (i - s > 1) {
                    this.renderPrefixDot()
                }
                e = true
            }
            if (i - s <= o && i + s >= o) {
                this._renderPage(o)
            }
            if (i + s < o && !t) {
                if (i + s < n - 1) {
                    this.renderSuffixDot()
                }
                this._renderPage(n);
                t = true
            }
            if (o == n && i < n) {
                this.renderNextpage(i + 1)
            }
        }
    }
}
function OnewayPagerUI(e) {
    OnewayPagerUI.superclass.constructor.call(this, e);
    this._type = "OnewayPagerUI";
    this._bindClickEvent()
}
function SearchStatusbar(e) {
    SearchStatusbar.superclass.constructor.call(this, e);
    this._type = "SearchStatusbar";
    this._init()
}
function OneWaySearchStatusbar(e) {
    OneWaySearchStatusbar.superclass.constructor.call(this, e);
    this._type = "OneWaySearchStatusbar";
    this._init()
}
function TransferFlightUI(e) {
    TransferFlightUI.superclass.constructor.call(this, e);
    this._type = "TransferFlightUI"
}
function TransferFlightVendorListUI(e) {
    TransferFlightVendorListUI.superclass.constructor.call(this, e);
    this._type = "TransferFlightVendorListUI";
    var t = null ;
    this.owner = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
    ;
    UICacheManager.addToCache(this)
}
function TransferFlightWrapperListUI(e) {
    TransferFlightWrapperListUI.superclass.constructor.call(this, e);
    var t = null ;
    this.ownerVendor = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
}
function SingleTripFlightWrapperUI(e) {
    SingleTripFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "SingleTripFlightWrapperUI"
}
function ZiyouxingSingleTripFlightWrapperUI(e) {
    ZiyouxingSingleTripFlightWrapperUI.superclass.constructor.call(this, e);
    this._type = "ZiyouxingSingleTripFlightWrapperUI"
}
function ControlVersion() {
    var e;
    var t;
    var n;
    try {
        t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        e = t.GetVariable("$version")
    } catch (n) {}
    if (!e) {
        try {
            t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            e = "WIN 6,0,21,0";
            t.AllowScriptAccess = "always";
            e = t.GetVariable("$version")
        } catch (n) {}
    }
    if (!e) {
        try {
            t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            e = t.GetVariable("$version")
        } catch (n) {}
    }
    if (!e) {
        try {
            t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            e = "WIN 3,0,18,0"
        } catch (n) {}
    }
    if (!e) {
        try {
            t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            e = "WIN 2,0,0,11"
        } catch (n) {
            e = -1
        }
    }
    return e
}
function GetSwfVer() {
    var e = -1;
    if (navigator.plugins != null  && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var t = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var n = navigator.plugins["Shockwave Flash" + t].description;
            var r = n.split(" ");
            var i = r[2].split(".");
            var s = i[0];
            var o = i[1];
            var u = r[3];
            if (u == "") {
                u = r[4]
            }
            if (u[0] == "d") {
                u = u.substring(1)
            } else if (u[0] == "r") {
                u = u.substring(1);
                if (u.indexOf("d") > 0) {
                    u = u.substring(0, u.indexOf("d"))
                }
            }
            var e = s + "." + o + "." + u
        }
    } else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1)
        e = 4;
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1)
        e = 3;
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1)
        e = 2;
    else if (isIE && isWin && !isOpera) {
        e = ControlVersion()
    }
    return e
}
function DetectFlashVer(e, t, n) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false
    } else if (versionStr != 0) {
        if (isIE && isWin && !isOpera) {
            tempArray = versionStr.split(" ");
            tempString = tempArray[1];
            versionArray = tempString.split(",")
        } else {
            versionArray = versionStr.split(".")
        }
        var r = versionArray[0];
        var i = versionArray[1];
        var s = versionArray[2];
        if (r > parseFloat(e)) {
            return true
        } else if (r == parseFloat(e)) {
            if (i > parseFloat(t))
                return true;
            else if (i == parseFloat(t)) {
                if (s >= parseFloat(n))
                    return true
            }
        }
        return false
    }
}
function AC_AddExtension(e, t) {
    if (e.indexOf("?") != -1)
        return e.replace(/\?/, t + "?");
    else
        return e + t
}
function AC_Generateobj(e, t, n) {
    var r = "";
    if (isIE && isWin && !isOpera) {
        r += "<object ";
        for (var i in e) {
            r += i + '="' + e[i] + '" '
        }
        r += ">";
        for (var i in t) {
            r += '<param name="' + i + '" value="' + t[i] + '" /> '
        }
        r += "</object>"
    } else {
        r += "<embed ";
        for (var i in n) {
            r += i + '="' + n[i] + '" '
        }
        r += "> </embed>"
    }
    return r
}
function AC_FL_RunContent() {
    var e = AC_GetArgs(arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
    return AC_Generateobj(e.objAttrs, e.params, e.embedAttrs)
}
function AC_SW_RunContent() {
    var e = AC_GetArgs(arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000", null );
    return AC_Generateobj(e.objAttrs, e.params, e.embedAttrs)
}
function AC_GetArgs(e, t, n, r, i) {
    var s = new Object;
    s.embedAttrs = new Object;
    s.params = new Object;
    s.objAttrs = new Object;
    for (var o = 0; o < e.length; o = o + 2) {
        var u = e[o].toLowerCase();
        switch (u) {
        case "classid":
            break;
        case "pluginspage":
            s.embedAttrs[e[o]] = e[o + 1];
            break;
        case "src":
        case "movie":
            e[o + 1] = AC_AddExtension(e[o + 1], t) + "?" + qunarflashver;
            s.embedAttrs["src"] = e[o + 1];
            s.params[n] = e[o + 1];
            break;
        case "onafterupdate":
        case "onbeforeupdate":
        case "onblur":
        case "oncellchange":
        case "onclick":
        case "ondblclick":
        case "ondrag":
        case "ondragend":
        case "ondragenter":
        case "ondragleave":
        case "ondragover":
        case "ondrop":
        case "onfinish":
        case "onfocus":
        case "onhelp":
        case "onmousedown":
        case "onmouseup":
        case "onmouseover":
        case "onmousemove":
        case "onmouseout":
        case "onkeypress":
        case "onkeydown":
        case "onkeyup":
        case "onload":
        case "onlosecapture":
        case "onpropertychange":
        case "onreadystatechange":
        case "onrowsdelete":
        case "onrowenter":
        case "onrowexit":
        case "onrowsinserted":
        case "onstart":
        case "onscroll":
        case "onbeforeeditfocus":
        case "onactivate":
        case "onbeforedeactivate":
        case "ondeactivate":
        case "type":
        case "codebase":
        case "id":
            s.objAttrs[e[o]] = e[o + 1];
            break;
        case "width":
        case "height":
        case "align":
        case "vspace":
        case "hspace":
        case "class":
        case "title":
        case "accesskey":
        case "name":
        case "tabindex":
            s.embedAttrs[e[o]] = s.objAttrs[e[o]] = e[o + 1];
            break;
        default:
            s.embedAttrs[e[o]] = s.params[e[o]] = e[o + 1]
        }
    }
    s.objAttrs["classid"] = r;
    if (i)
        s.embedAttrs["type"] = i;
    return s
}
function thisMovie(e) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[e]
    } else {
        return document[e]
    }
}
function getData() {
    return "http://ws.qunar.com/holidayService.jcp?lane=" + encodeURIComponent(Trendflash.args["dc"]) + "-" + encodeURIComponent(Trendflash.args["ac"])
}
function createUrl(e, t, n, r, i) {
    if (!$jex.define(e) || !$jex.define(t) || !$jex.define(n) || !$jex.define(r) || !$jex.define(i)) {
        return
    }
    var s = "/site/oneway_list.htm?searchDepartureAirport=" + encodeURIComponent(e) + "&searchArrivalAirport=" + encodeURIComponent(t) + "&searchDepartureTime=" + n + "&arrivalTime=" + r + "&nextNDays=0&searchType=OneWayFlight&startSearch=true&from=sr_trendflash";
    var o = QLib && QLib.getEx_track && QLib.getEx_track();
    if (o) {
        s += "&" + o
    }
    window.open(s)
}
function getMiprice(e, t) {
    var n = Trendflash.args["MandatoryInsurance"];
    if (n[e]) {
        if (t <= n[e].deals) {
            return n[e].price
        } else {
            return false
        }
    }
}
function unLock(e) {}
function SortHandler(e) {
    SortHandler.superclass.constructor.call(this, e);
    this._type = "SortHandler";
    this._init();
    var t = true;
    this.state = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
}
function BookBtnTracker(e) {
    this.condition = {};
    this.service = e.service;
    this.analyzer = e.analyzer;
    this.resultList = e.resultList;
    this.filterGroup = e.filterGroup;
    this.pager = e.pager;
    this.pagesizer = e.pagesizer;
    this.sort_price_handler = e.sort_price_handler;
    this.sort_time_handler = e.sort_time_handler;
    this.init(e)
}
function FEMonitor(e) {
    e = $jex.merge({
        logurl: "http://femon.qunar.com/felog",
        interval: 0,
        module: "F"
    }, e);
    this._init(e)
}
if (typeof JSON !== "object") {
    JSON = {}
}
(function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e
    }
    function quote(e) {
        escapable.lastIndex = 0;
        return escapable.test(e) ? '"' + e.replace(escapable, function(e) {
            var t = meta[e];
            return typeof t === "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }
        ) + '"' : '"' + e + '"'
    }
    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        if (a && typeof a === "object" && typeof a.toJSON === "function") {
            a = a.toJSON(e)
        }
        if (typeof rep === "function") {
            a = rep.call(t, e, a)
        }
        switch (typeof a) {
        case "string":
            return quote(a);
        case "number":
            return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
            return String(a);
        case "object":
            if (!a) {
                return "null"
            }
            gap += indent;
            u = [];
            if (Object.prototype.toString.apply(a) === "[object Array]") {
                s = a.length;
                for (n = 0; n < s; n += 1) {
                    u[n] = str(n, a) || "null"
                }
                i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]";
                gap = o;
                return i
            }
            if (rep && typeof rep === "object") {
                s = rep.length;
                for (n = 0; n < s; n += 1) {
                    if (typeof rep[n] === "string") {
                        r = rep[n];
                        i = str(r, a);
                        if (i) {
                            u.push(quote(r) + (gap ? ": " : ":") + i)
                        }
                    }
                }
            } else {
                for (r in a) {
                    if (Object.prototype.hasOwnProperty.call(a, r)) {
                        i = str(r, a);
                        if (i) {
                            u.push(quote(r) + (gap ? ": " : ":") + i)
                        }
                    }
                }
            }
            i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}";
            gap = o;
            return i
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null 
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            " ": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(e, t, n) {
            var r;
            gap = "";
            indent = "";
            if (typeof n === "number") {
                for (r = 0; r < n; r += 1) {
                    indent += " "
                }
            } else if (typeof n === "string") {
                indent = n
            }
            rep = t;
            if (t && typeof t !== "function" && (typeof t !== "object" || typeof t.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": e
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i === "object") {
                    for (n in i) {
                        if (Object.prototype.hasOwnProperty.call(i, n)) {
                            r = walk(i, n);
                            if (r !== undefined) {
                                i[n] = r
                            } else {
                                delete i[n]
                            }
                        }
                    }
                }
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }
                )
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}
)();
var newTrackAction = trackAction;
trackAction = function() {
    $jex.console.trace("CALL OLD API __ trackAction")
}
;
var TsinghuaOneWayTracker = function() {
    "use strict";
    var e = {};
    var t = document.cookie.match(/QunarGlobal=([^;]*)/);
    if (t) {
        t = t[1]
    }
    e.track = function(e, n, r, i, s) {
        var o = "/site/trace.htm?" + e + "=" + n + "&c=" + t;
        if (r) {
            o += "&t=" + r
        }
        if (i) {
            o += "&p=" + i
        }
        if (s) {
            o += s
        }
        if (o.length >= 1500) {
            return
        }
        try {
            (new Image).src = o
        } catch (u) {}
    }
    ;
    e.traceFlist = function(e) {
        var t = [];
        $jex.foreach(e, function(e) {
            var n = e.dataSource(), r, i;
            if (n.type === "transfer") {
                r = n.firstTrip();
                i = n.secondTrip();
                t.push([n.firstTrip().code() + "/" + n.secondTrip().code(), n.lowestPrice(), n.lowestDiscount(), n.secondTrip().deptDate(), [r.stopover() ? 1 : 0, r.codeShare() ? 1 : 0, r.isNextDate() ? 1 : 0].join(","), [i.stopover() ? 1 : 0, i.codeShare() ? 1 : 0, i.isNextDate() ? 1 : 0].join(",")].join("|"))
            } else {
                t.push([n.code(), n.lowestPrice(), n.lowestDiscount(), "", [n.stopover() ? 1 : 0, n.codeShare() ? 1 : 0, n.isNextDate() ? 1 : 0].join(","), ""].join("|"))
            }
        }
        );
        this.track("flist", t.join("^"), System.service.traceTimeStamp)
    }
    ;
    e.traceReAndRfList = function(e) {
        var t = [];
        var n = [];
        $jex.foreach(e, function(e) {
            var r = e.dataSource();
            var i = [];
            var s = r.type === "transfer";
            var o = s ? r.firstTrip().code() + "/" + r.secondTrip().code() : r.code();
            if (e.reWrCache) {
                var u = e.reWrCache.entity;
                var a = u.afeePrice() || u.bprPrice();
                t.push([o, u.wrapperId(), a].join("|"))
            }
            i.push([o, s ? r.firstTrip().plane().key + "/" + r.secondTrip().plane().key : r.plane().key, s ? r.firstTrip().deptTime().replace(":", "") + "/" + r.secondTrip().deptTime().replace(":", "") : r.deptTime().replace(":", ""), s ? r.firstTrip().arriTime().replace(":", "") + "/" + r.secondTrip().arriTime().replace(":", "") : r.arriTime().replace(":", ""), r.airportCodes().join("/"), s ? r.firstTrip().dptTower() + "/" + r.secondTrip().dptTower() : r.dptTower()].join("|"));
            var f = [0, 0];
            if (!s) {
                var l = e.sinfoCache
                  , c = ["lqf", "hot", "ps", "late", "lcc"];
                if (l) {
                    for (var h = 0; h < 5; h++) {
                        if (l[c[h]]) {
                            f[0] = h + 1;
                            break
                        }
                    }
                }
                var p = r.priceInfo && r.priceInfo();
                var d = p && p.tc || "";
                if (d && !r.isAV()) {
                    if (d.indexOf("头等") > -1) {
                        f[1] = 1
                    } else if (d.indexOf("公务") > -1 || d.indexOf("商务") > -1) {
                        f[1] = 2
                    }
                }
            }
            i.push(f.join(""));
            n.push(i.join("|"))
        }
        );
        if (t.length) {
            this.track("frecommend", t.join("^"), System.service.traceTimeStamp)
        }
        if (n.length) {
            this.track("fstatus", n.join("^"), System.service.traceTimeStamp)
        }
    }
    ;
    e.trackOnRefreshed = function(e) {
        this.traceFlist(e);
        this.traceReAndRfList(e)
    }
    ;
    var n = {};
    e.trackWrappers = function(e) {
        var t = System.service.wrapperExpandStamp && System.service.wrapperExpandStamp >= System.service.traceTimeStamp ? System.service.wrapperExpandStamp : System.service.traceTimeStamp;
        var r = e.code();
        var i = e.codeShare()
          , s = e.codeShareFlight();
        if (i && s) {
            if (r !== i) {
                r += ">" + i
            }
        }
        if (n[r + t]) {
            return
        } else {
            n[r + t] = true
        }
        var o = e.wrappers();
        var u = o._keysCache;
        var a = [];
        var f = [];
        var l = "";
        var c = parseInt(e.lowestPrice(), 10);
        var h = parseFloat(e.flightHistory()[1]);
        var p = e.extInfo();
        if (c && h) {
            if (c > h * 1.05) {
                l += "1"
            } else if (c <= h * 1.05 && c >= h * .95) {
                l += "0"
            } else if (c < h * .95) {
                l += "-1"
            }
        } else {
            l += "*"
        }
        if (p && p.ml === "true") {
            l += "1"
        } else {
            l += "0"
        }
        if (p && p.zj && p.zj.info) {
            l += "1"
        } else {
            l += "0"
        }
        $jex.foreach(u, function(t, n) {
            var r = o.get(t);
            var i = 0;
            if (r.bigLogoUrl()) {
                i = 1
            } else if (r.vendor().isSuperOTA()) {
                i = 2
            }
            a.push([r.wrapperId(), r.afeePrice() || 0, r.bprPrice() || 0, r.afee(), i, r.isApplyPrice() ? 1 : 0, e.type && e.type == "compose" ? "1" : "0"].join("|"));
            var s = r.vendor().starRank();
            var u = s && s.lv || 0;
            var l = r.vendor();
            f.push([r.wrapperId(), u ? [u.kd, u.ts, u.dw, u.db, u.ds].join(",") : 0, s ? s.count : 0, r.updateTime(), l.srv_CATA() ? 1 : 0, l.srv_ASSISTANT() ? 1 : 0, l.srv_ALLDAY() ? 1 : 0, r.getTGQInfo() ? 1 : 0, r.isFCabin() ? 1 : 0, l.isSuperOTA() ? 1 : 0].join("|"))
        }
        );
        var d = "";
        if (e.type == "onewayInTransfer") {
            d = "&package=" + e.owner().firstTrip().code() + "/" + e.owner().secondTrip().code()
        } else {
            d = "&package=" + e.code()
        }
        var v = 0;
        if (e.priceInfo) {
            v = e.priceInfo().wrlen
        }
        var m = e.getWrapperListType && e.getWrapperListType() || "";
        if (a.length > 0) {
            this.track("wlist", a.join("^"), System.service.traceTimeStamp, null , "&num=" + v + "&code=" + r + "&detail=" + l + d + "&wt=" + t + "&wtype=" + m)
        }
        if (f.length > 0) {
            this.track("wstatus", f.join("^"), System.service.traceTimeStamp, null , "&code=" + r + d + "&wt=" + t + "&wtype=" + m)
        }
    }
    ;
    e.trackLowPrChange = function(e, t) {
        var n = System.service.wrapperExpandStamp && System.service.wrapperExpandStamp >= System.service.traceTimeStamp ? System.service.wrapperExpandStamp : System.service.traceTimeStamp;
        var r = e.code();
        var i = e.wrappers();
        var s = i._keysCache || [];
        if (s.length == 0)
            return;
        var o = parseInt(e.lowestPrice(), 10);
        var u = 0;
        var a = [];
        var f, l;
        $jex.foreach(s, function(e, t) {
            f = i.get(e);
            a.push(f);
            l = f.afeePrice() || f.bprPrice();
            if (l == o) {
                u = 1
            }
        }
        );
        var c, h;
        var p = a.sort(function(e, t) {
            c = e.afeePrice() || e.bprPrice();
            h = t.afeePrice() || t.bprPrice();
            return c - h
        }
        );
        var d = p[0].afeePrice() || p[0].bprPrice();
        var v = r + "^" + t + "^" + u + "^";
        var m;
        if (e.lowestPrice() != e.priceInfo().lowpr) {
            m = e.lastPriceGroup() ? e.lastPriceGroup().lpwr : ""
        } else {
            m = e.priceGroup() ? e.priceGroup().lpwr : []
        }
        m = m ? m.join(",").replace(/_[a-z]+/g, "") : "";
        v += m + "|" + o;
        v += "^" + p[0].wrapperId();
        for (var g = 1; g < p.length; g++) {
            var y = p[g].afeePrice() || p[g].bprPrice();
            if (y == d) {
                v += "," + p[g].wrapperId()
            } else
                break
        }
        v += "|" + d;
        var b = DomesticOnewaySearchService.queryId();
        this.track("wnotfind", v, System.service.traceTimeStamp, null , "&wt=" + n + "&queryId=" + b + "&label=" + e.getWrapperListType())
    }
    ;
    e.trackZFY = function(e, t) {
        var n = [t.code(), e.dptZh, e.arrZh, t.deptDate(), e.tPrice];
        this.track("zfy", n.join("^"), (new Date).valueOf(), null , "")
    }
    ;
    e.trackTabChange = function(e, t) {
        var n = t.vendorListUI().tabsCache || {};
        var r = n.show || []
          , i = n.price || [];
        var s = t.dataSource().code();
        var o = ["&type=", e, "&tabs=", r.join("^"), "&lowps=", i.join("^"), "&fcode=", s, "&ct=", System.service.wrapperExpandStamp].join("");
        this.track("tabclick", "", System.service.traceTimeStamp, null , o)
    }
    ;
    e.bookingHoldTrack = function(e, t, n, r) {
        var i = e.ownerFlight();
        i = i._shareFlight || i;
        var s = 0;
        if (CLIENT_TIME && SERVER_TIME) {
            s = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
        } else {
            s = (new Date).getTime()
        }
        var o = [i.code(), i.getWrapperListType(), e.wrapperId(), e.vendor().name(), t, n || 0, r || 0, s].join("|");
        this.track("fIntercept", o, System.service.traceTimeStamp, null , "&wt=" + (System.service.wrapperExpandStamp || ""))
    }
    ;
    e.noWrapperList = function(e) {
        var t = e.flightKeyCode();
        var n = e.getWrapperListType();
        var r = e.priceInfo();
        var i = [t, n, r.cabin, r.tc, [r.lowpr, r.hipr, r.wrlen].join(","), [r.bflowpr, r.bfhipr, r.bfwrlen].join(","), [r.slowpr, r.shipr, r.swrlen].join(",")];
        TsinghuaOneWayTracker.track("fnowrapper", i.join("^"), System.service.traceTimeStamp)
    }
    ;
    return e
}
();
(function(e) {
    var t, n, r, i = e.document;
    if (typeof BOOMR === "undefined") {
        BOOMR = {}
    }
    if (BOOMR.version) {
        return
    }
    BOOMR.version = "0.9";
    t = {
        beacon_url: "",
        site_domain: e.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/, "$1").toLowerCase(),
        user_ip: "",
        events: {
            page_ready: [],
            page_unload: [],
            visibility_changed: [],
            before_beacon: []
        },
        vars: {},
        disabled_plugins: {},
        fireEvent: function(e, t) {
            var n, r, i;
            if (!this.events.hasOwnProperty(e)) {
                return false
            }
            i = this.events[e];
            for (n = 0; n < i.length; n++) {
                r = i[n];
                r[0].call(r[2], t, r[1])
            }
            return true
        },
        addListener: function(e, t, n, r) {
            if (e.addEventListener) {
                e.addEventListener(t, n, r)
            } else if (e.attachEvent) {
                e.attachEvent("on" + t, n)
            }
        }
    };
    n = {
        utils: {
            getCookie: function(e) {
                if (!e) {
                    return null 
                }
                e = " " + e + "=";
                var t, n;
                n = " " + i.cookie + ";";
                if ((t = n.indexOf(e)) >= 0) {
                    t += e.length;
                    n = n.substring(t, n.indexOf(";", t));
                    return n
                }
                return null 
            },
            setCookie: function(e, n, r, s, o, u) {
                var a = "", f, l, c, h = "";
                if (!e) {
                    return false
                }
                for (f in n) {
                    if (n.hasOwnProperty(f)) {
                        a += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(n[f])
                    }
                }
                a = a.replace(/^&/, "");
                if (r) {
                    h = new Date;
                    h.setTime(h.getTime() + r * 1e3);
                    h = h.toGMTString()
                }
                l = e + "=" + a;
                c = l + (r ? "; expires=" + h : "") + (s ? "; path=" + s : "") + (typeof o !== "undefined" ? "; domain=" + (o !== null  ? o : t.site_domain) : "") + (u ? "; secure" : "");
                if (l.length < 4e3) {
                    i.cookie = c;
                    return a === this.getCookie(e)
                }
                return false
            },
            getSubCookies: function(e) {
                var t, n, r, i, s = {};
                if (!e) {
                    return null 
                }
                t = e.split("&");
                if (t.length === 0) {
                    return null 
                }
                for (n = 0,
                r = t.length; n < r; n++) {
                    i = t[n].split("=");
                    i.push("");
                    s[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                }
                return s
            },
            removeCookie: function(e) {
                return this.setCookie(e, {}, 0, "/", null )
            },
            pluginConfig: function(e, t, n, r) {
                var i, s = 0;
                if (!t || !t[n]) {
                    return false
                }
                for (i = 0; i < r.length; i++) {
                    if (typeof t[n][r[i]] !== "undefined") {
                        e[r[i]] = t[n][r[i]];
                        s++
                    }
                }
                return s > 0
            }
        },
        init: function(n) {
            var r, s, o = ["beacon_url", "site_domain", "user_ip"];
            if (!n) {
                n = {}
            }
            for (r = 0; r < o.length; r++) {
                if (typeof n[o[r]] !== "undefined") {
                    t[o[r]] = n[o[r]]
                }
            }
            if (typeof n.log !== "undefined") {
                this.log = n.log
            }
            if (!this.log) {
                this.log = function(e, t, n) {}
            }
            for (s in this.plugins) {
                if (n[s] && typeof n[s].enabled !== "undefined" && n[s].enabled === false) {
                    t.disabled_plugins[s] = 1;
                    continue
                } else if (t.disabled_plugins[s]) {
                    delete t.disabled_plugins[s]
                }
                if (this.plugins.hasOwnProperty(s) && typeof this.plugins[s].init === "function") {
                    this.plugins[s].init(n)
                }
            }
            if (typeof n.autorun === "undefined" || n.autorun !== false) {
                t.addListener(e, "load", function() {
                    t.fireEvent("page_ready")
                }
                )
            }
            t.addListener(i, "webkitvisibilitychange", function() {
                t.fireEvent("visibility_changed")
            }
            );
            t.addListener(e, "unload", function() {
                e = null 
            }
            );
            return this
        },
        page_ready: function() {
            t.fireEvent("page_ready");
            return this
        },
        subscribe: function(n, r, i, s) {
            var o, u, a;
            if (!t.events.hasOwnProperty(n)) {
                return this
            }
            a = t.events[n];
            for (o = 0; o < a.length; o++) {
                u = a[o];
                if (u[0] === r && u[1] === i && u[2] === s) {
                    return this
                }
            }
            a.push([r, i || {}, s || null ]);
            if (n === "page_unload") {
                t.addListener(e, "unload", function() {
                    if (r) {
                        r.call(s, null , i)
                    }
                    r = s = i = null 
                }
                );
                t.addListener(e, "beforeunload", function() {
                    if (r) {
                        r.call(s, null , i)
                    }
                    r = s = i = null 
                }
                )
            }
            return this
        },
        addVar: function(e, n) {
            if (typeof e === "string") {
                t.vars[e] = n
            } else if (typeof e === "object") {
                var r = e, i;
                for (i in r) {
                    if (r.hasOwnProperty(i)) {
                        t.vars[i] = r[i]
                    }
                }
            }
            return this
        },
        removeVar: function() {
            var e, n;
            if (!arguments.length) {
                return this
            }
            if (arguments.length === 1 && Object.prototype.toString.apply(arguments[0]) === "[object Array]") {
                n = arguments[0]
            } else {
                n = arguments
            }
            for (e = 0; e < n.length; e++) {
                if (t.vars.hasOwnProperty(n[e])) {
                    delete t.vars[n[e]]
                }
            }
            return this
        },
        sendBeacon: function() {
            var e, n, r, s = 0;
            for (e in this.plugins) {
                if (this.plugins.hasOwnProperty(e)) {
                    if (t.disabled_plugins[e]) {
                        continue
                    }
                    if (!this.plugins[e].is_complete()) {
                        return this
                    }
                }
            }
            t.fireEvent("before_beacon", t.vars);
            if (!t.beacon_url) {
                return this
            }
            n = t.beacon_url + "?v=" + encodeURIComponent(BOOMR.version) + "&u=" + encodeURIComponent(i.URL.replace(/#.*/, ""));
            for (e in t.vars) {
                if (t.vars.hasOwnProperty(e)) {
                    s++;
                    n += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(t.vars[e])
                }
            }
            if (s) {
                r = new Image;
                r.src = n
            }
            return this
        }
    };
    var s = function(e) {
        return function(t, n) {
            this.log(t, e, "boomerang" + (n ? "." + n : ""));
            return this
        }
    }
    ;
    n.debug = s("debug");
    n.info = s("info");
    n.warn = s("warn");
    n.error = s("error");
    if (e.YAHOO && e.YAHOO.widget && e.YAHOO.widget.Logger) {
        n.log = e.YAHOO.log
    } else if (typeof e.Y !== "undefined" && typeof e.Y.log !== "undefined") {
        n.log = e.Y.log
    } else if (typeof console !== "undefined" && typeof console.log !== "undefined") {
        n.log = function(e, t, n) {
            console.log(n + ": [" + t + "] ", e)
        }
    }
    for (r in n) {
        if (n.hasOwnProperty(r)) {
            BOOMR[r] = n[r]
        }
    }
    BOOMR.plugins = BOOMR.plugins || {}
}
)(window);
(function(e) {
    var t = e.document;
    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    var n = {
        complete: false,
        timers: {},
        cookie: "RT",
        cookie_exp: 600,
        strict_referrer: true,
        navigationStart: undefined,
        responseStart: undefined,
        start: function() {
            var e, n = (new Date).getTime();
            if (!this.cookie) {
                return this
            }
            if (!BOOMR.utils.setCookie(this.cookie, {
                s: n,
                r: t.URL.replace(/#.*/, "")
            }, this.cookie_exp, "/", null )) {
                BOOMR.error("cannot set start cookie", "rt");
                return this
            }
            e = (new Date).getTime();
            if (e - n > 50) {
                BOOMR.utils.removeCookie(this.cookie);
                BOOMR.error("took more than 50ms to set cookie... aborting: " + n + " -> " + e, "rt")
            }
            return this
        },
        initNavTiming: function() {
            var t, n;
            if (this.navigationStart) {
                return
            }
            n = e.performance || e.msPerformance || e.webkitPerformance || e.mozPerformance;
            if (n && n.timing) {
                t = n.timing
            } else if (e.chrome && e.chrome.csi) {
                t = {
                    navigationStart: e.chrome.csi().startE,
                    responseStart: undefined
                };
                BOOMR.addVar("rt.start", "csi")
            } else if (e.gtbExternal) {
                t = {
                    navigationStart: e.gtbExternal.startE(),
                    responseStart: undefined
                };
                BOOMR.addVar("rt.start", "gtb")
            }
            if (t) {
                BOOMR.addVar("rt.start", "navigation");
                this.navigationStart = t.navigationStart || undefined;
                this.responseStart = t.responseStart || undefined
            } else {
                BOOMR.warn("This browser doesn't support the WebTiming API", "rt")
            }
            return
        }
    };
    BOOMR.plugins.RT = {
        init: function(e) {
            n.complete = false;
            n.timers = {};
            BOOMR.utils.pluginConfig(n, e, "RT", ["cookie", "cookie_exp", "strict_referrer"]);
            BOOMR.subscribe("page_ready", this.done, null , this);
            BOOMR.subscribe("page_unload", n.start, null , n);
            return this
        },
        startTimer: function(e, t) {
            if (e) {
                if (e === "t_page") {
                    this.endTimer("t_resp", t)
                }
                n.timers[e] = {
                    start: typeof t === "number" ? t : (new Date).getTime()
                };
                n.complete = false
            }
            return this
        },
        endTimer: function(e, t) {
            if (e) {
                n.timers[e] = n.timers[e] || {};
                if (typeof n.timers[e].end === "undefined") {
                    n.timers[e].end = typeof t === "number" ? t : (new Date).getTime()
                }
            }
            return this
        },
        setTimer: function(e, t) {
            if (e) {
                n.timers[e] = {
                    delta: t
                }
            }
            return this
        },
        done: function() {
            var e, r, i, s, o = {
                t_done: 1,
                t_resp: 1,
                t_page: 1
            }, u = 0, a, f, l = [];
            if (n.complete) {
                return this
            }
            n.initNavTiming();
            if (document.webkitVisibilityState && document.webkitVisibilityState === "prerender") {
                this.startTimer("t_load", n.navigationStart);
                this.endTimer("t_load");
                this.startTimer("t_prerender", n.navigationStart);
                this.startTimer("t_postrender");
                BOOMR.subscribe("visibility_changed", this.done, null , this);
                return this
            }
            this.endTimer("t_done");
            if (n.responseStart) {
                this.endTimer("t_resp", n.responseStart);
                if (n.timers.t_load) {
                    this.setTimer("t_page", n.timers.t_load.end - n.responseStart)
                } else {
                    this.setTimer("t_page", (new Date).getTime() - n.responseStart)
                }
            } else if (n.timers.hasOwnProperty("t_page")) {
                this.endTimer("t_page")
            }
            if (n.timers.hasOwnProperty("t_postrender")) {
                this.endTimer("t_postrender");
                this.endTimer("t_prerender")
            }
            r = i = t.referrer.replace(/#.*/, "");
            if (n.cookie) {
                s = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(n.cookie));
                BOOMR.utils.removeCookie(n.cookie);
                if (s !== null  && typeof s.s !== "undefined" && typeof s.r !== "undefined") {
                    r = s.r;
                    if (!n.strict_referrer || r === i) {
                        e = parseInt(s.s, 10)
                    }
                }
            }
            if (e) {
                BOOMR.addVar("rt.start", "cookie")
            } else {
                e = n.navigationStart
            }
            BOOMR.removeVar("t_done", "t_page", "t_resp", "r", "r2");
            for (a in n.timers) {
                if (!n.timers.hasOwnProperty(a)) {
                    continue
                }
                f = n.timers[a];
                if (typeof f.delta !== "number") {
                    if (typeof f.start !== "number") {
                        f.start = e
                    }
                    f.delta = f.end - f.start
                }
                if (isNaN(f.delta)) {
                    continue
                }
                if (o.hasOwnProperty(a)) {
                    BOOMR.addVar(a, f.delta)
                } else {
                    l.push(a + "|" + f.delta)
                }
                u++
            }
            if (u) {
                BOOMR.addVar("r", r);
                if (i !== r) {
                    BOOMR.addVar("r2", i)
                }
                if (l.length) {
                    BOOMR.addVar("t_other", l.join(","))
                }
            }
            n.timers = {};
            n.complete = true;
            BOOMR.sendBeacon();
            return this
        },
        is_complete: function() {
            return n.complete
        }
    }
}
)(window);
(function(e) {
    var t = e.document;
    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    var n = [{
        name: "image-0.png",
        size: 11483,
        timeout: 1400
    }, {
        name: "image-1.png",
        size: 40658,
        timeout: 1200
    }, {
        name: "image-2.png",
        size: 164897,
        timeout: 1300
    }, {
        name: "image-3.png",
        size: 381756,
        timeout: 1500
    }, {
        name: "image-4.png",
        size: 1234664,
        timeout: 1200
    }, {
        name: "image-5.png",
        size: 4509613,
        timeout: 1200
    }, {
        name: "image-6.png",
        size: 9084559,
        timeout: 1200
    }];
    n.end = n.length;
    n.start = 0;
    n.l = {
        name: "image-l.gif",
        size: 35,
        timeout: 1e3
    };
    var r = {
        base_url: "images/",
        timeout: 15e3,
        nruns: 5,
        latency_runs: 10,
        user_ip: "",
        cookie_exp: 7 * 86400,
        cookie: "BA",
        results: [],
        latencies: [],
        latency: null ,
        runs_left: 0,
        aborted: false,
        complete: false,
        running: false,
        ncmp: function(e, t) {
            return e - t
        },
        iqr: function(e) {
            var t = e.length - 1, n, r, i, s = [], o;
            n = (e[Math.floor(t * .25)] + e[Math.ceil(t * .25)]) / 2;
            r = (e[Math.floor(t * .75)] + e[Math.ceil(t * .75)]) / 2;
            i = (r - n) * 1.5;
            t++;
            for (o = 0; o < t && e[o] < r + i; o++) {
                if (e[o] > n - i) {
                    s.push(e[o])
                }
            }
            return s
        },
        calc_latency: function() {
            var e, t, n = 0, r = 0, i, s, o, u, a;
            a = this.iqr(this.latencies.sort(this.ncmp));
            t = a.length;
            BOOMR.debug(a, "bw");
            for (e = 1; e < t; e++) {
                n += a[e];
                r += a[e] * a[e]
            }
            t--;
            i = Math.round(n / t);
            o = Math.sqrt(r / t - n * n / (t * t));
            u = (1.96 * o / Math.sqrt(t)).toFixed(2);
            o = o.toFixed(2);
            t = a.length - 1;
            s = Math.round((a[Math.floor(t / 2)] + a[Math.ceil(t / 2)]) / 2);
            return {
                mean: i,
                median: s,
                stddev: o,
                stderr: u
            }
        },
        calc_bw: function() {
            var e, t, r = 0, i, s = [], o = [], u = 0, a = 0, f = 0, l = 0, c, h, p, d, v, m, g, y, b, w, E;
            for (e = 0; e < this.nruns; e++) {
                if (!this.results[e] || !this.results[e].r) {
                    continue
                }
                i = this.results[e].r;
                b = 0;
                for (t = i.length - 1; t >= 0 && b < 3; t--) {
                    if (typeof i[t] === "undefined") {
                        break
                    }
                    if (i[t].t === null ) {
                        continue
                    }
                    r++;
                    b++;
                    w = n[t].size * 1e3 / i[t].t;
                    s.push(w);
                    E = n[t].size * 1e3 / (i[t].t - this.latency.mean);
                    o.push(E)
                }
            }
            BOOMR.debug("got " + r + " readings", "bw");
            BOOMR.debug("bandwidths: " + s, "bw");
            BOOMR.debug("corrected: " + o, "bw");
            if (s.length > 3) {
                s = this.iqr(s.sort(this.ncmp));
                o = this.iqr(o.sort(this.ncmp))
            } else {
                s = s.sort(this.ncmp);
                o = o.sort(this.ncmp)
            }
            BOOMR.debug("after iqr: " + s, "bw");
            BOOMR.debug("corrected: " + o, "bw");
            r = Math.max(s.length, o.length);
            for (e = 0; e < r; e++) {
                if (e < s.length) {
                    u += s[e];
                    a += Math.pow(s[e], 2)
                }
                if (e < o.length) {
                    f += o[e];
                    l += Math.pow(o[e], 2)
                }
            }
            r = s.length;
            c = Math.round(u / r);
            h = Math.sqrt(a / r - Math.pow(u / r, 2));
            p = Math.round(1.96 * h / Math.sqrt(r));
            h = Math.round(h);
            r = s.length - 1;
            d = Math.round((s[Math.floor(r / 2)] + s[Math.ceil(r / 2)]) / 2);
            r = o.length;
            v = Math.round(f / r);
            m = Math.sqrt(l / r - Math.pow(f / r, 2));
            g = (1.96 * m / Math.sqrt(r)).toFixed(2);
            m = m.toFixed(2);
            r = o.length - 1;
            y = Math.round((o[Math.floor(r / 2)] + o[Math.ceil(r / 2)]) / 2);
            BOOMR.debug("amean: " + c + ", median: " + d, "bw");
            BOOMR.debug("corrected amean: " + v + ", " + "median: " + y, "bw");
            return {
                mean: c,
                stddev: h,
                stderr: p,
                median: d,
                mean_corrected: v,
                stddev_corrected: m,
                stderr_corrected: g,
                median_corrected: y
            }
        },
        defer: function(e) {
            var t = this;
            return setTimeout(function() {
                e.call(t);
                t = null 
            }
            , 10)
        },
        load_img: function(e, t, r) {
            var i = this.base_url + n[e].name + "?t=" + (new Date).getTime() + Math.random()
              , s = 0
              , o = 0
              , u = new Image
              , a = this;
            u.onload = function() {
                u.onload = u.onerror = null ;
                u = null ;
                clearTimeout(s);
                if (r) {
                    r.call(a, e, o, t, true)
                }
                a = r = null 
            }
            ;
            u.onerror = function() {
                u.onload = u.onerror = null ;
                u = null ;
                clearTimeout(s);
                if (r) {
                    r.call(a, e, o, t, false)
                }
                a = r = null 
            }
            ;
            s = setTimeout(function() {
                if (r) {
                    r.call(a, e, o, t, null )
                }
            }
            , n[e].timeout + Math.min(400, this.latency ? this.latency.mean : 400));
            o = (new Date).getTime();
            u.src = i
        },
        lat_loaded: function(e, t, n, r) {
            if (n !== this.latency_runs + 1) {
                return
            }
            if (r !== null ) {
                var i = (new Date).getTime() - t;
                this.latencies.push(i)
            }
            if (this.latency_runs === 0) {
                this.latency = this.calc_latency()
            }
            this.defer(this.iterate)
        },
        img_loaded: function(e, t, r, i) {
            if (r !== this.runs_left + 1) {
                return
            }
            if (this.results[this.nruns - r].r[e]) {
                return
            }
            if (i === null ) {
                this.results[this.nruns - r].r[e + 1] = {
                    t: null ,
                    state: null ,
                    run: r
                };
                return
            }
            var s = {
                start: t,
                end: (new Date).getTime(),
                t: null ,
                state: i,
                run: r
            };
            if (i) {
                s.t = s.end - s.start
            }
            this.results[this.nruns - r].r[e] = s;
            if (e >= n.end - 1 || typeof this.results[this.nruns - r].r[e + 1] !== "undefined") {
                BOOMR.debug(this.results[this.nruns - r], "bw");
                if (r === this.nruns) {
                    n.start = e
                }
                this.defer(this.iterate)
            } else {
                this.load_img(e + 1, r, this.img_loaded)
            }
        },
        finish: function() {
            if (!this.latency) {
                this.latency = this.calc_latency()
            }
            var e = this.calc_bw()
              , t = {
                bw: e.median_corrected,
                bw_err: parseFloat(e.stderr_corrected, 10),
                lat: this.latency.mean,
                lat_err: parseFloat(this.latency.stderr, 10),
                bw_time: Math.round((new Date).getTime() / 1e3)
            };
            BOOMR.addVar(t);
            if (!isNaN(t.bw)) {
                BOOMR.utils.setCookie(this.cookie, {
                    ba: Math.round(t.bw),
                    be: t.bw_err,
                    l: t.lat,
                    le: t.lat_err,
                    ip: this.user_ip,
                    t: t.bw_time
                }, this.user_ip ? this.cookie_exp : 0, "/", null )
            }
            this.complete = true;
            BOOMR.sendBeacon();
            this.running = false
        },
        iterate: function() {
            if (this.aborted) {
                return false
            }
            if (!this.runs_left) {
                this.finish()
            } else if (this.latency_runs) {
                this.load_img("l", this.latency_runs--, this.lat_loaded)
            } else {
                this.results.push({
                    r: []
                });
                this.load_img(n.start, this.runs_left--, this.img_loaded)
            }
        },
        setVarsFromCookie: function(e) {
            var t = parseInt(e.ba, 10)
              , n = parseFloat(e.be, 10)
              , r = parseInt(e.l, 10) || 0
              , i = parseFloat(e.le, 10) || 0
              , s = e.ip.replace(/\.\d+$/, "0")
              , o = parseInt(e.t, 10)
              , u = this.user_ip.replace(/\.\d+$/, "0")
              , a = Math.round((new Date).getTime() / 1e3);
            if (s === u && o >= a - this.cookie_exp) {
                this.complete = true;
                BOOMR.addVar({
                    bw: t,
                    lat: r,
                    bw_err: n,
                    lat_err: i
                });
                return true
            }
            return false
        }
    };
    BOOMR.plugins.BW = {
        init: function(e) {
            var t;
            BOOMR.utils.pluginConfig(r, e, "BW", ["base_url", "timeout", "nruns", "cookie", "cookie_exp"]);
            if (e && e.user_ip) {
                r.user_ip = e.user_ip
            }
            n.start = 0;
            r.runs_left = r.nruns;
            r.latency_runs = 10;
            r.results = [];
            r.latencies = [];
            r.latency = null ;
            r.complete = false;
            r.aborted = false;
            BOOMR.removeVar("ba", "ba_err", "lat", "lat_err");
            t = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(r.cookie));
            if (!t || !t.ba || !r.setVarsFromCookie(t)) {
                BOOMR.subscribe("page_ready", this.run, null , this)
            }
            return this
        },
        run: function() {
            if (r.running || r.complete) {
                return this
            }
            if (e.location.protocol === "https:") {
                BOOMR.info("HTTPS detected, skipping bandwidth test", "bw");
                r.complete = true;
                return this
            }
            r.running = true;
            setTimeout(this.abort, r.timeout);
            r.defer(r.iterate);
            return this
        },
        abort: function() {
            r.aborted = true;
            if (r.running) {
                r.finish()
            }
            return this
        },
        is_complete: function() {
            return r.complete
        }
    }
}
)(window);
CACTI_monitoring.prototype._init = function() {
    if (typeof BOOMR == "undefined") {
        $jex.console.error("未引用BOOMR!");
        return
    }
    if (!this._url || !this._pageId) {
        $jex.console.error("CACTI_monitoring 缺少配置，初始化失败!");
        return
    }
    var e = this;
    this.isStart = true;
    BOOMR.init({
        beacon_url: this._url,
        autorun: false,
        RT: {
            enabled: true,
            strict_referrer: true
        },
        BW: {
            enabled: false
        }
    }).addVar("page_id", this._pageId).subscribe("before_beacon", function(e) {
        var t = [], n;
        if ("t_done" in e)
            return;
        for (n in e) {
            if (e.hasOwnProperty(n)) {
                t.push(n)
            }
        }
        BOOMR.removeVar(t)
    }
    );
    $jex.event.bind(window, "load", function() {
        e.end("t_done")
    }
    )
}
;
CACTI_monitoring.prototype._inList = function(e) {
    if ($jex.array.indexOf(this.timerList, e) > -1)
        return true;
    return false
}
;
CACTI_monitoring.prototype.start = function(e) {
    if (!this.isStart || !this._inList(e))
        return;
    BOOMR.plugins.RT.startTimer(e)
}
;
CACTI_monitoring.prototype.end = function(e) {
    if (!this.isStart || !this._inList(e))
        return;
    BOOMR.plugins.RT.endTimer(e)
}
;
CACTI_monitoring.prototype.send = function() {
    BOOMR.page_ready()
}
;
var CommonInfoManager = function() {
    CommonInfoManager.superclass.constructor.call(this);
    var e = null ;
    this.service = function(t) {
        if (t == null ) {
            return e
        } else {
            e = t
        }
    }
    ;
    var t = null ;
    this.analyzer = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
    ;
    var n = null ;
    this.entityManager = function(e) {
        if (e == null ) {
            return n
        } else {
            n = e
        }
    }
    ;
    var r = null ;
    this.deptCityCode = function(e) {
        if (e == null ) {
            return r
        } else {
            r = e
        }
    }
    ;
    var i = null ;
    this.arriCityCode = function(e) {
        if (e == null ) {
            return i
        } else {
            i = e
        }
    }
    ;
    var s = null ;
    this.mainEntityManager = function(e) {
        if (e == null ) {
            return s
        } else {
            s = e
        }
    }
}
;
$jex.extendClass(CommonInfoManager, InfoManager);
CommonInfoManager.prototype.setDataLoad = function(e) {
    this._dataStat = e
}
;
CommonInfoManager.prototype.getDataLoad = function() {
    return this._dataStat
}
;
CommonInfoManager.prototype.addAirportSource = function(e, t) {
    this.addSource("airport", e, t)
}
;
CommonInfoManager.prototype.addVendorSource = function(e, t) {
    this.addSource("vendor", e, t)
}
;
CommonInfoManager.prototype.addNotWorkVendors = function(e, t) {
    this.addSource("notWork", e, t)
}
;
CommonInfoManager.prototype.addSuperOTAMaxNum = function(e, t) {
    this.addSource("maxSuper", e, t)
}
;
CommonInfoManager.prototype.addCarrierSource = function(e, t) {
    this.addSource("carrier", e, t)
}
;
CommonInfoManager.prototype.addCitySource = function(e, t) {
    this.addSource("city", e, t)
}
;
CommonInfoManager.prototype.addPlaneSource = function(e, t) {
    this.addSource("plane", e, t)
}
;
CommonInfoManager.prototype.addFlightLineVendorSource = function(e, t) {
    this.addSource("flightLineVendor", e, t)
}
;
CommonInfoManager.prototype.addOriginalPrice = function(e, t) {
    this.addSource("oprice", e, t)
}
;
CommonInfoManager.prototype.addInsuranceSum = function(e, t) {
    this.addSource("insurancesum", e, t)
}
;
CommonInfoManager.prototype.getCityNameByCode = function(e) {
    var t = this.get("city");
    for (var n in t) {
        if (t[n].codeList.indexOf(e) != -1) {
            return t[n]
        }
    }
    return {
        zh: "无信息"
    }
}
;
var FlightInfoManager = function() {
    FlightInfoManager.superclass.constructor.call(this)
}
;
$jex.extendClass(FlightInfoManager, InfoManager);
FlightInfoManager.prototype.addFlightInfoSource = function(e, t) {
    this.addSource("flightInfo", e, t)
}
;
FlightInfoManager.prototype.updateFlightInfoSource = function(e, t) {
    var n = this.get("flightInfo");
    $jex.foreach(e, function(e, t, r) {
        if (!n[r]) {
            n[r] = e
        }
    }
    )
}
;
FlightInfoManager.prototype.addFlightInfoItem = function(e, t, n) {
    this.addItem("flightInfo", e, t, n)
}
;
FlightInfoManager.prototype.addCorrSource = function(e, t) {
    this.addSource("corrInfo", e, t)
}
;
FlightInfoManager.prototype.addExtInfoSource = function(e, t) {
    this.addSource("extInfo", e, t)
}
;
FlightInfoManager.prototype.replacePriceData = function(e, t) {
    t = this._getPriceType(t);
    var n = this.get(t);
    $jex.foreach(e, function(e, t, r) {
        n[r] = e
    }
    )
}
;
FlightInfoManager.prototype._getPriceType = function(e) {
    return !e || e == "all" ? "my_wrappInfo" : "my_wrappInfo_" + e
}
;
FlightInfoManager.prototype.updateRecommendInfo = function(e, t) {
    var n = this.get("Recommend_wrapper");
    $jex.foreach(e, function(t, r, i) {
        if (!n[i]) {
            n[i] = {}
        }
        n[i] = e[i]
    }
    )
}
;
FlightInfoManager.prototype.addPriceDataItem = function(e, t, n) {
    this.addItem("priceData", e, t, n)
}
;
FlightInfoManager.prototype.addPriceGroupDataSource = function(e, t) {
    var n;
    for (var r in e) {
        n = this.get("priceGroup", r);
        if (n)
            this.addItem("lastPriceGroup", r, n, t)
    }
    this.addSource("priceGroup", e, t)
}
;
FlightInfoManager.prototype.addSpecialWrapper = function(e, t) {
    this.addSource("PayCarrier", e, t)
}
;
FlightInfoManager.prototype.addPriceInfoSource = function(e, t) {
    this.addSource("priceInfo", e, t)
}
;
FlightInfoManager.prototype.addZYFAirlines = function(e, t, n) {
    this.addItem("ZYFAirlines", e, t, n)
}
;
FlightInfoManager.prototype.addZYFReference = function(e, t, n) {
    this.addItem("ZYFReference", e, t, n)
}
;
FlightInfoManager.prototype.getZYFAirlines = function(e) {
    return this.get("ZYFAirlines", e)
}
;
FlightInfoManager.prototype.getZYFReference = function(e) {
    return this.get("ZYFReference", e)
}
;
var UICacheManager = function() {
    var e = function() {
        FlightInfoManager.superclass.constructor.call(this)
    }
    ;
    $jex.extendClass(e, InfoManager);
    e.prototype.addToCache = function(e) {
        this.addItem("uiCache", e.newid(""), e)
    }
    ;
    e.prototype.getCache = function(e) {
        return this.get("uiCache", e)
    }
    ;
    return new e
}
();
FlightInfoManager.prototype.updatePriceGroup = function(e, t) {
    var n = this.get("priceGroup", t).wrlist;
    $jex.foreach(e, function(t, r, i) {
        if (!n[i]) {
            n[i] = {}
        }
        $jex.merge(n[i], e[i])
    }
    )
}
;
if (typeof QLib === "undefined") {
    var QLib = {}
}
(function() {
    function t() {
        if (window.$jex && $jex.ajax) {
            return $jex.ajax
        }
    }
    var e = "/s/twell/searchrt_ui/ui_qunar_gsriiw.php";
    QLib.setCookieForSpider = function(n) {
        var r = t();
        if (!r) {
            n();
            return
        }
        r(e, {}, n, {
            onerror: n,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    QLib.setUrl = function(t) {
        e = t;
        return this
    }
}
)();
if (typeof QLib === "undefined") {
    var QLib = {}
}
QLib.getEx_track = function() {
    var e = $jex.parseQueryParam();
    return e.ex_track ? "ex_track=" + e.ex_track : ""
}
;
var DomesticOnewayDataAnalyzer = new function() {
    function d(t) {
        var r = e.infoMgr();
        var i = e.onewayInfoMgr();
        var s = e.flightEntityMgr();
        var o = false;
        var u = false;
        var a = false;
        $jex.foreach(t, function(t, f, c) {
            var h = n.hasItem(c);
            if (h) {
                h.update();
                o = true;
                HotSale.setMinLate(h)
            } else {
                var p = i.get("flightInfo", c);
                var d = i.get("priceInfo", c);
                if (p && p.qibe && !(d && d.lowpr)) {
                    return
                }
                var v = OnewayFlightEntity.tryCreate(c, r, i, s);
                if (v) {
                    HotSale.setMinLate(v);
                    l.call(v);
                    $jex.event.binding(v, "updating", function() {
                        switch (this.type) {
                        case "oneway":
                            e.lowestOneway(this);
                            break;
                        case "compose":
                            e.lowestCompose(this);
                            break
                        }
                        if (this.updateSortKey) {
                            this.updateSortKey()
                        } else {
                            $jex.console.error("没有更新排序键的方法", this)
                        }
                    }
                    );
                    switch (v.type) {
                    case "oneway":
                        e.lowestOneway(v);
                        a = true;
                        break;
                    case "compose":
                        e.lowestCompose(v);
                        u = true;
                        break
                    }
                    e.cabinType().length < 2 && e.cabinType(v.getCabinType());
                    n.addItem(c, v)
                }
                o = true
            }
        }
        );
        if (o) {
            if (a) {
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "方式",
                    name: "直飞",
                    value: "oneway"
                })
            }
            if (u) {
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "方式",
                    name: "中转联程",
                    value: "transfer"
                })
            }
            if (e.cabinType().length > 1) {
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "舱位",
                    name: "经济舱",
                    value: "j"
                });
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "舱位",
                    name: "头等/商务舱",
                    value: "bf"
                })
            }
            $jex.event.trigger(e, "preDataComplete");
            n.refresh();
            $jex.event.trigger(e, "autoLoadData");
            $jex.event.trigger(e, "dataComplete")
        }
    }
    function v(t) {
        var r = e.infoMgr();
        var i = e.transferInfoMgr();
        var s = e.flightEntityMgr();
        var o = false;
        $jex.foreach(t, function(t, u, a) {
            var f = [];
            $jex.foreach(t, function(e, t, n) {
                e.co = n;
                var r = n + "_" + e.da + "-" + e.aa;
                var s = a.split("|");
                if (n == s[0]) {
                    f[0] = r
                } else if (n == s[2]) {
                    f[1] = r
                }
                i.addFlightInfoItem(r, e);
                i.addPriceDataItem(r, e.vl)
            }
            );
            var l = TransferFlightEntity.tryCreate(f, r, i, s);
            if (l) {
                c.call(l);
                e.lowestTransfer(l);
                n.addItem(a, l);
                o = true
            }
        }
        );
        if (o) {
            $jex.event.trigger(e, "updateFilter", {
                catalog: "方式",
                name: "中转联程",
                value: "transfer"
            });
            if (e.cabinType().length <= 1 && e.cabinType("j").length > 1) {
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "舱位",
                    name: "经济舱",
                    value: "j"
                });
                $jex.event.trigger(e, "updateFilter", {
                    catalog: "舱位",
                    name: "头等/商务舱",
                    value: "bf"
                })
            }
            n.refresh();
            $jex.event.trigger(e, "autoLoadData");
            $jex.event.trigger(e, "dataComplete")
        }
    }
    function m(t) {
        e.fuzzyFlight(t);
        $jex.event.trigger(e, "fuzzyFlightDataComplete")
    }
    function g() {
        var e = window.location.href.toString();
        window.location.href = e.replace("oneway_list.htm", "oneway_list_inter.htm")
    }
    function y() {
        window.location.href = "/twell/flight/busy.jsp?ret=" + encodeURIComponent(window.location.href.toString())
    }
    function b() {}
    function w() {}
    function E() {}
    function S(e) {
        L(e);
        if (!e.serc) {
            return
        }
        var t = e.flightCode.split("|")[0].split("/")[0];
        var n = e.priceData[e.flightCode];
        var r = x(t);
        if (!$jex.$empty(n)) {
            $jex.hash.each(n, function(e, t) {
                t.pr = t.pr + r;
                t.npr = t.npr + r;
                t.bpr = t.bpr + r;
                t.vppr = t.vppr + r
            }
            )
        }
    }
    function x(e) {
        var t = (parseInt(e.substr(0, 2) + e.substr(e.length - 1), 36) + parseInt("0" + e.substr(2, e.length - 3), 10) * 36 * 36 * 36) % 97;
        return t
    }
    function T(e) {
        if (!$jex.$empty(e)) {
            $jex.hash.each(e, function(e, t) {
                var n = e.split("|")[0].split("/")[0];
                var r = x(n);
                t.lowpr = t.lowpr + r
            }
            )
        }
    }
    function N(t) {
        var n = e.infoMgr();
        if (t.oneway_data && t.oneway_data.priceInfo && t.serc) {
            T(t.oneway_data.priceInfo)
        }
        n.addAirportSource(t.airportInfo.out);
        n.addAirportSource(t.airportInfo.ret);
        n.addVendorSource(t.vendors);
        n.addOriginalPrice(t.op);
        n.addInsuranceSum(t.inShow);
        n.addNotWorkVendors(t.notWorkVendors);
        n.addSuperOTAMaxNum(t.SuperOTA_NUM || 0);
        var r = {};
        r[t.arrivalAirport.en] = t.arrivalAirport;
        r[t.departureAirport.en] = t.departureAirport;
        n.addCitySource(r);
        n.deptCityCode(t.departureAirport.en);
        n.arriCityCode(t.arrivalAirport.en)
    }
    function C(t) {
        var n = e.infoMgr();
        var r = e.onewayInfoMgr();
        L(t);
        k(t.priceInfo, t.roundPriceInfo);
        n.addCarrierSource(t.carrierInfo);
        n.addPlaneSource(t.planeInfo);
        r.addFlightInfoSource(t.flightInfo);
        var i, s = 0;
        $jex.foreach(t.priceData, function(e) {
            $jex.foreach(e, function(e) {
                i = e.carrier;
                s++
            }
            )
        }
        );
        if (i) {
            D(t, i, s)
        }
        if (t.labelType) {
            r.replacePriceData(t.priceData, t.labelType)
        }
        r.updateRecommendInfo(t.recommendInfo);
        r.addPriceGroupDataSource(t.flightPriceInfo);
        r.addPriceInfoSource(t.priceInfo);
        d(t.priceInfo);
        m(t.fuzzyFlightInfo)
    }
    function k(e, t) {
        $jex.hash.each(t, function(n, r) {
            if (e[n]) {
                var i = t[n];
                if (i.lowpr < e[n].lowpr) {
                    e[n].lowpr = i.lowpr
                }
            } else {
                e[n] = t[n]
            }
        }
        )
    }
    function L(e) {
        if (e.roundPriceData) {
            var t = {};
            for (var n in e.roundPriceData["flightInfo"]) {
                if (n.substr(0, 1) == "0") {
                    t.firsttrip = e.roundPriceData["flightInfo"][n]
                } else if (n.substr(0, 1) == "1") {
                    t.secondtrip = e.roundPriceData["flightInfo"][n]
                }
            }
            if (e.roundPriceData.packagePriceData) {
                for (var r in e.roundPriceData.packagePriceData) {
                    e.roundPriceData.packagePriceData[r].sortRank = 99999;
                    e.roundPriceData.packagePriceData[r].roundflight = true;
                    e.roundPriceData.packagePriceData[r].flightInfo = t;
                    if (!e.priceData[e.flightCode])
                        e.priceData[e.flightCode] = {};
                    e.priceData[e.flightCode][e.roundPriceData.packagePriceData[r].wrid + "_r"] = e.roundPriceData.packagePriceData[r]
                }
            }
        }
    }
    function A(t) {
        var n = e.infoMgr();
        var r = e.transferInfoMgr();
        n.addAirportSource(t.airportInfo);
        n.addCarrierSource(t.carrierInfo);
        n.addPlaneSource(t.planeInfo);
        n.addCitySource(t.citylist);
        n.addVendorSource(t.vendors, {
            isOverwrite: false
        });
        n.addFlightLineVendorSource(t.flightLineVendors);
        r.addCorrSource(t.corrInfo);
        r.addExtInfoSource(t.extInfo);
        r.addPriceInfoSource(t.priceInfo);
        v(t.data)
    }
    function O(t) {
        var n = e.onewayInfoMgr();
        n.addCorrSource(t.corrInfo);
        n.addExtInfoSource(t.extInfo);
        $jex.console.info("已经加载直飞扩展信息数据")
    }
    function M(t) {
        var n = e.infoMgr();
        var r = e.onewayInfoMgr();
        n.addCarrierSource(t.carrierInfo);
        n.addPlaneSource(t.planeInfo);
        r.updateFlightInfoSource(t.flightInfo);
        d(t.flightInfo);
        $jex.console.info("已经加载AV数据")
    }
    function _(t) {
        var n = t.flightCode
          , r = t.labelType;
        var i = e.infoMgr();
        var s = e.onewayInfoMgr();
        var o = [];
        var u = null ;
        var a = 0;
        $jex.foreach(t.priceData, function(e, t, n) {
            o.push("<b>", "[", n, "] 所返回的报价:", "</b>");
            $jex.foreach(e, function(e) {
                u = e.carrier;
                o.push(e.wr || e.wrjid);
                var t = i.get("vendor", e.wr || e.wrid);
                if (t) {
                    o.push("(", t.name, ")")
                }
                o.push(" , ");
                a++
            }
            )
        }
        );
        if (!t || !t.priceData || a === 0) {
            var f = new Image;
            var l = 0;
            if (window.longwellReadyTime) {
                l = (new Date).getTime() - window.longwellReadyTime.getTime()
            }
            f.src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=groupInfoError&info=" + encodeURIComponent(n) + "&msg=nullWrapper&queryId=" + encodeURIComponent(t.queryID) + "&duration=" + encodeURIComponent(l)
        }
        $jex.console.trace(o.join(""));
        D(t, u, a);
        k(t.priceInfo, t.roundPriceInfo);
        if (t.roundPriceData) {
            i.addSource("vendor", t.roundPriceData["vendorInfo"])
        }
        s.replacePriceData(t.priceData, r);
        s.addPriceGroupDataSource(t.flightPriceInfo);
        s.addPriceInfoSource(t.priceInfo);
        s.updateRecommendInfo(t.recommendInfo);
        $jex.console.info("已经加载航班价格数据")
    }
    function D(t, n, r) {
        var i = ConfigManager.getConfig("NoNeedStatementList") || ["9C"];
        if ($jex.array.indexOf(i, n) > -1)
            return;
        var s = 18;
        var o = e.infoMgr();
        var u = o.get("carrier", n);
        var a = u ? u.maxvendors || s : s;
        var f = o.get("notWork");
        if (!f)
            return;
        var l = f.out;
        if (!l || l < 1)
            return;
        var c = a - r;
        if (c <= 0)
            return;
        var h = l.slice(0, c);
        $jex.foreach(t.priceData, function(e, t, n) {
            if (n.indexOf("/") > -1) {
                return $jex.$continue
            }
            $jex.foreach(h, function(t) {
                var n = t + "_nw";
                e[n] = {
                    wrid: t,
                    type: "notWork",
                    sortRank: 1e7
                }
            }
            )
        }
        )
    }
    function P(e) {
        if (!e.serc)
            return;
        var t = e.queryID;
        var n = t.indexOf(":");
        var r = t.substr(0, n + 1);
        var i = t.substring(n + 1).split("");
        var s = [];
        $jex.array.each(i, function(e) {
            s.push(String.fromCharCode(e.charCodeAt(0) - 1))
        }
        );
        s.reverse();
        e.queryID = r + s.join("")
    }
    function H() {
        if (n.getRecordCount() == 0) {
            $jex.event.trigger(e, "noResult")
        }
    }
    function B(t) {
        if (!t.total) {
            $jex.console.info("no zyf data!");
            return
        }
        var n = e.infoMgr();
        n.addSource("zyfData", t.list)
    }
    function j() {
        if (n.getRecordCount() == 0) {
            $jex.event.trigger(e, "noResultEnd")
        }
        I(n);
        $jex.console.trace("搜索结束.");
        e.infoMgr().setDataLoad(true)
    }
    function F() {}
    function I(t) {
        var n = e.lowestEntity();
        var r = e.lowestTransfer();
        var i = e.lowestOneway();
        var s = {
            rule: "onewaySearchResult",
            searchResult: null ,
            searchDepartureAirport: System.param.searchDepartureAirport,
            searchArrivalAirport: System.param.searchArrivalAirport,
            searchDepartureTime: System.param.searchDepartureTime
        };
        if (t.getRecordCount() == 0) {
            s["searchResult"] = "noResult";
            logsys.trace(s)
        }
        if (i == null  && n != null ) {
            s["searchResult"] = "onlyTransfer";
            logsys.trace(s)
        }
        if (n != null  && r == null ) {
            s["searchResult"] = "noTransfer";
            logsys.trace(s)
        }
        if (i != null  && r != null ) {
            s["searchResult"] = "hasTransfer";
            logsys.trace(s)
        }
        if (n && n.type == "transfer" && i != null ) {
            s["searchResult"] = "transferHasMinPrice";
            logsys.trace(s)
        }
    }
    var e = this;
    var t = null ;
    var n = null ;
    var r = null ;
    this.infoMgr = function() {
        if (typeof r == "undefined" || r == null ) {
            r = new CommonInfoManager
        }
        return r
    }
    ;
    var i = null ;
    this.onewayInfoMgr = function() {
        if (typeof i == "undefined" || i == null ) {
            i = new FlightInfoManager
        }
        return i
    }
    ;
    var s = null ;
    this.transferInfoMgr = function() {
        if (typeof s == "undefined" || s == null ) {
            s = new FlightInfoManager
        }
        return s
    }
    ;
    var o = null ;
    this.flightEntityMgr = function() {
        if (typeof o == "undefined" || o == null ) {
            o = new FlightEntityManager
        }
        return o
    }
    ;
    this.lowestPrice = function() {
        var e = this.lowestTransfer() == null  ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var t = this.lowestOneway() == null  ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var n = this.lowestCompose() == null  ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        return Math.min(e, t, n)
    }
    ;
    this.lowestEntity = function() {
        var e = this.lowestTransfer() == null  ? Number.MAX_VALUE : this.lowestTransfer().safeLowestPrice();
        var t = this.lowestOneway() == null  ? Number.MAX_VALUE : this.lowestOneway().safeLowestPrice();
        var n = this.lowestCompose() == null  ? Number.MAX_VALUE : this.lowestCompose().safeLowestPrice();
        if (e <= t && e <= n)
            return this.lowestTransfer();
        if (t <= e && t <= n)
            return this.lowestOneway();
        if (n <= e && n <= t)
            return this.lowestCompose()
    }
    ;
    var u = null ;
    this.lowestTransfer = function(e) {
        if (e == null ) {
            return u
        } else {
            if (u == null ) {
                u = e
            } else if (u.safeLowestPrice() > e.safeLowestPrice()) {
                u = e
            }
        }
    }
    ;
    var a = null ;
    this.lowestOneway = function(e) {
        if (e == null ) {
            return a
        } else {
            if (a == null ) {
                a = e
            } else if (a.safeLowestPrice() > e.safeLowestPrice()) {
                a = e
            }
        }
    }
    ;
    var f = null ;
    this.lowestCompose = function(e) {
        if (e == null ) {
            return f
        } else {
            if (f == null ) {
                f = e
            } else if (f.safeLowestPrice() > e.safeLowestPrice()) {
                f = e
            }
        }
    }
    ;
    this.setSearchService = function(n) {
        if (t)
            return;
        t = n;
        $jex.event.binding(t, "interSearch", g);
        $jex.event.binding(t, "validQuery", b);
        $jex.event.binding(t, "invalidQuery", w);
        $jex.event.binding(t, "loadedLongwell", N);
        $jex.event.binding(t, "loadedFirstData", E);
        $jex.event.binding(t, "loadedOnewayData", C);
        $jex.event.binding(t, "loadedTransfer", A);
        $jex.event.binding(t, "loadedExtInfo", O);
        $jex.event.binding(t, "loadedAVData", M);
        $jex.event.binding(t, "parsingFlightPriceData", _);
        $jex.event.binding(t, "searchEnd", j);
        $jex.event.binding(t, "onerror", F);
        $jex.event.binding(t, "pastLessSecond", H);
        $jex.event.binding(t, "zyfLoaded", B);
        $jex.event.binding(t, "ipBlock", y);
        $jex.event.binding(t, "getQueryId", P);
        $jex.event.binding(t, "loadedGroupinfo", S);
        this.infoMgr().service(t);
        this.infoMgr().analyzer(this);
        this.infoMgr().entityManager(this.flightEntityMgr());
        e._initial()
    }
    ;
    this._initial = function() {
        n = new DataSet({
            defaultSort: [["sortValue", false]],
            filterFunc: {
                "航空公司": function(e, t, n) {
                    return [e.carrierCode()]
                },
                "起飞时间": function(e) {
                    return [e.deptTimeRangeValue()]
                },
                "机型": function(e) {
                    return e.planeType()
                },
                "起飞机场": function(e) {
                    return e.airportCodes()
                },
                "降落机场": function(e) {
                    return e.airportCodes()
                },
                "方式": function(e) {
                    if (e.type == "compose") {
                        return "transfer"
                    }
                    return e.type
                },
                "中转城市": function(e) {
                    return e.transferCity()
                },
                "舱位": function(e, t, n) {
                    var r = e.getCabinType();
                    return r
                }
            },
            pageSize: 30
        });
        if (typeof FlightListUISorter != "undefined") {
            $jex.event.binding(n, "refreshCurrentPage", function(e, t, n, r, i) {
                FlightListUISorter.resort(e, t, n, r, i)
            }
            )
        }
    }
    ;
    var l = function() {
        $jex.event.trigger(e, "updateFilter", {
            catalog: "航空公司",
            name: this.carrier().zh,
            value: this.flightInfo().ca
        });
        var t = this.deptTimeRange();
        $jex.event.trigger(e, "updateFilter", {
            catalog: "起飞时间",
            name: t.zh,
            key: t.key,
            value: t.value
        });
        var n = this.plane();
        $jex.foreach(n.type, function(t) {
            $jex.event.trigger(e, "updateFilter", {
                catalog: "机型",
                name: t,
                value: t
            })
        }
        );
        var r = this.deptAirport();
        $jex.event.trigger(e, "updateFilter", {
            catalog: "起飞机场",
            group: this.deptCityCode(),
            name: r.ab,
            value: r.key || r.code
        });
        var i = this.arriAirport();
        $jex.event.trigger(e, "updateFilter", {
            catalog: "降落机场",
            group: this.arriCityCode(),
            name: i.ab,
            value: i.key || i.code
        })
    }
    ;
    var c = function() {
        var t = this.firstTrip();
        if (this.carrierCode()) {
            $jex.event.trigger(e, "updateFilter", {
                catalog: "航空公司",
                name: t.carrier().zh,
                value: t.flightInfo().ca
            })
        }
        var n = t.deptTimeRange();
        $jex.event.trigger(e, "updateFilter", {
            catalog: "起飞时间",
            name: n.zh,
            key: n.key,
            value: n.value
        });
        var r = t.plane();
        $jex.foreach(r.type, function(t) {
            $jex.event.trigger(e, "updateFilter", {
                catalog: "机型",
                name: t,
                value: t
            })
        }
        );
        t = this.secondTrip();
        var r = t.plane();
        $jex.foreach(r.type, function(t) {
            $jex.event.trigger(e, "updateFilter", {
                catalog: "机型",
                name: t,
                value: t
            })
        }
        );
        var i = t.deptCity();
        $jex.event.trigger(e, "updateFilter", {
            catalog: "中转城市",
            name: i.zh,
            value: i.en
        })
    }
    ;
    this.hasWrapper = function(e) {
        return this.infoMgr().get("vendor", e)
    }
    ;
    this.resultData = function() {
        return n.currentPageData()
    }
    ;
    this.currentPageIndex = function() {
        return n.currentPage
    }
    ;
    this.getDataSet = function() {
        return n
    }
    ;
    var h = null ;
    this.fuzzyFlight = function(e) {
        if (e) {
            h = e
        } else {
            return h
        }
    }
    ;
    this.getData = function() {
        return n.getData()
    }
    ;
    this.pageInfo = function() {
        var e = {
            pageCount: n.pageCount(),
            pageSize: n.pageSize(),
            pageIndex: n.pageIndex()
        };
        return e
    }
    ;
    this.resetPageSize = function(t) {
        n.pageSize(t);
        $jex.event.trigger(e, "dataComplete")
    }
    ;
    this.gotoPage = function(t) {
        n.gotoPage(t);
        $jex.event.trigger(e, "dataComplete")
    }
    ;
    this.sort = function(t) {
        n.setPageIndex(0);
        n.sort(t);
        n.refresh();
        $jex.event.trigger(e, "dataComplete")
    }
    ;
    var p = null ;
    this.setFilter = function(t) {
        p = t;
        if (t.isNull) {
            n.clearAllFilter();
            n.refresh()
        } else {
            n.addFilter(t);
            n.setPageIndex(0);
            n.refresh()
        }
        $jex.event.trigger(e, "dataComplete")
    }
    ;
    this.getFilter = function() {
        return p
    }
    ;
    this.reload = function() {
        n.refreshPage();
        $jex.event.trigger(e, "dataComplete")
    }
    ;
    this.syncPriceData = function(e, n, r) {
        var i = function() {
            r()
        }
        ;
        var s = e.getWrapperListType();
        t.invoke_flightPriceData(e.key(), n, i, s, e)
    }
    ;
    this._hasCabinType = [];
    this.cabinType = function(t) {
        if (arguments.length == 0) {
            return this._hasCabinType
        } else {
            var n = e._hasCabinType;
            if (typeof t == "string") {
                t = [t]
            }
            $jex.array.each(t, function(e) {
                if (!~$jex.array.indexOf(n, e)) {
                    n.push(t)
                }
            }
            );
            e._hasCabinType = n;
            return n
        }
    }
    ;
}
;
var pomtesttest = 10;
var DomesticOnewaySearchService = new function() {
    var e = false;
    var t = this;
    this.param = {};
    this.oparam = {};
    var n = $jex.isdebug ? "http://local.qunar.com" : "";
    var r = null ;
    var i = 0;
    var s = new Date;
    var o = 0;
    var u = 0;
    var a = 0;
    var f = 0;
    var l = "";
    var c = "";
    var h = null ;
    var p = false;
    var d = false;
    var v = false;
    var m = null ;
    this.longwell = function() {
        return m || {}
    }
    ;
    var g = [];
    var y = [];
    var b = null ;
    var w = null ;
    var E = "";
    var S = null ;
    var x = null ;
    this.setAnalyzer = function(e) {
        x = e
    }
    ;
    var T = false;
    this.isValidQuery = function(e) {
        if (e == null ) {
            return T
        } else {
            T = e
        }
    }
    ;
    var N = null ;
    this.queryId = function(e) {
        if (e == null ) {
            return N
        } else {
            N = e
        }
    }
    ;
    var C = null ;
    this.tserver = function(e) {
        if (e == null ) {
            return C
        } else {
            C = e
        }
    }
    ;
    this.search = function(e) {
        if (t.searchEnd()) {
            return
        }
        $jex.merge(this.param, {
            fromCity: e.searchDepartureAirport,
            fromCode: e.fromCode, /*modify*/
            toCity: e.searchArrivalAirport,
            toCode: e.toCode, /*modify*/
            fromDate: e.searchDepartureTime
        });
        $jex.merge(this.oparam, {
            ex_track: e.ex_track,
            from: e.from
        });
        var n = $jex.date.parse(this.param.fromDate);
        var i = window.SERVER_TIME || new Date;
        if (i.getTime() - n.getTime() > 864e5) {
            $jex.event.trigger(this, "expireQuery");
            return
        }
        if (this.param.fromCity == this.param.toCity) {
            $jex.event.trigger(this, "sameCity");
            return
        }
        this._invoke_ExtInfo();
        QLib.setCookieForSpider(function() {
            t._invoke_longwell()
        }
        );
        o = 1;
        r = new Date;
        setTimeout(function() {
            $jex.event.trigger(t, "pastLessSecond")
        }
        , 15e3)
    }
    ;
    this.queryZYF = function() {
        var e = this;
        var t = n + "/zyf/api/ads.json";
        $jex.ajax(t, {
            dpt: e.param.fromCity,
            arr: e.param.toCity,
            dptDate: e.param.fromDate
        }, function(t) {
            if (t) {
                e._process_zyf(t)
            }
        }
        , {
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this.queryNext = function() {
        if (this.searchEnd()) {
            return
        }
        $jex.console.warn("[queryNext]", (new Date).getTime() - r);
        if (this.getTask()) {
            var e = this.getTask();
            $jex.console.info("queryNext: 等待插入任务结束. TaskID:", e);
            setTimeout(function() {
                t.queryNext()
            }
            , 100)
        } else if (v == false && u != 2) {
            t._invoke_AVData()
        } else if (a != 2 && (u == 2 || u != 2 && g.length >= 2)) {
            $jex.console.info("queryNext:处理联程", " transferSearchState:", a, " isValidQuery:", m.isValidQuery, " onewayDatasLength:", g.length);
            t._invoke_transfer()
        } else {
            $jex.console.info("queryNext:处理直飞");
            setTimeout(function() {
                t._invoke_oneway()
            }
            , i)
        }
    }
    ;
    this.genTraceTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            t.traceTimeStamp = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
        } else {
            t.traceTimeStamp = (new Date).getTime()
        }
    }
    ;
    this.genBookingTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            t.wrapperExpandStamp = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
        } else {
            t.wrapperExpandStamp = (new Date).getTime()
        }
    }
    ;
    this.genFilterTimeStamp = function() {
        if (CLIENT_TIME && SERVER_TIME) {
            t.filterTimeStamp = (new Date).getTime() - CLIENT_TIME.getTime() + SERVER_TIME.getTime()
        } else {
            t.filterTimeStamp = (new Date).getTime()
        }
    }
    ;
    this._invoke_longwell = function() {
        $jex.console.start("调用longwell");
        var r = this.param;
        var i = g;
        var s;
        var o = "loa";
        try {
            if (window.UA_obj.UADATA) {
                s = window.UA_obj.UADATA
            } else {
                window.UA_obj["re" + o + "dUA"]();
                s = window.UA_obj.UADATA
            }
            delete window.UA_obj.UADATA
        } catch (l) {
            s = ""
        }
        var c = {
          /*modify*/
            /*"http://www.travelco.com/searchArrivalAirport": r.toCity,
            "http://www.travelco.com/searchDepartureAirport": r.fromCity,
            "http://www.travelco.com/searchDepartureTime": r.fromDate,
            "http://www.travelco.com/searchReturnTime": r.fromDate,*/
            departureCity: r.fromCity,
            departureCode: r.fromCode,
            arrivalCity: r.toCity,
            arrivalCode: r.toCode,
            departureDate: r.fromDate,
            returnDate: r.fromDate,
            locale: "zh",
            nextNDays: "0",
            searchLangs: "zh",
            searchType: "OneWayFlight",
            tags: 1,
            mergeFlag: 0,
            xd: LONGWELLVERSION,
            wyf: s
        };
        S = {
            departureCity: r.fromCity,
            departureCode: r.fromCode,
            arrivalCity: r.toCity,
            arrivalCode: r.toCode,
            departureDate: r.fromDate,
            returnDate: r.fromDate,
            nextNDays: "0",
            searchType: "OneWayFlight",
            searchLangs: "zh",
            locale: "zh"
        };
        $jex.merge(c, this.oparam);
        $jex.merge(S, this.oparam);
        var h = n + "/s/twell/longwell.php"; //gino
        //alert(h);
        $jex.ajax(h, c, function(n) {
            e && console.log("longwell回数", n, new Date);
            n && n.v && LOG_SPIDER.addLog("longwell", n.v);
            window.UA_obj && window.UA_obj.ver && LOG_SPIDER.addLog("jsversion", window.UA_obj.ver);
            window.longwellReadyTime = new Date;
            $jex.console.end("调用longwell");
            if (n.isLimit) {
                $jex.event.trigger(t, "ipBlock");
                return
            }
            $jex.event.trigger(t, "getQueryId", n);
            m = n;
            window.codeshare_rank_weight = m.codeshare_rank_weight || 0;
            t.queryId(n.queryID);
            S.queryID = n.queryID;
            S.serverIP = n.serverIP;
            var r = n.validate;
            if (r) {
                if (r.dept.country != "中国" || r.arri.country != "中国") {
                    $jex.event.trigger(t, "interSearch");
                    return
                }
                if (r.dept.value == r.arri.value) {
                    $jex.event.trigger(t, "sameCity");
                    return
                }
                $jex.event.trigger(t, "validateComplete", n.validate)
            }
            if (n.isBackendBusy) {
                $jex.event.trigger(t, "systemBusy");
                return
            }
            if (n.isValidQuery) {
                t.isValidQuery(true);
                u = 1;
                $jex.event.trigger(t, "validQuery")
            } else {
                t.isValidQuery(false);
                u = 2;
                $jex.event.trigger(t, "invalidQuery")
            }
            if (!n.isTransferFlightsNeeded) {
                a = 2;
                $jex.event.trigger(t, "TransferDataReady")
            }
            $jex.event.trigger(t, "loadedLongwell", n);
            var i = n.oneway_data || {};
            setTimeout(function() {
                S.deduce = true;
                f = 1
            }
            , 1e3);
            if (!$jex.$empty(i.priceInfo)) {
                t._process_oneway(i)
            } else {
                $jex.event.trigger(t, "noOnewayData");
                t.queryNext()
            }
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this._invoke_oneway = function() {
        var r = g;
        if (f == 1) {
            $jex.console.info("本次为deduce jsp调用.");
            var i = n + "/twell/flight/tags/deduceonewayflight_groupdata.jsp"
        } else {
            var i = n + "/twell/flight/tags/onewayflight_groupdata.jsp"
        }
        if (c) {
            S["flightCode"] = c
        }
        if (h) {
            var s;
            if (x.lowestOneway()) {
                s = x.lowestOneway().lowestPrice()
            }
            if (h.lowestPrice() == s) {
                S.lowflight = true;
                S.lowflightpr = s
            } else {
                delete S.lowflight;
                delete S.lowflightpr
            }
        }
        var o = c;
        this._lastGinfoData = null ;
        $jex.ajax(i, S, function(n) {
            e && console.log("GROUP_DATA回数：", n, new Date);
            if (f == 1) {
                f = 2
            }
            if (o !== c) {
                t.correctPriceInfo(n, c)
            }
            if (o && o != "") {
                n.flightCode = o
            }
            t._process_oneway(n);
            if (S.deduce == true) {
                d = true
            }
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this._process_oneway = function(e) {
        var n = g;
        S.status = e.status;
        n.push(e);
        if (!$jex.$empty(e.priceInfo)) {
            $jex.event.trigger(t, "loadedOnewayData", e);
            PAGE_EVENT.trigger("wrapper_loadData", e);
            if (!p) {
                $jex.event.trigger(t, "loadedFirstData", e);
                p = true
            }
        } else {
            $jex.console.info("直飞价格数据为空.")
        }
        if (!e.dataCompleted) {
            $jex.console.info("dataCompleted:搜索未结束");
            if (new Date - r > 6e4) {
                $jex.console.info("dataCompleted:超时停止");
                u = 2;
                t.queryNext()
            } else {
                i = $jex.$defined(e.invokeInterval) ? e.invokeInterval * 2 : 100;
                s = (new Date).getTime() + i;
                $jex.console.info("dataCompleted:继续搜索直飞,", i);
                t.queryNext()
            }
        } else {
            $jex.console.info("dataCompleted:搜索结束 , deduceJSPState:", f);
            if (f == 2) {
                u = 2
            } else {
                f = 1
            }
            this.queryNext()
        }
    }
    ;
    this._process_zyf = function(e) {
        $jex.event.trigger(t, "zyfLoaded", e)
    }
    ;
    this._invoke_transfer = function() {
        if (t.searchEnd()) {
            return
        }
        $jex.console.info("---->调用联程");
        var r = $jex.merge({}, S);
        if (a == 1) {
            r["isReSearch"] = true
        }
        var o = n + "/twell/flight/tags/OneWayFlight_data_more.jsp";
        $jex.ajax(o, r, function(n) {
            e && console.log("transfer回数：", n, new Date);
            y.push(n);
            t.tserver(n.server);
            if (n.needNewSearch == true) {
                a = 1;
                $jex.console.info("[联程需要再次调用 ] data.needNewSearch:", n.needNewSearch);
                setTimeout(function() {
                    t.queryNext()
                }
                , 3500)
            } else {
                $jex.event.trigger(t, "TransferDataReady");
                if (!$jex.$empty(n.data)) {
                    $jex.event.trigger(t, "loadedTransfer", n);
                    if (!p) {
                        $jex.event.trigger(t, "loadedFirstData", n);
                        p = true
                    }
                } else {
                    $jex.event.trigger(t, "noTransferData", n);
                    $jex.console.info("联程价格数据为空.")
                }
                a = 2;
                t.queryNext();
                i = Math.max(new Date - s, 0)
            }
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this.syncCurrentFlightCode = function(e) {}
    ;
    var k = "all";
    this.setCurFlightType = function(e) {
        e && (k = e)
    }
    ;
    this.invoke_flightPriceData = function(e, n, r, i, s) {
        k = i;
        if (n) {
            l = e
        } else {
            c = e;
            h = s;
            l = ""
        }
        var o = function() {
            if (i === k) {
                r && r()
            }
        }
        ;
        t._invoke_flightPriceData(e, o, s)
    }
    ;
    this.correctPriceInfo = function(e, t) {
        var n = this._lastGinfoData;
        this._lastGinfoData = null ;
        if (n && n.priceData[t]) {
            e.priceData = {};
            e.labelType = null ;
            e.priceInfo[t] = n.priceInfo[t]
        }
    }
    ;
    this._invoke_flightPriceData = function(r, i, s) {
        if (!s.priceInfo()) {
            return
        }
        $jex.console.info("[invoke_flightPriceData]开始调用直飞航班价格数据: flightCode:", r);
        var o;
        if (x.lowestOneway()) {
            o = x.lowestOneway().lowestPrice()
        }
        if (s.lowestPrice() == o) {
            S.lowflight = true;
            S.lowflightpr = o;
            s.isInLowest(true)
        } else {
            delete S.lowflight;
            delete S.lowflightpr;
            s.isInLowest(false)
        }
        var u;
        var a = "loa";
        try {
            if (window.UA_obj) {
                window.UA_obj["re" + a + "dUA"](new Date);
                u = window.UA_obj.UADATA
            }
            delete window.UA_obj.UADATA
        } catch (f) {
            u = ""
        }
        S.wyf = u;
        var l = n + "/s/twell/flight/tags/onewayflight_groupinfo.php"; //gino
        var c = k;
        var h = s.priceInfo().d;
        var p = s.priceInfo().k;
        S.flightCode = r;
        S.label = k;
        S.d = h;
        S.k = p;
        this._lastGinfoData = null ;
        var d = 1;
        var v = setTimeout(function() {
            if (d) {
                var e = new Image;
                var t = 0;
                if (window.longwellReadyTime) {
                    t = (new Date).getTime() - window.longwellReadyTime.getTime()
                }
                e.src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=groupInfoError&info=" + encodeURIComponent(r) + "&msg=timeout&queryId=" + encodeURIComponent(S.queryID) + "&duration=" + encodeURIComponent(t)
            }
        }
        , 1e4);
        $jex.ajax(l, S, function(n) {
            d = 0;
            clearTimeout(v);
            e && console.log("groupInfo", n);
            if (n.isLimit) {
                $jex.event.trigger(t, "ipBlock");
                return
            }
            n && n.v && LOG_SPIDER.addLog("groupInfo", n.v);
            n.flightCode = r;
            n.labelType = c;
            $jex.event.trigger(t, "loadedGroupinfo", n);
            t._lastGinfoData = n;
            n.queryID = S.queryID;
            $jex.event.trigger(t, "parsingFlightPriceData", n);
            if (i) {
                i()
            }
            $jex.console.info("[invoke_flightPriceData] 处理完毕");
            PAGE_EVENT.trigger("wrapper_loadData", n)
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this.searchEnd = function() {
        if (o == 2) {
            return true
        }
        if (o != 2 && u == 2 && a == 2) {
            o = 2;
            $jex.event.trigger(t, "searchEnd");
            $jex.console.info("searchEND ::: OK ");
            return true
        }
        return false
    }
    ;
    this.isSearchEnd = function() {
        return o == 2
    }
    ;
    this.isOnewaySearchEnd = function() {
        return u == 2
    }
    ;
    this._invoke_ExtInfo = function() {
        $jex.console.info("调用扩展信息及准点率");
        var r = this.param;
        var i = n + "/s/twell/flight/DynamicFlightInfo.php";
        var s = {
            departureCity: r.fromCity,
            arrivalCity: r.toCity,
            departureDate: r.fromDate,
            fromCity: r.fromCity,
            toCity: r.toCity
        };
        $jex.merge(s, this.oparam);
        $jex.ajax(i, s, function(n) {
            e && console.log("扩展信息回数：", n, new Date);
            b = n;
            $jex.event.trigger(t, "loadedExtInfo", n)
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this._invoke_AVData = function() {
        $jex.console.info("调用AV数据");
        var r = n + "/s/twell/flight/OneWayFlight_Info.php";
        $jex.ajax(r, S, function(n) {
            e && console.log("AVData回数：", n, new Date);
            w = n;
            $jex.event.trigger(t, "loadedAVData", n);
            v = true;
            if (!$jex.$empty(n.flightInfo)) {
                if (!p) {
                    $jex.event.trigger(t, "loadedFirstData", n);
                    p = true
                }
            }
            t.queryNext()
        }
        , {
            onerror: t._onerror,
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    ;
    this._onerror = function() {
        $jex.event.trigger(t, "onerror", arguments)
    }
    ;
    var L = [];
    this.insertTask = function() {
        var e = "task" + $jex.globalID();
        L.push(e);
        return e
    }
    ;
    this.getTask = function() {
        if (L.length == 0) {
            return null 
        }
        return L[0]
    }
    ;
    this.finishTask = function(e) {
        for (var t = 0; t < L.length; t++) {
            if (L[t] == e) {
                L.splice(t, 1)
            }
        }
    }
    ;
    return this
}
;
var PriceCheckService = function() {
    function i(e) {
        var t = System.service.param;
        return {
            queryID: System.service.queryId(),
            departureCity: t.fromCity,
            arrivalCity: t.toCity,
            departureDate: t.fromDate,
            returnDate: t.fromDate,
            flightCode: e.split("_")[0],
            label: e.split("_")[1]
        }
    }
    function s(e) {
        var t = o(e);
        t.param = t.param || i(e);
        t.param.interceptTime = t.lastTime;
        return t.param
    }
    function o(e) {
        r[e] = r[e] || {};
        return r[e]
    }
    function u(t, n) {
        var r = s(t);
        $jex.ajax(e, r, n, {
            onerror: function() {
                n()
            },
            beforeSend: function(e) {
                if (window.addHtag)
                    window.addHtag(e)
            }
        })
    }
    function a(e, t) {
        function r(r) {
            if (t.lastTime > n)
                return;
            if (r.ret === false) {
                c(e)
            } else {
                t.interval = r.interval;
                t.data = $jex.extend(t.data || {}, r.priceData);
                t.lastTime = r.interceptTime
            }
        }
        var n = t.lastTime;
        u(e, function(t) {
            if (t)
                r(t);
            l(e)
        }
        )
    }
    function f(e) {
        l(e)
    }
    function l(e) {
        var n = o(e);
        if (n._timer === -1) {
            return
        }
        clearTimeout(n._timer);
        n._timer = setTimeout(function() {
            if (n.lastTime) {
                a(e, n)
            } else {
                l(e)
            }
        }
        , n.interval || t)
    }
    function c(e) {
        var t = r[e];
        if (t) {
            clearTimeout(t._timer);
            t._timer = -1
        }
    }
    var e = "/s/twell/flight/tags/onewayflight_pricecheck.php";
    var t = 1e4;
    var n = 1e3;
    var r = {};
    var h = {};
    h.initData = function(e, t) {
        var r = o(e);
        r.lastTime = t;
        r.interval = n;
        r.data = {}
    }
    ;
    h.pause = function(e) {
        c(e)
    }
    ;
    h.start = function(e) {
        var t = o(e);
        if (t._timer === -1)
            t._timer = null ;
        t.interval = n;
        f(e)
    }
    ;
    h.getPriceInfo = function(e, t) {
        var n = r[e];
        return n && n.data && n.data[t]
    }
    ;
    return h
}
();
var TransferFlightEntity = function() {
    TransferFlightEntity.superclass.constructor.call(this);
    this.type = "transfer";
    var e = null ;
    this.firstTrip = function(t) {
        if (t == null ) {
            return e
        } else {
            t.owner(this);
            t.position(0);
            e = t
        }
    }
    ;
    var t = null ;
    this.secondTrip = function(e) {
        if (e == null ) {
            return t
        } else {
            e.owner(this);
            e.position(1);
            t = e
        }
    }
    ;
    var n = null ;
    this.totalTax = function() {
        if (typeof n == "undefined" || n == null ) {
            n = this.firstTrip().totalTax() + this.secondTrip().totalTax()
        }
        return n
    }
    ;
    this.carrierCode = function() {
        return this.firstTrip().carrierCode() == this.secondTrip().carrierCode() ? this.firstTrip().carrierCode() : ""
    }
    ;
    this.deptTimeRange = function() {
        return this.firstTrip().deptTimeRange()
    }
    ;
    var r = null ;
    this.deptTimeValue = function() {
        if (typeof r == "undefined" || r == null ) {
            r = this.firstTrip().deptTimeValue()
        }
        return r
    }
    ;
    var i = null ;
    this.planeType = function() {
        if (typeof i == "undefined" || i == null ) {
            i = this.firstTrip().planeType().concat(this.secondTrip().planeType())
        }
        return i
    }
    ;
    var s = null ;
    this.airportCodes = function() {
        if (typeof s == "undefined" || s == null ) {
            s = this.firstTrip().airportCodes().concat(this.secondTrip().airportCodes())
        }
        return s
    }
    ;
    var o = null ;
    this.transferCity = function() {
        if (typeof o == "undefined" || o == null ) {
            o = [this.firstTrip().flightInfo().ac]
        }
        return o
    }
    ;
    this.lowestPrice = function() {
        return this.firstTrip().lowestPrice() + this.secondTrip().lowestPrice()
    }
}
;
$jex.extendClass(TransferFlightEntity, FlightEntity);
TransferFlightEntity.prototype.flightKeyCode = function() {
    return this.firstTrip().flightKeyCode() + "|" + this.secondTrip().flightKeyCode()
}
;
TransferFlightEntity.prototype.lowestDiscount = function() {
    var e = this.flightInfoMgr().get("priceInfo", this.flightKeyCode());
    if (!e || !e.op) {
        return 0
    }
    return Math.round(this.lowestPrice() / e.op * 100) / 10
}
;
TransferFlightEntity.prototype.isIntervalFlight = function() {
    return this.firstTrip().flightInfo().dd != this.secondTrip().flightInfo().dd
}
;
TransferFlightEntity.prototype.flightKeyCode = function() {
    var e = this.firstTrip().flightKeyCode() + "|" + this.secondTrip().flightKeyCode();
    return e
}
;
TransferFlightEntity.prototype.update = function() {
    var e = this.flightInfoMgr();
    this.lowprInfo = e.get("priceInfo", this.flightKeyCode());
    if (this.lowprInfo) {
        this.lowestPrice(this.lowprInfo.lowpr)
    }
    this.firstTrip().update();
    this.secondTrip().update();
    $jex.event.trigger(this, "updating")
}
;
TransferFlightEntity.tryCreate = function(e, t, n, r) {
    var i = e[0];
    var s = e[1];
    var o = SingleTripFlightEntity.tryCreate(i, t, n);
    var u = SingleTripFlightEntity.tryCreate(s, t, n);
    if (!o || !u)
        return null ;
    var a = new TransferFlightEntity;
    a.key(e);
    a.firstTrip(o);
    a.secondTrip(u);
    a.commInfoMgr(t);
    a.flightInfoMgr(n);
    a.update();
    r.put(e, a);
    return a
}
;
var SingleTripFlightEntity = function() {
    SingleTripFlightEntity.superclass.constructor.call(this);
    this.type = "onewayInTransfer";
    this.lineType = "oneway";
    var e = null ;
    this.owner = function(t) {
        if (t == null ) {
            return e
        } else {
            e = t
        }
    }
    ;
    var t = null ;
    this.position = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
    ;
    var n = null ;
    this.totalTax = function() {
        if (typeof n == "undefined" || n == null ) {
            var e = this.extInfo();
            var t = (e ? parseInt(e.acf, 10) : 0) || ConfigManager.getConfig("default", "acf");
            var r = (e ? parseInt(e.fot, 10) : 0) || ConfigManager.getConfig("default", "fot");
            n = t + r
        }
        return n
    }
    ;
    var r = this;
    var i = null ;
    this.wrappers = function() {
        if (typeof i == "undefined" || i == null ) {
            i = new SingleTripFlightWrapperListEntity;
            i.ownerFlight(this);
            i.update = function() {
                this.dataSource(r.flightInfoMgr().get("priceData", r.key()))
            }
            ;
            i.update()
        }
        return i
    }
}
;
$jex.extendClass(SingleTripFlightEntity, FlightEntity);
SingleTripFlightEntity.prototype.codeShareFlight = function() {
    return this.commInfoMgr().entityManager().get(this.codeShare() + "|" + this.deptDate())
}
;
SingleTripFlightEntity.prototype.update = function() {
    var e = this.key();
    var t = this.commInfoMgr();
    var n = this.flightInfoMgr();
    this.type = "onewayInTransfer";
    this.lineType = e.indexOf("/") == -1 && e.indexOf("+") == -1 ? "oneway" : "compose";
    var r = n.get("flightInfo", this.key());
    this.flightInfo(r);
    if (r) {
        this.lowestPrice(r.lowpr ? r.lowpr : ConfigManager.getConfig("default", "price"))
    }
}
;
SingleTripFlightEntity.tryCreate = function(e, t, n) {
    var r = e.split("_")[0];
    var i = t;
    var s = n;
    var o = s.get("flightInfo", e);
    if (!o) {
        return null 
    }
    if (!i.get("airport", o["da"])) {
        return null 
    }
    if (!i.get("airport", o["aa"])) {
        return null 
    }
    if (!i.get("city", o["dc"])) {
        return null 
    }
    if (!i.get("city", o["ac"])) {
        return null 
    }
    if (!i.get("carrier", o["ca"])) {
        return null 
    }
    if (!i.get("plane", o["pt"])) {
        return null 
    }
    var u = new SingleTripFlightEntity;
    u.key(e);
    u.commInfoMgr(i);
    u.flightInfoMgr(s);
    return u
}
;
$jex.extendClass(SingleTripFlightWrapperListEntity, WrapperListEntity);
SingleTripFlightWrapperListEntity.prototype.createWrapperEntity = function() {
    return new SingleTripFlightWrapperEntity
}
;
SingleTripFlightWrapperListEntity.prototype.sort = function() {
    var e = this.keys()
      , t = this;
    e.sort(function(e, n) {
        var r = t.get(e);
        var i = t.get(n);
        return r.sortRank() - i.sortRank()
    }
    );
    this._keysCache = e;
    return e
}
;
$jex.extendClass(SingleTripFlightWrapperEntity, WrapperEntity);
SingleTripFlightWrapperEntity.prototype.rankgrade = function() {
    return Math.round(this.dataSource().dispRank * 10) / 10 || 0
}
;
SingleTripFlightWrapperEntity.prototype.ranktitle = function() {
    return FlightUtil.getGTITLE(this.advalue(), 1, this.dataSource().rankline, 5 - this.dataSource().rankline)
}
;
SingleTripFlightWrapperEntity.prototype.comments = function() {
    return this.dataSource().comments || []
}
;
SingleTripFlightWrapperEntity.prototype.isShowAfee = function() {
    var e = this.ownerFlight();
    if (e && e.flightInfo && e.flightInfo() && e.flightInfo().hideAfee == true) {
        return false
    }
    return true
}
;
SingleTripFlightWrapperEntity.prototype.isShowLijianIcon = function() {
    var e = this.ownerFlight();
    if (e && e.flightInfo && e.flightInfo() && e.flightInfo().hidelj == true) {
        return false
    }
    return true
}
;
SingleTripFlightWrapperEntity.prototype._booking = function(e, t) {
    t = t || {};
    if (!t.BookingLocation) {
        t.BookingLocation = "list_all"
    }
    var n = this._booking_url(e, t);
    var r = 1;
    t = t || {};
    if (t["prt"] === 0) {
        r = 2
    }
    if (t["recom"] === 1) {
        r = 3;
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true
    }
    System.service.genBookingTimeStamp();
    var i = this.ownerFlight().owner();
    if (i) {
        r += "&package=" + i.firstTrip().code() + "/" + i.secondTrip().code()
    }
    window.open(n);
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_booking");
    this._bookingBtnTrace();
    TsinghuaOneWayTracker.track("btype", r, System.service.traceTimeStamp, null , "&burl=" + encodeURIComponent(n) + "&wt=" + System.service.wrapperExpandStamp);
    this._booking_track()
}
;
SingleTripFlightWrapperEntity.prototype.hasPackageprice = function() {
    return this.bpr()
}
;
SingleTripFlightWrapperEntity.prototype._bookingBtnTrace = function() {
    var e = this.ownerFlight().owner();
    TsinghuaOneWayTracker.trackWrappers(e.firstTrip());
    TsinghuaOneWayTracker.trackWrappers(e.secondTrip());
    TsinghuaOneWayTracker.traceFlightList()
}
;
SingleTripFlightWrapperEntity.prototype.afeePrice = function() {
    return this.bpr() && this.price()
}
;
SingleTripFlightWrapperEntity.prototype.bprPrice = function() {
    return this.bpr() || this.price()
}
;
SingleTripFlightWrapperEntity.prototype.tag = function() {
    return this.dataSource().type
}
;
var FlightListUISorter = {};
var SUPER_MAX_PRICE = 1e5;
var SHARE_RANK = 200;
var STOP_RANK = 200;
var _isNopriceEntity = function(e) {
    if (!e.lowestPrice() || e.lowestPrice() == SUPER_MAX_PRICE) {
        return true
    }
    return false
}
;
var _getsortPrice = function(e, t) {
    if (t[e] != null ) {
        var n = FlightListUISorter.sortPrice(t[e].carrierCode(), t[e].lowestPrice());
        var r = t[e];
        var i = r.type == "oneway" ? 1 : 0;
        if (n != null ) {
            if (i && r.isCodeShare && r.isCodeShare()) {
                return n + SHARE_RANK
            }
            if (i && r.stopover && r.stopover()) {
                return n + STOP_RANK
            } else {
                return n
            }
        } else {
            return SUPER_MAX_PRICE
        }
    }
}
;
$jex.exec(function() {
    var e = null ;
    var t = null ;
    FlightListUISorter.userSorted = function(e) {
        if (e == null ) {
            return t
        } else {
            t = e
        }
    }
    ;
    FlightListUISorter.open = function(t) {
        if (t.isAV && t.isAV())
            return;
        e = t;
        var n = $jex.offset($jex.$("resultAnchor"));
        if (!/msie 6/.test(window.navigator.userAgent.toLowerCase())) {
            var r = 0, i = $jex.$("js_schwrap"), s;
            if (window.getComputedStyle) {
                s = window.getComputedStyle(i, null ).getPropertyValue("position")
            } else if (i.currentStyle) {
                s = i.currentStyle.position
            }
            if (s === "static") {
                r = -2
            }
            if (!($jex.$("top_recommend_id") && $jex.$("top_recommend_id").childNodes.length)) {
                window.scrollTo(n.left, n.top - 55 - r)
            } else {
                window.scrollTo(n.left, $jex.offset($jex.$("top_recommend_id")).top + 10 - r)
            }
        } else {
            window.scrollTo(n.left, n.top)
        }
    }
    ;
    FlightListUISorter.close = function() {
        e = null 
    }
    ;
    FlightListUISorter.resortPage = function(t) {
        if (!t || !t.length) {
            return
        }
        if (e) {
            for (var n = 0, r = t.length; n < r; n++) {
                if (t[n] === e) {
                    t.splice(n, 1);
                    t.splice(0, 0, e);
                    break
                }
            }
        }
    }
    ;
    FlightListUISorter.sortPrice = function(e, t) {
        var n = ConfigManager.getConfig("NonStrikingCarrier", e);
        if (n) {
            t -= n
        }
        var r = ConfigManager.getConfig("StrikingCarrier", e);
        if (r) {
            t += r
        }
        return t
    }
    ;
    FlightListUISorter.divideSort = function(e, t, n) {
        var r = []
          , i = []
          , s = []
          , o = [];
        $jex.foreach(e, function(e) {
            var n = t[e];
            switch (n.type) {
            case "oneway":
                _isNopriceEntity(n) ? o.push(e) : r.push(e);
                break;
            case "transfer":
                i.push(e);
                break;
            case "compose":
                s.push(e);
                break;
            default:
                o.push(e);
                break
            }
        }
        );
        if (n[0][0] == "lowestPrice") {
            _sortByTypeAndTime(r, t, true)
        } else {
            _sortByTypeAndPrice(r, t, true, "norank")
        }
        e.splice(0, e.length);
        $jex.foreach([].concat(r).concat(s).concat(i).concat(o), function(t) {
            e.push(t)
        }
        )
    }
    ;
    FlightListUISorter.resort = function(e, t, n, r, i) {
        var s = this;
        if (FlightListUISorter.userSorted()) {
            if (i && i[0] && (i[0][0] == "lowestPrice" || i[0][0] == "deptTimeValue")) {
                s.divideSort(e, t, i)
            }
            return {}
        }
        $jex.console.start("FlightListUISorter.resort");
        var o = _isNeedSortByTime(e) ? _defaultSortByTime(e, t) : _defaultSortByPrice(e, t);
        $jex.event.trigger(FlightListUISorter, "dosort", o.keys, o.dataMap);
        $jex.console.end("FlightListUISorter.resort")
    }
}
);
var _defaultSortByPrice = function(e, t) {
    var n = _getCategoryArrObj(e, t)
      , r = n.onewayLines
      , i = n.composeFlights
      , s = n.linkFlights
      , o = n.othNoPriceAirlines;
    var u = _getTopsArr(e, t, n);
    r.sort(function(e, n) {
        return _getsortPrice(e, t) - _getsortPrice(n, t)
    }
    );
    $jex.foreach([r, i, s], function(e, n) {
        if (e && e.length > 0) {
            _sortByTypeAndTime(e, t, n === 0)
        }
    }
    );
    e.splice(0, e.length);
    $jex.foreach([].concat(u, r.concat(i).concat(s), o), function(t) {
        e.push(t)
    }
    );
    return {
        keys: e,
        dataMap: t
    }
}
;
var _defaultSortByTime = function(e, t) {
    var n = _getCategoryArrObj(e, t)
      , r = n.onewayLines
      , i = n.composeFlights
      , s = n.linkFlights
      , o = n.othNoPriceAirlines;
    var u = _getTopsArr(e, t, n);
    $jex.foreach([r, i, s], function(e, n) {
        if (e && e.length > 0) {
            e.sort(function(e, n) {
                return _getSortTime(e, t) - _getSortTime(n, t)
            }
            );
            _sortByTypeAndPrice(e, t, n === 0)
        }
    }
    );
    e.splice(0, e.length);
    $jex.foreach([].concat(u, r.concat(i).concat(s), o), function(t) {
        e.push(t)
    }
    );
    return {
        keys: e,
        dataMap: t
    }
}
;
var _isNeedSortByTime = function(e) {
    var t = function() {
        e = e || [];
        for (var t in e) {
            if (e[t] && e[t].search("\\|") > -1) {
                return e[t]
            }
        }
    }
    ();
    if (!t) {
        return false
    }
    var n = t.split("|");
    if (n.length < 2 || !n[1]) {
        return false
    }
    var r = n[1]
      , i = r.split("-");
    if (i.length < 3) {
        return false
    }
    var s = i[0]
      , o = i[1]
      , u = i[2]
      , a = (new Date(s,o - 1,u)).getTime()
      , f = new Date
      , l = f.getFullYear()
      , c = f.getMonth()
      , h = f.getDate()
      , p = (new Date(l,c,h)).getTime()
      , d = (new Date(l,c,h + 1)).getTime();
    if (a === p || a === d) {
        return true
    }
    return false
}
;
var _getTopsArr = function(e, t, n) {
    var r = [];
    var i = _getOnewayLowestObj(e, t)
      , s = i.onewayLowestKey
      , o = i.onewayLowestPriceNoTax;
    var u = n.onewayLines, a = n.composeFlights, f = n.linkFlights, l, c, h, p;
    if (a.length > 0) {
        c = _getLowestPrice(a[0], t);
        if (c < o) {
            l = a[0]
        }
    }
    if (f.length > 0) {
        p = _getLowestPrice(f[0], t);
        if (p < o) {
            h = f[0]
        }
    }
    if (s != undefined && s != "") {
        r.push(s);
        u.splice($jex.array.indexOf(u, s), 1)
    }
    var d = l != undefined && l != "";
    var v = h != undefined && h != "";
    if (d && v) {
        if (c > p) {
            r.push(h);
            f.splice(0, 1)
        } else {
            r.push(l);
            a.splice(0, 1)
        }
    } else if (d) {
        r.push(l);
        a.splice(0, 1)
    } else if (v) {
        r.push(h);
        f.splice(0, 1)
    }
    return r
}
;
var _getLowestPrice = function(e, t) {
    if (t[e] != null ) {
        var n = t[e].lowestPrice();
        return n != null  ? n : SUPER_MAX_PRICE
    }
}
;
var _getOnewayLowestObj = function(e, t) {
    var n, r = [], i = {
        onewayLowestKey: null ,
        onewayLowestPrice: null ,
        onewayLowestPriceNoTax: null 
    };
    e.sort(function(e, n) {
        return _getLowestPrice(e, t) - _getLowestPrice(n, t)
    }
    );
    for (var s = 0; s < e.length; s++) {
        var o = e[s]
          , u = t[o].type;
        if (u !== "oneway") {
            continue
        }
        if (!n) {
            n = o;
            r.push(o)
        } else if (_getLowestPrice(o, t) === _getLowestPrice(n, t)) {
            n = o;
            r.push(o)
        } else {
            _sortByTypeAndTime(r, t, true);
            var a = r[0];
            i.onewayLowestKey = a;
            i.onewayLowestPriceNoTax = _getLowestPrice(a, t);
            i.onewayLowestPrice = i.onewayLowestPriceNoTax + t[a].totalTax();
            break
        }
    }
    return i
}
;
var _getCategoryArrObj = function(e, t) {
    e.sort(function(e, n) {
        return _getLowestPrice(e, t) - _getLowestPrice(n, t)
    }
    );
    var n = {
        onewayLines: [],
        othNoPriceAirlines: [],
        linkFlights: [],
        composeFlights: []
    };
    $jex.foreach(e, function(e) {
        if (t[e].type == "oneway") {
            _isNopriceEntity(t[e]) ? n.othNoPriceAirlines.push(e) : n.onewayLines.push(e)
        } else if (t[e].type == "transfer") {
            n.linkFlights.push(e)
        } else if (t[e].type == "compose") {
            n.composeFlights.push(e)
        }
    }
    );
    return n
}
;
var _getSortTime = function(e, t) {
    return t[e] && t[e].deptTimeValue ? t[e].deptTimeValue() : 9999999999999
}
;
var _sortByTypeAndTime = function(e, t, n) {
    for (var r = 0; r < e.length - 1; r++) {
        for (var i = 0; i < e.length - 1 - r; i++) {
            var s = e[i];
            var o = e[i + 1];
            if (t[s].lowestPrice() !== t[o].lowestPrice()) {
                continue
            }
            var u = t[s].type === "transfer" ? t[s].firstTrip() : t[s];
            var a = t[o].type === "transfer" ? t[o].firstTrip() : t[o];
            var f = 1;
            var l = 1;
            var c = 0;
            var h = 0;
            var p = _calculateTimeD(u.deptTime());
            var d = _calculateTimeD(a.deptTime());
            if (p > d) {
                h += f
            }
            if (p < d) {
                c += f
            }
            if (c == h) {
                c = n && u.isCodeShare() ? 0 : l;
                h = n && a.isCodeShare() ? 0 : l
            }
            if (c == h) {
                c += s > o ? 0 : 1;
                h += s < o ? 0 : 1
            }
            if (c < h) {
                e[i + 1] = s;
                e[i] = o
            }
        }
    }
}
;
$jex.extendClass(PagerUI, XControl);
PagerUI.prototype.go = function(e) {
    $jex.event.trigger(this, "changePage", e)
}
;
PagerUI.prototype.update = function(e) {
    var t = e;
    var n = t.pageIndex;
    var r = t.pageSize;
    var i = t.pageCount;
    this.clear();
    var s = [];
    var o = this;
    var u = new pageCreator(n,i);
    u.renderPrevpage = function(e) {
        o.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a>');
        s.push("prev")
    }
    ;
    u.renderNextpage = function(e) {
        o.append("<a ", "next", ' href="#" value="-2">下一页 </a>');
        s.push("next")
    }
    ;
    u.renderPage = function(e, t) {
        if (t) {
            o.text("<em>", e + 1, "</em>")
        } else {
            o.append("<a ", "p" + e).text(' href="#" value="', e, '">', e + 1, "</a>");
            s.push("p" + e)
        }
    }
    ;
    u.renderPrefixDot = function() {
        o.text("...")
    }
    ;
    u.renderSuffixDot = function() {
        o.text("...")
    }
    ;
    u.render();
    this.onInit(function() {
        var e = this;
        for (var t = 0; t < s.length; t++) {
            var n = s[t];
            (function(t) {
                $jex.event.binding(e.find(t), "click", function(t) {
                    e.go(parseInt(this.getAttribute("value"), 10));
                    $jex.stopEvent(t)
                }
                )
            }
            )(n)
        }
    }
    );
    this.render()
}
;
$jex.extendClass(OnewayPagerUI, PagerUI);
OnewayPagerUI.prototype._bindClickEvent = function() {
    var e = this;
    setTimeout(function() {
        var t = e.elem();
        $jex.event.binding(t, "click", function(t) {
            var n = t.target || window.event.srcElement;
            if (n.tagName == "A") {
                $jex.stopEvent(t);
                e.go(parseInt(n.getAttribute("value"), 10))
            }
        }
        )
    }
    )
}
;
OnewayPagerUI.prototype.update = function(e) {
    var t = e;
    var n = t.pageIndex;
    var r = t.pageSize;
    var i = t.pageCount;
    this.clear();
    var s = [];
    var o = this;
    var u = new pageCreator(n,i);
    u.renderPrevpage = function(e) {
        o.append("<a ", "prev", ' href="#" value="-1"> 上一页 </a> ');
        s.push("prev")
    }
    ;
    u.renderNextpage = function(e) {
        o.append("<a ", "next", ' href="#" value="-2">下一页 </a> ');
        s.push("next")
    }
    ;
    u.renderPage = function(e, t) {
        if (t) {
            o.text("<em>", e + 1, "</em> ")
        } else {
            o.append("<a ", "p" + e).text(' href="#" value="', e, '">', e + 1, "</a> ");
            s.push("p" + e)
        }
    }
    ;
    u.renderPrefixDot = function() {
        o.text("... ")
    }
    ;
    u.renderSuffixDot = function() {
        o.text("... ")
    }
    ;
    u.render();
    this.render()
}
;
$jex.extendClass(SearchStatusbar, XControl);
SearchStatusbar.prototype._init = function() {
    var e = this;
    var t = this._setting.service;
    var n = this._setting.analyzer;
    this.endsearch = false;
    this.vendorNames = [];
    this.vendorMap = new $jex.List;
    this.onewayCount = 0;
    this.transferCount = 0;
    this.onewayPriceCount = 0;
    this.transferPriceCount = 0;
    this.singleNum = 0;
    this.pkgNum = 0;
    $jex.event.binding(t, "loadedFirstData", function() {
        e.start()
    }
    );
    $jex.event.binding(t, "loadedLongwell", function(t) {
        $jex.foreach(t.vendors, function(t, n, r) {
            e.vendorNames.push(t.name);
            e.vendorMap.put(r, true)
        }
        )
    }
    );
    $jex.event.binding(t, "loadedOnewayData", function(t) {
        if (t && typeof t.statusMap != "undefined") {
            e.onewayCount = t.statusMap
        }
        if (t && typeof t.priceCount != "undefined") {
            e.onewayPriceCount = t.priceCount || 0
        }
    }
    );
    $jex.event.binding(t, "loadedRoundTripData", function(t) {
        if (t && typeof t.singleNum != "undefined") {
            e.singleNum = t.singleNum || 0
        }
        if (t && typeof t.pkgNum != "undefined") {
            e.pkgNum = t.pkgNum || 0
        }
        if (t && typeof t.priceCount != "undefined") {
            e.onewayPriceCount = t.priceCount || 0
        }
    }
    );
    $jex.event.binding(t, "loadedTransfer", function(t) {
        $jex.foreach(t.vendors, function(t, n, r) {
            e.vendorNames.push(t.name);
            e.vendorMap.put(r, true)
        }
        );
        if (t && typeof t.wrapperCount != "undefined") {
            e.transferCount = t.wrapperCount
        }
        if (t && typeof t.priceCount != "undefined") {
            e.transferPriceCount = t.priceCount || 0
        }
    }
    );
    $jex.event.binding(t, "searchEnd", function() {
        e.stop()
    }
    )
}
;
SearchStatusbar.prototype.start = function() {
    var e = this;
    clearInterval(this.handler);
    this.handler = setInterval(function() {
        e.updateStatus()
    }
    , 500);
    this.updateStatus()
}
;
SearchStatusbar.prototype.stop = function() {
    clearInterval(this.handler);
    this.endsearch = true;
    this.updateStatus()
}
;
SearchStatusbar.prototype.updateStatus = function() {
    if (this.vendorMap.size() == 0)
        return;
    this.clear();
    var e = ["搜索<span>", this.vendorMap.size(), "</span>家网站，其中"];
    if (this.onewayCount) {
        e.push("<span>", this.onewayCount, "</span>家有直飞报价，")
    }
    if (this.singleNum) {
        e.push("<span>", this.singleNum, "</span>家有直飞报价，")
    }
    if (this.pkgNum) {
        e.push("<span>", this.pkgNum, "</span>家有双程报价，")
    }
    if (this.transferCount) {
        e.push("<span>", this.transferCount, "</span>家有联程报价，")
    }
    if (this.endsearch) {
        e.push("共<span>", this.onewayPriceCount + this.transferPriceCount, "</span>个报价信息，搜索结束")
    } else {
        var t = Math.floor(Math.random() * this.vendorNames.length);
        e.push("正在搜索<span>", this.vendorNames[t], "</span>")
    }
    this.elem().innerHTML = e.join("")
}
;
$jex.extendClass(OneWaySearchStatusbar, SearchStatusbar);
OneWaySearchStatusbar.prototype.updateStatus = function() {
    if (this.vendorMap.size() == 0)
        return;
    this.clear();
    var e = window.location.param();
    var t = ['<b class="plc">', e.searchDepartureAirport, '</b><i class="ico_arrto">&nbsp;</i><b class="plc">', e.searchArrivalAirport, '</b><em class="sep_line">|</em><b class="jn">单程</b>'];
    t.push('<span class="dec">搜索<b class="highlight">' + this.vendorMap.size() + "</b>家网站，");
    if (this.onewayCount) {
        t.push('其中<b class="highlight">', this.onewayCount, "</b>家有直飞报价，")
    }
    if (this.singleNum) {
        t.push('其中<b class="highlight">', this.singleNum, "</b>家有直飞报价，")
    }
    if (this.pkgNum) {
        t.push('<b class="highlight">', this.pkgNum, "</b>家有双程报价，")
    }
    if (this.transferCount) {
        t.push('<b class="highlight">', this.transferCount, "</b>家有联程报价，")
    }
    if (this.endsearch) {
        t.push('共<b class="highlight">', this.onewayPriceCount + this.transferPriceCount, "</b>个报价信息，搜索结束")
    } else {
        var n = Math.floor(Math.random() * this.vendorNames.length);
        t.push("正在搜索", '<b class="highlight">', this.vendorNames[n], "</b></span>")
    }
    this.elem().innerHTML = t.join("");
    $jex.element.show(this.elem())
}
;
(function() {
    function e(e, t, n, r) {
        return n * e / r + t
    }
    $jex.ui = $jex.ui || {};
    $jex.ui.lockScreenProgress = function(t, n) {
        function h() {
            o.style.width = Math.ceil(e(l, u, a, f)) + "%";
            if (l < f) {
                l++;
                setTimeout(h, c)
            } else {
                n && n()
            }
        }
        var r = t && t.msg || "此次报价已过期，正在重新搜索"
          , i = t && t.time || 3e3;
        var s = ['<div class="b_pop_bjprc">', '<div class="e_btm_fliter"></div>', '<div class="e_box_fliter"></div>', '<div class="e_pop_bjprc">', '<div class="m_pop_bjprc">', "<h3>", r, '</h3><div class="prc_bjpop"><em id="js-progress_loading" style="width: 1%"></em></div></div></div></div>'].join("");
        $jex.lightbox.show(s);
        $jex.lightbox.overlay.style.backgroundColor = "#fff";
        var o = $jex.$("js-progress_loading");
        var u = 0
          , a = 100
          , f = 20
          , l = 0;
        var c = Math.floor(i / f);
        h()
    }
}
)();
window.searchTrack = function(e) {
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
            },
            MULT: {
                type: "国际机票-多程"
            }
        }
    }
    var t = null ;
    var n, r;
    var i = null ;
    var s = function(e) {
        var n = "/s/site/track.htm?action=" + (window._ba_utm_s || t) + "|" + e + "|&t=" + Date.parse(new Date);
        (new Image).src = n
    }
    ;
    o.prototype = {
        constructor: o,
        init: function(e, n, r) {
            var i = this;
            t = r;
            var s = this.config[e];
            s.flt = n;
            this.DMT = this.config["DMT"].flt;
            this.INT = this.config["INT"].flt;
            this.MULT = this.config["MULT"].flt;
            this.TJ = this.config["TJ"].flt;
            this.ControlFlt = [];
            this.ControlFlt.push(this.DMT, this.INT, this.TJ);
            this.fltType = s;
            this._bindEvents()
        },
        _updateTime: function(e, t, n) {
            var i = this;
            if (window.QNR) {
                if (window.QNR.isLocal !== undefined) {
                    if (~e.indexOf("from")) {
                        var s = t.indexOf("(");
                        if (n) {
                            r = n
                        }
                        if (s === -1) {
                            s = t.length
                        }
                        $jex.jsonp("http://flight.qunar.com/twelli/flight/localDate.jsp", {
                            depCity: decodeURI(t.substr(0, s))
                        }, function(e) {
                            if (window.QNR) {
                                window.QNR.isLocal = e.isLocal
                            } else {
                                window.QNR = {};
                                window.QNR.isLocal = e.isLocal
                            }
                            var n = e.localDate.replace(/-/g, "/");
                            window.GSERVER_TIME = new Date(n);
                            if (e.isLocal) {
                                window.QNR[t.substr(0, s)] = GSERVER_TIME
                            } else {
                                GSERVER_TIME = new Date(SERVER_TIME.getFullYear(),SERVER_TIME.getMonth(),SERVER_TIME.getDate())
                            }
                            if (r) {
                                if (~r.indexOf("domes")) {
                                    var o = i["DMT"].fromDate.inputEl.value;
                                    if ((new Date(o.replace(/-/g, "/"))).getTime() < GSERVER_TIME.getTime()) {
                                        i["DMT"].fromDate.setValue(e.localDate)
                                    }
                                    i["DMT"].fromDate.setInfo(QunarDate.getDateTip(i["DMT"].fromDate.inputEl.value), "", "")
                                } else if (~r.indexOf("inter")) {
                                    var o = i["INT"].fromDate.inputEl.value;
                                    if ((new Date(o.replace(/-/g, "/"))).getTime() < GSERVER_TIME.getTime()) {
                                        i["INT"].fromDate.setValue(e.localDate)
                                    }
                                    i["INT"].fromDate.setInfo(QunarDate.getDateTip(i["INT"].fromDate.inputEl.value), "", "")
                                } else {
                                    var u = QunarDate.getDateTip(i["MULT"].fromDate.inputEl.value);
                                    u && i["MULT"].fromDate.setInfo(u, "", "")
                                }
                            }
                        }
                        , {
                            timeout: {
                                time: 500,
                                func: function() {}
                            }
                        })
                    }
                }
            }
        },
        _bindEvents: function() {
            this._bindFocusEvent();
            this._bindSelectSuggest();
            this._bindnoResult();
            this._bindHaveResult();
            this._bindErrorInfo()
        },
        _bindErrorInfo: function() {
            var t = this;
            var n = function(e) {
                t._updateTime(t.inputType, t.inputElem.value);
                var n = ["ErrorSuggestInfo", encodeURIComponent(t.inputElem.value), t.inputType, t._type];
                !e && s(n.join("|"))
            }
            ;
            $jex.each(this.ControlFlt, function(e, t) {
                if (e) {
                    var r = e.fromCity.popups.popups.suggest;
                    var i = e.toCity.popups.popups.suggest;
                    $jex.event.bind(r, "errorInfo", n);
                    $jex.event.bind(i, "errorInfo", n)
                }
            }
            );
            if (this.MULT) {
                var r = this.MULT;
                var i = this.MULT.conf.form["fromCityMulti"];
                var o = this.MULT.conf.form["toCityMulti"];
                for (var u = 0, a = this.MULT.trips.length; u < a; u++) {
                    var f = this.MULT.trips[u].multiSearbox.fromCity;
                    var l = this.MULT.trips[u].multiSearbox.toCity;
                    e.event.bind(f.popups.popups.suggest, "errorInfo", n);
                    e.event.bind(l.popups.popups.suggest, "errorInfo", n)
                }
            }
        },
        _bindHaveResult: function() {
            var t = this;
            var r = function(e, r) {
                r--;
                var i = ["getResultData", encodeURIComponent(t.inputElem.value), r, t.inputType, t._type];
                t.noflag = false;
                if (t.inputElem.value !== n && !t.onlyOne) {
                    s("addItem_flag|" + t.inputType + "|" + t._type);
                    t.onlyOne = true
                }
                setTimeout(function() {
                    s(i.join("|"))
                }
                , 10)
            }
            ;
            var o = function(e) {
                i = e;
                t.notfind = true
            }
            ;
            $jex.each(this.ControlFlt, function(e, t) {
                if (e) {
                    var n = e.fromCity.popups.popups.suggest;
                    var i = e.toCity.popups.popups.suggest;
                    $jex.event.bind(n, "getResultData", r);
                    $jex.event.bind(i, "getResultData", r);
                    $jex.event.bind(n, "haveData", o);
                    $jex.event.bind(i, "haveData", o)
                }
            }
            );
            if (this.MULT) {
                var u = this.MULT;
                var a = this.MULT.conf.form["fromCityMulti"];
                var f = this.MULT.conf.form["toCityMulti"];
                for (var l = 0, c = this.MULT.trips.length; l < c; l++) {
                    var h = this.MULT.trips[l].multiSearbox.fromCity;
                    var p = this.MULT.trips[l].multiSearbox.toCity;
                    e.event.bind(h.popups.popups.suggest, "getResultData", r);
                    e.event.bind(p.popups.popups.suggest, "getResultData", r);
                    e.event.bind(h.popups.popups.suggest, "haveData", o);
                    e.event.bind(p.popups.popups.suggest, "haveData", o)
                }
            }
        },
        _bindnoResult: function() {
            var t = this;
            var n = function(e, n) {
                if (!t.noflag && !t.notfind) {
                    var r = "suggest-nofind-noData|" + encodeURIComponent(t.inputElem.value) + "|" + t.inputType + "|" + t._type;
                    s(r);
                    t.noflag = true;
                    t.notfind = false
                }
                if (!t.noflag && t.notfind) {
                    var r = "suggest-nofind|" + encodeURIComponent(t.inputElem.value) + "|" + i + "|" + t.inputType + "|" + t._type;
                    s(r);
                    t.noflag = true
                }
            }
            ;
            var r = function(e, t) {
                var n = "noDatalook";
                s(n)
            }
            ;
            $jex.each(this.ControlFlt, function(e, t) {
                if (e) {
                    var i = e.fromCity.popups.popups.suggest;
                    var s = e.toCity.popups.popups.suggest;
                    $jex.event.bind(i, "suggest-nofind", n);
                    $jex.event.bind(s, "suggest-nofind", n);
                    $jex.event.bind(i, "noDatalook", r);
                    $jex.event.bind(s, "noDatalook", r)
                }
            }
            );
            if (this.MULT) {
                var o = this.MULT;
                var u = this.MULT.conf.form["fromCityMulti"];
                var a = this.MULT.conf.form["toCityMulti"];
                for (var f = 0, l = this.MULT.trips.length; f < l; f++) {
                    var c = this.MULT.trips[f].multiSearbox.fromCity;
                    var h = this.MULT.trips[f].multiSearbox.toCity;
                    e.event.bind(c.popups.popups.suggest, "suggest-nofind", n);
                    e.event.bind(h.popups.popups.suggest, "suggest-nofind", n);
                    e.event.bind(c.popups.popups.suggest, "noDatalook", r);
                    e.event.bind(h.popups.popups.suggest, "noDatalook", r)
                }
            }
        },
        _bindSelectSuggest: function() {
            var t = this;
            var n = function(e, n, r, i) {
                if (!t.sflag) {
                    if (n === "所有地点") {
                        r = "00"
                    }
                    if (!i)
                        i = "city";
                    t._updateTime(t.inputType, n);
                    var o = "suggest-selected|" + i + "|" + encodeURIComponent(n) + "|" + r + "|" + t.inputType + "|" + t._type;
                    s(o);
                    t.sflag = true
                }
            }
            ;
            $jex.each(this.ControlFlt, function(e, t) {
                if (e) {
                    var r = e.fromCity.popups.popups.suggest;
                    var i = e.toCity.popups.popups.suggest;
                    $jex.event.bind(r, "suggest-selected", n);
                    $jex.event.bind(i, "suggest-selected", n)
                }
            }
            );
            if (this.MULT) {
                var r = this.MULT;
                var i = this.MULT.conf.form["fromCityMulti"];
                var o = this.MULT.conf.form["toCityMulti"];
                for (var u = 0, a = this.MULT.trips.length; u < a; u++) {
                    var f = this.MULT.trips[u].multiSearbox.fromCity;
                    var l = this.MULT.trips[u].multiSearbox.toCity;
                    e.event.bind(f.popups.popups.suggest, "suggest-selected", n);
                    e.event.bind(l.popups.popups.suggest, "suggest-selected", n)
                }
            }
        },
        _bindFocusEvent: function() {
            var t = this;
            var o = function() {
                t.sflag = false;
                if (this.value !== n && this.value === "" && !t.deleteONE) {
                    t.noflag = false;
                    s("deleteItem_flag|" + this.name + "|" + r);
                    t.deleteONE = true
                }
                if (this.value !== n && !t.onlyOne && !t.deleteONE) {
                    s("addItem_flag|" + this.name + "|" + r);
                    t.onlyOne = true
                }
            }
            ;
            var u = function(e, t, n) {
                var r = t;
                return function() {
                    return e.call(n, r)
                }
            }
            ;
            var a = function(i) {
                t.onlyOne = false;
                t.deleteONE = false;
                t.noflag = false;
                t.outflag = false;
                t.inputType = this.name;
                t._type = i;
                t.inputElem = this;
                t.notfind = false;
                r = i;
                n = this.value;
                e.event.bind(this, "keyup", o)
            }
            ;
            var f = function(e) {
                t._updateTime(this.name, this.value);
                if (!t.outflag && t.noflag && !t.sflag) {
                    var n = "suggest-nofind|" + encodeURIComponent(this.value) + "|" + i + "|" + this.name + "|" + e;
                    s(n);
                    t.outflag = true
                }
            }
            ;
            $jex.each(this.ControlFlt, function(e, t) {
                if (e) {
                    var n = e.fromCity.inputEl;
                    var r = e.toCity.inputEl;
                    $jex.event.bind(n, "focusin", u(a, e.type, n));
                    $jex.event.bind(r, "focusin", u(a, e.type, r));
                    $jex.event.bind(n, "focusout", u(f, e.type, n));
                    $jex.event.bind(r, "focusout", u(f, e.type, r))
                }
            }
            );
            if (this.MULT) {
                var l = this.MULT;
                var c = this.MULT.conf.form["fromCityMulti"];
                var h = this.MULT.conf.form["toCityMulti"];
                for (var p = 0, d = c.length; p < d; p++) {
                    e.event.bind(c[p], "focusin", u(a, this.MULT.type, c[p]));
                    e.event.bind(c[p], "focusout", u(f, this.MULT.type, c[p]))
                }
                for (var p = 0, d = h.length; p < d; p++) {
                    e.event.bind(h[p], "focusin", u(a, this.MULT.type, h[p]));
                    e.event.bind(h[p], "focusout", u(f, this.MULT.type, h[p]))
                }
            }
        },
        triggerHomeClickBtn: function(e) {
            var t = this;
            var n = e.type;
            var r = e.searchType;
            var i = encodeURIComponent(e.fromCity.collateValue);
            var o = encodeURIComponent(e.toCity.collateValue);
            var u = e.toDate.collateValue;
            var a = e.fromDate.collateValue;
            if (r === "oneway" || r === "multitrip") {
                u = null 
            }
            if (u) {
                var f = ["search_BtnFlag", n, r, i, o, a, u]
            } else {
                var f = ["search_BtnFlag", n, r, i, o, a]
            }
            s(f.join("|"))
        }
    };
    return new o
}
($jex);
$jex.extendClass(TransferFlightUI, FlightUI);
TransferFlightUI.prototype.vlistui = function() {
    if (!this._vlistui) {
        this._vlistui = new TransferFlightVendorListUI;
        this._vlistui.owner(this)
    }
    return this._vlistui
}
;
TransferFlightUI.prototype.toggleVendorPanel = function() {
    if (this.state() == 0) {
        System.service.genTraceTimeStamp();
        System.analyzer.triggerTrace = true;
        this.showVendorPanel()
    } else {
        this.hideVendorPanel()
    }
}
;
TransferFlightUI.prototype.showVendorPanel = function() {
    this.moveToFirst();
    var e = this.vlistui();
    e.dataSource(this.dataSource());
    e.updateSource();
    e.render(this.find("vendorlist"));
    $jex.element.show(this.find("vendorlist"));
    $jex.addClassName(this.find("itemBar"), "avt_column_on");
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_openWrapperList");
    this.state(1);
    $jex.event.trigger(this, "open")
}
;
TransferFlightUI.prototype.hideVendorPanel = function() {
    $jex.element.hide(this.find("vendorlist"));
    $jex.removeClassName(this.find("itemBar"), "avt_column_on");
    $jex.event.trigger($jex.$("hdivResultPanel"), "fem_closeWrapperList");
    this.state(0);
    $jex.event.trigger(this, "close")
}
;
TransferFlightUI.prototype.register = function() {
    var e = this;
    SingletonUIManager.register("flight", e, function() {
        e.showVendorPanel()
    }
    , function() {
        e.hideVendorPanel()
    }
    )
}
;
TransferFlightUI.prototype._insertColums = function(e, t) {
    var n = t ? e.secondTrip() : e.firstTrip();
    this.text('<div class="c0">');
    this.text('    <div class="a_logo"><img width="16" height="16" title="', n.carrier().full, '" alt="', n.carrier().full, '" src="http://simg1.qunarzz.com/site/images/airlines/small/', n.carrier().key, '.gif"></div>');
    this.text("</div>");
    this.text('<div class="c1">');
    var r = FlightUtil.codePatch(n.code());
    this.text('    <div class="a_name">', n.carrier().zh, r.indexOf("/") > 0 ? "<br/>" : "", "<strong>", r, "</strong></div>");
    this.text('    <div class="a_model">', n.plane().full);
    this.text('<span class="lnk_sta">');
    if (n.stopover()) {
        this.text('<em title="该航班是经停航班" class="lnk_a">经停</em>')
    }
    var i = n.codeShare()
      , s = n.codeShareFlight();
    if (i && s) {
        this.text('<em title="实际乘坐航班：【', s.carrier().zh, "】【", i, '】" class="lnk_a">共享</em>')
    }
    this.text("</span>");
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c2">');
    if (t && n.deptDate() != e.firstTrip().arriDate()) {
        this.text('<div title="出发时间为第2天&nbsp;', n.deptDate(), '" class="a_tm_dep">次日', n.deptTime(), "</div>")
    } else {
        this.text('<div class="a_tm_dep">', n.deptTime(), "</div>")
    }
    if (n.stopover() && n.stops() == 1 && n.spCity()) {
        this.text('<div class="a_tm_jt">&nbsp;</div>')
    }
    this.text('<div class="a_tm_arv">', n.arriTime());
    if (n.isNextDate()) {
        this.text('<i class="i_1day" title="到达时间为第2天：', n.arriDate(), "&nbsp;", n.arriTime(), '"></i>')
    }
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c3">');
    this.text('    <div class="a_lacal_dep">', n.deptAirport().ab, n.dptTower(), "</div>");
    if (n.stopover() && n.stops() == 1 && n.spCity()) {
        this.text('<div class="a_lacal_jt"><span', n.spInfo().setTitle, ">经停&nbsp;", n.spInfo().sTitle, "</span></div>")
    }
    this.text('    <div class="a_local_arv">', n.arriAirport().ab, n.arrTower(), "</div>");
    this.text("</div>");
    this.text('<div class="c4">');
    this.text(n.quasipointRateHTML());
    this.text("</div>");
    this.text('<div class="c5">&nbsp</div>')
}
;
TransferFlightUI.prototype.update = function(e) {
    var t;
    this.clear();
    this._homeNode = null ;
    this.append("<div", "itemBar", ' class="avt_column avt_column_trans');
    if (this.state()) {
        this.text(" avt_column_on")
    }
    this.text('">');
    this.text('<div class="b_avt_lst">');
    this.text('<div class="avt_trans">');
    t = e.firstTrip();
    this.text('<div class="avt_column_1st">');
    this._insertColums(e);
    this.text("</div>");
    this.text('<div class="avt_column_sp"><p><span class="highlight">', t.arriCity().zh, "</span>(每段航班均需缴纳税费)</p></div>");
    t = e.secondTrip();
    this.text('<div class="avt_column_2nd">');
    this._insertColums(e, true);
    this.text("</div>");
    this.text("</div>");
    this.text('<div class="c6">');
    this.text('    <div class="a_low_prc">', Price_html.getHTML(e.lowestPrice()), '<i class="rmb">¥</i></div>');
    this.text('    <div class="a_low_dsc">', PriceUtil.getTransferDiscount(e.lowestDiscount()), "</div>");
    this.text("</div>");
    this.text('<div class="c7">&nbsp</div>');
    this.insertBookingBtn(t);
    this.text("</div>");
    this.updateVendors(e);
    this.text("</div>");
    if ($jex.ie !== 6)
        return;
    this.onInit(function() {
        $jex.hover({
            act: this.find("itemBar"),
            onmouseover: function(e) {
                $jex.addClassName(this, "avt_column_hover")
            },
            onmouseout: function(e) {
                $jex.removeClassName(this, "avt_column_hover")
            }
        })
    }
    )
}
;
TransferFlightUI.prototype.openBtnClickEvent = function() {
    var e = this;
    $jex.event.trigger(e.ownerFlightUI(), "willOpenFui", e);
    LockScreen(function() {
        SingletonUIManager.register("flight", e, function() {
            e.toggleVendorPanel()
        }
        , function() {
            e.hideVendorPanel()
        }
        )
    }
    )
}
;
TransferFlightUI.prototype.insertBookingBtn = function(e) {
    this.text('<div class="c8"><div class="a_booking">');
    this.append("<a", "openwrapperbtn", '  data-evtDataId="' + this.newid("") + '"   href="##" hidefocus="on" onfocus="this.blur();" title="点击查看订票网站" class="btn_book"><span><b>订&nbsp;&nbsp;票</b></span></a>');
    this.text("</div></div>")
}
;
TransferFlightUI.prototype.updateVendors = function(e) {
    this.append("<div", "vendorlist", "");
    if (!this.state()) {
        this.text(' style="display:none;" ')
    }
    this.text(">");
    if (this.state()) {
        var t = this.vlistui();
        t.dataSource(e);
        t.updateSource();
        this.append("", t, "")
    }
    this.text("</div>")
}
;
$jex.extendClass(TransferFlightVendorListUI, XControl);
TransferFlightVendorListUI.prototype._insertOneWrapper = function(e, t) {
    var n = e;
    var r = new FlightInfoExtBarUI;
    r.dataSource(e);
    r.updateSource();
    var i = new TransferFlightWrapperListUI;
    i.ownerVendor(this);
    i.dataSource(e);
    i.updateSource();
    this.append("<div", t.id, ' style="z-index:' + t.zIndex + ';position:relative;zoom:1">');
    var s = t.id + "_h";
    this.text('<div class="e-qvt-route">');
    this.text('<div class="m-route-ifo">');
    this.append("", r, "");
    this.text("</div>");
    this.append("<h3 ", s, "");
    this.text(">第", t.msg, "程&nbsp;<span>", n.deptCity().zh, "&nbsp;-&nbsp;", n.arriCity().zh, "</span></h3>");
    this.text("</div>");
    this.text('<div class="trans-single trans_' + t.id + '">');
    this.text('<div class="single-tit">第' + t.msg + "段</div>");
    this.text('<div class="single-ct e-qvt-ct">');
    this.append("", i, "");
    if (n.wrappers().size() > 4) {
        this.text('<div class="qvt_col_more qvt_col_more_hover">');
        this.append("<a", t.goid, '  data-evtDataId="' + this.newid("") + '"  hidefocus="true" href="#" class="lnk_more">第' + t.msg + '段所有报价<i class="ico_arr_more"></i></a>');
        this.text("</div>")
    }
    this.text("</div></div>");
    this.text("</div>");
    this.onInit(function() {
        var e = this;
        setTimeout(function() {
            try {
                var t = e.find(s);
                if (t.offsetHeight > 30) {
                    $jex.addClassName(t.parentNode, "e-qvt-route_oth")
                }
            } catch (n) {}
        }
        , 10)
    }
    );
    r = i = e = t = null 
}
;
TransferFlightVendorListUI.prototype.update = function(e) {
    this.clear();
    this.text('<div class="b-qvt-lst">');
    this.text('<div class="e-qvt-warn">');
    this.text('    <p>购买须知：<span>两段需要分别购买</span>，每段航班需分别缴纳税费，请确认两航班均有效再付款。详情查看《<a target="_blank" href="http://www.qunar.com/site/zh/Multi-city.shtml?', (new Date).getTime(), '">中转程机票购买须知</a>》</p>');
    this.text("</div>");
    var t = false
      , n = null ;
    var r = {
        id: "transfer_p1",
        zIndex: 3,
        goid: "gotoFirstDetail",
        msg: "一"
    };
    n = e.firstTrip();
    if (n.type && n.type == "compose") {
        r.msg = "一，二";
        t = true
    }
    this._insertOneWrapper(n, r);
    var i = n.hasShownInsTip;
    n = e.secondTrip();
    n.transShownInsTip = i;
    r.id = "transfer_p2";
    r.goid = "gotoSecondDetail";
    r.zIndex = 2;
    if (t == true) {
        if (n.type && n.type == "compose") {
            r.msg = "三，四"
        } else {
            r.msg = "三"
        }
    } else {
        if (n.type && n.type == "compose") {
            r.msg = "二，三"
        } else {
            r.msg = "二"
        }
    }
    this._insertOneWrapper(n, r);
    this.text('<div class="qvt_col_hide">');
    this.append("<a ", "btnHide", ' data-evtDataId="' + this.newid("") + '" class="lnk_more lnk_more_hd"  href="##">隐藏报价<i class="ico_down"></i></a>');
    this.text("</div>");
    this.text("</div>");
    this.append("<div", "extAd_panel", ' class="extAD"></div>');
    this.onInit(function() {
        var e = this;
        clearTimeout(e._ad_timer);
        e._ad_timer = setTimeout(function() {
            var t = e.newid("extAd");
            var n = e.find("extAd_panel");
            if (n)
                n.innerHTML = '<iframe id="' + t + '" querystring="chan=flight&pg=list&pos=mid&site=qunar&size=728x90" scrolling="no" frameborder="0" height="0" width="100%" src="/site/adframe/ad.html#' + t + '#now"></iframe>'
        }
        , 100)
    }
    );
    n = r = e = null 
}
;
$jex.extendClass(TransferFlightWrapperListUI, WrapperListUI);
TransferFlightWrapperListUI.prototype.createWrapperUI = function(e, t, n) {
    var r = t.vendor();
    var i = t.getCarrierCo();
    if (r.isDirect() || r.isOffical()) {
        return new FlagshipOnewayFlightWrapperUI
    }
    if (t.isOta()) {
        return new OtaOnewayFlightWrapperUI
    }
    if (t.isFreeMan()) {
        return new FreeManOnewayFlightWrapperUI
    }
    if (t.isZYXWrapper()) {
        return new ZiyouxingOnewayFlightWrapperUI
    }
    if (t.isYoufei()) {
        if (i == "ca") {
            return new OnewayFlightWrapperUI
        }
        return new YouFeiOnewayFlightWrapperUI
    }
    if (t.isTCabin() || t.tag() == "nc" || t.tag() == "nclpf") {
        if (i == "ca") {
            return new OnewayFlightWrapperUI
        }
        return new TcabinOnewayFlightWrapperUI
    }
    return new OnewayFlightWrapperUI
}
;
$jex.extendClass(SingleTripFlightWrapperUI, OnewayFlightWrapperUI);
$jex.extendClass(ZiyouxingSingleTripFlightWrapperUI, ZiyouxingOnewayFlightWrapperUI);
var RoundTripFlightRecommend = new function(e) {
    this.init = function() {
        if (!e) {
            return
        }
        this.ele = e;
        this.url = this.getURL();
        this.loadData()
    }
    ;
    this.getURL = function() {
        var e = $jex.parseQueryParam();
        var t = "http://ws.qunar.com/rt_recommend?" + "count=3" + "&fromCity=" + encodeURIComponent(e.searchDepartureAirport) + "&toCity=" + encodeURIComponent(e.searchArrivalAirport) + "&depDate=" + encodeURIComponent(e.searchDepartureTime);
        return t
    }
    ;
    this.loadData = function() {
        var e = new ScriptRequest({
            funcName: "RoundTripFlightRecommend.callBack",
            callbackName: "callback"
        });
        e.send(this.url)
    }
    ;
    this.callBack = function(e) {
        if (!e.ret) {
            return
        }
        this.render(e.data);
        this.bind(e.data)
    }
    ;
    this.bind = function(e) {
        var t = e.list.length || 0;
        if (t === 0) {
            return
        }
        document.getElementById("js_moreFlight").onclick = function() {
            var e = new Image;
            e.src = "http://bc.qunar.com/clk?s=182&a=moreflight&t=" + Math.random()
        }
        ;
        var n = document.getElementById("js_lproute").getElementsByTagName("a")
          , r = n.length;
        for (var i = 0; i < r; i++) {
            n[i].onclick = function() {
                var e = new Image;
                e.src = "http://bc.qunar.com/clk?s=182&a=rec_flight&t=" + Math.random()
            }
        }
    }
    ;
    this.render = function(e) {
        var t, n = e.moreUrl, r = e.list.length || 0;
        if (r === 0) {
            return
        }
        var i = ['<div class="b_rec_wp">', '<div class="b_rec_tit">', '<span class="form">' + e.fromCity + '</span><i class="centerarrow"></i><span class="arrive">' + e.toCity + "</span>", '<span class="icon">往返<br />低价</span></div>', '<ul class="b_rec_cont" id="js_lproute">', '<li class="tab">', '<div class="clo1">往返时间</div><div class="clo2">原价</div><div class="clo3">特价</div>', "</li>"];
        for (t = 0; t < r; t++) {
            var s = e.list[t].url;
            s += (/&$/.test(s) ? "" : "&") + "from=flight_youce_wangfantuijian";
            var o = [];
            o.push("<li>");
            o.push('<a target="_blank" href=' + s + ">");
            o.push('<div class="clo1"><span class="fromdate">' + e.list[t].fromDate + "</span>");
            o.push('<i class="centerarrow"></i><span class="arrdate">' + e.list[t].toDate + "</span></div>");
            o.push('<div class="clo2">&yen;<del>' + e.list[t].oPrice + "</del></div>");
            o.push('<div class="clo3">&yen;<span>' + e.list[t].pPrice + "</span>");
            if (e.list[t].lowPrice) {
                o.push('<i class="lowst"></i>')
            }
            o.push("  </div>");
            o.push("</a>");
            o.push("</li>");
            i.push(o.join(""))
        }
        n += (/&$/.test(n) ? "" : "&") + "ex_from=flight_youce_wangfantuijian";
        i.push('</ul><div class="b_rec_ft"><a target="_blank" id="js_moreFlight" href=' + n + '>更多航班低价组合<i class="ftsong">&gt;&gt;</i></a></div></div>');
        this.ele.innerHTML = i.join("");
        var u = ["FL", "DRTFRShow"].join("|");
        try {
            newTrackAction(u)
        } catch (a) {}
    }
    ;
    this.init()
}
(document.getElementById("js-mod-recommendRoundtrip"));
(function() {
    function findChildByClass(e, t, n) {
        if (!e) {
            return
        }
        var r = e.getElementsByTagName(t);
        if (!n) {
            return r
        }
        var i = r.length;
        var s = [];
        for (var o = 0; o < i; o++) {
            var u = r[o];
            if ($jex.hasClassName(u, n)) {
                s.push(u)
            }
        }
        return s
    }
    function removeClassInAll(e, t) {
        var n = e.length;
        for (var r = 0; r < n; r++) {
            var i = e[r];
            $jex.removeClassName(i, t)
        }
    }
    function fliterDomByAttr(e, t, n) {
        var r = e.length;
        for (var i = 0; i < r; i++) {
            var s = e[i];
            if (s.getAttribute(t) == n) {
                return s
            }
        }
    }
    function getStyleAttrVal(e, t) {
        if (e.currentStyle) {
            var n = e.currentStyle[t]
        } else {
            var n = getComputedStyle(e, false)[t]
        }
        return n
    }
    var Scroller = function() {
        function n(e, t, n, r) {
            var i = parseInt(getStyleAttrVal(e, t)) || 0;
            var s = n - i;
            var o = 5;
            var u = s / 5;
            if (n > i) {
                var a = function() {
                    i = i + u;
                    e.style[t] = i + "px";
                    s = n - i;
                    if (Math.abs(s) < o) {
                        u = n - i
                    } else {
                        u = (n - i) / 5
                    }
                    if (n > i) {
                        setTimeout(a, 20)
                    } else {
                        r && r()
                    }
                }
                ;
                a()
            } else {
                var a = function() {
                    i = i + u;
                    e.style[t] = i + "px";
                    s = n - i;
                    if (Math.abs(s) < 5) {
                        u = n - i
                    } else {
                        u = (n - i) / 5
                    }
                    if (n < i) {
                        setTimeout(a, 10)
                    } else {
                        r && r()
                    }
                }
                ;
                a()
            }
        }
        function r() {}
        var e = QunarDate.parse
          , t = $jex.ie == 6;
        r.prototype.init = function(e) {
            var t = this;
            this.isHorizontal = e.isHorizontal;
            this.step = e.step;
            this.wrap = e.wrap;
            this.container = e.container;
            this.compareMaxDate = e.compareMaxDate;
            this.compareMinDate = e.compareMinDate;
            this.next = findChildByClass(t.wrap, "a", "next-btn")[0];
            this.prev = findChildByClass(t.wrap, "a", "prev-btn")[0];
            this.cont = findChildByClass(this.container, "ul", "j-date-nuit")[0];
            this.readyScrollCont();
            this.fixNextStatus();
            this.fixPrevStatus()
        }
        ;
        r.prototype.readyScrollCont = function(e) {
            if (t) {
                return
            }
            if (!this.cloneNodePrev) {
                this.cloneNodePrev = this.cont.cloneNode(true);
                this.cloneNodeNext = this.cont.cloneNode(true);
                this.container.insertBefore(this.cloneNodePrev, this.cont);
                this.container.appendChild(this.cloneNodeNext);
                this.move(-1, false);
                return false
            }
            this.cloneNodePrev.innerHTML = e;
            this.cloneNodeNext.innerHTML = e
        }
        ;
        r.prototype.getPrevBtn = function() {
            return this.prev
        }
        ;
        r.prototype.getNextBtn = function() {
            return this.next
        }
        ;
        r.prototype.move = function(e, t, n) {
            function l() {
                r.isMoving = false;
                r.fixNextStatus();
                r.fixPrevStatus();
                r.moveToTarget("-" + s, false);
                n && n()
            }
            var r = this
              , i = r.container
              , s = r.step;
            if (r.isMoving) {
                return false
            }
            r.isMoving = true;
            var o = this.isHorizontal ? "marginLeft" : "marginTop"
              , u = parseInt(i.style[o] || 0, 10)
              , a = s * e;
            var f = u + a;
            this.moveToTarget(f, t, l)
        }
        ;
        r.prototype.moveToTarget = function(e, r, i) {
            var s = this
              , o = s.container;
            var u = s.isHorizontal ? "marginLeft" : "marginTop";
            if (t) {
                i && i();
                return false
            }
            if (r) {
                n(o, u, e, function() {
                    i && i()
                }
                )
            } else {
                o.style[u] = e + "px";
                i && i()
            }
        }
        ;
        r.prototype.fixPrevStatus = function() {
            var e = this
              , t = e.prev;
            var n = this.compareMinDate();
            if (!n) {
                $jex.addClassName(t, "disable-btn")
            } else {
                $jex.removeClassName(t, "disable-btn")
            }
        }
        ;
        r.prototype.fixNextStatus = function() {
            var e = this
              , t = e.next;
            var n = this.compareMaxDate();
            if (!n) {
                $jex.addClassName(t, "disable-btn")
            } else {
                $jex.removeClassName(t, "disable-btn")
            }
        }
        ;
        r.prototype.resetData = function(e) {
            this.dateArr = e
        }
        ;
        return r
    }
    ();
    var SpringHotRoundtrip = new function() {
        var service = DomesticOnewaySearchService;
        var analyzer = DomesticOnewayDataAnalyzer;
        var baseHtml = '<a class="prev-btn" href="javascript:;"><span class="btn-inner"><i class="g-ico g-ico-arrowl" id="arrowleft"></i></span></a>                        <div class="day-tab">                            <div  id="searchDateBar-nav" class="date-group">                                <ul class="ul_flt_date clrfix j-date-nuit"></ul>                            </div>                        </div>                        <a class="next-btn" href="javascript:;"><span class="btn-inner"><i class="g-ico g-ico-arrowr" id="arrowright"></i></span></a>                        <div class="prc_cld">                            <p id="priceCd" class="m_pc" style="visibility: visible;">价格日历</p>                            <div id="priceCalendar" class="prCd"></div>                        </div>';
        this.initialize = function(e) {
            this.args = e;
            this._DATACACHE = {};
            this.config = e["config"];
            this.searchDateBar = $jex.$("searchDateBar");
            this.searchDate = e["searchDate"];
            this.searchDateStr = QunarDate.format(this.searchDate);
            this.isToday = this.searchDateStr == $jex.date.format(SERVER_TIME);
            this.minDate = QunarDate.parse($jex.date.format(SERVER_TIME));
            this.maxDate = QunarDate.plus(this.minDate, 363);
            this.minSearchDate = this.minDate;
            this.maxSearchDate = QunarDate.plus(this.maxDate, -6);
            this.offsetToday = Math.floor((this.searchDate - $jex.date.parse($jex.date.format(SERVER_TIME))) / 24 / 36e5);
            this.dc = e["dc"];
            this.ac = e["ac"];
            var t = this.dc + "-" + this.ac;
            var n = [this.searchDateStr, "|", t].join("");
            this._queryStr = n;
            this.isInter = e["isInter"];
            this.startShowDate = this.config.startShowDate
        }
        ;
        this.template_sevenday = function(context, __onerror) {
            if (context == null )
                context = {};
            if (context._MODIFIERS == null )
                context._MODIFIERS = {};
            if (context.defined == null )
                context.defined = function(e) {
                    return context[e] != undefined
                }
                ;
            var resultArr = [];
            var resultOut = {
                write: function(e) {
                    resultArr.push(e)
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with (_CONTEXT) {
                        var day363 = 363 * 24 * 60 * 60 * 1e3;
                        var idx = 1;
                        var __LIST__day = days;
                        if (__LIST__day != null ) {
                            var day_ct = 0;
                            for (var day_index in __LIST__day) {
                                day_ct++;
                                if (typeof __LIST__day[day_index] == "function") {
                                    continue
                                }
                                var day = __LIST__day[day_index];
                                var deptDate = new Date(day.date.replace(/-/ig, "/"));
                                if (idx <= 7) {
                                    _OUT.write('<li date="');
                                    _OUT.write(day.date);
                                    _OUT.write('"');
                                    _OUT.write('><a href="javascript:;">');
                                    _OUT.write('<p class="date">');
                                    _OUT.write(_MODIFIERS["GetTitle"](day.date));
                                    _OUT.write("</p>");
                                    if (deptDate - (SERVER_TIME || new Date) <= day363) {
                                        _OUT.write('<p class="price">');
                                        if (day.price > 0) {
                                            _OUT.write('<i class="rmb">&yen;</i>');
                                            _OUT.write(day.price)
                                        } else {
                                            _OUT.write("查看")
                                        }
                                        _OUT.write("</p>")
                                    }
                                    _OUT.write("</a></li>")
                                }
                                var idx = idx + 1
                            }
                        }
                    }
                }
                )(resultOut, context)
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""))
                }
                throw e
            }
            return resultArr.join("")
        }
        ;
        this.template_returnsuggestion = function(context, __onerror) {
            if (context == null )
                context = {};
            if (context._MODIFIERS == null )
                context._MODIFIERS = {};
            if (context.defined == null )
                context.defined = function(e) {
                    return context[e] != undefined
                }
                ;
            var resultArr = [];
            var resultOut = {
                write: function(e) {
                    resultArr.push(e)
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with (_CONTEXT) {
                        _OUT.write('    <div class="hd">返程推荐</div>    <div class="ct">        <ul>');
                        var __LIST__item = data;
                        if (__LIST__item != null ) {
                            var item_ct = 0;
                            for (var item_index in __LIST__item) {
                                item_ct++;
                                if (typeof __LIST__item[item_index] == "function") {
                                    continue
                                }
                                var item = __LIST__item[item_index];
                                _OUT.write('            <li><a href="');
                                _OUT.write(item.url);
                                _OUT.write('&from=springRoundtripRecommend" hidefocus="on">');
                                _OUT.write(item.fromTime.substr(5));
                                _OUT.write("<br />                ");
                                _OUT.write(item.from);
                                _OUT.write("-");
                                _OUT.write(item.to);
                                _OUT.write("<br />                &yen;");
                                _OUT.write(item.price);
                                _OUT.write(' <span class="ds">');
                                _OUT.write(PriceUtil.getDiscount(item.discount));
                                _OUT.write("</span></a></li>")
                            }
                        }
                        _OUT.write("        </ul>    </div>")
                    }
                }
                )(resultOut, context)
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""))
                }
                throw e
            }
            return resultArr.join("")
        }
        ;
        this.template_pricecalendar = function(context, __onerror) {
            if (context == null )
                context = {};
            if (context._MODIFIERS == null )
                context._MODIFIERS = {};
            if (context.defined == null )
                context.defined = function(e) {
                    return context[e] != undefined
                }
                ;
            var resultArr = [];
            var resultOut = {
                write: function(e) {
                    resultArr.push(e)
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with (_CONTEXT) {
                        _OUT.write('<h3><span class="ymd">');
                        _OUT.write(date.getFullYear());
                        _OUT.write("年 ");
                        _OUT.write(date.getMonth() + 1);
                        _OUT.write('月</span></h3><span class="close" onclick="SpringHotRoundtrip.closePriceCalendar()"></span><div class="tab-box">');
                        _OUT.write('<span id="pcDown" class="prev" ');
                        if (prevMonth) {
                            _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + prevMonthDate + "')\"")
                        } else {
                            _OUT.write(' style="visibility:hidden;cursor:default;"')
                        }
                        _OUT.write('><i class="g-ico g-ico-arrowl"></i></span><span class="next" id="pcUp" ');
                        if (nextMonth) {
                            _OUT.write("onclick=\"SpringHotRoundtrip.getPriceData('" + nextMonthDate + "')\"")
                        } else {
                            _OUT.write(' style="visibility:hidden;cursor:default;"')
                        }
                        _OUT.write('><i class="g-ico g-ico-arrowr"></i></span>');
                        _OUT.write('<table cellspacing="0" cellpadding="0" border="0">     <tr>     <th>一</th>     <th>二</th>     <th>三</th>     <th>四</th>     <th>五</th>     <th class="sday">六</th>     <th class="sday">日</th>     </tr>');
                        var __LIST__row = [1, 2, 3, 4, 5, 6];
                        if (__LIST__row != null ) {
                            var row_ct = 0;
                            for (var row_index in __LIST__row) {
                                row_ct++;
                                if (typeof __LIST__row[row_index] == "function") {
                                    continue
                                }
                                var row = __LIST__row[row_index];
                                _OUT.write("<tr>");
                                var __LIST__col = [1, 2, 3, 4, 5, 6, 7];
                                if (__LIST__col != null ) {
                                    var col_ct = 0;
                                    for (var col_index in __LIST__col) {
                                        col_ct++;
                                        if (typeof __LIST__col[col_index] == "function") {
                                            continue
                                        }
                                        var col = __LIST__col[col_index];
                                        _OUT.write(" ");
                                        var dd = dateArr[(row - 1) * 7 + col];
                                        _OUT.write(" ");
                                        if (dd) {
                                            _OUT.write(" ");
                                            var pd = dd[1];
                                            _OUT.write("     <td");
                                            if ((col == 6 || col == 7) && dd[2] != false) {
                                                _OUT.write(' class="sday"')
                                            }
                                            _OUT.write(" ");
                                            if (dd[0] == currentDate) {
                                                _OUT.write(' id="pcurrentDate"')
                                            }
                                            _OUT.write(' date="');
                                            _OUT.write(dd[0]);
                                            _OUT.write('">');
                                            if (pd != false) {
                                                _OUT.write('     <a href="');
                                                _OUT.write(dd[2]);
                                                _OUT.write('&from=tejia_rili">');
                                                _OUT.write(dd[3]);
                                                _OUT.write('<span><i class="rmb">&yen;</i>');
                                                _OUT.write("<b>" + pd + "</b>");
                                                _OUT.write("</span></a>")
                                            } else if (dd[2] != false) {
                                                _OUT.write('     <a href="');
                                                _OUT.write(dd[2]);
                                                _OUT.write('&from=tejia_rili">');
                                                _OUT.write(dd[3]);
                                                _OUT.write("<span>查看</span></a>")
                                            } else {
                                                _OUT.write("     ");
                                                _OUT.write(dd[3]);
                                                _OUT.write("<br/>--")
                                            }
                                            _OUT.write(" ")
                                        } else {
                                            _OUT.write("     <td>     &nbsp;")
                                        }
                                        _OUT.write("     </td>")
                                    }
                                }
                                _OUT.write("         </tr>")
                            }
                        }
                        _OUT.write("</table></div>")
                    }
                }
                )(resultOut, context)
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""))
                }
                throw e
            }
            return resultArr.join("")
        }
        ;
        this.template_roundtripvendor = function(context, __onerror) {
            if (context == null )
                context = {};
            if (context._MODIFIERS == null )
                context._MODIFIERS = {};
            if (context.defined == null )
                context.defined = function(e) {
                    return context[e] != undefined
                }
                ;
            var resultArr = [];
            var resultOut = {
                write: function(e) {
                    resultArr.push(e)
                }
            };
            try {
                (function(_OUT, _CONTEXT) {
                    with (_CONTEXT) {
                        _OUT.write('<div class="qn_fcbox">                <div class="t2"></div><div class="t1"></div><div class="t0"></div><div class="t0"></div>                <div class="ct_wrapper"><div class="ct">                    <table cellspacing="0" cellpadding="0" class="tblFcbox">                        <tr>                            <td width="126"><div class="t"><span>往返推荐</span></div></td>                            <td class="wf" width="480">');
                        var idx = 0;
                        _OUT.write(" ");
                        var __LIST__data = extData;
                        if (__LIST__data != null ) {
                            var data_ct = 0;
                            for (var data_index in __LIST__data) {
                                data_ct++;
                                if (typeof __LIST__data[data_index] == "function") {
                                    continue
                                }
                                var data = __LIST__data[data_index];
                                _OUT.write(" ");
                                if (idx < 2) {
                                    _OUT.write('                                        <a target="_blank" href="');
                                    _OUT.write(data.bu);
                                    _OUT.write('"><span class="vtl">去 ');
                                    _OUT.write(data.fromDate.replace(/\d\d\d\d-/, ""));
                                    _OUT.write('</span><span class="vtl">返 ');
                                    _OUT.write(data.toDate.replace(/\d\d\d\d-/, ""));
                                    _OUT.write('</span><span class="price">&yen;<em>');
                                    _OUT.write(data.packagePrice);
                                    _OUT.write("</em></span></a>");
                                    var idx = idx + 1;
                                    _OUT.write(" ")
                                }
                                _OUT.write(" ")
                            }
                        }
                        _OUT.write('                            </td>                        </tr>                </table>            </div></div>            <div class="b0"></div><div class="b0"></div><div class="b1"></div><div class="b2"></div>        </div>')
                    }
                }
                )(resultOut, context)
            } catch (e) {
                if (__onerror && typeof __onerror == "function") {
                    __onerror(e, resultArr.join(""))
                }
                throw e
            }
            return resultArr.join("")
        }
        ;
        var _goDateStr = null ;
        this.goDateStr = function(e) {
            if (e) {
                _goDateStr = e
            } else {
                return _goDateStr
            }
        }
        ;
        this.load = function(e) {
            var t = this;
            if (!e) {
                _goDateStr = QunarDate.format(QunarDate.plus(this.searchDate, -3))
            } else {
                _goDateStr = e
            }
            var n = QunarDate.parse(_goDateStr);
            var r = QunarDate.compareDate(n, t.minSearchDate);
            var i = QunarDate.compareDate(n, t.maxSearchDate);
            if (r < 0) {
                _goDateStr = QunarDate.format(t.minSearchDate)
            }
            if (i > 0) {
                _goDateStr = QunarDate.format(t.maxSearchDate)
            }
            t.goDateStr(_goDateStr);
            if (this.firstRenderSevenNav) {
                this.searchDateBar.innerHTML = baseHtml;
                this.priceCalendarDom = $jex.$("priceCalendar");
                this.priceCdDom = $jex.$("priceCd")
            }
            if (!service.isValidQuery()) {
                this.sevenday();
                return
            }
            var s = 10;
            var o = DomesticOnewaySearchService.longwell().queryID;
            var u = ["http://flight.qunar.com/twell/flight/getLp.jsp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", _goDateStr, "&backDate=", _goDateStr, "&count=", s, "&packto=", this.searchDateStr, "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 36e5)), "&packcount=9", "&output=json&n=", Math.random(), "&queryID=", encodeURIComponent(o)].join("");
            var a = new ScriptRequest({
                funcName: "SpringHotRoundtrip.parsedata",
                callbackName: "callback"
            });
            a.send(u)
        }
        ;
        this.parsedata = function(e) {
            if (!e) {
                return
            }
            this.cacheData = this.patch(e);
            this.sevenday();
            this.updateSevenDayToday();
            if (!this.firstRenderSevenNav) {
                this.springRoundRecommend_Load()
            }
        }
        ;
        this.updateSevenDayToday = function(e) {
            var t = this;
            e = analyzer.lowestPrice();
            if (!e || e == Number.MAX_VALUE) {
                return
            }
            this.nowprice = e;
            if (t.firstRenderSevenNav) {
                return false
            }
            var n = t.currentNav;
            if (n) {
                var r = n.getElementsByTagName("p");
                if (r[1]) {
                    r[1].innerHTML = '<i class="rmb">&yen;</i>' + e;
                    t.searchDateBar.style.display = "block"
                }
                t.currentNavData.price = e;
                t.fixLowestIconInNav()
            }
            var i = $jex.$("pcurrentDate");
            if (i) {
                i.getElementsByTagName("span")[0].innerHTML = '<i class="rmb">&yen;</i><b>' + e + "</b>";
                t.currentCdData && (t.currentCdData[1] = e);
                t.fixLowestIconInCalendar()
            }
            if (this.cacheData && this.cacheData.out && this.cacheData.out[this._queryStr]) {
                this.cacheData.out[this._queryStr].pr = this.nowprice
            } else {
                this.cacheData = {
                    out: {}
                };
                this.cacheData["out"][this._queryStr] = {
                    pr: this.nowprice,
                    dt: this.searchDateStr
                }
            }
        }
        ;
        this.firstRenderSevenNav = true;
        this.searchDateBar_nav = null ;
        this.resultUnit = null ;
        this.currentNav = null ;
        this.sevenday = function() {
            var e = this;
            var t = e.searchDateBar;
            if (!t) {
                return
            }
            var e = this;
            var n = function(t) {
                var n = t + "|" + e.dc + "-" + e.ac;
                if (e.cacheData && e.cacheData.out && e.cacheData.out[n]) {
                    return parseInt(e.cacheData.out[n].price, 10)
                }
                return 0
            }
            ;
            var r = {};
            var i = [];
            var s = QunarDate.parse(e.goDateStr());
            var o = [];
            this.navDataArr = o;
            this.eachDay(function(e) {
                var t = $jex.date.format(e);
                r[t] = {
                    date: t,
                    price: n(t)
                };
                o.push(r[t]);
                if (n(t) == 0) {
                    i.push(true)
                }
                return true
            }
            , s, 6);
            if (i.length <= 7) {
                $jex.element.show(e.searchDateBar);
                $jex.addClassName(e.searchDateBar, "show_bar");
                $jex.element.show($jex.$("searchDateBar_bottom"))
            }
            var u = this.template_sevenday({
                days: r,
                currentDate: this.searchDateStr,
                _MODIFIERS: {
                    GetTitle: function(e) {
                        return e.replace(/.*\d{4}-(.*)/, "$1") + " " + ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][$jex.date.parse(e).getDay()]
                    }
                }
            });
            if (e.firstRenderSevenNav) {
                e.searchDateBar_nav = $jex.$("searchDateBar-nav");
                e.resultUnit = e.searchDateBar.getElementsByTagName("ul")[0];
                if (!e.resultUnit) {
                    return
                }
                e.resultUnit.innerHTML = u;
                e.initScroller(u);
                e.bindNavEvent();
                e.firstRenderSevenNav = false
            } else {
                e.resultUnit.innerHTML = u;
                e.scroller.readyScrollCont(u)
            }
            var a = e.searchDateStr;
            if (r[a]) {
                e.currentNavData = r[a];
                var f = fliterDomByAttr(e.resultUnit.getElementsByTagName("li"), "date", a);
                e.currentNav = f;
                $jex.addClassName(f, "cur")
            } else {
                e.currentNav = null ;
                e.currentNavData = null 
            }
            e.fixLowestIconInNav();
            if (e.resultUnit) {
                var l = e.resultUnit.getElementsByTagName("li");
                $jex.array.each(l, function(e, t) {
                    if (t >= 7)
                        return;
                    $jex.event.bind(e, "click", function(n) {
                        var n = n || window.event;
                        n.preventDefault && n.preventDefault();
                        n.returnValue = false;
                        var r = e.getAttribute("date");
                        var i = window.location.research(null , null , r, r);
                        if (/&sd_idx=/.test(i)) {
                            i = i.replace(/&sd_idx=\d/, "&sd_idx=" + t)
                        } else {
                            i += "&sd_idx=" + t
                        }
                        if (/&SearchLocation=/.test(i)) {
                            i = i.replace(/&SearchLocation=[a-z_-]+/i, "&SearchLocation=sevenday_search")
                        } else {
                            i += "&SearchLocation=sevenday_search"
                        }
                        if (/&from=/.test(i)) {
                            i = i.replace(/&from=[a-z_-]+/i, "&from=tejia_iow_qiri")
                        } else {
                            i += "&from=tejia_iow_qiri"
                        }
                        var s = QLib && QLib.getEx_track && QLib.getEx_track();
                        if (s) {
                            i += "&" + s
                        }
                        window.location = i
                    }
                    )
                }
                )
            }
        }
        ;
        this.fixLowestIconInNav = function() {
            function s(e, t) {
                var n = parseInt(e.price, 10)
                  , r = parseInt(t.price, 10);
                if (!n) {
                    return 1
                }
                if (!r) {
                    return -1
                }
                var i = n - r;
                if (i != 0) {
                    return i
                } else {
                    o(e);
                    o(t);
                    var s = e.dis - t.dis;
                    if (s == 0) {
                        return e.range - t.range
                    } else {
                        return s
                    }
                }
            }
            function o(t) {
                var n = QunarDate.parse(t.date)
                  , r = e.searchDate;
                var i = QunarDate.compareDate(n, r);
                var s;
                if (i == 0) {
                    s = 0
                } else if (i > 1) {
                    s = 1
                } else {
                    s = 2
                }
                t.dis = Math.abs(i);
                t.range = s
            }
            var e = this;
            var t = e.navDataArr;
            var n = e.resultUnit.getElementsByTagName("li");
            t.sort(s);
            var r = t[0];
            if (r.price) {
                var i = fliterDomByAttr(n, "date", r.date);
                removeClassInAll(n, "lowest");
                $jex.addClassName(i, "lowest")
            }
        }
        ;
        this.initScroller = function() {
            function n(n) {
                e.load(QunarDate.format(QunarDate.plus(QunarDate.parse(e.goDateStr()), n)));
                t.move(n > 0 ? -1 : 1, true)
            }
            var e = this;
            e.scroller = new Scroller;
            e.scroller.init({
                wrap: e.searchDateBar,
                container: e.searchDateBar_nav,
                isHorizontal: true,
                step: 609,
                compareMinDate: function() {
                    var t = QunarDate.parse(e.goDateStr());
                    return QunarDate.compareDate(t, e.minDate) <= 0 ? false : true
                },
                compareMaxDate: function() {
                    var t = QunarDate.plus(QunarDate.parse(e.goDateStr()), 7);
                    return QunarDate.compareDate(t, e.maxDate) >= 0 ? false : true
                }
            });
            var t = e.scroller;
            $jex.event.bind(e.scroller.getNextBtn(), "click", function() {
                if ($jex.hasClassName(this, "disable-btn")) {
                    return false
                }
                n(7);
                return false
            }
            );
            $jex.event.bind(e.scroller.getPrevBtn(), "click", function() {
                if ($jex.hasClassName(this, "disable-btn")) {
                    return false
                }
                n(-7);
                return false
            }
            )
        }
        ;
        this.bindNavEvent = function() {
            var e = this;
            this.cpbind = true;
            var t = e.priceCdDom;
            t.style.visibility = "visible";
            this._index = -1;
            $jex.event.bind(t, "click", function(t) {
                if (!e.cpshow) {
                    $jex.stopEvent(t);
                    if (e.searchDate.getMonth() == SERVER_TIME.getMonth()) {
                        e.getPriceData(e.searchDateStr)
                    } else {
                        e.getPriceData([e.searchDate.getFullYear(), "-", e.searchDate.getMonth() + 1, "-01"].join(""))
                    }
                }
            }
            );
            $jex.event.bind(document, "keydown", this._keydownFunc);
            $jex.event.bind(document, "click", function(t) {
                var t = t || window.event;
                var n = t.target || t.srcElement;
                if ($jex.element.compareDocumentPosition(e.priceCalendarDom, n) & 16) {
                    return
                } else {
                    e.closePriceCalendar()
                }
            }
            )
        }
        ;
        this._returnData = {};
        this._packageData = {};
        this.roundtripVendor = function(e, t, n) {
            e = analyzer.lowestPrice();
            var r = this.searchDate;
            var i = $jex.date.format(r);
            var s = this;
            $jex.hash.each(t, function(t, o) {
                var u = o;
                var a = [i, u.dt].join("|");
                if (n[a]) {
                    if (e + parseFloat(u.price) > n[a].price) {
                        u.lowestPrice = e + parseFloat(u.price);
                        u.packagePrice = n[a].price;
                        u.bu = s.createUrl(u.dt, true) + "&from=tejia_recmd_pac",
                        u.fromDate = $jex.date.format(r, "MM-dd");
                        u.toDate = $jex.date.format($jex.date.parse(u.fromTime), "MM-dd");
                        s._returnData[t] = u
                    }
                }
            }
            );
            this._num = 0;
            $jex.hash.each(this._returnData, function(e, t) {
                if (s._num < 7) {
                    s._packageData[e] = t
                }
                s._num++
            }
            );
            var o = [];
            for (var u in this._packageData)
                o.push(u);
            o.sort(function(e, t) {
                return s._packageData[e].packagePrice - s._packageData[t].packagePrice
            }
            );
            if (o.length < 1) {
                return
            }
            var a = {
                keys: o,
                extData: this._packageData
            };
            var f = $jex.$("roundtripVendor");
            if (f) {
                f.innerHTML = this.template_roundtripvendor(a);
                this.onshow = true
            }
        }
        ;
        this.springRoundRecommend_Load = function() {
            if (!$jex.define(this.cacheData)) {
                return
            }
            var e = 5;
            var t = this.ac + "-" + this.dc;
            var n = {};
            var r = this;
            this.eachDay(function(i) {
                var s = [$jex.date.format(i), t].join("|");
                if (r.cacheData["re"] && r.cacheData["re"][s]) {
                    n[s] = r.cacheData["re"][s]
                }
                var o = 0;
                $jex.hash.each(n, function() {
                    o++
                }
                );
                return !(o >= e)
            }
            , new Date(r.searchDate.getTime() + 1 * 24 * 36e5));
            var i = 0;
            $jex.hash.each(n, function() {
                i++
            }
            );
            var s = $jex.$("dSpringPanel");
            s.innerHTML = this.template_returnsuggestion({
                data: n,
                inSpringtrip: false
            });
            if (i > 0) {
                $jex.element.show(s)
            } else {
                $jex.element.hide(s)
            }
        }
        ;
        this._keydownFunc = function(e) {
            if (!this.cpshow)
                return;
            var t = e || window.event;
            var n = Event.element(e);
            var r = t.keyCode;
            var i = this.priceCalendarDom.style.display != "none";
            if (r == 37 || r == 65) {
                if ($("pcUp").style.visibility != "hidden" && i) {
                    $("pcUp").onclick()
                }
            }
            if (r == 39 || r == 68) {
                if ($("pcDown").style.visibility != "hidden" && i) {
                    $("pcDown").onclick()
                }
            }
            var s = [81, 85, 78, 65, 82, 81, 85, 78, 65, 82, 13];
            if (r == s[this._index + 1]) {
                this._index++;
                if (this._index == s.length - 1) {
                    createEgg();
                    this._index = -1
                }
            } else {
                this._index = -1
            }
        }
        ;
        this.cpbind = false;
        this.cpshow = false;
        this.nextPc = function(e) {
            this.getPriceData(e);
            return
        }
        ;
        this.prvePc = function(e) {
            this.getPriceData(e);
            return
        }
        ;
        this.priceCacheData = {};
        this.currentCdData = null ;
        this.getPriceData = function(e) {
            var t;
            if (e && e.split("-")[2].length == 2) {
                t = e.replace(/\d{2}$/, "01")
            }
            this._dateStr = e;
            var n = DomesticOnewaySearchService.longwell().queryID;
            var r = ["http://flight.qunar.com/twell/flight/getLp.jsp?", "from=", encodeURIComponent(this.dc), "&to=", encodeURIComponent(this.ac), "&goDate=", t, "&backDate=", t, "&count=", 35, "&packto=", $jex.date.format(this.searchDate), "&packreturn=", $jex.date.format(new Date(this.searchDate.getTime() + 2 * 24 * 36e5)), "&packcount=7", "&output=json&n=", Math.random(), "&queryID=", encodeURIComponent(n)].join("");
            var i = new ScriptRequest({
                funcName: "SpringHotRoundtrip.parsePriceData",
                callbackName: "callback"
            });
            i.send(r)
        }
        ;
        this.parsePriceData = function(e) {
            this.priceCacheData = this.patch(e);
            this.priceCalendar()
        }
        ;
        this.priceCalendar = function() {
            if (!this.priceCacheData)
                return;
            var e = this, t, n = [], r = $jex.date.parse(this._dateStr);
            if (!this._sdate) {
                this._sdate = r
            }
            var i = new Date(363 * 24 * 3600 * 1e3 + SERVER_TIME.getTime());
            var s = {};
            var o = r.getFullYear();
            var u = r.getMonth() + 1;
            var a = r.getDate();
            var f = (new Date(o,u - 1,1)).getDay();
            if (f == 0) {
                f = 7
            }
            var l = (new Date(o,u,0)).getDate();
            for (var c = 0; c < f; c++) {
                n.push(false)
            }
            var h = this.dc + "-" + this.ac;
            var p = new Date;
            while (n.length < 6 * 7) {
                if (n.length >= f + l) {
                    n.push(false)
                } else {
                    var t = new Date(o,u - 1,n.length + 1 - f);
                    var d = t.getMonth() + 1;
                    if (d < 10) {
                        d = "0" + d
                    }
                    var v = t.getDate();
                    if (v < 10) {
                        v = "0" + v
                    }
                    var m = [t.getFullYear(), "-", d, "-", v].join("");
                    var g = [m, "|", h].join("");
                    var y = this.priceCacheData.out[g];
                    if ((SERVER_TIME < t || $jex.date.format(SERVER_TIME) == $jex.date.format(t)) && t < i) {
                        var b = ["/twell/flight/Search.jsp?fromCity=", encodeURIComponent(this.dc), "&toCity=", encodeURIComponent(this.ac), "&fromDate=", m, "&toDate=", $jex.date.format(new Date($jex.date.parse(m).getTime() + 3 * 24 * 36e5)), "&searchType=OnewayFlight"].join("");
                        b = this.addEx_track(b)
                    } else {
                        var b = false
                    }
                    var w;
                    if (y) {
                        w = [m, y.pr, y.url, t.getDate()]
                    } else {
                        w = [m, false, b, t.getDate()]
                    }
                    if (m == e.searchDateStr) {
                        e.currentCdData = w
                    }
                    n.push(w)
                }
            }
            var E = _prevMonth = false;
            var S = new Date(o,u - 1,0);
            var x = new Date(o,u,1);
            if (S >= SERVER_TIME) {
                _prevMonth = true
            }
            if (x <= i) {
                E = true
            }
            var T = $jex.date.format(new Date(o,u - 2,1));
            var N = $jex.date.format(new Date(o,u,1));
            var C = {
                nextMonth: E,
                prevMonth: _prevMonth,
                dateArr: n,
                prevMonthDate: T,
                nextMonthDate: N,
                date: new Date(o,u - 1,1),
                citystr: this.dc + "-" + this.ac,
                currentDate: this.searchDateStr
            };
            e.calendarDataArr = n.concat();
            var k = this.template_pricecalendar(C);
            e.priceCalendarDom.innerHTML = k;
            $jex.element.show(e.priceCalendarDom);
            $jex.addClassName(e.priceCdDom.parentNode, "prc_cld_on");
            e.fixLowestIconInCalendar();
            this.cpshow = true;
            return
        }
        ;
        this.fixLowestIconInCalendar = function() {
            function s(e, n) {
                if (!e) {
                    return 1
                }
                if (!n) {
                    return -1
                }
                var r = e[1]
                  , i = n[1];
                if (!r) {
                    return 1
                }
                if (!i) {
                    return -1
                }
                var s = r - i;
                if (s != 0) {
                    return s
                } else {
                    var o = QunarDate.parse(e[0]);
                    var u = QunarDate.parse(n[0]);
                    var a = QunarDate.compareDate(o, t);
                    var f = QunarDate.compareDate(u, t);
                    var l = Math.abs(a);
                    var c = Math.abs(f);
                    var h = l - c;
                    if (h != 0) {
                        return l - c
                    } else {
                        return -(a - f)
                    }
                }
            }
            function o(t) {
                var n = QunarDate.parse(t.date)
                  , r = e.searchDate;
                var i = QunarDate.compareDate(n, r);
                var s;
                if (i == 0) {
                    s = 0
                } else if (i > 1) {
                    s = 1
                } else {
                    s = 2
                }
                t.dis = Math.abs(i);
                t.range = s
            }
            var e = this
              , t = e.searchDate;
            e.calendarDataArr.sort(s);
            var n = e.calendarDataArr[0];
            if (n && n[1]) {
                var r = e.priceCalendarDom.getElementsByTagName("td");
                var i = fliterDomByAttr(r, "date", n[0]);
                removeClassInAll(r, "lowest");
                $jex.addClassName(i, "lowest")
            }
        }
        ;
        this.closePriceCalendar = function() {
            $jex.element.hide(this.priceCalendarDom);
            $jex.removeClassName(this.priceCdDom.parentNode, "prc_cld_on");
            this._index = -1;
            this.cpshow = false
        }
        ;
        this.patch = function(e) {
            var t = this;
            var n = function(e, n) {
                $jex.hash.each(e, function(e, r) {
                    var i = e.replace(/[^\|]*\|/, "").split("-");
                    $jex.merge(r, {
                        url: n ? t.createCanlederUrl(r.dt) : t.createUrl(r.dt, false),
                        price: r.pr,
                        discount: r.dis,
                        fromTime: r.dt,
                        from: i[0],
                        to: i[1]
                    })
                }
                )
            }
            ;
            n(e.re, false);
            n(e.out, true);
            $jex.hash.each(e.packagelist.normal, function(e, t) {
                t.price = t.pr
            }
            );
            if (this.nowprice && e.out[this._queryStr]) {
                e.out[this._queryStr].pr = this.nowprice
            } else if (this.nowprice && !e.out[this._queryStr]) {
                e.out[this._queryStr] = {
                    pr: this.nowprice,
                    dt: this.searchDateStr,
                    url: this.createCanlederUrl(this.searchDateStr)
                }
            }
            return e
        }
        ;
        this.createUrl = function(e, t) {
            var n = window.location.param();
            if (t) {
                var r = "/twell/flight/Search.jsp?" + "fromCity=" + encodeURIComponent(n.searchDepartureAirport) + "&toCity=" + encodeURIComponent(n.searchArrivalAirport) + "&fromDate=" + encodeURIComponent(n.searchDepartureTime) + "&toDate=" + e + "&op=1"
            } else {
                var r = "/twell/flight/Search.jsp?" + "fromCity=" + encodeURIComponent(n.searchArrivalAirport) + "&toCity=" + encodeURIComponent(n.searchDepartureAirport) + "&fromDate=" + e + "&toDate=" + e + "&searchType=OnewayFlight"
            }
            return this.addEx_track(r)
        }
        ;
        this.createCanlederUrl = function(e) {
            var t = window.location.param();
            var n = "/twell/flight/Search.jsp?" + "fromCity=" + encodeURIComponent(t.searchDepartureAirport) + "&toCity=" + encodeURIComponent(t.searchArrivalAirport) + "&fromDate=" + e + "&toDate=" + e + "&searchType=OnewayFlight";
            return this.addEx_track(n)
        }
        ;
        this.addEx_track = function(e) {
            var t = QLib && QLib.getEx_track && QLib.getEx_track();
            if (t) {
                e += "&" + t
            }
            return e
        }
        ;
        this.eachDay = function(e, t, n) {
            var r = t;
            if (!n) {
                n = new Date(t.getTime() + 50 * 24 * 36e5)
            } else if (typeof n == "number") {
                n = new Date(t.getTime() + n * 24 * 36e5)
            }
            while (r <= n) {
                if (!e(r))
                    break;
                r = new Date(r.getTime() + 24 * 60 * 60 * 1e3)
            }
        }
    }
    ;
    window.SpringHotRoundtrip = SpringHotRoundtrip
}
)();
(function(e) {
    var t = "http://lp.flight.qunar.com/api/dom/recommend/nearby_route";
    var n = $jex.$("dflightRecommendPanel");
    $jex.removeClassName(n, "m-nearline-rec");
    $jex.removeClassName(n, "m-find-ticket");
    var r = new function() {
        var e;
        this.load = function(n) {
            var r = n.from;
            e = r == "near_flight" || r == "near_airport" ? 0 : 1;
            if (!e) {
                return
            }
            var i = this
              , s = {
                from: n.searchDepartureAirport,
                to: n.searchArrivalAirport,
                start_date: n.searchDepartureTime
            };
            $jex.jsonp(t, s, function(e) {
                if (!e || !e.records || e.records.length == 0) {
                    return
                }
                var t = e.records[0];
                i.render && i.render(t)
            }
            , {
                timeout: {
                    time: 8e3,
                    func: function() {}
                }
            })
        }
        ;
        this.render = function(e) {
            function o() {
                var t = e.trainpr
                  , n = e.traindc
                  , r = e.trainac;
                if (!t || t == 999999999) {
                    return ""
                }
                return n + "-" + r + ' 火车票参考价：<span class="train-low-prc"><i class="rmb">&yen;</i>' + e.trainpr + "</span>"
            }
            function u() {
                if (!e.pr) {
                    return '<div class="c5"></div><div class="c6"></div><div class="c7"></div>'
                }
                return '<div class="c5">' + t + "-" + r + "</div>" + '<div class="c6"><div class="a-low-prc">' + Price_html.getHTML(e.pr) + '<i class="rmb">¥</i></div></div>' + '<div class="c7">起</div>'
            }
            function a() {
                return "/twell/flight/Search.jsp?fromCity=" + encodeURIComponent(t) + "&toCity=" + encodeURIComponent(r) + "&fromDate=" + i + "&searchType=OnewayFlight&from=near_flight"
            }
            if ((!e.trainpr || e.trainpr == 999999999) && !e.pr) {
                return false
            }
            var t = e.dc
              , r = e.ac
              , i = e.dt;
            var s = '<div class="m-nearline-rec-inner clrfix">' + '<div class="c0"></div>' + '<div class="c1">邻近推荐</div>' + '<div class="c2">' + o() + "</div>" + u() + '<div class="c8"><a href="' + a() + '" class="link">查&nbsp;&nbsp;看</a></div>' + "</div>";
            $jex.addClassName(n, "m-nearline-rec");
            if ($jex.hasClassName(this.nearLineWrap, "m-find-ticket")) {
                $jex.addClassName(this.nearLineWrap, "m-nearline-find-ticket")
            }
            var f = n.innerHTML;
            var l = s + f;
            n.innerHTML = l;
            $jex.element.show(n)
        }
    }
    ;
    e.NearLineRec = r
}
)(window);
var BookingPriceCheck = function() {
    var e = {};
    e.init = function() {
        function e(e) {
            var t = e.key() + "_" + e.getWrapperListType();
            PriceCheckService.pause(t)
        }
        PAGE_EVENT.bind("wrapper_loadData", function(e) {
            if (!e.interceptTime)
                return;
            for (var t in e.priceData) {}
            var n = t + "_" + (e.labelType || "all");
            PriceCheckService.initData(n, e.interceptTime)
        }
        );
        PAGE_EVENT.bind("wrapper_list_close", function(t) {
            e(t);
            var n = t.codeShareFlight();
            n && e(n)
        }
        );
        PAGE_EVENT.bind("wrapper_list_open", function(e) {
            var t = e.key() + "_" + e.getWrapperListType();
            PriceCheckService.start(t)
        }
        );
        PAGE_EVENT.bind("wrapper_price_change", function(e, t) {
            HoldLastShowFlight.goHoldUrl(e, t)
        }
        )
    }
    ;
    e.check = function(e, t) {
        var n = e.ownerFlight();
        if (n.type == "onewayInTransfer")
            return;
        var r = n.getWrapperListType()
          , i = e.dataSource().type;
        var s = n.key() + "_" + r
          , o = e.wrapperId() + "_" + i;
        var u = PriceCheckService.getPriceInfo(s, o);
        if (u) {
            t = t || 0;
            var a = t == 1 ? u.pr : u.bpr
              , f = t == 1 ? e.afeePrice() : e.bprPrice();
            if (a !== f) {
                var l = n._shareFlight || n;
                PAGE_EVENT.trigger("wrapper_price_change", l.flightKeyCode(), r);
                try {
                    TsinghuaOneWayTracker.bookingHoldTrack(e, t, a, f)
                } catch (c) {}
                return true
            }
        }
    }
    ;
    return e
}
();
if (typeof window.Dujia_recommend === "undefined") {
    window.Dujia_recommend = {}
}
Dujia_recommend.init = function(e) {
    this.HOST = "http://combine.dujia.qunar.com/get_fp_info_to_flight_list";
    this.WRAPPERID = "dujiaRecommend";
    this.args = e || {};
    this._data = [];
    var t = this;
    setTimeout(function() {
        t.live()
    }
    , 3e3)
}
;
Dujia_recommend.live = function() {
    var e = this._parseArg();
    this._sendRequest(e)
}
;
Dujia_recommend.update = function(e) {
    function r(e) {
        var t = e.title;
        var n = t.split("#");
        if (n.length === 4) {
            e.cityInfo = n[0] || "";
            e.flightInfo = n[1] || "";
            e.timeInfo = n[2] || "";
            e.hotelInfo = n[3] || ""
        }
    }
    if (e.ret) {
        this._data = e.data;
        for (var t = 0; t < this._data.length; t++) {
            var n = this._data[t];
            r(n)
        }
        this._render()
    }
}
;
Dujia_recommend._parseArg = function() {
    var e = this.HOST + "?";
    var t = this.args;
    for (var n in t) {
        e += n + "=" + encodeURIComponent(t[n]) + "&"
    }
    e = e.replace(/&$/, "");
    return e
}
;
Dujia_recommend._sendRequest = function(e) {
    var t = new ScriptRequest({
        funcName: "Dujia_recommend.update",
        callbackName: "callback"
    });
    t.send(e)
}
;
Dujia_recommend._render = function() {
    if (this._data.length) {
        this._insertCSS();
        this._insertHTML()
    }
}
;
Dujia_recommend._insertCSS = function() {
    var e = '.dujia_recommend .dj_wrap { background-color: #f7fdfc; border-bottom: 1px solid #ebebeb; border-top: 1px solid #1facab; clear: both; margin-bottom: 8px; padding: 0 5px 5px;}.dujia_recommend .dj_wrap .hd { font-size: 14px; font-weight: 700; padding: 6px 5px 5px;}.dujia_recommend .dj_wrap .ct { background-color: #fff; overflow: hidden; width: 100%;}/* add 往返机票+酒店超值打包 **/.dj_sheng{ display:inline-block; zoom:1; position:relative; top:-10px;}.jijiu{ background:#fff; width:730px; margin:0 auto;}.jijiu li{  float:left; _display:inline; border-top:1px solid #dfedeb; width:320px; margin:-1px 25px 0 20px; padding:8px 0;}.jijiu li .jijiu_sub{ display:block; cursor:pointer;}.jijiu_tit{ color:#0069ca; font-size:14px; line-height:24px; width:320px; white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow: hidden;}.jijiu{ overflow:hidden;}.jijiu li a:hover.jijiu_sub .jijiu_tit{ color:#f60;}.jijiu_info { font:0/1 Arial;}.jijiu_info .pr_y{ display:inline-block; zoom:1; font:12px/24px "fae8f6f96c59ed1"; color:#ff6600; padding-right:8px;}.jijiu_info .pr_y .yen{ font:12px/24px Arial;font-style:normal;}.jijiu_info .pr_y .jg{ font: bold 14px/24px Arial;}.jijiu_info .pr_s{ display:inline-block; zoom:1; height:18px; margin:3px 0;font:12px/18px sans-serif; background:#f60; color:#fff; padding:0 5px; position:relative;}.jijiu_info .pr_s .yen{font-family:arial;font-style:normal;}.jijiu_info .pr_s .sj{display:inline-block; zoom:1; height:0; width:0; overflow:hidden; border-bottom:4px dashed transparent;border-top:4px dashed transparent; border-right:4px solid #f60; position:absolute; left:-4px; top:5px;}.jijiu_info .jj_date{ display:inline-block; zoom:1; color:#333; font:14px/24px sans-serif; padding-left:10px;}';
    $jex.createCssText(e)
}
;
Dujia_recommend._insertHTML = function() {
    function i(e) {
        var t = e.split("-");
        if (t.length === 3) {
            return t[1] + "." + t[2]
        }
    }
    var e = [];
    e = ['<div class="dj_wrap">', '<div class="hd">往返机票+酒店超值打包<img src="http://source.qunar.com/package/i/sheng.png" alt="省" width="24" height="22" class="dj_sheng"></div>', '<div class="ct">', '<ul class="jijiu">'];
    for (var t = 0; t < this._data.length; t++) {
        var n = this._data[t];
        var r = "[" + n.cityInfo + "]" + n.flightInfo + n.timeInfo + n.hotelInfo;
        e.push("<li>");
        e.push('<a href="', n.url, '" class="jijiu_sub" target="_blank" title="', r, '">');
        e.push('<div class="jijiu_tit" title=""><strong>[', n.cityInfo, "]</strong>", n.flightInfo, "+", n.timeInfo, n.hotelInfo, "</div>");
        e.push('<div class="jijiu_info">');
        e.push('<span class="pr_y"><i class="yen">&yen;</i><em class="jg">', n.price, "</em>起</span>");
        e.push('<span class="pr_s"><i class="sj"></i>省<i class="yen">&yen;</i><em class="jg">', n.save, "</em></span>");
        e.push('<span class="jj_date">', i(n.to_date), "出发</span>");
        e.push('<span class="jj_date">', i(n.back_date), "返回</span>");
        e.push("</div>");
        e.push("</a>");
        e.push("</li>")
    }
    e.push("</ul>");
    e.push("</div>");
    e.push("</div>");
    if (document.getElementById(this.WRAPPERID)) {
        document.getElementById(this.WRAPPERID).innerHTML = e.join("")
    }
}
;
var LOG_SPIDER = function() {
    var e = {};
    var t = {
        ctrl: false,
        alt: false,
        Q: false
    };
    return {
        init: function() {
            if ($jex.ie == 6) {
                return
            }
            this.createHtml();
            this.bindEvent()
        },
        createHtml: function() {
            var e = '<div id="logInfoWrapper" style="display: none;" class="m_log_info"><ul id="logInfoContent" class="log_content"></ul><span id="logClose" class="log_close">X</span></div>';
            document.body.appendChild(this.createDom(e))
        },
        createDom: function(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            return t.children[0]
        },
        bindEvent: function() {
            $jex.event.bind(document.body, "keydown", function(e) {
                if (e.keyCode === 17) {
                    t.ctrl = true
                }
                if (e.keyCode === 18) {
                    t.alt = true
                }
                if (e.keyCode === 81) {
                    t.Q = true
                }
                if (t.ctrl && t.alt && t.Q) {
                    var n = document.getElementById("logInfoWrapper");
                    n.style.display = n.style.display == "none" ? "block" : "none"
                }
            }
            );
            $jex.event.bind(document.body, "keyup", function(e) {
                if (e.keyCode === 17) {
                    t.ctrl = false
                }
                if (e.keyCode === 18) {
                    t.alt = false
                }
                if (e.keyCode === 81) {
                    t.Q = false
                }
            }
            );
            $jex.event.bind(document.getElementById("logClose"), "click", function(e) {
                var t = document.getElementById("logInfoWrapper");
                t.style.display = "none"
            }
            )
        },
        addLog: function(e, t) {
            if ($jex.ie == 6) {
                return
            }
            var n = "<li><b>" + e + ":</b>" + t + "</li>";
            var r = document.getElementById("logInfoContent");
            r.appendChild(this.createDom(n))
        }
    }
}
();
var isIE = navigator.appVersion.indexOf("MSIE") != -1 ? true : false;
var isWin = navigator.appVersion.toLowerCase().indexOf("win") != -1 ? true : false;
var isOpera = navigator.userAgent.indexOf("Opera") != -1 ? true : false;
if (typeof qunarflashver == "undefined") {
    var qunarflashver = "20090107"
}
var Trendflash = {
    _cache: {},
    _cacheLength: 0,
    _controls: null ,
    init: function(e) {
        var t = DomesticOnewaySearchService;
        var n = DomesticOnewayDataAnalyzer;
        this.args = e = {
            hasOneWay: n.lowestOneway() != null ,
            isValidQuery: t.isValidQuery(),
            isInter: false,
            dc: window.location.param().searchDepartureAirport,
            ac: window.location.param().searchArrivalAirport,
            title_id: "trendTitle",
            flash_id: "hdivTrendFlash",
            flash_panel: "dTrendflashPanel",
            MandatoryInsurance: {}
        };
        if (!e["hasOneWay"] || !e["isValidQuery"] || e["isInter"]) {
            var r = $jex.$(e["flash_panel"]);
            r && $jex.element.hide(r);
            return
        }
        var i = e["dc"];
        var s = e["ac"];
        $jex.$(e["title_id"]).innerHTML = [i, "-", s, "价格趋势"].join("");
        var o = AC_FL_RunContent("codebase", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0", "width", "730", "height", "240", "src", "main", "flashvars", "dn=45", "quality", "high", "pluginspage", "http://www.macromedia.com/go/getflashplayer", "align", "middle", "play", "true", "loop", "true", "scale", "showall", "wmode", "transparent", "devicefont", "false", "id", "main", "bgcolor", "#FFFFFF", "name", "main", "menu", "true", "allowFullScreen", "false", "allowScriptAccess", "sameDomain", "movie", "main", "salign", "");
        $jex.$(e["flash_id"]).innerHTML = o;
        setTimeout(function() {
            Trendflash.add(i, s, {
                displayDelBtn: false,
                isFirstLoad: true
            })
        }
        , 0);
        $jex.element.show($jex.$(e["flash_panel"]))
    },
    add: function(e, t, n) {
        var r = e + "-" + t;
        if ($jex.define(Trendflash._cache[r])) {
            return
        }
        if (Trendflash._cacheLength >= 4) {
            return
        }
        var i = "btnHd_" + r;
        var s = ["<li from='" + e + "' to='" + t + "' id=", i, " class=' ", n.classfix ? n.classfix : "", "'>", "<input id='chk_" + r + "' type='checkbox' checked /><label for='chk_" + r + "'>", e, "-", t, "</label>", typeof n.displayDelBtn == "undefined" || n.displayDelBtn != false ? "<span use='delete'>X</span>" : "", "</li>"].join("");
        $jex.$("hulTrend").innerHTML += s;
        Trendflash._cache[r] = {
            lineid: i
        };
        Trendflash._cacheLength += 1;
        if (!n.isFirstLoad) {
            window.addData = function() {
                return "http://ws.qunar.com/holidayService.jcp?lane=" + encodeURIComponent(e) + "-" + encodeURIComponent(t)
            }
            ;
            thisMovie("main").add()
        }
    }
};
window.Trendflash = Trendflash;
var dflightTool = new function() {
    this.initialize = function(e) {
        if (this.initialized)
            return;
        var t = DomesticOnewayDataAnalyzer;
        var n = window.location.param();
        this.args = e = $jex.merge({
            fromCity: n.searchDepartureAirport,
            toCity: n.searchArrivalAirport,
            startDate: n.searchDepartureTime,
            DATA_RECOMMEND_AIRLINE: "http://ws.qunar.com/recommendAirline.jcp"
        }, e || {});
        this.fromCity = e["fromCity"];
        this.toCity = e["toCity"];
        this.startDate = e["startDate"];
        this.DATA_RECOMMEND_AIRLINE = e["DATA_RECOMMEND_AIRLINE"];
        this.initialized = true
    }
    ;
    this.template_flighttool = function(context, __onerror) {
        if (context == null )
            context = {};
        if (context._MODIFIERS == null )
            context._MODIFIERS = {};
        if (context.defined == null )
            context.defined = function(e) {
                return context[e] != undefined
            }
            ;
        var resultArr = [];
        var resultOut = {
            write: function(e) {
                resultArr.push(e)
            }
        };
        try {
            (function(_OUT, _CONTEXT) {
                with (_CONTEXT) {
                    _OUT.write('    <div class="hd">相关航线</div>    ' + '<div class="ct">        ' + "<ul>");
                    var idx = 0;
                    _OUT.write(" ");
                    var __LIST__item = data;
                    if (__LIST__item != null ) {
                        var item_ct = 0;
                        for (var item_index in __LIST__item) {
                            item_ct++;
                            if (typeof __LIST__item[item_index] == "function") {
                                continue
                            }
                            var item = __LIST__item[item_index];
                            _OUT.write(" ");
                            if (idx < 5) {
                                _OUT.write('            <li><a href="');
                                _OUT.write(item.url);
                                _OUT.write('" hidefocus="on">');
                                _OUT.write(item.dt.substr(5));
                                _OUT.write("<br />                ");
                                _OUT.write(item.dc);
                                _OUT.write("-");
                                _OUT.write(item.ac);
                                _OUT.write("<br />                &yen;");
                                _OUT.write(item.pr);
                                _OUT.write(' <span class="ds">');
                                _OUT.write(PriceUtil.getDiscount(item.ds));
                                _OUT.write("</span></a></li>")
                            }
                            _OUT.write(" ");
                            var idx = idx + 1;
                            _OUT.write(" ")
                        }
                    }
                    _OUT.write("        </ul>    </div>")
                }
            }
            )(resultOut, context)
        } catch (e) {
            if (__onerror && typeof __onerror == "function") {
                __onerror(e, resultArr.join(""))
            }
            throw e
        }
        return resultArr.join("")
    }
    ;
    this.start = function(e) {
        this.initialize(e);
        var t = encodeURIComponent(this.fromCity);
        var n = encodeURIComponent(this.toCity);
        var r = this.startDate;
        var i = "from=" + t + "&to=" + n + "&start_date=" + r + "&version=" + Math.random();
        var s = new ScriptRequest({
            funcName: "dflightTool.update",
            callbackName: "callback"
        });
        s.send(this.DATA_RECOMMEND_AIRLINE + "?" + i)
    }
    ;
    this.makeurl = function(e) {
        var t = window.location.param();
        var n = "/twell/flight/Search.jsp?" + "fromCity=" + encodeURIComponent(e.dc) + "&toCity=" + encodeURIComponent(e.ac) + "&fromDate=" + e.dt + "&toDate=" + t.searchDepartureTime + "&searchType=OnewayFlight&from=near_airport";
        return this.addEx_track(n)
    }
    ;
    this.addEx_track = function(e) {
        var t = QLib && QLib.getEx_track && QLib.getEx_track();
        if (t) {
            e += "&" + t
        }
        return e
    }
    ;
    this.update = function(e) {
        var t = this;
        var n = {};
        if (e.records.length > 0) {
            $jex.array.each(e.records, function(e, r) {
                e.url = t.makeurl(e);
                n["" + r] = e
            }
            );
            $jex.$("dFlightPanel").innerHTML = this.template_flighttool({
                data: n
            });
            $jex.element.show($jex.$("dFlightPanel"))
        }
    }
}
;
window.dflightTool = dflightTool;
ConfigManager.setConfig(oneway_config);
ConfigManager.setConfig({
    "default": {
        acf: 0,
        fot: 0,
        safePrice: Number.MAX_VALUE,
        carrier: {
            full: "",
            key: "",
            zh: ""
        },
        plane: {
            full: "未知机型",
            key: "NULL",
            type: []
        },
        airport: {
            ab: "",
            code: "",
            full: ""
        },
        city: {
            codeList: "",
            en: "",
            zh: ""
        }
    },
    config: {
        timerange: {
            0: {
                zh: "上午 (06:00-11:59)",
                key: "上午",
                value: 0
            },
            1: {
                zh: "中午 (12:00-12:59)",
                key: "中午",
                value: 1
            },
            2: {
                zh: "下午 (13:00-17:59)",
                key: "下午",
                value: 2
            },
            3: {
                zh: "晚上 (18:00-05:59)",
                key: "晚上",
                value: 3
            }
        },
        services: {
            s1: "CATA认证",
            s2: "7×24服务",
            s3: "去哪儿帮您填",
            s4: "支付价出票",
            s5: "退改签保障",
            s6: "赠送保险",
            s7: "服务保障",
            s8: "免费邮寄",
            s9: "保障计划"
        },
        servicesDesc: {
            s1: "获得《中国民用航空运输销售代理业务资格认可证书》",
            s2: "提供7×24小时服务",
            s3: "支持使用在去哪儿网填写的乘机人信息",
            s4: "承诺按照支付价格出票",
            s5: "严格执行航空公司退改签规定",
            s6: "承诺购买机票赠送保险",
            s7: "服务保障",
            s8: "购买机票可免费邮寄行程单",
            s9: "全程预订保障，去哪儿都放心"
        }
    }
});
var flightResultController = function(e, t, n) {
    this.service = e;
    this.analyzer = t;
    this.param = n;
    this.initUI();
    this.bindUI();
    System.analyzer.triggerTrace = false
}
;
flightResultController.prototype.initUI = function() {
    function t() {
        System.service.genFilterTimeStamp();
        e.trackFilters(true);
        TsinghuaOneWayTracker.setTimerToSaveTrack()
    }
    var e = this;
    System.service.genTraceTimeStamp();
    this.willOpenFui;
    this.openingFui;
    this.fuzzyFlightUI = new FuzzyFlightUI({
        elemId: "js-fuzzyflight",
        on: {
            openAfterFuzzyWrapperList: function() {
                e.actionType = 3;
                e.openingFui && e.openingFui.toggleVendorPanel()
            },
            hideFuzzyWrapperList: function() {
                this.hideVendorPanel()
            },
            reFixFuzzyFlightShowOrHide: function() {
                var t = e.getCheckGrpArr(e.getBoxArr()).length || 0;
                var n = (e.analyzer.pageInfo() || {
                    pageIndex: 0
                }).pageIndex;
                if (!t && !n) {
                    $jex.event.trigger(this, "showFuzzyFlight")
                } else {
                    $jex.event.trigger(this, "hideFuzzyFlight")
                }
            },
            hideFuzzyFlight: function() {
                this.lock(1);
                this.hide()
            },
            showFuzzyFlight: function() {
                this.lock(0);
                this.show();
                this.hideVendorPanel()
            }
        }
    });
    this.resultList = new FlightListUI({
        elemId: "hdivResultPanel",
        on: {
            cabinChange: function(e) {
                this.isOnlySelBfCabinType(e)
            },
            oneItemclicked: function(t) {
                $jex.event.trigger(e.fuzzyFlightUI, "hideFuzzyWrapperList");
                e.bookBtnTracker.send(t)
            },
            willOpenFui: function(t) {
                e.willOpenFui = t
            },
            openingFui: function(t) {
                e.actionType = 3;
                e.openingFui = t
            }
        }
    });
    this.filterGroup = new DomesticOnewayFilterListUI({
        elemId: "hdivfilterPanel",
        filterConf: {
            "起飞机场": {
                type: 8
            },
            "降落机场": {
                type: 8
            },
            "起飞时间": {
                sort: {
                    "上午": 0,
                    "中午": 1,
                    "下午": 2,
                    "晚上": 3
                }
            },
            "机型": {
                sort: {
                    "大型机": 0,
                    "中型机": 1,
                    "小型机": 2,
                    "麦道系列": 3,
                    "其他机型": 4,
                    "未知机型": 5
                },
                type: 8
            },
            "舱位": {
                sort: {
                    "经济舱": 0,
                    "头等/商务舱": 1
                },
                type: 8
            }
        },
        on: {
            changeFilter: function(n, r, i, s, o, u) {
                $jex.event.trigger(e.fuzzyFlightUI, "reFixFuzzyFlightShowOrHide");
                SingletonUIManager.close("flight");
                e.changeCabinType.apply(e, arguments);
                e.analyzer.setFilter(n);
                t()
            },
            onUserActied: function() {
                e.actionType = 3
            },
            openMore: function() {
                e.trackFilters(true)
            }
        }
    });
    this.filterGroup.update();
    this.filterGroup.render();
    this.getCheckGrpArr = function(e) {
        var t = [];
        for (var n = 0; n < e.length; n++) {
            var r = [];
            for (var i = 0; i < e[n]._displayboxes.length; i++) {
                if (e[n]._displayboxes[i].checked()) {
                    r.push(e[n]._displayboxes[i].dataSource().name)
                }
            }
            if (r.length > 0) {
                t.push(r.join(","))
            }
        }
        return t
    }
    ;
    this.getBoxArr = function(e) {
        var t = [];
        $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(n, r) {
            var i = filterGroup.getFilterUI(n);
            if (i)
                t.push(i);
            e && e(i, r)
        }
        );
        return t
    }
    ;
    this.trackFilters = function(t) {
        var n = "";
        var r = [];
        var i = this.filterGroup;
        var s = this.getBoxArr(function(e, t) {
            r[t] = e ? 1 : 0
        }
        );
        var o = e.getCheckGrpArr(s);
        if (o.length > 0) {
            n = o.join("^")
        }
        if (e.service.curSort) {
            n += "^" + e.service.curSort
        }
        var u = "&psize=15";
        if (e.pagesizer.selectedItem && e.pagesizer.selectedItem != null ) {
            u = "&psize=" + e.pagesizer.selectedItem.value
        }
        u += "&ft=" + (!t ? System.service.traceTimeStamp : System.service.filterTimeStamp);
        u += "&isfilter=" + r.join("^");
        u += "&ismore=" + i.isMoreOpen;
        TsinghuaOneWayTracker.track("filter", encodeURIComponent(n), System.service.traceTimeStamp || "", System.analyzer.currentPageIndex() + 1, u)
    }
    ;
    this.pagesizer = pagesizer = new XSelect({
        elemId: "hdivPageSizer",
        initFire: false,
        values: [{
            value: 30,
            name: "30"
        }, {
            value: 60,
            name: "60"
        }],
        on: {
            changeValue: function(n) {
                e.analyzer.resetPageSize(n.value);
                $jex.event.trigger($jex.$("detailPage"), "fem_pageNum", "PageSize");
                t()
            }
        }
    });
    $jex.event.binding(this.service, "loadedFirstData", function() {
        pagesizer.update();
        pagesizer.render();
        $jex.element.show($jex.$("detailPage"));
        new FlightEventProxy("hdivResultPanel")
    }
    );
    $jex.event.binding(this.service, "TransferDataReady", function() {
        e.filterGroup.setTransformLoad(true)
    }
    );
    this.actionType = 1;
    this.pager = new OnewayPagerUI({
        elemId: "hdivPager",
        on: {
            changePage: function(n) {
                e.actionType = 3;
                e.analyzer.gotoPage(n);
                $jex.event.trigger(e.fuzzyFlightUI, "reFixFuzzyFlightShowOrHide");
                $jex.event.trigger($jex.$("detailPage"), "fem_pageNum", "JumpToPage");
                var r = $jex.offset($jex.$("resultAnchor"));
                if (!/msie 6/.test(window.navigator.userAgent.toLowerCase())) {
                    var i = 0, s = $jex.$("js_schwrap"), o;
                    if (window.getComputedStyle) {
                        o = window.getComputedStyle(s, null ).getPropertyValue("position")
                    } else if (s.currentStyle) {
                        o = s.currentStyle.position
                    }
                    if (o === "static") {
                        i = 10
                    }
                    if (!($jex.$("top_recommend_id") && $jex.$("top_recommend_id").childNodes.length)) {
                        window.scrollTo(r.left, r.top - 55 - i - 31)
                    } else {
                        window.scrollTo(r.left, $jex.offset($jex.$("top_recommend_id")).top + 10 - i - 31)
                    }
                } else {
                    window.scrollTo(r.left, r.top - 31)
                }
                t()
            }
        }
    });
    this.sort_time_handler = new SortHandler({
        elemId: "btnDepttimeOrderArror",
        sortKey: "deptTimeValue",
        on: {
            clickSort: function(n) {
                var r;
                if (n[0][1]) {
                    r = "d"
                } else {
                    r = "a"
                }
                e.service.curSort = "起降时间" + r;
                FlightListUISorter.userSorted(true);
                e.analyzer.sort(n);
                $jex.$("btnDepttimeOrderArror").title = n[0][1] ? "点击按时间从早到晚排序" : "点击按时间从晚到早排序";
                $jex.$("btnPriceOrderArror").title = "";
                $jex.$("btnPriceOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.event.trigger($jex.$("btnDepttimeOrderArror"), "fem_orderByTime");
                t()
            },
            onUserActied: function() {
                e.actionType = 3
            }
        }
    });
    this.sort_price_handler = new SortHandler({
        elemId: "btnPriceOrderArror",
        sortKey: "lowestPrice",
        on: {
            clickSort: function(n) {
                var r;
                if (n[0][1]) {
                    r = "d"
                } else {
                    r = "a"
                }
                e.service.curSort = "最低报价" + r;
                FlightListUISorter.userSorted(true);
                e.analyzer.sort(n);
                $jex.$("btnPriceOrderArror").title = n[0][1] ? "点击按价格从低到高排序" : "点击按价格从高到低排序";
                $jex.$("btnDepttimeOrderArror").title = "";
                $jex.$("btnDepttimeOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.event.trigger($jex.$("btnPriceOrderArror"), "fem_orderByPrice");
                t()
            },
            cabinChange: function(t) {
                $jex.$("btnPriceOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                $jex.$("btnDepttimeOrderArror").getElementsByTagName("i")[0].className = "i_arr_ud";
                FlightListUISorter.userSorted(true);
                this.setSortKey(t ? "bfLowestPrice" : "lowestPrice");
                var n = t ? [["bfLowestPrice", false]] : [["lowestPrice", false]];
                e.analyzer.sort(n)
            },
            onUserActied: function() {
                e.actionType = 3
            }
        }
    });
    this.statusbar = new OneWaySearchStatusbar({
        elemId: "progTip",
        service: e.service,
        analyzer: e.analyzer
    });
    this.statusbar.render();
    this.changeCabinType = function(e, t, n, r, i, s) {
        var o = this, u;
        if (e.isNull) {
            u = false
        } else if (e.name == "舱位") {
            if ((n || []).length == 1 && n[0] == "bf") {
                u = true
            } else {
                u = false
            }
        }
        if (u != null  && o.resultList.isOnlySelBfCabinType() != u) {
            $jex.event.trigger(o.resultList, "cabinChange", u);
            $jex.event.trigger(o.sort_price_handler, "cabinChange", u)
        }
    }
    ;
    this.bookBtnTracker = new BookBtnTracker(this);
    this.timeoutMemorier = function(e) {
        function l() {
            var e = {};
            $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(t, n) {
                var r = filterGroup.getFilterUI(t);
                e[nameHX[t]] = r ? r.getKey() || "" : -1
            }
            );
            var t = function() {
                var e = r.willOpenFui || r.openingFui;
                if (e) {
                    return {
                        code: e.dataSource().flightKeyCode(),
                        wType: e.dataSource().getWrapperListType("all")
                    }
                }
            }
            ();
            var n = {}
              , i = r.sort_price_handler
              , s = r.sort_time_handler;
            if (i || s) {
                $jex.array.each([i, s], function(e, t) {
                    var r = t == 0 ? "pr" : "dt";
                    var i = e && e.arrow.className;
                    if (i === "i_arr_ud") {
                        n[r] = 0
                    } else if (i === "i_arr_ud_up") {
                        n[r] = 1
                    } else if (i === "i_arr_ud_down") {
                        n[r] = 2
                    }
                }
                )
            }
            var o = r.analyzer.pageInfo();
            return {
                filter: e,
                openOrWillFui: t,
                sort: n,
                page: o
            }
        }
        function h(e) {
            (new Image).src = "http://log.flight.qunar.com/l.gif?s=flight&p=onewayList&r=pageRefresh&type=" + e
        }
        var t = window.StorageUtil
          , n = window.JSON
          , r = e;
        var i = "seleddOption";
        var s = [r.filterGroup]
          , o = r.resultList;
        filterGroup = r.filterGroup,
        nameHX = {
            "起飞时间": "dt",
            "机型": "pt",
            "航空公司": "hs",
            "起飞机场": "da",
            "降落机场": "aa",
            "舱位": "ca",
            "方式": "df"
        };
        var u, a = "", f = false;
        var c = {
            conditions: null ,
            init: function() {
                this.filterGroup = r.filterGroup;
                this.conditions = this.getRecordJson()
            },
            clean: function() {
                try {
                    t.remove(i)
                } catch (e) {}
            },
            record: function(e) {
                try {
                    t.add({
                        name: i,
                        value: n.stringify(e)
                    })
                } catch (r) {}
            },
            getRecordJson: function() {
                var e;
                try {
                    e = t.get(i)
                } catch (r) {
                    return ""
                }
                var s = e && n.parse(e);
                this.clean();
                return s
            },
            reSetByRecord: function() {
                function l() {
                    u && !f && function() {
                        f = true;
                        u.dataSource().setWrapperListType(o || "all");
                        u.register();
                        r.actionType = 2
                    }
                    ()
                }
                var e = this.conditions;
                if (!e || r.actionType == 3) {
                    return
                }
                var t = e.filter;
                if (r.actionType == 1 && t) {
                    $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(e, n) {
                        var i = filterGroup.getFilterUI(e);
                        if (!i) {
                            return
                        }
                        var s = t[nameHX[e]];
                        if ($jex.isArray(s) && s.length > 0) {
                            r.actionType = 2;
                            a = "filter";
                            f = false;
                            $jex.event.trigger(i, "reSelCheckBox", $jex.array.map(s, function(e) {
                                return i._checkboxes[e]
                            }
                            ))
                        }
                    }
                    )
                }
                var n = e.sort
                  , i = r.sort_time_handler
                  , s = r.sort_price_handler;
                if (n && a != "sort") {
                    $jex.foreach([n.pr, n.dt], function(e, t) {
                        if (!e) {
                            return
                        }
                        var n = t == 0 ? s : i;
                        if (e == 1) {
                            n.arrow.className = "i_arr_ud_up";
                            n.state(false)
                        } else {
                            n.arrow.className = "i_arr_ud_down";
                            n.state(true)
                        }
                        r.actionType = 2;
                        a = "sort";
                        $jex.event.trigger(n, "clickSort", [[n._setting.sortKey, n.state()]])
                    }
                    )
                }
                var o = (e.openOrWillFui || {}).wType;
                l();
                var c = e.page;
                if (c && !u && c.pageIndex && a != "page") {
                    if ((r.analyzer.pageInfo() || {}).pageCount > 1) {
                        r.actionType = 2;
                        a = "page";
                        r.analyzer.gotoPage(c.pageIndex);
                        l()
                    }
                }
            }
        };
        $jex.event.binding(r.service, "pageWillReload", function(e) {
            h(e);
            c.record(l())
        }
        );
        $jex.event.binding(c, "afterDataLoad", function() {
            this.reSetByRecord()
        }
        );
        $jex.event.binding(o, "fuiFinish", function(e) {
            openOrWillFui = (c.conditions || {}).openOrWillFui;
            if (e == null ) {
                u = null 
            } else if (openOrWillFui && e.dataSource().flightKeyCode() == openOrWillFui.code) {
                u = e
            }
        }
        );
        c.init();
        return c
    }
    (this)
}
;
flightResultController.prototype.bindUI = function() {
    var e = this;
    var t = this.filterGroup;
    var n = this.pager;
    var r = this.resultList;
    var i = this.fuzzyFlightUI;
    var s = this.timeoutMemorier;
    $jex.event.binding(e.analyzer, "updateFilter", function(e) {
        t.addFilter(e)
    }
    );
    $jex.event.binding(e.analyzer, "autoLoadData", function() {
        if (e.actionType != 3) {
            e.actionType = 1
        }
    }
    );
    $jex.event.binding(e.analyzer, "fuzzyFlightDataComplete", function() {
        $jex.console.start("dataComplete:显示模糊航班");
        i.loadData(e.analyzer.fuzzyFlight(), e.analyzer);
        $jex.console.end("dataComplete:显示模糊航班")
    }
    );
    $jex.event.binding(e.analyzer, "dataComplete", function() {
        setTimeout(function() {
            $jex.console.start("dataComplete:更新过滤项");
            t.refresh();
            $jex.console.end("dataComplete:更新过滤项")
        }
        , 0);
        $jex.console.start("dataComplete:显示列表");
        r.loadData(e.analyzer.resultData(), e.analyzer);
        $jex.console.end("dataComplete:显示列表");
        setTimeout(function() {
            $jex.console.start("dataComplete:更新页码");
            n.update(e.analyzer.pageInfo());
            $jex.console.end("dataComplete:更新页码")
        }
        , 0);
        setTimeout(function() {
            $jex.console.start("dataComplete:更新上次选择");
            if (!e.endMemorier) {
                $jex.event.trigger(s, "afterDataLoad");
                e.service.searchEnd() && (e.endMemorier = true)
            }
            $jex.console.end("dataComplete:更新上次选择")
        }
        , 0)
    }
    );
    var o, u;
    var a;
    TsinghuaOneWayTracker.setTimerToSaveTrack = function() {
        clearTimeout(a);
        a = setTimeout(function() {
            if (o) {
                System.service.genTraceTimeStamp();
                System.analyzer.triggerTrace = true;
                TsinghuaOneWayTracker.trackOnRefreshed(o);
                e.trackFilters();
                TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
                System.analyzer.triggerTrace = false
            }
        }
        , 3e3)
    }
    ;
    TsinghuaOneWayTracker.clearTimerToSaveTrack = function() {
        clearTimeout(a)
    }
    ;
    TsinghuaOneWayTracker.traceFlightList = function() {
        if (System.analyzer.triggerTrace && o) {
            TsinghuaOneWayTracker.clearTimerToSaveTrack();
            e.trackFilters();
            TsinghuaOneWayTracker.track("query", encodeURIComponent(location.search), System.service.traceTimeStamp);
            TsinghuaOneWayTracker.trackOnRefreshed(o);
            System.analyzer.triggerTrace = false
        }
    }
    ;
    $jex.event.binding(r, "refreshed", function(e) {
        if (!u) {
            System.service.genFilterTimeStamp();
            TsinghuaOneWayTracker.setTimerToSaveTrack();
            u = true
        }
        TsinghuaOneWayTracker.traceFlightList();
        o = e
    }
    )
}
;
$jex.extendClass(SortHandler, XControl);
SortHandler.prototype._init = function() {
    var e = this;
    var t = $jex.$(this._setting.elemId);
    var n = t.getElementsByTagName("i")[0];
    e.arrow = n;
    $jex.event.binding(t, "click", function(t) {
        $jex.stopEvent(t);
        if (e.state()) {
            n.className = "i_arr_ud_up";
            e.state(false)
        } else {
            n.className = "i_arr_ud_down";
            e.state(true)
        }
        $jex.event.trigger(e, "onUserActied");
        $jex.event.trigger(e, "clickSort", [[e._setting.sortKey, e.state()]])
    }
    )
}
;
SortHandler.prototype.setSortKey = function(e) {
    this._setting.sortKey = e
}
;
BookBtnTracker.prototype.init = function(e) {
    this.condition = {
        dc: e.param.fromCode,
        ac: e.param.toCode,
        dd: e.param.searchDepartureTime
    }
}
;
BookBtnTracker.prototype.fixParam = function(e) {
    var t = arguments.length;
    this._param = $jex.merge(this._param, e)
}
;
BookBtnTracker.prototype.send = function(e) {
    var t = this
      , e = e;
    var n = {}
      , r = this.filterGroup
      , i = {
        "起飞时间": "dt",
        "机型": "pt",
        "航空公司": "hs",
        "起飞机场": "da",
        "降落机场": "aa",
        "舱位": "ca",
        "方式": "df"
    };
    $jex.foreach(["起飞时间", "机型", "航空公司", "起飞机场", "降落机场", "舱位", "方式"], function(e, t) {
        var s = r.getFilterUI(e);
        n[i[e]] = s ? (s.getValue() || "").join("|") : -1
    }
    );
    var s = {}
      , o = t.sort_price_handler
      , u = t.sort_time_handler;
    if (o || u) {
        $jex.array.each([o, u], function(e, t) {
            var n = t == 0 ? "pr" : "dt";
            var r = e && e.arrow.className;
            if (r === "i_arr_ud") {
                s[n] = 0
            } else if (r === "i_arr_ud_up") {
                s[n] = 1
            } else if (r === "i_arr_ud_down") {
                s[n] = 2
            }
        }
        )
    }
    var a = t.analyzer.pageInfo();
    var f = t.resultList;
    var l = f.currentDataMap;
    var c = f.isOnlySelBfCabinType();
    var h = $jex.array.map(l, function(e, t) {
        var n;
        if (e.type == "transfer") {
            n = [e.firstTrip(), e.secondTrip()]
        } else {
            n = [e]
        }
        return $jex.merge({
            no: t,
            pr: c ? e.bfLowestPrice() || "" : e.lowestPrice() || "",
            dc: c ? "" : PriceUtil.getTransferDiscount(e.lowestDiscount()),
            tag: (e.showTag || []).join("|"),
            key: e.flightKeyCode(),
            trip: $jex.array.map(n, function(e) {
                var t = e.flightInfo()
                  , n = e.plane()
                  , r = e.extInfo() || {};
                return {
                    ptf: n.full,
                    pt: t.pt,
                    ca: t.ca,
                    co: t.co,
                    da: t.da,
                    aa: t.aa,
                    dd: t.dd,
                    dt: t.dt,
                    at: t.at,
                    ra: e.onTimeRate(),
                    ad: e.delayTime(),
                    sa: e.stopover() ? e.spAirPort() : "",
                    st: e.stopover(),
                    cs: r.cs || ""
                }
            }
            )
        })
    }
    );
    a.pageSize = h.length || 0;
    var p = {
        condition: t.condition,
        filter: n,
        page: a,
        sort: s,
        pageData: h,
        choose: e.dataSource().flightKeyCode(),
        t: (new Date).getTime()
    };
    //gino
    $jex.ajax("/s/rms/data/pickflight.php", p, function() {}
    , {
        onerror: t._onerror,
        method: "POST"
    })
}
;
BookBtnTracker.prototype._onerror = function() {
    $jex.event.trigger(self, "onerror", arguments)
}
;
(function() {
    function h() {
        if (c === 1) {
            l.send()
        }
        c++
    }
    function m() {
        $jex.event.binding(i, "expireQuery", function() {
            var e = window.location.research(null , null , $jex.date.add(SERVER_TIME, 1, true), $jex.date.add(SERVER_TIME, 3, true));
            top.location.href = e;
            return
        }
        );
        $jex.event.binding(i, "validateComplete", function(e) {
            setTimeout(function() {
                if (i.isValidQuery()) {
                    v(e)
                }
            }
            , 0)
        }
        );
        $jex.event.binding(i, "invalidQuery", function() {
            TraceAnalyzer.all.invalidErr()
        }
        );
        $jex.event.binding(i, "noTransferData", function() {
            TraceAnalyzer.all.noTransErr()
        }
        );
        $jex.event.binding(i, "sameCity", function() {
            u.show("sameCity");
            TraceAnalyzer.all.sameCityErr()
        }
        );
        $jex.event.binding(s, "noResultEnd", function() {
            u.show("noResult");
            TraceAnalyzer.all.noResultErr().tsingReport()
        }
        );
        $jex.event.binding(i, "loadedFirstData", function() {
            d()
        }
        );
        $jex.event.binding(i, "noOnewayData", function() {
            d();
            TraceAnalyzer.all.noOnewayErr()
        }
        );
        $jex.event.binding(i, "searchEnd", function() {
            d();
            if (TraceAnalyzer && TraceAnalyzer.open) {
                TraceAnalyzer.open.sendTsingOpenInfo()
            }
        }
        )
    }
    window.GSERVER_TIME = null ;
    $jex.console.error("加载与处理js耗时:", new Date - CLIENT_TIME);
    $jex.console.start("begin init....");
    document.domain = "10.211.55.5"; //gino "qunar.com";
    if ($jex.$("js-iframe_ajax")) {
        $jex.$("js-iframe_ajax").innerHTML = '<iframe id="ifmPost" name="ifmPost" src="about:blank" frameborder="0" scrolling="no" width="0" height="0" style="display:none;"></iframe>' + '<iframe id="ifmTrackLog" name="ifmTrackLog" src="about:blank" frameborder="0" scrolling="no" width="0" height="0" style="display:none;"></iframe>' + '<iframe id="ifrmHistory" style="width:1px;height:1px;visibility:hidden;position:absolute"></iframe>'
    }
    var e = $jex.parseQueryParam();
    HoldLastShowFlight.init(e);
    e.searchArrivalTime = e.searchArrivalTime || e.arrivalTime;
    try {
        var t = new Date(e.searchArrivalTime.replace(/-/g, "/"))
    } catch (n) {
        e.searchArrivalTime = e.searchDepartureTime
    }
    $jex.foreach(e, function(e, t, n) {
        $jex.console.trace("[PARAM]", n, ":", e)
    }
    );
    $jex.console.trace("[CLIENT]", window.navigator.userAgent.toString());
    window.location.param = function() {
        return e
    }
    ;
    window.location.research = function(t, n, r, i, s) {
        var o = $jex.merge(e, {
            searchDepartureAirport: t || e.searchDepartureAirport,
            searchArrivalAirport: n || e.searchArrivalAirport,
            searchDepartureTime: r || e.searchDepartureTime,
            searchArrivalTime: i || e.searchArrivalTime,
            from: s || e.from
        });
        var u = window.location.href.split("?")[0];
        u += "?" + $jex.toQueryString(o);
        return u
    }
    ;
    if (e.loadDynamicCss) {
        var r = document.getElementsByTagName("head").item[0];
        css = document.createElement("link");
        css.href = "styles/" + e.loadDynamicCss + ".css";
        css.rel = "stylesheet";
        css.type = "text/css";
        r.appendChild(css)
    }
    window.System = {
        service: DomesticOnewaySearchService,
        analyzer: DomesticOnewayDataAnalyzer,
        param: e
    };
    var i = DomesticOnewaySearchService;
    var s = DomesticOnewayDataAnalyzer;
    s.setSearchService(i);
    i.setAnalyzer(s);
    window.SS = i;
    var o = new flightResultController(i,s,e);
    var u = new FlashAdUI({
        elemId: "hdivResultPanel"
    });
    var a;
    var f = function() {
        if (!window["SearchBoxCreate"]) {
            setTimeout(f, 10);
            return
        }
        a = SearchBoxCreate(e);
        searchTrack.init("DMT", a)
    }
    ;
    var l = new CACTI_monitoring({
        url: "http://bmrg.qunar.com/f",
        pageId: "DomesticOnewayList",
        timerList: ["t_done", "t_firstData"]
    });
    var c = 0;
    $jex.event.bind(window, "load", function() {
        h()
    }
    );
    var p = false;
    var d = function() {
        if (p)
            return;
        l.end("t_firstData");
        h();
        $jex.console.start("第一屏数据耗时");
        setTimeout(function() {
            function t() {
                setTimeout(function() {
                    SpringHotRoundtrip.updateSevenDayToday()
                }
                , 0)
            }
            $jex.console.start("第一屏,七日低价 ");
            SpringHotRoundtrip.initialize({
                dc: e.searchDepartureAirport,
                ac: e.searchArrivalAirport,
                searchDate: $jex.date.parse(e.searchDepartureTime),
                config: oneway_config.SpringHotConfig,
                isInter: false
            });
            SpringHotRoundtrip.load();
            $jex.event.binding(s, "dataComplete", function() {
                t()
            }
            );
            $jex.event.binding(PAGE_EVENT, "lowPriceChange", function() {
                t()
            }
            );
            $jex.console.end("第一屏,七日低价 ");
            setTimeout(function() {
                $jex.console.start("第一屏,侧边推荐酒店 ");
                recommendedHotels.query(encodeURIComponent(e.searchArrivalAirport), e.searchDepartureTime, "HotelRecommended", "oneway-list", 0);
                $jex.console.end("第一屏,侧边推荐酒店")
            }
            , 0);
            $jex.console.start("第一屏,加载临近航班");
            NearLineRec.load(e);
            $jex.console.end("第一屏，加载临近航班");
            $jex.console.start("第一屏,加载广告 ");
            var n = i.longwell();
            AD_Manage.qde_query = function(t) {
                var r = ["&to=", n.arrivalAirport.en, "&from=", n.departureAirport.en, "&cnkey=", encodeURIComponent(n.departureAirport.zh), "&s=", encodeURIComponent(e.searchDepartureAirport), "&s1=", encodeURIComponent(e.searchArrivalAirport), "&fromDate=", e.searchDepartureTime, "&st=oneway", "&pt=dmst"].join("");
                t(r)
            }
            ;
            $OTALOGIC.init(e.searchDepartureAirport, e.searchArrivalAirport, e.searchDepartureTime);
            $OTALOGIC.load_top("ifrmVendorBanner");
            $OTALOGIC.load_right();
            AD_Manage.load();
            $jex.console.end("第一屏,加载广告 ");
            LazyScrollShow.start();
            $jex.console.end("第一屏数据耗时")
        }
        , 0);
        p = true
    }
    ;
    var v = function(t) {
        if (typeof QunarHistory == "undefined" || !QunarHistory || !QunarHistory.SFlight) {
            setTimeout(function() {
                v(t)
            }
            , 500);
            return
        }
        var n = t;
        var r = encodeURIComponent(n.dept.input);
        var i = encodeURIComponent(n.dept.country);
        var s = encodeURIComponent(n.arri.input);
        var o = encodeURIComponent(n.arri.country);
        var u = new Date(e.searchDepartureTime.replace(/-/g, "/"));
        var a = e.fromCode
          , f = e.toCode;
        r = a ? r + "(" + a + ")" : r;
        s = f ? s + "(" + f + ")" : s;
        var l = new QunarHistory.SFlight(r,s,(new Date).getTime());
        l.addDate(u);
        l.addCountry(i + "-" + o);
        QunarHistory.service.addNode(l)
    }
    ;
    window.$OTA = new OTABlade(new OTAInfoExtractor({
        extract: function(e) {
            var t = this;
            $jex.foreach(e.priceInfo, function(n, r, i) {
                var s = new OTAOnewayFlight(i);
                s.flightInfo(e.flightInfo[i]);
                s.priceInfo(e.priceInfo[i]);
                t.flightType = s.type();
                t.add(s)
            }
            )
        }
    }));
    $OTA.group.options({
        type: "ow",
        currentDate: window.SERVER_TIME || new Date,
        fromCity: e.searchDepartureAirport,
        toCity: e.searchArrivalAirport,
        fromDate: new Date(e.searchDepartureTime.replace(/-/g, "/"))
        //fromDate: new Date(e.searchDepartureTime)
    });
    $jex.event.binding(i, "loadedLongwell", function(e) {
        $OTA.group.options({
            queryID: e.queryID
        })
    }
    );
    $jex.event.binding(i, "loadedOnewayData", function(e) {
        $OTA.extract(e)
    }
    );
    TraceAnalyzer.all = TraceAnalyzer.create().queryInfo({
        da: e.searchDepartureAirport,
        aa: e.searchArrivalAirport,
        inter: 0,
        dd: e.searchDepartureTime,
        now: $jex.date.format(SERVER_TIME),
        ip: CLIENT_IP,
        act: "noresult"
    });
    HotSale.init();
    m();
    BookingPriceCheck.init();
    LOG_SPIDER.init();
    l.start("t_firstData");
    i.search(e);
    $jex.jsonp("http://flight.qunar.com/twelli/flight/localDate.jsp", {
        depCity: e.searchDepartureAirport
    }, function(t) {
        if (window.QNR) {
            window.QNR.isLocal = t.isLocal
        } else {
            window.QNR = {};
            window.QNR.isLocal = t.isLocal
        }
        var n = t.localDate.replace(/-/g, "/");
        GSERVER_TIME = new Date(n);
        if (t.isLocal) {
            window.QNR[e.searchDepartureAirport] = GSERVER_TIME
        } else {
            GSERVER_TIME = new Date(SERVER_TIME.getFullYear(),SERVER_TIME.getMonth(),SERVER_TIME.getDate())
        }
    }
    , {
        timeout: {
            time: 200,
            func: function() {
                if (window.QNR.isLocal === undefined) {
                    GSERVER_TIME = new Date(SERVER_TIME.getFullYear(),SERVER_TIME.getMonth(),SERVER_TIME.getDate())
                }
            }
        }
    });
    setTimeout(function() {
        f()
    }
    , 20);
    $jex.console.end("初始化所耗时")
}
)();
FEMonitor.fn = FEMonitor.prototype;
FEMonitor.fn._init = function(e) {
    this.lastSendTime = 0;
    this.logurl = e.logurl;
    this.module = e.module;
    this.interval = e.interval;
    this.ua = this._getBrowser()
}
;
FEMonitor.fn.addMonitor = function(e, t, n, r) {
    if (!e || !t) {
        return
    }
    var i = this
      , s = function(e) {
        i._sendLog(n || e, r, e)
    }
    ;
    $jex.event.bind(e, t, s)
}
;
FEMonitor.fn._sendLog = function(e, t, n) {
    if (typeof e !== "string")
        return;
    var r = 0;
    if (n && typeof n == "number") {
        r = n
    }
    var i = this.module + "_" + e
      , s = (new Date).getTime()
      , o = {
        id: i,
        n: 1,
        type: 1,
        s: r,
        t: s,
        token: this._calcToken(i, s)
    }
      , u = this.ua;
    if (t) {
        o.id += "_" + u.browser;
        o.v = u.version
    }
    (new Image).src = this.logurl + "?" + this._obj2str(o)
}
;
FEMonitor.fn._obj2str = function(e, t) {
    if (!e) {
        return ""
    }
    var n, r = [];
    for (n in e) {
        if (e.hasOwnProperty(n)) {
            r.push(n + "=" + encodeURIComponent(e[n]))
        }
    }
    return r.join(t || "&")
}
;
FEMonitor.fn._canSendLog = function() {
    return this.interval === 0 ? true : (new Date).getTime() - this.lastSendTime > this.interval * 1e3
}
;
FEMonitor.fn._cacheLog = function(e) {
    this._logs = this._logs || {};
    if (typeof this._logs[e] === "number") {
        this._logs[e]++
    } else {
        this._logs[e] = 0
    }
}
;
FEMonitor.fn._sendCache = function() {}
;
FEMonitor.fn._calcToken = function(e, t) {
    return ""
}
;
FEMonitor.fn._getBrowser = function() {
    var e = {};
    var t = navigator.userAgent.toLowerCase();
    var n;
    (n = t.match(/rv:([\d.]+)\) like gecko/)) ? e.browser = "IE11" : (n = t.match(/msie ([\d.]+)/)) ? e.browser = "IE" : (n = t.match(/firefox\/([\d.]+)/)) ? e.browser = "Firefox" : (n = t.match(/chrome\/([\d.]+)/)) ? e.browser = "Chrome" : (n = t.match(/opera.([\d.]+)/)) ? e.browser = "Opera" : (n = t.match(/version\/([\d.]+).*safari/)) ? e.browser = "Safari" : e.browser = "OtherBrowser";
    e.version = n[1];
    if (e.browser == "IE") {
        var r = parseInt(e.version);
        e.browser = r <= 7 ? "IE6/7" : r == 8 ? "IE8" : "IE9/10"
    }
    return e
}
;
var fem = new FEMonitor({
    module: "F_LP_FL_OW"
});
var __$__ = $jex.$
  , listPanel = __$__("hdivResultPanel");
fem.addMonitor(listPanel, "fem_flightListShow", "ShowList");
fem.addMonitor(__$__("btnDepttimeOrderArror"), "fem_orderByTime", "OrderByTime");
fem.addMonitor(__$__("btnPriceOrderArror"), "fem_orderByPrice", "OrderByPrice");
fem.addMonitor(listPanel, "fem_openWrapperList", "OpenWrapperList");
fem.addMonitor(listPanel, "fem_closeWrapperList", "CloseWrapperList");
fem.addMonitor(listPanel, "fem_showTGQ", "ShowTGQ");
fem.addMonitor(listPanel, "fem_booking", "Booking");
var detailPage = __$__("detailPage");
fem.addMonitor(detailPage, "fem_pageNum");
(function() {
    var e = window.SERVER_TIME;
    var t = new Date(e.getTime() + 1e3 * 60 * 60 * 24 * 362);
    var n = "http://flight.qunar.com/twell/flight/Search.jsp?";
    window["searchCaution"] = function() {
        function c(e) {
            var t = "";
            for (var r in e) {
                t += "&" + r + "=" + e[r]
            }
            return n + t
        }
        function d(e) {
            var t = {
                fromCity: e.fromCity,
                toCity: e.toCity,
                fromDate: e.fd
            };
            if (e.searchType === "roundtrip") {
                t.toDate = e.td
            }
            if (e.searchType === "lowestprice") {
                t.drange = e.drange
            }
            t.from = h[e.type + "_" + e.searchType];
            t.searchType = p[e.searchType];
            return t
        }
        function v(e) {
            try {
                (new Image).src = "/s/site/track.htm?action=" + e + "&t=" + Math.random()
            } catch (t) {}
        }
        var e = $jex.lightbox, r, i = {};
        var s = function(e) {
            var t = e || {};
            var n = "";
            if (e.round) {
                n = '<p>去程：&nbsp;<span class="fb">' + e.departureDate + "</span></p>";
                n = n + '<p>回程：&nbsp;<span class="fb">' + e.arrivalDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
            } else {
                n = '<p>去程：&nbsp;<span class="fb">' + e.departureDate + "</span>&nbsp;&nbsp;马上为您显示搜索结果。</p>"
            }
            return n
        }
        ;
        var o = function(e) {
            var t = '<div class="p_lyr_ct" style="width:522px;">' + '<div class="lyr_in"> <a id="search-caution-close" class="btn_close" href="javascript:;"></a>' + '<div class="lyr_ct" style="width: 450px;">' + '<div class="b_alt_day">' + '<div class="p1">目前<span class="fb">' + e.fromCity + '</span>到<span class="fb">' + e.toCity + "</span>机票最远支持搜索以下日期的航班：</div>" + '<div class="p2">' + s(e) + "</div>" + '<div class="p_btn">' + '<a href="' + e.href + '" class="btn_sure_bl" id="search-caution-ok"><span>确&nbsp;定</span></a>' + "</div>" + "</div>" + '<div class="b_alt_dode clearfix">' + '<a href="http://app.qunar.com/" target="_blank">' + '<p class="m_code_img"><img src="http://simg1.qunarzz.com/site/images/flight/home/img_qnkhd.png"></p>' + '<p class="m_code_rt">' + '<span class="h1">为您提供更多航班搜索，<br>我们一直在努力！</span>' + '<span class="h3">扫描或点击下载去哪儿旅行客户端</span>' + "</p>" + "</a>" + "</div>" + "</div>" + "</div>" + "</div>";
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
            $jex.event.bind($jex.$("search-caution-close"), "click", a);
            $jex.event.bind($jex.$("search-caution-ok"), "click", u)
        }
        ;
        var l = function(e, t) {
            return Math.min(e, t)
        }
        ;
        var h = {
            "国内_oneway": "fi_dom_search",
            "国内_roundtrip": "fi_ont_search",
            "国际_oneway": "fi_int_search",
            "国际_roundtrip": "fi_ont_search",
            "特价_lowestprice": "tejia_fi"
        };
        var p = {
            oneway: "OnewayFlight",
            roundtrip: "RoundTripFlight",
            lowestprice: "DealsFlight"
        };
        i.check = function(e) {
            this.data = {};
            this.data.fromCity = e.fromCity;
            this.data.toCity = e.toCity;
            var n = false;
            var r = $jex.date.parse(e.fd);
            var i = $jex.date.parse(e.td);
            if ("oneway" === e.searchType) {
                if (r > t) {
                    n = true;
                    this.data.type = e.type;
                    this.data.round = false;
                    this.data.departureDate = $jex.date.format(t);
                    var s = d(e);
                    s.fromDate = this.data.departureDate;
                    this.data.href = c(s)
                }
            } else if ("roundtrip" === e.searchType) {
                if (r > t || i > t) {
                    n = true;
                    this.data.type = e.type;
                    this.data.round = true;
                    this.data.departureDate = $jex.date.format(new Date(l(r, t)));
                    this.data.arrivalDate = $jex.date.format(new Date(l(i, t)));
                    var s = d(e);
                    s.fromDate = this.data.departureDate;
                    s.toDate = this.data.arrivalDate;
                    this.data.href = c(s)
                }
            } else if ("lowestprice" === e.searchType) {
                if (r > t) {
                    n = true;
                    this.data.type = e.type;
                    this.data.round = false;
                    this.data.departureDate = $jex.date.format(t);
                    this.data.drange = e.drange,
                    this.data.search = e.search;
                    var s = d(e);
                    s.fromDate = this.data.departureDate;
                    this.data.href = c(s)
                }
            }
            return n
        }
        ;
        i.show = function() {
            var t = o(this.data);
            e.show(t);
            r = e.content;
            f();
            var n = ["FL", "EQR"].join("|");
            v(n)
        }
        ;
        return i
    }
    ()
}
)()

