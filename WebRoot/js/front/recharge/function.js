/*����������������ǩ begin*/
function selectTag(showContent,selfObj){
	// ������ǩ
	var tag = document.getElementById("tags").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	// ��������
	for(i=0; j=document.getElementById("tagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}
function commonselectTag(showContent,selfObj){
	// ������ǩ
	var tag = document.getElementById("commontags").getElementsByTagName("a");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "ykcz_top";
	selfObj.className = "ykcz_top_a";
	// ��������
	for(i=0; j=document.getElementById("commontagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}
function customselectTag(showContent,selfObj){
	// ������ǩ
	var tag = document.getElementById("customtags").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	// ��������
	for(i=0; j=document.getElementById("customtagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
	
}
function selectTag1(showContent,selfObj){
	// ������ǩ
	var tag = document.getElementById("tags1").getElementsByTagName("li");
	var taglength = tag.length;
	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	// ��������
	for(i=0; j=document.getElementById("tagsContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
	
}
/*����������������ǩ end*/


/*��ʾ/����ͼ�� begin*/
function toggle(targetid,objN){
   
      var  target=document.getElementById(targetid);
      var aa=document.getElementById(objN)
  
            if (target.style.display=="block"){
                target.style.display="none";  
  
            } else {
                target.style.display="block";
            }
   
}
/*��ʾ/����ͼ�� end*/

/*tabѡ��˵�*/
function  secBoard(n)
{
for(i=0;i<secTable.cells.length;i++)
secTable.cells[i].className="sec1";
secTable.cells[n].className="sec2";
for(i=0;i<mainTable.tBodies.length;i++)
mainTable.tBodies[i].style.display="none";
mainTable.tBodies[n].style.display="block";
}
/*tabѡ��˵�*/