function tr_onmouseover(){
	this.className='a3';
}
function tr_onmouseout_grey(){
	 this.className='a1';
}
function tr_onmouseout_white(){
 	this.className='a2';
}
function table_onload(tb){
	var i,
		tlist=document.getElementById(tb);
	tlist.style.textAlign = "left";
	for(i=0,len=tlist.rows.length; i<len; i++){
	  if(i&1){
		  tlist.rows[i].className="a1";
		  tlist.rows[i].onmouseout=tr_onmouseout_grey;
	  }
	  else{
		  tlist.rows[i].className="a2";
		  tlist.rows[i].onmouseout=tr_onmouseout_white;
	  }
		tlist.rows[i].onmouseover=tr_onmouseover;
	}
}

function table_onload1(tb){
	var i,
		tlist = document.getElementById(tb);
	tlist.style.textAlign = "left";
	for(i=0, len = tlist.rows.length; i<len; i++){
		if(!(i&1)){
			tlist.rows[i].className="a1";
		  	tlist.rows[i].onmouseout=tr_onmouseout_grey;
		}
		else{
			tlist.rows[i].className="a2";
		  	tlist.rows[i].onmouseout=tr_onmouseout_white;
		}
		tlist.rows[i].onmouseover=tr_onmouseover;
	}
}
