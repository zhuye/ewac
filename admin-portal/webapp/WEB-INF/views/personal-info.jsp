<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>江苏移动收入保障系统</title>
<%@include file="um/relate_bomc_user.jsp"%>

<script language="javascript">
	var iseditedStatus = "0";
	$(document).ready(function() {
		roleTableDataInit();
		groupSelectOneTableInit();
		roleManyInit();
		$('#oldPassword').attr('disabled', true);
		$('#password').attr('disabled', true);
		$('#confirmPassword').attr('disabled', true);

	});
	function isedited() {
		$('[name=items]:checkbox').each(function() {
			if (!this.checked) {
				$('#oldPassword').attr('disabled', true);
				$('#password').attr('disabled', true);
				$('#confirmPassword').attr('disabled', true);
			} else {
				$('#oldPassword').attr('disabled', false);
				$('#password').attr('disabled', false);
				$('#confirmPassword').attr('disabled', false);
			}
		});
	}
	function roleTableDataInit() {
		roleIds = $('#roleIds').val();
		$.ajax({
			type : "get",
			dataType : "json",
			url : "/um/role/init",
			data : "roleIds=" + roleIds,
			async : false,
			cache : false,
			success : function(msg) {
				roleTableInitForData(msg);
			}
		});
	}

	function save() {

		validResult = valid();
		if (validResult == 0) {
			return;
		}
		$('[name=items]:checkbox').each(function() {
			if (this.checked) {
				iseditedStatus = "1";
				checkOldPassword();
				if ($('#oldPasswordValid').val() == 0) {
					setText('oldPassword', '*密码不正确!', '0');
					validResult = 0;
				} else {
					setText('oldPassword', '', '1');
				}
			}
		});
		if (validResult == 0) {
			return;
		}
		roleIds = "";
		$("[name='roleItemIds']").each(function() {
			roleIds = roleIds + $(this).val() + ",";
		})
		$('#roleIds').val(roleIds);
		$('#iseditedStatus').val(iseditedStatus);
		if (confirm("确认是否修改?")) {
			$('#form1').submit();
		} else {
			$('#roleIds').val("");
		}
	}

	function checkOldPassword() {
		id = $('#id').val();
		oldPassword = $('#oldPassword').val();
		$.ajax({
			type : "post",
			dataType : "json",
			url : "/um/user/check",
			data : "type=oldPassword&id=" + id + "&oldPassword=" + oldPassword,
			async : false,
			cache : false,
			success : function(msg) {
				$('#oldPasswordValid').val(msg.valid);
			}
		});
	}

	function valid() {
		validResult = 1;
		userName = $('#userName').val();
		email = $('#email').val();
		remark = $('#remark').val();
		password = $('#password').val();
		confirmPassword = $('#confirmPassword').val();

		if (userName == "") {
			setText('userName', '*不能为空!', '0');
			validResult = 0;
		} else {
			setText('userName', '', '1');
		}
		reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;
		if (email == "") {
			setText('email', '*不能为空!', '0');
			validResult = 0;
		} else if (!reg.test(email)) {
			setText('email', '*E-Mail格式不正确，请重新输入!', '0');
			validResult = 0;
		} else {
			setText('email', '', '1');
		}

		if (remark == "") {
			setText('remark', '*不能为空!', '0');
			validResult = 0;
		} else {
			setText('remark', '', '1');
		}
		$('[name=items]:checkbox').each(function() {
			if (this.checked) {
				if (password == "") {
					setText('password', '*不能为空!', '0');
					validResult = 0;
				} else {
					setText('password', '', '1');
				}

				if (confirmPassword == "") {
					setText('confirmPassword', '*不能为空!', '0');
					validResult = 0;
				} else {
					if (confirmPassword != password) {
						setText('confirmPassword', '*重复输入密码不一致!', '0');
						validResult = 0;
					} else {
						setText('confirmPassword', '', '1');
					}
				}
			}
		});

		return validResult;
	}
	function setText(id, text, flag) {
		if (flag == "0") {
			$('#' + id + 'Text').css("color", "red");
			$('#' + id + 'Text').html(text);
		} else {
			$('#' + id + 'Text').css("color", "green");
			$('#' + id + 'Text').html("√");
		}
	}
</script>

<style type="text/css">
#container #right #border #dialogtwo {
	width: 450px;
}

.h1 {
	font-weight: bold;
	cursor: e-resize;
}

.gray- {
	font-size: 11px;
	color: #999;
	background-color: #f7f7f7;
}

.gray {
	font-size: 11px;
	color: #999;
}
</style>
</head>

<body">
	<div class="header" id="header">
		<jsp:include page="../common/head.jsp" />
	</div>
	<div class="container" id="container">
		<div id="left">
			<jsp:include page="../common/container_left.jsp" />
		</div>
		<div id="right">
			<div id="lab">个人信息</div>
			<div id="border">
				<form id="form1" name="form1" method="post" action="/um/user/update">
					<input type="hidden" name="iseditedStatus" id="iseditedStatus" />
					<table width="800" border="0" cellspacing="12" cellpadding="0">
						<tr>
							<td width="26">&nbsp;</td>
							<td width="65">&nbsp;</td>
							<td width="151">&nbsp;</td>
							<td width="78">&nbsp;</td>
							<td width="56">&nbsp;</td>
							<td width="340">&nbsp;</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>用户名：</td>
							<td colspan="2"><input name="id" type="hidden" id="id"
								value="${user.id }" />${user.loginId }</td>
							<td>姓名:</td>
							<td><input name="userName" type="text" id="userName"
								value="${user.name }" /><label id="userNameText"
								style="color: red;">*</label></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>状态：</td>
							<td colspan="2"><label id="userStatus">${userStatus}</label></td>
							<td><label for="email">E-mail:</label></td>
							<td><input name="email" type="text" id="email"
								value="${user.email }" /><label id="emailText"
								style="color: red;">*</label></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>备注：</td>
							<td colspan="2"><input name="remark" type="text" id="remark"
								value="${user.remark }" /><label id="remarkText"
								style="color: red;">*</label></td>
							<td>收入保障二期系统用户ID:</td>
							<td><label id="motoId">${user.motoRAUserId }</label></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td colspan="4"><input type="checkbox" name="items"
								onclick="isedited()" />是否修改密码</td>
							<td></td>
						</tr>
					</table>
					<fieldset style="width: 360px; position: relative; left: 50px;">
						<legend>密码修改：</legend>
						<table style="position: relative; left: 30px;" border="0"
							cellspacing="12" cellpadding="0">
							<tr>
								<td>旧密码：</td>
								<td><input name="oldPasswordValid" type="hidden"
									id="oldPasswordValid" value="0" /> <input type="password"
									name="oldPassword" id="oldPassword" style="width: 100px;" />&nbsp;<label
									id="oldPasswordText" style="color: red;">*</label></td>
							</tr>
							<tr>
								<td>新密码：</td>
								<td><input name="password" type="password" id="password"
									style="width: 100px;" /> <label id="passwordText"
									style="color: red;">*</label></td>
							</tr>
							<tr>
								<td>重复输入新密码：</td>
								<td><input name="confirmPassword" type="password"
									id="confirmPassword" style="width: 100px;" /> <label
									id="confirmPasswordText" style="color: red;">*</label></td>
							</tr>
						</table>
					</fieldset>
					<table width="800" border="0" cellspacing="12" cellpadding="0">
						<tr>
							<td width="6">&nbsp;</td>
							<td width="79">&nbsp;</td>
							<td width="219">&nbsp;</td>
							<td width="49">&nbsp;</td>
							<td width="23">&nbsp;</td>
							<td width="340">&nbsp;</td>
						</tr>
						<tr>
							<td width="6">&nbsp;</td>
							<td width="79">所属用户组：</td>
							<td width="219" class="gray"><input name="groupName"
								type="text" id="groupName" readonly="readonly"
								value="${user.sysUserGroup.name }" /><input name="groupId"
								type="hidden" id="groupId" value="${user.sysUserGroup.id }" /></td>
							<td width="49" align="left" valign="bottom" class="gray"><a
								href="#" onclick="openGroupOneDialog();">更改</a></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td>拥有角色：<input name="roleIds" type="hidden" id="roleIds"
								value="${roleIds }" /></td>
							<td colspan="2" class="gray">用户组的角色信息不在此处显示和编辑</td>
						</tr>
						<tr>
						
							<td>&nbsp;</td>
							<td colspan="2" align="left">已关联的BOMC用户：<input type="hidden"
								id="bomcUserId" name="bomcUserId"
								value="${user.sysBomcUser.id }"></input><label id="bomcUser"
								style="color: red">${user.sysBomcUser.name }</label>&nbsp;&nbsp;&nbsp;<a
								href="#" onclick="openRelateUserDialog();">+选择BOMC用户</a></td>
							<td align="left"></td>
						</tr>
					</table>
					<table width="800" border="0" cellspacing="12" cellpadding="0">
						<tr>
							<td>&nbsp;</td>
							<td colspan="3">
								<table id="roleTable" width="100%">
									<thead>
										<tr>
											<th align="left" width="10%"><input type="checkbox"
												id="roleItemId" name="roleItemId" onclick="roleAllCheck();" /></th>
											<th width="30%">角色名称</th>
											<th width="30%">状态</th>
											<th width="30%">描述</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="4" class="dataTables_empty">Loading data
												from server</td>
										</tr>
									</tbody>
									<tfoot>
									</tfoot>
								</table>
							</td>
						</tr>
						<tr>
							<td width="22">&nbsp;</td>
							<td width="73"><a href="#" onclick="delRoleRow();"
								onmouseout="MM_swapImgRestore()"
								onmouseover="MM_swapImage('shanchu','','/imgs/um/preclickshanchu.png',1)"><img
									src="/imgs/um/normalshanchu.png" name="shanchu" width="61"
									height="20" border="0" id="shanchu" /></a></td>
							<td width="1060" align="left" valign="bottom" class="gray"><a
								href="#" onclick="openRoleManyDialog();"><font size="2">+为用户添加角色</font></a></td>
						</tr>
					</table>
					<table width="800" border="0" cellspacing="12" cellpadding="0">
						<tr>
							<td width="361" align="right"><a href="#" onclick="save();"
								onmouseout="MM_swapImgRestore()"
								onmouseover="MM_swapImage('save','','/imgs/button/preclickbaocun.png',1)"><img
									src="/imgs/button/normalbaocun.png" width="61" height="20"
									border="0" /></a></td>
							<td width="439"><a a href="#"
								onclick="location.href='/um/user'"
								onmouseout="MM_swapImgRestore()"
								onmouseover="MM_swapImage('cancel','','/imgs/button/preclickquxiao.png',1)"><img
									src="/imgs/button/normalquxiao.png" name="cancel" width="61"
									height="20" border="0" id="cancel" /></a></td>
						</tr>
					</table>
				</form>
				<%@include file="um/group_select_one.jsp"%>
				<%@include file="um/role_select_many.jsp"%>
				<%@include file="common/confirm.jsp"%>
			</div>
		</div>
	</div>
</body>
</html>