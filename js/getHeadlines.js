// Temp load json directly
var headlines;

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


function populate_headline_cards(r) {
    let headlines = r;

    let sources = Object.keys(headlines);

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
    articleHTML += "<small>Open Article</small><br>";

    output = "<div class='article'>" + articleHTML + "</div>";
    return output
}


function center_view() {
    let scrollDistance = $('.weather').position().left;
    $('#headlines').animate({scrollLeft: scrollDistance}, 800);

}
