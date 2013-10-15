function dayWriteMap(v1,v2,v3,v4,v5,v6,v7) {
   return (v1|(v2<<1)|(v3<<2)|(v4<<3)|(v5<<4)|(v6<<5)|(v7<<6));	
}

function dayReadMap(v, i) {
  return((v>>i)&1);
}

function macsCheck(I,s){
    var m = /[0-9a-fA-F\:]{17}/;
    if(I.length!=17 || !m.test(I)){
   	    alert(s+" 错误  !!!");
   	    I.value = I.defaultValue;
   	    return false
    }
    return true
}

function validNumCheck(v,m) {
	var t = /^[0-9]{1,}$/;
	if (!t.test(v.value)) {
		alert(m+" 不是数字 !!!");
		v.value=v.defaultValue;
		return 0;
	}
	return 1 ;
}

function rangeCheck(v,a,b,s) {

   if (!validNumCheck(v,s)) return 0;          
   if ((v.value<a)||(v.value>b)) {	
      alert(s+" 超出范围 !!!") ;
      v.value=v.defaultValue ;
      return 0 ;
   } else return 1 ;
}

function pmapCheck(v,m){
	var t = /[^0-9,-]{1,}/;
	if (t.test(v.value)) {
		alert("非法端口出现在第"+m) ;
		return 0;
	}             
	return 1 ;
}

function strCheck(s,msg) {
	return true;
}

function scCheck(s,msg) {
	var ck=/[\;]/;
	if (ck.test(s.value)) {
		alert(msg+" 包含无效字符: \;");
		return false;
	}
	return true;
}

function refresh(destination) {
   window.location = destination ;		
}

function decomList(str,len,idx,dot) {  
	var t = str.split(dot);
	return t[idx];
}

function decomListLen(str, dot){
	var t = str.split(dot);
	return t.length;
}

function typeToIdx(type) {
	if (type=="tcp/udp") {
		return 2 ;
	} else if(type=="udp") {
     	return 1 ;
	} else { 
		return 0 ;
	}
}

function IdxToType(idx) {
	if (idx == 2) {
		return "tcp/udp";
	} else if(idx == 1) {
		return "udp";
	} else {
		return "tcp";
	}
}

function boolToType(bool) {
   if (bool) {
      return "tcp";
   }else {
	   return "udp";
   }
}

function boolToStr(bool) {
   if (bool){
      return "1";
   } else {
	   return "0";
   }
}

function keyCheck(F){

   	var ok = 1 ;
	var cmplen;
	var i;

	for (i=1;i<5;i++) if (F.WEPDefKey[i-1].checked) break;
	var k=eval('F.key'+i);
  
   	if (F.wep_type.selectedIndex==0) {
		cmplen=10;
	} else {
		cmplen=26;
	}
	if (k.value.length!=cmplen) {
		alert("Length of Key"+i+" must be "+cmplen); 
		ok=0 ;
	}
   	return ok ;
}

function valueToDayIdx(value) {   
   return (value/86400) ;		
}

function valueToTimeIdx(value) {   
   return ((value/3600)%24) ;		
}

function setCheckValue(t) {   	
   if (t.checked) t.value=1 ;
   else t.value=0 ;	
}

function preLogout() 
{    
     alert("考虑安全的原因，请关闭您的浏览器!");            
     top.window.close(); 
}	

function showHidden(len) {
   var s = "" ;
   for (i=0;i<len;i++) {
      s=s+"*" ;
   }
   return s ;      			
}

function combinIP(d1,d2,d3,d4)
{
    var ip=d1.value+"."+d2.value+"."+d3.value+"."+d4.value;
    if (ip=="...") {
        ip="";
	}
    return ip;
}

function combinMAC(m1,m2,m3,m4,m5,m6)
{
    var mac=m1.value+":"+m2.value+":"+m3.value+":"+m4.value+":"+m5.value+":"+m6.value;
    if (mac==":::::") {
     	mac="";
	}
    return mac;
}

function verifyIP0(ipa,msg)
{
	var ip=combinIP2(ipa);
	if (ip=='' || ip=='0.0.0.0') {
		return true;
	}
	return verifyIP2(ipa,msg);
}

function verifyIP2(ipa,msg,subnet)
{
	var tip = /^[0-9]{1,}$/;
	var lns_ipa =ipa.value;
	ip = new Array();
	if("0.0.0.0"==lns_ipa || ""==lns_ipa){
		var msginfo = "请输入";
		msginfo += msg;
		alert(msginfo);
		return false;
	}
	if (ipa.length==4) {
		for (var i=0;i<4;i++) {
			ip[i]=ipa[i].value;
		}
	} else {
		ip=lns_ipa.split(".");
	}
	if(ip.length != 4){
		alert(msg+"错误 !!!");
		return false;
	}
	
	for(i=0;i<4;i++) {
		if(!tip.test(ip[i])) {
			alert(msg+"包含非法字符!!!") ; return 0;
		}
	}
	if(ip[0] == 0 || ip[0] == 127) {
		alert(msg+"错误 !!!");
		return false;	
	}

	if(ip[0] >=224) {
		alert(msg+"错误 !!!");
		return false;
	}
 	
    for (var i = 0; i < 4; i++) {
        d = ip[i];
        if (d < 256 && d >= 0) {
			if (i!=3 || subnet==1) {
				continue;
			} else {
 				if (d != 255 && d !=0 )
					continue;
			}
        }	
        alert(msg+"错误 !!!");
        return false;
    }
    return true;
}
function clearInvalidIpstr(ipa)
{
	var ip = new Array();
	if(ipa == ""){
		return ipa;	
	}
	ip=ipa.split(".");
	if(ip.length<4){
		return parseInt(ipa,10).toString();	
	}
	for(i=0;i<4;i++)
	{
		var tmp = parseInt(ip[i],10);
		ip[i] = tmp.toString();
	}
	ipa=ip[0]+'.'+ip[1]+'.'+ip[2]+'.'+ip[3];
	return ipa;	
}
/*
function verifyMAC(ma,s,sp){
    var t = /[0-9a-fA-F]{2}/;
	m = new Array();
	if (ma.length==6)
	{
		for (var i=0;i<6;i++)
			m[i]=ma[i].value;
	}
	else
		m=ma.value.split(":");

	if (sp) { if (m.toString()==',,,,,' ) return true; }
	for (var i=0;i<6;i++)
	{
		if (!t.test(m[i])) { alert(s+" 无效 !!!");  return false; }
    }
    return true
}
*/
function verifyMAC(ma,s,sp)
{
    var t =/^([0-9a-fA-F][02468aceACE]:){1}([0-9a-fA-F][0-9a-fA-F]:){4}([0-9a-fA-F][0-9a-fA-F])$/;

	if (!t.test((typeof(ma)=="object")?ma.value:ma)||((typeof(ma)=="object")?ma.value:ma)=="00:00:00:00:00:00") {
	 	alert(s+" 无效!!!");
	 	return false;
	}
    return true;
}

function decomMAC2(ma,macs,nodef)
{
    var re = /^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/;
    if (re.test(macs)||macs=='') {
		if (ma.length!=6){
			ma.value=macs;
			return true;
		}
		if (macs!='') {
				var d=macs.split(":");
		} else {
			var d=['','','','','',''];
		}
        for (i = 0; i < 6; i++) {
            ma[i].value=d[i];
			if (!nodef) ma[i].defaultValue=d[i];
		}
        return true;
    }
    return false;
}

function decomIP2(ipa,ips,nodef)
{
    var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (re.test(ips)) {
        var d =  ips.split(".");
        for (i = 0; i < 4; i++) {
            ipa[i].value=d[i];
			if (!nodef) ipa[i].defaultValue=d[i];
		}
        return true;
    }
    return false;
}

function combinIP2(d)
{
	if (d.length!=4) return d.value;
    var ip=d[0].value+"."+d[1].value+"."+d[2].value+"."+d[3].value;
    if (ip=="...") {
        ip="";
	}
    return ip;
}
function combinMAC2(m)
{
    var mac=m[0].value.toUpperCase()+":"+m[1].value.toUpperCase()+":"+m[2].value.toUpperCase()+":"+m[3].value.toUpperCase()+":"+m[4].value.toUpperCase()+":"+m[5].value.toUpperCase();
    if (mac==":::::") {
        mac="";
	}
    return mac;
}

function ipMskChk(mn,str)
{
	var m=new Array();
	if (mn.length==4) {
		for (i=0;i<4;i++) {
			m[i]=mn[i].value;
		}
	} else {
		m=mn.value.split('.');
		if (m.length!=4) { 
			alert(str+"无效!!!"); 
			return 0; 
		}
	}

	var v=(m[0]<<24)|(m[1]<<16)|(m[2]<<8)|(m[3]);

   	var f=0 ;	  
   	for (k=0;k<32;k++) {
		if ((v>>k)&1) {
			f = 1;
		} else if (f==1) {
			alert(str+"无效 !!!") ;
			//for(var i=0; i<4; i++) m[i].value=m[i].defaultValue;
			return 0 ;
		}
	}
	if (f==0) { 
		alert(str+"无效 !!!") ; 
		return 0;
	}

	var tmpvalue = mn.value;
	var tmp =tmpvalue.split(".");	
	for(i = 0; i < 4; i++) {		
		var t=/^\d{1,}$/;
		if(!t.test(tmp[i])) {
			alert(str+"必须为数字!!!");
			return 0;
		}	
	}
	
	return 1 ;
}

/**
  * @构造函数 Cfg
  * @参数 （string）1 要创建对象的索引号
  * @参数 （int）n    要创建对象的名称
  * @参数 （string）v 要创建对象的值
  * @描述 用构造函数Cfg构造对象。
  */
function Cfg(i,n,v) {
	this.i=i;
    this.n=n;
    this.v=this.o=v;
}

var CA = new Array() ;

/**
  * @方法 addCfg
  * @参数 （string）n 要保存对象的名称
  * @参数 （int）i 要保存对象的索引号
  * @参数 （string）v 要保存对象的值
  * @描述 把对象保存到CA数组里，其索引为i。
  */
function addCfg(n,i,v){
	CA.length++;
    CA[CA.length-1]= new Cfg(i,n,v);
}

/**
  * @方法 addCfg
  * @参数 （string）kk 对象的名称
  * @描述 求CA数组里对象的值为 'kk'的索引号。
  */
function idxOfCfg(kk) {
    if (kk=='undefined') { alert("没有定义"); return -1; }
    for (var i=0; i< CA.length ;i++) {
        if ( CA[i].n != 'undefined' && CA[i].n==kk )
            return i;
    }
    return -1;
}

/**
  * @方法 getCfg
  * @参数 （string）n 对象的名称
  * @描述 获取CA数组里对象名称为n的对象的值。
  */
function getCfg(n) {
	var idx=idxOfCfg(n)
	if ( idx >=0) {
		return CA[idx].v ;
	} else {
		return "";
	}
}

/**
  * @方法 setCfg
  * @参数 （string）n 对象的名称
  * @参数 （string）v 要修改的值
  * @描述 在CA数组里把对象名称为 n 的对象的值改成 v。
  */
function setCfg(n,v)
{
	var idx=idxOfCfg(n)
	if ( idx >=0) { //debug, if (CA[idx].v != v) alert("setCfg("+n+","+v+")");
		CA[idx].v = v ;
	}
}


/**
  * @方法 setCfg
  * @参数 （object）f 表单对象
  * @描述 从配置的CA数组里解析到表单f中 。
  */
function cfg2Form(f)
{
    for (var i=0;i<CA.length;i++)
    {
        var e=eval('f.'+CA[i].n);
        if ( e )
		{
				//alert(e.type);
			if (e.name=='undefined') continue;
			if ( e.length && e[0].type=='text' )
			{
				if (e.length==4) decomIP2(e,CA[i].v);
				else if (e.length==6) decomMAC2(e,CA[i].v);
			}
			else if ( e.length && e[0].type=='radio')
			{
				for (var j=0;j<e.length;j++)
					e[j].checked=e[j].defaultChecked=(e[j].value==CA[i].v);
			}
			else if (e.type=='checkbox') {
				e.checked=e.defaultChecked=Number(CA[i].v);
			}
			else if (e.type=='select-one'){ 
				e.value = CA[i].v;
				//e.defaultValue
/*				for (var j=0;j<e.options.length;j++) {
					 //alert(j + '时 = '+e.options[j].value==CA[i].v)
					// e.options[j].selected=e.options[j].defaultSelected=(e.options[j].value==CA[i].v);
					e.defaultValue = CA[i].v
					  e.options[j].selected=e.options[j].defaultSelected=(j == CA[i].v);
				}*/
			}
			else {
				e.value=getCfg(e.name);
			}
			if (e.defaultValue!='undefined') {
				e.defaultValue=e.value;
			}
		}
    }
}

/**
  * @方法 form2Cfg
  * @参数 （object）f 表单对象
  * @描述 从表单f中解析到配置的CA数组里 。
  */
var frmExtraElm='';
function form2Cfg(f)
{
    for (var i=0;i<CA.length;i++)
    {
        var e=eval('f.'+CA[i].n);
		if ( e )
		{
			if (e.disabled) continue;
			if ( e.length && e[0].type=='text' )
			{
				if (e.length==4) CA[i].v=combinIP2(e);
				else if (e.length==6) CA[i].v=combinMAC2(e);
			}
			else if ( e.length && e[0].type=='radio')
			{
				for (var j=0;j<e.length;j++)
					if (e[j].checked) { CA[i].v=e[j].value; break; }
			}
			else
			if (e.type=='checkbox')
				setCfg(e.name, Number(e.checked) );
			else
				setCfg(e.name, e.value);
		}
    }
}

var OUTF;
function frmHead(na,to,cmd,go)
{
	OUTF="<FORM name="+na+" action="+to+" method=POST>\n"+
	"<input type=hidden name=CMD value="+cmd+">\n"+
	"<input type=hidden name=GO value="+go+">\n";
}

function frmEnd()
{
	OUTF+="</FORM>\n";
}

function frmAdd(n,v)
{
	set1="<input type=hidden name="+n+" value=\"";
	v=v.replace(/\"/g,"&quot;");
	var r=new RegExp(set1+".*\n","g");
	if (OUTF.search(r) >= 0)
		OUTF=OUTF.replace(r,(set1+v+"\">\n"));
	else
		OUTF += (set1+v+"\">\n");
}

function genForm(n,a,d,g)
{
	frmHead(n,a,d,g);
	var sub=0;
    for (var i=0;i<CA.length;i++)
	{
		if (CA[i].v!=CA[i].o)
		{
			frmAdd("SET"+sub,String(CA[i].i)+"="+CA[i].v);
			sub++;
		}
	}
	if (frmExtraElm.length)
		OUTF+=frmExtraElm;
	frmExtraElm=''; //reset
	frmEnd();
	return OUTF;
}

function subForm(f1,a,d,g)
{
	var msg=genForm('OUT',a,d,g);
/*DEMO*/
	if (!confirm(msg)) return;
/*END_DEMO*/

	var newElem = document.createElement("div");
	newElem.innerHTML = msg ;
	f1.parentNode.appendChild(newElem);
	f=document.OUT;
	f.submit();
}

function addFormElm(n,v)
{
	var set1='<input type=hidden name='+n+' value="'+v+'">\n';
	frmExtraElm += set1;
}

/*function chkPwdUpdate(p,pv,c)
{
	if (c.value=='0') return true;
    // modified
    if (p.value!=pv.value){
		alert("新密码与确认新密码不一致，请重新输入！");
		return false;
	}
    if (!confirm('保存更改吗？'))
    {
        c.value=0 ;
        p.value=pv.value=p.defaultValue;
        return false;
    }
    return true;
}*/

function chkPwd1Chr(p,pv,c)
{
   	if (c.value=='0')
   	{
  		p.value=pv.value=""; // reset to null;
  		c.value='1';
	}
}

function chkPwd1Chr2(po,p,pv,c)
{
   	if (c.value=='0')
   	{
  		po.value=p.value=pv.value=""; // reset to null;
  		c.value='1';
	}
}

function chkStrLen(s,m,M,msg)
{
	var str=s.value;
	if ( str.length < m || str.length > M )
	{
		var hitmsg;
		hitmsg="请确保";
		hitmsg+=msg;
		hitmsg+="长度在";
		hitmsg+=m;
		hitmsg+="-";
		hitmsg+=M;
		hitmsg+="个字符之间!!!";
		alert(hitmsg);
		s.focus();
		return false;
	}
    return true;
}

function isIE()
{
	var agt = navigator.userAgent.toLowerCase();
	return (agt.indexOf("msie") != -1); // ie
}

function fit2(n)
{
	var s=String(n+100).substr(1,2);
	return s;
}

function timeStr(t)
{
	if(t < 0)
	{
		str='00:00:00';
		return str;
	}
	var s=t%60;
	var m=parseInt(t/60)%60;
	var h=parseInt(t/3600)%24;
	var d=parseInt(t/86400);

	var str='';
	if (d > 999) { return '永久'; }
	if (d) str+=d+'天 ';
	str+=fit2(h)+':';
	str+=fit2(m)+':';
	str+=fit2(s);
	return str;
}

// auto,NA,IC,ETS,SP,FR,JP
var dmnRng= new Array(16383,2047,2047,8191,1536,7680,16383);

function chanList(Opt,dn)
{
	var j = 0;
	for(var i=1;i<=14;i++)
	{
		if(dmnRng[dn] & (1<<(i-1)))
        {
			var fr;
			if (i!=14) fr=i*0.005+2.407;
			else fr=2.484;
			var opn = new Option(i+" - "+fr+"GHz",i);
			Opt.options[j++] = opn;
		}
	}
}

//删除链表（或数组）中的某个单元
function rmEntry(a,i)
{
	if (a.splice)
		a.splice(i,1);
	else
	{
		if (i>=a.length) return;
		for (var k=i+1;k<=a.length;k++)
			a[k-1]=a[k];
		a.length--;
	}
}


function getStyle(objId) {
	var obj=document.getElementById(objId);
	if (obj) return obj.style;
	else return 0;
}

function setStyle(id, v) {
    var st = getStyle(id);
    if(st) { st.display = v; return true; } else return false;
} 
function is_number(num_string,nMin,nMax){
	var c;
	var ch = "0123456789";
	for (var i = 0; i < num_string.length; i++){
		c = num_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
	}
	if(parseInt(num_string) < nMin || parseInt(num_string) > nMax)
		return false;
	return true;
}


//mac ip url 过滤日期选择
function onClickAllDay()
{
	if(byID("alldays").checked)
	{
		for(var i=1;i<=7;i++)
			byID("date"+i).disabled = true;
	}
	else
	{
		for(var i=1;i<=7;i++)
			byID("date"+i).disabled = false;
	}
}

///mac ip url 过滤 清除
function onDelDateRemark(f)
{
	f.en.checked = true;
		
	f.remark.value = "";
	f.sh.selectedIndex = 0;
	f.sm.selectedIndex = 0;
	f.eh.selectedIndex = 0;
	f.em.selectedIndex = 0;
	f.alldays.checked = true;
	onClickAllDay();
}

///mac ip url  始
function init2(f)
{
	var n = curLen;
	if(n == "")
		n = 0;
		
	if(getCfg("check") == 1)
		byID("check").checked = true;
	else
		byID("check").checked = false;
	if(f.forbid_allow)
		f.forbid_allow.selectedIndex =getCfg("mode");
	onCheck();
	onClickAllDay();

	f.curNum.value = n+1;
	//onChangeNum();
}

function byID(id)
{
	return document.getElementById(id);
}

function IsShow(id,show)
{
	if (document.all)
		document.all(id).style.display = (show) ?  "" : "none";
	else if (document.getElementById)
		document.getElementById(id).style.display = (show) ? "" : "none";
}
function orderIP(ip1,ip2)
{
	var mi = ip1.split(".");
	var ma = ip2.split(".");
	if(parseInt(mi[0])>parseInt(ma[0]))
	{
		return false;
	}
	else if(parseInt(mi[0])==parseInt(ma[0]))
	{
		if(parseInt(mi[1])>parseInt(ma[1]))	
			return false;
		else if(parseInt(mi[1])==parseInt(ma[1]))
		{
			if(parseInt(mi[2])>parseInt(ma[2]))	
				return false;
			else if(parseInt(mi[2])==parseInt(ma[2]))
			{
				if(parseInt(mi[3])>parseInt(ma[3]))	
					return false;
			}
		}
	}
	
	return true;
}
function GetReqObj()
{
	var request = false;

	try {
		req = new XMLHttpRequest();
	 } catch (trymicrosoft) 
	 {
		try {
    		req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
    		try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
			req = false;
			}
  		}
	 }
	
	if (! req)
	{
		alert("Error initializing HttpRequest!");
		return false;
	}

	return req;
}

function cmp2Ip(eip1,eip2,mask)
{
	var index=0;
	var ipp1=eip1.value.split(".");
	var ipp2=eip2.value.split(".");
	var maskk=mask.split(".");
	var ipppp1 = ipp1[0]*256*256*256+ipp1[1]*256*256+ipp1[2]*256+ipp1[3];
	var ipppp2 = ipp2[0]*256*256*256+ipp2[1]*256*256+ipp2[2]*256+ipp2[3];
	var ippp1 = (ipp1[0]&maskk[0])*256*256*256+(ipp1[1]&maskk[1])*256*256+(ipp1[2]&maskk[2])*256+(ipp1[3]&maskk[3]);
	var ippp2 = (ipp2[0]&maskk[0])*256*256*256+(ipp2[1]&maskk[1])*256*256+(ipp2[2]&maskk[2])*256+(ipp2[3]&maskk[3]);
	if((ipppp1 - ippp1) >(ipppp2 - ippp2))
		{alert("起始IP大于结束IP!");eip1.focus();return true;}
	return false;
}
function checkIpInLan(eip1,lanip,mask)
{
	var index=0;
	var ipp1="";
	if(typeof(eip1)=="object")
		ipp1=eip1.value.split(".");
	else{
		ipp1=eip1.split(".");
	}
	var lanipp=lanip.split(".");
	var maskk=mask.split(".");
	for(var i=0;i<4;i++)
	{	
		if((ipp1[i]&maskk[i])!=(lanipp[i]&maskk[i])) {
			return false;
		}
	}
	return true;
}

function ipCheck(e,msg)
{
	var tip = /^([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-5])\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-4])$/;
	if(!tip.test(e.value)){
		alert(msg+"错误!");
		e.focus();
		return false;
	}
	return true;
}

function netipCheck(e, msg)
{
	if(e.value == "0.0.0.0/0")
		return true;
	var tip = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([1-9]|1\d|2\d|3[0-2])$/;
	var lns_e=e.value.split("/");
	var lns_tip=/^([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-5])\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-4])$/;
	if(!lns_tip.test(lns_e[0])){
		alert(msg+"错误!");
		e.focus();
		return false;
	}
	
	if(!tip.test(e.value)){
		alert(msg + "错误!");
		e.focus();
		return false;
	}
	return true;
}

function getHostNum(ip,msk)
{
	var iptmp;
	var msktmp;
	var ipp=0;
	var mskk=0;
	iptmp=ip.split(".");
	msktmp=msk.split(".");
	for(var i=0;i<4;i++)
	{
		ipp=ipp*256+parseInt(iptmp[i]);
		mskk=mskk*256+parseInt(msktmp[i]);
	}
	
	return (parseInt(ipp)-(parseInt(ipp)&parseInt(mskk)));
}

function CheckTextValid(e,name)
{
        if(e.value.indexOf("\\")!=-1||e.value.indexOf("~")!=-1||e.value.indexOf("%")!=-1||e.value.indexOf(";")!=-1||e.value.indexOf("'")!=-1||e.value.indexOf("&")!=-1||e.value.indexOf("\"")!=-1)
        {
                alert(name+'包含非法字符:"; \\ ~ \' \" % &"');
                return false;
        }
       
        return true;
}

function bytelength(str)
{
	var retlen = 0;
	var len = str.length;
	for(var i=0;i<len;i++)
	{
		var chr = str.charCodeAt(i);
		if(chr > 128)
			retlen = retlen + 2;
		else
			retlen++;
	}
	return retlen;
}

//对IP组和时间组的标志位进行加1或者减1
/***参数说明:
strlist为包含目前所有时间组或者IP组的链,
flaglist为ip组或者时间组的所有标志位,
name为需要进行标志位操作的IP组名或者时间组名,
op为strlist中最高一层的分隔符,如"25;192.168.0.6;notag~26;192.168.0.7;notag",则op为"~"。
***/
function flagsub(strlist, flaglist, name, op)
{
		var newflaglist = "";
		var flag = flaglist.split(";");
		var namelist;
		
		if(op == "~")
			namelist = strlist.split("~");
		else if(op == ";")
			namelist = strlist.split(";");
		
		for(var i = 0; i < namelist.length; i++)
		{
			var flagname ;	
			var checkname ;
			
			if(op == "~")
			{
				flagname = namelist[i].split(";");
				checkname = flagname[0];
			}else if(op == ";"){
				checkname = namelist[i]
			}
			
			if(name == checkname)
			{
				for(var j = 0; j < flag.length - 1; j++ )
				{
					if(j == i)
					{
						flag[j] -= 1;
						
						if(flag[j] <=0)
							flag[j] = 0;
					}	
					newflaglist += flag[j] + ";";
				}
				if(j == i)
				{
						flag[j] -= 1;
						if(flag[j] <= 0)
							flag[j] = 0;
				}
				newflaglist += flag[j];
			}
		}
	return newflaglist;	
}

function flagadd(strlist, flaglist, name, op)
{
		var newflaglist = "";
		var flag = flaglist.split(";");
		var namelist ;

		if(op == "~")
			namelist = strlist.split("~");
		else if(op == ";")
			namelist = strlist.split(";");
		
		for(var i = 0; i < namelist.length; i++)
		{
			var flagname ;	
			var checkname ;
			
			if(op == "~")
			{
				flagname = namelist[i].split(";");
				checkname = flagname[0];
			}else if(op == ";"){
				checkname = namelist[i]
			}
			
			
			if(name == checkname)
			{
				for(var j = 0; j < flag.length - 1; j++ )
				{
					if(j == i)
					{
						flag[j] = parseInt(flag[j]) + 1;
					}	
					newflaglist += flag[j] + ";";
				}
				if(j == i)
				{
						flag[j] = parseInt(flag[j]) + 1;
				}
				newflaglist += flag[j];
			}
		}
	return newflaglist;	
}

//函数功能:判断输入的是否是一个网段
//参数:ip为要判断的输入内容,该值必须已经做过是否为合法的IP输入的判断
//mask为给定的子网掩码
//msg为要显示的错误信息
function netChk(ip, mask, msg)
{
	var checkmask = mask.split(".");
	var checkip  =ip.split(".");
	for(var i = 0; i < 4; i++)
	{
			
		if( (checkip[i] & checkmask[i]) != checkip[i] )
		{
			alert(msg + "有错!");
			return false;
		}
	}

	return true;
}
//函数功能：将一个字符型的值转换成INT型，
//主要是针对类似‘08’这类首字符是0的值，单独用parseInt（）有时得到的是错误的值
//参数说明：str为要转换的字符
function strtoInt(str)
{
	if( ( str.substr(0, 1)) == '0')
		str = str.replace("0", "");
	return parseInt(str);
}

//对转化后的数组进行快速排序
function quicksort(left, right, index)
{
	 var i, j, temp;
	 i = left;
	 j = right;
	 temp = array[left];
	 if(left > right)
	 {
	 		return;
	 }	

		while(i != j)
	 	{
				while(cmpstr(array[j], temp, index) && j>i)
	 				j--;
	 			if(j>i)
	 				array[i++] = array[j];
				while( cmpstr(temp, array[i], index) && j>i)
	 				i++;
	 			if(j>i)
	 				array[j--] = array[i];	
		 }
	 array[i] = temp;
	 quicksort(i+1, right, index);
	 quicksort(left, i-1, index );	 	
}
//比较两个字符串的大小，小于等于返回0，大于则返回1
function cmpstr(Str1, Str2, index)
{
	var str1=Str1.split(";");
	var str2=Str2.split(";");
	var tmp1=str1[index].split(".");
	var tmp2=str2[index].split(".");
	var mac1, mac2;

	for(var i=0; i < tmp1.length; i++)
	{
		if(parseInt(tmp1[i]) == parseInt(tmp2[i]))
			continue;
		else if(parseInt(tmp1[i])> parseInt(tmp2[i]))
			return 1;
		else
			return 0;		
	}			
	return 0;
}

var sUserAgent = navigator.userAgent;
var isOpera = sUserAgent.indexOf("Opera") > -1;
var isIE = sUserAgent.indexOf("compatible") > -1 
           && sUserAgent.indexOf("MSIE") > -1
           && !isOpera;
var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
/******************************************************
  * @方法 formatEvent
  * @描述 格式化Event事件，消除浏览器差异。
  * @返回值 （event） 返回格式化好的事件对象 
  *****************************************************/
function formatEvent(oEvent) {
    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrollTop;
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }

        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date).getTime();
    }
	if (!oEvent.which) {
		oEvent.which = oEvent.charCode != null ? oEvent.charCode : oEvent.keyCode;
	}
		
    return oEvent;
};

/******************************************************
  * @方法 getEvent
  * @描述 获取事件对象。
  * @返回值 （event） 返回格式化好的事件对象 
  *****************************************************/
function getEvent() {
    if (window.event) {
        return this.formatEvent(window.event);
    } else {
        return getEvent.caller.arguments[0];
    }
};

var keyCode ={
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
};
/******************************************************
  * @方法 blockChars
  * @参数 （object）oTextbox 要验证的dom对象
  * @参数 （Event）oEvent 事件对象
  * @参数 （boolean）bBlockPaste 事件对象
  * @描述 只允许用户在oTextbox文本框里输入，文本框自定义属性validchars中的字符。
  * @返回值 （string） 
  *****************************************************/
function allowChars(oTextbox, oEvent, bBlockPaste) {
	var my_regexp;
	//alert(oTextbox.value);
    var sValidChars = trim(oTextbox.getAttribute("validchars"));
	oEvent = formatEvent(oEvent);
	
	if (sValidChars.charAt(0) !== '/') {
		my_regexp = eval('/['+sValidChars+']/g')
	} else {
		my_regexp = eval(sValidChars);
	}
    var sChar = String.fromCharCode(oEvent.charCode);  
	//alert(oEvent.keyCode);
	
	 //Opera浏览器不不支持charCode，
	if (isOpera) {
		sChar = String.fromCharCode(oEvent.keyCode); 
	} 
	
    var bIsValidChar = my_regexp.test(sChar);

    //火狐中oEvent.charCode == 0为功能键,在Opera浏览器功能键有键值
	if (oEvent.charCode == 0 || oEvent.keyCode == keyCode.BACKSPACE || oEvent.keyCode == keyCode.LEFT 
		|| oEvent.keyCode == keyCode.RIGHT || oEvent.keyCode == keyCode.DOWN) { 
		bIsValidChar = true;
	} 
    if (bBlockPaste) {
        return bIsValidChar && !(oEvent.ctrlKey && sChar == "v");
    } else {
        return bIsValidChar || oEvent.ctrlKey;
    }
};


/******************************************************
  * @方法 blockChars
  * @参数 （object）oTextbox 要验证的dom对象
  * @参数 （Event）oEvent 事件对象
  * @参数 （boolean）bBlockPaste 事件对象
  * @描述 阻止用户在oTextbox文本框里输入，文本框自定义属性invalidchars中的字符。
  * @返回值 （string）
  *****************************************************/
/*function blockChars(oTextbox, oEvent, bBlockPaste) {
	
	var my_regexp;
    var sInvalidChars = trim(oTextbox.getAttribute("invalidchars"));
	oEvent = formatEvent(oEvent);
	if (sInvalidChars.charAt(0) !== '/') {
		my_regexp = eval('/['+sInvalidChars+']/g')
	} else {
		my_regexp = eval(sInvalidChars);
	}
	var sChar = String.fromCharCode(oEvent.charCode);
	
	//Opera浏览器不不支持charCode，
	if (isOpera) {
		sChar = String.fromCharCode(oEvent.keyCode); 
	}
    var bIsValidChar = !my_regexp.test(sChar);
	
	//火狐中oEvent.charCode == 0为功能键
	if (oEvent.charCode == 0  || oEvent.keyCode == keyCode.BACKSPACE || oEvent.keyCode == keyCode.LEFT 
		|| oEvent.keyCode == keyCode.RIGHT || oEvent.keyCode == keyCode.DOWN) { 
		bIsValidChar = true;
	} 
       
    if (bBlockPaste) {
        return bIsValidChar && !(oEvent.ctrlKey && sChar == "v");
    } else {
        return bIsValidChar || oEvent.ctrlKey;
    }
}*/
function blockChars(oTextbox, oEvent){
	var keynum
	var keychar
	var sInvalidChars = trim(oTextbox.getAttribute("invalidchars"));
	var my_regexp =new RegExp(sInvalidChars);
	if(window.event) // IE
	  keynum = oEvent.keyCode
	else if(oEvent.which) // Netscape/Firefox/Opera
	  keynum = oEvent.which
	keychar = String.fromCharCode(keynum)
	alert(keychar);
	return !my_regexp.test(keychar)
}
/******************************************************
  * @方法 replaceZhcnValue
  * @参数 （oTextbox）val 输入框对象
  * @参数 （oEvent）msg 事件对象
  * @描述 清除文本框里的中文字符
  *****************************************************/
function replaceZhcnValue (oTextbox, oEvent ){
	var oEvent = formatEvent(oEvent);
	var left_arrow = oEvent.keyCode === keyCode.LEFT || oEvent.keyCode === 63234;
	var right_arrow = oEvent.keyCode === keyCode.RIGHT || oEvent.keyCode === 63235;
	//alert(left_arrow)
	if(!left_arrow && !right_arrow){
		oTextbox.value = oTextbox.value.replace(/[^\x00-\xff]+/g,'')
	}
}
/******************************************************
  * @方法 numberCharAble
  * @参数 （object）val 要验证的dom对象
  * @参数 （string）msg 要提示的参数名
  * @描述 验证dom对象的值中是否 只有字母，数字或下划线。
  * @返回值 （boolean） 
  *****************************************************/
function numberCharAble(obj,msg) {
   var my_char = /^[a-zA-Z0-9_]{1,}$/;
	 
   if (!obj.value.match(my_char)) { 
		  msg += "只能由字母数字下划线组成\n"; 
		  alert(msg); 
		  //obj.value = ''; 
		  obj.focus(); 
		  return false; 
   } else {
		return true;
   }
}

/******************************************************
  * @方法 trim
  * @参数 （string）ostr 要操作的字符串
  * @描述 去掉字符串前后的空格。
  * @返回值 （string） 
  *****************************************************/
function trim(ostr) {
	return ostr.replace(/^\s+|\s+$/g,"");
}

function loadStyles (url) {
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}

function  loadScript(url) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}
//操作Cookie
var CookieUtil = {
	get: function (name) {
		var  cookie_name = encodeURIComponent(name) + "=",
			 cookie_start = document.cookie.indexOf(cookie_name),
			 cookie_value =  null;
			 
		if (cookie_start > -1) {
			var cookie_end = document.cookie.indexOf(';',cookie_start);
			if (cookie_end == -1) {
				cookie_end = document.cookie.length;
			}
			cookie_value = decodeURIComponent(document.cookie.substring(cookie_start 
						  +  cookie_name.length, cookie_end));
		}
		return cookie_value;
	},
	set: function (name, value, expires, path, domain, secure) {
		var cookie_text = encodeURIComponent(name) + "=" +
						   encodeURIComponent(value);
		if (expires instanceof Date) {
			cookie_text += ";expires=" + expires.toGMTString();
		}
		if (path) {
			cookie_text += ";path=" + path;
		}
		if (domain) {
			cookie_text += ";domain=" + domain;
		}
		if (secure) {
			cookie_text += ";secure=" + secure;
		}
		document.cookie = cookie_text;

	},
	unset:function (name, path, domain, secure) {
		this.set(name, '', new Date(0), path, domain, secure);
	}
}

function d2b(d,n)
{
	var my_d = d;
	var m = '';
	
	for(j=0;j<n;j++)
	{
		if(parseInt(my_d%2)==1) {
			m="1"+m;
		} else {
			m="0"+m;
		}
		my_d = parseInt(my_d/2);	
	}
	return m.toString();
}

function convertodcl(){
	var flag;
	for(var i=0;i<7; i++)
	if (flag & (1 << i) == 1)
	{document.write(i);}
}

function checkInjection(str)
{
	var reg = /^[\w-@*]*$/;
	/*var len = str.length;	
	for (var i=0; i<str.length; i++) {
		if ( str.charAt(i) == ':' || str.charAt(i) == ',' ||
			  str.charAt(i) == '\r' || str.charAt(i) == '\n' ||
			  str.charAt(i) == '\"' || str.charAt(i) == '\'' ||
			  str.charAt(i) == '\\' || str.charAt(i) == '\/' ||
			  str.charAt(i) == '"' || str.charAt(i) == ''' ||
			  str.charAt(i) == ''' || str.charAt(i) == '"' ||
			  str.charAt(i) == ' ' ){
				return false;
		}else
	        continue;
	}*/
	if(!reg.test(str))
    	return false;
	return true;
}