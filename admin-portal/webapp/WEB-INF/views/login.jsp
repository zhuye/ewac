<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style type="text/css">
#container- {
	background-image: url(../imgs/LOG.png);
	height: 600px;
	width: 980px;
	margin-right: auto;
	margin-left: auto;
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>江苏移动收入保障系统</title>
<link href="/css/main.css" rel="stylesheet" type="text/css" />
<link type="text/css" href="/css/smoothness/jquery-ui-1.9.2.custom.min.css"
	rel="stylesheet" />
<link type="text/css" href="/css/jquery.dataTables.css" rel="stylesheet" />
<link type="text/css" href="/css/demo_page.css" rel="stylesheet" />
<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript">
	$(function() {

		// Accordion
		$("#accordion").accordion({
			header : "h3"
		});
		
	});
	
	function MM_preloadImages() { //v3.0
		var d = document;
		if (d.images) {
			if (!d.MM_p)
				d.MM_p = new Array();
			var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
			for (i = 0; i < a.length; i++)
				if (a[i].indexOf("#") != 0) {
					d.MM_p[j] = new Image;
					d.MM_p[j++].src = a[i];
				}
		}
	}
	function MM_swapImgRestore() { //v3.0
		var i, x, a = document.MM_sr;
		for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
			x.src = x.oSrc;
	}
	function MM_findObj(n, d) { //v4.01
		var p, i, x;
		if (!d)
			d = document;
		if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
			d = parent.frames[n.substring(p + 1)].document;
			n = n.substring(0, p);
		}
		if (!(x = d[n]) && d.all)
			x = d.all[n];
		for (i = 0; !x && i < d.forms.length; i++)
			x = d.forms[i][n];
		for (i = 0; !x && d.layers && i < d.layers.length; i++)
			x = MM_findObj(n, d.layers[i].document);
		if (!x && d.getElementById)
			x = d.getElementById(n);
		return x;
	}

	function MM_swapImage() { //v3.0
		var i, j = 0, x, a = MM_swapImage.arguments;
		document.MM_sr = new Array;
		for (i = 0; i < (a.length - 2); i += 3)
			if ((x = MM_findObj(a[i])) != null) {
				document.MM_sr[j++] = x;
				if (!x.oSrc)
					x.oSrc = x.src;
				x.src = a[i + 2];
			}
	}
</script>
<script language="javascript">
	document.onkeydown = function(event) {
		var e = window.event.keyCode ? window.event.keyCode
				: event.which ? event.which : event.charCode;
		if (e == 13) {
			doLogin();
		}
	}

	function longinView() {
		var flag = "${loginFlag}";
		if (flag == "0") {
			$('#checkLoginText').text('*未登录!请重新登录');
		}
	}

	function doLogin() {
		if ($('#userName').val() == "") {
			$('#checkLoginText').text('*用户名不能为空，请重新输入!');
			$('#userName').focus();
			return;
		}
		if ($('#userPassword').val() == "") {
			$('#checkLoginText').text('*密码不能为空，请重新输入!');
			$('#userPassword').focus();
			return;
		}
		if ($('#strCode').val() == "") {
			$('#checkLoginText').text('*验证码不能为空，请重新输入!');
			$('#strCode').focus();
			return;
		}				
		checkLogin();
		if ($('#checkUserValid').val() == 0) {
			$('#checkLoginText').text('*用户名或密码错误，请重新输入!');
			$('#userName').focus();
			return;
		}else if($('#checkUserValid').val() == 2){
			$('#checkLoginText').text('*该用户已停用,请联系管理员!');
			$('#userName').focus();
			return;
		}
		if(checkCode()==1){
			$('#checkLoginText').text('*验证码不正确，请重新输入!');
			changeCode(document.getElementById('imageCode'));
			$('#strCode').focus();
			return false;
		};
		$('#form1').submit();
	}
	
	function checkCode() {
		var flag = 0;
		$.ajax({
			type : "post",
			url : "/login/code",
			data : "inputCode=" + $('#strCode').val().toUpperCase(),
			async : false,
			success : function(msg) {
				if ($.trim(msg) != '0') {
					flag = 1;
				}
			}
		});
		return flag;
	}
	
	function changeCode(obj) {
		obj.src = '/validation/code?param=' + new Date();
	} 
	
	function checkLogin() {
		var userName = $('#userName').val();
		var userPassword = $('#userPassword').val();
		$.ajax({
			type : "post",
			dataType : "json",
			url : "/login/check",
			data : "userName=" + userName + "&userPassword=" + userPassword,
			async : false,
			cache : false,

			success : function(msg) {
				$('#checkUserValid').val(msg.valid);
			}
		});
	}
	function reset() {
		$('#form1').reset();
	}
</script>
</head>
<body onload="longinView()">
	<div class="header" id="header">
		<div id="logo">
			<div onclick="location.href='/login/do';" class="logoslogan"
				id="logoslogan"></div>
		</div>
		<div id="pic"></div>
		<div id="location">&nbsp;
		<div id="denglu">&nbsp;</div></div>
	</div>
	<div class="container-" id="container-">
		<div id="biaoge">
			<form id="form1" name="form1" method="post" action="/login/do">
				<input name="checkUserValid" type="hidden" id="checkUserValid"
					value="0" />
				<table width="400" border="0" align="center" cellspacing="12">
					<tr>
						<td width="18" rowspan="5">&nbsp;</td>
						<td colspan="5">&nbsp;</td>
						<td width="21" rowspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td width="108" align="right">&nbsp;</td>
						<td colspan="4"><label for="textfield3"></label></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="center">&nbsp;</td>
						<td colspan="4" align="left"><label id="checkLoginText"
							style="color: red;"></label></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td width="108" align="right">用户名：</td>
						<td colspan="4"><label for="userName"></label> <input
							type="text" name="userName" id="userName" /></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="right">密码：</td>
						<td colspan="4"><label for="userPassword"></label><input
							style="width: 150px;" type="password" name="userPassword"
							id="userPassword" /></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="right">验证码：</td>
						<td colspan="4"><label for="strCode"></label>
						<input style="width:150px;" type="text" name="strCode" id="strCode" /></td>
						<td> <img src="/validation/code" alt="验证码" id="imageCode" onclick="changeCode(this)" title="点击更换图片"/> </td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td colspan="2" align="right"><a href="#"
							onclick="doLogin();" onmouseout="MM_swapImgRestore()"
							onmouseover="MM_swapImage('queding','','/imgs/button/preclickqueding.png',1)"><img
								src="/imgs/button/normalqueding.png" name="queding" width="61"
								height="20" border="0" id="queding" /></a></td>
						<td width="14">&nbsp;</td>
						<td width="77"><a href="#" onmouseout="MM_swapImgRestore()"
							onclick="reset();"
							onmouseover="MM_swapImage('chongzhi','','/imgs/button/chongzhitwo.jpg',1)"><img
								src="/imgs/button/chongzhione.jpg" name="chongzhi" width="61"
								height="20" border="0" id="chongzhi" /></a></td>
						<td width="37">&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
			</form>
		</div>
	</div>

</body>
</html>

