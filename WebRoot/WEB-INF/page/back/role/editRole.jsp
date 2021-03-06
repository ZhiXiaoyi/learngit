<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'editRole.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<script type="text/javascript" src="js/back/ckform.js"></script>
	<script type="text/javascript" src="js/back/common.js"></script>
	<script type="text/javascript" src="js/back/checkbox.js"></script>


		<style type="text/css">
		body {
			padding-bottom: 40px;
		}
		
		.sidebar-nav {
			padding: 9px 0;
		}
		
		@media ( max-width : 980px) {
		Enable use of floated navbar text */
			.navbar-text.pull-right {
				float: none;
				padding-left: 5px;
				padding-right: 5px;
			}
		}
		</style>
		<script>
    $(function () {  
				var obj = document.getElementsByClassName('relations');
				 for(var i=0;i<obj.length;i++){
				 	$("#"+obj[i].value+"").attr("checked", true);
				 	
				 }

    });
</script>
</head>


<body>
	<div class="panel panel-info">
		<div class="panel-heading">编辑角色</div>
		<div class="panel-body">
			<form action="role/editrole" method="post" class="definewidth m20">
				<table class="table table-bordered table-hover definewidth m10">
					<tr>
						<td width="10%" class="tableleft">角色名称</td>
						<td><input type="text" name="role.roleName" value="${role.roleName}"/>
							<input  type="hidden" name="role.roleId" value="${role.roleId}"/>
						</td>
							
					</tr>
					<tr>
						<td class="tableleft">权限</td>
						<td>
							<ul>
								<li>
									<input id="1" type='checkbox' name='node' value='1' />基础数据管理
									<ul>
										<li>
										<input id="2" type='checkbox' name='node' value='2' />数据字典
										<li>
										<input id="3" type='checkbox' name='node' value='3' />区域管理
										<li>
										<input id="4" type='checkbox' name='node' value='4' />组织机构管理
										<li>
										<input id="5" type='checkbox' name='node' value='5' />积分商品上传
									</ul>
								</li>
								
								<li>
								    <input id="6" type='checkbox' name='node' value='6' />数据查询统计
								    <ul>
										<li>
										<input id="7" type='checkbox' name='node' value='7' />营业统计
										<li>
										<input id="8" type='checkbox' name='node' value='8' />区域营业统计
										<li>
										<input id="9" type='checkbox' name='node' value='9' />营业厅管理
									</ul>
								</li>
								
								<li>
									<input id="10" type='checkbox' name='node' value='10' />业务审核管理
									<ul>
										<li>
										<input id="11" type='checkbox' name='node' value='11' />手机套餐审核
										<li>
										<input id="12" type='checkbox' name='node' value='12' />商品购买审核
										<li>
										<input id="13" type='checkbox' name='node' value='13' />查看业务操作
									</ul>
								</li>
								
								<li>
									<input id="14" class="group[]" type='checkbox' name='node' value='14' />系统管理
									<ul>
										<li>
										<input id="15" class="group" type='checkbox' name='node' value='15' />用户管理(包括用户的添加、删除、修改)
										<li>
										<input id="16" class="group" type='checkbox' name='node' value='16' />角色管理(包括角色的添加、删除、修改)
									</ul>
								</li>
						</ul> 
	            </td>
	        </tr>
	        <tr>
	            <td class="tableleft"></td>
	            <td>
	                <button type="submit" class="btn btn-primary"type="button">保存</button> &nbsp;&nbsp;
	                <button type="button" class="btn btn-success" name="backid" id="backid">返回列表</button>
	            </td>
	        </tr>
	    </table>
	    </form>
	    <c:forEach items="${role.relationList}" var="relation">
				<input type="hidden" class="relations" value="${relation.jurisdictionId}">				  
		</c:forEach>
	</div>
	</div>
</body>
</html>
		
		