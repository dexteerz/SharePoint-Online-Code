<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>

<script language="javascript" type="text/javascript">
//
/*  ~~ TECNO CENTER: bTEIXEIRA ~~*/
//
 
    function PreSaveAction(){
     
        var emailBox = getFieldControl('Email','Text');
        if (!validateEmail(emailBox.val())) {
            var errorHtml = '<span class="ms-formvalidation"><span role="alert">Invalid email address<br></span></span>';
            emailBox.after(errorHtml);
            return false;
        }
        return true;
    }
     
    function getFieldControl(fieldName,fieldType)
    {
        var control = $('[id^=' + fieldName + '_][id$=' + fieldType + 'Field]');
        return control;
    }
</script>