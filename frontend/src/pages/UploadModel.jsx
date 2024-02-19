import { useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useState   } from "react";
export function UploadModel(){
   const randomID = uuidv4(); 
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
     id: randomID,
     modelName: "",
     modelProvider: "",
     modelCategory: "",
     modelDescription: "",
     likes: 0,
     codeSnippet: "",
   });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!formData.modelName || !formData.modelProvider || !formData.modelCategory || !formData.modelDescription || !formData.codeSnippet) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Send a POST request to the server with the form data
    fetch('http://localhost:3000/UploadModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then( async(res) => {
        const response = await res.json();
        navigate(`/Models/${formData.id}`);
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Upload Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Model Name:
            </label>
            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Model Provider:
            </label>
            <input
              type="text"
              name="modelProvider"
              value={formData.modelProvider}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Model Category:
            </label>
            <select
              name="modelCategory"
              value={formData.modelCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Feature Extraction">Feature Extraction</option>
              <option value="Depth Estimation">Depth Estimation</option>
              <option value="Object Detection">Object Detection</option>
              <option value="Token Classification">Token Classification</option>
              <option value="Translation">Translation</option>
              <option value="Image Segmentation">Image Segmentation</option>
              <option value="Image Classification">Image Classification</option>
              <option value="Text Classification">Text Classification</option>
              <option value="Summarization">Summarization</option>
              <option value="Sentiment Analysis">Sentiment Analysis</option>
              <option value="Named Entity Recognition">
                Named Entity Recognition
              </option>
              <option value="Text Generation">Text Generation</option>
              <option value="Text-to-Image">Text-to-Image</option>
              <option value="Image-to-Text">Image-to-Text</option>
              <option value="Image-to-Image">Image-to-Image</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Model Description:
            </label>
            <textarea
              name="modelDescription"
              value={formData.modelDescription}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Code Snippet:
            </label>
            <textarea
              name="codeSnippet"
              value={formData.codeSnippet}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}