// make a function that intializes the plot
function init()
{
    // load the data and load the charts
    // samples.json" from "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json("samples.json").then(function(data){
        // Get the selected value from the dropdown menu
        const selectedValue = document.getElementById("selDataset").value;

        // Filter the data based on the selected value
        const filteredData = data.samples.filter(function(d) {
            return d.id === selectedValue;
        });

        // define the plot data
        let x = filteredData[0].sample_values.slice(0, 10).reverse();
        let y = filteredData[0].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let label = filteredData[0].otu_labels.slice(0, 10).reverse();
        
        // generate the trace
        trace = {
            x: x,
            y: y,
            hovertext: label,
            type: "bar",
            orientation: "h"
        }
    
        traceData = [trace];
        
        // definte the layout
        layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: ""}
        }
        
        // plot using plotly
        Plotly.newPlot("barPlot", traceData, layout);   
    });
}

// call on d3 selector associate the dropdown with an object
// d3.selectAll("#selDataset").on("change", init);

// call init() to generate the initialization plot
init();