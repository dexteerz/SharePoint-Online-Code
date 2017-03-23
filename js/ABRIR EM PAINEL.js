<script type="text/javascript">
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */
function openDialog() { 

	var options = { 
		url: "***URL***", // MODIFICAR O VALOR ENTRE PARENTESES PARA A URL DA LISTA
		width: ***LARGURA SEM PX***, // LARGURA SEM ASPAS E SEM PX
		height: ***TAMANHO SEM PX***, // TAMANHO SEM ASPAS E SEM PX
		title: "***NOME DO PAINEL***", // NOME DO PAINEL DE EXIBIÇÃO
	}; 
SP.UI.ModalDialog.showModalDialog(options); 
} 
</script>

<input type="button" value="***NOME DO BOTÃO***" onclick="javascript:openDialog()"/>