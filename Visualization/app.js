function init()
{
    d3.json('data.json').then(function(data){
        // console.log(Object.keys(data).length)
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
            // console.log(data[i])
        }
        // console.log(evSales)
        
        evShare =[];
        for (var i = 2016; i < 2022; i++){
            evShare.push(data[1][`EV Share_${i}`]);
            // console.log(data[i])
        }
        
        // console.log(evShare)
        
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

        layout ={
            title: 'EV Sales and Percentage of Sold EV in the USA, per Year',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Number of Sold EV Cars',
                side: 'left'
            },
            yaxis2: {
                title: 'Percentage of Sold EV in the Year',
                side:'right',
                overlaying: 'y1',
                range: [0, 0.15]
            },
            legend: {
                x: 0,
                y: 1000,
                orientation: 'h'
            }
        };

        Plotly.newPlot('plot', [trace1, trace2], layout);
    });
}

    
function optionChanged()
{
    d3.json('data.json').then(function(data) {
//         // console.log(data);
    let dropdown = d3.select('#selDataset');
    let dataset = dropdown.property('value');
    stateNamess = [];
    for (var i = 1; i < Object.keys(data).length+1; i++){
        stateNamess.push(data[i].State);
    }
    // console.log(stateNamess);
    // console.log(dataset);
    let evSalesOption = [];
    let evShareOption = [];
    

    for (var i = 0; i < stateNamess.length; i++)
    {
        selectedState = stateNamess[i];
        // console.log(i);
        // console.log(stateNamess[i]);
        if (dataset == selectedState)
        {
            // console.log(selectedState);
            // let fff = selectedState;
            // console.log(i);
            for (var j = 2016; j < 2022; j++){
            evSalesOption.push(data[i+1][`EV_${j}`]);
            // console.log(data[i])
            }
        // console.log(evSales)
        
            for (var j = 2016; j < 2022; j++){
            evShareOption.push(data[i+1][`EV Share_${j}`]);
            // console.log(data[i])
            }
            // console.log(evSalesOption);
            // console.log(evShareOption);
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

    layout ={
        title: 'EV Sales and Percentage of Sold EV in the USA, per Year',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Number of Sold EV Cars',
            side: 'left',
        },
        yaxis2: {
            title: 'Percentage of Sold EV in the Year',
            side:'right',
            overlaying: 'y1',
            range: [0, 3]
        },
        legend: {
            x: 0,
            y: 1000,
            orientation: 'h'
        }
    };

    Plotly.newPlot('plot', [trace1, trace2], layout);
    });
}


init();
d3.selectAll("#selDataset").on("optionChanged(this.value)", optionChanged);