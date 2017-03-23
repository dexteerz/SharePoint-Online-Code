
<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>
<script language="javascript" type="text/javascript">

//
// ~~~~~ * PRODUZIDO POR BRENO TEIXEIRA * ~~~~~
//

if (typeof (ITSP) == 'undefined') {
    Type.registerNamespace('ITSP');
}

if (typeof (ITSP.SP) == 'undefined') {
    Type.registerNamespace('ITSP.SP');
}

if (typeof (ITSP.SP.AttachmentField) == 'undefined') {
    Type.registerNamespace('ITSP.SP.AttachmentField');
}

// função de link do icone de Anexo
ITSP.SP.AttachmentField.ListViewTemplate = function(ctx) {
    var schemaName = ctx.CurrentFieldSchema.Name;
    var fieldRender = new AttachmentFieldRenderer(schemaName);
    var fieldRenderedHtml = "";
    var attachmentRenderedHtml = fieldRender.RenderField(ctx, ctx.CurrentFieldSchema, ctx.CurrentItem, ctx.ListSchema);

    if (ctx.CurrentItem.Attachments != undefined) {
        var hasAttachments = ctx.CurrentItem.Attachments;
        if (hasAttachments) {
            // texto de exibição ao passar o mouse em cima do icone
            var spanElementId = "attachmentField_ListItem_Span_" + ctx.CurrentItem.ID;
            fieldRenderedHtml = "<div title='Visualizar Anexo(s)' id='" + spanElementId + "' style='cursor:pointer;' class='link-set' onclick='javascript:ITSP.SP.AttachmentField.ShowAttachmentInformation(ctx," + ctx.CurrentItem.ID + ", \"" + spanElementId + "\");'>" + attachmentRenderedHtml + "</div>";
        }

    }

    return fieldRenderedHtml;
}

// painel de visualização dos Anexos
ITSP.SP.AttachmentField.ShowAttachmentInformation = function(ctx, currentItemId, spanElementId) {
    this.currentItemId = currentItemId;
    this.listName = ctx.ListTitle;
    this.spanElementId = spanElementId;''

    //alert(this.listName);

    this.context = new SP.ClientContext.get_current();
    this.currentSite = this.context.get_site();
    this.currentWeb = this.context.get_web();
    this.currentList = this.context.get_web().get_lists().getByTitle(this.listName);
    this.currentListItem = this.context.get_web().get_lists().getByTitle(this.listName).getItemById(currentItemId);
    this.currentListItemAttachments = this.currentListItem.get_attachmentFiles();
    this.delegateQueue = [];
    this.asyncMessage = null;
    this.ready = false;
    this.attachmentCallout = null;

    this.context.load(this.currentSite);
    this.context.load(this.currentWeb, 'Title', 'Description');
    this.context.load(this.currentList);
    this.context.load(this.currentListItem, 'Title', 'DisplayName');
    this.context.load(this.currentListItemAttachments);

    this.webLoadSuccess = function(sender, args) {
        this.ready = true;
        this.asyncMessage = "success";
        //alert("Carregando Painel de Anexos");

        var attachmentCount = this.currentListItemAttachments.get_count();
        var attachmentContentHtml = "";
        if (attachmentCount > 0) { //executa função de contagem de anexo
            for (i = 0; i < attachmentCount; i++) {
                var attachmentFile = this.currentListItemAttachments.getItemAtIndex(i);
                var attachmentFilePath = attachmentFile.get_serverRelativeUrl();

                attachmentContentHtml = attachmentContentHtml + "<li><a href='" + attachmentFilePath + "' target='_new'>" + attachmentFile.get_fileName() + "</a></li>";
            }
        }
        // exibe a texto com quantidade de anexos
        var link = document.getElementById(this.spanElementId);
        var calloutContent = "<p>Possui " + attachmentCount + " Anexo(s) nesse item.</p> <p><ul>" + attachmentContentHtml + "</ul></p>";
        var calloutId=this.currentItemId + "attachmentCallout";
        var calloutTitle = "Item: " + this.currentListItem.get_displayName();


        SP.SOD.executeFunc("callout.js", "Callout", function() {
            ITSP.SP.AttachmentField.openCallout(calloutId, link, calloutContent, calloutTitle);
        });
    


    };

    this.asyncCallFailed = function(sender, args) {
        this.ready = true;
        this.asyncMessage = args.get_message() + " " + args.get_stackTrace();
        alert("asynccallfailed " + this.asyncMessage);
    };

    this.context.executeQueryAsync(
        Function.createDelegate(this, this.webLoadSuccess),
        Function.createDelegate(this, this.asyncCallFailed)
    );

    this.openCallout = function(id, launchPoint, content, title) {
        var calloutOptions = new CalloutOptions();
        calloutOptions.ID = id;
        calloutOptions.launchPoint = launchPoint;
        calloutOptions.beakOrientation = "leftRight";
        calloutOptions.content = content;
        calloutOptions.title = title;
        this.attachmentCallout = CalloutManager.createNewIfNecessary(calloutOptions);
        this.attachmentCallout.open();
    };

    this.isReady = function() {
        return this.ready;
    }

    this.getAttachments = function() {
        return this.currentListItemAttachments;
    }
};

(function() {
    var attachmentFieldContext = {};
    // Carrega o template do Sharepoint:
    // View, DisplayForm, EditForm e NewForm
    attachmentFieldContext.Templates = {};
    attachmentFieldContext.Templates.Fields = {
        "Attachments": {
            "View": ITSP.SP.AttachmentField.ListViewTemplate
        }
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(attachmentFieldContext);
})();

</script>