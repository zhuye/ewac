<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="com.ericsson.rams.api.common.entity.SysFunction"%>
<%@page import="java.util.List"%>
<%@page import="com.ericsson.rams.api.common.entity.SysUser"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>江苏移动收入保障系统</title>
<script type="text/javascript" src="/js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui-1.9.2.custom.min.js"></script>
<%
	SysUser user = (SysUser) session.getAttribute("USER_ID");
	if (user != null) {
%>
<script language="javascript">
	$(document).ready(function() {
		$.ajax({
			type : "get",
			dataType : "json",
			url : "/um/user/" +
<%=user.getId()%>
	,
			cache : false,
			success : function(msg) {
				$('#group').text(msg.group);
				$('#roleNames').text(msg.roleNames);
				$('#regionNames').text(msg.regionNames);
			}
		});
	});
</script>
<%

	if(user.getIsModifyPassword()!=null&&user.getIsModifyPassword().equals("-1")){
	%>	
	<script language="javascript">
		$(document).ready(function() {
			openDialog();
		});
	</script>
<%	
	}
	}
%>

</head>
<body>
		<div class="header" id="header">
			<jsp:include page="../common/head.jsp" />
		</div>
		<div class="container" id="container">
			<div id="left">
				<jsp:include page="../common/container_left.jsp" />
			</div>
		<div id="right">
			<div id="lab">首页</div>
			<div id="border">
				<div id="condition">
					<img src="../imgs/denglu1.png" width="796" height="24" />
				</div>
				<div id="conditiontext">
					<%
						if (user != null) {
					%>
					<table width="800" border="0" cellspacing="12">
						<tr>
							<td width="24">&nbsp;</td>
 							<td colspan="6">欢迎使用江苏移动收入保障系统<%--，上次登录时间：<%=user.getLastSuccLogonTime()%>，上次登录IP：${lastSuccLogonIp}--%></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td width="86">用户名：</td>
							<td width="86" id="h1"><%=user.getLoginId()%></td>
							<td width="60">姓名：</td>
							<td width="86" id="h1"><%=user.getName()%></td>
							<td width="362" colspan="2"></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td width="86">所属地市：</td>
							<td width="86" id="regionNames">&nbsp;</td>
							<td colspan="4">&nbsp;</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td width="86">拥有角色：</td>
							<td id="roleNames" colspan="5">&nbsp;</td>
						</tr>
					</table>
					<%
						}
					%>

				</div>
				<div id="result">
					<img src="../imgs/home2.png" width="796" height="24" />
				</div>
				<div id="resulttext">
					<table width="659" border="0" cellspacing="25" cellpadding="0">
						<tr>
							<td width="28
    " align="center">&nbsp;</td>
								<%
									List<SysFunction> funcList = (List<SysFunction>) session
											.getAttribute("FUNCTION_KEY");
									if (funcList != null) {
										for (SysFunction func : funcList) {
											if (func.getId() == 11) {
								%>
								<td width="60" align="center"><a href="/um/user"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image9','','../imgs/icon/user-management-.gif',1)"><img
										src="../imgs/icon/user-management.gif" name="Image9"
										width="90" height="90" border="0" id="Image9" /></a></td>

								<%
									}
											if (func.getId() == 21) {
								%>
								<td width="90" align="center"><a href="/um/role"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image7','','../imgs/icon/right-management-.gif',1)"><img
										src="../imgs/icon/right-management.gif" name="Image7"
										width="90" height="90" border="0" id="Image7" /></a></td>

								<%
									}
											if (func.getId() == 41) {
								%>
								<td width="90" align="center"><a href="/kpi/topic/list"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image6','','../imgs/icon/KPI-management-.gif',1)"><img
										src="../imgs/icon/KPI-management.gif" name="Image6" width="90"
										height="90" border="0" id="Image6" /></a></td>

								<%
									}
											if (func.getId() == 61) {
								%>
								<td width="90" align="center"><a href="/report/query"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image8','','../imgs/icon/report-management-.gif',1)"><img
										src="../imgs/icon/report-management.gif" name="Image8"
										width="90" height="90" border="0" id="Image8" /></a></td>

								<%
									}
											if (func.getId() == 71) {
								%>
								<td width="90" align="center"><a href="/etl/list"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image11','','../imgs/icon/data-.gif',1)"><img
										src="../imgs/icon/data.gif" name="Image11" width="90"
										height="90" border="0" id="Image11" /></a></td>

								<%
									}

											if (func.getId() == 82) {
								%>
								<td width="69" align="center"><a href="/client/list"
									onmouseout="MM_swapImgRestore()"
									onmouseover="MM_swapImage('Image10','','../imgs/icon/peizhi-management-.gif',1)"><img
										src="../imgs/icon/peizhi-management.gif" name="Image10"
										width="90" height="90" border="0" id="Image10" /></a></td>

								<%
									}
										}
									}
								%>

							</tr>
							<tr>
								<td align="center">&nbsp;</td>
								<%
									if (funcList != null) {
										for (SysFunction func1 : funcList) {
											if (func1.getId() == 11) {
								%>
								<td align="center">用户管理</td>

								<%
									}
											if (func1.getId() == 21) {
								%>
								<td align="center">权限管理</td>
								<%
									}
											if (func1.getId() == 41) {
								%>
								<td align="center">KPI管理</td>

								<%
									}
											if (func1.getId() == 61) {
								%>
								<td align="center">报表管理</td>
								<%
									}
											if (func1.getId() == 71) {
								%>
								<td align="center">数据采集管理</td>

								<%
									}

											if (func1.getId() == 82) {
								%>
								<td align="center">配置管理</td>

								<%
									}
										}
									}
								%>
							</tr>
						</table>
						<p>&nbsp;</p>
						<%@include file="/WEB-INF/views/um/user_first_login.jsp"%>
						<p></p>
					</div>
				</div>
			</div>
		</div>
</body>
</html>
