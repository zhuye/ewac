/**
  * @方法 init
  * @参数 （objec）f 要初始化的表单对象
  * @描述 根据f的id来确定调用不同的初始化函数。
  */
function init(f)
{
	var op_id = f.id;
	switch (op_id) {
		case 'upgrade_reboot':
			initUpgradeReboot();
			break;
		case 'direct_reboot':
			initDirectrReboot(f);
			break;
		case 'system_password':
			initSystemPassword(f);
			break;
		case 'system_backup':
			;
			break;
		case 'system_hostname':
			initSystemHostname(f);
			break;
		case 'policy_upgrade':
			/*合并两种情况*/
		case 'system_upgrade':
			initSystemUpgrade(f);
			break;
		default: ;
	}
}

/**
  * @方法 preSubmit
  * @参数 （objec）f 要操作的表单对象
  * @描述 根据f的id来确定调用不同的提交函数。
  */
function preSubmit(f)
{
	var op_id = f.id;
	switch (op_id) {
		case 'system_restore':
			submitSystemRestore(f);
			break;
		case 'system_reboot':
			submitSystemReboot(f);
			break;
		case 'system_password':
			submitSystemPassword(f);
			break;
		case 'system_backup':
			submitSystemBackup(f);
			break;
		case 'system_hostname':
			submitSystemHostname(f);
			break;
		case 'policy_upgrade':
			/*合并两种情况*/
		case 'system_upgrade':
			submitSystemUpgrade(f);
			break;
		default: ;
	}
}

/**
  * @方法 initUpgradeReboot
  * @所属页面 upgrading.asp
  * @参数 （objec）f 要初始化的表单对象
  * @描述 调用父框架中reboot，显示正在重启的进度条。
  */
function initUpgradeReboot(f)
{
	var url = "http://" + lanip;
	if (upgrade_sslenable == 1) {
		url = "https://" + lanip;
	}
	window.parent.reboot(url,200,upgrade_sslenable,1);
}

/**
  * @方法 initDirectrReboot
  * @所属页面 directr_reboot.asp
  * @参数 （objec）f 要初始化的表单对象
  * @描述 调用父框架中reboot，显示正在重启的进度条。
  */
function initDirectrReboot(f)
{
	var url = "http://" + lanip;
	if (sslenable == 1) {
		url = "https://" + lanip;
	}
	window.parent.reboot(url,420,sslenable);
}

/**
  * @方法 initSystemRestore
  * @所属页面 system_restore.asp
  */
function initSystemRestore(f) {}

/**
  * @方法 submitSystemRestore
  * @所属页面 system_restore.asp
  * @参数 （objec）f 要操作的表单对象
  * @描述 验证数据，并向后台提交数据。
  */
function submitSystemRestore(f) {
	if(window.confirm("设备将自动重启！ip将更新为：192.168.0.254，密码更新为：admin。如果页面没有刷新请更新您电脑的网络设置后重新登录！"))
	{
		f.submit() ;
   	} 
}

/**
  * @方法 submitSystemReboot
  * @所属页面 system_reboot.asp
  * @参数 （objec）f 要操作的表单对象
  * @描述 验证数据，并向后台提交数据,页面跳转到direct_reboot.asp。
  */
function submitSystemReboot(f) {   
	
		var url = "http://" + lanip;
		var my_data = "CMD=SYS_CONF&CCMD=0";
		
		$.ajax({
			type: "POST",
			url: "/goform/SysToolReboot",
			data:my_data,
			success: function(msg)
			{
			}
		}); 
}

/**
  * @方法 initSystemPassword
  * @所属页面 system_password.asp
  * @参数 （objec）f 要初始化的表单对象
  * @描述 在html元素加载完成后运行，初始化页面元素的值。
  */
function initSystemPassword(f){
	//window.parent.initUserName(getCfg('SYSUN'));
	cfg2Form(f);
	f.SYSUN.value = "";
    f.SYSOPS.value = "";
}

/**
  * @方法 preSubmit
  * @所属页面 system_password.asp
  * @参数 （objec）f 要操作的表单对象
  * @描述 验证数据，并向后台提交数据。
  */
function submitSystemPassword(f) { 
	if(!numberCharAble(f.SYSUN1,"新用户名中")) {
		return ;
	}
	if (!chkStrLen(f.SYSPS,1,32,"密码") || !numberCharAble(f.SYSPS2,"新密码中") ) {
		return ;
	}
	if(!numberCharAble(f.SYSPS2,"确认新密码中")) {
		return ;
	}
	if (f.SYSPS.value!=f.SYSPS2.value){
		alert("新密码与确认新密码不一致，请重新输入！");
		return false;
	}
    /*if (!chkPwdUpdate(f.SYSPS,f.SYSPS2,f.SYSPSC)) {
		return ;
	}*/
	form2Cfg(f);
	/*if (f.SYSPSC.value=='1') {// if passwd changed, send old passwd too
		addFormElm("CPW",f.SYSOPS.value);
	}*/
	f.submit();
}

/**
  * @方法 UpLoadCfg
  * @所属页面 system_backup.asp
  * @描述 验证要导入的配置文件类型，如果正确导入文件
  */
function UpLoadCfg()
{
	var tmp = document.frmSetup.fileCfg.value.toLowerCase(); 
	var arr = tmp.split(".");
	/*	alert(arr);*/
	if (arr[0] =="")
	{
		alert("请首先选择导入的文件!");
		return ;
	}
	else if(arr[arr.length-1] != "cfg"){
		alert("导入文件的后缀为cfg!");
		return;
	}
	
	if(confirm("导入后,需要重新启功!"))
	{
		document.frmSetup.submit() ;
	}
}

/**
  * @方法名称  UpLoadCfg
  * @所属页面  system_backup.asp
  * @功能描述  导出的配置文件，并默认把他保存电脑中的我的文档文件夹里。
  */
function DownLoadCfg()
{
	if(confirm("导出配置参数,请指定保存参数的路径!"))
	{
		refresh("/cgi-bin/DownloadCfg/RouterCfm.cfg");
	}
}

/**
  * @方法 init
  * @所属页面 system_hostname.asp
  * @参数 （objec）f 要初始化的表单对象
  * @描述 在html元素加载完成后运行，初始化页面元素的值。
  */
function initSystemHostname(f){
	var t = time.split("-");
	f.year.value = t[0];
	f.month.value = t[1];
	f.day.value = t[2];
	f.hour.value = t[3];
	f.minute.value = t[4];
	f.second.value = t[5];
	cfg2Form(f);
}

/**
  * @方法 preSubmit
  * @所属页面 system_hostname.asp
  * @参数 （objec）f 要操作的表单对象
  * @描述 验证数据，并向后台提交数据。
  */
var time_arr = ['f.year','f.month','f.day','f.hour','f.minute','f.second'];
function submitSystemHostname(f) {
	/*if (!strCheck(f.HN,"主机名")) {
		return;
	}
	if (!strCheck(f.DN,"域名")) {
		return;
	}*/
	form2Cfg(f);
	
	var sy = trim(f.year.value);
	var smo = trim(f.month.value);
	var sd = trim(f.day.value);
	var sh = trim(f.hour.value);
	var smi = trim(f.minute.value);
	var ss = trim(f.second.value);
	
	for (var k = 0; k < time_arr.length; k++) {
		var my_obj = eval(time_arr[k]);
		var my_value = my_obj.value;
		var my_number = Number( trim(my_value) );
		
		if (my_number < 0) {
			alert("输入的值必须大于0");
			my_obj.value = '';
			my_obj.focus();
			return ;
		}
	}
	if(sy < 1970 || sy > 2037)
	{
		alert("时间设置超出范围，应在1970～2037之间！");
		return false;
	}
	if(sy.length<4 || Number(smo)>12 || smo.length<1 || sd.length<1)
	{
		alert("请输入合法的年月日");
		return ;
	}
	if(smo==0||smo==00)
	{
		alert("请输入合法的月");
		return ;
	}
	if(sd==0||sd==00)
	{
		alert("请输入合法的日");
		return ;
	}
	if(Number(smo) == 2)//2月
	{
		if(Number(sd) > 29)
		{
			alert("请输入合法的日");
			return ;
		}
	}
	else if(Number(smo)==4 || Number(smo)==6 || Number(smo)==9 || Number(smo)==11)//4.6.9.11
	{
		if(Number(sd)>30)
		{
			alert("请输入合法的日");
			return ;
		}
	}
	else//1.3.5.7.8.10.12
	{
		if(Number(sd)>31)
		{
			alert("请输入合法的日");
			return ;
		}
	}
	
	if(Number(sh)>23 || Number(smi)>59 || Number(ss)>59)
	{
		alert("请输入合法的时间");
		return ;
	}
	if (f.check.checked){
		f.check.value = 'on';
	} else {
		f.check.value = "";
	} 
	f.submit();
}

/**
  * @方法 cplocaltime
  * @所属页面 system_hostname.asp
  * @描述 获取本地时间，并填充到相应表单元素中。
  */
function cplocaltime() {
	var today=new Date(); 
	var f=document.frmSetup;
	
	f.year.value = today.getFullYear().toString();
	f.month.value = today.getMonth()+1; 
	f.day.value =today.getDate(); 
	f.hour.value = today.getHours(); 
	f.minute.value = today.getMinutes();
	f.second.value = today.getSeconds();
	cfg2Form(f);
}

/**
  * @方法 init
  * @所属页面 system_upgrade.asp
  * @参数 （objec）f 要初始化的表单对象
  * @描述 在html元素加载完成后运行，初始化页面元素的值。
  */
function initSystemUpgrade(f){
	f.reset();
}

/**
  * @方法 systemUpgrade
  * @所属页面 system_hostname.asp
  * @参数 （objec）f 要操作的表单对象
  * @描述 验证数据，并向后台提交数据。
  */
function submitSystemUpgrade(){
	if (document.frmSetup.upgradeFile.value == "")
	{
		alert("请首先选择升级文件!");
		return ;
	}
	if(confirm('您确信要升级吗?')){
	   document.getElementById("fwsubmit").disabled = true;
	   document.frmSetup.submit() ;
	} 	
}
