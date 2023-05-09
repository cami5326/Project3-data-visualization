//  This is a bar chart that uses the EIA data
//  It can sort or slice by Country, Vehicle Type, Hirstorical/Projected and 
//  and provide output by Electircity Demand, EV Charge Points, EV Sales, EV Sales Share, 
function init()
{
    // load the data and load the charts
    d3.csv("dataset.csv").then(function(data){
        // console.log(data)
        // Get the selected value from the dropdown menu
        // const selectedValue = document.getElementById("selDataset").value;
        const selectedValueRegion = document.getElementById("selDataset").value;
        const selectedValueParameter = "EV sales"
        const selectedValueMode = "Cars"
        const selectedValuePowertrain = "BEV"
        const selectedValueCategory = "Historical"



        // Filter the data based on the selected values
        const filteredData = data.filter(function(d) {
            return d.region === selectedValue &&
                    d.parameter === selectedValueParameter && 
                    d.mode === selectedValueMode && 
                    d.powertrain === selectedValuePowertrain && 
                    d.category === selectedValueCategory;
        });

        // Group the filtered data and sum the value column
        /*const groupedData = filteredData.reduce((acc, obj) => {
            const key = obj.year;
            if (!acc[key]) {
              acc[key] = { count: 0, sum: 0 };
            }
            acc[key].count++;
            acc[key].sum += obj.score;
            return acc;
          }, {});
          */
        
          console.log(filteredData)

        // define the plot data
        // let x = filteredData[0].sample_values.slice(0, 10).reverse();
        // let y = filteredData[0].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        // let label = filteredData[0].otu_labels.slice(0, 10).reverse();
        let x = filteredData.map(d => d.year);
        let y = filteredData.map(d => d.value);
        // let label = filteredData[0].otu_labels.slice(0, 10).reverse();

        
        // generate the trace
        trace = {
            x: x,
            y: y,
            // hovertext: label,
            type: "bar",
            orientation: "v"
        }
    
        traceData = [trace];
        
        // definte the layout
        layout = {
            title: "EV Sales by Year",
            xaxis: { title: "Year" },
            yaxis: { title: "EV Sales"}
        }
        
        // plot using plotly
        Plotly.newPlot("barPlot", traceData, layout);   
    });
}

// call init() to generate the initialization plot
init();