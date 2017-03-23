<script type="text/javascript"  language="javascript">
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */ 
function PreSaveAction() {
	var elm = document.getElementById("idAttachmentsTable");
	if (elm == null || elm.rows.length == 0){
		document.getElementById("idAttachmentsRow").style.display='none';
		alert("ANEXO OBRIGATÓRIO, INSIRA O ARQUIVO");
		return false ;
	} else { 
		return true ;
	}
}
</script> 