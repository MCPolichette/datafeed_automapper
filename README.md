# datafeed_automapper
A bootstrap5-based tool to automatically map merchant datafeeds.

## EXPLANATION
This tool is intended to assist with mapping unique feedfiles quickly and efficiently.  Minimizing the amount of work required to ensure that your columns are aligned as expected, and preventing accidental typos.

The tool checks the first row, and breaks down the column titles into lowercase concatenated strings, making the search and identification process easier.

It also allows users to adjust the map, view the map with variant details(if parent skus are detected) and delivers pipe delimited maps, attribute maps, and solutions to common problems.

This is a work in progress, and I am regularly adding additional features to improve the process.

This was also an excersize in getting re-aquainted with bootstrap styling, keeping the styling simple and readable. 

### User Process
  1. Upload file
     - the app.js file identifies the file-type, the delimiters, and maps the file to it's best ability 
     - It delivers the map, displaying the Merchant's column titles, and the assumed mapping.
  2. User has the option to view the mapping as a variant import, or not.        
  3. User has the option to edit the mapping.
  4. With button clicks, one can have a modal delivered that displays a pipe delimited map of the table.  With additional maps if needed.
  5. Refresh the page (manually of via button click) to map a new file.
(other unlisted features are added regularly)

### NEW UPDATES from original file
I originally had a single HTML file that had very few features.  
- [x] Bootstrap for displays, allows for easy scrolling table, and buttons.
- [x] New field arrays, and using objects to keep logic clean and readable.
- [x] Ability to update the mapping via DOM.
- [x] Add variant mapping.
    - [x] variant objects array, and identifiers
    - [x] method for identifying potential variant mapped feeds.
    - [x] adding a variant map row to the table display.
    - [x] run some sort of group ID validation.
    - [x] display the 'secondary feedfile' and how it should be filled out.
- [x] Identifies Shopify feeds, and delivers a modal explaining steps to copy a template.   
- [x] Loading Icon for large files.
- [x] Reviews top 150 rows of products in the feed to identify 'BLANK' and partially populated columns.
- [x] Modal that has suggested field-builder solutions in cases where required data is missing.

### More Goals. 
  
  - [ ]An XML modal, just like the shopify one, that inspects the file and recommends a template.
  - [ ]Notes regarding how many parent Skus are identified compared to the total number rows.
  - [ ]adding links to OTHER troubleshooting steps / and solutions.. to make that page a ONE STOP datafeed troubleshooting solution.