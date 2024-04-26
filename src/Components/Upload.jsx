import React, { useRef, useState } from "react";

const isValidFormat = (fileName, validFormats) => {
  const fileExtension = fileName.split(".").pop();
  return validFormats.includes(fileExtension);
};

const Upload = ({parseFile}) => {
  const validFormats = ["csv"];
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleFileSubmit = (event) => {
    event.preventDefault();
    const fileName = fileInputRef.current.value.split("\\").pop(); // Extracting file name from the path
    if (fileName) {
      // Clear any previous error messages
      setErrorMessage("");
      if (isValidFormat(fileName, validFormats)) {
        // File format is valid, proceed with parsing
        const file = fileInputRef.current.files[0];

        console.log("File format is valid");
        parseFile(file);
      } else {
        // File format is not valid
        console.log("File format not valid");
        // Set error message
        setErrorMessage("* File format not valid");
      }
    }
  };

  const handleClearError = () => {
    setErrorMessage("");
    // Clear file input value
    fileInputRef.current.value = "";
  };

  return (
    <div className="mt-3 mx-3">
      <form onSubmit={handleFileSubmit} className="flex gap-3">
        <input
          type="file"
          ref={fileInputRef}
          className="file-input w-full "
          name=""
          id=""
        />
        <button className="btn" onClick={handleClearError}>
          ❌
        </button>
        <div className="divider divider-horizontal"></div>
        <input type="submit" className="btn w-60 " value={"Parse File"} />
      </form>
      {errorMessage && (
        <div className="flex items-center mt-2">
          <p className="text-error ml-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
