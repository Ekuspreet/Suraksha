import React from 'react'
import Upload from './Upload'
import ParseTable from './ParseTable'
import UploadModal from './UploadModal'

import Papa from 'papaparse'


function generateRandomArray() {
  const array = [];
  const rowCount = 10; // Number of rows in the array
  const columnCount = 5; // Number of columns in each row
  
  // Generate random data
  for (let i = 0; i < rowCount; i++) {
    const row = {};
    for (let j = 0; j < columnCount; j++) {
      row[`Column ${j + 1}`] = Math.random().toString(36).substring(7); // Random string data
    }
    array.push(row);
  }
  
  return array;
}

function downloadCSV(array) {
  const csv = Papa.unparse(array);
  
  // Create a Blob object representing the data as a CSV file
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  
  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(blob);
  
  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.csv");
  
  // Append the link to the document and trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up by revoking the URL
  window.URL.revokeObjectURL(url);
}



const Content = () => {
  function parseFile(file){
    const data = generateRandomArray();
    downloadCSV(data);

//testing download




    const reader = new FileReader();
  
  reader.onload = (event) => {
    const csvData = event.target.result;
    Papa.parse(csvData, {
      header: true,
      complete: function(results) {
        if (results.meta.fields) {
          console.log("Column names:", results.meta.fields);
          console.log(results);
        } else {
          console.log("No column names found");
        }
      },
      error: function(error) {
        console.error("Error parsing CSV file:", error);
      }
    });
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsText(file);



  }



  return (
    <div className='m-5 bg-base-300 w-full rounded-xl flex flex-col'>
            <Upload
            parseFile={parseFile}
            />
            <div className="divider"></div>
            <ParseTable/>
            <UploadModal/>
    </div>
  )
}

export default Content