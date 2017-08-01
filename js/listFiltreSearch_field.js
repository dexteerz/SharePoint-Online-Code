<script type="text/javascript" src="/Style%20Library/js/MicrosoftAjax.js"></script>
<script type="text/javascript" src="/Style%20Library/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>

<script type="text/javascript">

    $(document).ready(function() {
        var $atividadePrograma = $("[title='Atividade Campo Obrigatório']");
        //Remove itens de uma caixa de seleção (Dropdonwlist)
        $atividadePrograma.children().each(function( index ) {
            $( this ).remove();
        });
      
        retrieveListItems(_spPageContextInfo.webAbsoluteUrl, $atividadePrograma);

        var $programa = $("[title='Programa Campo Obrigatório']");
        
        $programa.change(function(){
            retrieveListItems(_spPageContextInfo.webAbsoluteUrl, $atividadePrograma);
        });
    });

</script>

<script type="text/javascript">

    function retrieveListItems(siteUrl, atividadePrograma) {
        
        atividadePrograma.children().each(function( index ) {
            $( this ).remove();
        });
        
        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle('PROTOCOLO - Atividade');
            
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' + 
            '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' + 
            '</View>'
        );
        this.collListItem = oList.getItems(camlQuery);
            
        clientContext.load(collListItem);
        
        clientContext.executeQueryAsync(
            Function.createDelegate(this, this.onQuerySucceeded), 
            Function.createDelegate(this, this.onQueryFailed)
        ); 
    }

    function onQuerySucceeded(sender, args) {
        var listItemEnumerator = collListItem.getEnumerator();        
        var $programaSelecionada = $("[title='Programa Campo Obrigatório'] option:selected");
        var $atividadePrograma = $("[title='Atividade Campo Obrigatório']");

        while (listItemEnumerator.moveNext()) {
            
            var oListItem = listItemEnumerator.get_current();
           
            if(oListItem.get_item('Programa').get_lookupValue() == $programaSelecionada.text())
            {
                $atividadePrograma.append('<option value='+oListItem.get_id()+'>' + oListItem.get_item('Title') + '</option>');
            }
        }
    }

    function onQueryFailed(sender, args) {
        alert('Request failed. ' + args.get_message() + 
            '\n' + args.get_stackTrace());
    }

</script>