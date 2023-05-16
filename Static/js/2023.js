
let nestedCarInfo = {};

d3.csv('../../Data/all_alpha_23.csv').then(data => {
    data.forEach(row => {
        const make = row.Make;
        const model = row.Model;
        const trans = row.Trans;
        const combCO2 = +row['Comb CO2'];

        if (!nestedCarInfo.hasOwnProperty(make)) {
            nestedCarInfo[make] = {};
        }

        if (!nestedCarInfo[make].hasOwnProperty(model)) {
            nestedCarInfo[make][model] = [];
        }

        if (!nestedCarInfo[make][model].hasOwnProperty(trans)) {
            nestedCarInfo[make][model][trans] = [];
        }

        nestedCarInfo[make][model][trans].push(combCO2);
    });

    console.log(nestedCarInfo);

    

window.onload = function(){
    const selectMake = document.getElementById('make'),
        selectModel = document.getElementById('model'),
        selectTransmission = document.getElementById('transmission'),
        displayCombinedCO2 = document.getElementById('combinedCO2'),
        select = document.querySelectorAll('select')

        selectModel.disabled = true
        selectTransmission.disabled = true
        displayCombinedCO2.disabled = true

        select.forEach(select => {
            if(select.disabled == true){
                select.style.cursor = "auto"
            }
            else{
                select.style.cursor = "pointer"
            }
        })

        for(let make in nestedCarInfo){
            //console.log(make);
            selectMake.options[selectMake.options.length] = new Option(make, make)
        }

        selectMake.onchange = (e) =>{
            selectModel.disabled = false
            selectTransmission.disabled = true
            displayCombinedCO2.disabled = true

            select.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectModel.length = 1
            selectTransmission.length = 1
            displayCombinedCO2.length = 1

            for(let model in nestedCarInfo[e.target.value]){
                //console.log(model);
                selectModel.options[selectModel.options.length] = new Option(model, model)
            }
        }

        selectModel.onchange = (e) =>{
            selectTransmission.disabled = false
            displayCombinedCO2.disabled = true

            select.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            selectTransmission.length = 1
            displayCombinedCO2.length = 1

            for(let transmission in nestedCarInfo[selectMake.value][e.target.value]){
                //console.log(transmission);
                selectTransmission.options[selectTransmission.options.length] = new Option(transmission, transmission)
            }
        }

        selectTransmission.onchange = (e) =>{
            displayCombinedCO2.disabled = false

            select.forEach(select => {
                if(select.disabled == true){
                    select.style.cursor = "auto"
                }
                else{
                    select.style.cursor = "pointer"
                }
            })

            displayCombinedCO2.length = 1

            let combCO2 = nestedCarInfo[selectMake.value][selectModel.value][e.target.value]

            for(let i=0; i<combCO2.length; i++){
                displayCombinedCO2.options[displayCombinedCO2.options.length] = new Option(combCO2[i], combCO2[i])
            }
        }
}
}
);