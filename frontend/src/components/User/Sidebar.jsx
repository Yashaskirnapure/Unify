import React, { useEffect, useState } from 'react';
import '../../styles/sidebar.css';
import { FaUpload, FaBook, FaExchangeAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import API from '../../api';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authenticate';

function Sidebar() {
  const [fullName, setFullname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { setFullname(localStorage.getItem('fullname')) }, [])

  const handleLogout = async () => {
    try{
      await API.get('/logout');
      localStorage.removeItem('fullname');
      localStorage.removeItem('email');

      dispatch(logout);
      navigate('/login');
    }catch(err){
      alert("Something went wrong. Please try again.")
    }
  }

  const handleDelete = async () => {
    try{
      const response = await API.get('/user/remove');
      alert("Account deleted....Redirecting.");
      localStorage.removeItem('email');
      localStorage.removeItem('fullname');
      navigate('/login');
    }catch(err){
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="Sidebar">
      <div className='name-tag'>Welcome, <br /> 
      <span className='name-span'>{fullName}</span></div>
      <Link to='/upload'>
        <div className="sidebar-item"><FaUpload className="icon" /> Upload</div>
      </Link>
      <Link to='/catalog'>
        <div className="sidebar-item"><FaBook className="icon" /> Catalog</div>
      </Link>
      <div className="sidebar-item"><FaExchangeAlt className="icon" /> Transform</div>
      <div className="sidebar-item delete-account" onClick={handleDelete} ><FaTrash className='icon' />
        DELETE ACCOUNT
      </div>
      <div className="sidebar-item logout"
        onClick={handleLogout}
      >LOGOUT</div>
    </div>
  )
}

export default Sidebar