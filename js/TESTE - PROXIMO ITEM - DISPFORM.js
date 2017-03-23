<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js" type="text/javascript" ></script>
<script language="javascript" type="text/javascript">
$(document).ready(function(){
    var pageID = GetUrlKeyValue("ID", false);
    var listItems = new Array();
    // uncomment if you want to sort by itemID
    //var CamlQuery = '<Query><OrderBy><FieldRef Name="ID" /></OrderBy></Query>';
    var CamlViewFields = '<ViewFields><FieldRef Name="ID" /></ViewFields>';

    //Get all list item with the specified CAML query and put them into an array
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "NOME DA LISTA",
        CAMLViewFields: CamlViewFields,
        //CAMLQuery: CamlQuery,
        completefunc: function (xData, Status) {
          $(xData.responseXML).SPFilterNode("z:row").each(function() {
                var itemID = $(this).attr("ows_ID");
                listItems.push(itemID);
          });
        }
    }); 

    var arr = listItems;        
    var current = arr.indexOf(pageID) + 1; 

    //Get the current URL
    var currentUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;

    // Loop through the array with itemID's and add the index to the URL
    for (i = current; (i < (current + 1)) && (i < arr.length); i++) {
        //Concatenate the URL and the new pageID
        var html = currentUrl + "?ID=" + arr[i];
    }

    if (typeof html === 'undefined'){
        $('#next').hide();
    } else {
        $('input[name="next"]').click(function(){
            location.href = html;
            // Show a SharePoint-like notification 
            SP.UI.Notify.addNotification('Processing...', false);
        });
    }
});
</script>
<div class="nextButton">
    <input type="button" ID="next" name="next" value="next" />
</div>