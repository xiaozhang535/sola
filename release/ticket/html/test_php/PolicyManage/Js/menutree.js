function MenuTree() { }
MenuTree.prototype = {
    _VersionInfo: "Version:1.2;作者: 任维",
    AjaxUrl: "", //请求的服务器路径及参数
    Object: null, //显示文本的控件
    OnChange: null, //是否有触发改变事件
    TheJSON: null, //指定数据源
    IsLastClick: false, //是否只有最后一级才能点击
    SetXY: function () {//定位浮动层位置
        var obj = arguments[0];
        var level = arguments[1];
        var LapLayer = $("#" + this.Name + level);

        var offset = obj.offset();
        var top = offset.top;
        var left = offset.left;
        var parw = obj[0].offsetWidth;
        var parh = obj[0].offsetHeight;
        var thew = LapLayer[0].offsetWidth;
        var theh = LapLayer[0].offsetHeight;
        var docW = document.documentElement.scrollWidth;

        if (obj == this.Object) {
            LapLayer.css({ "left": left + "px", "top": (top + parh + 1) + "px" });
        }
        else {
            if (left + parw + thew > docW) {
                LapLayer.css("left", (left - thew + 3) + "px");
            }
            else {
                LapLayer.css("left", (left + parw) + "px");
            }

            var lt = top + LapLayer.height();
            var dt = $(window).height() + $(document.body).scrollTop();
            if (lt > dt) {
                LapLayer.css("top", (top - (lt - dt) - 6) + "px");
            }
            else {
                LapLayer.css("top", (top - 6) + "px");
            }
        }

        var ulct = LapLayer.find('ul');
        LapLayer.css("max-width", "150px");
        ulct.css("max-height", "390px");
        ulct.css("overflowY", "auto");
    },

    Close: function () {//关闭浮动层
        if (this.Object.attr("sel") == "0") {
            $("div.menutree").hide();
            this.Object.attr("sel", "0");
        }
    },

    SelectItem: function () {//选择一个城市
        var d = arguments[0];
        this.Object.val(d.text());
        this.Object.attr("val", d.attr("val"));
        this.Object.attr("sel", "0");
        if (this.OnChange != null) {
            $(this.OnChange);
        }
        this.Close();
        this.Object.focus();
    },

    CreateDiv: function () {//创建浮动层
        var level = 0; //需要显示的层等级
        var index = ""; //每个元素的掩码
        var objOver = arguments[0];
        if (objOver != this.Object) {
            index = objOver.attr("id").replace("li_", "");
            level = index.length / 2;
        }

        var nameid = this.Name;
        $("div.menutree").each(function () {
            if (parseInt($(this).attr("id").replace(nameid, "")) - level > 0) {
                $(this).hide();
            }
        });

        var LapList = this.GetArray(index, this.TheJSON);
        var divName = nameid + level;
        var divLap = $("#" + divName);
        if (divLap.length == 0) {
            var fd = document.createElement("DIV");
            fd.id = divName;
            fd.className = "menutree";
            fd.innerHTML = "<ul></ul>";
            $(document.body).append(fd);
            divLap = $("#" + divName);
            divLap.hide();
        }

        if (LapList.length == 0) {
            divLap.hide();
            return;
        }

        var htm = [];
        for (var i = 0; i < LapList.length; i++) {
            var jsItem = LapList[i];
            var inx = index + ((i < 10) ? ("0" + i) : i.toString());
            var right = (jsItem.son.length == 0 ? "" : "class='nx'");
            htm.push("<li id='li_" + inx + "' val=\"" + jsItem.value + "\" " + right + ">" + jsItem.text + "</li>");
        }

        var ulList = divLap.find("ul");
        ulList.html(htm.join(''));
        var objP = this;
        ulList.children().each(function () {
            $(this).hover(
                function () {
                    $(this).addClass("ov");
                    objP.CreateDiv($(this));
                },
                function () {
                    $(this).removeClass("ov");
                }
            );
            if (objP.IsLastClick) {
                if (!$(this).hasClass("nx")) {
                    $(this).click(function () {
                        objP.SelectItem($(this));
                    });
                }
            }
            else {
                $(this).click(function () {
                    objP.SelectItem($(this));
                });
            }
        })

        var objTxt = this.Object;
        divLap.hover(
            function () {
                objTxt.attr("sel", "1");
            },
            function () {
                objTxt.attr("sel", "0");
            }
        );

        divLap.show();
        this.SetXY(objOver, level);
    },

    GetArray: function () {
        var index = arguments[0];
        var array = arguments[1];
        if (index == "") {
            return array;
        }
        else {
            var inx = parseInt(index.substr(0, 2));
            index = index.substr(2);
            array = this.GetArray(index, array[inx].son);
        }
        return array;
    },

    ShowMenu: function () {
        var the = this.Object;
        var inx = 0;
        $("input.treelist").each(function (i, ele) {
            if ($(ele) == the) {
                inx = i;
            }
        });
        this.Name = "div" + inx + "Lap"; //随机生成名字
        //此处是JSON的打包格式
        //        [
        //            { "text": "测试数据", "value": "100000", "son":
        //                [
        //                    { "text": "测试一", "value": "100001", "son":
        //                        [
        //                            { "text": "测试一一", "value": "100001", "son":
        //                                []
        //                            }
        //                        ]
        //                    },
        //                    { "text": "测试二", "value": "100001", "son":
        //                        [
        //                            { "text": "测试二二", "value": "100001", "son":
        //                                []
        //                            }
        //                        ]
        //                    }
        //                ]
        //            },
        //            { "text": "测试数据二", "value": "110000", "son":
        //                []
        //            }
        //        ];
        var objP = this;
        the.attr("sel", "0");
        the.blur(function () {
            objP.Close();
        });

        if (this.TheJSON == null) {
            $.getJSON(this.AjaxUrl + "&callback=?", function (data) {
                objP.TheJSON = data;
                objP.CreateDiv(the);
            });
        }
        else {
            this.CreateDiv(the);
        }
    }
}
 