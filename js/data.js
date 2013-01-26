function load_xml() {
    $.ajax({
        url: "./data.xml",
        type: "get",
        dataType: "xml",
        success: parse_xml,
        error: parse_error
    });
}

function parse_error() {
    alert("Oops!!");
}

function parse_xml(xml, status) {
    if (status != "success") return;
    var header = $(xml).find("header").text();
    $(".brand").prepend(header + " - ");

    $(xml).find("section").each(function() {
        var layout = $(this).attr("align");
        var group = $("<div>").addClass("accordion-group");
        var header = $("<div>").addClass("accordion-heading");
        var title = $(this).children("title").text();
        var link = $("<a>")
                        .addClass("accordion-toggle")
                        .attr({
                            "href": "#ac-" + layout + "-" + title,
                            "data-toggle": "collapse",
                            "data-parent": "#ac-" + layout
                        })
                        .text(title);

        var body = $("<div>")
                        .attr("id", "ac-" + layout + "-" + title)
                        .addClass("accordion-body")
                        .addClass("collapse")
                        .addClass("in");
        var inner = $("<div>").addClass("accordion-inner");

        var sections = $("<dl>");
        $(this).children("item").each(function() {
            var desc = $("<dt>").text($(this).children("description").text());
            var key = $("<dd>").text($(this).children("key").text());

            sections.append(desc).append(key);
        });

        header.append(link);
        group.append(header);

        inner.append(sections);
        body.append(inner);
        group.append(body);
        $("#ac-" + layout).append(group);
    });

    $(".collapse").collapse({
        'toggle': false
    });
}

$(function() {
    load_xml();
});