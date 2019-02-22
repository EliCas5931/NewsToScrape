// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Require Axios and Cheerio for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Static Folder
app.use(express.static("public"));

// Database Config
var databaseUrl = "newsDB";
var collections = ["newsData"];

// MONGODB_URI
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsDB"
// mongoose.connect(MONGODB_URI);

// Connect mongojs
var db = mongojs(MONGODB_URI, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Main route
app.get("/", function(req, res) {
    res.send("Scrape News!");
});

app.get("/all", function(req, res) {
    db.newsData.find({}, function(error, found) {
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });
});

app.get("/title", function(req, res) {
    db.newsData.find().sort({ title: 1 }, function(error, found) {
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });
});

app.get("/scrape", function(req, res) {
    axios.get("https://old.reddit.com").then(function(results) {
        var $ = cheerio.load(results.data);

        $("p.title").each(function(i, element) {
            var title = $(element).text();
            var link = $(element).children().attr("href");
            // var image = $(element)

            if (title && link) {
                db.newsData.insert({
                    title: title,
                    link: link
                },
                function(err, inserted) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                });
            }
        });
    });
    res.send("Scrape Completed!");
});

app.get("/", function(req,res) {
    res.json(path.join(__dirname, "public/index.html"));
});

var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:3000");
})