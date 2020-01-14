// Temp load json directly
var headlines;

/*
$.ajax({
    dataType: "json",
    url: "./headlines/headlines.json",
    success: function (r) {
        populate_headline_cards(r);
        center_view();
    },
    error: function () {
        console.log(":(");
        
    }
});
*/

$.ajax({
    dataType: "json",
    url: "http://dfour001.pythonanywhere.com/getHeadlines",
    success: function (r) {
        // Load headlines and populate headline cards
        populate_headline_cards(r);
        
        // Hide loading animation and show headline cards
        $("#loadingAnimation").addClass("d-none");
        $("#headlines").removeClass("d-none");
        
        // Animate cards to weather card
        center_view();
    },
    error: function() {
        console.log(":(");
        center_view();
    }
})


function populate_headline_cards(r) {
    let headlines = r;

    let sources = Object.keys(headlines);

    console.log(headlines);
    console.log(sources);
    for (let i = 0; i < sources.length; i++) {
        let curSource = headlines[sources[i]];
        // Check if headline loading was successful
        if (curSource.status == "ok") {
            // Build headlines for card
            let headlinesHTML = "";
            let articles = curSource.articles;
            for (let a = 0; a < articles.length; a++) {
                headlinesHTML += build_article_html(articles[a]);
            }

            if (headlinesHTML == "") {
                headlinesHTML = "No articles to load";
            }
            $("#" + sources[i]).html(headlinesHTML);
        } else

        {
            console.log("error loading " + sources[i]);
        }
    }
}


function build_article_html(article) {
    articleHTML = "<b>" + article.title + "</b>";
    articleHTML += "<p>" + article.description + "</p>";
    articleHTML += "<small>Published " + format_date(article.publishedAt) + "</small><br>"
    articleHTML += "<small>Open Article</small><br>";

    output = "<div class='article'>" + articleHTML + "</div>";
    return output
}


function center_view() {
    let scrollDistance = $('.weather').position().left;
    $('#headlines').animate({scrollLeft: scrollDistance}, 800);

}

function format_date(inputDate) {
    date = new Date(inputDate);
    date = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();
    return date
}