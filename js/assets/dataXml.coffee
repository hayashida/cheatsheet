class dataXml
    get_data: ->
        $.ajax "./data.xml"
            type: "get"
            dataType: "xml"
            success: @parse_xml
            error: @parse_load_error

        return

    parse_load_error: ->
        alert "Oops!!"
        return

    parse_xml: (xml, status) ->
        if status isnt "success"
            return

        header = $(xml).find("header").text()
        $(".brand").prepend(header + " - ");

        make= ->
            layout = $(this).attr("align")
            group = $("<div>").addClass("accordion-group")

            header = $("<div>").addClass("accordion-heading")
            title = $(this).children("title").text();
            id = "ac-" + layout.toLowerCase() + "-" + title.toLowerCase()

            link = $("<a>")
                    .addClass("accordion-toggle")
                    .attr
                        "href": "#" + id
                        "data-toggle": "collapse"
                        "data-parent": "#ac-" + layout
                    .text(title);

            body = $("<div>")
                    .attr
                        "id": id
                    .addClass("accordion-body")
                    .addClass("collapse")
                    .addClass("in")
            inner = $("<div>").addClass("accordion-inner")

            sections = $("<dl>")
            for item in $(this).children("item")
                key = $("<dd>")
                        .text($(item).children("key").text())
                desc = $("<dt>")
                        .text($(item).children("description").text())

                sections.append(desc).append(key)

            header.append(link)
            group.append(header)

            inner.append(sections);
            body.append(inner)
            group.append(body)
            $("#ac-" + layout).append(group)
            return

        $(xml).find("section").each(make) 

        $(".collapse").collapse "toggle": false
        return

$ ->
    obj = new dataXml()
    obj.get_data()
