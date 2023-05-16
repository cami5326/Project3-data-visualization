// define the function that filters the data
function parameterFilter(row) {
    return row.Fuel == "Electricity" || row.Fuel == "Hydrogen" 
   };
   
   // create a function to load the csv file and plot the charts
   function createChart() {
    d3.csv("../../Data/EVData.csv").then(function(data) {
    // filter results
    let filterResult = data.filter(parameterFilter);
    // remove the two-seater and special purpose vehicle from the results
    filterResult = filterResult.filter(row => row.VehClass != "TWO-SEATER" && row.VehClass != "SPECIAL PURPOSE VEHICLE");
    // group the data by year and get the mean value for each group
    let groupedData = d3.nest()
    .key(function(d) { return d.VehClass; })
    .rollup(function(v) { return {
    mean: d3.mean(v, function(d) { return parseFloat(d.CmbMPG); })
    }; })
    .entries(filterResult);
    
    // create one trace for mean value
    let trace1 = {
    y: groupedData.map(entry => entry.value.mean),
    x: groupedData.map(entry => entry.key),
    type: "bar",
    name: "EV",
    marker: {
    color: "red"
    }
    };
    
    // load another data set for car technology
    d3.csv("../../Data/TVData.csv").then(function(tvdata) {
    // group the data by Type and get the mean value for each group
    let groupedData = d3.nest()
    .key(function(d) { return d.Type; })
    .rollup(function(v) { return {
    mean: d3.mean(v, function(d) { return parseFloat(d["FuelConsumptionComb(mpg)"]); })
    }; })
    .entries(tvdata);
    
    // create one trace for mean value
    let trace2 = {
    y: groupedData.map(entry => entry.value.mean),
    x: groupedData.map(entry => entry.key),
    type: "bar",
    name: "TV",
    marker: {
    color: "blue"
    }
    };
    
    // remove 3rd and 7th bar from trace2 array
    trace2.y.splice(3, 1);
    trace2.y.splice(6, 1);
    trace2.x.splice(3, 1);
    trace2.x.splice(6, 1);
    
    // data trace array
    let traceData = [trace1, trace2];
    // apply the title and set the barmode to group
    let layout = {
    title: "Fuel Consumption per Car Type",
    paper_bgcolor:"White",
    font:{color:"Black"},
    barmode:"group",
    xaxis: {
    title: "Car Type",
    categoryorder: 'array',
    categoryarray: ['COMPACT', 'MID-SIZE', 'FULL-SIZE', 'SUV', 'VAN', 'TRUCK']
    },
    yaxis: {
    title: "Average Fuel Consumption (MPG)"
    },
    legend: {
    font: {color: "Black"}
    }
    };

    // render the plot to Plotly using newPlot function with a different div id
    Plotly.newPlot("plot3", traceData, layout);
    });
    });
   };
   //call the createChart function
   createChart();
   