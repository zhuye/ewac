var arrSystemStatus00 = new Array('LAN口状态','lanStatus.asp'),
	arrSystemStatus01 = new Array('无线信息','wirelessInfo.htm'),
	arrSystemStatus02 = new Array('系统状态','sysStatus.asp'),
	systemStatusTbl = new Array(arrSystemStatus00,arrSystemStatus01,arrSystemStatus02),		//系统状态
	arrBasicSet00 = new Array('LAN口设置','lanSetting.asp'),
	basicSetTbl = new Array(arrBasicSet00),													//基本设置
	arrWlanSet00 = new Array('2.4G无线基本设置','wireless_basic.asp'),
	arrWlanSet01 = new Array('2.4G无线安全设置','wireless_security.asp'),
	wlanSetTbl = new Array(arrWlanSet00,arrWlanSet01),										//WLAN设置
	arrSysTools00 = new Array('软件升级','softwareUpgrade.asp','设备重启','devReboot.asp'),
	arrSysTools01 = new Array('网络时间','newworkTime.asp'),
	arrSysTools02 = new Array('日志管理','logManage.asp','时间与日期','system_hostname.asp'),
	arrSysTools03 = new Array('配置管理','cfgManage.asp','恢复出厂配置','system_reset.asp'),
	arrSysTools04 = new Array('用户管理','userManage.asp','登录超时设置','loginovertime.asp'),
	arrSysTools05 = new Array('诊断工具','diagnoseManage.asp'),
	sysToolsTbl = new Array(arrSysTools00,arrSysTools01,arrSysTools02,arrSysTools03,arrSysTools04,arrSysTools05),	//系统工具
	allTbl = new Array(
    systemStatusTbl,    //0
    basicSetTbl,		//1
    wlanSetTbl,      	//2
    sysToolsTbl         //3
   
    ),

	userlvl = new Array(
    "undefined",
    "普通用户",
    "操作员",
    "管理员"
    );

function NewselectTab(TableIndex, LevelIndex, TabIndex)
{	//console.log("Nicholas0");//console.log(TableIndex);console.log(LevelIndex+100);console.log(TabIndex);
    document.getElementById("div_navigatortab").innerHTML = NewBuildNavigatorTab(TableIndex, LevelIndex, TabIndex);
}

function NewBuildNavigatorTab(TableIndex, LevelIndex, TabIndex)
{	//console.log(TableIndex);console.log(LevelIndex);console.log(TabIndex);
    var arrGroup = allTbl[TableIndex][LevelIndex];//console.log(arrGroup);

    var curTab = TabIndex;
    var itemActive = '<td nowrap class=navigatorActive><A target=main HREF=%URL% onclick=NewselectTab(%TableIndex%,%LevelIndex%,%TabIndex%) class=select>%TEXT%</a></td>';
    var itemActLeft = '<td align=right valign=top nowrap bgcolor=#0096db class=navigatorNormal><img src=images/tab_l.gif></TD>';
    var itemActRight = '<td align=right valign=top nowrap bgcolor=#0096db class=navigatorNormal><img src=images/tab_r.gif></TD>';
    var itemNormal = '<td nowrap class=navigator><A target=main HREF=%URL% onclick=NewselectTab(%TableIndex%,%LevelIndex%,%TabIndex%) class=unselect>%TEXT%</a></td>';
	var itemLeft = '<td align=right valign=top nowrap bgcolor=#dfdfdf class=navigatorNormal><img src=images/tab_l.gif></TD>';
    var itemRight = '<td align=right valign=top nowrap bgcolor=#dfdfdf class=navigatorNormal><img src=images/tab_r.gif></TD>';
    var navigatorBanner = '<table width=100% height=18 border=0 cellpadding=0 cellspacing=0>'
                          +'<tr><td nowrap class=navigatorNormal>&nbsp;</TD>'+'%ITEM%'
                          +'<td width=100% align="right" style="vertical-align:middle" class="navigatorNormal"><table border="0" cellSpacing="0"><tr><td id="in_td_login_user" style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; letter-spacing: -1pt;" nowrap>登录用户:</td><td nowrap style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; color: #00FF00; FONT-WEIGHT: bold;">'
                          + LoginUser("user") + '</td><td width="10"></td><td id="in_td_login_user_level" style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; letter-spacing: -1pt;" nowrap>等级:</td><td nowrap style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; color: #00FF00; FONT-WEIGHT: bold;">' + userlvl[getUserLevel("user")] + '</td></tr></table></td>'
                          +'</tr></table>';			
    var itemCount = (arrGroup.length / 2);  		 
	//console.log(itemCount);
    var tdStr = '';

    for (i = 0; i < itemCount; i++)
    {
        j = (i+1) * 2;
        if (i == curTab)
        {
            myItemStr = itemActive.replace('%URL%', arrGroup[j - 1]);
            myItemStr = myItemStr.replace('%TEXT%', arrGroup[j - 2]);
            myItemStr = myItemStr.replace('%TableIndex%', TableIndex);
            myItemStr = myItemStr.replace('%LevelIndex%', LevelIndex);
            myItemStr = myItemStr.replace('%TabIndex%', i);
            tdStr += itemActLeft;
            tdStr += myItemStr;
            tdStr += itemActRight;
        }
        else
        {
            myItemStr = itemNormal.replace('%URL%', arrGroup[j - 1]);
            myItemStr = myItemStr.replace('%TEXT%', arrGroup[j -2]);
            myItemStr = myItemStr.replace('%TableIndex%', TableIndex);
            myItemStr = myItemStr.replace('%LevelIndex%', LevelIndex);
            myItemStr = myItemStr.replace('%TabIndex%', i);
            tdStr += itemLeft;
            tdStr += myItemStr;
            tdStr += itemRight;
        }
    }
    navigatorBanner = navigatorBanner.replace('%ITEM%', tdStr);
    return navigatorBanner;
}

function selectTab(arrGroup, curTab)
{	//console.log("Nicholas");
    document.getElementById("div_navigatortab").innerHTML = buildNavigatorTab(arrSystem34, curTab);
}

function buildNavigatorTab(arrGroup, curTab)
{	//console.log("Nicholas");
    var itemActive = '<td nowrap class=navigatorActive><A target=main HREF=%URL% onclick=selectTab(1,%TAB%) class=select>%TEXT%</a></td>';
    var itemNormal = '<td nowrap class=navigator><A target=main HREF=%URL% onclick=selectTab(1,%TAB%) class=unselect>%TEXT%</a></td>';
    var itemActLeft = '<td align=right valign=top nowrap bgcolor=#0096db class=navigatorNormal><img src=images/tab_l.gif></TD>';
    var itemActRight = '<td align=right valign=top nowrap bgcolor=#0096db class=navigatorNormal><img src=images/tab_r.gif></TD>';
    var itemLeft = '<td align=right valign=top nowrap bgcolor=#dfdfdf class=navigatorNormal><img src=images/tab_l.gif></TD>';
    var itemRight = '<td align=right valign=top nowrap bgcolor=#dfdfdf class=navigatorNormal><img src=images/tab_r.gif></TD>';
    var navigatorBanner = '<table width=100% height=18 border=0 cellpadding=0 cellspacing=0>'
                          + '<tr><td nowrap class=navigatorNormal>&nbsp;</TD>'+'%ITEM%'
                          + '<td width=100% align="right" class=navigatorNormal><table border="0" cellSpacing="0"><tr><td id="in_td_login_user" nowrap style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; letter-spacing: -1pt;">登录用户:</td><td nowrap style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; letter-spacing: -1pt;">'
                          + LoginUser("user") + '</td><td width="10"></td><td id="in_td_login_user_level" style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; letter-spacing: -1pt;" nowrap>等级:</td><td nowrap style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; color: #00FF00; FONT-WEIGHT: bold;">'
                          + userlvl[getUserLevel("user")] + '</td></tr></table></td>'
                          +'</tr></table>';
    var itemCount = arrGroup.length / 2;
    var tdStr = '';

    for (i = 1; i < itemCount + 1; i++)
    {
        j = (i - 1) * 2;
        if (i == curTab)
        {
            myItemStr = itemActive.replace('%URL%', arrGroup[j + 1]);
            myItemStr = myItemStr.replace('%TEXT%', arrGroup[j]);
            myItemStr = myItemStr.replace('%GROUP%', arrGroup);
            myItemStr = myItemStr.replace('%TAB%', i);
            tdStr += itemActLeft;
            tdStr += myItemStr;
            tdStr += itemActRight;
        }
        else
        {
            myItemStr = itemNormal.replace('%URL%', arrGroup[j + 1]);
            myItemStr = myItemStr.replace('%TEXT%', arrGroup[j]);
            myItemStr = myItemStr.replace('%GROUP%', arrGroup);
            myItemStr = myItemStr.replace('%TAB%', i);
            tdStr += itemLeft;
            tdStr += myItemStr;
            tdStr += itemRight;
        }
    }
    navigatorBanner = navigatorBanner.replace('%ITEM%', tdStr);
    return navigatorBanner ;
}