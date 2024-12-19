const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Define the source folder and output zip file
const reportDir = path.join(__dirname, 'cypress/reports'); // Path to the Cypress report folder
const outputZip = path.join(__dirname, 'cypress/reports.zip'); // Path to the ZIP file

// Create a file stream for the zip file
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 }, // Compression level
});

// Handle stream events
output.on('close', () => {
  console.log(`Zipping complete. Total bytes: ${archive.pointer()}`);
  console.log(`Report package saved to: ${outputZip}`);
});

archive.on('error', (err) => {
  throw err;
});

// Pipe the archive data to the file stream
archive.pipe(output);

// Append the report directory to the archive
archive.directory(reportDir, false);

// Finalize the archive
archive.finalize();
