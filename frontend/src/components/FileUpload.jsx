import React from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const FileUpload = ({ setCsvData, setInsights }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        setCsvData(result.data);

        // Upload to backend
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await axios.post('http://localhost:5000/api/upload', formData);
          setInsights(res.data.insights);
        } catch (err) {
          console.error('Upload failed:', err);
          setInsights('❌ Failed to get insights from Gemini');
        }
      },
    });
  };

  return <input type="file" accept=".csv" onChange={handleChange} />;
};

export default FileUpload;
