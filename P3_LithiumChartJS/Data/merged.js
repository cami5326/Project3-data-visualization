const fs = require('fs');
const path = require('path');

// An array of JSON file paths to be merged
const filePaths = [
  'LPR1995.json',
  'LPR2005.json',
  'LPR2015.json'
];

// An empty array to store the merged data
let mergedData = [];

// Loop through each file path
for (const filePath of filePaths) {
  // Read the file contents and parse the JSON data
  const fileData = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
  const jsonData = JSON.parse(fileData);

  // Push the JSON data to the mergedData array
  mergedData.push(...jsonData);
}

// Write the merged data to a new file
fs.writeFileSync(path.join(__dirname, 'merged.json'), JSON.stringify(mergedData));
