﻿var jsonAreas = [{ text: "中国大陆", value: "010101", son: [{ text: "东北", value: "01010101", son: [{ text: "黑(黑龙江)", value: "0101010101", son: [] }, { text: "吉(吉林)", value: "0101010102", son: [] }, { text: "辽(辽宁)", value: "0101010103", son: []}] }, { text: "华北", value: "01010102", son: [{ text: "京(北京)", value: "0101010201", son: [] }, { text: "津(天津)", value: "0101010202", son: [] }, { text: "冀(河北)", value: "0101010203", son: [] }, { text: "蒙(内蒙古)", value: "0101010204", son: [] }, { text: "晋(山西)", value: "0101010205", son: [] }, { text: "鲁(山东)", value: "0101010206", son: []}] }, { text: "华东", value: "01010103", son: [{ text: "沪(上海)", value: "0101010301", son: [] }, { text: "苏(江苏)", value: "0101010302", son: [] }, { text: "浙(浙江)", value: "0101010303", son: [] }, { text: "皖(安徽)", value: "0101010304", son: []}] }, { text: "华南", value: "01010104", son: [{ text: "粤(广东)", value: "0101010401", son: [] }, { text: "桂(广西)", value: "0101010402", son: [] }, { text: "琼(海南)", value: "0101010403", son: [] }, { text: "闽(福建)", value: "0101010404", son: []}] }, { text: "西北", value: "01010105", son: [{ text: "陕(陕西)", value: "0101010501", son: [] }, { text: "甘(甘肃)", value: "0101010502", son: [] }, { text: "宁(宁夏)", value: "0101010503", son: [] }, { text: "青(青海)", value: "0101010504", son: [] }, { text: "新(新疆)", value: "0101010505", son: []}] }, { text: "华中", value: "01010106", son: [{ text: "鄂(湖北)", value: "0101010601", son: [] }, { text: "湘(湖南)", value: "0101010602", son: [] }, { text: "赣(江西)", value: "0101010603", son: [] }, { text: "豫(河南)", value: "0101010604", son: []}] }, { text: "西南", value: "01010107", son: [{ text: "云(云南)", value: "0101010701", son: [] }, { text: "贵(贵州)", value: "0101010702", son: [] }, { text: "川(四川)", value: "0101010703", son: [] }, { text: "藏(西藏)", value: "0101010704", son: [] }, { text: "渝(重庆)", value: "0101010705", son: []}]}] }, { text: "境外区域", value: "", son: [{ text: "亚洲", value: "01", son: [{ text: "东亚", value: "0101", son: [{ text: "日本", value: "010102", son: [] }, { text: "韩国", value: "010103", son: [] }, { text: "台湾", value: "010104", son: [] }, { text: "香港", value: "010105", son: [] }, { text: "朝鲜", value: "010106", son: [] }, { text: "蒙古", value: "010107", son: [] }, { text: "澳门", value: "010108", son: []}] }, { text: "中亚", value: "0102", son: [{ text: "哈萨克斯坦", value: "010201", son: [] }, { text: "乌兹别克斯坦", value: "010202", son: [] }, { text: "土库曼斯坦", value: "010203", son: [] }, { text: "吉尔吉斯斯坦", value: "010204", son: [] }, { text: "塔吉克斯坦", value: "010205", son: []}] }, { text: "西亚", value: "0103", son: [{ text: "阿富汗", value: "010301", son: [] }, { text: "阿联酋", value: "010302", son: [] }, { text: "阿塞拜疆", value: "010303", son: [] }, { text: "阿曼", value: "010304", son: [] }, { text: "巴勒斯坦", value: "010305", son: [] }, { text: "巴林", value: "010306", son: [] }, { text: "格鲁吉亚", value: "010307", son: [] }, { text: "卡塔尔", value: "010308", son: [] }, { text: "科威特", value: "010309", son: [] }, { text: "黎巴嫩", value: "010310", son: [] }, { text: "沙特阿拉伯", value: "010311", son: [] }, { text: "土耳其", value: "010312", son: [] }, { text: "叙利亚", value: "010313", son: [] }, { text: "亚美尼亚", value: "010314", son: [] }, { text: "也门", value: "010315", son: [] }, { text: "伊拉克", value: "010316", son: [] }, { text: "以色列", value: "010317", son: [] }, { text: "约旦", value: "010318", son: [] }, { text: "伊朗", value: "010319", son: []}] }, { text: "东南亚", value: "0104", son: [{ text: "东帝汶", value: "010401", son: [] }, { text: "菲律宾", value: "010402", son: [] }, { text: "柬埔寨", value: "010403", son: [] }, { text: "科科斯群岛", value: "010404", son: [] }, { text: "老挝", value: "010405", son: [] }, { text: "马来西亚", value: "010406", son: [] }, { text: "缅甸", value: "010407", son: [] }, { text: "圣诞岛", value: "010408", son: [] }, { text: "泰国", value: "010409", son: [] }, { text: "文莱达鲁萨兰", value: "010410", son: [] }, { text: "新加坡", value: "010411", son: [] }, { text: "印度尼西亚", value: "010412", son: [] }, { text: "越南", value: "010413", son: []}] }, { text: "南亚", value: "0105", son: [{ text: "巴基斯坦", value: "010501", son: [] }, { text: "不丹", value: "010502", son: [] }, { text: "马尔代夫", value: "010503", son: [] }, { text: "孟加拉国", value: "010504", son: [] }, { text: "斯里兰卡", value: "010505", son: [] }, { text: "印度", value: "010506", son: [] }, { text: "尼泊尔", value: "010507", son: []}]}] }, { text: "欧洲", value: "02", son: [{ text: "阿尔巴尼亚", value: "0201", son: [] }, { text: "爱尔兰", value: "0202", son: [] }, { text: "爱沙尼亚", value: "0203", son: [] }, { text: "安道尔", value: "0204", son: [] }, { text: "奥地利", value: "0205", son: [] }, { text: "白俄罗斯", value: "0206", son: [] }, { text: "保加利亚", value: "0207", son: [] }, { text: "比利时", value: "0208", son: [] }, { text: "冰岛", value: "0209", son: [] }, { text: "波兰", value: "0210", son: [] }, { text: "波斯尼亚与黑塞哥维那", value: "0211", son: [] }, { text: "丹麦", value: "0212", son: [] }, { text: "德国", value: "0213", son: [] }, { text: "俄罗斯", value: "0214", son: [] }, { text: "法国", value: "0215", son: [] }, { text: "法罗群岛", value: "0216", son: [] }, { text: "芬兰", value: "0217", son: [] }, { text: "荷兰", value: "0218", son: [] }, { text: "捷克", value: "0219", son: [] }, { text: "克罗地亚", value: "0220", son: [] }, { text: "拉脱维亚", value: "0221", son: [] }, { text: "立陶宛", value: "0222", son: [] }, { text: "卢森堡", value: "0224", son: [] }, { text: "罗马尼亚", value: "0225", son: [] }, { text: "马耳他", value: "0226", son: [] }, { text: "马其顿", value: "0227", son: [] }, { text: "摩尔多瓦", value: "0228", son: [] }, { text: "摩纳哥", value: "0229", son: [] }, { text: "挪威", value: "0230", son: [] }, { text: "葡萄牙", value: "0231", son: [] }, { text: "瑞典", value: "0232", son: [] }, { text: "瑞士", value: "0233", son: [] }, { text: "塞尔维亚和黑山共和国", value: "0234", son: [] }, { text: "塞浦路斯", value: "0235", son: [] }, { text: "圣马力诺", value: "0236", son: [] }, { text: "斯洛伐克", value: "0237", son: [] }, { text: "斯洛文尼亚", value: "0238", son: [] }, { text: "斯瓦尔巴岛和扬马延岛", value: "0239", son: [] }, { text: "乌克兰", value: "0240", son: [] }, { text: "西班牙和加那利群岛", value: "0241", son: [] }, { text: "希腊", value: "0242", son: [] }, { text: "匈牙利", value: "0244", son: [] }, { text: "意大利", value: "0245", son: [] }, { text: "英国", value: "0246", son: [] }, { text: "直布罗陀", value: "0247", son: []}] }, { text: "非洲", value: "03", son: [{ text: "阿尔及利亚", value: "0301", son: [] }, { text: "埃及", value: "0302", son: [] }, { text: "埃塞俄比亚", value: "0303", son: [] }, { text: "安哥拉", value: "0304", son: [] }, { text: "贝宁", value: "0305", son: [] }, { text: "博茨瓦纳", value: "0306", son: [] }, { text: "布基纳法索", value: "0307", son: [] }, { text: "布隆迪", value: "0308", son: [] }, { text: "赤道几内亚", value: "0309", son: [] }, { text: "多哥", value: "0310", son: [] }, { text: "厄立特里亚", value: "0311", son: [] }, { text: "佛得角", value: "0312", son: [] }, { text: "冈比亚", value: "0313", son: [] }, { text: "刚果共和国(刚果布)", value: "0314", son: [] }, { text: "刚果民主共和国(刚果金)", value: "0315", son: [] }, { text: "吉布提", value: "0316", son: [] }, { text: "几内亚", value: "0317", son: [] }, { text: "几内亚比绍", value: "0318", son: [] }, { text: "加纳", value: "0319", son: [] }, { text: "加蓬", value: "0320", son: [] }, { text: "津巴布韦", value: "0321", son: [] }, { text: "喀麦隆", value: "0322", son: [] }, { text: "科摩罗", value: "0323", son: [] }, { text: "科特迪瓦", value: "0324", son: [] }, { text: "肯尼亚", value: "0325", son: [] }, { text: "莱索托", value: "0326", son: [] }, { text: "利比亚", value: "0327", son: [] }, { text: "利比里亚", value: "0328", son: [] }, { text: "留尼旺", value: "0329", son: [] }, { text: "卢旺达", value: "0330", son: [] }, { text: "马达加斯加", value: "0331", son: [] }, { text: "马拉维", value: "0332", son: [] }, { text: "马里", value: "0333", son: [] }, { text: "马约特", value: "0334", son: [] }, { text: "毛里求斯", value: "0335", son: [] }, { text: "毛里塔尼亚", value: "0336", son: [] }, { text: "摩洛哥", value: "0337", son: [] }, { text: "莫桑比克", value: "0338", son: [] }, { text: "纳米比亚", value: "0339", son: [] }, { text: "南非", value: "0340", son: [] }, { text: "尼日尔", value: "0341", son: [] }, { text: "尼日利亚", value: "0342", son: [] }, { text: "塞拉利昂", value: "0343", son: [] }, { text: "塞内加尔", value: "0344", son: [] }, { text: "塞舌尔", value: "0345", son: [] }, { text: "斯威士兰", value: "0346", son: [] }, { text: "苏丹", value: "0347", son: [] }, { text: "索马里", value: "0348", son: [] }, { text: "坦桑尼亚", value: "0349", son: [] }, { text: "突尼斯", value: "0350", son: [] }, { text: "乌干达", value: "0351", son: [] }, { text: "赞比亚", value: "0352", son: [] }, { text: "乍得", value: "0353", son: [] }, { text: "中非共和国", value: "0354", son: []}] }, { text: "北美洲", value: "04", son: [{ text: "美加地区", value: "0401", son: [{ text: "美国", value: "040101", son: [] }, { text: "加拿大", value: "040102", son: []}] }, { text: "格陵兰及百慕大地区", value: "0402", son: [{ text: "格陵兰", value: "040201", son: [] }, { text: "百慕大", value: "040202", son: []}] }, { text: "中美及加勒比海地区", value: "0403", son: [{ text: "墨西哥", value: "040301", son: [] }, { text: "阿鲁巴", value: "040302", son: [] }, { text: "安圭拉", value: "040303", son: [] }, { text: "安提瓜和巴布达", value: "040304", son: [] }, { text: "巴巴多斯", value: "040305", son: [] }, { text: "巴拿马", value: "040306", son: [] }, { text: "巴哈马", value: "040307", son: [] }, { text: "波多黎各", value: "040308", son: [] }, { text: "伯利兹", value: "040309", son: [] }, { text: "多米尼加共和国", value: "040310", son: [] }, { text: "多米尼克", value: "040311", son: [] }, { text: "哥斯达黎加", value: "040312", son: [] }, { text: "格林纳达", value: "040313", son: [] }, { text: "古巴", value: "040314", son: [] }, { text: "瓜德罗普岛", value: "040315", son: [] }, { text: "海地", value: "040316", son: [] }, { text: "荷属安的列斯", value: "040317", son: [] }, { text: "开曼群岛", value: "040318", son: [] }, { text: "马提尼克", value: "040319", son: [] }, { text: "美属维尔京群岛", value: "040320", son: [] }, { text: "蒙特塞拉特岛", value: "040321", son: [] }, { text: "尼加拉瓜", value: "040322", son: [] }, { text: "萨尔瓦多", value: "040323", son: [] }, { text: "圣多美和普林西比", value: "040324", son: [] }, { text: "圣基茨和尼维斯", value: "040325", son: [] }, { text: "圣卢西亚", value: "040326", son: [] }, { text: "圣皮埃尔和密克隆", value: "040327", son: [] }, { text: "圣文森特和格林纳丁斯", value: "040328", son: [] }, { text: "特克斯和凯科斯群岛", value: "040329", son: [] }, { text: "特立尼达和多巴哥", value: "040330", son: [] }, { text: "危地马拉", value: "040331", son: [] }, { text: "牙买加", value: "040332", son: [] }, { text: "英属维尔京群岛", value: "040333", son: []}]}] }, { text: "南美洲", value: "05", son: [{ text: "阿根廷", value: "0501", son: [] }, { text: "巴西", value: "0502", son: [] }, { text: "巴拉圭", value: "0503", son: [] }, { text: "玻利维亚", value: "0504", son: [] }, { text: "厄瓜多尔", value: "0505", son: [] }, { text: "法属圭亚那", value: "0506", son: [] }, { text: "福克兰群岛", value: "0507", son: [] }, { text: "哥伦比亚", value: "0508", son: [] }, { text: "圭亚那", value: "0509", son: [] }, { text: "洪都拉斯", value: "0510", son: [] }, { text: "秘鲁", value: "0511", son: [] }, { text: "苏里南", value: "0512", son: [] }, { text: "委内瑞拉", value: "0513", son: [] }, { text: "乌拉圭", value: "0514", son: [] }, { text: "智利", value: "0515", son: [] }, { text: "南极", value: "0516", son: []}] }, { text: "大洋洲", value: "06", son: [{ text: "澳新地区", value: "0601", son: [{ text: "澳大利亚", value: "060101", son: [] }, { text: "新西兰", value: "060102", son: []}] }, { text: "太平洋诸岛", value: "0602", son: [{ text: "巴布亚新几内亚", value: "060201", son: [] }, { text: "北马里亚纳群岛", value: "060202", son: [] }, { text: "法属波利尼西亚", value: "060203", son: [] }, { text: "斐济", value: "060204", son: [] }, { text: "关岛", value: "060205", son: [] }, { text: "基里巴斯", value: "060206", son: [] }, { text: "库克群岛", value: "060207", son: [] }, { text: "马绍尔群岛", value: "060208", son: [] }, { text: "美国本土外小岛屿", value: "060209", son: [] }, { text: "美属萨摩亚", value: "060210", son: [] }, { text: "密克罗尼西亚", value: "060211", son: [] }, { text: "瑙鲁", value: "060212", son: [] }, { text: "纽埃", value: "060213", son: [] }, { text: "诺福克岛", value: "060214", son: [] }, { text: "帕劳", value: "060215", son: [] }, { text: "萨摩亚", value: "060216", son: [] }, { text: "圣赫勒拿", value: "060217", son: [] }, { text: "所罗门群岛", value: "060218", son: [] }, { text: "汤加", value: "060219", son: [] }, { text: "图瓦卢", value: "060220", son: [] }, { text: "瓦利斯和富图纳群岛", value: "060221", son: [] }, { text: "瓦努阿图", value: "060222", son: [] }, { text: "新喀里多尼亚", value: "060223", son: []}]}]}]}];

var jsonArea = { text: "全球", value: "0", son: [{ text: "中国大陆", value: "010101", son: [{ text: "东北", value: "01010101", son: [{ text: "黑(黑龙江)", value: "0101010101", son: [] }, { text: "吉(吉林)", value: "0101010102", son: [] }, { text: "辽(辽宁)", value: "0101010103", son: []}] }, { text: "华北", value: "01010102", son: [{ text: "京(北京)", value: "0101010201", son: [] }, { text: "津(天津)", value: "0101010202", son: [] }, { text: "冀(河北)", value: "0101010203", son: [] }, { text: "蒙(内蒙古)", value: "0101010204", son: [] }, { text: "晋(山西)", value: "0101010205", son: [] }, { text: "鲁(山东)", value: "0101010206", son: []}] }, { text: "华东", value: "01010103", son: [{ text: "沪(上海)", value: "0101010301", son: [] }, { text: "苏(江苏)", value: "0101010302", son: [] }, { text: "浙(浙江)", value: "0101010303", son: [] }, { text: "皖(安徽)", value: "0101010304", son: []}] }, { text: "华南", value: "01010104", son: [{ text: "粤(广东)", value: "0101010401", son: [] }, { text: "桂(广西)", value: "0101010402", son: [] }, { text: "琼(海南)", value: "0101010403", son: [] }, { text: "闽(福建)", value: "0101010404", son: []}] }, { text: "西北", value: "01010105", son: [{ text: "陕(陕西)", value: "0101010501", son: [] }, { text: "甘(甘肃)", value: "0101010502", son: [] }, { text: "宁(宁夏)", value: "0101010503", son: [] }, { text: "青(青海)", value: "0101010504", son: [] }, { text: "新(新疆)", value: "0101010505", son: []}] }, { text: "华中", value: "01010106", son: [{ text: "鄂(湖北)", value: "0101010601", son: [] }, { text: "湘(湖南)", value: "0101010602", son: [] }, { text: "赣(江西)", value: "0101010603", son: [] }, { text: "豫(河南)", value: "0101010604", son: []}] }, { text: "西南", value: "01010107", son: [{ text: "云(云南)", value: "0101010701", son: [] }, { text: "贵(贵州)", value: "0101010702", son: [] }, { text: "川(四川)", value: "0101010703", son: [] }, { text: "藏(西藏)", value: "0101010704", son: [] }, { text: "渝(重庆)", value: "0101010705", son: []}]}] }, { text: "亚洲(不含大陆)", value: "01", son: [{ text: "东亚", value: "0101", son: [{ text: "日本", value: "010102", son: [] }, { text: "韩国", value: "010103", son: [] }, { text: "台湾", value: "010104", son: [] }, { text: "香港", value: "010105", son: [] }, { text: "朝鲜", value: "010106", son: [] }, { text: "蒙古", value: "010107", son: [] }, { text: "澳门", value: "010108", son: []}] }, { text: "中亚", value: "0102", son: [{ text: "哈萨克斯坦", value: "010201", son: [] }, { text: "乌兹别克斯坦", value: "010202", son: [] }, { text: "土库曼斯坦", value: "010203", son: [] }, { text: "吉尔吉斯斯坦", value: "010204", son: [] }, { text: "塔吉克斯坦", value: "010205", son: []}] }, { text: "西亚", value: "0103", son: [{ text: "阿富汗", value: "010301", son: [] }, { text: "阿联酋", value: "010302", son: [] }, { text: "阿塞拜疆", value: "010303", son: [] }, { text: "阿曼", value: "010304", son: [] }, { text: "巴勒斯坦", value: "010305", son: [] }, { text: "巴林", value: "010306", son: [] }, { text: "格鲁吉亚", value: "010307", son: [] }, { text: "卡塔尔", value: "010308", son: [] }, { text: "科威特", value: "010309", son: [] }, { text: "黎巴嫩", value: "010310", son: [] }, { text: "沙特阿拉伯", value: "010311", son: [] }, { text: "土耳其", value: "010312", son: [] }, { text: "叙利亚", value: "010313", son: [] }, { text: "亚美尼亚", value: "010314", son: [] }, { text: "也门", value: "010315", son: [] }, { text: "伊拉克", value: "010316", son: [] }, { text: "以色列", value: "010317", son: [] }, { text: "约旦", value: "010318", son: [] }, { text: "伊朗", value: "010319", son: []}] }, { text: "东南亚", value: "0104", son: [{ text: "东帝汶", value: "010401", son: [] }, { text: "菲律宾", value: "010402", son: [] }, { text: "柬埔寨", value: "010403", son: [] }, { text: "科科斯群岛", value: "010404", son: [] }, { text: "老挝", value: "010405", son: [] }, { text: "马来西亚", value: "010406", son: [] }, { text: "缅甸", value: "010407", son: [] }, { text: "圣诞岛", value: "010408", son: [] }, { text: "泰国", value: "010409", son: [] }, { text: "文莱达鲁萨兰", value: "010410", son: [] }, { text: "新加坡", value: "010411", son: [] }, { text: "印度尼西亚", value: "010412", son: [] }, { text: "越南", value: "010413", son: []}] }, { text: "南亚", value: "0105", son: [{ text: "巴基斯坦", value: "010501", son: [] }, { text: "不丹", value: "010502", son: [] }, { text: "马尔代夫", value: "010503", son: [] }, { text: "孟加拉国", value: "010504", son: [] }, { text: "斯里兰卡", value: "010505", son: [] }, { text: "印度", value: "010506", son: [] }, { text: "尼泊尔", value: "010507", son: []}]}] }, { text: "欧洲", value: "02", son: [{ text: "阿尔巴尼亚", value: "0201", son: [] }, { text: "爱尔兰", value: "0202", son: [] }, { text: "爱沙尼亚", value: "0203", son: [] }, { text: "安道尔", value: "0204", son: [] }, { text: "奥地利", value: "0205", son: [] }, { text: "白俄罗斯", value: "0206", son: [] }, { text: "保加利亚", value: "0207", son: [] }, { text: "比利时", value: "0208", son: [] }, { text: "冰岛", value: "0209", son: [] }, { text: "波兰", value: "0210", son: [] }, { text: "波斯尼亚与黑塞哥维那", value: "0211", son: [] }, { text: "丹麦", value: "0212", son: [] }, { text: "德国", value: "0213", son: [] }, { text: "俄罗斯", value: "0214", son: [] }, { text: "法国", value: "0215", son: [] }, { text: "法罗群岛", value: "0216", son: [] }, { text: "芬兰", value: "0217", son: [] }, { text: "荷兰", value: "0218", son: [] }, { text: "捷克", value: "0219", son: [] }, { text: "克罗地亚", value: "0220", son: [] }, { text: "拉脱维亚", value: "0221", son: [] }, { text: "立陶宛", value: "0222", son: [] }, { text: "卢森堡", value: "0224", son: [] }, { text: "罗马尼亚", value: "0225", son: [] }, { text: "马耳他", value: "0226", son: [] }, { text: "马其顿", value: "0227", son: [] }, { text: "摩尔多瓦", value: "0228", son: [] }, { text: "摩纳哥", value: "0229", son: [] }, { text: "挪威", value: "0230", son: [] }, { text: "葡萄牙", value: "0231", son: [] }, { text: "瑞典", value: "0232", son: [] }, { text: "瑞士", value: "0233", son: [] }, { text: "塞尔维亚和黑山共和国", value: "0234", son: [] }, { text: "塞浦路斯", value: "0235", son: [] }, { text: "圣马力诺", value: "0236", son: [] }, { text: "斯洛伐克", value: "0237", son: [] }, { text: "斯洛文尼亚", value: "0238", son: [] }, { text: "斯瓦尔巴岛和扬马延岛", value: "0239", son: [] }, { text: "乌克兰", value: "0240", son: [] }, { text: "西班牙和加那利群岛", value: "0241", son: [] }, { text: "希腊", value: "0242", son: [] }, { text: "匈牙利", value: "0244", son: [] }, { text: "意大利", value: "0245", son: [] }, { text: "英国", value: "0246", son: [] }, { text: "直布罗陀", value: "0247", son: []}] }, { text: "非洲", value: "03", son: [{ text: "阿尔及利亚", value: "0301", son: [] }, { text: "埃及", value: "0302", son: [] }, { text: "埃塞俄比亚", value: "0303", son: [] }, { text: "安哥拉", value: "0304", son: [] }, { text: "贝宁", value: "0305", son: [] }, { text: "博茨瓦纳", value: "0306", son: [] }, { text: "布基纳法索", value: "0307", son: [] }, { text: "布隆迪", value: "0308", son: [] }, { text: "赤道几内亚", value: "0309", son: [] }, { text: "多哥", value: "0310", son: [] }, { text: "厄立特里亚", value: "0311", son: [] }, { text: "佛得角", value: "0312", son: [] }, { text: "冈比亚", value: "0313", son: [] }, { text: "刚果共和国(刚果布)", value: "0314", son: [] }, { text: "刚果民主共和国(刚果金)", value: "0315", son: [] }, { text: "吉布提", value: "0316", son: [] }, { text: "几内亚", value: "0317", son: [] }, { text: "几内亚比绍", value: "0318", son: [] }, { text: "加纳", value: "0319", son: [] }, { text: "加蓬", value: "0320", son: [] }, { text: "津巴布韦", value: "0321", son: [] }, { text: "喀麦隆", value: "0322", son: [] }, { text: "科摩罗", value: "0323", son: [] }, { text: "科特迪瓦", value: "0324", son: [] }, { text: "肯尼亚", value: "0325", son: [] }, { text: "莱索托", value: "0326", son: [] }, { text: "利比亚", value: "0327", son: [] }, { text: "利比里亚", value: "0328", son: [] }, { text: "留尼旺", value: "0329", son: [] }, { text: "卢旺达", value: "0330", son: [] }, { text: "马达加斯加", value: "0331", son: [] }, { text: "马拉维", value: "0332", son: [] }, { text: "马里", value: "0333", son: [] }, { text: "马约特", value: "0334", son: [] }, { text: "毛里求斯", value: "0335", son: [] }, { text: "毛里塔尼亚", value: "0336", son: [] }, { text: "摩洛哥", value: "0337", son: [] }, { text: "莫桑比克", value: "0338", son: [] }, { text: "纳米比亚", value: "0339", son: [] }, { text: "南非", value: "0340", son: [] }, { text: "尼日尔", value: "0341", son: [] }, { text: "尼日利亚", value: "0342", son: [] }, { text: "塞拉利昂", value: "0343", son: [] }, { text: "塞内加尔", value: "0344", son: [] }, { text: "塞舌尔", value: "0345", son: [] }, { text: "斯威士兰", value: "0346", son: [] }, { text: "苏丹", value: "0347", son: [] }, { text: "索马里", value: "0348", son: [] }, { text: "坦桑尼亚", value: "0349", son: [] }, { text: "突尼斯", value: "0350", son: [] }, { text: "乌干达", value: "0351", son: [] }, { text: "赞比亚", value: "0352", son: [] }, { text: "乍得", value: "0353", son: [] }, { text: "中非共和国", value: "0354", son: []}] }, { text: "北美洲", value: "04", son: [{ text: "美加地区", value: "0401", son: [{ text: "美国", value: "040101", son: [] }, { text: "加拿大", value: "040102", son: []}] }, { text: "格陵兰及百慕大地区", value: "0402", son: [{ text: "格陵兰", value: "040201", son: [] }, { text: "百慕大", value: "040202", son: []}] }, { text: "中美及加勒比海地区", value: "0403", son: [{ text: "墨西哥", value: "040301", son: [] }, { text: "阿鲁巴", value: "040302", son: [] }, { text: "安圭拉", value: "040303", son: [] }, { text: "安提瓜和巴布达", value: "040304", son: [] }, { text: "巴巴多斯", value: "040305", son: [] }, { text: "巴拿马", value: "040306", son: [] }, { text: "巴哈马", value: "040307", son: [] }, { text: "波多黎各", value: "040308", son: [] }, { text: "伯利兹", value: "040309", son: [] }, { text: "多米尼加共和国", value: "040310", son: [] }, { text: "多米尼克", value: "040311", son: [] }, { text: "哥斯达黎加", value: "040312", son: [] }, { text: "格林纳达", value: "040313", son: [] }, { text: "古巴", value: "040314", son: [] }, { text: "瓜德罗普岛", value: "040315", son: [] }, { text: "海地", value: "040316", son: [] }, { text: "荷属安的列斯", value: "040317", son: [] }, { text: "开曼群岛", value: "040318", son: [] }, { text: "马提尼克", value: "040319", son: [] }, { text: "美属维尔京群岛", value: "040320", son: [] }, { text: "蒙特塞拉特岛", value: "040321", son: [] }, { text: "尼加拉瓜", value: "040322", son: [] }, { text: "萨尔瓦多", value: "040323", son: [] }, { text: "圣多美和普林西比", value: "040324", son: [] }, { text: "圣基茨和尼维斯", value: "040325", son: [] }, { text: "圣卢西亚", value: "040326", son: [] }, { text: "圣皮埃尔和密克隆", value: "040327", son: [] }, { text: "圣文森特和格林纳丁斯", value: "040328", son: [] }, { text: "特克斯和凯科斯群岛", value: "040329", son: [] }, { text: "特立尼达和多巴哥", value: "040330", son: [] }, { text: "危地马拉", value: "040331", son: [] }, { text: "牙买加", value: "040332", son: [] }, { text: "英属维尔京群岛", value: "040333", son: []}]}] }, { text: "南美洲", value: "05", son: [{ text: "阿根廷", value: "0501", son: [] }, { text: "巴西", value: "0502", son: [] }, { text: "巴拉圭", value: "0503", son: [] }, { text: "玻利维亚", value: "0504", son: [] }, { text: "厄瓜多尔", value: "0505", son: [] }, { text: "法属圭亚那", value: "0506", son: [] }, { text: "福克兰群岛", value: "0507", son: [] }, { text: "哥伦比亚", value: "0508", son: [] }, { text: "圭亚那", value: "0509", son: [] }, { text: "洪都拉斯", value: "0510", son: [] }, { text: "秘鲁", value: "0511", son: [] }, { text: "苏里南", value: "0512", son: [] }, { text: "委内瑞拉", value: "0513", son: [] }, { text: "乌拉圭", value: "0514", son: [] }, { text: "智利", value: "0515", son: [] }, { text: "南极", value: "0516", son: []}] }, { text: "大洋洲", value: "06", son: [{ text: "澳新地区", value: "0601", son: [{ text: "澳大利亚", value: "060101", son: [] }, { text: "新西兰", value: "060102", son: []}] }, { text: "太平洋诸岛", value: "0602", son: [{ text: "巴布亚新几内亚", value: "060201", son: [] }, { text: "北马里亚纳群岛", value: "060202", son: [] }, { text: "法属波利尼西亚", value: "060203", son: [] }, { text: "斐济", value: "060204", son: [] }, { text: "关岛", value: "060205", son: [] }, { text: "基里巴斯", value: "060206", son: [] }, { text: "库克群岛", value: "060207", son: [] }, { text: "马绍尔群岛", value: "060208", son: [] }, { text: "美国本土外小岛屿", value: "060209", son: [] }, { text: "美属萨摩亚", value: "060210", son: [] }, { text: "密克罗尼西亚", value: "060211", son: [] }, { text: "瑙鲁", value: "060212", son: [] }, { text: "纽埃", value: "060213", son: [] }, { text: "诺福克岛", value: "060214", son: [] }, { text: "帕劳", value: "060215", son: [] }, { text: "萨摩亚", value: "060216", son: [] }, { text: "圣赫勒拿", value: "060217", son: [] }, { text: "所罗门群岛", value: "060218", son: [] }, { text: "汤加", value: "060219", son: [] }, { text: "图瓦卢", value: "060220", son: [] }, { text: "瓦利斯和富图纳群岛", value: "060221", son: [] }, { text: "瓦努阿图", value: "060222", son: [] }, { text: "新喀里多尼亚", value: "060223", son: []}]}]}] };