<input name="btnSelectAll" onclick="javascript:SelectAll()" type="button" value="Select All"/>
<input name="btnShowRibbon" onclick="javascript:showItemTab()" type="button" value="Show Ribbon"/>
<input name="btnDeselectAll" onclick="javascript:DeselectAll()" type="button" value="Deselect All"/>
<input name="btnApprove" onclick="javascript:Approve()" type="button" value="Set Approve"/>

<script type="text/javascript">
//
/* ~~ TECNO CENTER: bTEIXEIRA ~~ */ 
//

function SelectAll() {
  DeselectAll();
  for(var i=0;i<ctx.ListData.Row.length;i++) {
    SelectRowByIndex(ctx,i,true);
  }
}

function DeselectAll() {
  var clvp = ctx.clvp;
  var tab = clvp.tab;
  DeselectAllItems(ctx,tab.rows,false);
}

function showItemTab() {
 ribbon = SP.Ribbon.PageManager.get_instance().get_ribbon();
 SelectRibbonTab("Ribbon.ListItem",true);
}

function Approve() {
  if(confirm('cofirmation message')) {
    var context = new SP.ClientContext.get_current();
    var selectedItems = SP.ListOperation.Selection.getSelectedItems(context);
    var list = context.get_web().get_lists().getByTitle("Test Approve Items");
    var item;
    for (item in selectedItems) {
      var listitem = list.getItemById(selectedItems[item].id);
      context.load(listitem,"Status");

      if(listitem!="") {
        listitem.set_item("Status","Approve");
        listitem.update();
      }
    }
    context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
  }
}

function onQuerySucceeded() {
  console.log("Itemoved");
}

function onQueryFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

</script>