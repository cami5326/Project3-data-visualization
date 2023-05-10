// create a function to hold the filter parameters
function parameterFilter(row)
{
    return row.parameter == "Oil displacement Mbd" &&
    row.region == "World" &&
    row.mode =="Cars" &&
    row.powertrain =="EV" &&
    row.category =="Historical"    
};
// create a function to load the csv file and plot the charts
function createChart(){
    d3.csv("../../Data/dataset.csv").then(function(data){
// filter results
    let filterResult = data.filter(parameterFilter);
 // group the data by year and get the maximum value for each group
    let groupedData = d3.nest()
    .key(function(d) { return d.year; })
    .rollup(function(v) { return d3.max(v, function(d) { return parseFloat(d.value); }); })
    .entries(filterResult);
//create graph
let trace = {
 y: groupedData.map(entry => entry.value),
 x: groupedData.map(entry => entry.key),
 type: "line"  
};
// data trace array
    let traceData = [trace];
// apply the title
    let layout = {
        title: "Global Oil displacement Over the Years: EV Cars",
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "Oil Displacement (Million Barrels per Day)"
        }
    };
// render the plot to Plotly
    Plotly.newPlot("plot1", traceData, layout);
})
};
//call the createChart function
createChart();