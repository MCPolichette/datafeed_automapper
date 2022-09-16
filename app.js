function readFile(input) {
    clearAll()
    let file = input.files[0];
    let fileReader = new FileReader();
    let allLines = []
    fileReader.readAsText(file);
    fileReader.onload = function () {
        var text = fileReader.result;
        var allLines = text.split('\n')
        console.log(allLines.length)
        var validInput = allLines[0]
        addNote(allLines.length + " rows detected")
        if (validInput) { }
        else {
            console.log('NOTHING in INPUT.  Using Test an internal example');
            var validInput = exampleColumns
            addNote('Nothing is in the input. Using test data from an internal example')
        };
        // BUILD ARRAYS TO WORK WITH
        var merchantsArr = //Reference to the Merchant's actual dataset in an array
            stringToArray(validInput).split(/\t/g);
        var merchantRows = {
            row1: stringToArray(allLines[1]).split(/\t/g),
            row2: stringToArray(allLines[2]).split(/\t/g),
            row3: stringToArray(allLines[3]).split(/\t/g),
            row4: stringToArray(allLines[4]).split(/\t/g),
            row5: stringToArray(allLines[5]).split(/\t/g),
            row6: stringToArray(allLines[6]).split(/\t/g),
        }
        console.log(merchantRows)
        var firstArray = //First step in building an array from Merchant Data (removing delimiters, any capitalizations and repetitive values)
            validInput.toLowerCase()
                .replaceAll("'", '')
                .replaceAll('"', '')
                .replaceAll(',', /\t/g)
                .replaceAll("|", /\t/g)
                .replaceAll('-', '')
                .replaceAll('_', '')
                .replaceAll(' ', '')
                .replaceAll('item', '')
                .replaceAll('product', '')
                .replaceAll('\r', '')
                .split(/\t/g);
        console.log(firstArray)
        if (merchantsArr.indexOf("product" || "item")) {// quickly check to see if the Merchant used 'product' or 'item' to define the product name, and ensure its placed in the array
            let i = merchantsArr.indexOf("product");
            let j = merchantsArr.indexOf("item")
            firstArray[i] = 'name'; firstArray[j] = 'name';
        }
        var arrayMap = //The map that will eventually be converted into finished product
            new Array(firstArray.length)
        // Run Fields
        console.log(firstArray)
        var deptCheck = determinePotentialDepartments(firstArray, arrayMap)
        var requiredFieldMap = (determineRequiredFields(firstArray, arrayMap));
        var additionalFieldMap = (determineOtherFields(firstArray, requiredFieldMap));
        var attributefieldbuilderMap = (determineCommonStrAttributes(firstArray, additionalFieldMap));
        var pipeMap = (checkRequiredFields(attributefieldbuilderMap));
        revealHidden('buttonPipeCopy')
        duplicateCheck(pipeMap);
        document.getElementById("pipeDisplay").innerHTML = pipeMap.toString().replaceAll(',', '|');
    };
    fileReader.onerror = function () {
        alert(fileReader.error);
    };
};