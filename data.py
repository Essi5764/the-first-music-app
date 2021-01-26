from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pandas as pd
from sqlalchemy import create_engine

def get_db_data():
    # Connect to database
    connection_string = "postgres:postgres@localhost:5432/Spotify_project"
    engine = create_engine(f'postgresql://{connection_string}')
    # Query data
    sql_query = pd.read_sql_query(' Select * FROM SpotifyData', connection_string)
    # Return data in json format
    return jsonify(get_db_data)

# def get_api_data():
#     # Query to api

#     # Return data in json format
#     pass