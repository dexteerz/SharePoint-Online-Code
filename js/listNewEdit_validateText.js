<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>

<script language="javascript" type="text/javascript">
//
/*  ~~ TECNO CENTER: bTEIXEIRA ~~*/
//

    function isLetter(val) { 
        var re = /^[a-zA-Z]+$/;
        return re.test(val);
    } 

    function PreSaveAction(){

        var commentsBox = findFieldControl('CPF');  //find field control by title
        if (!isLetter(commentsBox.avl())) {
            var errorHtml = '<br/><span class="ms-formvalidation"><span role="alert">Apenas letras<br></span></span>';
            commentsBox.after(errorHtml);
            return false;
        }
        return true;
    }

    function findFieldControl(fieldTitle)
    {
        var control = $('[title="' + fieldTitle + '"]');
        return control;
    }
</script>