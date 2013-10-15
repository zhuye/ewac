// JavaScript Document
var user_level = 0;
var selected_item = new String;
var selected_topitem = new String;
function GURL(x)
{
    location = x;
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

function selectMenu(tileName){	
    var tmp = "";		//console.log(tileName);
    if (tileName == "ap_systemStatus")
    {
        setCurTableIndex(0,0);
		tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='lanStatus.asp' onClick=selectItem('ap_lanStatus',0,0)>";
		tmp += "<img name='ap_lanStatus' src='images/item_sel.gif' border='0'>LAN口状态</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='wirelessInfo.asp' onClick=selectItem('ap_wirelessInfo',0,1)>";
		tmp += "<img name='ap_wirelessInfo' src='images/item_nosel.gif' border='0'>无线信息</a></td></tr>";
		tmp += "<tr><td width='5'></td><td >"
				+ "<a target='main' href='sysStatus.asp' onClick=selectItem('ap_sysStatus',0,2)>";
		tmp += "<img name='ap_sysStatus' src='images/item_nosel.gif' border='0'>系统状态</a></td></tr>";
		tmp += "</table>";
		document.getElementById("systemStatus").innerHTML = tmp;
    }
	if(tileName == "ap_basicSetting"){
		setCurTableIndex(1,0);
		tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='lanSetting.asp' onClick=selectItem('ap_lanSetting',1,0)>";
		tmp += "<img name='ap_lanSetting' src='images/item_sel.gif' border='0'>LAN口设置</a></td></tr>";
		tmp += "</table>";
		document.getElementById("basicSetting").innerHTML = tmp;
	}
    if (tileName == "ap_wlanSetting")
    {
        setCurTableIndex(2,0);
       	tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='wireless_basic.asp' onClick=selectItem('ap_wlBasicSet',2,0)>";
		tmp += "<img name='ap_wlBasicSet' src='images/item_sel.gif' border='0'>无线基本设置</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='wireless_security.asp' onClick=selectItem('ap_wlSecSet',2,1)>";
		tmp += "<img name='ap_wlSecSet' src='images/item_nosel.gif' border='0'>无线安全设置</a></td></tr>";
		tmp += "</table>";
		document.getElementById("wlanSetting").innerHTML = tmp;
    }

    if (tileName == "ap_systemTools")
    {
        setCurTableIndex(3,0);//console.log("Nicholas");
		tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='softwareUpgrade.asp' onClick=selectItem('ap_softwareUpgrade',3,0)>";
		tmp += "<img name='ap_softwareUpgrade' src='images/item_sel.gif' border='0'>软件升级</a></td></tr>";
/*
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='networkTime.asp' onClick=selectItem('ap_networkTime',3,1)>";
		tmp += "<img name='ap_networkTime' src='images/item_nosel.gif' border='0'>网络时间</a></td></tr>";
*/
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='logManage.asp' onClick=selectItem('ap_logManage',3,2)>";
		tmp += "<img name='ap_logManage' src='images/item_nosel.gif' border='0'>日志管理</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='cfgManage.asp' onClick=selectItem('ap_cfgManage',3,3)>";
		tmp += "<img name='ap_cfgManage' src='images/item_nosel.gif' border='0'>配置管理</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='userManage.asp' onClick=selectItem('ap_userManage',3,4)>";
		tmp += "<img name='ap_userManage' src='images/item_nosel.gif' border='0'>用户管理</a></td></tr>";
		tmp += "</table>";
		document.getElementById("systemTools").innerHTML = tmp;
    }

    if(tileName == "ap_ipAddrManage")
    {
        setCurTableIndex(4,0);
        tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='search.htm' onClick=selectItem('ap_search',4,0)>";
		tmp += "<img name='ap_search' src='images/item_sel.gif' border='0'>搜索</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='ipAddrSet.htm' onClick=selectItem('ap_ipAddrSet',4,1)>";
		tmp += "<img name='ap_ipAddrSet' src='images/item_nosel.gif' border='0'>IP地址设置</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='apLinkSkip.htm' onClick=selectItem('ap_apLinkSkip',4,2)>";
		tmp += "<img name='ap_apLinkSkip' src='images/item_nosel.gif' border='0'>AP链接跳转</a></td></tr>";
		tmp += "</table>";
        document.getElementById("ipAddrManage").innerHTML = tmp;
    }

    if (tileName == "ap_ssidManage")
    {
        setCurTableIndex(5,0);
        tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='ssidSet.htm' onClick=selectItem('ap_ssidSet',5,0)>";
		tmp += "<img name='ap_ssidSet' src='images/item_sel.gif' border='0'>SSID设置</a></td></tr>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='devNameSet.htm' onClick=selectItem('ap_devNameSet',5,1)>";
		tmp += "<img name='ap_devNameSet' src='images/item_nosel.gif' border='0'>设备名称设置</a></td></tr>";
		tmp += "</table>";
        document.getElementById("ssidManage").innerHTML = tmp;
    }

    if (tileName == "ap_channelManage")
    {
        setCurTableIndex(6,0);
       	tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='channelSet.htm' onClick=selectItem('ap_channelSet',6,0)>";
		tmp += "<img name='ap_channelSet' src='images/item_sel.gif' border='0'>信道设置</a></td></tr>";
		tmp += "</table>";
        document.getElementById("channelManage").innerHTML = tmp;
    }

    if (tileName == "ap_wlEncryptManage")
    {
        setCurTableIndex(7,0);
       	tmp = "<table width='120' border='0' cellPadding='2' cellSpacing='0'>";
		tmp += "<tr><td width='5'></td><td>"
				+ "<a target='main' href='channelSet.htm' onClick=selectItem('ap_channelSet',7,0)>";
		tmp += "<img name='ap_channelSet' src='images/item_sel.gif' border='0'>无线加密设置</a></td></tr>";
		tmp += "</table>";
        document.getElementById("wlEncryptManage").innerHTML = tmp;
    }

    if (tmp != "")
    {
        if (tileName != "ap_systemStatus")
        {
            document.getElementById("systemStatus").innerHTML = "";
        }
        if (tileName != "ap_basicSetting")
        {
            document.getElementById("basicSetting").innerHTML = "";
        }
        if (tileName != "ap_wlanSetting")
        {
            document.getElementById("wlanSetting").innerHTML = "";
        }
        if (tileName != "ap_systemTools")
        {
            document.getElementById("systemTools").innerHTML = "";
        }
    }
    if (selected_topitem != "")
    {
        document.images[selected_topitem].src = "images/item_nosel.gif";
    }
    if (tileName != "")
    {	//console.log(tileName == "ap_basicSetting");
        document.images[tileName].src = "images/item_redsel.gif";
    }
    selected_topitem = tileName;

    selected_item = "";
}


function selectItem(item_name, tableIndex,levelIndex)
{	//console.log(item_name);console.log(table_index);console.log(document.images);
    setCurTableIndex(tableIndex,levelIndex);
    for (var i = 0; i < document.images.length; i++)
    {	
        if (document.images[i].name == "ap_systemStatus"
            || document.images[i].name == "ap_basicSetting"
            || document.images[i].name == "ap_wlanSetting"
            || document.images[i].name == "ap_systemTools"
            || document.images[i].name == "ap_ipAddrManage"
            || document.images[i].name == "ap_ssidManage"
            || document.images[i].name == "ap_channelManage"
			|| document.images[i].name == "ap_wlEncryptManage"
            || document.images[i].name == "pic_exit")
        {
            continue;
        }
        document.images[i].src = "images/item_nosel.gif";
    }
    if (item_name != "")
    {
        document.images[item_name].src = "images/item_sel.gif";
    }
    selected_item = item_name;
}

function pageLoaded()
{
    selectMenu("ap_systemStatus");
}

function preLogout()
{
    if ((confirm("确定退出管理系统吗？")))
    {
        var xmlhttp = new XMLHttp();
        xmlhttp.sendRequest("/logout/Auth", "", logoutResult);
    }
}

function logoutResult(s)
{
    parent.location = "login.asp";
}

function online()
{
	window.open ("http://www.hp.com"); 	
}