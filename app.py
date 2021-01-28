
from flask import Flask, render_template, jsonify
import data

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/SpotifyData', methods=['GET'])
def database_data():
    spotdata = data.get_db_data()
    #spotdata = {"this": "is my database data"}
    response = jsonify(spotdata)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


if __name__ == '__main__':
    app.run(debug=True)