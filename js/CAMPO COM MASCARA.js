<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>
<script language="javascript" type="text/javascript">
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */
jQuery(function($){
/* 

>>	Onde possui CAMPO, remover e por o nome exato do campo da Lista
>>	Para campos obrigatórios adicionar "Campo Obrigatório" 
	-> Ex.: $("input[title='CEP Campo Obrigatório']").mask("^^.^^^-^^^",{placeholder:"_"});
>>	Caso não tenha mascara de algum dos tipos abaixo, basta remover a linha, caso possua mais de uma, basta copiar e alterar apenas o nome do CAMPO
*/

	$.mask.definitions["9"] = null;
	$.mask.definitions["^"] = "[0-9]";
	// TELEFONE
	$("input[title='CAMPO']").mask("(^^) ^^^^-^^^^",{placeholder:"_"});
	// TELEFONE COM DIGITO 9 NA FRENTE (PREDIFINIDO)
	$("input[title='CAMPO']").mask("(^^) 9^^^^-^^^^",{placeholder:"_"});
	// CPF
	$("input[title='CAMPO']").mask("^^^.^^^.^^^-^^",{placeholder:"_"});
	// CNPJ
	$("input[title='CAMPO']").mask("^^^.^^^.^^^/^^^^-^^",{placeholder:"_"});
	// CEP
	$("input[title='CAMPO']").mask("^^.^^^-^^^",{placeholder:"_"});
	// DATA
	$("input[title='CAMPO']").mask("^^/^^/^^^^",{placeholder:"_"});
});

</script>