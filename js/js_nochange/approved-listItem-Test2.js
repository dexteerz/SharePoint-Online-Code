/* Approve or reject selected items
 * ---------------------------------------------
 * Created by Alexander Bautz
 * alexander.bautz@gmail.com
 * http://sharepointjavascript.wordpress.com
 * Copyright (c) 2012-2015 Alexander Bautz (Licensed under the MIT X11 License)
 * ---------------------------------------------
 * Include reference to:
 *  jquery - http://jquery.com
 * ---------------------------------------------
 * v2.0 - 18.05.2015
*/
 
/*
JSLint
var $, setTimeout, WpClick, setInterval, SP, document, clearTimeout, location, alert, ExecuteOrDelayUntilScriptLoaded;
*/

var spjs = spjs || {};

spjs.contentApproval = {
	"localize":function(){
		if(spjs.contentApproval.text === undefined){
			spjs.contentApproval.text = {
				"approveBtn":"Approve selected",
				"rejectBtn":"Reject selected",
				"groupLabel":"Approve or Reject",
				"working":"Processing items...",
				"done":"{0} items processed"
			};
		}
	},
	"data":{
		"notifyTimeout":0,
		"approvedOrRejectedCounter":0,
		"notifyId":""
	},
	"init":function(){
		spjs.contentApproval.localize();
		setTimeout(function(){
			var defaultWP = document.getElementById("MSOZoneCell_WebPartWPQ1");
			WpClick({target:defaultWP,srcElement:defaultWP});
		},100);	
		setInterval(function(){
			if($("#RibbonContainer_activeTabId").val()==='Ribbon.Document' || $("#RibbonContainer_activeTabId").val()==='Ribbon.ListItem'){
				spjs.contentApproval.btn();
			}
		},1000);
	},
	"btn":function(){
		if($("#ribbonApproveOrReject").length===0){		
			var b = [];
			b.push("<li id='ribbonApproveOrReject' class=ms-cui-group unselectable='on'>");
			b.push("<SPAN class='ms-cui-groupContainer' unselectable='on'>");
			b.push("<SPAN class='ms-cui-groupBody' unselectable='on'>");
			b.push("<SPAN class='ms-cui-layout' unselectable='on'>");
			b.push("<SPAN class=ms-cui-section unselectable='on'>");
			// Approve		
				b.push("<SPAN class=ms-cui-row-onerow unselectable='on'>");
				b.push("<A id='approveAllButton' class='ms-cui-ctl-large ms-cui-disabled' role=button onclick='spjs.contentApproval.toggleApprovelStatus(0);return false;' href='javascript:;' unselectable='on' mscui:controltype='Button'>");
				b.push("<SPAN class='ms-cui-ctl-largeIconContainer' unselectable='on'>");
				b.push("<SPAN class=' ms-cui-img-32by32 ms-cui-img-cont-float' unselectable='on'>");
				b.push("<IMG style='TOP: -129px; LEFT: -255px' alt='' src='/_layouts/1033/images/formatmap32x32.png' unselectable='on'>");
				b.push("</SPAN>");
				b.push("</SPAN>");
				b.push("<SPAN class=ms-cui-ctl-largelabel unselectable='on'>"+spjs.contentApproval.text.approveBtn+"</SPAN>");
				b.push("</A>");
			// Reject	
				b.push("<A id='rejectAllButton' class='ms-cui-ctl-large ms-cui-disabled' role=button onclick='spjs.contentApproval.toggleApprovelStatus(1);return false;' href='javascript:;' unselectable='on' mscui:controltype='Button'>");
				b.push("<SPAN class='ms-cui-ctl-largeIconContainer' unselectable='on'>");
				b.push("<SPAN class=' ms-cui-img-32by32 ms-cui-img-cont-float' unselectable='on'>");
				b.push("<IMG style='TOP: -0px; LEFT: -0px' alt='' src='/_layouts/1033/images/formatmap32x32.png' unselectable='on'>");
				b.push("</SPAN>");
				b.push("</SPAN>");
				b.push("<SPAN class=ms-cui-ctl-largelabel unselectable='on'>"+spjs.contentApproval.text.rejectBtn+"</SPAN>");
				b.push("</A>");		
			b.push("</SPAN>");
			b.push("</SPAN>");
			b.push("</SPAN>");
			b.push("</SPAN>");
			b.push("<SPAN class='ms-cui-groupTitle' unselectable='on'>"+spjs.contentApproval.text.groupLabel+"</SPAN>");
			b.push("</SPAN>");
			b.push("<SPAN class='ms-cui-groupSeparator' unselectable='on'></SPAN>");
			b.push("</li>");
			setTimeout(function(){
				if($("#Ribbon\\.Document").length===1){
					$("#Ribbon\\.Document").append(b.join(''));
				}else if($("#Ribbon\\.ListItem").length===1){
					$("#Ribbon\\.ListItem").append(b.join(''));
				}
			},100);
		}
		setTimeout(function(){
		 	if(SP.ListOperation.Selection.getSelectedItems().length>0){ 		
		 		$("#approveAllButton, #rejectAllButton").removeClass('ms-cui-disabled');
		 	}else{
		 		$("#approveAllButton, #rejectAllButton").addClass('ms-cui-disabled');
		 	}
	 	},1000);
	},
	"toggleApprovelStatus":function(val){
		if($("#approveAllButton").hasClass('ms-cui-disabled')){
			return;
		}
		spjs.contentApproval.data.approvedOrRejectedCounter = 0;
		spjs.contentApproval.data.notifyId = SP.UI.Notify.addNotification(spjs.contentApproval.text.working, true);	
		var cc, web, currLib, selectedItems, index;
		cc = new SP.ClientContext.get_current();
		web = cc.get_web();
		cc.load(web);
		currLib = web.get_lists().getById(SP.ListOperation.Selection.getSelectedList());
	 	selectedItems = SP.ListOperation.Selection.getSelectedItems();
		if(selectedItems.length>0){
			for(index in selectedItems){
				if(selectedItems[index].fsObjType === '0'){
					spjs.contentApproval.checkAndUpdate(cc,currLib,selectedItems[index].id,val);
				}
			}
		}
	},
	"notifyMe":function(){
		clearTimeout(spjs.contentApproval.data.notifyTimeout);
		spjs.contentApproval.data.notifyTimeout = setTimeout(function(){
			SP.UI.Notify.removeNotification(spjs.contentApproval.data.notifyId);
			spjs.contentApproval.data.notifyId = SP.UI.Notify.addNotification(spjs.contentApproval.text.done.replace(/\{0\}/,spjs.contentApproval.data.approvedOrRejectedCounter), true);	
			setTimeout(function(){
				SP.UI.Notify.removeNotification(spjs.contentApproval.data.notifyId);
				if(spjs.contentApproval.data.approvedOrRejectedCounter>0){
					location.href = location.href;
				}
			},1500);
		},1000);
	},
	"checkAndUpdate":function(cc,currLib,id,val){
		var qb, camlQuery, collListItem;
		qb = [];
		qb.push("<View><Query>");
		qb.push("<Where><Eq><FieldRef Name='ID' /><Value Type='Text'>"+id+"</Value></Eq></Where>");
		qb.push("</Query></View>");
		camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(qb.join(''));	
		collListItem = currLib.getItems(camlQuery);	
		cc.load(collListItem, "Include(ID,_ModerationStatus)");	
		cc.executeQueryAsync(
			function(sender, args){
				var listEnumerator, curr, status;
				listEnumerator = collListItem.getEnumerator();
				while(listEnumerator.moveNext()){
					curr = listEnumerator.get_current();						
					status = curr.get_item('_ModerationStatus');
					if(status !== val){
						spjs.contentApproval.data.approvedOrRejectedCounter ++;
						curr.set_item('_ModerationStatus',val);
						curr.update();
						cc.executeQueryAsync(
							function(sender, args){							
								//notifyMe();
							},
							function (sender, args) {
								alert(args.get_message());
							}
						);
					}
				}
				spjs.contentApproval.notifyMe();								
		 	},
		 	function(sender, args){
		 		alert("Error:\n"+args.get_message());
		 	}		
		);
	}
};

ExecuteOrDelayUntilScriptLoaded(spjs.contentApproval.init, "sp.ribbon.js");



