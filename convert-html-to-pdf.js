const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertHtmlToPdf() {
  // Path to the HTML report
  const htmlPath = path.join(__dirname, 'cypress/reports/index.html');
  const pdfPath = path.join(__dirname, 'cypress/reports/report.pdf');

  // Ensure the HTML file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('HTML report not found:', htmlPath);
    return;
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML report
    await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });    

    // Generate the PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
    });

    console.log('PDF created successfully:', pdfPath);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error converting HTML to PDF:', error);
  }
}

convertHtmlToPdf();
