## Spotify_project_-G1

Over the course of 2 weeks, we used data taken from [Kaggle](https://www.kaggle.com/yamaerenay/spotify-dataset-19212020-160k-tracks?select=data_by_genres.csv) to create informational interactive graphs. Our original data contained over 160k songs, which we then narrowed down to 41,450 songs to focus on a certain years of interest (2000-2020).

## The following steps were taken in order to complete this project:

# Front- end 
Using javascript, css and html coding, we created an interface that shows the user a summary of our data

* Our horizontal group bar graph shows specific music variables used to create music in certain years. 
* Standard bar graph which shows which years had more explicit songs.
* Scattered graph which shows the top 10 songs for choosen year. 

![Pic1.png](Screenshots/image1.png)
![Pic2.png](Screenshots/image2.png)

# Back- end 
* We set up a database using sql and imported the csv file.
See the code [Here](https://github.com/Candy-Capilla/Spotify_project_G1/blob/main/Spotify.ipynb)
* We then created an API for our sql to be able to call the data.
See the code [Here](https://github.com/Candy-Capilla/Spotify_project_G1/blob/main/data.py)
* Using the API and sqlachemy, We connected to the sql database and we jsonified the data.
See the code [Here](https://github.com/Candy-Capilla/Spotify_project_G1/blob/main/app.py)
* Using d3.json we read the data into the javascript plotly to make the graphs.
See the code [Here](https://github.com/Candy-Capilla/Spotify_project_G1/blob/main/Static/Js/app.js)

