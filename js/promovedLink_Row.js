<style>
  .ms-promlink-body {
    width: 100%;
    height: 100%;
  }    
</style>

<script language="javascript" src="https://code.jquery.com/jquery-1.4.2.min.js" type="text/javascript" ></script>
<script language="javascript" src="https://jquery-joshbush.googlecode.com/files/jquery.maskedinput-1.2.2.min.js" type="text/javascript" ></script>
<script language="javascript" type="text/javascript">
$(document).ready(function () {
  
// Update this value to the number of links you want to show per row
var numberOfLinksPerRow = 1000;
 
// Set Image Size 
var ImageSize = "160";
 
// in case we have multiple promoted links on page, name the WPQ here
var promotedlinksbody_WPQ = "2";
  
// local variables
var pre = "<tr><td><div class='ms-promlink-body' id='promlink_row_";
var post = "'></div></td></tr>";
var numberOfLinksInCurrentRow = numberOfLinksPerRow;
var currentRow = 1000;
// find the number of promoted links we're displaying
 
var numberOfPromotedLinks = $('#promotedlinksbody_WPQ' + promotedlinksbody_WPQ + ' > .ms-tileview-tile-root').length;
//var numberOfPromotedLinks = $('.ms-promlink-body > .ms-tileview-tile-root').length;
 
  // if we have more links then we want in a row, let's continue
  if (numberOfPromotedLinks > numberOfLinksPerRow) {
    // we don't need the header anymore, no cycling through links
    $('.ms-promlink-root > .ms-promlink-header').empty();
    // let's iterate through all the links after the maximum displayed link
    for (i = numberOfLinksPerRow + 1; i <= numberOfPromotedLinks; i++) {
 
 
      // if we're reached the maximum number of links to show per row, add a new row
      // this happens the first time, with the values set initially
      if (numberOfLinksInCurrentRow == numberOfLinksPerRow) {
        // i just want the 2nd row to
        currentRow++;
 
  
        // create a new row of links
        $('.ms-promlink-root > table > tbody:last').append(pre + currentRow + post);
        // reset the number of links for the current row
        numberOfLinksInCurrentRow = 0
 
 
    }
     
 
    // move the Nth (numberOfLinksPerRow + 1) div to the current table row
    $('.ms-promlink-body > .ms-tileview-tile-root:nth-child(' + (numberOfLinksPerRow + 1) + ')').appendTo($('#promlink_row_' + currentRow));
    // increment the number of links in the current row
    numberOfLinksInCurrentRow++;
 
  }
}
 
 
    // Set the size of main promoted links body
    var ControlID='promotedlinksbody_WPQ';
    ControlID=ControlID + promotedlinksbody_WPQ;
    $("#" + ControlID).height(ImageSize);
     
    // iterate through each link and set the size
    for (i = 1; i <= numberOfPromotedLinks; i++) {
         
        ControlID='Tile_WPQ' + promotedlinksbody_WPQ + '_' + i ;
        ControlID= ControlID + '_1';
        $("#" + ControlID).width(ImageSize);
        $("#" + ControlID).height(ImageSize);
         
        ControlID='Tile_WPQ' + promotedlinksbody_WPQ + '_' + i ;
        ControlID= ControlID + '_2';
        $("#" + ControlID).width(ImageSize);
        $("#" + ControlID).height(ImageSize);
 
        ControlID='Tile_WPQ' + promotedlinksbody_WPQ + '_' + i ;
        ControlID= ControlID + '_7';
        $("#" + ControlID).width(ImageSize);
         
        ControlID='Tile_WPQ' + promotedlinksbody_WPQ + '_' + i ;
        ControlID= ControlID + '_4';
        $("#" + ControlID).width(ImageSize);
        $("#" + ControlID).height(ImageSize);
         
         
        ControlID='Tile_WPQ' + promotedlinksbody_WPQ + '_' + i ;
        ControlID= ControlID + '_4';
        $("#" + ControlID).width(ImageSize);
        $("#" + ControlID).height(ImageSize);
        //$("#" + ControlID).top(ImageSize);
 
    }
 
    ControlID="promotedlinksheader_WPQ" + promotedlinksbody_WPQ;
    $("#" + ControlID).hide();
 
 
});
 
</script>