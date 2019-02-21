

$.getJSON("/all", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        $("#results").append(
            "<tr><td>" + data[i].title + "</td>" +
            "<td>" + data[i].link + "</td></tr>");
    }
});

$("#scrape").on("click", function() {

});

$("#clear").on("click", function() {

})