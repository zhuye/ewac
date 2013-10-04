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
<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui-1.9.2.custom.min.js"></script>
<script language="javascript">
</script>
</head>
<body>
	<div class="header" id="header">
		<jsp:include page="../common/head.jsp" />
	</div>
	<div class="container-" id="container-">
		<div id="biaoge">
				<table width="400" border="0" align="center" cellspacing="16">
					<tr>
						<td width="24" rowspan="5">&nbsp;</td>
						<td>&nbsp;</td>
						<td width="22" rowspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td><p>&nbsp;</p>
							<p>&nbsp;</p></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="center"><label for="succExit"></label>
							您已成功退出本系统。</td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="right"><label for="xx"></label></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td align="center"><a href="/login"
							onmouseout="MM_swapImgRestore()"
							onmouseover="MM_swapImage('reLogin','','/imgs/button/preclickdenglu gray.png',1)"><img
								src="/imgs/button/normaldenglu gray.png" name="reLogin"
								width="61" height="20" border="0" id="reLogin" /></a></td>
						<td>&nbsp;</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</table>
		</div>
	</div>
</body>
</html>

