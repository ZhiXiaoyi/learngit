
/*������ؼ����Զ���ʾЧ��*/
jQuery(document).ready(function(){   
	jQuery("#qs").autocomplete("/AutocompleteServlet.do",{ 
	
	    minChars: 1, 

	    width: 400, 
	    
	    // �����󼤻�autoComplete���ӳ�ʱ��(��λ����)
	    delay: 400,

	    matchContains: true, 

	    autoFill: false, 
	    
	    // ���û�����tab��return��ʱautoComplete�����б�ĵ�һ��ֵ�����Զ�ѡ��,������û���ֹ�ѡ��(�ü��̻����),Ĭ��Ϊtrue
	    selectFirst:false,
	    
	    // ����Ĭ�ϸ߶Ⱥ��Ƿ����Ƿ��й�����
	    scroll:false,
	    
	    multipleSeparator: ' ',
	    
	    // �������Ϊtrue,autoCompleteֻ������ƥ��Ľ�������������,���û�������ǷǷ��ַ�ʱ����ò���������
	    mustMatch:false,
	    
	    // dataType:'json',//������������
	    
	    parse:function(data){
	         var rows=[];
	         var jsonObject = eval("("+data+")"); 
	         
	         for(var i=0;i<jsonObject.length;i++){

	              //һ��Ҫ�����¸�ʽ��������

	              rows[rows.length]={

	                  data:jsonObject[i],

	                  value:jsonObject[i].keyname,//ֵ

	                  result:jsonObject[i].keyname  //���ؽ����ʾ����

	             };
	             

	          }

	          return rows;

	     },
	     formatItem:function(row, i, n) { 
	          return "<div>" +row.keyname+ "<div>";     

	     }  
	// ѡ��ĳһ��󴥷��ύ�¼�
	}).result(function(event, item) {
		   document.forms[0].submit();
	});


});

// <!--��Ҫ���ʡ���Ҫ�ش��Լ�ͷ��������ת��ʼ-->
function toAsk(path){
		var title =  encodeURIComponent(encodeURIComponent(document.getElementById("qs").value));
		if(title != null && title != ""){
			window.location.href = path + "/10000zhidao/aiwen/addQuestion.jsp?title="+title;
		}else{
			window.location.href = path + "/10000zhidao/aiwen/addQuestion.jsp";
		}
	
	}
	function toAnswer(path){
		var title = encodeURIComponent(encodeURIComponent(document.getElementById("qs").value));
		if(title != null && title != ""){
			window.location.href = path + "/10000zhidao/searchaiwen.jsp?qs="+title+"&qastate=I";
		}else{
			window.location.href = path + "/10000zhidao/searchaiwen.jsp?qastate=I";
		}
			
	} 
	
	function toDump(path,purvICode){
		var title = encodeURIComponent(encodeURIComponent(document.getElementById("qs").value));
		if(title != null && title != ""){
			window.location.href = path+"?qs="+title+"&purvICode="+purvICode;
		}else{
			window.location.href = path;
		}
	}
	
	function toDump2(path,purvICode){
		var title = encodeURIComponent(encodeURIComponent(document.getElementById("qs").value));
		if(title != null && title != ""){
			window.location.href = path+"&qs="+title+"&purvICode="+purvICode;
		}else{
			window.location.href = path;
		}
	}
	// <!--��Ҫ���ʡ���Ҫ�ش��Լ�ͷ��������ת����-->