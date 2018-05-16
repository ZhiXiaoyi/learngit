
/**
 * Describe��ҳ�泣�ù��ܵ�Ԫ
   Author��bellone
 * @param {Object} str
 */
	/**
	 * �����ַ�������,һ�������ַ���2
	 * @param {Object} str
	 */
function checkStrLength(str){
			var pattern=/^[\u0391-\uFFE5]+$/;
			var len=0;
			for(var i=0;i<str.length;i++){
				var s=str.substr(i,1);
				if(pattern.test(s)){
					len+=2;
				}else{
					len+=1;
				}
			}
			return len;
	 }
	 
	 /**
	  * �鿴ĳ����ֵ�Ƿ�Ϊ��,��Ϊ��ʱ�����档
	  */
	 function isEmpty(str){
		 if(document.getElementById(str) != null){
				if (document.getElementById(str).value==""){
					 //���Ϊ����Ϊ��
					 return true;
				}else{
					 return false;
				}
		 }else{
			  return false;
		 }
	 }
	 
	 /**
	  * �鿴ĳ����ֵ�Ƿ�Ϊ��,��Ϊ��ʱ���ؼ١�
	  */
	function checkEmpty(str){
		 if(document.getElementById(str) != null){
				if (document.getElementById(str).value==""){
					 //���Ϊ����Ϊ��
					 return false;
				}else{
					 return true;
				}
		 }else{
			  return true;
		 }
	 }
	 
	 /**
	  * ��֤��ѡ�򣬸�ѡ��
	  * @param {Object} nameStr
	  */
	 function checkRadioAndBox(str){
		 if(document.getElementsByName(str) != null){
			  for (i=0;i<document.getElementsByName(str).length;i++){
						  if(document.getElementsByName(str)[i].checked){
							   return true;
						  }
			   }
			   return false;
		 }else{
			  return true;
		 }
	 }
	 
	 /**
	  * ȡ�ýڵ��ֵ
	  * @param {Object} nameStr
	  */
	 function getElementValue(nameStr){
	 	var replay = "";
	 	if(document.getElementById(nameStr)){
			replay = document.getElementById(nameStr).value;
		}
		return replay;
	 }
	 
	 /**
	  * ��֤ĳֵ�Ƿ����
	  * @param {Object} nameStr
	  */
	 function isExist(str){
		if(document.getElementById(str) != null){
		 	return true;
		}else{
		    return false;	
		}
	 }
	 
	 /* *
	  * �Ƴ�����ѡ�е�
	  * @param {Object} str
	  */
	 function delSelectNodes(elementId){
		 var elem = document.getElementById(elementId);
		 	while (elem.childNodes.length > 0) {
				elem.removeChild(elem.childNodes[0]);
			}
	 }
	 
	 /**
	  *����ʹ��ѡ���ĳ��ѡ�ѡ��
	  */
	 function selectedOptions(selectId,cmpValue)
	 {
	 	var selectElem = document.getElementById(selectId);
	 	for (var i=0;i< selectElem.options.length;i++)
		{
		 	if(selectElem.options[i].value == cmpValue)
		 	{selectElem.options[i].selected=true;break;}
		}
	 }
	 
	 /**
	 * @param {Object} fNameList չ�ֵ��б�ֵ��fOldΪ��ֵ��
	 * �����ֵΪ�б�ֵ��ĳһ���ѡ����
	 */
	 function checkedOldValue(fNameList ,fOld){
		 var num_pic = document.getElementsByName(fNameList);
		 var old_str = document.getElementById(fOld);
		 if(num_pic != null && old_str != null){
			 for (k=0;k<num_pic.length;k++){
				  var sinFname = document.getElementsByName(fNameList)[k];
				  if(sinFname.value == old_str.value){
					   sinFname.checked = true;
				  }
			 }
		 }
	 }
	 
	 /**
	  * ���ý���
	  * @param {Object} str
	  */
	 function setFocus(str){
		if(document.getElementById(str) != null){
		 	document.getElementById(str).focus();
		}
	 }
	 
	  /*������*/
	  function imgReset(form_modify){
	     	document.getElementById(form_modify).reset();  
	  }
	  
	/**
	 * ��֤�绰�����ʽ
	 * @param {Object} str
	 */
	function  checkPhoneNum(str,rep_str){
		    var replay_str = "��ϵ�绰";
			if(rep_str != undefined && rep_str != "")replay_str = rep_str;
		    var replay = "0";
			var _relationtel = document.getElementById(str);
			if(_relationtel == null){
					return true;
			}else if(_relationtel.value == ""){
					replay = "����д"+replay_str+"������";
					alert(replay);
					return false;
			}else if(_relationtel.value.length < 7){
					replay = "�����"+replay_str+"��ӦС��7λ������";
					alert(replay);
					return false;
			}else if( _relationtel.value.replace(/[\d|-]/g,'')!=""){
					replay = "�����"+replay_str+"��ʽ���ԣ�ֻ������ - ������ ������";
					alert(replay);
					return false;
			}else{
					return true;
			}
	}
	
	/**
	 * ��֤�绰�����ҿ����ʽ
	 * @param {Object} str
	 */
	function  checkPhoneAndNet(str,rep_str){
			var replay_str = "ҵ�����";
			if(rep_str != undefined && rep_str != "")replay_str = rep_str;
		    var replay = "0";
			var _relationtel = document.getElementById(str);
			if(_relationtel == null){
					return true;
			}else if(_relationtel.value == ""){
					replay = "����д"+replay_str+"�����ֻ���ĸ��������";
					alert(replay);
					return false;
			}else if(_relationtel.value.length < 6){
					replay = "�����"+replay_str+"��ӦС��6λ������";
					alert(replay);
					return false;
			}else if( _relationtel.value.replace(/[\w.@]/g,'')!=""){
					replay = "�����"+replay_str+"��ʽ���ԣ�ֻ������@����������ĸ ������";
					alert(replay);
					return false;
			}else{
					return true;
			}
	}
	
	/**
	 * ��֤����ʺ�
	 * @param {Object} str
	 */
	function  checkNetAccount(str,rep_str){
			var replay_str = "����ʺ�";
			if(rep_str != undefined && rep_str != "")replay_str = rep_str;
			var netAcc = document.getElementById(str);
			var check=/^[a-z]{2}[A-Za-z0-9]/;
			if(netAcc == null){
				return true;
			}else if(netAcc.value == ""){			   
				alert("��������װ"+replay_str+"����װ����ʺŲ���Ϊ�գ�����");
				return false;
			}else if(netAcc.value.length < 6 ) {         
				alert("��Ǹ��ϵͳ֧�ֵ���С�ʺ��ַ�����Ϊ6λ�����������"+replay_str+"λ����лл������");
				return false;
			}else if(netAcc.value.length > 8) {        
				alert("��Ǹ��ϵͳ֧�ֵ�����ʺ��ַ�����Ϊ8λ�����������"+replay_str+"λ����лл������");
				return false;
			}else if(!check.test(netAcc.value)) {        
				alert("��Ǹ���������"+replay_str+"��ʽ����ȷ�����������룬лл������");
				return false;
			}else{
				return true;
			}
	}
	
			
	/**
	 * ��֤���֤��ʽ
	 * @param {Object} str
	 */
	function checkCardNo(cartnoStr){	
		//�������֤����֤
		var pattern=/^\d{15}(\d{2}[Xx0-9])?$/;
		if(document.getElementById(cartnoStr) != null && document.getElementById(cartnoStr).style.display != "none"){
			if(!pattern.test(document.getElementById(cartnoStr).value.Trim())){
				alert("���֤������,��ȷ�ϣ�����");
				return false;
			}else{
				 return true;
			}
		}else{
			return true;
		}
	}
	
	//�̻���ADSLͬװ�е����ʼ�����Ҫ������֤��
	function checkEmailForNew(str){
		var emailStr = document.getElementById(str);
		if(pri_checkEmail(emailStr.value)){
					 return true;
				}else{
					 alert("������ĵ����ʼ���ʽ���ԣ�����");
					 return false;
				}
	}
	/**
	 *�ֻ���ʽ�޸�
	 */
	function checkMobile(str,rep_str){
		var replay_str = "�ֻ�����";
		if(rep_str != undefined && rep_str != "")replay_str = rep_str;
		var mobileObj = document.getElementById(str);
		var cdma_no = mobileObj.value;
	    if(cdma_no == ""){
		  	alert("������"+replay_str+"��");
		  	document.getElementById(str).focus();
			return;
	   }
	   var reg=new RegExp(/^\d{11}$/);
   	   if(!reg.test(cdma_no)){
	   	    alert(replay_str+"��ʽ��������������!!!");
	   	    document.getElementById(str).focus();
	   	    return false;
   	   }	
	  if(cdma_no.substring(0,3)!="133" && cdma_no.substring(0,3)!="153" && cdma_no.substring(0,3)!="189" && cdma_no.substring(0,3)!="180"&& cdma_no.substring(0,3)!="181"&& cdma_no.substring(0,3)!="177"  && cdma_no.substring(0,3)!="173"){
	  		alert("�Բ����������"+replay_str+"���ǺϷ���CDMA�û�!");		  		
	  		return false;
	  }
	  return true;
	}
	
	/**
	 * ��֤email��ʽ
	 * @param {Object} str
	 */
	function checkEmail(str,isRequired){
		 var emailStr = document.getElementById(str);

		 if(emailStr != null){
			 	if(isRequired != undefined && isRequired != ""){
					if(emailStr.value== ""){
						 alert("������ĵ����ʼ�������");
						 return false;
					}
				}
			
			    if(pri_checkEmail(emailStr.value)){
					 return true;
				}else{
					 alert("������ĵ����ʼ���ʽ���ԣ�����");
					 emailStr.focus();
					 emailStr.select();
					 return false;
				}
		 }else{
		    return false;
		 }
	}
	function pri_checkEmail(emailStr) {
        if (emailStr.length == 0) {
            return true;
        }
        // TLD checking turned off by default
        var checkTLD=0;
        var knownDomsPat=/^(com|cn|mobi|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
        var emailPat=/^(.+)@(.+)$/;
        var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
        var validChars="\[^\\s" + specialChars + "\]";
        var quotedUser="(\"[^\"]*\")";
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
        var atom=validChars + '+';
        var word="(" + atom + "|" + quotedUser + ")";
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
        var matchArray=emailStr.match(emailPat);
        if (matchArray==null) {
            return false;
        }
        var user=matchArray[1];
        var domain=matchArray[2];
        for (i=0; i<user.length; i++) {
            if (user.charCodeAt(i)>127) {
                return false;
            }
        }
        for (i=0; i<domain.length; i++) {
            if (domain.charCodeAt(i)>127) {
                return false;
            }
        }
        if (user.match(userPat)==null) {
            return false;
        }
        var IPArray=domain.match(ipDomainPat);
        if (IPArray!=null) {
            for (var i=1;i<=4;i++) {
                if (IPArray[i]>255) {
                    return false;
                }
            }
            return true;
        }
        var atomPat=new RegExp("^" + atom + "$");
        var domArr=domain.split(".");
        var len=domArr.length;
        for (i=0;i<len;i++) {
            if (domArr[i].search(atomPat)==-1) {
                return false;
            }
        }
        if (checkTLD && domArr[domArr.length-1].length!=2 && 
            domArr[domArr.length-1].search(knownDomsPat)==-1) {
            return false;
        }
        if (len<2) {
            return false;
        }
        return true;
    }
	/**
	 * ����������ʽss ��֤val
	 * @param val
	 * @param ss
	 * @return
	 */
	function isTrue(val,ss){
		var reg=ss;
		if (!ss.exec(val))return false;
		else return true;
	}
     /**
	 * �������__�����޸�ҳ��ı�����check
	 * ���б�IDӦ������һ���ģ�form����form_modify��������OLDPWD��������NEWPWD��ȷ������RE_NEWPWD����֤��yzm
	 */
	 function modifyNetPwd(){
	 		var oldpwd = document.form_modify.OLDPWD.value;
	 		var newpwd = document.form_modify.NEWPWD.value;
	 		var re_newpwd = document.form_modify.RE_NEWPWD.value;
	 		var yzm = document.form_modify.yzm.value;
	 		if (oldpwd == ""){ 
					alert("����д�����룡"); 
					document.form_modify.OLDPWD.focus();
					return false;
			}
		    if (newpwd=="") { 
					alert("����д�����룡"); 
					document.form_modify.NEWPWD.focus();
					return false;
			}
			if(document.form_modify.NEWPWD.value.length < 6 || document.form_modify.NEWPWD.value.length > 16) {         
				alert("���볤�ȱ�����6-16λ��"); 
				document.form_modify.NEWPWD.value = "";
				document.form_modify.NEWPWD.focus();
				return false;
			}
			
		    if (re_newpwd==""){ 
					alert("����дȷ�����룡"); 
					document.form_modify.RE_NEWPWD.focus();
					return false;
			}			
		 	if (re_newpwd.length != newpwd.length) { 
				alert("��������ȷ������λ����һ�£�"); 
				document.form_modify.RE_NEWMM.value="";
				document.form_modify.RE_NEWMM.focus();
				return false;
			 }
			if (re_newpwd != newpwd) { 
				alert("��������ȷ�����벻һ�£�"); 
				document.form_modify.NEWPWD.value="";
				document.form_modify.RE_NEWPWD.value="";
				document.form_modify.NEWPWD.focus();
				return false;
			 }
			if (oldpwd == newpwd) { 
					alert("���������������һ�µģ�"); 
					document.form_modify.NEWPWD.value="";
					document.form_modify.NEWPWD.value="";
					document.form_modify.RE_NEWPWD.value="";
					return false;
			 }
			 if(!isTrue(newpwd,/^[a-zA-Z0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣����������룡");
				document.getElementById("NEWMM").value = "";
				document.getElementById("NEWMM").focus();
				return false;
		   }
			//ȡ����β��6λ
			 var newpwd_la = newpwd.substring(newpwd.length-6,newpwd.length);
			 if(!isTrue(newpwd_la,/^[0-9]*$/)){
					alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
					document.getElementById("NEWMM").value = "";
					document.getElementById("NEWMM").focus();
					return false;
			    }
			 for(var i=0;i<newpwd.length;i++){
					var c=newpwd.substring(i,i+1);
					if(c==' ' || c=='-' ||c=='��' ||c=='��' ||c=='$'){
						alert("�����뺬�пո�-����������$�ȷǷ��ַ������������룡"); 
						document.form_modify.NEWPMM.value="";
						document.form_modify.RE_NEWMM.value="";
						document.form_modify.NEWPWD.focus();
						return false;
					}
				}
			 if (document.form_modify.yzm.value=="") { 
					alert("��֤�벻��Ϊ�գ�"); 
					document.form_modify.yzm.focus();
					return false;
			  }
	 }

     /**
	 * �̻�С��ͨ__�����޸�ҳ��ı�����check
	 * ���б�IDӦ������һ���ģ�form����form_modify��������OLDPWD��������NEWPWD��ȷ������RE_NEWPWD����֤��yzm
	 */
	 function modifyPwd(){
	       	var oldpwd = document.form_modify.OLDPWD.value;
	 		var newpwd = document.form_modify.NEWPWD.value;
	 		var re_newpwd = document.form_modify.RE_NEWPWD.value;
	 		var yzm = document.form_modify.yzm.value;
	 		if(isNaN(oldpwd)){
	 				alert("����Ӧ������");
	 				document.form_modify.OLDPWD.focus();
	 				return false;
	 		}
	 		if(isNaN(newpwd)){
	 				alert("����Ӧ������");
	 				document.form_modify.NEWPWD.focus();
	 				return false;
	 		}
	 		if(isNaN(re_newpwd)){
	 				alert("����Ӧ������");
	 				document.form_modify.RE_NEWPWD.focus();
	 				return false;
	 		}	 			 		
	 	   if (newpwd.length != 6){ 
					alert("���볤�ȱ�����6λ��"); 
					document.form_modify.NEWPWD.focus();
					return false;
			}
		   if (re_newpwd.length != 6){ 
					alert("���볤�ȱ�����6λ��"); 
					document.form_modify.RE_NEWPWD.focus();
					return false;
			}
	 		if (oldpwd == ""){ 
					alert("����д�����룡"); 
					document.form_modify.OLDPWD.focus();
					return false;
			}
		    if (newpwd=="") { 
					alert("����д�����룡"); 
					document.form_modify.NEWPWD.focus();
					return false;
			}
		    if (re_newpwd==""){ 
					alert("����дȷ�����룡"); 
					document.form_modify.RE_NEWPWD.focus();
					return false;
			}
			if (re_newpwd.length != newpwd.length) { 
					alert("��������ȷ������λ����һ�£�"); 
					document.form_modify.RE_NEWPWD.value="";
					document.form_modify.RE_NEWPWD.focus();
					return false;
			 }
			if (re_newpwd != newpwd) { 
					alert("��������ȷ�����벻һ�£�"); 
					document.form_modify.NEWPWD.value="";
					document.form_modify.RE_NEWPWD.value="";
					document.form_modify.NEWPWD.focus();
					return false;
			 }
			if (oldpwd == newpwd) { 
					alert("���������������һ�µģ�"); 
					document.form_modify.NEWPWD.value="";
					document.form_modify.RE_NEWPWD.value="";
					document.form_modify.NEWPWD.focus();
					return false;
			 }
			  if(!isTrue(newpwd,/^[a-zA-Z0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣����������룡");
				document.getElementById("NEWMM").value = "";
				document.getElementById("NEWMM").focus();
				return false;
		   }
			//ȡ����β��6λ
			 var newpwd_la = newpwd.substring(newpwd.length-6,newpwd.length);
			 if(!isTrue(newpwd_la,/^[0-9]*$/)){
					alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
					document.getElementById("NEWMM").value = "";
					document.getElementById("NEWMM").focus();
					return false;
			    }
			 for(var i=0;i<newpwd.length;i++){
					var c=newpwd.substring(i,i+1);
					if(c==' ' || c=='-' ||c=='��' ||c=='��' ||c=='$'){
						alert("�����뺬�пո�-����������$�ȷǷ��ַ������������룡"); 
						document.form_modify.NEWPMM.value="";
						document.form_modify.RE_NEWMM.value="";
						document.form_modify.NEWPWD.focus();
						return false;
					}
				}
			 if (yzm=="") { 
					alert("��֤�벻��Ϊ�գ�"); 
					document.form_modify.yzm.focus();
					return false;
			  }
	 }
	 
	 /**
	 * �̻�С��ͨ__�����޸�ҳ��ı�����check(������ѽ��ܵĵ�¼���󡱰�ȫ����)
	 * ���б�IDӦ������һ���ģ�form����form_modify��������OLDPWD��������NEWPWD��ȷ������RE_NEWPWD����֤��yzm
	 */
	  function modifyPwdNew(){
	       	var oldpwd = document.form_modify.OLDMM.value;
	 		var newpwd = document.form_modify.NEWMM.value;
	 		var re_newpwd = document.form_modify.RE_NEWMM.value;
	 		var yzm = document.form_modify.yzm.value;
	 		if (oldpwd == ""){ 
				alert("����д�����룡"); 
				document.form_modify.OLDMM.focus();
				return false;
	 		}
		    if (newpwd=="") { 
					alert("����д�����룡"); 
					document.form_modify.NEWMM.focus();
					return false;
			}
		    if (re_newpwd==""){ 
					alert("����дȷ�����룡"); 
					document.form_modify.RE_NEWMM.focus();
					return false;
			}
	 	   if (newpwd.length < 6||newpwd.length > 16){ 
					alert("���볤�ȱ�����6-16λ��"); 
					document.form_modify.NEWMM.focus();
					return false;
			}
		   if (re_newpwd.length < 6||re_newpwd.length > 16){ 
					alert("ȷ�����볤�ȱ�����6-16λ��"); 
					document.form_modify.RE_NEWMM.focus();
					return false;
			}
			if (oldpwd.length < 6||oldpwd.length > 16){ 
				alert("�����볤�ȱ�����6-16λ��"); 
				document.form_modify.OLDMM.focus();
				return false;
		}
		if (re_newpwd.length != newpwd.length) { 
					alert("��������ȷ������λ����һ�£�"); 
					document.form_modify.RE_NEWPWD.value="";
					document.form_modify.RE_NEWPWD.focus();
					return false;
			 }
			if (re_newpwd != newpwd) { 
					alert("��������ȷ�����벻һ�£�"); 
					document.form_modify.NEWMM.value="";
					document.form_modify.RE_NEWMM.value="";
					document.form_modify.NEWMM.focus();
					return false;
			 }
			if (oldpwd == newpwd) { 
					alert("���������������һ�µģ�"); 
					document.form_modify.NEWMM.value="";
					document.form_modify.RE_NEWMM.value="";
					document.form_modify.NEWMM.focus();
					return false;
			 }
		   
		   if(!isTrue(oldpwd,/^[a-zA-Z0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
				document.form_modify.OLDMM.focus();
				return false;
		   }
		   if(!isTrue(newpwd,/^[a-zA-Z0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
				document.form_modify.NEWMM.focus();
				return false;
		   }
		   if(!isTrue(re_newpwd,/^[a-zA-Z0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
				document.form_modify.RE_NEWMM.focus();
				return false;
		   }	 			 
		   //ȡ����β��6λ
	 		var newpwd_la = newpwd.substring(newpwd.length-6,newpwd.length);
	 		var re_newpwd_la = re_newpwd.substring(re_newpwd.length-6,re_newpwd.length);
	 		if(!isTrue(newpwd_la,/^[0-9]*$/)){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
				document.form_modify.NEWMM.focus();
				return false;
		    }
		    if(!isTrue(re_newpwd_la,/^[0-9]*$/) && re_newpwd.length>6){
				alert("�������ʽ��Ϊ6-16λ������+�ַ�����ϣ��Һ�6λ����Ϊ�����֣�����������!");
				document.form_modify.RE_NEWMM.focus();
				return false;
		     }		
		     	for(var i=0;i<newpwd.length;i++){
					var c=newpwd.substring(i,i+1);
					if(c==' ' || c=='-' ||c=='��' ||c=='��' ||c=='$'){
						alert("�����뺬�пո�-����������$�ȷǷ��ַ������������룡"); 
						document.form_modify.NEWPMM.value="";
						document.form_modify.RE_NEWMM.value="";
						document.form_modify.NEWPWD.focus();
						return false;
					}
				}
			 if (yzm=="") { 
					alert("��֤�벻��Ϊ�գ�"); 
					document.form_modify.yzm.focus();
					return false;
			  }
	 }
	 

	
	/**
	 * ֻ�������ַ��������������Ч,�������ַ�ʱ������תΪ�հף��൱��������
	 * @param {Object} str
	 */
	 function checkKeyUpStrIsNum(elementId){
		 if(document.getElementById(elementId) != null){
			 	var vStr = document.getElementById(elementId);
		  			vStr.value=vStr.value.replace(/[^\d]/g,'');
		 }
	 }
	 
	/**
	 * wull
	 * ���˷Ƿ��ַ�
	 */
	function htmlEncode(str) {
		str = str.replace(/&/ig,"��");
		str = str.replace(/ /ig," ");
		str = str.replace(/>/ig,"��");
		str = str.replace(/</ig,"��");
		str = str.replace(/&#60;br&#62;/ig,"<br>");
		str = str.replace(/<br>/ig,"<br>");
		str = str.replace(/\'/ig,"'");
		str = str.replace(/'/gi,"'");
		return str ;
	}
	
	/**
	 * ת�����б���ֵ�������ַ�
	 * ������ѡ��Ͷ�ѡ��
	 * @param {} formObj
	 */
	function replaeFormValue(formObj) {
		formObj = document.forms[formObj] || document.getElementById(formObj) || formObj;
		if(!formObj) return;
		try{
			for (var i=0;i<formObj.elements.length;i++ )
				{
					var el = formObj.elements[i];
					var elValue = el.value;
					elValue = elValue.replace(/</g,"��");
					elValue = elValue.replace(/>/g,"��");
					elValue = elValue.replace(/&/g,"��");
					elValue = elValue.replace(/'/ig,"��");
					elValue = elValue.replace(/"/gi,"��");
					elValue = elValue.replace(/:/gi,"��");
					elValue = elValue.replace(/\%|\<|\>|\[|\]|\{|\}|\;|\&|\+|\-|\(|\)/g,"");
					el.value = elValue;
			}
		}catch(e){}
	}


	/**
	 * ȥ���ո�
	 * @param {Object} str
	 */
	 String.prototype.Trim = function() { 
		return this.replace(/(^\s*)|(\s*$)/g, ""); 
	 } 
	 //ȥ��ͷ�ո�
	 String.prototype.LTrim = function() { 
		return this.replace(/(^\s*)/g, ""); 
	 } 
	 //ȥ��β�ո�
	 String.prototype.RTrim = function(){ 
		return this.replace(/(\s*$)/g, ""); 
	 } 
	 
	 /**
	  * ���������ַ�
	  * ����@����,�����¼Ҫ��
	  * ����IE ,FF
	  * 
	  */
	 function filerValidChar(event){
	 	var event = event || window.event;
	 	var keyCode = event.which || event.keyCode;
	 	if ((keyCode > 32 && keyCode < 48)
			|| (keyCode > 57 && keyCode < 64)
			|| (keyCode > 90 && keyCode < 95) || (keyCode == 96) || (keyCode > 122 && keyCode <127)){
			      if(window.event)
			         event.returnValue = false;
			      else
			    	  event.preventDefault();//for firefox
	 	}
	}
	 /**
	  * �첽������簲ȫ��־
	  * url: 
	  * servicenumber:
	  */
	function ajaxInsertSafeLog(Url,Servicenumber){
		if(Url==null|Url==undefined||Url==""){
			//�ֶ�Ϊ�ղ����κδ���
		}else{
			try{
				var path = "/AjaxServlet.do";
		    	jQuery.ajax( {
			  		url : path,
			  		type : 'POST',
			  		dataType : 'json',
			  		cache : false,
			  		async : true,
			  		data : ( {
			  			method:'insertsalelog',url:Url,servicenumber:Servicenumber
			  		}),
			  		timeout : 10000,
			  		success : function(json) 
			  		{
		    				//�ɹ�����������
			  		},
					error : function() 
					{
				   		//�쳣����������
					}
			  	});
				
			}catch(err){
				//ȷ���쳣����Ӱ������ҵ��
			}
		}
			
			
		
	}

	
