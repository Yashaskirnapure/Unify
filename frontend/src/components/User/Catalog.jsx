import React, { useState, useEffect } from 'react';
import { FaCloud, FaCog } from 'react-icons/fa';
import Sidebar from './Sidebar';
import API from '../../api';
import Table from './Table';
import '../../styles/imageRecord.css';
import { useNavigate } from 'react-router';

function Catalog() {
  useEffect(() => { fetchCatalog() } , []);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const fetchCatalog = async () => {
    try{
      const response = await API.get('images');
      const rawImages = response.data.images;
      setImages(rawImages);
    }catch(err){
      alert("Error loading images")
    }
  }

  const handleView = (id) => { navigate(`/image/view/${id}`); }
  const handleTransform = (id) => { navigate(`/image/transform/${id}`); }

  const handleDelete = async (id) => {
    try{
      await API.delete(`/image/${id}`);
      const res = images.filter((img) => img.id !== id);
      setImages(res);
      
      alert("Image deleted.");
    }catch(err){
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="Home">
      <Sidebar/>
      <div className="Catalog">
        <h2 className='heading'>Media Explorer</h2>
        <h4 className='heading'> 
          <FaCloud size={15} style={{ marginRight: '8px' }} />
          Uploads
        </h4>
        <div className="table-container">
          <Table images={ images }
            handleView = { handleView }
            handleDelete = { handleDelete}
            handleTransform = { handleTransform }
          />
        </div>
      </div>
    </div>
  )
}

export default Catalog