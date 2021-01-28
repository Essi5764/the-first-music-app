
from flask import Flask, render_template, jsonify
import data

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')
@app.route('/')
def home():
    return render_template('index.html')
# @app.route('/viz1')
# def viz1():
#     return render_template('viz1.html')
# @app.route('/viz2')
# def viz2():
#     return render_template('viz2.html')
@app.route('/SpotifyData', methods=['GET'])
def database_data():
    spotdata = data.get_db_data()
    #spotdata = {"this": "is my database data"}
    response = jsonify(spotdata)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

# @app.route('/api_data', methods=['GET'])
# def api_data():
#     # data = data.get_api_data()
#     data = {"this": "is my api data"}
#     return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)