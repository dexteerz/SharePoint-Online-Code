<script language="javascript" type="text/javascript">
/* ~~TECNO CENTER: bTEIXEIRA ~~ */

var zimmergrenSample = zimmergrenSample || {};
 

zimmergrenSample.CustomizeFieldRendering = function ()
{
    var fieldJsLinkOverride = {};
    fieldJsLinkOverride.Templates = {};
 
    fieldJsLinkOverride.Templates.Fields =
    {
        // >> Alterar o nome do campo, a qual deseja substituir na lista
        // >> Ex.: CAMPOLISTA pelo campo que será o icone
        // >> Permanecer com as aspas simples (')
        'CAMPOLISTA': { 'View': zimmergrenSample.GetPriorityFieldIcon }
    };
 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldJsLinkOverride);
};
 

zimmergrenSample.GetPriorityFieldIcon = function (ctx) {
	// >> Alterar a variavel do retorno da função CAMPOLISTA pelo mesmo nome modificado anteriormente
	// >> Ex.: var icon = ctx.CurrentItem.Prioridade;
    var icon = ctx.CurrentItem.CAMPOLISTA;
 
    
 
    if (icon.indexOf("CINZA") != -1) {
	/* O "return" abaixo faz com que o campo todo seja preenchido com COR
        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>"; */
	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM
	 >> Alterar o URL da imagem, mantendo a estrutura do codigo */
        return "<center><img src='/SiteAssets/ICONE-CINZA3.png'</center>";
    }
    if (icon.indexOf("AZUL") != -1) {
	/* O "return" abaixo faz com que o campo todo seja preenchido com COR
        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>"; */
	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM
	 >> Alterar o URL da imagem, mantendo a estrutura do codigo */
        return "<center><img src='/SiteAssets/INCONE-AZUL.png'</center>";
    }
    if (icon.indexOf("VERDE") != -1) {
	/* O "return" abaixo faz com que o campo todo seja preenchido com COR
        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>"; */
	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM
	 >> Alterar o URL da imagem, mantendo a estrutura do codigo */
        return "<center><img src='/SiteAssets/ICONE-VERDE3.png'</center>";
    }
    if (icon.indexOf("VERMELHO") != -1) {
	/* O "return" abaixo faz com que o campo todo seja preenchido com COR
        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>"; */
	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM
	 >> Alterar o URL da imagem, mantendo a estrutura do codigo */
        return "<center><img src='/SiteAssets/ICONE-VERMELHO3.png'</center>";
    }
    if (icon.indexOf("AMARELO") != -1) {
	/* O "return" abaixo faz com que o campo todo seja preenchido com COR
        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>"; */
	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM
	 >> Alterar o URL da imagem, mantendo a estrutura do codigo */
        return "<center><img src='/SiteAssets/ICONE-AMARELO3.png'</center>";
    }

    /*
	Para adicionar outra situação, ou seja, outro icone, basta copiar o codigo acima
		-> Ex.:
			    if (icon.indexOf("VALORDOCAMPO") != -1) {
			    return "<center><img src='URL'</center>";
    			}
    			
    */
    // >> Alterar a variavel do retorno da função CAMPOLISTA pelo mesmo nome modificado anteriormente
	// >> Ex.: var icon = ctx.CurrentItem.Prioridade;
    return ctx.CurrentItem.CAMPOLISTA;
};
 

zimmergrenSample.CustomizeFieldRendering();



</script>