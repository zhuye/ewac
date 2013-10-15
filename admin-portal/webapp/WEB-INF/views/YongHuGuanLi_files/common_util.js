var hintColor     = "#CC3366";
var hintfont      = "15px";
var MaxPortNumber = 24;
var trunkMaxPort  = 8;
var trunkMinPort  = 2;
var trunkMaxGroup = 6;
var VlanInfo      = new Array(1, 16777215, 0, 0);
var userlevel     = 0;
var maxSMac       = 128;
var maxMac        = 8192;
var tmp           = new Array();

function $()
{
    var elements = new Array();

    for (var i = 0; i < arguments.length; i++)
    {
        var element = arguments[i];

        if (typeof element == 'string')
        {
            if (document.getElementById)
            {
                element = document.getElementById(element);
            }
            else if (document.all)
            {
                element = document.all[element];
            }
        }

        elements.push(element);
    }

    if (arguments.length == 1 && elements.length > 0)
    {
        return elements[0];
    }
    else
    {
        return elements;
    }
}

function $C(elType)
{
    return document.createElement(elType);
}

function log(message)
{
    $("log").innerHTML += message + "<br/>";
}

function XMLHttp()
{
    var _xmlhttp = null;
    var _sendMethod = "GET";
    var _handler = null;

    this.create = create;
    this.sendRequest = sendRequest;
    this.setSendMethod = setSendMethod;
    this.getResponseHeader = function(headerName)
    {
        return _xmlhttp.getResponseHeader(headerName);
    }
    create();

    function create()
    {
        try
        {
            _xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(oc)
            {
                _xmlhttp = null;
            }
        }

        if ((_xmlhttp == null) && ((typeof XMLHttpRequest) != "undefined"))
        {
            _xmlhttp = new XMLHttpRequest();
        }
    }

    function setSendMethod(method)
    {
        _sendMethod = method;
    }

    function sendRequest(url, body, fn)
    {
        if (_xmlhttp == null) return null;
        try
        {
            _handler = fn;
            _xmlhttp.open(_sendMethod, url, true);
            _xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            _xmlhttp.onreadystatechange = requestComplete;
            _xmlhttp.send(body);
        }
        catch(e)
        {}
    }

    function requestComplete(responseText)
    {
        if (_xmlhttp.readyState == 4)
        {
            _handler(_xmlhttp.responseText);
        }
    }
}

function evalJSON(json)
{
    var obj = null;
    try
    {
        json = json.replace(/\,\s*\]/g, "]");
        json = json.replace(/\,\s*\}/g, "}");
        obj = eval("(" + json + ")");
    }
    catch(E)
    {
//      obj = null;alert("evalJSON:" + E + "\n" + json);
    }
    return obj ;
}

/*
    用途：检查输入字符串是否为空或者全部都是空格
    输入：str
    返回：
    如果全是空返回true,否则返回false
*/
function isNull(str)
{
    if (str == "")
    {
        return true;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

function replaceString(str, template, replaceText)
{
    var s = "";
    var s_s = '<!-- ' + template + ' BEGIN-->';
    var s_e = '<!-- ' + template + ' END-->';

    var start = str.indexOf(s_s);
    var end = str.indexOf(s_e);

    if (start == -1 || end == -1) return str;

    end += s_e.length;

    s += str.substring(0, start);
    s += replaceText;
    s += str.substr(end);
    return s;
}

function getTemplateString(str, template)
{
    var s = '<!-- ' + template + ' BEGIN-->';
    var start = str.indexOf(s);
    var end = str.indexOf('<!-- ' + template + ' END-->');

    if (start == -1 || end == -1) return "";

    start += s.length;
    return str.substring(start, end);
}

// Retrieve the value of the cookie with the specified name.
function getCookie(sName)
{
    // cookies are separated by semicolons
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
        // a name alue pair (a crumb) is separated by an equal sign
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
        {
            return aCrumb[1];
        }
    }
    // a cookie with the requested name does not exist
    return null;
}

// Retrieve the value of the cookie with the specified name.
function LoginUser(sName)
{
    // cookies are separated by semicolons
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[0];
    }
    catch(E){}
    return "";
}

function getAdminName(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[1];
    }
    catch(E){}
    return "";
}

function getUserName(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[2];
    }
    catch(E){}
    return "";
}

function getWebLanguage(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[3];
    }
    catch(E){}
    return "";
}

function getEthPortNum(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[4];
    }
    catch(E){}
    return "";
}

function getUserLevel(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[5];
    }
    catch(E){}
    return "";
}

function chg_language(obj)
{
    for (var attr in obj)
    {
        try
        {
            switch (attr)
            {
                case "title":
                    document.title = obj[attr];
                    break;
                case "innerHTML":
                    var o_arr = obj[attr];
                    for (var k in o_arr)
                    {
                        try
                        {
                            $(k).innerHTML = o_arr[k];
                        }
                        catch(E)
                        {
//                          alert(k + ":" + E);
                        }
                    }
                    break;
                case "value":
                    var o_arr = obj[attr];
                    for (var k in o_arr)
                    {
                        try
                        {
                            $(k).value = o_arr[k];
                        }
                        catch(E)
                        {
//                          alert(k + ":" + E);
                        }
                    }
                    break;
                case "option_title":
                    var o_arr = obj[attr];
                    for (var k in o_arr)
                    {
                        try
                        {
                            for (var i = 0; i < o_arr[k].length; i++)
                            {
                                try
                                {
                                    $(k).options[i].title = o_arr[k][i];
                                }
                                catch(E)
                                {
//                                  alert(o_arr[k][i] + ":" + E);
                                }
                            }
                        }
                        catch(E)
                        {
//                          alert(k + ":" + E);
                        }
                    }
                    break;
                case "option_text":
                    var o_arr = obj[attr];
                    for (var k in o_arr)
                    {
                        try
                        {
                            for (var i=0; i<o_arr[k].length; i++)
                            {
                                try
                                {
                                    $(k).options[i].text = o_arr[k][i];
                                }
                                catch(E)
                                {
//                                  alert(o_arr[k][i] + ":" + E);
                                }
                            }
                        }
                        catch(E)
                        {
//                          alert(k + ":" + E);
                        }
                    }
                    break;
                default:
//                  alert("unkown cmd: " + attr);
            }
        }
        catch(E)
        {
//          alert(obj + ":" + E);
        }
    }
}

function check_input(input, min, max)
{
    var valid = true;
    var inputtemp;
    var ch;
    var cnt;
    var len;
    inputtemp = input.toString();
    len = inputtemp.length;
    if (0 == len)
    {
        valid = false;
        return valid;
    }
    for (cnt = len - 1; cnt >= 0; cnt--)
    {
        ch = inputtemp.charAt(cnt);
        if(' ' == ch)
        {
            len--;
        }
        else
        {
            break;
        }
    }
    for (cnt = 0; cnt < len; cnt++)
    {
        ch = inputtemp.charAt(cnt);
        if ((ch > '9') || (ch < '0'))
        {
            valid = false;
            return valid;
        }
    }
    if ((input > max) || (input < min))
    {
        valid = false;
    }
    return valid;
}

function pmask2str(pMask)
{
    var i = 0, j = 0;
    var tmp = Array(8);
    var result = '';

    for (i = 0; i < 8; i++)
    {
        tmp[i] = 0;
    }

    for (i = 0; i < 8; i++)
    {
        tmp[i] = (pMask >> (4 * i)) & (0x0F);
    }

    for (i = 0; i < 8; i++)
    {
        result += tmp[7 - i].toString(16);
    }
    result = '0x' + result;
    return result;
}

function parseDec(input) //输入参数为十进制的
{
    return parseInt(input, 10);
}
function parseHex(input) //输入参数为十六进制的
{
    return parseInt(input, 16);
}

function isValidIPNO(s)
{
    var i;
    var j = 1;
    var x = 0;
    var y = 0;
    for (i = 0; i < s.length; i++)
    {
        c = s.charAt(i);
        if (c == '.')
        {
            if ((j > 4) || (j == 1))
            {
                return false;
            }
            j = 0;
            y++;
        }
        else
        {
            if (isNaN(c))
            {
                return false;
            }
        }

        if ((j > 3) || (y > 3))
        {
            return false;
        }
        j++;
    }
    if (y != 3)
    {
        return false;
    }
    return true;
}

function transtovlanlist(portlist)
{
    var count = 0;
    var portArray = new Array();
    portArray = portlist.split(",");

    var cur_set = "";
    var cur_portlist = "";
    for (var i = 0; i < portArray.length; i++)
    {
        var vports = portArray[i];

        if (vports.indexOf("-") > 0)
        {
            var st3 = vports.split("-");
            var sp = parseDec(st3[0]);
            var ep = parseDec(st3[1]);
            if (isNaN(sp) || isNaN(ep))
            {
                return "NaN";
            }
            if (sp > ep)
            {
                var tmp = sp;
                sp = ep;
                ep = tmp;
            }

            for (var j = sp; j <= ep; j++)
            {
                cur_set += "," + j;
            }
        }
        else if (vports.length > 0)
        {
            cur_set += "," + vports;
        }
    }

    if (cur_set.indexOf(",") == 0)
    {
        cur_portlist = cur_set.substring(1, cur_set.length);
    }
    else
    {
        cur_portlist = cur_set;
    }

    return cur_portlist;
}

function transtring(s, ip_type, mask)
{
    var count = 0;
    var dot = 0;
    var tempSubMsk = new Array(0,0,0,0);
    var ipaddrbyte = new Array("0","0","0","0");
    for (count = 0; count <= s.length; count++)
    {
        if (s.substring(count,count + 1) == '.')
        {
            dot++;
            ipaddrbyte[dot] = parseDec(s.substring(count + 1));
            if (isNaN(ipaddrbyte[dot]))
            {
                return false;
            }
        }
    }
    ipaddrbyte[0] = parseDec(s.substring(0));

    //modify by lufeng04901 for SHD03400
    //检查输入有效性
    for (var i = 0; i < 4; i++)
    {
        if ((ipaddrbyte[i] > 255) || (ipaddrbyte[i] < 0))
        {
            return false;
        }
    }

    if (ip_type == 2)    //网络掩码
    {
        tempSubMsk[3] = ipaddrbyte[0];
        tempSubMsk[2] = ipaddrbyte[1];
        tempSubMsk[1] = ipaddrbyte[2];
        tempSubMsk[0] = ipaddrbyte[3];
        var i = 31;

        for (i = 31; i >= 0; i--)
        {
            if ((tempSubMsk[parseDec(i / 8)] & (1 << (i % 8))) != 0)
            {
                tempSubMsk[parseDec(i / 8)] = tempSubMsk[parseDec(i / 8)] - (1 << (i % 8))
            }
            else
            {
                break;
            }
        }
        if (i >= 0 && i < 29)
        {
            if ((tempSubMsk[0] != 0) || (tempSubMsk[1] != 0) || (tempSubMsk[2] != 0) || (tempSubMsk[3] != 0))
            {
                return false;
            }
        }
        else
        {
            return false;
        }
        return true;
    }
    else if (ip_type == 1 || ip_type == 3)
    {
        if (ip_type == 3)//可选地址-全0地址
        {
            if ((ipaddrbyte[0] == 0) && (ipaddrbyte[1] == 0) && (ipaddrbyte[2] == 0) && (ipaddrbyte[3] == 0))
            {
                return true;
            }
        }

        if ((ipaddrbyte[0] > 223) || (ipaddrbyte[0] == 127) || (ipaddrbyte[0] == 0))
        {
            return false;
        }

        if ((((ipaddrbyte[0] & 63) == 63) && (ipaddrbyte[1] == 255) && (ipaddrbyte[2] == 255) && (ipaddrbyte[3] == 255))
            || (((ipaddrbyte[0] & 63) == 0) && (ipaddrbyte[1] == 0) && (ipaddrbyte[2] == 0) && (ipaddrbyte[3] == 0)))
        {
            return false;
        }

        var tmp = 0;
        for (var i = 0; i < 4; i++)
        {
            for (var j = 0; j < 8; j++)
            {
                if (ipaddrbyte[i] & (1 << j))
                {
                    tmp++;
                }
            }
        }

        if (tmp == 1 || tmp == 0)
        {
            return false;
        }

        //检查广播地址和网络地址
        if (0 != mask)
        {
            var netmask = mask.split(".");
            var netaddr = new Array();
            var hostaddr = new Array();
            var mask = new Array();
            for (var i = 0; i < 4; i++)
            {
                netaddr[i] = netmask[i] & ipaddrbyte[i];
                mask[i] = netmask[i] ^ 255;
                hostaddr[i] = mask[i] & ipaddrbyte[i];
            }
            if ((netaddr[0] == 0) && (netaddr[1] == 0) && (netaddr[2] == 0) && (netaddr[3] == 0))
            {
                return false;
            }
            if ((netaddr[0] == ipaddrbyte[0]) && (netaddr[1] == ipaddrbyte[1]) && (netaddr[2] == ipaddrbyte[2]) && (netaddr[3] == ipaddrbyte[3]))
            {
                return false;
            }
            if ((hostaddr[0] == mask[0]) && (hostaddr[1] == mask[1]) && (hostaddr[2] == mask[2]) && (hostaddr[3] == mask[3]))
            {
                return false;
            }
        }
    }
    return true;
}

function CheckIPAddr(ipaddr)
{
    if (isNull(ipaddr) || (!isValidIPNO(ipaddr)) || (transtring(ipaddr, 1, 0) == false))
    {
        return false;
    }
    return true;
}

function CheckIPAddr1(ipaddr, mask)
{
    if (isNull(ipaddr) || (!isValidIPNO(ipaddr)) || (transtring(ipaddr, 1, mask) == false))
    {
        return false;
    }
    return true;
}

function CheckIPAddr2(ipaddr)
{
    if (isNull(ipaddr) || (!isValidIPNO(ipaddr)) || (transtring(ipaddr, 3, 0) == false))
    {
        return false;
    }
    return true;
}

function CheckIPAddr3(ipaddr)
{
    if (isNull(ipaddr) || (!isValidIPNO(ipaddr)) || (transtring(ipaddr, 0, 0) == false))
    {
        return false;
    }
    return true;
}

function CheckNetMaskIPAddr(ipaddr)
{
    if (isNull(ipaddr) || (!isValidIPNO(ipaddr)) || (transtring(ipaddr, 2, 0) == false))
    {
        return false;
    }
    return true;
}

function CheckMask(mask)
{
    if (isNull(mask) || !isValidIPNO(mask))
    {
        return false;
    }
    return true;
}

function disableButton(dis)
{
    if ($("bt_refresh"))
    {
        $("bt_refresh").disabled = dis;
    }
    if ($("bt_apply"))
    {
        $("bt_apply").disabled = dis;
    }
    if ($("bt_delete"))
    {
        $("bt_delete").disabled = dis;
    }
    if ($("bt_del"))
    {
        $("bt_del").disabled = dis;
    }
    if ($("bt_add"))
    {
        $("bt_add").disabled = dis;
    }
    if ($("bt_selectdel"))
    {
        $("bt_selectdel").disabled = dis;
    }
    if ($("bt_clear"))
    {
        $("bt_clear").disabled = dis;
    }
    if ($("bt_deleteall"))
    {
        $("bt_deleteall").disabled = dis;
    }
    if ($("bt_config"))
    {
        $("bt_config").disabled = dis;
    }
    if ($("bt_return"))
    {
        $("bt_return").disabled = dis;
    }
    if ($("bt_search"))
    {
        $("bt_search").disabled = dis;
    }
    if ($("bt_download"))
    {
        $("bt_download").disabled = dis;
    }
}

function showUserLevel(level)
{
    if (getUserLevel("user") <= level || getUserLevel("user") > 4)
    {
        if ($("div_apply_loading"))
        {
            $("div_apply_loading").innerHTML = "";
        }
        if ($("div_modify_loading"))
        {
            $("div_modify_loading").innerHTML = "";
        }
        if ($("div_delete_loading"))
        {
            $("div_delete_loading").innerHTML = "";
        }
        if ($("div_del_loading"))
        {
            $("div_del_loading").innerHTML = "";
        }
        if ($("div_add_loading"))
        {
            $("div_add_loading").innerHTML = "";
        }
        if ($("div_clear_loading"))
        {
            $("div_clear_loading").innerHTML = "";
        }
        if ($("div_config_loading"))
        {
            $("div_config_loading").innerHTML = "";
        }
        userlevel = 0;
    }
    else
    {
        userlevel = 1;
    }
}

function checkUserLevel()
{
    if (0 == userlevel)
    {
        var items = $("table2").getElementsByTagName("input");
        var items1 = $("table2").getElementsByTagName("select");
        for (var i = 0; i < items.length; i++)
        {
            items[i].disabled = true;
        }
        for (var i = 0; i < items1.length; i++)
        {
            items1[i].disabled = true;
        }
    }
}

function GetUrlAddInfo(ID)
{
    var name, value, i;
    var str = location.href;
    var num = str.indexOf("?")
    str = str.substr(num+1);
    var arrtmp = str.split("&");
    for (i = 0; i < arrtmp.length; i++)
    {
        num = arrtmp[i].indexOf("=");
        if (num > 0)
        {
            name = arrtmp[i].substring(0, num);
            value = arrtmp[i].substr(num+1);
            this[name] = value;
        }
    }
    if (!this[ID])
    {
        return 0;
    }
    else
    {
        return this[ID];
    }
}

function sortNumber(a,b)
{
    return a - b;
}

function mouseOn(obj)
{
    if (1 == userlevel)
    {
        obj.style.cursor = "pointer";
        obj.style.textDecoration = "underline";
        obj.style.color = "#3030F0";
    }
}

function mouseOut(obj)
{
    if (1 == userlevel)
    {
        obj.style.textDecoration = "none";
        obj.style.color = "#000000";
    }
}

function mouseOn1(id, mincell, maxcell)
{
    if (1 == userlevel)
    {
        for (var i = mincell - 1; i < maxcell; i++)
        {
            document.getElementById(id).cells[i].style.cursor = "pointer";
            document.getElementById(id).cells[i].style.textDecoration = "underline";
            document.getElementById(id).cells[i].style.color = "#3030F0";
        }
    }
}

function mouseOut1(id, mincell, maxcell)
{
    if (1 == userlevel)
    {
        for (var i = mincell - 1; i < maxcell; i++)
        {
            document.getElementById(id).cells[i].style.textDecoration = "none";
            document.getElementById(id).cells[i].style.color = "#000000";
        }
    }
}

function creatSubStr()
{
    var port_selected = false;
    var j = 0;

    pMsk[0] = 0x0;
    pMsk[1] = 0x0;

    for (var i = 0; i < MaxPortNumber; i++)
    {
        if ((0 == (i % 32)) && (i != 0))
        {
            j++;
        }

        if (1 == portArray[i])
        {
            port_selected = true;
            pMsk[j] = pMsk[j] | (1 << (i - j * 32));
        }
    }

    if (false == port_selected)
    {
        alert("请选择要配置的端口！");
        return false;
    }
}

function DispByPortMask(array, count)
{
    var left = 0;
    var on = 0;
    var k, n;
    var begin = 1;
    var pchs = 0;

    var str = "";
    for (k = 0,n = 0; k < count; k++)
    {
        if (((k % 32) == 0) && (k != 0))
        {
            n++;
        }
        if (array[1] & (1 << (k - n * 32)))
        {
            if (0 == left)
            {
                if (1 == begin)
                {
                    begin = 0;
                }
                else
                {
                    str += ",";//document.write(',');
                    pchs++;
                    if (pchs > 45)
                    {
                        pchs = 0;
                        str += "<br>";//document.write('<br>');
                    }
                }
                left = 1;
                str += k + 1;//document.write(k+1);
                if (k < 9)
                {
                    pchs++;
                }
                else if (k < 99)
                {
                    pchs += 2;
                }
                else if (k < 999)
                {
                    pchs += 3;
                }
                else
                {
                    pchs += 4;
                }
            }
            else
            {
                on = 1;
            }
        }
        else
        {
            if (1 == left)
            {
                if (1 == on)
                {
                    str += "-" + k;//document.write('-'+k);
                    if (k < 10)
                    {
                        pchs += 2;
                    }
                    else if (k < 100)
                    {
                        pchs += 3;
                    }
                    else if (k < 1000)
                    {
                        pchs += 4;
                    }
                    else
                    {
                        pchs += 5;
                    }
                }
                left = 0;
                on = 0;
            }
        }
    }
    if(1 == on)
    {
        str += "-" + k;//document.write('-'+k);
    }
    return str;
}

function checkChar(num)
{
    var s = "0123456789ABCDEF";
    for (var i = 0; i < s.length; i++)
    {
        if (s.charCodeAt(i) == num)
        {
            return true;
        }
    }

    return false;
}

function verifyMac(mac)
{
    if (mac.length != 14)
    {
        return false;
    }
    var mac_arr =  mac.toUpperCase().split("-");
    if (mac_arr.length != 3)
    {
        return false;
    }

    for (var i = 0; i < mac_arr.length; i++)
    {
        if (!checkChar(mac_arr[i].charCodeAt(0))
            || !checkChar(mac_arr[i].charCodeAt(1))
            || !checkChar(mac_arr[i].charCodeAt(2))
            || !checkChar(mac_arr[i].charCodeAt(3)))
        {
            return false;
        }
    }

    if ((parseInt(mac_arr[0], 16) == 0x0
        && parseInt(mac_arr[1], 16) == 0x0
        && parseInt(mac_arr[2], 16) == 0x0)
        || (parseInt(mac_arr[0], 16) == 0xff
        && parseInt(mac_arr[1], 16) == 0xff
        && parseInt(mac_arr[2], 16) == 0xff)
        || parseInt(mac_arr[0], 16) & 0x0100)
    {
        return false;
    }

    return true;
}

function verifyMacMask(mac)
{
    if (mac.length != 14)
    {
        return false;
    }
    var mac_arr =  mac.toUpperCase().split("-");
    if (mac_arr.length != 3)
    {
        return false;
    }

    for (var i = 0; i < mac_arr.length; i++)
    {
        if (!checkChar(mac_arr[i].charCodeAt(0))
            || !checkChar(mac_arr[i].charCodeAt(1))
            || !checkChar(mac_arr[i].charCodeAt(2))
            || !checkChar(mac_arr[i].charCodeAt(3)))
        {
            return false;
        }
    }

    return true;
}

function chkinput(obj, mvalue)
{
    if (obj.value.match(/[^\d]/g))
    {
        obj.value = obj.value.replace(/[^\d]/g, "");
    }
    if (obj.value.match(/^0\d/g))
    {
        obj.value = parseInt(obj.value, 10);
    }
    if (0 != mvalue && obj.value > mvalue)
    {
        obj.value = mvalue;
    }
}

function chkinputIP(obj)
{
    if (obj.value.match(/[^\d\.]/g))
    {
        obj.value = obj.value.replace(/[^\d\.]/g, "");
    }
    var tmp = obj.value.split(".");
    var ipvalue = "";
    for (var i = 0; i < 4; i++)
    {
        if (null != tmp[i])
        {
            if (0 != i)
            {
                ipvalue += "."
            }
            if (tmp[i].match(/^0\d/g))
            {
                tmp[i] = parseInt(tmp[i], 10);
            }
            if (tmp[i] > 255)
            {
                tmp[i] = 255;
            }
            ipvalue += tmp[i]
        }
    }
    if (obj.value != ipvalue)
    {
        obj.value = ipvalue;
    }
}

function chkinputMAC(obj)
{
    if (obj.value.match(/[^\da-fA-F\-]/g))
    {
        obj.value = obj.value.replace(/[^\da-fA-F\-]/g, "");
    }
}

function chkinputHex(obj)
{
    if (obj.value.match(/[^\da-fA-F]/g))
    {
        obj.value = obj.value.replace(/[^\da-fA-F]/g, "");
    }
}

function chkinputVList(obj)
{
    if ("" == obj.value)
    {
        return;
    }
    if (obj.value.match(/[^\d\,\-]/g))
    {
        obj.value = obj.value.replace(/[^\d\,\-]/g, "");
    }
    var tmp_vlist = transtovlanlist(obj.value);
    if (tmp_vlist.match(","))
    {
        tmp_vlist = tmp_vlist.split(",");
        for (var i = 0; i < tmp_vlist.length; i++)
        {
            if (tmp_vlist[i].match(/^0\d/g))
            {
                tmp_vlist[i] = parseInt(tmp_vlist[i], 10);
            }
        }
        tmp_vlist.sort(sortNumber);
        var tmp_str = ArrayToStr(tmp_vlist);
        if (obj.value != tmp_str)
        {
            obj.value = tmp_str;
        }
    }
    else
    {
        var tmp_str = parseInt(tmp_vlist, 10);
        if (obj.value.toString != tmp_str.toString)
        {
            obj.value = tmp_str;
        }
    }
}

function chkinputStr(obj)
{
    if (obj.value.match(/[^\dA-Za-z_]/g))
    {
        obj.value = obj.value.replace(/[^\dA-Za-z_]/g, "");
    }
}

function errOut(name, minValue, maxValue)
{
    if (0 == minValue && 0 == maxValue)
    {
        alert("无效的" + name + "！");
    }
    else
    {
        alert("无效的" + name + "，请输入" + minValue + "到" + maxValue + "之间的整数！");
    }
}

function ArrayToStr(array)
{
    var str = "";
    var flag = 0;
    if (array.length == 1)
    {
        str = array[0];
    }
    for (var i = 1; i < array.length; i++)
    {
        if ((array[i] - array[i - 1]) == 1)
        {
            if (str == "")
            {
                str = array[i - 1];
            }
            if (flag == 0)
            {
                str += "-";
            }
            if (i == (array.length - 1))
            {
                str += array[i];
            }
            flag = 1;
        }
        else if (flag == 1)
        {
            str += array[i - 1] + "," + array[i];
            flag = 0;
        }
        else if (flag == 0)
        {
            if (str == "")
            {
                str = array[i - 1];
            }
            str += "," + array[i];
        }
    }
    return str;
}

function isAscii(str)
{
    var strSrc_ANSI = 0;
    var strSrc = str;
    for (var i = 0; i < strSrc.length; i++)
    {
        strSrc_ANSI = strSrc.charCodeAt(i);
        if (strSrc_ANSI < 32 || strSrc_ANSI > 126)
        {
            return false;
        }
    }
    return true;
}

function refreshNavtab(TableIndex, TabIndex)
{
    if (parent.window.frames[2].document.getElementById("div_navigatortab"))
    {
        parent.window.frames[2].document.getElementById("div_navigatortab").innerHTML = NewBuildNavigatorTab(TableIndex, getUserLevel("user"), TabIndex);
    }
}

function checkPortMask(port, mask)
{
    if (mask & (1 << (port - 1)))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function strEncode(str)
{
    str = str.replace(/[%]/g, "%25");
    str = str.replace(/[#]/g, "%23");
    str = str.replace(/[&]/g, "%26");
    str = str.replace(/[?]/g, "%3f");
    return str;
}

function strDecode(str)
{
    str = str.replace(/%3f/g, "?");
    str = str.replace(/%26/g, "&");
    str = str.replace(/%23/g, "#");
    str = str.replace(/%25/g, "%");
    return str;
}

function checkStr(str)
{
    if (!isAscii(str) || str.match(/[|<>/\\'"'"'"]/))
    {
        return false;
    }

    str = strEncode(str)
    return str;
}