const fs = require('fs');
const csv = require('csv-parser');

module.exports = function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ skipEmptyLines: true, trim: true }))
      .on('data', (row) => {
        // remove empty rows
        if (Object.values(row).some((v) => v && v.trim() !== '')) {
          results.push(row);
        }
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};
