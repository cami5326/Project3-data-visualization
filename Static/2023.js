/*
d3.csv("dataset.csv", function(data){
    console.log(data)
});
*/

var CarInfo = {
    ACURA: {
        Integra: {
            "SCV-7": ["269"],
            "Man-6": ["293", "277"]
        },
        MDX: {
            "SemiAuto-10": ["411", "423", "474"]
        },
        RDX: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        }
    },
    "ASTON MARTIN": {
        DBS: {
            "Auto-8": ["252"]
        },
        DBX: {
            "Auto-9": ["536", "556"]
        },
        Vantage: {
            "Auto-8": ["548", "435"]
        }
    },
    "AUDI": {
        A3: {
            "SCV-7": ["269"],
            "Man-6": ["293", "277"]
        },
        A4: {
            "SemiAuto-10": ["411", "423", "474"]
        },
        A5: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        },
        A6: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        },
        A7: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        },
        A8: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        },
        Q3: {
            "SemiAuto-10": ["370", "385", "375", "388"]
        }
    }
}

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

        for(let make in CarInfo){
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

            for(let model in CarInfo[e.target.value]){
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

            for(let transmission in CarInfo[selectMake.value][e.target.value]){
                console.log(transmission);
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

            let combCO2 = CarInfo[selectMake.value][selectModel.value][e.target.value]

            for(let i=0; i<combCO2.length; i++){
                displayCombinedCO2.options[displayCombinedCO2.options.length] = new Option(combCO2[i], combCO2[i])
            }
        }
}