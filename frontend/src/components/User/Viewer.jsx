import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate, useParams } from 'react-router';
import '../../styles/viewer.css';
import { FaArrowLeft } from 'react-icons/fa';

function Viewer() {
    const [image, setImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchImage = async () => {
        try{
            const response = await API.get(`image/${id}`, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        }catch(err){
            alert("Something went wrong while fetching image.");
        }
    }

    const handleDownload = () => {
        if(!image) return;

        const link = document.createElement('a');
        link.href = image;
        link.download = 'download.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleGoBack = () => { navigate('/catalog'); }
    useEffect(() => { fetchImage() }, []);

  return (
    <div className="Viewer">
        <div className="image">
            {image && <img src={image} alt="Fetched Image" />}
            <div className="bottom-panel">
                <button className='viewer-button' style={{width: '50px'}} onClick={handleGoBack}
                ><FaArrowLeft size={24} /></button>
                <button className='viewer-button' style={{width: '100%'}} onClick={handleDownload}
                >Download</button>
            </div>
        </div>
    </div>
  )
}

export default Viewer