var ie = document.all;
var ns6 = document.getElementById && !document.all;
var isMenu = false ;
var overpopupmenu1 = false;
var overpopupmenu2 = false;
var currentMenu;
var Normal_level = 0;
var Privileged_level = 15;

function getMenuArray(menu_num)
{
    var dataArr;
    switch (menu_num)
    {
        case "0":
            dataArr = new Array
            (
                new Array("系统管理", "Tab_systemInfo", "", Normal_level),
                new Array("端口管理", "", "", Normal_level),
                new Array("协议配置", "", "", Privileged_level),
                new Array("VLAN", "Tab_vlan", "", Normal_level),
                new Array("MAC", "Tab_mac", "", Normal_level),
                new Array("QoS", "Tab_qos", "", Normal_level),
                new Array("ACL", "", "", Normal_level),
//              new Array("电缆诊断", "Tab_cable", "", Normal_level),
                new Array("安全专区", "Tab_security", "", Normal_level),
                new Array("网吧专区", "Tab_netbar", "", Normal_level),
                new Array("企业专区", "Tab_enterprise", "", Normal_level),
                new Array("&nbsp;", "<hr>", "", Normal_level),
                new Array("保存配置", "Tab_save", "", Privileged_level)
            );
            break;
        case "0_1":
            dataArr = new Array
            (
                new Array("端口设置", "Tab_port_set", "", Normal_level),
                new Array("端口汇聚", "Tab_port_aggr", "", Normal_level),
                new Array("端口镜像", "Tab_port_monitor", "", Normal_level),
                new Array("端口统计", "Tab_port_statistics", "", Normal_level),
                new Array("端口限速", "Tab_port_rate", "", Normal_level)
            );
            break;
        case "0_2":
            dataArr = new Array
            (
                new Array("IGMP Snooping", "Tab_protoco_igmp", "", Privileged_level),
                new Array("802.1X", "Tab_protoco_dot1x", "", Privileged_level),
                new Array("Radius Client", "Tab_protoco_radius", "", Privileged_level),
                new Array("Spanning Tree ", "Tab_protoco_stp", "", Privileged_level),
//              new Array("Voice VLAN", "Tab_protoco_vvlan", "", Privileged_level),
                new Array("LACP", "Tab_protoco_lacp", "", Privileged_level)
            );
            break;
        case "0_6":
            dataArr = new Array
            (
                new Array("定义ACL ", "Tab_acl_set", "", Normal_level),
//              new Array("IP Based ACL ","Tab_acl_ip","",Normal_level),
                new Array("端口绑定", "Tab_acl_bind", "", Normal_level),
                new Array("VLAN绑定", "Tab_acl_bind_vlan", "", Normal_level)
            );
            break;
        default :
            return;
    }
    return dataArr;
}

function hideMenu(level)
{
    var overpopupmenu;
    switch (level)
    {
        case 1:
            overpopupmenu = overpopupmenu1;
            if (overpopupmenu == false)
            {
                isMenu = false ;
                overpopupmenu1 = false;
                clearContext(level);
                clearContext(level + 1);
                UnLightMenu(level - 1);
            }
        case 2:
            overpopupmenu = overpopupmenu2;
            if (overpopupmenu == false)
            {
                isMenu = false ;
                overpopupmenu2 = false;
                clearContext(level);
                UnLightMenu(level - 1);
                return true ;
            }
            break;
        case 'all':
            overpopupmenu1 = false;
            overpopupmenu2 = false;
            clearContext(1);
            clearContext(2);
            UnLightMenu(0);
            isMenu = false ;
            return true ;
    }
    return false;
}

function clearContext(level)
{
    setTimeout("", 1000);
    top.document.getElementById("menudiv" + level).innerHTML = "";
    top.document.getElementById("menudiv" + level).style.display = "none" ;
}

function writeMenu(menuNum,level)
{
    var arr;
    var menuHTML = "";
    var classnameStr = '"Bborder"';
    if (level == 0)
    {
        arr = getMenuArray("0");
        menuHTML += ' <table id="itemTable0" cellspacing=0 cellpadding=3 width="130"><TR><TD>&nbsp;&nbsp;</TD></TR>';
    }
    else
    {
        switch (level)
        {
            case 1:
            {
                arr = getMenuArray(menuNum);
                var arrM_N = menuNum.split("_");
                var menuN = parseInt(arrM_N[1]);
                break;
            }
            case 2:
            {
                arr = getMenuArray(menuNum);
                var arrM_N = menuNum.split("_");
                var menuN = parseInt(arrM_N[1]);
                var subMenuN = parseInt(arrM_N[2]);
                break;
            }
        }
        currentMenu = menuNum;
        menuHTML += '<div id="menudiv' + level + '_' + menuNum + '" ';
        menuHTML += ' style="position:relative;';
        menuHTML += ' display:none; background-color: #cdcdcd';
        menuHTML += ' top: 20px; left: 0px; z-index:105;"';
        menuHTML += ' class="popupMenu"';
        menuHTML += ' onMouseOver="javascript:overpopupmenu' + level + '=true"';
        menuHTML += ' onMouseOut="javascript:self.setTimeout(\'\',500);overpopupmenu' + level + '=false"';
        menuHTML += ' ><table id="itemTable' + level + '" cellspacing=0 cellpadding=3 style="background-color: #cdcdcd">';
    }
    var submenuCounter = 0;
    var mouseOverStr = "";
    var mouseOutStr = "";
    for (i = 0; i < arr.length; i++)
    {
        var idStr = 'menuItem' + level + ((level > 0) ? ('_' + menuN) : '') + ((level == 2) ? ('_' + subMenuN) : '') + '_' + i;
        if (arr[i][3] > accessLevel)
        {
            //menuArray访问等级控制,权限不足不显示
            continue;
        }
        if (arr[i][1] == "<hr>")
        {
            var textStr = '>' + arr[i][0];
            menuHTML += '<TR><TD id='+ idStr
                        + ' align="middle" onMouseOver="hideMenu(\'all\')"'
                        + textStr
                        + '</TD></TR>';
        }
        else
        {
            if (arr[i][1].length == 0) // -> A link to SubMenu (And not for a page).
            {
                var mouseOverStr = ' onMouseOver="ShowPopupMenu(this,' + (level + 1) + ',\'' + menuNum + '_' + i + '\')"';
                var mouseOutStr = ' onMouseOut="SetHideTimer();"';
                var onclickStr = '';
                var textStr = '><IMG SRC="images/submenu.gif" border=0 style="item" align="right"><nobr>&nbsp;&nbsp;&nbsp;&nbsp;' + arr[i][0] + '&nbsp;&nbsp;</nobr>';
            }
            else //A link to a page.
            {
                if (arr[i][2] != "Help")
                {
                    if (arr[i][1].length > 0 && level == 0)
                    {
                        var mouseOverStr = ' onMouseOver="hideMenu(\'all\');highlightItem(this)"';
                        var mouseOutStr = ' onMouseOut="SetHideTimer();unhighlightItem(this,' + level + ');"';
                    }
                    else
                    {
                        var mouseOverStr = ' onMouseOver="hideMenu(' + (level + 1) + ');highlightItem(this)"';
                        var mouseOutStr = ' onMouseOut="SetHideTimer();unhighlightItem(this,' + level + ');"';
                    }
                }
                else
                {
                    var mouseOverStr = ' onMouseOver="hideMenu(\'all\');highlightItem(this)"';
                    var mouseOutStr = ' onMouseOut="SetHideTimer();unhighlightItemNoMenu(this,' + level + ');"';
                }
                var onclickStr = ' onClick=" currTabNum=0; linkToHtm(\'' + arr[i][1] + '\');hideMenu(\'all\');"';
                var textStr = '><nobr>&nbsp;&nbsp;&nbsp;&nbsp;' + arr[i][0] + '&nbsp;&nbsp;&nbsp;&nbsp;</nobr>';
            }
            menuHTML += '<TR><TD id=' + idStr
                        +' class=' + classnameStr
                        + mouseOverStr
                        + mouseOutStr
                        + onclickStr
                        + textStr
                        + '</TD></TR>';
        }

        if ('保存配置' == arr[i][0])
        {
            menuHTML += '<tr><td class="RememberSave"><b>&nbsp;注意：</b><BR>&nbsp;重启前请保存</td></tr>';
        }
    }

    if (level == 0)
    {
        menuHTML += '</table>';
    }
    else
    {
        menuHTML += '</table><iframe src="images/blank2.gif" style="position:absolute;visibility:inherit; top:0px; left:0px; width:99%; height:100%; z-index:-1;opacity:.0;filter: alpha( opacity=0 ); -moz-opacity: 0;"></iframe></div>';
    }

    return menuHTML;
}

function ShowPopupMenu(currentObj, level, menuNum)
{
    var overpopupmenu;

    switch (level)
    {
        case 1:
            overpopupmenu = overpopupmenu1;
            break;
        case 2:
            overpopupmenu = overpopupmenu2;
            break;
    }

    var menuPosTop = parseInt(document.getElementById('menudiv' + level).style.top);
    var menuPosLeft = parseInt(document.getElementById('menudiv' + level).style.left);
    var pTop = 0;
    var pLeft = 0;

    if (level == 2)
    {
        var nameParentDiv;
        var arrM = menuNum.split("_");
        nameParentDiv = 'menudiv' + (level - 1);
        for (var i = 0; i < arrM.length - 1; i++)
        {
            nameParentDiv += '_' + arrM[i];
        }
        var parentObj = document.getElementById(nameParentDiv);
        pTop = parentObj.offsetTop + 1;
        pLeft = parentObj.offsetLeft + parentObj.offsetWidth - 5;
    }

    var isHide=false;
    if (isMenu == true)
    {
        if (overpopupmenu == false)
        {
            hideMenu(level + 1);
            hideMenu(level);
            isHide = true;
        }
    }
    else
    {
        isHide = true;
    }

    if (isHide)
    {
        UnLightMenu(level - 1);
        highlightItem(currentObj);
        var divObj = document.getElementById('menudiv' + level);
        divObj.innerHTML = writeMenu(menuNum, level);
        document.getElementById('menudiv' + level + '_' + menuNum).style.top = (level == 2) ? (pTop + currentObj.offsetTop) : currentObj.offsetTop;
        document.getElementById('menudiv' + level + '_' + menuNum).style.left = (level == 2) ? (pLeft + currentObj.offsetLeft) : currentObj.offsetLeft;
        document.getElementById('menudiv' + level + '_' + menuNum).style.display = "block";
        divObj.style.display = "block" ;
        isMenu = true;
        return true;
    }
    return false;
}

function highlightItem(currentObj)
{
    currentObj.style.backgroundColor = '#FFCC00';
    isMenu = true;
}

function unhighlightItem(currentObj, level)
{
    if (level > 0)
    {
        currentObj.style.backgroundColor = '#cdcdcd';
    }
    else
    {
        currentObj.style.backgroundColor = '';
    }
    isMenu = false;
}

function unhighlightItemNoMenu(currentObj, level)
{
    currentObj.style.backgroundColor='';
}

function UnLightMenu(level)
{
    //If there is not current menu open - return.
    if (!currentMenu)
    {
        return;
    }
    switch (level)
    {
        case 2:
            {
                var arrM_N = currentMenu.split("_");
                var menuN = parseInt(arrM_N[1]);
                var subMenuN = parseInt(arrM_N[2]);
                var arr = getMenuArray(currentMenu);
                var menuLen = arr.length;
                for (i = 0; i < menuLen; i++)
                {
                    if (top.document.getElementById('menuItem' + level + '_' + menuN + '_' + subMenuN + '_' + i) != null)
                    {
                        top.document.getElementById('menuItem' + level + '_' + menuN + '_' + subMenuN + '_' + i).style.backgroundColor = '#cdcdcd';
                    }
                }
                break;
            }
        case 1:
            {
                var arrM_N = currentMenu.split("_");
                var menuN = parseInt(arrM_N[1]);
                var menuLen = 20; // MAX Menu Len
                for (i = 0; i < menuLen; i++)
                {
                    if (top.document.getElementById('menuItem' + level + '_' + menuN + "_" + i) != null)
                    {
                        top.document.getElementById('menuItem' + level + '_' + menuN + "_" + i).style.backgroundColor = '#cdcdcd';
                    }
                }
                break;
            }
        case 0:
            {
                var arr = getMenuArray("0");
                var menuLen = arr.length;
                for (i = 0; i < menuLen; i++)
                {
                    if (top.document.getElementById('menuItem' + level + "_" + i) != null)
                    {
                        top.document.getElementById('menuItem' + level + "_" + i).style.backgroundColor = '';
                    }
                }
                break;
            }
    }
}

var TimerInterval = 2000;
var HandleTimer = null;

function SetHideTimer()
{
    var strCurrentPage = "";
    if (currentTabName != "")
    {
        var arrTab = top.getTabArray(currentTabName);
        strCurrentPage = parent.TitlePath + " [ " + arrTab[parent.currTabNum][0] + " ]";
    }
    ClearHideTimer();
//  SetRouterBarStr(strCurrentPage);
    HandleTimer = window.setTimeout("hideMenu('all');", TimerInterval);
}
function ClearHideTimer()
{
    if (HandleTimer != null)
    {
        window.clearTimeout(HandleTimer);
    }
    HandleTimer = null;
}