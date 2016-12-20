from flask import Flask, render_template
import json
from constants import *
app = Flask(__name__)


@app.route("/randomize", methods=["GET", "POST"])
def randomize():
    print gameConst
    return json.dumps(gameConst['numLetters'])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

if __name__ == "__main__":
    app.run(debug=True)
