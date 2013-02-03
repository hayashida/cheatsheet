// Generated by CoffeeScript 1.4.0
(function() {
  var dataXml;

  dataXml = (function() {

    function dataXml() {}

    dataXml.prototype.get_data = function() {
      $.ajax("./data.xml", {
        type: "get",
        dataType: "xml",
        success: this.parse_xml,
        error: this.parse_load_error
      });
    };

    dataXml.prototype.parse_load_error = function() {
      alert("Oops!!");
    };

    dataXml.prototype.parse_xml = function(xml, status) {
      var header, make;
      if (status !== "success") {
        return;
      }
      header = $(xml).find("header").text();
      $(".brand").prepend(header + " - ");
      make = function() {
        var body, desc, group, id, inner, item, key, layout, link, sections, title, _i, _len, _ref;
        layout = $(this).attr("align");
        group = $("<div>").addClass("accordion-group");
        header = $("<div>").addClass("accordion-heading");
        title = $(this).children("title").text();
        id = "ac-" + layout.toLowerCase() + "-" + title.toLowerCase();
        link = $("<a>").addClass("accordion-toggle").attr({
          "href": "#" + id,
          "data-toggle": "collapse",
          "data-parent": "#ac-" + layout
        }).text(title);
        body = $("<div>").attr({
          "id": id
        }).addClass("accordion-body").addClass("collapse").addClass("in");
        inner = $("<div>").addClass("accordion-inner");
        sections = $("<dl>");
        _ref = $(this).children("item");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          key = $("<dd>").text($(item).children("key").text());
          desc = $("<dt>").text($(item).children("description").text());
          sections.append(desc).append(key);
        }
        header.append(link);
        group.append(header);
        inner.append(sections);
        body.append(inner);
        group.append(body);
        $("#ac-" + layout).append(group);
      };
      $(xml).find("section").each(make);
      $(".collapse").collapse({
        "toggle": false
      });
    };

    return dataXml;

  })();

  $(function() {
    var obj;
    obj = new dataXml();
    return obj.get_data();
  });

}).call(this);
