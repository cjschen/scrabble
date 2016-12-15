from flask import Flask
app = Flask(__name__)


@app.route("/randomize", methods=["GET", "POST"])
def randomize():
    return "Hello World!"
if __name__ == "__main__":
    app.run()
