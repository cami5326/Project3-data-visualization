// create a function to hold the filter params
function parameterFilter(row)
{
    //return row.parameter == "EV sales" &&
    return row.parameter == "Oil displacement, million lge" &&
    row.region == "World" &&
    row.mode =="Cars" &&
    row.powertrain =="EV" &&
    row.category =="Historical"     
};
// create a function to load the csv file and plot the charts
function createChart(){
d3.csv("dataset.csv").then(function(data){
// filter results
    let filterResult = data.filter(parameterFilter);
//console.log(filterResult.map(entry => parseFloat(entry.value)))
    let trace = {
        y: filterResult.map(entry => parseFloat(entry.value)),
        x: filterResult.map(entry => entry.year),
        type: "line"  
    };
    console.log(trace)
// data trace array
    let traceData = [trace];
// apply the title
    let layout = {
        title: "Oil displacement Over the Years"
    };
// render the plot to Plotly
    Plotly.newPlot("plot1", traceData, layout);
})
};
//call the function
createChart();
