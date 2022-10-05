function getFooter() {

    var tmpl = `
    <div class="footer" data-role="controlgroup" data-type="horizontal">
    <a href="/" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-home"     >{$Home}}</a>
    <a href="/search.html" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-search"   >Search</a>
    <a href="/calendar.html" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-calendar" >Calendar</a>
    <a href="/map.html" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-location" >Map</a>
    <a href="/planner.html" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-check"    >Plan</a>
    <a href="/profile.html" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-user"     >Profile</a>
</div>  
`;
    
    var data = "";
    $.template("footerTmpl", tmpl);
    $.tmpl("footerTmpl", {
        txt: data
    }).appendTo("#myFooter");
}

function getTitle(page) {
    var tmpl = "My Title: ${Title}";
    var data = { "Title" : "Time of the Season: " + page };
    $.template("titleTmpl", tmpl);
    $.tmpl("titleTmpl", data).appendTo( "#myContent" );
}