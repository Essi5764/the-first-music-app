// Change select option from dropdown
function optionChanged() {
  
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node();
    
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;

    console.log(selectedOption);

    getData();
};

// Get unique years
function getUniqueYear(data) {
    years = _.uniq(data.map(data => data.year))
    console.log(years)
    return years
};

getData();

function getData() {

    // Read data from CSV file
    d3.csv("assets/data/Spotify_data.csv").then (function(data) {
        var select = d3.select("#selDataset")
        
        // Pull averages of variables for full dataset
        var avgDanceabilityTotal = data.reduce((a,b) => a + Number(b.danceability), 0) / data.length
        var avgEnergyTotal = data.reduce((a,b) => a + Number(b.energy), 0) / data.length
        var avgInstrumentalnessTotal = data.reduce((a,b) => a + Number(b.instrumentalness), 0) / data.length
        var avgLoudnessTotal = Math.abs(data.reduce((a,b) => a + Number(b.loudness), 0) / data.length)
        var avgPopularityTotal = data.reduce((a,b) => a + Number(b.popularity), 0) / data.length
        var avgSpeechinessTotal = data.reduce((a,b) => a + Number(b.speechiness), 0) / data.length
        var avgTempoTotal = data.reduce((a,b) => a + Number(b.tempo), 0) / data.length

        // Create an array of values of full dataset
        var hbarVariablesTotal = [avgDanceabilityTotal, avgEnergyTotal, avgInstrumentalnessTotal, avgLoudnessTotal, avgPopularityTotal, avgSpeechinessTotal, avgTempoTotal]
        console.log(hbarVariablesTotal)

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
        console.log(chosenYear)

        // Create a function that returns metadata based on id number
        function filterData(data) {
            return data.year == chosenYear;
        };

        // Filter full data by chosen year
        var filteredData = data.filter(filterData);

        // Print filtered data to console for testing
        console.log(filteredData);

        // Pull all data from samples for horizontal bar chart (convert variables to positive numbers)
        var avgDanceability = filteredData.reduce((a,b) => a + Number(b.danceability), 0) / filteredData.length
        var avgEnergy = filteredData.reduce((a,b) => a + Number(b.energy), 0) / filteredData.length
        var avgInstrumentalness = filteredData.reduce((a,b) => a + Number(b.instrumentalness), 0) / filteredData.length
        var avgLoudness = Math.abs(filteredData.reduce((a,b) => a + Number(b.loudness), 0) / filteredData.length)
        var avgPopularity = filteredData.reduce((a,b) => a + Number(b.popularity), 0) / filteredData.length
        var avgSpeechiness = filteredData.reduce((a,b) => a + Number(b.speechiness), 0) / filteredData.length
        var avgTempo = filteredData.reduce((a,b) => a + Number(b.tempo), 0) / filteredData.length
        
        // Create array of values for hbar graph
        var hbarVariables = [avgDanceability, avgEnergy, avgInstrumentalness, avgLoudness, avgPopularity, avgSpeechiness, avgTempo]
        console.log(hbarVariables)

        // Create array of labels for hbar graph
        var hbarLabels = ['Danceability', 'Energy', 'Instrumentalness', 'Loudness', 'Popularity', 'Speechiness', 'Tempo']
        console.log(hbarLabels)

        // Trace1 and 2 for the grouped horizontal bar chart
        var trace1 = {
            x: hbarVariables,
            y: hbarLabels,
            name: `${chosenYear}`,
            marker: {color: 'rgb(26, 118, 255)'},
            type: 'bar',
            orientation: 'h'
        };

        var trace2 = {
            x: hbarVariablesTotal,
            y: hbarLabels,
            name: '2000-2021',
            marker: {color: 'rgb(55, 83, 109)'},
            type: 'bar',
            orientation: 'h'
        };

        var hbarChart = [trace1, trace2];

        var layout1 = {
            title: `${chosenYear} Music At a Glance`,
            barmode: 'group',
            legend: {
                'orientation': 'h'
            },
            yaxis: {
                automargin: true
            }
        };

        Plotly.newPlot('hbar', hbarChart, layout1)

        // STACKED BAR CHART BEGINS
        var percentExplicit = 100 * (filteredData.reduce((a,b) => a + Number(b.explicit), 0) / filteredData.length)
        var percentClean = 100 - percentExplicit

        // Trace 3 for stacked bar chart
        var trace3 = {
            x: [""],
            y: [percentExplicit],
            name: "Percent Explicit",
            type: "bar"
        };
        
        var trace4 = {
            x: [""],
            y: [percentClean],
            name: "Percent Clean",
            type: "bar"
        };

        var stackData = [trace3, trace4];

        var stackLayout = {
            barmode: 'stack'
        };

        Plotly.newPlot('stackBar', stackData, stackLayout);
    });
};