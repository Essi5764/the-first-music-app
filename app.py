import numpy as np
from flask import Flask, render_template, jsonify
import data

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/db_data', methods=['GET'])
def database_data():
    # data = data.get_db_data()
    data = {"this": "is my database data"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    