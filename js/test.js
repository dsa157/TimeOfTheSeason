function getFooter() {

    var tmpl = `
    <div class="footer" data-role="controlgroup" data-type="horizontal">
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-home"     >{$Home}}</a>
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-search"   >Search</a>
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-calendar" >Calendar</a>
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-location" >Map</a>
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-check"    >Plan</a>
    <a href="#" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-user"     >Profile</a>
</div>  
`;
    
    var data = "";
    $.template("footerTmpl", tmpl);
    $.tmpl("footerTmpl", {
        txt: data
    }).appendTo("#myFooter");
}

function getTitle() {
    var tmpl = "My Title: ${Title}";
    var data = { "Title" : "Time of the Season" };
    $.template("titleTmpl", tmpl);
    $.tmpl("titleTmpl", data).appendTo( "#myContent" );
}