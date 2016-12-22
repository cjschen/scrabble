from flask import Flask, render_template
import json, random
from constants import *
app = Flask(__name__)


@app.route("/randomize", methods=["GET", "POST"])
def randomize():
    letters = []
    for letter in gameConst['numLetters']:
        for i in range(1, gameConst['numLetters'][letter]):
            letters.append(letter)

    random.shuffle(letters)
    return json.dumps(letters)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

if __name__ == "__main__":
    app.run(debug=True)
