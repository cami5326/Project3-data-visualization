// make a function that intializes the data
function printData()
{
    // load the data
    d3.json("samples.json").then(function(data){
        // Get the selected value from the dropdown menu
        const selectedValue = document.getElementById("selDataset").value;

        // Filter the data based on the selected value
        const filteredData = data.metadata.filter(function(d) {
            return d.id === parseInt(selectedValue);
        });
                
        // Access the HTML element
        const dataDiv = document.getElementById("sample-metadata");

        // Update the HTML element with the value of the "name" key
        dataDiv.innerHTML = 
          'ID: ' + filteredData[0].id + '<br>' +
          'Ethnicity: ' + filteredData[0].ethnicity + '<br>' +
          'Gender: ' + filteredData[0].gender + '<br>' +
          'Age: ' + filteredData[0].age + '<br>' +
          'Location: ' + filteredData[0].location + '<br>' +
          'bbtype: ' + filteredData[0].bbtype + '<br>' +
          'wfreq: ' + filteredData[0].wfreq;

        // console.log(selectedValue);
        });
}

// call on d3 selector associate the dropdown with an object
// d3.selectAll("#selDataset").on("change", printData);

// call printData()
printData();