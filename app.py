import numpy as np
from flask import Flask, render_template, jsonify
import data


    
engine = create_engine("sqlite:///Resources/SpotifyData.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to the table
measurement = Base.classes.measurement
station= Base.classes.station
#################################################
# Flask Setup
#################################################
app = Flask(__name__)