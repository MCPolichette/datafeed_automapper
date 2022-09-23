# datafeed_automapper
A bootstrap5-based tool to automatically map merchant datafeeds.


## EXPLANATION

### Process
  1. uploads file, makes two arrays of the top row.
     - first Array, no edits, used for table 
     - second array, edits out all the common variable differences ( spaces, underscores, hyphens, and common words like 'item, product')
  2. runs second arrray through filtered array of 'all fields' objects(noted below) to identify best match.        
  3. runs a second loop, to make sure that ALL required fields have the best possible option. (array of 'required' fields) objects)
  4. creates a pipe delimited map.
  5. displays a table with first array and map. 
  6. table has drop down menus to change fields 

### NEW UPDATES from original file

- [x] Bootstrap for displays, allows for easy scrolling table, and buttons.
- [x] New field arrays, and using objects to keep logic clean and readable.
- [ ] Ability to update the mapping via DOM.
- [ ] Add 5 or so rows of data to the display, to show which columns are blank.
- [x] Add variant mapping.
    - [x] variant objects array, and identifiers
    - [x] method for identifying potential variant mapped feeds.
    - [x] adding a variant map row to the table display.
    - [ ] run some sort of group ID validation.
    - [x] display the 'secondary feedfile' and how it should be filled out.


### More Goals. 
  - [ ] Uploaded field identifies a Shopify feed and builds a map accordingly. for BOTH pre AND post FEB 2022 date. 
   