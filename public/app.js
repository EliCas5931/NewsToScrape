
function displayResults(scrapedData) {
    $("tbody").empty();

    scrapedData.forEach(function(results) {
        var tr = $("<tr>").append(
            $("<td>").text(results.title),
            $("<td>").text(results.link)
        );
        $("tbody").append(tr);
    });
}

$.getJSON("/all", function(data) {
    displayResults(data);
});

$("#scrape").on("click", function() {

});

$("#clear").on("click", function() {
    
})