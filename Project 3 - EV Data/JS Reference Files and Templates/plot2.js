// make a function that intializes the plot
function plot()
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
        let x = filteredData[0].otu_ids;
        let y = filteredData[0].sample_values;
        let size = filteredData[0].sample_values;
        let color = filteredData[0].otu_ids;
        let label = filteredData[0].otu_labels;
        
        // generate the trace
        trace = {
            x: x,
            y: y,
            hovertext: label,
            mode: 'markers',
            marker: {
                size: size,
                color: color,
                colorscale: 'Viridis'
            }
        };
    
        traceData = [trace];
        
        // define the plot layout
        layout = {
            title: "All OTU IDs and Sample Values",
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" }
        }
    
        // generate the plot using plotly
        Plotly.newPlot("bubblePlot", traceData, layout);   
    });
}

// call on d3 selector associate the dropdown with an object
// d3.selectAll("#selDataset").on("change", plot);

// call plot() to initialize
plot();