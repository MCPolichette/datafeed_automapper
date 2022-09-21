var feedfile = {
    map: [],
    merchant_layout: [],
    data_rows: [],
    variant_map: [],
    map_for_variants: [],
    blank_columns: []
};
is_variant = false;
allLines = [];

function delete_this_function() {
    // !? WILL PLAY WITH THIS LATER WHEN CLEANING UP
    // fetch('./data.json')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    // ===========================================================
    // feedfile.map = exampleColumns;
    // determine_fields(exampleColumns)
}
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
                    else { feedfile.variant_map[index] = ''; }
                };
            }));
    });
    feedfile.map_for_variants = new Array(feedfile.map.length)
    for (i = 0; i < feedfile.map_for_variants.length; i++) {
        feedfile.map_for_variants[i] = feedfile.map[i]
        if (feedfile.map_for_variants[i] == 'strProductSKU') {
            feedfile.map_for_variants[i] = 'strAttribute1'
            var t = i
        } if ((feedfile.map_for_variants[i] == 'strAttribute1') && (t != i)) {
            feedfile.map_for_variants[i] = 'strProductSKU'
        }
    };
    check_required_fields();
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

function variant_toggle() {
    if (is_variant) {
        build_mapped_table('standard');
        build_pipe_display('standard');
        document.getElementById('copy_second_map').classList.add("disabled")
        is_variant = false
    } else {
        build_mapped_table('variant');
        build_pipe_display('variant');
        document.getElementById('copy_second_map').classList.remove("disabled")
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
            });
            break
    };
    reveal_hidden(['post_upload_display'])
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
function add_note() {

};
function add_error() {

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
        if (element.hidden) {
            element.setAttribute('hidden', 'true');
        };
    });
};
function check_for_blank_columns(arr, allRows) {
    // feedfile.blank_columns = new Array(arr.length)
    // console.log(feedfile.blank_columns)
    // for (i = 0; i < feedfile.blank_columns.length; i++) {
    //     feedfile.blank_columns[i] = false;
    //     for (j = 1; j < allRows.length - 1; j++) {
    //         allRows.forEach(row => {
    //             row.replaceAll(/\t/g, '<newcolumn>')
    //                 .replaceAll(',', "<newcolumn>")
    //                 .replaceAll("|", "<newcolumn>")
    //                 .split("<newcolumn>");
    //             console.log(row)
    //         })
    //     }



    // }
    // console.log(feedfile.blank_columns)

}
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
    document.getElementsByClassName('mapView').innerHTML = '';
    document.getElementById('mapNotes').innerHTML = '';
    document.getElementById('mapErrors').innerHTML = '';
    hide(['exampleBuildField'])
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
            revealHidden(['exampleBuildField']);
        };
        buttonListItem.appendChild(buttonDisplay);
    };
    errorList.appendChild(newListItem);
    errorList.appendChild(secondaryListItem);
    errorList.appendChild(buttonListItem);
    revealHidden(['errors'])
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

// function stringToArray(string) {
//     string
//         .toLowerCase()
//         .replaceAll("'", '')
//         .replaceAll('"', '')
//         .replaceAll(',', /\t/g)
//         .replaceAll('|', /\t/g)
//     return string
// }
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
        // BUILD ARRAYS TO WORK WITH
        feedfile.merchant_layout = //Reference to the Merchant's actual dataset in an array
            validInput
                .replaceAll("'", '')
                .replaceAll('"', '')
                .replaceAll(/\t/g, '<newcolumn>')
                .replaceAll(',', "<newcolumn>")
                .replaceAll("|", "<newcolumn>")
                .split("<newcolumn>");

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

        }
        console.log(feedfile)

        check_for_blank_columns(firstArray, allLines)

        console.log(firstArray)
        determine_fields(firstArray); //FIRST MAPPING STEP
        console.log(feedfile)
    };
    fileReader.onerror = function () {
        alert(fileReader.error);
    };
};

// DATAFEED FIELD ARRAYS
var exampleColumns = ['strProductSku', 'strProductId', 'strCategory', 'txtShortDescription', 'strSubCategory'];
var exampleColumns2 = [" ", "Manufacturer Id", "Brand Name", "Product-Name", "Long Description", "Short Description", "Category", "SubCategory", "Product Group", "Thumb URL", "Image URL", "Buy Link", "Keywords", "Reviews", "Sale Price", "Brand Page Link", "Brand Logo Image", "Product Parent Grouping Id", "Product Color", "Product Size", "Product Pattern", "Product Material", "Product Weight", "Product Age Group", "Product Gender", "Product UPC", "Product GTIN", "Variants XML", "Product GUID", "Product Sale Price Effective Date", "Product Availability", "Product Visibility", "Product Model Number", "Product Quantity", "Product Alternate Buy URL", "Product Alternate Product ID", "Department", "Medium Image URL", "Google Categorization", "Item Based Commission"];
// List of potential fields. (all spaces, dashes, and the terms 'product' and 'item' removed, to reduce load, and keep things streamlined)
var fields = {
    att_map: attributeMap = `<Fields>
                <Field><name>strAttribute1</name><title>Parent Group ID</title><type>string</type></Field>

                <Field><name>strAttribute2</name><title>Color</title><type>string</type></Field>

                <Field><name>strAttribute3</name><title>Size</title><type>string</type></Field>

                <Field><name>strAttribute4</name><title>Pattern</title><type>string</type></Field>

                <Field><name>strAttribute5</name><title>Material</title><type>string</type></Field>

                <Field><name>strAttribute6</name><title>Age Group</title><type>string</type></Field>

                <Field><name>strAttribute7</name><title>Gender</title><type>string</type></Field>

                <Field><name>strAttribute8</name><title>UPC</title><type>string</type></Field>

                <Field><name>strAttribute9</name><title>Availability</title><type>string</type></Field>

                <Field><name>strAttribute10</name><title>Google Product Category</title><type>string</type></Field>

                <Field><name>strMediumImage</name><title>Medium Image URL</title><type>string</type></Field>

                <Field><name>txtAttribute1</name><title>Variants XML</title><type>xml</type><compression>gz</compression></Field>

                <Field><name>txtAttribute2</name><title>GTIN</title><type>string</type></Field>
                <Field><name>txtAttribute3</name><title>Key Words</title><type>string</type></Field>

            </Fields>`,
    required: [{
        field_name: 'strDepartment',
        back_up: ['strAttribute10', 'strCategory', 'strSubCategory']
    }, {
        field_name: "strProductSKU",
        back_up: ['strAttribute1']
    }, {
        field_name: 'strProductName',
        back_up: ['N/A']
    }, {
        field_name: 'dblProductPrice',
        back_up: ['dblProductSalePrice']
    }, {
        field_name: 'strLargeImage',
        back_up: ['strMediumImageURL', 'strThumbnailImageURL']
    }, {
        field_name: 'txtLongDescription',
        back_up: ['txtShortDescription',]
    }, {
        field_name: 'strBuyURL',
        back_up: ['N/A']
    }
    ],
    all: [{
        field_name: 'strDepartment',
        matches: ['department', 'dept'],
        variant: false
    }, {
        field_name: "strProductSKU",
        matches: ['sku', 'id', 'number', 'idnumber'],
        variant: "variant-sku"
    }, {
        field_name: 'strProductName',
        matches: ['name', 'title'],
        variant: false
    }, {
        field_name: 'dblProductPrice',
        matches: ['price', 'retailprice', 'retail'],
        variant: 'variant-retail_price'
    }, {
        field_name: 'strLargeImage',
        matches: ['imageurl', 'image', 'imageurllarge', 'imagelink'],
        variant: 'variant-image_url'
    }, {
        field_name: 'txtLongDescription',
        matches: ['longdescription', 'description',],
        variant: false
    }, {
        field_name: 'strBuyURL',
        matches: ['link', 'buylink', 'buyurl', 'url'],
        variant: 'variant-detail_url'
    }, {
        field_name: 'strCategory',
        matches: ['category'],
        variant: false
    }, {
        field_name: 'strSubCategory',
        matches: ['subcategory'],
        variant: false
    }, {
        field_name: "strAttribute10",
        matches: ['googlecategory', 'googlecategorization'],
        variant: false
    }, {
        field_name: 'dblItemCommission',
        matches: ['basedcommission', 'ibc', 'commission', 'commissionrate'],
        variant: false
    }, {
        field_name: 'dblProductSalePrice',
        matches: ['saleprice', 'sale'],
        variant: 'variant-sale_price'
    }, {
        field_name: 'strManufacturerPartNumber',
        matches: ['manufacturerpartnumber', 'manufacturerid', 'mpn'],
        variant: 'variant-vendor_sku'
    }, {
        field_name: 'strBrandName',
        matches: ['brandname', 'brand'],
        variant: false
    }, {
        field_name: 'strBrandURL',
        matches: ['brandurl', 'brandpagelink', 'brandpage'],
        variant: false
    }, {
        field_name: 'strBrandLogoImage',
        matches: ['brandlogoimage', 'brandimage', 'brandimageurl', 'logourl', 'logolink', 'logoimage', 'logourl', 'brandlogo'],
        variant: false
    }, {
        field_name: 'strThumbnailURL',
        matches: ['thumbnailurl', 'thumbnail', 'thumbnaillink', 'thumbnailimage', 'imageurlsmall', 'imagesmall', 'thumblink', 'thumbimage', 'thumburl'],
        variant: false
    }, {
        field_name: 'strMediumImageURL',
        matches: ['mediumimageurl', 'mediumimage', 'mediumimagelink', 'imageurlmedium'],
        variant: false
    }, {
        field_name: 'txtShortDescription',
        matches: ['shortdescription'],
        variant: false
    }, {
        field_name: 'strAttribute1',
        valueTitle: 'Product Parent Grouping Id',
        type: '<type>string</type>',
        matches: ['parentgroup', 'parentgroupid', 'groupid', 'group'],
        variant: 'strProductSKU'
    }, {
        field_name: 'strAttribute2',
        valueTitle: 'Product Color',
        type: '<type>string</type>',
        matches: ['color'],
        variant: 'variant-color'
    }, {
        field_name: 'strAttribute3',
        valueTitle: 'Product Size',
        type: '<type>string</type>',
        matches: ['size',],
        variant: 'variant-size'
    }, {
        field_name: 'strAttribute4',
        valueTitle: 'Product Pattern',
        type: '<type>string</type>',
        matches: ['pattern', 'style'],
        variant: 'variant-style'
    }, {
        field_name: 'strAttribute5',
        valueTitle: 'Product Material',
        type: '<type>string</type>',
        matches: ['material'],
        variant: false
    }, {
        field_name: 'strAttribute6',
        valueTitle: 'Product Age Group',
        type: '<type>string</type>',
        matches: ['agegroup', 'age'],
        variant: false
    }, {
        field_name: 'strAttribute7',
        valueTitle: 'Product Gender',
        type: '<type>string</type>',
        matches: ['gender'],
        variant: false
    }, {
        field_name: 'strAttribute8',
        valueTitle: 'Product UPC',
        type: '<type>string</type>',
        matches: ['upc'],
        variant: 'variant-upc'
    }, {
        field_name: 'strAttribute9',
        valueTitle: 'Product Availability',
        type: '<type>string</type>',
        matches: ['availability', 'available'],
        variant: false
    }, {
        field_name: 'txtAttribute1',
        valueTitle: 'Variants XML',
        type: '<type>xml</type><compression>gz</compression>',
        matches: ['xml', 'variantxml', 'variants', 'variantsxml'],
        variant: false
    }, {
        field_name: 'txtAttribute2',
        valueTitle: 'GTIN',
        type: '<type>string</type>',
        matches: ['gtin'],
        variant: false
    }, {
        field_name: 'txtAttribute3',
        valueTitle: 'Key Words',
        type: '<type>string</type>',
        matches: ['keywords'],
        variant: false
    }],
    variants: [{
        variant: 'variant-sku',
        matches: 'sku'
    },
    {
        variant: 'variant-upc',
        matches: 'upc'
    },
    {
        variant: 'variant-vendor_sku',
        matches: 'vendorsku'
    },
    {
        variant: 'variant-size',
        matches: 'size'
    },
    {
        variant: 'variant-color',
        matches: 'color'
    },
    {
        variant: 'Variant-style',
        matches: 'style'
    },
    {
        variant: 'Variant-retail_price',
        matches: 'retailprice'
    },
    {
        variant: 'Variant-sale_price',
        matches: 'saleprice'
    },
    {
        variant: 'variant-image_url',
        matches: 'imageurl'
    },
    {
        variant: 'variant-detail_url',
        matches: 'detailurl'
    },
    {
        variant: 'variant-action_url',
        matches: 'actionurl'
    },
    {
        variant: 'variant-available',
        matches: 'available'
    },
    {
        variant: 'variant-season',
        matches: 'season'
    },
    {
        variant: 'variant-vendor_sku',
        matches: 'vendorsku'
    },
    {
        variant: 'Variant-year',
        matches: 'year'
    },],
}