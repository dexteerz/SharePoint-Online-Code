
<script type="text/javascript"  language="javascript">
/* TOGETHER THE ANNEX OF A LIST OF COMPULSORY SHAREPOINT */
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */ 
function PreSaveAction() {
	var elm = document.getElementById("idAttachmentsTable");
	if (elm == null || elm.rows.length == 0){
		document.getElementById("idAttachmentsRow").style.display='none';
		alert("ALERT MESSAGE");
		return false ;
	} else { 
		return true ;
	}
}
</script> 