<script language="javascript" type="text/javascript">
//
/* ~~TECNO CENTER: bTEIXEIRA ~~ */
//

    var zimmergrenSample = zimmergrenSample || {};

    zimmergrenSample.CustomizeFieldRendering = function (){
        var fieldJsLinkOverride = {};
        fieldJsLinkOverride.Templates = {};
     
        fieldJsLinkOverride.Templates.Fields =
        {
            /*
                >> Change field name, highlighted in single quotation marks
                >> Ex.: LISTFIELD pelo campo que será o icone
            */
            'LISTFIELD': { 'View': zimmergrenSample.GetPriorityFieldIcon }
        };
     
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldJsLinkOverride);
    };
     

    zimmergrenSample.GetPriorityFieldIcon = function (ctx) {
    	// >> Change the return variable of the LISTFIELD function to the same previously modified name
    	// >> Ex.: var icon = ctx.CurrentItem.Prioridade;
        var icon = ctx.CurrentItem.LISTFIELD;
     
        
     
        if (icon.indexOf("VALUE1") != -1) {
    	/* O "return" abaixo faz com que o campo todo seja preenchido com COR */
            return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>";
    	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM */
            //return "<center><img src='/URL'</center>";
        }
        if (icon.indexOf("VALUE2") != -1) {
    	/* O "return" abaixo faz com que o campo todo seja preenchido com COR */
            return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>";
    	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM */
            //return "<center><img src='/URL'</center>";
        }
        if (icon.indexOf("VALU3") != -1) {
    	/* O "return" abaixo faz com que o campo todo seja preenchido com COR */
            return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>";
    	/* O "return" abaixo faz com que o campo todo seja preenchido com IMAGEM */
            // return "<center><img src='/SiteAssets/ICONE-VERDE3.png'</center>";
        }

        /*
    	To add another situation, that is, another icon, just copy the code above
    		-> Ex.:
    			    if (icon.indexOf("VALUEX") != -1) {
                        return "<div style='background-color: #FFB5B5; width: 100%; display: block; border: 2px solid #DE0000; padding-left: 2px;'> </div>";
                        return "<center><img src='URL'</center>";
        			}
        			
        */

        /*  >>Change the return variable of the LISTFIELD function to the same previously modified name
            >> Ex.: var icon = ctx.CurrentItem.LISTFIELD; */
        return ctx.CurrentItem.LISTFIELD;
    };
     
    zimmergrenSample.CustomizeFieldRendering();
</script>