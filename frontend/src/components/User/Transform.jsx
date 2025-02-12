import React, { useRef, useState, useEffect } from "react";
import Sidebar from '../User/Sidebar';
import API from '../../api';
import '../../styles/transform.css';
import { useParams } from "react-router";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [original, setOriginal] = useState(null);
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [settings, setSettings] = useState({
    scale: 1,
    rotation: 0,
    filters: {
      grayscale: 0,
      sepia: 0,
      brightness: 100,
      contrast: 100,
    },
  });
  const [cropArea, setCropArea] = useState(null);

  const initialSetup = async () => {
    try{
      const response = await API.get(`image/${id}`, { responseType: 'blob'});
      setOriginal(response.data);
      const contentDisposition = response.headers.get('Content-Disposition');

      let name = '';
      if (contentDisposition && contentDisposition.includes('attachment')) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch && filenameMatch[1]) {
          name = filenameMatch[1];
        }
      }

      setFilename(`${Date.now()}_transformed_${name}`);

      const objectURL = URL.createObjectURL(response.data);
      const img = new Image();
      img.src = objectURL;

      img.onload = () => {
          setImage(img);
          setSettings({
              scale: 1,
              rotation: 0,
              filters: {
              grayscale: 0,
              sepia: 0,
              brightness: 100,
              contrast: 100,
              }
          });
      }
    }catch(err){
      alert("Something went wrong. Please try again.");
    }
  }
  
  useEffect(() => { initialSetup(); }, []);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 350;

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { scale, rotation, filters } = settings;

      const scaleFactor = Math.min(
        CANVAS_WIDTH / image.width,
        CANVAS_HEIGHT / image.height
      );
      const width = image.width * scaleFactor;
      const height = image.height * scaleFactor;

      const offsetX = (CANVAS_WIDTH - width) / 2;
      const offsetY = (CANVAS_HEIGHT - height) / 2;

      ctx.save();

      ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);

      ctx.filter = `
        grayscale(${filters.grayscale}%)
        sepia(${filters.sepia}%)
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
      `;

      ctx.drawImage(image, offsetX, offsetY, width, height);
      ctx.restore();
    }
  }, [image, settings]);

  const handleChange = (type, value, subKey = null) => {
    setSettings((prev) => {
      const updated = { ...prev };
      if (subKey) { updated[type][subKey] = value; }
      else { updated[type] = value; }
      return updated;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('image', original, filename);
    formData.append('options', JSON.stringify(settings));

    try{
        const response = await API.post('/transform', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        alert("Transformation saved.");
    }catch(err){
        alert("Something went wrong. Please try again.")
    }
  }


  return (
    <div className="Home">
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width:"80%",
          minWidth:"800px"
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ border: "1px solid black", marginTop: "20px" }}
          height={350}
          width={800}
        />

        <div style={{
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}>
          <div className="styling-options">
            <label>
              Scale:
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.scale}
                onChange={(e) => handleChange("scale", parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="styling-options">
            <label>
              Rotation:
              <input
                type="range"
                min="0"
                max="360"
                value={settings.rotation}
                onChange={(e) => handleChange("rotation", parseInt(e.target.value, 10))}
              />
            </label>
          </div>
          <div className="styling-options">
            <label>
              Grayscale:
              <input
                type="range"
                min="0"
                max="100"
                value={settings.filters.grayscale}
                onChange={(e) => handleChange("filters", parseInt(e.target.value, 10), "grayscale")}
              />
            </label>
          </div>
          <div className='styling-options'>
            <label>
              Sepia:
              <input
                type="range"
                min="0"
                max="100"
                value={settings.filters.sepia}
                onChange={(e) => handleChange("filters", parseInt(e.target.value, 10), "sepia")}
              />
            </label>
          </div>
          <div className="styling-options">
            <label>
              Brightness:
              <input
                type="range"
                min="50"
                max="150"
                value={settings.filters.brightness}
                onChange={(e) => handleChange("filters", parseInt(e.target.value, 10), "brightness")}
              />
            </label>
          </div>
          <div className="styling-options">
            <label>
              Contrast:
              <input
                type="range"
                min="50"
                max="150"
                value={settings.filters.contrast}
                onChange={(e) => handleChange("filters", parseInt(e.target.value, 10), "contrast")}
              />
            </label>
          </div>
        </div>
        <button className='button' style={{margin: "10px"}} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ImageEditor;
