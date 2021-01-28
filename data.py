from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pandas as pd
from sqlalchemy import create_engine
from config import db_pass

def get_db_data():
    # Connect to database
    connection_string = f"postgres:{db_pass}@localhost:5432/Spotify_project"
    engine = create_engine(f'postgresql://{connection_string}')
    print(engine.table_names())
    # Query data
    sql_query = pd.read_sql_table('SpotifyData', f'postgresql://{connection_string}')
    # sql_query = engine.execute('SELECT * FROM spotifydata')
    # d, a = {}, []
    # for rowproxy in sql_query:
    #     # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
    #     for column, value in rowproxy.items():
    #         # build up the dictionary
    #         d = {**d, **{column: value}}
    #     a.append(d)
    #         #print(d)
    # Return data in json format
    return sql_query.to_dict("records")

# def get_api_data():
#     # Query to api

#     # Return data in json format
#     pass