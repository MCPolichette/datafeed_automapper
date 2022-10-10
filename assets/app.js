var feedfile = {
    map: [],
    merchant_layout: [],
    data_rows: [],
    variant_map: [],
    map_for_variants: [],
    blank_columns: [],
    file_type: ''
};
is_variant = false;
allLines = [];
is_editing = false;
function delete_this_function() {
    // !? WILL PLAY WITH THIS LATER WHEN CLEANING UP
    // fetch('./data.json')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    // ===========================================================
    // feedfile.map = exampleColumns;
    // determine_fields(exampleColumns)
};
function determine_fields(arr) {
    console.log(arr)
    arr.forEach((array_element, index) => {
        feedfile.map[index] = '' //resets the index as a string
        fields.all.forEach(field_object =>
            field_object.matches.forEach(field_object_type => {
                if (field_object_type === array_element) {
                    feedfile.map[index] = field_object.field_name;
                    feedfile.map_for_variants[index] = field_object.field_name;
                    feedfile.variant_map[index] = field_object.variant
                    if (field_object.variant) {
                        feedfile.variant_map[index] = field_object.variant;
                    }
                    else { feedfile.variant_map[index] = ''; };
                };
            }));
    });
    make_map_for_variants();
    check_required_fields();
};
function make_map_for_variants() {
    feedfile.map_for_variants = new Array(feedfile.map.length)
    for (i = 0; i < feedfile.map_for_variants.length; i++) {
        feedfile.map_for_variants[i] = feedfile.map[i]
        if (feedfile.map_for_variants[i] == 'strProductSKU') {
            feedfile.map_for_variants[i] = 'strAttribute1'
            feedfile.variant_map[i] = 'variant-sku'
            var t = i
        } if ((feedfile.map_for_variants[i] == 'strAttribute1') && (t != i)) {
            feedfile.map_for_variants[i] = 'strProductSKU'
            feedfile.variant_map[i] = 'strProductSKU'
        }
    };
};
function check_required_fields() { //REVIEW THE determinePotentialDepartmentsFunction.  The answer is in there
    let required = fields.required;
    let map = feedfile.map;
    let stop_for_loop = 100; //This is a totally Lazy way, but super successfull way to do this. 
    required.forEach((field, index) => {
        if (map.includes(field.field_name)) {
            console.log(field.field_name, " is present")
        } else {
            for (i = 0; i < field.back_up.length; i++) {
                if (map.includes(field.back_up[i])
                ) {
                    x = map.indexOf(field.back_up[i])
                    feedfile.map[x] = field.field_name;
                    i = stop_for_loop
                };
            };
        };
    });
    required.forEach((field) => {
        if (map.includes(field.field_name)) { }
        else {
            let standard_suggestion = {
                suggestion: 'Try using the adjust mapping button, to insert this required field above.'
            };
            switch (field.field_name) {
                case 'strDepartment':
                    add_error('unable to map a column for Department', [
                        standard_suggestion,
                        {
                            suggestion: 'Force all items to have a "General" Department label upon import',
                            button: true,
                            suggestion_type: 'field_builder',
                            suggestion_field: "strDepartment",
                            suggestion_equals: "General",
                            suggestion_statement_1: "If no Departments are available, you can use the FieldBuilder Tab to set all item's department to a chosen value.  In the example below I have set it to 'General'.",
                            suggestion_statement_2: "Depending on the Merchant, you can choose another term, such as 'Sunglasses', 'Fishing Products' or 'Wigs for Dogs' (i.e. whatever you want) if all the products fit a particular Categorization."
                        }
                    ])
                    break
                case "strProductSKU":
                    add_error('unable to map a column for ProductSKU', [
                        standard_suggestion
                        ,])
                    break
                case 'strProductName':
                    add_error('unable to map a column for ProductName', [
                        standard_suggestion,
                        {
                            suggestion: "Force all items to have the Product Name, just match the Product's SKU",
                            button: true,
                            suggestion_type: 'field_builder',
                            suggestion_field: "strProductName",
                            suggestion_equals: "%%strProductSKU%%",
                            suggestion_statement_1: "In the example below, we set the Product Name to MATCH the Product SKU for ALL ITEMS",
                            suggestion_statement_2: "This should be never really be used.  Merchants should have product names."
                        }
                    ])
                    break
                case 'dblProductPrice':
                    add_error('unable to map a column for ProductPrice', [
                        standard_suggestion
                        ,])
                    break
                case 'strLargeImage':
                    add_error('unable to map a column for LargeImage', [
                        standard_suggestion,
                        {
                            suggestion: "Force all items to use the merchant's logo URL, so that it can be imported",
                            button: true,
                            suggestion_type: 'field_builder',
                            suggestion_field: "strLargeImage",
                            suggestion_equals: "https://www.cat-pajamas.net/crazycatlogo.png/",
                            suggestion_statement_1: "If no Image URLs are available, you can use the FieldBuilder Tab to set all item's images to just display to the Merchant's logo.  In the example below I have set it to an image URL for all items.",
                            suggestion_statement_2: "This should be considered a 'last-ditch' solution.  Merchants really should be provided product Image URLs."
                        }
                    ])
                    break
                case 'txtLongDescription':
                    add_error('unable to map a column for LongDescription', [
                        standard_suggestion,
                        {
                            suggestion: "Force all items to have the product's Name as the description, so that it can be imported",
                            button: true,
                            suggestion_type: 'field_builder',
                            suggestion_field: "txtLongDescription",
                            suggestion_equals: "%%strProductName%%",
                            suggestion_statement_1: "If no descriptions are available, you can use the FieldBuilder Tab to set all item's descriptions to match another value.  In the example below I have set it to just capture that item's product Name.",
                            suggestion_statement_2: "Depending on the Merchant, you can choose another term, such as 'Sunglasses', 'Fishing Products' or 'Wigs for Dogs' (i.e. whatever you want) if all the products fit a particular Categorization."
                        }
                        ,])
                    break
                case 'strBuyURL':
                    add_error('unable to map a column for BuyURL', [
                        standard_suggestion,
                        {
                            suggestion: "Force all items to link to the merchant's home-page, so that it can be imported",
                            button: true,
                            suggestion_type: 'field_builder',
                            suggestion_field: "strBuyURL",
                            suggestion_equals: "https://www.WigsForDogs.com",
                            suggestion_statement_1: "If no URLs are available, you can use the FieldBuilder Tab to set all item's BUY_URLs to just direct to the Merchant's website.  In the example below I have set it apply the primary URL for all items..",
                            suggestion_statement_2: "This should be considered a 'last-ditch' solution.  Merchants really should be provided product URLs."
                        }
                        ,])
                    break
            }
        };
    });
    console.log(feedfile);
    build_pipe_display();
    build_mapped_table("standard");
};
function duplicate_check(map) {
    console.log("checking for duplicates")
    for (i = 0; i < map.length; i++) {
        for (j = i + 1; j < map.length; j++) {
            if (map[i] == map[j]) {
                addError("Found a duplicate match for " + map[i], " at index's " + i + " & " + j + " one will need to be deleted");
                return;
            };
        };
    };
};
function check_variant_mapping() {
    if (feedfile.map.includes("strAttribute1")) {
        is_variant = true
        // reveal_hidden('variant-toggle')
    };
};
function is_editing_toggle() {
    if (is_editing) {
        is_editing = false;
        // document.getElementById('editor_warning').hidden = true
    }
    else {
        is_editing = true;
        // document.getElementById('editor_warning').hidden = false
    }
    if (is_variant) {
        build_mapped_table('variant');
    } else {
        build_mapped_table('standard');
    };
};
function variant_toggle() {
    if (is_editing) { is_editing_toggle() }
    if (is_variant) {
        build_mapped_table('standard');
        build_pipe_display('standard');
        document.getElementById('copy_second_map').classList.add("disabled")
        document.getElementById('secondary_mapping_image').hidden = true
        document.getElementById('variant-toggle').innerHTML = "View Variant Map"
        is_variant = false
    } else {
        build_mapped_table('variant');
        build_pipe_display('variant');
        document.getElementById('copy_second_map').classList.remove("disabled")
        document.getElementById('secondary_mapping_image').hidden = false
        document.getElementById('variant-toggle').innerHTML = "View Standard Map"
        is_variant = true
    };
};

function build_mapped_table(table_type) {
    var table = document.getElementById("table_map");
    table.innerHTML = ''
    table.classList.add('vertical-align')
    table.style.textAlign = 'center';
    var tableHead = document.createElement('thead');
    let merchant_row = table.insertRow(0);
    let map_row = table.insertRow(1)
    let merchant_title = merchant_row.insertCell(0).innerHTML = "Merchant's column format";
    let map_title = map_row.insertCell(0).innerHTML = "Calculated Map:";
    feedfile.merchant_layout.forEach((field, i) => {
        let merchant_cell = merchant_row.insertCell(i + 1).innerHTML = field
    });
    switch (table_type) {
        case 'variant':
            feedfile.map_for_variants.forEach((field, i) => {
                let map_cell = map_row.insertCell(i + 1).innerHTML = field
                if (is_editing) { build_select_options(i) }
            });
            let variant_row = table.insertRow(2)
            let variant_title = variant_row.insertCell(0).innerHTML = "Variant Map:";
            feedfile.variant_map.forEach((field, i) => {
                let variant_cell = variant_row.insertCell(i + 1).innerHTML = field
            });
            build_pipe_display('variant')

            break
        case 'standard':
            feedfile.map.forEach((field, i) => {
                let map_cell = map_row.insertCell(i + 1).innerHTML = field
                build_pipe_display('standard')
                if (is_editing) { build_select_options(i) }
            });
            break
    };

    // Identifies empty columns, and highlights header row accordingly.
    table.rows[0].classList.add('table-info', 'h5')
    if (feedfile.blank_columns.length > 0) {
        feedfile.blank_columns.forEach((empty_column) => {
            table.rows[0].cells[empty_column + 1].classList.add('table-warning');
            table.rows[0].cells[empty_column + 1].insertAdjacentHTML("beforeend", "<br><small>(empty column)</small>");
        });
    };
    for (k = 0; k < table.rows.length; k++) {
        table.rows[k].cells[0].classList.add('table-primary', 'h6')
    }
    if (feedfile.map.includes('strAttribute1')) {
        reveal_hidden(['variant-toggle'])
    };
    reveal_hidden(['post_upload_display', 'refresh_page']);
    hide(['file_input']);
};
function build_select_options(i) {
    if (is_variant) {
        var use_this_map = feedfile.map_for_variants;
    } else {
        var use_this_map = feedfile.map;
    };
    var table = document.getElementById("table_map");
    var selection = document.createElement('select')
    selection.id = ('MapAdjuster_' + i)
    selection.setAttribute("onchange", 'update_map(this.value,this.options[0].value,' + i + ')');
    var option = document.createElement('option')
    option.value = use_this_map[i];
    option.text = use_this_map[i];
    var blank_option = document.createElement('option')
    blank_option.text = "BLANK"
    blank_option.value = ''
    selection.add(option)
    selection.add(blank_option)

    for (j = 0; j < fields.all.length; j++) {
        if (fields.all[j].field_name != use_this_map[i]) {//)
            new_option = document.createElement('option')
            new_option.text = fields.all[j].field_name
            new_option.value = fields.all[j].field_name
            if (use_this_map.includes(fields.all[j].field_name)) {
                new_option.disabled = true
            }

            selection.add(new_option)
        }
    }
    // console.log(selection)
    table.rows[1].cells[(i + 1)].insertAdjacentHTML("beforeend", selection.outerHTML);
    selection.selectedIndex = use_this_map.indexOf(use_this_map[i])
};
function update_map(new_value, current_value, index) {
    if (is_variant) {
        var use_this_map = feedfile.map_for_variants;
    } else {
        var use_this_map = feedfile.map;
    };
    console.log(new_value)
    if (new_value.length === 0) {
        feedfile.map[index] = ''
        feedfile.map_for_variants[index] = ''
        feedfile.variant_map[index] = ''
    } else {
        let all = fields.all
        let updated_variant = all.find(x => x.field_name === new_value).variant
        console.log(updated_variant)
        console.log(new_value, current_value, index)
        let standard_map_value = new_value
        if (is_variant) {
            if (new_value === "strAttribute1") {
                standard_map_value = 'strProductSKU'
            } else if (new_value === "strProductSKU") {
                standard_map_value = 'strAttribute1'
            } else standard_map_value = new_value
        }
        feedfile.map[index] = standard_map_value
        feedfile.map_for_variants[index] = new_value
        feedfile.variant_map[index] = updated_variant
    }
    if (is_variant) { build_mapped_table('variant') } else { build_mapped_table('standard') }
    make_map_for_variants()

    console.log(feedfile);
};
function build_pipe_display(type) {
    let pipe_map = '';
    let variant_pipe_map = '';
    switch (type) {
        case 'standard':
            pipe_map = feedfile.map.toString().replaceAll(',', '|');
            console.log('standard', pipe_map)
            break
        case "variant":
            pipe_map = feedfile.map_for_variants.toString().replaceAll(',', '|');
            variant_pipe_map = feedfile.variant_map.toString().replaceAll(',', '|');
            console.log('variant', pipe_map)
            break
    };
    document.getElementById("pipe_display").innerHTML = pipe_map
    document.getElementById('variant_pipe_display').innerHTML = variant_pipe_map
};
function add_note(text, subtext) {
    var noteList = document.getElementById('mapping_notes');
    var newListItem = document.createElement('li');
    newListItem.classList.add("list-group-item");
    newListItem.appendChild(document.createTextNode(text));
    noteList.appendChild(newListItem);
    if (subtext) {
        subtext.forEach(text => {
            var secondaryListItem = document.createElement('div');
            secondaryListItem.classList.add("small");
            secondaryListItem.appendChild(document.createTextNode(" - " + text));
            newListItem.appendChild(secondaryListItem);
        })
    };

};
function add_error(text, subtext, buttonParts) {// Function to Add Line Item Errors
    var errorList = document.getElementById('mapping_errors');
    var newListItem = document.createElement('li');
    newListItem.classList.add("list-group-item", 'position-relative', "list-group-item-danger");
    var buttonListItem = document.createElement('div')
    newListItem.appendChild(document.createTextNode(text));
    if (subtext) {
        subtext.forEach(object => {
            let button_html = document.createElement('div')
            if (object.button) {
                console.log(object)
                switch (object.suggestion_type) {
                    case 'field_builder':
                        let button_display = document.createElement('button');
                        button_display.setAttribute("data-bs-toggle", "modal");
                        button_display.setAttribute('data-bs-target', "#solution-modal")
                        button_display.innerHTML = 'Example';
                        button_display.classList.add('btn-clipboard', 'btn-outline-secondary', 'position-absolute', 'end-0')
                        button_display.onclick = function () {
                            document.getElementById('buildFieldName').value = object.suggestion_field;
                            document.getElementById('buildFieldFormula').value = object.suggestion_equals;
                            document.getElementById('solution-text-1').innerHTML = object.suggestion_statement_1;
                            document.getElementById('solution-text-2').innerHTML = object.suggestion_statement_2;

                        };
                        button_html = button_display
                        break

                }
            }
            var secondaryListItem = document.createElement('div');
            secondaryListItem.classList.add("small");
            secondaryListItem.appendChild(document.createTextNode(" - " + object.suggestion));
            secondaryListItem.appendChild(button_html)
            newListItem.appendChild(secondaryListItem);
        })
    };
    errorList.appendChild(newListItem);
    newListItem.appendChild(buttonListItem);

};
function reveal_hidden(arr) {//Reveals a hidden HTML element.
    arr.forEach(id => {
        let element = document.getElementById(id);
        if (element.hidden) {
            element.removeAttribute('hidden');
        };
    });
};
function hide(arr) {//Reveals a hidden HTML element.
    arr.forEach(id => {
        let element = document.getElementById(id);
        element.hidden = true
    })

};

function check_for_blank_columns(arr, allRows) {
    let delimiter = ''
    let blank_columns = new Array(arr.length)
    for (k = 0; k < arr.length; k++) {
        blank_columns[k] = true;
    }
    console.log(blank_columns)
    switch (feedfile.file_type) {
        case 'text/csv':
            delimiter = ','
            break
        case 'application/vnd.ms-excel':
            delimiter = ','
            break
        case "text/plain":
            if (allRows[0].includes("|")) {
                add_note('Delimiter: Pipes (|)')
                delimiter = '|'
            } else if (allRows[0].includes("\t")) {
                add_note("Delimiter: TABS")
                delimiter = /\t/g
            } else if (allRows[0].includes(",")) {
                add_note("Delimiter: Commas")
                delimiter = ","
            }
    }
    console.log(delimiter)
    if (delimiter == "") { } else {
        console.log(allRows[1])
        for (i = 1; i < allRows.length - 1; i++) {
            let blank_row = new Array()
            let x = allRows[i]
                .replace("\r", "").split(delimiter);
            console.log(x.length)
            if (x.length === blank_columns.length) {
                blank_row.push(x)
                console.log(x)
                for (j = 0; j < blank_columns.length; j++) {
                    if (x[j] != ('')) {
                        blank_columns[j] = false
                    };
                };
            };
        };
    };
    blank_columns.forEach((el, index) => {

        if (el === true) {
            feedfile.blank_columns.push(index)

        }
    })
    console.log(blank_columns);
    console.log(feedfile.blank_columns)
};


// !? All new scripting above this line!

function copyToClipboard(id) {// Create a single text value, to clipboard
    let copy = '';
    if ((document.getElementById(id)) == null) {
        copy = id
    }
    else { copy = document.getElementById(id).innerText };
    navigator.clipboard.writeText(copy);

};
function clearAll() {  // function that clears all elements
    // document.getElementsByClassName('mapView').innerHTML = '';
    // document.getElementsByClassName('table_map').innerHTML = '';
    // is_variant = false;
    // document.getElementById('mapNotes').innerHTML = '';
    // document.getElementById('mapErrors').innerHTML = '';
    // hide(['exampleBuildField'])
};
function addNote(text, subtext) {// Function to Add Line Item Notes
    var noteList = document.getElementById('mapNotes');
    var newListItem = document.createElement('dt');
    newListItem.appendChild(document.createTextNode(text));
    noteList.appendChild(newListItem);
};
function addError(text, subtext, buttonParts) {// Function to Add Line Item Errors
    var errorList = document.getElementById('mapErrors');
    var newListItem = document.createElement('dt');
    var secondaryListItem = document.createElement('dd');
    newListItem.setAttribute('class', 'error')
    var buttonListItem = document.createElement('dd')
    newListItem.appendChild(document.createTextNode(text));
    if (subtext) {
        secondaryListItem.appendChild(document.createTextNode(subtext));
    };
    if (buttonParts) {
        let buttonDisplay = document.createElement('button');
        buttonDisplay.id = buttonParts.errorType;
        buttonDisplay.innerHTML = 'click for example';
        buttonDisplay.onclick = function () {
            document.getElementById('buildFieldName').value = buttonParts.field;
            document.getElementById('buildFieldFormula').value = buttonParts.formula;
            reveal_hidden(['exampleBuildField']);
        };
        buttonListItem.appendChild(buttonDisplay);
    };
    errorList.appendChild(newListItem);
    errorList.appendChild(secondaryListItem);
    errorList.appendChild(buttonListItem);
    reveal_hidden(['errors'])
};


function buttonConstruction(newError, newField, newReplace, newRegex, newReplaceWith) {
    let buttonParts = { //BUILDING Button OBject (parts).. for ERRORS
        errorType: newError,
        formula: newReplace,
        field: newField,
        regex: newRegex,
        replacWith: newReplaceWith,
    };
    return buttonParts
};
function file_data(myFile) {
    var file = myFile.files[0];
    console.log(file)
    feedfile.file_name = file.name.replace(/ *\([^)]*\) */g, "");
    feedfile.file_size = file.size
    feedfile.file_type = file.type
    console.log(feedfile)
};

function readFile(input) {
    file_data(input);

    clearAll();
    let file = input.files[0];
    let fileReader = new FileReader();
    var allLines = [];
    fileReader.readAsText(file);
    fileReader.onload = function () {
        var text = fileReader.result;
        allLines = text.split('\n');
        console.log(allLines.length);
        var validInput = allLines[0];
        add_note('File Data:', ['file Name: ' + feedfile.file_name, 'File Type: ' + feedfile.file_type, 'File size: ' + feedfile.file_size, (allLines.length - 1) + "product rows detected"]);
        // BUILD ARRAYS TO WORK WITH
        feedfile.merchant_layout = //Reference to the Merchant's actual dataset in an array
            validInput
                .replaceAll("'", '')
                .replaceAll('"', '')
                .replaceAll(/\t/g, '<newcolumn>')
                .replaceAll(',', "<newcolumn>")
                .replaceAll("|", "<newcolumn>")
                .split("<newcolumn>");
        feedfile.first_row = allLines[1].replaceAll("'", '')
            .replaceAll('"', '')
            .replaceAll(/\t/g, '<newcolumn>')
            .replaceAll(',', "<newcolumn>")
            .replaceAll("|", "<newcolumn>")
            .split("<newcolumn>");
        // -----------------------
        //!? SUPER LAZY SHOPIFY FEED VERSION ONE CHECKER
        // =========================================
        console.log(feedfile.merchant_layout.length)
        console.log(feedfile.first_row)
        if ((feedfile.merchant_layout.length === 33) && (feedfile.merchant_layout[31] == shopify_API_feed_examples[0].column_layout[31])) {
            // alert("this is a shopify Feed")
            console.log('its a match')
            var shopify_modal = new bootstrap.Modal(document.getElementById('alert-modal'), {
                keyboard: false
            });
            document.getElementById('alert-statement').innerHTML = "This appears to be a Shopify Datafeed"
            document.getElementById('alert-image-1').src = "assets/shopify_september_2022.png"
            document.getElementById('alert-image-2').src = "assets/second_feed.png"
            shopify_modal.show();
        };
        var column_count = feedfile.merchant_layout.length
        var firstArray = //First step in building an array from Merchant Data (removing delimiters, any capitalizations and repetitive values)
            validInput.toLowerCase()
                .replaceAll("'", '')
                .replaceAll('"', '')
                .replaceAll(',', "<newcolumn>")
                .replaceAll("|", "<newcolumn>")
                .replaceAll(/\t/g, '<newcolumn>')
                .replaceAll('-', '')
                .replaceAll('_', '')
                .replaceAll(' ', '')
                .replaceAll('item', '')
                .replaceAll('product', '')
                .replaceAll('\r', '')
                .split("<newcolumn>");
        if (feedfile.merchant_layout.indexOf("product" || "item")) {// quickly check to see if the Merchant used 'product' or 'item' to define the product name, and ensure its placed in the array
            let i = feedfile.merchant_layout.indexOf("product");
            let j = feedfile.merchant_layout.indexOf("item")
            firstArray[i] = 'name'; firstArray[j] = 'name';
        };
        feedfile.variant_map = new Array;
        console.log(feedfile.variant_map)
        for (i = 0; i < column_count; i++) {
            feedfile.variant_map.push("")
        };
        console.log(feedfile);
        if (allLines.length > 50) {
            allLines.splice(51, allLines.length)
        };
        check_for_blank_columns(firstArray, allLines)
        determine_fields(firstArray); //FIRST MAPPING STEP
        console.log(feedfile);
    };
    fileReader.onerror = function () {
        alert(fileReader.error);
    };
};