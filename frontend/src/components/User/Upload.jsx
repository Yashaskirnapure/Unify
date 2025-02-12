import React, { useState, useRef } from 'react';
import API from '../../api';
import Sidebar from './Sidebar';
import '../../styles/upload.css'

function Upload() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('No file selected');
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("Please select a file");
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file, );

    try {
      const response = await API.post('/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert("File uploaded successfully!");
    } catch (err) {
      alert("There was an error uploading the file. Please try again.");
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleClick = () => { fileInputRef.current.click(); }

  return (
    <div className="Home">
      <Sidebar />
      <div className="custom-image-input">
        <h2 className='heading'>Image Uploader</h2>
        <div className='input-collection'>
          <button className='choose-button' onClick={handleClick}>Browse image</button>
          <div className="filename">
            <span>{filename}</span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          required
          style={{ display: "none" }}
        />
        <div className="image-preview">
          {preview && <img src={preview} alt="Preview"/>}
        </div>
        <button
          className = 'submit-button'
          type="submit"
          onClick={handleSubmit}
        >UPLOAD</button>
      </div>
    </div>
  );
}

export default Upload;