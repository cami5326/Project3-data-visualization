function init()
{
    d3.json('../../Data/combined_data.json').then(function(data){
        stateNames = [];
        for (var i = 1; i < Object.keys(data).length+1; i++){
            stateNames.push(data[i].State);
        }
        
        for (i=0; i<stateNames.length; i++)
        {
            $('#selDataset').append($('<option>', {value: stateNames[i], text:stateNames[i]}));
        }

        evSales = [];
        for (var i = 2016; i < 2022; i++){
            evSales.push(data[1][`EV_${i}`]);
        }
        
        evShare =[];
        for (var i = 2016; i < 2022; i++){
            evShare.push(data[1][`EV Share_${i}`]);
        }
        
        outletQuantity = [];
        for (var i = 2016; i < 2022; i++){
            outletQuantity.push(data[1][`Number_of_Outlets_${i}`]);
            console.log(data[1][`Number_of_Outlets_${i}`])
        }
        
        trace1 = {
                x:[2016, 2017, 2018, 2019, 2020, 2021],
                y: evSales,
                name: 'EV Sales',
                type: 'scatter',
                mode: 'lines',
                yaxis: 'y1'
        };

        trace2 ={
                x:[2016, 2017, 2018, 2019, 2020, 2021],
                y: evShare,
                name: '% of Sold EV Cars',
                type: 'scatter',
                mode: 'lines',
                yaxis: 'y2'
        };

        trace3 ={
                x:[2016, 2017, 2018, 2019, 2020, 2021],
                y: outletQuantity,
                name: 'Number of Outlets',
                type: 'scatter',
                mode: 'lines',
                yaxis: 'y3'
        };
        
        // layout1 ={
        //     title: 'EV Sales and Percentage of Sold EV in the USA, per Year',
        //     xaxis: {
        //         title: 'Year'
        //     },
        //     yaxis: {
        //         title: 'Number of Sold EV Cars',
        //         side: 'left',
        //     },
        //     yaxis2: {
        //         title: 'Percentage of Sold EV in the Year (x100)',
        //         side:'right',
        //         overlaying: 'y1',
        //         // range: [0, 3]
        //     },
        //     legend: {
        //         x: 0,
        //         y: 1000,
        //         orientation: 'h'
        //     }
        // };

        layout2 ={
            title: 'EV Sales and Number of Available Charging Outlets in the USA, per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Number of Sold EV Cars',
                side: 'left',
            },
            yaxis3: {
                title: 'Number of Available Charging Outlets',
                side:'right',
                overlaying: 'y1',
                // range: [0, 3]
            },
            legend: {
                x: 0,
                y: 1000,
                orientation: 'h'
            }
        };
        
        // Plotly.newPlot('plot1', [trace1, trace2], layout1);
        Plotly.newPlot('plot2', [trace1, trace3], layout2);
    });
}

    
function optionChanged()
{
    d3.json('../../Data/combined_data.json').then(function(data) {

    let dropdown = d3.select('#selDataset');
    let dataset = dropdown.property('value');
    stateNamess = [];
    for (var i = 1; i < Object.keys(data).length+1; i++){
        stateNamess.push(data[i].State);
    }
 
    let evSalesOption = [];
    let evShareOption = [];
    let outletQuantityOptions = [];
    

    for (var i = 0; i < stateNamess.length; i++)
    {
        selectedState = stateNamess[i];

        if (dataset == selectedState)
        {
            for (var j = 2016; j < 2022; j++){
                evSalesOption.push(data[i+1][`EV_${j}`]);
            }
        
            for (var j = 2016; j < 2022; j++){
                evShareOption.push(data[i+1][`EV Share_${j}`]*100);
            }

            for (var j = 2016; j < 2022; j++){
                outletQuantityOptions.push(data[i+1][`Number_of_Outlets_${j}`]);
                console.log(data[i+1][`Number_of_Outlets_${j}`])
            }
        }
    }
    trace1 = {
        x:[2016, 2017, 2018, 2019, 2020, 2021],
        y: evSalesOption,
        name: 'EV Sales',
        type: 'scatter',
        mode: 'lines',
        yaxis: 'y1'
    };

    trace2 ={
        x:[2016, 2017, 2018, 2019, 2020, 2021],
        y: evShareOption,
        name: '% of Sold EV Cars',
        type: 'scatter',
        mode: 'lines',
        yaxis: 'y2'
    };

    trace3 ={
        x:[2016, 2017, 2018, 2019, 2020, 2021],
        y: outletQuantityOptions,
        name: 'Number of Outlets',
        type: 'scatter',
        mode: 'lines',
        yaxis: 'y3'
    };

    // layout1 ={
    //     title: 'EV Sales and Percentage of Sold EV in the USA, per Year',
    //     xaxis: {
    //         title: 'Year'
    //     },
    //     yaxis: {
    //         title: 'Number of Sold EV Cars',
    //         side: 'left',
    //     },
    //     yaxis2: {
    //         title: 'Percentage of Sold EV in the Year(x100)',
    //         side:'right',
    //         overlaying: 'y1',
    //         // range: [0, 3]
    //     },
    //     legend: {
    //         x: 0,
    //         y: 1000,
    //         orientation: 'h'
    //     }
    // };
    layout2 ={
        title: 'EV Sales and Number of Available Charging Outlets in the USA, per Year',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Number of Sold EV Cars',
            side: 'left',
        },
        yaxis3: {
            title: 'Number of Available Charging Outlets',
            side:'right',
            overlaying: 'y1',
            // range: [0, 3]
        },
        legend: {
            x: 0,
            y: 1000,
            orientation: 'h'
        }
    };

    // Plotly.newPlot('plot1', [trace1, trace2], layout1);
    Plotly.newPlot('plot2', [trace1, trace3], layout2);
    });
}

init();
d3.selectAll("#selDataset").on("optionChanged(this.value)", optionChanged);