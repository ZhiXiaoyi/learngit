/* ���� */
//��������
jQuery(document).ready(function(){
    jQuery(".top_nav").hover(function(){
        jQuery(this).find(".top_nav_f").show();
          },function(){
              jQuery(this).find(".top_nav_f").hide();
              })
});

//��¼״̬�ж�
        jQuery.ajax({
            url:"/ajaxServlet/getCityCodeAndIsLogin",
       data: {"method":"getCityCodeAndIsLogin"},
       type:"post",
      success: function(data){
          if(data!=""){
                var dataObj=eval("("+data+")");
                var msg=dataObj.MSG;
                var islogin=dataObj.ISLOGIN;
                if(islogin=="true"){
                jQuery("#login").html(msg+"<a href=\"/service/manage/index.jsp?TYPE=ChangePwd\">���������</a>");  
				jQuery("#loginli").html("<a href=\"/common/v2011/exit.jsp\">���˳���</a>");
                jQuery("#mail").attr("href","https://uam.fj.ct10000.com/ffcs-uam/SSOToUDB?ReturnURL=http://mail.189.cn&ErrorReturnURL=http://mail.189.cn");
                if(dataObj.PRODUCTID=="50"){
                jQuery("#mail_link").append("<a id='newMail' target='_blank'><img src='/cms/up2/images/public/newemail.gif' id='nImg' style='border:0px;'/></a><div id='ecount' style='display:none;width: 100px;background-color: #FFFFCD;border:1px solid black;position: absolute;'></div>");
                jQuery("#newMail").attr("href","https://uam.fj.ct10000.com/ffcs-uam/SSOToUDB?ReturnURL=http://webmail.189.cn/webmail/UDBLogin?skey=3&TargetPage=mailRead&ErrorReturnURL=http://mail.189.cn");
                
                 }
                }
          }
        }
        
    });

/* ��¼״̬��ȡ189����δ������*/
    function showMailCount(){
     jQuery.ajax({
       url:"/ajaxServlet/getEmailCount",
       data: {"method":"getEmailCount"},
       type:"post",
      success: function(data){
          if(data!=""){
           var dataObj=eval("("+data+")");
           var code=dataObj.CODE;
           if(code=="0"){
               var newCount=dataObj.NEWCOUNT;
               if(newCount>0){
               jQuery("#nImg").hover(function(){
                   jQuery("#ecount").show();
                  jQuery("#ecount").html(newCount+"��δ��");
                  },function(){
                  jQuery("#ecount").html("");
                  jQuery("#ecount").hide();
                  });
              jQuery("#mail").hover(function(){
                  jQuery("#ecount").show();
                  jQuery("#ecount").html(newCount+"��δ��");
                  },function(){
                  jQuery("#ecount").hide();
                  jQuery("#ecount").html("");
                  });
               }
           }
          
          }
        }
     });
    }
/* LOGOģ�� */

jQuery(document).ready(function(){
   jQuery("#shengfen").hover(function(){
      jQuery(this).find("#shengfen_frame").show();
      },function(){
        jQuery(this).find("#shengfen_frame").hide();
        });
    jQuery("#dishi").hover(function(){
      jQuery(this).find("#dishi_frame").show();
      },function(){
        jQuery(this).find("#dishi_frame").hide();
        });
  jQuery(".ywjs_ny_content div").css({"font-size":"12px","line-height":"21px" });
  jQuery(".ywjs_ny_content p").css({"font-size":"12px","line-height":"21px" });
  jQuery(".ywjs_ny_content span").css({"font-size":"12px","line-height":"21px" });
  jQuery(".ywjs_ny_content b").css({"font-size":"12px","line-height":"21px" });
  jQuery.ajax({
    url:"/ajaxServlet/getCityCodeAndIsLogin",
       data: {"method":"getCityCodeAndIsLogin"},
       type:"post",
      success: function(data){
        if(data!=""){
          var dataObj=eval("("+data+")");
          var msg=dataObj.MSG;
          var islogin=dataObj.ISLOGIN;
          var citycode=dataObj.CITYCODE;
          var curCityName="";
          if(citycode=="0590" ||citycode==""){
            curCityName="����";
            //fuc_setcity('����','$contextpath','0591','');
          }
          else if(citycode=="0591") curCityName="����";
          else if(citycode=="0592") curCityName="����";
          else if(citycode=="0593") curCityName="����";
          else if(citycode=="0594") curCityName="����";
          else if(citycode=="0595") curCityName="Ȫ��";
          else if(citycode=="0596") curCityName="����";
          else if(citycode=="0597") curCityName="����";
          else if(citycode=="0598") curCityName="����";
          else if(citycode=="0599") curCityName="��ƽ";
      var citydl = "<dl id=\"dishi_frame\" style=\"display:none;\">"
          +"<dd><a onclick=\"fuc_setcity('����','$contextpath','0591','')\">����</a>"
          +"<a onclick=\"fuc_setcity('����','$contextpath','0592','')\">����</a>"
          +"<a onclick=\"fuc_setcity('����','$contextpath','0593','')\">����</a>"
          +"<a onclick=\"fuc_setcity('����','$contextpath','0594','')\">����</a>"
          +"<a onclick=\"fuc_setcity('Ȫ��','$contextpath','0595','')\">Ȫ��</a>"
          +"<a onclick=\"fuc_setcity('����','$contextpath','0596','')\">����</a>"
          +"</dd>"
          +"<dd><a onclick=\"fuc_setcity('����','$contextpath','0597','')\">����</a>"
          +"<a onclick=\"fuc_setcity('����','$contextpath','0598','')\">����</a>"
          +"<a onclick=\"fuc_setcity('��ƽ','$contextpath','0599','')\">��ƽ</a>"
          +"</dd>"
          +"</dl>";
          jQuery("#dishi").html(curCityName+citydl);
        }
      }
  });
  });
function getCurrCityName(citycode){
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


/**�����л�����*/
function fuc_setcity(cityName,path,citycode,servletPath,alias,cmsdir,cmsext){
  var citycode2 = citycode;
  var fj =  document.cookie.indexOf("fj");
  if(citycode2 == "0590")
    citycode2 = alias;
  if(citycode != document.getElementById("CITYCODE").value){
     var exitFlag = "false";
      jQuery.ajax({
            url:"/ajaxServlet/getCityCodeAndIsLogin",
               data: {"method":"getCityCodeAndIsLogin"},
               type:"post",
               async:false,
              success: function(data){
                if(data!=""){
                  var dataObj=eval("("+data+")");
                  var  islogin=dataObj.ISLOGIN;
                  var nowCityCode=dataObj.CITYCODE;
                  var nowCityName=getCurrCityName(nowCityCode);
                  if(islogin == "true"){
                    var is =window.confirm('���ѵ�¼����Ӫҵ����'+nowCityName+'������Ҫ�л����ڳ��У�ϵͳ���˳�����Ӫҵ����'+nowCityName+'����ȷ���˳���');
                    if(!is){
                        exitFlag = "true";
                    }
                }
                }
              }
          });

          if(exitFlag == "false") {
            jQuery.ajax({
              url:"/ajaxServlet/setCityCode",
                 data: {"method":"setCityCode","citycode":citycode},
                 type:"post",
                success: function(data){
                  if(data!="0"){
                  	if(citycode == '0591'){
						location.href = "http://189.cn/fj_fz/";
					}else if(citycode == '0592'){
						location.href = "http://189.cn/fj_xm/";
					}else if(citycode == '0593'){
						location.href = "http://189.cn/fj_nd/";
					}else if(citycode == '0594'){
						location.href = "http://189.cn/fj_pt/";
					}else if(citycode == '0595'){
						location.href = "http://189.cn/fj_qz/";
					}else if(citycode == '0596'){
						location.href = "http://189.cn/fj_zz/";
					}else if(citycode == '0597'){
						location.href = "http://189.cn/fj_ly/";
					}else if(citycode == '0598'){
						location.href = "http://189.cn/fj_sm/";
					}else if(citycode == '0599'){
						location.href = "http://189.cn/fj_np/";
					}else{
						location.href = "http://189.cn/fj";
					}
	  	              }
  	              }
            });
        }
      }  
  }
function searchfocus(){
  if(document.getElementById("qs").value == "������������Ʒ/�/�����"){
    document.getElementById("qs").value = "";
  }
}
function searchblur(){
  if(document.getElementById("qs").value == ""){
    document.getElementById("qs").value = "������������Ʒ/�/�����";
  }
}
function checkSearch() {
  if(document.getElementById("qs").value == "������������Ʒ/�/�����"){
    document.getElementById("qs").value = "";
  }
}