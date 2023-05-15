function parameterFilter(row) {
    return row.Fuel == "Electricity" || row.Fuel == "Hydrogen" &&  
           row.VehClass == "COMPACT" || row.Fuel == "SUV" || row.Fuel == "VAN" || row.Fuel == "MID-SIZE" || row.Fuel == "FULL-SIZE" || row.Fuel == "TRUCK"; 
    };
    
    // create a function to load the csv file and plot the charts
    function createChart() {
    d3.csv("../../Data/EVData.csv").then(function(data) {
    // filter results
    let filterResult = data.filter(parameterFilter);
    // group the data by year and get the mean, max and min values for each group
    let groupedData = d3.nest()
    .key(function(d) { return d.year; })
    .rollup(function(v) { return {
    mean: d3.max(v, function(d) { return parseFloat(d.CmbMPG); }),
    max: d3.mean(v, function(d) { return parseFloat(d.CmbMPG); }),
    min: d3.min(v, function(d) { return parseFloat(d.CmbMPG); })
    }; })
    .entries(filterResult);
    
    // create three traces for mean, max and min values
    let trace1 = {
    y: groupedData.map(entry => entry.value.mean),
    x: groupedData.map(entry => entry.key),
    type: "bar",
    name: "max",
    marker: {
    color: "green"
    }
    };
    
    let trace2 = {
    y: groupedData.map(entry => entry.value.max),
    x: groupedData.map(entry => entry.key),
    type: "bar",
    name: "mean",
    marker: {
    color: "red"
    }
    };
    
    let trace3 = {
    y: groupedData.map(entry => entry.value.min),
    x: groupedData.map(entry => entry.key),
    type: "bar",
    name: "Min",
    marker: {
    color: "blue"
    }
    };
    
    // data trace array
    let traceData = [trace1, trace2, trace3];
    
    // apply the title and set the barmode to group
    let layout = {
    title: "Combined MPG over the Years (EV)",
    plot_bgcolor:"white",
    paper_bgcolor:"black",
    font:{color:"white"},
    barmode:"group",
    xaxis: {
     title: "Year"
    },
    yaxis: {
     title: "Fuel Consumption (MPG)"
    },
    legend: {
     font: {
      color: "white"
     }
    }
    };
    
    // render the plot to Plotly using newPlot function
    Plotly.newPlot("plot1", traceData, layout);
    });
   
    d3.csv("../../Data/EVData.csv").then(function(data) {
        // filter results
        let filterResult = data.filter(parameterFilter);
        // group the data by year and get the mean, max and min values for each group
        let groupedData = d3.nest()
        .key(function(d) { return d.year; })
        .rollup(function(v) { return {
        mean: d3.max(v, function(d) { return parseFloat(d["CO2Emissions(g/m)"]); }),
        max: d3.mean(v, function(d) { return parseFloat(d["CO2Emissions(g/m)"]); }),
        min: d3.min(v, function(d) { return parseFloat(d["CO2Emissions(g/m)"]); })
        }; })
        .entries(filterResult);
        
        // create three traces for mean, max and min values
        let trace1 = {
        y: groupedData.map(entry => entry.value.mean),
        x: groupedData.map(entry => entry.key),
        type: "bar",
        name: "max",
        marker: {
        color: "green"
        }
        };
        
        let trace2 = {
        y: groupedData.map(entry => entry.value.max),
        x: groupedData.map(entry => entry.key),
        type: "bar",
        name: "mean",
        marker: {
        color: "red"
        }
        };
        
        let trace3 = {
        y: groupedData.map(entry => entry.value.min),
        x: groupedData.map(entry => entry.key),
        type: "bar",
        name: "Min",
        marker: {
        color: "blue"
        }
        };
        
        // data trace array
        let traceData = [trace1, trace2, trace3];
        
        // apply the title and set the barmode to group
        let layout = {
        title: "CO2 Emission (Gram/Mile) over the Years (EV)",
        plot_bgcolor:"white",
        paper_bgcolor:"black",
        font:{color:"white"},
        barmode:"group",
        xaxis: {
         title: "Year"
        },
        yaxis: {
         title: "CO2 Emission (Gram/Mile)"
        },
        legend: {
         font: {
          color: "white"
         }
        }
        };
        
        // render the plot to Plotly using newPlot function
        Plotly.newPlot("plot2", traceData, layout);
        });


















 
        };
        
        //call the createChart function
        createChart();
       
       // create a 2 x 2 subplot grid with white lines between them
       fig = make_subplots(rows=2, cols=2, vertical_spacing=0.1, horizontal_spacing=0.1)
       fig.update_layout(plot_bgcolor="white")