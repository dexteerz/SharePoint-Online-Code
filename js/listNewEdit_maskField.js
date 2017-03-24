<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>

<script language="javascript" type="text/javascript">

//
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */
//

	jQuery(function($){
	/* 
	>>	ADD SCRIPT INTO A WEBPART WITHIN FORM OF NEW OR EDIT
	>>	Change Field Name in Title='FIELDNAME'
	>>	For required fields add "Required field"[EN/...] or "Campo Obrigatório"[para PT/BR]
		-> Ex.: $("input[title='CEP Required field']").mask("^^.^^^-^^^",{placeholder:"_"});
	*/
	/* REMOVE COMMENT MARKINGS TO ENABLE MASK (//) */
		$.mask.definitions["9"] = null;
		$.mask.definitions["^"] = "[0-9]";
		/* PHONE */
		//$("input[title='FIELDNAME']").mask("(^^) ^^^^-^^^^",{placeholder:"_"});

		/* TELEPHONE WITH CODE 9 IN FRONT */
		//$("input[title='FIELDNAME']").mask("(^^) 9^^^^-^^^^",{placeholder:"_"});
		
		/* CPF */
		//$("input[title='FIELDNAME']").mask("^^^.^^^.^^^-^^",{placeholder:"_"});
		
		/* CNPJ */
		//$("input[title='FIELDNAME']").mask("^^^.^^^.^^^/^^^^-^^",{placeholder:"_"});
		
		/* CEP */
		//$("input[title='FIELDNAME']").mask("^^.^^^-^^^",{placeholder:"_"});
		
		// DATE
		$("input[title='FIELDNAME']").mask("^^/^^/^^^^",{placeholder:"_"});
	});

</script>