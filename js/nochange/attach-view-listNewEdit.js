
<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript"></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>

<script language="javascript" type="text/javascript">

//
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */ 
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

    ITSP.SP.AttachmentField.ListViewTemplate = function(ctx) {
        var schemaName = ctx.CurrentFieldSchema.Name;
        var fieldRender = new AttachmentFieldRenderer(schemaName);
        var fieldRenderedHtml = "";
        var attachmentRenderedHtml = fieldRender.RenderField(ctx, ctx.CurrentFieldSchema, ctx.CurrentItem, ctx.ListSchema);

        if (ctx.CurrentItem.Attachments != undefined) {
            var hasAttachments = ctx.CurrentItem.Attachments;
            if (hasAttachments) {
                var spanElementId = "attachmentField_ListItem_Span_" + ctx.CurrentItem.ID;
            }

        }

        return fieldRenderedHtml;
    }

    ITSP.SP.AttachmentField.ShowAttachmentInformation = function(ctx, currentItemId, spanElementId) {
        this.currentItemId = currentItemId;
        this.listName = ctx.ListTitle;
        this.spanElementId = spanElementId;''
                for (i = 0; i < attachmentCount; i++) {
                    var attachmentFile = this.currentListItemAttachments.getItemAtIndex(i);
                    var attachmentFilePath = attachmentFile.get_serverRelativeUrl();

                    attachmentContentHtml = attachmentContentHtml + "<li><a href='" + attachmentFilePath + "' target='_new'>" + attachmentFile.get_fileName() + "</a></li>";
                }
            }
            var link = document.getElementById(this.spanElementId);
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
        attachmentFieldContext.Templates = {};
        attachmentFieldContext.Templates.Fields = {
            "Attachments": {
                "View": ITSP.SP.AttachmentField.ListViewTemplate
            }
        };

        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(attachmentFieldContext);
    })();

</script>