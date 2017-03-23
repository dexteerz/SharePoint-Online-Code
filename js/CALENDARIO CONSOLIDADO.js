<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/linq.min.js"></script>

<script>

var item;
var items = new Array();
var queryResult;

ExecuteOrDelayUntilScriptLoaded(
    CalendarHook, 
    "SP.UI.ApplicationPages.Calendar.js");


ExecuteOrDelayUntilScriptLoaded(fixupDrag, 'SP.UI.ApplicationPages.Calendar.js');
    function fixupDrag(){
        var calendarCreate = SP.UI.ApplicationPages.CalendarContainerFactory.create;
        SP.UI.ApplicationPages.CalendarContainerFactory.create = function(elem, cctx, viewType, date, startupData) {
            if(cctx.dataSources && cctx.dataSources instanceof Array && cctx.dataSources.length > 0){
                for(var i = 0; i < cctx.dataSources.length; i++){
                    cctx.dataSources[i].disableDrag = true;
                }
            }
            calendarCreate(elem, cctx, viewType, date, startupData);
        }
    }


function CalendarHook() {     

var object = new SP.UI.ApplicationPages.CalendarInstanceRepository();

var _onItemsSucceed = SP.UI.ApplicationPages.CalendarStateHandler.prototype.onItemsSucceed;

SP.UI.ApplicationPages.CalendarStateHandler.prototype.onItemsSucceed = function($p0, $p1) {


item = $p0;

var itemsCalendario = [];


var consultas = Enumerable.From(item)
    .GroupBy(function (x) { return x.$3K_0; })
    .OrderBy(function (x) { return x.$3K_0; })
    .ToArray();



for(datas in consultas) { 
	for(procedimento in consultas[datas].source) {  
		consultas[datas].source[procedimento].$3K_0  = consultas[datas].source[procedimento].$3K_0 + ' (' + consultas[datas].source.length + ') ';
consultas[datas].source[procedimento].$3N_0 = "";
consultas[datas].source[procedimento].$3x_0 = "";
	} 
}

for (i = 0; i < consultas.length; i++) { 
   itemsCalendario.push(consultas[i].source[0]); 
}

        _onItemsSucceed.call(this, itemsCalendario, $p1);

    };
}


$(".ms-acal-rootdiv").bind("click dblclick",function(){
            return false;
});
 
setInterval(function(){           
            $(".ms-acal-item [bricked!='1']").each(function(){    
                        $(this).attr("bricked","1").bind("click dblclick",function(){              
                                    return false;
                        });
            });
            // Single day events
            $(".ms-acal-sdiv a").each(function(){
                        var text = $(this).text();
                        $(this).before(text);
                        $(this).remove();
                       
            });
            // Events spanning multiple days
            $(".ms-acal-mdiv a").each(function(){
                        var text = $(this).text();
                        $(this).before(text);
                        $(this).remove();
                       
            });
 
},500);

</script>
<style type="text/css">
.ms-acal-time{
display: none !important;
}
</style>