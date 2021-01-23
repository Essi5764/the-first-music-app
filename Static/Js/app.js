// Change select option from dropdown
function optionChanged() {
  
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node();
    
    // Assign the dropdown menu option to a variable
    var selectedOption = dropdownMenu.value;

    console.log(selectedOption);
};

// Get unique years
function getUniqueYear(data) {
    years = _.uniq(data.map(data => data.year))
    console.log(years)
    return years
};

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
  });