import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem('authenticated');

    if(isAuthenticated === "loading"){ return <div>Loading.....</div> }
    if(!isAuthenticated){ return <Navigate to='/login' replace /> }
    return children;
}

export default ProtectedRoute