var str_set = "设置";
var str_set_ok = "成功！";
var str_set_failed = "失败！";
var set_sure_reset = "确定要重置交换机！";
var div_navigatortab;

function setCurTableIndex(TableIndex,LevelIndex)
{	//console.log(TableIndex);
    top.CurTableIndex = TableIndex;
	top.CurLevelIndex = LevelIndex
    parent.window.frames[2].location.reload();
}

function getCookie(sName)
{	//console.log(document.cookie);
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
        {
            return aCrumb[1];
        }
    }
    return null;
}

function LoginUser(sName)
{
    try
    {
        var login_user = getCookie(sName).split("|");
        return login_user[0];
    }
    catch(E){}
    return "";
}

function getUserLevel(sName)
{
    try
    {	//console.log("Nicholas");console.log(getCookie(sName));
        var login_user = getCookie(sName).split("|");
        //return login_user[5];
		return 3;
    }
    catch(E){}
    return "";
}

function showUserLevel1()
{	
    document.getElementById("div_navigatortab").innerHTML = NewBuildNavigatorTab(top.CurTableIndex, top.CurLevelIndex, 0);
}

function init()
{	
//document.cookie = "user=admin|admin|guest|0|24|3";//console.log(document.cookie);
    div_navigatortab = document.getElementById("div_navigatortab");
    showUserLevel1();
    //top.g_cur_main_url = window.location.href;console.log(top.g_cur_main_url);
    //document.getElementById("page_body").style.visibility = "visible";
}

function resetConfig()
{
    if (makeSure())
    {
        alert("do reset switch, no support");
        alert(str_set + str_set_ok);
    }
}

function makeSure()
{
    if (confirm(set_sure_reset))
    {
        return true;
    }
    return false;
}