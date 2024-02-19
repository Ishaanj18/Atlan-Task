import React, { useState } from "react";

export function TryOut() {
  const [uploadMessage, setUploadMessage] = useState(""); // State to store upload message
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [generatedText, setGeneratedText] = useState("");
  const [processing, setProcessing] = useState(false); // State to track processing status

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setUploadMessage("File uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateText = () => {
    // Set processing to true to show the processing message
    setProcessing(true);

    // Simulate delay for generating text
    setTimeout(() => {
      // Generate text logic here
      const simulatedOutput = "This is a simulated model output.";
      setGeneratedText(simulatedOutput);
      // Set processing to false after generating text
      setProcessing(false);
    }, 2000); // Delay for 2 seconds
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        onChange={handleFileUpload}
      />
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "50%", marginTop: "10px" }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleGenerateText}
            disabled={processing} // Disable the button while processing
          >
            {processing ? "Processing..." : "Generate Text"}
          </button>
        </div>
      )}
      {generatedText && <p>{generatedText}</p>}
    </div>
  );
}
