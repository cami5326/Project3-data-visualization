//  This is a bar chart that uses the EIA data
//  It can sort or slice by Country, Vehicle Type, Hirstorical/Projected and 
//  and provide output by Electircity Demand, EV Charge Points, EV Sales, EV Sales Share, 
function init()
{
    // load the data and load the charts
    d3.csv("../../Data/dataset.csv").then(function(data){
        // console.log(data)
        // Get the selected value from the dropdown menu
        const selectedValueRegion = document.getElementById("selDataset").value;
        const selectedValueParameter = "EV sales"
        const selectedValueMode = document.getElementById("selDatasetMode").value
        const selectedValuePowertrain = "BEV"
        const selectedValueCategory = "Historical"

        // Filter the data based on the selected values
        const filteredData = data.filter(function(d) {
            return d.region === selectedValueRegion &&
                    d.parameter === selectedValueParameter && 
                    d.mode === selectedValueMode && 
                    d.powertrain === selectedValuePowertrain && 
                    d.category === selectedValueCategory;
        });

        // Second Filtered data set
        const selectedValueParameter2 = "EV charging points"
        const selectedValueMode2 = "EV"
        const selectedValuePowertrain2 = "Publicly available slow" 
        const selectedValuePowertrain2b = "Publicly available fast"
        const filteredData2 = data.filter(function(d) {
            return d.region === selectedValueRegion &&
                    d.parameter === selectedValueParameter2 && 
                    d.mode === selectedValueMode2 && 
                    d.powertrain === selectedValuePowertrain2 &&
                    d.category === selectedValueCategory;
        });

        // define the plot data
        let x = filteredData.map(d => d.year);
        let y = filteredData.map(d => d.value);
        // define the secondary plot data
        let x2 = filteredData2.map(d => d.year);
        let y2 = filteredData2.map(d => d.value);
        // let label = filteredData[0].otu_labels.slice(0, 10).reverse();
        
        console.log(x2, y2)
        
        // generate the trace
        trace = {
            x: x,
            y: y,
            // hovertext: label,
            name: "EV Sales",
            type: "line",
            orientation: "v"
        }

        // generate the trace
        trace2 = {
            x: x2,
            y: y2,
            name: "EV Charge Points",
            type: "line",
            orientation: "v"
        }
    
        traceData = [trace, trace2];
        
        // definte the layout
        layout = {
            title: "EV Sales by Year",
            xaxis: { title: "Year", tickangle: 270, tickmode: 'linear' },
            yaxis: { title: "EV Sales"},
            yaxis2: {
                title: 'EV Charge Points',
                titlefont: {color: 'orange'},
                tickfont: {color: 'orange'},
                overlaying: 'y',
                side: 'right'
              },
            autosize: true,
            width: 1000,
            height: 500
        }
        
        // plot using plotly
        Plotly.newPlot("barPlot", traceData, layout);   
    });
}

// call init() to generate the initialization plot
init();