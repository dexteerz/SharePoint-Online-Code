<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>
<script language="javascript" type="text/javascript">
/* 
	~~ TECNO CENTER: bTEIXEIRA ~~

>>	Onde possui CAMPO, remover e por o nome exato do campo da Lista
>>	Para campos obrigatórios adicionar "Campo Obrigatório" 
	-> Ex.: $("input[title=CAMPO Campo Obrigatório]").keyup(function() {
>>	Caso possua mais de um campo a qual deseja aplicar o UpperCase, basta copiar o comando todo e alterar o nome do CAMPO
	-> Ex.:
		$(document).ready(function(){
        $("input[title=TESTE]").keyup(function() {
        $(this).val($(this).val().toUpperCase());
        });
        });
*/

$(document).ready(function(){
        $("input[title=CAMPO]").keyup(function() {
        $(this).val($(this).val().toUpperCase());
        });
        });

</script>