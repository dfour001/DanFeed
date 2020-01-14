from flask import Flask, jsonify
import json, os
import update_headlines

app = Flask(__name__)

@app.route("/getHeadlines", methods=["GET"])
def get_headlines():
    """ Load and return the latest top headlines json file """
    filename = "headlines.json"
    filepath = os.path.dirname(os.path.abspath(__file__)) + "\\headlines\\" + filename

    # Load headlines json file
    file = open(filepath, "r")
    headlines = file.read()
    file.close()

    # Return headlines as response
    headlines = json.loads(headlines)
    headlinesJSON = jsonify(headlines)
    headlinesJSON.headers.add('Access-Control-Allow-Origin', '*')
    return headlinesJSON

@app.route("/updateHeadlines")
def update():
    if(update_headlines.update_headlines_file()):
        return "<h1>Headlines updated successfully</h1>"
    else:
        return "<h1>A problem has occured while updating headlines :(</h1>"




if __name__ == '__main__':
    app.run(debug=True)