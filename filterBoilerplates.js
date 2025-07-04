import fs from 'fs';

// Read the current boilerplates
import boilerplates from './boilerplates.json' assert { type: 'json' };
 
// Filter out boilerplates without an imageUrl
const filteredBoilerplates = boilerplates.filter(bp => bp.imageUrl);

// Write the filtered list back to the file
fs.writeFileSync(
  './boilerplates.json',
  JSON.stringify(filteredBoilerplates, null, 2),
  'utf-8'
);

console.log(`Filtered out ${boilerplates.length - filteredBoilerplates.length} boilerplates without images.`);
console.log(`Total boilerplates remaining: ${filteredBoilerplates.length}`);
