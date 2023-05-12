// make a function that intializes the plot
function plotGauge()
{
    // load the data and load the charts
    d3.csv("../../Data/dataset.csv").then(function(data){
        // console.log(data)
        // Get the selected value from the dropdown menu
        const selectedValueRegion = document.getElementById("selDataset").value;
        const selectedValueParameter = "EV sales share"
        const selectedValueMode = document.getElementById("selDatasetMode").value
        const selectedValuePowertrain = "EV"
        const selectedValueCategory = "Historical"
        const selectedValueYear = "2022"

        // Filter the data based on the selected values
        const filteredData = data.filter(function(d) {
            return d.region === selectedValueRegion &&
                    d.parameter === selectedValueParameter && 
                    d.mode === selectedValueMode && 
                    d.powertrain === selectedValuePowertrain && 
                    d.category === selectedValueCategory &&
                    d.year === selectedValueYear;
        });


        // get the wash frequency based on the selected dropdown value
        EVshare = filteredData[0].value
        
        // Set up the data and layout for the gauge chart
        data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: EVshare,
                gauge: {
                    axis: { range: [null, 100] },
                    bar: { color: "darkblue" },
                    steps: [
                    { range: [0, 10], color: "lightgray" },
                    { range: [10, 20], color: "gray" },
                    { range: [20, 30], color: "lightgreen" },
                    { range: [30, 40], color: "green" },
                    { range: [40, 50], color: "yellow" },
                    { range: [50, 60], color: "orange" },
                    { range: [60, 70], color: "red" },
                    { range: [70, 80], color: "darkred" },
                    { range: [80, 90], color: "maroon" },
                    { range: [80, 90], color: "black" }
                    ]
                }
            }
        ];
        
        // define the plot layout
        layout = {
            title: {
            text: "Cumulative EV Sales Share by 2022 (%)",
            autosize: true,
            width: 200,
            height: 200
            }
        };
        
        // generate the plot using plotly
        Plotly.newPlot("gaugePlot", data, layout);   
    });
}

// call plot() to initialize
plotGauge();