//  This is a bar chart that uses the EIA data
//  It can sort or slice by Country, Vehicle Type, Hirstorical/Projected and 
//  and provide output by Electircity Demand, EV Charge Points, EV Sales, EV Sales Share, 
function plot2()
{
    // load the data and load the charts
    d3.csv("../../Data/dataset.csv").then(function(data){
        // console.log(data)
        // Get the selected value from the dropdown menu
        const selectedValueRegion = document.getElementById("selDataset").value;
        const selectedValueParameter = "Oil displacement Mbd"
        const selectedValueMode = document.getElementById("selDatasetMode").value
        const selectedValuePowertrain = "EV"
        const selectedValueCategory = "Historical"

        // Filter the data based on the selected values
        const filteredData = data.filter(function(d) {
            return d.region === selectedValueRegion &&
                    d.parameter === selectedValueParameter && 
                    d.mode === selectedValueMode && 
                    d.powertrain === selectedValuePowertrain && 
                    d.category === selectedValueCategory;
        });
        
        console.log(filteredData)

        // define the plot data
        let x = filteredData.map(d => d.year);
        let y = filteredData.map(d => d.value);
        // let label = filteredData[0].otu_labels.slice(0, 10).reverse();

        // generate the trace
        trace = {
            x: x,
            y: y,
            // hovertext: label,
            type: "line",
            orientation: "v"
        }
    
        traceData = [trace];
        
        // definte the layout
        layout = {
            title: "Oil Displacement by Year",
            xaxis: { title: "Year", tickangle: 270, tickmode: 'linear' },
            yaxis: { title: "Oil Displacement (Mbd)"},
            autosize: true,
            width: 1000,
            height: 500
        }
        
        // plot using plotly
        Plotly.newPlot("oilPlot", traceData, layout);   
    });
}

// call plot2() to generate the initialization plot
plot2();