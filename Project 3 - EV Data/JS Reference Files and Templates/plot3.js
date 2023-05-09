// make a function that intializes the plot
function plotGauge()
{
    // load the data and load the charts
    // samples.json" from "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json("samples.json").then(function(data){
        // Get the selected value from the dropdown menu
        const selectedValue = document.getElementById("selDataset").value;

        // Filter the data based on the selected value
        const filteredData = data.metadata.filter(function(d) {
            return d.id === parseInt(selectedValue);
        });

        // get the wash frequency based on the selected dropdown value
        wfreq = filteredData[0].wfreq
        
        // Set up the data and layout for the gauge chart
        data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: wfreq,
                gauge: {
                    axis: { range: [null, 9] },
                    bar: { color: "darkblue" },
                    steps: [
                    { range: [0, 1], color: "lightgray" },
                    { range: [1, 2], color: "gray" },
                    { range: [2, 3], color: "lightgreen" },
                    { range: [3, 4], color: "green" },
                    { range: [4, 5], color: "yellow" },
                    { range: [5, 6], color: "orange" },
                    { range: [6, 7], color: "red" },
                    { range: [7, 8], color: "darkred" },
                    { range: [8, 9], color: "maroon" }
                    ]
                }
            }
        ];
        
        // define the plot layout
        layout = {
            title: {
            text: "Washing Frequency"
            }
        };
        
        // generate the plot using plotly
        Plotly.newPlot("gaugePlot", data, layout);   
    });
}

// call on d3 selector associate the dropdown with an object
// d3.selectAll("#selDataset").on("change", plotGauge);

// call plot() to initialize
plotGauge();