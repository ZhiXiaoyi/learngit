
// ȫ�ֱ������ڼ�¼�û���һ��ѡ�еĳ�ֵ��ʽ
var beforem = 0;
/** ***************************** �������� ********************************** */
// ��ֵ��ҳ���͵��к����ȡ����ʱ���ּӴֺ������Ӻ�߿�
function focusInput(type){	
	var labels=["type_label","city_label","phone_label"];
	var inputs=["type_input","phone_input"];
	jQuery(".phoneselectOption").css("display","none");	
	for(var i=0;i<labels.length;i++){
		if(labels[i].substring(0,labels[i].indexOf('_'))==type){
			jQuery("#"+labels[i]).css('font-weight','bold');
		}else{
			jQuery("#"+labels[i]).css('font-weight','normal');
		}
	}
	for(var j=0;j<inputs.length;j++){
		if(inputs[j].substring(0,inputs[j].indexOf('_'))==type){
			jQuery("#"+inputs[j]).css('border-bottom-color','#ff6507').css('border-left-color','#ff6507').css('border-right-color','#ff6507').css('border-top-color','#ff6507');
		}else{
			jQuery("#"+inputs[j]).css('border-bottom-color','#aaaaaa').css('border-left-color','#aaaaaa').css('border-right-color','#aaaaaa').css('border-top-color','#aaaaaa');
		}
	}
}

function checkEmpty(str){
	var str=jQuery("#"+str).val();
	 if(str!=null&&str!=""){
		 return true;
	 }else{
		 return false;
	 }
}
 function phoneNumFocus(that){
		if(that.value=="��ֵ�������������"){
			  that.value="";
		}
		var ordertype = jQuery("#ORDERTYPE").val();
		var phonenum=that.value;
		if(ordertype=="50"&&phonenum.length==11){
			jQuery("#phonenumlast").val(phonenum);
		}
 }
 
 // ����ѯ
 function getBalance(){ 
	 
 	if (!checkEmpty("ORDERTYPE")){
 		jQuery("#ORDERTYPE_PROMPT_W").css("display","inline-block");
		return false;
 	}
 	
 	var orderType = jQuery("#ORDERTYPE").val();
 	// ����У�� 1,Ϊ�̶��绰;11,Ϊ����;2,ΪС��ͨ;-1,ΪԤ��ͨ;3,Ϊ���ADSL;6Ϊ���LAN)
 	if(orderType == "1" || orderType == "11" || orderType == "2" || orderType == "-1" || orderType == "3" || orderType == "6"){
 		if (!checkEmpty("PAYCITYCODE")){
 			jQuery("#PAYCITYCODE_PROMPT_W").css("display","inline-block");
 			return false;
 	 	}
 	}
 	
 	var cityCode = jQuery("#PAYCITYCODE").val();
 	var phoneNum = jQuery("#PHONENUM").val(); 	
 	if(phoneNum == "" || phoneNum == null){
 		jQuery("#PHONENUM_PROMPT").html("�������ֵ���룡");
 		// ��ֵ���������Ϣ��ʽչ��
		PhonenumStyle(1);
		setFocus("PHONENUM");
		return false;
 	}
 	if(orderType!='50'){
 		var flag = productIfExit(cityCode,orderType,phoneNum);
 		if(flag != "1"){
 			changeButtonGray();
 			jQuery("#PHONENUM_PROMPT").html("�Բ���������ĺ������������ĺ�����δ���ã���ѡ���Ʒ����Ϊ[Ԥ��ͨ]");
 			PhonenumStyle(1);
 			setFocus("PHONENUM");
 			return false;
 		} 	
 	} 	
 	if(cityCode == "0591" || cityCode == "0595"){
 		if(orderType == "1" || orderType == "2" || orderType == "11"){
 			if(phoneNum.length != 8){
 		 		jQuery("#PHONENUM_PROMPT").html("������8λ��ֵ���룡");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
				setFocus("PHONENUM");
				return false;
 			}
 		}
 	}else{
 		if(orderType == "1" || orderType == "2" || orderType == "11"){
 			if(phoneNum.length != 7){
 		 		jQuery("#PHONENUM_PROMPT").html("������7λ��ֵ���룡");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
				setFocus("PHONENUM");
				return false;
 			}
 		}
 	}
 	
 	if(orderType == "50" || orderType == "10"){
 		if(phoneNum.length != 11){
			jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ���룡");
			// ��ֵ���������Ϣ��ʽչ��
			PhonenumStyle(1);
			return false;
 		}
 		var cityc = findCity(phoneNum);
 		cityCode = cityc;
 		var flag = productIfExit(cityCode,orderType,phoneNum);
 		if(flag != "1"){
 			changeButtonGray();
 			jQuery("#PHONENUM_PROMPT").html("�Բ���������ĺ������������ĺ�����δ���ã���ѡ���Ʒ����Ϊ[Ԥ��ͨ]");
 			PhonenumStyle(1);
 			setFocus("PHONENUM");
 			return false;
 		} 	
 	}
 	
// if((orderType=='3'||orderType=='6') && phoneNum.length==11 &&
// (phoneNum.substring(0,3)=="133"||phoneNum.substring(0,3)=="153"||phoneNum.substring(0,3)=="180"||phoneNum.substring(0,3)=="189"||phoneNum.substring(0,3)=="181")){
// phoneNum = phoneNum + "@fj";
// }
	var path = "/PayAjaxServlet.do";
 	if(orderType == "10"){// ��֧���˻���ѯ���
 		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		data : ( {
	  			method:'newAccountQuery',
	  			prodNum:phoneNum,
	  			prodId:orderType,
	  			cityCode:cityCode,
	  			isonline:'1'
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
	 			var result = json.msg;	
				if(result.indexOf("�鲻����Ϣ����Դæ") != -1){
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!"); 
				}else if(result.indexOf("������ĺ�������") != -1){
					jQuery("#yue").html("&nbsp;������ĺ���������ȷ�Ϻ��ֵ!");
				}else if(result.indexOf("���") != -1 && result.indexOf("Ԫ") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else if(result.indexOf("���") != -1){
					jQuery("#yue").html("&nbsp;" + result + "Ԫ");
				}else if(result.indexOf("Ӧ�����") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else if(result.indexOf("������ѯ�ĺ��벻���������˻�") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else{
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!");
				}
	  		},
			error : function() 
			{
	  			jQuery("#yue").html('������ʱ�����Ժ����ԣ���');
			}
	  	});
 	}else{
 		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		data : ( {
	  			method:'getBalance',
	  			prodNum:phoneNum,
	  			prodId:orderType,
	  			cityCode:cityCode,
	  			isonline:'1'
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
	 			var result = json.msg;	
				if(result.indexOf("�鲻����Ϣ����Դæ") != -1){
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!"); 
				}else if(result.indexOf("������ĺ�������") != -1){
					jQuery("#yue").html("&nbsp;������ĺ���������ȷ�Ϻ��ֵ!");
				}else if(result.indexOf("���") != -1 && result.indexOf("Ԫ") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else if(result.indexOf("���") != -1){
					jQuery("#yue").html("&nbsp;" + result + "Ԫ");
				}else if(result.indexOf("Ӧ�����") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else if(result.indexOf("������ѯ�ĺ��벻���������˻�") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else if(result.indexOf("ÿ��1��-3��Ϊ�������ڣ��ݲ��ṩ����") != -1){
					jQuery("#yue").html("&nbsp;" + result);
				}else{
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!");
				}
				getErrorMsg();
	  		},
			error : function() 
			{
	  			jQuery("#yue").html('������ʱ�����Ժ����ԣ���');
			}
	  	});
 		
 		}
 }
 
// ����ѯ,ר�����ڳ�ֵ���ҳ����ʾ
 function getBalance1(){ 
	 
 	if (!checkEmpty("ORDERTYPE")){
		return false;
 	}
 	
 	var orderType =jQuery("#ORDERTYPE").val();
 	// ����У�� 1,Ϊ�̶��绰;11,Ϊ����;2,ΪС��ͨ;-1,ΪԤ��ͨ;3,Ϊ���ADSL;6Ϊ���LAN)
 	if(orderType == "1" || orderType == "11" || orderType == "2" || orderType == "-1" || orderType == "3" || orderType == "6"){
 		if (!checkEmpty("PAYCITYCODE")){
 			return false;
 	 	}
 	}
 		
 	var cityCode = jQuery("#PAYCITYCODE").val();
 	
 	var phoneNum = jQuery("#PHONENUM").val();
 	if(phoneNum == "" || phoneNum == null){
		return false;
 	}else if(phoneNum == "��ֵ�������������"){
		return false;
 	}
 	if(cityCode == "0591" || cityCode == "0595"){
 		if(orderType == "1" || orderType == "2" || orderType == "11"){
 			if(phoneNum.length != 8){
				return false;
 			}
 		}
 	}else{
 		if(orderType == "1" || orderType == "2" || orderType == "11"){
 			if(phoneNum.length != 7){
				return false;
 			}
 		}
 	}
 	
 	if(orderType == "50" || orderType == "10"){
 		if(phoneNum.length != 11){
			return false;
 		}
 		var cityc = findCity(phoneNum);
 		cityCode = cityc;
 	}
 	
// if((orderType=='3'||orderType=='6') && phoneNum.length==11 &&
// (phoneNum.substring(0,3)=="133"||phoneNum.substring(0,3)=="153"||phoneNum.substring(0,3)=="180"||phoneNum.substring(0,3)=="189"||phoneNum.substring(0,3)=="181")){
// phoneNum = phoneNum + "@fj";
// }
	var path = "/PayAjaxServlet.do";
 	if(orderType == "10"){// ��֧���˻���ѯ���
 		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		data : ( {
	  			method:'newAccountQuery',
	  			prodNum:phoneNum,
	  			prodId:orderType,
	  			cityCode:cityCode,
	  			isonline:'1'
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
	 			var result = json.msg;	
	 			if(result.indexOf("�鲻����Ϣ����Դæ") != -1){
	 				jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!");  
				}else if(result.indexOf("������ĺ�������") != -1){
					jQuery("#yue").html("&nbsp;������ĺ���������ȷ�Ϻ��ֵ!");    
				}else if(result.indexOf("���") != -1 && result.indexOf("Ԫ") != -1){
					if(result.indexOf("����ǰ������")!= -1){
						result = result.replace("����ǰ������","");
					}
					jQuery("#yue").html( result);   
				}else if(result.indexOf("���") != -1){
					if(result.indexOf("����ǰ������")!= -1){
						result = result.replace("����ǰ������","");
					}
					jQuery("#yue").html(result + "Ԫ");  
				}else if(result.indexOf("Ӧ�����") != -1){
					// result = result.replace("Ӧ����","");
					jQuery("#yue").html(result); 
				}else{
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!");  
				}
	  		},
			error : function() 
			{
	  			jQuery("#yue").html('������ʱ�����Ժ����ԣ���');
			}
	  	});
 	}else{
 		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		data : ( {
	  			method:'getBalance1',
	  			prodNum:phoneNum,
	  			prodId:orderType,
	  			cityCode:cityCode,
	  			isonline:'1'
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
	 			var result = json.msg;	
	 			if(result.indexOf("�鲻����Ϣ����Դæ") != -1){
	 				jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!"); 
				}else if(result.indexOf("������ĺ�������") != -1){
					jQuery("#yue").html("&nbsp;������ĺ���������ȷ�Ϻ��ֵ!");   
				}else if(result.indexOf("���") != -1 && result.indexOf("Ԫ") != -1){
					if(result.indexOf("����ǰ������")!= -1){
						result = result.replace("����ǰ������","");
					}
					jQuery("#yue").html( "&nbsp;" + result);  
				}else if(result.indexOf("���") != -1){
					if(result.indexOf("����ǰ������")!= -1){
						result = result.replace("����ǰ������","");
					}
					jQuery("#yue").html(result + "Ԫ");
				}else if(result.indexOf("Ӧ�����") != -1){
					// result = result.replace("Ӧ����","");
					jQuery("#yue").html( result);
				}else{
					jQuery("#yue").html("&nbsp;�鲻����Ϣ����Դæ�����Ժ��ֵ!");
				}
	  		},
			error : function() 
			{
	  			jQuery("#yue").html('������ʱ�����Ժ����ԣ���');
			}
	  	});
 		}
 }
 
    // �����ͺŰٳ�ֵ�Զ����ӿڲ�ѯ���жϸú����Ƿ���Գ�ֵ
	function getPaymentBalance(payType){
		var cityCode = jQuery("#PAYCITYCODE").val();
		var prodNum = jQuery("#PHONENUM").val();
		var prodId = jQuery("#ORDERTYPE").val();
		var data={ method:'getPaymentBalance',prodNum: prodNum, prodId: prodId , cityCode: cityCode, orderType: payType, isonline: "1"} ;
		if(payType == "1")jQuery("#bankPass").val("");  
		if(payType == "4")jQuery("#bestPass").val(""); 
		var path = "/PayAjaxServlet.do";
		var result = "";
		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
			async : false,
	  		data : data,
	  		timeout : 30000,
	  		success : function(json) 
	  		{
			 	var resultCode = json.RESULTCODE;
			  	var resultMsg = json.RESULTMSG;	
			  	if(payType == "1"){// ����֧��
			  		if(resultCode == "0"){
			  			jQuery("#bankPass").val("true");
			  		}		  	
			  		jQuery("#bankResultMsg").val(resultMsg);	
			  	}else if(payType == "4"){// �Ű�֧��
			  		if(resultCode == "0"){
			  			jQuery("#bestPass").val("true");
			  		}
			  		jQuery("#bestResultMsg").val(resultMsg);		  		
			  	}  
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
	}
 
 // ��֤��֤��
 function checkYzm(yzm){
	 var path = "/PayAjaxServlet.do";
	 var flag = 1;
	 jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		async : false,
	  		data : ( {
	  			method:'checkRand',
	  			yzm:yzm 
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
				 if(json.result != undefined){
					   var obj_value =json.result ;
					   if(obj_value == ''){	
					      flag = 0;
					   }else if(obj_value == '3'){
					      alert("���������֤�벻�ԣ����������룡����");
					   }else{
						  alert("��֤����֤ʧ�ܣ������ԡ�������������벦10000��ѯ��лл��");
					   }
				    }else{		  
			           alert("��Ǹ����֤����֤ʧ�ܣ����Ժ����ԣ�����");
			        }
		 
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
	  return flag;
	}

 // ��֤��ֵ���
	function numcheck(phoneNum){
		if (isNaN(phoneNum)){
			 // alert ("��������ȷ�ĳ�ֵ����");
			 jQuery("#promptCash").css("display","none");
			 jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 jQuery("#CASH_PROMPT").html("��������ȷ�ĳ�ֵ����");
			 setFocus(this);
			 return false;
		}
		if (phoneNum==""){
			 // alert ("��������ȷ�ĳ�ֵ����");
			 jQuery("#promptCash").css("display","none");
			 jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 jQuery("#CASH_PROMPT").html("��������ȷ�ĳ�ֵ����");
			 setFocus(this);
			 return false;
		}	
	}
	
	function SevNbrNew(type){
		changePayBank();
		if(type == "3" || type=="50"){
			jQuery("#wxzfid").show();
		}else{
			jQuery("#wxzfid").hide();
		}
		var cityCode = jQuery("#PAYCITYCODE").val();
		var authCityCode = jQuery("#authCityCode").val();// ��¼�û����ڵ���
		SevNbrNew_YK(type);
		if(cityCode != authCityCode){
			 jQuery("#PAYNUM").empty();
		}else{
			if(type == "10"){// ��֧���˻�չ���ֻ�����
				type = "50";
			} 
			var path = "/PayAjaxServlet.do";
			jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		cache : false,
		  		data : ( {
		  			method:'SelectProductList',
		  			Servicetype:type 
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
					if(json.data!=undefined ){
						var returnHmtl = "";
						   returnHmtl += "<ul>";
						   for(var i = 0; i< json.data.length;i++){
							   var tempArray = json.data[i];
							   var temp0 = tempArray[0];
							   var temp1 = tempArray[1];
							   var tempLi = "<li id=\"option_"+tempArray[0]+"\" onclick=\"selectPhoneNum(\'"+tempArray[0]+"\')\" onmouseover=\"chageColorOn(\'"+tempArray[0]+"\')\" onmouseout=\"chageColorOut(\'"+tempArray[0]+"\')\">"+tempArray[1]+"</li>";
							   returnHmtl += tempLi;
						   }
						   returnHmtl += "</ul>";
						   jQuery(".phoneselectOption").html(returnHmtl);						
					}
		  		},
				error : function() 
				{
			   		alert('������ʱ�����Ժ����ԣ���');
				}
		  	});
		}
	}
	function SevNbrNew_YK(type){
		if(type == "1" || type == "2" || type == "11"){
			jQuery("#PHONENUM").attr("maxlength","8");  
        }else if(type == "50" || type == "10" || type == "-1"){
        	jQuery("#PHONENUM").attr("maxlength","11");
        }
        
        if(type == "3" || type == "6"){
        	jQuery("#isKuanDai").val("true");  
        	jQuery("#PHONENUM").attr("maxlength","25");
        }else{
        	jQuery("#isKuanDai").val("false"); 
        }   
	}
	
	 function checkNumStr(){
			var isKuandai = jQuery("#isKuanDai").val();			
			if(isKuandai == "true"){
				return true;
			}else{
				return false;
			}
		}

	// ����
  	function fun_reset(){
  		PayForm.reset();
  	}		

// ��������Ƿ����
	function productIfExit(citycode,prodId,prodNum){	
			var result;
			if(prodId == "10")prodId = "50";// ��֧���˻�
			var path = "/PayAjaxServlet.do";
			jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		async : false,
		  		data : ( {
		  			method:'productIfExit',
		  			queryNo:prodNum,
		  			productId:prodId,
		  			cityCode:citycode
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
					result = json.msg;	
					getErrorMsg();
		  		},
				error : function() 
				{
		  			result ='������ʱ�����Ժ����ԣ���';	
				}
		  	});
			return result;	
			
	}
	
	// �Ƿ���һ��˫�ŵ������
	 function isVirtualNum(phoneNum,cityCode,type){
			var path = "/PayAjaxServlet.do";
			var result = "";
			jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		async : false,
		  		data : ( {
		  			method:'isVirtualNum',
		  			phoneNum:phoneNum,
		  			cityCode:cityCode,
		  			type:type
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
					result = json.msg;
		  		},
				error : function() 
				{
		  			result ='������ʱ�����Ժ����ԣ���';
				}
		  	});
 		 return result;
	 }
	 
	// ȡ�ֻ�������
	 function findCity(phoneNum){
		 var path = "/PayAjaxServlet.do";
			var result = "";
			jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		async : false,
		  		data : ( {
		  			method:'findCity',
		  			phoneNum:phoneNum
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
				 	result = json.msg;
					getErrorMsg();
		  		},
				error : function() 
				{
			   		alert('������ʱ�����Ժ����ԣ���');
				}
		  	});
  		 return result;
	 }
	
	// ��¼
		function showLogin(event) 
		{
			window.location.href="http://www.189.cn/dqmh/ssoLink.do?method=linkTo&platNo=10014&toStUrl=http://fj.189.cn/service/account/";return;
			var loginform = jQuery('#loginFrame').html();		
			jQuery('#loginFrame').data("html",loginform);		
			jQuery('#loginFrame').html("");		
			jQuery.layerSetup({ 
							 id:"loginDiv",
							 width:371, 
							 height:283,
							 content:'<iframe src="/login/common/v2011/loginTwo.jsp" allowtransparency="true" id="" scrolling="no" frameborder="0" width="100%" height="243px">', 
							 isbg:true,
							 opacity:0.1,
							 templete:'<div style="width:379px;*width:379px; height:356px;background:url(/images/v2011/common/login_bg.jpg)  no-repeat;"><div align="right" style="padding-top:5px;padding-right:10px;"><a href="#" class="layerclose"><img src="/images/v2011/common/close_ico.jpg" border="0"/></a></div><div style="color:#FF0000;margin-top:30px;margin-left:135px;margin-right:25px;font-size:12px;">�𾴵Ŀͻ������ã�<br>����ʹ�õĹ�����Ҫ��¼�����ʹ��!</div><div class="showwint_mini_content" style="margin-top:35px;"><div class="showwint_mini_content_content" id="@contentid@"></div></div></div>'
							}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerClose;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerClose(__id){
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#loginFrame').html(jQuery('#loginFrame').data("html"));
			jQuery(window).scrollTop=function(){return true;}
			jQuery(document.body).get(0).scroll="yes";
			jQuery('#diagram').click();
//			var diagram=document.getElementById('diagram');
//			if(diagram!=null&&diagram!=undefined) diagram.onclick();
		}
		

		// ��֧����������ȷ��ҳ
		function showYizhifuConfirm(event) 
		{
//			alert("showYizhifuConfirm");
			// ���ӿ���л�ȡԪ��ֵ
			var prarams = "type=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#type").val(); 
			prarams += "&connectType="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#connectType").val(); 
			prarams += "&ORDERTYPE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#ORDERTYPE").val(); 
			prarams += "&CITYCODE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PAYCITYCODE").val();
			prarams += "&PHONENUM=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PHONENUM").val();
			prarams += "&bestCash=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#bestCash").val();
			prarams += "&kd_type=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#kd_type").val();
			prarams += "&bankid=";
			prarams += jQuery(window.frames["chargeIframe"].document).find('input[name="bankid"]:checked').val();
			prarams +="&changePayBank=";
			prarams +=jQuery(window.frames["chargeIframe"].document).find('input[name="changePayBank"]:checked').val();
			prarams += "&random=";
			prarams += Math.random();
			
			var srcUrl = "<iframe src=\"/service/pay/bestpay/showSelectInfoNew.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"yiDiv\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"420px\">";
			var yizhifuform = jQuery('#yizhifuFrame').html();		
			jQuery('#yizhifuFrame').data("html",yizhifuform);		
			jQuery('#yizhifuFrame').html("");		
			jQuery.layerSetup({ 
				 id:"yizhifuDiv",
				 width:630, 
				 height:500,
				 content:srcUrl, 
				 isbg:true,
				 opacity:0.1,
				 templete:'<div style="width: 630px;*width:630px; height:500px;" id="@contentid@"></div>'
				}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerCloseYizhifu;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerCloseYizhifu(__id){
			// ie6,360,ie8�ȹرյ������,�޷��۽�,��λ����һ���ı���
			jQuery(window.top.frames["chargeIframe"].document).find("#PHONENUM")[0].focus();
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#yizhifuFrame').html(jQuery('#yizhifuFrame').data("html"));
			jQuery(window).scrollTop=function(){return true;};
			jQuery(document.body).get(0).scroll="yes";
		}
		
		// �����̳�ֵȷ��ҳ
		function showDailishangConfirm(event) 
		{
			// ���ӿ���л�ȡԪ��ֵ
			var prarams = "type=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#type").val(); 
			prarams += "&connectType="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#connectType").val(); 
			prarams += "&ORDERTYPE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#ORDERTYPE").val(); 
			prarams += "&CITYCODE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PAYCITYCODE").val();
			prarams += "&PHONENUM=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PHONENUM").val();
			prarams += "&bestCash=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#bestCash").val();
			prarams += "&bankid=";
			prarams += jQuery(window.frames["chargeIframe"].document).find('input[name="bankid"]:checked').val();
			prarams += "&PRODUCTID=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PRODUCTID").val();
			prarams += "&agentpaytype=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#agentpaytype").val();
			prarams += "&random=";
			prarams += Math.random();
			var srcUrl = "<iframe id=\"agentdiv\" src=\"/service/pay/bestpay/agentshowSelectInfoNew.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"243px\">";
			var dailishangform = jQuery('#dailishangFrame').html();		
			jQuery('#dailishangFrame').data("html",dailishangform);		
			jQuery('#dailishangFrame').html("");		
			jQuery.layerSetup({ 
							 id:"dailishangDiv",
							 width:480, 
							 height:328,
							 content:srcUrl, 
							 isbg:true,
							 opacity:0.1,
							 templete:'<div style="width: 480px;*width:480px; height:328px;*height:333px;" id="@contentid@"></div>'
							}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerCloseDailishang;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerCloseDailishang(__id){
			// ie6,360,ie8�ȹرյ������,�޷��۽�,��λ����һ���ı���
			jQuery(window.top.frames["chargeIframe"].document).find("#PHONENUM")[0].focus();
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#dailishangFrame').html(jQuery('#dailishangFrame').data("html"));
			jQuery(window).scrollTop=function(){return true;};
			jQuery(document.body).get(0).scroll="yes";
		}
	 
		// 11888������ֵȷ��ҳ��
		function show11888PayPLConfirm(event) 
		{
			// ���ӿ���л�ȡԪ��ֵ
			var prarams = "type=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#type").val(); 
			prarams += "&connectType="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#connectType").val(); 
			prarams += "&ORDERTYPE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#ORDERTYPE").val(); 
			prarams += "&CITYCODE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PAYCITYCODE").val();
			prarams += "&PHONENUM=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PHONENUM").val();
			
			var mimas = jQuery(window.frames["chargeIframe"].document).find("input[name='MIMA_PL']");
	        for(var i=0;i<mimas.length;i++){
	        	if(mimas[i].value!=''){
	        		prarams += "&MIMA_PL="+encodeURI(encodeURIComponent(mimas[i].value));
	        	}
	        }
	        var mimas2 = jQuery(window.frames["chargeIframe"].document).find("input[name='MIMA']");
	        for(var i=0;i<mimas2.length;i++){
	        	if(mimas2[i].value!='' && mimas2[i].value!='������18λ������'){
	        		prarams += "&MIMA="+encodeURI(encodeURIComponent(mimas2[i].value));
	        	}
	        }			
			prarams += "&INVALIDATE_T_PL=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#INVALIDATE_T_PL").val();
			// alert(prarams);
			prarams += "&random=";
			prarams += Math.random();
			prarams += "&keynum=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#phoners").val();
			var srcUrl = "<iframe src=\"/service/pay/11888pay/pay_11888_pl_qr.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"118_id\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"364px\">";
			var pay11888plform = jQuery('#pay11888plFrame').html();		
			jQuery('#pay11888plFrame').data("html",pay11888plform);		
			jQuery('#pay11888plFrame').html("");		
			jQuery.layerSetup({ 
							 id:"pay11888PLDiv",
							 width:555, 
							 height:355,
							 content:srcUrl, 
							 isbg:true,
							 opacity:0.1,
							 templete:'<div style="width: 550px;*width:555px; height:355px;" id="@contentid@"></div>'
							}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerClose11888PayPL;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerClose11888PayPL(__id){
			jQuery(window.top.frames["chargeIframe"].document).find("#PHONENUM")[0].focus();
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#pay11888plFrame').html(jQuery('#pay11888plFrame').data("html"));
			jQuery(window).scrollTop=function(){return true;};
			jQuery(document.body).get(0).scroll="yes";
		}
		
		// 11888�ֲ��ֵȷ��ҳ��
		function show11888PayFCConfirm(event) 
		{
			// ���ӿ���л�ȡԪ��ֵ
			var prarams = "MIMA2=";
			prarams += encodeURI(encodeURIComponent(jQuery(window.frames["chargeIframe"].document).find("#MIMA2").val())); 
			prarams += "&MIMA_FC="; 
			prarams += encodeURI(encodeURIComponent(jQuery(window.frames["chargeIframe"].document).find("#MIMA_FC").val())); 
			var rowNum=jQuery(window.frames["chargeIframe"].document).find("#fc_table").find("tr").length;
	        for(var i=0;i<rowNum-1;i++){
	        	var orderType = jQuery(window.frames["chargeIframe"].document).find("#ORDERTYPE_FC_"+(i+1)).val();
	        	if(orderType!=''){
	        		prarams += "&DTYPE="+orderType;
	        	}
	        	var cityCode = jQuery(window.frames["chargeIframe"].document).find("#CITYCODE_FC_"+(i+1)).val();
	        	if(cityCode!=''){
	        		prarams += "&DCITYCODE="+cityCode;
	        	}
	        	var number = jQuery(window.frames["chargeIframe"].document).find("#PRODUCTNUMBER_FC_"+(i+1)).val();
	        	if(number!=''){
	        		prarams += "&PHONE="+number;
	        	}
	        	var payAmout = jQuery(window.frames["chargeIframe"].document).find("#CASH_FC_"+(i+1)).val();
	        	if(payAmout!=''){
	        		prarams += "&PAYAMOUNT="+payAmout;
	        	}
	        }
			prarams += "&INVALIDATE_T_FC=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#INVALIDATE_T_FC").val();
			prarams += "&random=";
			prarams += Math.random();
			prarams += "&keynum=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#phoners").val();
			var srcUrl = "<iframe src=\"/service/pay/11888pay/pay_11888_fc_qr.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"340px\">";
			var pay11888fcform = jQuery('#pay11888fcFrame').html();		
			jQuery('#pay11888fcFrame').data("html",pay11888fcform);		
			jQuery('#pay11888fcFrame').html("");		
			jQuery.layerSetup({ 
							 id:"pay11888FCDiv",
							 width:600, 
							 height:355,
							 content:srcUrl, 
							 isbg:true,
							 opacity:0.1,
							 templete:'<div style="width: 600px;*width:600px; height:355px;" id="@contentid@"></div>'
							}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerClose11888PayFC;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerClose11888PayFC(__id){
			jQuery(window.top.frames["chargeIframe"].document).find("#PHONENUM")[0].focus();
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#pay11888fcFrame').html(jQuery('#pay11888fcFrame').data("html"));
			jQuery(window).scrollTop=function(){return true;};
			jQuery(document.body).get(0).scroll="yes";
		}
	
		// 11888�ֲ��ֵȷ��ҳ��
		function show20198PayConfirm(event) 
		{
			// ���ӿ���л�ȡԪ��ֵ
			var prarams = "type=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#type").val(); 
			prarams += "&connectType="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#connectType").val(); 
			prarams += "&ORDERTYPE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#ORDERTYPE").val(); 
			prarams += "&CITYCODE=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PAYCITYCODE").val();
			prarams += "&PHONENUM=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#PHONENUM").val();
			
			prarams += "&kahao_20198=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#kahao_20198").val(); 
			prarams += "&kahao_20198_en=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#kahao_20198_en").val(); 
			prarams += "&mima_20198="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#mima_20198").val();
			prarams += "&mima_20198_en="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#mima_20198_en").val();	
			prarams += "&cash_20198="; 
			prarams += jQuery(window.frames["chargeIframe"].document).find("#cash_20198").val();	
			
			prarams += "&INVALIDATE_T_20198=";
			prarams += jQuery(window.frames["chargeIframe"].document).find("#INVALIDATE_T_20198").val();
			
			prarams += "&random=";
			prarams += Math.random();
			var srcUrl = "<iframe src=\"/service/pay/20198pay/pay_20198_qr.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"243px\">";
			var pay20198form = jQuery('#pay20198Frame').html();		
			jQuery('#pay20198Frame').data("html",pay20198form);		
			jQuery('#pay20198Frame').html("");		
			jQuery.layerSetup({ 
							 id:"pay20198Div",
							 width:600, 
							 height:355,
							 content:srcUrl, 
							 isbg:true,
							 opacity:0.1,
							 templete:'<div style="width: 600px;*width:600px; height:355px;" id="@contentid@"></div>'
							}); 
			jQuery.layershow(); 
			jQuery.layerclose=layerClose20198Pay;
			jQuery(window).scrollTop(0);
			jQuery(document.body).get(0).scroll="yes";
		 }
		 
		 // �رղ�
		function layerClose20198Pay(__id){
			jQuery(window.top.frames["chargeIframe"].document).find("#PHONENUM")[0].focus();
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			jQuery('#pay20198Frame').html(jQuery('#pay20198Frame').data("html"));
			jQuery(window).scrollTop=function(){return true;};
			jQuery(document.body).get(0).scroll="yes";
		}
		
	    // չ��֧������
		function showChargeProcedure(){
			 jQuery("#showChargeProcedureDiv",parent.document).html("<iframe name=\"chargeProcedureIframe\" id=\"chargeProcedureIframe\" src=\"/service/pay/flash/chargeProcedurePage.html\" frameBorder=0 scrolling=\"no\" onload=\"Javascript:SetWinHeight(this)\" height=\"1000px\" width=\"100%\"></iframe>");
			 var height = jQuery(parent.document).height();
			 jQuery("#showChargeProcedureDiv_W",parent.document).css("height",height);
			 jQuery("#showChargeProcedureDiv_W",parent.document).css("display","block");
		}
	 
		

	/** ******************************************************************************** */
		// ѡ��л�
		 function changeUrl(url){
			 jQuery("#RECEIVEDIV").css("display","none");
			 	var pageLocate = jQuery("#includePage");
			 	pageLocate.css("display","");
			 	jQuery("#NNN").css("display","");
			 	jQuery("#ONE").css("display","");
			  	 	var paycardtype = jQuery("#paycardtype").val();
					setSessionParam(url);
			  	 	if(url == "1"){
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/newPay.jsp?paycardtype='+paycardtype+'" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)"  height="800px" width="1200px"></iframe>');
			  	 	}else if(url == "2"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/query/payAllQuery.jsp?" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="300px" width="996px"></iframe>');
			  	 	}else if(url == "3"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe"  src="/service/pay/query/card_history_query_index.jsp" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="550px" width="996px"></iframe>');
			  	 	}else if(url == "4"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/sellcalorie/sell_calorie_query.jsp" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="300px" width="996px"></iframe>');
			  	 	}else if(url == "5"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/sellcalorie/sell_calorie_subscribe.jsp" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="300px" width="996px"></iframe>');
			  	 	}else if(url == "6"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/sellcalorie/sell_calorie_accountbalance.jsp" frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="300px" width="996px"></iframe>');
			  	 	}else if(url == "7"){
			  	 		pageLocate.html('<iframe name="chargeIframe" id="chargeIframe" src="/service/pay/agent_bestpayNew.jsp"  frameBorder=0 scrolling="no" onload="Javascript:SetWinHeight(this)" height="1030px" width="1200px"></iframe>');
			  	 	}else if(url == "8"){
			  	 		jQuery("#NNN").addClass("service_box");
			  	 		top.location = '/service/transaction/phone/year.jsp';
			  	 	}
			  	 	jQuery("#ONE").css("display","none");
		  }
		  
		  // �߶�����Ӧ
		  function SetWinHeight(obj){
			  var win = obj;
			  var browserName=navigator.userAgent.toLowerCase();
			  var browserVer=(browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1];
			  var mainheight = win.height;
			  //alert(browserName);
			  //alert(browserVer);
			  if(/firefox/i.test(browserName)){   //Firefox  
				  //���ʲô������
			  }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {  //Chrome
				  //alert('Chrome');
				  if(win.contentWindow.document.documentElement && win.contentWindow.document.documentElement.scrollHeight){ 
						mainheight = win.contentWindow.document.documentElement.scrollHeight+30;
				  }
				  jQuery(obj).height(mainheight);
			  }else if( browserVer == 11){
				  //alert(2);
				  if (win.contentDocument && win.contentDocument.body && win.contentDocument.body.offsetHeight){ 
						mainheight = win.contentDocument.body.offsetHeight;
				  }else if(win.Document && win.Document.body && win.Document.body.scrollHeight){ 
						mainheight = win.Document.body.scrollHeight;
				  }else if(win.contentWindow.document.documentElement && win.contentWindow.document.documentElement.scrollHeight){ 
						mainheight = win.contentWindow.document.documentElement.scrollHeight;
				  }
				  jQuery(obj).height(mainheight);
			  }else{
				  //alert(3);
				  if (win.contentDocument && win.contentDocument.body && win.contentDocument.body.offsetHeight){ 
						mainheight = win.contentDocument.body.offsetHeight+30 ;
						//alert("1: "+mainheight);
				  }else if(win.Document && win.Document.body && win.Document.body.scrollHeight){ 
						mainheight = win.Document.body.scrollHeight+30 ;
						//alert("2: "+mainheight);
				  }else if(win.contentWindow.document.documentElement && win.contentWindow.document.documentElement.scrollHeight){ 
						mainheight = win.contentWindow.document.documentElement.scrollHeight+30;
						//alert("3: "+mainheight);
				  }
				  jQuery(obj).height(mainheight);
			  }
              
			}  
		  
		   // ��ҳ�����������session��
		 function setSessionParam(url){
			  if(url!=''){
				var uu=url;
				if(url.indexOf(".")!=-1){
					uu=url.substring(0,url.lastIndexOf("."));
				}
				var path = "/PayAjaxServlet.do";
				jQuery.ajax( {
			  		url : path,
			  		type : 'POST',
			  		dataType : 'json',
			  		cache : false,
			  		async : true,
			  		data : ( {
			  			method:'setUrlParamSession',
			  			URLPARAM:uu
			  		}),
			  		timeout : 30000 
			  	});
				 
			  }
		 }	
		
	 // ����ͼƬBORDER��ɫ�л�
	 function changeImgBorderColorOn(bankcode){
		 jQuery("#bandPic_"+bankcode).css("border-color","#ff8200");
	 } 
	 
	 function changeImgBorderColorOut(){
		 changeImgColor();
	 } 
	 
	 function changeImgColor(){
		 var bankCode =  jQuery("input[name=bankid]:checked").val();
		 // �����Ч����BORDER
		 jQuery(".bankPicSpan img").css("border-color","#cacaca");
		 // ѡ�е�����BORDER
		 jQuery("#bandPic_"+bankCode).css("border-color","#ff8200");
	 }
	 
	 // �������ͼƬ������ѡ�ж�ӦͼƬ�ĵ�ѡ��
	 function selectOnBandId(bankcode){
		 jQuery("input[name=bankid]").each(function(){
			 jQuery(this).removeAttr("checked");
			 var bandidValue = jQuery(this).val();
			 if(bandidValue == bankcode){
				 jQuery(this).attr("checked","checked");
			 }
		 });
		 changeImgColor();
		 checkFormEmpty();
		 
	 }
	
	/** ********************************************����JS************************************* */
	/**
	 * ���У��
	 * 
	 * @param amount
	 *            ��ֵ���
	 * @param mincash
	 *            ������С��ֵ���
	 * @param maxcash
	 *            ��������ֵ���
	 * @returnParame 0,��ĳ�ֵ����;1,���ܴ������ֵ;2,����С����Сֵ;3,���У��ͨ��
	 */
	function commonValidateMoney(amount,mincash,maxcash){
		if(amount.indexOf(".") != -1){
			if (amount.replace(/\d+\.\d+/g,'')!=""){
				// alert("����ĳ�ֵ����ʽ���ԣ�����");
				return "0";
			}			
			var str = amount.split(".");			
			// �ж�С�������ĳ���
			if(str[1].length > 2){
				// alert("����ĳ�ֵ����ʽ���ԣ�����");
				return "0";
			}
		}
		else{
			if (amount.replace(/\d+/g,'')!=""){
				// alert("����ĳ�ֵ����ʽ���ԣ�����");
				return "0";
			}			
		}
		if(amount*100 >maxcash*100){
				// alert("����ĳ�ֵ���ܴ���"+maxcash+"Ԫ������");
				return "1";
		}
		if(amount*100 <mincash*100){
			// alert("����ĳ�ֵ����С��"+mincash+"Ԫ������");
			return "2";
		}
		return "3";
	}	
	

	// ��ֵ�ɷ�ҳ���ʼ��
	function  initNewpage(){
		
			// ��ֵ���������Ϣ��ʽչ��
			PhonenumStyle(0);
			
			// �������
			var phonenum = jQuery("#PHONENUM").val();
			var paynum = jQuery("#PAYNUM").val();
			var ordertype = jQuery("#ORDERTYPE").val();
			var cityCode =  jQuery("#PAYCITYCODE").val();
			
			if(ordertype == "3" || ordertype == "6"){
				jQuery("#isKuanDai").val("true");
				// ��ʾ�����
				jQuery("#ORDERTYPE_LI").removeClass("li");
				jQuery("#ORDERTYPE_LI").removeClass("li1");
				jQuery("#ORDERTYPE_LI").addClass("li1");
				jQuery("#kuandaiBanner").css("display","inline-block");
			}else{
				jQuery("#isKuanDai").val("false");
				// ���ع����
				jQuery("#ORDERTYPE_LI").removeClass("li");
				jQuery("#ORDERTYPE_LI").removeClass("li1");
				jQuery("#ORDERTYPE_LI").addClass("li");
				jQuery("#kuandaiBanner").css("display","none");
			}
			
			// ��ʼ�����볤��
			SevNbrNew_YK(ordertype);
			if((phonenum != null && phonenum != "" ) || (paynum != null && paynum != "") ){
				if(phonenum != null || phonenum != ""){
					comfirmPhonenum(phonenum,ordertype,cityCode);
				}else if(paynum != null && paynum != ""){
					comfirmPhonenum(paynum,ordertype,cityCode);
				}
			}
			jQuery("#PHONENUM").unbind("keyup");
			jQuery("#PHONENUM").bind("keyup",function(event){
				var phonenum = jQuery("#PHONENUM").val();
				var ordertype = jQuery("#ORDERTYPE").val();
				var cityCode1 = jQuery("#PAYCITYCODE").val();
				comfirmPhonenum(phonenum,ordertype,cityCode1);
				
				// ����մ�����Ϣ��ʾ
				if(phonenum == null || phonenum == ""){
					jQuery("#PHONENUM_PROMPT_W").css("display","block");
					jQuery("#PHONENUM_PROMPT").html("�������ֵ����");
					// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
				}else{
					jQuery("#PHONENUM_PROMPT_W").css("display","none");
					// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(0);
				}
				// �������ʱ�������չ��
				jQuery("#yue").html("");
				
				// У����ǲ���,����[ȷ������,��һ��]
				checkFormEmpty();
			});
	}
	
	// ȷ�Ϻ�����ʾ
	function comfirmPhonenum(phonenum,ordertype,cityCode){
		if(phonenum != null && phonenum != ""){
			jQuery("#numberConfirmation").html("");
			var cityName = " ("+getCityNameByCitycode(cityCode)+") ";
			var tempStr ="";
			if(ordertype == "50"  || ordertype == "10"){ // 50Ϊ�ֻ���10Ϊ��֧���˻�
				// ��3λ+�ո�+ÿ4λ��һ�ո�
				tempStr += phonenum.replace(/\s/g,'').replace(/(\w{3})(?=\w)/,"$1 ").replace(/(\w{4})(?=\w)/g,"$1 ");
				jQuery("#numberConfirmation").html(tempStr);
			}else if(ordertype == "1" || ordertype == "11" || ordertype == "2" || ordertype == "-1"){ // 1Ϊ�̻���11Ϊ������2ΪС��ͨ��-1ΪԤ��ͨ��
				// ��ÿ4λ��һ�ո�
				tempStr += phonenum.replace(/\s/g,'').replace(/(\w{4})(?=\d)/,"$1 ").replace(/(\w{4})(?=\w)/g,"$1 ");
				tempStr += cityName;
				jQuery("#numberConfirmation").html(tempStr);
			}else if(ordertype == "3" || ordertype == "6"){ // 3Ϊ������ADSL��6Ϊ������LAN
				// ÿ3λһ�ո�@�󲻷ָ�
				var atIndex = phonenum.indexOf("@");
				if(atIndex != -1){
					var atBefore = phonenum.substring(0,atIndex);
					var atAfter =  phonenum.substring(atIndex,phonenum.length);
					tempStr += atBefore.replace(/\s/g,'').replace(/(\w{3})(?=\w)/,"$1 ").replace(/(\w{3})(?=\w)/g,"$1 ");
					tempStr += atAfter;
					tempStr += cityName;
					jQuery("#numberConfirmation").html(tempStr);
				}else{
					tempStr += phonenum.replace(/\s/g,'').replace(/(\w{3})(?=\w)/,"$1 ").replace(/(\w{3})(?=\w)/g,"$1 ");
					tempStr += cityName;
					jQuery("#numberConfirmation").html(tempStr);
				}
			}
		}else{
			jQuery("#numberConfirmation").html("");
		}
	}
	
	// ����cityCode��ȡcityName
	function getCityNameByCitycode(citycode){
		var curCityName = "";
		if(citycode=="0590") curCityName="����";
		else if(citycode=="0591") curCityName="����";
		else if(citycode=="0592") curCityName="����";
		else if(citycode=="0593") curCityName="����";
		else if(citycode=="0594") curCityName="����";
		else if(citycode=="0595") curCityName="Ȫ��";
		else if(citycode=="0596") curCityName="����";
		else if(citycode=="0597") curCityName="����";
		else if(citycode=="0598") curCityName="����";
		else if(citycode=="0599") curCityName="��ƽ";
		else curCityName="����";
		return curCityName;
	}
	
	
	// ��ʾ����IP��ȡ����˺Ų�
	function showGetLanAndAdsl(){
		var ordertype = jQuery("#ORDERTYPE").val();
		if(ordertype == "3" || ordertype == "6"){
			var IpAddress = jQuery("#IPADDRESS").val();
	 		jQuery('#newDivLanADSL').html("<img src='/images/icon/sj_1.gif' width='4' height='7' hspace='4' border='0'/><a id=\"getLanAndAdslA\" href=\"javascript:void(0);\" onclick=\"getLanAndAdsl('"+IpAddress+"')\" style=\"font-style: normal;color:#2782D5;text-decoration: none;font-size:12px;line-height:16px;\" title=\"�����ȡ��ǰ��·���˺�\">&nbsp;�����ȡ��ǰ��·���˺�</a>");
	 		jQuery('#newDivLanADSL').css("display","block"); 
		}
			
	}
	var delay='0';  //�����Ƿ���ʾ newDivLanADSL
	// ��ȡ��� �˺�
	function getLanAndAdsl(ip){
		 delay='0';
		// ��ֵ���������Ϣ��ʽչ��
		PhonenumStyle(0);
		jQuery.ajax({
			url: "http://110.90.113.8:8010/netlogin/netServlet.do?returnUrl=query",
			type : "get", 
			cache: false,
			async:false,  
			dataType : "jsonp",  
			jsonp: "callbackparam",//��������ڽ���callback���õ�function���Ĳ���  
			jsonpCallback:"success_jsonpCallback",//callback��function����  
			error: function(){
				alert("��ȡ����˺�ʧ�ܣ������³��ԣ�");
			},
			success : function(json){  
				jQuery('#newDivLanADSL').html("<div style=\"float:left;\"><img src='/images/icon/sj_1.gif' width='4' height='7' hspace='4' border='0'/></div><div style=\"float:left;width:95px;font-style: normal;color:#2782D5;text-decoration: none;font-size:12px;line-height:16px;\">���ڻ�ȡ...</div>");
				jQuery.ajax( {
			  		url : "/PayAjaxServlet.do",
			  		type : 'POST',
			  		dataType : 'json',
			  		async:false,  
			  		data : ( {
			  			method:'getLanAndAdslByIp',
			  			key:json[0].key 
			  		}),
			  		timeout : 30000,
			  		success : function(data) 
			  		{
					 if(data.result=='' || data.result==null){
				  			alert("��ȡ����˺�ʧ�ܣ������³���");
				  			return;
				  		}
						// ����˺��������
			    		jQuery("#PHONENUM").val(data.result);
			    		var ordertype = jQuery("#ORDERTYPE").val();
			    		var cityCode = jQuery("#PAYCITYCODE").val();
			    		comfirmPhonenum(data.result,ordertype,cityCode);
			  		},
					error : function() 
					{
				   		alert('������ʱ�����Ժ����ԣ���');
					}
			  	});	
		 
			}
		});
		jQuery('#newDivLanADSL').css('display', 'none');
	}

	function hideGetWay(event){
		 delay='1';
		    setTimeout(function() {
				if(delay=='1'){
					jQuery("#newDivLanADSL").hide();
					delay='0';
				}
		    }, 200);
		// �¼��ж�
//		var target;
//		var activeid;
//		var sid;
//		var isie = (navigator.appName =="Microsoft Internet Explorer");
//	    var isFirefox =(navigator.appName=="Netscape");
//	    if (isie)
//	    {
//	     	target=document.activeElement;
//	     	sid='getLanAndAdslA';	
//	     	activeid=target.id;
//			if(activeid!=null&&activeid!=sid){
//				var newDiv = jQuery("#newDivLanADSL");
//				if(newDiv){ 
//					jQuery("#newDivLanADSL").hide();
//				}
//			}
//	    }
//	    else if(isFirefox)
//	    { 
//	    	target = event.explicitOriginalTarget;
//	     	sid='getLanAndAdslA';
//	     	activeid=target.id;
//			if(activeid!=null&&activeid!=sid){
//				var newDiv = jQuery("#newDivLanADSL");
//				if(newDiv){ 
//					jQuery("#newDivLanADSL").hide();
//				}
//			}
//			var tex = target.textContent;
//			if(tex==undefined ||tex!="�����ȡ��ǰ����ʺ�"){
//				var newDiv = jQuery("#newDivLanADSL");
//				if(newDiv){ 
//					jQuery("#newDivLanADSL").hide();
//				}
//			}
//	    }		
	}
	
	
	function toNext(event){
		if(event.keyCode == 13){
			event.keyCode = 9;
			return true;
		}
	}
	
	/**
	 * �л���ʾ�ɷѷ�ʽ
	 * 
	 * @param id����Ĳ�
	 * @param mid1����ʾ�Ĳ�
	 * @param mid2�����صĲ�
	 */ 
	function changeRechargeMethod(id,mid1,mid2){
		jQuery("#"+id).find("#rechargeMethod"+mid1).show();
		jQuery("#"+id).find("#rechargeMethod"+mid2).hide();
	}
	
	// ȷ������,��һ����ť����Ҳ�����
	function changeButtonGray(){
		var tempStr ="";
		// ��ť�Ƿ����
		if(jQuery("#button1").length == 0){
			tempStr = "<input name=\"button1\" type=\"button\" class=\"button1\" id=\"button1\" disabled=\"disabled\"/>";
			jQuery("#main_bot1_bot_w").html(tempStr);
		}else{
			/* ֧����ť��ԭ�ɻ� */
			var conButton=jQuery("#button1"); 
			if(conButton.attr("disabled")==false){ 
				// ���ð�ťΪdisabled
				conButton.attr("disabled","disabled"); 
			}
			jQuery("#button1").removeClass("button1"); 
			jQuery("#button1").removeClass("button3"); 
			jQuery("#button1").addClass("button1");
		}
	}
	
	// ȷ������,��һ����ť�����ҿ���
	function changeButtonGreen(){
		var tempStr ="";
		// ��ť�Ƿ����
		if(jQuery("#button1").length == 0){
			tempStr = "<input name=\"button1\" type=\"button\" class=\"button3\" id=\"button1\" />";
			jQuery("#main_bot1_bot").html(tempStr);
		}else{
			var conButton=jQuery("#button1"); 
			if(conButton.attr("disabled")==true || conButton.attr("disabled")=="disabled"){ 
				// ͨ���Ƴ��ķ�ʽ��disable����ɾ��
				conButton.removeAttr("disabled"); 
			}
			jQuery("#button1").removeClass("button1");
			jQuery("#button1").removeClass("button3"); 
			jQuery("#button1").addClass("button3");
		}
		
	}
	
	/**
	 * ѡ�нɷѷ�ʽ�ı���ʽ
	 * 
	 * @param fidǶ���ڸ��ڵ����ID
	 * @param m��ǰѡ�еĶ���
	 */
	function changeRechargeSpan(fid,m){
			
		var tempStr ="";
		var j = 4; // ĿǰΪ4��֧����ʽ:1,��֧��/��������;2,11888��ֵ��;3,20198��ֵ��;4,����Ǯ��;
		// 0��ʾδѡ��
		if(m == 0){
			// ѡ���ѡ��
			for(var i=1;i<=4;i++){
				jQuery("#"+fid).find("#rechargeSpan"+i).removeClass("main_bot1_b_a");
			}
			// ֧����ʽ��չʾ
			for(var i=1;i<=4;i++){
				jQuery("#woaicss_con"+i).css("display","none");
			}
			
			// ��ť���
			changeButtonGray();
			
		}else{
			for(var i=1;i<=4;i++){
				jQuery("#"+fid).find("#rechargeSpan"+i).removeClass("main_bot1_b_a");
			}
			
			// �����Ҫչ���쿪��ģʽ
			if(m >= 3){
				changeRechargeMethod(fid,2,1);
			}
			
			var objectid = jQuery("#"+fid).find("#rechargeSpan"+m).attr("id");
			
			
			if(objectid != "" && typeof(objectid) != "undefined"){
				jQuery("#"+fid).find("#rechargeSpan"+m).addClass("main_bot1_b_a");
				
				// չ��֧����ʽ
				for(var i=1;i<=4;i++){
					jQuery("#woaicss_con"+i).css("display","none");
				}
				jQuery("#woaicss_con"+m).css("display","block");
				
				/*
				 * �޸İ�ť var conButton=jQuery("#button1");
				 * if(conButton.attr("disabled")==true){ //ͨ���Ƴ��ķ�ʽ��disable����ɾ��
				 * conButton.removeAttr("disabled"); }
				 * jQuery("#button1").removeClass("button1");
				 * jQuery("#button1").removeClass("button3");
				 * jQuery("#button1").addClass("button3");
				 */
				// changeButtonGreen();
				
				//��ֵ�����л�
				var ordertype=jQuery("#ORDERTYPE").val();
				if(ordertype=="50" || ordertype=="3"){
					jQuery("#wxzfid").show();
				}else{
					jQuery("#wxzfid").hide();
				}
				if(ordertype!="50"){
					jQuery("#isyzfdj").val("");
				}else{
					if(jQuery("#isyzfdj").val()==""){
						//initbankview();
					}
				}
				// ��������
				if(m == 1){
					tempStr = "<input name=\"button1\" type=\"button\" class=\"button1\" id=\"button1\" disabled=\"disabled\" onclick=\"bestFormSubmitNew();\"/>";
					jQuery("#main_bot1_bot_w").html(tempStr);
					// ֧�����̰�ť��ʾ
					jQuery("#ChargeProcedureSpan").css("display","inline-block");
					//��֧����������20150209
					if(ordertype=="1"||ordertype=="3"||ordertype=="50"){
						showoldview(); //��ֵ������
					}

				// ����Ǯ��
				}else if(m == 4){
			  	 	jQuery("#NNN4").css("display","block");
			  	 	jQuery("#ONE4").css("display","block");
			  	 	jQuery("#eMoneyPackage").html("<iframe name=\"eMoneyPackageIframe\" id=\"eMoneyPackageIframe\" src=\"wishpay/wishPay.jsp\" frameBorder=0 scrolling=\"no\" height=\"800px\" width=\"650px\"/></iframe>");
			  	 	// ie6�µ�BUG
					if(jQuery.browser.msie) {
						if(jQuery.browser.version == "6.0"){
							// ��ie6��IFRAME��ǩsrc��ʧЧ
							jQuery("#eMoneyPackageIframe").attr("src","wishpay/wishPay.jsp");
						}
					}
					jQuery("#main_bot1_bot_w").html("");
					jQuery("#ONE4").css("display","none");
					// ֧�����̰�ť����
					jQuery("#ChargeProcedureSpan").css("display","none");
				}else if(m == 2){
					tempStr = "<input name=\"button1\" type=\"button\" class=\"button1\" id=\"button1\" disabled=\"disabled\" onclick=\"fun_submit_pl();\"/>";
					jQuery("#main_bot1_bot_w").html(tempStr);
					// ֧�����̰�ť��ʾ
					jQuery("#ChargeProcedureSpan").css("display","inline-block");
				}else if(m == 3){
					tempStr = "<input name=\"button1\" type=\"button\" class=\"button1\" id=\"button1\" disabled=\"disabled\" onclick=\"fun_submit_20198();\"/>";
					jQuery("#main_bot1_bot_w").html(tempStr);
					// ֧�����̰�ť��ʾ
					jQuery("#ChargeProcedureSpan").css("display","inline-block");
				}
				
				// ��ȫ�ֱ�����ֵ
				beforem = m;
				
			}else{
				
				// ֧����ʽ��չʾ
				for(var i=1;i<=4;i++){
					jQuery("#woaicss_con"+i).css("display","none");
				}
				
				/* ֧����ť��ԭ�ɻ� */
				changeButtonGreen();
				
				// ��ȫ�ֱ�����ֵ
				beforem = 0;
			}
			
		}
		
	}

	/**
	 * �����л�
	 */
	function changeCity(cityCode){
		// �л��������ص�����Ϣ����
		jQuery("#PAYCITYCODE_PROMPT_W").css("display","none");
		// �л��������غ�����Ϣ����
		jQuery("#PHONENUM_PROMPT_W").css("display","none");
		// �л�������������ѯ
		jQuery("#yue").html("");

		// ��ֵ���������Ϣ��ʽչ��
		PhonenumStyle(0);
		
		var cityCodeId = "#A_" + cityCode;
		jQuery("#showCity").find("a").removeClass("dq_1");
		jQuery("#showCity").find("a").addClass("dq_2");
		jQuery(cityCodeId).removeClass("dq_2");
		jQuery(cityCodeId).addClass("dq_1");		
		jQuery("#PAYCITYCODE").val(cityCode);
		// ȷ�Ϻ�������޸�
		var phonenum = jQuery("#PHONENUM").val();
		var ordertype = jQuery("#ORDERTYPE").val();
		var cityCode = jQuery("#PAYCITYCODE").val();
		if(phonenum != ""){
			comfirmPhonenum(phonenum,ordertype,cityCode);
		}
		// ���б仯,��ֵ��ʽ�仯
		modifyType(cityCode,"citycode");
		
	}
	
	/*
	 * չ�ֲ�Ʒ����������
	 */
	function showHiddenOrdertypeDiv(){
		var flag = jQuery("#ordertypeOption").css("display");
		if(flag == "block"){
			jQuery("#ordertypeOption").css("display","none");
			jQuery(".selectbox").css("border","1px solid #FF6507");
		}else{
			jQuery("#ordertypeOption").css("display","block");
			jQuery(".selectbox").css("border-bottom","none");
			changeSelected();
		}
		
	}
	
	/**
	 * չ�ֲ�Ʒ����������
	 * 
	 * @param 1,��ʾ;0,����ʾ
	 */
	function showOrdertypeDiv(t){
		if(t == "1"){
			jQuery("#ordertypeOption").css("display","block");
			jQuery(".selectbox").css("border-bottom","none");
		}else{
			jQuery("#ordertypeOption").css("display","none");
			jQuery(".selectbox").css("border","1px solid #FF6507");
			
		}
		// ���ie6 �� �㱻selected�ڸ�
		if(jQuery.browser.msie) {
			if(jQuery.browser.version == "6.0"){
			// (ԭ������һ��ͬ��ͬ��� iframe ��ǩ���뵽 div ��ȥ)
			jQuery("#ordertypeOption").bgiframe();
			}
		} 
	}
	
	
	/**
	 * ����������Ʒ������ʽ�л�
	 */
	function changeSelected(){
		jQuery(".div1").find("a").removeClass("spdq_a");
		jQuery(".div2").find("a").removeClass("spdq_a");
		jQuery(".div3").find("a").removeClass("spdq_a");
		jQuery(".div4").find("a").removeClass("spdq_a");
		
		jQuery(".div1").find("div").css("color","#000000");
		jQuery(".div2").find("div").css("color","#000000");
		jQuery(".div3").find("div").css("color","#000000");
		jQuery(".div4").find("div").css("color","#000000");
		var ordertype = jQuery("#ORDERTYPE").val();
		
		jQuery("#option_"+ordertype).find("a").addClass("spdq_a");
		
		jQuery("#option_"+ordertype).css("color","#ffffff");
		// ���ͻ���
		var tempOrderType = "";
		if(ordertype == "1"){
			tempOrderType = "�̻�";
		}else if(ordertype == "2"){
			tempOrderType = "С��ͨ";
		}else if(ordertype == "3"){
			tempOrderType = "���";
		}else if(ordertype == "6"){
			tempOrderType = "���";
		}else if(ordertype == "10"){
			tempOrderType = "��֧���˻�";
		}else if(ordertype == "11"){
			tempOrderType = "����";
		}else if(ordertype == "50"){
			tempOrderType = "�ֻ�";
		}else if(ordertype == "-1"){
			tempOrderType = "Ԥ��ͨ";
		}
		jQuery("#ordertypeInput").html(tempOrderType);
	}
	
	/** չ�ֺ���������* */
	function showHiddenPhoneDiv(){
		var flag = jQuery(".phoneselectOption").css("display");
		if(flag == "block"){
			jQuery(".phoneselectOption").css("display","none");
			jQuery(".phoneselectOption").css('border-bottom-color','#aaaaaa').css('border-left-color','#aaaaaa').css('border-right-color','#aaaaaa').css('border-top-color','#aaaaaa');
		}else{
			jQuery(".phoneselectOption").css("display","block");
			jQuery(".phoneselectOption").css('border-bottom-color','#ff6507').css('border-left-color','#ff6507').css('border-right-color','#ff6507').css('border-top-color','#ff6507');
			var paynum = jQuery("#PAYNUM").val();
			if(paynum != ""){
				jQuery("li#option_"+paynum).css("background-color","#e8edf0");
			}
		}
	}
	
	/** չ�ֺ���������* */
	function showPhoneDiv(t){
		if(t == "1"){
			jQuery(".phoneselectOption").css("display","block");
		}else{
			jQuery(".phoneselectOption").css("display","none");
			jQuery(".agentselectbox").css("border","#ff6507 1px solid");
		}
	}
	
	/**
	 * ѡ�����
	 */
	function selectPhoneNum(p){
		jQuery("#PAYNUM").val(p);
		if(p != ""){
			jQuery(".phoneselectOption ul li#option_"+p).css("background-color","#e8edf0");
			jQuery("#PHONENUM").val(p);
		}else{
			jQuery("#PHONENUM").val("");
		}
		// ѡ�к�������ȷ�Ϻ���
		var phonenum = jQuery("#PHONENUM").val();
		var ordertype = jQuery("#ORDERTYPE").val();
		var cityCode1 = jQuery("#PAYCITYCODE").val();
		comfirmPhonenum(phonenum,ordertype,cityCode1);
		// ѡ�к�رղ�
		jQuery(".phoneselectOption").css("display","none");
	}
	
	
	/**
	 * ����ѡ����ʽ
	 */
	function chageColorOn(p){
		jQuery(".phoneselectOption ul li").each(function(){
			jQuery(this).css("background-color","#ffffff");
		});
		jQuery(".phoneselectOption ul li#option_"+p).css("background-color","#e8edf0");
	}

	/**
	 * ����δ��ѡ����ʽ
	 */
	function chageColorOut(p){
		jQuery(".phoneselectOption ul li#option_"+p).css("background-color","#ffffff");
	}
	
	/**
	 * �����̺�������ѡ����ʽ
	 */
	function changeAgentColorOn(p){
		jQuery(".agentselectoption ul li").each(function(){
			jQuery(this).css("background-color","#ffffff");
		});
		jQuery(".agentselectoption ul li#option_"+p).css("background-color","#e8edf0");
	}

	/**
	 * �����������δ��ѡ����ʽ
	 */
	function changeAgentOut(p){
		jQuery(".agentselectoption ul li#option_"+p).css("background-color","#ffffff");
	}
	
	/**
	 * �����̺��������л�
	 */
	function changeAgentProdType(prodid){
		jQuery("#PRODUCTID").val(prodid);
		if(prodid == "50"){
			jQuery("#agentordertypeInput").html("�ֻ�");
			agentPhoneNumLength(50);
		}else if(prodid == "1"){
			jQuery("#agentordertypeInput").html("�̻�");
			agentPhoneNumLength(1);
		}else if(prodid == "20"){
			jQuery("#agentordertypeInput").html("D��");
			agentPhoneNumLength(20);
		}else if(prodid == "30"){
			jQuery("#agentordertypeInput").html("204�˺�");
			agentPhoneNumLength(30);
		}else if(prodid == "99"){
			jQuery("#agentordertypeInput").html("��������");
			agentPhoneNumLength(99);
		}
		jQuery("#agentordertypeOption").css("display","none");
		jQuery(".agentselectbox").css("border","#ff6507 1px solid");
		
		// ��ֵ�����ȷ�Ϻ������
		jQuery("#PHONENUM").val("");
		jQuery("#numberConfirmation").html("");
		
		// ��ʾ�ϵ͸���ʽ
		jQuery("#PHONENUM_DIV").removeClass("ptodiv");
		jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
		jQuery("#PHONENUM_DIV").addClass("ptodiv");
		
		// ���������Ϣ����
		jQuery("#PHONENUM_PROMPT_W").css("display","none");
		// ��Ʒ���ʹ�����Ϣ����
		jQuery("#PRODUCTID_PROMPT_W").css("display","none");
	}
	
	/**
	 * �����̲�Ʒ������ʾ����
	 */
	function showHiddenagentOrdertypeDiv(){
		var flag = jQuery("#agentordertypeOption").css("display");
		if(flag == "block"){
			jQuery("#agentordertypeOption").css("display","none");
			jQuery(".agentselectbox").css("border","#ff6507 1px solid");
		}else{
			jQuery("#agentordertypeOption").css("display","block");
			jQuery(".agentselectbox").css("border-bottom","none");
			var productid = jQuery("#PRODUCTID").val();
			if(productid != ""){
				jQuery("li#option_"+productid).css("background-color","#e8edf0");
			}
		}
	}
	
	/** չ�ִ����̲�Ʒ����������* */
	function showAgentProdTypeDiv(t){
		if(t == "1"){
			jQuery("#agentordertypeOption").css("display","block");
		}else{
			jQuery("#agentordertypeOption").css("display","none");
			jQuery(".agentselectbox").css("border","#ff6507 1px solid");
		}
	}
	
	/**
	 * �����л�
	 */
	function changeType(type){
		
		// �л���Ʒ�������ػ�ȡ����˺Ų�
		jQuery("#newDivLanADSL").css("display","none");
		// �л���Ʒ�������ص�����Ϣ����
		jQuery("#PAYCITYCODE_PROMPT_W").css("display","none");
		// �л���Ʒ�������غ�����Ϣ����
		jQuery("#PHONENUM_PROMPT_W").css("display","none");
		// �л���Ʒ������������ѯ
		jQuery("#yue").html("");

		// ��ֵ���������Ϣ��ʽչ��
		PhonenumStyle(0);
		
		jQuery("#ORDERTYPE").val(type);
		if(type == "3" || type == "6"){
			jQuery("#isKuanDai").val("true");
			// ��ʾ�����
			jQuery("#ORDERTYPE_LI").removeClass("li");
			jQuery("#ORDERTYPE_LI").removeClass("li1");
			jQuery("#ORDERTYPE_LI").addClass("li1");
			jQuery("#kuandaiBanner").css("display","inline-block");
			jQuery("#phone_label").html("����˺ţ�");
		}else{
			jQuery("#isKuanDai").val("false");
			// ���ع����
			jQuery("#ORDERTYPE_LI").removeClass("li");
			jQuery("#ORDERTYPE_LI").removeClass("li1");
			jQuery("#ORDERTYPE_LI").addClass("li");
			jQuery("#kuandaiBanner").css("display","none");
			jQuery("#phone_label").html("��ֵ���룺");
		}
		
		// ��Ʒ������ʽ�л�
		changeSelected();
		
		// ѡ�в�Ʒ��رղ�
		jQuery(".selectoption").css("display","none");
		jQuery(".selectbox").css("border","1px solid #FF6507");
		
		// ������ʾ����(1,Ϊ�̶��绰;11,Ϊ����;2,ΪС��ͨ;-1,ΪԤ��ͨ;3,Ϊ���ADSL;6Ϊ���LAN)
		if(type == "1" || type == "11" || type == "2" || type == "-1" || type == "3" || type == "6"){
			jQuery("#showCity").css("display","block");
			
			jQuery("#guanggao").css("margin-left","510px");
		}else{
			jQuery("#showCity").css("display","none");
			jQuery("#guanggao").css("margin-left","0px");
		}
		jQuery("#PHONENUM").val("");// �޸Ĳ�Ʒ����ʱ�����ÿ�
		jQuery("#yue").html("");// �޸Ĳ�Ʒ��������ʱ������
		// �޸Ĳ�Ʒ��������ʱ���ȷ�Ϻ���
		jQuery("#numberConfirmation").html("");
		// �л���ֵ����
		showPayType(type);
		
		// δѡ����ʾ[һ������²����ִ������]
		if(jQuery("#ORDERTYPE").val(type) == "" || jQuery("#ORDERTYPE").val(type) == ""){
			jQuery("#ORDERTYPE_PROMPT_W").css("display","inline-block");
		}else{
			jQuery("#ORDERTYPE_PROMPT_W").css("display","none");
		}
	}
	
		
	/* ���ݵ���չ�ֳ�ֵ���� */
	function  modifyType(value,changeType){
    	  
    	if(changeType == "citycode"){// �޸����ڵ���
    		
    		for(var j=1;j<=6;j++){
    			jQuery("#showType"+j).css("display","none");
    		}
    		
    		if(value == "0591"){
    			jQuery("#showType1").css("display","block");
    			changeRechargeSpan("showType1",beforem);
    		}else if(value == "0592"){    			
    			jQuery("#showType5").css("display","block");	
    			changeRechargeSpan("showType5",beforem);
				
    		}
    		else{    		
    			// �İ��showType4��showType1��ֵ������һ����,����ʾshowType1
    			// jQuery("#showType4").css("display","block");
    			jQuery("#showType1").css("display","block");
    			changeRechargeSpan("showType1",beforem);
    		}    		
    	}
    }
	
	/* ���ݲ�Ʒ����չ�ֳ�ֵ���� */
	function showPayType(type){
		var cityCode = jQuery("#PAYCITYCODE").val();			
		for(var i=1;i<=6;i++){
			jQuery("#showType"+i).css("display","none");
		}
		var paycardtype = jQuery("#paycardtype").val();
		if(paycardtype==2 || paycardtype==1 ){
			beforem=paycardtype;
		}else if(paycardtype==''){
			beforem=1;
		}
		if(type == "50"  || type == "10"){// �ֻ�
			if(cityCode == "0592"){
				jQuery("#rechargeDiv6").show();
				if(type == "10")
				{
					jQuery("#rechargeDiv6").hide();
					
				}
				jQuery("#showType6").css("display","block");
				changeRechargeSpan("showType6",beforem);
			}else{		
				jQuery("#rechargeDiv").show();
				if(type == "10")
				{
					jQuery("#rechargeDiv").hide();
				}
				jQuery("#showType2").css("display","block");	
				changeRechargeSpan("showType2",beforem);
			}
			jQuery("#rechargeSpan1").find("a").click();
		}else if(type == "-1" || type == "11"){			
			jQuery("#showType3").css("display","block");
			changeRechargeSpan("showType3",beforem);
			
		}else{
			if(cityCode == "0591"){
				jQuery("#showType1").css("display","block");
				changeRechargeSpan("showType1",beforem);
			}else if(cityCode == "0592"){
				jQuery("#showType5").css("display","block");
				changeRechargeSpan("showType5",beforem);
			}
			else{
			// �İ��showType4��showType1��ֵ������һ����,����ʾshowType1
    			// jQuery("#showType4").css("display","block");
    			jQuery("#showType1").css("display","block");
    			changeRechargeSpan("showType1",beforem);
			}				
		}
		
	}
	
	/** ******************************֧��ҳ�濪ʼ************************************* */
	/**
	 * ��֧��ҳ������������ʾ����
	 */
	function showOtherBankFlag(){
		var flag = jQuery("#otherBank").css("display");
		if(flag == "block"){
			jQuery("#otherBank").css("display","none");
			// ѡ������ͼƬ�л�
			jQuery(".xzqt").css("background-image","url(images/newImages/ico5.gif)"); 
		}else{
			jQuery("#otherBank").css("display","block");
			// ѡ������ͼƬ�л�
			jQuery(".xzqt").css("background-image","url(images/newImages/icoup5.gif)");
		}
		var main = jQuery(window.parent.document).find("#chargeIframe");
		var thisheight = jQuery(document).height()+30;
		main.height(thisheight);
	}
	
	/**
	 * ��ֵ����л�
	 * 
	 * @param t,Ϊ��ֵ����;
	 * @param i,Ϊ����
	 */
	
function changeMoney(t,i){
		// ��ֵ����л�����ֵ��������Ϣ����
		jQuery("#promptCash").css("display","none");
		jQuery("#CASH_PROMPT_W").css("display","none");
		
		// cashType:3,200Ԫ;2,100Ԫ;1,50Ԫ;0,����
		jQuery("#cashMoney").find("a").each(function(){
			jQuery(this).removeClass("a2");
			jQuery(this).removeClass("a1");
			jQuery(this).addClass("a1");
		});
		jQuery("#cashMoney").find("a").eq(i).removeClass("a1");
		jQuery("#cashMoney").find("a").eq(i).addClass("a2");
		if(t == "3"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("200");
		}else if(t == "2"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("100");
		}else if(t == "1"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("50");
		}else if(t == "0"){
			// ��������ȡ�ı����ֵ
			var otherCash = jQuery("#otherCash").val();
			jQuery("#otherCash").css("border-color","#FF6507");
			// �ı��Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1_");
			jQuery("#cashType").val(t);
			// ������ȥ��
			jQuery("#bestCash").val(otherCash.replace(/,/g,''));
		}else if(t == "7"){
			// ��������ȡ�ı����ֵ
			var otherCash = jQuery("#otherCash_new").val();
			jQuery("#otherCash_new").css("border-color","#0000");//FF6507
			// �ı��Ӵ�
			jQuery("#otherCash_new").removeClass("wenben0");
			jQuery("#otherCash_new").removeClass("wenben0_");
			jQuery("#otherCash_new").addClass("wenben0_");
			jQuery("#cashType").val(t);
			// ������ȥ��
			jQuery("#bestCash").val(otherCash.replace(/,/g,''));
		}
	}
	
	/**
	 * �����̳�ֵ����л�
	 * 
	 * @param t,Ϊ��ֵ����;
	 * @param i,Ϊ����
	 */
	
	function changeAgentMoney(t,i){
		
		// ��ֵ����л�����ֵ��������Ϣ����
		jQuery("#promptCash").css("display","none");
		jQuery("#CASH_PROMPT_W").css("display","none");
		
		// cashType:3,5000Ԫ;2,3000Ԫ;1,1000Ԫ;0,����
		jQuery("#cashMoney").find("a").each(function(){
			jQuery(this).removeClass("a2");
			jQuery(this).removeClass("a1");
			jQuery(this).addClass("a1");
		});
		jQuery("#cashMoney").find("a").eq(i).removeClass("a1");
		jQuery("#cashMoney").find("a").eq(i).addClass("a2");
		if(t == "3"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("5000");
		}else if(t == "2"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("3000");
		}else if(t == "1"){
			jQuery("#cashType").val(t);
			jQuery("#otherCash").css("border-color","#BEBEBE");
			// �ı�ȥ���Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1");
			jQuery("#bestCash").val("1000");
		}else if(t == "0"){
			// ��������ȡ�ı����ֵ
			var otherCash = jQuery("#otherCash").val();
			jQuery("#otherCash").css("border-color","#FF6507");
			// �ı��Ӵ�
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").removeClass("wenben1_");
			jQuery("#otherCash").addClass("wenben1_");
			jQuery("#cashType").val(t);
			// ������ȥ��
			jQuery("#bestCash").val(otherCash.replace(/,/g,''));
		}
	}

	/**
	 * �ı�����̵���
	 */
	function doForMoney_kd(){
		changeMoney('7','3');
		var money = jQuery("#otherCash").val();
		// ������ȥ��,�ٽ�������У��
		numcheck(money.replace(/,/g,''));
		// ����ı�����Ĭ�ϵĽ��
		// clearDefaultMoney();
		// ������Ľ��չ�����ı���
		showMoney();
	}
	
	/**
	 * �ı�����̵���
	 */
	function doForMoney(){
		changeMoney('0','3');
		var money = jQuery("#otherCash").val();
		// ������ȥ��,�ٽ�������У��
		numcheck(money.replace(/,/g,''));
		// ����ı�����Ĭ�ϵĽ��
		// clearDefaultMoney();
		// ������Ľ��չ�����ı���
		showMoney();
	}
	
	/**
	 * �ı�����̵���(������)
	 */
	function doForAgentMoney(){
		changeMoney('0','3');
		var money = jQuery("#otherCash").val();
		// ������ȥ��,�ٽ�������У��
		numcheck(money.replace(/,/g,''));
		// ����ı�����Ĭ�ϵĽ��
		// clearDefaultMoney();
		// ������Ľ��չ�����ı���
		showAgentMoney();
	}
	
	/**
	 * ��ʼ��������ʱ����ı�����Ĭ�ϵĽ��
	 */
	function clearDefaultMoney(){
		var inputOnceFlag = jQuery("#InputOnce").val();
		if(inputOnceFlag == "true"){
			jQuery("#otherCash").val("");
			jQuery("#bestCash").val("");
			jQuery("#InputOnce").val("false");
			jQuery("#otherCash").removeClass("wenben1");
			jQuery("#otherCash").addClass("wenben1_");
		}
	}
	
	/**
	 * ������Ľ�����֣�ÿ3λ����һ�����ŷָ�
	 */
	function showMoney(){
		var otherCash = jQuery("#otherCash").val();
		var cashType =  jQuery("#cashType").val();
		// �滻����
		otherCash = otherCash.replace(/,/g,'');
		jQuery("#bestCash").val(otherCash);
		// ���� 1000Ԫʱ��ʾ��Ϣ
		if(otherCash*100 > 1000*100){
			jQuery("#promptCash").css("display","block");
		}else{
			jQuery("#promptCash").css("display","none");
		}
		// �ö��ŷָ�
		var tempCash = otherCash.replace(/(?=(?:\d{3})+(?!\d))/g,','); // ��������һ��BUG,�������Ϊ3����,�ָ�����ǰ����һ������
		if(otherCash.length%3 == 0){
			if(tempCash.indexOf(",") == 0){
				tempCash = tempCash.substring(1,tempCash.length);
			}
		}
		jQuery("#otherCash").val(tempCash);
		
		
		// ���ش�����ʾ
		jQuery("#CASH_PROMPT_W").css("display","none");
	}
	
	/**
	 * ������Ľ�����֣�ÿ3λ����һ�����ŷָ�(������)
	 */
	function showAgentMoney(){
		var otherCash = jQuery("#otherCash").val();
		var cashType =  jQuery("#cashType").val();
		// �滻����
		otherCash = otherCash.replace(/,/g,'');
		jQuery("#bestCash").val(otherCash);
		// �ö��ŷָ�
		var tempCash = otherCash.replace(/(?=(?:\d{3})+(?!\d))/g,','); // ��������һ��BUG,�������Ϊ3����,�ָ�����ǰ����һ������
		if(otherCash.length%3 == 0){
			if(tempCash.indexOf(",") == 0){
				tempCash = tempCash.substring(1,tempCash.length);
			}
		}
		jQuery("#otherCash").val(tempCash);
	}
	
	/**
	 * ���������ַ���
	 * 
	 * @param evnt
	 * @return
	 */
	function filerValidPerfect(evnt){
		var event = event || window.event;
		var keyCode=window.event?evnt.keyCode:evnt.which;
	 	if(keyCode<8||(keyCode>8&&keyCode<48)||(keyCode>57&&keyCode<96)||keyCode>105){
	 		return false;
		}
	 	return true;
	}

	/** **************************************��ֵ��У�鿪ʼ*********************************** */
	
	/**
	 * ��ֵ���������Ϣ��ʾ��ʽ
	 * 
	 * @param 1��չ�֣�0����չ��
	 */
	function PhonenumStyle(type){
		if(type == "1"){
			// [��ʾЧ���л�����ʾ�ɸ߶ȸߵ�LI]
		 	jQuery("#PHONENUM_LI").removeClass("li");
			jQuery("#PHONENUM_LI").removeClass("li1");
			jQuery("#PHONENUM_LI").addClass("li1");
			jQuery("#PHONENUM_PROMPT_W").css("display","block");
		}else{
			jQuery("#PHONENUM_PROMPT_W").css("display","none");
			// [��ʾЧ���л�����ʾ�ɸ߶ȵ͵�LI]
		 	jQuery("#PHONENUM_LI").removeClass("li");
			jQuery("#PHONENUM_LI").removeClass("li1");
			jQuery("#PHONENUM_LI").addClass("li");
		}
		
	}
	
	/***************************************************************************
	 * **********************�ֲ����鿪ʼ[��Ҫ��������onblur�¼�]************************
	 **************************************************************************/
	 function checkBestFormPart(type){
		 var orderType = jQuery("#ORDERTYPE").val();
		 var phonenum = jQuery("#PHONENUM").val();
		 var cityCode = jQuery("#PAYCITYCODE").val();
		 
		 // �ֻ�����
		 if(type == "PHONENUM"){
			 	if (!checkEmpty("PHONENUM")){
					// ��ť���
					changeButtonGray();
					jQuery("#PHONENUM_PROMPT").html("�������ֵ����");
					// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
					return false;
			 	}else{	
			 			
						if(orderType == "1" || orderType == "2" || orderType == "11"){
							if(cityCode == "0591" || cityCode == "0595"){
						 			if(phonenum.length != 8){
						 				// ��ť���
						    			changeButtonGray();
						 		 		jQuery("#PHONENUM_PROMPT").html("������8λ��ֵ���룡");
						 		 		// ��ֵ���������Ϣ��ʽչ��
										PhonenumStyle(1);
										return false;
						 			}
						 	}else{
						 			if(phonenum.length != 7){
						 				// ��ť���
						    			changeButtonGray();
						 		 		jQuery("#PHONENUM_PROMPT").html("������7λ��ֵ���룡");
						 		 	// ��ֵ���������Ϣ��ʽչ��
										PhonenumStyle(1);
										return false;
						 			}
						 	}
				        }else if(orderType == "50" || orderType == "10" || orderType == "-1"){
				        	if(phonenum.length < 11){
				        		// ��ť���
				    			changeButtonGray();
								jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ���룡");
								// ��ֵ���������Ϣ��ʽչ��
								PhonenumStyle(1);
								if(orderType=="50"){
									jQuery("#isyzfdj").val("");
								}
								return false;
							}
				        		
				        }else if(orderType == "3" || orderType == "6"){
				        	if(phonenum.length < 6){
				        		// ��ť���
				    			changeButtonGray();
								jQuery("#PHONENUM_PROMPT").html("��Ǹ��ϵͳ֧�ֵ���С�ʺ��ַ�����Ϊ6λ������������������ʺ�λ����лл������");
								// ��ֵ���������Ϣ��ʽչ��
								PhonenumStyle(1);
								return false;
							}
				        }  
			 	}
			 	// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(0);
			 	jQuery("#phone_label").css('font-weight','normal');
			 	jQuery("#phone_input").css('border-bottom-color','#aaaaaa').css('border-left-color','#aaaaaa').css('border-right-color','#aaaaaa').css('border-top-color','#aaaaaa');
		 }
		 
		 // ��ֵ���
		 if(type == "bestCash"){
			 	var bestCash = jQuery("#bestCash").val();
				// ��֤���
				if (!checkEmpty("bestCash")){
					// ��ť���
					changeButtonGray();
					jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("�������ֵ���");
					return false;
			 	}
				
				if (isNaN(bestCash)){
					// ��ť���
					changeButtonGray();
					jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ���֣�����");
					return false;
				} 
			 	
			 	// ��ֵ���[1~3500]
			 	if(commonValidateMoney(bestCash,'1','3500') == "0"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
			 		return false;
			 	}else if(commonValidateMoney(bestCash,'1','3500') == "1"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ3500Ԫ");
			 		return false;
			 	}else if(commonValidateMoney(bestCash,'1','3500') == "2"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1Ԫ");
			 		return false;
			 	}
			 	jQuery("#CASH_PROMPT_W").css("display","none");
			 	
		 }
		 
		 // ��֤��
		 if(type == "INVALIDATE_T"){
			 	var yzm = jQuery("#INVALIDATE_T_H").val();
				if(yzm == "0"){
					// ��ť���
					changeButtonGray();
					jQuery("#INVALIDATE_T_IMAGE").html("<img src=\"/service/pay/images/newImages/errorTishi.gif\">");
					jQuery("#INVALIDATE_T_PROMPT").html("��֤�����");
					jQuery("#INVALIDATE_T_PROMPT_W").css("display","inline-block");
					return false;
				}
		 }
		 
		 // �ٵ�ȫ��У��
		 checkFormEmpty();
		 
	 }
	
	/***************************************************************************
	 * **********************�ֲ��������[��Ҫ��������onblur�¼�]************************
	 **************************************************************************/
	
	/***************************************************************************
	 * **********************ȫ�ּ��鿪ʼ[��Ҫ��������onkeyup�¼�***********************
	 **************************************************************************/
	
	/**
	 * ��ֵ�ɷѱ��ϰ벿�ֹ������ֿ��ж�(����onkeyup�¼�)
	 */
	function checkBestFormAboveEmpty(){
		var orderType = jQuery("#ORDERTYPE").val();
		var phonenum =  jQuery("#PHONENUM").val();
		var cityCode = jQuery("#PAYCITYCODE").val();
		
		// ��֤��Ʒ����
		if (!checkEmpty("ORDERTYPE")){
			// ��ť���
			changeButtonGray();
			return false;
	 	}
		
		// ��֤����PAYCITYCODE 1,Ϊ�̶��绰;11,Ϊ����;2,ΪС��ͨ;-1,ΪԤ��ͨ;3,Ϊ���ADSL;6Ϊ���LAN)
		if(orderType == "1" || orderType == "11" || orderType == "2" || orderType == "-1" || orderType == "3" || orderType == "6"){
			if (!checkEmpty("PAYCITYCODE")){
				// ��ť���
				changeButtonGray();
				return false;
		 	}
		}
		
		// ��֤��ֵ����
		if (!checkEmpty("PHONENUM")){
			// ��ť���
			changeButtonGray();
			return false;
	 	}else{	
	 			
	 			if(orderType == "1" || orderType == "2" || orderType == "11"){
					if(cityCode == "0591" || cityCode == "0595"){
				 			if(phonenum.length != 8){
				 				// ��ť���
				    			changeButtonGray();
								return false;
				 			}
				 	}else{
				 			if(phonenum.length != 7){
				 				// ��ť���
				    			changeButtonGray();
								return false;
				 			}
				 	}
		        }else if(orderType == "50" || orderType == "10" || orderType == "-1"){
		        	if(phonenum.length < 11){
		        		// ��ť���
		    			changeButtonGray();
						return false;
					}
		        }else if(orderType == "3" || orderType == "6"){
		        	if(phonenum.length < 6){
		        		// ��ť���
		    			changeButtonGray();
						return false;
					}
		        }   
	 	}
		return true;
		
	}
	
	/**
	 * ��֧��/�����б���°벿�ֿ��ж�(����onkeyup�¼�)
	 */
	function checkBestFormBelowEmpty(){
		
		var bestCash = jQuery("#bestCash").val();
		// ��֤���
		if (!checkEmpty("bestCash")){
			// ��ť���
			changeButtonGray();
			setFocus("otherCash");
			return false;
	 	}else{
	 		// ��ֵ���[1~3500]
		 	if(commonValidateMoney(bestCash,'1','3500') == "0"){
		 		// ��ť���
				changeButtonGray();
		 		return false;
		 	}else if(commonValidateMoney(bestCash,'1','3500') == "1"){
		 		// ��ť���
				changeButtonGray();
		 		return false;
		 	}else if(commonValidateMoney(bestCash,'1','3500') == "2"){
		 		// ��ť���
				changeButtonGray();
		 		return false;
		 	}
	 	}
		
		// ��֤��֤��
		var yzm = jQuery("#INVALIDATE_T_H").val();
		if(yzm == "0"){
			changeButtonGray();
			return false;
		}
		
		// ��֤����
		var bankCode = jQuery("input[name=bankid]:checked").val();
		if(bankCode == ""||bankCode==undefined){
			// ��ť���
			changeButtonGray();
			return false;
		}
		
		return true;
	}
	
	
	/**
	 * ����֤���б���֤����(����onkeyup�¼�)
	 */ 
	
	function checkFormEmpty(){
        
		if(checkBestFormAboveEmpty()){
			// 0δѡ��
			if(beforem == 0){
				return false;
			// ��������/��֧��
			}else if(beforem == 1){
				if(checkBestFormBelowEmpty()){
					// [ȷ��������һ����ť����]
					changeButtonGreen();
				}
			// 11188����ֵ
			}else if(beforem == 2){
				if(check11888PLMimaIsEmpty()){// �ж����������Ƿ�Ϊ��
					close11888PayConfirmButton('pl');
					return false;
				}else if(!checkAll11888MinaIsRight()){// ��������Ϊ�����ж������Ƿ�ȫ����ȷ
					close11888PayConfirmButton('pl');
					return false;
				}				
				var v=jQuery("#INVALIDATE_T_PL").val();
				if(check11888PLYZMIsEmpty()){// �ж���֤���Ƿ�Ϊ��
					close11888PayConfirmButton('pl');	
					return false;
				}else if(v.length>0 && v.length<5){	// ��֤�벻Ϊ�գ��ж������Ƿ���ȫ
					close11888PayConfirmButton('pl');
					return false;
				}else{// ��֤�벻Ϊ�����Ѿ���д�������ж��Ƿ���ȷ
					if(!check11888PLYZMIsRight()){
						close11888PayConfirmButton('pl');
						return false;
					}				
				}
				open11888PayConfirmButton('pl');
				return true;
			// 20198����ֵ
			}else if(beforem == 3){
				return false;
			}
		}
		
	}
	/***************************************************************************
	 * **********************ȫ�ּ������[��Ҫ��������onkeyup�¼�***********************
	 **************************************************************************/
	
	function bestFormSubmitNew(){
		if (!checkEmpty("ORDERTYPE")){
			// ��ť���
			changeButtonGray();
			jQuery("#ORDERTYPE_PROMPT_W").css("display","inline-block");
			return false;
	 	}
		
		var orderType = jQuery("#ORDERTYPE").val(); 	
		

		//�жϲ�����ΪС��ͨ��ֵ
		if("2" == orderType){
			return false;
		}
		
		// ����У�� 1,Ϊ�̶��绰;11,Ϊ����;2,ΪС��ͨ;-1,ΪԤ��ͨ;3,Ϊ���ADSL;6Ϊ���LAN)
		if(orderType == "1" || orderType == "11" || orderType == "2" || orderType == "-1" || orderType == "3" || orderType == "6"){
			if (!checkEmpty("PAYCITYCODE")){
				// ��ť���
				changeButtonGray();
				jQuery("#PAYCITYCODE_PROMPT_W").css("display","inline-block");
				return false;
		 	}
		}
		
		var cityCode = jQuery("#PAYCITYCODE").val();
		
	 	var phoneNum = jQuery("#PHONENUM").val();
	 	if(phoneNum == "" || phoneNum == null){
	 		// ��ť���
			changeButtonGray();
			jQuery("#PHONENUM_PROMPT").html("�������ֵ����");
			// ��ֵ���������Ϣ��ʽչ��
			PhonenumStyle(1);
			setFocus("PHONENUM");
			return false;
	 	}
	 	if((orderType == "1" || orderType == "2" || orderType == "50" || orderType == "11") && phoneNum.substring(0,3) == "059"){
			// ��ť���
			changeButtonGray();
	 		jQuery("#PHONENUM_PROMPT").html("��ֵ������������ţ�");
	 		// ��ֵ���������Ϣ��ʽչ��
			PhonenumStyle(1);
			setFocus("PHONENUM");
			return false;
		}
	 	// �ֻ�����֧������,�����ɺ�������ز�ѯ
		if(orderType == "50" || orderType == "10"){
	 		if(phoneNum.length != 11){
	 			// ��ť���
				changeButtonGray();
		 		jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ���룡");
		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
				setFocus("PHONENUM");
				return false;
	 		}
			var cityc = findCity(phoneNum);
			if(cityc!=""){
				cityCode = cityc;
				jQuery("#PAYCITYCODE").val(cityc);
			}
	 	}
		
	    var citystate=jQuery("#citystate").val();
	    if(citystate.search(cityCode)!=-1){
	    	// ��ť���
			changeButtonGray();
	 		jQuery("#PHONENUM_PROMPT").html("�ܱ�Ǹ����Ҫ��ֵ�ĺ������ڵ�����ϵͳ����������ʱ�޷��ṩ���񣬸����������㣬�����½⣡");
	 		// ��ֵ���������Ϣ��ʽչ��
	 		PhonenumStyle(1);
			setFocus("PHONENUM");
			return false;
	    }
	   
	 	var flag = "";
		if(orderType == "-1"){
			flag = "1";
		}else{
			flag = productIfExit(cityCode,orderType,phoneNum);
		}
		if(flag != "1"){
			// alert("�Բ���"+flag+"!");
			// �޸���ʾ��
			// alert("�Բ���������ĺ������������ĺ�����δ���ã���ѡ���Ʒ����Ϊ[Ԥ��ͨ]");
			// ��ť���
			changeButtonGray();
	 		jQuery("#PHONENUM_PROMPT").html("�Բ���������ĺ������������ĺ�����δ���ã���ѡ���Ʒ����Ϊ[Ԥ��ͨ]");
	 		// ��ֵ���������Ϣ��ʽչ��
			PhonenumStyle(1);
			setFocus("PHONENUM");
			return false;
		}
		if(cityCode == "0591" || cityCode == "0595"){
	 		if(orderType == "1" || orderType == "2" || orderType == "11"){
	 			if(phoneNum.length != 8){
	 				// ��ť���
	 				changeButtonGray();
	 		 		jQuery("#PHONENUM_PROMPT").html("������8λ��ֵ���룡");
	 		 		// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
	 				setFocus("PHONENUM");
					return false;
	 			}
	 		}
	 	}else{
	 		if(orderType == "1" || orderType == "2" || orderType == "11"){
	 			if(phoneNum.length != 7){
	 				// ��ť���
	 				changeButtonGray();
	 		 		jQuery("#PHONENUM_PROMPT").html("������7λ��ֵ���룡");
	 		 		// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
	 				setFocus("PHONENUM");
					return false;
	 			}
	 		}
	 	}
	 	if(orderType == "50" || orderType == "10"){
	 		if(phoneNum.length != 11){
	 			// ��ť���
 				changeButtonGray();
 		 		jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ���룡");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
 				setFocus("PHONENUM");
				return false;
	 		}
	 	}
		
		// �ж��Ƿ���һ��˫������룻
		if(orderType == "50"){
			var isVir = isVirtualNum(phoneNum,cityCode,orderType);
			if(isVir!="" && isVir=="1"){
				// ��ť���
 				changeButtonGray();
 				// [��ʾЧ���л�����ʾ�ɸ߶ȸߵ�LI]
 		 		jQuery("#PHONENUM_PROMPT").html("�Բ��𣬸ú�����һ��˫������룬������ݲ�������������������������");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
 				setFocus("PHONENUM");
				return false;
			}
		}
		if(orderType == "1" || orderType == "2"){
			if(cityCode == "0591" || cityCode == "0595"){
				if(phoneNum.length < 8){
					// ��ť���
	 				changeButtonGray();
	 		 		jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ���벻ӦС��8λ������");
	 		 		// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
	 				setFocus("PHONENUM");
					return false;
				}
			}else{
				if(phoneNum.length < 7){
					// ��ť���
	 				changeButtonGray();
	 		 		jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ���벻ӦС��7λ������");
	 		 		// ��ֵ���������Ϣ��ʽչ��
					PhonenumStyle(1);
	 				setFocus("PHONENUM");
					return false;
				}
			}	
			
			if(phoneNum.replace(/[\d|X|PHS]/g,'')!=""){
				// ��ť���
 				changeButtonGray();
 		 		jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ�����ʽ���ԣ�");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
 				setFocus("PHONENUM");
				return false;
			}
		}
		if(orderType == "3" ||orderType == "6"){
			 if(phoneNum.length < 6 ) {         
				// ��ť���
 				changeButtonGray();
 		 		jQuery("#PHONENUM_PROMPT").html("��Ǹ��ϵͳ֧�ֵ���С�ʺ��ַ�����Ϊ6λ������������������ʺ�λ����лл������");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
 				setFocus("PHONENUM");
				return false;
			 }else if(phoneNum.replace(/[\w@\.]/g,'')!=""){ 
				// ��ť���
 				changeButtonGray();
 		 		jQuery("#PHONENUM_PROMPT").html("��Ǹ����������������ʺŸ�ʽ���ԣ�ֻ������@����������ĸ ������");
 		 		// ��ֵ���������Ϣ��ʽչ��
				PhonenumStyle(1);
 				setFocus("PHONENUM");
				return false;
			}
		}	
		var flag = false;
		jQuery("input[name=bankid]:checked").each(function(){
		  	flag = true;
		});
	 
	 	if(!flag){
		 	// ��ť���
			changeButtonGray();
	 		jQuery("#BANKID_PROMPT_W").css("display","inline-block");
			return false;
	 	}	
		
		var bestCash = jQuery("#bestCash").val();
	 	if(bestCash == "" || bestCash == null || bestCash.length<=0){
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��������ȷ�ĳ�ֵ����");
			setFocus("bestCash");
			return false;
	 	}
	 	if (isNaN(bestCash)){
			jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ���֣�����");
			setFocus("bestCash");
			return false;
		} 
	 	// ��ֵ���[1~3500]
	 	if(commonValidateMoney(bestCash,'1','3500') == "0"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
	 		return false;
	 	}else if(commonValidateMoney(bestCash,'1','3500') == "1"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ3500Ԫ");
	 		return false;
	 	}else if(commonValidateMoney(bestCash,'1','3500') == "2"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1Ԫ");
	 		return false;
	 	}
		var varProductId = "";
		jQuery("[name='INVALIDATE_T']").each(function(){
		  	if(jQuery(this).val().length>0){
		  		varProductId = jQuery(this).val();
		  	}
		})
	 	
		if(varProductId == ""){
	      	 // ��ť���
			 changeButtonGray();
	 		 jQuery("#INVALIDATE_T_PROMPT_W").css("display","inline-block");
	 		 jQuery("#INVALIDATE_T_IMAGE").html("<img  src=\"/service/pay/images/newImages/errorTishi.gif\">");
	 		 jQuery("#INVALIDATE_T_PROMPT").html("��������֤�룡����");
	      	 setFocus("INVALIDATE_T");
	      	 return false;
	    }
	    
	    if(checkYzm(varProductId) == 1){
	    	  // ������ȡ��֤��
	    	  proof_diagram('diagram','');
	          return false;
	    }
	    
	    getPaymentBalance('4');
	    var bestPass = jQuery("#bestPass").val();
	    if(bestPass != "true"){
	    	// ��ť���
			changeButtonGray();
			var resultMsg = jQuery("#bestResultMsg").val();
			alert(resultMsg);
			return false;
	    }
	    if(orderType =="3" || orderType =="6"){
	        isMsgAdsl(path,orderType,phoneNum,cityCode);
	    }else{
	    	////1�����˻�������������2��֧���˻�
	    	var changePayBank =jQuery("input[name='changePayBank']:checked").val();
	    	var bankid=jQuery("input[name=bankid]:checked").val();
	    	if(orderType=="10"){
	    		//��֧���˻�Ԥ��ӿ���֤
	    		//alert("cashToEpayGudge:��һ��");
	    		cashToEpayGudge("50",phoneNum,cityCode,bestCash);
	    		
	    	}else{
		    	var div = jQuery("#ONEP", parent.document);//window.top.document.getElementById('ONEP');
				div.css("display","none");
				var page =jQuery("#NNNP", parent.document);// window.top.document.getElementById("NNNP");
				div.css("display","none");
				var pageW = jQuery("#SHOWPP", parent.document);// window.top.document.getElementById("SHOWPP");
				pageW.click();	
	    	}

	    }
		
		// ���ύ��ȷ��ҳ����֤�������������ȡ��֤��
		jQuery("#INVALIDATE_T").val("");
		proof_diagram('diagram','');
		jQuery("#INVALIDATE_T_PROMPT_W").css("display","none");
		// ��֤�����������ó�0
		jQuery("#INVALIDATE_T_H").val("0");
		
		// ��ť���
		changeButtonGray();
	}
	
	//�Ƿ��������Ϣ��Ԣ����ײ͡������Ƶ�¼�����ֵ���16Ԫ��18Ԫ��20Ԫ��25Ԫ
	function isMsgAdsl(path,orderType,phoneNum,cityCode){
			var path = path+"/AjaxServlet.do?orderType="+orderType+"&phoneNum="+phoneNum+"&cityCode="+cityCode;
			var result = "";
			jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		cache : false,
		  		async : false,
		  		data : ( {
		  			method:'isMsgAdsl'
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
					result = json.CODE;
					if(result=="0"){
						openlayer(440,140);
					}else{
						var div = jQuery("#ONEP", window.top.document);//window.top.document.getElementById('ONEP');
						div.css("display","none");
						var page =jQuery("#NNNP", window.top.document);// window.top.document.getElementById("NNNP");
						div.css("display","none");
						var pageW = jQuery("#SHOWPP", window.top.document);// window.top.document.getElementById("SHOWPP");
						pageW.click();
					}
		  		},
				error : function() 
				{
			   		alert('������ʱ�����Ժ����ԣ���');
				}
		  	});
			
	}
	function cashToEpayGudge(orderType,phoneNum,cityCode,bestCash){
		var path ="/PayAjaxServlet.do";
		var result = "";
		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		async : false,
	  		data : ( {
	  			method:"cashToEpayGudge",
	  			ORDERTYPE:orderType,
	  			PHONENUM:phoneNum,
	  			CITYCODE:cityCode,
	  			BESTCASH:bestCash
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
				result = json.CODE;
				//result="0";//����
				if(result=="0"){
					var div = jQuery("#ONEP", parent.document);//window.top.document.getElementById('ONEP');
					div.css("display","none");
					var page =jQuery("#NNNP", parent.document);// window.top.document.getElementById("NNNP");
					div.css("display","none");
					var pageW = jQuery("#SHOWPP", parent.document);// window.top.document.getElementById("SHOWPP");
					pageW.click();
				}else if(result=="1") {
					alert("�޷���ֵ��������֧���˻�,��ѡ��������ֵ�˻�");
				}else{
					alert("���޷���ֵ��֧���˻�");
				}
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
	}
	function openlayer(width,height){
        var left=(jQuery(window).width()-width)/2;
        var top=(jQuery(window).height()-height)/2;
		 var srcUrl = '<iframe src='+path+'"/service/pay/bestpay/showMsgADSLInfo.jsp?type=1" allowtransparency="true" id="" scrolling="no" frameborder="0" width="'+width+'" height="'+height+'">';
		 jQuery.layerSetup({ 
				id:"opDiv",
				width:width, 
				height:height,
				content:srcUrl, 
				isbg:true,
				left:left,
				top:top,
			    opacity:0,
				templete:'<div style="width:'+width+';*width:'+width+';height:'+height+';" id="@contentid@"></div>'
			}); 
		 jQuery.layershow(); 
		 jQuery.layerclose=layerClose1;
		 jQuery(window).scrollTop(0);
	     //jQuery(document.body).get(0).scroll="yes";
		 
        }
	 
	 // �رղ�
		function layerClose1(__id){
			jQuery("#"+__id+"_background").remove(); 
			jQuery("#"+__id).remove();
			//jQuery('#msgADSLId').html(jQuery('#msgADSLId').data("msgADSLId"));
			jQuery(window).scrollTop=function(){return true;};
			//jQuery(document.body).get(0).scroll="yes";
		}
	/** **************************************��ֵ��У�����*********************************** */
	
	/** **************************************�����̳�ֵ��ʼ**************************************** */
	/***************************************************************************
	 * �����̳�ֵҳ����볤��
	 */
	function agentPhoneNumLength(type){
		if(type == "1" || type == "2" || type == "11"){
			jQuery("#PHONENUM").attr("maxlength","8");  
        }else if(type == "50" || type == "10" || type == "-1"){
        	jQuery("#PHONENUM").attr("maxlength","11");
        }else if(type == "20"){
        	jQuery("#PHONENUM").attr("maxlength","13");
        }else if(type == "30"){
        	jQuery("#PHONENUM").attr("maxlength","7");
        }else if(type == "99"){
        	jQuery("#PHONENUM").attr("maxlength","30");
        }else{
        	jQuery("#PHONENUM").attr("maxlength","20");
        }
	}
        
        
	
	
	
	/*
	 * ��ʼ������ҳ��
	 */
	function initAgentBestpayPage(){
		var orderType = jQuery("#ORDERTYPE").val();
		if(orderType == "110"){
			commonChangetype(1);
			// ��ʼ�����볤��(Ĭ�ϸ�20����)
			agentPhoneNumLength('');
		}else if(orderType == "112"){
			commonChangetype(3);
			var productid = jQuery("#PRODUCTID").val(); 
			// ��ʼ�����볤��
			agentPhoneNumLength(productid);
		}else{
			commonChangetype(1);
			// ��ʼ�����볤��(Ĭ�ϸ�25����)
			agentPhoneNumLength('');
		}
		// ȷ�Ϻ���
		agentComfirmPhonenum();
	}
	
	/**
	 * �����̵����л�
	 */
	function changeAgentCity(cityCode){
		// ��ʾ�ϵ͸���ʽ
		jQuery("#PHONENUM_DIV").removeClass("ptodiv");
		jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
		jQuery("#PHONENUM_DIV").addClass("ptodiv");
		
		// ���������Ϣ����
		jQuery("#PHONENUM_PROMPT_W").css("display","none");
		
		var cityCodeId = "#A_" + cityCode;
		jQuery("#showCity").find("a").removeClass("dq_1");
		jQuery("#showCity").find("a").addClass("dq_2");
		jQuery(cityCodeId).removeClass("dq_2");
		jQuery(cityCodeId).addClass("dq_1");
		jQuery("#PAYCITYCODE").val(cityCode);
		// ���д�����Ϣ��ʾ
		if(!checkEmpty("PAYCITYCODE")){
			jQuery("#PAYCITYCODE_PROMPT_W").css("display","inline-block");
	 	}else{
	 		jQuery("#PAYCITYCODE_PROMPT_W").css("display","none");
	 	}
		// ȷ�Ϻ�������޸�
		agentComfirmPhonenum();
		jQuery(".main_bot1_a li div.div_k_t").css("width","370px");
		jQuery("#agent_A_1").click();
	}
	
	/**
	 * ��ֵ���������Ϣ��ʾչ����ʽ
	 */
	function agentTypePhonenumStyle(type){
		if(type == "110" || type == "111"){
			jQuery("#PHONENUM_DIV").removeClass("ptodiv");
			jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
			jQuery("#PHONENUM_DIV").addClass("ptodiv2");
			jQuery("#PHONENUM_PROMPT_W").removeClass("tishiwai");
			jQuery("#PHONENUM_PROMPT_W").removeClass("tishiwai2");
			jQuery("#PHONENUM_PROMPT_W").addClass("tishiwai");
		}else if(type == "112"){
			jQuery("#PHONENUM_DIV").removeClass("ptodiv");
			jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
			jQuery("#PHONENUM_DIV").addClass("ptodiv2");
			jQuery("#PHONENUM_PROMPT_W").removeClass("tishiwai");
			jQuery("#PHONENUM_PROMPT_W").removeClass("tishiwai2");
			jQuery("#PHONENUM_PROMPT_W").addClass("tishiwai2");
		}
		
	}
	
	
	/**
	 * �����������л���������
	 * 
	 */
	function commonChangetype(type){
		// ֵ110,Ϊ���г�ֵ�˻���ֵ;111,Ϊ�����ۿ��˻���ֵ;112,Ϊ�����������ֵ
	    jQuery("#agenttype").val(type);
	    jQuery("#agent_div").find("a").removeClass("div_k_t_a");
	    jQuery("#agent_Type3").css("display","none");
	    jQuery("#confirmNum").removeClass("cz_span");
	    jQuery("#agent_spanType").removeClass("cz_span");
		var str1 = '���г�ֵ�����̱�ţ�';
		var str2 = "&nbsp;*&nbsp; (�ǰ�ҵ�����)";
		if(type=='1')
		{
			jQuery("#ORDERTYPE").val("110");
			str1 = '���г�ֵ�����̱�ţ�';
			str2 = '&nbsp;*&nbsp; �ǰ�ҵ�����';
			jQuery("#agent_A_1").addClass("div_k_t_a");
			jQuery("span#agent_spanType").html(str1);
			jQuery("span#agent_spanType_tishi").html(str2);
			jQuery("#promptCash").css("display","none");
			jQuery("#confirmNum").addClass("cz_span");
			jQuery("#agent_spanType").addClass("cz_span");
			// ��ʼ�����볤��(Ĭ�ϸ�20����)
			agentPhoneNumLength('');
		}
		else if(type == '3'){
			jQuery("#ORDERTYPE").val("112");
			str1 = '�󶨺��룺';
			str2 =  '&nbsp;*&nbsp;ָ����������󶨺���';
			jQuery("#agent_A_3").addClass("div_k_t_a");
			jQuery("#agent_Type3").css("display","block");
			jQuery("span#agent_spanType").html(str1);
			jQuery("span#agent_spanType_tishi").html(str2);
			jQuery("#promptCash").css("display","block");
			var productid = jQuery("#PRODUCTID").val(); 
			// ��ʼ�����볤��
			agentPhoneNumLength(productid);
		}
		// ��ʾ�ϵ͸���ʽ
		jQuery("#PHONENUM_DIV").removeClass("ptodiv");
		jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
		jQuery("#PHONENUM_DIV").addClass("ptodiv");
		// ���������Ϣ����
		jQuery("#PHONENUM_PROMPT_W").css("display","none");
		// ��Ʒ���ʹ�����Ϣ����
		jQuery("#PRODUCTID_PROMPT_W").css("display","none");
		// �������
		jQuery("#CASH_PROMPT_W").css("display","none");
		
	}
	
	/**
	 * �����������л�
	 */
	function changetype(type)
	{  
		commonChangetype(type);
		// �����л�,�����ȷ�Ϻ������
		jQuery("#PHONENUM").val("");
		jQuery("#numberConfirmation").html("");
	}
	
	/**
	 * �����������ֵ��Ʒ�����л�
	 */
	function agentChangeProdId(){
		var productId = jQuery("#PRODUCTID").val();
		// �����л�,�����ȷ�Ϻ������
		jQuery("#PHONENUM").val("");
		jQuery("#numberConfirmation").html("");
		
	}
	
	/**
	 * �����̺���ȷ��
	 */
	function agentComfirmPhonenum(){
		var ordertype = jQuery("#ORDERTYPE").val();
		var phonenum  = jQuery("#PHONENUM").val();
		var cityCode = jQuery("#PAYCITYCODE").val();
		if(phonenum != null && phonenum != ""){
			jQuery("span#numberConfirmation").html("");
			var tempStr ="";
			// 110,Ϊ���г�ֵ�˻���ֵ; 111,Ϊ�����ۿ��˻���ֵ
			if(ordertype == "110" || ordertype == "111"){
				// ��ÿ4λ��һ�ո�
				tempStr += phonenum.replace(/\s/g,'').replace(/(\w{4})(?=\d)/,"$1 ").replace(/(\w{4})(?=\w)/g,"$1 ");
				jQuery("span#numberConfirmation").html(tempStr);
			// 112,Ϊ�����������ֵ
			}else if(ordertype == "112" || ordertype == "113" || ordertype == "114" || ordertype == "115"){
				// �̻�,��ÿ4λ��һ�ո�;�ֻ�,��3λ+�ո�+ÿ4λ��һ�ո�
				var productId = jQuery("#PRODUCTID").val();
				if(productId =="1"){
					var cityName = " ("+getCityNameByCitycode(cityCode)+") ";
					tempStr += phonenum.replace(/\s/g,'').replace(/(\w{4})(?=\d)/,"$1 ").replace(/(\w{4})(?=\w)/g,"$1 ");
					tempStr += cityName;
				}else if(productId == "50" || productId == "20" || productId == "30" || productId == "99"){
					tempStr += phonenum.replace(/\s/g,'').replace(/(\w{3})(?=\w)/,"$1 ").replace(/(\w{4})(?=\w)/g,"$1 ");
				}
				jQuery("span#numberConfirmation").html(tempStr);
			}
		}
		
	}
	
	/**
	 * ******************************************* ������Ԥ��[start]
	 * ***********************************************
	 */
	
	/***************************************************************************
	 * **********************�����ֲ̾����鿪ʼ[��Ҫ��������onblur�¼�]******************
	 **************************************************************************/
	 function checkAgentBestFormPart(type){
		 
		 var orderType = jQuery("#ORDERTYPE").val();
		 var cityCode = jQuery("#PAYCITYCODE").val();
		 
		 // �ֻ�����
		 if(type == "PHONENUM"){
			 	if (!checkEmpty("PHONENUM")){
					// ��ť���
					changeButtonGray();
					// 110,Ϊ���г�ֵ�˻���ֵ; 111,Ϊ�����ۿ��˻���ֵ;112,Ϊ�����������ֵ
					// [��ʾ��ʽ�л�]
					agentTypePhonenumStyle(orderType);
					jQuery("#PHONENUM_PROMPT_W").css("display","block");
					jQuery("#PHONENUM_PROMPT").html("�������ֵ����");
					return false;
			 	}else{	
			 		
			 			var phonenum = jQuery("#PHONENUM").val();
			 			// 110,Ϊ���г�ֵ�˻���ֵ; 111,Ϊ�����ۿ��˻���ֵ;112,Ϊ�����������ֵ
						if(orderType == "112"){
							var productid = jQuery("#PRODUCTID").val();
							if(productid == null && productid == ""){
								// ��ť���
								changeButtonGray();
								jQuery("#PRODUCTID_PROMPT_W").css("display","inline-block");
								return false;
							}else{
								 if(productid == "1"){
									 if(phonenum.length < 8){
											 if(cityCode == "0591" || cityCode == "0595"){
										 			if(phonenum.length != 8){
										 				// ��ť���
										    			changeButtonGray();
										 		 		// [��ʾ��ʽ�л�]
														agentTypePhonenumStyle(orderType);
														jQuery("#PHONENUM_PROMPT").html("������8λ��ֵ���룡");
														jQuery("#PHONENUM_PROMPT_W").css("display","block");
														return false;
										 			}
										 	}else{
										 			if(phonenum.length != 7){
										 				// ��ť���
										    			changeButtonGray();
										 		 		// [��ʾ��ʽ�л�]
														agentTypePhonenumStyle(orderType);
														jQuery("#PHONENUM_PROMPT").html("������7λ��ֵ���룡");
														jQuery("#PHONENUM_PROMPT_W").css("display","block");
														return false;
										 			}
										 	}
									 }
								 }else if(productid == "50"){
									 if(phonenum.length < 11){
							        		// ��ť���
							    			changeButtonGray();
							    			// [��ʾ��ʽ�л�]
											agentTypePhonenumStyle(orderType);
											jQuery("#PHONENUM_PROMPT_W").css("display","block");
											jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ����");
											return false;
									  }
								 }
							}
							
				        }
			 	}
			 	
			 	// ��ʾ�ϵ͸���ʽ
				jQuery("#PHONENUM_DIV").removeClass("ptodiv");
				jQuery("#PHONENUM_DIV").removeClass("ptodiv2");
				jQuery("#PHONENUM_DIV").addClass("ptodiv");
				
				// ���������Ϣ����
				jQuery("#PHONENUM_PROMPT_W").css("display","none");
		 }
		 
		 // ��ֵ���
		 if(type == "bestCash"){
			 	var bestCash = jQuery("#bestCash").val();
				// ��֤���
				if (!checkEmpty("bestCash")){
					// ��ť���
					changeButtonGray();
					jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("�������ֵ���");
					return false;
			 	}
				
				if (isNaN(bestCash)){
					// ��ť���
					changeButtonGray();
					jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ���֣�����");
					return false;
				} 
				// �����������ֵ�� ���[1000~20000]
//			 	if(orderType == "110" || orderType == "111" || orderType == "112" ||orderType == "113" || orderType == "114" || orderType == "115"){
				var lowerBalance="1000";
		 		if(orderType == "112" ||orderType == "113" || orderType == "114"){
			 		var productId = jQuery("#PRODUCTID").val();
			 		var phonenum  = jQuery("#PHONENUM").val();
					var cityCode = jQuery("#PAYCITYCODE").val();
					if(phonenum != "" || phonenum != "undefined"){
						getAgentLower(phonenum,cityCode,productId,function(rs){
							if(rs.agentLowercode=="0"){
								lowerBalance = rs.agentlowerBalance;
							}
						});
					}
			 	}
		 		if(commonValidateMoney(bestCash,lowerBalance,'20000') == "0"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
			 		return false;
			 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "1"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ20000Ԫ");
			 		return false;
			 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "2"){
			 		// ��ť���
					changeButtonGray();
			 		jQuery("#promptCash").css("display","none");
			 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
			 		if(orderType == "112"|| orderType == "113" || orderType == "114"){
			 			alert("�ܱ�Ǹ����ֵ���Ӧ����"+lowerBalance+"Ԫ����������ֵ�������޸ĳ�ֵ���");
			 			jQuery("#CASH_PROMPT").html("��ֵ�����������������ֵ");
			 		}else{
			 			jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1000Ԫ");
			 		}
			 		return false;
			 	}
//			 	}
			 	// Ϊ���г�ֵ�˻���ֵ|Ϊ�����ۿ��˻���ֵ,���[1~20000]
//			 	}else{
//			 		if(commonValidateMoney(bestCash,'1','20000') == "0"){
//				 		// ��ť���
//						changeButtonGray();
//				 		jQuery("#promptCash").css("display","none");
//				 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//				 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
//				 		return false;
//				 	}else if(commonValidateMoney(bestCash,'1','20000') == "1"){
//				 		// ��ť���
//						changeButtonGray();
//				 		jQuery("#promptCash").css("display","none");
//				 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//				 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ20000Ԫ");
//				 		return false;
//				 	}else if(commonValidateMoney(bestCash,'1','20000') == "2"){
//				 		// ��ť���
//						changeButtonGray();
//				 		jQuery("#promptCash").css("display","none");
//				 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//				 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1Ԫ");
//				 		return false;
//				 	}
//			 	}
			 	jQuery("#CASH_PROMPT_W").css("display","none");
		 }
		 
		 // ��֤��
		 if(type == "INVALIDATE_T"){
			 	var yzm = jQuery("#INVALIDATE_T_H").val();
				if(yzm == "0"){
					// ��ť���
					changeButtonGray();
					jQuery("#INVALIDATE_T_IMAGE").html("<img src=\"/service/pay/images/newImages/errorTishi.gif\">");
					jQuery("#INVALIDATE_T_PROMPT").html("��֤�����");
					jQuery("#INVALIDATE_T_PROMPT_W").css("display","inline-block");
					return false;
				}
		 }
		 
		 // �ٵ�ȫ��У��
		 checkAgentBestFormEmpty();
		 
	 }
	
	/***************************************************************************
	 * **********************�����ֲ̾��������[��Ҫ��������onblur�¼�]*****************
	 **************************************************************************/
	
	/***************************************************************************
	 * **********************������ȫ�ּ��鿪ʼ[��Ҫ��������onkeyup�¼�***********************
	 **************************************************************************/
	
	/**
	 * ��ֵ�ɷѱ��ϰ벿�ֹ������ֿ��ж�(����onkeyup�¼�)
	 */
	function checkAgentBestFormEmpty(){
		
		var cityCode = jQuery("#PAYCITYCODE").val();
		
		if (!checkEmpty("PAYCITYCODE")){
			// ��ť���
			changeButtonGray();
			return false;
	 	}
		
		var orderType = jQuery("#ORDERTYPE").val();
		
		// �ֻ�����
	 	if (!checkEmpty("PHONENUM")){
			// ��ť���
			changeButtonGray();
			return false;
	 	}else{	
	 		
	 			var phonenum = jQuery("#PHONENUM").val();
	 			// 110,Ϊ���г�ֵ�˻���ֵ; 111,Ϊ�����ۿ��˻���ֵ;112,Ϊ�����������ֵ
				if(orderType == "112"){
					var productid = jQuery("#PRODUCTID").val();
					if(productid == null && productid == ""){
						// ��ť���
						changeButtonGray();
						return false;
					}else{
						 if(productid == "1"){
							 if(phonenum.length < 8){
									 if(cityCode == "0591" || cityCode == "0595"){
								 			if(phonenum.length != 8){
								 				// ��ť���
								    			changeButtonGray();
												return false;
								 			}
								 	}else{
								 			if(phonenum.length != 7){
								 				// ��ť���
								    			changeButtonGray();
												return false;
								 			}
								 	}
							 }
						 }else if(productid == "50"){
							 if(phonenum.length < 11){
					        		// ��ť���
					    			changeButtonGray();
									return false;
							  }
						 }
					}
					
		        }
	 	}
		 
		// ��ֵ���
	 	var bestCash = jQuery("#bestCash").val();
		// ��֤���
		if (!checkEmpty("bestCash")){
			// ��ť���
			changeButtonGray();
			return false;
	 	}
		
		if (isNaN(bestCash)){
			// ��ť���
			changeButtonGray();
			return false;
		} 
	 	
		// �����������ֵ�� ���[1000~20000]
//	 	if(orderType == "110" || orderType == "111" || orderType == "112"  || orderType == "113" || orderType == "114" || orderType == "115"){
		var lowerBalance="1000";
 		if(orderType == "112"|| orderType == "113" || orderType == "114" ){
	 		var productId = jQuery("#PRODUCTID").val();
	 		var phonenum  = jQuery("#PHONENUM").val();
			var cityCode = jQuery("#PAYCITYCODE").val();
			if(phonenum != "" || phonenum != "undefined"){
				getAgentLower(phonenum,cityCode,productId,function(rs){
					if(rs.agentLowercode=="0"){
						lowerBalance = rs.agentlowerBalance;
					}
				});
			}
	 	}
 		if(commonValidateMoney(bestCash,lowerBalance,'20000') == "0"){
	 		// ��ť���
			changeButtonGray();
	 		return false;
	 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "1"){
	 		// ��ť���
			changeButtonGray();
	 		return false;
	 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "2"){
	 		// ��ť���
			changeButtonGray();
	 		return false;
	 	}
//	 	// Ϊ���г�ֵ�˻���ֵ|Ϊ�����ۿ��˻���ֵ,���[1~20000]
//	 	}else{
//	 		if(commonValidateMoney(bestCash,'1','20000') == "0"){
//		 		// ��ť���
//				changeButtonGray();
//		 		return false;
//		 	}else if(commonValidateMoney(bestCash,'1','20000') == "1"){
//		 		// ��ť���
//				changeButtonGray();
//		 		return false;
//		 	}else if(commonValidateMoney(bestCash,'1','20000') == "2"){
//		 		// ��ť���
//				changeButtonGray();
//		 		return false;
//		 	} 
//	 	}
				
		 
		 // ��֤��
	 	var yzm = jQuery("#INVALIDATE_T_H").val();
		if(yzm == "0"){
			// ��ť���
			changeButtonGray();
			return false;
		}
		
		// ��֤����
		var bankCode = jQuery("input[name=bankid]:checked").val();

		if(bankCode == ""){
			// ��ť���
			changeButtonGray();
			return false;
		}
		
		// [ȷ��������һ����ť����]
		changeButtonGreen();
		
	}
	
	/***************************************************************************
	 * **********************������ȫ�ּ������[��Ҫ��������onkeyup�¼�***********************
	 **************************************************************************/
	
	
	function changeOrderType(orderType){
		jQuery("#ORDERTYPE").val(orderType);
	}
	
	function agentbestFormSubmitNew(){
		if (!checkEmpty("PAYCITYCODE")){
			// ��ť���
			changeButtonGray();
			jQuery("#PAYCITYCODE_PROMPT_W").css("display","inline-block");
			jQuery("#PAYCITYCODE_PROMPT").html("��ѡ�����");
			return false;
	 	}
	 	var cityCode = jQuery("#PAYCITYCODE").val();
	    var citystate=jQuery("#citystate").val();
	    if(citystate.search(cityCode)!=-1){
	    	// ��ť���
			changeButtonGray();
	 		alert("�ܱ�Ǹ����Ҫ��ֵ�ĺ������ڵ�����ϵͳ����������ʱ�޷��ṩ���񣬸����������㣬�����½⣡");
			return false;
	    }
	 	if (!checkEmpty("ORDERTYPE")){
	 		// ��ť���
			changeButtonGray();
			jQuery("#ORDERTYPE_PROMPT_W").css("display","inline-block");
			return false;
	 	}
	 	var orderType = jQuery("#ORDERTYPE").val();
	 	
		// ��Ӵ����������ֵ���жϺ�������
		if(orderType == "112"){
			var productid = jQuery("#PRODUCTID").val();
			if(productid == null || productid == ""){
				// ��ť���
				changeButtonGray();
				jQuery("#PRODUCTID_PROMPT_W").css("display","inline-block");
				return false;
			}
		}
		
		// �����������ֵ��ȡ��Ӧ�Ĳ�Ʒ����
    	var selectType = "";
    	if(orderType == "112"){
    		selectType = jQuery("#PRODUCTID").val();
    	}
    	
	 	var agenttype = jQuery("#agenttype").val();
	 	var phoneNum = jQuery("#PHONENUM").val();
		if(phoneNum == "" || phoneNum == null){
			// ��ť���
			changeButtonGray();
			jQuery("#PHONENUM_PROMPT_W").css("display","block");
			jQuery("#PHONENUM_PROMPT").html("�������ֵ����");
			// 110,Ϊ���г�ֵ�˻���ֵ; 111,Ϊ�����ۿ��˻���ֵ;112,Ϊ�����������ֵ
			// [��ʾ��ʽ�л�]
			agentTypePhonenumStyle(orderType);
			setFocus("PHONENUM");
			return false;
	 	}
		
		var flag = "";
		if((orderType == "3" || orderType == "6") && (phoneNum.indexOf("@") == -1)){
			flag = "1";
		}else if(orderType == "-1"){
			flag = "1";
		}else if(orderType == "110"){
			flag = "1";
		}else if(orderType == "111" || orderType == "113" || orderType == "114"){
			flag = "1";
		}else if(orderType == "112"){
			flag = productIfExit(cityCode,selectType,phoneNum);
		}else{
			flag = productIfExit(cityCode,orderType,phoneNum);
		}
	 
	 	 	
	 	if((orderType == "1" || orderType == "2" || orderType == "50"||orderType == "111" || orderType == "112") && phoneNum.substring(0,3) == "059"){
			// ��ť���
			changeButtonGray();
			jQuery("#PHONENUM_PROMPT_W").css("display","block");
			jQuery("#PHONENUM_PROMPT").html("��ֵ������������ţ�");
			// [��ʾ��ʽ�л�]
			agentTypePhonenumStyle(orderType);
			setFocus("PHONENUM");		
			return false;
		}
		
	 	
		
		if(flag != "1"){
			// alert("�Բ���"+flag+"!");
			changeButtonGray();
	 		jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 		jQuery("#PHONENUM_PROMPT").html("�Բ���������ĺ������������ĺ�����δ���ã���ѡ���Ʒ����Ϊ[Ԥ��ͨ]");
	 		// [��ʾ��ʽ�л�]
			agentTypePhonenumStyle(orderType);
			setFocus("PHONENUM");
			return false;
		}
	 	
    	
		if(cityCode == "0591" || cityCode == "0595"){
	 		if(orderType == "1" || orderType == "2" || orderType == "11" || (orderType == "112" && selectType == "1")){
	 			if(phoneNum.length != 8){
	 				// ��ť���
	 				changeButtonGray();
	 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 				jQuery("#PHONENUM_PROMPT").html("������8λ��ֵ���룡");
	 				// [��ʾ��ʽ�л�]
	 				agentTypePhonenumStyle(orderType);
	 				setFocus("PHONENUM");	
					return false;
	 			}
	 		}
	 	}else{
	 		if(orderType == "1" || orderType == "2" || orderType == "11" || (orderType == "112" && selectType == "1")){
	 			if(phoneNum.length != 7){
	 				// ��ť���
	 				changeButtonGray();
	 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 				jQuery("#PHONENUM_PROMPT").html("������7λ��ֵ���룡");
	 				// [��ʾ��ʽ�л�]
	 				agentTypePhonenumStyle(orderType);
	 				setFocus("PHONENUM");	
					return false;
	 			}
	 		}
	 	}
		
	 	if(orderType == "50" || orderType == "10" || (orderType == "112" && selectType == "50")){
	 		if(phoneNum.length != 11){
	 			// ��ť���
 				changeButtonGray();
 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
 				jQuery("#PHONENUM_PROMPT").html("������11λ��ֵ���룡");
 				// [��ʾ��ʽ�л�]
 				agentTypePhonenumStyle(orderType);
 				setFocus("PHONENUM");	
				return false;
	 		}
	 	}
		
		var reg = new RegExp(/^\d{11}$/);
		if(orderType == 50 || (orderType == "112" && selectType == "50")){
			  if(!reg.test(phoneNum)){
			   	    // ��ť���
	 				changeButtonGray();
	 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 				jQuery("#PHONENUM_PROMPT").html("�ֻ�������������������!!!");
	 				// [��ʾ��ʽ�л�]
	 				agentTypePhonenumStyle(orderType);
	 				setFocus("PHONENUM");	
			   	    return false;
			  }
			  var cityc = findCity(phoneNum);
			  if(cityc!=""){
				  if(cityCode!=cityc){
						// ��ť���
						changeButtonGray();
						jQuery("#PAYCITYCODE_PROMPT_W").css("display","inline-block");
						jQuery("#PAYCITYCODE_PROMPT").html("��������ֻ����������������������!");
					   	setFocus("PHONENUM");
					   	return false;
				  }
			  }
		}   	 
		
		// �ж��Ƿ���һ��˫������룻
		if(orderType == "50" || (orderType == "112" && selectType == "50")){
			var isVir = isVirtualNum(phoneNum,cityCode,orderType);
			if(isVir!="" && isVir=="1"){
				// ��ť���
 				changeButtonGray();
 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
 				jQuery("#PHONENUM_PROMPT").html("�Բ��𣬸ú�����һ��˫������룬������ݲ�������������������������");
 				// [��ʾ��ʽ�л�]
 				agentTypePhonenumStyle(orderType);
 				setFocus("PHONENUM");	
				return false;
			}
		}
		
		if(orderType == "1" || orderType == "2" || (orderType == "112" && selectType == "1")){
			if(cityCode == "0591" || cityCode == "0595"){
				if(phoneNum.length < 8){
					// ��ť���
	 				changeButtonGray();
	 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 				jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ���벻ӦС��8λ������");
	 				// [��ʾ��ʽ�л�]
	 				agentTypePhonenumStyle(orderType);
	 				setFocus("PHONENUM");	
					return false;
				}
			}else{
				if(phoneNum.length < 7){
					// ��ť���
	 				changeButtonGray();
	 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
	 				jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ���벻ӦС��7λ������");
	 				// [��ʾ��ʽ�л�]
	 				agentTypePhonenumStyle(orderType);
	 				setFocus("PHONENUM");	
					return false;
				}
			}	
			
			if(phoneNum.replace(/[\d|X|PHS]/g,'')!=""){
				// ��ť���
 				changeButtonGray();
 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
 				jQuery("#PHONENUM_PROMPT").html("����д�Ĺ̶��绰��С��ͨ�����ʽ���ԣ�");
 				// [��ʾ��ʽ�л�]
 				agentTypePhonenumStyle(orderType);
				setFocus("PHONENUM");
				return false;
			}
		}
		if(orderType == "3" ||orderType == "6"){
			 if(phoneNum.length < 6 ) {         
				// ��ť���
 				changeButtonGray();
 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
 				jQuery("#PHONENUM_PROMPT").html("��Ǹ��ϵͳ֧�ֵ���С�ʺ��ַ�����Ϊ6λ������������������ʺ�λ����лл������");
 				// [��ʾ��ʽ�л�]
 				agentTypePhonenumStyle(orderType);
				setFocus("PHONENUM");
				return false;
			 }else if(phoneNum.replace(/[\w@\.]/g,'')!=""){  
			 	// ��ť���
 				changeButtonGray();
 				jQuery("#PHONENUM_PROMPT_W").css("display","block");
 				jQuery("#PHONENUM_PROMPT").html("��Ǹ����������������ʺŸ�ʽ���ԣ�ֻ������@����������ĸ ������");
 				// [��ʾ��ʽ�л�]
 				agentTypePhonenumStyle(orderType);
				setFocus("PHONENUM");
				return false;
			}
		}	
		//�л��㶫��֧����������ѡ��20140707
//		var flag = false;
//		jQuery("input[name=bankid]:checked").each(function(){
//		  	flag = true;
//		})
//	 	if(!flag){
//	 		// ��ť���
//			changeButtonGray();
//	 		jQuery("#BANKID_PROMPT_W").css("display","inline-block");
//			return false;
//	 	}	
//		
		var bestCash = jQuery("#bestCash").val();
	 	if(bestCash == "" || bestCash == null || bestCash.length<=0){
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��������ȷ�ĳ�ֵ����");
			setFocus("bestCash");
			return false;
	 	}
	 	if (isNaN(bestCash)){
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ���֣�����");
			setFocus("bestCash");
			return false;
		} 
	 	
	 	// �����������ֵ�� ���[1000~20000]
//	 	if(orderType == "110" || orderType == "111" || orderType == "112"  || orderType == "113" || orderType == "114" || orderType == "115"){
	 	var lowerBalance="1000";
 		if(orderType == "112" || orderType == "113" || orderType == "114" ){
	 		var productId = jQuery("#PRODUCTID").val();
	 		var phonenum  = jQuery("#PHONENUM").val();
			var cityCode = jQuery("#PAYCITYCODE").val();
			if(phonenum != "" || phonenum != "undefined"){
				getAgentLower(phonenum,cityCode,productId,function(rs){
					if(rs.agentLowercode=="0"){
						lowerBalance = rs.agentlowerBalance;
					}
				});
			}
	 	}
 		if(commonValidateMoney(bestCash,lowerBalance,'20000') == "0"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
	 		return false;
	 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "1"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ20000Ԫ");
	 		return false;
	 	}else if(commonValidateMoney(bestCash,lowerBalance,'20000') == "2"){
	 		// ��ť���
			changeButtonGray();
	 		jQuery("#promptCash").css("display","none");
	 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
	 		if(orderType == "112"|| orderType == "113" || orderType == "114"){
	 			alert("�ܱ�Ǹ����ֵ���Ӧ����"+lowerBalance+"Ԫ����������ֵ�������޸ĳ�ֵ���");
	 			jQuery("#CASH_PROMPT").html("��ֵ�����������������ֵ");
	 		}else{
	 			jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1000Ԫ");
	 		}
	 		return false;
	 	}
	 	// Ϊ���г�ֵ�˻���ֵ|Ϊ�����ۿ��˻���ֵ,���[1~20000]
//	 	}else{
//	 		if(commonValidateMoney(bestCash,'1','20000') == "0"){
//		 		// ��ť���
//				changeButtonGray();
//		 		jQuery("#promptCash").css("display","none");
//		 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//		 		jQuery("#CASH_PROMPT").html("����ĳ�ֵ����ʽ���ԣ�����");
//		 		return false;
//		 	}else if(commonValidateMoney(bestCash,'1','20000') == "1"){
//		 		// ��ť���
//				changeButtonGray();
//		 		jQuery("#promptCash").css("display","none");
//		 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//		 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ20000Ԫ");
//		 		return false;
//		 	}else if(commonValidateMoney(bestCash,'1','20000') == "2"){
//		 		// ��ť���
//				changeButtonGray();
//		 		jQuery("#promptCash").css("display","none");
//		 		jQuery("#CASH_PROMPT_W").css("display","inline-block");
//		 		jQuery("#CASH_PROMPT").html("��ֵ������Ϊ1Ԫ");
//		 		return false;
//		 	}
//	 	}
		
	    
	    var varProductId = "";
		jQuery("[name='INVALIDATE_T']").each(function(){
		  	if(jQuery(this).val().length>0){
		  		varProductId = jQuery(this).val();
		  	}
		})
	 	
		if(varProductId == ""){
	      	 // ��ť���
			 changeButtonGray();
	 		 jQuery("#INVALIDATE_T_PROMPT_W").css("display","inline-block");
	 		 jQuery("#INVALIDATE_T_IMAGE").html("<img  src=\"/service/pay/images/newImages/errorTishi.gif\">");
	 		 jQuery("#INVALIDATE_T_PROMPT").html("��������֤�룡����");
	      	 setFocus("INVALIDATE_T");
	      	 return false;
	    }
	    
	    if(checkYzm(varProductId) == 1){
	    	  proof_diagram('diagram','');
	          return false;
	    }
	    // �������������ԭ��ѯ���ӿ�(�����Ĵ����������ֵ������ѯ�ӿ�)
	    if(orderType == "110" || orderType == "112" || orderType == "113" || orderType == "114")
	    {
	    	getPaymentBalanceForAgent('4');
		}
	    // �����ۿ�����IFI_UserMsgInfo�ӿ�
	    else if(orderType == "111")
	    {
	    	getPaymentBalanceForAgentDZK('4');
		}
	    
	    var bestPass = jQuery("#bestPass").val();
	    
	 	if(bestPass != "true"){
 			var resultMsg = jQuery("#bestResultMsg").val();
 			alert(resultMsg);
 			return false;
 		}
	 	
		var div = jQuery("#ONEP", window.top.document);//window.top.document.getElementById('ONEP');
		div.css("display","none");
		var page =jQuery("#NNNP", window.top.document);// window.top.document.getElementById("NNNP");
		div.css("display","none");
		var pageW = jQuery("#SHOWPPD", window.top.document);// window.top.document.getElementById("SHOWPPD");
		pageW.click();
	    	
        // ���ύ��ȷ��ҳ����֤�������������ȡ��֤��
		jQuery("#INVALIDATE_T").val("");
		proof_diagram('diagram','');
		jQuery("#INVALIDATE_T_PROMPT_W").css("display","none");
		// ��֤�����������ó�0
		jQuery("#INVALIDATE_T_H").val("0");
		
		// ��ť���
		changeButtonGray();	
	    
	    
	}
	
	// �����ͺŰٳ�ֵ�Զ����ӿڲ�ѯ���жϸú����Ƿ���Գ�ֵ
	function getPaymentBalanceForAgent(payType){
		var cityCode = jQuery("#PAYCITYCODE").val();
		var prodNum = jQuery("#PHONENUM").val();
		var prodId = jQuery("#ORDERTYPE").val();
	 // (ר������)�����������ֵ
	 	var selectType = jQuery("#ORDERTYPE").val();
		var data={ method:'getPaymentBalance',prodNum: prodNum, prodId: prodId , cityCode: cityCode, orderType: payType, isonline: "1"} ;
		if(payType == "1")jQuery("#bankPass").val("");  
		if(payType == "4")jQuery("#bestPass").val(""); 
		var path = "/PayAjaxServlet.do";
		 var result = "";
		 jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
			async : false,
	  		data : data,
	  		timeout : 30000,
	  		success : function(json) 
	  		{
			  	var resultCode = json.RESULTCODE;
			  	var resultMsg = json.RESULTMSG;		  		
			  	if(payType == "1"){// ����֧��
			  		if(resultCode == "0"){
			  			jQuery("#bankPass").val("true");
			  		}	
					jQuery("#bankResultMsg").val(resultMsg);
			  	}else if(payType == "4"){// �Ű�֧��
			  		if(resultCode == "0"){
			  		 	jQuery("#bestPass").val("true");
			  		}
					jQuery("#bestResultMsg").val(resultMsg);
			  	}
			  	getErrorMsg();
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
		return "";	
	}
	
	// �жϵ����ۿ��Ƿ���Գ�ֵ
	function getPaymentBalanceForAgentDZK(payType){
		var cityCode = jQuery("#PAYCITYCODE").val();
		var prodNum = jQuery("#PHONENUM").val();
		var prodId = jQuery("#ORDERTYPE").val();
		var data={ method:'getMdsespecid',objectNum: prodNum, objectType: prodId , cityCode: cityCode} ;
		if(payType == "1")jQuery("#bankPass").val("");  
		if(payType == "4")jQuery("#bestPass").val(""); 
		var path = "/PayAjaxServlet.do";
		var result = "";
		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
			async : false,
	  		data : data,
	  		timeout : 30000,
	  		success : function(json) 
	  		{
		  	var resultCode = json.RESULTCODE;
		  	var resultMsg = json.RESULTMSG;		  		
		  	
		  	if(payType == "1"){// ����֧��
		  		if(resultCode == "0"){
		  			jQuery("#bankPass").val("true");
		  		}		  	
		  		jQuery("#bankResultMsg").val(resultMsg);
		  	}else if(payType == "4"){// �Ű�֧��
		  		if(resultCode == "0"){
					jQuery("#bestPass").val("true");
		  		}
		  		jQuery("#bestResultMsg").val(resultMsg);	  		
		  	} 
		  	getErrorMsg();
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
		return "";
	}
	/**
	 * ******************************************* ������Ԥ��[end]
	 * ***********************************************
	 */
	/** **************************************�����̳�ֵ����**************************************** */
	
	/**
	 * ����ϵͳ
	 */
	function votePage(ip,url,type){
		var data={ method:'votePage',ip: ip, url: url, type: type} ;
		var path = "/PayAjaxServlet.do";
		var result = "";
		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
			async : false,
	  		data : data,
	  		timeout : 30000,
	  		success : function(json) 
	  		{
			  	if(json==null){
		  		alert("ͶƱϵͳ�쳣�����Ժ�����!");	  	
		  	}else{
		  		var resultCode=	json.resultCode;
		  		if(resultCode=='-1'){
		  			alert("ͶƱϵͳ�쳣�����Ժ�����!");	  
		  		}else if(resultCode=='0'){
		  			alert("��������ͶƱ,��л����!");	  
		  		}else{
		  			var sumCount=json.sumCount;
		  			alert("��л���Ĳ���!");	
		  			if(type==1){
		  				jQuery("#PAY_PJ_G").html(sumCount);
		  			}else if(type==0){
		  				jQuery("#PAY_PJ_N").html(sumCount);
		  			}
		  		}
		  	}  
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
		return "";
	}
	
	/**
	 * �Ƽ��˵Ǽ�
	 * 
	 * @return
	 */
	function referrerRigist(orderNo,city, citycode, payDate, payType, phoneAuthorName, objectNum, amount, connectType ){
		var arr = [];
		arr.push("orderNo=");
		arr.push(orderNo);
		arr.push("&citycode=");
		arr.push(citycode);
		arr.push("&payDate=");
		arr.push(encodeURI(encodeURI(payDate)));
		arr.push("&payType=");
		arr.push(payType);
		arr.push("&amount=");
		arr.push(amount);
		arr.push("&objectNum=");
		arr.push(objectNum);
		arr.push("&connectType=");
		arr.push(connectType);
		arr.push("&city=");
		arr.push(encodeURI(encodeURI(city)));
		arr.push("&phoneAuthorName=");
		arr.push(encodeURI(encodeURI(phoneAuthorName)));
		
		var prarams = arr.join("");
		var srcUrl = "<iframe src=\"/service/pay/bestpay/fr_index.jsp?"+prarams+"\" allowtransparency=\"true\" id=\"\" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"351px\">";
		var referrerRigistFrame = jQuery('#referrerRigistFrame').html();		
		jQuery('#referrerRigistFrame').data("html",referrerRigistFrame);		
		jQuery('#referrerRigistFrame').html("");		
		jQuery.layerSetup({ 
						 id:"referrerRigistDiv",
						 width:451, 
						 height:351,
						 content:srcUrl, 
						 isbg:true,
						 opacity:0.1,
						 templete:'<div style="width: 600px;*width:600px; height:355px;" id="@contentid@"></div>'
						}); 
		jQuery.layershow(); 
		jQuery.layerclose=layerClose20198Pay;
		jQuery(window).scrollTop(0);
		jQuery(document.body).get(0).scroll="yes";
	}
	
	function getErrorMsg(){
		jQuery.ajax( {
				url : '/ajaxServlet/getErrMsg',
				type : 'POST',
				dataType : 'json',
				cache : false,
				async : true,
				data : ( {
					method:'getErrMsg'
				}),
				timeout : 30000,
				success : function(json) 
				{
					if(json.errCode){
						alert("��Ǹ��ϵͳæ�����Ժ����ԣ�"+json.errCode+"��");
					}
					
				},
			error : function() 
			{
			}
			});	 
		
	}
	
	function getAgentLower(phoneNum,cityCode,productid,callBack){
		var path = "/PayAjaxServlet.do";
		var result = "";
		var random = Math.random();
		jQuery.ajax( {
	  		url : path,
	  		type : 'POST',
	  		dataType : 'json',
	  		cache : false,
	  		async : false,
	  		data : ( {
	  			method:'getAgentLower',
	  			OBJECTNUM:phoneNum,
	  			CITYCODE:cityCode,
	  			OBJECTTYPE:productid
	  		}),
	  		timeout : 30000,
	  		success : function(json) 
	  		{
				callBack(json);
	  		},
			error : function() 
			{
		   		alert('������ʱ�����Ժ����ԣ���');
			}
	  	});
	}
	
	function changePayBank(){
		jQuery("#bankdj").hide();
		jQuery("#bankhf").hide();
		jQuery("#lastbankhf").hide();
		jQuery("#lastbankdj").hide();
		//���ѡ������
		jQuery("input[name='bankid']").removeAttr("checked"); 
		var type=jQuery("#ORDERTYPE").val();
		if(type=="10"){
			jQuery("#bankdj").show();
			jQuery("#lastbankdj").show();
		}else{		
			jQuery("#bankhf").show();
			jQuery("#lastbankhf").show();
	    }
	    checkFormEmpty();
			
	}
	function bankinit(){
		jQuery(document).find('input[name="changePayBank"]').click(function(){
			changePayBank();
		 });
	}

	
	/**
	 * ��ѯ����֧�ֳ�ֵ����
	 * @return
	 */
	function querypaytype(){
	    jQuery("#yzfview").hide();
		jQuery('input[name="changePayBank"][value=1]').attr("checked","checked");
		showhfview();
	}
	function querypaytypeold(){
		var path = "/PayAjaxServlet.do";
	 	var orderType = jQuery("#ORDERTYPE").val();
	 	var cityCode = jQuery("#PAYCITYCODE").val();
	 	var phoneNum = jQuery("#PHONENUM").val(); 	
	 	if(orderType == "50"){// ��֧���˻���ѯ���
	 		jQuery.ajax( {
		  		url : path,
		  		type : 'POST',
		  		dataType : 'json',
		  		cache : false,
		  		data : ( {
		  			method:'isopenyzfdj',
		  			PHONENUM:phoneNum,
		  			ORDERTYPE:orderType,
		  			CITYCODE:cityCode
		  		}),
		  		timeout : 30000,
		  		success : function(json) 
		  		{
		 			var result = json.CODE;	
		 			/*
		 			*/
		 			//result="1";
		 			jQuery("#isyzfdj").val(result);
		 			if(result=="1"){
		 				jQuery("#yzfview").hide();
		 				jQuery('input[name="changePayBank"][value=2]').attr("checked","checked");
		 				showdjview();
		 				
		 				
		 			}else if(result=="0"){
		 				jQuery("#yzfview").hide();
		 				jQuery('input[name="changePayBank"][value=1]').attr("checked","checked");
		 				showhfview();
		 			}else{
		 				jQuery('input[name="changePayBank"][value=1]').attr("checked","checked");
		 				showoldview();
		 			}

		  		},
				error : function() 
				{
		  			alert('������ʱ�����Ժ����ԣ���');
				}
		  	});
	 	}
	}
	
	function payfh(){
		jQuery('input[name="changePayBank"][value=1]').attr("checked","checked");
		changePayBank();
	}
	function paydj(){
		jQuery('input[name="changePayBank"][value=2]').attr("checked","checked");
		changePayBank();
	}
	/**
	 * ��ֵ����֧���˻�
	 * @return
	 */
	function showdjview(){
		
		jQuery("#bankdj").show();
		jQuery("#lastbankdj").show();
		jQuery("#bankmsg").show();

		jQuery("#otherBank").hide();
		jQuery("#bankhf").hide();
		jQuery("#lastbankhf").hide();

		jQuery("#yzfhfspan").removeClass().addClass("yzfdj-default");
		jQuery("#yzfdjspan").removeClass().addClass("yzfdj-btn-click");
		jQuery("#rechargeDiv").hide();
		jQuery("#rechargeMethod1").hide();
		if(jQuery("#woaicss_con2").css("display")!="none"){
			jQuery("#woaicss_con2").hide();
		}
		if(jQuery("#woaicss_con4").css("display")!="none"){
			jQuery("#woaicss_con4").hide();
		}
	}
	/**
	 * ��ֵ������
	 * @return
	 */
	function showhfview(){

		jQuery("#yzfdjspan").removeClass().addClass("yzfdj-default");
		jQuery("#yzfhfspan").removeClass().addClass("yzfdj-btn-click");
		jQuery("#bankdj").hide();
		jQuery("#lastbankdj").hide();
		jQuery("#otherBank").hide();
		
	
		jQuery("#bankhf").show();
		jQuery("#lastbankhf").show();
		jQuery("#bankmsg").show();
		if(jQuery("#rechargeDiv").css("display")=="none"){
			jQuery("#rechargeDiv").show();
		}
		if(jQuery("#rechargeMethod1").css("display")=="none"){
			jQuery("#rechargeMethod1").show();
		}
	}
	/**
	 * ��ֵ������(�̻������)
	 * @return
	 */
	function showoldview(){

		jQuery("#bankdj").hide();
		jQuery("#lastbankdj").hide();
		jQuery("#bankmsg").hide();
		jQuery("#yzfview").hide();
		
		jQuery("#otherBank").hide();
		jQuery("#bankhf").show();
		jQuery("#lastbankhf").show();
		jQuery("#bankmsg").show();
	}
	
	/**
	 * ��ʼ��
	 * @return
	 */
	function initbankview(){
		//jQuery("#bankhf").hide();
		jQuery("#lastbankdj").hide();
		jQuery("#bankmsg").hide();

		jQuery("#otherBank").hide();
		//jQuery("#bankdj").hide();
		jQuery("#lastbankhf").hide();
		jQuery("#bankmsg").hide();
 
		jQuery("#li3m2").hide();
		
		//jQuery("#yzfview").hide();
		bankinit();
		//���ѡ������
		jQuery("input[name='bankid']").removeAttr("checked"); 
		//�Ƿ��ֻ������Ƿ�ͨ��ͨ����
		var type=jQuery("#ORDERTYPE").val();
		if(type=="50"){
			var phonenum=jQuery("#PHONENUM").val();
			if(phonenum.length==11){
				//��ѯ�Ƿ�ͨ��֧������
				if(jQuery("#phonenumlast").val()!=phonenum){
					querypaytype();
				}
			}else{
				jQuery("#yzfview").hide();
			}
		}else{
			//jQuery("#yzfview").hide();
		}
	}
	
	
