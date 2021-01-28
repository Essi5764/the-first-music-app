// Change select option from dropdown
function optionChanged() {
  
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node();
    
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;

    getData();
};

// Get unique years
function getUniqueYear(data) {
    years = _.uniq(data.map(data => data.year))
    return years
};

getData();

function getData() {

    // Read data from CSV file
    d3.json("http://localhost:5000/SpotifyData").then (function(data) {

        var select = d3.select("#selDataset")

        // Populate drop down menu with unique years
        select.selectAll('option')
        .data(getUniqueYear(data))
        .enter()
            .append("option")
            .attr("value", function (year) { return year; })
            .text(function (year) { return year; });

        select
        .on("change", function(d) {
            var value = d3.select(this).property("value");
        });

        // Create variable for chosen year
        var chosenYear = document.getElementById('selDataset');
        var chosenYear = chosenYear.options[chosenYear.selectedIndex].value;

        // Create a function that returns metadata based on id number
        function filterData(data) {
            return data.year == chosenYear;
        };

        // Filter full data by chosen year
        var filteredData = data.filter(filterData);

        // Pull all data from samples for horizontal bar chart (convert variables to positive numbers)
        var avgDanceability = (filteredData.reduce((a,b) => a + Number(b.danceability), 0) / filteredData.length)*100
        var avgEnergy = (filteredData.reduce((a,b) => a + Number(b.energy), 0) / filteredData.length)*100
        var avgInstrumentalness = (filteredData.reduce((a,b) => a + Number(b.instrumentalness), 0) / filteredData.length)*100
        var avgLoudness = (Math.abs(filteredData.reduce((a,b) => a + Number(b.loudness), 0) / filteredData.length))*(5/3)
        var avgPopularity = filteredData.reduce((a,b) => a + Number(b.popularity), 0) / filteredData.length
        var avgSpeechiness = (filteredData.reduce((a,b) => a + Number(b.speechiness), 0) / filteredData.length)*100
        var avgTempo = (filteredData.reduce((a,b) => a + Number(b.tempo), 0) / filteredData.length)*(2/3)

        // Pull averages of variables for full dataset
        var avgDanceabilityTotal = (data.reduce((a,b) => a + Number(b.danceability), 0) / data.length)*100
        var avgEnergyTotal = (data.reduce((a,b) => a + Number(b.energy), 0) / data.length)*100
        var avgInstrumentalnessTotal = (data.reduce((a,b) => a + Number(b.instrumentalness), 0) / data.length)*100
        var avgLoudnessTotal = (Math.abs(data.reduce((a,b) => a + Number(b.loudness), 0) / data.length))*(5/3)
        var avgPopularityTotal = data.reduce((a,b) => a + Number(b.popularity), 0) / data.length
        var avgSpeechinessTotal = (data.reduce((a,b) => a + Number(b.speechiness), 0) / data.length)*100
        var avgTempoTotal = (data.reduce((a,b) => a + Number(b.tempo), 0) / data.length)*(2/3)

        // Create an array of values of full dataset
        var hbarVariablesTotal = [avgDanceabilityTotal, avgEnergyTotal, avgInstrumentalnessTotal, avgLoudnessTotal, avgPopularityTotal, avgSpeechinessTotal, avgTempoTotal];
        
        // Create array of values for hbar graph
        var hbarVariables = [avgDanceability, avgEnergy, avgInstrumentalness, avgLoudness, avgPopularity, avgSpeechiness, avgTempo]

        // Create array of labels for hbar graph
        var hbarLabels = ['Danceability ', 'Energy ', 'Instrumentalness ', 'Loudness ', 'Popularity ', 'Speechiness ', 'Tempo ']

        // Trace1 and 2 for the grouped horizontal bar chart
        var trace1 = {
            x: hbarVariables,
            y: hbarLabels,
            name: `${chosenYear}`,
            marker: {color: '#1DB954'},
            type: 'bar',
            orientation: 'h'
        };

        var trace2 = {
            x: hbarVariablesTotal,
            y: hbarLabels,
            name: '2000-2021',
            marker: {color: '#000000'},
            type: 'bar',
            orientation: 'h'
        };

        var hbarChart = [trace1, trace2];

        var layout1 = {
            title: `<b>${chosenYear} Music At a Glance</b>`,
            barmode: 'group',
            legend: {
                'orientation': 'h'
            },
            yaxis: {
                automargin: true
            },
            xaxis: {range: [0,101]},
        };

        Plotly.newPlot('hbar', hbarChart, layout1, {displayModeBar: false})

        // STACKED BAR CHART BEGINS
        var percentExplicit = 100 * (filteredData.reduce((a,b) => a + Number(b.explicit), 0) / filteredData.length)
        var percentClean = 100 - percentExplicit

        // Trace 3 for stacked bar chart
        var trace3 = {
            x: [""],
            y: [percentExplicit],
            marker: {color: '#1DB954'},
            name: "Explicit",
            type: "bar"
        };

        var stackData = [trace3];

        var stackLayout = {
            showlegend: false,
            title: '<b>Percent Explicit</b>',
            yaxis: {range: [0,101]},
        };

        Plotly.newPlot('stackBar', stackData, stackLayout, {displayModeBar: false});

        // Sort filteredData by popularity and slice top 10
        var popularitySorted = _.orderBy(filteredData, ['popularity'], ['desc']).slice(0, 10);

        // CATEGORICAL DOT PLOT
        var topTenSongsLabels = popularitySorted.map(popularitySorted => `${popularitySorted.name} ${popularitySorted.artists} `).reverse();
        var topTenSongsPopularity = popularitySorted.map(popularitySorted => popularitySorted.popularity).reverse();

        // Trace 5 for categorical dot plot
        var trace5 = {
            type: 'scatter',
            x: topTenSongsPopularity,
            y: topTenSongsLabels,
            mode: 'markers',
            name: 'Popularity',
            marker: {
                color: '#000000',
                line: {
                  color: '#000000',
                  width: 1,
                },
                symbol: 'circle',
                size: 16
              },
        };

        var dotData = [trace5];

        var dotLayout = {
            title: {
              text: `<b>Top Ten Songs of ${chosenYear} with Popularity</b>`,
              font: {
                color: '#FFFFFF'
              },
                },
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: '#FFFFFF',
                text: {
                    color: '#FFFFFF'
                  },
                tickfont: {
                    color: '#FFFFFF'
                },
                autotick: false,
                dtick: 10,
                ticks: 'outside',
                tickcolor: '#FFFFFF',
                range: [70,101]
              },
            margin: {
                l: 140,
                r: 40,
                b: 50,
                t: 80
              },
            legend: {
                font: {
                  size: 10,
                },
                yanchor: 'middle',
                xanchor: 'right'
              },
            height: 600,
            hovermode: 'closest',
            yaxis: {
                automargin: true,
                tickfont: {
                  color: '#FFFFFF'
              },
              },
            paper_bgcolor: '#1DB954',
            plot_bgcolor: '#FFFFFF',
            };

        Plotly.newPlot('dotPlot', dotData, dotLayout, {displayModeBar: false});
    });
};