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

    // Populate drop down menu with unique years
    d3.csv("assets/data/Spotify_data.csv").then (function(data) {
        var select = d3.select("#selDataset")

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

        // Pull all data from samples for horizontal bar chart
        var avgDanceability = filteredData.reduce((a,b) => a+b, 0) / filteredData.length
        console.log(avgDanceability)
        var avgEnergy
        var avgInstrumentalness
        var avgLoudness
        var avgPopularity
        var avgSpeechiness
        var avgTempo
    });
};