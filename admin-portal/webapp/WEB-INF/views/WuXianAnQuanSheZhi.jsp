
<!-- saved from url=(0030)http://192.168.0.254/index.asp -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>HP-中国|计算机，笔记本电脑，服务器，打印机，更多</title>
<script language="javascript" type="text/javascript" src="./WuXianAnQuanSheZhi_files/common_util.js"></script>
<script language="JavaScript" type="text/javascript">
var user_level = 0;
var portNo = 24;
var normalPortNo = 24 - 2;
var parent_portlag = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);//端口聚合组号
var linkLock = 0;
var accessLevel = 0;
var manager_user = false;
var CurTableIndex = 0;
var CurLevelIndex = 0;
var timeInter = setInterval("checkTimeOut();", 10000);
if(1 == user_level)
{
    accessLevel = 15;
    manager_user = true;
}
var transerr = "文件传输失败";

var RJ45_Normal = "url(images/ports/RJ45_0.gif)";
var RJ45_NoLink = "url(images/ports/RJ45_0.gif)";
var SFP_NoLink = "url(images/ports/SFP_0.gif)";
var RJ45_Inactive = "url(images/ports/RJ45_3.gif)";
var SFP_Inactive = "url(images/ports/SFP_3.gif)";
var RJ45_Monitor = "url(images/ports/RJ45_2.gif)";
var RJ45_Untagged = "url(images/ports/RJ45_2.gif)";
var RJ45_Selected = "url(images/ports/RJ45_2.gif)";
var SFP_Monitor = "url(images/ports/SFP_2.gif)";
var SFP_Untagged = "url(images/ports/SFP_2.gif)";
var SFP_Selected = "url(images/ports/SFP_2.gif)";

function hideMenu(level)
{
    return;
}

function checkTimeOut()
{
    var parm = "";
    parm += "?rand=" + Math.random();
    var xmlhttp = new XMLHttp();
    xmlhttp.sendRequest("cgi/check_timeout" + parm, "", checkTimeOutResult);
}

function checkTimeOutResult(s)
{
    var ret = evalJSON(s)
    if (ret == 20)
    {
        location.reload();
    }
}

function stopChkTimeOut()
{
    clearInterval(timeInter);
}

function restartChkTimeOut()
{
    timeInter = setInterval("checkTimeOut();", 10000);
}

var env = "close";
window.onbeforeunload = function()
{
    env = "fresh";
}

var navagent = navigator.userAgent;

window.onunload = function()
{
    if (env == "fresh")
    {
        if (navagent.indexOf("MSIE") > 0)
        {
            if (window.screenLeft > 10000)
            {
                Logout();
            }
            else
            {
            }
        }
        if (navagent.indexOf("Firefox") > 0)
        {
            var clHeight = document.body.clientHeight;
            if (clHeight == 0)
            {
                Logout();
            }
            else
            {
            }
        }
    }
    else
    {
        Logout();
    }
}

function Logout()
{
    top.location = "cgi/logout";
}

function logoutResult(s)
{
}



</script>
</head>
<frameset rows="90, *" cols="*" framespacing="0" frameborder="0" border="0">
<frame name="title" scrolling="no" target="contents" src="./WuXianAnQuanSheZhi_files/title.htm" marginwidth="0" marginheight="0" noresize="">
<frameset rows="*" cols="180, *">
<frame name="contents" noresize="" target="main" src="./WuXianAnQuanSheZhi_files/menu_admin.htm" marginwidth="0" marginheight="0" scrolling="auto">
<frameset rows="40, *" cols="*" framespacing="0" frameborder="0" border="0">
<frame name="navigator" src="./WuXianAnQuanSheZhi_files/navigator.htm" target="navigator" scrolling="no" marginwidth="0" marginheight="0" noresize="">
<frame name="main" src="./WuXianAnQuanSheZhi_files/wireless_security.htm" target="_self" scrolling="auto" marginwidth="0" marginheight="0" noresize="">
<noframes>
&lt;body&gt;
&lt;p&gt;此网页使用了框架，但您的浏览器不支持框架。&lt;/p&gt;
&lt;/body&gt;
</noframes>
</frameset>
</frameset></frameset></html>