// JavaScript Document
var menu = new Array();
function Click(){ 
	window.event.returnValue=false; 
} 
document.oncontextmenu=Click; 


function tbl_head_str(wd,i,wanFlag){
	var t=/^\d{0,9}$/; 
	var m='<TABLE border=0 cellPadding=0  class=space1 width='+((wd==""||wd==undefined||(!t.test(wd)))?"780":wd)+'>';
	if(!t.test(wd))
	{
		m+='<tr><td valign=middle colspan=3><table border="0" cellpadding="0" cellspacing="0" ><tr height="24"><td width=5></td><td style="text-align:center;"><img src="images/cubg1.gif" width="6" height="24"/></td><td bgcolor="#ffffff" background="images/cubg3.gif"><a href="#" target="_self" style="color:#000000;">'+wd+'</a></td><td><img src="images/cubg2.gif" height="24" width="6" /></td></tr></table></td></td><td>&nbsp;<td></tr>';
	}else
	{
		m+='<tr><td valign=middle colspan=3>'+createSubMenu(i,wanFlag)+'</td><td>&nbsp;<td></tr>';
	}
	m+='<tr><td valign=middle colspan=3 class="hline"></td><td style="height:1px;"><td></tr>';
	m+='<tr valign="top"><td class=vline rowspan=3 id="va_top"></td><td id="table_contain" align="center"> ';
	return m;
}

function tbl_head(wd,i,wanFlag,hide){
	initMenusArr(i, hide);
	document.write(tbl_head_str(wd,i,wanFlag));
}

function initMenusArr(i, hide){
	switch (i) {
		case 4:
			if (hide == '0'){
				menu[3] = new Array("WAN������:wan_list.asp");
			} 
			else {
				menu[3] = new Array("WAN������:wan_list.asp","��WAN����:wan_policy.asp");
			}
			break;
		case 8:
			var my_menus = new Array("MAC��¡:mac_clone.asp","WAN������:wan_set.asp","�˿�ģʽ:portParam.asp","�˿ھ���:switch_portVLAN.asp");
			menu[7] = new Array();
			for (var i =0; i < my_menus.length; i++){
				if (hide.charAt(i) == 1){
					menu[7].push(my_menus[i]);
				}
			}
			break;
		case 9:
			if (hide == '0'){
				menu[8] = new Array("�û���:group_ip.asp","ʱ����:group_time.asp");
			}
			break;
		case 14:
			if (hide == '00'){
				menu[13] = new Array("��������:qos_list.asp");
			} 
			else{
				menu[13] = new Array("��������:qos_list.asp","����������:lan_controllist.asp");
			}
			break;
		case 16:
			if (hide == 0){
				menu[15] = new Array("ARP����:firewall_arpfence.asp");
			}
			break;
		case 17:
			if (hide == '0'){
				menu[16] = new Array("��������:firewall_lanattackfence.asp");
			}
			break;
		default:
	}
}

function tbl_tail_str(button){
	var m='<br></td><td class=vline rowspan=3></td>';
	if (button!=''){
		m+='<td rowspan=3 valign="top" width=80 align="center"><br>';
		m+=button;
		m+='</td>';
	}
	else{
		m+='<td style="width:70px;"><td>';	
	}
	m+'</tr>';
	m+='<tr><td class=hline colspan="2"></td><td style="height:1px;"><td></tr>';
	m+='</table>';
	return m;
}

function tbl_tail(button){
	document.write(tbl_tail_str(button));
}

function tbl_tail_save_str(f,help){	
	var m='</center></td><td class=vline rowspan=3></td>';
	m+='<td rowspan=3 valign="top" width=80 align="center"><br>';
	m+="<input class=actButton type=button value='�� ��' onMouseOver=\"style.color='#ff9933'\" onMouseOut=\"style.color='#000000'\" onClick=preSubmit("+f+")><br><br>";
	m+="<input class=actButton type=button value='�� ԭ' onMouseOver=\"style.color='#f93'\" onMouseOut=\"style.color='#000000'\" onClick='window.location.reload()'><br><br>";
	m+="<input class=actButton type=button value='�� ��' onMouseOver=\"style.color='#f93'\" onMouseOut=\"style.color='#000000'\" onClick=doHelp('"+help+"')>";
	m+='</td>';
	m+'</tr>';
	m+='<tr><td class=hline colspan="2"></td><td style="height:1px;"><td></tr>';
	m+='</table>';
	
	return m;
}
function lns_tbl_tail_save_str(f){
	var m='</center></td><td class=vline rowspan=3></td>';
	m+='<td rowspan=3 valign="top" width=80 align="center"><br>';
	m+="<input class=button type=button value='�� ��' onMouseOver=\"style.color='#ff9933'\" onMouseOut=\"style.color='#000000'\" onClick=preSubmit("+f+")><br><br>";
	m+='</td>';
	m+'</tr>';
	m+='<tr><td class=hline colspan="2"></td><td style="height:1px;"><td></tr>';
	m+='</table>';
	
	return m;
}
function tbl_tail_save(f,button){
	document.write(tbl_tail_save_str(f,button));
}
function lns_tbl_tail_save(f){
	document.write(lns_tbl_tail_save_str(f));
}

function doHelp(t){
	window.location='do_help.htm#'+t;
}
//����Ŀ¼

menu[0] = new Array("WAN״̬:sys_state.asp","LAN״̬:status_lan.asp","����״̬:status_wireless.asp","ϵͳ��Ϣ:status_inf.asp");
//menu[1] = new Array("��������:wizard.asp");
menu[2] = new Array("LAN������:lan.asp");
menu[4] = new Array("DHCP��������:lan_dhcps.asp","DHCP�ͻ��б�:lan_dhcp_clients.asp","��̬����:lan_dhcp_static.asp");
menu[5] = new Array("DMZ:nat_dmz.asp");
menu[6] = new Array("WAN�ڷ��ʿ���:webip_wan.asp");
menu[8] = new Array("�û���:group_ip.asp","ʱ����:group_time.asp");
menu[9] = new Array("�˿ڹ���:firewall_clientlist.asp");
menu[10] = new Array("URL����:firewall_urlfilterlist.asp");
//menu[11] = new Array("��ַ�������:murl.asp");
//menu[12] = new Array("Э����������:firewall_proto_list.asp","IM�����������:im.asp");
menu[14] = new Array("MAC��ַ����:firewall_mac.asp");
//menu[15] = new Array("ARP����:firewall_arpfence.asp","DDos����:firewall_dosfence.asp","���ɷ���:firewall_shadyfence.asp","IPѡ�����:firewall_ipfence.asp");
//menu[16] = new Array("��������:firewall_lanattackfence.asp","��������:firewall_wanattackfence.asp");
//menu[17] = new Array("IP-MAC��ַ��:arp_bind.asp","��̬��:arp.asp");
//menu[18] = new Array("�����б�:showhost.asp");
menu[19] = new Array("���������:nat_virtualser.asp");
menu[20] = new Array("UPnP:upnp_config.asp");
menu[21] = new Array("һ��һNAT:nat_static.asp");
menu[22] = new Array("�˿ھ���:switch_portVLAN.asp");
menu[23] = new Array("DDNS:ddns_config.asp");
menu[24] = new Array("·�ɱ�:routing_table.asp","��̬·������:routing_static.asp");
menu[25] = new Array("PPTP�ͻ���:pptp_client.asp");
menu[26] = new Array("PPTP������:pptp_server.asp","PPTP�ͻ�����:pptp_client_setting.asp","�����б�:pptp_client_list.asp");
menu[27] = new Array("����ͳ��:statistic.asp");
menu[28] = new Array("��־�鿴:system_log.asp");
//menu[29] = new Array("��־����:log_setting.asp");
menu[30] = new Array("ʱ��������:system_hostname.asp");
menu[31] = new Array("������ָ�:system_backup.asp");
menu[32] = new Array("�������:system_upgrade.asp");
//menu[33] = new Array("��������:policy_upgrade.asp");
menu[34] = new Array("�ָ���������:system_restore.asp");
menu[35] = new Array("��������:system_reboot.asp");
menu[36] = new Array("�û���������:system_password.asp");
//menu[37] = new Array("�ʼ�����:firewall_email_list.asp");
//menu[38] = new Array("���ӹ���:electronic_bulletin.asp");
//menu[39] = new Array("VLAN:VLAN.asp","�˿ھ���:switch_portVLAN.asp");
//menu[40] = new Array("�ͻ��˵�����:client_to_gateway.asp","���ص�����:gateway_to_gateway.asp");
menu[41] = new Array("2.4G��������:wireless_basic.asp","5G��������:wireless_basic_5g.asp");
menu[42] = new Array("2.4G���ܷ�ʽ:wireless_security.asp","5G���ܷ�ʽ:wireless_security_5g.asp");
menu[43] = new Array("2.4G WPS:wireless_wps.asp","5G WPS:wireless_wps_5g.asp");
menu[44] = new Array("2.4G WDS:wireless_wds.asp","5G WDS:wireless_wds_5g.asp");
menu[45] = new Array("2.4G�ÿ�����:wireless_access.asp","5G�ÿ�����:wireless_access_5g.asp");
menu[46] = new Array("2.4G���߷��ʿ���:wireless_filter.asp","5G���߷��ʿ���:wireless_filter_5g.asp");
menu[47] = new Array("2.4G�����б�:wireless_list.asp","5G�����б�:wireless_list_5g.asp");
menu[48] = new Array("2.4G�߼�����:wireless_advance.asp","5G�߼�����:wireless_advance_5g.asp");
menu[49] = new Array("�����ھӹ���:samba.asp");
menu[50] = new Array("USB��ӡ����:usb_printFunction.asp");
menu[51] = new Array("IPTV����:iptv.asp");
   	
var wannum = 1;
function createSubMenu(i,wan_num){
	var j=i-1;
	var locstr=window.location.toString();
	var locc=locstr.split("?");
	var childName=locc[0].split("/");
	var s='';
	s+='<table border="0" cellpadding="0" cellspacing="0"><tr height="24"><td width=5>&nbsp;</td>';
	for(var k=0,len_k=menu[j].length;k<len_k;k++){
		if(i==1&&k<wannum&&k!=0){
			if(k>(wan_num-1))
				continue;
		}
		var m=	menu[j][k].split(":");
		if(childName[3]==m[1])
			s+='<td style="text-align:center;"><img src="images/cubg1.gif" width="6" height="24"/></td><td bgcolor="#fff" background="images/cubg3.gif" nowrap="nowrap"><a href="'+m[1]+'" target="_self" style="color:#000000;">'+m[0]+'</a></td><td><img src="images/cubg2.gif" height="24" width="6" /></td>';
		else
			s+='<td style="text-align:center;"><img src="images/bg1.gif" width="6" height="24"/></td><td background="images/bg3.gif" nowrap="nowrap"><a href="'+m[1]+'" target="_self" onMouseOver=style.color="#ffffff" onMouseOut=style.color="#000000" style="color:#000000;">'+m[0]+'</a></td><td><img src="images/bg2.gif" height="24" width="6" /></td>';
	}
	s+='<td>&nbsp;<td></tr></table>';
	return s;
}
<!-------------------------------------------------help in page------------------------------------------->

var Butterlate = new Butterlation();
window._ = function(key) { return Butterlate.gettext(key); };
window.__ = function(key,replacements) { return Butterlate.vgettext(key,replacements); };

function Butterlation(){
  this.dict = new ButterDictionary();
  this.getLang = function(){
    var one, two, end;
    if((one=document.cookie.indexOf("language"))==-1){
      return ((navigator.language) ? navigator.language : navigator.browserLanguage).substring(0,2);   
      return "en";
    }
    end = (document.cookie.indexOf(';',one)!=-1) ? document.cookie.indexOf(';',one) : document.cookie.length;
    return unescape(document.cookie.substring(one+9,end));
  };
  //this.lang =this.getLang(); /*"zhcn";this.getLang();*/
  this.setTextDomain = function(domain) { this.po=window.location.protocol+"//"+window.location.host+"/help.xml"; this.initializeDictionary(); }
  this.initializeDictionary = function(){
    var request;
    try{ request = new XMLHttpRequest(); } catch(e1) {
      try{ request = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e2) {
        try{ request = new ActiveXObject("Microsoft.XMLHTTP"); } catch(e3) { return; }}};
    //request.open("GET",this.po,false); 
	request.open("GET",this.po,false); 
	//request.setRequestHeader("If-Modified-Since","1");
    request.send(null);
    if(request.status==200){ 
      var pos = request.responseXML.documentElement.getElementsByTagName("message");
      for(var i=0; i<pos.length; i++) this.dict.set(pos[i].getAttribute("msgid"),pos[i].getAttribute("msgstr"));
    }
  };
  this.gettext = function(key){ return this.dict.get(key); alert(this.dict.get(key));};
  this.vgettext = function(key,replacements){ 
    var nkey=this.gettext(key); var index; var count=0;
    if(replacements.length==0) return nkey;
    while((index=nkey.indexOf('%s'))!=-1){ 
      nkey=nkey.substring(0,index)+replacements[count]+nkey.substring(index+2,nkey.length); 
      count = ((count+1)==replacements.length) ? count : (count+1);
    }
    return nkey;
  };
}
      
function ButterDictionary(){
  this.keys = new Array();
  this.values = new Array();
  this.set = function(key,value){ 
    var index = this.getIndex(key);
    if(index==-1) { this.keys.push(key); this.values.push(value);}
    else this.values[index]=value;
  };
  this.get = function(key){
    var index;
    if((index=this.getIndex(key))!=-1) return this.values[index];
    return key;
  };
  this.getIndex = function(key){
    var index=-1;
    for(var i=0; i<this.keys.length; i++) if(this.keys[i]==key) { index=i; break; }
    return index;
  };
  this.keyExists = function(key){ return (this.getIndex(key)!=1); };
  this.deleteKey = function(key){ 
    var index = getIndex(key);
    if(index!=-1) { this.keys.splice(index,1); this.values.splice(index,1); }
  };
}


<!-------------------------------------------------help in page------------------------------------------->

/**
  * @���� getPageSize
  * @���� ��Բ�ͬ������ò�ͬ������ȡҳ����Ӹ߶ȣ���ȡ�
  * @����ֵ ��json���ݣ� pageWidthΪҳ����Ӹ߶ȣ�pageHeightҳ����ӿ��
  */
function getPageSize() {
	if (window.innerWidth) {
		return {pageWidth:window.innerWidth,pageHeight:window.innerHeight};
	} else if (typeof window.innerWidth != 'number') {
		if (document.compatMode == 'CSS1Compat') {
			return {pageWidth:document.documentElement.clientWidth, pageHeight:document.documentElement.clientHeight};
		} else {
			return {pageWidth:document.body.clientWidth, pageHeight:document.body.clientHeight};
		}
	}
}