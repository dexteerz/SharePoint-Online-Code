<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>

<script language="javascript" type="text/javascript">
//
/*	~~ TECNO CENTER: bTEIXEIRA ~~*/
//

/*
>>	Changing the LISTFIELD Field to the Correct Field Name
>>	For required fields add "Requered Field" or "Campo Obrigatório" 
	-> Ex.: $("input[title=LISTFIELD Campo Obrigatório]").keyup(function() {
*/

        $(document).ready(function(){
                $("input[title=LISTFIELD]").keyup(function() {
                        $(this).val($(this).val().toUpperCase());
                });
        });

        /* ADD NEW UPPERCASE */
        /* 
                ->
                $(document).ready(function(){
                       $("input[title=LISTFIELD]").keyup(function() {
                               $(this).val($(this).val().toUpperCase());
                        });
                });
        */
</script>