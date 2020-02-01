from newsapi import NewsApiClient
import json, os

    # newsapi-python documentation
    # https://github.com/mattlisiv/newsapi-python

try:
    api = NewsApiClient(api_key = '8d33048321424617b34e3682c2bcff5f')

    # List of selected news sources, ordered by bias according to analysis by
    # allsides.com.  They are divided here for reference and will be collected
    # into a single list below.
    FarLeft = ["the-huffington-post",
               "msnbc"]

    Left = ["cnn",
            "nbc-news",
            "politico",
            "the-washington-post"]

    Center = ["associated-press",
              "reuters",
              "the-hill",
              "usa-today"]

    Right = ["fox-news",
             "the-wall-street-journal",
             "the-washington-times",
             "the-american-conservative"]

    FarRight = ["breitbart-news",
                "national-review"]

    # Single list of selected sources
    sources = FarLeft + Left + Center + Right + FarRight

    # An empty dictionary containing all headlines that will be populated below
    headlinesDict = {}




    # Download headlines for each source and append to headlinesDict
    for source in sources:
        print(f"Downloading headlines from {source}")
        headlines = api.get_top_headlines(sources=source)
        headlinesDict[source] = headlines

    # Export headlinesDict as json file
    filename = "headlines.json"
    filepath = os.path.dirname(os.path.abspath(__file__)) + "\\headlines\\" + filename
    print(f"Saving headlines as headlines.json to {filepath}")
    with open(filepath, "w") as file:
        file.write(json.dumps(headlinesDict))

    # Return True if no errors
    print("Headlines update successful")

except:
    # Return false if error
    print("Headlines update failed")

def download_top_headlines(source):
    """ Download the headlines for the given source and save as a json file """

    headlines = api.get_top_headlines(sources=source)
    filename = f"{source}.json"
    filepath = os.path.abspath(__file__) + "\\headlines\\" + filename
    print(filepath)
    with open(filepath, "w") as file:
        file.write(json.dumps(headlines))